import { useEffect } from 'react';
import { motion } from 'framer-motion';
import MainLayout from '../../../layouts/MainLayout';
import AnimatedBannerText from '../../../components/content/AnimatedBannerText';
// Fix: Use ../../../ to go up to resources/js folder
import tstiLogo from '../../../assets/logos/tsti-logo.png';
import cbmLogo from '../../../assets/logos/cbm-logo.png';
import casLogo from '../../../assets/logos/cas-logo.png';
import coeLogo from '../../../assets/logos/coe-logo.png';

export default function EnrollNow() {
    useEffect(() => {
        document.title = "Enroll Now - City College of Cagayan de Oro";
        
        // Reset any zoom-in animations when component mounts or user navigates back
        const resetCards = () => {
            const cards = document.querySelectorAll('.card-content');
            cards.forEach(card => {
                card.classList.remove('zoom-in');
                card.style.pointerEvents = '';
            });
        };

        // Reset immediately on mount
        resetCards();

        // Also reset when the page is shown (for bfcache/back navigation)
        const handlePageShow = (event) => {
            if (event.persisted) {
                resetCards();
            }
        };

        window.addEventListener('pageshow', handlePageShow);

        return () => {
            window.removeEventListener('pageshow', handlePageShow);
        };
    }, []);

    // Animation variants
    const fadeInUp = {
        hidden: { opacity: 0, y: 60 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: { duration: 0.6, ease: "easeOut" }
        }
    };

    const fadeInScale = {
        hidden: { opacity: 0, scale: 0.9 },
        visible: { 
            opacity: 1, 
            scale: 1,
            transition: { duration: 0.5, ease: "easeOut" }
        }
    };

    // Navigation handlers with zoom-in animation
    const handleCCATClick = (e) => {
        e.preventDefault();
        const card = e.currentTarget.querySelector('.card-content');
        if (card) {
            card.classList.add('zoom-in');
            card.style.pointerEvents = 'none';
        }
        
        setTimeout(() => {
            window.location.href = '/enroll/ccat';
        }, 800);
    };

    const handleTSTIClick = (e) => {
        e.preventDefault();
        const card = e.currentTarget.querySelector('.card-content');
        if (card) {
            card.classList.add('zoom-in');
            card.style.pointerEvents = 'none';
        }
        
        setTimeout(() => {
            window.location.href = '/enroll/tsti';
        }, 800);
    };

    return (
        <MainLayout 
            maxWidth="full" 
            containerClassName="px-0" 
            mainClassName="py-0" 
            className="overflow-hidden pb-0"
        >
            {/* Hero Banner */}
            <div 
                className="relative w-full bg-cover bg-center bg-no-repeat shadow-lg min-h-[300px] md:min-h-[400px] lg:min-h-[450px] flex items-center justify-center"
                style={{
                    backgroundImage: `url('/images/enroll-banner.jpg')`
                }}
            >
                <div className="absolute inset-0 bg-black/50"></div>
                <div className="relative z-10 w-full max-w-6xl mx-auto px-6 sm:px-8 lg:px-10 text-center">
                    <AnimatedBannerText 
                        title="Enroll Now" 
                        description="Start Your Journey at City College of Cagayan de Oro" 
                    />
                </div>
            </div>

            {/* Main Content - Cards Section */}
            <div className="w-full bg-white py-16 md:py-20 lg:py-24">
                <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-10">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                        variants={fadeInUp}
                        className="text-center mb-12"
                    >
                        <h2
                            className="text-2xl sm:text-[2.5rem] md:text-[3.25rem] lg:text-[3.75rem] font-extrabold leading-[1.15] sm:leading-[1.2] lg:leading-[60px] tracking-[-0.03em] text-[#262525]"
                            style={{ fontFamily: '"Bricolage", "Inter", sans-serif' }}
                        >
                            Choose Your <span className="text-[#059669]">Path</span>
                        </h2>
                        <div className="w-20 h-1 bg-gradient-to-r from-[#d4a843] to-[#f0d78c] rounded-full mx-auto mt-4"></div>
                        <p className="text-lg text-gray-600 mt-4 max-w-2xl mx-auto">
                            Select the program that fits your goals and start your journey toward a brighter future.
                        </p>
                    </motion.div>

                    {/* Two Cards Grid */}
                    <div className="grid md:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto">
                        
                        {/* CCAT Card - College Programs */}
                        <motion.div
                            onClick={handleCCATClick}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.3 }}
                            variants={fadeInScale}
                            whileHover={{ y: -12, scale: 1.02 }}
                            transition={{ duration: 0.3, ease: "easeOut" }}
                            className="group block cursor-pointer relative"
                            role="button"
                            tabIndex={0}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                    handleCCATClick(e);
                                }
                            }}
                        >
                            <div className="card-content h-full bg-white rounded-2xl shadow-xl overflow-visible border-2 border-transparent hover:border-[#059669] transition-all duration-300 flex flex-col relative">
                                {/* College Logos */}
                                <div className="absolute -top-[45px] left-1/2 transform -translate-x-1/2 z-10 flex items-center justify-center gap-4">
                                    <div className="w-[90px] h-[90px] rounded-full bg-white shadow-lg border-2 border-[#059669] p-1.5 flex items-center justify-center overflow-visible">
                                        <img 
                                            src={cbmLogo} 
                                            alt="CBM Logo" 
                                            className="w-full h-full object-contain"
                                        />
                                    </div>
                                    <div className="w-[90px] h-[90px] rounded-full bg-white shadow-lg border-2 border-[#059669] p-1.5 flex items-center justify-center overflow-visible">
                                        <img 
                                            src={casLogo} 
                                            alt="CAS Logo" 
                                            className="w-full h-full object-contain"
                                        />
                                    </div>
                                    <div className="w-[90px] h-[90px] rounded-full bg-white shadow-lg border-2 border-[#059669] p-1.5 flex items-center justify-center overflow-visible">
                                        <img 
                                            src={coeLogo} 
                                            alt="COE Logo" 
                                            className="w-full h-full object-contain"
                                        />
                                    </div>
                                </div>

                                {/* Card Header - Green Gradient */}
                                <div className="bg-gradient-to-br from-[#059669] to-[#047857] px-6 pt-14 pb-8 text-center h-[150px] flex flex-col items-center justify-center flex-shrink-0">
                                    <h3
                                        className="text-2xl md:text-3xl font-bold text-white"
                                        style={{ fontFamily: '"Bricolage", "Inter", sans-serif' }}
                                    >
                                        College Programs
                                    </h3>
                                    <p className="text-emerald-100 text-sm mt-1">CCAT - City College Admission Test</p>
                                </div>

                                {/* Card Body */}
                                <div className="p-6 flex-1 flex flex-col">
                                    <p className="text-gray-600 text-sm mb-4 flex-shrink-0">
                                        Earn a bachelor's degree through free quality education at City College of Cagayan de Oro (CCCDO). Our college programs are designed to prepare students for professional careers and lifelong learning.
                                    </p>
                                    
                                    <div className="space-y-2 mb-4 flex-1">
                                        <div className="flex items-start text-sm text-gray-700">
                                            <svg className="w-4 h-4 text-[#059669] mr-2 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                            </svg>
                                            <span><strong>6</strong> Bachelor's Degree Programs</span>
                                        </div>
                                        <div className="flex items-start text-sm text-gray-700">
                                            <svg className="w-4 h-4 text-[#059669] mr-2 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                            </svg>
                                            <span><strong>Free</strong> Tuition Fee under CHED's Free Higher Education Law</span>
                                        </div>
                                        <div className="flex items-start text-sm text-gray-700">
                                            <svg className="w-4 h-4 text-[#059669] mr-2 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                            </svg>
                                            <span>Open to <strong>SHS Graduates</strong>, ALS Completers, &amp; Transferees</span>
                                        </div>
                                        <div className="flex items-start text-sm text-gray-700">
                                            <svg className="w-4 h-4 text-[#059669] mr-2 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                            </svg>
                                            <span>CHED Accredited &amp; Government Recognized Programs</span>
                                        </div>
                                    </div>

                                    <div className="border-t border-gray-100 pt-4 mb-4 flex-shrink-0">
                                        <p className="text-xs text-gray-500 italic">
                                            <strong>Programs offered:</strong> Teacher Education, Communication, Social Work, Office Administration, and Entrepreneurship
                                        </p>
                                    </div>

                                    <div className="flex items-center justify-between pt-2 border-t border-gray-100 flex-shrink-0">
                                        <span className="text-sm font-medium text-[#059669] group-hover:text-[#047857] transition-colors">
                                            Learn More &amp; Apply
                                        </span>
                                        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-[#059669] text-white group-hover:bg-[#047857] transition-colors group-hover:translate-x-1 transition-transform duration-300">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                            </svg>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* TSTI Card - Technical Skills Institute */}
                        <motion.div
                            onClick={handleTSTIClick}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.3 }}
                            variants={fadeInScale}
                            whileHover={{ y: -12, scale: 1.02 }}
                            transition={{ duration: 0.3, ease: "easeOut" }}
                            className="group block cursor-pointer relative"
                            role="button"
                            tabIndex={0}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                    handleTSTIClick(e);
                                }
                            }}
                        >
                            <div className="card-content h-full bg-white rounded-2xl shadow-xl overflow-visible border-2 border-transparent hover:border-[#1a365d] transition-all duration-300 flex flex-col relative">
                                {/* TSTI Logo */}
                                <div className="absolute -top-[45px] left-1/2 transform -translate-x-1/2 z-10">
                                    <div className="w-[90px] h-[90px] rounded-full bg-white shadow-lg border-2 border-[#1a365d] p-1.5 flex items-center justify-center overflow-visible">
                                        <img 
                                            src={tstiLogo} 
                                            alt="TSTI Logo" 
                                            className="w-full h-full object-contain"
                                        />
                                    </div>
                                </div>

                                {/* Card Header - Dark Blue Gradient */}
                                <div className="bg-gradient-to-br from-[#1a365d] to-[#2b6cb0] px-6 pt-14 pb-8 text-center h-[150px] flex flex-col items-center justify-center flex-shrink-0">
                                    <h3
                                        className="text-2xl md:text-3xl font-bold text-white"
                                        style={{ fontFamily: '"Bricolage", "Inter", sans-serif' }}
                                    >
                                        TSTI
                                    </h3>
                                    <p className="text-blue-200 text-sm mt-1">Technical Skills &amp; Technology Institute</p>
                                </div>

                                {/* Card Body */}
                                <div className="p-6 flex-1 flex flex-col">
                                    <p className="text-gray-600 text-sm mb-4 flex-shrink-0">
                                        Gain industry-ready technical skills through our TESDA-accredited programs. The Technical Skills &amp; Technology Institute offers hands-on training designed for immediate employment and entrepreneurship opportunities.
                                    </p>
                                    
                                    <div className="space-y-2 mb-4 flex-1">
                                        <div className="flex items-start text-sm text-gray-700">
                                            <svg className="w-4 h-4 text-[#1a365d] mr-2 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                            </svg>
                                            <span><strong>8</strong> TESDA-Accredited Technical Programs</span>
                                        </div>
                                        <div className="flex items-start text-sm text-gray-700">
                                            <svg className="w-4 h-4 text-[#1a365d] mr-2 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                            </svg>
                                            <span><strong>Hands-on</strong> Practical Skills Training</span>
                                        </div>
                                        <div className="flex items-start text-sm text-gray-700">
                                            <svg className="w-4 h-4 text-[#1a365d] mr-2 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                            </svg>
                                            <span><strong>Employment &amp; Entrepreneurship</strong> Ready</span>
                                        </div>
                                        <div className="flex items-start text-sm text-gray-700">
                                            <svg className="w-4 h-4 text-[#1a365d] mr-2 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                            </svg>
                                            <span>Open to <strong>SHS Graduates</strong>, ALS Completers, &amp; Professionals</span>
                                        </div>
                                    </div>

                                    <div className="border-t border-gray-100 pt-4 mb-4 flex-shrink-0">
                                        <p className="text-xs text-gray-500 italic">
                                            <strong>Programs offered:</strong> Computer Systems Servicing, Electrical Installation, Electronics, Welding, Automotive, Food Processing, Housekeeping, and Cookery
                                        </p>
                                    </div>

                                    <div className="flex items-center justify-between pt-2 border-t border-gray-100 flex-shrink-0">
                                        <span className="text-sm font-medium text-[#1a365d] group-hover:text-[#2b6cb0] transition-colors">
                                            Learn More &amp; Register
                                        </span>
                                        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-[#1a365d] text-white group-hover:bg-[#2b6cb0] transition-colors group-hover:translate-x-1 transition-transform duration-300">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                            </svg>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Additional Info Section */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                        variants={fadeInUp}
                        className="mt-16 text-center max-w-3xl mx-auto"
                    >
                        <div className="bg-gray-50 rounded-2xl p-8 shadow-sm">
                            <h3
                                className="text-xl sm:text-2xl md:text-3xl font-bold text-[#262525] mb-3"
                                style={{ fontFamily: '"Bricolage", "Inter", sans-serif' }}
                            >
                                Need Help Choosing?
                            </h3>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                Both programs offer quality education and pathways to success. 
                                <br />
                                <strong>Choose CCAT</strong> if you want to earn a bachelor's degree and pursue a professional career.
                                <br />
                                <strong>Choose TSTI</strong> if you want to gain practical technical skills for immediate employment or start your own business.
                            </p>
                            <p className="text-gray-600 text-sm mt-3">
                                You can also visit our <a href="#" className="text-[#059669] font-semibold hover:underline">Admissions Office</a> for personalized guidance.
                            </p>
                            <div className="flex flex-wrap justify-center gap-4 mt-4">
                                <span className="inline-flex items-center px-3 py-1 bg-[#059669]/10 text-[#059669] rounded-full text-xs font-medium">
                                    <span className="w-2 h-2 bg-[#059669] rounded-full mr-2"></span>
                                    CCAT - College Programs
                                </span>
                                <span className="inline-flex items-center px-3 py-1 bg-[#1a365d]/10 text-[#1a365d] rounded-full text-xs font-medium">
                                    <span className="w-2 h-2 bg-[#1a365d] rounded-full mr-2"></span>
                                    TSTI - Technical Skills Institute
                                </span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* CSS for zoom-in animation */}
            <style jsx>{`
                .card-content {
                    transition: transform 0.7s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.7s cubic-bezier(0.4, 0, 0.2, 1);
                    will-change: transform, opacity;
                }
                .card-content.zoom-in {
                    transform: scale(1.15);
                    opacity: 0;
                    pointer-events: none;
                }
            `}</style>
        </MainLayout>
    );
}