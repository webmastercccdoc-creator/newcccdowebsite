// components/content/LoadingSpinner.jsx
import { useEffect } from 'react';
import logoSrcDefault from '../../assets/logos/cccdologo.png';

const LoadingSpinner = ({ 
    onComplete,
    duration = 1500,
    spinnerSpeed = 1.2,
    backgroundColor = 'rgba(5, 85, 20, 0.95)',
    logoSrc = logoSrcDefault,
    logoAlt = 'College Logo',
    logoSize = 'h-40 w-40',
    fadeOut = false
}) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            if (onComplete) onComplete();
        }, duration);

        return () => clearTimeout(timer);
    }, [duration, onComplete]);

    return (
        <div 
            className={`fixed inset-0 z-[9999] flex items-center justify-center transition-opacity duration-300 ${
                fadeOut ? 'opacity-0' : 'opacity-100'
            }`}
            style={{ backgroundColor: backgroundColor }}
        >
            <div className="relative flex items-center justify-center">
                {/* Spinning Circle Container */}
                <div className="relative h-48 w-48">
                    {/* Spinning Ring */}
                    <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-white border-r-white/80 animate-spin"></div>
                    
                    {/* Second Spinning Ring - Opposite Direction */}
                    <div className="absolute inset-[-12px] rounded-full border-4 border-transparent border-b-white/20 border-l-white/20 animate-spin-slow"></div>
                    
                    {/* Pulsing Ring */}
                    <div className="absolute inset-[-24px] rounded-full border-4 border-white/5 animate-ping"></div>
                    
                    {/* Logo Inside the Spinning Circle */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="h-36 w-36 rounded-full bg-transparent flex items-center justify-center overflow-hidden">
                            {logoSrc ? (
                                <img 
                                    src={logoSrc} 
                                    alt={logoAlt} 
                                    className={`${logoSize} object-contain p-1`}
                                    onError={(e) => {
                                        console.error('Logo failed to load:', logoSrc);
                                        e.target.style.display = 'none';
                                        // Show fallback text
                                        const parent = e.target.parentElement;
                                        const fallback = document.createElement('span');
                                        fallback.className = 'text-green-700 text-3xl font-bold';
                                        fallback.textContent = 'CC';
                                        parent.appendChild(fallback);
                                    }}
                                />
                            ) : (
                                <span className="text-green-700 text-3xl font-bold">CC</span>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                @keyframes spin-slow {
                    from { transform: rotate(360deg); }
                    to { transform: rotate(0deg); }
                }
                @keyframes ping {
                    0% { transform: scale(1); opacity: 0.4; }
                    100% { transform: scale(1.3); opacity: 0; }
                }
                .animate-spin {
                    animation: spin ${spinnerSpeed}s linear infinite;
                }
                .animate-spin-slow {
                    animation: spin-slow ${spinnerSpeed * 1.8}s linear infinite;
                }
                .animate-ping {
                    animation: ping 2.5s ease-out infinite;
                }
            `}</style>
        </div>
    );
};

export default LoadingSpinner;