import { useEffect } from 'react';
import MainLayout from '../../../layouts/MainLayout';
// 1. Import motion from framer-motion
import { motion } from 'framer-motion';

// 2. Import the banner image
import casBanner from '../../../assets/banner/cas-banner.png';

export default function CollegeArtsSciences() {
    useEffect(() => {
        document.title = "College of Arts and Sciences - City College of Cagayan de Oro";
    }, []);

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
                    backgroundImage: `url(${casBanner})`
                }}
            >
                {/* Dark Overlay for text readability */}
                <div className="absolute inset-0 bg-black/50"></div>
                
                {/* 3. Define animation variants and wrap text in a motion container */}
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
                    {/* Animated Title */}
                    <motion.h1 
                        variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 12 } } }}
                        className="text-4xl font-bold tracking-tight text-white drop-shadow-md sm:text-5xl md:text-6xl"
                    >
                        College of Arts and Sciences
                    </motion.h1>
                    
                    {/* Animated Description */}
                    <motion.p 
                        variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 12 } } }}
                        className="mx-auto mt-4 max-w-2xl text-lg text-white/90 drop-shadow-md"
                    >
                        Fostering critical thinking and holistic development through diverse academic disciplines.
                    </motion.p>
                </motion.div>
            </div>

            {/* Empty Main Content */}
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12 md:py-16">
                {/* Content area - empty */}
            </div>
        </MainLayout>
    );
}