import React, { useState } from "react";
import ApiService from "../../service/ApiService";
import { Search, Hotel, EventAvailable, People, Email, Phone } from "@mui/icons-material";

const FindBookingPage = () => {
    const [confirmationCode, setConfirmationCode] = useState("");
    const [bookingDetails, setBookingDetails] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSearch = async () => {
        if (!confirmationCode.trim()) {
            setError("Please enter your booking confirmation code.");
            setTimeout(() => setError(""), 4000);
            return;
        }

        try {
            setLoading(true);
            const response = await ApiService.getBookingByConfirmationCode(confirmationCode);
            setBookingDetails(response.booking);
            setError(null);
        } catch (error) {
            setError(error.response?.data?.message || "No booking found with this confirmation code.");
            setTimeout(() => setError(""), 4000);
            setBookingDetails(null);
        } finally {
            setLoading(false);
        }
    };

    // Utility: Calculate number of nights
    const getNights = (checkIn, checkOut) => {
        const inDate = new Date(checkIn);
        const outDate = new Date(checkOut);
        const diffTime = Math.abs(outDate - inDate);
        return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    };

    return (
        <section className="min-h-screen bg-[#F9FAFB] flex flex-col items-center py-16 px-6">
            {/* HEADER */}
            <div className="text-center mb-10 animate-fadeIn">
                <h1 className="text-5xl font-extrabold text-gray-800 mb-3 tracking-tight">
                    Track Your <span className="text-teal-500">Booking</span>
                </h1>
                <p className="text-gray-500 max-w-2xl mx-auto text-lg">
                    Enter your confirmation code to view your reservation details, room info, and status.
                </p>
            </div>

            {/* SEARCH BOX */}
            <div className="bg-white/90 shadow-lg rounded-2xl p-6 w-full max-w-2xl flex flex-col md:flex-row gap-4 items-center justify-between hover:shadow-2xl transition-all duration-300">
                <div className="flex items-center gap-3 w-full">
                    <input
                        type="text"
                        placeholder="Enter your booking confirmation code"
                        value={confirmationCode}
                        onChange={(e) => setConfirmationCode(e.target.value)}
                        className="flex-1 px-4 py-3 border border-gray-300 rounded-lg text-gray-700 bg-gray-50 focus:ring-2 focus:ring-teal-500 focus:outline-none transition"
                    />
                    <button
                        onClick={handleSearch}
                        disabled={loading}
                        className={`flex items-center gap-2 bg-gradient-to-r from-teal-400 to-emerald-500 text-white px-6 py-3 rounded-lg shadow-md hover:scale-105 hover:shadow-lg transition-all duration-300 ${loading ? "opacity-70 cursor-not-allowed" : ""
                            }`}
                    >
                        <Search fontSize="small" />
                        {loading ? "Searching..." : "Find"}
                    </button>
                </div>
            </div>

            {error && <p className="text-red-500 text-sm font-medium mt-4">{error}</p>}

            {/* BOOKING DETAILS */}
            {bookingDetails && (
                <div className="mt-14 w-full max-w-5xl bg-white shadow-xl rounded-3xl p-10 animate-fadeIn border border-gray-100">
                    {/* TOP SECTION */}
                    <div className="flex flex-col md:flex-row justify-between items-center mb-8">
                        <div>
                            <h2 className="text-3xl font-semibold text-gray-800 mb-2">
                                Booking Confirmation:{" "}
                                <span className="text-teal-500">{bookingDetails.bookingConfirmationCode}</span>
                            </h2>
                            <p className="text-gray-500">
                                Status:{" "}
                                <span
                                    className={`font-semibold ${bookingDetails.cancelled ? "text-red-500" : "text-green-600"
                                        }`}
                                >
                                    {bookingDetails.cancelled ? "Cancelled" : "Active"}
                                </span>
                            </p>
                        </div>
                        <div className="mt-4 md:mt-0 bg-teal-50 text-teal-700 px-5 py-3 rounded-xl font-medium">
                            Stay Duration:{" "}
                            {getNights(bookingDetails.checkInDate, bookingDetails.checkOutDate)} Nights
                        </div>
                    </div>

                    {/* MAIN DETAILS */}
                    <div className="grid md:grid-cols-2 gap-10">
                        {/* LEFT: Room Details */}
                        <div className="space-y-4">
                            <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                                <Hotel fontSize="medium" className="text-teal-500" /> Room Information
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
                                className="rounded-lg shadow-md w-full h-56 object-cover mt-3 hover:scale-[1.02] transition-all"
                            />
                        </div>

                        {/* RIGHT: Booking & User Info */}
                        <div className="space-y-4">
                            <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                                <EventAvailable fontSize="medium" className="text-teal-500" /> Booking Information
                            </h3>
                            <p className="text-gray-600">
                                <strong>Check-in:</strong> {bookingDetails.checkInDate}
                            </p>
                            <p className="text-gray-600">
                                <strong>Check-out:</strong> {bookingDetails.checkOutDate}
                            </p>
                            <p className="text-gray-600">
                                <People className="inline mr-2 text-teal-500" />
                                <strong>Guests:</strong> {bookingDetails.numOfAdults} Adults,{" "}
                                {bookingDetails.numOfChildren} Children
                            </p>

                            <div className="pt-4 border-t border-gray-200">
                                <h4 className="text-lg font-semibold text-gray-800 mb-2 flex items-center gap-2">
                                    <Email fontSize="small" className="text-teal-500" /> Booker Details
                                </h4>
                                <p className="text-gray-600">
                                    <strong>Name:</strong> {bookingDetails.user.name}
                                </p>
                                <p className="text-gray-600 flex items-center gap-2">
                                    <Email fontSize="small" className="text-teal-500" /> {bookingDetails.user.email}
                                </p>
                                <p className="text-gray-600 flex items-center gap-2">
                                    <Phone fontSize="small" className="text-teal-500" />{" "}
                                    {bookingDetails.user.phoneNumber}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* BOTTOM: Summary Card */}
                    <div className="mt-10 p-6 bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl shadow-inner text-center">
                        <h4 className="text-lg font-semibold text-gray-700 mb-2">Total Cost</h4>
                        <p className="text-2xl font-bold text-teal-600">
                            $
                            {(
                                bookingDetails.room.roomPrice *
                                getNights(bookingDetails.checkInDate, bookingDetails.checkOutDate)
                            ).toFixed(2)}
                        </p>
                        <p className="text-sm text-gray-500 mt-1">
                            Includes all taxes & service charges
                        </p>

                        <button
                            onClick={() => window.print()}
                            className="mt-5 bg-gradient-to-r from-teal-400 to-emerald-500 text-white px-6 py-3 rounded-lg shadow-md hover:scale-105 hover:shadow-lg transition-all duration-300"
                        >
                            🧾 Print Invoice
                        </button>
                    </div>
                </div>
            )}
        </section>
    );
};

export default FindBookingPage;
