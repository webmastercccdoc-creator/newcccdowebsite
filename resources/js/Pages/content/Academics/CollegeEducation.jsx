import { useEffect, useState } from 'react';
import MainLayout from '../../../layouts/MainLayout';

export default function CollegeEducation() {
    useEffect(() => {
        document.title = "College of Education - City College of Cagayan de Oro";
    }, []);

    const [activeTab, setActiveTab] = useState('welcome');

    const coreValues = [
        { 
            title: 'Innovation', 
            description: 'Embracing creativity and new approaches to enhance teaching and learning experiences.'
        },
        { 
            title: 'Excellence', 
            description: 'Striving for the highest standards in academic performance, research, and community service.'
        },
        { 
            title: 'Integrity', 
            description: 'Upholding honesty, transparency, and ethical practices in all endeavors.'
        },
        { 
            title: 'Adaptability', 
            description: 'Responding effectively to changing educational landscapes and community needs.'
        },
        { 
            title: 'Lifelong Learning', 
            description: 'Fostering a continuous journey of personal and professional development.'
        }
    ];

    const tabs = [
        { id: 'welcome', label: 'Welcome' },
        { id: 'programs', label: 'Programs Offered' },
        { id: 'faculty', label: 'Faculty' },
        { id: 'news', label: 'News and Events' }
    ];

    return (
        <MainLayout 
            maxWidth="full" 
            containerClassName="px-0" 
            mainClassName="py-0" 
            className="overflow-hidden pb-0"
        >
            {/* Hero Banner with Image - Same as Offices */}
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
                        College of Education
                    </h1>
                    <p className="mx-auto mt-4 max-w-2xl text-lg text-white/90 drop-shadow-md">
                        Shaping the future of education through excellence in teaching, research, and community engagement.
                    </p>
                </div>
            </div>

            {/* Main Content */}
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12 md:py-16">
                {/* Tab Navigation */}
                <div className="flex flex-wrap gap-2 mb-8 border-b border-gray-200 pb-4">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`
                                px-6 py-2.5 text-sm font-medium rounded-lg transition-all duration-200
                                ${activeTab === tab.id 
                                    ? 'bg-green-700 text-white shadow-md' 
                                    : 'text-gray-600 hover:bg-green-50 hover:text-green-700'
                                }
                            `}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Tab Content - Changes based on active tab */}
                <div className="min-h-[500px]">
                    {/* Welcome Tab */}
                    {activeTab === 'welcome' && (
                        <div>
                            <h2 className="text-2xl font-bold text-green-800 mb-4">Welcome to College of Education</h2>
                            <p className="text-gray-600 leading-relaxed mb-6">
                                Our college offered two dynamic and essential programs: the Bachelor of Technical Vocational Teacher Education (BTVTED) major in Electrical Technology and the Bachelor of Technology and Livelihood Education (BTLEd) major in Industrial Arts. Anchored on the principles of Sustainable Development Goal 4 (Quality Education) and SDG 8 (Decent Work and Economic Growth), these programs seek to empower learners through quality technical-vocational education that promotes innovation, employability, and lifelong learning. Guided by the LGU's development framework, the College endeavors to nurture graduates who will contribute to local productivity, environmental stewardship, and inclusive education, ensuring that every learner becomes a catalyst for progress in their communities.
                            </p>

                            {/* Vision and Mission */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                                <div>
                                    <h3 className="text-xl font-bold text-green-800 mb-3">Vision</h3>
                                    <p className="text-gray-600 leading-relaxed">
                                        The College of Education commits itself to developing professional and technical educators through quality instruction, innovative research, and community engagement. Guided by excellence, integrity, and social responsibility, it prepares future teachers to become lifelong learners, critical thinkers, and transformative leaders in the service of the community.
                                    </p>
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-green-800 mb-3">Mission</h3>
                                    <p className="text-gray-600 leading-relaxed">
                                        The College of Education is devoted to nurturing and empowering future educators through learner-centered instruction, innovative research, and meaningful community engagement. It cultivates students' passion, competence, and social responsibility—preparing them to become compassionate teachers, critical thinkers, and transformative leaders who inspire change in schools and communities.
                                    </p>
                                </div>
                            </div>

                            {/* Core Values */}
                            <div>
                                <h3 className="text-xl font-bold text-green-800 mb-4 text-center">Core Values</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                                    {coreValues.map((value, index) => (
                                        <div 
                                            key={index}
                                            className="bg-green-50 rounded-xl p-5 border border-green-100 text-center hover:shadow-md transition-shadow duration-300"
                                        >
                                            <h4 className="font-bold text-green-800 text-lg mb-2">{value.title}</h4>
                                            <p className="text-sm text-gray-600 leading-relaxed">{value.description}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Programs Offered Tab */}
                    {activeTab === 'programs' && (
                        <div>
                            <h2 className="text-2xl font-bold text-green-800 mb-6">Programs Offered</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="bg-green-50 rounded-xl p-6 border border-green-100">
                                    <h3 className="font-semibold text-green-800 text-lg mb-2">Bachelor of Technical Vocational Teacher Education (BTVTED)</h3>
                                    <p className="text-sm text-gray-600 mb-2">
                                        <span className="font-medium">Major in Electrical Technology</span>
                                    </p>
                                    <p className="text-sm text-gray-600">
                                        Prepares future educators with technical expertise and pedagogical competence in electrical technology, equipping students with skills for teaching and industry application.
                                    </p>
                                </div>
                                <div className="bg-green-50 rounded-xl p-6 border border-green-100">
                                    <h3 className="font-semibold text-green-800 text-lg mb-2">Bachelor of Technology and Livelihood Education (BTLEd)</h3>
                                    <p className="text-sm text-gray-600 mb-2">
                                        <span className="font-medium">Major in Industrial Arts</span>
                                    </p>
                                    <p className="text-sm text-gray-600">
                                        Develops competent educators in industrial arts, combining technical skills with teaching methodologies to prepare students for careers in education and industry.
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Faculty Tab */}
                    {activeTab === 'faculty' && (
                        <div>
                            <h2 className="text-2xl font-bold text-green-800 mb-4">Faculty</h2>
                            <p className="text-gray-600 leading-relaxed mb-6">
                                Our dedicated faculty members are committed to providing quality education and mentoring future educators.
                            </p>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {[1, 2, 3, 4, 5, 6].map((item) => (
                                    <div key={item} className="bg-gray-50 rounded-xl p-6 border border-gray-200 text-center">
                                        <div className="w-24 h-24 bg-green-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                                            <svg className="w-12 h-12 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                            </svg>
                                        </div>
                                        <h3 className="font-semibold text-gray-800">Faculty Name</h3>
                                        <p className="text-sm text-gray-500">Position</p>
                                        <p className="text-xs text-gray-400 mt-2">Department</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* News and Events Tab */}
                    {activeTab === 'news' && (
                        <div>
                            <h2 className="text-2xl font-bold text-green-800 mb-6">News and Events</h2>
                            <div className="space-y-4">
                                {[1, 2, 3].map((item) => (
                                    <div key={item} className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                                        <div className="flex items-start gap-4">
                                            <div className="bg-green-100 rounded-lg px-3 py-2 text-center min-w-[60px]">
                                                <div className="text-2xl font-bold text-green-700">15</div>
                                                <div className="text-xs text-green-600">JUN</div>
                                            </div>
                                            <div>
                                                <h3 className="font-semibold text-gray-800 mb-1">Event/News Title {item}</h3>
                                                <p className="text-sm text-gray-600">
                                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                                </p>
                                                <a href="#" className="text-sm text-green-700 hover:text-green-800 font-medium mt-2 inline-block">
                                                    Read more →
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </MainLayout>
    );
}