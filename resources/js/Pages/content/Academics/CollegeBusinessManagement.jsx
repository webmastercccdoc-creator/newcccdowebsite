import { useEffect, useState } from 'react';
import MainLayout from '../../../layouts/MainLayout';
import cedBanner from '../../../assets/banner/cbm-banner.png';
import { motion } from 'framer-motion';

// Placeholder components for each section
const AboutContent = () => (
    <motion.div
        className="bg-white rounded-2xl shadow-xl p-6 md:p-10 border border-gray-100"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 100, damping: 15 }}
    >
        <h2 className="text-3xl font-bold text-gray-800 mb-6">About the College</h2>
        <div className="prose prose-lg max-w-none text-gray-600 leading-relaxed">
            <p className="mb-4">Coming soon...</p>
        </div>
    </motion.div>
);

const MissionContent = () => (
    <motion.div
        className="bg-white rounded-2xl shadow-xl p-6 md:p-10 border border-gray-100"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 100, damping: 15 }}
    >
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Mission</h2>
        <div className="prose prose-lg max-w-none text-gray-600 leading-relaxed">
            <p className="mb-4">Coming soon...</p>
        </div>
    </motion.div>
);

const VisionContent = () => (
    <motion.div
        className="bg-white rounded-2xl shadow-xl p-6 md:p-10 border border-gray-100"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 100, damping: 15 }}
    >
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Vision</h2>
        <div className="prose prose-lg max-w-none text-gray-600 leading-relaxed">
            <p className="mb-4">Coming soon...</p>
        </div>
    </motion.div>
);

const CoreValuesContent = () => (
    <motion.div
        className="bg-white rounded-2xl shadow-xl p-6 md:p-10 border border-gray-100"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 100, damping: 15 }}
    >
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Core Values</h2>
        <div className="prose prose-lg max-w-none text-gray-600 leading-relaxed">
            <p className="mb-4">Coming soon...</p>
        </div>
    </motion.div>
);

const ProgramsContent = () => (
    <motion.div
        className="bg-white rounded-2xl shadow-xl p-6 md:p-10 border border-gray-100"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 100, damping: 15 }}
    >
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Programs Offered</h2>
        <div className="prose prose-lg max-w-none text-gray-600 leading-relaxed">
            <p className="mb-4">Coming soon...</p>
        </div>
    </motion.div>
);

const FacultyContent = () => (
    <motion.div
        className="bg-white rounded-2xl shadow-xl p-6 md:p-10 border border-gray-100"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 100, damping: 15 }}
    >
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Faculty Leadership</h2>
        <div className="prose prose-lg max-w-none text-gray-600 leading-relaxed">
            <p className="mb-4">Coming soon...</p>
        </div>
    </motion.div>
);

const ResearchContent = () => (
    <motion.div
        className="bg-white rounded-2xl shadow-xl p-6 md:p-10 border border-gray-100"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 100, damping: 15 }}
    >
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Research</h2>
        <div className="prose prose-lg max-w-none text-gray-600 leading-relaxed">
            <p className="mb-4">Coming soon...</p>
        </div>
    </motion.div>
);

const NewsContent = () => (
    <motion.div
        className="bg-white rounded-2xl shadow-xl p-6 md:p-10 border border-gray-100"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 100, damping: 15 }}
    >
        <h2 className="text-3xl font-bold text-gray-800 mb-6">News & Articles</h2>
        <div className="prose prose-lg max-w-none text-gray-600 leading-relaxed">
            <p className="mb-4">Coming soon...</p>
        </div>
    </motion.div>
);

export default function CollegeBusinessManagement() {
    const [selectedMenuId, setSelectedMenuId] = useState(1);
    const [imageError, setImageError] = useState(false);

    useEffect(() => {
        document.title = "College of Business Management - City College of Cagayan de Oro";
    }, []);

    const textVariants = {
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

    const contentContainerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
            },
        },
    };

    const contentItemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: 'spring',
                stiffness: 100,
                damping: 15,
            },
        },
    };

    const menuItems = [
        { id: 1, label: 'About' },
        { id: 2, label: 'Mission' },
        { id: 3, label: 'Vision' },
        { id: 4, label: 'Core Values' },
        { id: 5, label: 'Programs Offered' },
        { id: 6, label: 'Faculty Leadership' },
        { id: 7, label: 'Research' },
        { id: 8, label: 'News & Articles' },
    ];

    const renderContent = () => {
        switch (selectedMenuId) {
            case 1:
                return <AboutContent />;
            case 2:
                return <MissionContent />;
            case 3:
                return <VisionContent />;
            case 4:
                return <CoreValuesContent />;
            case 5:
                return <ProgramsContent />;
            case 6:
                return <FacultyContent />;
            case 7:
                return <ResearchContent />;
            case 8:
                return <NewsContent />;
            default:
                return <AboutContent />;
        }
    };

    return (
        <MainLayout 
            maxWidth="full" 
            containerClassName="px-0" 
            mainClassName="py-0" 
            className="overflow-hidden pb-0"
        >
            {/* Hero Banner with Image */}
            <div 
                className="relative w-full bg-cover bg-center bg-no-repeat shadow-lg min-h-[350px] md:min-h-[450px] lg:min-h-[550px] flex items-center justify-center"
                style={{
                    backgroundImage: imageError ? 'none' : `url(${cedBanner})`,
                    backgroundColor: imageError ? '#1a365d' : 'transparent',
                }}
            >
                {imageError && (
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-900 to-blue-700"></div>
                )}
                {/* Dark Overlay for text readability */}
                <div className="absolute inset-0 bg-black/50"></div>
                
                <motion.div 
                    className="relative z-10 mx-auto max-w-5xl px-6 text-center"
                    initial="hidden"
                    animate="visible"
                    variants={{
                        visible: {
                            transition: {
                                staggerChildren: 0.2
                            }
                        }
                    }}
                >
                    <motion.h1 
                        variants={textVariants}
                        className="text-4xl font-bold tracking-tight text-white drop-shadow-md sm:text-5xl md:text-6xl"
                    >
                        College of Business Management
                    </motion.h1>
                    
                    <motion.p 
                        variants={textVariants}
                        className="mx-auto mt-4 max-w-2xl text-lg text-white/90 drop-shadow-md"
                    >
                        Developing future business leaders through innovative education and entrepreneurial excellence.
                    </motion.p>
                </motion.div>

                {/* Hidden img to detect load error */}
                <img
                    src={cedBanner}
                    alt=""
                    className="hidden"
                    onError={() => setImageError(true)}
                    onLoad={() => setImageError(false)}
                />
            </div>

            {/* Main Content with Sidebar Navigation */}
            <motion.div
                className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 md:py-16"
                variants={contentContainerVariants}
                initial="hidden"
                animate="visible"
            >
                <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
                    {/* Sidebar Navigation */}
                    <motion.div
                        className="w-full lg:w-[320px] shrink-0"
                        variants={contentItemVariants}
                    >
                        <div className="relative">
                            <nav className="flex flex-col gap-3">
                                {menuItems.map((item, index) => (
                                    <motion.button
                                        key={item.id}
                                        onClick={() => setSelectedMenuId(item.id)}
                                        className={`relative px-8 py-4 text-left font-medium rounded-2xl shadow-2xl transition-all duration-300 group overflow-hidden ${
                                            selectedMenuId === item.id
                                                ? 'bg-emerald-600 text-white border border-emerald-700'
                                                : 'text-gray-700 bg-white/90 backdrop-blur-md border border-white/30 hover:bg-emerald-50 hover:border-emerald-300 hover:text-emerald-700'
                                        }`}
                                        whileHover={{
                                            scale: 1.05,
                                            x: 12,
                                            y: -2,
                                            boxShadow: selectedMenuId === item.id 
                                                ? '0 30px 40px -10px rgba(16, 185, 129, 0.3), 0 15px 20px -10px rgba(16, 185, 129, 0.2)'
                                                : '0 30px 40px -10px rgba(16, 185, 129, 0.25), 0 15px 20px -10px rgba(16, 185, 129, 0.15)',
                                        }}
                                        whileTap={{ scale: 0.95 }}
                                        initial={{ opacity: 0, x: -40, y: 20 }}
                                        animate={{ opacity: 1, x: 0, y: 0 }}
                                        transition={{
                                            delay: index * 0.08,
                                            type: 'spring',
                                            stiffness: 250,
                                            damping: 18,
                                        }}
                                    >
                                        <span className={`absolute inset-0 ${
                                            selectedMenuId === item.id 
                                                ? 'bg-gradient-to-br from-emerald-500/40 to-transparent' 
                                                : 'bg-gradient-to-br from-emerald-400/20 to-transparent'
                                        } opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></span>
                                        <span className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-emerald-500/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 -translate-x-full group-hover:translate-x-full"></span>

                                        <span className="relative z-10 flex items-center justify-between">
                                            <span className="transition-colors duration-300 text-sm sm:text-base font-semibold drop-shadow-sm whitespace-nowrap">
                                                {item.label}
                                            </span>
                                            <span className={`opacity-0 group-hover:opacity-100 transform -translate-x-3 group-hover:translate-x-0 transition-all duration-300 font-bold ml-6 ${
                                                selectedMenuId === item.id ? 'text-white' : 'text-emerald-500'
                                            }`}>
                                                →
                                            </span>
                                        </span>
                                    </motion.button>
                                ))}
                            </nav>

                            <div className="absolute -top-4 -right-4 w-20 h-20 bg-emerald-200/30 rounded-full blur-2xl -z-10"></div>
                            <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-emerald-200/30 rounded-full blur-2xl -z-10"></div>
                        </div>
                    </motion.div>

                    {/* Content Area */}
                    <motion.div
                        className="flex-1 min-w-0"
                        variants={contentItemVariants}
                    >
                        {renderContent()}
                    </motion.div>
                </div>
            </motion.div>
        </MainLayout>
    );
}