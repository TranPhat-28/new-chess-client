import axios from "axios";
import { IRelationshipStatus } from "../../interfaces";
import { toast } from "react-toastify";

const SocialActions = ({ data }: { data: IRelationshipStatus }) => {
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
        axios
            .post("/api/Social/Request/Send")
            .then((response) => {
                toast.success(response.data.data);
            })
            .catch((err) => {
                console.log(err);
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
        <div className="flex w-full gap-4">
            {data.isFriend === true && (
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

            {data.isFriend === false && (
                <button className="btn btn-primary btn-disabled flex-1">
                    Add friend to chat
                </button>
            )}

            {data.isRequestSender === true && (
                <button
                    className="btn btn-error btn-outline flex-1"
                    onClick={cancelRequestAction}
                >
                    Cancel request
                </button>
            )}

            {data.isRequestReceiver === true && (
                <button
                    className="btn btn-primary btn-outline flex-1"
                    onClick={acceptRequestAction}
                >
                    Accept request
                </button>
            )}

            {data.isRequestSender === false &&
                data.isRequestReceiver === false &&
                data.isFriend === false && (
                    <button
                        className="btn btn-primary btn-outline flex-1"
                        onClick={addFriendAction}
                    >
                        Add friend
                    </button>
                )}
        </div>
    );
};

export default SocialActions;
