import React, { useState, useEffect } from "react";
import ApiService from "../../service/ApiService";
import { useNavigate } from "react-router-dom";
import { UserPlus, Eye, EyeOff, CheckCircle2, Info } from "lucide-react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";

function RegisterPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    agree: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState("");

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };

  // ✅ Password strength logic
  useEffect(() => {
    const pass = formData.password;
    if (pass.length === 0) setPasswordStrength("");
    else if (pass.length < 6) setPasswordStrength("Weak");
    else if (/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/.test(pass))
      setPasswordStrength("Strong");
    else setPasswordStrength("Medium");
  }, [formData.password]);

  const validateForm = () => {
    const { name, email, password, confirmPassword, phoneNumber, agree } =
      formData;
    if (!name || !email || !password || !confirmPassword || !phoneNumber)
      return "⚠️ Please fill all the fields.";
    if (!/^\S+@\S+\.\S+$/.test(email))
      return "⚠️ Please enter a valid email address.";
    if (!/^\d{10}$/.test(phoneNumber))
      return "⚠️ Please enter a valid 10-digit phone number.";
    if (password !== confirmPassword)
      return "⚠️ Passwords do not match.";
    if (!agree)
      return "⚠️ You must agree to our Terms & Conditions.";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validateForm();
    if (validationError) {
      setErrorMessage(validationError);
      setTimeout(() => setErrorMessage(""), 4000);
      return;
    }

    try {
      setIsLoading(true);
      const response = await ApiService.registerUser(formData);

      if (response.statusCode === 200) {
        setSuccessMessage("✅ Registered Successfully!");
        confetti({ particleCount: 150, spread: 70, origin: { y: 0.7 } });

        setFormData({
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
          phoneNumber: "",
          agree: false,
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
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-emerald-50 via-white to-teal-50 px-4 py-20 mt-10">
      {/* Floating Background Animation */}
      <motion.div
        animate={{ y: [0, 20, 0] }}
        transition={{ repeat: Infinity, duration: 6 }}
        className="absolute top-20 left-20 w-56 h-56 bg-teal-200/30 blur-3xl rounded-full"
      />
      <motion.div
        animate={{ y: [0, -20, 0] }}
        transition={{ repeat: Infinity, duration: 7 }}
        className="absolute bottom-20 right-20 w-64 h-64 bg-emerald-200/30 blur-3xl rounded-full"
      />

      {/* Register Card */}
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 w-full max-w-md bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-200 p-8"
      >
        <div className="text-center mb-6">
          <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-400">
            Create Your Account ✨
          </h2>
          <p className="text-gray-500 text-sm mt-2">
            Join Mountain Mirage and begin your journey
          </p>
        </div>

        {errorMessage && (
          <div className="bg-red-50 border border-red-300 text-red-600 text-sm py-2 px-4 rounded-lg mb-4 text-center animate-fadeIn">
            {errorMessage}
          </div>
        )}
        {successMessage && (
          <div className="bg-green-50 border border-green-300 text-green-600 text-sm py-2 px-4 rounded-lg mb-4 flex items-center justify-center gap-2">
            <CheckCircle2 size={18} /> {successMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Full Name */}
          <div>
            <label className="text-sm font-medium text-gray-700">Full Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleInputChange}
              className="mt-1 w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-300 focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 outline-none transition"
            />
          </div>

          {/* Email */}
          <div>
            <label className="text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleInputChange}
              className="mt-1 w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-300 focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 outline-none transition"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="text-sm font-medium text-gray-700">Phone Number</label>
            <input
              type="text"
              name="phoneNumber"
              placeholder="Enter your phone number"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              className="mt-1 w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-300 focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 outline-none transition"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
              Password
              <Info size={14} className="text-gray-400" />
            </label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full mt-1 px-4 py-3 bg-gray-50 rounded-xl border border-gray-300 focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 outline-none transition"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-[40px] text-gray-400 hover:text-gray-700"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
            {passwordStrength && (
              <p
                className={`text-xs mt-1 ${
                  passwordStrength === "Weak"
                    ? "text-red-500"
                    : passwordStrength === "Medium"
                    ? "text-yellow-500"
                    : "text-green-500"
                }`}
              >
                Password Strength: {passwordStrength}
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <label className="text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              placeholder="Re-enter your password"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              className="w-full mt-1 px-4 py-3 bg-gray-50 rounded-xl border border-gray-300 focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 outline-none transition"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-4 top-[40px] text-gray-400 hover:text-gray-700"
            >
              {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
            {formData.confirmPassword &&
              formData.password !== formData.confirmPassword && (
                <p className="text-xs text-red-500 mt-1">
                  ❌ Passwords do not match
                </p>
              )}
          </div>

          {/* Checkbox */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="agree"
              checked={formData.agree}
              onChange={handleInputChange}
              className="accent-emerald-500"
            />
            <span className="text-sm text-gray-600">
              I agree to the{" "}
              <a
                href="/terms"
                className="text-emerald-500 hover:text-emerald-600 font-medium underline-offset-2 hover:underline"
              >
                Terms & Conditions
              </a>
            </span>
          </div>

          {/* Register Button */}
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            disabled={isLoading}
            className="w-full flex justify-center items-center gap-2 py-3 mt-3 bg-gradient-to-r from-emerald-400 to-teal-500 text-white font-semibold rounded-xl shadow-md hover:shadow-lg active:scale-[0.98] transition-all"
          >
            {isLoading ? (
              <span className="loader border-white"></span>
            ) : (
              <>
                <UserPlus size={20} />
                Register
              </>
            )}
          </motion.button>
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
      </motion.div>
    </div>
  );
}

export default RegisterPage;
