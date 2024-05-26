import { confirmAlert } from "react-confirm-alert";
import { FaChessKing, FaFacebookF, FaRegCircleXmark } from "react-icons/fa6";
import CustomConfirmAlert from "../../components/CustomConfirmAlert";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";

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

    // Show error on login
    const showLoginError = (title: string, content: string) => {
        confirmAlert({
            overlayClassName: "bg-overlay-important",
            customUI: ({ onClose }) => {
                return (
                    <CustomConfirmAlert
                        onClose={onClose}
                        title={title}
                        content={content}
                        svg={<FaRegCircleXmark size={"5rem"} color={"red"} />}
                        confirmText={"OK"}
                        hideCancelButton={true}
                    />
                );
            },
        });
    };

    // Send token to the backend
    const handleAuthRequest = ({
        provider,
        token,
    }: {
        provider: string;
        token: string;
    }) => {
        axios
            .post("/api/Authentication/Google", {
                provider: provider,
                token: token,
            })
            .then(function (response) {
                if (response.data.isSuccess === false) {
                    showLoginError(
                        "Login error",
                        "Oops! We encountered an error on the server."
                    );
                } else {
                    console.log(response.data);
                }
            })
            .catch(function (error) {
                console.log(error);
                showLoginError(
                    "Google login error",
                    "Oops! We could not connect to the provider."
                );
            });
    };

    // Handle Facebook login click
    const facebookLoginHandler = () => {
        confirmAlert({
            overlayClassName: "bg-overlay-important",
            customUI: ({ onClose }) => {
                return (
                    <CustomConfirmAlert
                        onClose={onClose}
                        title={`Facebook login`}
                        content={
                            "This feature is being developed. Please check back later."
                        }
                        confirmText={"OK"}
                        hideCancelButton={true}
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
                        <GoogleLogin
                            type="icon"
                            onSuccess={(credentialResponse) => {
                                if (credentialResponse.credential) {
                                    handleAuthRequest({
                                        provider: "Google",
                                        token: credentialResponse.credential,
                                    });
                                } else {
                                    console.log("Missing Google credential");
                                }
                            }}
                            onError={() => {
                                showLoginError(
                                    "Google login error",
                                    "Oops! We could not connect to the provider."
                                );
                            }}
                        />
                        <button
                            className="btn-login"
                            onClick={facebookLoginHandler}
                        >
                            <FaFacebookF color="blue" />
                        </button>
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
