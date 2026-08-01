import { useState, useEffect } from 'react';

const LoadingSpinner = () => {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        // Auto-hide after 1.5 seconds (adjust as needed)
        const timer = setTimeout(() => {
            setIsVisible(false);
        }, 1500);

        return () => clearTimeout(timer);
    }, []);

    if (!isVisible) return null;

    return (
        <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-green-700">
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

            {/* CSS Animations */}
            <style>{`
                @keyframes spin {
                    from {
                        transform: rotate(0deg);
                    }
                    to {
                        transform: rotate(360deg);
                    }
                }
                @keyframes pulse {
                    0%, 100% {
                        transform: scale(1);
                        opacity: 1;
                    }
                    50% {
                        transform: scale(1.05);
                        opacity: 0.8;
                    }
                }
                @keyframes ping {
                    0% {
                        transform: scale(1);
                        opacity: 1;
                    }
                    100% {
                        transform: scale(1.5);
                        opacity: 0;
                    }
                }
                @keyframes bounce {
                    0%, 100% {
                        transform: translateY(0);
                    }
                    50% {
                        transform: translateY(-6px);
                    }
                }
                .animate-spin {
                    animation: spin 0.8s linear infinite;
                }
                .animate-ping {
                    animation: ping 1.5s ease-out infinite;
                }
                .animate-bounce {
                    animation: bounce 0.6s ease-in-out infinite;
                }
            `}</style>
        </div>
    );
};

export default LoadingSpinner;