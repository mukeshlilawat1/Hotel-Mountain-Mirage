import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Gift, Clock, Star, CalendarHeart, Plane, Sparkles, ChevronRight } from "lucide-react";

const SpecialOffers = () => {
    const [timeLeft, setTimeLeft] = useState({ days: 2, hours: 12, minutes: 45, seconds: 0 });

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                let { days, hours, minutes, seconds } = prev;
                if (seconds > 0) seconds--;
                else if (minutes > 0) {
                    minutes--;
                    seconds = 59;
                } else if (hours > 0) {
                    hours--;
                    minutes = 59;
                    seconds = 59;
                } else if (days > 0) {
                    days--;
                    hours = 23;
                    minutes = 59;
                    seconds = 59;
                }
                return { days, hours, minutes, seconds };
            });
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const offers = [
        {
            title: "Romantic Getaway Package 💞",
            desc: "Celebrate love with a candlelight dinner, mountain-view suite, and spa therapy for two.",
            img: "/assets/offers/romantic.jpg",
            price: "₹14,999 / night",
            tag: "Valentine Special",
        },
        {
            title: "Family Escape Offer 👨‍👩‍👧‍👦",
            desc: "2-night stay in a family suite with kids’ activities, bonfire evenings, and complimentary breakfast.",
            img: "/assets/offers/family.jpg",
            price: "₹9,499 / night",
            tag: "Limited Time",
        },
        {
            title: "Weekend Serenity Retreat 🌿",
            desc: "Rejuvenate your mind with yoga, meditation, and a 3-course organic dinner under the stars.",
            img: "/assets/offers/spa.jpg",
            price: "₹11,999 / night",
            tag: "Relaxation Offer",
        },
    ];

    return (
        <div className="relative bg-gradient-to-b from-white via-gray-50 to-emerald-50 text-gray-800 overflow-hidden">
            {/* Floating light effects */}
            <motion.div
                animate={{ y: [0, 40, 0], opacity: [0.8, 1, 0.8] }}
                transition={{ repeat: Infinity, duration: 10 }}
                className="absolute top-20 -left-20 w-96 h-96 bg-emerald-200/20 blur-3xl rounded-full"
            />
            <motion.div
                animate={{ y: [0, -40, 0], opacity: [0.8, 1, 0.8] }}
                transition={{ repeat: Infinity, duration: 12 }}
                className="absolute bottom-0 -right-20 w-[30rem] h-[30rem] bg-teal-200/20 blur-3xl rounded-full"
            />

            {/* ================= HERO SECTION ================= */}
            <section className="relative h-[75vh] flex items-center justify-center overflow-hidden">
                <motion.img
                    src="/assets/images/offer-hero.webp"
                    alt="Special Offers"
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
                        Special <span className="text-teal-400">Offers</span> & Packages
                    </h1>
                    <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto leading-relaxed">
                        Experience luxury for less — indulge in exclusive stays and limited-time getaways.
                    </p>
                </motion.div>
            </section>

            {/* ================= LIMITED TIME COUNTDOWN ================= */}
            <section className="text-center py-10 bg-gradient-to-r from-teal-600 to-emerald-500 text-white shadow-inner">
                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-2xl md:text-3xl font-semibold mb-4"
                >
                    ⏳ Hurry! Offer ends in:
                </motion.h2>
                <div className="flex justify-center gap-6 text-lg font-bold tracking-wider">
                    <div className="bg-white/20 px-4 py-2 rounded-lg">
                        {timeLeft.days}d
                    </div>
                    <div className="bg-white/20 px-4 py-2 rounded-lg">
                        {timeLeft.hours}h
                    </div>
                    <div className="bg-white/20 px-4 py-2 rounded-lg">
                        {timeLeft.minutes}m
                    </div>
                    <div className="bg-white/20 px-4 py-2 rounded-lg">
                        {timeLeft.seconds}s
                    </div>
                </div>
            </section>

            {/* ================= OFFER CARDS ================= */}
            <section className="max-w-6xl mx-auto py-20 px-6">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">
                        Handpicked <span className="text-teal-500">Luxury Offers</span>
                    </h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Unlock unforgettable stays crafted with elegance — for every traveler’s dream.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    {offers.map((offer, i) => (
                        <motion.div
                            key={i}
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.4 }}
                            className="bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 border border-gray-100 relative"
                        >
                            {/* Tag Ribbon */}
                            <div className="absolute top-4 left-0 bg-gradient-to-r from-teal-400 to-emerald-500 text-white px-3 py-1 text-xs font-semibold rounded-r-lg shadow-md">
                                {offer.tag}
                            </div>

                            <img
                                src={offer.img}
                                alt={offer.title}
                                className="w-full h-64 object-cover hover:scale-105 transition-transform duration-700"
                            />

                            <div className="p-6 space-y-3 text-left">
                                <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                                    <Gift className="text-teal-500" /> {offer.title}
                                </h3>
                                <p className="text-gray-600 text-sm">{offer.desc}</p>
                                <p className="text-emerald-600 font-semibold text-lg">{offer.price}</p>
                                <motion.a
                                    whileHover={{ scale: 1.05 }}
                                    href="/rooms"
                                    className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-400 to-teal-500 text-white px-5 py-2 rounded-full shadow-md hover:shadow-lg mt-3"
                                >
                                    Book Now <ChevronRight size={18} />
                                </motion.a>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* ================= BONUS PACKAGE ================= */}
            <section className="py-20 bg-gradient-to-r from-teal-50 to-emerald-50">
                <div className="max-w-5xl mx-auto text-center">
                    <h2 className="text-3xl font-bold text-gray-900 mb-6">
                        🌅 Seasonal <span className="text-teal-500">Bonuses</span> & Rewards
                    </h2>
                    <p className="text-gray-600 mb-10 max-w-xl mx-auto">
                        Earn reward nights, complimentary spa credits, and free upgrades when you book directly with us.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: <Star size={40} className="text-yellow-400" />,
                                title: "Loyalty Rewards",
                                desc: "Earn points with every booking — redeem for future stays and upgrades.",
                            },
                            {
                                icon: <Plane size={40} className="text-teal-500" />,
                                title: "Travel Partner Discounts",
                                desc: "Enjoy exclusive rates with our partner airlines and travel agencies.",
                            },
                            {
                                icon: <CalendarHeart size={40} className="text-pink-500" />,
                                title: "Early Bird Specials",
                                desc: "Book in advance and save up to 25% on all premium suites.",
                            },
                        ].map((bonus, i) => (
                            <motion.div
                                key={i}
                                whileHover={{ scale: 1.05 }}
                                className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300"
                            >
                                <div className="flex justify-center mb-4">{bonus.icon}</div>
                                <h3 className="text-lg font-semibold mb-2">{bonus.title}</h3>
                                <p className="text-gray-600 text-sm">{bonus.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ================= CTA ================= */}
            <section className="py-20 bg-gradient-to-r from-emerald-500 to-teal-600 text-white text-center relative overflow-hidden">
                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-3xl font-bold mb-4"
                >
                    Ready to Experience Mountain Mirage Luxury? ✨
                </motion.h2>
                <p className="text-gray-100 mb-8 max-w-xl mx-auto">
                    Don’t miss out on these limited-time offers. Reserve your stay today and let the serenity begin.
                </p>
                <motion.a
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    href="/contact"
                    className="bg-white text-teal-600 font-semibold px-8 py-3 rounded-full shadow-md hover:bg-teal-100 transition inline-flex items-center gap-2"
                >
                    Contact for Booking <ChevronRight size={20} />
                </motion.a>
            </section>
        </div>
    );
};

export default SpecialOffers;
