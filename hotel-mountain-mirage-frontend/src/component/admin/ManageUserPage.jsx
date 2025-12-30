import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ApiService from "../../service/ApiService";
import { Users, Trash2, ArrowLeft, ShieldCheck } from "lucide-react";

const ManageUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            setLoading(true);

            const response = await ApiService.getAllUsers();
            console.log("Users API response:", response);

            // ✅ FINAL & CORRECT FIX
            setUsers(
                Array.isArray(response?.userList) ? response.userList : []
            );

        } catch (err) {
            console.error(err);
            setError("You are not authorized to view users.");
        } finally {
            setLoading(false);
        }
    };


    const handleDelete = async (userId) => {
        const confirm = window.confirm(
            "Are you sure you want to permanently delete this user?"
        );
        if (!confirm) return;

        try {
            await ApiService.deleteUser(userId);
            setUsers((prev) => prev.filter((u) => u.id !== userId));
        } catch (err) {
            alert("Failed to delete user.");
        }
    };

    /* =======================
       UI STATES
    ======================= */

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center text-lg font-semibold text-gray-600">
                Loading users...
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="bg-red-100 text-red-700 px-6 py-4 rounded-xl shadow">
                    {error}
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 px-6 py-10">
            <div className="max-w-7xl mx-auto">
                {/* 🔙 Back */}
                <button
                    onClick={() => navigate("/admin")}
                    className="flex items-center gap-2 mb-6 text-gray-600 hover:text-gray-900 transition"
                >
                    <ArrowLeft size={18} />
                    Back to Admin Dashboard
                </button>

                {/* 🧑‍🤝‍🧑 Header */}
                <div className="mb-8">
                    <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800 flex items-center gap-3">
                        <Users className="text-amber-500" size={36} />
                        Manage Users
                    </h1>
                    <p className="text-gray-500 mt-2">
                        View, control, and remove registered users.
                    </p>
                </div>

                {/* 📋 Users Table */}
                <div className="bg-white rounded-2xl shadow-xl overflow-x-auto">
                    <table className="min-w-full">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                                    Name
                                </th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                                    Email
                                </th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                                    Role
                                </th>
                                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">
                                    Action
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {users.length === 0 ? (
                                <tr>
                                    <td
                                        colSpan="4"
                                        className="text-center py-10 text-gray-500"
                                    >
                                        No users found.
                                    </td>
                                </tr>
                            ) : (
                                users.map((user) => (
                                    <tr
                                        key={user.id}
                                        className="border-t hover:bg-gray-50 transition"
                                    >
                                        <td className="px-6 py-4 text-sm text-gray-800 font-medium">
                                            {user.name}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600">
                                            {user.email}
                                        </td>
                                        <td className="px-6 py-4 text-sm">
                                            <span
                                                className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${user.role === "ADMIN"
                                                        ? "bg-emerald-100 text-emerald-700"
                                                        : "bg-blue-100 text-blue-700"
                                                    }`}
                                            >
                                                <ShieldCheck size={14} />
                                                {user.role}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <button
                                                onClick={() => handleDelete(user.id)}
                                                className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-500 to-rose-600 text-white text-sm rounded-xl shadow hover:opacity-90 active:scale-95 transition"
                                            >
                                                <Trash2 size={16} />
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ManageUsers;
