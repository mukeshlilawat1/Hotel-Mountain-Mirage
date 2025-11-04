import React, { useState } from "react";
import ApiService from "../../service/ApiService";
import { useNavigate } from "react-router-dom";
import { UserPlus, Eye, EyeOff, CheckCircle2 } from "lucide-react";

function RegisterPage() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        phoneNumber: "",
    });

    const [showPassword, setShowPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const validateForm = () => {
        const { name, email, password, phoneNumber } = formData;
        if (!name || !email || !password || !phoneNumber) {
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) {
            setErrorMessage("⚠️ Please fill all the fields.");
            setTimeout(() => setErrorMessage(""), 4000);
            return;
        }
        try {
            setIsLoading(true);
            const response = await ApiService.registerUser(formData);

            if (response.statusCode === 200) {
                setSuccessMessage("✅ Registered Successfully!");
                setFormData({
                    name: "",
                    email: "",
                    password: "",
                    phoneNumber: "",
                });

                setTimeout(() => {
                    navigate("/login");
                }, 3000);
            } else {
                setErrorMessage("Something went wrong. Try again!");
            }
        } catch (error) {
            setErrorMessage(error.response?.data?.message || error.message);
            setTimeout(() => setErrorMessage(""), 4000);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-100">
            <div className="bg-white border border-gray-200 shadow-lg rounded-3xl w-[90%] max-w-md p-8 text-gray-800 hover:shadow-xl transition-transform">
                <div className="text-center mb-6">
                    <h2 className="text-3xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-400">
                        Create Account ✨
                    </h2>
                    <p className="text-gray-500 text-sm mt-2">
                        Join Mountain Mirage and start your journey
                    </p>
                </div>

                {errorMessage && (
                    <div className="bg-red-50 border border-red-300 text-red-600 text-sm py-2 px-4 rounded-lg mb-4 animate-fadeIn">
                        {errorMessage}
                    </div>
                )}
                {successMessage && (
                    <div className="bg-green-50 border border-green-300 text-green-600 text-sm py-2 px-4 rounded-lg mb-4 animate-fadeIn flex items-center justify-center gap-2">
                        <CheckCircle2 size={18} /> {successMessage}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="text-sm font-medium text-gray-700">Full Name</label>
                        <input
                            type="text"
                            name="name"
                            placeholder="Enter your name"
                            value={formData.name}
                            onChange={handleInputChange}
                            className="mt-1 w-full px-4 py-3 bg-gray-50 rounded-xl outline-none border border-gray-300 text-gray-700 placeholder-gray-400 focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 transition"
                            required
                        />
                    </div>

                    <div>
                        <label className="text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="mt-1 w-full px-4 py-3 bg-gray-50 rounded-xl outline-none border border-gray-300 text-gray-700 placeholder-gray-400 focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 transition"
                            required
                        />
                    </div>

                    <div>
                        <label className="text-sm font-medium text-gray-700">Phone Number</label>
                        <input
                            type="text"
                            name="phoneNumber"
                            placeholder="Enter your phone number"
                            value={formData.phoneNumber}
                            onChange={handleInputChange}
                            className="mt-1 w-full px-4 py-3 bg-gray-50 rounded-xl outline-none border border-gray-300 text-gray-700 placeholder-gray-400 focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 transition"
                            required
                        />
                    </div>

                    <div className="relative">
                        <label className="text-sm font-medium text-gray-700">Password</label>
                        <div className="flex items-center mt-1">
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                placeholder="Enter your password"
                                value={formData.password}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 bg-gray-50 rounded-xl outline-none border border-gray-300 text-gray-700 placeholder-gray-400 focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 transition"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-[38px] text-gray-400 hover:text-gray-700"
                            >
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full flex justify-center items-center gap-2 py-3 mt-3 bg-gradient-to-r from-emerald-400 to-teal-500 text-white font-semibold rounded-xl shadow-md hover:opacity-95 active:scale-[0.98] transition-all"
                    >
                        {isLoading ? (
                            <span className="loader border-white"></span>
                        ) : (
                            <>
                                <UserPlus size={20} />
                                Register
                            </>
                        )}
                    </button>
                </form>

                <p className="text-center text-gray-600 text-sm mt-5">
                    Already have an account?{" "}
                    <a
                        href="/login"
                        className="text-emerald-500 hover:text-emerald-600 font-semibold underline-offset-2 hover:underline"
                    >
                        Login
                    </a>
                </p>
            </div>
        </div>
    );
}

export default RegisterPage;
