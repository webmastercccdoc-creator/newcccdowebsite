import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import MainLayout from '../../../layouts/MainLayout';
import AnimatedBannerText from '../../../components/content/AnimatedBannerText';
import extensionBanner from '../../../assets/banner/extension-banner.png';

const DEFAULT_BANNER = extensionBanner;

export default function NSTP({
    title = 'National Service Training Program',
    description = "We're still developing this page. Please check back soon for updates!",
    bannerImage = DEFAULT_BANNER,
    contentTitle = 'Coming Soon',
}) {
    const [scrollProgress, setScrollProgress] = useState(0);

    useEffect(() => {
        document.title =
            'National Service Training Program - City College of Cagayan de Oro';
        const handleScroll = () => {
            const top = window.pageYOffset;
            const height =
                document.documentElement.scrollHeight - window.innerHeight;
            const percent = height > 0 ? (top / height) * 100 : 0;
            setScrollProgress(percent);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <MainLayout
            maxWidth="full"
            containerClassName="px-0"
            mainClassName="py-0"
            className="overflow-hidden pb-0 bg-slate-50"
        >
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700&family=Inter:wght@300;400;500;600;700;800&display=swap');

                .vp-serif { font-family: 'Fraunces', ui-serif, Georgia, serif; }
                .vp-sans { font-family: 'Inter', ui-sans-serif, system-ui, sans-serif; }
            `}</style>

            {/* Scroll Progress Indicator */}
            <div className="fixed top-0 left-0 w-full h-1 z-[1000] bg-transparent">
                <div
                    className="h-full transition-[width] duration-100 ease-out"
                    style={{
                        width: `${scrollProgress}%`,
                        background:
                            'linear-gradient(90deg, #145A32, #D4AF37)',
                    }}
                />
            </div>

            {/* ===================== Hero Banner ===================== */}
            <div
                className="relative w-full bg-cover bg-center bg-no-repeat shadow-lg min-h-[350px] md:min-h-[450px] lg:min-h-[550px] flex items-center justify-center"
                style={{
                    backgroundImage: `url('${bannerImage}')`,
                }}
            >
                <div className="absolute inset-0 bg-black/50" />
                <AnimatedBannerText title={title} description={description} />
            </div>

            {/* ===================== Coming Soon Section ===================== */}
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12 md:py-16">
                <motion.div
                    className="flex flex-col items-center justify-center text-center px-6 py-20 md:py-28"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6 }}
                >
                    <motion.div
                        className="mb-8 flex h-28 w-28 items-center justify-center rounded-full bg-emerald-100 border border-emerald-200 shadow-lg"
                        animate={{ y: [0, -8, 0] }}
                        transition={{
                            duration: 2.5,
                            repeat: Infinity,
                            ease: 'easeInOut',
                        }}
                    >
                        <span className="text-5xl">🛠️</span>
                    </motion.div>

                    <motion.h1
                        className="text-4xl md:text-5xl font-bold text-gray-800 tracking-tight vp-serif"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                            delay: 0.15,
                            type: 'spring',
                            stiffness: 100,
                            damping: 15,
                        }}
                    >
                        {contentTitle}
                    </motion.h1>

                    <motion.p
                        className="mt-4 max-w-2xl text-lg text-gray-600 vp-sans"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                            delay: 0.3,
                            type: 'spring',
                            stiffness: 100,
                            damping: 15,
                        }}
                    >
                        {description}
                    </motion.p>

                    <motion.div
                        className="mt-10 h-1.5 w-40 rounded-full bg-emerald-200 overflow-hidden"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.45 }}
                    >
                        <motion.div
                            className="h-full w-1/3 rounded-full bg-emerald-500"
                            animate={{ x: ['-100%', '300%'] }}
                            transition={{
                                duration: 1.8,
                                repeat: Infinity,
                                ease: 'easeInOut',
                            }}
                        />
                    </motion.div>
                </motion.div>
            </div>
        </MainLayout>
    );
}