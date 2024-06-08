import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useEffect } from "react";
import { FaChessKing, FaFacebookF, FaRegCircleXmark } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { showCustomAlert } from "../../utilities";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { setGameIsInitialized } from "../../redux/features/initGameSlice";

const LoginPage = () => {
    const navigate = useNavigate();

    // Redux
    const dispatch = useDispatch();
    const isInitialized = useSelector(
        (state: RootState) => state.initGame.isInitialized
    );

    // Show Initial modal
    useEffect(() => {
        // Only fetch once
        if (!isInitialized) {
            const initModal = document.getElementById(
                "initial_alert"
            ) as HTMLDialogElement;
            initModal.showModal();

            axios
                .get("/api/Initialize/Ready")
                .then(function (response) {
                    // handle success
                    if (response.data.isSuccess) {
                        initModal.close();
                    } else {
                        showErrorInitializingGame();
                    }
                })
                .catch(function (error) {
                    // Handle error
                    console.log(error);
                    initModal.close();
                    showErrorInitializingGame();
                });

            dispatch(setGameIsInitialized());
        }
    }, []);

    // Show Error Initializing game
    const showErrorInitializingGame = () => {
        showCustomAlert(
            "Error initializing game",
            "Sorry our server is having some issues at the moment.",
            "OK",
            undefined,
            undefined,
            <FaRegCircleXmark size={"5rem"} color={"red"} />,
            true
        );
    };

    // Show confirm alert
    const handleOnClickQuickplay = () => {
        showCustomAlert(
            "You are not logged in",
            "Quickplay progress will not be saved. Continue?",
            "Play",
            () => navigate("/quickplay")
        );
    };

    // Show error on login
    const showLoginError = (title: string, content: string) => {
        showCustomAlert(
            title,
            content,
            "OK",
            undefined,
            undefined,
            <FaRegCircleXmark size={"5rem"} color={"red"} />,
            true
        );
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
                // Response 200
                // In here we also check for 'isSuccess' in the data
                if (response.data.isSuccess) {
                    alert("Login success");
                } else {
                    showLoginError("Login failed", response.data.message);
                }
            })
            .catch(function (error) {
                // Response Error code
                showLoginError(
                    "Login error",
                    `Oops! We cannot log you in right now. (Error code: ${error.code})`
                );
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
                                    showLoginError(
                                        "Google login error",
                                        "Oops! We could not connect to the provider."
                                    );
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
                            onClick={() => alert("Facebook login")}
                        >
                            <FaFacebookF color="blue" />
                        </button>
                    </div>

                    <div className="divider">OR</div>

                    <button
                        className="btn btn-primary h-20"
                        onClick={handleOnClickQuickplay}
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
