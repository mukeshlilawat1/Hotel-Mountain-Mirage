import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ApiService from "../../service/ApiService";
import {
    UserCog,
    Trash2,
    ArrowLeft,
    CheckCircle2,
    Edit3,
    Save,
    XCircle,
} from "lucide-react";

const EditProfilePage = () => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState("");
    const [editMode, setEditMode] = useState(false);
    const [updatedUser, setUpdatedUser] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const response = await ApiService.getUserProfile();
                setUser(response.user);
                setUpdatedUser(response.user);
            } catch (error) {
                setError(error.response?.data?.message || error.message);
            }
        };
        fetchUserProfile();
    }, []);

    // ✅ Handle Input Changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUpdatedUser({ ...updatedUser, [name]: value });
    };

    // ✅ Save Profile Changes
    const handleSaveProfile = async () => {
        if (!window.confirm("💾 Save changes to your profile?")) return;

        try {
            const response = await ApiService.updateUser(updatedUser.id, updatedUser);
            setUser(response.user);
            setSuccessMessage("✅ Profile updated successfully!");
            setEditMode(false);
            setTimeout(() => setSuccessMessage(""), 3000);
        } catch (error) {
            setError(error.response?.data?.message || error.message);
        }
    };

    // ✅ Delete Profile
    const handleDeleteProfile = async () => {
        if (!window.confirm("⚠️ Are you sure you want to delete your account?")) return;

        try {
            await ApiService.deleteUser(user.id);
            setSuccessMessage("✅ Your account has been deleted successfully.");
            setTimeout(() => {
                navigate("/register");
            }, 2000);
        } catch (error) {
            setError(error.response?.data?.message || error.message);
        }
    };

    const handleBack = () => navigate("/profile");

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-100 py-12 px-4 flex justify-center items-center">
            <div className="bg-white border border-gray-200 shadow-xl rounded-3xl max-w-2xl w-full p-8 transition-all hover:shadow-2xl">
                {/* 🔙 Back */}
                <button
                    onClick={handleBack}
                    className="flex items-center gap-2 text-gray-600 hover:text-emerald-500 transition mb-4"
                >
                    <ArrowLeft size={18} /> Back to Profile
                </button>

                {/* 👤 Header */}
                <div className="text-center mb-8">
                    <div className="flex justify-center mb-3">
                        <UserCog size={48} className="text-emerald-500" />
                    </div>
                    <h2 className="text-3xl font-semibold text-gray-800">
                        {editMode ? "Edit Your Profile" : "Profile Details"}
                    </h2>
                    <p className="text-gray-500 text-sm mt-1">
                        {editMode
                            ? "Update your personal details below"
                            : "View and manage your account information"}
                    </p>
                </div>

                {/* ⚠️ Alerts */}
                {error && (
                    <div className="bg-red-50 border border-red-300 text-red-600 text-sm py-2 px-4 rounded-lg mb-6 animate-fadeIn">
                        {error}
                    </div>
                )}
                {successMessage && (
                    <div className="bg-green-50 border border-green-300 text-green-600 text-sm py-2 px-4 rounded-lg mb-6 flex items-center justify-center gap-2 animate-fadeIn">
                        <CheckCircle2 size={18} /> {successMessage}
                    </div>
                )}

                {/* 👤 Profile Info */}
                {user ? (
                    <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 shadow-inner mb-8">
                        <div className="grid sm:grid-cols-2 gap-4 text-gray-700">
                            <div>
                                <label className="block text-gray-600 text-sm font-medium mb-1">
                                    Full Name
                                </label>
                                {editMode ? (
                                    <input
                                        type="text"
                                        name="name"
                                        value={updatedUser.name}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-400 outline-none"
                                    />
                                ) : (
                                    <p className="font-semibold">{user.name}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-gray-600 text-sm font-medium mb-1">
                                    Email
                                </label>
                                {editMode ? (
                                    <input
                                        type="email"
                                        name="email"
                                        value={updatedUser.email}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-400 outline-none"
                                    />
                                ) : (
                                    <p className="font-semibold">{user.email}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-gray-600 text-sm font-medium mb-1">
                                    Phone Number
                                </label>
                                {editMode ? (
                                    <input
                                        type="text"
                                        name="phoneNumber"
                                        value={updatedUser.phoneNumber}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-400 outline-none"
                                    />
                                ) : (
                                    <p className="font-semibold">{user.phoneNumber}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-gray-600 text-sm font-medium mb-1">
                                    Role
                                </label>
                                <p className="font-semibold">{localStorage.getItem("role")}</p>
                            </div>
                        </div>
                    </div>
                ) : (
                    <p className="text-gray-500 text-center">Loading user details...</p>
                )}

                {/* 🧩 Buttons */}
                <div className="flex flex-wrap gap-4 justify-center mt-6">
                    {editMode ? (
                        <>
                            <button
                                onClick={handleSaveProfile}
                                className="flex items-center gap-2 px-6 py-3 bg-emerald-500 text-white font-semibold rounded-xl shadow-md hover:bg-emerald-600 active:scale-95 transition-all"
                            >
                                <Save size={20} /> Save Changes
                            </button>
                            <button
                                onClick={() => setEditMode(false)}
                                className="flex items-center gap-2 px-6 py-3 bg-gray-400 text-white font-semibold rounded-xl shadow-md hover:bg-gray-500 active:scale-95 transition-all"
                            >
                                <XCircle size={20} /> Cancel
                            </button>
                        </>
                    ) : (
                        <>
                            <button
                                onClick={() => setEditMode(true)}
                                className="flex items-center gap-2 px-6 py-3 bg-blue-500 text-white font-semibold rounded-xl shadow-md hover:bg-blue-600 active:scale-95 transition-all"
                            >
                                <Edit3 size={20} /> Edit Profile
                            </button>

                            <button
                                onClick={handleDeleteProfile}
                                className="flex items-center gap-2 px-6 py-3 bg-red-500 text-white font-semibold rounded-xl shadow-md hover:bg-red-600 active:scale-95 transition-all"
                            >
                                <Trash2 size={20} /> Delete Account
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default EditProfilePage;
