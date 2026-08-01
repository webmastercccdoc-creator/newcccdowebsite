import { useEffect, useState } from 'react';
import MainLayout from '../../../layouts/MainLayout';

export default function CagayanDeOroCity() {
    useEffect(() => {
        // Page title
        document.title = 'Cagayan de Oro City - City College of Cagayan de Oro';
    }, []);

    // Carousel images (Replace these placeholder URLs with your actual image paths later)
    const images = [
        'https://images.unsplash.com/photo-1620112402301-a7d5a0a2f9f9?q=80&w=1200&auto=format&fit=crop', // CDO Cityscape
        'https://images.unsplash.com/photo-1563094447-53700292df5a?q=80&w=1200&auto=format&fit=crop', // Cagayan River
        'https://images.unsplash.com/photo-1574287112674-e91fd19d5f9a?q=80&w=1200&auto=format&fit=crop', // CDO Landmark
        'https://images.unsplash.com/photo-1587400452283-73a26216af28?q=80&w=1200&auto=format&fit=crop', // White Water Rafting
        'https://images.unsplash.com/photo-1509551257715-8e7204407201?q=80&w=1200&auto=format&fit=crop'  // CDO Night view
    ];

    const [currentIndex, setCurrentIndex] = useState(0);

    // Auto-slide effect (Ensures it changes every 5 seconds)
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => 
                prevIndex === images.length - 1 ? 0 : prevIndex + 1
            );
        }, 5000); 

        return () => clearInterval(interval);
    }, [images.length]);

    const goToSlide = (index) => {
        setCurrentIndex(index);
    };

    const goToPrevious = () => {
        const isFirstSlide = currentIndex === 0;
        const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    };

    const goToNext = () => {
        const isLastSlide = currentIndex === images.length - 1;
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    };

    return (
        <MainLayout 
            title="Cagayan de Oro City" 
            showTitle={false} 
            maxWidth="full" 
            containerClassName="px-0" 
            mainClassName="py-0" 
            className="overflow-hidden pb-0"
        >
            {/* Full Width Carousel Hero Section - EXACTLY MATCHES MAYOR'S HEADER SIZE */}
            <div className="relative w-full min-h-[350px] md:min-h-[450px] lg:min-h-[550px] flex items-center justify-center group">
                
                {/* Image Slider */}
                {images.map((image, index) => (
                    <div
                        key={index}
                        className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                            index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
                        }`}
                        style={{
                            backgroundImage: `url(${image})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center'
                        }}
                    >
                        {/* Dark Overlay for Text Readability */}
                        <div className="absolute inset-0 bg-black/40"></div>
                        
                        {/* Text Content centered on every slide */}
                        <div className="relative z-20 flex h-full items-center justify-center px-6 text-center">
                            <div>
                                <h1 className="text-4xl font-bold text-white drop-shadow-md sm:text-5xl md:text-6xl lg:text-7xl">
                                    Cagayan de Oro City
                                </h1>
                                <p className="mt-4 text-lg text-white/90 drop-shadow-md sm:text-xl md:text-2xl">
                                    The City of Golden Friendship
                                </p>
                            </div>
                        </div>
                    </div>
                ))}

                {/* Left Arrow */}
                <button 
                    onClick={goToPrevious}
                    className="absolute left-4 top-1/2 z-30 -translate-y-1/2 rounded-full bg-white/30 p-3 text-white backdrop-blur-sm transition hover:bg-white/50 md:opacity-0 md:group-hover:opacity-100"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-7 w-7">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                    </svg>
                </button>

                {/* Right Arrow */}
                <button 
                    onClick={goToNext}
                    className="absolute right-4 top-1/2 z-30 -translate-y-1/2 rounded-full bg-white/30 p-3 text-white backdrop-blur-sm transition hover:bg-white/50 md:opacity-0 md:group-hover:opacity-100"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-7 w-7">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                    </svg>
                </button>

                {/* Dots Indicator */}
                <div className="absolute bottom-6 left-1/2 z-30 flex -translate-x-1/2 space-x-2">
                    {images.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => goToSlide(index)}
                            className={`h-3 w-3 rounded-full transition-all duration-300 ${
                                index === currentIndex 
                                    ? 'w-8 bg-white' 
                                    : 'bg-white/50 hover:bg-white/80'
                            }`}
                        />
                    ))}
                </div>
            </div>

            {/* Padding added back for the text content below the carousel */}
            <div className="mx-auto max-w-7xl px-6 py-12 md:px-8">
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-1">
                    {/* Main Content - Now Full Width */}
                    <div className="space-y-6">
                        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                            <h2 className="text-2xl font-bold text-green-800 mb-4">About Cagayan de Oro</h2>
                            <p className="text-gray-600 leading-relaxed">
                                Cagayan de Oro (CDO), officially the City of Cagayan de Oro, is a 1st class highly urbanized city 
                                in the province of Misamis Oriental, Philippines. It is the regional center of Northern Mindanao 
                                and is known as the "City of Golden Friendship" due to the warm and hospitable nature of its people.
                            </p>
                        </div>

                        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                            <h2 className="text-2xl font-bold text-green-800 mb-4">History</h2>
                            <p className="text-gray-600 leading-relaxed">
                                The city has a rich history dating back to the pre-colonial era. It was officially established 
                                as a city on June 15, 1950. The name "Cagayan" comes from the native word "Cagay" meaning river, 
                                referring to the Cagayan River that flows through the city.
                            </p>
                        </div>

                        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                            <h2 className="text-2xl font-bold text-green-800 mb-4">Culture and Heritage</h2>
                            <p className="text-gray-600 leading-relaxed">
                                Cagayan de Oro is known for its vibrant culture, colorful festivals, and rich heritage. 
                                The city celebrates numerous festivals throughout the year, showcasing the unique traditions 
                                and customs of its people.
                            </p>
                        </div>
                    </div>

                    {/* Sidebar (Now a Row below the main content) */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                            <h3 className="text-lg font-semibold text-green-800 mb-4">Location</h3>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                Located in the northern coast of Mindanao, Cagayan de Oro serves as the gateway to Northern Mindanao, 
                                making it a strategic center for commerce, education, and tourism.
                            </p>
                        </div>

                        <div className="bg-green-50 rounded-xl p-6 border border-green-100">
                            <h3 className="text-lg font-semibold text-green-800 mb-2">Did You Know?</h3>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                Cagayan de Oro is home to the City College of Cagayan de Oro, a premier educational institution 
                                committed to excellence in education and research.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}