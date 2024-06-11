import { NavLink, Outlet } from "react-router-dom";
import Navbar from "../../components/Navbar";

const MainLayout = () => {
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
                    <img
                        src="/icon_rectangle_512.png"
                        alt="logo"
                        className="max-w-32"
                    />
                    <li>
                        <NavLink to={"/main/lobby"}>Lobby</NavLink>
                    </li>
                    <li>
                        <NavLink to={"/main/social"}>Social</NavLink>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default MainLayout;
