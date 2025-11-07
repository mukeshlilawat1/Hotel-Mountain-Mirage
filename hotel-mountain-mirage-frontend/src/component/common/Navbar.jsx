import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import ApiService from "../../service/ApiService";

function Navbar() {
    const isAuthenticated = ApiService.isAuthenticated();
    const isAdmin = ApiService.isAdmin();
    const isUser = ApiService.isUser();
    const navigate = useNavigate();

    const [menuOpen, setMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const [showNotifications, setShowNotifications] = useState(false);
    const [notifications, setNotifications] = useState([
        { id: 1, text: "Booking #123 confirmed ✅", read: false },
        { id: 2, text: "New message from admin 💬", read: false },
        { id: 3, text: "Room offer: 20% off today only 🎉", read: false },
    ]);
    const [time, setTime] = useState(new Date());
    const [showScrollBtn, setShowScrollBtn] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        if (isAuthenticated && !sessionStorage.getItem("welcomeShown")) {
            setTimeout(() => {
                alert(`👋 Welcome back ${isAdmin ? "Admin" : isUser ? "User" : ""}!`);
            }, 600);
            sessionStorage.setItem("welcomeShown", "true");
        }
    }, [isAuthenticated, isAdmin, isUser]);

    useEffect(() => {
        const handleScroll = () => setShowScrollBtn(window.scrollY > 400);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

    const handleLogout = () => {
        const confirmLogout = window.confirm("Are you sure you want to logout?");
        if (confirmLogout) {
            ApiService.logout();
            navigate("/home");
        }
    };

    const markAsRead = (id) => {
        setNotifications((prev) =>
            prev.map((n) => (n.id === id ? { ...n, read: true } : n))
        );
    };

    const unreadCount = notifications.filter((n) => !n.read).length;

    // ✅ Removed “Special Offers”
    const navLinks = [
        { path: "/home", label: "Home" },
        { path: "/rooms", label: "Rooms" },
        { path: "/gallery", label: "Gallery" },
        { path: "/events", label: "Events & Celebrations" },
        { path: "/About", label: "About Us" },
        { path: "/find-booking", label: "Find My Bookings" },
    ];

    return (
        <>
            {/* ===== Navbar ===== */}
            <nav
                className={`fixed w-full top-0 z-50 transition-all duration-300 ${scrolled
                        ? "bg-white/90 shadow-md backdrop-blur-md"
                        : "bg-white/80 backdrop-blur-sm"
                    }`}
            >
                <div className="max-w-[92%] mx-auto px-2 md:px-6 py-3 flex justify-between items-center">
                    {/* ===== Left - Logo ===== */}
                    <div className="flex items-center">
                        <NavLink
                            to="/home"
                            onClick={() => setMenuOpen(false)}
                            className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-teal-600 to-emerald-500 text-transparent bg-clip-text"
                        >
                            Mountain<span className="text-gray-700">Mirage</span>
                        </NavLink>
                    </div>

                    {/* ===== Middle - Nav Links (Desktop) ===== */}
                    <div className="hidden md:flex items-center space-x-8 lg:space-x-9 ml-10">
                        {navLinks.map((link, i) => (
                            <NavLink
                                key={i}
                                to={link.path}
                                className={({ isActive }) =>
                                    `relative text-gray-700 hover:text-teal-600 font-medium text-[0.95rem] transition-all ${isActive
                                        ? "text-teal-600 font-semibold border-b-2 border-teal-500 pb-1"
                                        : ""
                                    }`
                                }
                            >
                                <span className="truncate max-w-[150px] inline-block">
                                    {link.label}
                                </span>
                            </NavLink>
                        ))}

                        {isUser && (
                            <NavLink
                                to="/profile"
                                className={({ isActive }) =>
                                    `text-gray-700 hover:text-teal-600 font-medium transition ${isActive
                                        ? "text-teal-600 font-semibold border-b-2 border-teal-500 pb-1"
                                        : ""
                                    }`
                                }
                            >
                                Profile
                            </NavLink>
                        )}
                        {isAdmin && (
                            <NavLink
                                to="/admin"
                                className={({ isActive }) =>
                                    `text-gray-700 hover:text-teal-600 font-medium transition ${isActive
                                        ? "text-teal-600 font-semibold border-b-2 border-teal-500 pb-1"
                                        : ""
                                    }`
                                }
                            >
                                Admin
                            </NavLink>
                        )}
                        {!isAuthenticated && (
                            <>
                                <NavLink
                                    to="/login"
                                    className="text-gray-700 hover:text-teal-600 font-medium transition"
                                >
                                    Login
                                </NavLink>
                                <NavLink
                                    to="/register"
                                    className="text-gray-700 hover:text-teal-600 font-medium transition"
                                >
                                    Register
                                </NavLink>
                            </>
                        )}
                    </div>

                    {/* ===== Right - Clock / Notifications / Avatar ===== */}
                    <div className="flex items-center space-x-6 md:space-x-8">
                        {/* Clock */}
                        <div className="hidden md:block text-gray-600 text-sm font-medium tracking-wide">
                            🕒 {time.toLocaleTimeString()}
                        </div>

                        {/* Notifications */}
                        {isAuthenticated && (
                            <div className="relative">
                                <button
                                    onClick={() => setShowNotifications(!showNotifications)}
                                    className="text-gray-700 hover:text-teal-600 relative text-lg"
                                >
                                    🔔
                                    {unreadCount > 0 && (
                                        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1.5">
                                            {unreadCount}
                                        </span>
                                    )}
                                </button>
                                {showNotifications && (
                                    <div className="absolute right-0 mt-2 w-56 bg-white shadow-lg rounded-lg py-2 text-sm">
                                        {notifications.map((n) => (
                                            <div
                                                key={n.id}
                                                onClick={() => markAsRead(n.id)}
                                                className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${n.read ? "text-gray-400" : "text-gray-800"
                                                    }`}
                                            >
                                                {n.text}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Avatar */}
                        {isAuthenticated && (
                            <div className="relative">
                                <button
                                    onClick={() => setShowDropdown(!showDropdown)}
                                    className="flex items-center gap-2 text-gray-700 hover:text-teal-600 transition"
                                >
                                    <img
                                        src="https://i.pravatar.cc/30"
                                        alt="avatar"
                                        className="w-8 h-8 rounded-full border"
                                    />
                                    <span className="hidden md:inline">Account</span>
                                    {isAdmin && (
                                        <span className="bg-red-100 text-red-700 text-xs font-semibold px-2 py-1 rounded-full">
                                            Admin
                                        </span>
                                    )}
                                    {isUser && (
                                        <span className="bg-green-100 text-green-700 text-xs font-semibold px-2 py-1 rounded-full">
                                            User
                                        </span>
                                    )}
                                </button>
                                {showDropdown && (
                                    <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-lg py-2 text-sm">
                                        <button
                                            onClick={() => navigate("/profile")}
                                            className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                                        >
                                            Profile
                                        </button>
                                        <button
                                            onClick={handleLogout}
                                            className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                                        >
                                            Logout
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Hamburger (Mobile Menu Button) */}
                        <button
                            className="md:hidden text-gray-700 focus:outline-none"
                            onClick={() => setMenuOpen(!menuOpen)}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.8}
                                stroke="currentColor"
                                className="w-7 h-7"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d={
                                        menuOpen
                                            ? "M6 18L18 6M6 6l12 12"
                                            : "M3 6h18M3 12h18M3 18h18"
                                    }
                                />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* ===== Mobile Menu ===== */}
                <div
                    className={`md:hidden transition-all duration-500 ease-in-out ${menuOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
                        } overflow-hidden`}
                >
                    <div className="bg-white mx-4 mt-2 mb-3 rounded-2xl shadow-lg py-4 flex flex-col space-y-4 text-center">
                        {navLinks.map((link, i) => (
                            <NavLink
                                key={i}
                                to={link.path}
                                onClick={() => setMenuOpen(false)}
                                className="text-gray-700 hover:text-teal-600 font-medium text-sm truncate"
                            >
                                {link.label}
                            </NavLink>
                        ))}

                        {isUser && (
                            <NavLink
                                to="/profile"
                                onClick={() => setMenuOpen(false)}
                                className="text-gray-700 hover:text-teal-600 font-medium"
                            >
                                Profile
                            </NavLink>
                        )}
                        {isAdmin && (
                            <NavLink
                                to="/admin"
                                onClick={() => setMenuOpen(false)}
                                className="text-gray-700 hover:text-teal-600 font-medium"
                            >
                                Admin
                            </NavLink>
                        )}
                        {!isAuthenticated && (
                            <>
                                <NavLink
                                    to="/login"
                                    onClick={() => setMenuOpen(false)}
                                    className="text-gray-700 hover:text-teal-600 font-medium"
                                >
                                    Login
                                </NavLink>
                                <NavLink
                                    to="/register"
                                    onClick={() => setMenuOpen(false)}
                                    className="text-gray-700 hover:text-teal-600 font-medium"
                                >
                                    Register
                                </NavLink>
                            </>
                        )}
                    </div>
                </div>
            </nav>

            {/* ===== Scroll to Top Button ===== */}
            {showScrollBtn && (
                <button
                    onClick={scrollToTop}
                    className="fixed bottom-6 right-6 bg-teal-600 text-white p-3 rounded-full shadow-lg hover:bg-emerald-500 transition"
                >
                    ⬆️
                </button>
            )}
        </>
    );
}

export default Navbar;
