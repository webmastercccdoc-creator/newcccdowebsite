import { useState, useEffect } from 'react';
import Navbar from '../components/content/Navbar';
import Footer from '../components/content/Footer';

export default function MainLayout({ 
    title, 
    children, 
    className = '', 
    showTitle = true, 
    maxWidth = '7xl', 
    containerClassName = '',
    loadingDuration = 1500,
    spinnerSpeed = 0.8,
    pingSpeed = 1.5,
    bounceSpeed = 0.6,
    showSpinner = true
}) {
    const [loading, setLoading] = useState(showSpinner);
    const [fadeOut, setFadeOut] = useState(false);

    useEffect(() => {
        if (!showSpinner) {
            setLoading(false);
            return;
        }

        // Start fade out animation before removing spinner
        const fadeTimer = setTimeout(() => {
            setFadeOut(true);
        }, loadingDuration - 300);

        // Remove spinner completely after fade out
        const removeTimer = setTimeout(() => {
            setLoading(false);
        }, loadingDuration);

        return () => {
            clearTimeout(fadeTimer);
            clearTimeout(removeTimer);
        };
    }, [loadingDuration, showSpinner]);

    return (
        <>
            {/* Loading Spinner Overlay with Fade Transition */}
            {showSpinner && loading && (
                <div 
                    className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-green-700 transition-opacity duration-300 ${
                        fadeOut ? 'opacity-0' : 'opacity-100'
                    }`}
                >
                    <div className="relative flex flex-col items-center">
                        {/* Animated Logo Container */}
                        <div className="relative mb-6">
                            {/* Pulsing Rings */}
                            <div className="absolute inset-0 rounded-full border-4 border-white/20 animate-ping"></div>
                            <div className="absolute inset-[-8px] rounded-full border-4 border-white/10 animate-ping" style={{ animationDelay: '0.3s' }}></div>
                            
                            {/* Logo Circle */}
                            <div className="relative h-28 w-28 rounded-full bg-white flex items-center justify-center shadow-2xl">
                                <div className="flex flex-col items-center">
                                    <span className="text-green-700 text-4xl font-bold leading-none">CC</span>
                                    <span className="text-[8px] text-green-500 font-bold tracking-widest">CITY COLLEGE</span>
                                </div>
                            </div>
                        </div>
                        
                        {/* College Name */}
                        <h2 className="text-2xl font-bold text-white text-center mb-1 tracking-wide">
                            City College of Cagayan de Oro
                        </h2>
                        <p className="text-sm text-green-200 font-medium tracking-wider mb-8">
                            Aims Higher
                        </p>
                        
                        {/* Loading Spinner */}
                        <div className="relative">
                            <div className="h-12 w-12 rounded-full border-4 border-white/20"></div>
                            <div className="absolute top-0 left-0 h-12 w-12 rounded-full border-4 border-transparent border-t-white border-r-white/60 animate-spin"></div>
                        </div>
                        
                        {/* Loading Text with Dots */}
                        <div className="mt-6 flex items-center space-x-1">
                            <span className="text-white/60 text-sm font-light">Loading</span>
                            <span className="flex space-x-1">
                                <span className="h-1.5 w-1.5 rounded-full bg-white/60 animate-bounce" style={{ animationDelay: '0s' }}></span>
                                <span className="h-1.5 w-1.5 rounded-full bg-white/60 animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                                <span className="h-1.5 w-1.5 rounded-full bg-white/60 animate-bounce" style={{ animationDelay: '0.4s' }}></span>
                            </span>
                        </div>
                    </div>

                    {/* CSS Animations with Dynamic Speeds */}
                    <style>{`
                        @keyframes spin {
                            from { transform: rotate(0deg); }
                            to { transform: rotate(360deg); }
                        }
                        @keyframes ping {
                            0% { transform: scale(1); opacity: 1; }
                            100% { transform: scale(1.5); opacity: 0; }
                        }
                        @keyframes bounce {
                            0%, 100% { transform: translateY(0); }
                            50% { transform: translateY(-6px); }
                        }
                        .animate-spin {
                            animation: spin ${spinnerSpeed}s linear infinite;
                        }
                        .animate-ping {
                            animation: ping ${pingSpeed}s ease-out infinite;
                        }
                        .animate-bounce {
                            animation: bounce ${bounceSpeed}s ease-in-out infinite;
                        }
                    `}</style>
                </div>
            )}

            {/* Main Content */}
            <div className={`flex min-h-screen flex-col bg-gradient-to-br from-slate-50 to-slate-100 text-slate-900 transition-opacity duration-500 ${showSpinner && loading ? 'opacity-0' : 'opacity-100'}`}>
                <Navbar />
                
                <main 
                    className={`
                        flex-1 mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 md:py-10
                        ${maxWidth === '7xl' ? 'max-w-7xl' : ''}
                        ${maxWidth === '6xl' ? 'max-w-6xl' : ''}
                        ${maxWidth === '5xl' ? 'max-w-5xl' : ''}
                        ${containerClassName}
                    `}
                >
                    {showTitle && title && (
                        <h1 className="mb-6 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl md:text-4xl">
                            {title}
                        </h1>
                    )}
                    
                    <div className={className}>
                        {children}
                    </div>
                </main>
                
                <Footer />
            </div>
        </>
    );
}