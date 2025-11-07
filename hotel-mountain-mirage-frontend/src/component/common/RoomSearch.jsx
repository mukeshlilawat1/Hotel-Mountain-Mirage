import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ApiService from "../../service/ApiService";
import { ExpandMore } from "@mui/icons-material";

const RoomSearch = ({ handleSearchResult }) => {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [roomType, setRoomType] = useState("");
    const [roomTypes, setRoomTypes] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState("");
    const [dropdownOpen, setDropdownOpen] = useState(false);

    useEffect(() => {
        const fetchRoomTypes = async () => {
            try {
                const types = await ApiService.getRoomTypes();
                if (Array.isArray(types)) setRoomTypes(types);
                else if (types?.data && Array.isArray(types.data)) setRoomTypes(types.data);
                else if (types?.roomTypes && Array.isArray(types.roomTypes))
                    setRoomTypes(types.roomTypes);
            } catch (err) {
                console.error("❌ Error fetching room types:", err);
            }
        };
        fetchRoomTypes();
    }, []);

    const showError = (message, timeOut = 4000) => {
        setError(message);
        setTimeout(() => setError(""), timeOut);
    };

    const showSuccess = (message, timeOut = 3000) => {
        setSuccess(message);
        setTimeout(() => setSuccess(""), timeOut);
    };

    const handleInternalSearch = async () => {
        if (!startDate || !endDate || !roomType) {
            showError("⚠️ Please select all fields before searching.");
            return;
        }

        try {
            setLoading(true);
            const formattedStartDate = startDate.toISOString().split("T")[0];
            const formattedEndDate = endDate.toISOString().split("T")[0];
            const response = await ApiService.getAvailableRoomsByDateAndType(
                formattedStartDate,
                formattedEndDate,
                roomType
            );

            if (response.statusCode === 200) {
                if (!response.roomList || response.roomList.length === 0) {
                    showError("🚫 No rooms available for the selected type and date range.");
                    return;
                }
                handleSearchResult(response.roomList);
                setError("");
                showSuccess("✅ Rooms found successfully!");
            }
        } catch (err) {
            console.error("Search error:", err);
            showError(err?.response?.data?.message || "Something went wrong!");
        } finally {
            setLoading(false);
        }
    };

    const clearForm = () => {
        setStartDate(null);
        setEndDate(null);
        setRoomType("");
        setError("");
        setSuccess("");
    };

    return (
        <section className="w-full flex justify-center px-4 sm:px-6">
            <div className="w-full max-w-3xl bg-white rounded-3xl shadow-xl border border-gray-100 p-6 sm:p-8 space-y-8 relative overflow-hidden">
                {/* Accent border */}
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-t-3xl" />

                <h2 className="text-2xl md:text-3xl font-extrabold text-center text-gray-800">
                    🏨 Find Your Perfect Room
                </h2>
                <p className="text-center text-gray-500 text-sm sm:text-base -mt-3">
                    Choose your dates and room type below to check availability
                </p>

                {/* Fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Check-in Date */}
                    <div className="flex flex-col">
                        <label className="text-sm font-semibold text-gray-600 mb-1">
                            Check-in Date
                        </label>
                        <DatePicker
                            selected={startDate}
                            onChange={(date) => setStartDate(date)}
                            dateFormat="dd/MM/yyyy"
                            placeholderText="Select check-in date"
                            className="w-full border border-gray-300 rounded-lg p-2 text-gray-700 focus:ring-2 focus:ring-teal-500 focus:outline-none"
                        />
                    </div>

                    {/* Check-out Date */}
                    <div className="flex flex-col">
                        <label className="text-sm font-semibold text-gray-600 mb-1">
                            Check-out Date
                        </label>
                        <DatePicker
                            selected={endDate}
                            onChange={(date) => setEndDate(date)}
                            dateFormat="dd/MM/yyyy"
                            placeholderText="Select check-out date"
                            className="w-full border border-gray-300 rounded-lg p-2 text-gray-700 focus:ring-2 focus:ring-teal-500 focus:outline-none"
                        />
                    </div>

                    {/* Custom Room Type Dropdown */}
                    <div className="flex flex-col relative">
                        <label className="text-sm font-semibold text-gray-600 mb-1">
                            Room Type
                        </label>
                        <div
                            className="relative cursor-pointer"
                            onClick={() => setDropdownOpen(!dropdownOpen)}
                        >
                            <div className="w-full border border-gray-300 rounded-lg p-2 bg-white flex justify-between items-center text-gray-700 hover:border-teal-500 transition-all">
                                <span>
                                    {roomType || "Select Room Type"}
                                </span>
                                <ExpandMore
                                    className={`text-gray-500 transition-transform duration-300 ${dropdownOpen ? "rotate-180 text-teal-500" : ""
                                        }`}
                                />
                            </div>

                            {/* Dropdown List */}
                            {dropdownOpen && (
                                <div className="absolute z-20 mt-2 w-full bg-white rounded-lg shadow-lg border border-gray-100 max-h-60 overflow-auto animate-fadeIn">
                                    {roomTypes.length > 0 ? (
                                        roomTypes.map((type, index) => (
                                            <div
                                                key={index}
                                                onClick={() => {
                                                    setRoomType(type);
                                                    setDropdownOpen(false);
                                                }}
                                                className={`px-4 py-2 text-gray-700 hover:bg-teal-50 hover:text-teal-600 transition ${type === roomType
                                                        ? "bg-teal-100 text-teal-600 font-semibold"
                                                        : ""
                                                    }`}
                                            >
                                                {type}
                                            </div>
                                        ))
                                    ) : (
                                        <div className="px-4 py-2 text-gray-500">
                                            Loading room types...
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-4">
                    <button
                        onClick={handleInternalSearch}
                        disabled={loading}
                        className={`relative w-full sm:w-auto bg-gradient-to-r from-teal-500 to-emerald-500 text-white font-semibold px-10 py-3 rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 ${loading ? "opacity-70 cursor-not-allowed" : "hover:scale-105"
                            }`}
                    >
                        {loading ? (
                            <span className="flex items-center gap-2">
                                <svg
                                    className="animate-spin h-5 w-5 text-white"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                    ></circle>
                                    <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8v8H4z"
                                    ></path>
                                </svg>
                                Searching...
                            </span>
                        ) : (
                            "🔍 Search Rooms"
                        )}
                    </button>

                    <button
                        onClick={clearForm}
                        className="w-full sm:w-auto bg-gray-100 hover:bg-gray-200 text-gray-600 font-semibold px-10 py-3 rounded-full shadow-md hover:shadow-xl transition-all duration-300"
                    >
                        Clear
                    </button>
                </div>

                {/* Messages */}
                {error && (
                    <p className="text-center text-red-500 font-medium mt-2 animate-pulse">
                        {error}
                    </p>
                )}
                {success && (
                    <p className="text-center text-green-600 font-medium mt-2 animate-fadeIn">
                        {success}
                    </p>
                )}
            </div>
        </section>
    );
};

export default RoomSearch;
