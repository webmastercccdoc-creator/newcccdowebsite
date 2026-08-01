import { useState, useEffect } from 'react';
import Navbar from '../components/content/Navbar';
import Footer from '../components/content/Footer';
import LoadingSpinner from '../components/content/LoadingSpinner'; // ✅ Correct path

export default function MainLayout({ 
    title, 
    children, 
    className = '', 
    showTitle = true, 
    maxWidth = '7xl', 
    containerClassName = '',
    mainClassName = '',
    loadingDuration = 1500,
    spinnerSpeed = 1.2,
    showSpinner = true,
    backgroundColor = 'rgba(5, 85, 20, 0.95)',
    logoSrc = null,
    logoAlt = 'College Logo'
}) {
    const [loading, setLoading] = useState(showSpinner);
    const [fadeOut, setFadeOut] = useState(false);

    useEffect(() => {
        if (!showSpinner) {
            setLoading(false);
            return;
        }

        const fadeTimer = setTimeout(() => {
            setFadeOut(true);
        }, loadingDuration - 300);

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
            {showSpinner && loading && (
                <LoadingSpinner 
                    onComplete={() => setLoading(false)}
                    duration={loadingDuration}
                    spinnerSpeed={spinnerSpeed}
                    backgroundColor={backgroundColor}
                    logoAlt={logoAlt}
                    fadeOut={fadeOut}
                />
            )}

            <div className={`flex min-h-screen flex-col bg-gradient-to-br from-slate-50 to-slate-100 text-slate-900 transition-opacity duration-500 ${showSpinner && loading ? 'opacity-0' : 'opacity-100'}`}>
                <Navbar />
                
                <main 
                    className={`
                        flex-1 mx-auto w-full ${maxWidth === 'full' ? 'px-0' : 'px-4 sm:px-6 lg:px-8'} ${mainClassName || 'py-2 md:py-4'}
                        ${maxWidth === '7xl' ? 'max-w-7xl' : ''}
                        ${maxWidth === '6xl' ? 'max-w-6xl' : ''}
                        ${maxWidth === '5xl' ? 'max-w-5xl' : ''}
                        ${maxWidth === 'full' ? 'max-w-full' : ''}
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