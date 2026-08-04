import { useEffect, useState } from 'react';
import MainLayout from '../../../layouts/MainLayout';

export default function VPAcademics() {
    const [activeTab, setActiveTab] = useState('education');

    useEffect(() => {
        document.title = "VP for Academics - City College of Cagayan de Oro";
    }, []);

    const tabs = [
        { id: 'education', label: 'College of Education' },
        { id: 'arts-sciences', label: 'College of Arts and Sciences' },
        { id: 'business', label: 'College of Business and Management' },
        { id: 'student-affairs', label: 'Office of Student Affairs and Services' },
        { id: 'nstp', label: 'National Service Training Program' },
        { id: 'vocational', label: 'Vocational School Administrator, Technical Skills and Training Institute' },
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
                        Vice President for Academics
                    </h1>
                    <p className="mx-auto mt-4 max-w-2xl text-lg text-white/90 drop-shadow-md">
                        Academic leadership and excellence at the City College of Cagayan de Oro.
                    </p>
                </div>
            </div>

            {/* Main Content Area - Maximized */}
            <div className="mx-auto max-w-full px-4 sm:px-6 lg:px-8 py-8 md:py-12">
                <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 md:p-8">
                    <h2 className="text-2xl font-bold text-green-800 mb-6 text-center">Academic Affairs Offices</h2>

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
                        {/* College of Education */}
                        {activeTab === 'education' && (
                            <div className="animate-fadeIn">
                                <div className="bg-gray-50 rounded-lg p-8 md:p-12 text-center min-h-[400px] flex flex-col items-center justify-center">
                                    <h3 className="text-2xl font-semibold text-gray-800 mb-4">College of Education</h3>
                                    <p className="text-gray-600 max-w-2xl">Content for College of Education will be displayed here.</p>
                                    <p className="text-sm text-gray-400 mt-4">This page is currently under development.</p>
                                </div>
                            </div>
                        )}

                        {/* College of Arts and Sciences */}
                        {activeTab === 'arts-sciences' && (
                            <div className="animate-fadeIn">
                                <div className="bg-gray-50 rounded-lg p-8 md:p-12 text-center min-h-[400px] flex flex-col items-center justify-center">
                                    <h3 className="text-2xl font-semibold text-gray-800 mb-4">College of Arts and Sciences</h3>
                                    <p className="text-gray-600 max-w-2xl">Content for College of Arts and Sciences will be displayed here.</p>
                                    <p className="text-sm text-gray-400 mt-4">This page is currently under development.</p>
                                </div>
                            </div>
                        )}

                        {/* College of Business and Management */}
                        {activeTab === 'business' && (
                            <div className="animate-fadeIn">
                                <div className="bg-gray-50 rounded-lg p-8 md:p-12 text-center min-h-[400px] flex flex-col items-center justify-center">
                                    <h3 className="text-2xl font-semibold text-gray-800 mb-4">College of Business and Management</h3>
                                    <p className="text-gray-600 max-w-2xl">Content for College of Business and Management will be displayed here.</p>
                                    <p className="text-sm text-gray-400 mt-4">This page is currently under development.</p>
                                </div>
                            </div>
                        )}

                        {/* Office of Student Affairs and Services */}
                        {activeTab === 'student-affairs' && (
                            <div className="animate-fadeIn">
                                <div className="bg-gray-50 rounded-lg p-8 md:p-12 text-center min-h-[400px] flex flex-col items-center justify-center">
                                    <h3 className="text-2xl font-semibold text-gray-800 mb-4">Office of Student Affairs and Services</h3>
                                    <p className="text-gray-600 max-w-2xl">Content for Office of Student Affairs and Services will be displayed here.</p>
                                    <p className="text-sm text-gray-400 mt-4">This page is currently under development.</p>
                                </div>
                            </div>
                        )}

                        {/* National Service Training Program */}
                        {activeTab === 'nstp' && (
                            <div className="animate-fadeIn">
                                <div className="bg-gray-50 rounded-lg p-8 md:p-12 text-center min-h-[400px] flex flex-col items-center justify-center">
                                    <h3 className="text-2xl font-semibold text-gray-800 mb-4">National Service Training Program</h3>
                                    <p className="text-gray-600 max-w-2xl">Content for National Service Training Program will be displayed here.</p>
                                    <p className="text-sm text-gray-400 mt-4">This page is currently under development.</p>
                                </div>
                            </div>
                        )}

                        {/* Vocational School Administrator, Technical Skills and Training Institute */}
                        {activeTab === 'vocational' && (
                            <div className="animate-fadeIn">
                                <div className="bg-gray-50 rounded-lg p-8 md:p-12 text-center min-h-[400px] flex flex-col items-center justify-center">
                                    <h3 className="text-2xl font-semibold text-gray-800 mb-4">Vocational School Administrator, Technical Skills and Training Institute</h3>
                                    <p className="text-gray-600 max-w-2xl">Content for Vocational School Administrator, Technical Skills and Training Institute will be displayed here.</p>
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