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
    hidden: { opacity: 0, scale: 0.8, y: 20 },
    visible: {
        opacity: 1,
        scale: 1,
        y: 0,
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

    const [activeHoverIndex, setActiveHoverIndex] = useState(null);
    const [selectedIndex, setSelectedIndex] = useState(null);

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

            {/* ===== DETAIL VIEW (full width) ===== */}
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
                /* ===== ROW 1: SDG GRID | ROW 2: CONTENT | ROW 3: VIDEO ===== */
                <div className="w-full bg-gray-50 px-4 py-6 md:py-10 overflow-hidden">
                    <div className="mx-auto w-full max-w-[90rem] flex flex-col gap-8">

                        {/* ===== ROW 1: SDG GRID ===== */}
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.6, ease: 'easeOut' }}
                            className="w-full bg-white p-4 md:p-8 rounded-lg shadow-sm"
                        >
                            {/* SDG Section Title & Description */}
                            <motion.div 
                                initial={{ opacity: 0, y: -10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5 }}
                                className="mb-8 border-b border-gray-200 pb-5 text-center"
                            >
                                <h3 className="text-2xl md:text-3xl lg:text-4xl font-extrabold">
                                    <span className="text-green-700">The 17 Goals for a</span>{' '}
                                    <span className="text-amber-500">Better Future</span>
                                </h3>
                                <p className="text-sm md:text-base text-gray-600 mt-3">Click any goal to explore its local impact.</p>
                            </motion.div>

                            <motion.div
                                variants={containerVariants}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, margin: "-50px" }}
                                className="grid w-full mx-auto grid-cols-6 grid-rows-3 aspect-[2/1] gap-1"
                            >
                                {SDG_IMAGES.map((item, index) => {
                                    const isHovered = activeHoverIndex === index;
                                    const hasHoverImg = !!item.hoverImg;

                                    return (
                                        <motion.div
                                            key={index}
                                            variants={tileVariants}
                                            whileHover={{ scale: 1.1, zIndex: 10, y: -5 }}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={() => handleTileClick(index)}
                                            className="relative w-full h-full bg-white transition-all duration-300 ease-in-out cursor-pointer perspective-1000"
                                            onMouseEnter={() => hasHoverImg && setActiveHoverIndex(index)}
                                            onMouseLeave={() => setActiveHoverIndex(null)}
                                        >
                                            <motion.div
                                                className="w-full h-full relative preserve-3d"
                                                animate={{ rotateY: isHovered ? 180 : 0 }}
                                                transition={{ duration: 0.6, type: "spring", stiffness: 200, damping: 20 }}
                                            >
                                                {/* Front (Default Image) */}
                                                <div className="absolute inset-0 backface-hidden">
                                                    <img
                                                        src={item.defaultImg}
                                                        alt={`SDG ${index + 1}`}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                                
                                                {/* Back (Hover Image) */}
                                                {hasHoverImg && (
                                                    <div className="absolute inset-0 backface-hidden [transform:rotateY(180deg)]">
                                                        <img
                                                            src={item.hoverImg}
                                                            alt={`SDG ${index + 1} Impact`}
                                                            className="w-full h-full object-cover"
                                                        />
                                                    </div>
                                                )}
                                            </motion.div>
                                        </motion.div>
                                    );
                                })}
                            </motion.div>
                        </motion.div>

                        {/* ===== ROW 2: CONTENT ===== */}
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.6, ease: 'easeOut' }}
                            className="w-full bg-white p-6 md:p-10 rounded-lg shadow-sm"
                        >
                            <motion.div
                                variants={containerVariants}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, margin: "-50px" }}
                                className="text-center"
                            >
                                {/* Title - Green and Gold */}
                                <motion.h2
                                    variants={fadeUpVariants}
                                    className="text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight text-center"
                                >
                                    <span className="text-green-700">Localizing the Global Goals:</span>{' '}
                                    <span className="text-amber-500">CCCDO's SDG Journey</span>
                                </motion.h2>

                                {/* Accent bar - Green to Gold Gradient */}
                                <motion.div
                                    initial={{ width: 0 }}
                                    whileInView={{ width: 120 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.8, delay: 0.4 }}
                                    className="mx-auto mt-5 h-1.5 rounded-full bg-gradient-to-r from-green-600 to-amber-400"
                                />

                                <motion.p variants={paragraphVariants} className="mt-6 text-sm md:text-base text-gray-700 leading-relaxed text-justify">
                                    City College of Cagayan de Oro uses the Sustainable Development Goals as a
                                    framework for institutional decision-making rather than as a set of occasional
                                    advocacy activities. The College aims to ensure that teaching, research, student
                                    development, community engagement, and campus operations address the needs of
                                    Cagayan de Oro communities. This approach aligns with the College's public
                                    mandate to expand educational access and deliver knowledge and services with
                                    clear social value.
                                </motion.p>

                                <motion.p variants={paragraphVariants} className="mt-4 text-sm md:text-base text-gray-700 leading-relaxed text-justify">
                                    The College's SDG efforts are evident in programs linking education to poverty
                                    reduction, health, inclusion, environmental responsibility, and partnerships.
                                    Notable initiatives include the Technical and Vocational Scholarship Program,
                                    which provided ₱900,548 in assistance to 44 scholars; disaster-preparedness
                                    activities with about 500 participants; an Indigenous Peoples Roadshow; and an
                                    inclusion caravan reaching approximately 1,200 individuals. Environmental
                                    initiatives, such as mangrove activities and improved waste management, further
                                    show that sustainability is addressed through measurable campus and community
                                    practices.
                                </motion.p>

                                <motion.p variants={paragraphVariants} className="mt-4 text-sm md:text-base text-gray-700 leading-relaxed text-justify">
                                    CCCDO's strategy is to integrate SDG alignment at the outset of every
                                    institutional initiative. Programs, research, extension activities, and
                                    international engagements are expected to identify their beneficiaries,
                                    relevant SDGs, measurable outcomes, and supporting evidence. This approach
                                    enables the College to assess whether its interventions improve access,
                                    strengthen participation, reduce barriers, or deliver sustainable community
                                    benefits.
                                </motion.p>

                                <motion.p variants={paragraphVariants} className="mt-4 text-sm md:text-base text-gray-700 leading-relaxed text-justify">
                                    The College plans to develop a more integrated SDG evidence system that
                                    connects offices, academic programs, research units, and community partners.
                                    The goal is to provide a credible account of how a young local college
                                    translates global commitments into local outcomes, rather than seeking
                                    visibility for its own sake. For CCCDO, international recognition should
                                    result from the depth and impact of its work in the city it serves.
                                </motion.p>

                                {/* Rank image */}
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9, y: 30 }}
                                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.7, delay: 0.3, type: 'spring', bounce: 0.3 }}
                                    className="mt-7"
                                >
                                    <img
                                        src={sdgRank}
                                        alt="SDG Rank 2026"
                                        className="w-full h-auto object-contain mx-auto rounded-lg shadow-sm"
                                    />
                                </motion.div>

                                <motion.p
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6, delay: 0.6 }}
                                    className="mt-6 text-xs md:text-sm text-gray-500 italic text-center"
                                >
                                    Together, we continue to move forward — one goal at a time.
                                </motion.p>
                            </motion.div>
                        </motion.div>

                        {/* ===== ROW 3: YOUTUBE VIDEO ===== */}
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.6, ease: 'easeOut' }}
                            className="w-full bg-white p-4 md:p-8 rounded-lg shadow-sm flex flex-col items-center justify-center"
                        >
                            {/* Video Section Title & Description */}
                            <motion.div 
                                initial={{ opacity: 0, y: -10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5 }}
                                className="mb-8 w-full border-b border-gray-200 pb-5 text-center"
                            >
                                <h3 className="text-2xl md:text-3xl lg:text-4xl font-extrabold">
                                    <span className="text-green-700">Watch:</span>{' '}
                                    <span className="text-amber-500">Do you know all 17 SDGs?</span>
                                </h3>
                                <p className="text-sm md:text-base text-gray-600 mt-3">A quick overview of the global goals and how they connect.</p>
                            </motion.div>

                            <motion.div 
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.3 }}
                                className="relative w-full max-w-4xl" 
                                style={{ paddingBottom: '56.25%' }}
                            >
                                <iframe
                                    className="absolute top-0 left-0 w-full h-full rounded-lg shadow-md"
                                    src="https://www.youtube.com/embed/0XTBYMfZyrM?start=8"
                                    title="Do you know all 17 SDGs?"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                    allowFullScreen
                                ></iframe>
                            </motion.div>
                        </motion.div>

                        {/* Fallback detail view for tiles without a Detail component */}
                        <AnimatePresence>
                            {isDetailView && !DetailComponent && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.4 }}
                                    className="w-full bg-white p-6 md:p-10 rounded-lg shadow-sm"
                                >
                                    <div className="text-center text-gray-500">
                                        <p>No content available for this SDG.</p>
                                        <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            type="button"
                                            onClick={handleBack}
                                            className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-green-700 transition-colors"
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                            </svg>
                                            Back to all SDGs
                                        </motion.button>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                    </div>
                </div>
            )}

            {/* Empty Main Content */}
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12 md:py-16">
                {/* Content area - empty */}
            </div>

            {/* CSS for 3D Flip Effect */}
            <style>{`
                .perspective-1000 {
                    perspective: 1000px;
                }
                .preserve-3d {
                    transform-style: preserve-3d;
                }
                .backface-hidden {
                    backface-visibility: hidden;
                }
            `}</style>
        </MainLayout>
    );
}