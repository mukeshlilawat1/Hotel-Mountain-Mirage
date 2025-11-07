import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HelpCircle, ChevronDown, ChevronUp, MessageCircle, BookOpen } from "lucide-react";

const FAQs = () => {
    const [activeIndex, setActiveIndex] = useState(null);

    const faqs = [
        {
            q: "How can I book a room at Mountain Mirage?",
            a: "You can easily book a room through our website’s 'Rooms' section. Choose your room type, check availability, and proceed with secure online payment.",
        },
        {
            q: "Can I cancel or modify my booking?",
            a: "Yes, you can modify or cancel your booking from the 'Find Booking' page or by contacting our customer support within the refund policy window.",
        },
        {
            q: "What payment methods do you accept?",
            a: "We accept all major credit/debit cards, UPI, and secure payment gateways like Razorpay and PayPal.",
        },
        {
            q: "Is breakfast included in all room packages?",
            a: "Yes, complimentary breakfast is included in all premium and luxury packages unless stated otherwise during booking.",
        },
        {
            q: "Do you provide airport pickup and drop services?",
            a: "Absolutely! We offer pickup and drop facilities from nearby airports at an additional nominal charge. You can request this during booking.",
        },
        {
            q: "Are pets allowed inside the resort?",
            a: "We currently do not allow pets to ensure the comfort and safety of all guests, but we do offer pet-care tie-ups nearby.",
        },
        {
            q: "Is Mountain Mirage safe for solo travelers?",
            a: "100%! We prioritize security — our premises are under 24/7 surveillance with professional staff always available for assistance.",
        },
        {
            q: "Do you have Wi-Fi and workspace facilities?",
            a: "Yes, we provide free high-speed Wi-Fi and co-working spaces ideal for remote workers and digital nomads.",
        },
    ];

    const toggleFAQ = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <div className="relative bg-gradient-to-b from-white via-gray-50 to-emerald-50 text-gray-800 overflow-hidden">
            {/* Floating Background Gradients */}
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
                    src="/assets/images/faq-hero.webp"
                    alt="FAQs - Mountain Mirage"
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
                        Frequently Asked <span className="text-teal-400">Questions</span>
                    </h1>
                    <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto leading-relaxed">
                        Everything you need to know before your stay at Mountain Mirage.
                    </p>
                </motion.div>
            </section>

            {/* ================= FAQ SECTION ================= */}
            <section className="max-w-5xl mx-auto py-20 px-6">
                <div className="text-center mb-12">
                    <HelpCircle size={50} className="text-teal-500 mx-auto mb-4" />
                    <h2 className="text-3xl font-bold text-gray-900 mb-3">
                        Your Questions, <span className="text-teal-500">Answered</span>
                    </h2>
                    <p className="text-gray-500 max-w-2xl mx-auto">
                        Have queries about bookings, payments, or your stay? Explore below — we’ve covered it all.
                    </p>
                </div>

                <div className="space-y-6">
                    {faqs.map((faq, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: i * 0.05 }}
                            className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden"
                        >
                            <button
                                onClick={() => toggleFAQ(i)}
                                className="w-full flex justify-between items-center p-6 text-left"
                            >
                                <span className="font-semibold text-gray-800 text-lg">{faq.q}</span>
                                {activeIndex === i ? (
                                    <ChevronUp size={22} className="text-teal-500" />
                                ) : (
                                    <ChevronDown size={22} className="text-gray-400" />
                                )}
                            </button>

                            <AnimatePresence>
                                {activeIndex === i && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="px-6 pb-5 text-gray-600 text-sm leading-relaxed bg-gray-50"
                                    >
                                        {faq.a}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* ================= CTA SECTION ================= */}
            <section className="py-20 bg-gradient-to-r from-emerald-50 to-teal-50 text-center px-6">
                <BookOpen size={50} className="text-teal-500 mx-auto mb-4" />
                <h2 className="text-3xl font-bold text-gray-900 mb-3">
                    Didn’t Find Your <span className="text-teal-500">Answer?</span>
                </h2>
                <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
                    No worries — our support team is available 24/7 to help you with anything you need.
                </p>
                <motion.a
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    href="/support"
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-400 to-teal-500 text-white px-8 py-3 rounded-full font-semibold shadow-md hover:shadow-lg transition"
                >
                    Contact Support <MessageCircle size={20} />
                </motion.a>
            </section>
        </div>
    );
};

export default FAQs;
