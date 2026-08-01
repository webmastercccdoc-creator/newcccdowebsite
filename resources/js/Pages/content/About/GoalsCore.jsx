import { useEffect } from 'react';
import MainLayout from '../../../layouts/MainLayout';

// debug: log the imported layout to help diagnose invalid element type errors
console.log('MainLayout import (GoalsCore):', MainLayout);

export default function GoalsCore() {
    useEffect(() => {
        // Page title
        document.title = 'Core Goals - City College of Cagayan de Oro';
    }, []);

    return (
        <MainLayout maxWidth="full" containerClassName="px-0" mainClassName="py-0" className="overflow-hidden pb-0">
            
            {/* Full-width Hero Banner */}
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
                        Core Goals
                    </h1>
                    <p className="mx-auto mt-4 max-w-2xl text-lg text-white/90 drop-shadow-md">
                        Our strategic objectives and institutional targets for growth and excellence.
                    </p>
                </div>
            </div>

            {/* Main Content Area - Maximized */}
            <div className="mx-auto max-w-7xl px-6 py-12 md:px-8 md:py-16 space-y-16">
                
                {/* ==================== SCHOOL GOALS SECTION ==================== */}
                <div>
                    {/* Centered Section Title */}
                    <h2 className="text-3xl font-bold text-gray-800 text-center mb-8 w-full">
                        School Goals
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 hover:shadow-md transition-shadow flex flex-col items-center text-center">
                            <h3 className="font-bold text-gray-800 text-lg mb-2">Academic Excellence and Innovation</h3>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                Establish a culture of academic excellence and innovation by integrating cutting-edge technologies, including artificial intelligence, into the curriculum.
                            </p>
                        </div>

                        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 hover:shadow-md transition-shadow flex flex-col items-center text-center">
                            <h3 className="font-bold text-gray-800 text-lg mb-2">Inclusivity and Cultural Sensitivity</h3>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                Foster inclusivity and cultural sensitivity to address the needs of both the local youth and indigenous communities.
                            </p>
                        </div>

                        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 hover:shadow-md transition-shadow flex flex-col items-center text-center">
                            <h3 className="font-bold text-gray-800 text-lg mb-2">Community Engagement and Impact</h3>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                Actively contribute to sustainable development goals and drive positive change within the local community.
                            </p>
                        </div>

                        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 hover:shadow-md transition-shadow flex flex-col items-center text-center">
                            <h3 className="font-bold text-gray-800 text-lg mb-2">Transparency, Openness, and Ethical Conduct</h3>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                Uphold an environment of transparency, integrity, mutual respect, and ethical conduct in all aspects of the institution's operations.
                            </p>
                        </div>

                        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 hover:shadow-md transition-shadow flex flex-col items-center text-center md:col-span-2 lg:col-span-1">
                            <h3 className="font-bold text-gray-800 text-lg mb-2">Environmental Stewardship</h3>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                Pursue environmental sustainability and responsible development.
                            </p>
                        </div>
                    </div>
                </div>

                {/* ==================== CORE VALUES SECTION ==================== */}
                <div>
                    {/* Centered Section Title */}
                    <h2 className="text-3xl font-bold text-gray-800 text-center mb-8 w-full">
                        Core Values
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {/* Adaptive */}
                        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 hover:shadow-md transition-shadow flex flex-col items-center text-center">
                            <h3 className="font-bold text-gray-800 text-lg mb-2">Adaptive</h3>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                We embrace change and possess the flexibility to navigate evolving landscapes, a changing society, and the diversity of people, for advancing quality learning and preparing students for the 21st century and upliftment of the community.
                            </p>
                        </div>

                        {/* Innovative */}
                        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 hover:shadow-md transition-shadow flex flex-col items-center text-center">
                            <h3 className="font-bold text-gray-800 text-lg mb-2">Innovative</h3>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                We push boundaries and explore new ideas that will lead to new and innovative solutions to poverty, social inequality, unemployment, digital divide, and climate change.
                            </p>
                        </div>

                        {/* Mission Driven */}
                        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 hover:shadow-md transition-shadow flex flex-col items-center text-center">
                            <h3 className="font-bold text-gray-800 text-lg mb-2">Mission Driven</h3>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                We commit to a shared vision of making a meaningful difference and contributing to the greater good by providing and maintaining a student-centered campus experience where everyone is respected and empowered.
                            </p>
                        </div>

                        {/* Honest */}
                        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 hover:shadow-md transition-shadow flex flex-col items-center text-center">
                            <h3 className="font-bold text-gray-800 text-lg mb-2">Honest</h3>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                We uphold an environment of transparency, integrity, and ethical conduct in all aspects of curriculum, instruction, research, and community engagements.
                            </p>
                        </div>

                        {/* Inclusive */}
                        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 hover:shadow-md transition-shadow flex flex-col items-center text-center">
                            <h3 className="font-bold text-gray-800 text-lg mb-2">Inclusive</h3>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                We celebrate diversity and promote inclusivity in all aspects of our institution. We value unique backgrounds, experiences, and perspectives of our students, faculty, and staff. We strive to create an inclusive and welcoming environment that respects and appreciates the contributions of every individual, ensuring equal opportunities for growth and success.
                            </p>
                        </div>

                        {/* God-Fearing */}
                        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 hover:shadow-md transition-shadow flex flex-col items-center text-center">
                            <h3 className="font-bold text-gray-800 text-lg mb-2">God-Fearing</h3>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                We deeply acknowledge the profound importance of spirituality and moral grounding in our institution. Guided by principles of faith, compassion, and justice, we strive to cultivate a nurturing environment that fosters personal and collective growth.
                            </p>
                        </div>

                        {/* Humane */}
                        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 hover:shadow-md transition-shadow flex flex-col items-center text-center">
                            <h3 className="font-bold text-gray-800 text-lg mb-2">Humane</h3>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                We recognize and value the inherent dignity and worth of every individual. We are dedicated to treating everyone with respect, empathy, and understanding. We strive to treat everyone with empathy, kindness, and compassion, both within our organization and in our interaction with the wider community.
                            </p>
                        </div>

                        {/* Excellence */}
                        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 hover:shadow-md transition-shadow flex flex-col items-center text-center">
                            <h3 className="font-bold text-gray-800 text-lg mb-2">Excellence</h3>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                We pursue continuous improvement and set high standards for ourselves, pushing beyond mediocrity to achieve exceptional results in environmental stewardship, sustaining life, and responsible development.
                            </p>
                        </div>

                        {/* Respect */}
                        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 hover:shadow-md transition-shadow flex flex-col items-center text-center">
                            <h3 className="font-bold text-gray-800 text-lg mb-2">Respect</h3>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                We cultivate an environment of mutual respect, where diverse perspectives are valued, and differing opinions are heard. We place a premium on open-dialogue, professionalism, empathy, ethical conduct, and personal growth. We foster a sense of belonging, collaboration, and well-being for all members of our community.
                            </p>
                        </div>
                    </div>
                </div>

            </div>
        </MainLayout>
    );
}