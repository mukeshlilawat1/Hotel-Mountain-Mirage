import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ApiService from "../../service/ApiService";
import {
    ImagePlus,
    Upload,
    Edit3,
    Trash2,
    CheckCircle2,
    AlertCircle,
} from "lucide-react";

const EditRoomPage = () => {
    const { roomId } = useParams();
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
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchRoomDetails = async () => {
            try {
                const response = await ApiService.getRoomById(roomId);
                setRoomDetails({
                    roomPhotoUrl: response.room.roomPhotoUrl,
                    roomType: response.room.roomType,
                    roomPrice: response.room.roomPrice,
                    roomDescription: response.room.roomDescription,
                });
            } catch (error) {
                setError(error.response?.data?.message || error.message);
            }
        };
        fetchRoomDetails();
    }, [roomId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setRoomDetails((prev) => ({
            ...prev,
            [name]: value,
        }));
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

    const handleUpdate = async () => {
        try {
            setLoading(true);
            const formData = new FormData();
            formData.append("roomType", roomDetails.roomType);
            formData.append("roomPrice", roomDetails.roomPrice);
            formData.append("roomDescription", roomDetails.roomDescription);
            if (file) formData.append("photo", file);

            const result = await ApiService.updateRoom(roomId, formData);
            if (result.statusCode === 200) {
                setSuccess("✅ Room updated successfully!");
                setTimeout(() => navigate("/admin/manage-rooms"), 2500);
            }
        } catch (error) {
            setError(error.response?.data?.message || error.message);
        } finally {
            setLoading(false);
            setTimeout(() => {
                setSuccess("");
                setError("");
            }, 4000);
        }
    };

    const handleDelete = async () => {
        if (!window.confirm("⚠️ Are you sure you want to delete this room?")) return;
        try {
            const result = await ApiService.deleteRoom(roomId);
            if (result.statusCode === 200) {
                setSuccess("✅ Room deleted successfully!");
                setTimeout(() => navigate("/admin/manage-rooms"), 2500);
            }
        } catch (error) {
            setError(error.response?.data?.message || error.message);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-100 flex justify-center items-center px-6 py-12">
            <div className="bg-white border border-gray-200 shadow-xl rounded-3xl w-full max-w-3xl p-8">
                {/* Header */}
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-gray-800 flex justify-center items-center gap-2">
                        <Edit3 className="text-emerald-500" size={28} />
                        Edit Room
                    </h2>
                    <p className="text-gray-500 text-sm mt-1">
                        Update or delete this room’s details below.
                    </p>
                </div>

                {/* Alerts */}
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

                {/* Room Form */}
                <div className="space-y-6">
                    {/* Photo Upload */}
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
                            ) : roomDetails.roomPhotoUrl ? (
                                <img
                                    src={roomDetails.roomPhotoUrl}
                                    alt="Room"
                                    className="w-40 h-40 object-cover rounded-2xl border shadow-md"
                                />
                            ) : (
                                <div className="w-40 h-40 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-2xl text-gray-400">
                                    <ImagePlus size={30} />
                                </div>
                            )}

                            <label className="flex items-center gap-2 cursor-pointer bg-gradient-to-r from-blue-500 to-emerald-500 text-white px-4 py-2 rounded-xl font-semibold shadow-md hover:opacity-90 transition">
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
                        <input
                            type="text"
                            name="roomType"
                            value={roomDetails.roomType}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-gray-50 focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 transition"
                        />
                    </div>

                    {/* Room Price */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Room Price
                        </label>
                        <input
                            type="number"
                            name="roomPrice"
                            value={roomDetails.roomPrice}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-gray-50 focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 transition"
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Room Description
                        </label>
                        <textarea
                            name="roomDescription"
                            value={roomDetails.roomDescription}
                            onChange={handleChange}
                            rows={4}
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-gray-50 focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 transition"
                        ></textarea>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row justify-between gap-4 mt-8">
                        <button
                            onClick={handleUpdate}
                            disabled={loading}
                            className="w-full sm:w-1/2 flex justify-center items-center gap-2 py-3 bg-gradient-to-r from-blue-500 to-emerald-500 text-white font-semibold rounded-xl shadow-md hover:opacity-90 active:scale-95 transition-all"
                        >
                            {loading ? "Updating..." : "Update Room"}
                        </button>
                        <button
                            onClick={handleDelete}
                            className="w-full sm:w-1/2 flex justify-center items-center gap-2 py-3 bg-red-500 text-white font-semibold rounded-xl shadow-md hover:bg-red-600 active:scale-95 transition-all"
                        >
                            <Trash2 size={18} /> Delete Room
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditRoomPage;
