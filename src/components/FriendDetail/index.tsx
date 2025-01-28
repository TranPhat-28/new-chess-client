import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import { HashLoader } from "react-spinners";
import { RootState } from "../../redux/store";
import { toast } from "react-toastify";
import { IFriendDetailFull, IFriendOutletContext } from "../../interfaces";
import { FaRegSadCry } from "react-icons/fa";

const FriendDetail = () => {
    const { navigateId, setNavigateId, onlineFriends } =
        useOutletContext<IFriendOutletContext>();
    const { id } = useParams();
    const token = useSelector((state: RootState) => state.auth.token);
    const navigate = useNavigate();

    const [loading, setLoading] = useState<boolean>(false);
    const [btnLoading, setBtnLoading] = useState<boolean>(false);
    const [data, setData] = useState<IFriendDetailFull | null>(null);
    const [error, setError] = useState<boolean>(false);

    useEffect(() => {
        // Fetch corresponding player
        setData(null);
        setLoading(true);
        setError(false);

        axios
            .get(`/api/Friends/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                setData(response.data.data);
            })
            .catch((error) => {
                toast.error(error.message);
                console.error(error);
                setError(true);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [id]);

    const goToChatHandler = () => {
        alert("Go to chat");
    };

    const removeFriendHandler = () => {
        setBtnLoading(true);
        axios
            .delete(`/api/Social/Friend/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                toast.success(response.data.message);

                setNavigateId(navigateId + 1);
                navigate("/main/friends");
            })
            .catch((error) => {
                toast.error("Cannot perform this action now");
                console.log(error);
            })
            .finally(() => {
                setBtnLoading(false);
            });
    };

    return (
        <div className="h-2/5 lg:h-full w-full bg-base-100 rounded-lg flex flex-col gap-2 lg:gap-4 p-4 items-center justify-center">
            {loading && (
                <>
                    <HashLoader />
                    <p className="text-gray-500 mt-2">Just a moment</p>
                </>
            )}

            {error && (
                <>
                    <FaRegSadCry size={"6rem"} color={"#9ca3af"} />
                    <p className="text-gray-400 mt-2">Something went wrong</p>
                </>
            )}

            {data && (
                <>
                    <div className="flex w-full bg-base-200 rounded-lg">
                        <div className="avatar p-4">
                            <div className="ring-primary ring-offset-base-100 w-24 rounded-full ring ring-offset-2">
                                <img src={data.picture} />
                            </div>
                        </div>

                        <div className="flex flex-col justify-center">
                            <p className="font-bold md:text-xl lg:text-2xl ps-1">
                                {data.name}
                            </p>
                            <p className="ps-1">Rank {data.rank}</p>
                            <div className="px-2 mt-2 flex gap-2 bg-base-100 shadow-lg rounded-lg items-center w-fit">
                                {/* If not loaded, status should be unknown */}
                                {onlineFriends === null && (
                                    <span className="text-sm">Unknown</span>
                                )}
                                {/* Display online status badge */}
                                {onlineFriends !== null &&
                                    data !== null &&
                                    onlineFriends.includes(
                                        data.name.trim()
                                    ) && (
                                        <>
                                            <div className="h-3 w-3 bg-green-500 animate-ping rounded-full"></div>
                                            <span className="text-sm">
                                                Online
                                            </span>
                                        </>
                                    )}
                                {/* Display offline status badge */}
                                {onlineFriends !== null &&
                                    data !== null &&
                                    !onlineFriends.includes(
                                        data.name.trim()
                                    ) && (
                                        <>
                                            <div className="h-3 w-3 bg-gray-500 rounded-full"></div>
                                            <span className="text-sm">
                                                Offline
                                            </span>
                                        </>
                                    )}
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col w-full gap-4">
                        <div className="w-full flex gap-4">
                            <button
                                className="btn btn-primary btn-outline flex-1"
                                onClick={goToChatHandler}
                            >
                                Go to chat
                            </button>

                            <button
                                className={`btn ${
                                    btnLoading ? "btn-disabled" : ""
                                } btn-error btn-outline flex-1`}
                                onClick={removeFriendHandler}
                            >
                                {btnLoading && (
                                    <span className="loading loading-spinner"></span>
                                )}
                                {btnLoading ? "" : "Remove friend"}
                            </button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default FriendDetail;
