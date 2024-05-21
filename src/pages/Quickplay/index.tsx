import axios from "axios";
import { useEffect } from "react";
import { Chessboard } from "react-chessboard";
import { confirmAlert } from "react-confirm-alert";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import CustomConfirmAlert from "../../components/CustomConfirmAlert";
import MoveHistory from "../../components/MoveHistory";
import PlayerInfoCard from "../../components/PlayerInfoCard";
import useQuickplayHandler from "../../hooks/QuickplayHandler";
import { resetQuickplayData } from "../../redux/features/quickplaySlice";
import { hideLoading, showLoading } from "../../utilities";
import { FaRegCircleXmark } from "react-icons/fa6";

const QuickPlayPage = () => {
    // Dispatch for setting Loading Modal message
    const dispatch = useDispatch();

    // Navigation
    const navigate = useNavigate();

    // Showing Confirm alert when user click Finish game
    const handleOnClick = () => {
        confirmAlert({
            overlayClassName: "bg-overlay-important",
            customUI: ({ onClose }) => {
                return (
                    <CustomConfirmAlert
                        onClose={onClose}
                        title={"Quit game"}
                        content={"Do you really want to quit?"}
                        confirmText={"Quit"}
                        confirmCallback={() => navigate("/")}
                    />
                );
            },
        });
    };

    // Game handler
    const {
        game,
        onSquareClick,
        optionSquares,
        showPromotionDialog,
        onPromotionPieceSelect,
        moveTo,
    } = useQuickplayHandler();

    // Load new game
    useEffect(() => {
        // Show the loading modal
        showLoading(dispatch, "Game is starting up");
        // Reset the quickplay data from previous (if any)
        dispatch(resetQuickplayData());

        // Request to get backend ready
        axios
            .get("/api/IsReady")
            .then((response) => {
                if (response.data == "OK") {
                    // Close the loading modal
                    hideLoading();
                }
            })
            .catch((e) => {
                // Something went wrong
                console.log(e.message);
                hideLoading();
                // Change this later
                navigate("/");
                confirmAlert({
                    overlayClassName: "bg-overlay-important",
                    customUI: ({ onClose }) => {
                        return (
                            <CustomConfirmAlert
                                onClose={onClose}
                                title={"Error starting game"}
                                content={
                                    "Sorry, we cannot start a new game right now."
                                }
                                svg={
                                    <FaRegCircleXmark
                                        size={"5rem"}
                                        color={"red"}
                                    />
                                }
                                confirmText={"Home"}
                                confirmCallback={() => navigate("/")}
                                hideCancelButton={true}
                            />
                        );
                    },
                });
            });
    }, []);

    return (
        <div className="h-full w-full bg-base-300 flex flex-col justify-center items-center">
            <div className="w-full p-2 max-w-md md:max-w-6xl flex flex-col items-center gap-2 md:grid md:grid-cols-2">
                <div className="w-full md:h-full md:col-start-2 flex md:flex-col gap-2">
                    <PlayerInfoCard />
                    <PlayerInfoCard />
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
                <div className="w-full h-32 md:col-start-2 md:h-full flex flex-col gap-2">
                    <MoveHistory />
                    <button
                        className="btn btn-primary w-full"
                        onClick={handleOnClick}
                    >
                        Finish game
                    </button>
                </div>
            </div>
        </div>
    );
};

export default QuickPlayPage;
