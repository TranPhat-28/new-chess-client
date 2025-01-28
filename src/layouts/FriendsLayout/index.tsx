import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { FaRegSadCry, FaSearch } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { HashLoader } from "react-spinners";
import { toast } from "react-toastify";
import { IFriendDetailShort } from "../../interfaces";
import { RootState } from "../../redux/store";
import SignalRContext from "../../contexts/SignalRContext";

const FriendsLayout = () => {
    // Access token
    const token = useSelector((state: RootState) => state.auth.token);

    // Context Signal R
    const { mainConnectionHubProvider } = useContext(SignalRContext);

    // Loading
    const [loading, setLoading] = useState<boolean>(true);

    // List of friends - static data
    const [friendList, setFriendList] = useState<IFriendDetailShort[] | null>(
        null
    );

    // Friend online statuses - live data
    const [onlineFriends, setOnlineFriends] = useState<number[] | null>(null);

    // Navigation ID for reloading
    const [navigateId, setNavigateId] = useState<number>(0);

    useEffect(() => {
        // Perform static friend list fetch and initial hub fetch for latest data
        axios
            .get("/api/Friends", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                setFriendList(response.data.data);

                if (!mainConnectionHubProvider) {
                    toast.error("Hub is not initialized");
                    console.log("[MainConnectionHub] Hub is not initialized");
                    return Promise.resolve(null);
                } else {
                    return mainConnectionHubProvider.fetchOnlinePlayers();
                }
            })
            .then((data) => {
                setOnlineFriends(data); // Set the online users after fetching from the hub
            })
            .catch((error) => {
                console.error("Error:", error);
                toast.error("Failed to fetch some data");
            })
            .finally(() => {
                setLoading(false);
            });

        // Setup hub listener
        if (!mainConnectionHubProvider) {
            toast.error("Hub is not initialized");
            console.log("[MainConnectionHub] Hub is not initialized");
        } else {
            if (!mainConnectionHubProvider.connection) {
                toast.error(
                    "Cannot establish hub connection. Some data will be unavailable"
                );
                console.log("[MainConnectionHub] No hub connection found ");
            } else {
                // Define the callback
                const handleOnlineUsers = (playersList: number[]) => {
                    setOnlineFriends(playersList);
                };

                // Register the callback
                mainConnectionHubProvider.connection.on(
                    "GetOnlineUsers",
                    handleOnlineUsers
                );

                // Remove the callback
                return () => {
                    mainConnectionHubProvider.connection?.off(
                        "GetOnlineUsers",
                        handleOnlineUsers
                    );
                };
            }
        }
    }, [navigateId, token, mainConnectionHubProvider]);

    return (
        <div className="page-content-wrapper">
            <div className="page-preset flex flex-col lg:flex-row justify-center items-center overflow-hidden">
                {/* Search result list */}
                <div className="h-3/5 lg:h-full w-full bg-base-100 rounded-lg flex flex-col overflow-hidden">
                    <p className="text-2xl p-4 border-gray-300 border-b-2">
                        Your friends
                    </p>

                    <div className="bg-base-300 w-full h-full flex flex-col overflow-y-scroll">
                        {/* Loading */}
                        {loading && (
                            <div className="w-full h-full flex justify-center items-center">
                                <HashLoader />
                            </div>
                        )}

                        {/* No friend */}
                        {friendList && friendList.length === 0 && (
                            <div className="w-full h-full flex flex-col justify-center items-center">
                                <FaRegSadCry size={"6rem"} color={"#9ca3af"} />
                                <p className="text-gray-400 mt-2">
                                    You have no friends
                                </p>
                            </div>
                        )}

                        {/* Result */}
                        {friendList &&
                            friendList.map((friend) => (
                                <ResultItem key={friend.id} data={friend} />
                            ))}
                    </div>
                </div>

                {/* Profile */}
                <Outlet
                    context={{ navigateId, setNavigateId, onlineFriends }}
                />
            </div>
        </div>
    );
};

export default FriendsLayout;

const ResultItem = ({ data }: { data: IFriendDetailShort }) => {
    const navigate = useNavigate();
    const handleViewDetailClick = () => {
        navigate(`/main/friends/${data.id}`);
    };

    return (
        <div className="bg-base-200 flex-shrink-0 flex justify-between p-4">
            <div className="flex items-center">
                <div className="avatar">
                    <div className="w-10 rounded-full">
                        <img src={data.picture} />
                    </div>
                </div>

                <p className="text-xl font-medium ml-2">{data.name}</p>
            </div>
            <div className="flex items-center">
                <button
                    className={"btn btn-primary btn-outline h-fit"}
                    onClick={handleViewDetailClick}
                >
                    <FaSearch />
                </button>
            </div>
        </div>
    );
};
