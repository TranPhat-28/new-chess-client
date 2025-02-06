import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { GetAuthNameFromToken } from "../../utilities";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import SignalRContext from "../../contexts/SignalRContext";

const MultiplayerRoomSetupPage = () => {
    const token = useSelector((state: RootState) => state.auth.token);
    const [name, setName] = useState<string>("");
    const [isPublicRoom, setIsPublicRoom] = useState<boolean>(true);
    const [roomPassword, setRoomPassword] = useState<string>("");

    const { gameLobbyConnectionHubProvider } = useContext(SignalRContext);

    const createRoomHandler = async () => {
        if (!isPublicRoom) {
            toast.error("This feature will be implemented soon");
        } else {
            const roomId = await gameLobbyConnectionHubProvider?.createGameRoom(
                isPublicRoom,
                roomPassword
            );
            toast.success(`Room ${roomId} created`);
        }
    };

    useEffect(() => {
        if (token) {
            const nameFromToken = GetAuthNameFromToken(token);
            setName(nameFromToken);
        }
    }, []);

    return (
        <div className="h-full w-full flex flex-col justify-center items-center bg-subtle object-contain p-4">
            <div className="bg-gray-100 text-black p-4 flex flex-col items-center rounded-lg w-full max-w-lg shadow-md">
                <h1 className="text-xl sm:text-2xl font-bold text-center mb-0">
                    Room Settings
                </h1>
                <p>Setup a new multiplayer room</p>

                <div className="join w-3/4 mt-6">
                    <button className="join-item btn w-1/4">Host</button>
                    <select className="join-item select select-bordered w-3/4">
                        <option selected disabled>
                            {name}
                        </option>
                    </select>
                </div>
                <div className="join w-3/4 mt-2">
                    <button className="join-item btn w-1/4">Type</button>
                    <select
                        className="join-item select select-bordered w-full"
                        value={isPublicRoom ? "Public" : "Private"}
                        defaultValue={"Public"}
                        onChange={(e) =>
                            setIsPublicRoom(e.target.value === "Public")
                        }
                    >
                        <option value="Public">Public</option>
                        <option value="Private">Private</option>
                    </select>
                </div>
                {!isPublicRoom && (
                    <input
                        type="text"
                        placeholder="Password"
                        value={roomPassword}
                        className="input input-bordered w-3/4 mt-2"
                        onChange={(e) => setRoomPassword(e.target.value)}
                    />
                )}

                <button
                    className="btn btn-primary mt-8"
                    onClick={createRoomHandler}
                >
                    Create Room
                </button>
            </div>
        </div>
    );
};

export default MultiplayerRoomSetupPage;
