import React from "react";
import { motion } from "framer-motion";
import {
    FileText,
    ShieldCheck,
    Scale,
    UserCheck,
    CreditCard,
    Globe,
    Info,
    AlertTriangle,
    ChevronRight,
} from "lucide-react";

const TermsAndConditions = () => {
    return (
        <div className="relative bg-gradient-to-b from-white via-gray-50 to-emerald-50 text-gray-800 overflow-hidden">
            {/* Floating backgrounds for style */}
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
                    src="/assets/images/terms-hero.webp"
                    alt="Terms and Conditions - Mountain Mirage"
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
                        Terms <span className="text-teal-400">&</span> Conditions
                    </h1>
                    <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto leading-relaxed">
                        The agreement between comfort and compliance — setting clear expectations for your stay.
                    </p>
                </motion.div>
            </section>

            {/* ================= INTRO ================= */}
            <section className="max-w-5xl mx-auto py-20 px-6 text-center">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    Our <span className="text-teal-500">Service Terms</span>
                </h2>
                <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed">
                    These Terms & Conditions govern your use of the{" "}
                    <span className="text-teal-600 font-semibold">Mountain Mirage</span> website, booking system,
                    and on-premise services. By making a booking or visiting our site, you agree to these terms.
                </p>
            </section>

            {/* ================= CORE PRINCIPLES ================= */}
            <section className="bg-gradient-to-r from-emerald-50 to-teal-50 py-20 px-6">
                <div className="max-w-6xl mx-auto text-center">
                    <h2 className="text-3xl font-bold text-gray-900 mb-12">
                        Key <span className="text-teal-500">Principles</span>
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        {[
                            {
                                icon: <ShieldCheck size={38} className="text-emerald-500" />,
                                title: "Trust & Transparency",
                                desc: "We maintain full transparency in pricing, policies, and all interactions with our guests.",
                            },
                            {
                                icon: <UserCheck size={38} className="text-teal-500" />,
                                title: "Guest Rights",
                                desc: "Every guest deserves respect, comfort, and fair service throughout their stay.",
                            },
                            {
                                icon: <Scale size={38} className="text-yellow-500" />,
                                title: "Legal Compliance",
                                desc: "Our services comply with hospitality, data protection, and consumer laws under Indian jurisdiction.",
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

            {/* ================= TERMS DETAILS ================= */}
            <section className="max-w-5xl mx-auto py-20 px-6 space-y-10">
                {[
                    {
                        icon: <FileText className="text-teal-500" size={24} />,
                        title: "1️⃣ Booking & Payments",
                        desc: "All bookings are subject to availability. A confirmed booking requires a valid payment through approved methods only. Prices include applicable taxes unless specified otherwise.",
                    },
                    {
                        icon: <CreditCard className="text-emerald-500" size={24} />,
                        title: "2️⃣ Cancellations & Refunds",
                        desc: "Cancellations must comply with our Refund Policy. Refunds will only be processed to the original payment method.",
                    },
                    {
                        icon: <Globe className="text-blue-500" size={24} />,
                        title: "3️⃣ Website Usage",
                        desc: "By accessing our website, you agree not to misuse our services, copy content, or engage in fraudulent activities.",
                    },
                    {
                        icon: <Info className="text-yellow-500" size={24} />,
                        title: "4️⃣ Liability Disclaimer",
                        desc: "While we ensure premium service, Mountain Mirage is not liable for events beyond our control, including natural calamities, technical errors, or third-party service disruptions.",
                    },
                    {
                        icon: <AlertTriangle className="text-red-500" size={24} />,
                        title: "5️⃣ Conduct & Behavior",
                        desc: "Guests must maintain decorum within the property. Any unlawful, abusive, or disruptive behavior may lead to immediate cancellation of booking without refund.",
                    },
                    {
                        icon: <Scale className="text-gray-600" size={24} />,
                        title: "6️⃣ Governing Law",
                        desc: "These terms are governed by the laws of India. Any disputes shall be subject to the exclusive jurisdiction of the courts in New Delhi.",
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
                <Scale size={40} className="text-teal-500 mx-auto mb-3" />
                <h2 className="text-3xl font-bold text-gray-900 mb-3">
                    Have Questions About Our <span className="text-teal-500">Terms?</span>
                </h2>
                <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
                    Our legal and customer support team is available to clarify any concerns about these terms.
                </p>
                <motion.a
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    href="/contact"
                    className="bg-gradient-to-r from-emerald-400 to-teal-500 text-white px-8 py-3 rounded-full font-semibold shadow-md hover:shadow-lg transition inline-flex items-center gap-2"
                >
                    Contact Legal Team <ChevronRight size={20} />
                </motion.a>
            </section>
        </div>
    );
};

export default TermsAndConditions;
