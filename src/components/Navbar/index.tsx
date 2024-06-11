import { FaBars } from "react-icons/fa";

const Navbar = () => {
    return (
        <div className="navbar bg-base-100 lg:hidden">
            <div className="flex-1">
                <a className="btn btn-ghost text-xl">NewChess</a>
            </div>
            <div className="flex-none">
                <label
                    htmlFor="main-drawer"
                    className="btn btn-primary btn-outline drawer-button"
                >
                    <FaBars />
                </label>
            </div>
        </div>
    );
};

export default Navbar;
