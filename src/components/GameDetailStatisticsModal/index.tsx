import { IGameStatisticData } from "../../interfaces";

const GameDetailStatisticsModal = ({
    gameStatisticData,
}: {
    gameStatisticData: IGameStatisticData | null;
}) => {
    return (
        <dialog id="detailStatisticsModal" className="modal">
            <div className="modal-box">
                <h3 className="font-bold text-xl mb-4">Detail Statistics</h3>

                {gameStatisticData && (
                    <table className="table">
                        <tbody>
                            <tr className="hover">
                                <td className="font-bold">
                                    Practice mode played (Easy)
                                </td>
                                <td>{gameStatisticData.practicePlayedEasy}</td>
                            </tr>
                            <tr className="hover">
                                <td className="font-bold">
                                    Practice mode victory (Easy)
                                </td>
                                <td>{gameStatisticData.practiceVictoryEasy}</td>
                            </tr>
                            <tr className="hover">
                                <td className="font-bold">
                                    Practice mode played (Medium)
                                </td>
                                <td>
                                    {gameStatisticData.practicePlayedMedium}
                                </td>
                            </tr>
                            <tr className="hover">
                                <td className="font-bold">
                                    Practice mode victory (Medium)
                                </td>
                                <td>
                                    {gameStatisticData.practiceVictoryMedium}
                                </td>
                            </tr>
                            <tr className="hover">
                                <td className="font-bold">
                                    Practice mode played (Hard)
                                </td>
                                <td>{gameStatisticData.practicePlayedHard}</td>
                            </tr>
                            <tr className="hover">
                                <td className="font-bold">
                                    Practice mode victory (Hard)
                                </td>
                                <td>{gameStatisticData.practiceVictoryHard}</td>
                            </tr>
                        </tbody>
                    </table>
                )}

                <p className="text-center italic w-full text-sm mt-4">
                    Click outside to close
                </p>
            </div>
            <form
                method="dialog"
                className="modal-backdrop bg-black opacity-40"
            >
                <button>close</button>
            </form>
        </dialog>
    );
};

export default GameDetailStatisticsModal;
