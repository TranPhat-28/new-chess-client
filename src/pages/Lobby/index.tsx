import { confirmAlert } from "react-confirm-alert";
import { FaChess } from "react-icons/fa6";
import LobbyRoomItem from "../../components/LobbyRoomItem";
import { IOnlineRoomInfo } from "../../interfaces";
import { showCustomAlert } from "../../utilities";
import JoinOnlineRoomAlert from "../../components/JoinOnlineRoomAlert";

const LobbyPage = () => {
    const roomList: IOnlineRoomInfo[] = [
        { id: 1, host: "John", isPrivate: false, isFull: true },
        { id: 2, host: "Kate", isPrivate: false, isFull: false },
        { id: 3, host: "Pete", isPrivate: false, isFull: false },
        { id: 4, host: "John", isPrivate: false, isFull: false },
        { id: 5, host: "Smith", isPrivate: true, isFull: true },
        { id: 6, host: "Will", isPrivate: false, isFull: false },
        { id: 7, host: "John", isPrivate: false, isFull: false },
        { id: 8, host: "Kate", isPrivate: true, isFull: false },
        { id: 9, host: "Jimmy", isPrivate: false, isFull: false },
        { id: 10, host: "Beast", isPrivate: false, isFull: false },
        { id: 11, host: "Josh", isPrivate: false, isFull: false },
    ];

    const showTutorial = (title: string, content: string) => {
        showCustomAlert(
            title,
            content,
            "Play",
            undefined,
            undefined,
            <div className="mb-2">
                <FaChess size={"5rem"} color={"violet"} />
            </div>,
            false
        );
    };

    const showInputRoomId = () => {
        confirmAlert({
            overlayClassName: "bg-overlay-important",
            closeOnClickOutside: false,
            customUI: ({ onClose }) => {
                return <JoinOnlineRoomAlert onClose={onClose} />;
            },
        });
    };

    return (
        <div className="h-full w-full p-2 md:p-4 gap-2 md:gap-4 flex flex-col max-w-lg md:max-w-xl lg:max-w-5xl self-center justify-center overflow-hidden">
            {/* The Online room list */}
            <div className="w-full bg-base-300 p-2 md:p-4 rounded-lg flex-1 lg:max-h-[52rem] flex flex-col gap-2 overflow-hidden">
                <p className="font-bold text-2xl">Multiplayer lobby</p>

                <div className="bg-gray-300 p-2 rounded-lg w-full h-full flex flex-col gap-2 overflow-y-scroll">
                    {roomList.length > 0 &&
                        roomList.map((room) => (
                            <LobbyRoomItem key={room.id} roomInfo={room} />
                        ))}
                </div>
            </div>

            {/* Actions */}
            <div className="w-full bg-base-300 p-2 md:p-4 rounded-lg flex flex-col gap-2">
                <p className="font-bold text-2xl">Start a game now</p>
                <button
                    className="btn btn-primary"
                    onClick={() =>
                        showTutorial(
                            "Practice mode",
                            "Practice your chess skill with the Stockfish chess bot"
                        )
                    }
                >
                    Practice mode
                </button>
                <div className="w-full flex gap-2">
                    <button
                        className="btn btn-primary flex-1"
                        onClick={() =>
                            showTutorial(
                                "Host a room",
                                "Host an online room for to play with your friend"
                            )
                        }
                    >
                        Online mode
                    </button>
                    <button
                        className="btn btn-primary btn-outline flex-1"
                        onClick={showInputRoomId}
                    >
                        Join room with ID
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LobbyPage;
