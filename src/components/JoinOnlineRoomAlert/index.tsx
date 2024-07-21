import { useState } from "react";
import { FaLock, FaMagnifyingGlass } from "react-icons/fa6";

const JoinOnlineRoomAlert = ({ onClose }: { onClose: () => void }) => {
    const [requirePassword, setRequirePassword] = useState<boolean>(false);
    const [roomPassword, setRoomPassword] = useState<string>("");

    return (
        <div className="bg-base-100 p-4 rounded-lg absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-11/12 max-w-lg flex flex-col gap-2 form-control">
            <h3 className="font-bold text-lg">Join room</h3>

            <label className="input input-bordered flex items-center gap-2">
                <FaMagnifyingGlass />
                <input
                    type="text"
                    className="grow"
                    placeholder="Enter room ID"
                />
            </label>

            <label className="input input-bordered flex items-center gap-2">
                <FaLock />
                <input
                    type="text"
                    className="grow"
                    placeholder="Password"
                    value={roomPassword}
                    onChange={(e) => setRoomPassword(e.target.value)}
                    disabled={!requirePassword}
                />
            </label>

            <label className="label cursor-pointer">
                <span className="label-text">Require password</span>
                <input
                    type="checkbox"
                    className="checkbox"
                    onClick={() => setRequirePassword(!requirePassword)}
                />
            </label>

            <div className="self-end">
                <button className="btn btn-primary" onClick={onClose}>
                    Join
                </button>

                <button className="btn ml-2" onClick={onClose}>
                    Cancel
                </button>
            </div>
        </div>
    );
};

export default JoinOnlineRoomAlert;
