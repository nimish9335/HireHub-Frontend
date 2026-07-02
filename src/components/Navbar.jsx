import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/authSlice";
import API from "../services/api";
import toast from "react-hot-toast";

function Navbar() {

    const { user, isAuthenticated } = useSelector(
        (state) => state.auth
    );

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = async () => {

        try {

            const response = await API.get("/user/logout");

            dispatch(logout());

            toast.success(response.data.message);

            navigate("/login");

        }
        catch (error) {

            toast.error(
                error.response?.data?.message || "Logout failed"
            );

        }

    };

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
                    to="/jobs"
                    className={({ isActive }) =>
                        isActive
                            ? "text-cyan-400 font-bold"
                            : "hover:text-cyan-400"
                    }
                >
                    Jobs
                </NavLink>

                {!isAuthenticated ? (
                    <>
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
                    </>
                ) : (
                    <>
                        <span className="text-cyan-400 font-semibold">
                            Hello, {user?.fullname}
                        </span>

                        <NavLink
                            to="/profile"
                            className={({ isActive }) =>
                                isActive
                                    ? "text-cyan-400 font-bold"
                                    : "hover:text-cyan-400"
                            }
                        >
                            Profile
                        </NavLink>

                        <button
                            onClick={handleLogout}
                            className="hover:text-cyan-400"
                        >
                            Logout
                        </button>
                    </>
                )}

            </div>

        </nav>
    );
}

export default Navbar;