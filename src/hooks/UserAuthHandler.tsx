import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { removeAuth } from "../redux/features/authSlice";
import { showCustomAlert } from "../utilities";
import { FaRegCircleXmark } from "react-icons/fa6";
import { removeUserData } from "../redux/features/userDataSlice";
import { useContext } from "react";
import SignalRContext from "../contexts/SignalRContext";

const useUserAuth = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // Context Signal R
    const { mainConnectionHubProvider, gameLobbyConnectionHubProvider } =
        useContext(SignalRContext);

    const HandleLogout = () => {
        dispatch(removeAuth());
        dispatch(removeUserData());
        if (!mainConnectionHubProvider || !gameLobbyConnectionHubProvider) {
            toast.error("Some hubs were not initialized");
            console.log("[LogoutFunction] Some hubs were not initialized");
        } else {
            mainConnectionHubProvider.stopAndDestroy();
            gameLobbyConnectionHubProvider.stopAndDestroy();
        }
        navigate("/");
        toast.success("Logout successful");
    };

    const LogoutWithError = () => {
        dispatch(removeAuth());
        navigate("/");
        showCustomAlert(
            "Error",
            "We cannot verify your identity. Please login again",
            "OK",
            undefined,
            undefined,
            <FaRegCircleXmark size={"5rem"} color={"red"} />,
            false
        );
    };

    return { HandleLogout, LogoutWithError };
};

export default useUserAuth;
