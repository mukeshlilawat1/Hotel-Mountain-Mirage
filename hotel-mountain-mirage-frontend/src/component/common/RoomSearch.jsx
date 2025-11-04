import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ApiService from "../../service/ApiService";

const RoomSearch = ({ handleSearchResult }) => {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [roomType, setRoomType] = useState("");
    const [roomTypes, setRoomTypes] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchRoomTypes = async () => {
            try {
                const types = await ApiService.getRoomTypes();
                console.log("✅ API raw response:", types);

                if (Array.isArray(types)) setRoomTypes(types);
                else if (types?.data && Array.isArray(types.data)) setRoomTypes(types.data);
                else if (types?.roomTypes && Array.isArray(types.roomTypes))
                    setRoomTypes(types.roomTypes);
                else console.warn("⚠️ Unknown response format:", types);
            } catch (err) {
                console.error("❌ Error fetching room types:", err);
            }
        };
        fetchRoomTypes();
    }, []);

    const showError = (message, timeOut = 5000) => {
        setError(message);
        setTimeout(() => setError(""), timeOut);
    };

    const handleInternalSearch = async () => {
        if (!startDate || !endDate || !roomType) {
            showError("Please select all fields.");
            return;
        }

        try {
            const formattedStartDate = startDate.toISOString().split("T")[0];
            const formattedEndDate = endDate.toISOString().split("T")[0];
            const response = await ApiService.getAvailableRoomsByDateAndType(
                formattedStartDate,
                formattedEndDate,
                roomType
            );

            if (response.statusCode === 200) {
                if (!response.roomList || response.roomList.length === 0) {
                    showError(
                        "No rooms available for the selected type and date range."
                    );
                    return;
                }
                handleSearchResult(response.roomList);
                setError("");
            }
        } catch (err) {
            console.error("Search error:", err);
            showError(err?.response?.data?.message || "Something went wrong!");
        }
    };

    return (
        <section className="w-full flex justify-center">
            <div className="w-full max-w-3xl bg-white rounded-2xl shadow-lg p-6 md:p-8 space-y-6 border border-gray-100">
                <h2 className="text-2xl font-bold text-gray-700 text-center">
                    Search Available Rooms
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Check-in Date */}
                    <div className="flex flex-col">
                        <label className="text-sm font-medium text-gray-600 mb-1">
                            Check-in Date
                        </label>
                        <DatePicker
                            selected={startDate}
                            onChange={(date) => setStartDate(date)}
                            dateFormat="dd/MM/yyyy"
                            placeholderText="Select check-in date"
                            className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-teal-500 focus:outline-none"
                        />
                    </div>

                    {/* Check-out Date */}
                    <div className="flex flex-col">
                        <label className="text-sm font-medium text-gray-600 mb-1">
                            Check-out Date
                        </label>
                        <DatePicker
                            selected={endDate}
                            onChange={(date) => setEndDate(date)}
                            dateFormat="dd/MM/yyyy"
                            placeholderText="Select check-out date"
                            className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-teal-500 focus:outline-none"
                        />
                    </div>

                    {/* Room Type */}
                    <div className="flex flex-col">
                        <label className="text-sm font-medium text-gray-600 mb-1">
                            Room Type
                        </label>
                        <select
                            value={roomType}
                            onChange={(e) => setRoomType(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg p-2 bg-white focus:ring-2 focus:ring-teal-500 focus:outline-none"
                        >
                            <option disabled value="">
                                Select Room Type
                            </option>
                            {roomTypes.map((type, index) => (
                                <option key={index} value={type}>
                                    {type}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Button */}
                <div className="flex justify-center">
                    <button
                        onClick={handleInternalSearch}
                        className="bg-gradient-to-r from-teal-500 to-emerald-500 text-white font-semibold px-8 py-3 rounded-full shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300"
                    >
                        Search Rooms
                    </button>
                </div>

                {/* Error Message */}
                {error && (
                    <p className="text-center text-red-500 font-medium mt-2 animate-pulse">
                        {error}
                    </p>
                )}
            </div>
        </section>
    );
};

export default RoomSearch;
