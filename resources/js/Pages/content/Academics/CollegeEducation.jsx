import { useEffect } from 'react';
import MainLayout from '../../../layouts/MainLayout';
// 1. Import motion from framer-motion
import { motion } from 'framer-motion';

// 2. Import the banner image
import cedBanner from '../../../assets/banner/coe-banner.png';

export default function CollegeEducation() {
    useEffect(() => {
        document.title = "College of Education - City College of Cagayan de Oro";
    }, []);

    // 3. Banner Text Animation Variants
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

    // 4. New: Content Area Animation Variants (Staggered List)
    const contentContainerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15 // Delays each child by 0.15s
            }
        }
    };

    const contentItemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: { 
                type: "spring", 
                stiffness: 100, 
                damping: 15 
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
            {/* Hero Banner with Image */}
            <div 
                className="relative w-full bg-cover bg-center bg-no-repeat shadow-lg min-h-[350px] md:min-h-[450px] lg:min-h-[550px] flex items-center justify-center"
                style={{
                    backgroundImage: `url(${cedBanner})`
                }}
            >
                {/* Dark Overlay for text readability */}
                <div className="absolute inset-0 bg-black/50"></div>
                
                {/* Banner Text Animation */}
                <motion.div 
                    className="relative z-10 mx-auto max-w-5xl px-6 text-center"
                    initial="hidden"
                    animate="visible"
                    variants={{
                        visible: {
                            transition: {
                                staggerChildren: 0.2 // 0.2s delay between title and description
                            }
                        }
                    }}
                >
                    <motion.h1 
                        variants={textVariants}
                        className="text-4xl font-bold tracking-tight text-white drop-shadow-md sm:text-5xl md:text-6xl"
                    >
                        College of Education
                    </motion.h1>
                    
                    <motion.p 
                        variants={textVariants}
                        className="mx-auto mt-4 max-w-2xl text-lg text-white/90 drop-shadow-md"
                    >
                        Shaping the future of education through excellence in teaching, research, and community engagement.
                    </motion.p>
                </motion.div>
            </div>

            {/* 
               New Animated Main Content 
               Added motion.div and motion.section to animate the future content
            */}
            <motion.div 
                className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12 md:py-16"
                variants={contentContainerVariants}
                initial="hidden"
                animate="visible"
            >
                {/* Content area - Now wrapped with motion to animate children later */}
                <motion.div variants={contentItemVariants}>
                    {/* 
                       Placeholder for future content (e.g. specific Education articles, 
                       programs list, or mission/vision statements) 
                    */}
                    <div className="text-center text-gray-500 py-10 bg-gray-50 rounded-xl border border-dashed border-gray-300">
                        <p className="text-lg font-medium">Education department content will appear here.</p>
                        <p className="text-sm mt-2">(Articles specific to the College of Education)</p>
                    </div>
                </motion.div>
            </motion.div>
        </MainLayout>
    );
}