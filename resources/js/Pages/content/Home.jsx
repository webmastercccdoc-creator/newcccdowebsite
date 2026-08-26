import { useEffect, useMemo, useState, useRef, useCallback } from 'react';
import MainLayout from '../../layouts/MainLayout';
import '../../../css/home.css';
import { initLandingAnimations } from '../../home-animations';

// Ranking Logos
import homeLogo from '../../assets/logos/home-logo.png';

// Import Video
import bannerVideo from '../../assets/video/video-banner.mp4';

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

export default function Home({ newsArticles = [], promotions = [] }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [showVideo, setShowVideo] = useState(true);
    const [isFading, setIsFading] = useState(false);
    const [slidesPerView, setSlidesPerView] = useState(4);
    const [isMobile, setIsMobile] = useState(false);
    const carouselRef = useRef(null);
    const autoPlayRef = useRef(null);
    const videoRef = useRef(null);
    const isMounted = useRef(true);

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

    // Reset to middle position when initializing (only when video is hidden)
    useEffect(() => {
        if (!showVideo && totalSlides > 0) {
            setCurrentIndex(totalSlides);
        }
    }, [showVideo, totalSlides]);

    const goToSlide = useCallback((index) => {
        if (isTransitioning || totalSlides === 0) return;
        setIsTransitioning(true);
        setCurrentIndex(index);
        setTimeout(() => {
            if (isMounted.current) {
                setIsTransitioning(false);
            }
        }, 500);
    }, [isTransitioning, totalSlides]);

    const goToNextSlide = useCallback(() => {
        if (isTransitioning || totalSlides === 0 || showVideo) return;
        const nextIndex = currentIndex + 1;
        goToSlide(nextIndex);
    }, [currentIndex, isTransitioning, goToSlide, totalSlides, showVideo]);

    const goToPrevSlide = useCallback(() => {
        if (isTransitioning || totalSlides === 0 || showVideo) return;
        const prevIndex = currentIndex - 1;
        goToSlide(prevIndex);
    }, [currentIndex, isTransitioning, goToSlide, totalSlides, showVideo]);

    // Handle infinite scroll - reset position when reaching boundaries
    useEffect(() => {
        if (carouselSlides.length === 0 || totalSlides === 0 || showVideo) return;

        const handleTransitionEnd = () => {
            if (!isMounted.current) return;
            
            if (currentIndex >= totalSlides * 2) {
                setIsTransitioning(true);
                setCurrentIndex(totalSlides);
                setTimeout(() => {
                    if (isMounted.current) {
                        setIsTransitioning(false);
                    }
                }, 50);
            } else if (currentIndex < totalSlides) {
                setIsTransitioning(true);
                setCurrentIndex(totalSlides);
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
    }, [currentIndex, totalSlides, carouselSlides.length, showVideo]);

    // Auto-play - ONLY on desktop (not mobile)
    useEffect(() => {
        // Clear any existing interval
        if (autoPlayRef.current) {
            clearInterval(autoPlayRef.current);
            autoPlayRef.current = null;
        }

        // Only start auto-play if NOT mobile and video is hidden
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

        // Clear existing interval
        if (autoPlayRef.current) {
            clearInterval(autoPlayRef.current);
            autoPlayRef.current = null;
        }

        // Start new interval
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

    useEffect(() => {
        const revealElements = document.querySelectorAll('.home-content-reveal');
        if (!revealElements.length) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('revealed');
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
        );

        revealElements.forEach((element) => observer.observe(element));

        return () => observer.disconnect();
    }, []);

    // Get current slide index for indicators (mobile only)
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
                    <div className="features-header reveal-on-scroll home-content-reveal">
                        <span className="features-eyebrow">Our Difference</span>
                        <h2 className="features-title">Why Choose City College of CDO?</h2>
                        <div className="features-underline" aria-hidden="true"></div>
                        <p className="features-subtitle">
                            Discover an education grounded in excellence, opportunity, and service to the community.
                        </p>
                    </div>

                    <p className="features-subtitle reveal-on-scroll home-content-reveal">
                        City College of CDO provides quality education through relevant programs and dedicated instruction. Students gain practical experience, leadership opportunities, and a strong appreciation for culture and excellence while developing the skills to serve their community and build meaningful careers.
                    </p>
                </div>
            </section>

            {/* --- LATEST NEWS & UPDATES SECTION --- */}
            <section className="news-section">
                <div className="news-container reveal-on-scroll home-content-reveal">
                    <div className="news-header">
                        <h2 className="news-title">
                           News & Updates
                        </h2>
                        <div className="news-title-underline"></div>
                    </div>

                    {articles.length > 0 ? (
                        <>
                            {/* Carousel Container */}
                            <div 
                                className="news-carousel-wrapper"
                                onMouseEnter={handleMouseEnter}
                                onMouseLeave={handleMouseLeave}
                            >
                                <div 
                                    ref={carouselRef}
                                    className="news-carousel-track"
                                    style={{
                                        transform: `translateX(-${currentIndex * (100 / slidesPerView)}%)`,
                                        transition: isTransitioning ? 'transform 0.5s ease-in-out' : 'none',
                                    }}
                                >
                                    {carouselSlides.map((news, index) => (
                                        <div 
                                            key={`carousel-${news._uniqueKey || news.id}-${index}`}
                                            className="news-carousel-slide"
                                            style={{
                                                flex: `0 0 ${100 / slidesPerView}%`,
                                                padding: '0 0.875rem',
                                            }}
                                        >
                                            {renderNewsCard(news, index)}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Mobile Controls - Only visible on mobile */}
                            {isMobile && (
                                <div className="news-mobile-controls">
                                    <button 
                                        className="mobile-prev-btn"
                                        onClick={goToPrevSlide}
                                        aria-label="Previous news"
                                    >
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M15 18l-6-6 6-6" />
                                        </svg>
                                    </button>

                                    <div className="mobile-indicators">
                                        {articles.map((_, index) => (
                                            <button
                                                key={`mobile-indicator-${index}`}
                                                className={`mobile-dot ${index === getCurrentSlideIndex() % articles.length ? 'active' : ''}`}
                                                onClick={() => goToSlide(index + totalSlides)}
                                                aria-label={`Go to slide ${index + 1}`}
                                            />
                                        ))}
                                    </div>

                                    <button 
                                        className="mobile-next-btn"
                                        onClick={goToNextSlide}
                                        aria-label="Next news"
                                    >
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M9 18l6-6-6-6" />
                                        </svg>
                                    </button>
                                </div>
                            )}

                            {/* View All News Button */}
                            <div className="news-view-all-wrapper">
                                <a href="/news/latest" className="news-view-all-btn">
                                    View All News
                                </a>
                            </div>
                        </>
                    ) : (
                        <div className="news-empty-message">
                            No news articles are available at this time.
                        </div>
                    )}
                </div>
            </section>

        </MainLayout>
    );
}