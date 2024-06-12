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
                        <button className="btn btn-primary btn-outline">
                            Logout
                        </button>
                    </div>
                </ul>
            </div>
        </div>
    );
};

export default MainLayout;
