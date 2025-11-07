import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ApiService from "../../service/ApiService";
import Pagination from "../common/Pagination";
import { CalendarCheck2, Search, ClipboardList, ArrowRight } from "lucide-react";

const ManageBookingsPage = () => {
    const [bookings, setBookings] = useState([]);
    const [filteredBookings, setFilteredBookings] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [bookingsPerPage] = useState(6);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const response = await ApiService.getAllBookings();
                const allBookings = response.bookingList || [];
                setBookings(allBookings);
                setFilteredBookings(allBookings);
            } catch (error) {
                console.error("Error fetching bookings:", error.message);
            }
        };

        fetchBookings();
    }, []);

    useEffect(() => {
        filterBookings(searchTerm);
    }, [searchTerm, bookings]);

    const filterBookings = (term) => {
        if (!term.trim()) {
            setFilteredBookings(bookings);
        } else {
            const filtered = bookings.filter(
                (b) =>
                    b.bookingConfirmationCode &&
                    b.bookingConfirmationCode.toLowerCase().includes(term.toLowerCase())
            );
            setFilteredBookings(filtered);
        }
        setCurrentPage(1);
    };

    const handleSearchChange = (e) => setSearchTerm(e.target.value);

    // Pagination Logic
    const indexOfLastBooking = currentPage * bookingsPerPage;
    const indexOfFirstBooking = indexOfLastBooking - bookingsPerPage;
    const currentBookings = filteredBookings.slice(indexOfFirstBooking, indexOfLastBooking);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-100 px-6 py-12">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-10">
                <div>
                    <h1 className="text-4xl font-extrabold text-gray-800 flex items-center gap-2">
                        <ClipboardList className="text-emerald-500" size={36} />
                        Manage Bookings
                    </h1>
                    <p className="text-gray-500 text-sm mt-2">
                        View, search, and manage all customer bookings efficiently.
                    </p>
                </div>
            </div>

            {/* Search Filter */}
            <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 mb-10 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-gray-700 font-semibold">
                    <Search size={20} className="text-emerald-500" />
                    <span>Search by Booking Number:</span>
                </div>
                <input
                    type="text"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    placeholder="Enter booking confirmation code"
                    className="w-full sm:w-80 px-4 py-2 border border-gray-300 rounded-lg shadow-sm bg-gray-50 focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 transition"
                />
            </div>

            {/* Booking Cards */}
            {currentBookings.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {currentBookings.map((booking) => (
                        <div
                            key={booking.id}
                            className="bg-white border border-gray-200 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-6 flex flex-col justify-between"
                        >
                            <div>
                                <h3 className="text-lg font-semibold text-gray-800 mb-2 flex items-center gap-2">
                                    <CalendarCheck2 className="text-emerald-500" size={20} />
                                    {booking.bookingConfirmationCode}
                                </h3>
                                <div className="text-sm text-gray-600 space-y-1">
                                    <p>
                                        <strong>Check-In:</strong> {booking.checkInDate}
                                    </p>
                                    <p>
                                        <strong>Check-Out:</strong> {booking.checkOutDate}
                                    </p>
                                    <p>
                                        <strong>Guests:</strong> {booking.totalNumOfGuest}
                                    </p>
                                    <p>
                                        <strong>Room Type:</strong> {booking.room?.roomType || "N/A"}
                                    </p>
                                </div>
                            </div>

                            <button
                                onClick={() =>
                                    navigate(`/admin/edit-booking/${booking.bookingConfirmationCode}`)
                                }
                                className="mt-5 flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-emerald-400 text-white font-semibold rounded-xl hover:opacity-90 active:scale-95 transition-all"
                            >
                                Manage Booking <ArrowRight size={18} />
                            </button>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-16">
                    <h3 className="text-2xl font-semibold text-gray-600">
                        No bookings found 😕
                    </h3>
                    <p className="text-gray-400 text-sm mt-2">
                        Try adjusting your search filter.
                    </p>
                </div>
            )}

            {/* Pagination */}
            {filteredBookings.length > 0 && (
                <div className="mt-12 flex justify-center">
                    <Pagination
                        roomsPerPage={bookingsPerPage}
                        totalRooms={filteredBookings.length}
                        currentPage={currentPage}
                        paginate={paginate}
                    />
                </div>
            )}
        </div>
    );
};

export default ManageBookingsPage;
