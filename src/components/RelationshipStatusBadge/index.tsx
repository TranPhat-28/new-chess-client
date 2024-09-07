import { FaUserTimes } from "react-icons/fa";
import { FaUserCheck } from "react-icons/fa6";

const RelationshipStatusBadge = ({ isFriend }: { isFriend: boolean }) => {
    return (
        <div className="bg-base-100 flex gap-2 p-2 rounded-lg shadow-md mt-2 w-fit">
            {isFriend && (
                <>
                    <FaUserCheck color={"green"} />
                    <span className="text-green-500">Friend</span>
                </>
            )}
            {!isFriend && (
                <>
                    <FaUserTimes color={"red"} />
                    <span className="text-red-500">NOT friend</span>
                </>
            )}
        </div>
    );
};

export default RelationshipStatusBadge;
