import { Chessboard } from "react-chessboard";
import MoveHistory from "../../components/MoveHistory";
import usePracticeModePlayHandler from "../../hooks/PracticeModePlayHandler";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { resetQuickplayData } from "../../redux/features/quickplaySlice";

const PracticeModePage = () => {
    const dispatch = useDispatch();

    // Game handler
    const {
        game,
        isGameOver,
        onSquareClick,
        optionSquares,
        showPromotionDialog,
        onPromotionPieceSelect,
        moveTo,
    } = usePracticeModePlayHandler();

    // Load new game
    useEffect(() => {
        // Reset the quickplay data from previous (if any)
        dispatch(resetQuickplayData());
    }, []);

    return (
        <div className="h-full w-full flex flex-col justify-center items-center bg-subtle object-contain">
            <div className="w-full p-2 max-w-md md:max-w-6xl flex flex-col items-center gap-2 md:grid md:grid-cols-2 md:quickplay-desktop">
                <div className="w-full md:h-full md:col-start-2 bg-base-200 p-2 rounded-lg font-bold text-lg">
                    Practice Mode
                </div>

                <div className="bg-base-200 p-2 rounded-lg shadow-md w-full max-w-sm md:max-w-full md:col-start-1 md:row-start-1 md:row-span-2">
                    <Chessboard
                        id="ClickToMove"
                        animationDuration={200}
                        arePiecesDraggable={false}
                        position={game.fen()}
                        onSquareClick={onSquareClick}
                        onPromotionPieceSelect={onPromotionPieceSelect}
                        customSquareStyles={{
                            ...optionSquares,
                        }}
                        promotionToSquare={moveTo}
                        showPromotionDialog={showPromotionDialog}
                    />
                </div>

                <div className="w-full h-40 md:col-start-2 md:h-full flex flex-col gap-2">
                    <MoveHistory />
                    {isGameOver === true ? (
                        <button className="btn btn-primary w-full">
                            Quit
                        </button>
                    ) : (
                        <button className="btn btn-primary w-full">
                            Save and Quit
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};
export default PracticeModePage;
