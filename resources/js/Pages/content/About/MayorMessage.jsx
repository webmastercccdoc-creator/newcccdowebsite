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
            <div 
                className="relative w-full bg-cover bg-center bg-no-repeat shadow-lg min-h-[350px] md:min-h-[450px] lg:min-h-[550px] flex items-center justify-center"
                style={{
                    backgroundImage: `url('https://images.unsplash.com/photo-1620112402301-a7d5a0a2f9f9?q=80&w=1200&auto=format&fit=crop')`
                }}
            >
                {/* Dark Overlay for text readability */}
                <div className="absolute inset-0 bg-black/50"></div>
                
                <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
                    <h1 className="text-4xl font-bold tracking-tight text-white drop-shadow-md sm:text-5xl md:text-6xl">
                        Mayor's Message
                    </h1>
                    <p className="mx-auto mt-4 max-w-2xl text-lg text-white/90 drop-shadow-md">
                        A warm welcome and vision for the future of Cagayan de Oro City
                    </p>
                </div>
            </div>

            {/* MAXIMIZED CONTENT AREA - Full width centered */}
            <div className="mx-auto max-w-6xl px-6 py-12 md:px-10 lg:px-12 md:py-20">
                
                {/* Wide Single Column Container */}
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
                    
                    {/* Mayor Header (Centered at top for official feel) */}
                    <div className="p-8 md:p-12 border-b border-gray-200 bg-gray-50 text-center">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Hon. Rolando A. Uy</h2>
                        <p className="text-blue-600 font-medium text-lg mt-1">City Mayor of Cagayan de Oro</p>
                    </div>

                    {/* Full-Width Message Body */}
                    <div className="p-8 md:p-12 lg:p-16">
                        <div className="space-y-6 text-gray-800 leading-relaxed text-base md:text-lg max-w-4xl mx-auto">
                            <p>
                                <strong>To My Fellow Kagay-anons,</strong>
                            </p>
                            <p>
                                I hope this message finds you well. It is with great pride and a sense of accomplishment 
                                that I announce the establishment of the City College of Cagayan de Oro, a monumental 
                                step forward in our collective pursuit of progress and development under the RISE CDO 
                                governance platform, specifically focusing on Safety, Security, & Human Development 
                                and Economic Recovery.
                            </p>
                            <p>
                                Our journey towards this significant milestone has been nothing short of remarkable, 
                                and I am thrilled to witness this vision become a reality. The City College stands as 
                                a testament to our unwavering commitment to the betterment of our beloved city and the 
                                future of our youth.
                            </p>
                            <p>
                                I would like to extend my heartfelt gratitude to the dedicated members of the Technical 
                                Working Group who have tirelessly worked on crafting the Institutional Development Plan (IDP) 
                                for the City College. Your dedication and expertise have been invaluable in shaping this 
                                institution, which will undoubtedly become a cornerstone of educational excellence in our region.
                            </p>
                            <p>
                                I would also like to express my wholehearted support for the City College's Institutional 
                                Development Plan (IDP) and its vision for the future. The IDP outlines a comprehensive 
                                roadmap for the college's growth and development, ensuring that it becomes a hub for 
                                knowledge, innovation, and human empowerment. I hope that the Governing Board will also 
                                lend their support to this crucial plan.
                            </p>
                            <p>
                                To the esteemed staff and faculty who will nurture the minds of our future leaders, 
                                I extend my warmest wishes and encouragement. Your commitment to delivering quality 
                                education will pave the way for countless success stories, and I have no doubt that 
                                you will rise to the occasion.
                            </p>
                            <p>
                                To our valued stakeholders, both within and beyond our city's borders, I invite you 
                                to join hands with us in this noble endeavor. Your support and collaboration are vital 
                                in creating a brighter future for our youth and our community.
                            </p>
                            <p>
                                I would also like to acknowledge our brothers and sisters of the Higaonon Indigenous 
                                Peoples of Nahilaran, whose partnership and collaboration have been instrumental in the 
                                establishment of the City College. This endeavor is a testament to our commitment to 
                                inclusivity and diversity, ensuring that opportunities for education are accessible to all.
                            </p>
                            <p>
                                The establishment of the City College of Cagayan de Oro is a beacon of hope for our youth, 
                                offering them a chance to access quality education right here in our city. It represents 
                                the embodiment of our dreams for a safer, more secure, and more prosperous future.
                            </p>
                            <p>
                                Let us stand together in support of this endeavor, knowing that by investing in education, 
                                we are investing in the future of our city. With your unwavering support, I am confident 
                                that the City College will shine as a symbol of excellence and promise for generations to come. 
                                Thank you, Cagayan de Oro, for your trust and unwavering dedication to our shared vision 
                                of progress and prosperity.
                            </p>
                            <p className="mt-8 font-bold text-gray-900 text-xl text-center">
                                Sa Pag-uswag, Kauban Ta Uy!
                            </p>
                        </div>

                        {/* Signature Footer - Maximized */}
                        <div className="mt-12 pt-8 border-t border-gray-200 max-w-4xl mx-auto">
                            <p className="font-bold text-gray-900 text-2xl">Rolando A. Uy</p>
                            <p className="text-gray-600 text-lg">City Mayor, Cagayan de Oro City</p>
                        </div>
                    </div>
                </div>

                {/* Footer Note */}
                <div className="mt-10 text-center text-base text-gray-400">
                    <p>City College of Cagayan de Oro • Office of the City Mayor</p>
                </div>
            </div>
        </MainLayout>
    );
}