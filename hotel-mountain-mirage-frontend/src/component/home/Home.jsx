import React, { useState } from "react";
import RoomResult from "../common/RoomResult";
import RoomSearch from "../common/RoomSearch";

const HomePage = () => {
    const [roomSearchResults, setRoomSearchResults] = useState([]);

    const handleSearchResult = (results) => {
        setRoomSearchResults(results);
    };

    return (
        <div className="home font-sans text-gray-800">
            {/* ==================== HEADER / HERO SECTION ==================== */}
            <header className="relative h-[90vh] flex items-center justify-center">
                {/* Background Image */}
                <img
                    src="/assets/images/hotel.webp"
                    alt="Mountain Mirage Hotel"
                    className="absolute inset-0 w-full h-full object-cover brightness-75"
                />
                {/* Dark Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>

                {/* Overlay Text */}
                <div className="relative z-10 text-center text-white px-4 animate-fadeIn">
                    <h1 className="text-5xl md:text-6xl font-extrabold mb-3 drop-shadow-md">
                        Welcome to{" "}
                        <span className="text-teal-400">Mountain Mirage Hotel</span>
                    </h1>
                    <h3 className="text-lg md:text-2xl text-gray-200">
                        Step into a haven of comfort and care
                    </h3>
                    <div className="mt-8">
                        <a
                            href="#search"
                            className="bg-teal-500 hover:bg-teal-600 transition text-white px-6 py-3 rounded-full font-medium shadow-lg hover:shadow-xl"
                        >
                            Explore Now
                        </a>
                    </div>
                </div>
            </header>

            {/* ==================== ROOM SEARCH SECTION ==================== */}
            <section
                id="search"
                className="relative z-20 -mt-10 mx-auto max-w-5xl bg-white shadow-lg rounded-2xl p-6 md:p-10 mb-20"
            >
                <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">
                    Find Your Perfect Room
                </h2>
                <RoomSearch handleSearchResult={handleSearchResult} />
            </section>

            {/* ==================== SEARCH RESULTS ==================== */}
            <section className="max-w-7xl mx-auto px-4 mb-24">
                <RoomResult roomSearchResults={roomSearchResults} />
                <div className="text-center mt-6">
                    <a
                        href="/rooms"
                        className="text-teal-600 hover:text-teal-700 font-semibold underline underline-offset-4 transition"
                    >
                        View All Rooms →
                    </a>
                </div>
            </section>

            {/* ==================== SERVICES SECTION ==================== */}
            <section className="bg-gray-50 py-20 px-6 md:px-12">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800">
                        Services at{" "}
                        <span className="text-teal-500">Mountain Mirage</span>
                    </h2>
                    <p className="text-gray-500 mt-3">
                        Enjoy world-class facilities designed for your ultimate comfort
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 max-w-7xl mx-auto">
                    {/* Service 1 */}
                    <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-transform hover:-translate-y-2 text-center">
                        <img
                            src="/assets/images/ac.png"
                            alt="Air Conditioning"
                            className="w-16 h-16 mx-auto mb-4"
                        />
                        <h3 className="text-lg font-semibold mb-2">Air Conditioning</h3>
                        <p className="text-gray-500 text-sm">
                            Stay cool and comfortable with individually controlled air conditioning.
                        </p>
                    </div>

                    {/* Service 2 */}
                    <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-transform hover:-translate-y-2 text-center">
                        <img
                            src="/assets/images/mini-bar.png"
                            alt="Mini Bar"
                            className="w-16 h-16 mx-auto mb-4"
                        />
                        <h3 className="text-lg font-semibold mb-2">Mini Bar</h3>
                        <p className="text-gray-500 text-sm">
                            Enjoy a selection of complimentary beverages and snacks in your room.
                        </p>
                    </div>

                    {/* Service 3 */}
                    <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-transform hover:-translate-y-2 text-center">
                        <img
                            src="/assets/images/parking.png"
                            alt="Parking"
                            className="w-16 h-16 mx-auto mb-4"
                        />
                        <h3 className="text-lg font-semibold mb-2">Parking</h3>
                        <p className="text-gray-500 text-sm">
                            Convenient on-site parking available, including valet options.
                        </p>
                    </div>

                    {/* Service 4 */}
                    <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-transform hover:-translate-y-2 text-center">
                        <img
                            src="/assets/images/wifi.png"
                            alt="WiFi"
                            className="w-16 h-16 mx-auto mb-4"
                        />
                        <h3 className="text-lg font-semibold mb-2">High-Speed WiFi</h3>
                        <p className="text-gray-500 text-sm">
                            Stay connected with complimentary high-speed internet across the hotel.
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default HomePage;
