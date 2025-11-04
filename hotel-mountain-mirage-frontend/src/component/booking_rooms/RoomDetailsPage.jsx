import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ApiService from '../../service/ApiService';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { CalendarMonth, Group, ArrowBack, CheckCircleOutline } from '@mui/icons-material';

const RoomDetailsPage = () => {
    const navigate = useNavigate();
    const { roomId } = useParams();
    const [roomDetails, setRoomDetails] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [checkInDate, setCheckInDate] = useState(null);
    const [checkOutDate, setCheckOutDate] = useState(null);
    const [numAdults, setNumAdults] = useState(1);
    const [numChildren, setNumChildren] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalGuests, setTotalGuests] = useState(1);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [userId, setUserId] = useState('');
    const [showMessage, setShowMessage] = useState(false);
    const [confirmationCode, setConfirmationCode] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                const response = await ApiService.getRoomById(roomId);
                setRoomDetails(response.room);
                const userProfile = await ApiService.getUserProfile();
                setUserId(userProfile.user.id);
            } catch (error) {
                setError(error.response?.data?.message || error.message);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, [roomId]);

    const handleConfirmBooking = async () => {
        if (!checkInDate || !checkOutDate) {
            setErrorMessage('Please select check-in and check-out dates.');
            setTimeout(() => setErrorMessage(''), 5000);
            return;
        }

        if (isNaN(numAdults) || numAdults < 1 || isNaN(numChildren) || numChildren < 0) {
            setErrorMessage('Please enter valid numbers for adults and children.');
            setTimeout(() => setErrorMessage(''), 5000);
            return;
        }

        const oneDay = 24 * 60 * 60 * 1000;
        const startDate = new Date(checkInDate);
        const endDate = new Date(checkOutDate);
        const totalDays = Math.round(Math.abs((endDate - startDate) / oneDay)) + 1;

        const totalGuests = numAdults + numChildren;
        const totalPrice = roomDetails.roomPrice * totalDays;

        setTotalPrice(totalPrice);
        setTotalGuests(totalGuests);
    };

    const acceptBooking = async () => {
        try {
            const startDate = new Date(checkInDate);
            const endDate = new Date(checkOutDate);

            const formattedCheckInDate = new Date(startDate.getTime() - (startDate.getTimezoneOffset() * 60000)).toISOString().split('T')[0];
            const formattedCheckOutDate = new Date(endDate.getTime() - (endDate.getTimezoneOffset() * 60000)).toISOString().split('T')[0];

            const booking = {
                checkInDate: formattedCheckInDate,
                checkOutDate: formattedCheckOutDate,
                numOfAdults: numAdults,
                numOfChildren: numChildren
            };

            const response = await ApiService.bookRoom(roomId, userId, booking);
            if (response.statusCode === 200) {
                setConfirmationCode(response.bookingConfirmationCode);
                setShowMessage(true);
                setTimeout(() => {
                    setShowMessage(false);
                    navigate('/rooms');
                }, 8000);
            }
        } catch (error) {
            setErrorMessage(error.response?.data?.message || error.message);
            setTimeout(() => setErrorMessage(''), 5000);
        }
    };

    if (isLoading) return <p className="text-center text-gray-500 mt-10">Loading room details...</p>;
    if (error) return <p className="text-center text-red-500 mt-10">{error}</p>;
    if (!roomDetails) return <p className="text-center text-gray-500 mt-10">Room not found.</p>;

    const { roomType, roomPrice, roomPhotoUrl, description, bookings } = roomDetails;

    return (
        <section className="min-h-screen bg-[#F9FAFB] flex flex-col items-center py-12 px-6">
            {showMessage && (
                <div className="bg-green-50 border border-green-300 text-green-700 px-6 py-4 rounded-xl shadow-md mb-4 text-center animate-fadeIn">
                    ✅ Booking Successful! <br />
                    Confirmation Code: <span className="font-bold text-teal-600">{confirmationCode}</span>
                    <p className="text-sm text-gray-600 mt-1">You’ll receive a confirmation email and SMS shortly.</p>
                </div>
            )}
            {errorMessage && (
                <div className="bg-red-50 border border-red-300 text-red-600 px-6 py-3 rounded-xl mb-6 animate-fadeIn">
                    ⚠️ {errorMessage}
                </div>
            )}

            <div className="max-w-5xl w-full bg-white rounded-3xl shadow-lg overflow-hidden animate-fadeIn">
                <img src={roomPhotoUrl} alt={roomType} className="w-full h-80 object-cover" />

                <div className="p-8 space-y-4">
                    <h2 className="text-3xl font-bold text-gray-800">{roomType}</h2>
                    <p className="text-gray-500 leading-relaxed">{description}</p>
                    <p className="text-teal-600 font-semibold text-lg">💰 ${roomPrice} / night</p>

                    {bookings && bookings.length > 0 && (
                        <div className="bg-gray-50 border rounded-xl p-4 mt-6">
                            <h3 className="font-semibold text-gray-700 mb-3">Existing Bookings:</h3>
                            <ul className="space-y-2 text-gray-600">
                                {bookings.map((booking, index) => (
                                    <li key={booking.id} className="flex items-center justify-between bg-white shadow-sm p-3 rounded-lg">
                                        <span>Booking {index + 1}</span>
                                        <span>{booking.checkInDate} ➜ {booking.checkOutDate}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    <div className="mt-8 flex flex-col md:flex-row gap-4">
                        <button
                            className="flex-1 bg-gradient-to-r from-teal-400 to-emerald-500 text-white font-semibold py-3 rounded-lg shadow-md hover:scale-105 transition-all"
                            onClick={() => setShowDatePicker(true)}
                        >
                            Book Now
                        </button>
                        <button
                            className="flex-1 bg-gray-200 text-gray-700 font-semibold py-3 rounded-lg hover:bg-gray-300 transition-all"
                            onClick={() => navigate('/rooms')}
                        >
                            <ArrowBack fontSize="small" /> Go Back
                        </button>
                    </div>

                    {showDatePicker && (
                        <div className="bg-gray-50 border rounded-xl p-6 mt-8 shadow-inner">
                            <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                                <CalendarMonth fontSize="small" className="text-teal-500" /> Select Your Dates
                            </h3>

                            <div className="flex flex-col md:flex-row gap-4">
                                <DatePicker
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-700 focus:ring-2 focus:ring-teal-500"
                                    selected={checkInDate}
                                    onChange={(date) => setCheckInDate(date)}
                                    selectsStart
                                    startDate={checkInDate}
                                    endDate={checkOutDate}
                                    placeholderText="Check-in Date"
                                    dateFormat="dd/MM/yyyy"
                                />
                                <DatePicker
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-700 focus:ring-2 focus:ring-teal-500"
                                    selected={checkOutDate}
                                    onChange={(date) => setCheckOutDate(date)}
                                    selectsEnd
                                    startDate={checkInDate}
                                    endDate={checkOutDate}
                                    minDate={checkInDate}
                                    placeholderText="Check-out Date"
                                    dateFormat="dd/MM/yyyy"
                                />
                            </div>

                            <div className="grid md:grid-cols-2 gap-6 mt-6">
                                <div>
                                    <label className="text-gray-700 font-medium">Adults</label>
                                    <input
                                        type="number"
                                        min="1"
                                        value={numAdults}
                                        onChange={(e) => setNumAdults(parseInt(e.target.value))}
                                        className="w-full mt-2 border px-3 py-2 rounded-lg focus:ring-2 focus:ring-teal-500"
                                    />
                                </div>
                                <div>
                                    <label className="text-gray-700 font-medium">Children</label>
                                    <input
                                        type="number"
                                        min="0"
                                        value={numChildren}
                                        onChange={(e) => setNumChildren(parseInt(e.target.value))}
                                        className="w-full mt-2 border px-3 py-2 rounded-lg focus:ring-2 focus:ring-teal-500"
                                    />
                                </div>
                            </div>

                            <button
                                className="mt-6 bg-teal-500 text-white px-6 py-3 rounded-lg shadow hover:scale-105 transition-all"
                                onClick={handleConfirmBooking}
                            >
                                Confirm Booking
                            </button>
                        </div>
                    )}

                    {totalPrice > 0 && (
                        <div className="bg-gradient-to-r from-gray-100 to-gray-50 border mt-6 p-6 rounded-xl shadow-inner text-center">
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">
                                <Group fontSize="small" className="text-teal-500" /> Booking Summary
                            </h3>
                            <p className="text-gray-600">Guests: <strong>{totalGuests}</strong></p>
                            <p className="text-gray-600">Total Price: <strong>${totalPrice}</strong></p>
                            <button
                                onClick={acceptBooking}
                                className="mt-4 bg-gradient-to-r from-teal-400 to-emerald-500 text-white px-6 py-3 rounded-lg shadow-md hover:scale-105 transition-all"
                            >
                                <CheckCircleOutline fontSize="small" /> Accept Booking
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default RoomDetailsPage;
