import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ApiService from "../../service/ApiService";
import { Eye, EyeOff, LogIn } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [capsLock, setCapsLock] = useState(false);
    const [showForgotModal, setShowForgotModal] = useState(false);
    const [successMsg, setSuccessMsg] = useState("");

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/home";

    // Load saved email (if Remember Me)
    useEffect(() => {
        const savedEmail = localStorage.getItem("rememberedEmail");
        if (savedEmail) {
            setEmail(savedEmail);
            setRememberMe(true);
        }
    }, []);

    // Login handler
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

                if (rememberMe) localStorage.setItem("rememberedEmail", email);
                else localStorage.removeItem("rememberedEmail");

                setSuccessMsg("✅ Login successful! Redirecting...");
                setTimeout(() => {
                    navigate(from, { replace: true });
                }, 1500);
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

    // Detect Caps Lock
    const handleKeyDown = (e) => setCapsLock(e.getModifierState("CapsLock"));

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-100 relative overflow-hidden">
            {/* Floating background gradient circles */}
            <motion.div
                animate={{ y: [0, 20, 0] }}
                transition={{ duration: 6, repeat: Infinity }}
                className="absolute top-10 left-10 w-40 h-40 bg-teal-200/20 blur-3xl rounded-full"
            />
            <motion.div
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 5, repeat: Infinity }}
                className="absolute bottom-10 right-10 w-56 h-56 bg-emerald-200/20 blur-3xl rounded-full"
            />

            {/* Login Card */}
            <motion.div
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                className="bg-white shadow-lg rounded-3xl w-[90%] max-w-md p-8 border border-gray-200 transition-all hover:shadow-2xl relative z-10"
            >
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

                {successMsg && (
                    <div className="bg-green-50 border border-green-300 text-green-600 text-sm py-2 px-4 rounded-lg mb-4 animate-fadeIn">
                        {successMsg}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Email */}
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

                    {/* Password */}
                    <div className="relative">
                        <label className="text-sm font-medium text-gray-700">Password</label>
                        <div className="flex items-center mt-1">
                            <input
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter your password"
                                onKeyDown={handleKeyDown}
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
                        {capsLock && (
                            <p className="text-xs text-red-500 mt-1">⚠️ Caps Lock is ON</p>
                        )}
                    </div>

                    {/* Remember Me + Forgot Password */}
                    <div className="flex items-center justify-between text-sm">
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={rememberMe}
                                onChange={() => setRememberMe(!rememberMe)}
                                className="accent-emerald-500"
                            />
                            <span className="text-gray-600">Remember Me</span>
                        </label>
                        <button
                            type="button"
                            onClick={() => setShowForgotModal(true)}
                            className="text-emerald-500 hover:text-emerald-600 font-medium"
                        >
                            Forgot Password?
                        </button>
                    </div>

                    {/* Submit Button */}
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
            </motion.div>

            {/* Forgot Password Modal */}
            <AnimatePresence>
                {showForgotModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/40 flex justify-center items-center z-50"
                        onClick={() => setShowForgotModal(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-white rounded-2xl shadow-lg p-6 w-[90%] max-w-sm text-center"
                        >
                            <h3 className="text-lg font-semibold text-gray-800 mb-3">
                                🔐 Forgot Password
                            </h3>
                            <p className="text-sm text-gray-500 mb-4">
                                Enter your email to receive password reset instructions.
                            </p>
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-teal-400 outline-none mb-4"
                            />
                            <button
                                onClick={() => {
                                    alert("Reset link sent to your email! ✅");
                                    setShowForgotModal(false);
                                }}
                                className="w-full bg-gradient-to-r from-teal-400 to-emerald-500 text-white py-2 rounded-lg font-semibold hover:opacity-90 transition"
                            >
                                Send Reset Link
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default LoginPage;
