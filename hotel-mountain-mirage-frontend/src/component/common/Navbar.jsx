import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import ApiService from "../../service/ApiService";

function Navbar() {
    const isAuthenticated = ApiService.isAuthenticated();
    const isAdmin = ApiService.isAdmin();
    const isUser = ApiService.isUser();
    const navigate = useNavigate();

    const [menuOpen, setMenuOpen] = useState(false);

    const handleLogout = () => {
        const isLogout = window.confirm("Are you sure you want to logout?");
        if (isLogout) {
            ApiService.logout();
            navigate("/home");
        }
    };

    return (
        <nav className="bg-white/80 backdrop-blur-lg shadow-md fixed w-full top-0 z-50">
            <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-3">
                {/* Logo / Brand */}
                <NavLink
                    to="/home"
                    className="text-2xl font-bold bg-gradient-to-r from-teal-600 to-emerald-500 text-transparent bg-clip-text"
                >
                    Mountain<span className="text-gray-700">Mirage</span>
                </NavLink>

                {/* Hamburger Button (mobile only) */}
                <button
                    className="md:hidden text-gray-800 focus:outline-none"
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

                {/* Nav Links */}
                <ul
                    className={`md:flex md:items-center md:space-x-6 absolute md:static bg-white md:bg-transparent left-0 w-full md:w-auto transition-all duration-300 ease-in ${menuOpen ? "top-14 opacity-100" : "top-[-400px] opacity-0 md:opacity-100"
                        }`}
                >
                    <li>
                        <NavLink
                            to="/home"
                            className={({ isActive }) =>
                                `block px-4 py-2 md:py-0 text-gray-700 hover:text-teal-600 transition ${isActive ? "text-teal-600 font-semibold" : ""
                                }`
                            }
                        >
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/rooms"
                            className={({ isActive }) =>
                                `block px-4 py-2 md:py-0 text-gray-700 hover:text-teal-600 transition ${isActive ? "text-teal-600 font-semibold" : ""
                                }`
                            }
                        >
                            Rooms
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/find-booking"
                            className={({ isActive }) =>
                                `block px-4 py-2 md:py-0 text-gray-700 hover:text-teal-600 transition ${isActive ? "text-teal-600 font-semibold" : ""
                                }`
                            }
                        >
                            Find My Bookings
                        </NavLink>
                    </li>

                    {isUser && (
                        <li>
                            <NavLink
                                to="/profile"
                                className={({ isActive }) =>
                                    `block px-4 py-2 md:py-0 text-gray-700 hover:text-teal-600 transition ${isActive ? "text-teal-600 font-semibold" : ""
                                    }`
                                }
                            >
                                Profile
                            </NavLink>
                        </li>
                    )}

                    {isAdmin && (
                        <li>
                            <NavLink
                                to="/admin"
                                className={({ isActive }) =>
                                    `block px-4 py-2 md:py-0 text-gray-700 hover:text-teal-600 transition ${isActive ? "text-teal-600 font-semibold" : ""
                                    }`
                                }
                            >
                                Admin
                            </NavLink>
                        </li>
                    )}

                    {!isAuthenticated && (
                        <>
                            <li>
                                <NavLink
                                    to="/login"
                                    className={({ isActive }) =>
                                        `block px-4 py-2 md:py-0 text-gray-700 hover:text-teal-600 transition ${isActive ? "text-teal-600 font-semibold" : ""
                                        }`
                                    }
                                >
                                    Login
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/register"
                                    className={({ isActive }) =>
                                        `block px-4 py-2 md:py-0 text-gray-700 hover:text-teal-600 transition ${isActive ? "text-teal-600 font-semibold" : ""
                                        }`
                                    }
                                >
                                    Register
                                </NavLink>
                            </li>
                        </>
                    )}

                    {isAuthenticated && (
                        <li>
                            <button
                                onClick={handleLogout}
                                className="block w-full text-left px-4 py-2 md:py-0 text-red-600 hover:text-red-700 transition font-medium"
                            >
                                Logout
                            </button>
                        </li>
                    )}
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;
