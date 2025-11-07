import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ApiService from "../../service/ApiService";
import { Upload, PlusCircle, ImagePlus, CheckCircle2, AlertCircle } from "lucide-react";

const AddRoomPage = () => {
    const navigate = useNavigate();
    const [roomDetails, setRoomDetails] = useState({
        roomPhotoUrl: "",
        roomType: "",
        roomPrice: "",
        roomDescription: "",
    });
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [roomTypes, setRoomTypes] = useState([]);
    const [newRoomType, setNewRoomType] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchRoomTypes = async () => {
            try {
                const types = await ApiService.getRoomTypes();
                setRoomTypes(types);
            } catch (error) {
                console.error("Error fetching room types:", error.message);
            }
        };
        fetchRoomTypes();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setRoomDetails((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleRoomTypeChange = (e) => {
        if (e.target.value === "new") {
            setNewRoomType(true);
            setRoomDetails((prev) => ({ ...prev, roomType: "" }));
        } else {
            setNewRoomType(false);
            setRoomDetails((prev) => ({ ...prev, roomType: e.target.value }));
        }
    };

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            setPreview(URL.createObjectURL(selectedFile));
        } else {
            setFile(null);
            setPreview(null);
        }
    };

    const addRoom = async () => {
        if (!roomDetails.roomType || !roomDetails.roomPrice || !roomDetails.roomDescription) {
            setError("⚠️ All room details must be provided.");
            setTimeout(() => setError(""), 5000);
            return;
        }

        if (!window.confirm("Do you want to add this room?")) return;

        try {
            setLoading(true);
            const formData = new FormData();
            formData.append("roomType", roomDetails.roomType);
            formData.append("roomPrice", roomDetails.roomPrice);
            formData.append("roomDescription", roomDetails.roomDescription);
            if (file) formData.append("photo", file);

            const result = await ApiService.addRoom(formData);
            if (result.statusCode === 200) {
                setSuccess("✅ Room added successfully!");
                setTimeout(() => {
                    navigate("/admin/manage-rooms");
                }, 2500);
            }
        } catch (error) {
            setError(error.response?.data?.message || error.message);
        } finally {
            setLoading(false);
            setTimeout(() => {
                setError("");
                setSuccess("");
            }, 4000);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-100 flex items-center justify-center px-6 py-12">
            <div className="bg-white border border-gray-200 shadow-xl rounded-3xl w-full max-w-3xl p-8">
                {/* Header */}
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-gray-800 flex justify-center items-center gap-2">
                        <PlusCircle className="text-emerald-500" size={30} /> Add New Room
                    </h2>
                    <p className="text-gray-500 text-sm mt-1">
                        Fill in the details below to add a new room
                    </p>
                </div>

                {/* Success / Error Messages */}
                {error && (
                    <div className="bg-red-50 border border-red-300 text-red-600 text-sm py-3 px-4 rounded-lg mb-4 flex items-center gap-2">
                        <AlertCircle size={18} /> {error}
                    </div>
                )}
                {success && (
                    <div className="bg-green-50 border border-green-300 text-green-600 text-sm py-3 px-4 rounded-lg mb-4 flex items-center gap-2">
                        <CheckCircle2 size={18} /> {success}
                    </div>
                )}

                {/* Form */}
                <div className="space-y-6">
                    {/* Room Photo Upload */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Room Photo
                        </label>
                        <div className="flex flex-col sm:flex-row items-center gap-4">
                            {preview ? (
                                <img
                                    src={preview}
                                    alt="Preview"
                                    className="w-40 h-40 object-cover rounded-2xl border shadow-md"
                                />
                            ) : (
                                <div className="w-40 h-40 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-2xl text-gray-400">
                                    <ImagePlus size={30} />
                                </div>
                            )}
                            <label className="flex items-center gap-2 cursor-pointer bg-gradient-to-r from-emerald-500 to-blue-500 text-white px-4 py-2 rounded-xl font-semibold shadow-md hover:opacity-90 transition">
                                <Upload size={18} /> Upload
                                <input type="file" className="hidden" onChange={handleFileChange} />
                            </label>
                        </div>
                    </div>

                    {/* Room Type */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Room Type
                        </label>
                        <select
                            value={roomDetails.roomType}
                            onChange={handleRoomTypeChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 bg-gray-50 transition"
                        >
                            <option value="">Select a room type</option>
                            {roomTypes.map((type) => (
                                <option key={type} value={type}>
                                    {type}
                                </option>
                            ))}
                            <option value="new">Other (please specify)</option>
                        </select>

                        {newRoomType && (
                            <input
                                type="text"
                                name="roomType"
                                placeholder="Enter new room type"
                                value={roomDetails.roomType}
                                onChange={handleChange}
                                className="mt-3 w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 bg-gray-50 transition"
                            />
                        )}
                    </div>

                    {/* Room Price */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Room Price
                        </label>
                        <input
                            type="number"
                            name="roomPrice"
                            placeholder="Enter price per night"
                            value={roomDetails.roomPrice}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 bg-gray-50 transition"
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Room Description
                        </label>
                        <textarea
                            name="roomDescription"
                            placeholder="Describe the room (amenities, features, etc.)"
                            value={roomDetails.roomDescription}
                            onChange={handleChange}
                            rows={4}
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 bg-gray-50 transition"
                        ></textarea>
                    </div>

                    {/* Submit Button */}
                    <button
                        onClick={addRoom}
                        disabled={loading}
                        className="w-full flex justify-center items-center gap-2 py-3 mt-3 bg-gradient-to-r from-emerald-500 to-blue-500 text-white font-semibold rounded-xl shadow-md hover:opacity-90 active:scale-95 transition-all"
                    >
                        {loading ? "Adding Room..." : "Add Room"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddRoomPage;
