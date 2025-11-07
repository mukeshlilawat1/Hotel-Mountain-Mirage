import React, { useState } from "react";
import { motion } from "framer-motion";
import {
    Headphones,
    MessageSquare,
    Mail,
    Phone,
    LifeBuoy,
    FileQuestion,
    ShieldCheck,
    Clock,
    ChevronRight,
    Send,
} from "lucide-react";

const Support = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        issue: "",
    });
    const [sent, setSent] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setSent(true);
        setTimeout(() => setSent(false), 3000);
        // ⚙️ Backend integration (Spring Boot) — tu karega
    };

    return (
        <div className="relative bg-gradient-to-b from-white via-gray-50 to-emerald-50 text-gray-800 overflow-hidden">
            {/* Background gradients for motion */}
            <motion.div
                animate={{ y: [0, 25, 0] }}
                transition={{ repeat: Infinity, duration: 10 }}
                className="absolute top-20 -left-20 w-96 h-96 bg-emerald-200/20 blur-3xl rounded-full"
            />
            <motion.div
                animate={{ y: [0, -25, 0] }}
                transition={{ repeat: Infinity, duration: 12 }}
                className="absolute bottom-20 -right-20 w-[28rem] h-[28rem] bg-teal-200/20 blur-3xl rounded-full"
            />

            {/* ================= HERO SECTION ================= */}
            <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
                <motion.img
                    src="/assets/images/support-hero.webp"
                    alt="Customer Support - Mountain Mirage"
                    initial={{ scale: 1 }}
                    animate={{ scale: 1.1 }}
                    transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
                    className="absolute inset-0 w-full h-full object-cover brightness-[60%]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent"></div>

                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    className="relative z-10 text-center text-white px-6"
                >
                    <h1 className="text-5xl md:text-6xl font-extrabold mb-3 drop-shadow-xl">
                        Customer <span className="text-teal-400">Support</span>
                    </h1>
                    <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto leading-relaxed">
                        Need help? Our support team is here 24/7 to assist with bookings, refunds, and inquiries.
                    </p>
                </motion.div>
            </section>

            {/* ================= SUPPORT OPTIONS ================= */}
            <section className="max-w-6xl mx-auto py-20 px-6 text-center">
                <h2 className="text-3xl font-bold text-gray-900 mb-10">
                    Choose How You’d Like to <span className="text-teal-500">Reach Us</span>
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                    {[
                        {
                            icon: <Phone size={38} className="text-teal-500" />,
                            title: "Call Support",
                            desc: "Speak directly with our support team for quick resolutions.",
                            action: "Call Now",
                            link: "tel:+919876543210",
                        },
                        {
                            icon: <Mail size={38} className="text-emerald-500" />,
                            title: "Email Support",
                            desc: "Send us your query and we’ll get back within 24 hours.",
                            action: "Email Us",
                            link: "mailto:support@mountainmirage.com",
                        },
                        {
                            icon: <MessageSquare size={38} className="text-yellow-500" />,
                            title: "Live Chat",
                            desc: "Chat with our agents instantly via WhatsApp or website chat.",
                            action: "Start Chat",
                            link: "https://wa.me/919876543210",
                        },
                    ].map((item, i) => (
                        <motion.div
                            key={i}
                            whileHover={{ scale: 1.05 }}
                            className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-md p-8 border border-gray-100 hover:shadow-xl transition-all"
                        >
                            <div className="flex justify-center mb-3">{item.icon}</div>
                            <h3 className="text-lg font-semibold text-gray-800 mb-2">{item.title}</h3>
                            <p className="text-gray-600 text-sm mb-4">{item.desc}</p>
                            <a
                                href={item.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-400 to-teal-500 text-white px-5 py-2 rounded-full font-medium shadow hover:shadow-lg transition"
                            >
                                {item.action} <ChevronRight size={18} />
                            </a>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* ================= ISSUE FORM ================= */}
            <section className="max-w-5xl mx-auto py-20 px-6">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-900 mb-3">
                        Report an <span className="text-teal-500">Issue</span>
                    </h2>
                    <p className="text-gray-500 max-w-2xl mx-auto">
                        Facing trouble with booking, refund, or payment? Submit your issue below and our experts will assist you.
                    </p>
                </div>

                <motion.form
                    onSubmit={handleSubmit}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="bg-white rounded-3xl shadow-2xl p-8 md:p-10 space-y-6 border border-gray-100"
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="text-sm font-medium text-gray-700">Full Name</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Enter your full name"
                                className="mt-1 w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-300 text-gray-700 focus:ring-2 focus:ring-teal-400 transition"
                            />
                        </div>
                        <div>
                            <label className="text-sm font-medium text-gray-700">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Enter your email"
                                className="mt-1 w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-300 text-gray-700 focus:ring-2 focus:ring-teal-400 transition"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="text-sm font-medium text-gray-700">Describe Your Issue</label>
                        <textarea
                            name="issue"
                            value={formData.issue}
                            onChange={handleChange}
                            placeholder="Please describe your issue in detail..."
                            rows="5"
                            className="mt-1 w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-300 text-gray-700 focus:ring-2 focus:ring-teal-400 transition resize-none"
                        ></textarea>
                    </div>

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        type="submit"
                        className="w-full flex justify-center items-center gap-2 py-3 bg-gradient-to-r from-emerald-400 to-teal-500 text-white font-semibold rounded-xl shadow-md hover:shadow-lg transition"
                    >
                        <Send size={18} /> Submit Issue
                    </motion.button>

                    {sent && (
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-green-600 text-center mt-3 font-medium animate-pulse"
                        >
                            ✅ Your issue has been submitted successfully! Our team will reach out soon.
                        </motion.p>
                    )}
                </motion.form>
            </section>

            {/* ================= FAQ SECTION ================= */}
            <section className="bg-gradient-to-r from-emerald-50 to-teal-50 py-20 text-center px-6">
                <h2 className="text-3xl font-bold text-gray-900 mb-12">
                    Frequently Asked <span className="text-teal-500">Questions</span>
                </h2>
                <div className="max-w-5xl mx-auto text-left space-y-6">
                    {[
                        {
                            q: "How can I modify or cancel my booking?",
                            a: "You can easily manage bookings under your profile section or contact our support team.",
                        },
                        {
                            q: "When will I receive my refund?",
                            a: "Refunds are processed within 5–7 business days as per our refund policy.",
                        },
                        {
                            q: "Do you provide 24/7 assistance?",
                            a: "Yes! Our support team is available 24 hours a day, all week.",
                        },
                        {
                            q: "Can I contact support via WhatsApp?",
                            a: "Absolutely. Our WhatsApp support number is +91 98765 43210.",
                        },
                    ].map((faq, i) => (
                        <motion.div
                            key={i}
                            whileHover={{ scale: 1.02 }}
                            className="bg-white rounded-2xl shadow-md p-6 border border-gray-100"
                        >
                            <h4 className="font-semibold text-gray-800 mb-2">{faq.q}</h4>
                            <p className="text-gray-600 text-sm">{faq.a}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

        </div>
    );
};

export default Support;
