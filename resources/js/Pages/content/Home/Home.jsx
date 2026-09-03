import { useEffect, useMemo, useState, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { router } from '@inertiajs/react';
import MainLayout from '../../../layouts/MainLayout';
import '../../../../css/home.css';
import { initLandingAnimations } from '../../../home-animations';
import ArticlesCoverflow from './ArticlesCoverflow';
import sdgHomeImage from '../../../assets/images/sdg-home.png';

// Ranking Logos
import homeLogo from '../../../assets/logos/home-logo.png';

// Import Video
import bannerVideo from '../../../assets/video/video-banner.mp4';

// Import Student Image
import studentsImage from '../../../assets/images/students-home.png';

// SDG Images for flipping effect
import sdg1 from '../../../assets/images/sdg1.png';
import sdg2 from '../../../assets/images/sdg2.jpg';
import sdg3 from '../../../assets/images/sdg3.png';
import sdg4 from '../../../assets/images/sdg4.png';
import sdg5 from '../../../assets/images/sdg5.jpg';
import sdg6 from '../../../assets/images/sdg6.png';
import sdg7 from '../../../assets/images/sdg7.png';
import sdg8 from '../../../assets/images/sdg8.png';
import sdg9 from '../../../assets/images/sdg9.png';
import sdg10 from '../../../assets/images/sdg10.png';
import sdg11 from '../../../assets/images/sdg11.png';
import sdg12 from '../../../assets/images/sdg12.jpg';
import sdg13 from '../../../assets/images/sdg13.png';
import sdg14 from '../../../assets/images/sdg14.png';
import sdg15 from '../../../assets/images/sdg15.png';
import sdg16 from '../../../assets/images/sdg16.png';
import sdg17 from '../../../assets/images/sdg17.png';
import sdg from '../../../assets/logos/sdg.png';
import sdg_01 from '../../../assets/images/sdg_01.jpg';
import sdg_02 from '../../../assets/images/sdg_02.jpg';
import sdg_03 from '../../../assets/images/sdg_03.jpg';
import sdg_04 from '../../../assets/images/sdg_04.jpg';
import sdg_05 from '../../../assets/images/sdg_05.jpg';
import sdg_06 from '../../../assets/images/sdg_06.jpg';
import sdg_07 from '../../../assets/images/sdg_07.jpg';
import sdg_08 from '../../../assets/images/sdg_08.jpg';
import sdg_10 from '../../../assets/images/sdg_10.jpg';
import sdg_13 from '../../../assets/images/sdg_13.jpg';
import sdg_14 from '../../../assets/images/sdg_14.jpg';
import sdg_15 from '../../../assets/images/sdg_15.jpg';
import sdg_17 from '../../../assets/images/sdg_17.jpg';

const normalizeImagePath = (value) => {
    if (!value) return 'https://placehold.co/600x400/1e3a8a/ffffff?text=No+Image';
    if (/^https?:\/\//i.test(value) || value.startsWith('data:')) return value;
    return '/' + value.replace(/^\/+/, '');
};

const SDG_COLORS = {
    1: { bg: '#E5243B', text: '#FFFFFF', border: '#C81F35' },
    2: { bg: '#DDA63A', text: '#111827', border: '#C5942A' },
    3: { bg: '#4C9F38', text: '#FFFFFF', border: '#3D8A30' },
    4: { bg: '#C5192D', text: '#FFFFFF', border: '#A91427' },
    5: { bg: '#FF3A21', text: '#FFFFFF', border: '#DB2D19' },
    6: { bg: '#26BDE2', text: '#0F172A', border: '#1AA4C8' },
    7: { bg: '#FCC30B', text: '#111827', border: '#E6B108' },
    8: { bg: '#A21942', text: '#FFFFFF', border: '#861635' },
    9: { bg: '#FD6925', text: '#FFFFFF', border: '#E55B1D' },
    10: { bg: '#DD1367', text: '#FFFFFF', border: '#C21058' },
    11: { bg: '#FD9D24', text: '#111827', border: '#E78E1D' },
    12: { bg: '#BF8B2E', text: '#FFFFFF', border: '#A77725' },
    13: { bg: '#3F7E44', text: '#FFFFFF', border: '#2F6536' },
    14: { bg: '#0A97D9', text: '#FFFFFF', border: '#087EB9' },
    15: { bg: '#56C02B', text: '#111827', border: '#47A323' },
    16: { bg: '#00689D', text: '#FFFFFF', border: '#00557E' },
    17: { bg: '#19486A', text: '#FFFFFF', border: '#123A53' },
};

const calculateReadTime = (content) => {
    if (!content) return '1 min read';
    const wordsPerMinute = 200;
    const text = content.replace(/<[^>]*>/g, '');
    const wordCount = text.split(/\s+/).length;
    const minutes = Math.ceil(wordCount / wordsPerMinute);
    return `${minutes} min read`;
};

const stripHtmlAndTruncate = (html, maxLength = 120) => {
    if (!html) return '';
    const text = html.replace(/<[^>]*>/g, '');
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
};

// DUMMY BANNER DATA - Used when database is empty
const DUMMY_BANNER = {
    place: 'City College of Cagayan de Oro',
    title: 'Your City to learn, create, and grow',
    title2: 'Discover opportunities at the City College of Cagayan de Oro.',
    description: 'Through innovation and excellence, we shape the future of education in Northern Mindanao.',
    image: 'https://placehold.co/1200x600/1a237e/ffffff?text=City+College+of+CDO',
    bannerImage: 'https://placehold.co/1200x600/1a237e/ffffff?text=City+College+of+CDO',
    link: '#',
};

// DUMMY NEWS DATA - Used when database is empty
const DUMMY_ARTICLES = [
    {
        id: 'dummy-1',
        date: 'January 15, 2026',
        title: 'Welcome to City College of CDO',
        content: 'City College of Cagayan de Oro is dedicated to providing quality education and fostering excellence in our students. Discover our programs and opportunities.',
        category: 'Announcement',
        department: 'Office of the President',
        image: 'https://placehold.co/600x400/1a237e/ffffff?text=Welcome+to+CCCDO',
        alt: 'City College of CDO Campus',
        sdg_numbers: [4, 8],
    },
    {
        id: 'dummy-2',
        date: 'January 10, 2026',
        title: 'New Academic Programs Announced',
        content: 'We are excited to announce new academic programs designed to meet the evolving needs of our students and the community.',
        category: 'Academics',
        department: 'Academic Affairs',
        image: 'https://placehold.co/600x400/0d47a1/ffffff?text=New+Programs',
        alt: 'Academic Programs',
        sdg_numbers: [4],
    },
    {
        id: 'dummy-3',
        date: 'January 5, 2026',
        title: 'Student Achievements and Recognition',
        content: 'Our students continue to excel in various fields, bringing honor to the institution through their achievements and contributions.',
        category: 'Student Life',
        department: 'Student Affairs',
        image: 'https://placehold.co/600x400/1565c0/ffffff?text=Student+Achievements',
        alt: 'Student Achievements',
        sdg_numbers: [4, 10],
    },
    {
        id: 'dummy-4',
        date: 'December 20, 2025',
        title: 'Community Engagement Programs',
        content: 'City College of CDO remains committed to community service and engagement, fostering meaningful partnerships and initiatives.',
        category: 'Community',
        department: 'Community Relations',
        image: 'https://placehold.co/600x400/0d47a1/ffffff?text=Community+Engagement',
        alt: 'Community Engagement',
        sdg_numbers: [11, 17],
    },
];

const SDG_IMAGES = [
    { defaultImg: sdg1, hoverImg: sdg_01 },
    { defaultImg: sdg2, hoverImg: sdg_02 },
    { defaultImg: sdg3, hoverImg: sdg_03 },
    { defaultImg: sdg4, hoverImg: sdg_04 },
    { defaultImg: sdg5, hoverImg: sdg_05 },
    { defaultImg: sdg6, hoverImg: sdg_06 },
    { defaultImg: sdg7, hoverImg: sdg_07 },
    { defaultImg: sdg8, hoverImg: sdg_08 },
    { defaultImg: sdg9, hoverImg: null },
    { defaultImg: sdg10, hoverImg: sdg_10 },
    { defaultImg: sdg11, hoverImg: null },
    { defaultImg: sdg12, hoverImg: null },
    { defaultImg: sdg13, hoverImg: sdg_13 },
    { defaultImg: sdg14, hoverImg: sdg_14 },
    { defaultImg: sdg15, hoverImg: sdg_15 },
    { defaultImg: sdg16, hoverImg: null },
    { defaultImg: sdg17, hoverImg: sdg_17 },
    { defaultImg: sdg, hoverImg: null },
];

const revealVariant = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
};

export default function Home({ newsArticles = [], promotions = [] }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [showVideo, setShowVideo] = useState(true);
    const [isFading, setIsFading] = useState(false);
    const [slidesPerView, setSlidesPerView] = useState(4);
    const [isMobile, setIsMobile] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [submittedSearch, setSubmittedSearch] = useState('');
    const carouselRef = useRef(null);
    const autoPlayRef = useRef(null);
    const videoRef = useRef(null);
    const isMounted = useRef(true);

    // SDG Flipping Logic
    const [autoFlippedIndices, setAutoFlippedIndices] = useState({});
    const [activeHoverIndex, setActiveHoverIndex] = useState(null);

    // Banner data with fallback to dummy
    const bannerData = useMemo(() => {
        const mappedPromotions = promotions.map((promotion) => ({
            place: promotion.department || 'City College of Cagayan de Oro',
            title: promotion.title || 'Promotion',
            title2: promotion.subtitle || promotion.title2 || '',
            description: promotion.content || promotion.description || '',
            image: normalizeImagePath(promotion.carousel_image_url || promotion.image_url || promotion.image_path),
            bannerImage: normalizeImagePath(promotion.banner_image_url || promotion.image_url || promotion.image_path),
            link: promotion.link || '#',
        }));

        if (mappedPromotions.length === 0) {
            return [DUMMY_BANNER];
        }

        const slides = [];
        const repeatCount = Math.max(5, mappedPromotions.length);
        for (let i = 0; i < repeatCount; i++) {
            slides.push(mappedPromotions[i % mappedPromotions.length]);
        }
        return slides;
    }, [promotions]);

    // Articles with fallback to dummy
    const articles = useMemo(() => {
        const mappedArticles = newsArticles.map((article) => ({
            id: article.id || `article-${Date.now()}-${Math.random()}`,
            date: article.date || article.created_at || '',
            title: article.title || 'News item',
            excerpt: article.content || '',
            category: article.category || 'News',
            department: article.department || article.category || 'News',
            image: normalizeImagePath(article.image_path || article.image),
            alt: article.article_alt_text || article.alt_text || article.title || 'News image',
            link: `/news/${article.id}`,
            sdgNumbers: (() => {
                if (!article.sdg_numbers) return [];
                if (Array.isArray(article.sdg_numbers)) {
                    return article.sdg_numbers.filter(num => !isNaN(num));
                }
                if (typeof article.sdg_numbers === 'string') {
                    return article.sdg_numbers
                        .split(',')
                        .map((value) => Number(value.trim()))
                        .filter((value) => !Number.isNaN(value));
                }
                return [];
            })(),
        }));

        return mappedArticles.length > 0 ? mappedArticles : DUMMY_ARTICLES;
    }, [newsArticles]);

    // Create carousel items with unique keys
    const carouselItems = useMemo(() => {
        if (articles.length === 0) return [];
        return articles.map((article, idx) => ({
            ...article,
            _uniqueKey: `article-${article.id}-${idx}`
        }));
    }, [articles]);

    // For infinite scroll, triple the items
    const carouselSlides = useMemo(() => {
        if (carouselItems.length === 0) return [];
        return [...carouselItems, ...carouselItems, ...carouselItems];
    }, [carouselItems]);

    const totalSlides = articles.length;

    // Filter articles based on submitted search query
    const filteredArticles = useMemo(() => {
        if (!submittedSearch.trim()) return articles;
        
        const query = submittedSearch.toLowerCase();
        return articles.filter((article) => 
            article.title.toLowerCase().includes(query) ||
            article.excerpt.toLowerCase().includes(query) ||
            article.department.toLowerCase().includes(query) ||
            article.category.toLowerCase().includes(query)
        );
    }, [articles, submittedSearch]);

    // SDG Auto-flip effect
    useEffect(() => {
        const triggerRandomFlip = () => {
            const randomIndex = Math.floor(Math.random() * SDG_IMAGES.length);
            const item = SDG_IMAGES[randomIndex];

            if (item.hoverImg) {
                setAutoFlippedIndices((prev) => ({
                    ...prev,
                    [randomIndex]: true,
                }));

                const flipBackDelay = 2000 + Math.random() * 2000;
                setTimeout(() => {
                    setAutoFlippedIndices((prev) => ({
                        ...prev,
                        [randomIndex]: false,
                    }));
                }, flipBackDelay);
            }
        };

        const intervalId = setInterval(() => {
            triggerRandomFlip();
        }, 2000 + Math.random() * 3000);

        return () => clearInterval(intervalId);
    }, []);

    // Get slides per view based on screen width
    const getSlidesPerView = useCallback(() => {
        if (typeof window !== 'undefined') {
            const width = window.innerWidth;
            if (width <= 640) return 1;
            if (width <= 992) return 2;
            if (width <= 1200) return 3;
        }
        return 4;
    }, []);

    // Check if mobile
    const checkIsMobile = useCallback(() => {
        if (typeof window !== 'undefined') {
            return window.innerWidth <= 640;
        }
        return false;
    }, []);

    // Update slides per view and mobile state on resize
    useEffect(() => {
        const updateView = () => {
            setSlidesPerView(getSlidesPerView());
            setIsMobile(checkIsMobile());
        };
        
        updateView();
        window.addEventListener('resize', updateView);
        return () => window.removeEventListener('resize', updateView);
    }, [getSlidesPerView, checkIsMobile]);

    // Auto-play the video and start fade out when it ends
    useEffect(() => {
        if (videoRef.current && showVideo) {
            videoRef.current.play().catch(error => {
                console.log('Video autoplay failed:', error);
            });

            const handleVideoEnd = () => {
                setIsFading(true);
                setTimeout(() => {
                    setShowVideo(false);
                    setIsFading(false);
                }, 1000);
            };

            videoRef.current.addEventListener('ended', handleVideoEnd);

            return () => {
                if (videoRef.current) {
                    videoRef.current.removeEventListener('ended', handleVideoEnd);
                }
            };
        }
    }, [showVideo]);

    // Reset to middle position when initializing (Desktop) or start position (Mobile)
    useEffect(() => {
        if (!showVideo && totalSlides > 0) {
            // Mobile: start at first slide (index 0)
            if (isMobile) {
                setCurrentIndex(0);
            } else {
                // Desktop: start at middle position for infinite scroll
                setCurrentIndex(totalSlides);
            }
        }
    }, [showVideo, totalSlides, isMobile]);

    // Get current slide index for indicators (before callbacks that use it)
    const getCurrentSlideIndex = () => {
        if (totalSlides === 0) return 0;
        if (currentIndex >= totalSlides * 2) {
            return currentIndex - totalSlides * 2;
        }
        if (currentIndex >= totalSlides) {
            return currentIndex - totalSlides;
        }
        return currentIndex;
    };

    const goToSlide = useCallback((index) => {
        if (isTransitioning || totalSlides === 0) return;
        
        // Clamp the index to valid range
        const maxIndex = totalSlides * 3 - 1;
        const clampedIndex = Math.max(0, Math.min(index, maxIndex));
        
        setIsTransitioning(true);
        setCurrentIndex(clampedIndex);
        
        // Reset transition state after animation completes
        setTimeout(() => {
            if (isMounted.current) {
                setIsTransitioning(false);
            }
        }, 500);
    }, [isTransitioning, totalSlides]);

    const goToNextSlide = useCallback(() => {
        if (isTransitioning || totalSlides === 0 || showVideo) return;
        
        // On mobile: no infinite scroll, stop at the end
        if (isMobile) {
            const visibleIndex = getCurrentSlideIndex();
            if (visibleIndex >= articles.length - 1) return; // Stop at last slide
            goToSlide(currentIndex + 1);
            return;
        }
        
        // Desktop: infinite scroll
        let nextIndex = currentIndex + 1;
        
        // If we're at the end of the slides, wrap around to the middle set
        if (nextIndex >= totalSlides * 2) {
            // Jump to the first slide of the middle set
            setIsTransitioning(true);
            setCurrentIndex(totalSlides);
            setTimeout(() => {
                if (isMounted.current) {
                    setIsTransitioning(false);
                }
            }, 50);
            return;
        }
        
        goToSlide(nextIndex);
    }, [currentIndex, isTransitioning, goToSlide, totalSlides, showVideo, isMobile, articles.length]);

    const goToPrevSlide = useCallback(() => {
        if (isTransitioning || totalSlides === 0 || showVideo) return;
        
        // On mobile: no infinite scroll, stop at the beginning
        if (isMobile) {
            const visibleIndex = getCurrentSlideIndex();
            if (visibleIndex <= 0) return; // Stop at first slide
            goToSlide(currentIndex - 1);
            return;
        }
        
        // Desktop: infinite scroll
        let prevIndex = currentIndex - 1;
        
        // If we're at the beginning, wrap around to the end of the middle set
        if (prevIndex < totalSlides) {
            // Jump to the last slide of the middle set
            setIsTransitioning(true);
            setCurrentIndex(totalSlides * 2 - 1);
            setTimeout(() => {
                if (isMounted.current) {
                    setIsTransitioning(false);
                }
            }, 50);
            return;
        }
        
        goToSlide(prevIndex);
    }, [currentIndex, isTransitioning, goToSlide, totalSlides, showVideo, isMobile, articles.length]);

    // Handle infinite scroll - reset position when reaching boundaries (Desktop only)
    useEffect(() => {
        if (carouselSlides.length === 0 || totalSlides === 0 || showVideo || isMobile) return;

        const handleTransitionEnd = () => {
            if (!isMounted.current) return;
            
            // If we've scrolled past the second set (end of middle set)
            if (currentIndex >= totalSlides * 2) {
                setIsTransitioning(true);
                // Jump back to the start of the middle set without animation
                setCurrentIndex(totalSlides);
                setTimeout(() => {
                    if (isMounted.current) {
                        setIsTransitioning(false);
                    }
                }, 50);
            } 
            // If we've scrolled before the first set (beginning)
            else if (currentIndex < totalSlides) {
                setIsTransitioning(true);
                // Jump to the end of the middle set without animation
                setCurrentIndex(totalSlides * 2 - 1);
                setTimeout(() => {
                    if (isMounted.current) {
                        setIsTransitioning(false);
                    }
                }, 50);
            }
        };

        const carousel = carouselRef.current;
        if (carousel) {
            carousel.addEventListener('transitionend', handleTransitionEnd);
            return () => {
                carousel.removeEventListener('transitionend', handleTransitionEnd);
            };
        }
    }, [currentIndex, totalSlides, carouselSlides.length, showVideo, isMobile]);

    // Auto-play - ONLY on desktop (not mobile)
    useEffect(() => {
        if (autoPlayRef.current) {
            clearInterval(autoPlayRef.current);
            autoPlayRef.current = null;
        }

        if (carouselSlides.length === 0 || totalSlides === 0 || showVideo || isMobile) {
            return;
        }

        autoPlayRef.current = setInterval(() => {
            if (isMounted.current && !showVideo && !isMobile) {
                goToNextSlide();
            }
        }, 5000);

        return () => {
            if (autoPlayRef.current) {
                clearInterval(autoPlayRef.current);
                autoPlayRef.current = null;
            }
        };
    }, [goToNextSlide, carouselSlides.length, totalSlides, showVideo, isMobile]);

    // Pause auto-play on hover (desktop only)
    const handleMouseEnter = useCallback(() => {
        if (isMobile) return;
        if (autoPlayRef.current) {
            clearInterval(autoPlayRef.current);
            autoPlayRef.current = null;
        }
    }, [isMobile]);

    const handleMouseLeave = useCallback(() => {
        if (isMobile) return;
        if (carouselSlides.length === 0 || totalSlides === 0 || showVideo) return;

        if (autoPlayRef.current) {
            clearInterval(autoPlayRef.current);
            autoPlayRef.current = null;
        }

        autoPlayRef.current = setInterval(() => {
            if (isMounted.current && !showVideo && !isMobile) {
                goToNextSlide();
            }
        }, 5000);
    }, [goToNextSlide, carouselSlides.length, totalSlides, showVideo, isMobile]);

    // Cleanup on unmount
    useEffect(() => {
        isMounted.current = true;
        return () => {
            isMounted.current = false;
            if (autoPlayRef.current) {
                clearInterval(autoPlayRef.current);
                autoPlayRef.current = null;
            }
        };
    }, []);

    useEffect(() => {
        const cleanup = initLandingAnimations(bannerData);
        return () => {
            if (cleanup) cleanup();
        };
    }, [bannerData]);

    // Render news card
    const renderNewsCard = (news, index) => (
        <article
            key={news._uniqueKey || `news-${news.id}-${index}`}
            className="news-card reveal-on-scroll home-content-reveal"
        >
            <div className="news-card-image-wrapper group">
                <img
                    src={news.image}
                    alt={news.alt}
                    className="news-card-image transition-transform duration-500 ease-out group-hover:scale-105"
                    loading="lazy"
                />
                <div className="news-card-badge">
                    {news.department || news.category || 'News'}
                </div>
            </div>

            <div className="news-card-content">
                <div className="space-y-3">
                    <div className="news-date">
                        {news.date} · {calculateReadTime(news.excerpt)}
                    </div>
                    {news.sdgNumbers && news.sdgNumbers.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                            {news.sdgNumbers.slice(0, 3).map((sdg) => {
                                const color = SDG_COLORS[sdg] || { bg: '#e2e8f0', text: '#0f172a', border: '#cbd5e1' };
                                return (
                                    <span
                                        key={`sdg-${news.id}-${sdg}`}
                                        className="rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.12em]"
                                        style={{ backgroundColor: color.bg, color: color.text, border: `1px solid ${color.border}` }}
                                    >
                                        SDG {sdg}
                                    </span>
                                );
                            })}
                            {news.sdgNumbers.length > 3 && (
                                <span className="rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] bg-gray-200 text-gray-700 border border-gray-300">
                                    +{news.sdgNumbers.length - 3}
                                </span>
                            )}
                        </div>
                    )}
                </div>

                <h3 className="news-card-title">
                    <a href={news.link} className="news-title-link-modern">
                        {news.title}
                    </a>
                </h3>

                <p className="news-excerpt">
                    {stripHtmlAndTruncate(news.excerpt, 120)}
                </p>

                <a href={news.link} className="news-read-more">
                    Read Article
                    <svg className="news-arrow-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                </a>
            </div>
        </article>
    );

    return (
        <MainLayout title="Home" showTitle={false} maxWidth="full" containerClassName="px-0" mainClassName="py-0" className="overflow-hidden pb-0">
            <div className="landing-page w-full">
                <div className="indicator"></div>

                {/* Video Banner Overlay */}
                {showVideo && (
                    <div className={`video-banner-overlay ${isFading ? 'fade-out' : ''}`}>
                        <video
                            ref={videoRef}
                            className="video-banner"
                            muted
                            playsInline
                            preload="auto"
                        >
                            <source src={bannerVideo} type="video/mp4" />
                        </video>
                    </div>
                )}

                <div id="demo" style={{ display: showVideo ? 'none' : 'block' }}>
                    {bannerData.map((item, index) => (
                        <div
                            key={`card-${index}`}
                            className="card"
                            id={`card${index}`}
                            style={{
                                backgroundImage: `url(${item.image})`,
                            }}
                        />
                    ))}
                    {bannerData.map((item, index) => (
                        <div
                            key={`content-${index}`}
                            className="card-content"
                            id={`card-content-${index}`}
                        >
                            <div className="content-start"></div>
                            <div className="content-place">{item.place}</div>
                            <div className="content-title-1">{item.title}</div>
                            <div className="content-title-2">{item.title2}</div>
                        </div>
                    ))}
                </div>

                <div className="details" id="details-even" style={{ display: showVideo ? 'none' : 'flex' }}>
                    <div className="place-box">
                        <div className="text"></div>
                    </div>
                    <div className="title-box-1">
                        <div className="title-1"></div>
                    </div>
                    <div className="title-box-2">
                        <div className="title-2"></div>
                    </div>
                    <div className="desc"></div>
                    <div className="cta">
                        <a className="discover" href={bannerData[0]?.link || '#'} target="_blank" rel="noopener noreferrer">View Post</a>
                    </div>
                </div>

                <div className="details" id="details-odd" style={{ display: showVideo ? 'none' : 'flex' }}>
                    <div className="place-box">
                        <div className="text"></div>
                    </div>
                    <div className="title-box-1">
                        <div className="title-1"></div>
                    </div>
                    <div className="title-box-2">
                        <div className="title-2"></div>
                    </div>
                    <div className="desc"></div>
                    <div className="cta">
                        <a className="discover" href={bannerData[0]?.link || '#'} target="_blank" rel="noopener noreferrer">View Post</a>
                    </div>
                </div>

                <div className="pagination" id="pagination" style={{ display: showVideo ? 'none' : 'flex' }}>
                    <div className="arrow arrow-left">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M15.75 19.5L8.25 12l7.5-7.5"
                            />
                        </svg>
                    </div>
                    <div className="arrow arrow-right">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M8.25 4.5l7.5 7.5-7.5 7.5"
                            />
                        </svg>
                    </div>
                    <div className="slide-numbers" aria-hidden="true">
                        {bannerData.map((_, index) => (
                            <div
                                key={`slide-number-${index}`}
                                id={`slide-item-${index}`}
                                className="item"
                            >
                                {String(index + 1).padStart(2, '0')}
                            </div>
                        ))}
                    </div>
                    <div className="progress-sub-container">
                        <div className="progress-sub-background">
                            <div className="progress-sub-foreground"></div>
                        </div>
                    </div>
                </div>

                <div className="cover"></div>
            </div>

            {/* --- RANKINGS & RECOGNITION BANNER --- */}
            <section className="rankings-banner">
                <div className="rankings-container">
                    <img
                        src={homeLogo}
                        alt="University rankings and recognition logos"
                        className="home-logo"
                        loading="lazy"
                    />
                </div>
            </section>

            {/* --- WHY CHOOSE CITY COLLEGE OF CDO --- */}
            <section className="features-section">
                <div className="features-container">
                    <div className="features-flex-container">
                        <div className="features-text">
                            <motion.div
                                className="features-header reveal-on-scroll home-content-reveal"
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, amount: 0.2 }}
                                variants={revealVariant}
                                transition={{ duration: 0.6, ease: 'easeOut' }}
                            >
                                <span className="features-eyebrow">Our Difference</span>
                                <h2 className="features-title">
                                    Why Choose City College of <span className="highlight">Cagayan de Oro</span>
                                </h2>
                                <div className="features-underline" aria-hidden="true"></div>
                                <p className="text-base sm:text-xl text-gray-600 leading-relaxed mt-2">
                                    Discover an education grounded in excellence, opportunity, and service to the community.
                                </p>
                            </motion.div>

                            <motion.p
                                className="text-base sm:text-xl text-gray-600 leading-relaxed mt-6 reveal-on-scroll home-content-reveal"
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, amount: 0.2 }}
                                variants={revealVariant}
                                transition={{ duration: 0.7, ease: 'easeOut', delay: 0.1 }}
                            >
                                City College of CDO provides quality education through relevant programs and dedicated instruction. Students gain practical experience, leadership opportunities, and a strong appreciation for culture and excellence while developing the skills to serve their community and build meaningful careers.
                            </motion.p>
                        </div>
                        
                        <motion.div
                            className="features-image-container reveal-on-scroll home-content-reveal reveal-from-right"
                            initial={{ opacity: 0, x: 40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, amount: 0.2 }}
                            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.15 }}
                        >
                            <img 
                                src={studentsImage} 
                                alt="City College of CDO Students" 
                                className="features-image"
                                loading="lazy"
                            />
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* --- LATEST NEWS & UPDATES SECTION --- */}
            <section className="news-section">
                <div className="news-container reveal-on-scroll home-content-reveal">
                    <div className="news-header">
                        <span className="features-eyebrow">Stay Informed</span>
                        <h2 className="news-title">
                            Latest <span className="green">News</span> & <span className="green">Updates</span>
                        </h2>
                        <div className="news-title-underline"></div>
                    </div>

                    {/* Search Bar */}
                    <div className="mb-8 mt-6">
                        <div className="relative max-w-2xl mx-auto">
                            <input
                                type="text"
                                placeholder="Search news and articles..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                onKeyPress={(e) => {
                                    if (e.key === 'Enter' && searchQuery.trim()) {
                                        router.visit(`/news/latest?search=${encodeURIComponent(searchQuery)}`);
                                    }
                                }}
                                className="w-full pl-6 pr-16 py-3 rounded-full border-0 focus:outline-none transition duration-200 text-base shadow-lg"
                            />
                            <button
                                onClick={() => {
                                    if (searchQuery.trim()) {
                                        router.visit(`/news/latest?search=${encodeURIComponent(searchQuery)}`);
                                    }
                                }}
                                className="absolute right-1 top-1/2 transform -translate-y-1/2 w-11 h-11 rounded-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 transition duration-200 font-semibold flex items-center justify-center"
                                title="Search articles"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    {filteredArticles.length > 0 ? (
                        <>
                            {/* 3D Coverflow Carousel */}
                            <div style={{ marginTop: '2rem', marginBottom: '2rem' }}>
                                <ArticlesCoverflow 
                                    articles={filteredArticles}
                                    cardWidth={280}
                                    cardHeight={420}
                                    radius={0}
                                    tilt={8}
                                    sideTilt={6}
                                    gap={12}
                                    opacity={50}
                                    autoplay={true}
                                    showTitle={true}
                                    titleColor="#ffffff"
                                />
                            </div>

                            {/* View All Button */}
                            <div className="news-view-all-wrapper">
                                <a href="/news/latest" className="news-view-all-btn">
                                    View All News
                                </a>
                            </div>
                        </>
                    ) : (
                        <div className="news-empty-message">
                            {searchQuery ? `No articles found matching "${searchQuery}". Try a different search term.` : 'No news articles are available at this time.'}
                        </div>
                    )}
                </div>
            </section>

            {/* --- NEW SECTION WITH TWO CONTAINERS --- */}
            <section className="new-features-section">
                <div className="new-features-container">
                    {/* Updated header with green styling */}
                    <div className="new-features-header reveal-on-scroll home-content-reveal">
                        <span className="new-features-eyebrow">Sustainable Development Goals</span>
                        <h2 className="new-features-title">
                            CCCDO's Commitment to <span className="highlight">SDG</span>
                        </h2>
                        <div className="new-features-underline" aria-hidden="true"></div>
                    </div>

                    <div className="new-features-grid">
                        {/* Container 1 - SDG Image */}
                        <div className="sdg-image-container reveal-on-scroll home-content-reveal">
                            <img 
                                src={sdgHomeImage} 
                                alt="City College of CDO Sustainable Development Goals" 
                                className="sdg-home-image"
                                loading="lazy"
                            />
                        </div>

                        {/* Container 2 - SDG Flipping Images */}
                        <div className="sdg-card-container reveal-on-scroll home-content-reveal">
                            <div className="sdg-grid-container">
                                <div className="sdg-grid">
                                    {SDG_IMAGES.map((item, index) => {
                                        const isAutoFlipped = autoFlippedIndices[index];
                                        const isHovered = activeHoverIndex === index;
                                        
                                        const currentSrc = isHovered && item.hoverImg 
                                            ? item.hoverImg 
                                            : isAutoFlipped && item.hoverImg 
                                            ? item.hoverImg 
                                            : item.defaultImg;

                                        return (
                                            <div
                                                key={index}
                                                className="sdg-image-wrapper"
                                                onMouseEnter={() => item.hoverImg && setActiveHoverIndex(index)}
                                                onMouseLeave={() => setActiveHoverIndex(null)}
                                            >
                                                <img
                                                    src={currentSrc}
                                                    alt={`SDG ${index + 1}`}
                                                    className="sdg-image"
                                                    loading="lazy"
                                                />
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                            {/* View More Button - Updated to green */}
                            <div className="sdg-view-more-wrapper">
                                <a href="/sdg" className="sdg-view-more-btn">
                                    View More
                                    <svg className="sdg-view-more-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </MainLayout>
    );
}