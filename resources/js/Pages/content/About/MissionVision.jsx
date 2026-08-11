import { useEffect } from 'react';
import MainLayout from '../../../layouts/MainLayout';
// 1. Import motion from framer-motion
import { motion } from 'framer-motion';

// 2. Import the local banner image
import missionVisionBanner from '../../../assets/banner/missionvision-banner.png';

export default function MissionVision() {
    useEffect(() => {
        document.title = 'Mission & Vision - City College of Cagayan de Oro';
    }, []);

    // 3. Define Animation Variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.3 // 0.3s delay between Title and Paragraph
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: { 
                type: "spring", 
                stiffness: 100, 
                damping: 12 
            }
        }
    };

    // Left slide-in animation for Mission
    const missionContainerVariants = {
        hidden: { opacity: 0, x: -80 },
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                staggerChildren: 0.3,
                duration: 0.6,
                ease: "easeOut"
            }
        }
    };

    // Right slide-in animation for Vision
    const visionContainerVariants = {
        hidden: { opacity: 0, x: 80 },
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                staggerChildren: 0.3,
                duration: 0.6,
                ease: "easeOut"
            }
        }
    };

    return (
        <MainLayout 
            maxWidth="full" 
            containerClassName="px-0" 
            mainClassName="py-0" 
            className="overflow-hidden pb-0"
        >
            {/* FULL-WIDTH HERO BANNER */}
            <div 
                className="relative w-full bg-cover bg-center bg-no-repeat shadow-lg min-h-[350px] md:min-h-[450px] lg:min-h-[550px] flex items-center justify-center"
                style={{
                    backgroundImage: `url(${missionVisionBanner})`
                }}
            >
                {/* Dark Overlay */}
                <div className="absolute inset-0 bg-black/50"></div>
                
                <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
                    <h1 className="text-4xl font-bold tracking-tight text-white drop-shadow-md sm:text-5xl md:text-6xl">
                        Mission & Vision
                    </h1>
                    <p className="mx-auto mt-4 max-w-2xl text-lg text-white/90 drop-shadow-md">
                        Our purpose, guiding principles, and long-term aspirations for the City College of Cagayan de Oro.
                    </p>
                </div>
            </div>

            {/* 
                LAYOUT: SIDE-BY-SIDE BOXES WITH ANIMATIONS
            */}
            <div className="mx-auto max-w-7xl px-6 py-20 md:py-24 relative">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 relative">
                    
                    {/* LEFT COLUMN: MISSION (Animated from Left) */}
                    <motion.div 
                        className="w-full bg-green-800 p-8 md:p-12 lg:p-16 rounded-3xl shadow-2xl flex flex-col justify-center items-start relative overflow-hidden border border-green-900 min-h-[400px] md:min-h-[450px]"
                        variants={missionContainerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                    >
                        {/* Decorative glow effect */}
                        <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>
                        <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>

                        <div className="relative z-10 w-full">
                            <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 font-runethia">
                                Our Mission
                            </motion.h2>
                            
                            <motion.p variants={itemVariants} className="text-lg md:text-xl lg:text-2xl text-white/95 leading-relaxed font-runethia">
                                <motion.span variants={itemVariants} className="text-6xl font-bold text-white font-serif italic leading-none mr-2">"</motion.span>
                                To provide transformative and inclusive learning driven by cutting-edge technologies, 
                                including artificial intelligence, that equip the institution and community to create 
                                innovative, relevant, and data-driven solutions for local and global impact.
                                <motion.span variants={itemVariants} className="text-6xl font-bold text-white font-serif italic leading-none ml-2">"</motion.span>
                            </motion.p>
                        </div>
                    </motion.div>

                    {/* RIGHT COLUMN: VISION (Animated from Right) */}
                    <motion.div 
                        className="w-full bg-white p-8 md:p-12 lg:p-16 rounded-3xl shadow-2xl flex flex-col justify-center items-end relative overflow-hidden border border-gray-200 min-h-[400px] md:min-h-[450px]"
                        variants={visionContainerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                    >
                        {/* Subtle glow effect */}
                        <div className="absolute -top-20 -left-20 w-64 h-64 bg-gray-100/50 rounded-full blur-3xl pointer-events-none"></div>

                        <div className="relative z-10 w-full text-right">
                            <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 font-runethia">
                                Our Vision
                            </motion.h2>
                            
                            <motion.p variants={itemVariants} className="text-lg md:text-xl lg:text-2xl text-gray-900 leading-relaxed font-runethia">
                                <motion.span variants={itemVariants} className="text-6xl font-bold text-black font-serif italic leading-none mr-2">"</motion.span>
                                A City College that nurtures and produces global citizens supported by cutting-edge 
                                technologies for innovation and excellence by 2033.
                                <motion.span variants={itemVariants} className="text-6xl font-bold text-black font-serif italic leading-none ml-2">"</motion.span>
                            </motion.p>
                        </div>
                    </motion.div>

                </div>
            </div>
        </MainLayout>
    );
}