import { useEffect } from 'react';
import MainLayout from '../../../../layouts/MainLayout';
import { motion } from 'framer-motion';
import cedBanner from '../../../../assets/banner/coe-banner.png';
import sdg4Image from '../../../../assets/images/sdg4.png';
import sdg8Image from '../../../../assets/images/sdg8.png';

const textVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            type: 'spring',
            stiffness: 100,
            damping: 12,
        },
    },
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

export function AboutContent() {
    return (
        <motion.div
            className="bg-white rounded-2xl shadow-xl p-6 md:p-10 border border-gray-100"
            variants={contentItemVariants}
        >
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Welcome to College of Education</h2>

            <div className="prose prose-lg max-w-none text-gray-600 leading-relaxed">
                <p className="mb-4">
                    Our college offered two dynamic and essential programs: the
                    <strong className="text-green-700"> Bachelor of Technical Vocational Teacher Education (BTVTED)</strong>
                    major in Electrical Technology and the
                    <strong className="text-green-700"> Bachelor of Technology and Livelihood Education (BTLEd)</strong>
                    major in Industrial Arts.
                </p>

                <p className="mb-4">
                    Anchored on the principles of
                    <strong className="text-green-700"> Sustainable Development Goal 4 (Quality Education)</strong> and
                    <strong className="text-green-700"> SDG 8 (Decent Work and Economic Growth)</strong>,
                    these programs seek to empower learners through quality technical-vocational education that
                    promotes innovation, employability, and lifelong learning.
                </p>

                <p className="mb-4">
                    Guided by the LGU's development framework, the College endeavors to nurture graduates who
                    will contribute to local productivity, environmental stewardship, and inclusive education,
                    ensuring that every learner becomes a catalyst for progress in their communities.
                </p>
            </div>

            {/* SDG Goals Section with Images */}
            <div className="mt-8 pt-8 border-t border-gray-200">
                <h3 className="text-xl font-semibold text-gray-800 mb-6">Our Commitment to Sustainable Development</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow duration-300 text-center">
                        <div className="flex justify-center mb-4">
                            <img 
                                src={sdg4Image} 
                                alt="SDG 4 - Quality Education" 
                                className="w-24 h-24 object-contain"
                            />
                        </div>
                        <h4 className="font-semibold text-green-700 text-lg mb-2">SDG 4</h4>
                        <p className="text-sm text-gray-600">Quality Education - Ensuring inclusive and equitable quality education</p>
                    </div>
                    <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow duration-300 text-center">
                        <div className="flex justify-center mb-4">
                            <img 
                                src={sdg8Image} 
                                alt="SDG 8 - Decent Work and Economic Growth" 
                                className="w-24 h-24 object-contain"
                            />
                        </div>
                        <h4 className="font-semibold text-green-700 text-lg mb-2">SDG 8</h4>
                        <p className="text-sm text-gray-600">Decent Work and Economic Growth - Promoting sustained and inclusive economic growth</p>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

export default function About() {
    useEffect(() => {
        document.title = 'About - College of Education - City College of Cagayan de Oro';
    }, []);

    return (
        <MainLayout
            maxWidth="full"
            containerClassName="px-0"
            mainClassName="py-0"
            className="overflow-hidden pb-0"
        >
            <div
                className="relative w-full bg-cover bg-center bg-no-repeat shadow-lg min-h-[350px] md:min-h-[450px] lg:min-h-[550px] flex items-center justify-center"
                style={{
                    backgroundImage: `url(${cedBanner})`,
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
                                staggerChildren: 0.2,
                            },
                        },
                    }}
                >
                    <motion.h1
                        variants={textVariants}
                        className="text-4xl font-bold tracking-tight text-white drop-shadow-md sm:text-5xl md:text-6xl"
                    >
                        About the College
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
                className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 md:py-16"
                variants={contentContainerVariants}
                initial="hidden"
                animate="visible"
            >
                <div className="max-w-4xl mx-auto">
                    <AboutContent />
                </div>
            </motion.div>
        </MainLayout>
    );
}