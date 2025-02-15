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
import { ROOM_STATUS } from "../../enums";
import { GetAuthIdFromToken, showCustomAlert } from "../../utilities";

const MultiplayerGamePage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const token = useSelector((state: RootState) => state.auth.token);
    const [authId, setAuthId] = useState<string | null>(null);

    const [roomInfo, setRoomInfo] = useState<IOnlineRoomInfo | null>(null);
    const [roomStatus, setRoomStatus] = useState<ROOM_STATUS>(
        ROOM_STATUS.WAITING_FOR_PLAYER
    );

    const { multiplayerRoomConnectionHubProvider } = useContext(SignalRContext);

    // Leave room handler
    const leaveRoomHandler = () => {
        // alert("Do you really want to leave room?");
        // Perform some kind of alert here
        multiplayerRoomConnectionHubProvider?.stopAndDestroy();
        navigate("/main/lobby");
    };

    // Set game state to start
    const handleInvokeStartGame = async () => {
        setRoomStatus(ROOM_STATUS.STARTED);
        await multiplayerRoomConnectionHubProvider?.connection?.invoke(
            "StartRoom",
            id
        );
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
            showCustomAlert(
                "Room disbanded",
                "The room was disbanded by room's host. You will be redirected to lobby.",
                "OK",
                () => navigate("/main/lobby"),
                undefined,
                undefined,
                true
            );
        };

        const handlePlayerLeft = (newRoomInfo: IOnlineRoomInfo) => {
            setRoomStatus(ROOM_STATUS.WAITING_FOR_PLAYER);
            setRoomInfo(newRoomInfo);
        };

        const handleGameStartedEvent = () => {
            setRoomStatus(ROOM_STATUS.STARTED);
        }

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
                connection.on("GameStarted", handleGameStartedEvent);
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

    useEffect(() => {
        if (roomInfo?.player === undefined) {
            setRoomStatus(ROOM_STATUS.WAITING_FOR_PLAYER);
        }

        if (roomInfo?.player?.id) {
            const idFromToken = GetAuthIdFromToken(token!);
            setAuthId(idFromToken);
            setRoomStatus(ROOM_STATUS.READY);
        }
    }, [roomInfo?.player?.id]);

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

                    {roomStatus === ROOM_STATUS.WAITING_FOR_PLAYER && (
                        <div className="bg-base-200 p-2 rounded-lg shadow-md w-full max-w-sm md:max-w-full md:col-start-1 md:row-start-1 md:row-span-2 relative">
                            <div className="absolute top-0 left-0 w-full h-full bg-black-rgba z-50 rounded-lg flex items-center justify-center">
                                <button className="btn btn-primary">
                                    <span className="loading loading-spinner"></span>
                                    Waiting for player
                                </button>
                            </div>

                            <Chessboard />
                        </div>
                    )}

                    {roomStatus === ROOM_STATUS.READY && (
                        <div className="bg-base-200 p-2 rounded-lg shadow-md w-full max-w-sm md:max-w-full md:col-start-1 md:row-start-1 md:row-span-2 relative">
                            <div className="absolute top-0 left-0 w-full h-full bg-black-rgba z-50 rounded-lg flex items-center justify-center">
                                {authId === roomInfo.host.id.toString() && (
                                    <button
                                        className="btn btn-primary"
                                        onClick={handleInvokeStartGame}
                                    >
                                        Start game
                                    </button>
                                )}
                                {authId === roomInfo.player!.id.toString() && (
                                    <button className="btn btn-primary">
                                        Waiting for host to start
                                    </button>
                                )}
                            </div>

                            <Chessboard />
                        </div>
                    )}

                    {roomStatus === ROOM_STATUS.STARTED && (
                        <div className="bg-base-200 p-2 rounded-lg shadow-md w-full max-w-sm md:max-w-full md:col-start-1 md:row-start-1 md:row-span-2">
                            <Chessboard />
                        </div>
                    )}

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
