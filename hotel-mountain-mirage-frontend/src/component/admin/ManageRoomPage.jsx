import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ApiService from "../../service/ApiService";
import Pagination from "../common/Pagination";
import RoomResult from "../common/RoomResult";
import { Filter, PlusCircle, Layers } from "lucide-react";

const ManageRoomPage = () => {
    const [rooms, setRooms] = useState([]);
    const [filteredRooms, setFilteredRooms] = useState([]);
    const [roomTypes, setRoomTypes] = useState([]);
    const [selectedRoomType, setSelectedRoomType] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [roomsPerPage] = useState(5);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchRooms = async () => {
            try {
                const response = await ApiService.getAllRooms();
                const allRooms = response.roomList;
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
        setSelectedRoomType(e.target.value);
        filterRooms(e.target.value);
    };

    const filterRooms = (type) => {
        if (type === "") {
            setFilteredRooms(rooms);
        } else {
            const filtered = rooms.filter((room) => room.roomType === type);
            setFilteredRooms(filtered);
        }
        setCurrentPage(1);
    };

    // Pagination logic
    const indexOfLastRoom = currentPage * roomsPerPage;
    const indexOfFirstRoom = indexOfLastRoom - roomsPerPage;
    const currentRooms = filteredRooms.slice(indexOfFirstRoom, indexOfLastRoom);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-100 px-6 py-12">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-10">
                <div>
                    <h1 className="text-4xl font-extrabold text-gray-800 flex items-center gap-2">
                        <Layers className="text-emerald-500" size={36} />
                        Manage Rooms
                    </h1>
                    <p className="text-gray-500 text-sm mt-2">
                        View, filter, and manage all hotel rooms efficiently.
                    </p>
                </div>

                {/* Add Room Button */}
                <button
                    onClick={() => navigate("/admin/add-room")}
                    className="mt-5 md:mt-0 flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-blue-500 text-white font-semibold px-5 py-3 rounded-xl shadow-md hover:opacity-90 active:scale-95 transition-all"
                >
                    <PlusCircle size={20} />
                    Add New Room
                </button>
            </div>

            {/* Filter Section */}
            <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 flex flex-col sm:flex-row items-center justify-between gap-4 mb-10">
                <div className="flex items-center gap-2 text-gray-700 font-semibold">
                    <Filter size={20} className="text-emerald-500" />
                    <span>Filter by Room Type:</span>
                </div>
                <select
                    value={selectedRoomType}
                    onChange={handleRoomTypeChange}
                    className="w-full sm:w-auto px-4 py-2 border border-gray-300 rounded-lg shadow-sm bg-gray-50 focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 transition"
                >
                    <option value="">All Rooms</option>
                    {roomTypes.map((type) => (
                        <option key={type} value={type}>
                            {type}
                        </option>
                    ))}
                </select>
            </div>

            {/* Rooms Section */}
            {filteredRooms.length > 0 ? (
                <>
                    <RoomResult roomSearchResults={currentRooms} />

                    {/* Pagination */}
                    <div className="mt-10 flex justify-center">
                        <Pagination
                            roomsPerPage={roomsPerPage}
                            totalRooms={filteredRooms.length}
                            currentPage={currentPage}
                            paginate={paginate}
                        />
                    </div>
                </>
            ) : (
                <div className="text-center py-16">
                    <h3 className="text-2xl font-semibold text-gray-600">
                        No rooms available 😕
                    </h3>
                    <p className="text-gray-400 text-sm mt-2">
                        Try changing the filter or add a new room.
                    </p>
                </div>
            )}
        </div>
    );
};

export default ManageRoomPage;
