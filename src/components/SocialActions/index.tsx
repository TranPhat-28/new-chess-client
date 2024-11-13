import axios from "axios";
import { useState } from "react";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { IFriendRequestAction, ISocialActionInternalState } from "../../interfaces";
import { RootState } from "../../redux/store";
import { GetAuthIdFromToken } from "../../utilities";

const SocialActions = ({
    target,
    isFriend,
    data,
    setBadge
}: {
    target: number;
    isFriend: boolean;
    data: IFriendRequestAction | null;
    setBadge: (value: boolean) => void
}) => {
    // Manage buttons loading state
    const [loading, setLoading] = useState<boolean>(false);
    // Internal State
    const [internalState, setInternalState] = useState<ISocialActionInternalState>({
        data: data,
        isFriend: isFriend,
    });

    // Token
    const token = useSelector((state: RootState) => state.auth.token);

    // Action handlers for each button
    const goToChatAction = () => {
        toast.success("Go to chat");
    };

    // Re-checked
    const removeFriendAction = () => {
        setLoading(true);
        axios
            .delete(`/api/Social/Friend/${target}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                toast.success(response.data.message);

                const currentState = internalState;
                currentState.data = null;
                currentState.isFriend = false;

                setInternalState(currentState);
                setBadge(false);
            })
            .catch((error) => {
                toast.error(error.message);
                console.log(error);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    // Re-worked
    const addFriendAction = () => {
        setLoading(true);

        axios
            .post(
                "/api/Social/Request",
                { id: target },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )
            .then((response) => {
                if (response.data.isSuccess) {
                    toast.success(response.data.message);

                    const userId = GetAuthIdFromToken(token!);

                    const newData = {
                        friendRequestId: response.data.data.id,
                        isReceiver:
                            response.data.data.receiverId.toString().trim() ===
                            userId.toString().trim(),
                        isSender:
                            response.data.data.senderId.toString().trim() ===
                            userId.toString().trim(),
                    };

                    const currentState = internalState;
                    currentState.data = newData;

                    setInternalState(currentState);
                } else {
                    toast.error(response.data.message);
                }
            })
            .catch((error) => {
                toast.error(error.message);
                console.log(error);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    // Re-checked
    const acceptRequestAction = () => {
        if (!internalState.data) {
            toast.error("Cannot perform the action");
            console.log("Friend Request ID is missing");
            return;
        }
        setLoading(true);

        axios
            .put(
                `/api/Social/Request/${internalState.data.friendRequestId}/Accept`,
                undefined,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )
            .then((response) => {
                toast.success(response.data.message);

                const currentState = internalState;

                currentState.data = null;
                currentState.isFriend = true;
                setInternalState(currentState);
                setBadge(true);
            })
            .catch((err) => {
                toast.error("Something went wrong");
                console.log(err);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    // Re-checked
    const cancelRequestAction = () => {
        if (!internalState.data) {
            toast.error("Cannot perform this action");
            console.log("Friend request ID is missing");
            return;
        }

        setLoading(true);
        axios
            .delete(`/api/Social/Request/${internalState.data.friendRequestId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                if (response.data.isSuccess) {
                    toast.success(response.data.message);
                    // Set new internal state
                    const currentState = internalState;
                    currentState.data = null;

                    setInternalState(currentState);
                } else {
                    toast.error(response.data.message);
                }
            })
            .catch((error) => {
                toast.error(error.message);
                console.log(error);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return (
        <div className="flex flex-col w-full gap-4">
            {/* Notification Badge */}
            {internalState && internalState.data?.isSender && (
                <div className="w-full bg-base-200 rounded-lg flex p-2">
                    <IoMdInformationCircleOutline />
                    <span className="text-xs ml-4">
                        Friend request sent to this player
                    </span>
                </div>
            )}
            {internalState && internalState.data?.isReceiver && (
                <div className="w-full bg-base-200 rounded-lg flex p-2">
                    <IoMdInformationCircleOutline />
                    <span className="text-xs ml-4">
                        New friend request from this player
                    </span>
                </div>
            )}

            {/* Action buttons container */}
            <div className="w-full flex gap-4">
                {internalState?.isFriend === true && (
                    <>
                        <button
                            className="btn btn-primary btn-outline flex-1"
                            onClick={goToChatAction}
                        >
                            Go to chat
                        </button>

                        <button
                            className="btn btn-primary btn-error flex-1"
                            onClick={removeFriendAction}
                        >
                            {loading && (
                                <span className="loading loading-spinner"></span>
                            )}
                            {loading ? "" : "Remove friend"}
                        </button>
                    </>
                )}

                {internalState?.isFriend === false && (
                    <button className="btn btn-primary btn-disabled flex-1">
                        Add friend to chat
                    </button>
                )}

                {internalState?.data?.isSender === true && (
                    <button
                        className="btn btn-error btn-outline flex-1"
                        onClick={cancelRequestAction}
                    >
                        {loading && (
                            <span className="loading loading-spinner"></span>
                        )}
                        {loading ? "" : "Cancel request"}
                    </button>
                )}

                {internalState?.data?.isReceiver === true && (
                    <button
                        className="btn btn-primary btn-outline flex-1"
                        onClick={acceptRequestAction}
                    >
                        {loading && (
                            <span className="loading loading-spinner"></span>
                        )}
                        {loading ? "" : "Accept request"}
                    </button>
                )}

                {internalState?.data === null && internalState?.isFriend === false && (
                    <button
                        className="btn btn-primary btn-outline flex-1"
                        onClick={addFriendAction}
                    >
                        {loading && (
                            <span className="loading loading-spinner"></span>
                        )}
                        {loading ? "" : "Add friend"}
                    </button>
                )}
            </div>
        </div>
    );
};

export default SocialActions;
