import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ApiService from "../../service/ApiService";
import { Eye, EyeOff, LogIn } from "lucide-react";

function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || "/home";

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            setError("⚠️ Please fill in all fields.");
            setTimeout(() => setError(""), 4000);
            return;
        }

        try {
            setIsLoading(true);
            const response = await ApiService.loginUser({ email, password });
            console.log("Login Response:", response);

            if (response?.token) {
                localStorage.setItem("token", response.token);
                localStorage.setItem("role", response.role || "USER");

                setTimeout(() => {
                    navigate(from, { replace: true });
                }, 800);
            } else {
                setError("Login failed — token missing from response.");
            }
        } catch (error) {
            setError(error.response?.data?.message || error.message);
            setTimeout(() => setError(""), 4000);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-100">
            <div className="bg-white shadow-lg rounded-3xl w-[90%] max-w-md p-8 border border-gray-200 transition-all hover:shadow-xl">
                <div className="text-center mb-6">
                    <h2 className="text-3xl font-semibold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-400">
                        Welcome Back 👋
                    </h2>
                    <p className="text-gray-500 text-sm mt-2">
                        Login to continue your Mountain Mirage experience
                    </p>
                </div>

                {error && (
                    <div className="bg-red-50 border border-red-300 text-red-600 text-sm py-2 px-4 rounded-lg mb-4 animate-fadeIn">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            className="mt-1 w-full px-4 py-3 bg-gray-50 rounded-xl outline-none border border-gray-300 text-gray-700 placeholder-gray-400 focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 transition"
                            required
                        />
                    </div>

                    <div className="relative">
                        <label className="text-sm font-medium text-gray-700">Password</label>
                        <div className="flex items-center mt-1">
                            <input
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter your password"
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
                        className="w-full flex justify-center items-center gap-2 py-3 mt-2 bg-gradient-to-r from-teal-400 to-emerald-500 text-white font-semibold rounded-xl shadow-md hover:opacity-95 active:scale-[0.98] transition-all"
                    >
                        {isLoading ? (
                            <span className="loader border-white"></span>
                        ) : (
                            <>
                                <LogIn size={20} />
                                Login
                            </>
                        )}
                    </button>
                </form>

                <p className="text-center text-gray-600 text-sm mt-5">
                    Don’t have an account?{" "}
                    <a
                        href="/register"
                        className="text-emerald-500 hover:text-emerald-600 font-semibold underline-offset-2 hover:underline"
                    >
                        Register
                    </a>
                </p>
            </div>
        </div>
    );
}

export default LoginPage;
