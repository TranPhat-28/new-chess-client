import { FaGlobeAmericas } from "react-icons/fa";
import { IOnlineRoomInfo } from "../../interfaces";
import { FaLock } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const LobbyRoomItem = ({ roomInfo }: { roomInfo: IOnlineRoomInfo }) => {
    const navigate = useNavigate();

    const joinRoomHandler = () => {
        navigate(`/multiplayer/${roomInfo.id}`);
    };

    return (
        <div className="bg-base-200 flex-shrink-0 flex justify-between p-4">
            <div>
                <p className="font-bold text-xl">Room {roomInfo.id}</p>
                <p>Host by {roomInfo.host.name}</p>
                <div className="mt-2 flex gap-2 text-gray-400">
                    {roomInfo.isPrivate === false && <FaGlobeAmericas />}
                    {roomInfo.isPrivate === true && <FaLock />}
                    <span className="text-sm">
                        {roomInfo.isPrivate ? "Private" : "Public"}
                    </span>
                </div>
            </div>
            <div className="flex items-center">
                {!roomInfo.isPlaying && (
                    <button
                        onClick={joinRoomHandler}
                        className={`btn btn-primary ${
                            roomInfo.host && roomInfo.player
                                ? "btn-disabled"
                                : "btn-outline"
                        } h-fit w-16`}
                    >
                        {roomInfo.host && roomInfo.player ? "Full" : "Join"}
                    </button>
                )}
                {roomInfo.isPlaying && (
                    <button className="btn btn-primary btn-disabled h-fit w-16">
                        Playing
                    </button>
                )}
            </div>
        </div>
    );
};

export default LobbyRoomItem;
