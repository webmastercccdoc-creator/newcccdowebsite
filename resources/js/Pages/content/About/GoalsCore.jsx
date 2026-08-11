import { useEffect, useState } from 'react';
import MainLayout from '../../../layouts/MainLayout';
import { motion, AnimatePresence } from 'framer-motion';

// Import the local banner image
import coreGoalsBanner from '../../../assets/banner/coregoals-banner.png';

export default function GoalsCore() {
    const [activeTab, setActiveTab] = useState('goals');

    useEffect(() => {
        document.title = 'Core Goals - City College of Cagayan de Oro';
    }, []);

    // School Goals Data
    const schoolGoals = [
        "Establish a culture of academic excellence and innovation by integrating cutting-edge technologies, including artificial intelligence, into the curriculum.",
        "Foster inclusivity and cultural sensitivity to address the needs of both the local youth and indigenous communities.",
        "Actively contribute to sustainable development goals and drive positive change within the local community.",
        "Uphold an environment of transparency, integrity, mutual respect, and ethical conduct in all aspects of the institution's operations.",
        "Pursue environmental sustainability and responsible development."
    ];

    // Core Values Data (Added Titles for better UI)
    const coreValues = [
        { title: "Adaptability", text: "We embrace change and possess the flexibility to navigate evolving landscapes, a changing society, and the diversity of people, for advancing quality learning and preparing students for the 21st century and upliftment of the community." },
        { title: "Innovation", text: "We push boundaries and explore new ideas that will lead to new and innovative solutions to poverty, social inequality, unemployment, digital divide, and climate change." },
        { title: "Commitment", text: "We commit to a shared vision of making a meaningful difference and contributing to the greater good by providing and maintaining a student-centered campus experience where everyone is respected and empowered." },
        { title: "Integrity", text: "We uphold an environment of transparency, integrity, and ethical conduct in all aspects of curriculum, instruction, research, and community engagements." },
        { title: "Inclusivity", text: "We celebrate diversity and promote inclusivity in all aspects of our institution. We value unique backgrounds, experiences, and perspectives of our students, faculty, and staff." },
        { title: "Spirituality", text: "We deeply acknowledge the profound importance of spirituality and moral grounding in our institution. Guided by principles of faith, compassion, and justice." },
        { title: "Respect", text: "We recognize and value the inherent dignity and worth of every individual. We are dedicated to treating everyone with respect, empathy, and understanding." },
        { title: "Excellence", text: "We pursue continuous improvement and set high standards for ourselves, pushing beyond mediocrity to achieve exceptional results." },
        { title: "Collaboration", text: "We cultivate an environment of mutual respect, where diverse perspectives are valued, and differing opinions are heard." }
    ];

    // Framer Motion variants for smooth tab transitions
    const tabVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: { duration: 0.4, ease: "easeOut" }
        },
        exit: { 
            opacity: 0, 
            y: -20,
            transition: { duration: 0.2, ease: "easeIn" }
        }
    };

    return (
        <MainLayout maxWidth="full" containerClassName="px-0" mainClassName="py-0" className="overflow-hidden p-0 m-0">
            
            {/* ==========================================================
                1. TOP HERO BANNER (Untouched)
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
                2. TAB NAVIGATION & CONTENT SECTION (Redesigned)
            ========================================================== */}
            <div className="relative bg-slate-50 py-16 md:py-24">
                
                {/* Tab Buttons */}
                <div className="max-w-6xl mx-auto px-6 mb-12 md:mb-16">
                    <div className="flex justify-center">
                        <div className="relative flex gap-2 p-1.5 bg-white rounded-full shadow-sm border border-gray-200">
                            <button
                                onClick={() => setActiveTab('goals')}
                                className="relative z-10 px-6 sm:px-10 py-3 text-sm font-bold rounded-full transition-colors duration-300 focus:outline-none"
                            >
                                {activeTab === 'goals' && (
                                    <motion.div
                                        layoutId="tab-pill"
                                        className="absolute inset-0 bg-emerald-600 rounded-full shadow-md"
                                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                    />
                                )}
                                <span className={`relative z-10 ${activeTab === 'goals' ? 'text-white' : 'text-gray-500'}`}>
                                    School Goals
                                </span>
                            </button>
                            <button
                                onClick={() => setActiveTab('values')}
                                className="relative z-10 px-6 sm:px-10 py-3 text-sm font-bold rounded-full transition-colors duration-300 focus:outline-none"
                            >
                                {activeTab === 'values' && (
                                    <motion.div
                                        layoutId="tab-pill"
                                        className="absolute inset-0 bg-emerald-600 rounded-full shadow-md"
                                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                    />
                                )}
                                <span className={`relative z-10 ${activeTab === 'values' ? 'text-white' : 'text-gray-500'}`}>
                                    Core Values
                                </span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Tab Content */}
                <div className="max-w-6xl mx-auto px-6">
                    <AnimatePresence mode="wait">
                        {activeTab === 'goals' ? (
                            <motion.div
                                key="goals-content"
                                variants={tabVariants}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                className="w-full"
                            >
                                {/* Goals Timeline Layout */}
                                <div className="max-w-4xl mx-auto space-y-8">
                                    {schoolGoals.map((goal, index) => (
                                        <div 
                                            key={index} 
                                            className="flex flex-col md:flex-row md:items-start gap-6 group"
                                        >
                                            {/* Number Indicator */}
                                            <div className="flex items-center gap-4 md:flex-col md:items-center md:w-24">
                                                <div className="flex-shrink-0 w-14 h-14 rounded-full bg-white border-2 border-emerald-100 text-emerald-700 font-extrabold text-xl flex items-center justify-center shadow-sm group-hover:bg-emerald-600 group-hover:text-white group-hover:border-emerald-600 transition-all duration-300">
                                                    {String(index + 1).padStart(2, '0')}
                                                </div>
                                                {/* Connecting Line */}
                                                {index !== schoolGoals.length - 1 && (
                                                    <div className="hidden md:block w-px h-16 bg-gray-200 ml-auto mr-auto"></div>
                                                )}
                                            </div>

                                            {/* Content */}
                                            <div className="flex-1 pb-8 border-b border-gray-100 last:border-0">
                                                <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
                                                    {goal}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="values-content"
                                variants={tabVariants}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                className="w-full"
                            >
                                {/* Values Grid Layout */}
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {coreValues.map((value, index) => (
                                        <div 
                                            key={index}
                                            className="relative bg-white rounded-2xl p-8 border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden group"
                                        >
                                            {/* Background Decoration */}
                                            <div className="absolute top-0 right-0 text-8xl font-black text-gray-50 group-hover:text-emerald-50 transition-colors duration-300 -mr-4 -mt-4 select-none pointer-events-none">
                                                {String(index + 1).padStart(2, '0')}
                                            </div>

                                            {/* Content */}
                                            <div className="relative z-10">
                                                <div className="w-12 h-1 bg-emerald-500 rounded-full mb-5"></div>
                                                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-emerald-700 transition-colors">
                                                    {value.title}
                                                </h3>
                                                <p className="text-gray-500 leading-relaxed text-sm">
                                                    {value.text}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </MainLayout>
    );
}