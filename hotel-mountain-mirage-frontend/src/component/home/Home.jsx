import React, { useState } from "react";
// import RoomResult from "../common/RoomResult";
// import RoomSearch from "../common/RoomSearch";

// Importing images (recommended approach for React)
// import hotelBanner from "../../assets/images/hotel.webp";
// import acImg from "../../assets/images/ac.png";
// import minibarImg from "../../assets/images/mini-bar.png";
// import parkingImg from "../../assets/images/parking.png";
// import wifiImg from "../../assets/images/wifi.png";

const HomePage = () => {
    const [roomSearchResults, setRoomSearchResults] = useState([]);

    // Handle search results from RoomSearch component
    const handleSearchResult = (results) => {
        setRoomSearchResults(results);
    };

    return (
        <div className="home">
            {/* ==================== HEADER / BANNER ==================== */}
            <header className="header-banner">
                <img src="/assets/images/hotel.webp"  alt="Mountain Mirage Hotel" className="header-image" />
                <div className="overlay"></div>
                <div className="animated-texts overlay-content">
                    <h1>
                        Welcome to <span className="mountain-color">Mountain Mirage Hotel</span>
                    </h1>
                    <h3>Step into a haven of comfort and care</h3>
                </div>
            </header>

            {/* ==================== ROOM SEARCH SECTION ==================== */}
            <section className="search-section">
                {/* <RoomSearch handleSearchResult={handleSearchResult} /> */}
            </section>

            {/* ==================== SEARCH RESULTS ==================== */}
            <section className="results-section">
                {/* <RoomResult roomSearchResults={roomSearchResults} /> */}
                <h4 className="view-all-link">
                    <a href="/rooms" className="view-rooms-home">
                        View All Rooms
                    </a>
                </h4>
            </section>

            {/* ==================== SERVICES SECTION ==================== */}
            <section className="services-section">
                <h2 className="home-services">
                    Services at <span className="mountain-color">Mountain Mirage</span>
                </h2>

                <div className="service-container">
                    {/* Service 1 */}
                    <div className="service-card">
                        {/* <img src={acImg} alt="Air Conditioning" /> */}
                        <div className="service-details">
                            <h3 className="service-title">Air Conditioning</h3>
                            <p className="service-description">
                                Stay cool and comfortable with individually controlled in-room air conditioning.
                            </p>
                        </div>
                    </div>

                    {/* Service 2 */}
                    <div className="service-card">
                        {/* <img src={minibarImg} alt="Mini Bar" /> */}
                        <div className="service-details">
                            <h3 className="service-title">Mini Bar</h3>
                            <p className="service-description">
                                Enjoy a convenient selection of complimentary beverages and snacks in your room.
                            </p>
                        </div>
                    </div>

                    {/* Service 3 */}
                    <div className="service-card">
                        {/* <img src={parkingImg} alt="Parking" /> */}
                        <div className="service-details">
                            <h3 className="service-title">Parking</h3>
                            <p className="service-description">
                                We offer on-site parking for your convenience. Valet options available.
                            </p>
                        </div>
                    </div>

                    {/* Service 4 */}
                    <div className="service-card">
                        {/* <img src={wifiImg} alt="WiFi" /> */}
                        <div className="service-details">
                            <h3 className="service-title">WiFi</h3>
                            <p className="service-description">
                                Stay connected with complimentary high-speed Wi-Fi throughout the hotel.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default HomePage;
