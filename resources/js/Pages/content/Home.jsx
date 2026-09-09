import { useEffect, useMemo, useState } from 'react';
import MainLayout from '../../layouts/MainLayout';
import '../../../css/home.css';
import { initLandingAnimations } from '../../home-animations';

// Ranking Logos
import theLogo from '../../assets/logos/the.png';
import wuriLogo from '../../assets/logos/wuri.png';
import greenMetricLogo from '../../assets/logos/green-metric.png';
import sIndexLogo from '../../assets/logos/s-index.png';
import sdgLogo from '../../assets/logos/sdg.png';

// Cultural Center Image
import culturalArtsImage from '../../assets/images/Culturals Arts.jpg';
import oroDayaawImage from '../../assets/images/OroDayaw.PNG';
import talindawChoraleImage from '../../assets/images/TalndawChorale.jpg';

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

const RANKINGS = [
    { id: 'the',          logo: theLogo,          alt: 'Times Higher Education' },
    { id: 'wuri',         logo: wuriLogo,         alt: 'WURI - World University Rankings for Innovation' },
    { id: 'green-metric', logo: greenMetricLogo,  alt: 'UI Green Metric World University Rankings' },
    { id: 's-index',      logo: sIndexLogo,       alt: 'AD Scientific Index' },
    { id: 'sdg',          logo: sdgLogo,          alt: 'UN Sustainable Development Goals' },
];

const ENSEMBLES = [
    { 
        id: 1,
        name: 'Oro Dayaaw',
        description: 'Celebrating the vibrant musical heritage and rhythms of Mindanao',
        image: oroDayaawImage
    },
    { 
        id: 2,
        name: 'Talindaw Chorale',
        description: 'A world-class vocal ensemble performing classical and contemporary compositions',
        image: talindawChoraleImage
    },
];

// Helper function to calculate read time
const calculateReadTime = (content) => {
    if (!content) return '1 min read';
    const wordsPerMinute = 200;
    const text = content.replace(/<[^>]*>/g, '');
    const wordCount = text.split(/\s+/).length;
    const minutes = Math.ceil(wordCount / wordsPerMinute);
    return `${minutes} min read`;
};

// Helper function to strip HTML and truncate
const stripHtmlAndTruncate = (html, maxLength = 120) => {
    if (!html) return '';
    const text = html.replace(/<[^>]*>/g, '');
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
};

export default function Home({ newsArticles = [], promotions = [] }) {
    const [ensembleSlide, setEnsembleSlide] = useState(0);

    const bannerData = useMemo(() => {
        const mappedPromotions = promotions.map((promotion) => ({
            place: promotion.department || 'City College of Cagayan de Oro',
            title: promotion.title || 'Promotion',
            title2: '',
            description: promotion.content || '',
            image: normalizeImagePath(promotion.carousel_image_url || promotion.image_url || promotion.image_path),
            bannerImage: normalizeImagePath(promotion.banner_image_url || promotion.image_url || promotion.image_path),
            link: promotion.link || '#',
        }));

        if (mappedPromotions.length === 0) return [];

        return Array.from({ length: Math.max(mappedPromotions.length, 5) }, (_, index) => (
            mappedPromotions[index % mappedPromotions.length]
        ));
    }, [promotions]);

    const articles = newsArticles.map((article) => ({
        id: article.id,
        date: article.date || article.created_at || '',
        title: article.title || 'News item',
        excerpt: article.content || '',
        category: article.category || 'News',
        image: normalizeImagePath(article.image_path || article.image),
        alt: article.article_alt_text || article.alt_text || article.title || 'News image',
        link: `/news/${article.id}`,
        sdgNumbers: typeof article.sdg_numbers === 'string' && article.sdg_numbers
            ? article.sdg_numbers.split(',').map((value) => Number(value.trim())).filter((value) => !Number.isNaN(value))
            : Array.isArray(article.sdg_numbers)
                ? article.sdg_numbers
                : [],
    }));

    useEffect(() => {
        const cleanup = initLandingAnimations(bannerData);
        return cleanup;
    }, [bannerData]);

    const goToPrevSlide = () => {
        setEnsembleSlide((prev) => (prev === 0 ? ENSEMBLES.length - 1 : prev - 1));
    };

    const goToNextSlide = () => {
        setEnsembleSlide((prev) => (prev === ENSEMBLES.length - 1 ? 0 : prev + 1));
    };

    return (
        <MainLayout title="Home" showTitle={false} maxWidth="full" containerClassName="px-0" mainClassName="py-0" className="overflow-hidden pb-0">
            <div className="landing-page w-full">
                <div className="indicator"></div>

                <div id="demo">
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

                <div className="details" id="details-even">
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

                <div className="details" id="details-odd">
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

                <div className="pagination" id="pagination">
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
                    <div className="rankings-inner">
                        {RANKINGS.map((item) => (
                            <div className="ranking-logo-item" key={item.id}>
                                <img
                                    src={item.logo}
                                    alt={item.alt}
                                    className="ranking-logo"
                                    loading="lazy"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- CENTER FOR CULTURAL AND THE ARTS SECTION --- */}
            <section className="cultural-center-section">
                <div className="cultural-center-container">
                    <div className="cultural-center-content">
                        <div className="cultural-center-left">
                            <div className="cultural-center-description">
                                <h2 className="cultural-center-title">Center for Cultural and the Arts</h2>
                                <p className="cultural-center-text">
                                    The Center for Cultural and the Arts at City College of Cagayan de Oro is dedicated to preserving, promoting, and celebrating the rich cultural heritage of Mindanao. We foster artistic excellence through innovative programs, collaborative initiatives, and community engagement that honors both traditional and contemporary expressions of culture.
                                </p>
                                <p className="cultural-center-text">
                                    Our mission is to nurture creative talents, preserve indigenous traditions, and provide a platform where artists and cultural enthusiasts can thrive and inspire future generations.
                                </p>
                            </div>
                            <div className="cultural-ensembles">
                                <h3 className="ensembles-title">Our Cultural Ensembles</h3>
                                <div className="ensembles-carousel">
                                    <div className="ensemble-carousel-content">
                                        <div className="ensemble-carousel-slides">
                                            {ENSEMBLES.map((ensemble, index) => (
                                                <div
                                                    key={ensemble.id}
                                                    className={`ensemble-card ${index === ensembleSlide ? 'active' : ''}`}
                                                >
                                                    <div className="ensemble-card-image">
                                                        <img src={ensemble.image} alt={ensemble.name} />
                                                        <div className="ensemble-card-overlay">
                                                            <div className="ensemble-overlay-content">
                                                                <h4 className="ensemble-name">{ensemble.name}</h4>
                                                                <p className="ensemble-overlay-description">{ensemble.description}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    
                                    <div className="ensemble-carousel-controls">
                                        <button
                                            type="button"
                                            className="carousel-prev-btn"
                                            onClick={goToPrevSlide}
                                            aria-label="Previous ensemble"
                                        >
                                            <svg className="h-5 w-5" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M12 16L8 10l4-6" />
                                            </svg>
                                        </button>

                                        <div className="ensemble-carousel-indicators">
                                            {ENSEMBLES.map((_, index) => (
                                                <button
                                                    key={index}
                                                    className={`indicator-dot ${index === ensembleSlide ? 'active' : ''}`}
                                                    onClick={() => setEnsembleSlide(index)}
                                                    aria-label={`Go to ensemble ${index + 1}`}
                                                />
                                            ))}
                                        </div>

                                        <button
                                            type="button"
                                            className="carousel-next-btn"
                                            onClick={goToNextSlide}
                                            aria-label="Next ensemble"
                                        >
                                            <svg className="h-5 w-5" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M8 4l4 6-4 6" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="cultural-center-image-wrapper">
                            <img
                                src={culturalArtsImage}
                                alt="Center for Cultural and the Arts"
                                className="cultural-center-image"
                                loading="lazy"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* --- LATEST NEWS & UPDATES SECTION (REDESIGNED) --- */}
            <section className="news-section">
                <div className="news-container">
                    <div className="news-header">
                        <h2 className="news-title">
                            Latest News & Updates
                        </h2>
                        <div className="news-title-underline"></div>
                    </div>

                    <div className="news-grid">
                        {articles.length > 0 ? (
                            articles.slice(0, 8).map((news, index) => (
                                <article
                                    key={`news-${news.id || index}`}
                                    className="news-card"
                                    style={{ animationDelay: `${index * 0.1}s` }}
                                >
                                    <div className="news-card-image-wrapper">
                                        <img
                                            src={news.image}
                                            alt={news.alt}
                                            className="news-card-image"
                                            loading="lazy"
                                        />
                                        <div className="news-card-badge">
                                            {news.category || 'News'}
                                        </div>
                                    </div>

                                    <div className="news-card-content">
                                        <div className="space-y-3">
                                            <div className="news-date text-sm text-slate-500">
                                                {news.date} · {calculateReadTime(news.excerpt)}
                                            </div>
                                            {news.sdgNumbers && news.sdgNumbers.length > 0 && (
                                                <div className="flex flex-wrap gap-2">
                                                    {news.sdgNumbers.map((sdg) => {
                                                        const color = SDG_COLORS[sdg] || { bg: '#0f172a', text: '#ffffff', border: '#0f172a' };
                                                        return (
                                                            <span
                                                                key={sdg}
                                                                className="rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.12em]"
                                                                style={{ backgroundColor: color.bg, color: color.text, border: `1px solid ${color.border}` }}
                                                            >
                                                                SDG {sdg}
                                                            </span>
                                                        );
                                                    })}
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
                            ))
                        ) : (
                            <div className="news-empty-message">
                                No news articles are available at this time.
                            </div>
                        )}
                    </div>

                    <div className="news-view-all-wrapper">
                        <a href="/news/latest" className="news-view-all-btn">
                            View All News
                        </a>
                    </div>
                </div>
            </section>

        </MainLayout>
    );
}