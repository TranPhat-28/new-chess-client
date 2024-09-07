import { IRelationshipStatus } from "../../interfaces";

const SocialActions = ({ data }: { data: IRelationshipStatus }) => {
    return (
        <div className="flex w-full gap-4">
            {data.isFriend === true && (
                <>
                    <button className="btn btn-primary btn-outline flex-1">
                        Go to chat
                    </button>

                    <button className="btn btn-primary btn-error flex-1">
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
                <button className="btn btn-error btn-outline flex-1">
                    Cancel request
                </button>
            )}

            {data.isRequestReceiver === true && (
                <button className="btn btn-primary btn-outline flex-1">
                    Accept request
                </button>
            )}

            {data.isRequestSender === false &&
                data.isRequestReceiver === false &&
                data.isFriend === false && (
                    <button className="btn btn-primary btn-outline flex-1">
                        Add friend
                    </button>
                )}
        </div>
    );
};

export default SocialActions;
