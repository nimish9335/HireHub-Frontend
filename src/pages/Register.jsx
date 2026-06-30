import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import API from "../services/api";

function Register() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        fullname: "",
        email: "",
        phoneNumber: "",
        password: "",
        role: "candidate",
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
                "/user/register",
                formData
            );

            toast.success(response.data.message);

            setFormData({
                fullname:"",
                email:"",
                phoneNumber:"",
                password:"",
                role:"candidate"
            });

            setTimeout(() => {

                navigate("/login");

            },1000);

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
                    Create your account 🚀
                </p>

                <p className="text-center text-gray-500 mb-6">
                    Join HireHub today
                </p>

                <form onSubmit={handleSubmit}>

                    <div className="mb-4">
                        <label className="block font-medium mb-2">
                            Full Name
                        </label>

                        <input
                            type="text"
                            name="fullname"
                            placeholder="Enter your full name"
                            value={formData.fullname}
                            onChange={handleChange}
                            className="w-full border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-cyan-500"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block font-medium mb-2">
                            Email
                        </label>

                        <input
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-cyan-500"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block font-medium mb-2">
                            Phone Number
                        </label>

                        <input
                            type="text"
                            name="phoneNumber"
                            placeholder="Enter your phone number"
                            value={formData.phoneNumber}
                            onChange={handleChange}
                            className="w-full border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-cyan-500"
                        />
                    </div>

                    <div className="mb-4">
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

                    <div className="mb-6">
                        <label className="block font-medium mb-2">
                            Role
                        </label>

                        <select
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                            className="w-full border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-cyan-500"
                        >
                            <option value="candidate">Candidate</option>
                            <option value="recruiter">Recruiter</option>
                        </select>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-cyan-600 text-white py-2 rounded-lg hover:bg-cyan-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
                    >
                        {loading ? "Creating Account..." : "Register"}
                    </button>

                </form>

                <p className="text-center mt-6">

                    Already have an account?{" "}

                    <Link
                        to="/login"
                        className="text-cyan-600 font-semibold hover:underline"
                    >
                        Login
                    </Link>

                </p>

            </div>

        </div>
    );
}

export default Register;