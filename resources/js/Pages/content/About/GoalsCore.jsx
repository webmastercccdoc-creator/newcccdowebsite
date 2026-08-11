import { useEffect } from 'react';
import MainLayout from '../../../layouts/MainLayout';
import { motion } from 'framer-motion';

// Import the local banner image
import coreGoalsBanner from '../../../assets/banner/coregoals-banner.png';

export default function GoalsCore() {
    useEffect(() => {
        document.title = 'Core Goals - City College of Cagayan de Oro';
    }, []);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.08 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: { type: "spring", stiffness: 100, damping: 15 }
        }
    };

    // School Goals Data
    const schoolGoals = [
        "Establish a culture of academic excellence and innovation by integrating cutting-edge technologies, including artificial intelligence, into the curriculum.",
        "Foster inclusivity and cultural sensitivity to address the needs of both the local youth and indigenous communities.",
        "Actively contribute to sustainable development goals and drive positive change within the local community.",
        "Uphold an environment of transparency, integrity, mutual respect, and ethical conduct in all aspects of the institution's operations.",
        "Pursue environmental sustainability and responsible development."
    ];

    // Core Values Data
    const coreValues = [
        "We embrace change and possess the flexibility to navigate evolving landscapes, a changing society, and the diversity of people, for advancing quality learning and preparing students for the 21st century and upliftment of the community.",
        "We push boundaries and explore new ideas that will lead to new and innovative solutions to poverty, social inequality, unemployment, digital divide, and climate change.",
        "We commit to a shared vision of making a meaningful difference and contributing to the greater good by providing and maintaining a student-centered campus experience where everyone is respected and empowered.",
        "We uphold an environment of transparency, integrity, and ethical conduct in all aspects of curriculum, instruction, research, and community engagements.",
        "We celebrate diversity and promote inclusivity in all aspects of our institution. We value unique backgrounds, experiences, and perspectives of our students, faculty, and staff.",
        "We deeply acknowledge the profound importance of spirituality and moral grounding in our institution. Guided by principles of faith, compassion, and justice.",
        "We recognize and value the inherent dignity and worth of every individual. We are dedicated to treating everyone with respect, empathy, and understanding.",
        "We pursue continuous improvement and set high standards for ourselves, pushing beyond mediocrity to achieve exceptional results.",
        "We cultivate an environment of mutual respect, where diverse perspectives are valued, and differing opinions are heard."
    ];

    return (
        <MainLayout maxWidth="full" containerClassName="px-0" mainClassName="py-0" className="overflow-hidden p-0 m-0">
            
            {/* ==========================================================
                1. TOP HERO BANNER (Original Design Untouched)
            ========================================================== */}
            <div 
                className="relative w-full bg-cover bg-center bg-no-repeat min-h-[450px] md:min-h-[550px] flex items-center justify-center flex-shrink-0"
                style={{
                    backgroundImage: `url(${coreGoalsBanner})`
                }}
            >
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30"></div>
                <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
                    <motion.h1 
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-5xl md:text-7xl font-extrabold tracking-tight text-white drop-shadow-xl mb-4"
                        style={{ fontFamily: "'Inter', sans-serif" }}
                    >
                        Core Goals
                    </motion.h1>
                    <motion.p 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="mx-auto max-w-2xl text-lg md:text-xl text-emerald-50 font-light"
                        style={{ fontFamily: "'Inter', sans-serif" }}
                    >
                        Our strategic objectives and institutional targets for growth and excellence.
                    </motion.p>
                </div>
            </div>

            {/* ==========================================================
                2. SPLIT CONTENT SECTION (Expanded & Natural Flow)
            ========================================================== */}
            <div className="flex flex-col lg:flex-row w-full">
                
                {/* ==================== LEFT SIDE: SCHOOL GOALS ==================== */}
                <div className="lg:w-2/5 w-full bg-gradient-to-br from-emerald-900 to-emerald-950 p-8 md:p-12 lg:p-16">
                    <motion.div 
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={containerVariants}
                        className="w-full max-w-lg mx-auto"
                    >
                        <motion.div variants={itemVariants} className="mb-8">
                            <span className="text-sm font-bold tracking-widest uppercase text-emerald-400">Our Objectives</span>
                            <h2 className="text-3xl md:text-4xl font-bold text-white mt-2">School Goals</h2>
                            <div className="w-16 h-1.5 bg-emerald-500 rounded-full mt-3"></div>
                        </motion.div>

                        <div className="space-y-5">
                            {schoolGoals.map((text, index) => (
                                <motion.div 
                                    key={index}
                                    variants={itemVariants}
                                    className="flex items-start gap-4 group bg-white/5 backdrop-blur-sm p-5 rounded-xl border border-emerald-800/50 hover:bg-emerald-800/40 transition-colors duration-300"
                                >
                                    <div className="flex-shrink-0 w-8 h-8 mt-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center">
                                        <svg className="w-4 h-4 text-emerald-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <p className="text-base md:text-lg leading-relaxed text-emerald-50/90">
                                        {text}
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>

                {/* ==================== RIGHT SIDE: CORE VALUES ==================== */}
                <div className="lg:w-3/5 w-full bg-slate-50 p-8 md:p-12 lg:p-16">
                    
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="mb-8 flex-shrink-0"
                    >
                        <span className="text-sm font-bold tracking-widest uppercase text-emerald-600">Guiding Principles</span>
                        <div className="flex items-center justify-between mt-2">
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Core Values</h2>
                            <div className="h-1.5 w-16 bg-emerald-500 rounded-full"></div>
                        </div>
                    </motion.div>

                    <motion.div 
                        className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6"
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        {coreValues.map((text, index) => (
                            <motion.div 
                                key={index}
                                variants={itemVariants}
                                className="group relative bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-lg hover:border-emerald-200 hover:-translate-y-1 transition-all duration-300 flex flex-col"
                            >
                                {/* Quote Icon */}
                                <svg className="w-8 h-8 text-emerald-500 mb-4 opacity-70" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                                </svg>
                                
                                <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                                    {text}
                                </p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </MainLayout>
    );
}