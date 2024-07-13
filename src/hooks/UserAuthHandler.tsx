import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { removeAuth } from "../redux/features/authSlice";
import { showCustomAlert } from "../utilities";
import { FaRegCircleXmark } from "react-icons/fa6";
import { removeUserData } from "../redux/features/userDataSlice";

const useUserAuth = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const HandleLogout = () => {
        dispatch(removeAuth());
        dispatch(removeUserData());
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
