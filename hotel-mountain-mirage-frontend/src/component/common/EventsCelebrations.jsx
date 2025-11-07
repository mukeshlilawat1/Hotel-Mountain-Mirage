import React from "react";
import { motion } from "framer-motion";
import { CalendarHeart, GlassWater, PartyPopper, Briefcase, Music, Users, ChevronRight } from "lucide-react";

const EventsCelebrations = () => {
    return (
        <div className="bg-gradient-to-b from-white via-gray-50 to-emerald-50 text-gray-800 overflow-hidden relative">
            {/* Floating background orbs */}
            <motion.div
                animate={{ y: [0, 30, 0] }}
                transition={{ repeat: Infinity, duration: 10 }}
                className="absolute -top-10 -left-20 w-96 h-96 bg-emerald-200/20 blur-3xl rounded-full"
            />
            <motion.div
                animate={{ y: [0, -30, 0] }}
                transition={{ repeat: Infinity, duration: 12 }}
                className="absolute bottom-0 -right-20 w-[28rem] h-[28rem] bg-teal-200/20 blur-3xl rounded-full"
            />

            {/* ================= HERO SECTION ================= */}
            <section className="relative h-[75vh] flex items-center justify-center overflow-hidden">
                <motion.img
                    src="/assets/images/event-hero.webp"
                    alt="Luxury Events at Mountain Mirage"
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
                    <h1 className="text-5xl md:text-6xl font-extrabold mb-3 drop-shadow-xl tracking-wide">
                        Events & <span className="text-teal-400">Celebrations</span>
                    </h1>
                    <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto leading-relaxed">
                        Where luxury meets joy — host unforgettable moments with elegance & grace.
                    </p>
                </motion.div>
            </section>

            {/* ================= EVENT CATEGORIES ================= */}
            <section className="max-w-6xl mx-auto py-20 px-6">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">
                        Celebrate with <span className="text-teal-500">Perfection</span>
                    </h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        From grand weddings to intimate gatherings — Mountain Mirage transforms every event
                        into a magical experience filled with luxury, warmth, and natural beauty.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    {[
                        {
                            icon: <CalendarHeart size={36} className="text-pink-500" />,
                            title: "Weddings",
                            desc: "Exchange vows under the mountains — elegant decor, fine dining, and an unforgettable setting.",
                            img: "/assets/events/wedding.jpg",
                        },
                        {
                            icon: <Briefcase size={36} className="text-blue-500" />,
                            title: "Corporate Retreats",
                            desc: "Perfect venues for business conferences, team-building retreats, and executive meetings.",
                            img: "/assets/events/corporate.jpg",
                        },
                        {
                            icon: <PartyPopper size={36} className="text-yellow-500" />,
                            title: "Private Celebrations",
                            desc: "Host birthdays, anniversaries, or family reunions — where every detail is crafted with care.",
                            img: "/assets/events/private.jpg",
                        },
                    ].map((item, i) => (
                        <motion.div
                            key={i}
                            whileHover={{ scale: 1.03 }}
                            className="rounded-3xl overflow-hidden shadow-lg bg-white hover:shadow-2xl transition-all duration-500"
                        >
                            <div className="relative">
                                <img
                                    src={item.img}
                                    alt={item.title}
                                    className="w-full h-64 object-cover transform hover:scale-110 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                                    <h3 className="text-white text-2xl font-semibold">{item.title}</h3>
                                </div>
                            </div>
                            <div className="p-6">
                                <div className="flex items-center gap-3 mb-3">{item.icon}</div>
                                <p className="text-gray-600 text-sm">{item.desc}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* ================= EVENT HIGHLIGHTS ================= */}
            <section className="bg-gradient-to-r from-emerald-50 to-teal-50 py-20 px-6">
                <div className="max-w-6xl mx-auto text-center">
                    <h2 className="text-3xl font-bold mb-12">
                        Why Choose <span className="text-teal-500">Mountain Mirage</span>?
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        {[
                            {
                                icon: <GlassWater size={36} className="text-teal-500" />,
                                title: "Signature Hospitality",
                                desc: "Experience unmatched service and attention to detail — every guest feels special.",
                            },
                            {
                                icon: <Music size={36} className="text-pink-500" />,
                                title: "Custom Decor & Entertainment",
                                desc: "We bring your dream theme to life — music, decor, lighting, all perfectly curated.",
                            },
                            {
                                icon: <Users size={36} className="text-yellow-500" />,
                                title: "Expert Event Planners",
                                desc: "Our dedicated team ensures your celebration runs smoothly, from start to finish.",
                            },
                        ].map((highlight, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: i * 0.1 }}
                                whileHover={{ scale: 1.05 }}
                                className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300"
                            >
                                <div className="flex justify-center mb-4">{highlight.icon}</div>
                                <h3 className="text-lg font-semibold mb-2">{highlight.title}</h3>
                                <p className="text-gray-600 text-sm">{highlight.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ================= GALLERY STRIP ================= */}
            <section className="py-20 px-6 relative overflow-hidden">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
                        A Glimpse of Our <span className="text-teal-500">Celebrations</span>
                    </h2>
                    <motion.div
                        initial={{ x: "-10%" }}
                        animate={{ x: "10%" }}
                        transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
                        className="flex gap-6 overflow-hidden"
                    >
                        {[
                            "/assets/events/slide1.jpg",
                            "/assets/events/slide2.jpg",
                            "/assets/events/slide3.jpg",
                            "/assets/events/slide4.jpg",
                            "/assets/events/slide5.jpg",
                        ].map((src, i) => (
                            <motion.img
                                key={i}
                                src={src}
                                alt={`Event ${i}`}
                                whileHover={{ scale: 1.05 }}
                                className="rounded-2xl shadow-md w-[350px] h-[220px] object-cover hover:shadow-xl"
                            />
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* ================= CTA SECTION ================= */}
            <section className="py-20 bg-gradient-to-r from-teal-600 to-emerald-500 text-white text-center relative overflow-hidden">
                <motion.div
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ repeat: Infinity, duration: 8 }}
                    className="absolute inset-0 bg-white/10 blur-2xl"
                ></motion.div>

                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-3xl font-bold mb-4 relative z-10"
                >
                    Let’s Plan Your Next Celebration ✨
                </motion.h2>
                <p className="text-gray-100 mb-8 max-w-xl mx-auto relative z-10">
                    Whether it’s an intimate wedding or a grand corporate affair, our experts will make it
                    truly unforgettable.
                </p>
                <motion.a
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    href="/contact"
                    className="bg-white text-teal-600 font-semibold px-8 py-3 rounded-full shadow-md hover:bg-teal-100 transition relative z-10 inline-flex items-center gap-2"
                >
                    Plan Your Event <ChevronRight size={20} />
                </motion.a>
            </section>
        </div>
    );
};

export default EventsCelebrations;
