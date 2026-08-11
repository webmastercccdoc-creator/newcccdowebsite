import { useEffect, useState } from 'react';
import MainLayout from '../../../layouts/MainLayout';
import { motion } from 'framer-motion';

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

    useEffect(() => {
        document.title = "Latest News - City College of Cagayan de Oro";

        if (!initialArticles || initialArticles.length === 0) {
            fetch('/api/news')
                .then((res) => res.json())
                .then((data) => setNewsArticles(data))
                .catch(() => setNewsArticles([]));
        }
    }, []);

    // Dynamic Filtering Logic
    const filteredArticles = newsArticles.filter((item) => {
        const matchesSearch = 
            item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
            item.date.toLowerCase().includes(searchQuery.toLowerCase());

        const itemYear = item.date ? new Date(item.date).getFullYear().toString() : '';
        const matchesYear = selectedYear ? itemYear === selectedYear : true;

        return matchesSearch && matchesYear;
    });

    const availableYears = [...new Set(
        newsArticles
            .map(item => item.date ? new Date(item.date).getFullYear().toString() : null)
            .filter(year => year !== null)
    )].sort((a, b) => b - a);

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

            {/* Search and Filter Bar */}
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-10 pb-4">
                <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                    
                    {/* --- ADDED: Total Articles Counter --- */}
                    <div className="flex items-center gap-2 text-sm font-medium text-gray-600 whitespace-nowrap order-1 sm:order-1 pl-1">
                        <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs">
                            {filteredArticles.length}
                        </span>
                        <span>Total Articles</span>
                    </div>

                    <div className="relative w-full sm:w-2/3 order-3 sm:order-2">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                        <input
                            type="text"
                            placeholder="Search by title or date..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent text-sm"
                        />
                    </div>

                    <div className="w-full sm:w-1/3 flex gap-2 items-center justify-end order-2 sm:order-3">
                        <label htmlFor="year-filter" className="text-sm font-medium text-gray-700 whitespace-nowrap">
                            Filter by Year:
                        </label>
                        <select
                            id="year-filter"
                            value={selectedYear}
                            onChange={(e) => setSelectedYear(e.target.value)}
                            className="w-full sm:w-48 py-3 px-3 border border-gray-300 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent text-sm"
                        >
                            <option value="">All Years</option>
                            {availableYears.map((year) => (
                                <option key={year} value={year}>{year}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            {/* Main Content - 4-COLUMN NEWS GRID */}
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 md:py-16">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredArticles.length > 0 ? (
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
                                        <motion.img
                                            src={thumbnailImage}
                                            alt={thumbnailAlt}
                                            className="news-card-image"
                                            whileHover={{ scale: 1.06 }}
                                            transition={{ duration: 0.4 }}
                                        />

                                        {index === 0 && (
                                            <span className="news-card-badge">
                                                New
                                            </span>
                                        )}
                                    </div>

                                    <div className="news-card-content">
                                        <div className="space-y-3">
                                            <div className="news-date text-sm text-slate-500">
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
                                            <motion.svg
                                                className="news-arrow-icon"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                                whileHover={{ x: 4 }}
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                            </motion.svg>
                                        </a>
                                    </div>
                                </article>
                            );
                        })
                    ) : (
                        <div className="col-span-1 sm:col-span-2 lg:col-span-3 xl:col-span-4 text-center py-20 text-gray-500">
                            <p className="text-xl font-medium mb-2">No articles found</p>
                            <p className="text-base">Try adjusting your search or filter criteria.</p>
                        </div>
                    )}
                </div>
            </div>
        </MainLayout>
    );
}