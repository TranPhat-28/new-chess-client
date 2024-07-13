import { PiWarningCircleBold } from "react-icons/pi";
import { NavLink, Outlet } from "react-router-dom";
import Navbar from "../../components/Navbar";
import ThemeSwapButton from "../../components/ThemeSwapButton";
import useUserAuth from "../../hooks/UserAuthHandler";
import { showCustomAlert } from "../../utilities";

const MainLayout = () => {
    // Logout Function
    const { HandleLogout } = useUserAuth();

    // Logout Alert
    const handleLogout = () => {
        showCustomAlert(
            "Logout",
            "Do you want to logout?",
            "OK",
            HandleLogout,
            undefined,
            <PiWarningCircleBold size={"5rem"} color={"gold"} />,
            false
        );
    };

    return (
        <div className="drawer lg:drawer-open">
            <input id="main-drawer" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content bg-subtle flex flex-col h-screen w-full">
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
                    <li>
                        <NavLink to={"/main/event"}>Event</NavLink>
                    </li>
                    <li>
                        <NavLink to={"/main/shop"}>Shop</NavLink>
                    </li>

                    <div className="flex-1 flex flex-col-reverse gap-4">
                        <button
                            className="btn btn-primary btn-outline"
                            onClick={handleLogout}
                        >
                            Logout
                        </button>

                        <ThemeSwapButton />
                    </div>
                </ul>
            </div>
        </div>
    );
};

export default MainLayout;
