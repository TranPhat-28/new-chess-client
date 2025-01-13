import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { HashLoader } from "react-spinners";
import { RootState } from "../../redux/store";
import { useNavigate } from "react-router-dom";
import { showCustomAlert } from "../../utilities";
import { FaRegCircleXmark } from "react-icons/fa6";
import { toast } from "react-toastify";

const PracticeModeLoadingPage = () => {
    const navigate = useNavigate();
    const token = useSelector((state: RootState) => state.auth.token);
    const [gameLoading, setGameLoading] = useState<boolean>(true);
    const [alertPlayer, setAlertPlayer] = useState<boolean>(false);

    const [btnNewGameLoading, setBtnNewGameLoading] = useState<boolean>(false);
    const [btnResumeLoading, setBtnResumeLoading] = useState<boolean>(false);

    // Button handler
    const startNewGameHandler = () => {
        setBtnNewGameLoading(true);
        // Delete old progress then start a new game
        axios
            .delete("/api/PracticeMode/Saved", {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((response) => {
                // If success
                toast.success(response.data.message);
                navigate("/practice/game");
            })
            .catch((error) => {
                // Show toast
                toast.error(error.message);
                // Show alert
                showCustomAlert(
                    "Error",
                    "Oops! We cannot start a new game right now",
                    "Home",
                    () => navigate("/main/lobby"),
                    undefined,
                    <FaRegCircleXmark size={"5rem"} color={"red"} />,
                    true
                );
            }).finally(() => {
                setBtnNewGameLoading(false);
            });
    };

    const resumeGameHandler = () => {
        setBtnResumeLoading(true);
        navigate("/practice/game?progress=resume");
    };

    useEffect(() => {
        // Check if any saved game exists
        axios
            .get("/api/PracticeMode", {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((response) => {
                // Show toast
                toast.success(response.data.message);
                if (response.data.data === true) {
                    // If saved game found
                    setGameLoading(false);
                    setAlertPlayer(true);
                } else {
                    // If no saved game found, go to play page
                    navigate("/practice/game");
                }
            })
            .catch((error) => {
                // Show toast
                toast.error(error.message);
                // Show alert
                showCustomAlert(
                    "Error",
                    "Oops! We cannot start a new game right now",
                    "Home",
                    () => navigate("/main/lobby"),
                    undefined,
                    <FaRegCircleXmark size={"5rem"} color={"red"} />,
                    true
                );
            });
    });

    return (
        <div className="h-full w-full flex flex-col justify-center items-center bg-subtle object-contain p-4">
            {gameLoading && (
                <div className="bg-base-100 w-full max-w-xs rounded-lg p-4">
                    <h3 className="font-bold text-xl text-center">
                        Loading game data
                    </h3>
                    <div className="flex justify-center pt-4">
                        <HashLoader />
                    </div>
                </div>
            )}

            {alertPlayer && (
                <div className="bg-base-100 w-full max-w-lg rounded-lg p-4">
                    <h3 className="font-bold text-xl text-center">
                        Saved game found!
                    </h3>
                    <div className="flex pt-4">
                        Would you like to resume the previous game or start a
                        new game?
                    </div>
                    <div className="flex pt-4 flex-row justify-center gap-2">
                    <button
                            className={`btn ${
                                btnResumeLoading ? "btn-disabled" : ""
                            } btn-primary`}
                            onClick={resumeGameHandler}
                        >
                            {btnResumeLoading && (
                                <span className="loading loading-spinner"></span>
                            )}
                            {btnResumeLoading ? "" : "Resume"}
                        </button>
                        <button
                            className={`btn ${
                                btnNewGameLoading ? "btn-disabled" : "btn-outline"
                            } btn-primary`}
                            onClick={startNewGameHandler}
                        >
                            {btnNewGameLoading && (
                                <span className="loading loading-spinner"></span>
                            )}
                            {btnNewGameLoading ? "" : "New game"}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PracticeModeLoadingPage;
