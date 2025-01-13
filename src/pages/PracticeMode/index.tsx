import { Chessboard } from "react-chessboard";
import MoveHistory from "../../components/MoveHistory";
import usePracticeModePlayHandler from "../../hooks/PracticeModePlayHandler";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetQuickplayData } from "../../redux/features/quickplaySlice";
import { RootState } from "../../redux/store";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate, useSearchParams } from "react-router-dom";
import { showCustomAlert } from "../../utilities";
import { FaRegCircleXmark } from "react-icons/fa6";

const PracticeModePage = () => {
    const dispatch = useDispatch();
    const history = useSelector((state: RootState) => state.quickplay.history);
    const token = useSelector((state: RootState) => state.auth.token);
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const [btnLoading, setBtnLoading] = useState<boolean>(false);

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

    // Save and Quit handler
    const saveAndQuitHandler = () => {
        setBtnLoading(true);
        // Dont send empty array to server
        if (history.length === 0) {
            navigate("/main/lobby");
            return;
        }

        axios
            .post(
                "/api/PracticeMode/Saved",
                { moves: history },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )
            .then((response) => {
                navigate("/main/lobby");
                toast.success(response.data.message);
            })
            .catch((error) => {
                toast.error(error);
                showCustomAlert(
                    "Error",
                    "Something went wrong and we cannot save your game now",
                    "Quit without saving",
                    () => navigate("/main/lobby"),
                    undefined,
                    <FaRegCircleXmark size={"5rem"} color={"red"} />,
                    false
                );
            })
            .finally(() => {
                setBtnLoading(false);
            });
    };

    // Load new game
    useEffect(() => {
        // Reset the quickplay data from previous (if any)
        dispatch(resetQuickplayData());

        // Fetch saved game if needed
        if (searchParams.get("progress") === "resume") {
            axios
                .get("/api/PracticeMode/Saved", {
                    headers: { Authorization: `Bearer ${token}` },
                })
                .then((response) => {
                    // If success
                    toast.success("Game progress loaded");
                    console.log(response.data);
                })
                .catch((error) => {
                    navigate("/main/lobby");
                    // Show toast
                    toast.error(error.response.statusText);
                });
        }
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
                        <button className="btn btn-primary w-full">Quit</button>
                    ) : (
                        <button
                            className={`btn ${
                                btnLoading ? "btn-disabled" : ""
                            } btn-primary w-full`}
                            onClick={saveAndQuitHandler}
                        >
                            {btnLoading && (
                                <span className="loading loading-spinner"></span>
                            )}
                            {btnLoading ? "" : "Save and Quit"}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};
export default PracticeModePage;
