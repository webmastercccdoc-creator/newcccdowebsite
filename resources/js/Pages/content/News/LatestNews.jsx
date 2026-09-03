import { useEffect, useState, useMemo } from "react";
import { usePage } from "@inertiajs/react";
import { motion } from "framer-motion";
import MainLayout from "../../../layouts/MainLayout";
import "../../../../css/home.css";
import latestNewsBanner from "../../../assets/banner/latest-news.jpg";
import AnimatedBannerText from "../../../components/content/AnimatedBannerText";

const normalizeImagePath = (value) => {
    if (!value)
        return "https://placehold.co/600x400/cccccc/ffffff?text=No+Image";
    if (/^https?:\/\//i.test(value) || value.startsWith("data:")) return value;
    return "/" + value.replace(/^\/+/, "");
};

const SDG_COLORS = {
    1: { bg: "#E5243B", text: "#FFFFFF", border: "#C81F35" },
    2: { bg: "#DDA63A", text: "#111827", border: "#C5942A" },
    3: { bg: "#4C9F38", text: "#FFFFFF", border: "#3D8A30" },
    4: { bg: "#C5192D", text: "#FFFFFF", border: "#A91427" },
    5: { bg: "#FF3A21", text: "#FFFFFF", border: "#DB2D19" },
    6: { bg: "#26BDE2", text: "#0F172A", border: "#1AA4C8" },
    7: { bg: "#FCC30B", text: "#111827", border: "#E6B108" },
    8: { bg: "#A21942", text: "#FFFFFF", border: "#861635" },
    9: { bg: "#FD6925", text: "#FFFFFF", border: "#E55B1D" },
    10: { bg: "#DD1367", text: "#FFFFFF", border: "#C21058" },
    11: { bg: "#FD9D24", text: "#111827", border: "#E78E1D" },
    12: { bg: "#BF8B2E", text: "#FFFFFF", border: "#A77725" },
    13: { bg: "#3F7E44", text: "#FFFFFF", border: "#2F6536" },
    14: { bg: "#0A97D9", text: "#FFFFFF", border: "#087EB9" },
    15: { bg: "#56C02B", text: "#111827", border: "#47A323" },
    16: { bg: "#00689D", text: "#FFFFFF", border: "#00557E" },
    17: { bg: "#19486A", text: "#FFFFFF", border: "#123A53" },
};

// Placeholder news items for the carousel
const PLACEHOLDER_ARTICLES = [
    {
        id: "placeholder-1",
        title: "CC de Oro Launches New Research Center for Sustainable Development",
        date: "August 20, 2026",
        content:
            "City College of Cagayan de Oro proudly announces the establishment of its new Research Center for Sustainable Development, aimed at addressing pressing environmental and social challenges.",
        image_path:
            "https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=600&auto=format&fit=crop",
        sdg_numbers: [4, 11, 17],
    },
    {
        id: "placeholder-2",
        title: "Student Leaders Shine at National Youth Conference 2026",
        date: "August 18, 2026",
        content:
            "A delegation of student leaders from CC de Oro represented the institution at the National Youth Conference, showcasing their innovative ideas and leadership skills.",
        image_path:
            "https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=600&auto=format&fit=crop",
        sdg_numbers: [5, 16],
    },
    {
        id: "placeholder-3",
        title: "Groundbreaking Partnership with Local Government for Community Development",
        date: "August 15, 2026",
        content:
            "CC de Oro signs a landmark partnership agreement with the local government to implement community development programs that benefit underserved communities.",
        image_path:
            "https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=600&auto=format&fit=crop",
        sdg_numbers: [1, 8, 10],
    },
    {
        id: "placeholder-4",
        title: "Faculty Researchers Win International Award for Innovative Study",
        date: "August 12, 2026",
        content:
            "A team of faculty researchers from CC de Oro has been recognized with an international award for their groundbreaking study on educational technology integration.",
        image_path:
            "https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=600&auto=format&fit=crop",
        sdg_numbers: [4, 9],
    },
    {
        id: "placeholder-5",
        title: "New Scholarship Program Opens Doors for Underprivileged Students",
        date: "August 10, 2026",
        content:
            "CC de Oro announces a new scholarship program that will provide full tuition support to underprivileged students, making quality education accessible to all.",
        image_path:
            "https://images.unsplash.com/photo-1523050854058-8df90110c7f1?q=80&w=600&auto=format&fit=crop",
        sdg_numbers: [1, 4, 10],
    },
];

export default function LatestNews({ newsArticles: initialArticles = [] }) {
    const { props, url } = usePage();
    const [newsArticles, setNewsArticles] = useState(initialArticles);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedYear, setSelectedYear] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const articlesPerPage = 12;

    useEffect(() => {
        document.title = "Latest News - City College of Cagayan de Oro";

        // Extract search parameter from URL
        const params = new URLSearchParams(window.location.search);
        const searchParam = params.get('search');
        if (searchParam) {
            setSearchQuery(decodeURIComponent(searchParam));
        }

        if (!initialArticles || initialArticles.length === 0) {
            setIsLoading(true);
            fetch("/api/news")
                .then((res) => {
                    if (!res.ok)
                        throw new Error(`News request failed: ${res.status}`);
                    return res.json();
                })
                .then((data) => {
                    setNewsArticles(Array.isArray(data) ? data : []);
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
            const matchesSearch =
                !searchLower ||
                item.title.toLowerCase().includes(searchLower) ||
                (item.content &&
                    item.content
                        .replace(/<[^>]*>/g, "")
                        .toLowerCase()
                        .includes(searchLower));

            const itemYear = item.date
                ? new Date(item.date).getFullYear().toString()
                : "";
            const matchesYear = selectedYear ? itemYear === selectedYear : true;

            return matchesSearch && matchesYear;
        });
    }, [newsArticles, searchQuery, selectedYear]);

    const availableYears = useMemo(() => {
        return [
            ...new Set(
                newsArticles
                    .map((item) =>
                        item.date
                            ? new Date(item.date).getFullYear().toString()
                            : null,
                    )
                    .filter((year) => year !== null),
            ),
        ].sort((a, b) => b - a);
    }, [newsArticles]);

    // Pagination logic
    const totalPages = Math.ceil(filteredArticles.length / articlesPerPage);
    const indexOfLastArticle = currentPage * articlesPerPage;
    const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
    const currentArticles = filteredArticles.slice(
        indexOfFirstArticle,
        indexOfLastArticle,
    );

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
        window.scrollTo({
            top: document.querySelector(".news-section").offsetTop - 100,
            behavior: "smooth",
        });
    };

    const goToPreviousPage = () => {
        if (currentPage > 1) {
            paginate(currentPage - 1);
        }
    };

    const goToNextPage = () => {
        if (currentPage < totalPages) {
            paginate(currentPage + 1);
        }
    };

    const clearAllFilters = () => {
        setSearchQuery("");
        setSelectedYear("");
        setCurrentPage(1);
    };

    // Reset to page 1 when search or filter changes
    useEffect(() => {
        setCurrentPage(1);
    }, [searchQuery, selectedYear]);

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
                    backgroundImage: `url(${latestNewsBanner})`,
                }}
            >
                <div className="absolute inset-0 bg-black/50"></div>

                <AnimatedBannerText
                    title="Latest News"
                    description="Stay updated with the latest happenings, announcements, and events at CC de Oro."
                />
            </div>

            {/* Welcome Text and Search Bar */}
            <div className="mb-8 mt-8">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    {/* Welcome Text */}
                    <div className="mb-6">
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-3">
                            Welcome to <span className="text-green-700">City College</span> of <span className="text-green-700">Cagayan de Oro</span>
                        </h2>
                        <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                            Discover the latest news, announcements, and events happening at CC de Oro. 
                            Stay informed and connected with our vibrant academic community.
                        </p>
                        <div className="w-24 h-1 bg-gradient-to-r from-green-600 to-green-400 rounded-full mx-auto mt-4"></div>
                    </div>

                    {/* Search Input */}
                    <div className="relative max-w-2xl mx-auto">
                        <input
                            type="text"
                            placeholder="Search news and articles..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onKeyPress={(e) => {
                                if (e.key === 'Enter') {
                                    // Trigger filter on Enter
                                }
                            }}
                            className="w-full pl-6 pr-16 py-3 rounded-full border-0 focus:outline-none transition duration-200 text-base shadow-lg"
                        />
                        <button
                            onClick={() => {
                                // Filter trigger
                            }}
                            className="absolute right-1 top-1/2 transform -translate-y-1/2 w-11 h-11 rounded-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 transition duration-200 font-semibold flex items-center justify-center shadow-md"
                            title="Search articles"
                            aria-label="Search"
                        >
                            <svg 
                                className="w-5 h-5" 
                                fill="none" 
                                stroke="currentColor" 
                                viewBox="0 0 24 24"
                                strokeWidth="2.5"
                            >
                                <path 
                                    strokeLinecap="round" 
                                    strokeLinejoin="round" 
                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Main Content - static coverflow-style cards in a 4x3 grid without carousel */}
            <section className="news-section">
                <div className="news-container">
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
                        {isLoading ? (
                            Array.from({ length: 8 }).map((_, index) => (
                                <div
                                    key={`skeleton-${index}`}
                                    className="overflow-hidden rounded-[18px] border border-gray-200 bg-white shadow-[0_12px_28px_rgba(15,23,42,0.08)] animate-pulse"
                                >
                                    <div className="h-56 bg-gray-200"></div>
                                    <div className="p-4">
                                        <div className="h-4 bg-gray-200 rounded w-3/4 mb-3"></div>
                                        <div className="h-3 bg-gray-200 rounded w-1/2 mb-4"></div>
                                        <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                                        <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                                    </div>
                                </div>
                            ))
                        ) : currentArticles.length > 0 ? (
                            currentArticles.map((item, index) => {
                                const thumbnailImage = normalizeImagePath(
                                    item.image_path || item.image,
                                );
                                const thumbnailAlt =
                                    item.article_alt_text ||
                                    item.alt_text ||
                                    item.title;
                                const sdgNumbers = Array.isArray(item.sdg_numbers)
                                    ? item.sdg_numbers
                                    : typeof item.sdg_numbers === "string" && item.sdg_numbers
                                        ? item.sdg_numbers
                                            .split(",")
                                            .map((value) => Number(value.trim()))
                                            .filter((value) => !Number.isNaN(value))
                                        : [];

                                // Truncate content to 3 lines
                                const getTruncatedContent = (content, maxLength = 120) => {
                                    if (!content) return "";
                                    const cleanText = content.replace(/<[^>]*>/g, "");
                                    if (cleanText.length <= maxLength) return cleanText;
                                    return cleanText.substring(0, maxLength) + "...";
                                };

                                return (
                                    <motion.article
                                        key={item.id}
                                        className="group overflow-hidden rounded-[18px] border border-gray-200 bg-white shadow-[0_12px_28px_rgba(15,23,42,0.08)] transition-shadow duration-300 hover:shadow-[0_18px_40px_rgba(15,23,42,0.12)]"
                                        initial={{ opacity: 0, y: 36, scale: 0.97 }}
                                        whileInView={{ opacity: 1, y: 0, scale: 1 }}
                                        whileHover={{ y: -4 }}
                                        viewport={{ once: true, amount: 0.18 }}
                                        transition={{
                                            duration: 0.55,
                                            delay: index * 0.06,
                                            ease: "easeOut",
                                        }}
                                    >
                                        <div className="relative h-56 overflow-hidden">
                                            <img
                                                src={thumbnailImage}
                                                alt={thumbnailAlt}
                                                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                                loading="lazy"
                                            />

                                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

                                            {sdgNumbers.length > 0 && (
                                                <div className="absolute left-3 top-3 flex flex-wrap gap-2">
                                                    {sdgNumbers.slice(0, 2).map((sdgNumber) => {
                                                        const palette =
                                                            SDG_COLORS[sdgNumber] || {
                                                                bg: "#E5E7EB",
                                                                text: "#111827",
                                                                border: "#D1D5DB",
                                                            };

                                                        return (
                                                            <span
                                                                key={`${item.id}-sdg-${sdgNumber}`}
                                                                className="rounded-full px-2 py-1 text-[10px] font-bold uppercase tracking-[0.12em]"
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

                                            <div className="absolute bottom-0 left-0 right-0 p-4">
                                                <span className="inline-flex items-center rounded-full border border-white/20 bg-black/40 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-white backdrop-blur-sm">
                                                    {item.department || "News"}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="p-4">
                                            <div className="mb-3 text-[11px] font-medium uppercase tracking-[0.12em] text-gray-500">
                                                {item.date}
                                            </div>

                                            {/* Title - 2 lines with ellipsis */}
                                            <h3 className="mb-3 text-lg font-bold leading-snug text-gray-900">
                                                <a
                                                    href={`/news/${item.id}`}
                                                    className="transition-colors duration-200 hover:text-green-700 line-clamp-2"
                                                    style={{
                                                        display: '-webkit-box',
                                                        WebkitLineClamp: 2,
                                                        WebkitBoxOrient: 'vertical',
                                                        overflow: 'hidden',
                                                        textOverflow: 'ellipsis',
                                                    }}
                                                >
                                                    {item.title}
                                                </a>
                                            </h3>

                                            {/* Content - 3 lines with ellipsis */}
                                            <p 
                                                className="mb-4 text-sm leading-6 text-gray-600"
                                                style={{
                                                    display: '-webkit-box',
                                                    WebkitLineClamp: 3,
                                                    WebkitBoxOrient: 'vertical',
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis',
                                                }}
                                            >
                                                {getTruncatedContent(item.content, 120)}
                                            </p>

                                            <a
                                                href={`/news/${item.id}`}
                                                className="inline-flex items-center gap-2 text-sm font-semibold text-green-700 transition-colors duration-200 hover:text-green-800"
                                            >
                                                Read Article
                                                <svg
                                                    className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth="2"
                                                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                                                    />
                                                </svg>
                                            </a>
                                        </div>
                                    </motion.article>
                                );
                            })
                        ) : (
                            <div className="col-span-1 sm:col-span-2 lg:col-span-3 xl:col-span-4 text-center py-16">
                                <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
                                    <svg
                                        className="w-8 h-8 text-gray-400"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                        ></path>
                                    </svg>
                                </div>
                                <p className="text-lg font-medium text-gray-700 mb-1">
                                    No articles found
                                </p>
                                <p className="text-sm text-gray-500">
                                    Try adjusting your search or filter criteria
                                </p>
                                <button
                                    onClick={clearAllFilters}
                                    className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
                                >
                                    <svg
                                        className="w-4 h-4"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                                        ></path>
                                    </svg>
                                    Reset Filters
                                </button>
                            </div>
                        )}
                    </div>

                    {!isLoading && filteredArticles.length > 0 && totalPages > 1 && (
                        <div className="flex justify-center items-center gap-2 mt-10 pb-8">
                            <button
                                onClick={goToPreviousPage}
                                disabled={currentPage === 1}
                                className={`px-4 py-2 rounded-lg border transition-colors ${
                                    currentPage === 1
                                        ? "bg-gray-100 text-gray-400 cursor-not-allowed border-gray-200"
                                        : "bg-white text-gray-700 hover:bg-gray-50 border-gray-300 hover:border-gray-400"
                                }`}
                            >
                                <svg
                                    className="w-5 h-5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M15 19l-7-7 7-7"
                                    />
                                </svg>
                            </button>

                            {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => {
                                if (
                                    number === 1 ||
                                    number === totalPages ||
                                    (number >= currentPage - 1 && number <= currentPage + 1)
                                ) {
                                    return (
                                        <button
                                            key={number}
                                            onClick={() => paginate(number)}
                                            className={`px-4 py-2 rounded-lg border transition-colors ${
                                                currentPage === number
                                                    ? "bg-green-600 text-white border-green-600 hover:bg-green-700"
                                                    : "bg-white text-gray-700 hover:bg-gray-50 border-gray-300 hover:border-gray-400"
                                            }`}
                                        >
                                            {number}
                                        </button>
                                    );
                                } else if (
                                    (number === currentPage - 2 && currentPage > 3) ||
                                    (number === currentPage + 2 && currentPage < totalPages - 2)
                                ) {
                                    return (
                                        <span key={number} className="px-2 text-gray-400">
                                            …
                                        </span>
                                    );
                                }
                                return null;
                            })}

                            <button
                                onClick={goToNextPage}
                                disabled={currentPage === totalPages}
                                className={`px-4 py-2 rounded-lg border transition-colors ${
                                    currentPage === totalPages
                                        ? "bg-gray-100 text-gray-400 cursor-not-allowed border-gray-200"
                                        : "bg-white text-gray-700 hover:bg-gray-50 border-gray-300 hover:border-gray-400"
                                }`}
                            >
                                <svg
                                    className="w-5 h-5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M9 5l7 7-7 7"
                                    />
                                </svg>
                            </button>
                        </div>
                    )}
                </div>
            </section>
        </MainLayout>
    );
}