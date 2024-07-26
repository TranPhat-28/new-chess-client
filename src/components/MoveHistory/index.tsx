import { MdHistory } from "react-icons/md";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import MoveHistoryItem from "../MoveHistoryItem";

const MoveHistory = () => {
    // Game history
    const history = useSelector((state: RootState) => state.quickplay.history);

    return (
        <div className="w-full flex-1 flex gap-1 lg:gap-2 shadow-md p-2 bg-base-200 rounded-lg">
            <div className="flex-1 overflow-hidden grid grid-rows-2 lg:grid-rows-4 gap-1">
                {history.length === 0 && "Make a move to start"}
                {history.length > 0 && (
                    <>
                        {history[history.length - 1] && (
                            <MoveHistoryItem
                                move={history[history.length - 1]}
                                moveNo={history.length - 0}
                                responsiveItem={false}
                            />
                        )}

                        {history[history.length - 2] && (
                            <MoveHistoryItem
                                move={history[history.length - 2]}
                                moveNo={history.length - 1}
                                responsiveItem={false}
                            />
                        )}

                        {history[history.length - 3] && (
                            <MoveHistoryItem
                                move={history[history.length - 3]}
                                moveNo={history.length - 2}
                                responsiveItem={true}
                            />
                        )}

                        {history[history.length - 4] && (
                            <MoveHistoryItem
                                move={history[history.length - 4]}
                                moveNo={history.length - 3}
                                responsiveItem={true}
                            />
                        )}
                    </>
                )}
            </div>
            <button
                className="btn btn-outline btn-ghost btn-square h-full"
                onClick={() =>
                    (
                        document.getElementById(
                            "history_modal"
                        ) as HTMLDialogElement
                    ).showModal()
                }
            >
                <MdHistory size={"20px"} />
            </button>
        </div>
    );
};

export default MoveHistory;
