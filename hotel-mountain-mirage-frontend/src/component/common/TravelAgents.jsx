import React, { useState } from "react";
import { motion } from "framer-motion";
import {
    Handshake,
    Globe,
    MapPin,
    Mail,
    Phone,
    Users,
    Star,
    Send,
    ChevronRight,
} from "lucide-react";

const TravelAgents = () => {
    const [formData, setFormData] = useState({
        name: "",
        agency: "",
        email: "",
        phone: "",
        message: "",
    });
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 3000);
        // 🧩 Integration with Spring Boot backend will go here
    };

    const benefits = [
        {
            icon: <Globe size={40} className="text-emerald-500" />,
            title: "Global Exposure",
            desc: "Partner with a luxury brand known across the travel world.",
        },
        {
            icon: <Users size={40} className="text-teal-500" />,
            title: "Trusted Partnership",
            desc: "Work directly with our team to deliver exceptional guest experiences.",
        },
        {
            icon: <Star size={40} className="text-yellow-500" />,
            title: "Exclusive Commissions",
            desc: "Earn attractive commissions on each successful booking.",
        },
        {
            icon: <Handshake size={40} className="text-pink-500" />,
            title: "Long-Term Relations",
            desc: "Join a network of elite agents who represent Mountain Mirage.",
        },
    ];

    return (
        <div className="relative bg-gradient-to-b from-white via-gray-50 to-emerald-50 text-gray-800 overflow-hidden">
            {/* Floating Orbs */}
            <motion.div
                animate={{ y: [0, 30, 0], opacity: [0.7, 1, 0.7] }}
                transition={{ repeat: Infinity, duration: 10 }}
                className="absolute top-20 -left-20 w-96 h-96 bg-emerald-200/20 blur-3xl rounded-full"
            />
            <motion.div
                animate={{ y: [0, -30, 0], opacity: [0.7, 1, 0.7] }}
                transition={{ repeat: Infinity, duration: 12 }}
                className="absolute bottom-10 -right-20 w-[28rem] h-[28rem] bg-teal-200/20 blur-3xl rounded-full"
            />

            {/* ================= HERO ================= */}
            <section className="relative h-[75vh] flex items-center justify-center overflow-hidden">
                <motion.img
                    src="/assets/images/travel-agent-hero.webp"
                    alt="Travel Agents Partnership"
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
                        Partner with <span className="text-teal-400">Mountain Mirage</span>
                    </h1>
                    <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto leading-relaxed">
                        Join hands with India’s most serene luxury destination and elevate
                        travel experiences for your clients.
                    </p>
                </motion.div>
            </section>

            {/* ================= BENEFITS ================= */}
            <section className="max-w-6xl mx-auto py-20 px-6 text-center">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-3xl font-bold mb-8 text-gray-900"
                >
                    Why Become Our <span className="text-teal-500">Travel Partner?</span>
                </motion.h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {benefits.map((b, i) => (
                        <motion.div
                            key={i}
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.3 }}
                            className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl border border-gray-100 transition-all"
                        >
                            <div className="flex justify-center mb-3">{b.icon}</div>
                            <h3 className="font-semibold text-gray-800 mb-2">{b.title}</h3>
                            <p className="text-gray-600 text-sm">{b.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* ================= SUCCESS STORIES ================= */}
            <section className="bg-gradient-to-r from-emerald-50 to-teal-50 py-20 px-6">
                <div className="max-w-6xl mx-auto text-center">
                    <h2 className="text-3xl font-bold text-gray-900 mb-3">
                        Partner <span className="text-teal-500">Success Stories</span>
                    </h2>
                    <p className="text-gray-600 mb-12 max-w-2xl mx-auto">
                        Hear from agencies who’ve grown with us and built lasting success.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        {[
                            {
                                img: "/assets/agents/agent1.jpg",
                                name: "Arjun Travels",
                                feedback:
                                    "Our partnership with Mountain Mirage tripled our luxury bookings. Their hospitality makes every guest experience unforgettable.",
                            },
                            {
                                img: "/assets/agents/agent2.jpg",
                                name: "Global Trip Experts",
                                feedback:
                                    "The seamless booking process and dedicated support make working with Mountain Mirage a pleasure.",
                            },
                            {
                                img: "/assets/agents/agent3.jpg",
                                name: "Horizon Escapes",
                                feedback:
                                    "High commissions and satisfied clients — a win-win partnership that keeps on giving!",
                            },
                        ].map((a, i) => (
                            <motion.div
                                key={i}
                                whileHover={{ scale: 1.05 }}
                                className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl border border-gray-100"
                            >
                                <img
                                    src={a.img}
                                    alt={a.name}
                                    className="w-full h-56 object-cover"
                                />
                                <div className="p-6 text-left">
                                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                                        {a.name}
                                    </h3>
                                    <p className="text-gray-600 text-sm italic">“{a.feedback}”</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ================= JOIN FORM ================= */}
            <section className="max-w-4xl mx-auto py-20 px-6 text-center">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-3xl font-bold mb-8 text-gray-900"
                >
                    Become a <span className="text-teal-500">Registered Agent</span>
                </motion.h2>

                <motion.form
                    onSubmit={handleSubmit}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-xl p-8 md:p-10 border border-gray-100 space-y-6"
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Your Full Name"
                            className="px-4 py-3 bg-gray-50 rounded-xl border border-gray-300 focus:ring-2 focus:ring-teal-400 outline-none"
                        />
                        <input
                            type="text"
                            name="agency"
                            value={formData.agency}
                            onChange={handleChange}
                            placeholder="Agency Name"
                            className="px-4 py-3 bg-gray-50 rounded-xl border border-gray-300 focus:ring-2 focus:ring-teal-400 outline-none"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Email Address"
                            className="px-4 py-3 bg-gray-50 rounded-xl border border-gray-300 focus:ring-2 focus:ring-teal-400 outline-none"
                        />
                        <input
                            type="text"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="Phone Number"
                            className="px-4 py-3 bg-gray-50 rounded-xl border border-gray-300 focus:ring-2 focus:ring-teal-400 outline-none"
                        />
                    </div>

                    <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Tell us about your agency..."
                        rows="4"
                        className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-300 focus:ring-2 focus:ring-teal-400 outline-none resize-none"
                    ></textarea>

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        type="submit"
                        className="w-full flex justify-center items-center gap-2 py-3 bg-gradient-to-r from-emerald-400 to-teal-500 text-white font-semibold rounded-xl shadow-md hover:shadow-lg transition-all"
                    >
                        <Send size={18} /> Submit Application
                    </motion.button>

                    {submitted && (
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-green-600 text-center mt-3 font-medium animate-pulse"
                        >
                            ✅ Application Sent! Our team will contact you shortly.
                        </motion.p>
                    )}
                </motion.form>
            </section>

            {/* ================= CTA ================= */}
            <section className="py-20 bg-gradient-to-r from-teal-600 to-emerald-500 text-white text-center relative overflow-hidden">
                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-3xl font-bold mb-4"
                >
                    Let’s Build Success Together 🤝
                </motion.h2>
                <p className="text-gray-100 mb-8 max-w-xl mx-auto">
                    Become an exclusive Mountain Mirage Travel Partner and start your journey
                    towards limitless opportunities.
                </p>
                <motion.a
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    href="/contact"
                    className="bg-white text-teal-600 font-semibold px-8 py-3 rounded-full shadow-md hover:bg-teal-100 transition inline-flex items-center gap-2"
                >
                    Contact Partnership Team <ChevronRight size={20} />
                </motion.a>
            </section>
        </div>
    );
};

export default TravelAgents;
