import React from "react";
import { useNavigate } from "react-router-dom";
import ApiService from "../../service/ApiService";

const RoomResult = ({ roomSearchResults = [] }) => {
    const navigate = useNavigate();
    const isAdmin = ApiService.isAdmin();

    // Handle empty state
    if (!roomSearchResults.length) {
        return (
            <section className="text-center py-16">
                <p className="text-gray-500 text-lg italic">
                    No rooms found. Try adjusting your search filters.
                </p>
            </section>
        );
    }

    return (
        <section className="py-10 px-4 md:px-8 lg:px-16">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                {roomSearchResults.map((room) => (
                    <div
                        key={room.id}
                        className="bg-white shadow-lg hover:shadow-2xl rounded-2xl overflow-hidden transition-transform transform hover:-translate-y-2 duration-300"
                    >
                        {/* Image */}
                        <div className="relative w-full h-56 overflow-hidden">
                            <img
                                src={room.roomPhotoUrl || "/assets/images/default-room.jpg"}
                                alt={`${room.roomType} room`}
                                loading="lazy"
                                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                            />

                            {/* Price Badge */}
                            <div className="absolute bottom-3 right-3 bg-teal-600 text-white px-3 py-1 rounded-full text-sm font-medium shadow-md">
                                ${room.roomPrice} / night
                            </div>
                        </div>

                        {/* Info */}
                        <div className="p-6">
                            <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                                {room.roomType}
                            </h3>

                            <p className="text-gray-500 text-sm mb-4 leading-relaxed">
                                {room.roomDescription?.length > 120
                                    ? `${room.roomDescription.substring(0, 120)}...`
                                    : room.roomDescription || "No description available."}
                            </p>

                            {/* Actions */}
                            <div className="flex justify-between items-center">
                                {isAdmin ? (
                                    <button
                                        onClick={() => navigate(`/admin/edit-room/${room.id}`)}
                                        className="bg-gradient-to-r from-amber-500 to-yellow-400 text-white font-medium px-4 py-2 rounded-lg shadow hover:shadow-xl hover:scale-105 transition-all duration-300"
                                    >
                                        Edit Room
                                    </button>
                                ) : (
                                    <button
                                        onClick={() => navigate(`/room-details-book/${room.id}`)}
                                        className="bg-gradient-to-r from-teal-500 to-emerald-500 text-white font-semibold px-4 py-2 rounded-lg shadow hover:shadow-xl hover:scale-105 transition-all duration-300"
                                    >
                                        View / Book Now
                                    </button>
                                )}

                                <span className="text-sm text-gray-400 italic">
                                    Room ID: {room.id}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default RoomResult;
