import { useEffect } from 'react';
import MainLayout from '../../../layouts/MainLayout';

// debug: log the imported layout to help diagnose invalid element type errors
console.log('MainLayout import (MayorMessage):', MainLayout);

export default function MayorMessage() {
    useEffect(() => {
        // Page title
        document.title = "Mayor's Message - City College of Cagayan de Oro";
    }, []);

    return (
        <MainLayout maxWidth="full" containerClassName="px-0" mainClassName="py-0" className="overflow-hidden pb-0">
            
            {/* Full-width Hero Banner */}
            <div className="relative w-full bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 shadow-lg py-16 md:py-24">
                <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
                    <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
                        Mayor's Message
                    </h1>
                    <p className="mx-auto mt-4 max-w-2xl text-lg text-blue-100/80">
                        A warm welcome and vision for the future of Cagayan de Oro City
                    </p>
                </div>
            </div>

            {/* Main Content Container */}
            <div className="mx-auto max-w-6xl px-6 py-12 md:px-8 md:py-16">
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
                    
                    {/* Layout: Image on left, Message on right */}
                    <div className="flex flex-col md:flex-row">
                        
                        {/* Mayor Photo Area */}
                        <div className="md:w-1/3 bg-gray-50 flex items-center justify-center p-8 md:p-12 border-b md:border-b-0 md:border-r border-gray-200">
                            <div className="flex flex-col items-center">
                                {/* Placeholder Photo - Replace src with your actual Mayor's image URL */}
                                <img 
                                    src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=400&auto=format&fit=crop" 
                                    alt="Mayor of Cagayan de Oro" 
                                    className="h-48 w-48 md:h-56 md:w-56 rounded-full object-cover border-4 border-white shadow-lg"
                                />
                                <div className="mt-4 text-center">
                                    <p className="text-sm text-gray-500 font-medium">Office of the City Mayor</p>
                                </div>
                            </div>
                        </div>

                        {/* Message Body */}
                        <div className="md:w-2/3 p-8 md:p-10">
                            <div className="mb-6">
                                <h2 className="text-2xl font-bold text-gray-900">Hon. Rolando A. Uy</h2>
                                <p className="text-blue-600 font-medium">City Mayor of Cagayan de Oro</p>
                            </div>

                            <div className="space-y-4 text-gray-700 leading-relaxed text-sm md:text-base">
                                <p>
                                    <strong>To the students, faculty, staff, and stakeholders of the City College of Cagayan de Oro,</strong>
                                </p>
                                <p>
                                    It is with great pride and optimism that I extend my warmest greetings to the entire 
                                    CCCDO community. As the City Mayor of Cagayan de Oro, I firmly believe that education 
                                    is the single most powerful tool we have to uplift our communities and secure a 
                                    brighter future for our city.
                                </p>
                                <p>
                                    Our local government remains steadfast in its commitment to supporting accessible, 
                                    quality, and inclusive higher education. The City College of Cagayan de Oro is not just 
                                    an institution of learning; it is a beacon of hope and opportunity for our youth, 
                                    molding them into future leaders, innovators, and responsible citizens of our beloved city.
                                </p>
                                <p>
                                    To our students: I encourage you to maximize the opportunities provided by this institution. 
                                    Strive for academic excellence, but never forget to uphold the values of integrity, discipline, 
                                    and service to others. To our dedicated faculty and staff: thank you for your unwavering 
                                    passion and commitment to shaping the minds of the next generation.
                                </p>
                                <p>
                                    Together, we will continue to build a City of Golden Friendship that thrives on knowledge, 
                                    innovation, and a strong sense of community spirit.
                                </p>
                                <p className="mt-6">
                                    Mabuhay ang Cagayan de Oro! Mabuhay ang City College of Cagayan de Oro!
                                </p>
                            </div>

                            {/* Signature Footer */}
                            <div className="mt-8 pt-6 border-t border-gray-200">
                                <p className="font-bold text-gray-900 text-lg">Rolando A. Uy</p>
                                <p className="text-gray-500 text-sm">City Mayor, Cagayan de Oro City</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer Note */}
                <div className="mt-8 text-center text-sm text-gray-400">
                    <p>City College of Cagayan de Oro • Office of the City Mayor</p>
                </div>
            </div>
        </MainLayout>
    );
}