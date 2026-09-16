import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import sdg10Gif from '../../../../assets/images/sdg gif/10_SDG_MakeEveryDayCount_Gifs_GDU.gif';
import sdg10Hover from '../../../../assets/images/sdg_10.jpg';
import collegeLogo from '../../../../assets/logos/ccdoclogo.png';
import sdg1 from '../../../../assets/images/sdg1.png';
import sdg2 from '../../../../assets/images/sdg2.jpg';
import sdg3 from '../../../../assets/images/sdg3.png';
import sdg4 from '../../../../assets/images/sdg4.png';
import sdg5 from '../../../../assets/images/sdg5.jpg';
import sdg6 from '../../../../assets/images/sdg6.png';
import sdg7 from '../../../../assets/images/sdg7.png';
import sdg8 from '../../../../assets/images/sdg8.png';
import sdg9 from '../../../../assets/images/sdg9.png';
import sdg10 from '../../../../assets/images/sdg10.png';
import sdg11 from '../../../../assets/images/sdg11.png';
import sdg12 from '../../../../assets/images/sdg12.jpg';
import sdg13 from '../../../../assets/images/sdg13.png';
import sdg14 from '../../../../assets/images/sdg14.png';
import sdg15 from '../../../../assets/images/sdg15.png';
import sdg16 from '../../../../assets/images/sdg16.png';
import sdg17 from '../../../../assets/images/sdg17.png';

// ✅ Official SDG brand colors
const SDG_COLORS = {
    1: "#E5243B",   // No Poverty - deep red
    2: "#DDA63A",   // Zero Hunger - gold
    3: "#4C9F38",   // Good Health - green
    4: "#C5192D",   // Quality Education - red
    5: "#FF3A21",   // Gender Equality - orange-red
    6: "#26BDE2",   // Clean Water - cyan
    7: "#FCC30B",   // Affordable Energy - yellow
    8: "#A21942",   // Decent Work - maroon
    9: "#FD6925",   // Industry - orange
    10: "#DD1367",  // Reduced Inequalities - magenta
    11: "#FD9D24",  // Sustainable Cities - amber
    12: "#BF8B2E",  // Responsible Consumption - bronze
    13: "#3F7E44",  // Climate Action - dark green
    14: "#0A97D9",  // Life Below Water - blue
    15: "#56C02B",  // Life on Land - light green
    16: "#00689D",  // Peace & Justice - navy
    17: "#19486A",  // Partnerships - dark navy
};

const sdgImages = {
    1: sdg1,
    2: sdg2,
    3: sdg3,
    4: sdg4,
    5: sdg5,
    6: sdg6,
    7: sdg7,
    8: sdg8,
    9: sdg9,
    10: sdg10,
    11: sdg11,
    12: sdg12,
    13: sdg13,
    14: sdg14,
    15: sdg15,
    16: sdg16,
    17: sdg17,
};

const normalizeImagePath = (value) => {
    if (!value) {
        return "https://placehold.co/600x400/cccccc/ffffff?text=No+Image";
    }

    if (/^https?:\/\//i.test(value) || value.startsWith("data:")) {
        return value;
    }

    return "/" + value.replace(/^\/+/, "");
};

const formatArticleDate = (value) => {
    if (!value) return "";

    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return value;

    return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
};

const parseSdgNumbers = (value) => {
    if (Array.isArray(value)) return value.map((item) => Number(item)).filter((item) => !Number.isNaN(item));
    if (typeof value === "string" && value.trim()) {
        return value
            .split(",")
            .map((item) => Number(item.trim()))
            .filter((item) => !Number.isNaN(item));
    }

    return [];
};

export default function Sdg10({ onBack }) {
    const [articles, setArticles] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const articlesPerPage = 8;

    // SDG 10 color
    const sdgColor = SDG_COLORS[10];

    useEffect(() => {
        fetch("/api/news")
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`News request failed: ${response.status}`);
                }

                return response.json();
            })
            .then((data) => {
                const normalized = Array.isArray(data) ? data : [];
                const sdgTenArticles = normalized.filter((item) => {
                    const sdgNumbers = parseSdgNumbers(item.sdg_numbers);
                    return sdgNumbers.includes(10);
                });

                setArticles(sdgTenArticles);
                setCurrentPage(1);
                setIsLoading(false);
            })
            .catch(() => {
                setArticles([]);
                setCurrentPage(1);
                setIsLoading(false);
            });
    }, []);

    const totalPages = Math.max(1, Math.ceil(articles.length / articlesPerPage));
    const safeCurrentPage = Math.min(currentPage, totalPages);
    const paginatedArticles = articles.slice(
        (safeCurrentPage - 1) * articlesPerPage,
        safeCurrentPage * articlesPerPage,
    );
    const maxVisiblePages = 10;
    const pageWindowStart = Math.max(1, Math.min(safeCurrentPage - Math.floor(maxVisiblePages / 2), totalPages - maxVisiblePages + 1));
    const pageWindowEnd = Math.min(totalPages, pageWindowStart + maxVisiblePages - 1);
    const visiblePages = Array.from({ length: pageWindowEnd - pageWindowStart + 1 }, (_, index) => pageWindowStart + index);

    useEffect(() => {
        if (currentPage > totalPages) {
            setCurrentPage(totalPages);
        }
    }, [currentPage, totalPages]);

    const getTruncatedContent = (content, maxLength = 120) => {
        if (!content) return "";

        const cleanText = content.replace(/<[^>]*>/g, "");
        if (cleanText.length <= maxLength) return cleanText;

        return `${cleanText.substring(0, maxLength)}...`;
    };

    const paginate = (pageNumber) => {
        if (pageNumber < 1 || pageNumber > totalPages) return;
        setCurrentPage(pageNumber);
        window.scrollTo({
            top: document.querySelector(".sdg10-section")?.offsetTop - 80 || 0,
            behavior: "smooth",
        });
    };

    return (
        <div className="w-full">
            <section className="news-section">
                <div className="news-container">
                    <button
                        type="button"
                        onClick={onBack}
                        className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors mb-4"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Back to all SDGs
                    </button>

                    <div className="mt-2 grid grid-cols-1 md:grid-cols-[1fr_minmax(180px,260px)] gap-6 md:gap-8 items-start">
                        <div className="w-full">
                            <img
                                src={sdg10Hover}
                                alt="SDG 10 – Reduced Inequalities"
                                className="w-full h-auto object-contain rounded-lg shadow-sm bg-white"
                            />
                        </div>

                        <div className="w-full">
                            <img
                                src={sdg10Gif}
                                alt="SDG 10 – Make Every Day Count"
                                className="w-full md:max-w-[260px] h-auto rounded-lg shadow-sm"
                            />
                        </div>
                    </div>

                    <div className="sdg10-section mt-10">
                        {/* ✅ Centered Title + Description with SDG 10 brand color */}
                        <div className="mb-8 text-center">
                            <p
                                className="text-xs font-semibold uppercase tracking-[0.18em]"
                                style={{ color: sdgColor }}
                            >
                                Sustainable Development Goal 10
                            </p>

                            <h2
                                className="mt-3 text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight"
                                style={{ color: sdgColor }}
                            >
                                Reduced Inequalities
                            </h2>

                            <div
                                className="mt-4 mx-auto h-1 w-24 rounded-full"
                                style={{
                                    background: `linear-gradient(to right, ${sdgColor}, ${sdgColor}99)`,
                                }}
                            ></div>

                            <p className="mt-5 mx-auto max-w-3xl text-base md:text-lg leading-relaxed text-gray-600">
                                Reduce inequality within and among countries. SDG 10 aims to progressively
                                achieve and sustain income growth of the bottom 40 percent of the population
                                at a rate higher than the national average, empower and promote the social,
                                economic, and political inclusion of all, and ensure equal opportunity and
                                reduce inequalities of outcome. It also seeks to adopt policies, especially
                                fiscal, wage, and social protection policies, to progressively achieve greater
                                equality, and to facilitate orderly, safe, regular, and responsible migration
                                and mobility of people. Explore the initiatives, programs, and stories from
                                City College of Cagayan de Oro contributing to this global goal.
                            </p>
                        </div>

                        {/* ✅ Separation line between title/description and article cards */}
                        <div className="relative mb-8">
                            <div className="h-px w-full bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
                            <div
                                className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rotate-45"
                                style={{ backgroundColor: sdgColor }}
                            ></div>
                        </div>

                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
                            {isLoading ? (
                                Array.from({ length: 4 }).map((_, index) => (
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
                            ) : articles.length > 0 ? (
                                paginatedArticles.map((item, index) => {
                                    const thumbnailImage = normalizeImagePath(item.image_path || item.image);
                                    const thumbnailAlt = item.article_alt_text || item.alt_text || item.title;
                                    const sdgNumbers = parseSdgNumbers(item.sdg_numbers);

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
                                                        {sdgNumbers.slice(0, 2).map((sdgNumber) => (
                                                            <img
                                                                key={`${item.id}-sdg-${sdgNumber}`}
                                                                src={sdgImages[sdgNumber]}
                                                                alt={`Sustainable Development Goal ${sdgNumber}`}
                                                                title={`SDG ${sdgNumber}`}
                                                                className="h-12 w-12 rounded-md border border-white/70 object-cover shadow-md"
                                                            />
                                                        ))}
                                                    </div>
                                                )}
                                            </div>

                                            <div className="relative overflow-hidden p-4">
                                                <img
                                                    src={collegeLogo}
                                                    alt=""
                                                    aria-hidden="true"
                                                    className="pointer-events-none absolute inset-0 z-0 h-full w-full object-contain p-8 opacity-[0.12]"
                                                />

                                                <div className="relative z-10 mb-3 flex items-center justify-between gap-2">
                                                    <span className="text-[11px] font-medium uppercase tracking-[0.12em] text-gray-500">
                                                        {formatArticleDate(item.date)}
                                                    </span>

                                                    <span
                                                        className="inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.12em] text-white whitespace-nowrap shrink-0"
                                                        style={{ backgroundColor: sdgColor }}
                                                    >
                                                        {item.department || "News"}
                                                    </span>
                                                </div>

                                                <h3 className="relative z-10 mb-3 text-lg font-bold leading-snug text-gray-900">
                                                    <a
                                                        href={`/news/${item.id}`}
                                                        className="transition-colors duration-200 line-clamp-2"
                                                        style={{
                                                            display: "-webkit-box",
                                                            WebkitLineClamp: 2,
                                                            WebkitBoxOrient: "vertical",
                                                            overflow: "hidden",
                                                            textOverflow: "ellipsis",
                                                        }}
                                                        onMouseEnter={(e) => (e.currentTarget.style.color = sdgColor)}
                                                        onMouseLeave={(e) => (e.currentTarget.style.color = "")}
                                                    >
                                                        {item.title}
                                                    </a>
                                                </h3>

                                                <p
                                                    className="relative z-10 mb-4 text-sm leading-6 text-gray-600"
                                                    style={{
                                                        display: "-webkit-box",
                                                        WebkitLineClamp: 3,
                                                        WebkitBoxOrient: "vertical",
                                                        overflow: "hidden",
                                                        textOverflow: "ellipsis",
                                                    }}
                                                >
                                                    {getTruncatedContent(item.content, 120)}
                                                </p>

                                                <div className="flex items-center">
                                                    <a
                                                        href={`/news/${item.id}`}
                                                        className="relative z-10 inline-flex items-center gap-2 text-sm font-semibold transition-colors duration-200"
                                                        style={{ color: sdgColor }}
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
                                            </div>
                                        </motion.article>
                                    );
                                })
                            ) : (
                                <div className="col-span-1 sm:col-span-2 xl:col-span-4 py-12 text-center">
                                    <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 mb-4">
                                        <svg
                                            className="h-8 w-8 text-gray-400"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                            />
                                        </svg>
                                    </div>
                                    <p className="text-lg font-medium text-gray-700">No SDG 10 articles found.</p>
                                    <p className="mt-1 text-sm text-gray-500">Check back soon for updates on reducing inequalities initiatives.</p>
                                </div>
                            )}
                        </div>

                        {!isLoading && articles.length > 0 && totalPages > 1 && (
                            <div className="mt-8 flex flex-wrap items-center justify-center gap-2 pb-4">
                                <button
                                    type="button"
                                    onClick={() => paginate(safeCurrentPage - 1)}
                                    disabled={safeCurrentPage === 1}
                                    className={`rounded-lg border px-3 py-2 transition-colors ${
                                        safeCurrentPage === 1
                                            ? "cursor-not-allowed border-gray-200 bg-gray-100 text-gray-400"
                                            : "border-gray-300 bg-white text-gray-700 hover:border-gray-400 hover:bg-gray-50"
                                    }`}
                                >
                                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                                    </svg>
                                </button>

                                {visiblePages.map((page) => {
                                    const isActive = safeCurrentPage === page;
                                    return (
                                        <button
                                            key={page}
                                            type="button"
                                            onClick={() => paginate(page)}
                                            className="min-w-[2.5rem] rounded-lg border px-3 py-2 text-sm font-medium transition-colors"
                                            style={
                                                isActive
                                                    ? {
                                                        backgroundColor: sdgColor,
                                                        borderColor: sdgColor,
                                                        color: "#fff",
                                                    }
                                                    : {
                                                        backgroundColor: "#fff",
                                                        borderColor: "#d1d5db",
                                                        color: "#374151",
                                                    }
                                            }
                                        >
                                            {page}
                                        </button>
                                    );
                                })}

                                {pageWindowEnd < totalPages && (
                                    <button
                                        type="button"
                                        onClick={() => paginate(Math.min(safeCurrentPage + maxVisiblePages, totalPages))}
                                        className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400 hover:bg-gray-50"
                                    >
                                        Next 10
                                    </button>
                                )}

                                <button
                                    type="button"
                                    onClick={() => paginate(safeCurrentPage + 1)}
                                    disabled={safeCurrentPage === totalPages}
                                    className={`rounded-lg border px-3 py-2 transition-colors ${
                                        safeCurrentPage === totalPages
                                            ? "cursor-not-allowed border-gray-200 bg-gray-100 text-gray-400"
                                            : "border-gray-300 bg-white text-gray-700 hover:border-gray-400 hover:bg-gray-50"
                                    }`}
                                >
                                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                    </svg>
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
}