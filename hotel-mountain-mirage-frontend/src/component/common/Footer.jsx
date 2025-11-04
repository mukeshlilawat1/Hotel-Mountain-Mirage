import React from "react";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

const FooterComponent = () => {
    const year = new Date().getFullYear();

    return (
        <footer className="bg-[#F9FAFB] text-gray-700 border-t border-gray-200 shadow-soft transition-colors duration-500">
            <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-10">
                {/* BRAND INFO */}
                <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-3">
                        Mountain <span className="text-teal-500">Mirage</span>
                    </h2>
                    <p className="text-gray-600 leading-relaxed mb-4">
                        Discover tranquility in every stay. Indulge in elegance and comfort
                        at Mountain Mirage Hotel — your serene escape awaits.
                    </p>
                    <div className="flex space-x-3 mt-4">
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
                        <li>
                            <a href="/home" className="hover:text-teal-500 transition">
                                Home
                            </a>
                        </li>
                        <li>
                            <a href="/rooms" className="hover:text-teal-500 transition">
                                Rooms
                            </a>
                        </li>
                        <li>
                            <a href="/about" className="hover:text-teal-500 transition">
                                About Us
                            </a>
                        </li>
                        <li>
                            <a href="/contact" className="hover:text-teal-500 transition">
                                Contact
                            </a>
                        </li>
                    </ul>
                </div>

                {/* CUSTOMER SERVICE */}
                <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        Customer Service
                    </h3>
                    <ul className="space-y-2 text-gray-600">
                        <li>
                            <a href="/faq" className="hover:text-teal-500 transition">
                                FAQs
                            </a>
                        </li>
                        <li>
                            <a href="/support" className="hover:text-teal-500 transition">
                                Support
                            </a>
                        </li>
                        <li>
                            <a href="/terms" className="hover:text-teal-500 transition">
                                Terms & Conditions
                            </a>
                        </li>
                        <li>
                            <a href="/privacy" className="hover:text-teal-500 transition">
                                Privacy Policy
                            </a>
                        </li>
                    </ul>
                </div>

                {/* CONTACT INFO */}
                <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        Contact Us
                    </h3>
                    <p className="text-gray-600">
                        📍 456 Hillview Avenue, Mountain City, India
                    </p>
                    <p className="text-gray-600 mt-2">📞 +91 98765 43210</p>
                    <p className="text-gray-600 mt-2">📧 info@mountainmirage.com</p>

                    <button className="mt-4 bg-gradient-to-r from-teal-400 to-emerald-500 text-white px-5 py-2 rounded-lg shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300">
                        Get Directions
                    </button>
                </div>
            </div>

            {/* COPYRIGHT SECTION */}
            <div className="mt-8 border-t border-gray-200 pt-4 text-center text-gray-600 text-sm bg-[#FDFDFE]">
                <p>
                    © {year}{" "}
                    <span className="text-gray-900 font-semibold">Mountain Mirage</span> |{" "}
                    All Rights Reserved.
                </p>
                <p className="text-xs mt-1">
                    Crafted with ❤️ by{" "}
                    <span className="text-teal-500 font-medium">Mukesh Lilawat</span>
                </p>
            </div>
        </footer>
    );
};

export default FooterComponent;
