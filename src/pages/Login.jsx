import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { setUser } from "../redux/authSlice";
import API from "../services/api";

function Login() {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {

        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {
            setLoading(true);
            const response = await API.post(
                "/user/login",
                formData
            );

            dispatch(setUser(response.data.user));

            toast.success(response.data.message);

            setFormData({
                email: "",
                password: "",
            });

            setTimeout(() => {
                navigate("/");
            }, 1000);

        }
        catch (error) {
            toast.error(error.response?.data?.message);
        }
        finally{
            setLoading(false);
        }

    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">

            <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">

                <h1 className="text-3xl font-bold text-center text-cyan-600">
                    HireHub
                </h1>

                <p className="text-center text-gray-500 mt-2">
                    Welcome Back 👋
                </p>

                <p className="text-center text-gray-500 mb-6">
                    Login to your account
                </p>

                <form onSubmit={handleSubmit}>

                    <div className="mb-4">

                        <label className="block font-medium mb-2">
                            Email
                        </label>

                        <input
                            type="email"
                            placeholder="Enter your email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-cyan-500"
                        />

                    </div>

                    <div className="mb-6">

                        <label className="block font-medium mb-2">
                            Password
                        </label>

                        <input
                            type="password"
                            name="password"
                            placeholder="Enter your password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-cyan-500"
                        />

                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-cyan-600 text-white py-2 rounded-lg hover:bg-cyan-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>

                </form>

                <p className="text-center mt-6">

                    Don't have an account?{" "}

                    <Link
                        to="/register"
                        className="text-cyan-600 font-semibold hover:underline"
                    >
                        Register
                    </Link>

                </p>

            </div>

        </div>
    );
}

export default Login;