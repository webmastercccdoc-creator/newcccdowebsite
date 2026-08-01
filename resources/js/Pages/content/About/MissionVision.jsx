import { useEffect } from 'react';
import MainLayout from '../../../layouts/MainLayout';

export default function MissionVision() {
    useEffect(() => {
        document.title = 'Mission & Vision - City College of Cagayan de Oro';
    }, []);

    return (
        <MainLayout 
            maxWidth="full" 
            containerClassName="px-0" 
            mainClassName="py-0" 
            className="overflow-hidden pb-0"
        >
            {/* FULL-WIDTH HERO BANNER - Matches Mayor's Message height and size */}
            <div 
                className="relative w-full bg-cover bg-center bg-no-repeat shadow-lg min-h-[350px] md:min-h-[450px] lg:min-h-[550px] flex items-center justify-center"
                style={{
                    backgroundImage: `url('https://images.unsplash.com/photo-1523050854058-8df90110c7f1?q=80&w=1200&auto=format&fit=crop')` // Academic/College themed image
                }}
            >
                {/* Dark Overlay for text readability */}
                <div className="absolute inset-0 bg-black/50"></div>
                
                <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
                    <h1 className="text-4xl font-bold tracking-tight text-white drop-shadow-md sm:text-5xl md:text-6xl">
                        Mission & Vision
                    </h1>
                    <p className="mx-auto mt-4 max-w-2xl text-lg text-white/90 drop-shadow-md">
                        Our purpose, guiding principles, and long-term aspirations for the City College of Cagayan de Oro.
                    </p>
                </div>
            </div>

            {/* MAXIMIZED SPACE CONTENT - Centered Single Column */}
            <div className="mx-auto max-w-4xl px-6 py-12 md:px-8 md:py-16 space-y-8">
                
                {/* Vision */}
                <div className="bg-white rounded-2xl shadow-md p-8 border border-gray-100">
                    <h2 className="text-2xl font-bold text-green-800 mb-4 text-center">Our Vision</h2>
                    <p className="text-gray-600 leading-relaxed text-center text-lg">
                        A City College that nurtures and produces global citizens supported by cutting-edge 
                        technologies for innovation and excellence by 2033.
                    </p>
                </div>

                {/* Mission */}
                <div className="bg-white rounded-2xl shadow-md p-8 border border-gray-100">
                    <h2 className="text-2xl font-bold text-green-800 mb-4 text-center">Our Mission</h2>
                    <p className="text-gray-600 leading-relaxed text-center text-lg">
                        To provide transformative and inclusive learning driven by cutting-edge technologies, 
                        including artificial intelligence, that equip the institution and community to create 
                        innovative, relevant, and data-driven solutions for local and global impact.
                    </p>
                </div>

                {/* Core Pillars */}
                <div className="bg-white rounded-2xl shadow-md p-8 border border-gray-100">
                    <h2 className="text-2xl font-bold text-green-800 mb-6 text-center">Our Core Pillars</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-green-50 p-6 rounded-xl border border-green-100 text-center h-full flex flex-col justify-center">
                            <h3 className="font-semibold text-green-800 text-lg mb-2">Community Focus</h3>
                            <p className="text-sm text-gray-600 leading-relaxed">
                                Committed to addressing the needs of Cagayan de Oro youth and indigenous communities 
                                by respecting and incorporating culture and tradition.
                            </p>
                        </div>
                        <div className="bg-blue-50 p-6 rounded-xl border border-blue-100 text-center h-full flex flex-col justify-center">
                            <h3 className="font-semibold text-blue-800 text-lg mb-2">Global Impact</h3>
                            <p className="text-sm text-gray-600 leading-relaxed">
                                Contributing to sustainable development goals through strategic research and extension, 
                                equipping graduates with professionally-aligned competencies.
                            </p>
                        </div>
                        <div className="bg-purple-50 p-6 rounded-xl border border-purple-100 text-center h-full flex flex-col justify-center">
                            <h3 className="font-semibold text-purple-800 text-lg mb-2">Innovation</h3>
                            <p className="text-sm text-gray-600 leading-relaxed">
                                Driving positive change through cutting-edge technologies and innovative approaches 
                                to address societal challenges.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}