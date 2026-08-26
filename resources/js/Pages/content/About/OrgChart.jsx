import { useEffect, useState } from 'react';
import MainLayout from '../../../layouts/MainLayout';
import AnimatedBannerText from '../../../components/content/AnimatedBannerText';

// Import SVG images - rename the import to avoid conflict with component name
import OrgChartImage from '../../../assets/OrgChart/OrgChart.svg';
import PresidentsUnit from '../../../assets/OrgChart/PresidentsUnit.svg';
import AdministrationFinance from '../../../assets/OrgChart/AdministrationFinance.svg';
import AcademicAffairs from '../../../assets/OrgChart/AcademicAffairs.svg';
import ResearchExtension from '../../../assets/OrgChart/ResearchExtension.svg';

export default function OrgChart() {
    const [activeTab, setActiveTab] = useState('organizational-chart');

    useEffect(() => {
        document.title = 'Organizational Chart - City College of Cagayan de Oro';
    }, []);

    const tabs = [
        { id: 'organizational-chart', label: 'Organizational Chart' },
        { id: 'presidents-unit', label: "President's Unit" },
        { id: 'administration-finance', label: 'Administration & Finance Cluster' },
        { id: 'academic-affairs', label: 'Academic Affairs Cluster' },
        { id: 'research-extension', label: 'Research & Extension Cluster' },
    ];

    return (
        <MainLayout
            maxWidth="full"
            containerClassName="px-0"
            mainClassName="py-0"
            className="overflow-hidden pb-0"
        >
            {/* FULL-WIDTH HERO BANNER */}
            <div
                className="relative w-full bg-cover bg-center bg-no-repeat shadow-lg min-h-[350px] md:min-h-[450px] lg:min-h-[550px] flex items-center justify-center"
                style={{
                    backgroundImage: `url('https://images.unsplash.com/photo-1523050854058-8df90110c7f1?q=80&w=1200&auto=format&fit=crop')`
                }}
            >
                {/* Dark Overlay for text readability */}
                <div className="absolute inset-0 bg-black/50"></div>

                <AnimatedBannerText title="Organizational Chart" description="Our institutional structure and leadership framework at the City College of Cagayan de Oro." />
            </div>

            {/* ORGANIZATIONAL CHART CONTENT */}
            <div className="mx-auto max-w-6xl px-6 py-12 md:px-8 md:py-16">
                <div className="bg-white rounded-2xl shadow-md p-8 border border-gray-100">
                    <h2 className="text-2xl font-bold text-green-800 mb-8 text-center">Institutional Structure</h2>

                    {/* TABS */}
                    <div className="flex flex-wrap justify-center gap-2 mb-10 border-b border-gray-200 pb-1">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`px-5 py-2.5 text-sm font-medium rounded-t-lg transition-all duration-200 ${
                                    activeTab === tab.id
                                        ? 'bg-green-700 text-white shadow-md'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    {/* TAB CONTENT - IMAGES */}
                    <div className="min-h-[400px]">
                        {/* Organizational Chart - Main Overview */}
                        {activeTab === 'organizational-chart' && (
                            <div className="animate-fadeIn">
                                <div className="bg-white rounded-lg p-4 flex items-center justify-center">
                                    <img 
                                        src={OrgChartImage} 
                                        alt="Complete Organizational Chart" 
                                        className="max-w-full h-auto shadow-lg rounded-lg"
                                    />
                                </div>
                            </div>
                        )}

                        {/* President's Unit */}
                        {activeTab === 'presidents-unit' && (
                            <div className="animate-fadeIn">
                                <div className="bg-white rounded-lg p-4 flex items-center justify-center">
                                    <img 
                                        src={PresidentsUnit} 
                                        alt="President's Unit Organizational Chart" 
                                        className="max-w-full h-auto shadow-lg rounded-lg"
                                    />
                                </div>
                            </div>
                        )}

                        {/* Administration & Finance Cluster */}
                        {activeTab === 'administration-finance' && (
                            <div className="animate-fadeIn">
                                <div className="bg-white rounded-lg p-4 flex items-center justify-center">
                                    <img 
                                        src={AdministrationFinance} 
                                        alt="Administration & Finance Cluster Chart" 
                                        className="max-w-full h-auto shadow-lg rounded-lg"
                                    />
                                </div>
                            </div>
                        )}

                        {/* Academic Affairs Cluster */}
                        {activeTab === 'academic-affairs' && (
                            <div className="animate-fadeIn">
                                <div className="bg-white rounded-lg p-4 flex items-center justify-center">
                                    <img 
                                        src={AcademicAffairs} 
                                        alt="Academic Affairs Cluster Chart" 
                                        className="max-w-full h-auto shadow-lg rounded-lg"
                                    />
                                </div>
                            </div>
                        )}

                        {/* Research & Extension Cluster */}
                        {activeTab === 'research-extension' && (
                            <div className="animate-fadeIn">
                                <div className="bg-white rounded-lg p-4 flex items-center justify-center">
                                    <img 
                                        src={ResearchExtension} 
                                        alt="Research & Extension Cluster Chart" 
                                        className="max-w-full h-auto shadow-lg rounded-lg"
                                    />
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="mt-8 text-center text-sm text-gray-500 border-t border-gray-100 pt-6">
                        <p>For updates or corrections to the organizational chart, please contact the Office of the President.</p>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}