import React from "react";
import { motion } from "framer-motion";
import { Briefcase, Users, Coffee, HeartHandshake, Trophy, MapPin, ChevronRight } from "lucide-react";

const Careers = () => {
    const jobs = [
        {
            title: "Front Desk Executive",
            type: "Full-Time",
            location: "Mountain City, India",
            desc: "Deliver exceptional hospitality experiences with a welcoming smile and professional service.",
        },
        {
            title: "Sous Chef - Continental Cuisine",
            type: "Full-Time",
            location: "Mountain Mirage Resort Kitchen",
            desc: "Assist our Head Chef in crafting fine dining dishes that reflect the soul of the mountains.",
        },
        {
            title: "Event Coordinator",
            type: "Full-Time",
            location: "Mountain Mirage Event Hall",
            desc: "Plan, organize, and execute grand weddings and private events with creativity and precision.",
        },
        {
            title: "Spa Therapist",
            type: "Part-Time",
            location: "Mountain Mirage Wellness Wing",
            desc: "Provide rejuvenating therapies and promote relaxation through holistic treatments.",
        },
    ];

    const perks = [
        {
            icon: <Users size={36} className="text-emerald-500" />,
            title: "Friendly Work Culture",
            desc: "We believe in teamwork, respect, and mutual growth.",
        },
        {
            icon: <Coffee size={36} className="text-pink-500" />,
            title: "Luxury Environment",
            desc: "Work in a peaceful, world-class resort surrounded by mountains and nature.",
        },
        {
            icon: <Trophy size={36} className="text-yellow-500" />,
            title: "Performance Rewards",
            desc: "Your talent and effort are celebrated with recognition and bonuses.",
        },
        {
            icon: <HeartHandshake size={36} className="text-teal-500" />,
            title: "Employee Benefits",
            desc: "Enjoy free meals, accommodation, and family discounts on resort stays.",
        },
    ];

    return (
        <div className="relative bg-gradient-to-b from-white via-gray-50 to-emerald-50 text-gray-800 overflow-hidden">
            {/* Floating Lights */}
            <motion.div
                animate={{ y: [0, 30, 0] }}
                transition={{ repeat: Infinity, duration: 10 }}
                className="absolute top-20 -left-20 w-96 h-96 bg-emerald-200/20 blur-3xl rounded-full"
            />
            <motion.div
                animate={{ y: [0, -30, 0] }}
                transition={{ repeat: Infinity, duration: 12 }}
                className="absolute bottom-20 -right-20 w-[28rem] h-[28rem] bg-teal-200/20 blur-3xl rounded-full"
            />

            {/* ================= HERO SECTION ================= */}
            <section className="relative h-[75vh] flex items-center justify-center overflow-hidden">
                <motion.img
                    src="/assets/images/career-hero.webp"
                    alt="Careers at Mountain Mirage"
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
                    <h1 className="text-5xl md:text-6xl font-extrabold mb-3 drop-shadow-xl tracking-wide">
                        Join the <span className="text-teal-400">Mountain Mirage</span> Family
                    </h1>
                    <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto leading-relaxed">
                        Be part of a team that creates moments of joy, luxury, and unforgettable hospitality.
                    </p>
                </motion.div>
            </section>

            {/* ================= WHY WORK WITH US ================= */}
            <section className="max-w-6xl mx-auto py-20 px-6 text-center">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-3xl font-bold mb-8 text-gray-900"
                >
                    Why Work <span className="text-teal-500">With Us?</span>
                </motion.h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {perks.map((perk, i) => (
                        <motion.div
                            key={i}
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.3 }}
                            className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-all"
                        >
                            <div className="flex justify-center mb-3">{perk.icon}</div>
                            <h3 className="font-semibold text-gray-800 mb-2">{perk.title}</h3>
                            <p className="text-gray-600 text-sm">{perk.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* ================= CURRENT OPENINGS ================= */}
            <section className="bg-gradient-to-r from-emerald-50 to-teal-50 py-20 px-6">
                <div className="max-w-6xl mx-auto text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-900 mb-3">
                        Current <span className="text-teal-500">Openings</span>
                    </h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Explore our available roles and find where your passion meets purpose.
                    </p>
                </div>

                <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
                    {jobs.map((job, i) => (
                        <motion.div
                            key={i}
                            whileHover={{ scale: 1.03 }}
                            className="bg-white rounded-3xl shadow-md hover:shadow-xl p-8 text-left border border-gray-100 transition-all duration-300"
                        >
                            <h3 className="text-xl font-bold text-gray-900 mb-2">{job.title}</h3>
                            <p className="text-gray-600 text-sm mb-4">{job.desc}</p>
                            <div className="flex items-center justify-between text-sm text-gray-500 mb-5">
                                <span className="flex items-center gap-1">
                                    <Briefcase size={15} /> {job.type}
                                </span>
                                <span className="flex items-center gap-1">
                                    <MapPin size={15} /> {job.location}
                                </span>
                            </div>
                            <motion.a
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                href="/contact"
                                className="bg-gradient-to-r from-emerald-400 to-teal-500 text-white font-semibold px-5 py-2 rounded-full shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                            >
                                Apply Now <ChevronRight size={18} />
                            </motion.a>
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
                    Grow with Passion. Work with Purpose. 🌿
                </motion.h2>
                <p className="text-gray-100 mb-8 max-w-xl mx-auto">
                    Whether you’re an artist, chef, or hospitality expert — there’s a place for you at Mountain Mirage.
                </p>
                <motion.a
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    href="/contact"
                    className="bg-white text-teal-600 font-semibold px-8 py-3 rounded-full shadow-md hover:bg-teal-100 transition inline-flex items-center gap-2"
                >
                    Contact HR Team <ChevronRight size={20} />
                </motion.a>
            </section>
        </div>
    );
};

export default Careers;
