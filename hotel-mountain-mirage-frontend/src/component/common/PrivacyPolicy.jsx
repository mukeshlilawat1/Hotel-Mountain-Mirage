import React from "react";
import { motion } from "framer-motion";
import {
    Shield,
    Lock,
    Globe,
    FileText,
    Eye,
    UserCheck,
    Mail,
    Bell,
    ChevronRight,
} from "lucide-react";

const PrivacyPolicy = () => {
    return (
        <div className="relative bg-gradient-to-b from-white via-gray-50 to-emerald-50 text-gray-800 overflow-hidden">
            {/* Floating gradients for depth */}
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
            <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
                <motion.img
                    src="/assets/images/privacy-hero.webp"
                    alt="Privacy Policy - Mountain Mirage"
                    initial={{ scale: 1 }}
                    animate={{ scale: 1.1 }}
                    transition={{ duration: 18, repeat: Infinity, repeatType: "reverse" }}
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
                        Privacy <span className="text-teal-400">Policy</span>
                    </h1>
                    <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto leading-relaxed">
                        Your trust, our responsibility — safeguarding your privacy is our top priority.
                    </p>
                </motion.div>
            </section>

            {/* ================= INTRO ================= */}
            <section className="max-w-5xl mx-auto py-20 px-6 text-center">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    Our <span className="text-teal-500">Privacy Commitment</span>
                </h2>
                <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed">
                    At <span className="text-teal-600 font-semibold">Mountain Mirage</span>, we value your
                    privacy as much as your comfort.
                    This policy explains how we collect, use, and protect your personal information in line with
                    the <strong>Information Technology Act (India)</strong> and <strong>GDPR</strong> standards.
                </p>
            </section>

            {/* ================= DATA COLLECTION SECTION ================= */}
            <section className="bg-gradient-to-r from-emerald-50 to-teal-50 py-20 px-6">
                <div className="max-w-6xl mx-auto text-center">
                    <h2 className="text-3xl font-bold text-gray-900 mb-12">
                        How We <span className="text-teal-500">Collect & Use</span> Information
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        {[
                            {
                                icon: <UserCheck size={38} className="text-emerald-500" />,
                                title: "Personal Data",
                                desc: "Your name, contact, and booking details help us ensure personalized hospitality.",
                            },
                            {
                                icon: <Globe size={38} className="text-teal-500" />,
                                title: "Usage Data",
                                desc: "We collect non-personal information such as browser type, device, and session duration for site optimization.",
                            },
                            {
                                icon: <Mail size={38} className="text-blue-500" />,
                                title: "Communication",
                                desc: "Emails or messages may be used for confirmations, offers, and customer support responses.",
                            },
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                whileHover={{ scale: 1.05 }}
                                className="bg-white rounded-2xl shadow-md p-8 border border-gray-100 hover:shadow-xl transition-all"
                            >
                                <div className="flex justify-center mb-3">{item.icon}</div>
                                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                                    {item.title}
                                </h3>
                                <p className="text-gray-600 text-sm">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ================= POLICY DETAILS ================= */}
            <section className="max-w-5xl mx-auto py-20 px-6 space-y-10">
                {[
                    {
                        icon: <Lock className="text-teal-500" size={26} />,
                        title: "1️⃣ Data Protection & Security",
                        desc: "We use SSL encryption, secure servers, and access control mechanisms to protect your personal data from unauthorized access or misuse.",
                    },
                    {
                        icon: <Shield className="text-emerald-500" size={26} />,
                        title: "2️⃣ Third-Party Sharing",
                        desc: "We never sell or rent your personal information. It may only be shared with trusted partners (like payment processors) to complete bookings or transactions.",
                    },
                    {
                        icon: <Eye className="text-yellow-500" size={26} />,
                        title: "3️⃣ Cookies & Tracking",
                        desc: "Cookies are used to enhance user experience and provide personalized recommendations. You can modify cookie settings anytime in your browser.",
                    },
                    {
                        icon: <Bell className="text-pink-500" size={26} />,
                        title: "4️⃣ Marketing Communications",
                        desc: "You may receive updates or offers occasionally, but you can easily unsubscribe anytime via the link in our emails.",
                    },
                    {
                        icon: <FileText className="text-gray-600" size={26} />,
                        title: "5️⃣ Data Retention",
                        desc: "Your data is retained only as long as necessary for business, legal, or accounting purposes, and deleted safely afterward.",
                    },
                    {
                        icon: <Globe className="text-blue-500" size={26} />,
                        title: "6️⃣ International Users",
                        desc: "Users from other countries agree that their data may be processed under Indian law and Mountain Mirage policies.",
                    },
                ].map((item, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: i * 0.1 }}
                        className="bg-white/90 backdrop-blur-md rounded-2xl shadow-md border border-gray-100 p-8"
                    >
                        <div className="flex items-center gap-3 mb-3">
                            {item.icon}
                            <h3 className="text-lg font-semibold text-teal-600">{item.title}</h3>
                        </div>
                        <p className="text-gray-600 leading-relaxed text-sm">{item.desc}</p>
                    </motion.div>
                ))}
            </section>

            {/* ================= CONTACT SECTION ================= */}
            <section className="py-20 bg-gradient-to-r from-emerald-50 to-teal-50 text-center">
                <Shield size={40} className="text-teal-500 mx-auto mb-3" />
                <h2 className="text-3xl font-bold text-gray-900 mb-3">
                    Questions About Our <span className="text-teal-500">Privacy Policy?</span>
                </h2>
                <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
                    For any privacy-related queries or data removal requests, reach out to our Data Protection Team anytime.
                </p>
                <motion.a
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    href="/contact"
                    className="bg-gradient-to-r from-emerald-400 to-teal-500 text-white px-8 py-3 rounded-full font-semibold shadow-md hover:shadow-lg transition inline-flex items-center gap-2"
                >
                    Contact Privacy Team <ChevronRight size={20} />
                </motion.a>
            </section>
        </div>
    );
};

export default PrivacyPolicy;
