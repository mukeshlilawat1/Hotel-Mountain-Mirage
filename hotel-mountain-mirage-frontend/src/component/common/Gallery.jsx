import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Image as ImageIcon, Camera, Coffee, Gift, Sun, Video } from "lucide-react";

const Gallery = () => {
    const [selectedMedia, setSelectedMedia] = useState(null);
    const [mediaType, setMediaType] = useState(null);
    const [category, setCategory] = useState("All");

    const galleryMedia = [
        { src: "/assets/gallery/room1.jpg", category: "Rooms", type: "image" },
        { src: "/assets/gallery/room2.jpg", category: "Rooms", type: "image" },
        { src: "/assets/gallery/room3.jpg", category: "Rooms", type: "image" },
        { src: "/assets/gallery/dining1.jpg", category: "Dining", type: "image" },
        { src: "/assets/gallery/dining2.jpg", category: "Dining", type: "image" },
        { src: "/assets/gallery/event1.jpg", category: "Events", type: "image" },
        { src: "/assets/gallery/spa1.jpg", category: "Spa", type: "image" },
        { src: "/assets/gallery/nature1.jpg", category: "Nature", type: "image" },
        { src: "/assets/gallery/nature2.jpg", category: "Nature", type: "image" },
        { src: "/assets/gallery/hotel-tour.mp4", category: "Videos", type: "video" },
        { src: "/assets/gallery/spa-tour.mp4", category: "Videos", type: "video" },
    ];

    const filteredMedia =
        category === "All"
            ? galleryMedia
            : galleryMedia.filter((item) => item.category === category);

    return (
        <div className="relative bg-gradient-to-b from-white via-gray-50 to-emerald-50 text-gray-800 overflow-hidden">
            {/* Floating gradient orbs */}
            <motion.div
                animate={{ y: [0, 40, 0], opacity: [0.8, 1, 0.8] }}
                transition={{ repeat: Infinity, duration: 10 }}
                className="absolute top-10 -left-20 w-96 h-96 bg-emerald-200/30 blur-3xl rounded-full"
            />
            <motion.div
                animate={{ y: [0, -30, 0], opacity: [0.8, 1, 0.8] }}
                transition={{ repeat: Infinity, duration: 12 }}
                className="absolute bottom-10 -right-20 w-[30rem] h-[30rem] bg-teal-200/30 blur-3xl rounded-full"
            />

            {/* ================= HERO SECTION ================= */}
            <section className="relative h-[75vh] flex items-center justify-center overflow-hidden">
                <motion.img
                    src="/assets/images/hotel.webp"
                    alt="Gallery Hero"
                    initial={{ scale: 1 }}
                    animate={{ scale: 1.1 }}
                    transition={{ duration: 18, repeat: Infinity, repeatType: "reverse" }}
                    className="absolute inset-0 w-full h-full object-cover brightness-[55%]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent"></div>

                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    className="relative z-10 text-center text-white px-6"
                >
                    <h1 className="text-5xl md:text-6xl font-extrabold mb-3 drop-shadow-xl tracking-wide">
                        Discover Our <span className="text-teal-400">Gallery</span>
                    </h1>
                    <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto leading-relaxed">
                        Experience the art of luxury, crafted within nature’s embrace 🌿
                    </p>
                </motion.div>
            </section>

            {/* ================= CATEGORY FILTER ================= */}
            <section className="text-center py-16">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                    Explore by <span className="text-teal-500">Category</span>
                </h2>

                <div className="flex flex-wrap justify-center gap-4 mb-12">
                    {[
                        { name: "All", icon: <ImageIcon size={18} /> },
                        { name: "Rooms", icon: <Camera size={18} /> },
                        { name: "Dining", icon: <Coffee size={18} /> },
                        { name: "Spa", icon: <Gift size={18} /> },
                        { name: "Events", icon: <Sun size={18} /> },
                        { name: "Nature", icon: <Sun size={18} /> },
                        { name: "Videos", icon: <Video size={18} /> },
                    ].map((btn) => (
                        <motion.button
                            key={btn.name}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => setCategory(btn.name)}
                            className={`flex items-center gap-2 px-5 py-2 rounded-full border text-sm font-medium transition-all duration-300 ${category === btn.name
                                    ? "bg-teal-500 text-white border-teal-500 shadow-lg"
                                    : "bg-white text-gray-700 border-gray-300 hover:bg-teal-50"
                                }`}
                        >
                            {btn.icon}
                            {btn.name}
                        </motion.button>
                    ))}
                </div>

                {/* ================= GRID GALLERY ================= */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-6 max-w-7xl mx-auto"
                >
                    {filteredMedia.map((item, i) => (
                        <motion.div
                            key={i}
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.3 }}
                            onClick={() => {
                                setSelectedMedia(item.src);
                                setMediaType(item.type);
                            }}
                            className="relative cursor-pointer group rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl"
                        >
                            {item.type === "video" ? (
                                <video
                                    src={item.src}
                                    muted
                                    loop
                                    autoPlay
                                    className="w-full h-64 object-cover brightness-90 group-hover:brightness-100 transition-all duration-500"
                                />
                            ) : (
                                <img
                                    src={item.src}
                                    alt={`Gallery ${i}`}
                                    className="w-full h-64 object-cover transform group-hover:scale-110 transition-transform duration-500"
                                />
                            )}

                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                                <p className="text-white text-lg font-semibold tracking-wide">
                                    {item.category}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </section>

            {/* ================= LIGHTBOX MODAL ================= */}
            <AnimatePresence>
                {selectedMedia && (
                    <motion.div
                        className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 backdrop-blur-sm"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedMedia(null)}
                    >
                        {mediaType === "image" ? (
                            <motion.img
                                src={selectedMedia}
                                alt="Preview"
                                initial={{ scale: 0.8 }}
                                animate={{ scale: 1 }}
                                exit={{ scale: 0.8 }}
                                transition={{ duration: 0.3 }}
                                className="max-h-[90vh] max-w-[90vw] object-contain rounded-2xl shadow-2xl"
                            />
                        ) : (
                            <motion.video
                                src={selectedMedia}
                                controls
                                autoPlay
                                className="max-h-[90vh] max-w-[90vw] rounded-2xl shadow-2xl"
                            />
                        )}

                        <motion.button
                            onClick={() => setSelectedMedia(null)}
                            className="absolute top-8 right-8 bg-white/20 text-white p-3 rounded-full hover:bg-white/40 transition"
                        >
                            <X size={24} />
                        </motion.button>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* ================= CTA SECTION ================= */}
            <section className="py-20 bg-gradient-to-r from-teal-600 to-emerald-500 text-center text-white mt-16 relative overflow-hidden">
                <motion.div
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ repeat: Infinity, duration: 8 }}
                    className="absolute inset-0 bg-white/10 blur-2xl"
                ></motion.div>

                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-3xl font-bold mb-4 relative z-10"
                >
                    Capture Moments That Last Forever 📸
                </motion.h2>
                <p className="text-gray-100 mb-8 max-w-xl mx-auto relative z-10">
                    Every corner of Mountain Mirage tells a story — come and be a part of it.
                </p>
                <motion.a
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    href="/rooms"
                    className="bg-white text-teal-600 font-semibold px-8 py-3 rounded-full shadow-md hover:bg-teal-100 transition relative z-10"
                >
                    Book Your Stay
                </motion.a>
            </section>
        </div>
    );
};

export default Gallery;
