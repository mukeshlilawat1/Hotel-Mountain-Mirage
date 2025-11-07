import React, { useState } from "react";
import { motion } from "framer-motion";
import {
    Handshake,
    Building2,
    Star,
    Gift,
    Users,
    Send,
    Globe2,
    Rocket,
    ChevronRight,
} from "lucide-react";

const PartnerWithUs = () => {
    const [formData, setFormData] = useState({
        name: "",
        company: "",
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
        // ⚙️ Backend Integration (Spring Boot) will be handled later
    };

    const partnerships = [
        {
            icon: <Handshake size={38} className="text-teal-500" />,
            title: "Travel & Hospitality",
            desc: "Collaborate with us to create unforgettable travel packages and luxury stays.",
        },
        {
            icon: <Building2 size={38} className="text-emerald-500" />,
            title: "Corporate Partnerships",
            desc: "Partner with Mountain Mirage for corporate retreats and client hospitality programs.",
        },
        {
            icon: <Gift size={38} className="text-pink-500" />,
            title: "Event Collaborations",
            desc: "Host your events, weddings, and retreats with our world-class facilities.",
        },
        {
            icon: <Globe2 size={38} className="text-blue-500" />,
            title: "International Alliances",
            desc: "Join hands with us to expand our global luxury presence together.",
        },
    ];

    const benefits = [
        {
            icon: <Star size={36} className="text-yellow-500" />,
            title: "Premium Brand Association",
            desc: "Be part of a 5-star brand recognized for excellence and class.",
        },
        {
            icon: <Users size={36} className="text-emerald-500" />,
            title: "Mutual Growth",
            desc: "We grow together with transparency, innovation, and shared success.",
        },
        {
            icon: <Rocket size={36} className="text-teal-500" />,
            title: "Marketing Boost",
            desc: "Get visibility through our website, social media, and global partner listings.",
        },
    ];

    return (
        <div className="relative bg-gradient-to-b from-white via-gray-50 to-emerald-50 text-gray-800 overflow-hidden">
            {/* Floating Background Glow */}
            <motion.div
                animate={{ y: [0, 30, 0] }}
                transition={{ repeat: Infinity, duration: 10 }}
                className="absolute top-20 -left-20 w-96 h-96 bg-emerald-200/20 blur-3xl rounded-full"
            />
            <motion.div
                animate={{ y: [0, -30, 0] }}
                transition={{ repeat: Infinity, duration: 12 }}
                className="absolute bottom-10 -right-20 w-[28rem] h-[28rem] bg-teal-200/20 blur-3xl rounded-full"
            />

            {/* ================= HERO SECTION ================= */}
            <section className="relative h-[75vh] flex items-center justify-center overflow-hidden">
                <motion.img
                    src="/assets/images/partner-hero.webp"
                    alt="Partner With Mountain Mirage"
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
                    <h1 className="text-5xl md:text-6xl font-extrabold mb-3 drop-shadow-xl">
                        Partner With <span className="text-teal-400">Mountain Mirage</span>
                    </h1>
                    <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto">
                        Build meaningful collaborations and explore world-class business opportunities.
                    </p>
                </motion.div>
            </section>

            {/* ================= PARTNERSHIP TYPES ================= */}
            <section className="max-w-6xl mx-auto py-20 px-6 text-center">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-3xl font-bold mb-10 text-gray-900"
                >
                    Partnership <span className="text-teal-500">Opportunities</span>
                </motion.h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                    {partnerships.map((item, i) => (
                        <motion.div
                            key={i}
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.3 }}
                            className="bg-white rounded-2xl shadow-md hover:shadow-xl border border-gray-100 p-8"
                        >
                            <div className="flex justify-center mb-4">{item.icon}</div>
                            <h3 className="font-semibold text-lg text-gray-800 mb-2">
                                {item.title}
                            </h3>
                            <p className="text-gray-600 text-sm">{item.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* ================= BENEFITS ================= */}
            <section className="bg-gradient-to-r from-emerald-50 to-teal-50 py-20 px-6 text-center">
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-3xl font-bold text-gray-900 mb-12">
                        Why Partner <span className="text-teal-500">With Us?</span>
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        {benefits.map((b, i) => (
                            <motion.div
                                key={i}
                                whileHover={{ scale: 1.05 }}
                                className="bg-white rounded-2xl shadow-md p-8 border border-gray-100 hover:shadow-xl transition-all"
                            >
                                <div className="flex justify-center mb-4">{b.icon}</div>
                                <h3 className="font-semibold text-gray-800 mb-2">{b.title}</h3>
                                <p className="text-gray-600 text-sm">{b.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ================= BRAND LOGOS ================= */}
            <section className="py-20 max-w-6xl mx-auto px-6 text-center">
                <h2 className="text-3xl font-bold text-gray-900 mb-8">
                    Trusted by <span className="text-teal-500">Global Brands</span>
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-6 opacity-80">
                    {["airbnb", "makemytrip", "expedia", "oyo", "tripadvisor"].map(
                        (brand, i) => (
                            <motion.img
                                key={i}
                                src={`/assets/brands/${brand}.png`}
                                alt={brand}
                                whileHover={{ scale: 1.1 }}
                                className="mx-auto w-32 grayscale hover:grayscale-0 transition"
                            />
                        )
                    )}
                </div>
            </section>

            {/* ================= PARTNER FORM ================= */}
            <section className="max-w-4xl mx-auto py-20 px-6 text-center">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-3xl font-bold mb-8 text-gray-900"
                >
                    Become a <span className="text-teal-500">Mountain Mirage Partner</span>
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
                            name="company"
                            value={formData.company}
                            onChange={handleChange}
                            placeholder="Company / Organization"
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
                        placeholder="Tell us about your partnership idea..."
                        rows="4"
                        className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-300 focus:ring-2 focus:ring-teal-400 outline-none resize-none"
                    ></textarea>

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        type="submit"
                        className="w-full flex justify-center items-center gap-2 py-3 bg-gradient-to-r from-emerald-400 to-teal-500 text-white font-semibold rounded-xl shadow-md hover:shadow-lg transition-all"
                    >
                        <Send size={18} /> Submit Partnership Request
                    </motion.button>

                    {submitted && (
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-green-600 text-center mt-3 font-medium animate-pulse"
                        >
                            ✅ Partnership request sent! Our business team will contact you soon.
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
                    Let’s Grow Together 🌿
                </motion.h2>
                <p className="text-gray-100 mb-8 max-w-xl mx-auto">
                    Join the Mountain Mirage family and explore premium opportunities in travel, events, and business excellence.
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

export default PartnerWithUs;
