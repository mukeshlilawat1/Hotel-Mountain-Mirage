import React, { useState, useEffect, useRef } from "react";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CloudIcon from "@mui/icons-material/Cloud";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import EmailIcon from "@mui/icons-material/Email";
import AccessTimeIcon from "@mui/icons-material/AccessTime";


const FooterComponent = () => {
    const year = new Date().getFullYear();
    const [copied, setCopied] = useState("");
    const [weather, setWeather] = useState({ temp: 28, condition: "Sunny" });
    const [time, setTime] = useState(new Date());
    const [isVisible, setIsVisible] = useState(false);
    const footerRef = useRef();

    // Smooth fade-in animation
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) setIsVisible(true);
                });
            },
            { threshold: 0.2 }
        );
        if (footerRef.current) observer.observe(footerRef.current);
        return () => observer.disconnect();
    }, []);

    // Live Clock
    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    // Simulated Weather
    useEffect(() => {
        setTimeout(() => {
            setWeather({ temp: 27, condition: "Clear Sky" });
        }, 1000);
    }, []);

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
        setCopied(text);
        setTimeout(() => setCopied(""), 2000);
    };

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <footer
            ref={footerRef}
            className={`bg-[#F9FAFB] text-gray-700 border-t border-gray-200 shadow-soft transition-all duration-700 transform ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
        >
            <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-4 gap-10">
                {/* BRAND INFO */}
                <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-3">
                        Mountain <span className="text-teal-500">Mirage</span>
                    </h2>
                    <p className="text-gray-600 leading-relaxed mb-4">
                        Discover tranquility in every stay. Indulge in elegance and comfort
                        at Mountain Mirage Hotel — your serene escape awaits.
                    </p>

                    {/* Live Weather Widget */}
                    <div className="flex items-center gap-3 bg-white border border-gray-100 rounded-lg p-3 mt-3 shadow-sm">
                        {weather.condition.toLowerCase().includes("sun") ? (
                            <WbSunnyIcon className="text-yellow-400" />
                        ) : (
                            <CloudIcon className="text-blue-400" />
                        )}
                        <div>
                            <p className="text-sm font-medium">
                                {weather.condition} | {weather.temp}°C
                            </p>
                            <p className="text-xs text-gray-500">Mountain City</p>
                        </div>
                    </div>

                    {/* Social Icons */}
                    <div className="flex space-x-3 mt-5">
                        {[FacebookIcon, InstagramIcon, TwitterIcon, LinkedInIcon].map(
                            (Icon, i) => (
                                <a
                                    key={i}
                                    href="#"
                                    className="bg-white p-2 rounded-full shadow-soft hover:shadow-md hover:scale-110 hover:text-teal-500 transition-all duration-300"
                                >
                                    <Icon fontSize="medium" />
                                </a>
                            )
                        )}
                    </div>
                </div>

                {/* QUICK LINKS */}
                <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        Quick Links
                    </h3>
                    <ul className="space-y-2 text-gray-600">
                        <li><a href="/home" className="hover:text-teal-500 transition">Home</a></li>
                        <li><a href="/rooms" className="hover:text-teal-500 transition">Rooms</a></li>
                        <li><a href="/About" className="hover:text-teal-500 transition">About Us</a></li>
                        <li><a href="/Contact" className="hover:text-teal-500 transition">Contact</a></li>
                        <li><a href="/gallery" className="hover:text-teal-500 transition">Gallery</a></li>
                        <li><a href="/events" className="hover:text-teal-500 transition">Events & Celebrations</a></li>
                        <li><a href="/offers" className="hover:text-teal-500 transition">Special Offers</a></li>
                        <li><a href="/blog" className="hover:text-teal-500 transition">Our Blog</a></li>
                        <li><a href="/careers" className="hover:text-teal-500 transition">Careers</a></li>
                    </ul>
                </div>

                {/* CUSTOMER SERVICE */}
                <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        Customer Service
                    </h3>
                    <ul className="space-y-2 text-gray-600">
                        <li><a href="/faq" className="hover:text-teal-500 transition">FAQs</a></li>
                        <li><a href="/support" className="hover:text-teal-500 transition">Support</a></li>
                        <li><a href="/terms" className="hover:text-teal-500 transition">Terms & Conditions</a></li>
                        <li><a href="/privacy" className="hover:text-teal-500 transition">Privacy Policy</a></li>
                        <li><a href="/refund" className="hover:text-teal-500 transition">Refund Policy</a></li>
                        <li><a href="/accessibility" className="hover:text-teal-500 transition">Accessibility</a></li>
                        <li><a href="/partner-with-us" className="hover:text-teal-500 transition">Partner With Us</a></li>
                        <li><a href="/travel-agents" className="hover:text-teal-500 transition">Travel Agents</a></li>
                        <li><a href="/gift-cards" className="hover:text-teal-500 transition">Gift Cards</a></li>
                    </ul>
                </div>

                {/* CONTACT INFO (Expanded) */}
                <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        Contact Us
                    </h3>
                    <p className="text-gray-600">📍 456 Hillview Avenue, Mountain City, India</p>

                    <div className="flex items-center gap-2 mt-2">
                        <p className="text-gray-600">📞 +91 98765 43210</p>
                        <button
                            onClick={() => copyToClipboard("+91 98765 43210")}
                            className="text-teal-500 hover:scale-110 transition"
                        >
                            <ContentCopyIcon fontSize="small" />
                        </button>
                    </div>

                    <div className="flex items-center gap-2 mt-2">
                        <p className="text-gray-600">📧 info@mountainmirage.com</p>
                        <button
                            onClick={() => copyToClipboard("info@mountainmirage.com")}
                            className="text-teal-500 hover:scale-110 transition"
                        >
                            <ContentCopyIcon fontSize="small" />
                        </button>
                    </div>

                    {/* ✅ New Additions Below */}
                    <div className="flex items-center gap-2 mt-2">
                        <EmailIcon className="text-teal-500" fontSize="small" />
                        <p className="text-gray-600">booking@mountainmirage.com</p>
                    </div>

                    <div className="flex items-center gap-2 mt-2">
                        <EmailIcon className="text-teal-500" fontSize="small" />
                        <p className="text-gray-600">hr@mountainmirage.com</p>
                    </div>

                    <div className="flex items-center gap-2 mt-2">
                        <WhatsAppIcon className="text-green-500" />
                        <a
                            href="https://wa.me/919876543210"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-600 hover:text-teal-500 transition"
                        >
                            Chat on WhatsApp
                        </a>
                    </div>

                    <div className="flex items-center gap-2 mt-3">
                        <AccessTimeIcon className="text-teal-500" />
                        <p className="text-gray-600 text-sm">
                            Open: Mon – Sun, 7:00 AM – 11:00 PM
                        </p>
                    </div>

                    {copied && (
                        <p className="text-teal-500 text-sm mt-1 animate-pulse">
                            ✅ Copied: {copied}
                        </p>
                    )}

                    <a
                        href="https://maps.google.com/?q=Mountain+Mirage+Hotel"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-4 inline-block bg-gradient-to-r from-teal-400 to-emerald-500 text-white px-5 py-2 rounded-lg shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300"
                    >
                        🧭 Get Directions
                    </a>

                    {/* Live Clock */}
                    <div className="mt-4 text-gray-600 text-sm font-medium">
                        🕒 Local Time: {time.toLocaleTimeString()}
                    </div>
                </div>
            </div>

            {/* COPYRIGHT SECTION */}
            <div className="mt-8 border-t border-gray-200 pt-5 text-center text-gray-600 text-sm bg-[#FDFDFE] relative">
                <p>
                    © {year}{" "}
                    <span className="text-gray-900 font-semibold">Mountain Mirage</span> |{" "}
                    All Rights Reserved.
                </p>
                <p className="text-xs mt-1">
                    Crafted with ❤️ by{" "}
                    <span className="text-teal-500 font-medium">Mukesh Lilawat</span>
                </p>

                {/* Scroll to Top */}
                <button
                    onClick={scrollToTop}
                    className="absolute right-6 bottom-6 bg-teal-500 hover:bg-emerald-500 text-white px-4 py-2 rounded-full shadow-md hover:shadow-lg transition-all duration-300 flex items-center gap-1"
                >
                    <ArrowUpwardIcon fontSize="small" /> Top
                </button>
            </div>
        </footer>
    );
};

export default FooterComponent;
