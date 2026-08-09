import { useEffect } from 'react';
import MainLayout from '../../../layouts/MainLayout';
import { motion } from 'framer-motion';

// 1. Import the local banner image
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

    // Data for cleaner mapping
    const schoolGoals = [
        { id: 1, title: "Academic Excellence and Innovation", desc: "Establish a culture of academic excellence and innovation by integrating cutting-edge technologies, including artificial intelligence, into the curriculum." },
        { id: 2, title: "Inclusivity and Cultural Sensitivity", desc: "Foster inclusivity and cultural sensitivity to address the needs of both the local youth and indigenous communities." },
        { id: 3, title: "Community Engagement and Impact", desc: "Actively contribute to sustainable development goals and drive positive change within the local community." },
        { id: 4, title: "Transparency, Openness, and Ethical Conduct", desc: "Uphold an environment of transparency, integrity, mutual respect, and ethical conduct in all aspects of the institution's operations." },
        { id: 5, title: "Environmental Stewardship", desc: "Pursue environmental sustainability and responsible development." }
    ];

    const coreValues = [
        { id: 1, title: "Adaptive", desc: "We embrace change and possess the flexibility to navigate evolving landscapes, a changing society, and the diversity of people, for advancing quality learning and preparing students for the 21st century and upliftment of the community." },
        { id: 2, title: "Innovative", desc: "We push boundaries and explore new ideas that will lead to new and innovative solutions to poverty, social inequality, unemployment, digital divide, and climate change." },
        { id: 3, title: "Mission Driven", desc: "We commit to a shared vision of making a meaningful difference and contributing to the greater good by providing and maintaining a student-centered campus experience where everyone is respected and empowered." },
        { id: 4, title: "Honest", desc: "We uphold an environment of transparency, integrity, and ethical conduct in all aspects of curriculum, instruction, research, and community engagements." },
        { id: 5, title: "Inclusive", desc: "We celebrate diversity and promote inclusivity in all aspects of our institution. We value unique backgrounds, experiences, and perspectives of our students, faculty, and staff. We strive to create an inclusive and welcoming environment that respects and appreciates the contributions of every individual, ensuring equal opportunities for growth and success." },
        { id: 6, title: "God-Fearing", desc: "We deeply acknowledge the profound importance of spirituality and moral grounding in our institution. Guided by principles of faith, compassion, and justice, we strive to cultivate a nurturing environment that fosters personal and collective growth." },
        { id: 7, title: "Humane", desc: "We recognize and value the inherent dignity and worth of every individual. We are dedicated to treating everyone with respect, empathy, and understanding. We strive to treat everyone with empathy, kindness, and compassion, both within our organization and in our interaction with the wider community." },
        { id: 8, title: "Excellence", desc: "We pursue continuous improvement and set high standards for ourselves, pushing beyond mediocrity to achieve exceptional results in environmental stewardship, sustaining life, and responsible development." },
        { id: 9, title: "Respect", desc: "We cultivate an environment of mutual respect, where diverse perspectives are valued, and differing opinions are heard. We place a premium on open-dialogue, professionalism, empathy, ethical conduct, and personal growth. We foster a sense of belonging, collaboration, and well-being for all members of our community." }
    ];

    return (
        <MainLayout maxWidth="full" containerClassName="px-0" mainClassName="py-0" className="overflow-hidden pb-0">
            
            {/* Full-width Hero Banner - Now using local image */}
            <div 
                className="relative w-full bg-cover bg-center bg-no-repeat shadow-lg min-h-[400px] md:min-h-[500px] lg:min-h-[600px] flex items-center justify-center"
                style={{
                    // 2. Use the imported variable inside url()
                    backgroundImage: `url(${coreGoalsBanner})`
                }}
            >
                <div className="absolute inset-0 bg-black/60 backdrop-blur-[1px]"></div>
                <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
                    <motion.h1 
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-5xl md:text-7xl font-bold tracking-tight text-white drop-shadow-lg mb-6 font-runethia"
                    >
                        Core Goals
                    </motion.h1>
                    <motion.p 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="mx-auto mt-4 max-w-3xl text-lg md:text-xl text-white/80 font-light"
                    >
                        Our strategic objectives and institutional targets for growth and excellence.
                    </motion.p>
                </div>
            </div>

            {/* PURE TEXT CONTENT - NO BACKGROUNDS */}
            <div className="w-full bg-white">
                
                {/* ==================== SCHOOL GOALS SECTION ==================== */}
                <div className="w-full py-16 md:py-24">
                    <div className="mx-auto max-w-6xl px-6 md:px-8">
                        
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-center mb-16"
                        >
                            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 font-runethia tracking-tight">
                                School Goals
                            </h2>
                            <div className="w-24 h-1.5 bg-green-700 rounded-full mx-auto"></div>
                            <p className="mt-6 text-gray-500 text-lg max-w-2xl mx-auto">Our roadmap to academic and institutional greatness.</p>
                        </motion.div>

                        <motion.div 
                            className="flex flex-col w-full gap-10"
                            variants={containerVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                        >
                            {schoolGoals.map((goal) => (
                                <motion.div 
                                    key={goal.id}
                                    variants={itemVariants}
                                    className="w-full relative py-4 border-b border-gray-200 last:border-none"
                                >
                                    <div className="relative z-10 flex flex-col sm:flex-row sm:items-start gap-4">
                                        {/* Subtle number badge */}
                                        <div className="text-2xl font-bold text-green-700 font-runethia pt-1">
                                            {String(goal.id).padStart(2, '0')}
                                        </div>
                                        
                                        <div className="flex-1">
                                            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-runethia tracking-wide">
                                                {goal.title}
                                            </h3>
                                            <div className="w-12 h-1 bg-green-500 rounded-full mb-4"></div>
                                            <p className="text-gray-700 text-base md:text-lg leading-relaxed max-w-4xl font-light">
                                                {goal.desc}
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </div>

                {/* ==================== CORE VALUES SECTION ==================== */}
                <div className="w-full py-16 md:py-24 border-t border-gray-100">
                    <div className="mx-auto max-w-6xl px-6 md:px-8">
                        
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-center mb-16"
                        >
                            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 font-runethia tracking-tight">
                                Core Values
                            </h2>
                            <div className="w-24 h-1.5 bg-blue-700 rounded-full mx-auto"></div>
                            <p className="mt-6 text-gray-500 text-lg max-w-2xl mx-auto">The fundamental principles that guide our every action.</p>
                        </motion.div>

                        <motion.div 
                            className="flex flex-col w-full gap-10"
                            variants={containerVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                        >
                            {coreValues.map((value) => (
                                <motion.div 
                                    key={value.id}
                                    variants={itemVariants}
                                    className="w-full relative py-4 border-b border-gray-200 last:border-none"
                                >
                                    <div className="relative z-10 flex flex-col sm:flex-row sm:items-start gap-4">
                                        {/* Subtle number badge */}
                                        <div className="text-2xl font-bold text-blue-700 font-runethia pt-1">
                                            {String(value.id).padStart(2, '0')}
                                        </div>
                                        
                                        <div className="flex-1">
                                            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-runethia tracking-wide">
                                                {value.title}
                                            </h3>
                                            <div className="w-12 h-1 bg-blue-500 rounded-full mb-4"></div>
                                            <p className="text-gray-700 text-base md:text-lg leading-relaxed max-w-4xl font-light">
                                                {value.desc}
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </div>

            </div>
        </MainLayout>
    );
}