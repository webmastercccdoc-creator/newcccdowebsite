import { useEffect, useState } from 'react';
import MainLayout from '../../../layouts/MainLayout';
import { motion, AnimatePresence } from 'framer-motion';
import coreGoalsBanner from '../../../assets/banner/coregoals-banner.png';

export default function GoalsCore() {
    const [activeTab, setActiveTab] = useState('goals');

    useEffect(() => {
        document.title = 'Core Goals - City College of Cagayan de Oro';
    }, []);

    const schoolGoals = [
        "Establish a culture of academic excellence and innovation by integrating cutting-edge technologies, including artificial intelligence, into the curriculum.",
        "Foster inclusivity and cultural sensitivity to address the needs of both the local youth and indigenous communities.",
        "Actively contribute to sustainable development goals and drive positive change within the local community.",
        "Uphold an environment of transparency, integrity, mutual respect, and ethical conduct in all aspects of the institution's operations.",
        "Pursue environmental sustainability and responsible development."
    ];

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

    const tabVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: { duration: 0.3, ease: "easeOut" }
        },
        exit: { 
            opacity: 0, 
            y: -10,
            transition: { duration: 0.2, ease: "easeIn" }
        }
    };

    return (
        <MainLayout maxWidth="full" containerClassName="px-0" mainClassName="py-0" className="overflow-hidden p-0 m-0">
            
            {/* Banner */}
            <div 
                className="relative w-full bg-cover bg-center bg-no-repeat min-h-[400px] md:min-h-[500px] flex items-center justify-center flex-shrink-0"
                style={{ backgroundImage: `url(${coreGoalsBanner})` }}
            >
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30"></div>
                <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
                    <motion.h1 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-4xl md:text-6xl font-light tracking-wide text-white drop-shadow-lg mb-4"
                    >
                        Core Goals
                    </motion.h1>
                    <motion.p 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="mx-auto max-w-2xl text-base md:text-lg text-gray-200 font-light"
                    >
                        Our strategic objectives and institutional targets for growth and excellence.
                    </motion.p>
                </div>
            </div>

            {/* Content */}
            <div className="bg-white py-16 md:py-20">
                <div className="max-w-5xl mx-auto px-6">
                    
                    {/* Tabs */}
                    <div className="flex justify-center mb-12">
                        <div className="inline-flex bg-gray-100 rounded-lg p-1">
                            <button
                                onClick={() => setActiveTab('goals')}
                                className={`px-6 py-2.5 text-sm font-medium rounded-md transition-all duration-300 ${
                                    activeTab === 'goals' 
                                        ? 'bg-white text-gray-900 shadow-sm' 
                                        : 'text-gray-600 hover:text-gray-900'
                                }`}
                            >
                                School Goals
                            </button>
                            <button
                                onClick={() => setActiveTab('values')}
                                className={`px-6 py-2.5 text-sm font-medium rounded-md transition-all duration-300 ${
                                    activeTab === 'values' 
                                        ? 'bg-white text-gray-900 shadow-sm' 
                                        : 'text-gray-600 hover:text-gray-900'
                                }`}
                            >
                                Core Values
                            </button>
                        </div>
                    </div>

                    {/* Content */}
                    <AnimatePresence mode="wait">
                        {activeTab === 'goals' ? (
                            <motion.div
                                key="goals"
                                variants={tabVariants}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                            >
                                <div className="space-y-6">
                                    {schoolGoals.map((goal, index) => (
                                        <div 
                                            key={index} 
                                            className="flex gap-4 items-start p-6 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                                        >
                                            <span className="flex-shrink-0 w-8 h-8 bg-white rounded-full flex items-center justify-center text-sm font-medium text-gray-700 border border-gray-200">
                                                {index + 1}
                                            </span>
                                            <p className="text-gray-700 leading-relaxed">{goal}</p>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="values"
                                variants={tabVariants}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                            >
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {coreValues.map((value, index) => (
                                        <div 
                                            key={index}
                                            className="p-6 border border-gray-100 rounded-lg hover:border-gray-300 transition-colors"
                                        >
                                            <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                                {value.title}
                                            </h3>
                                            <p className="text-gray-600 text-sm leading-relaxed">
                                                {value.text}
                                            </p>
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