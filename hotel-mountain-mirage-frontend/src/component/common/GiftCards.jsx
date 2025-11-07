import React, { useState } from "react";
import { motion } from "framer-motion";
import { Gift, Heart, Star, Crown, Send, Sparkles, CreditCard, ChevronRight } from "lucide-react";

const GiftCards = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        amount: "",
        message: "",
    });
    const [sent, setSent] = useState(false);

    const handleChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = (e) => {
        e.preventDefault();
        setSent(true);
        setTimeout(() => setSent(false), 3000);
        // ⚙️ Backend integration (Spring Boot) will handle payment & email
    };

    const cards = [
        {
            icon: <Gift size={40} className="text-teal-500" />,
            title: "Classic Gift Card",
            price: "₹5,000",
            desc: "Perfect for weekend getaways and fine dining experiences.",
            color: "from-gray-50 to-teal-50",
        },
        {
            icon: <Crown size={40} className="text-yellow-500" />,
            title: "Luxury Gift Card",
            price: "₹10,000",
            desc: "Includes spa access, deluxe stay & gourmet dinner for two.",
            color: "from-amber-50 to-yellow-100",
        },
        {
            icon: <Star size={40} className="text-emerald-500" />,
            title: "Elite Experience Card",
            price: "₹25,000",
            desc: "Ultimate royal stay with personalized butler & private suite.",
            color: "from-emerald-50 to-teal-100",
        },
    ];

    const perks = [
        {
            icon: <Heart size={32} className="text-pink-500" />,
            title: "Perfect for Every Occasion",
            desc: "Gift love, joy, and unforgettable memories — for birthdays, weddings, or anniversaries.",
        },
        {
            icon: <Sparkles size={32} className="text-teal-500" />,
            title: "Instant Digital Delivery",
            desc: "Receive your gift card instantly via email — beautifully designed and ready to send.",
        },
        {
            icon: <CreditCard size={32} className="text-emerald-500" />,
            title: "Flexible Redemption",
            desc: "Usable across our resort stays, dining, events, or spa experiences — anytime.",
        },
    ];

    return (
        <div className="relative bg-gradient-to-b from-white via-gray-50 to-emerald-50 text-gray-800 overflow-hidden">
            {/* Floating Glows */}
            <motion.div
                animate={{ y: [0, 25, 0] }}
                transition={{ repeat: Infinity, duration: 10 }}
                className="absolute top-20 -left-20 w-96 h-96 bg-teal-200/20 blur-3xl rounded-full"
            />
            <motion.div
                animate={{ y: [0, -25, 0] }}
                transition={{ repeat: Infinity, duration: 12 }}
                className="absolute bottom-10 -right-20 w-[28rem] h-[28rem] bg-emerald-200/20 blur-3xl rounded-full"
            />

            {/* ================= HERO SECTION ================= */}
            <section className="relative h-[75vh] flex items-center justify-center overflow-hidden">
                <motion.img
                    src="/assets/images/giftcard-hero.webp"
                    alt="Mountain Mirage Gift Cards"
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
                        Mountain Mirage <span className="text-teal-400">Gift Cards</span>
                    </h1>
                    <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto">
                        Gift unforgettable luxury experiences to your loved ones ✨
                    </p>
                </motion.div>
            </section>

            {/* ================= CARD TYPES ================= */}
            <section className="max-w-6xl mx-auto py-20 px-6 text-center">
                <h2 className="text-3xl font-bold text-gray-900 mb-12">
                    Choose Your <span className="text-teal-500">Gift Card</span>
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    {cards.map((card, i) => (
                        <motion.div
                            key={i}
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.3 }}
                            className={`bg-gradient-to-br ${card.color} rounded-2xl shadow-md hover:shadow-xl border border-gray-100 p-8 relative overflow-hidden`}
                        >
                            <div className="flex justify-center mb-4">{card.icon}</div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">{card.title}</h3>
                            <p className="text-gray-600 text-sm mb-4">{card.desc}</p>
                            <p className="text-lg font-bold text-teal-600 mb-6">{card.price}</p>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="bg-gradient-to-r from-emerald-400 to-teal-500 text-white px-6 py-2 rounded-full shadow-md hover:shadow-lg transition"
                            >
                                Buy Now
                            </motion.button>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* ================= BENEFITS ================= */}
            <section className="bg-gradient-to-r from-emerald-50 to-teal-50 py-20 px-6 text-center">
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-3xl font-bold text-gray-900 mb-12">
                        Why Choose <span className="text-teal-500">Our Gift Cards?</span>
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        {perks.map((perk, i) => (
                            <motion.div
                                key={i}
                                whileHover={{ scale: 1.05 }}
                                className="bg-white rounded-2xl shadow-md p-8 border border-gray-100 hover:shadow-xl transition-all"
                            >
                                <div className="flex justify-center mb-3">{perk.icon}</div>
                                <h3 className="font-semibold text-gray-800 mb-2">{perk.title}</h3>
                                <p className="text-gray-600 text-sm">{perk.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ================= PURCHASE FORM ================= */}
            <section className="max-w-4xl mx-auto py-20 px-6 text-center">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-3xl font-bold mb-8 text-gray-900"
                >
                    Send a <span className="text-teal-500">Gift of Luxury</span>
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
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Recipient's Email"
                            className="px-4 py-3 bg-gray-50 rounded-xl border border-gray-300 focus:ring-2 focus:ring-teal-400 outline-none"
                        />
                    </div>

                    <input
                        type="text"
                        name="amount"
                        value={formData.amount}
                        onChange={handleChange}
                        placeholder="Gift Card Amount (e.g., 5000)"
                        className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-300 focus:ring-2 focus:ring-teal-400 outline-none"
                    />

                    <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Add a personal message..."
                        rows="4"
                        className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-300 focus:ring-2 focus:ring-teal-400 outline-none resize-none"
                    ></textarea>

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        type="submit"
                        className="w-full flex justify-center items-center gap-2 py-3 bg-gradient-to-r from-emerald-400 to-teal-500 text-white font-semibold rounded-xl shadow-md hover:shadow-lg transition-all"
                    >
                        <Send size={18} /> Purchase Gift Card
                    </motion.button>

                    {sent && (
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-green-600 text-center mt-3 font-medium animate-pulse"
                        >
                            🎉 Gift Card Sent Successfully! Your recipient will receive it shortly.
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
                    Give the Gift of Tranquility 💝
                </motion.h2>
                <p className="text-gray-100 mb-8 max-w-xl mx-auto">
                    Celebrate every occasion with Mountain Mirage Gift Cards —
                    because memories are the best gifts of all.
                </p>
                <motion.a
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    href="/contact"
                    className="bg-white text-teal-600 font-semibold px-8 py-3 rounded-full shadow-md hover:bg-teal-100 transition inline-flex items-center gap-2"
                >
                    Contact for Bulk Gifting <ChevronRight size={20} />
                </motion.a>
            </section>
        </div>
    );
};

export default GiftCards;
