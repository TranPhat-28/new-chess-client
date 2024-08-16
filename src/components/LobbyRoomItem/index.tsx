import { FaGlobeAmericas } from "react-icons/fa";
import { IOnlineRoomInfo } from "../../interfaces";
import { FaLock } from "react-icons/fa6";

const LobbyRoomItem = ({ roomInfo }: { roomInfo: IOnlineRoomInfo }) => {
    return (
        <div className="bg-base-200 flex-shrink-0 flex justify-between p-4">
            <div>
                <p className="font-bold text-xl">Room {roomInfo.id}</p>
                <p>Host by {roomInfo.host}</p>
                <div className="mt-2 flex gap-2 text-gray-400">
                    {roomInfo.isPrivate === false && <FaGlobeAmericas />}
                    {roomInfo.isPrivate === true && <FaLock />}
                    <span  className="text-sm">{roomInfo.isPrivate ? "Private" : "Public"}</span>
                </div>
            </div>
            <div className="flex items-center">
                <button
                    className={`btn btn-primary ${
                        roomInfo.isFull ? "btn-disabled" : "btn-outline"
                    } h-fit`}
                >
                    Join
                </button>
            </div>
        </div>
    );
};

export default LobbyRoomItem;
