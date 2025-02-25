import { useContext, useEffect, useState } from "react";
import { FaRegSadCry } from "react-icons/fa";
import { FaChess } from "react-icons/fa6";
import { HiUsers } from "react-icons/hi";
import { RiRobot2Fill } from "react-icons/ri";
import { TbMoodSadSquint } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import LobbyRoomItem from "../../components/LobbyRoomItem";
import SignalRContext from "../../contexts/SignalRContext";
import { IOnlineRoomInfo } from "../../interfaces";
import { showCustomAlert } from "../../utilities";

const LobbyPage = () => {
    const { gameLobbyConnectionHubProvider } = useContext(SignalRContext);

    const navigate = useNavigate();
    // Room list - live data
    const [roomList, setRoomList] = useState<IOnlineRoomInfo[] | null>(null);

    const showTutorial = (
        title: string,
        content: string,
        navigateTo: string
    ) => {
        showCustomAlert(
            title,
            content,
            "Play",
            () => navigate(navigateTo),
            undefined,
            <div className="mb-2">
                <FaChess size={"5rem"} color={"violet"} />
            </div>,
            false
        );
    };

    useEffect(() => {
        if (!gameLobbyConnectionHubProvider) {
            toast.error("Hub is not initialized");
            console.log("[GameLobyHub] Hub is not initialized");
        } else {
            gameLobbyConnectionHubProvider
                .fetchLobbyList()
                .then((data) => {
                    if (data) {
                        setRoomList(data);
                    } else {
                        throw new Error("Room list data is null");
                    }
                })
                .catch((error) => {
                    console.error("Error:", error);
                    toast.error("Failed to fetch some data");
                });
        }
    }, [gameLobbyConnectionHubProvider]);

    useEffect(() => {
        // Setup hub listener
        if (!gameLobbyConnectionHubProvider) {
            toast.error("Hub is not initialized");
            console.log("[GameLobbyHub] Hub is not initialized");
        } else {
            if (!gameLobbyConnectionHubProvider.connection) {
                toast.error(
                    "Cannot establish hub connection. Some data will be unavailable"
                );
                console.log("[GameLobbyHub] No hub connection found ");
            } else {
                // Define the callback
                const handleUpdateLobbyList = (gameList: IOnlineRoomInfo[]) => {
                    setRoomList(gameList);
                };

                // Register the callback
                gameLobbyConnectionHubProvider.connection.on(
                    "LobbyListUpdated",
                    handleUpdateLobbyList
                );

                // Remove the callback
                return () => {
                    gameLobbyConnectionHubProvider.connection?.off(
                        "LobbyListUpdated",
                        handleUpdateLobbyList
                    );
                };
            }
        }
    }, []);

    return (
        <div className="page-content-wrapper">
            <div className="page-preset flex flex-col justify-center items-center overflow-hidden">
                {/* The Online room list */}
                <div className="w-full bg-base-100 rounded-lg flex-1 flex flex-col overflow-hidden">
                    <p className="text-2xl p-4 border-gray-300 border-b-2">
                        Multiplayer lobby
                    </p>

                    <div className="bg-base-300 w-full h-full flex flex-col overflow-y-scroll">
                        {/* Error cannot fetch live data */}
                        {roomList === null && (
                            <div className="m-auto flex flex-col items-center">
                                <FaRegSadCry size={"6rem"} color={"#9ca3af"} />
                                <p className="text-gray-400 mt-2">
                                    Something went wrong
                                </p>
                            </div>
                        )}
                        {/* No room */}
                        {roomList && roomList.length === 0 && (
                            <div className="m-auto flex flex-col items-center">
                                <TbMoodSadSquint
                                    size={"6rem"}
                                    color={"#9ca3af"}
                                />
                                <p className="text-gray-400 mt-2">
                                    Wow, so empty
                                </p>
                            </div>
                        )}
                        {/* Room list */}
                        {roomList &&
                            roomList.length > 0 &&
                            roomList.map((room) => (
                                <LobbyRoomItem key={room.id} roomInfo={room} />
                            ))}
                    </div>

                    {/* <div className="join w-full rounded-t-none">
                        <input
                            className="input input-bordered join-item w-full rounded-t-none rounded-lg"
                            placeholder="Room ID"
                        />
                        <button className="btn btn-primary join-item rounded-t-none rounded-lg">
                            Join
                        </button>
                    </div> */}
                </div>

                {/* Actions */}
                <div className="w-full bg-base-100 rounded-lg flex flex-col overflow-hidden">
                    <p className="text-2xl p-4">Start a game</p>

                    <div className="w-full flex p-4 pt-0 gap-4">
                        <button
                            className="btn glass bg-primary btn-outline flex-1 flex flex-col md:flex-row-reverse h-24"
                            onClick={() =>
                                showTutorial(
                                    "Practice mode",
                                    "Practice your chess skill with the Stockfish chess bot",
                                    "/practice/loading"
                                )
                            }
                        >
                            Practice mode
                            <RiRobot2Fill size={"3rem"} />
                        </button>
                        <button
                            className="btn glass bg-primary btn-outline flex-1 flex flex-col md:flex-row-reverse h-24"
                            onClick={() =>
                                showTutorial(
                                    "Host a room",
                                    "Host an online room for to play with your friend",
                                    "/multiplayer/setup"
                                )
                            }
                        >
                            Online mode
                            <HiUsers size={"3rem"} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LobbyPage;
