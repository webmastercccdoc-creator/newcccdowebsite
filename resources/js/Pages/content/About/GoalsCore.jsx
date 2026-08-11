import { useEffect } from 'react';
import MainLayout from '../../../layouts/MainLayout';
import { motion } from 'framer-motion';

// Import the local banner image
import coreGoalsBanner from '../../../assets/banner/coregoals-banner.png';

console.log('MainLayout import (GoalsCore):', MainLayout);

export default function GoalsCore() {
    useEffect(() => {
        document.title = 'Core Goals - City College of Cagayan de Oro';
    }, []);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.15 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: { type: "spring", stiffness: 100, damping: 12 }
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
                className="relative w-full bg-cover bg-center bg-no-repeat shadow-lg min-h-[400px] md:min-h-[500px] lg:min-h-[600px] flex items-center justify-center"
                style={{
                    backgroundImage: `url(${coreGoalsBanner})`
                }}
            >
                <div className="absolute inset-0 bg-black/60 backdrop-blur-[1px]"></div>
                <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
                    <motion.h1 
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-5xl md:text-7xl font-bold tracking-tight text-white drop-shadow-lg mb-6"
                        style={{ fontFamily: "'Inter', sans-serif" }}
                    >
                        Core Goals
                    </motion.h1>
                    <motion.p 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="mx-auto mt-4 max-w-3xl text-lg md:text-xl text-white/80 font-light"
                        style={{ fontFamily: "'Inter', sans-serif" }}
                    >
                        Our strategic objectives and institutional targets for growth and excellence.
                    </motion.p>
                </div>
            </div>

            {/* CONTENT SECTIONS - Stacked Layout */}
            <div className="w-full bg-white py-16 md:py-24">
                <div className="mx-auto max-w-4xl px-6 md:px-8">
                    
                    {/* ==================== SCHOOL GOALS ==================== */}
                    <div className="mb-20">
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-center mb-8"
                        >
                            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">
                                School Goals
                            </h2>
                            <div className="w-20 h-1 bg-green-600 rounded-full mx-auto"></div>
                        </motion.div>

                        <motion.div 
                            className="space-y-4"
                            variants={containerVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.2 }}
                        >
                            {schoolGoals.map((text, index) => (
                                <motion.div 
                                    key={index}
                                    variants={itemVariants}
                                    className="bg-gray-50 rounded-xl p-6 md:p-8 hover:bg-green-50 transition-colors duration-300 border-l-4 border-green-600"
                                >
                                    <p className="text-gray-700 text-base md:text-lg leading-relaxed">
                                        {text}
                                    </p>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>

                    {/* ==================== CORE VALUES ==================== */}
                    <div>
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-center mb-8"
                        >
                            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">
                                Core Values
                            </h2>
                            <div className="w-20 h-1 bg-blue-600 rounded-full mx-auto"></div>
                        </motion.div>

                        <motion.div 
                            className="space-y-4"
                            variants={containerVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.2 }}
                        >
                            {coreValues.map((text, index) => (
                                <motion.div 
                                    key={index}
                                    variants={itemVariants}
                                    className="bg-gray-50 rounded-xl p-6 md:p-8 hover:bg-blue-50 transition-colors duration-300 border-l-4 border-blue-600"
                                >
                                    <p className="text-gray-700 text-base md:text-lg leading-relaxed">
                                        {text}
                                    </p>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>

                </div>
            </div>

        </MainLayout>
    );
}