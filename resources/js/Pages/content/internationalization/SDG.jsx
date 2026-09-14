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

const SDG_IMAGES = [
    { defaultImg: sdg1, hoverImg: sdg_01 },
    { defaultImg: sdg2, hoverImg: sdg_02 },
    { defaultImg: sdg3, hoverImg: sdg_03 },
    { defaultImg: sdg4, hoverImg: sdg_04 },
    { defaultImg: sdg5, hoverImg: sdg_05 },
    { defaultImg: sdg6, hoverImg: sdg_06 },
    { defaultImg: sdg7, hoverImg: sdg_07 },
    { defaultImg: sdg8, hoverImg: sdg_08 },
    { defaultImg: sdg9, hoverImg: null },
    { defaultImg: sdg10, hoverImg: sdg_10 },
    { defaultImg: sdg11, hoverImg: null },
    { defaultImg: sdg12, hoverImg: null },
    { defaultImg: sdg13, hoverImg: sdg_13 },
    { defaultImg: sdg14, hoverImg: sdg_14 },
    { defaultImg: sdg15, hoverImg: sdg_15 },
    { defaultImg: sdg16, hoverImg: null },
    { defaultImg: sdg17, hoverImg: sdg_17 },
    { defaultImg: sdg, hoverImg: null },
];

export default function SDG() {
    useEffect(() => {
        document.title = "Sustainable Development Goals - City College of Cagayan de Oro";
    }, []);

    const [autoFlippedIndices, setAutoFlippedIndices] = useState({});
    const [activeHoverIndex, setActiveHoverIndex] = useState(null);
    const [showClickMe, setShowClickMe] = useState(true);

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
                    description="Advancing sustainable development and global responsibility through education, action, and community impact."
                />
            </div>

            {/* Two Containers: Left (all SDGs) + Right (text + image) */}
            <div className="w-full bg-gray-50 px-4 py-6 md:py-10">
                <div className="mx-auto max-w-7xl flex flex-col lg:flex-row gap-4 lg:gap-6 items-stretch">
                    {/* LEFT CONTAINER — all 18 SDG items + centered floating button (no bg) */}
                    <div className="relative w-full lg:w-1/2 bg-white rounded-lg shadow-md overflow-hidden">
                        <div className="grid w-full h-full grid-cols-4 auto-rows-fr">
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
                                        className={`w-full h-full object-cover ring-1 ring-white transition-all duration-300 ease-in-out cursor-pointer animate-spin-in ${index === SDG_IMAGES.length - 1 ? 'animate-spin' : ''}`}
                                        onMouseEnter={() => item.hoverImg && setActiveHoverIndex(index)}
                                        onMouseLeave={() => setActiveHoverIndex(null)}
                                    />
                                );
                            })}
                        </div>

                        {/* ===== CENTERED FLOATING "CLICK ME" BUTTON — NO BACKGROUND ===== */}
                        {showClickMe && (
                            <button
                                type="button"
                                onClick={() => setShowClickMe(false)}
                                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 bg-transparent border-none text-white font-extrabold uppercase tracking-widest text-lg md:text-2xl drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)] animate-bounce cursor-pointer"
                            >
                                Click Me
                            </button>
                        )}
                    </div>

                    {/* RIGHT CONTAINER — text + rank image */}
                    <div className="w-full lg:w-1/2 bg-white rounded-lg shadow-md p-6 md:p-10 flex flex-col justify-center text-center">
                        {/* Badge */}
                        <span className="mx-auto inline-block w-fit rounded-full border border-green-700 bg-transparent px-3 py-1 text-xs font-semibold uppercase tracking-wider text-green-700">
                            SDG Ranking Update
                        </span>

                        {/* Title */}
                        <h2 className="mt-4 text-2xl md:text-4xl font-extrabold text-green-700 leading-tight text-center">
                            City College of Cagayan de Oro Climbs to a Higher SDG Rank
                        </h2>

                        {/* Accent bar */}
                        <div className="mx-auto mt-3 h-1 w-20 rounded-full bg-green-700" />

                        <p className="mt-5 text-sm md:text-base text-gray-700 leading-relaxed text-left">
                            City College of Cagayan de Oro continues to strengthen its commitment
                            to the Sustainable Development Goals. Compared to last year's ranking,
                            the institution has achieved a <span className="font-semibold text-green-800">higher SDG rank this year</span>,
                            reflecting measurable progress in education, community engagement,
                            sustainability practices, and social impact.
                        </p>

                        <p className="mt-4 text-sm md:text-base text-gray-700 leading-relaxed text-left">
                            This improvement is the result of sustained efforts across teaching,
                            research, extension programs, and partnerships — all aligned with the
                            17 SDGs. The college remains dedicated to advancing global
                            responsibility and creating lasting, positive change within the
                            community and beyond.
                        </p>

                        {/* Rank image below text */}
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