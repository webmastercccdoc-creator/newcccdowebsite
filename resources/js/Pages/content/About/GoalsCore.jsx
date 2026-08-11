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
            transition: { staggerChildren: 0.1 }
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
        <MainLayout maxWidth="full" containerClassName="px-0" mainClassName="py-0" className="overflow-hidden pb-0">
            
            {/* Full-width Hero Banner */}
            <div 
                className="relative w-full bg-cover bg-center bg-no-repeat min-h-[450px] md:min-h-[550px] flex items-center justify-center"
                style={{
                    backgroundImage: `url(${coreGoalsBanner})`
                }}
            >
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30"></div>
                <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
                    <motion.span 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="inline-block px-4 py-1.5 mb-6 text-xs font-semibold tracking-widest uppercase text-white bg-white/10 backdrop-blur-md rounded-full border border-white/20"
                    >
                        Institutional Framework
                    </motion.span>
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
                        className="mx-auto max-w-2xl text-lg md:text-xl text-blue-100 font-light"
                        style={{ fontFamily: "'Inter', sans-serif" }}
                    >
                        Our strategic objectives and institutional targets for growth and excellence.
                    </motion.p>
                </div>
            </div>

            {/* ==================== SCHOOL GOALS ==================== */}
            <section className="bg-white py-20 md:py-28">
                <div className="mx-auto max-w-7xl px-6 md:px-8">
                    
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <span className="text-sm font-bold tracking-widest uppercase text-emerald-600">Our Objectives</span>
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-2 mb-4">
                            School Goals
                        </h2>
                        <div className="w-20 h-1.5 bg-emerald-500 rounded-full mx-auto"></div>
                    </motion.div>

                    <motion.div 
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.1 }}
                    >
                        {schoolGoals.map((text, index) => (
                            <motion.div 
                                key={index}
                                variants={itemVariants}
                                className="relative bg-white rounded-2xl p-8 border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden"
                            >
                                {/* Watermark Number */}
                                <span className="absolute -top-4 right-2 text-8xl font-black text-gray-50 select-none pointer-events-none">
                                    {String(index + 1).padStart(2, '0')}
                                </span>
                                
                                <div className="relative z-10">
                                    <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center mb-5">
                                        {/* Target Icon */}
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                        </svg>
                                    </div>
                                    <p className="text-gray-700 leading-relaxed text-base md:text-lg font-medium">
                                        {text}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* ==================== CORE VALUES ==================== */}
            <section className="bg-slate-50 py-20 md:py-28 border-t border-gray-100">
                <div className="mx-auto max-w-7xl px-6 md:px-8">
                    
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <span className="text-sm font-bold tracking-widest uppercase text-blue-600">Guiding Principles</span>
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-2 mb-4">
                            Core Values
                        </h2>
                        <div className="w-20 h-1.5 bg-blue-500 rounded-full mx-auto"></div>
                    </motion.div>

                    {/* 3 Column Grid for Core Values to reduce vertical height */}
                    <motion.div 
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.1 }}
                    >
                        {coreValues.map((text, index) => (
                            <motion.div 
                                key={index}
                                variants={itemVariants}
                                className="group bg-white rounded-2xl p-7 border-t-4 border-blue-600 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col"
                            >
                                <div className="flex items-center gap-3 mb-4">
                                    <span className="flex-shrink-0 w-10 h-10 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center font-bold text-sm transition-colors group-hover:bg-blue-600 group-hover:text-white">
                                        {String(index + 1).padStart(2, '0')}
                                    </span>
                                    <div className="h-[1px] w-full bg-gray-100"></div>
                                </div>
                                <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                                    {text}
                                </p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

        </MainLayout>
    );
}