import { useEffect } from 'react';
import Navbar from '../components/content/Navbar';
import Footer from '../components/content/Footer';
import CookieConsent from '../components/content/CookieConsent';

export default function MainLayout({ 
    title, 
    children, 
    className = '', 
    showTitle = true, 
    maxWidth = '7xl', 
    containerClassName = '',
    mainClassName = '',
    backgroundColor = 'rgba(5, 85, 20, 0.95)',
    logoSrc = null,
    logoAlt = 'College Logo'
}) {
    useEffect(() => {
        // No loading spinner
    }, []);

    return (
        <div className={`flex min-h-screen flex-col bg-gradient-to-br from-slate-50 to-slate-100 text-slate-900 transition-opacity duration-500`}>
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
                <CookieConsent />
            </div>
    );
}