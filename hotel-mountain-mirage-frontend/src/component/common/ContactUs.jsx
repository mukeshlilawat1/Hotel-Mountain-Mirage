import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import { MapPin, Phone, Mail, Clock, Send, Home, MessageCircle } from "lucide-react";

const ContactUs = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });
    const [sent, setSent] = useState(false);
    const [localTime, setLocalTime] = useState(new Date().toLocaleTimeString());
    const [typedText, setTypedText] = useState("");
    const fullText = "We’d love to hear from you 💌";

    // ✅ Typing animation for heading
    useEffect(() => {
        let i = 0;
        const interval = setInterval(() => {
            setTypedText(fullText.substring(0, i));
            i++;
            if (i > fullText.length) clearInterval(interval);
        }, 80);
        return () => clearInterval(interval);
    }, []);

    // 🕒 Live local time update
    useEffect(() => {
        const timer = setInterval(() => {
            setLocalTime(new Date().toLocaleTimeString());
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setSent(true);
        confetti({ particleCount: 120, spread: 70, origin: { y: 0.7 } });
        setTimeout(() => setSent(false), 4000);
        // ⚙️ Backend integration (Spring Boot) tu karega
    };

    return (
        <div className="relative bg-gradient-to-b from-gray-50 via-white to-emerald-50 text-gray-800 overflow-hidden">
            {/* 🟢 Floating Background Decoration */}
            <motion.div
                animate={{ y: [0, 25, 0] }}
                transition={{ repeat: Infinity, duration: 10 }}
                className="absolute top-20 -left-20 w-80 h-80 bg-emerald-200/20 blur-3xl rounded-full"
            />
            <motion.div
                animate={{ y: [0, -25, 0] }}
                transition={{ repeat: Infinity, duration: 12 }}
                className="absolute bottom-20 -right-20 w-96 h-96 bg-teal-200/20 blur-3xl rounded-full"
            />

            {/* ================= HERO SECTION ================= */}
            <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
                <motion.img
                    src="/assets/images/hotel.webp"
                    alt="Contact Mountain Mirage"
                    initial={{ scale: 1 }}
                    animate={{ scale: 1.1 }}
                    transition={{
                        duration: 18,
                        repeat: Infinity,
                        repeatType: "reverse",
                    }}
                    className="absolute inset-0 w-full h-full object-cover brightness-[60%]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent"></div>

                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    className="relative z-10 text-center text-white px-6"
                >
                    <h1 className="text-5xl md:text-6xl font-extrabold mb-3 drop-shadow-xl tracking-wide">
                        Contact <span className="text-teal-400">Us</span>
                    </h1>
                    <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto leading-relaxed h-8">
                        {typedText}
                        <span className="animate-pulse text-teal-300">|</span>
                    </p>
                </motion.div>
            </section>

            {/* ================= CONTACT INFO SECTION ================= */}
            <section className="max-w-6xl mx-auto py-24 px-6 grid md:grid-cols-3 gap-10 text-center md:text-left">
                {[
                    {
                        icon: <MapPin size={32} className="text-teal-500" />,
                        title: "Visit Us",
                        info: "456 Hillview Avenue, Mountain City, India",
                    },
                    {
                        icon: <Phone size={32} className="text-teal-500" />,
                        title: "Call Us",
                        info: "+91 98765 43210",
                    },
                    {
                        icon: <Mail size={32} className="text-teal-500" />,
                        title: "Email Us",
                        info: "info@mountainmirage.com",
                    },
                    {
                        icon: <Clock size={32} className="text-teal-500" />,
                        title: "Working Hours",
                        info: "Mon – Sun, 7:00 AM – 11:00 PM",
                    },
                    {
                        icon: <Home size={32} className="text-teal-500" />,
                        title: "Head Office",
                        info: "Mountain Mirage HQ, New Delhi",
                    },
                ].map((item, i) => (
                    <motion.div
                        key={i}
                        whileHover={{ scale: 1.06, y: -4 }}
                        className="bg-white/80 backdrop-blur-md rounded-2xl p-8 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col items-center md:items-start"
                    >
                        <div className="mb-3">{item.icon}</div>
                        <h3 className="text-lg font-semibold text-gray-800">{item.title}</h3>
                        <p className="text-gray-600 text-sm mt-1">{item.info}</p>
                    </motion.div>
                ))}
            </section>

            {/* ================= CONTACT FORM SECTION ================= */}
            <section className="max-w-5xl mx-auto py-20 px-6">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-900 mb-3">
                        Get in <span className="text-teal-500">Touch</span>
                    </h2>
                    <p className="text-gray-500 max-w-2xl mx-auto">
                        Have a question or request? Drop us a message and our team will respond shortly.
                    </p>
                </div>

                <motion.form
                    onSubmit={handleSubmit}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl p-8 md:p-10 space-y-6 border border-gray-100"
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
                                className="mt-1 w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-300 text-gray-700 placeholder-gray-400 focus:ring-2 focus:ring-teal-400 focus:border-teal-400 transition"
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
                                className="mt-1 w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-300 text-gray-700 placeholder-gray-400 focus:ring-2 focus:ring-teal-400 focus:border-teal-400 transition"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="text-sm font-medium text-gray-700">Message</label>
                        <textarea
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            placeholder="Write your message..."
                            rows="5"
                            className="mt-1 w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-300 text-gray-700 placeholder-gray-400 focus:ring-2 focus:ring-teal-400 focus:border-teal-400 transition resize-none"
                        ></textarea>
                    </div>

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        type="submit"
                        className="w-full flex justify-center items-center gap-2 py-3 bg-gradient-to-r from-emerald-400 to-teal-500 text-white font-semibold rounded-xl shadow-md hover:shadow-lg active:scale-[0.98] transition-all"
                    >
                        <Send size={18} /> Send Message
                    </motion.button>

                    {sent && (
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-green-600 text-center mt-3 font-medium tracking-wide animate-pulse"
                        >
                            ✅ Message sent successfully! Our team will reach out shortly.
                        </motion.p>
                    )}
                </motion.form>

                {/* 🕒 Live Local Time */}
                <div className="text-center text-gray-500 text-sm mt-6">
                    ⏰ Current Local Time: <span className="text-teal-600 font-semibold">{localTime}</span>
                </div>
            </section>

            {/* ================= GOOGLE MAP ================= */}
            <section className="w-full h-[450px] overflow-hidden relative rounded-t-3xl shadow-inner group">
                <motion.iframe
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.8 }}
                    title="Mountain Mirage Location"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3680.0970043872364!2d75.8577!3d22.7206!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3962fc73097a5a49%3A0xd6d2ff32c7f01717!2sMountain%20Resort!5e0!3m2!1sen!2sin!4v1697871123456"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="transition-transform duration-700 ease-out"
                ></motion.iframe>
            </section>

            {/* ================= FLOATING ACTION BUTTONS ================= */}
            <motion.a
                href="https://wa.me/919876543210"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                className="fixed bottom-8 right-8 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition z-50"
            >
                <MessageCircle size={26} />
            </motion.a>

            <motion.a
                href="tel:+919876543210"
                whileHover={{ scale: 1.1 }}
                className="fixed bottom-24 right-8 bg-teal-500 text-white p-4 rounded-full shadow-lg hover:bg-emerald-500 transition z-50"
            >
                <Phone size={26} />
            </motion.a>
        </div>
    );
};

export default ContactUs;
