import { useEffect, useState } from 'react';
import MainLayout from '../../../layouts/MainLayout';
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
            <div className="relative w-full bg-white py-6 px-4 pt-[10px] md:pt-[20px] shadow-lg">
                <div className="relative z-10 mx-auto max-w-7xl grid w-full gap-1 sm:gap-1.5 md:gap-2 grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-6 2xl:grid-cols-6">
                    {SDG_IMAGES.map((item, index) => {
                        const isAutoFlipped = autoFlippedIndices[index];
                        const isHovered = activeHoverIndex === index;
                        
                        const currentSrc = isHovered && item.hoverImg 
                            ? item.hoverImg 
                            : isAutoFlipped && item.hoverImg 
                            ? item.hoverImg 
                            : item.defaultImg;

                        return (
                            /* 
                                BORDERLESS FLOATING SHADOW:
                                - Added 'bg-transparent' to ensure no white box.
                                - Added 'drop-shadow-xl' for a soft, blurry shadow that follows the image shape.
                                - Added 'rounded-full' if the image is circular, or keep it as is for square logos.
                            */
                            <img
                                key={currentSrc}
                                src={currentSrc}
                                alt={`SDG ${index + 1}`}
                                className={`w-full h-auto object-contain bg-transparent transition-all duration-300 ease-in-out drop-shadow-lg hover:-translate-y-2 hover:drop-shadow-2xl cursor-pointer animate-spin-in ${index === SDG_IMAGES.length - 1 ? 'animate-spin' : ''}`}
                                onMouseEnter={() => item.hoverImg && setActiveHoverIndex(index)}
                                onMouseLeave={() => setActiveHoverIndex(null)}
                            />
                        );
                    })}
                </div>
            </div>

            <div className="mx-auto max-w-6xl py-8 md:py-12">
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