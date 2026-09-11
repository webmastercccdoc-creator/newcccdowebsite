import { useEffect } from "react";
import MainLayout from "../../../layouts/MainLayout";
import NewsLetterBanner from "../../../assets/banner/news-letter.jpg";
import AnimatedBannerText from "../../../components/content/AnimatedBannerText";
import { motion } from 'framer-motion';

export default function NewsLetters() {
    useEffect(() => {
        document.title = "Newsletters - City College of Cagayan de Oro";
    }, []);

    // ============================================================
    // ⚠️ PAGE VISIBILITY FLAG
    // Set this to `false` when the page content is ready to go live.
    // All original page code is preserved below — nothing was deleted.
    // ============================================================
    const COMING_SOON = true;

    if (COMING_SOON) {
        return (
            <MainLayout>
                <motion.div
                    className="flex flex-col items-center justify-center text-center px-6 py-24 md:py-32"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6 }}
                >
                    {/* Animated icon */}
                    <motion.div
                        className="mb-8 flex h-28 w-28 items-center justify-center rounded-full bg-emerald-100 border border-emerald-200 shadow-lg"
                        animate={{ y: [0, -8, 0] }}
                        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                    >
                        <span className="text-5xl">🛠️</span>
                    </motion.div>

                    <motion.h1
                        className="text-4xl md:text-5xl font-bold text-gray-800 tracking-tight"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.15, type: 'spring', stiffness: 100, damping: 15 }}
                    >
                        Coming Soon
                    </motion.h1>

                    <motion.p
                        className="mt-4 max-w-md text-lg text-gray-600"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, type: 'spring', stiffness: 100, damping: 15 }}
                    >
                        We're still developing this page. Please check back soon for updates!
                    </motion.p>

                    {/* Subtle animated progress bar */}
                    <motion.div
                        className="mt-10 h-1.5 w-40 rounded-full bg-emerald-200 overflow-hidden"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.45 }}
                    >
                        <motion.div
                            className="h-full w-1/3 rounded-full bg-emerald-500"
                            animate={{ x: ['-100%', '300%'] }}
                            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                        />
                    </motion.div>
                </motion.div>
            </MainLayout>
        );
    }

    return (
        <MainLayout
            maxWidth="full"
            containerClassName="px-0"
            mainClassName="py-0"
            className="overflow-hidden pb-0"
        >
            {/* Banner copied from UpcomingEvents (image + overlay + centered text) */}
            <div
                className="relative w-full bg-cover bg-center bg-no-repeat shadow-lg min-h-[350px] md:min-h-[450px] lg:min-h-[550px] flex items-center justify-center"
                style={{
                    backgroundImage: `url(${NewsLetterBanner})`,
                }}
            >
                <div className="absolute inset-0 bg-black/50"></div>
                <AnimatedBannerText
                    title="Newsletters"
                    description="Stay updated with the latest news and announcements from the City College of Cagayan de Oro."
                />
            </div>

            {/* BELOW BANNER IS COMPLETELY EMPTY */}
        </MainLayout>
    );
}