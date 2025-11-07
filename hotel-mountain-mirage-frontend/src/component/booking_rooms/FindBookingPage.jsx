import React, { useState } from "react";
import ApiService from "../../service/ApiService";
import {
    Search,
    Hotel,
    EventAvailable,
    People,
    Email,
    Phone,
    RestartAlt,
    Download,
} from "@mui/icons-material";

const FindBookingPage = () => {
    const [confirmationCode, setConfirmationCode] = useState("");
    const [bookingDetails, setBookingDetails] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState("");

    const handleSearch = async () => {
        if (!confirmationCode.trim()) {
            setError("⚠️ Please enter your booking confirmation code.");
            setTimeout(() => setError(""), 4000);
            return;
        }

        try {
            setLoading(true);
            const response = await ApiService.getBookingByConfirmationCode(
                confirmationCode
            );
            setBookingDetails(response.booking);
            setError(null);
            setSuccess("✅ Booking found successfully!");
            setTimeout(() => setSuccess(""), 4000);
        } catch (error) {
            setError(
                error.response?.data?.message ||
                "❌ No booking found with this confirmation code."
            );
            setTimeout(() => setError(""), 4000);
            setBookingDetails(null);
        } finally {
            setLoading(false);
        }
    };

    const getNights = (checkIn, checkOut) => {
        const inDate = new Date(checkIn);
        const outDate = new Date(checkOut);
        const diffTime = Math.abs(outDate - inDate);
        return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    };

    const clearSearch = () => {
        setConfirmationCode("");
        setBookingDetails(null);
        setError("");
        setSuccess("");
    };

    const handleSavePDF = () => {
        window.print();
    };

    return (
        <section className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col items-center py-14 px-4 sm:px-6">
            {/* Header */}
            <div className="text-center mb-10 animate-fadeIn">
                <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-800 mb-3 tracking-tight leading-snug">
                    Track Your <span className="text-teal-500">Booking</span>
                </h1>
                <p className="text-gray-500 max-w-2xl mx-auto text-base sm:text-lg">
                    Enter your booking confirmation code to view your reservation details.
                </p>
            </div>

            {/* Search Box */}
            <div className="bg-white/90 backdrop-blur-md shadow-lg rounded-3xl p-6 w-full max-w-2xl flex flex-col sm:flex-row gap-4 items-center hover:shadow-2xl transition-all duration-300">
                <input
                    type="text"
                    placeholder="Enter confirmation code"
                    value={confirmationCode}
                    onChange={(e) => setConfirmationCode(e.target.value)}
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg text-gray-700 bg-gray-50 focus:ring-2 focus:ring-teal-500 focus:outline-none text-sm sm:text-base"
                />
                <div className="flex gap-3 w-full sm:w-auto justify-center">
                    <button
                        onClick={handleSearch}
                        disabled={loading}
                        className={`flex items-center justify-center gap-2 w-full sm:w-auto bg-gradient-to-r from-teal-500 to-emerald-500 text-white px-6 py-3 rounded-lg shadow-md hover:scale-105 hover:shadow-lg transition-all duration-300 ${loading ? "opacity-70 cursor-not-allowed" : ""
                            }`}
                    >
                        <Search fontSize="small" />
                        {loading ? "Searching..." : "Find"}
                    </button>

                    <button
                        onClick={clearSearch}
                        className="flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-600 px-5 py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
                    >
                        <RestartAlt fontSize="small" /> Clear
                    </button>
                </div>
            </div>

            {/* Messages */}
            {error && (
                <p className="text-red-500 text-sm font-medium mt-4 text-center animate-pulse">
                    {error}
                </p>
            )}
            {success && (
                <p className="text-green-600 text-sm font-medium mt-4 text-center animate-fadeIn">
                    {success}
                </p>
            )}

            {/* Booking Details */}
            {bookingDetails && (
                <div className="mt-10 w-full max-w-5xl bg-white shadow-xl rounded-3xl p-6 sm:p-10 animate-fadeIn border border-gray-100">
                    {/* Top Section */}
                    <div className="flex flex-col md:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8">
                        <div className="mb-4 md:mb-0">
                            <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800">
                                Booking Code:{" "}
                                <span className="text-teal-500">
                                    {bookingDetails.bookingConfirmationCode}
                                </span>
                            </h2>
                            <p className="text-gray-500 mt-1">
                                Status:{" "}
                                <span
                                    className={`font-semibold ${bookingDetails.cancelled
                                            ? "text-red-500"
                                            : "text-green-600"
                                        }`}
                                >
                                    {bookingDetails.cancelled ? "Cancelled" : "Active"}
                                </span>
                            </p>
                        </div>

                        <div className="bg-teal-50 text-teal-700 px-5 py-3 rounded-xl font-medium text-center sm:text-right">
                            Stay Duration:{" "}
                            {getNights(
                                bookingDetails.checkInDate,
                                bookingDetails.checkOutDate
                            )}{" "}
                            Nights
                        </div>
                    </div>

                    {/* Details Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        {/* Left: Room Details */}
                        <div className="space-y-4">
                            <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                                <Hotel fontSize="medium" className="text-teal-500" /> Room Info
                            </h3>
                            <p className="text-gray-600">
                                <strong>Type:</strong> {bookingDetails.room.roomType}
                            </p>
                            <p className="text-gray-600">
                                <strong>Price:</strong> ${bookingDetails.room.roomPrice} / night
                            </p>
                            <img
                                src={bookingDetails.room.roomPhotoUrl}
                                alt={bookingDetails.room.roomType}
                                className="rounded-lg shadow-md w-full h-56 sm:h-64 object-cover mt-3 hover:scale-[1.02] transition-all duration-300"
                            />
                        </div>

                        {/* Right: Booking Info */}
                        <div className="space-y-4">
                            <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                                <EventAvailable
                                    fontSize="medium"
                                    className="text-teal-500"
                                />{" "}
                                Booking Details
                            </h3>
                            <p className="text-gray-600">
                                <strong>Check-in:</strong> {bookingDetails.checkInDate}
                            </p>
                            <p className="text-gray-600">
                                <strong>Check-out:</strong> {bookingDetails.checkOutDate}
                            </p>
                            <p className="text-gray-600 flex items-center gap-1">
                                <People fontSize="small" className="text-teal-500" />{" "}
                                <strong>Guests:</strong> {bookingDetails.numOfAdults} Adults,{" "}
                                {bookingDetails.numOfChildren} Children
                            </p>

                            {/* Booker Info */}
                            <div className="pt-4 border-t border-gray-200">
                                <h4 className="text-lg font-semibold text-gray-800 mb-2 flex items-center gap-2">
                                    <Email fontSize="small" className="text-teal-500" /> Booker
                                    Info
                                </h4>
                                <p className="text-gray-600">
                                    <strong>Name:</strong> {bookingDetails.user.name}
                                </p>
                                <p className="text-gray-600 flex items-center gap-2">
                                    <Email fontSize="small" className="text-teal-500" />{" "}
                                    {bookingDetails.user.email}
                                </p>
                                <p className="text-gray-600 flex items-center gap-2">
                                    <Phone fontSize="small" className="text-teal-500" />{" "}
                                    {bookingDetails.user.phoneNumber}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Summary */}
                    <div className="mt-10 p-6 bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl shadow-inner text-center">
                        <h4 className="text-lg font-semibold text-gray-700 mb-2">
                            Total Cost
                        </h4>
                        <p className="text-3xl font-bold text-teal-600">
                            $
                            {(
                                bookingDetails.room.roomPrice *
                                getNights(
                                    bookingDetails.checkInDate,
                                    bookingDetails.checkOutDate
                                )
                            ).toFixed(2)}
                        </p>
                        <p className="text-sm text-gray-500 mt-1">
                            Includes all taxes & service charges
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-5">
                            <button
                                onClick={handleSavePDF}
                                className="flex items-center justify-center gap-2 bg-gradient-to-r from-teal-500 to-emerald-500 text-white px-6 py-3 rounded-lg shadow-md hover:scale-105 hover:shadow-lg transition-all duration-300"
                            >
                                <Download fontSize="small" /> Save / Print
                            </button>
                            <button
                                onClick={clearSearch}
                                className="flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
                            >
                                <RestartAlt fontSize="small" /> New Search
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

export default FindBookingPage;
