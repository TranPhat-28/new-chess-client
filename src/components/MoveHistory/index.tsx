import { MdHistory } from "react-icons/md";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const MoveHistory = () => {
    // Game history
    const history = useSelector((state: RootState) => state.quickplay.history);

    return (
        <div className="w-full flex-1 flex shadow-md p-2 bg-base-200 rounded-lg">
            <div className="flex-1">
                {history.length === 0
                    ? "Make a move to start"
                    : `Last move: ${history[history.length - 1]?.move}`}
            </div>
            <button className="btn btn-outline btn-ghost btn-square h-full">
                <MdHistory size={"20px"} />
            </button>
        </div>
    );
};

export default MoveHistory;
