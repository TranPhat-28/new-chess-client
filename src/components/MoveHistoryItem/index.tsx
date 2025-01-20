import { IMove } from "../../interfaces";

const MoveHistoryItem = ({
    move,
    largeScreen,
}: {
    move: IMove;
    largeScreen?: boolean;
}) => {
    return (
        <div
            className={`m-1 p-1 ${
                largeScreen ? "hidden lg:flex" : ""
            } rounded-lg flex items-center justify-center ${
                move.side === "black"
                    ? "bg-black text-white"
                    : "bg-white text-black"
            }`}
        >
            {move.move}
        </div>
    );
};

export default MoveHistoryItem;
