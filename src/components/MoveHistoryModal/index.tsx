import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import MoveHistoryItem from "../MoveHistoryItem";

const MoveHistoryModal = () => {
    const history = useSelector((state: RootState) => state.quickplay.history);

    return (
        <dialog id="history_modal" className="modal">
            <div className="modal-box">
                <h3 className="font-bold text-lg">History</h3>
                {history.length === 0 && (
                    <p className="py-4">Make a move to start</p>
                )}
                {history.length > 0 && (
                    <div className="bg-base-300 p-1 lg:p-2 h-48 flex flex-col gap-1 lg:gap-2 overflow-y-scroll">
                        {history.map((item, index) => (
                            <MoveHistoryItem
                                key={index}
                                move={item}
                                moveNo={index + 1}
                                responsiveItem={false}
                            />
                        ))}
                    </div>
                )}
            </div>
            <form method="dialog" className="modal-backdrop">
                <button>close</button>
            </form>
        </dialog>
    );
};

export default MoveHistoryModal;
