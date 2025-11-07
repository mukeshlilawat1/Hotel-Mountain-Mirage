import React, { useState, useEffect } from "react";
import RoomResult from "../common/RoomResult";
import RoomSearch from "../common/RoomSearch";
import { motion } from "framer-motion";

const HomePage = () => {
    const [roomSearchResults, setRoomSearchResults] = useState([]);
    const [greeting, setGreeting] = useState("");
    const [typedText, setTypedText] = useState("");
    const heroText = "Step into a haven of comfort and care";
    const [showScrollTop, setShowScrollTop] = useState(false);
    const [showChat, setShowChat] = useState(false);

    // Greeting based on Indian Standard Time (IST)
    useEffect(() => {
        const updateGreeting = () => {
            // Get current UTC time and add 5 hours 30 minutes to convert to IST
            const now = new Date();
            const utc = now.getTime() + now.getTimezoneOffset() * 60000;
            const ist = new Date(utc + 5.5 * 60 * 60 * 1000);
            const hour = ist.getHours();

            if (hour >= 4 && hour < 12) {
                setGreeting("🌞 Good Morning!");
            } else if (hour >= 12 && hour < 17) {
                setGreeting("🌤️ Good Afternoon!");
            } else if (hour >= 17 && hour < 21) {
                setGreeting("🌙 Good Evening!");
            } else {
                setGreeting("🌌 Good Night!");
            }
        };

        updateGreeting();
        const interval = setInterval(updateGreeting, 60000); // refresh every minute
        return () => clearInterval(interval);
    }, []);

    // Typing animation for subheading
    useEffect(() => {
        let i = 0;
        const interval = setInterval(() => {
            setTypedText(heroText.substring(0, i));
            i++;
            if (i > heroText.length) clearInterval(interval);
        }, 50);
        return () => clearInterval(interval);
    }, []);

    // Scroll to top button
    useEffect(() => {
        const handleScroll = () => setShowScrollTop(window.scrollY > 500);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
    const handleSearchResult = (results) => setRoomSearchResults(results);

    return (
        <div className="home font-sans text-gray-800">
            {/* ==================== HERO SECTION ==================== */}
            <header className="relative h-[90vh] flex items-center justify-center overflow-hidden">
                <motion.img
                    src="/assets/images/hotel.webp"
                    alt="Mountain Mirage Hotel"
                    initial={{ scale: 1 }}
                    animate={{ scale: 1.05 }}
                    transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
                    className="absolute inset-0 w-full h-full object-cover brightness-75"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/50 to-transparent"></div>

                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    className="relative z-10 text-center text-white px-4"
                >
                    <p className="text-lg md:text-xl mb-3 font-medium text-teal-300 drop-shadow-lg">
                        {greeting}
                    </p>
                    <h1 className="text-5xl md:text-6xl font-extrabold mb-3 drop-shadow-md">
                        Welcome to{" "}
                        <span className="text-teal-400">Mountain Mirage Hotel</span>
                    </h1>
                    <h3 className="text-lg md:text-2xl text-gray-200 h-8">
                        {typedText}
                        <span className="animate-pulse text-teal-300">|</span>
                    </h3>
                    <div className="mt-8">
                        <motion.a
                            href="#search"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-teal-500 hover:bg-teal-600 transition text-white px-8 py-3 rounded-full font-medium shadow-lg hover:shadow-xl"
                        >
                            Explore Now
                        </motion.a>
                    </div>
                </motion.div>
            </header>

            {/* ==================== ROOM SEARCH ==================== */}
            <motion.section
                id="search"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative z-20 -mt-10 mx-auto max-w-5xl bg-white shadow-lg rounded-2xl p-6 md:p-10 mb-20"
            >
                <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">
                    Find Your Perfect Room
                </h2>
                <RoomSearch handleSearchResult={handleSearchResult} />
            </motion.section>

            {/* ==================== SEARCH RESULTS ==================== */}
            <motion.section
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="max-w-7xl mx-auto px-4 mb-24"
            >
                <RoomResult roomSearchResults={roomSearchResults} />
                <div className="text-center mt-6">
                    <a
                        href="/rooms"
                        className="text-teal-600 hover:text-teal-700 font-semibold underline underline-offset-4 transition"
                    >
                        View All Rooms →
                    </a>
                </div>
            </motion.section>

            {/* ==================== SERVICES ==================== */}
            <section className="bg-gray-50 py-20 px-6 md:px-12 relative overflow-hidden">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800">
                        Services at <span className="text-teal-500">Mountain Mirage</span>
                    </h2>
                    <p className="text-gray-500 mt-3">
                        Enjoy world-class facilities designed for your ultimate comfort
                    </p>
                </div>

                <motion.div
                    animate={{ y: [0, 20, 0] }}
                    transition={{ repeat: Infinity, duration: 8 }}
                    className="absolute -top-32 right-10 w-72 h-72 bg-teal-200/20 rounded-full blur-3xl"
                ></motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 max-w-7xl mx-auto relative z-10">
                    {[
                        {
                            img: "/assets/images/ac.png",
                            title: "Air Conditioning",
                            desc: "Stay cool and comfortable with individually controlled air conditioning.",
                        },
                        {
                            img: "/assets/images/mini-bar.png",
                            title: "Mini Bar",
                            desc: "Enjoy a selection of complimentary beverages and snacks in your room.",
                        },
                        {
                            img: "/assets/images/parking.png",
                            title: "Parking",
                            desc: "Convenient on-site parking available, including valet options.",
                        },
                        {
                            img: "/assets/images/wifi.png",
                            title: "High-Speed WiFi",
                            desc: "Stay connected with complimentary high-speed internet across the hotel.",
                        },
                    ].map((service, index) => (
                        <motion.div
                            key={index}
                            whileHover={{ scale: 1.05 }}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: index * 0.1 }}
                            className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-transform hover:-translate-y-2 text-center"
                        >
                            <img
                                src={service.img}
                                alt={service.title}
                                className="w-16 h-16 mx-auto mb-4"
                            />
                            <h3 className="text-lg font-semibold mb-2">{service.title}</h3>
                            <p className="text-gray-500 text-sm">{service.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* ==================== NEW: TESTIMONIALS ==================== */}
            <section className="bg-white py-20 px-6 md:px-12">
                <div className="text-center mb-10">
                    <h2 className="text-3xl font-bold text-gray-800">
                        What Our Guests Say 💬
                    </h2>
                    <p className="text-gray-500 mt-2">
                        Real stories from happy guests who stayed at Mountain Mirage
                    </p>
                </div>
                <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {[
                        {
                            name: "Aarav Patel",
                            review: "The best experience ever! The staff was super friendly and the view was breathtaking.",
                        },
                        {
                            name: "Emily Johnson",
                            review: "Loved every moment here — rooms were clean, food was amazing and service was top-notch.",
                        },
                        {
                            name: "Rajesh Kumar",
                            review: "Peaceful stay with modern amenities. Highly recommended for couples and families!",
                        },
                    ].map((t, i) => (
                        <motion.div
                            key={i}
                            whileHover={{ scale: 1.03 }}
                            className="bg-gray-50 p-6 rounded-2xl shadow-md hover:shadow-lg transition text-center"
                        >
                            <p className="text-gray-600 italic mb-4">"{t.review}"</p>
                            <h4 className="text-teal-600 font-semibold">{t.name}</h4>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* ==================== NEW: NEARBY ATTRACTIONS ==================== */}
            <section className="bg-gray-50 py-20 px-6 md:px-12">
                <div className="text-center mb-10">
                    <h2 className="text-3xl font-bold text-gray-800">
                        Explore Nearby Attractions 🌄
                    </h2>
                    <p className="text-gray-500 mt-2">
                        Discover beautiful spots just minutes away from our resort
                    </p>
                </div>
                <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {[
                        { img: "/assets/images/waterfall.jpg", title: "Crystal Falls" },
                        { img: "/assets/images/temple.jpg", title: "Sunrise Temple" },
                        { img: "/assets/images/forest.jpg", title: "Emerald Forest" },
                    ].map((place, i) => (
                        <motion.div
                            key={i}
                            whileHover={{ scale: 1.05 }}
                            className="rounded-2xl overflow-hidden shadow-md hover:shadow-xl"
                        >
                            <img
                                src={place.img}
                                alt={place.title}
                                className="w-full h-56 object-cover"
                            />
                            <div className="p-4 bg-white">
                                <h3 className="text-lg font-semibold text-gray-800">
                                    {place.title}
                                </h3>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* ==================== FLOATING BOOK BUTTON ==================== */}
            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => (window.location.href = "#search")}
                className="fixed bottom-6 right-6 bg-teal-600 text-white px-6 py-3 rounded-full shadow-lg hover:bg-emerald-500 transition z-50"
            >
                🏨 Book Now
            </motion.button>

            {/* ==================== CHAT BOT BUTTON ==================== */}
            <motion.button
                whileHover={{ scale: 1.1 }}
                onClick={() => setShowChat(!showChat)}
                className="fixed bottom-6 left-6 bg-gray-800 text-white px-4 py-3 rounded-full shadow-lg hover:bg-teal-600 transition z-50"
            >
                💬 Chat
            </motion.button>

            {showChat && (
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="fixed bottom-20 left-6 bg-white p-5 w-72 shadow-xl rounded-2xl border border-gray-200 z-50"
                >
                    <h3 className="font-semibold text-gray-800 mb-2">
                        👋 Hi! Need help?
                    </h3>
                    <p className="text-sm text-gray-500">
                        I can assist with room bookings, facilities, or contact details.
                    </p>
                    <button
                        onClick={() => alert('Chatbot coming soon 🤖')}
                        className="mt-4 w-full bg-teal-500 text-white py-2 rounded-lg hover:bg-emerald-500 transition"
                    >
                        Start Chat
                    </button>
                </motion.div>
            )}

            {/* ==================== SCROLL TO TOP ==================== */}
            {showScrollTop && (
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={scrollToTop}
                    className="fixed bottom-20 right-6 bg-gray-700 text-white p-3 rounded-full shadow-lg hover:bg-teal-600 transition z-50"
                >
                    ⬆️
                </motion.button>
            )}
        </div>
    );
};

export default HomePage;
