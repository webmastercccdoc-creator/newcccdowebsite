import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MainLayout from '../../../layouts/MainLayout';
import AnimatedBannerText from '../../../components/content/AnimatedBannerText';
import sdgBanner from '../../../assets/banner/extension-banner.png';
import sdgRank from '../../../assets/images/sdg-rank-2026.png';
import sdg1 from '../../../assets/images/sdg1.png';
import sdg2 from '../../../assets/images/sdg2.jpg';
import sdg3 from '../../../assets/images/sdg3.png';
import sdg4 from '../../../assets/images/sdg4.png';
import sdg5 from '../../../assets/images/sdg5.jpg';
import sdg6 from '../../../assets/images/sdg6.png';
import sdg7 from '../../../assets/images/sdg7.png';
import sdg8 from '../../../assets/images/sdg8.png';
import sdg9 from '../../../assets/images/sdg9.png';
import sdg10 from '../../../assets/images/sdg10.png';
import sdg11 from '../../../assets/images/sdg11.png';
import sdg12 from '../../../assets/images/sdg12.jpg';
import sdg13 from '../../../assets/images/sdg13.png';
import sdg14 from '../../../assets/images/sdg14.png';
import sdg15 from '../../../assets/images/sdg15.png';
import sdg16 from '../../../assets/images/sdg16.png';
import sdg17 from '../../../assets/images/sdg17.png';
import sdg from '../../../assets/logos/sdg.png';
import sdg_01 from '../../../assets/images/sdg_01.jpg';
import sdg_02 from '../../../assets/images/sdg_02.jpg';
import sdg_03 from '../../../assets/images/sdg_03.jpg';
import sdg_04 from '../../../assets/images/sdg_04.jpg';
import sdg_05 from '../../../assets/images/sdg_05.jpg';
import sdg_06 from '../../../assets/images/sdg_06.jpg';
import sdg_07 from '../../../assets/images/sdg_07.jpg';
import sdg_08 from '../../../assets/images/sdg_08.jpg';
import sdg_10 from '../../../assets/images/sdg_10.jpg';
import sdg_13 from '../../../assets/images/sdg_13.jpg';
import sdg_14 from '../../../assets/images/sdg_14.jpg';
import sdg_15 from '../../../assets/images/sdg_15.jpg';
import sdg_17 from '../../../assets/images/sdg_17.jpg';

// ===== Detail components =====
import Sdg1 from './SDG/sdg1';
import Sdg2 from './SDG/sdg2';
import Sdg3 from './SDG/sdg3';
import Sdg4 from './SDG/sdg4';
import Sdg5 from './SDG/sdg5';
import Sdg6 from './SDG/sdg6';
import Sdg7 from './SDG/sdg7';
import Sdg8 from './SDG/sdg8';
import Sdg9 from './SDG/sdg9';
import Sdg10 from './SDG/sdg10';
import Sdg11 from './SDG/sdg11';
import Sdg12 from './SDG/sdg12';
import Sdg13 from './SDG/sdg13';
import Sdg14 from './SDG/sdg14';
import Sdg15 from './SDG/sdg15';
import Sdg16 from './SDG/sdg16';
import Sdg17 from './SDG/sdg17';

const SDG_IMAGES = [
    { defaultImg: sdg1,  hoverImg: sdg_01, Detail: Sdg1 },
    { defaultImg: sdg2,  hoverImg: sdg_02, Detail: Sdg2 },
    { defaultImg: sdg3,  hoverImg: sdg_03, Detail: Sdg3 },
    { defaultImg: sdg4,  hoverImg: sdg_04, Detail: Sdg4 },
    { defaultImg: sdg5,  hoverImg: sdg_05, Detail: Sdg5 },
    { defaultImg: sdg6,  hoverImg: sdg_06, Detail: Sdg6 },
    { defaultImg: sdg7,  hoverImg: sdg_07, Detail: Sdg7 },
    { defaultImg: sdg8,  hoverImg: sdg_08, Detail: Sdg8 },
    { defaultImg: sdg9,  hoverImg: null,   Detail: Sdg9 },
    { defaultImg: sdg10, hoverImg: sdg_10, Detail: Sdg10 },
    { defaultImg: sdg11, hoverImg: null,   Detail: Sdg11 },
    { defaultImg: sdg12, hoverImg: null,   Detail: Sdg12 },
    { defaultImg: sdg13, hoverImg: sdg_13, Detail: Sdg13 },
    { defaultImg: sdg14, hoverImg: sdg_14, Detail: Sdg14 },
    { defaultImg: sdg15, hoverImg: sdg_15, Detail: Sdg15 },
    { defaultImg: sdg16, hoverImg: null,   Detail: Sdg16 },
    { defaultImg: sdg17, hoverImg: sdg_17, Detail: Sdg17 },
    { defaultImg: sdg,   hoverImg: null,   Detail: null  }, // college logo tile
];

// Animation variants
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.05, delayChildren: 0.1 },
    },
};

const tileVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: { type: 'spring', stiffness: 260, damping: 20 },
    },
};

const fadeUpVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: 'easeOut' },
    },
};

const paragraphVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: 'easeOut' },
    },
};

export default function SDG() {
    useEffect(() => {
        document.title = "Sustainable Development Goals - City College of Cagayan de Oro";
    }, []);

    const [autoFlippedIndices, setAutoFlippedIndices] = useState({});
    const [activeHoverIndex, setActiveHoverIndex] = useState(null);
    const [selectedIndex, setSelectedIndex] = useState(null);

    useEffect(() => {
        const triggerRandomFlip = () => {
            const randomIndex = Math.floor(Math.random() * SDG_IMAGES.length);
            const item = SDG_IMAGES[randomIndex];

            if (item.hoverImg) {
                setAutoFlippedIndices((prev) => ({
                    ...prev,
                    [randomIndex]: true,
                }));

                const flipBackDelay = 2000 + Math.random() * 2000;
                setTimeout(() => {
                    setAutoFlippedIndices((prev) => ({
                        ...prev,
                        [randomIndex]: false,
                    }));
                }, flipBackDelay);
            }
        };

        const intervalId = setInterval(() => {
            triggerRandomFlip();
        }, 2000 + Math.random() * 3000);

        return () => clearInterval(intervalId);
    }, []);

    const handleTileClick = (index) => {
        setSelectedIndex(index);
    };

    const handleBack = () => {
        setSelectedIndex(null);
    };

    const isDetailView = selectedIndex !== null;
    const selectedItem = isDetailView ? SDG_IMAGES[selectedIndex] : null;

    const detailImage = selectedItem
        ? (selectedItem.hoverImg || selectedItem.defaultImg)
        : null;

    const DetailComponent = selectedItem?.Detail;

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
                    backgroundImage: `url('${sdgBanner}')`
                }}
            >
                <div className="absolute inset-0 bg-black/50"></div>

                <AnimatedBannerText
                    title="Sustainable Development Goals"
                    description="City College of Cagayan de Oro uses the Sustainable Development Goals as a framework for institutional decision-making rather than as a set of occasional advocacy activities."
                />
            </div>

            {/* ===== SINGLE FULL-WIDTH CONTAINER (DETAIL VIEW) ===== */}
            {isDetailView && DetailComponent ? (
                <div className="w-full bg-gray-50 px-4 py-6 md:py-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.4, ease: 'easeOut' }}
                        className="mx-auto w-full max-w-[80rem] bg-white rounded-lg shadow-sm p-6 md:p-10"
                    >
                        <DetailComponent onBack={handleBack} />
                    </motion.div>
                </div>
            ) : (
                /* ===== TWO CONTAINERS (GRID VIEW + FALLBACK DETAIL) ===== */
                <div className="w-full bg-gray-50 px-4 py-6 md:py-10">
                    <div className="mx-auto max-w-7xl flex flex-col lg:flex-row gap-4 lg:gap-6 items-stretch">
                        {/* LEFT CONTAINER */}
                        <motion.div
                            initial={{ opacity: 0, x: -40 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, ease: 'easeOut' }}
                            className="relative w-full lg:w-1/2 bg-white overflow-hidden flex flex-col"
                        >
                            <AnimatePresence mode="wait">
                                {!isDetailView ? (
                                    <motion.div
                                        key="grid-view"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="flex flex-col h-full"
                                    >
                                        {/* GRID VIEW */}
                                        <motion.div
                                            variants={containerVariants}
                                            initial="hidden"
                                            animate="visible"
                                            className="grid w-full grid-cols-4 grid-rows-5 aspect-[4/5]"
                                        >
                                            {SDG_IMAGES.map((item, index) => {
                                                const isAutoFlipped = autoFlippedIndices[index];
                                                const isHovered = activeHoverIndex === index;

                                                const currentSrc = isHovered && item.hoverImg
                                                    ? item.hoverImg
                                                    : isAutoFlipped && item.hoverImg
                                                        ? item.hoverImg
                                                        : item.defaultImg;

                                                return (
                                                    <motion.div
                                                        key={index}
                                                        variants={tileVariants}
                                                        whileHover={{ scale: 1.08, zIndex: 10 }}
                                                        whileTap={{ scale: 0.95 }}
                                                        onClick={() => handleTileClick(index)}
                                                        className="relative w-full h-full bg-white border-2 border-white transition-all duration-300 ease-in-out cursor-pointer overflow-hidden"
                                                        onMouseEnter={() => item.hoverImg && setActiveHoverIndex(index)}
                                                        onMouseLeave={() => setActiveHoverIndex(null)}
                                                    >
                                                        <img
                                                            key={currentSrc}
                                                            src={currentSrc}
                                                            alt={`SDG ${index + 1}`}
                                                            className="absolute inset-0 w-full h-full object-contain animate-spin-in"
                                                        />
                                                    </motion.div>
                                                );
                                            })}
                                        </motion.div>

                                        {/* YouTube Video */}
                                        <motion.div
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.6, delay: 0.3 }}
                                            className="flex-1 flex items-center justify-center p-4"
                                        >
                                            <div className="relative w-full max-w-2xl" style={{ paddingBottom: '56.25%' }}>
                                                <iframe
                                                    className="absolute top-0 left-0 w-full h-full rounded-lg"
                                                    src="https://www.youtube.com/embed/0XTBYMfZyrM?start=8"
                                                    title="Do you know all 17 SDGs?"
                                                    frameBorder="0"
                                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                                    allowFullScreen
                                                ></iframe>
                                            </div>
                                        </motion.div>
                                    </motion.div>
                                ) : (
                                    /* DETAIL VIEW (fallback for SDGs without Detail component) */
                                    <motion.div
                                        key="detail-view"
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        transition={{ duration: 0.4, ease: 'easeOut' }}
                                        className="flex items-center justify-center w-full h-full min-h-[400px] md:min-h-[550px] p-4"
                                    >
                                        <img
                                            src={detailImage}
                                            alt={`SDG ${selectedIndex + 1}`}
                                            className="w-full h-auto max-h-[600px] object-contain rounded-lg animate-spin-in"
                                        />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>

                        {/* RIGHT CONTAINER */}
                        <motion.div
                            initial={{ opacity: 0, x: 40 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, ease: 'easeOut' }}
                            className="w-full lg:w-1/2 bg-white p-6 md:p-10 flex flex-col justify-center"
                        >
                            {!isDetailView ? (
                                <motion.div
                                    variants={containerVariants}
                                    initial="hidden"
                                    animate="visible"
                                    className="text-center"
                                >
                                    {/* Title */}
                                    <motion.h2
                                        variants={fadeUpVariants}
                                        className="text-2xl md:text-4xl font-extrabold text-green-700 leading-tight text-center"
                                    >
                                        Localizing the Global Goals: <span className="text-green-700">CCCDO's SDG Journey</span>
                                    </motion.h2>

                                    {/* Accent bar */}
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: 80 }}
                                        transition={{ duration: 0.8, delay: 0.3 }}
                                        className="mx-auto mt-3 h-1 rounded-full bg-green-700"
                                    />

                                    <motion.p variants={paragraphVariants} className="mt-5 text-sm md:text-base text-gray-700 leading-relaxed text-justify">
                                        City College of Cagayan de Oro uses the <span className="text-green-700 font-semibold">Sustainable Development Goals</span> as a
                                        framework for <span className="text-green-700 font-semibold">institutional decision-making</span> rather than as a set of occasional
                                        advocacy activities. The College aims to ensure that <span className="text-green-700 font-semibold">teaching, research, student
                                        development, community engagement, and campus operations</span> address the needs of
                                        Cagayan de Oro communities. This approach aligns with the College's public
                                        mandate to <span className="text-green-700 font-semibold">expand educational access</span> and deliver knowledge and services with
                                        clear social value.
                                    </motion.p>

                                    <motion.p variants={paragraphVariants} className="mt-4 text-sm md:text-base text-gray-700 leading-relaxed text-justify">
                                        The College's SDG efforts are evident in programs linking education to <span className="text-green-700 font-semibold">poverty
                                        reduction, health, inclusion, environmental responsibility, and partnerships</span>.
                                        Notable initiatives include the <span className="text-green-700 font-semibold">Technical and Vocational Scholarship Program</span>,
                                        which provided <span className="text-green-700 font-semibold">₱900,548 in assistance to 44 scholars</span>; disaster-preparedness
                                        activities with about <span className="text-green-700 font-semibold">500 participants</span>; an <span className="text-green-700 font-semibold">Indigenous Peoples Roadshow</span>; and an
                                        inclusion caravan reaching approximately <span className="text-green-700 font-semibold">1,200 individuals</span>. Environmental
                                        initiatives, such as <span className="text-green-700 font-semibold">mangrove activities and improved waste management</span>, further
                                        show that sustainability is addressed through measurable campus and community
                                        practices.
                                    </motion.p>

                                    <motion.p variants={paragraphVariants} className="mt-4 text-sm md:text-base text-gray-700 leading-relaxed text-justify">
                                        CCCDO's strategy is to <span className="text-green-700 font-semibold">integrate SDG alignment at the outset of every
                                        institutional initiative</span>. Programs, research, extension activities, and
                                        international engagements are expected to identify their <span className="text-green-700 font-semibold">beneficiaries,
                                        relevant SDGs, measurable outcomes, and supporting evidence</span>. This approach
                                        enables the College to assess whether its interventions <span className="text-green-700 font-semibold">improve access,
                                        strengthen participation, reduce barriers, or deliver sustainable community
                                        benefits</span>.
                                    </motion.p>

                                    <motion.p variants={paragraphVariants} className="mt-4 text-sm md:text-base text-gray-700 leading-relaxed text-justify">
                                        The College plans to develop a more <span className="text-green-700 font-semibold">integrated SDG evidence system</span> that
                                        connects offices, academic programs, research units, and community partners.
                                        The goal is to provide a credible account of how a young local college
                                        translates <span className="text-green-700 font-semibold">global commitments into local outcomes</span>, rather than seeking
                                        visibility for its own sake. For CCCDO, <span className="text-green-700 font-semibold">international recognition should
                                        result from the depth and impact of its work</span> in the city it serves.
                                    </motion.p>

                                    {/* Rank image */}
                                    <motion.div
                                        initial={{ opacity: 0, y: 30 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.6, delay: 0.5 }}
                                        className="mt-7"
                                    >
                                        <img
                                            src={sdgRank}
                                            alt="SDG Rank 2026"
                                            className="w-full h-auto object-contain mx-auto rounded-lg"
                                        />
                                    </motion.div>

                                    <motion.p
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ duration: 0.6, delay: 0.7 }}
                                        className="mt-6 text-xs md:text-sm text-gray-500 italic text-center"
                                    >
                                        Together, we continue to move forward — <span className="text-green-700 font-semibold">one goal at a time</span>.
                                    </motion.p>
                                </motion.div>
                            ) : (
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key="detail-component"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        transition={{ duration: 0.4 }}
                                    >
                                        {DetailComponent ? (
                                            <DetailComponent onBack={handleBack} />
                                        ) : (
                                            <div className="text-center text-gray-500">
                                                <p>No content available for this SDG.</p>
                                                <button
                                                    type="button"
                                                    onClick={handleBack}
                                                    className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-green-700 transition-colors"
                                                >
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                                    </svg>
                                                    Back to all SDGs
                                                </button>
                                            </div>
                                        )}
                                    </motion.div>
                                </AnimatePresence>
                            )}
                        </motion.div>
                    </div>
                </div>
            )}

            {/* Empty Main Content */}
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12 md:py-16">
                {/* Content area - empty */}
            </div>

            <style>{`
                @keyframes spinIn {
                    0% {
                        transform: rotateY(0deg) scale(1);
                        opacity: 1;
                    }
                    50% {
                        transform: rotateY(180deg) scale(0.8);
                        opacity: 0;
                    }
                    100% {
                        transform: rotateY(360deg) scale(1);
                        opacity: 1;
                    }
                }
                .animate-spin-in {
                    animation: spinIn 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards;
                }
            `}</style>
        </MainLayout>
    );
}