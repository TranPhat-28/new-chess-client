import { useContext, useEffect, useState } from "react";
import { Chessboard } from "react-chessboard";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import MoveHistory from "../../components/MoveHistory";
import PlayerInfoCard from "../../components/PlayerInfoCard";
import SignalRContext from "../../contexts/SignalRContext";
import { IOnlineRoomInfo } from "../../interfaces";
import { RootState } from "../../redux/store";

const MultiplayerGamePage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const token = useSelector((state: RootState) => state.auth.token);

    const [roomInfo, setRoomInfo] = useState<IOnlineRoomInfo | null>(null);

    const { multiplayerRoomConnectionHubProvider } = useContext(SignalRContext);

    // Leave room handler
    const leaveRoomHandler = () => {
        // alert("Do you really want to leave room?");
        // Perform some kind of alert here
        multiplayerRoomConnectionHubProvider?.stopAndDestroy();
        navigate("/main/lobby");
    };

    useEffect(() => {
        // Invalid path
        if (!id) {
            navigate("/main/lobby");
            toast.error("Invalid game room");
            return;
        }

        // Invalid token
        if (!token) {
            navigate("/main/lobby");
            toast.error(
                "We could not verify your identity. Please login again"
            );
            return;
        }

        // No Hub
        if (!multiplayerRoomConnectionHubProvider) {
            navigate("/main/lobby");
            toast.error("Hub is not initialized");
            console.log("[RoomConnectionHub] Hub is not initialized");
            return;
        }

        // Define callbacks
        const handleUpdateRoomInfo = (roomInfo: IOnlineRoomInfo) => {
            setRoomInfo(roomInfo);
        };

        const handleRoomDisbanded = () => {
            alert("Room was disbanded");
        };

        const handlePlayerLeft = () => {
            alert("Player left");
        };

        multiplayerRoomConnectionHubProvider
            .initializeAndStart(token, id)
            .then((connection) => {
                // No connection
                if (!connection) {
                    navigate("/main/lobby");
                    toast.error("Cannot establish hub connection");
                    return;
                }

                // Register callbacks
                connection.on("UpdateRoomInfo", handleUpdateRoomInfo);
                connection.on("RoomDisbanded", handleRoomDisbanded);
                connection.on("PlayerLeft", handlePlayerLeft);
            })
            .catch((err) => {
                console.log(err);
                navigate("/main/lobby");
                toast.error(
                    "Failed to establish hub connections and start the game"
                );
            });

        return () => {
            // Remove callback
            multiplayerRoomConnectionHubProvider.connection?.off(
                "UpdateRoomInfo",
                handleUpdateRoomInfo
            );

            multiplayerRoomConnectionHubProvider.connection?.off(
                "RoomDisbanded",
                handleRoomDisbanded
            );
            multiplayerRoomConnectionHubProvider.connection?.off(
                "PlayerLeft",
                handlePlayerLeft
            );

            // Remove hub
            multiplayerRoomConnectionHubProvider.stopAndDestroy();
        };
    }, []);

    return (
        <div className="h-full w-full flex flex-col justify-center items-center bg-subtle object-contain">
            {roomInfo && (
                <div className="w-full p-2 max-w-md md:max-w-6xl flex flex-col items-center gap-2 md:grid md:grid-cols-2 md:quickplay-desktop">
                    <div className="w-full md:h-full md:col-start-2 bg-base-200 p-2 rounded-lg font-bold text-lg">
                        <p>Room #{id}</p>
                        <div className="flex gap-2">
                            <PlayerInfoCard
                                player={roomInfo.host ?? null}
                                isHost={true}
                            />
                            <PlayerInfoCard
                                player={roomInfo.player ?? null}
                                isHost={false}
                            />
                        </div>
                    </div>

                    <div className="bg-base-200 p-2 rounded-lg shadow-md w-full max-w-sm md:max-w-full md:col-start-1 md:row-start-1 md:row-span-2">
                        <Chessboard />
                    </div>

                    <div className="w-full h-40 md:col-start-2 md:h-full flex flex-col gap-2">
                        <MoveHistory />

                        <button
                            className="btn btn-primary w-full"
                            onClick={leaveRoomHandler}
                        >
                            Leave room
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MultiplayerGamePage;
