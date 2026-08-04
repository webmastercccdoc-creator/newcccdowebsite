import { useEffect, useState } from 'react';
import MainLayout from '../../../layouts/MainLayout';

export default function VPResearchExtension() {
    const [activeTab, setActiveTab] = useState('extension');

    useEffect(() => {
        document.title = "VP for Research & Extension - City College of Cagayan de Oro";
    }, []);

    const tabs = [
        { id: 'extension', label: 'Extension and Social Development Services Division' },
        { id: 'innovation', label: 'Innovation and Technology Transfer Services Division' },
        { id: 'ethics', label: 'Institutional Research Ethics Committee' },
    ];

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
                    backgroundImage: `url('https://images.unsplash.com/photo-1523050854058-8df90110c7f1?q=80&w=1200&auto=format&fit=crop')`
                }}
            >
                {/* Dark Overlay for text readability */}
                <div className="absolute inset-0 bg-black/50"></div>
                
                <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
                    <h1 className="text-4xl font-bold tracking-tight text-white drop-shadow-md sm:text-5xl md:text-6xl">
                        Vice President for Research & Extension
                    </h1>
                    <p className="mx-auto mt-4 max-w-2xl text-lg text-white/90 drop-shadow-md">
                        Advancing knowledge and community engagement at the City College of Cagayan de Oro.
                    </p>
                </div>
            </div>

            {/* Main Content Area - Maximized */}
            <div className="mx-auto max-w-full px-4 sm:px-6 lg:px-8 py-8 md:py-12">
                <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 md:p-8">
                    <h2 className="text-2xl font-bold text-green-800 mb-6 text-center">Research & Extension Offices</h2>

                    {/* TABS - Centered */}
                    <div className="flex justify-center mb-8 border-b border-gray-200 pb-1">
                        <div className="flex flex-wrap justify-center gap-1">
                            {tabs.map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`px-4 py-2.5 text-xs sm:text-sm font-medium rounded-t-lg transition-all duration-200 whitespace-nowrap ${
                                        activeTab === tab.id
                                            ? 'bg-green-700 text-white shadow-md'
                                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                                >
                                    {tab.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* TAB CONTENT - Maximized */}
                    <div className="min-h-[500px]">
                        {activeTab === 'extension' && (
                            <div className="animate-fadeIn">
                                {/* Content for Extension and Social Development Services Division */}
                            </div>
                        )}

                        {activeTab === 'innovation' && (
                            <div className="animate-fadeIn">
                                {/* Content for Innovation and Technology Transfer Services Division */}
                            </div>
                        )}

                        {activeTab === 'ethics' && (
                            <div className="animate-fadeIn">
                                {/* Content for Institutional Research Ethics Committee */}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}