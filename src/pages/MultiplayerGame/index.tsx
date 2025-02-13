import { Chessboard } from "react-chessboard";
import { useNavigate, useParams } from "react-router-dom";
import MoveHistory from "../../components/MoveHistory";
import PlayerInfoCard from "../../components/PlayerInfoCard";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { hideLoading, showLoading } from "../../utilities";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { IOnlineRoomInfo, IRoomInfoResponse } from "../../interfaces";
import { RootState } from "../../redux/store";
import SignalRContext from "../../contexts/SignalRContext";

const MultiplayerGamePage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const token = useSelector((state: RootState) => state.auth.token);

    const [roomInfo, setRoomInfo] = useState<IOnlineRoomInfo | null>(null);

    const { multiplayerRoomConnectionHubProvider } = useContext(SignalRContext);

    // To prevent entering invalid room, verify room with server first
    // const { isPending, isError, data, error } = useQuery({
    //     queryKey: ["roomIsValid"],
    //     queryFn: async () => {
    //         const response = await axios.get<IRoomInfoResponse>(
    //             `/api/Multiplayer/${id}`,
    //             {
    //                 headers: { Authorization: `Bearer ${token}` },
    //             }
    //         );
    //         return response.data;
    //     },
    // });

    // Leave room handler
    const leaveRoomHandler = () => {
        alert("Do you really want to leave room?");
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

        multiplayerRoomConnectionHubProvider
            .initializeAndStart(token, id)
            .then((connection) => {
                // No connection
                if (!connection) {
                    navigate("/main/lobby");
                    toast.error("Cannot establish hub connection");
                    return;
                }

                connection.on("UpdateRoomInfo", handleUpdateRoomInfo);
            })
            .catch((err) => {
                console.log(err);
                // navigate("/main/lobby");
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
