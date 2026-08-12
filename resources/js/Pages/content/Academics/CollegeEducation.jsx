import { useEffect } from 'react';
import MainLayout from '../../../layouts/MainLayout';
import { motion } from 'framer-motion';
import cedBanner from '../../../assets/banner/coe-banner.png';

export default function CollegeEducation() {
    useEffect(() => {
        document.title = "College of Education - City College of Cagayan de Oro";
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
                staggerChildren: 0.15
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

            <motion.div 
                className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12 md:py-16"
                variants={contentContainerVariants}
                initial="hidden"
                animate="visible"
            />
        </MainLayout>
    );
}