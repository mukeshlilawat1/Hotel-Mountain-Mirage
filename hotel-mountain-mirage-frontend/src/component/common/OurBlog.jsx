import React from "react";
import { motion } from "framer-motion";
import { Calendar, User, Heart, Share2, BookOpen, ChevronRight } from "lucide-react";

const OurBlog = () => {
    const blogs = [
        {
            id: 1,
            title: "Top 5 Reasons to Choose Mountain Mirage for Your Next Getaway 🏞️",
            desc: "Discover why Mountain Mirage stands out as a paradise for peace seekers, adventure lovers, and luxury enthusiasts alike.",
            img: "/assets/blog/blog1.jpg",
            author: "Natalia Petrov",
            date: "October 18, 2025",
            category: "Travel & Stay",
        },
        {
            id: 2,
            title: "A Culinary Journey Through the Hills 🍽️",
            desc: "From local delicacies to global cuisine — our chefs craft experiences that delight every palate.",
            img: "/assets/blog/blog2.jpg",
            author: "Victoria Ellington",
            date: "November 5, 2025",
            category: "Food & Lifestyle",
        },
        {
            id: 3,
            title: "Behind the Scenes: The Art of Hosting Perfect Weddings 💍",
            desc: "How our dedicated team transforms dreams into timeless celebrations amidst the mountains.",
            img: "/assets/blog/blog3.jpg",
            author: "Mukesh Lilawat",
            date: "September 29, 2025",
            category: "Events & Culture",
        },
    ];

    return (
        <div className="relative bg-gradient-to-b from-white via-gray-50 to-emerald-50 text-gray-800 overflow-hidden">
            {/* Floating Gradient Orbs */}
            <motion.div
                animate={{ y: [0, 40, 0], opacity: [0.7, 1, 0.7] }}
                transition={{ repeat: Infinity, duration: 10 }}
                className="absolute top-20 -left-20 w-96 h-96 bg-emerald-200/20 blur-3xl rounded-full"
            />
            <motion.div
                animate={{ y: [0, -40, 0], opacity: [0.7, 1, 0.7] }}
                transition={{ repeat: Infinity, duration: 12 }}
                className="absolute bottom-10 -right-20 w-[30rem] h-[30rem] bg-teal-200/20 blur-3xl rounded-full"
            />

            {/* ================= HERO SECTION ================= */}
            <section className="relative h-[75vh] flex items-center justify-center overflow-hidden">
                <motion.img
                    src="/assets/images/blog-hero.webp"
                    alt="Our Blog"
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
                        Our <span className="text-teal-400">Blog</span>
                    </h1>
                    <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto leading-relaxed">
                        Stories, experiences, and moments from the heart of Mountain Mirage 🌿
                    </p>
                </motion.div>
            </section>

            {/* ================= FEATURED BLOG ================= */}
            <section className="max-w-6xl mx-auto py-20 px-6">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="bg-gradient-to-r from-emerald-100 to-teal-100 rounded-3xl overflow-hidden shadow-lg md:flex"
                >
                    <img
                        src="/assets/blog/featured.jpg"
                        alt="Featured Blog"
                        className="md:w-1/2 h-80 md:h-auto object-cover"
                    />
                    <div className="p-8 flex flex-col justify-center md:w-1/2 text-center md:text-left">
                        <h2 className="text-3xl font-bold text-gray-900 mb-3">
                            Serenity Meets Luxury — The Mountain Mirage Philosophy 🌄
                        </h2>
                        <p className="text-gray-700 mb-5">
                            Step behind the scenes and discover how every detail of our resort — from architecture to aroma — is crafted to offer peace, beauty, and timeless elegance.
                        </p>
                        <motion.a
                            whileHover={{ scale: 1.05 }}
                            href="#"
                            className="bg-gradient-to-r from-teal-500 to-emerald-500 text-white px-6 py-3 rounded-full shadow-md hover:shadow-lg flex justify-center md:justify-start gap-2 items-center"
                        >
                            <BookOpen size={18} /> Read Full Story
                        </motion.a>
                    </div>
                </motion.div>
            </section>

            {/* ================= BLOG GRID ================= */}
            <section className="max-w-7xl mx-auto px-6 pb-24">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">
                        Latest <span className="text-teal-500">Stories</span>
                    </h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Explore our latest updates, travel tales, and insights from the world of Mountain Mirage.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    {blogs.map((blog, i) => (
                        <motion.div
                            key={i}
                            whileHover={{ scale: 1.04 }}
                            transition={{ duration: 0.3 }}
                            className="bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 border border-gray-100"
                        >
                            <img
                                src={blog.img}
                                alt={blog.title}
                                className="w-full h-64 object-cover hover:scale-105 transition-transform duration-700"
                            />
                            <div className="p-6">
                                <div className="flex items-center gap-3 text-sm text-gray-500 mb-3">
                                    <Calendar size={15} /> {blog.date} | <User size={15} /> {blog.author}
                                </div>
                                <h3 className="text-xl font-semibold mb-2 text-gray-800">{blog.title}</h3>
                                <p className="text-gray-600 text-sm mb-4">{blog.desc}</p>
                                <div className="flex justify-between items-center text-sm">
                                    <a
                                        href="#"
                                        className="text-teal-500 font-medium hover:underline flex items-center gap-1"
                                    >
                                        Read More <ChevronRight size={14} />
                                    </a>
                                    <div className="flex items-center gap-3 text-gray-400">
                                        <Heart size={18} className="hover:text-pink-500 transition" />
                                        <Share2 size={18} className="hover:text-teal-500 transition" />
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* ================= CTA SECTION ================= */}
            <section className="py-20 bg-gradient-to-r from-teal-600 to-emerald-500 text-white text-center relative overflow-hidden">
                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-3xl font-bold mb-4"
                >
                    Want to Share Your Story? ✍️
                </motion.h2>
                <p className="text-gray-100 mb-8 max-w-xl mx-auto">
                    Join our community of storytellers and adventurers. Submit your travel stories and get featured on our blog!
                </p>
                <motion.a
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    href="/contact"
                    className="bg-white text-teal-600 font-semibold px-8 py-3 rounded-full shadow-md hover:bg-teal-100 transition inline-flex items-center gap-2"
                >
                    Contact Us <ChevronRight size={20} />
                </motion.a>
            </section>
        </div>
    );
};

export default OurBlog;
