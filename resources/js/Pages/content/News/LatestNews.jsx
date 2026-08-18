import { useEffect, useState, useMemo } from 'react';
import MainLayout from '../../../layouts/MainLayout';
import '../../../../css/home.css';

const normalizeImagePath = (value) => {
    if (!value) return 'https://placehold.co/600x400/cccccc/ffffff?text=No+Image';
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

export default function LatestNews({ newsArticles: initialArticles = [] }) {
    const [newsArticles, setNewsArticles] = useState(initialArticles);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedYear, setSelectedYear] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        document.title = "Latest News - City College of Cagayan de Oro";

        if (!initialArticles || initialArticles.length === 0) {
            setIsLoading(true);
            fetch('/api/news')
                .then((res) => res.json())
                .then((data) => {
                    setNewsArticles(data);
                    setIsLoading(false);
                })
                .catch(() => {
                    setNewsArticles([]);
                    setIsLoading(false);
                });
        }
    }, []);

    // Simple search across title and content
    const filteredArticles = useMemo(() => {
        return newsArticles.filter((item) => {
            const searchLower = searchQuery.toLowerCase().trim();
            const matchesSearch = !searchLower || 
                item.title.toLowerCase().includes(searchLower) ||
                (item.content && item.content.replace(/<[^>]*>/g, '').toLowerCase().includes(searchLower));

            const itemYear = item.date ? new Date(item.date).getFullYear().toString() : '';
            const matchesYear = selectedYear ? itemYear === selectedYear : true;

            return matchesSearch && matchesYear;
        });
    }, [newsArticles, searchQuery, selectedYear]);

    const availableYears = useMemo(() => {
        return [...new Set(
            newsArticles
                .map(item => item.date ? new Date(item.date).getFullYear().toString() : null)
                .filter(year => year !== null)
        )].sort((a, b) => b - a);
    }, [newsArticles]);

    const clearAllFilters = () => {
        setSearchQuery('');
        setSelectedYear('');
    };

    return (
        <MainLayout 
            maxWidth="full" 
            containerClassName="px-0" 
            mainClassName="py-0" 
            className="overflow-hidden pb-0"
        >
            {/* Hero Banner with Image */}
            <div 
                className="relative w-full bg-cover bg-center bg-no-repeat shadow-lg min-h-[350px] md:min-h-[450px] lg:min-h-[550px] flex items-center justify-center"
                style={{
                    backgroundImage: `url('https://images.unsplash.com/photo-1523050854058-8df90110c7f1?q=80&w=1200&auto=format&fit=crop')`
                }}
            >
                <div className="absolute inset-0 bg-black/50"></div>
                
                <div className="relative z-10 mx-auto max-w-7xl px-6 text-center">
                    <h1 className="text-4xl font-bold tracking-tight text-white drop-shadow-md sm:text-5xl md:text-6xl">
                        Latest News
                    </h1>
                    <p className="mx-auto mt-4 max-w-3xl text-lg text-white/90 drop-shadow-md">
                        Stay updated with the latest happenings, announcements, and events at CC de Oro.
                    </p>
                </div>
            </div>

            {/* Section Description - No Image, Full Width Content */}
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-12 pb-6">
                <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-200">
                    <div className="flex flex-col">
                        <h2 className="text-xl font-bold text-gray-800 mb-3">
                            Your Source for Campus News and Updates
                        </h2>
                        
                        <div className="space-y-3 text-gray-600 text-sm leading-relaxed">
                            <p>
                                Welcome to the official news hub of City College of Cagayan de Oro (CC de Oro), your premier source for 
                                the latest developments, announcements, and stories from our vibrant academic community. As a leading 
                                institution committed to excellence in education, we take pride in keeping our students, faculty, staff, 
                                and stakeholders informed about the events and achievements that shape our institution's legacy.
                            </p>
                            
                            <p>
                                Our news section serves as a digital window into the dynamic life at CC de Oro, featuring a comprehensive 
                                coverage of academic achievements, groundbreaking research initiatives, campus events, student success 
                                stories, faculty accomplishments, and institutional milestones. Whether it's a new academic program 
                                launch, a significant research breakthrough, or a community outreach initiative, we bring you the 
                                stories that matter most to our CC de Oro family.
                            </p>
                            
                            <p>
                                Beyond just reporting news, we aim to inspire and connect our community members by highlighting the 
                                remarkable contributions of our students and faculty. From award-winning research projects to 
                                innovative teaching methodologies, from cultural celebrations to sports achievements, our news 
                                coverage reflects the diverse and inclusive spirit that defines CC de Oro.
                            </p>
                            
                            <p>
                                We invite you to explore our latest articles, announcements, and feature stories that showcase the 
                                excellence, innovation, and community engagement that are hallmarks of the City College of Cagayan 
                                de Oro experience. Stay informed, stay inspired, and be part of our ongoing journey towards 
                                academic excellence and social transformation.
                            </p>
                            
                            {/* Simple text labels without colors */}
                            <div className="flex flex-wrap gap-4 pt-2 text-xs font-medium text-gray-500">
                                <span>Student Achievements</span>
                                <span>•</span>
                                <span>Campus Events</span>
                                <span>•</span>
                                <span>Academic Excellence</span>
                                <span>•</span>
                                <span>Community Engagement</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Search and Filter Bar - Clean & Presentable */}
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-4 pb-4">
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="p-4 md:p-5">
                        {/* Search and Filter Row */}
                        <div className="flex flex-col sm:flex-row gap-3 items-stretch">
                            {/* Search Input - Simple & Clean */}
                            <div className="flex-1 relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                </div>
                                <input
                                    type="text"
                                    placeholder="Search news..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-9 pr-9 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 text-sm placeholder-gray-400"
                                />
                                {searchQuery && (
                                    <button
                                        onClick={() => setSearchQuery('')}
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                                    >
                                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                                        </svg>
                                    </button>
                                )}
                            </div>

                            {/* Year Filter - Simple Dropdown */}
                            <div className="sm:w-48 relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                                    </svg>
                                </div>
                                <select
                                    value={selectedYear}
                                    onChange={(e) => setSelectedYear(e.target.value)}
                                    className="w-full pl-9 pr-9 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 text-sm text-gray-700 appearance-none cursor-pointer"
                                >
                                    <option value="">All Years</option>
                                    {availableYears.map((year) => (
                                        <option key={year} value={year}>{year}</option>
                                    ))}
                                </select>
                                {selectedYear && (
                                    <button
                                        onClick={() => setSelectedYear('')}
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                                    >
                                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                                        </svg>
                                    </button>
                                )}
                            </div>

                            {/* Results Count - Simple Badge */}
                            <div className="flex items-center justify-center sm:justify-start">
                                <span className="text-xs text-gray-500 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-200 whitespace-nowrap">
                                    {filteredArticles.length} article{filteredArticles.length !== 1 ? 's' : ''}
                                </span>
                            </div>
                        </div>

                        {/* Active Filters - Clean Chips */}
                        {(searchQuery || selectedYear) && (
                            <div className="mt-3 pt-3 border-t border-gray-100 flex flex-wrap items-center gap-2">
                                <span className="text-xs text-gray-500">Filters:</span>
                                {searchQuery && (
                                    <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-green-50 text-green-700 rounded-full text-xs border border-green-200">
                                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                                        </svg>
                                        "{searchQuery}"
                                        <button
                                            onClick={() => setSearchQuery('')}
                                            className="hover:text-red-600 transition-colors ml-0.5"
                                        >
                                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                                            </svg>
                                        </button>
                                    </span>
                                )}
                                {selectedYear && (
                                    <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-blue-50 text-blue-700 rounded-full text-xs border border-blue-200">
                                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                                        </svg>
                                        {selectedYear}
                                        <button
                                            onClick={() => setSelectedYear('')}
                                            className="hover:text-red-600 transition-colors ml-0.5"
                                        >
                                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                                            </svg>
                                        </button>
                                    </span>
                                )}
                                {(searchQuery || selectedYear) && (
                                    <button
                                        onClick={clearAllFilters}
                                        className="text-xs text-gray-400 hover:text-red-500 transition-colors ml-1"
                                    >
                                        Clear all
                                    </button>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Main Content - 4-COLUMN NEWS GRID */}
            <section className="news-section">
                <div className="news-container">
                    <div className="news-grid">
                        {isLoading ? (
                            // Loading Skeleton
                            Array.from({ length: 4 }).map((_, index) => (
                                <div key={`skeleton-${index}`} className="news-card animate-pulse">
                                    <div className="news-card-image-wrapper bg-gray-200 h-48 rounded-t-xl"></div>
                                    <div className="news-card-content p-4">
                                        <div className="h-4 bg-gray-200 rounded w-3/4 mb-3"></div>
                                        <div className="h-3 bg-gray-200 rounded w-1/2 mb-4"></div>
                                        <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                                        <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                                    </div>
                                </div>
                            ))
                        ) : filteredArticles.length > 0 ? (
                            filteredArticles.map((item, index) => {
                                const thumbnailImage = normalizeImagePath(item.image_path || item.image);
                                const thumbnailAlt = item.article_alt_text || item.alt_text || item.title;
                                const sdgNumbers = Array.isArray(item.sdg_numbers)
                                    ? item.sdg_numbers
                                    : typeof item.sdg_numbers === 'string' && item.sdg_numbers
                                        ? item.sdg_numbers.split(',').map((value) => Number(value.trim())).filter((value) => !Number.isNaN(value))
                                        : [];

                                return (
                                    <article
                                        key={item.id}
                                        className="news-card"
                                        style={{ animationDelay: `${index * 0.1}s` }}
                                    >
                                        <div className="news-card-image-wrapper">
                                            <img
                                                src={thumbnailImage}
                                                alt={thumbnailAlt}
                                                className="news-card-image"
                                                loading="lazy"
                                            />

                                            {index === 0 && (
                                                <span className="news-card-badge">
                                                    New
                                                </span>
                                            )}
                                        </div>

                                        <div className="news-card-content">
                                            <div className="space-y-3">
                                                <div className="news-date">
                                                    {item.date}
                                                </div>
                                                {sdgNumbers.length > 0 && (
                                                    <div className="flex flex-wrap gap-2">
                                                        {sdgNumbers.map((sdgNumber) => {
                                                            const palette = SDG_COLORS[sdgNumber] || { bg: '#E5E7EB', text: '#111827', border: '#D1D5DB' };

                                                            return (
                                                                <span
                                                                    key={`${item.id}-sdg-${sdgNumber}`}
                                                                    className="rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.12em]"
                                                                    style={{
                                                                        backgroundColor: palette.bg,
                                                                        color: palette.text,
                                                                        border: `1px solid ${palette.border}`,
                                                                    }}
                                                                >
                                                                    SDG {sdgNumber}
                                                                </span>
                                                            );
                                                        })}
                                                    </div>
                                                )}
                                            </div>

                                            <h3 className="news-card-title">
                                                <a href={`/news/${item.id}`} className="news-title-link-modern">
                                                    {item.title}
                                                </a>
                                            </h3>

                                            <p className="news-excerpt">
                                                {item.content ? item.content.replace(/<[^>]*>/g, '').slice(0, 120) + (item.content.length > 120 ? '...' : '') : ''}
                                            </p>

                                            <a href={`/news/${item.id}`} className="news-read-more">
                                                Read Article
                                                <svg
                                                    className="news-arrow-icon"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                                </svg>
                                            </a>
                                        </div>
                                    </article>
                                );
                            })
                        ) : (
                            <div className="col-span-1 sm:col-span-2 lg:col-span-3 xl:col-span-4 text-center py-16">
                                <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
                                    <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                    </svg>
                                </div>
                                <p className="text-lg font-medium text-gray-700 mb-1">No articles found</p>
                                <p className="text-sm text-gray-500">Try adjusting your search or filter criteria</p>
                                <button
                                    onClick={clearAllFilters}
                                    className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                                    </svg>
                                    Reset Filters
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </MainLayout>
    );
}