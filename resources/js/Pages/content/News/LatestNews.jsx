import { useEffect, useState, useMemo, useRef } from "react";
import MainLayout from "../../../layouts/MainLayout";
import "../../../../css/home.css";
import latestNewsBanner from "../../../assets/banner/latest-news.jpg";

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
    const [newsArticles, setNewsArticles] = useState(initialArticles);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedYear, setSelectedYear] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const articlesPerPage = 8;
    const slideIntervalRef = useRef(null);

    useEffect(() => {
        document.title = "Latest News - City College of Cagayan de Oro";

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

    // Auto-slide functionality
    useEffect(() => {
        if (isAutoPlaying) {
            slideIntervalRef.current = setInterval(() => {
                setCurrentSlide(
                    (prev) => (prev + 1) % PLACEHOLDER_ARTICLES.length,
                );
            }, 5000);
        }
        return () => clearInterval(slideIntervalRef.current);
    }, [isAutoPlaying]);

    const goToSlide = (index) => {
        setCurrentSlide(index);
        setIsAutoPlaying(false);
        clearInterval(slideIntervalRef.current);
        setTimeout(() => setIsAutoPlaying(true), 10000);
    };

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % PLACEHOLDER_ARTICLES.length);
    };

    const prevSlide = () => {
        setCurrentSlide(
            (prev) =>
                (prev - 1 + PLACEHOLDER_ARTICLES.length) %
                PLACEHOLDER_ARTICLES.length,
        );
    };

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

                <div className="relative z-10 mx-auto max-w-7xl px-6 text-center">
                    <h1 className="text-4xl font-bold tracking-tight text-white drop-shadow-md sm:text-5xl md:text-6xl">
                        Latest News
                    </h1>
                    <p className="mx-auto mt-4 max-w-3xl text-lg text-white/90 drop-shadow-md">
                        Stay updated with the latest happenings, announcements,
                        and events at CC de Oro.
                    </p>
                </div>
            </div>

            {/* FEATURED NEWS CAROUSEL */}
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-12 pb-6">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                        <span className="w-1 h-8 bg-green-600 rounded-full"></span>
                        <h2 className="text-2xl font-bold text-gray-800">
                            Featured News
                        </h2>
                    </div>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={prevSlide}
                            className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                            aria-label="Previous slide"
                        >
                            <svg
                                className="w-5 h-5 text-gray-600"
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
                        <button
                            onClick={nextSlide}
                            className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                            aria-label="Next slide"
                        >
                            <svg
                                className="w-5 h-5 text-gray-600"
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
                </div>

                {/* Informational text card (from local changes) */}
                <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-200 mb-6">
                    <div className="flex flex-col">
                        <h2 className="text-xl font-bold text-gray-800 mb-3">
                            Your Source for Campus News and Updates
                        </h2>

                        <div className="space-y-3 text-gray-600 text-sm leading-relaxed">
                            <p>
                                Welcome to the official news hub of City College
                                of Cagayan de Oro (CC de Oro), your premier
                                source for the latest developments,
                                announcements, and stories from our vibrant
                                academic community. As a leading institution
                                committed to excellence in education, we take
                                pride in keeping our students, faculty, staff,
                                and stakeholders informed about the events and
                                achievements that shape our institution's
                                legacy.
                            </p>

                            <p>
                                Our news section serves as a digital window into
                                the dynamic life at CC de Oro, featuring a
                                comprehensive coverage of academic achievements,
                                groundbreaking research initiatives, campus
                                events, student success stories, faculty
                                accomplishments, and institutional milestones.
                                Whether it's a new academic program launch, a
                                significant research breakthrough, or a
                                community outreach initiative, we bring you the
                                stories that matter most to our CC de Oro
                                family.
                            </p>

                            <p>
                                Beyond just reporting news, we aim to inspire
                                and connect our community members by
                                highlighting the remarkable contributions of our
                                students and faculty. From award-winning
                                research projects to innovative teaching
                                methodologies, from cultural celebrations to
                                sports achievements, our news coverage reflects
                                the diverse and inclusive spirit that defines CC
                                de Oro.
                            </p>

                            <p>
                                We invite you to explore our latest articles,
                                announcements, and feature stories that showcase
                                the excellence, innovation, and community
                                engagement that are hallmarks of the City
                                College of Cagayan de Oro experience. Stay
                                informed, stay inspired, and be part of our
                                ongoing journey towards academic excellence and
                                social transformation.
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

                {/* Carousel Container */}
                <div className="relative overflow-hidden rounded-2xl bg-white border border-gray-200 shadow-sm">
                    <div
                        className="flex transition-transform duration-700 ease-in-out"
                        style={{
                            transform: `translateX(-${currentSlide * 100}%)`,
                        }}
                    >
                        {PLACEHOLDER_ARTICLES.map((item) => {
                            const thumbnailImage = normalizeImagePath(
                                item.image_path || item.image,
                            );
                            const thumbnailAlt =
                                item.article_alt_text ||
                                item.alt_text ||
                                item.title;
                            const sdgNumbers = Array.isArray(item.sdg_numbers)
                                ? item.sdg_numbers
                                : typeof item.sdg_numbers === "string" &&
                                    item.sdg_numbers
                                  ? item.sdg_numbers
                                        .split(",")
                                        .map((value) => Number(value.trim()))
                                        .filter((value) => !Number.isNaN(value))
                                  : [];

                            return (
                                <div
                                    key={item.id}
                                    className="min-w-full flex flex-col md:flex-row"
                                >
                                    {/* Image Section */}
                                    <div className="md:w-2/5 h-64 md:h-auto relative overflow-hidden">
                                        <img
                                            src={thumbnailImage}
                                            alt={thumbnailAlt}
                                            className="w-full h-full object-cover"
                                            loading="lazy"
                                        />
                                        <div className="absolute top-4 left-4">
                                            <span className="bg-green-600 text-white text-xs font-bold px-4 py-2 rounded-full shadow-lg">
                                                Featured
                                            </span>
                                        </div>
                                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent h-24 md:hidden"></div>
                                    </div>

                                    {/* Content Section */}
                                    <div className="md:w-3/5 p-6 md:p-8 flex flex-col justify-center">
                                        <div className="flex items-center gap-3 mb-3 flex-wrap">
                                            <span className="text-sm text-gray-500">
                                                {item.date}
                                            </span>
                                            {sdgNumbers.length > 0 && (
                                                <div className="flex flex-wrap gap-2">
                                                    {sdgNumbers.map(
                                                        (sdgNumber) => {
                                                            const palette =
                                                                SDG_COLORS[
                                                                    sdgNumber
                                                                ] || {
                                                                    bg: "#E5E7EB",
                                                                    text: "#111827",
                                                                    border: "#D1D5DB",
                                                                };
                                                            return (
                                                                <span
                                                                    key={`${item.id}-sdg-${sdgNumber}`}
                                                                    className="rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em]"
                                                                    style={{
                                                                        backgroundColor:
                                                                            palette.bg,
                                                                        color: palette.text,
                                                                        border: `1px solid ${palette.border}`,
                                                                    }}
                                                                >
                                                                    SDG{" "}
                                                                    {sdgNumber}
                                                                </span>
                                                            );
                                                        },
                                                    )}
                                                </div>
                                            )}
                                        </div>

                                        <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-3 text-justify">
                                            <a
                                                href={`/news/${item.id}`}
                                                className="hover:text-green-700 transition-colors hover:underline"
                                            >
                                                {item.title}
                                            </a>
                                        </h3>

                                        <p className="text-gray-600 text-sm md:text-base mb-4 line-clamp-3 text-justify">
                                            {item.content}
                                        </p>

                                        <a
                                            href={`/news/${item.id}`}
                                            className="inline-flex items-center gap-2 text-green-700 font-medium hover:text-green-800 transition-colors group"
                                        >
                                            Read Full Article
                                            <svg
                                                className="w-5 h-5 group-hover:translate-x-1 transition-transform"
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
                                </div>
                            );
                        })}
                    </div>

                    {/* Slide Indicators */}
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                        {PLACEHOLDER_ARTICLES.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => goToSlide(index)}
                                className={`h-2 rounded-full transition-all duration-300 ${
                                    currentSlide === index
                                        ? "w-8 bg-green-600"
                                        : "w-2 bg-gray-300 hover:bg-gray-400"
                                }`}
                                aria-label={`Go to slide ${index + 1}`}
                            />
                        ))}
                    </div>

                    {/* Auto-play indicator */}
                    <div className="absolute bottom-4 right-4">
                        <button
                            onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                            className="p-2 rounded-full bg-white/80 hover:bg-white shadow-md transition-colors"
                            aria-label={
                                isAutoPlaying
                                    ? "Pause auto-play"
                                    : "Resume auto-play"
                            }
                        >
                            {isAutoPlaying ? (
                                <svg
                                    className="w-4 h-4 text-gray-600"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                </svg>
                            ) : (
                                <svg
                                    className="w-4 h-4 text-gray-600"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                                    />
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* LATEST NEWS TITLE */}
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-6 pb-2">
                <div className="flex items-center gap-3">
                    <span className="w-1 h-8 bg-green-600 rounded-full"></span>
                    <h2 className="text-2xl font-bold text-gray-800">
                        Latest News
                    </h2>
                    <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full ml-2">
                        {filteredArticles.length} articles
                    </span>
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
                                    <svg
                                        className="h-4 w-4 text-gray-400"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                        />
                                    </svg>
                                </div>
                                <input
                                    type="text"
                                    placeholder="Search news..."
                                    value={searchQuery}
                                    onChange={(e) =>
                                        setSearchQuery(e.target.value)
                                    }
                                    className="w-full pl-9 pr-9 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 text-sm placeholder-gray-400"
                                />
                                {searchQuery && (
                                    <button
                                        onClick={() => setSearchQuery("")}
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                                    >
                                        <svg
                                            className="h-4 w-4"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M6 18L18 6M6 6l12 12"
                                            ></path>
                                        </svg>
                                    </button>
                                )}
                            </div>

                            {/* Year Filter - Simple Dropdown */}
                            <div className="sm:w-48 relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <svg
                                        className="h-4 w-4 text-gray-400"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                        ></path>
                                    </svg>
                                </div>
                                <select
                                    value={selectedYear}
                                    onChange={(e) =>
                                        setSelectedYear(e.target.value)
                                    }
                                    className="w-full pl-9 pr-9 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 text-sm text-gray-700 appearance-none cursor-pointer"
                                >
                                    <option value="">All Years</option>
                                    {availableYears.map((year) => (
                                        <option key={year} value={year}>
                                            {year}
                                        </option>
                                    ))}
                                </select>
                                {selectedYear && (
                                    <button
                                        onClick={() => setSelectedYear("")}
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                                    >
                                        <svg
                                            className="h-4 w-4"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M6 18L18 6M6 6l12 12"
                                            ></path>
                                        </svg>
                                    </button>
                                )}
                            </div>

                            {/* Results Count - Simple Badge */}
                            <div className="flex items-center justify-center sm:justify-start">
                                <span className="text-xs text-gray-500 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-200 whitespace-nowrap">
                                    {filteredArticles.length} article
                                    {filteredArticles.length !== 1 ? "s" : ""}
                                </span>
                            </div>
                        </div>

                        {/* Active Filters - Clean Chips */}
                        {(searchQuery || selectedYear) && (
                            <div className="mt-3 pt-3 border-t border-gray-100 flex flex-wrap items-center gap-2">
                                <span className="text-xs text-gray-500">
                                    Filters:
                                </span>
                                {searchQuery && (
                                    <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-green-50 text-green-700 rounded-full text-xs border border-green-200">
                                        <svg
                                            className="w-3 h-3"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                            ></path>
                                        </svg>
                                        "{searchQuery}"
                                        <button
                                            onClick={() => setSearchQuery("")}
                                            className="hover:text-red-600 transition-colors ml-0.5"
                                        >
                                            <svg
                                                className="w-3 h-3"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M6 18L18 6M6 6l12 12"
                                                ></path>
                                            </svg>
                                        </button>
                                    </span>
                                )}
                                {selectedYear && (
                                    <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-blue-50 text-blue-700 rounded-full text-xs border border-blue-200">
                                        <svg
                                            className="w-3 h-3"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                            ></path>
                                        </svg>
                                        {selectedYear}
                                        <button
                                            onClick={() => setSelectedYear("")}
                                            className="hover:text-red-600 transition-colors ml-0.5"
                                        >
                                            <svg
                                                className="w-3 h-3"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M6 18L18 6M6 6l12 12"
                                                ></path>
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
                            // Loading Skeleton - 8 items
                            Array.from({ length: 8 }).map((_, index) => (
                                <div
                                    key={`skeleton-${index}`}
                                    className="news-card animate-pulse"
                                >
                                    <div className="news-card-image-wrapper bg-gray-200 h-48 rounded-t-xl"></div>
                                    <div className="news-card-content p-4">
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
                                const sdgNumbers = Array.isArray(
                                    item.sdg_numbers,
                                )
                                    ? item.sdg_numbers
                                    : typeof item.sdg_numbers === "string" &&
                                        item.sdg_numbers
                                      ? item.sdg_numbers
                                            .split(",")
                                            .map((value) =>
                                                Number(value.trim()),
                                            )
                                            .filter(
                                                (value) => !Number.isNaN(value),
                                            )
                                      : [];

                                return (
                                    <article
                                        key={item.id}
                                        className="news-card"
                                        style={{
                                            animationDelay: `${index * 0.1}s`,
                                        }}
                                    >
                                        <div className="news-card-image-wrapper">
                                            <img
                                                src={thumbnailImage}
                                                alt={thumbnailAlt}
                                                className="news-card-image"
                                                loading="lazy"
                                            />

                                            {index === 0 &&
                                                currentPage === 1 && (
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
                                                        {sdgNumbers.map(
                                                            (sdgNumber) => {
                                                                const palette =
                                                                    SDG_COLORS[
                                                                        sdgNumber
                                                                    ] || {
                                                                        bg: "#E5E7EB",
                                                                        text: "#111827",
                                                                        border: "#D1D5DB",
                                                                    };

                                                                return (
                                                                    <span
                                                                        key={`${item.id}-sdg-${sdgNumber}`}
                                                                        className="rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.12em]"
                                                                        style={{
                                                                            backgroundColor:
                                                                                palette.bg,
                                                                            color: palette.text,
                                                                            border: `1px solid ${palette.border}`,
                                                                        }}
                                                                    >
                                                                        SDG{" "}
                                                                        {
                                                                            sdgNumber
                                                                        }
                                                                    </span>
                                                                );
                                                            },
                                                        )}
                                                    </div>
                                                )}
                                            </div>

                                            <h3 className="news-card-title">
                                                <a
                                                    href={`/news/${item.id}`}
                                                    className="news-title-link-modern"
                                                >
                                                    {item.title}
                                                </a>
                                            </h3>

                                            <p className="news-excerpt">
                                                {item.content
                                                    ? item.content
                                                          .replace(
                                                              /<[^>]*>/g,
                                                              "",
                                                          )
                                                          .slice(0, 120) +
                                                      (item.content.length > 120
                                                          ? "..."
                                                          : "")
                                                    : ""}
                                            </p>

                                            <a
                                                href={`/news/${item.id}`}
                                                className="news-read-more"
                                            >
                                                Read Article
                                                <svg
                                                    className="news-arrow-icon"
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
                                    </article>
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

                    {/* Pagination */}
                    {!isLoading &&
                        filteredArticles.length > 0 &&
                        totalPages > 1 && (
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

                                {Array.from(
                                    { length: totalPages },
                                    (_, i) => i + 1,
                                ).map((number) => {
                                    // Show limited page numbers with ellipsis
                                    if (
                                        number === 1 ||
                                        number === totalPages ||
                                        (number >= currentPage - 1 &&
                                            number <= currentPage + 1)
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
                                        (number === currentPage - 2 &&
                                            currentPage > 3) ||
                                        (number === currentPage + 2 &&
                                            currentPage < totalPages - 2)
                                    ) {
                                        return (
                                            <span
                                                key={number}
                                                className="px-2 text-gray-400"
                                            >
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
