import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ApiService from "../../service/ApiService";
import { LogOut, Edit3, CalendarDays, User2 } from "lucide-react";

const ProfilePage = () => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const response = await ApiService.getUserProfile();
                const userPlusBookings = await ApiService.getUserBookings(response.user.id);
                setUser(userPlusBookings.user);
            } catch (error) {
                setError(error.response?.data?.message || error.message);
            }
        };

        fetchUserProfile();
    }, []);

    const handleLogout = () => {
        ApiService.logout();
        navigate("/home");
    };

    const handleEditProfile = () => {
        navigate("/edit-profile");
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-100 py-12 px-4 md:px-8">
            <div className="max-w-5xl mx-auto bg-white shadow-xl border border-gray-200 rounded-3xl p-8 transition-all hover:shadow-2xl">
                {/* ✅ Header Section */}
                <div className="flex flex-col sm:flex-row justify-between items-center mb-8 border-b border-gray-200 pb-6">
                    <div className="flex items-center gap-3">
                        <User2 className="text-emerald-500" size={36} />
                        <div>
                            <h2 className="text-2xl font-semibold text-gray-800">
                                {user ? `Welcome, ${user.name}` : "Loading..."}
                            </h2>
                            <p className="text-gray-500 text-sm">Your account dashboard</p>
                        </div>
                    </div>

                    <div className="flex gap-3 mt-4 sm:mt-0">
                        <button
                            onClick={handleEditProfile}
                            className="flex items-center gap-2 bg-emerald-500 text-white px-5 py-2 rounded-xl shadow-md hover:bg-emerald-600 transition-all"
                        >
                            <Edit3 size={18} /> Edit Profile
                        </button>
                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-2 bg-red-500 text-white px-5 py-2 rounded-xl shadow-md hover:bg-red-600 transition-all"
                        >
                            <LogOut size={18} /> Logout
                        </button>
                    </div>
                </div>

                {/* ❌ Error Message */}
                {error && (
                    <div className="bg-red-50 border border-red-300 text-red-600 text-sm py-2 px-4 rounded-lg mb-6">
                        {error}
                    </div>
                )}

                {/* ✅ Profile Details */}
                {user && (
                    <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 mb-10 shadow-inner">
                        <h3 className="text-lg font-semibold text-gray-700 mb-4 border-b pb-2">
                            My Profile Details
                        </h3>
                        <div className="grid md:grid-cols-2 gap-4 text-gray-700">
                            <p>
                                <strong className="text-gray-800">Full Name:</strong> {user.name}
                            </p>
                            <p>
                                <strong className="text-gray-800">Email:</strong> {user.email}
                            </p>
                            <p>
                                <strong className="text-gray-800">Phone:</strong>{" "}
                                {user.phoneNumber}
                            </p>
                            <p>
                                <strong className="text-gray-800">Role:</strong>{" "}
                                {localStorage.getItem("role")}
                            </p>
                        </div>
                    </div>
                )}

                {/* ✅ Booking Section */}
                <div>
                    <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2 mb-6">
                        <CalendarDays className="text-emerald-500" /> My Booking History
                    </h3>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {user && user.bookings.length > 0 ? (
                            user.bookings.map((booking) => (
                                <div
                                    key={booking.id}
                                    className="bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-all overflow-hidden"
                                >
                                    <img
                                        src={booking.room.roomPhotoUrl}
                                        alt="Room"
                                        className="h-40 w-full object-cover"
                                    />
                                    <div className="p-4 space-y-2">
                                        <p className="text-gray-700 text-sm">
                                            <strong>Booking Code:</strong>{" "}
                                            <span className="text-emerald-600 font-medium">
                                                {booking.bookingConfirmationCode}
                                            </span>
                                        </p>
                                        <p className="text-gray-700 text-sm">
                                            <strong>Room Type:</strong> {booking.room.roomType}
                                        </p>
                                        <p className="text-gray-700 text-sm">
                                            <strong>Check-in:</strong> {booking.checkInDate}
                                        </p>
                                        <p className="text-gray-700 text-sm">
                                            <strong>Check-out:</strong> {booking.checkOutDate}
                                        </p>
                                        <p className="text-gray-700 text-sm">
                                            <strong>Guests:</strong> {booking.totalNumOfGuest}
                                        </p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-500 italic">No bookings found.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
