import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { HashLoader } from "react-spinners";
import { RootState } from "../../redux/store";
import { IFriendDetailShort } from "../../interfaces";
import { FaRegSadCry, FaSearch } from "react-icons/fa";

const FriendsLayout = () => {
    const token = useSelector((state: RootState) => state.auth.token);
    const [loading, setLoading] = useState<boolean>(true);
    const [friendList, setFriendList] = useState<IFriendDetailShort[] | null>(
        null
    );

    useEffect(() => {
        axios
            .get("/api/Friends", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                console.log(response.data.data);
                setFriendList(response.data.data);
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

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
                <Outlet />
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
