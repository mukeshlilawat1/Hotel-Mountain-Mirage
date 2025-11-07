import React from "react";
import { motion } from "framer-motion";
import {
    Accessibility,
    Eye,
    Volume2,
    MousePointerClick,
    Smartphone,
    Headphones,
    HeartHandshake,
    ChevronRight,
} from "lucide-react";

const AccessibilityPage = () => {
    return (
        <div className="relative bg-gradient-to-b from-white via-gray-50 to-emerald-50 text-gray-800 overflow-hidden">
            {/* Floating soft gradients for depth */}
            <motion.div
                animate={{ y: [0, 20, 0] }}
                transition={{ repeat: Infinity, duration: 10 }}
                className="absolute top-20 -left-20 w-96 h-96 bg-teal-200/20 blur-3xl rounded-full"
            />
            <motion.div
                animate={{ y: [0, -20, 0] }}
                transition={{ repeat: Infinity, duration: 12 }}
                className="absolute bottom-10 -right-20 w-[28rem] h-[28rem] bg-emerald-200/20 blur-3xl rounded-full"
            />

            {/* ================= HERO SECTION ================= */}
            <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
                <motion.img
                    src="/assets/images/accessibility-hero.webp"
                    alt="Accessibility Commitment"
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
                        Accessibility <span className="text-teal-400">at Mountain Mirage</span>
                    </h1>
                    <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto">
                        Our promise: luxury, comfort, and accessibility — for everyone, everywhere.
                    </p>
                </motion.div>
            </section>

            {/* ================= COMMITMENT SECTION ================= */}
            <section className="max-w-6xl mx-auto py-20 px-6 text-center">
                <h2 className="text-3xl font-bold text-gray-900 mb-10">
                    Our <span className="text-teal-500">Accessibility Commitment</span>
                </h2>
                <p className="text-gray-600 leading-relaxed max-w-3xl mx-auto">
                    At <span className="text-teal-600 font-semibold">Mountain Mirage</span>, we believe
                    that true hospitality means inclusivity.
                    Our digital platforms and physical spaces are designed to be accessible
                    and enjoyable by people of all abilities.
                </p>
            </section>

            {/* ================= ACCESSIBILITY FEATURES ================= */}
            <section className="bg-gradient-to-r from-emerald-50 to-teal-50 py-20 px-6">
                <div className="max-w-6xl mx-auto text-center">
                    <h2 className="text-3xl font-bold text-gray-900 mb-12">
                        Digital <span className="text-teal-500">Accessibility Features</span>
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        {[
                            {
                                icon: <Eye size={40} className="text-emerald-500" />,
                                title: "Screen Reader Friendly",
                                desc: "Our website supports all major screen readers and semantic HTML for smooth narration.",
                            },
                            {
                                icon: <Volume2 size={40} className="text-teal-500" />,
                                title: "Audio Descriptions",
                                desc: "Important visuals and media come with detailed audio alternatives for blind users.",
                            },
                            {
                                icon: <MousePointerClick size={40} className="text-blue-500" />,
                                title: "Keyboard Navigation",
                                desc: "Easily navigate every page using keyboard-only shortcuts and focus indicators.",
                            },
                            {
                                icon: <Smartphone size={40} className="text-pink-500" />,
                                title: "Mobile Accessibility",
                                desc: "Optimized for all devices with high contrast, scalable fonts, and touch-friendly layouts.",
                            },
                            {
                                icon: <Headphones size={40} className="text-purple-500" />,
                                title: "Assistive Technology Support",
                                desc: "Fully compatible with voice recognition and magnification tools.",
                            },
                            {
                                icon: <HeartHandshake size={40} className="text-yellow-500" />,
                                title: "Inclusive Design Approach",
                                desc: "Built with empathy — ensuring every user feels welcomed and valued.",
                            },
                        ].map((feature, i) => (
                            <motion.div
                                key={i}
                                whileHover={{ scale: 1.05 }}
                                transition={{ duration: 0.3 }}
                                className="bg-white rounded-2xl shadow-md hover:shadow-xl border border-gray-100 p-8"
                            >
                                <div className="flex justify-center mb-4">{feature.icon}</div>
                                <h3 className="font-semibold text-lg text-gray-800 mb-2">
                                    {feature.title}
                                </h3>
                                <p className="text-gray-600 text-sm">{feature.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ================= PHYSICAL PROPERTY ACCESSIBILITY ================= */}
            <section className="max-w-6xl mx-auto py-20 px-6 text-center">
                <h2 className="text-3xl font-bold text-gray-900 mb-10">
                    Physical <span className="text-teal-500">Accessibility</span> Across Our Property
                </h2>
                <p className="text-gray-600 max-w-3xl mx-auto mb-12">
                    Our resort is designed to ensure a smooth and comfortable experience
                    for guests with mobility or sensory needs.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[
                        "Wheelchair-accessible entrances and elevators",
                        "Reserved accessible parking close to main entrances",
                        "Visual and tactile signage throughout the property",
                        "Accessible bathrooms with safety grab bars",
                        "Ground-floor luxury rooms designed for accessibility",
                        "24/7 staff assistance trained in inclusive hospitality",
                    ].map((item, i) => (
                        <motion.div
                            key={i}
                            whileHover={{ scale: 1.03 }}
                            className="bg-white p-6 rounded-2xl shadow-md border border-gray-100 hover:shadow-lg text-gray-700 text-sm"
                        >
                            <Accessibility className="text-teal-500 mb-2 mx-auto" size={32} />
                            <p>{item}</p>
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
                    Need Assistance or Accessibility Support?
                </motion.h2>
                <p className="text-gray-100 mb-8 max-w-xl mx-auto">
                    Our accessibility team is always here to help.
                    Reach out if you encounter any digital or physical access issues.
                </p>
                <motion.a
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    href="/contact"
                    className="bg-white text-teal-600 font-semibold px-8 py-3 rounded-full shadow-md hover:bg-teal-100 transition inline-flex items-center gap-2"
                >
                    Contact Accessibility Team <ChevronRight size={20} />
                </motion.a>
            </section>
        </div>
    );
};

export default AccessibilityPage;
