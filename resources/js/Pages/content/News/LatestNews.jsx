import { useEffect, useState } from 'react';
import MainLayout from '../../../layouts/MainLayout';
import { motion, AnimatePresence } from 'framer-motion';

const normalizeImagePath = (value) => {
    if (!value) return 'https://placehold.co/600x400/cccccc/ffffff?text=No+Image';
    if (/^https?:\/\//i.test(value) || value.startsWith('data:')) return value;

    return '/' + value.replace(/^\/+/, '');
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

    // --- ANIMATION VARIANTS ---
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1, 
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: { 
                type: "spring", 
                stiffness: 100, 
                damping: 12 
            }
        },
        exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2 } }
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

            {/* Search and Filter Bar */}
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-10 pb-4">
                <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                    <div className="relative w-full sm:w-2/3">
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

                    <div className="w-full sm:w-1/3 flex gap-2 items-center justify-end">
                        <label htmlFor="year-filter" className="text-sm font-medium text-gray-700 whitespace-nowrap">
                            Filter by Year:
                        </label>
                        <select
                            id="year-filter"
                            value={selectedYear}
                            onChange={(e) => setSelectedYear(e.target.value)}
                            className="w-full sm:w-auto py-3 px-3 border border-gray-300 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent text-sm"
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
                <motion.div 
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <AnimatePresence>
                        {filteredArticles.length > 0 ? (
                            filteredArticles.map((item, index) => {
                                const thumbnailImage = normalizeImagePath(item.image_path || item.image);
                                const thumbnailAlt = item.article_alt_text || item.alt_text || item.title;

                                return (
                                    <motion.article
                                        key={item.id}
                                        className="bg-white rounded-xl shadow-md border border-transparent hover:border-green-600 hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col h-full group"
                                        variants={itemVariants}
                                        initial="hidden"
                                        animate="visible"
                                        exit="exit"
                                        layout
                                        whileHover={{ 
                                            y: -6, 
                                            transition: { duration: 0.2 }
                                        }}
                                    >
                                        {/* Image Container with New Badge */}
                                        <div className="relative h-56 w-full bg-gray-100 overflow-hidden">
                                            <motion.img
                                                src={thumbnailImage}
                                                alt={thumbnailAlt}
                                                className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                                            />
                                            
                                            {/* Optional "New" Badge for the latest article */}
                                            {index === 0 && (
                                                <span className="absolute top-3 right-3 bg-green-600 text-white text-[10px] font-bold uppercase tracking-wide px-2.5 py-1 rounded-full shadow-md">
                                                    New
                                                </span>
                                            )}
                                        </div>
                                        
                                        <div className="p-5 flex flex-col flex-1">
                                            {/* Date */}
                                            <div className="flex items-center gap-2 mb-2">
                                                <svg className="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                </svg>
                                                <p className="text-xs text-gray-500 font-medium">{item.date}</p>
                                            </div>

                                            {/* Title */}
                                            <h3 className="text-[17px] font-bold text-gray-900 mb-2.5 line-clamp-2 leading-snug group-hover:text-green-700 transition-colors">
                                                {item.title}
                                            </h3>

                                            {/* 
                                                FIXED: Description/Excerpt 
                                                Changed from <p> to <div> with dangerouslySetInnerHTML 
                                                so HTML tags render correctly and the text truncates properly.
                                            */}
                                            <div 
                                                className="text-sm text-gray-600 leading-relaxed mb-4 line-clamp-3 flex-1 prose-content"
                                                dangerouslySetInnerHTML={{ __html: item.content }}
                                            />

                                            {/* Read More Link */}
                                            <a 
                                                href={`/news/${item.id}`} 
                                                className="inline-flex items-center text-[13px] font-semibold text-green-700 mt-auto border-b-2 border-transparent hover:border-green-700 transition-all duration-300 pb-0.5"
                                            >
                                                Read Article
                                                <motion.svg 
                                                    className="ml-1.5 w-4 h-4" 
                                                    fill="none" 
                                                    stroke="currentColor" 
                                                    viewBox="0 0 24 24"
                                                    whileHover={{ x: 4 }}
                                                >
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                                </motion.svg>
                                            </a>
                                        </div>
                                    </motion.article>
                                );
                            })
                        ) : (
                            <motion.div 
                                key="empty"
                                className="col-span-1 sm:col-span-2 lg:col-span-3 xl:col-span-4 text-center py-20 text-gray-500"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                            >
                                <p className="text-xl font-medium mb-2">No articles found</p>
                                <p className="text-base">Try adjusting your search or filter criteria.</p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            </div>
        </MainLayout>
    );
}