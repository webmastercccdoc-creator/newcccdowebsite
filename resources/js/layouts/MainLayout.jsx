import { useEffect, useState } from 'react';
import Navbar from '../components/content/Navbar';
import Footer from '../components/content/Footer';

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
    const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 0);

    useEffect(() => {
        // Handle window resize for responsive adjustments
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);
        
        // Clean up
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        // No loading spinner
    }, []);

    // Determine max width class based on screen size
    const getMaxWidthClass = () => {
        if (maxWidth === 'full') return 'max-w-full px-0';
        
        const widthMap = {
            '7xl': 'max-w-7xl',
            '6xl': 'max-w-6xl',
            '5xl': 'max-w-5xl',
            '4xl': 'max-w-4xl',
            '3xl': 'max-w-3xl',
            '2xl': 'max-w-2xl',
            'xl': 'max-w-xl',
            'lg': 'max-w-lg',
            'md': 'max-w-md',
            'sm': 'max-w-sm'
        };
        
        return widthMap[maxWidth] || 'max-w-7xl';
    };

    // Responsive padding based on screen size
    const getPaddingClass = () => {
        if (maxWidth === 'full') return 'px-0';
        
        // Smaller padding on mobile, larger on desktop
        if (windowWidth < 640) {
            return 'px-3 sm:px-4';
        } else if (windowWidth < 1024) {
            return 'px-4 sm:px-6';
        } else {
            return 'px-4 sm:px-6 lg:px-8';
        }
    };

    // Responsive main padding
    const getMainPaddingClass = () => {
        if (mainClassName) return mainClassName;
        
        if (windowWidth < 640) {
            return 'py-3 md:py-4';
        } else if (windowWidth < 1024) {
            return 'py-4 md:py-6';
        } else {
            return 'py-4 md:py-6 lg:py-8';
        }
    };

    // Responsive title size
    const getTitleClass = () => {
        if (windowWidth < 640) {
            return 'text-xl sm:text-2xl';
        } else if (windowWidth < 1024) {
            return 'text-2xl sm:text-3xl';
        } else {
            return 'text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl';
        }
    };

    return (
        <div className="flex min-h-screen flex-col bg-gradient-to-br from-slate-50 to-slate-100 text-slate-900 transition-opacity duration-500 overflow-x-hidden">
            <Navbar />
            
            <main 
                className={`
                    flex-1 mx-auto w-full 
                    ${getPaddingClass()}
                    ${getMainPaddingClass()}
                    ${getMaxWidthClass()}
                    ${containerClassName}
                `}
            >
                {showTitle && title && (
                    <h1 className={`mb-4 sm:mb-6 font-bold tracking-tight text-slate-900 ${getTitleClass()}`}>
                        {title}
                    </h1>
                )}
                
                <div className={`${className} min-w-0`}>
                    {children}
                </div>
            </main>
            
            <Footer />
        </div>
    );
}