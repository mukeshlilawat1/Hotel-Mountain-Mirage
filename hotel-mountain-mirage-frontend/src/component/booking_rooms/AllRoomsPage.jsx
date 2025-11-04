import React, { useState, useEffect } from "react";
import ApiService from "../../service/ApiService";
import Pagination from "../common/Pagination";
import RoomResult from "../common/RoomResult";
import RoomSearch from "../common/RoomSearch";

const AllRoomsPage = () => {
    const [rooms, setRooms] = useState([]);
    const [filteredRooms, setFilteredRooms] = useState([]);
    const [roomTypes, setRoomTypes] = useState([]);
    const [selectedRoomType, setSelectedRoomType] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [roomsPerPage] = useState(6);

    const handleSearchResult = (results) => {
        setRooms(results);
        setFilteredRooms(results);
    };

    useEffect(() => {
        const fetchRooms = async () => {
            try {
                const response = await ApiService.getAllRooms();
                const allRooms = response.roomList || [];
                setRooms(allRooms);
                setFilteredRooms(allRooms);
            } catch (error) {
                console.error("Error fetching rooms:", error.message);
            }
        };

        const fetchRoomTypes = async () => {
            try {
                const types = await ApiService.getRoomTypes();
                setRoomTypes(types);
            } catch (error) {
                console.error("Error fetching room types:", error.message);
            }
        };

        fetchRooms();
        fetchRoomTypes();
    }, []);

    const handleRoomTypeChange = (e) => {
        const type = e.target.value;
        setSelectedRoomType(type);
        if (type === "") {
            setFilteredRooms(rooms);
        } else {
            const filtered = rooms.filter((room) => room.roomType === type);
            setFilteredRooms(filtered);
        }
        setCurrentPage(1);
    };

    const indexOfLastRoom = currentPage * roomsPerPage;
    const indexOfFirstRoom = indexOfLastRoom - roomsPerPage;
    const currentRooms = filteredRooms.slice(indexOfFirstRoom, indexOfLastRoom);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <section className="min-h-screen bg-[#F9FAFB]">
            {/* HERO HEADER */}
            <div className="relative bg-gradient-to-r from-teal-50 to-emerald-50 text-center py-16 mb-16">
                <h1 className="text-5xl font-extrabold text-gray-800 mb-3 tracking-tight">
                    Explore Our <span className="text-teal-600">Luxury Rooms</span>
                </h1>
                <p className="text-gray-500 max-w-2xl mx-auto text-lg leading-relaxed">
                    Comfort, class, and calm — find the perfect stay for your next mountain escape.
                </p>
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-24 h-1 bg-teal-500 rounded-full"></div>
            </div>

            {/* FILTER + SEARCH SECTION */}
            <div className="max-w-6xl mx-auto px-6 md:px-10 mb-16">
                <div className="bg-white rounded-2xl shadow-card p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 transition-all hover:shadow-hover">
                    <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
                        <label className="text-gray-700 font-semibold">Filter by Room Type:</label>
                        <select
                            value={selectedRoomType}
                            onChange={handleRoomTypeChange}
                            className="border border-gray-300 rounded-lg px-4 py-2 w-full md:w-64 text-gray-700 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all"
                        >
                            <option value="">All</option>
                            {roomTypes.map((type) => (
                                <option key={type} value={type}>
                                    {type}
                                </option>
                            ))}
                        </select>
                    </div>

                    <button
                        onClick={() => handleRoomTypeChange({ target: { value: "" } })}
                        className="bg-gradient-to-r from-teal-400 to-emerald-500 text-white px-6 py-2 rounded-lg shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300"
                    >
                        Reset Filter
                    </button>
                </div>

                {/* SEARCH BOX */}
                <div className="mt-12 animate-fadeIn">
                    <RoomSearch handleSearchResult={handleSearchResult} />
                </div>
            </div>

            {/* ROOMS GRID SECTION */}
            <div className="max-w-7xl mx-auto px-6 md:px-10">
                <div className="grid gap-10 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                    {currentRooms.length > 0 ? (
                        currentRooms.map((room) => (
                            <div
                                key={room.id}
                                className="bg-white rounded-2xl shadow-card overflow-hidden transform hover:scale-[1.02] transition-all duration-300"
                            >
                                <div className="relative">
                                    <img
                                        src={room.roomPhotoUrl || "/assets/images/default-room.jpg"}
                                        alt={room.roomType}
                                        className="w-full h-56 object-cover"
                                    />
                                    <span className="absolute top-3 left-3 bg-teal-500 text-white px-3 py-1 rounded-full text-sm shadow">
                                        {room.roomType}
                                    </span>
                                </div>

                                <div className="p-5">
                                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                                        {room.roomType}
                                    </h3>
                                    <p className="text-gray-500 text-sm mb-4 leading-relaxed">
                                        {room.roomDescription?.length > 120
                                            ? `${room.roomDescription.substring(0, 120)}...`
                                            : room.roomDescription}
                                    </p>

                                    <div className="flex items-center justify-between">
                                        <p className="text-lg font-bold text-teal-600">
                                            ${room.roomPrice}
                                            <span className="text-gray-500 text-sm font-medium"> / night</span>
                                        </p>
                                        <button
                                            onClick={() =>
                                                window.location.href = `/room-details-book/${room.id}`
                                            }
                                            className="bg-gradient-to-r from-teal-400 to-emerald-500 text-white px-5 py-2 rounded-lg shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300"
                                        >
                                            View Details
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-gray-500 col-span-full text-lg py-10">
                            No rooms available right now.
                        </p>
                    )}
                </div>

                {/* PAGINATION */}
                <div className="flex justify-center mt-12">
                    <Pagination
                        roomsPerPage={roomsPerPage}
                        totalRooms={filteredRooms.length}
                        currentPage={currentPage}
                        paginate={paginate}
                    />
                </div>
            </div>
        </section>
    );
};

export default AllRoomsPage;
