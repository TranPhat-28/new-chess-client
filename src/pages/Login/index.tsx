import { confirmAlert } from "react-confirm-alert";
import { FaChessKing, FaFacebookF } from "react-icons/fa6";
import CustomConfirmAlert from "../../components/CustomConfirmAlert";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {

    const navigate = useNavigate();

    // Show confirm alert
    const handleOnClick = () => {
        confirmAlert({
            overlayClassName: "bg-overlay-important",
            customUI: ({ onClose }) => {
                return (
                    <CustomConfirmAlert
                        onClose={onClose}
                        title={"You are not logged in"}
                        content={
                            "Quickplay progress will not be saved. Continue?"
                        }
                        confirmText={"Play"}
                        confirmCallback={() => navigate("/quickplay")}
                    />
                );
            },
        });
    };

    return (
        <div className="bg-custom-svg h-full w-full object-fill flex items-center justify-center p-6">
            <div className="bg-base-100 p-4 flex flex-col items-center rounded-lg w-full max-w-lg shadow-md">
                <img src="/icon512.png" alt="logo" className="w-28 mt-4" />
                <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-center mb-0">
                    Welcome to New Chess
                </h1>
                <p className="italic">The chess platform for everyone</p>

                <h2 className="mt-10 p-2">Login to save your progress</h2>
                <div className="w-full max-w-xs flex flex-col">
                    <div className="w-full flex justify-center gap-2">
                        <div className="btn-login">
                            <FaFacebookF color="blue" />
                        </div>
                        <div className="btn-login">
                            <FaFacebookF color="blue" />
                        </div>
                        <div className="btn-login">
                            <FaFacebookF color="blue" />
                        </div>
                    </div>

                    <div className="divider">OR</div>

                    <button
                        className="btn btn-primary h-20"
                        onClick={handleOnClick}
                    >
                        <FaChessKing />
                        Play a quick game
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
