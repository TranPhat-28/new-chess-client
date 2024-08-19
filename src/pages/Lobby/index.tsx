// import { confirmAlert } from "react-confirm-alert";
import { FaChess } from "react-icons/fa6";
import LobbyRoomItem from "../../components/LobbyRoomItem";
import { IOnlineRoomInfo } from "../../interfaces";
import { showCustomAlert } from "../../utilities";
// import JoinOnlineRoomAlert from "../../components/JoinOnlineRoomAlert";
import { RiRobot2Fill } from "react-icons/ri";
import { HiUsers } from "react-icons/hi";

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

    // const showInputRoomId = () => {
    //     confirmAlert({
    //         overlayClassName: "bg-overlay-important",
    //         closeOnClickOutside: false,
    //         customUI: ({ onClose }) => {
    //             return <JoinOnlineRoomAlert onClose={onClose} />;
    //         },
    //     });
    // };

    return (
        <div className="page-content-wrapper">
            <div className="page-preset flex flex-col justify-center items-center overflow-hidden">
                {/* The Online room list */}
                <div className="w-full bg-base-100 rounded-lg flex-1 flex flex-col overflow-hidden">
                    <p className="text-2xl p-4 border-gray-300 border-b-2">
                        Multiplayer lobby
                    </p>

                    <div className="bg-base-300 w-full h-full flex flex-col overflow-y-scroll">
                        {roomList.length > 0 &&
                            roomList.map((room) => (
                                <LobbyRoomItem key={room.id} roomInfo={room} />
                            ))}
                    </div>

                    <div className="join w-full rounded-t-none">
                        <input
                            className="input input-bordered join-item w-full"
                            placeholder="Room ID"
                        />
                        <button className="btn btn-primary join-item">
                            Join
                        </button>
                    </div>
                </div>

                {/* Actions */}
                <div className="w-full bg-base-100 rounded-lg flex flex-col overflow-hidden">
                    <p className="text-2xl p-4">
                        Start a game
                    </p>

                    <div className="w-full flex p-4 pt-0 gap-4">
                        <button
                            className="btn glass bg-primary btn-outline flex-1 flex flex-col md:flex-row-reverse h-24"
                            onClick={() =>
                                showTutorial(
                                    "Practice mode",
                                    "Practice your chess skill with the Stockfish chess bot"
                                )
                            }
                        >
                            Practice mode
                            <RiRobot2Fill size={"3rem"} />
                        </button>
                        <button
                            className="btn glass bg-primary btn-outline flex-1 flex flex-col md:flex-row-reverse h-24"
                            onClick={() =>
                                showTutorial(
                                    "Host a room",
                                    "Host an online room for to play with your friend"
                                )
                            }
                        >
                            Online mode
                            <HiUsers size={"3rem"} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LobbyPage;
