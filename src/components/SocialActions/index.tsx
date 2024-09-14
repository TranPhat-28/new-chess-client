import axios from "axios";
import { IRelationshipStatus } from "../../interfaces";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { RootState } from "../../redux/store";
import { useSelector } from "react-redux";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { useState } from "react";

const SocialActions = ({ data }: { data: IRelationshipStatus }) => {
    // Manage buttons using this state instead
    const [internalState, setInternalState] =
        useState<IRelationshipStatus>(data);

    // Manage buttons loading state
    const [loading, setLoading] = useState<boolean>(false);

    // Token
    const token = useSelector((state: RootState) => state.auth.token);
    const { id } = useParams();

    // Action handlers for each button
    const goToChatAction = () => {
        toast.success("Go to chat");
    };

    const removeFriendAction = () => {
        axios
            .delete("/api/Social/Friend")
            .then((response) => {
                toast.success(response.data.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const addFriendAction = () => {
        setLoading(true);

        axios
            .post(
                "/api/Social/Request",
                { socialId: id },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )
            .then((response) => {
                if (response.data.isSuccess) {
                    toast.success(response.data.message);
                    // Set new internal state
                    const currentState = internalState;
                    currentState.isRequestSender = true;
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

    const acceptRequestAction = () => {
        axios
            .post("/api/Social/Request/Accept")
            .then((response) => {
                toast.success(response.data.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const cancelRequestAction = () => {
        axios
            .post("/api/Social/Request/Cancel")
            .then((response) => {
                toast.success(response.data.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <div className="flex flex-col w-full gap-4">
            {/* Notification Badge */}
            {internalState && internalState.isRequestSender && (
                <div className="w-full bg-base-200 rounded-lg flex p-2">
                    <IoMdInformationCircleOutline />
                    <span className="text-xs ml-4">
                        Friend request sent to this player
                    </span>
                </div>
            )}
            {internalState && internalState.isRequestReceiver && (
                <div className="w-full bg-base-200 rounded-lg flex p-2">
                    <IoMdInformationCircleOutline />
                    <span className="text-xs ml-4">
                        New friend request from this player
                    </span>
                </div>
            )}

            {/* Action buttons container */}
            <div className="w-full flex gap-4">
                {internalState.isFriend === true && (
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
                            Remove friend
                        </button>
                    </>
                )}

                {internalState.isFriend === false && (
                    <button className="btn btn-primary btn-disabled flex-1">
                        Add friend to chat
                    </button>
                )}

                {internalState.isRequestSender === true && (
                    <button
                        className="btn btn-error btn-outline flex-1"
                        onClick={cancelRequestAction}
                    >
                        Cancel request
                    </button>
                )}

                {internalState.isRequestReceiver === true && (
                    <button
                        className="btn btn-primary btn-outline flex-1"
                        onClick={acceptRequestAction}
                    >
                        Accept request
                    </button>
                )}

                {internalState.isRequestSender === false &&
                    internalState.isRequestReceiver === false &&
                    internalState.isFriend === false && (
                        <button
                            className="btn btn-primary btn-outline flex-1"
                            onClick={addFriendAction}
                        >
                            {loading && (
                                <span className="loading loading-spinner"></span>
                            )}
                            Add friend
                        </button>
                    )}
            </div>
        </div>
    );
};

export default SocialActions;
