import { useEffect, useState } from 'react';
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

// ===== Detail components (only SDG 1 for now) =====
import Sdg1 from './SDG/sdg1';

const SDG_IMAGES = [
    { defaultImg: sdg1,  hoverImg: sdg_01, Detail: Sdg1 },
    { defaultImg: sdg2,  hoverImg: sdg_02, Detail: null },
    { defaultImg: sdg3,  hoverImg: sdg_03, Detail: null },
    { defaultImg: sdg4,  hoverImg: sdg_04, Detail: null },
    { defaultImg: sdg5,  hoverImg: sdg_05, Detail: null },
    { defaultImg: sdg6,  hoverImg: sdg_06, Detail: null },
    { defaultImg: sdg7,  hoverImg: sdg_07, Detail: null },
    { defaultImg: sdg8,  hoverImg: sdg_08, Detail: null },
    { defaultImg: sdg9,  hoverImg: null,   Detail: null },
    { defaultImg: sdg10, hoverImg: sdg_10, Detail: null },
    { defaultImg: sdg11, hoverImg: null,   Detail: null },
    { defaultImg: sdg12, hoverImg: null,   Detail: null },
    { defaultImg: sdg13, hoverImg: sdg_13, Detail: null },
    { defaultImg: sdg14, hoverImg: sdg_14, Detail: null },
    { defaultImg: sdg15, hoverImg: sdg_15, Detail: null },
    { defaultImg: sdg16, hoverImg: null,   Detail: null },
    { defaultImg: sdg17, hoverImg: sdg_17, Detail: null },
    { defaultImg: sdg,   hoverImg: null,   Detail: null },
];

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

    // In detail view, show the hover (flipped) image if available, otherwise default
    const detailImage = selectedItem
        ? (selectedItem.hoverImg || selectedItem.defaultImg)
        : null;

    // Get the detail component for the selected tile
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
                {/* Dark Overlay for text readability */}
                <div className="absolute inset-0 bg-black/50"></div>

                <AnimatedBannerText
                    title="Sustainable Development Goals"
                    description="City College of Cagayan de Oro uses the Sustainable Development Goals as a framework for institutional decision-making rather than as a set of occasional advocacy activities."
                />
            </div>

            {/* Two Containers: Left (all SDGs) + Right (text + image) */}
            <div className="w-full bg-gray-50 px-4 py-6 md:py-10">
                <div className="mx-auto max-w-7xl flex flex-col lg:flex-row gap-4 lg:gap-6 items-stretch">
                    {/* LEFT CONTAINER */}
                    <div className="relative w-full lg:w-1/2 bg-white overflow-hidden flex flex-col">
                        {!isDetailView ? (
                            <>
                                {/* GRID VIEW — 4 columns × 5 rows, aspect ratio locks tile shape so nothing crops */}
                                <div className="grid w-full grid-cols-4 grid-rows-5 aspect-[4/5]">
                                    {SDG_IMAGES.map((item, index) => {
                                        const isAutoFlipped = autoFlippedIndices[index];
                                        const isHovered = activeHoverIndex === index;

                                        const currentSrc = isHovered && item.hoverImg
                                            ? item.hoverImg
                                            : isAutoFlipped && item.hoverImg
                                                ? item.hoverImg
                                                : item.defaultImg;

                                        return (
                                            <img
                                                key={currentSrc}
                                                src={currentSrc}
                                                alt={`SDG ${index + 1}`}
                                                onClick={() => handleTileClick(index)}
                                                className={`w-full h-full object-contain bg-white transition-all duration-300 ease-in-out cursor-pointer animate-spin-in ${index === SDG_IMAGES.length - 1 ? 'animate-spin' : ''}`}
                                                onMouseEnter={() => item.hoverImg && setActiveHoverIndex(index)}
                                                onMouseLeave={() => setActiveHoverIndex(null)}
                                            />
                                        );
                                    })}
                                </div>

                                {/* YouTube Video BELOW the SDG grid — centered vertically and horizontally */}
                                <div className="flex-1 flex items-center justify-center p-4">
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
                                </div>
                            </>
                        ) : (
                            /* DETAIL VIEW — large flipped image only (no video) */
                            <div className="flex items-center justify-center w-full h-full min-h-[400px] md:min-h-[550px] p-4">
                                <img
                                    src={detailImage}
                                    alt={`SDG ${selectedIndex + 1}`}
                                    className="w-full h-auto max-h-[600px] object-contain rounded-lg animate-spin-in"
                                />
                            </div>
                        )}
                    </div>

                    {/* RIGHT CONTAINER */}
                    <div className="w-full lg:w-1/2 bg-white p-6 md:p-10 flex flex-col justify-center">
                        {!isDetailView ? (
                            /* DEFAULT RANKING VIEW */
                            <div className="text-center">
                                {/* Badge */}
                                <span className="mx-auto inline-block w-fit rounded-full border border-green-700 bg-transparent px-3 py-1 text-xs font-semibold uppercase tracking-wider text-green-700">
                                    Times Higher Education Impact Rankings
                                </span>

                                {/* Title */}
                                <h2 className="mt-4 text-2xl md:text-4xl font-extrabold text-green-700 leading-tight text-center">
                                    CCCDO's Inclusion in the THE Impact Rankings 2025
                                </h2>

                                {/* Accent bar */}
                                <div className="mx-auto mt-3 h-1 w-20 rounded-full bg-green-700" />

                                <p className="mt-5 text-sm md:text-base text-gray-700 leading-relaxed text-justify">
                                    CCCDO participates in the Times Higher Education Impact Rankings to
                                    assess how effectively its work supports the United Nations
                                    Sustainable Development Goals. Its inclusion in the 1000–1500 band
                                    of the <span className="font-semibold text-green-800">THE Impact Rankings 2025</span> marked
                                    a significant institutional milestone. For a relatively young
                                    institution, this recognition demonstrates that locally anchored
                                    programs can compete internationally when supported by clear
                                    outcomes and strong evidence.
                                </p>

                                <p className="mt-4 text-sm md:text-base text-gray-700 leading-relaxed text-justify">
                                    The College views the ranking as an external measure of institutional
                                    responsibility, not as a competition based on size, age, or resources.
                                    Participation highlights key areas for a public institution:
                                    educational access, student well-being, gender inclusion,
                                    environmental action, public engagement, governance, and
                                    partnerships. The ranking process has also prompted CCCDO to evaluate
                                    whether its policies and activities deliver consistent results across
                                    the institution.
                                </p>

                                <p className="mt-4 text-sm md:text-base text-gray-700 leading-relaxed text-justify">
                                    Its strategy centers on improving the quality of evidence behind every
                                    reported contribution. CCCDO is enhancing coordination among academic
                                    units, student services, research, extension, quality assurance, and
                                    internationalization to ensure that all documentation supports a
                                    unified institutional account. Special attention is given to SDGs
                                    where the College has significant work and where future interventions
                                    can achieve greater, measurable impact.
                                </p>

                                <p className="mt-4 text-sm md:text-base text-gray-700 leading-relaxed text-justify">
                                    The aim is to build the institutional discipline required to remain
                                    credible across successive assessment cycles. By refining its
                                    monitoring systems, widening partnerships, and directing resources
                                    toward documented social needs, CCCDO intends to make international
                                    recognition a consequence of sustained public service—not a substitute
                                    for it.
                                </p>

                                {/* Rank image moved BELOW the text */}
                                <div className="mt-7">
                                    <img
                                        src={sdgRank}
                                        alt="SDG Rank 2026"
                                        className="w-full h-auto object-contain mx-auto rounded-lg"
                                    />
                                </div>

                                <p className="mt-6 text-xs md:text-sm text-gray-500 italic text-center">
                                    Together, we continue to move forward — one goal at a time.
                                </p>
                            </div>
                        ) : (
                            /* SDG DETAIL COMPONENT */
                            DetailComponent ? (
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
                            )
                        )}
                    </div>
                </div>
            </div>

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