import { useEffect, useState } from 'react';
import { usePage } from '@inertiajs/react';
import { motion } from 'framer-motion';
import Navbar from '../components/content/Navbar';
import Footer from '../components/content/Footer';

// ============================================================
// Helper: render a string with **highlighted** words in gold.
// Any text between **double asterisks** or “curly quotes”
// will be styled with the gold accent.
// ============================================================
function renderWithGoldHighlights(text) {
    if (!text) return null;

    // Match either **...** or “...”
    const pattern = /(\*\*[^*]+\*\*|“[^”]+”)/g;
    const parts = String(text).split(pattern);

    return parts.map((part, index) => {
        if (!part) return null;

        const isAsterisk = part.startsWith('**') && part.endsWith('**');
        const isCurlyQuote = part.startsWith('“') && part.endsWith('”');

        if (isAsterisk) {
            return (
                <span
                    key={index}
                    className="font-semibold italic text-[#f5c518]"
                >
                    {part.slice(2, -2)}
                </span>
            );
        }

        if (isCurlyQuote) {
            return (
                <span
                    key={index}
                    className="font-semibold italic text-[#f5c518]"
                >
                    {part}
                </span>
            );
        }

        return <span key={index}>{part}</span>;
    });
}

// ============================================================
// Helper: same idea for the title — wrap the last word
// (or **marked** phrase) in gold.
// ============================================================
function renderTitleWithGold(title) {
    if (!title) return 'Announcement';

    // If the admin used **...**, honour that.
    if (/\*\*[^*]+\*\*/.test(title)) {
        return renderWithGoldHighlights(title);
    }

    // Otherwise, highlight the last word.
    const trimmed = String(title).trim();
    const words = trimmed.split(/\s+/);
    if (words.length === 1) {
        return <span className="text-[#f5c518]">{trimmed}</span>;
    }

    const last = words.pop();
    const first = words.join(' ');

    return (
        <>
            {first}{' '}
            <span className="text-[#f5c518]">{last}</span>
        </>
    );
}

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
    const { url } = usePage();
    const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 0);
    const [showScrollTop, setShowScrollTop] = useState(false);
    const [showPopupImage, setShowPopupImage] = useState(false);
    const [popupSettings, setPopupSettings] = useState(null);
    const currentPath = url.split('?')[0].replace(/\/+$/, '') || '/';
    const isHomePage = currentPath === '/';

    const closePopupImage = () => {
        setShowPopupImage(false);
    };

    useEffect(() => {
        if (!isHomePage) {
            setShowPopupImage(false);
            return;
        }

        const controller = new AbortController();

        const fetchPopup = async () => {
            try {
                const response = await fetch('/api/popup', {
                    headers: { Accept: 'application/json' },
                    signal: controller.signal,
                });

                if (!response.ok) {
                    throw new Error(`Popup request failed: ${response.status}`);
                }

                const popup = await response.json();
                setPopupSettings(popup);
                setShowPopupImage(Boolean(popup.enabled && popup.image_url));
            } catch (error) {
                if (error.name !== 'AbortError') {
                    console.error('Failed to load popup settings:', error);
                }
            }
        };

        fetchPopup();

        return () => controller.abort();
    }, [isHomePage]);

    useEffect(() => {
        if (!showPopupImage) return;

        const previousOverflow = document.body.style.overflow;
        const handleKeyDown = (event) => {
            if (event.key === 'Escape') {
                closePopupImage();
            }
        };

        document.body.style.overflow = 'hidden';
        window.addEventListener('keydown', handleKeyDown);

        return () => {
            document.body.style.overflow = previousOverflow;
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [showPopupImage]);

    useEffect(() => {
        // Handle window resize for responsive adjustments
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        // Handle scroll for back to top button visibility
        const handleScroll = () => {
            if (window.scrollY > 300) {
                setShowScrollTop(true);
            } else {
                setShowScrollTop(false);
            }
        };

        window.addEventListener('resize', handleResize);
        window.addEventListener('scroll', handleScroll);

        // Clean up
        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    // Scroll to top function
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

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
        <div className="flex min-h-screen flex-col bg-gradient-to-br from-slate-50 to-slate-100 text-slate-900 transition-opacity duration-500 overflow-x-clip">
            {/* Sticky navbar stays in flow so banners start below it */}
            <Navbar />

            <main
                className={`
                    content-main flex-1 mx-auto w-full 
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

                <div className={`content-page ${className} min-w-0`}>
                    {children}
                </div>
            </main>

            <Footer />

            {showPopupImage && (
                <div
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-3 backdrop-blur-md sm:p-6"
                    onMouseDown={(event) => {
                        if (event.target === event.currentTarget) closePopupImage();
                    }}
                >
                    <motion.div
                        role="dialog"
                        aria-modal="true"
                        aria-label={popupSettings.title || 'Announcement'}
                        className="relative flex max-h-[calc(100vh-1.5rem)] w-full max-w-[min(92vw,34rem)] flex-col overflow-hidden border border-[#f5c518]/40 bg-[#0b3d1e] shadow-[0_25px_80px_-15px_rgba(0,0,0,0.9)] sm:max-h-[calc(100vh-3rem)] md:max-w-[42rem] lg:max-w-[48rem] xl:max-w-[52rem]"
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    >
                        {/* Decorative top accent bar */}
                        <div className="h-1 w-full shrink-0 bg-gradient-to-r from-[#f5c518]/0 via-[#f5c518] to-[#f5c518]/0" />

                        {/* ===== IMAGE (top) ===== */}
                        <div className="relative flex min-h-[16rem] items-center justify-center overflow-hidden bg-gradient-to-b from-[#05230f] to-[#03180c] sm:min-h-[18rem] md:min-h-[24rem] lg:min-h-[28rem] xl:min-h-[30rem]">

                            {/* Ambient background texture */}
                            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_60%_40%,rgba(245,197,24,0.08),transparent_60%)]" />

                            {popupSettings.link_url ? (
                                <a href={popupSettings.link_url} className="relative z-10">
                                    <motion.img
                                        key={popupSettings.image_url}
                                        src={popupSettings.image_url}
                                        alt={popupSettings.title || 'Announcement'}
                                        onError={() => setShowPopupImage(false)}
                                        className="max-h-[16rem] w-auto max-w-full object-contain sm:max-h-[18rem] md:max-h-[24rem] lg:max-h-[28rem] xl:max-h-[30rem]"
                                        initial={{ scale: 1, opacity: 0.9 }}
                                        animate={{ scale: 1.05, opacity: 1 }}
                                        transition={{ duration: 8, ease: 'linear' }}
                                    />
                                </a>
                            ) : (
                                <motion.img
                                    key={popupSettings.image_url}
                                    src={popupSettings.image_url}
                                    alt={popupSettings.title || 'Announcement'}
                                    onError={() => setShowPopupImage(false)}
                                    className="relative z-10 max-h-[16rem] w-auto max-w-full object-contain sm:max-h-[18rem] md:max-h-[24rem] lg:max-h-[28rem] xl:max-h-[30rem]"
                                    initial={{ scale: 1, opacity: 0.9 }}
                                    animate={{ scale: 1.05, opacity: 1 }}
                                    transition={{ duration: 8, ease: 'linear' }}
                                />
                            )}

                            {/* Vignette */}
                            <div className="pointer-events-none absolute inset-0 z-10 bg-[radial-gradient(ellipse_at_center,transparent_55%,rgba(0,0,0,0.55)_100%)]" />

                            {/* Close button */}
                            <button
                                type="button"
                                onClick={closePopupImage}
                                aria-label="Close promotional announcement"
                                className="absolute right-3 top-3 z-30 flex h-9 w-9 items-center justify-center border border-white/15 bg-black/50 text-white backdrop-blur-md transition-all hover:border-[#f5c518]/50 hover:bg-[#157d3c] hover:text-[#f5c518] focus:outline-none focus:ring-2 focus:ring-[#f5c518] md:h-10 md:w-10"
                            >
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="h-5 w-5" aria-hidden="true">
                                    <path d="m6 6 12 12M18 6 6 18" strokeWidth="2" strokeLinecap="round" />
                                </svg>
                            </button>

                        </div>

                        {/* ===== CAPTION (bottom) ===== */}
                        <div className="relative overflow-hidden bg-gradient-to-br from-[#0b3d1e] via-[#0d4522] to-[#0b3d1e] px-5 py-5 sm:px-6 sm:py-6 md:px-8 md:py-7 lg:px-10 lg:py-8">

                            {/* Decorative glow */}
                            <div className="pointer-events-none absolute -left-24 -top-24 h-64 w-64 rounded-full bg-[#f5c518]/10 blur-3xl" />
                            <div className="pointer-events-none absolute -bottom-24 -right-24 h-64 w-64 rounded-full bg-[#157d3c]/20 blur-3xl" />

                            <div className="relative">
                                {/* Eyebrow */}
                                <div className="mb-2.5 flex items-center gap-2 md:mb-3">
                                    <span className="flex h-6 w-6 items-center justify-center border border-[#f5c518]/40 bg-[#05230f] text-[#f5c518] md:h-7 md:w-7">
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="h-3 w-3 md:h-3.5 md:w-3.5" aria-hidden="true">
                                            <path d="M12 2 9.5 8.5 2 9.5l5.5 5L6 22l6-3.5L18 22l-1.5-7.5L22 9.5l-7.5-1L12 2z" strokeWidth="1.5" strokeLinejoin="round" />
                                        </svg>
                                    </span>
                                    <span className="text-[9px] font-semibold uppercase tracking-[0.25em] text-[#f5c518]/90 md:text-[11px]">
                                        Announcement
                                    </span>
                                </div>

                                {/* Title — last word (or **marked** phrase) in gold */}
                                <h2 className="mb-2.5 font-serif text-lg font-bold leading-tight text-white sm:text-xl md:text-2xl lg:text-3xl">
                                    {renderTitleWithGold(popupSettings.title)}
                                </h2>

                                {/* Divider flourish */}
                                <div className="mb-3 flex items-center gap-2 md:mb-4">
                                    <span className="h-px w-8 bg-[#f5c518]/60 md:w-10" />
                                    <span className="h-1.5 w-1.5 rotate-45 bg-[#f5c518]" />
                                    <span className="h-px flex-1 bg-gradient-to-r from-[#f5c518]/60 to-transparent" />
                                </div>

                                {/* Caption — anything inside **...** or “...” renders in gold */}
                                {popupSettings.caption && (
                                    <p className="font-serif text-xs leading-relaxed text-white/85 sm:text-sm sm:leading-relaxed md:text-[15px] md:leading-relaxed lg:text-base lg:leading-relaxed">
                                        {renderWithGoldHighlights(popupSettings.caption)}
                                    </p>
                                )}
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}

            {/* =============================================
                BACK TO TOP BUTTON
                ============================================= */}
            <button
                onClick={scrollToTop}
                className={`
                    fixed bottom-8 right-8 z-50 
                    w-12 h-12 md:w-14 md:h-14 
                    rounded-full 
                    bg-[#0f5132] text-white 
                    shadow-lg hover:shadow-xl 
                    flex items-center justify-center 
                    transition-all duration-300 
                    hover:bg-[#1a6b42] hover:scale-110
                    focus:outline-none focus:ring-2 focus:ring-[#0f5132] focus:ring-offset-2
                    ${showScrollTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12 pointer-events-none'}
                `}
                aria-label="Back to top"
            >
                <svg
                    className="w-5 h-5 md:w-6 md:h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2.5"
                        d="M5 15l7-7 7 7"
                    />
                </svg>
            </button>
        </div>
    );
}