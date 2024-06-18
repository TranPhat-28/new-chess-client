import { NavLink, Outlet, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { useDispatch } from "react-redux";
import { removeAuth } from "../../redux/features/authSlice";
import { showCustomAlert } from "../../utilities";
import { PiWarningCircleBold } from "react-icons/pi";
import { toast } from "react-toastify";

const MainLayout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Logout Function
    const performLogout = () => {
        dispatch(removeAuth());
        navigate("/");
        toast.success("Logout successful");
    };

    // Logout Alert
    const handleLogout = () => {
        showCustomAlert(
            "Logout",
            "Do you want to logout?",
            "OK",
            performLogout,
            undefined,
            <PiWarningCircleBold size={"5rem"} color={"gold"} />,
            false
        );
    };

    return (
        <div className="drawer lg:drawer-open">
            <input id="main-drawer" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col h-screen w-full">
                {/* Page content here */}
                <Navbar />
                <Outlet />
            </div>
            <div className="drawer-side">
                <label
                    htmlFor="main-drawer"
                    aria-label="close sidebar"
                    className="drawer-overlay"
                ></label>
                <ul className="menu p-4 w-5/6 lg:w-80 xl:w-96 min-h-full bg-base-100 text-base-content gap-1">
                    {/* Sidebar content here */}
                    <li className="bg-logo rounded-xl p-2">
                        <p className="font-logo text-white text-6xl">Chess</p>
                    </li>
                    <li>
                        <NavLink to={"/main/lobby"}>Lobby</NavLink>
                    </li>
                    <li>
                        <NavLink to={"/main/social"}>Social</NavLink>
                    </li>
                    <li>
                        <NavLink to={"/main/profile"}>Profile</NavLink>
                    </li>

                    <div className="flex-1 flex flex-col-reverse">
                        <button
                            className="btn btn-primary btn-outline"
                            onClick={handleLogout}
                        >
                            Logout
                        </button>
                    </div>
                </ul>
            </div>
        </div>
    );
};

export default MainLayout;
