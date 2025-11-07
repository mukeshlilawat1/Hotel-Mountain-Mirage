import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ApiService from "../../service/ApiService";
import { Building2, CalendarCheck2, UserCog, LogOut } from "lucide-react";

const AdminPage = () => {
    const [adminName, setAdminName] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAdminName = async () => {
            try {
                const response = await ApiService.getUserProfile();
                setAdminName(response.user.name);
            } catch (error) {
                console.error("Error fetching admin details:", error.message);
            }
        };

        fetchAdminName();
    }, []);

    const handleLogout = () => {
        ApiService.logout();
        navigate("/login");
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 flex flex-col items-center justify-center px-6 py-10">
            {/* 🏨 Header */}
            <div className="text-center mb-10 animate-fadeIn">
                <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 tracking-tight mb-2">
                    Welcome Back, <span className="text-emerald-500">{adminName || "Admin"}</span> 👋
                </h1>
                <p className="text-gray-500 text-sm md:text-base">
                    Manage your hotel operations efficiently with full control.
                </p>
            </div>

            {/* 🧭 Admin Actions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-4xl w-full animate-fadeIn">
                {/* Manage Rooms */}
                <div
                    onClick={() => navigate("/admin/manage-rooms")}
                    className="cursor-pointer bg-white border border-gray-200 rounded-2xl shadow-lg p-8 flex flex-col items-center text-center hover:shadow-2xl hover:scale-[1.03] transition-all duration-300"
                >
                    <Building2 className="text-emerald-500 mb-3" size={40} />
                    <h3 className="text-lg font-semibold text-gray-800">Manage Rooms</h3>
                    <p className="text-sm text-gray-500 mt-1">Add, edit, or remove rooms with ease.</p>
                </div>

                {/* Manage Bookings */}
                <div
                    onClick={() => navigate("/admin/manage-bookings")}
                    className="cursor-pointer bg-white border border-gray-200 rounded-2xl shadow-lg p-8 flex flex-col items-center text-center hover:shadow-2xl hover:scale-[1.03] transition-all duration-300"
                >
                    <CalendarCheck2 className="text-blue-500 mb-3" size={40} />
                    <h3 className="text-lg font-semibold text-gray-800">Manage Bookings</h3>
                    <p className="text-sm text-gray-500 mt-1">
                        Review, approve, or cancel bookings easily.
                    </p>
                </div>

                {/* Manage Users */}
                <div
                    onClick={() => navigate("/admin/manage-users")}
                    className="cursor-pointer bg-white border border-gray-200 rounded-2xl shadow-lg p-8 flex flex-col items-center text-center hover:shadow-2xl hover:scale-[1.03] transition-all duration-300"
                >
                    <UserCog className="text-amber-500 mb-3" size={40} />
                    <h3 className="text-lg font-semibold text-gray-800">Manage Users</h3>
                    <p className="text-sm text-gray-500 mt-1">View and manage registered users.</p>
                </div>
            </div>

            {/* 🔚 Logout */}
            <button
                onClick={handleLogout}
                className="mt-10 flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-red-500 to-rose-600 text-white rounded-xl shadow-md hover:opacity-90 active:scale-95 transition-all"
            >
                <LogOut size={20} />
                Logout
            </button>
        </div>
    );
};

export default AdminPage;
