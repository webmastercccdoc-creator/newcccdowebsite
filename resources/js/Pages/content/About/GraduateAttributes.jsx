import { useEffect } from 'react';
import MainLayout from '../../../layouts/MainLayout';

// debug: log the imported layout to help diagnose invalid element type errors
console.log('MainLayout import (GraduateAttributes):', MainLayout);

export default function GraduateAttributes() {
    useEffect(() => {
        // Page title
        document.title = 'Graduate Attributes - City College of Cagayan de Oro';
    }, []);

    return (
        <MainLayout maxWidth="full" containerClassName="px-0" mainClassName="py-0" className="overflow-hidden pb-0">
            
            {/* Full-width Hero Banner */}
            <div 
                className="relative w-full bg-cover bg-center bg-no-repeat shadow-lg min-h-[350px] md:min-h-[450px] lg:min-h-[550px] flex items-center justify-center"
                style={{
                    backgroundImage: `url('')` // Academic/graduation themed image
                }}
            >
                {/* Dark Overlay for text readability */}
                <div className="absolute inset-0 bg-black/50"></div>
                
                <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
                    <h1 className="text-4xl font-bold tracking-tight text-white drop-shadow-md sm:text-5xl md:text-6xl">
                        Graduate Attributes
                    </h1>
                    <p className="mx-auto mt-4 max-w-2xl text-lg text-white/90 drop-shadow-md">
                        The qualities, skills, and values our graduates embody upon completion of their studies.
                    </p>
                </div>
            </div>

            {/* Main Content Area - Maximized */}
            <div className="mx-auto max-w-7xl px-6 py-12 md:px-8 md:py-16">
                
                {/* Under Construction Card */}
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 p-12 md:p-20 text-center max-w-4xl mx-auto">
                    
                    {/* Large Icon / Symbol */}
                    <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-yellow-100 mb-8">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 text-yellow-600">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>

                    <h2 className="text-3xl font-bold text-gray-800 mb-4">
                        Page Under Construction
                    </h2>
                    
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-8">
                        We are currently working hard to compile the specific graduate attributes for the City College of Cagayan de Oro. 
                        Please check back soon for updates on the skills, knowledge, and values our graduates will possess.
                    </p>

                    {/* Optional Progress Bar visual */}
                    <div className="w-full max-w-md mx-auto bg-gray-200 rounded-full h-2.5 mb-2">
                        <div className="bg-green-600 h-2.5 rounded-full" style={{ width: '45%' }}></div>
                    </div>
                    <p className="text-sm text-gray-500 font-medium">Development in progress</p>

                </div>

            </div>
        </MainLayout>
    );
}