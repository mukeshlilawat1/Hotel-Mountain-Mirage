import React from "react";
import { motion } from "framer-motion";
import {
    FileText,
    CreditCard,
    Clock,
    ShieldCheck,
    Mail,
    ArrowLeftRight,
    Info,
    ChevronRight,
} from "lucide-react";

const RefundPolicy = () => {
    return (
        <div className="relative bg-gradient-to-b from-white via-gray-50 to-emerald-50 text-gray-800 overflow-hidden">
            {/* Floating background gradients */}
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
                    src="/assets/images/refund-hero.webp"
                    alt="Refund Policy - Mountain Mirage"
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
                        Refund <span className="text-teal-400">Policy</span>
                    </h1>
                    <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto leading-relaxed">
                        Transparency. Fairness. Commitment — that’s our promise for every booking.
                    </p>
                </motion.div>
            </section>

            {/* ================= POLICY INTRO ================= */}
            <section className="max-w-5xl mx-auto py-20 px-6 text-center">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    Our <span className="text-teal-500">Refund & Cancellation Policy</span>
                </h2>
                <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed">
                    At <span className="text-teal-600 font-semibold">Mountain Mirage</span>, our priority is
                    to offer you flexibility and confidence when booking your stay.
                    This policy outlines our transparent process for cancellations, refunds, and changes.
                </p>
            </section>

            {/* ================= REFUND DETAILS ================= */}
            <section className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10 py-20 px-6 text-center">
                {[
                    {
                        icon: <Clock size={38} className="text-emerald-500" />,
                        title: "Flexible Cancellation Window",
                        desc: "Full refunds are available for cancellations made 48 hours before check-in.",
                    },
                    {
                        icon: <CreditCard size={38} className="text-teal-500" />,
                        title: "Easy Refund Processing",
                        desc: "Refunds are processed to the original payment method within 5–7 business days.",
                    },
                    {
                        icon: <ShieldCheck size={38} className="text-yellow-500" />,
                        title: "Secure Transactions",
                        desc: "All refund transactions are encrypted and handled through verified payment gateways.",
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
            </section>

            {/* ================= POLICY SECTIONS ================= */}
            <section className="max-w-5xl mx-auto py-20 px-6 space-y-10">
                {[
                    {
                        title: "1️⃣ Cancellation Eligibility",
                        content:
                            "Guests can cancel their reservation up to 48 hours prior to check-in without any cancellation fee. Cancellations within 48 hours of arrival may incur a charge of one night’s stay.",
                    },
                    {
                        title: "2️⃣ Refund Timeline",
                        content:
                            "Approved refunds are processed to the same payment method used during booking. It may take 5–7 working days for the amount to reflect in your account, depending on your bank or card issuer.",
                    },
                    {
                        title: "3️⃣ Non-Refundable Bookings",
                        content:
                            "Special discounted offers, flash sales, and last-minute deals are non-refundable. However, date modifications may be possible, subject to availability.",
                    },
                    {
                        title: "4️⃣ Force Majeure Conditions",
                        content:
                            "In case of unavoidable circumstances such as natural disasters, government restrictions, or pandemics, refunds or date rescheduling will be handled with maximum flexibility.",
                    },
                    {
                        title: "5️⃣ Payment Gateway & Processing Fees",
                        content:
                            "A minimal transaction charge (if any) may be deducted to cover payment gateway fees or international conversion charges.",
                    },
                    {
                        title: "6️⃣ How to Request a Refund",
                        content:
                            "You can raise a refund request by emailing us at refund@mountainmirage.com or by calling our helpline. Please include your booking ID and payment receipt for quick processing.",
                    },
                ].map((section, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: i * 0.1 }}
                        className="bg-white/90 backdrop-blur-md rounded-2xl shadow-md border border-gray-100 p-8"
                    >
                        <h3 className="text-xl font-semibold text-teal-600 mb-2">
                            {section.title}
                        </h3>
                        <p className="text-gray-600 leading-relaxed text-sm">{section.content}</p>
                    </motion.div>
                ))}
            </section>

            {/* ================= CONTACT SECTION ================= */}
            <section className="py-20 bg-gradient-to-r from-emerald-50 to-teal-50 text-center">
                <FileText size={40} className="text-teal-500 mx-auto mb-3" />
                <h2 className="text-3xl font-bold text-gray-900 mb-3">
                    Need Help With a <span className="text-teal-500">Refund?</span>
                </h2>
                <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
                    Our support team is available 24/7 to assist with refund or cancellation-related queries.
                </p>
                <motion.a
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    href="/contact"
                    className="bg-gradient-to-r from-emerald-400 to-teal-500 text-white px-8 py-3 rounded-full font-semibold shadow-md hover:shadow-lg transition inline-flex items-center gap-2"
                >
                    Contact Refund Team <ChevronRight size={20} />
                </motion.a>
            </section>

        </div>
    );
};

export default RefundPolicy;
