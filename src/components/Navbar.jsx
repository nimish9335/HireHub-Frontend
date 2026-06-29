import { NavLink } from "react-router-dom";

function Navbar() {
    return (
        <nav className="flex justify-between items-center px-10 py-5 bg-gray-900 text-white">

            <h1 className="text-3xl font-bold text-cyan-400">
                HireHub
            </h1>

            <div className="flex gap-8 text-lg">

                <NavLink
                    to="/"
                    className={({ isActive }) =>
                        isActive
                            ? "text-cyan-400 font-bold"
                            : "hover:text-cyan-400"
                    }
                >
                    Home
                </NavLink>

                <NavLink
                    to="/login"
                    className={({ isActive }) =>
                        isActive
                            ? "text-cyan-400 font-bold"
                            : "hover:text-cyan-400"
                    }
                >
                    Login
                </NavLink>

                <NavLink
                    to="/register"
                    className={({ isActive }) =>
                        isActive
                            ? "text-cyan-400 font-bold"
                            : "hover:text-cyan-400"
                    }
                >
                    Register
                </NavLink>

            </div>

        </nav>
    );
}

export default Navbar;