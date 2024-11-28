import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { MdHistory } from "react-icons/md";
import MoveHistoryItem from "../MoveHistoryItem";

const MoveHistory = () => {
    // Game history
    const history = useSelector((state: RootState) => state.quickplay.history);

    return (
        <div className="p-2 rounded-lg bg-base-300 flex flex-1 md:flex-col md:gap-3">
            {/* Mobile version */}
            <div
                role="tablist"
                className="tabs tabs-lifted w-full md:hidden shadow-lg"
            >
                <input
                    type="radio"
                    name="my_tabs_2"
                    role="tab"
                    className="tab w-fit"
                    aria-label="Move history"
                />
                <div
                    role="tabpanel"
                    className="tab-content bg-base-100 border-base-300 rounded-lg p-2"
                >
                    {history.length === 0 && (
                        <p className="p-4">Make a move to start</p>
                    )}
                    {history.length > 0 && (
                        <div className="flex w-full h-full">
                            <div className="flex-1 grid grid-cols-4">
                                {history[history.length - 1] && (
                                    <MoveHistoryItem
                                        move={history[history.length - 1]}
                                    />
                                )}
                                {history[history.length - 2] && (
                                    <MoveHistoryItem
                                        move={history[history.length - 2]}
                                    />
                                )}
                                {history[history.length - 3] && (
                                    <MoveHistoryItem
                                        move={history[history.length - 3]}
                                    />
                                )}
                                {history[history.length - 4] && (
                                    <MoveHistoryItem
                                        move={history[history.length - 4]}
                                    />
                                )}
                            </div>
                            <button className="btn btn-outline">
                                <MdHistory />
                            </button>
                        </div>
                    )}
                </div>

                <input
                    type="radio"
                    name="my_tabs_2"
                    role="tab"
                    className="tab"
                    aria-label="Captured pieces"
                    defaultChecked
                />
                <div
                    role="tabpanel"
                    className="tab-content bg-base-100 border-base-300 rounded-lg p-6"
                >
                    No captured pieces
                </div>
            </div>

            {/* Desktop version */}
            <div className="w-full h-1/2 bg-base-200 rounded-lg shadow-lg hidden md:block p-2">
                {history.length === 0 && "Make a move to start"}
            </div>
            <div className="w-full h-1/2 bg-base-200 rounded-lg shadow-lg hidden md:block p-2">
                No captured pieces
            </div>
        </div>
    );
};

export default MoveHistory;
