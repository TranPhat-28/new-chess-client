import { FaGlobeAmericas } from "react-icons/fa";
import { IOnlineRoomInfo } from "../../interfaces";
import { FaLock } from "react-icons/fa6";

const LobbyRoomItem = ({ roomInfo }: { roomInfo: IOnlineRoomInfo }) => {
    return (
        <div className="collapse bg-base-200 rounded-lg shadow-md flex-shrink-0 flex justify-between p-2">
            <div>
                <p className="font-bold text-xl">Room {roomInfo.id}</p>
                <p>Host by {roomInfo.host}</p>
                <div className="mt-2 flex gap-2 text-gray-400">
                    {roomInfo.isPrivate === false && <FaGlobeAmericas />}
                    {roomInfo.isPrivate === true && <FaLock />}
                    <span>{roomInfo.isPrivate ? "Private" : "Public"}</span>
                </div>
            </div>
            <div>
                <button
                    className={`btn btn-primary ${
                        roomInfo.isFull ? "btn-disabled" : "btn-outline"
                    } h-full`}
                >
                    Join
                </button>
            </div>
        </div>
    );
};

export default LobbyRoomItem;
