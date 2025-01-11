import axios from "axios";
import { useEffect } from "react";
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
                    console.log("SAVED GAME FOUND");
                    console.log(response);
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
            <div className="bg-base-100 w-full max-w-xs rounded-lg p-4">
                <h3 className="font-bold text-xl text-center">
                    Loading game data
                </h3>
                <div className="flex justify-center pt-4">
                    <HashLoader />
                </div>
            </div>
        </div>
    );
};

export default PracticeModeLoadingPage;
