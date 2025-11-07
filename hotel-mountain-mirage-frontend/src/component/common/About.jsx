import React from "react";
import { motion } from "framer-motion";
import { Building2, Users2, Star, HeartHandshake, Coffee, MapPin } from "lucide-react";

const AboutUs = () => {
    return (
        <div className="bg-gradient-to-b from-gray-50 via-white to-emerald-50 text-gray-800">
            {/* ================== HERO SECTION ================== */}
            <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
                <motion.img
                    src="/assets/images/hotel.webp"
                    alt="Luxury Resort"
                    initial={{ scale: 1 }}
                    animate={{ scale: 1.05 }}
                    transition={{ duration: 15, repeat: Infinity, repeatType: "reverse" }}
                    className="absolute inset-0 w-full h-full object-cover brightness-[60%]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/40 to-transparent"></div>

                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    className="relative z-10 text-center text-white px-4"
                >
                    <h1 className="text-5xl md:text-6xl font-extrabold mb-3 drop-shadow-md">
                        About <span className="text-teal-400">Mountain Mirage</span>
                    </h1>
                    <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto">
                        Where serenity meets sophistication — discover the story behind our paradise.
                    </p>
                </motion.div>
            </section>

            {/* ================== OUR STORY ================== */}
            <section className="max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-14 items-center">
                <motion.img
                    src="/assets/images/hotel-about.jpg"
                    alt="Our Story"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.5 }}
                    className="rounded-3xl shadow-lg object-cover w-full h-[400px]"
                />

                <div>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-3xl font-bold mb-4 text-gray-900"
                    >
                        Our Journey 🌄
                    </motion.h2>
                    <p className="text-gray-600 leading-relaxed mb-6">
                        Established in 2015, <span className="text-teal-500 font-semibold">Mountain Mirage</span> was born from a dream — a dream to create a luxurious escape nestled within the serenity of nature.
                        Our founders envisioned a place where every sunrise brings peace, and every stay feels like home.
                    </p>
                    <p className="text-gray-600 leading-relaxed">
                        Today, we are proud to be recognized as one of the finest luxury destinations in the region, combining world-class hospitality with timeless mountain charm.
                    </p>
                </div>
            </section>

            {/* ================== OUR VALUES ================== */}
            <section className="bg-white py-20">
                <div className="max-w-6xl mx-auto px-6 text-center">
                    <h2 className="text-3xl font-bold text-gray-900 mb-12">
                        What Defines <span className="text-teal-500">Us</span>
                    </h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                        {[
                            {
                                icon: <Star size={40} className="text-yellow-400" />,
                                title: "Excellence in Service",
                                desc: "Every guest is our priority — we deliver experiences that go beyond expectations.",
                            },
                            {
                                icon: <HeartHandshake size={40} className="text-pink-500" />,
                                title: "Warm Hospitality",
                                desc: "Our team ensures that every moment feels personal, comforting, and memorable.",
                            },
                            {
                                icon: <Building2 size={40} className="text-emerald-500" />,
                                title: "Architectural Elegance",
                                desc: "Experience the perfect blend of modern luxury and mountain tranquility.",
                            },
                            {
                                icon: <Users2 size={40} className="text-blue-400" />,
                                title: "Community First",
                                desc: "We’re proud to empower local artisans and support sustainable tourism.",
                            },
                            {
                                icon: <Coffee size={40} className="text-brown-500" />,
                                title: "Culinary Excellence",
                                desc: "Savor authentic flavors crafted by our award-winning chefs with love and art.",
                            },
                            {
                                icon: <MapPin size={40} className="text-red-400" />,
                                title: "Perfect Location",
                                desc: "Nestled amidst scenic mountains, our resort offers peace and panoramic beauty.",
                            },
                        ].map((item, index) => (
                            <motion.div
                                key={index}
                                whileHover={{ scale: 1.05 }}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: index * 0.1 }}
                                className="bg-gray-50 rounded-2xl p-6 shadow-md hover:shadow-lg text-center"
                            >
                                <div className="flex justify-center mb-4">{item.icon}</div>
                                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                                <p className="text-gray-600 text-sm">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ================== OUR TEAM ================== */}
            <section className="py-20 bg-gradient-to-r from-emerald-50 to-teal-50">
                <div className="max-w-6xl mx-auto px-6 text-center">
                    <h2 className="text-3xl font-bold text-gray-900 mb-12">
                        Meet Our <span className="text-teal-500">Team</span>
                    </h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
                        {[
                            {
                                name: "Mukesh Lilawat",
                                role: "Founder & CEO",
                                img: "/assets/images/lilawat.jpg",
                            },
                            {
                                name: "Natalia Petrov",
                                role: "Guest Experience Manager",
                                img: "/assets/images/nat.jpg",
                            },
                            {
                                name: "Victoria Ellington",
                                role: "Head Chef",
                                img: "/assets/images/Natalia.jpg",
                            },
                        ].map((member, i) => (
                            <motion.div
                                key={i}
                                whileHover={{ scale: 1.05 }}
                                className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col"
                            >
                                {/* ✅ FIXED IMAGE CONTAINER */}
                                <div className="w-full aspect-[4/5] overflow-hidden relative">
                                    <img
                                        src={member.img}
                                        alt={member.name}
                                        className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-500 hover:scale-110"
                                    />
                                </div>

                                {/* ✅ TEXT PART */}
                                <div className="p-5 flex flex-col justify-center flex-grow">
                                    <h3 className="text-lg font-semibold text-gray-800">
                                        {member.name}
                                    </h3>
                                    <p className="text-sm text-gray-500">{member.role}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>



            {/* ================== CTA ================== */}
            <section className="py-16 bg-teal-600 text-white text-center">
                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-3xl font-bold mb-4"
                >
                    Experience the Magic of Mountain Mirage ✨
                </motion.h2>
                <p className="text-gray-100 mb-8 max-w-xl mx-auto">
                    Discover peace, luxury, and unforgettable hospitality. Book your stay today
                    and embrace the beauty of the mountains.
                </p>
                <motion.a
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    href="/rooms"
                    className="bg-white text-teal-600 font-semibold px-8 py-3 rounded-full shadow-md hover:bg-teal-100 transition"
                >
                    Book Now
                </motion.a>
            </section>
        </div>
    );
};

export default AboutUs;
