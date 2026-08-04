import { useEffect, useState } from 'react';
import MainLayout from '../../../layouts/MainLayout';

export default function PresidentUnit() {
    const [activeTab, setActiveTab] = useState('internationalization');

    useEffect(() => {
        document.title = "President's Unit - City College of Cagayan de Oro";
    }, []);

    const tabs = [
        { id: 'internationalization', label: 'Internationalization' },
        { id: 'promotions-communications', label: 'Promotions & Communications' },
        { id: 'quality-assurance', label: 'Quality Assurance' },
        { id: 'culture-arts', label: 'Culture & Arts' },
        { id: 'data-privacy', label: 'Data Privacy' },
        { id: 'linkages-partnerships', label: 'Linkages & Partnerships' },
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
                        President's Unit
                    </h1>
                    <p className="mx-auto mt-4 max-w-2xl text-lg text-white/90 drop-shadow-md">
                        Leadership and administration of the City College of Cagayan de Oro.
                    </p>
                </div>
            </div>

            {/* Main Content Area - Maximized */}
            <div className="mx-auto max-w-full px-4 sm:px-6 lg:px-8 py-8 md:py-12">
                <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 md:p-8">
                    <h2 className="text-2xl font-bold text-green-800 mb-6 text-center">President's Unit Offices</h2>

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
                        {/* Internationalization */}
                        {activeTab === 'internationalization' && (
                            <div className="animate-fadeIn">
                                <div className="bg-gray-50 rounded-lg p-8 md:p-12 text-center min-h-[400px] flex flex-col items-center justify-center">
                                    <h3 className="text-2xl font-semibold text-gray-800 mb-4">Internationalization</h3>
                                    <p className="text-gray-600 max-w-2xl">Content for Internationalization will be displayed here.</p>
                                    <p className="text-sm text-gray-400 mt-4">This page is currently under development.</p>
                                </div>
                            </div>
                        )}

                        {/* Promotions & Communications */}
                        {activeTab === 'promotions-communications' && (
                            <div className="animate-fadeIn">
                                <div className="bg-gray-50 rounded-lg p-8 md:p-12 text-center min-h-[400px] flex flex-col items-center justify-center">
                                    <h3 className="text-2xl font-semibold text-gray-800 mb-4">Promotions & Communications</h3>
                                    <p className="text-gray-600 max-w-2xl">Content for Promotions & Communications will be displayed here.</p>
                                    <p className="text-sm text-gray-400 mt-4">This page is currently under development.</p>
                                </div>
                            </div>
                        )}

                        {/* Quality Assurance Office */}
                        {activeTab === 'quality-assurance' && (
                            <div className="animate-fadeIn">
                                <div className="bg-gray-50 rounded-lg p-8 md:p-12 text-center min-h-[400px] flex flex-col items-center justify-center">
                                    <h3 className="text-2xl font-semibold text-gray-800 mb-4">Quality Assurance Office</h3>
                                    <p className="text-gray-600 max-w-2xl">Content for Quality Assurance Office will be displayed here.</p>
                                    <p className="text-sm text-gray-400 mt-4">This page is currently under development.</p>
                                </div>
                            </div>
                        )}

                        {/* Office for Culture & the Arts */}
                        {activeTab === 'culture-arts' && (
                            <div className="animate-fadeIn">
                                <div className="bg-gray-50 rounded-lg p-8 md:p-12 text-center min-h-[400px] flex flex-col items-center justify-center">
                                    <h3 className="text-2xl font-semibold text-gray-800 mb-4">Office for Culture & the Arts</h3>
                                    <p className="text-gray-600 max-w-2xl">Content for Office for Culture & the Arts will be displayed here.</p>
                                    <p className="text-sm text-gray-400 mt-4">This page is currently under development.</p>
                                </div>
                            </div>
                        )}

                        {/* Data Privacy */}
                        {activeTab === 'data-privacy' && (
                            <div className="animate-fadeIn">
                                <div className="bg-gray-50 rounded-lg p-8 md:p-12 text-center min-h-[400px] flex flex-col items-center justify-center">
                                    <h3 className="text-2xl font-semibold text-gray-800 mb-4">Data Privacy</h3>
                                    <p className="text-gray-600 max-w-2xl">Content for Data Privacy will be displayed here.</p>
                                    <p className="text-sm text-gray-400 mt-4">This page is currently under development.</p>
                                </div>
                            </div>
                        )}

                        {/* Linkages & Partnerships Office */}
                        {activeTab === 'linkages-partnerships' && (
                            <div className="animate-fadeIn">
                                <div className="bg-gray-50 rounded-lg p-8 md:p-12 text-center min-h-[400px] flex flex-col items-center justify-center">
                                    <h3 className="text-2xl font-semibold text-gray-800 mb-4">Linkages & Partnerships Office</h3>
                                    <p className="text-gray-600 max-w-2xl">Content for Linkages & Partnerships Office will be displayed here.</p>
                                    <p className="text-sm text-gray-400 mt-4">This page is currently under development.</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}