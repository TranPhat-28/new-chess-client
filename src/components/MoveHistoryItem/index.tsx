import { IMove } from "../../interfaces";

const MoveHistoryItem = ({ move }: { move: IMove }) => {
    return (
        <div
            className={`m-1 rounded-lg flex items-center justify-center ${
                move.side === "black"
                    ? "bg-black text-white"
                    : "bg-white text-black border border-black"
            }`}
        >
            {move.move}
        </div>
    );
};

export default MoveHistoryItem;
