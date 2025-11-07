import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ApiService from "../../service/ApiService";
import {
    CalendarDays,
    User,
    BedDouble,
    Mail,
    Phone,
    CheckCircle2,
    AlertCircle,
    Archive,
    ArrowLeft,
} from "lucide-react";

const EditBookingPage = () => {
    const navigate = useNavigate();
    const { bookingCode } = useParams();
    const [bookingDetails, setBookingDetails] = useState(null);
    const [error, setError] = useState(null);
    const [success, setSuccessMessage] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchBookingDetails = async () => {
            try {
                const response = await ApiService.getBookingByConfirmationCode(bookingCode);
                setBookingDetails(response.booking);
            } catch (error) {
                setError(error.response?.data?.message || error.message);
            }
        };
        fetchBookingDetails();
    }, [bookingCode]);

    const archiveBooking = async (bookingId) => {
        if (!window.confirm("⚠️ Are you sure you want to archive this booking?")) return;

        try {
            setLoading(true);
            const response = await ApiService.cancelBooking(bookingId);
            if (response.statusCode === 200) {
                setSuccessMessage("✅ The booking was successfully archived!");
                setTimeout(() => {
                    navigate("/admin/manage-bookings");
                }, 2500);
            }
        } catch (error) {
            setError(error.response?.data?.message || error.message);
        } finally {
            setLoading(false);
            setTimeout(() => {
                setError("");
                setSuccessMessage("");
            }, 4000);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-100 px-6 py-12 flex justify-center items-center">
            <div className="bg-white border border-gray-200 rounded-3xl shadow-2xl w-full max-w-4xl p-8 transition-all hover:shadow-3xl">
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <button
                        onClick={() => navigate("/admin/manage-bookings")}
                        className="flex items-center gap-2 text-gray-500 hover:text-emerald-500 transition"
                    >
                        <ArrowLeft size={18} /> Back
                    </button>
                    <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
                        <CalendarDays className="text-emerald-500" size={30} /> Booking Details
                    </h2>
                </div>

                {/* Alerts */}
                {error && (
                    <div className="bg-red-50 border border-red-300 text-red-600 text-sm py-3 px-4 rounded-lg mb-5 flex items-center gap-2">
                        <AlertCircle size={18} /> {error}
                    </div>
                )}
                {success && (
                    <div className="bg-green-50 border border-green-300 text-green-600 text-sm py-3 px-4 rounded-lg mb-5 flex items-center gap-2">
                        <CheckCircle2 size={18} /> {success}
                    </div>
                )}

                {/* Booking Details */}
                {bookingDetails ? (
                    <div className="space-y-8">
                        {/* Section 1: Booking Info */}
                        <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 shadow-inner">
                            <h3 className="text-xl font-semibold text-gray-800 mb-4">
                                🧾 Booking Information
                            </h3>
                            <div className="grid sm:grid-cols-2 gap-3 text-gray-700 text-sm">
                                <p>
                                    <strong>Confirmation Code:</strong>{" "}
                                    {bookingDetails.bookingConfirmationCode}
                                </p>
                                <p>
                                    <strong>Check-in:</strong> {bookingDetails.checkInDate}
                                </p>
                                <p>
                                    <strong>Check-out:</strong> {bookingDetails.checkOutDate}
                                </p>
                                <p>
                                    <strong>Adults:</strong> {bookingDetails.numOfAdults}
                                </p>
                                <p>
                                    <strong>Children:</strong> {bookingDetails.numOfChildren}
                                </p>
                                <p>
                                    <strong>Guest Email:</strong> {bookingDetails.guestEmail}
                                </p>
                            </div>
                        </div>

                        {/* Section 2: Booker Info */}
                        <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 shadow-inner">
                            <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                                <User className="text-emerald-500" size={20} /> Booker Details
                            </h3>
                            <div className="grid sm:grid-cols-2 gap-3 text-gray-700 text-sm">
                                <p>
                                    <strong>Name:</strong> {bookingDetails.user.name}
                                </p>
                                <p className="flex items-center gap-2">
                                    <Mail size={16} className="text-gray-500" />
                                    {bookingDetails.user.email}
                                </p>
                                <p className="flex items-center gap-2">
                                    <Phone size={16} className="text-gray-500" />
                                    {bookingDetails.user.phoneNumber}
                                </p>
                            </div>
                        </div>

                        {/* Section 3: Room Info */}
                        <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 shadow-inner">
                            <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                                <BedDouble className="text-emerald-500" size={20} /> Room Details
                            </h3>
                            <div className="grid sm:grid-cols-2 gap-3 text-gray-700 text-sm">
                                <p>
                                    <strong>Room Type:</strong> {bookingDetails.room.roomType}
                                </p>
                                <p>
                                    <strong>Price:</strong> ${bookingDetails.room.roomPrice}
                                </p>
                                <p className="sm:col-span-2">
                                    <strong>Description:</strong> {bookingDetails.room.roomDescription}
                                </p>
                            </div>
                            <div className="mt-4 flex justify-center">
                                <img
                                    src={bookingDetails.room.roomPhotoUrl}
                                    alt="Room"
                                    className="w-full max-w-sm rounded-2xl shadow-md border"
                                />
                            </div>
                        </div>

                        {/* Action Button */}
                        <div className="flex justify-center mt-8">
                            <button
                                onClick={() => archiveBooking(bookingDetails.id)}
                                disabled={loading}
                                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-blue-500 text-white font-semibold rounded-xl shadow-md hover:opacity-90 active:scale-95 transition-all"
                            >
                                {loading ? "Archiving..." : <><Archive size={18} /> Archive Booking</>}
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="text-center py-16 text-gray-500">
                        <p>Loading booking details...</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default EditBookingPage;
