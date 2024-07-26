import { IMove } from "../../interfaces";

const MoveHistoryItem = ({
    move,
    moveNo,
    responsiveItem,
}: {
    move: IMove;
    moveNo: number;
    responsiveItem: boolean;
}) => {
    return (
        <div
            className={`${
                move.side === "black"
                    ? "bg-black text-white"
                    : "bg-white text-black"
            } p-1 rounded-lg shadow-sm text-xs lg:text-base flex items-center ${responsiveItem ? "hidden lg:flex" : ""}`}
        >
            Move {moveNo}: {move.move}
        </div>
    );
};

export default MoveHistoryItem;
