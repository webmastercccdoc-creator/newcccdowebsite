import { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MainLayout from "../../../layouts/MainLayout";

const pdfModules = import.meta.glob(
    '../../../assets/Downloadable Fiile/Internationalization/*.pdf',
    { eager: true }
);

console.log("PDF Modules Found:", pdfModules);

const INTERNATIONALIZATION_CATEGORIES = ["Internationalization"];
const FORMS_PER_PAGE = 6;

const formatTitle = (fileName) =>
    fileName
        .replace(/\.pdf$/i, "")
        .replace(/^SDG(\d+)/, "SDG $1 - ")
        .replace(/-/g, " ")
        .replace(/\s+/g, " ")
        .trim()
        .replace(/\b\w/g, (c) => c.toUpperCase());

// ============ Animation Variants ============
const heroVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
    },
};

const titleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
};

const dividerVariants = {
    hidden: { scaleX: 0, opacity: 0 },
    visible: {
        scaleX: 1,
        opacity: 1,
        transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.35 },
    },
};

const searchVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.98 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.45 },
    },
};

const gridContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.08, delayChildren: 0.05 },
    },
};

const cardVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
        exit: { opacity: 0, y: -15, transition: { duration: 0.25 } },
    },
};

export default function DownloadableForms() {
    useEffect(() => {
        document.title = "Downloadable Forms - City College of Cagayan de Oro";
    }, []);

    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [sortOrder, setSortOrder] = useState("newest");
    const [currentPage, setCurrentPage] = useState(1);

    const [forms] = useState(() => {
        const fileKeys = Object.keys(pdfModules);
        if (fileKeys.length === 0) return [];

        return fileKeys
            .map((path, index) => {
                const fileName = path.split("/").pop() || "Unknown.pdf";
                const title = formatTitle(fileName);
                const uploadDate = new Date(2024, 0, index + 1)
                    .toISOString()
                    .split("T")[0];

                return {
                    id: index + 1,
                    title,
                    description: `Download the ${title} report.`,
                    category: "Internationalization",
                    fileType: "PDF",
                    fileSize: "1.2 MB",
                    uploadDate,
                    downloads: Math.floor(Math.random() * 5000) + 100,
                    fileUrl: pdfModules[path].default || pdfModules[path],
                    thumbnail: null,
                };
            })
            .sort((a, b) => a.title.localeCompare(b.title));
    });

    const categories = ["All", ...INTERNATIONALIZATION_CATEGORIES];

    const filteredForms = useMemo(() => {
        let result = [...forms];

        if (searchTerm) {
            const q = searchTerm.toLowerCase();
            result = result.filter(
                (form) =>
                    form.title.toLowerCase().includes(q) ||
                    form.description.toLowerCase().includes(q)
            );
        }

        if (selectedCategory !== "All") {
            result = result.filter((form) => form.category === selectedCategory);
        }

        result.sort((a, b) => {
            switch (sortOrder) {
                case "newest":
                    return new Date(b.uploadDate) - new Date(a.uploadDate);
                case "oldest":
                    return new Date(a.uploadDate) - new Date(b.uploadDate);
                case "popular":
                    return b.downloads - a.downloads;
                case "alphabetical":
                    return a.title.localeCompare(b.title);
                default:
                    return 0;
            }
        });

        return result;
    }, [forms, searchTerm, selectedCategory, sortOrder]);

    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, selectedCategory, sortOrder]);

    const totalPages = Math.max(1, Math.ceil(filteredForms.length / FORMS_PER_PAGE));
    const safePage = Math.min(currentPage, totalPages);
    const startIndex = (safePage - 1) * FORMS_PER_PAGE;
    const paginatedForms = filteredForms.slice(startIndex, startIndex + FORMS_PER_PAGE);

    const getPageNumbers = () => {
        const pages = [];
        const maxVisible = 5;
        if (totalPages <= maxVisible) {
            for (let i = 1; i <= totalPages; i++) pages.push(i);
        } else {
            pages.push(1);
            if (safePage > 3) pages.push("...");
            const start = Math.max(2, safePage - 1);
            const end = Math.min(totalPages - 1, safePage + 1);
            for (let i = start; i <= end; i++) pages.push(i);
            if (safePage < totalPages - 2) pages.push("...");
            pages.push(totalPages);
        }
        return pages;
    };

    const goToPage = (page) => {
        if (page < 1 || page > totalPages) return;
        setCurrentPage(page);
        window.scrollTo({ top: 400, behavior: "smooth" });
    };

    const formatDate = (dateString) => {
        const options = { year: "numeric", month: "short", day: "numeric" };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    const handleDownload = (form) => {
        window.open(form.fileUrl, "_blank", "noopener,noreferrer");
    };

    return (
        <MainLayout
            maxWidth="full"
            containerClassName="px-0"
            mainClassName="py-0"
            className="overflow-hidden pb-0"
        >
            {/* ==================== HERO / TITLE + SEARCH ==================== */}
            <motion.section
                className="w-full bg-[#f5f7fb] pt-16 md:pt-20 pb-12 md:pb-16"
                variants={heroVariants}
                initial="hidden"
                animate="visible"
            >
                <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
                    {/* Title */}
                    <motion.h1
                        className="font-extrabold text-[#1a1a1a] leading-[1.1] tracking-tight mb-4"
                        style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
                        variants={titleVariants}
                    >
                        Find the{" "}
                        <span className="text-[#157d3c]">Forms You Need</span>
                    </motion.h1>

                    {/* Subtitle */}
                    <motion.p
                        className="mx-auto max-w-2xl text-[#4b5563] text-base sm:text-lg leading-relaxed mb-8"
                        variants={titleVariants}
                    >
                        Browse, search, and download official forms, reports, and
                        institutional documents — all in one place.
                    </motion.p>

                    {/* Green divider */}
                    <motion.div
                        className="mx-auto w-24 h-1 bg-[#157d3c] rounded-full mb-10 origin-center"
                        variants={dividerVariants}
                    />

                    {/* Search bar with yellow circular button */}
                    <motion.div
                        className="relative mx-auto max-w-3xl"
                        variants={searchVariants}
                    >
                        <input
                            type="text"
                            placeholder="Search forms and documents…"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            aria-label="Search forms"
                            className="w-full pl-8 pr-20 py-5 rounded-full bg-white text-gray-700 text-base placeholder-gray-400 shadow-[0_8px_30px_rgba(0,0,0,0.06)] outline-none transition-all duration-200 focus:shadow-[0_10px_40px_rgba(21,125,60,0.15)]"
                        />

                        <motion.button
                            type="button"
                            aria-label="Search"
                            onClick={() => document.activeElement?.blur?.()}
                            whileHover={{ scale: 1.08 }}
                            whileTap={{ scale: 0.92 }}
                            className="absolute right-2 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-[#f5c518] hover:bg-[#e6b800] text-[#1a1a1a] flex items-center justify-center shadow-md transition-colors duration-200"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="w-6 h-6"
                            >
                                <circle cx="11" cy="11" r="7" />
                                <line x1="21" y1="21" x2="16.65" y2="16.65" />
                            </svg>
                        </motion.button>
                    </motion.div>
                </div>
            </motion.section>

            {/* ==================== MAIN CONTENT ==================== */}
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10 md:py-14">
                {/* Filters row */}
                <motion.div
                    className="flex flex-col lg:flex-row gap-4 mb-4 justify-end"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.55 }}
                >
                    <div className="flex gap-3 flex-col sm:flex-row">
                        <select
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            className="w-full sm:w-auto px-4 py-3 border-2 border-gray-200 rounded-lg text-sm bg-white cursor-pointer outline-none focus:border-[#157d3c]"
                        >
                            {categories.map((c) => (
                                <option key={c} value={c}>
                                    {c}
                                </option>
                            ))}
                        </select>

                        <select
                            value={sortOrder}
                            onChange={(e) => setSortOrder(e.target.value)}
                            className="w-full sm:w-auto px-4 py-3 border-2 border-gray-200 rounded-lg text-sm bg-white cursor-pointer outline-none focus:border-[#157d3c]"
                        >
                            <option value="newest">Newest First</option>
                            <option value="oldest">Oldest First</option>
                            <option value="popular">Most Downloaded</option>
                            <option value="alphabetical">A-Z</option>
                        </select>
                    </div>
                </motion.div>

                {/* Stats */}
                <motion.div
                    className="mb-5 text-gray-500 text-sm"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.65 }}
                >
                    Showing <strong>{paginatedForms.length}</strong> of{" "}
                    <strong>{filteredForms.length}</strong> forms
                    {totalPages > 1 && (
                        <>
                            {" "}
                            • Page <strong>{safePage}</strong> of{" "}
                            <strong>{totalPages}</strong>
                        </>
                    )}
                </motion.div>

                {/* Grid / Empty */}
                {filteredForms.length === 0 ? (
                    <motion.div
                        className="text-center py-16 px-5 text-gray-500"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <h3 className="m-0 mb-2 text-gray-700 text-lg font-semibold">
                            No forms found
                        </h3>
                        <p className="m-0 mb-5">
                            Try adjusting your search or filter criteria
                        </p>
                        <motion.button
                            type="button"
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            onClick={() => {
                                setSearchTerm("");
                                setSelectedCategory("All");
                            }}
                            className="px-6 py-2.5 bg-[#157d3c] hover:bg-[#0f5c2c] text-white border-none rounded-lg font-semibold cursor-pointer transition-colors duration-200"
                        >
                            Reset Filters
                        </motion.button>
                    </motion.div>
                ) : (
                    <>
                        {/* Grid with animated cards */}
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={`page-${safePage}`}
                                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
                                variants={gridContainerVariants}
                                initial="hidden"
                                animate="visible"
                                exit="hidden"
                            >
                                {paginatedForms.map((form) => (
                                    <motion.div
                                        key={form.id}
                                        layout
                                        variants={cardVariants}
                                        whileHover={{
                                            y: -6,
                                            transition: { duration: 0.25 },
                                        }}
                                        className="flex flex-col bg-white border border-gray-200 rounded-xl overflow-hidden transition-shadow duration-200 hover:shadow-xl"
                                    >
                                        <div className="relative w-full h-44 bg-gray-100 overflow-hidden">
                                            {form.thumbnail ? (
                                                <img
                                                    src={form.thumbnail}
                                                    alt={form.title}
                                                    loading="lazy"
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#157d3c]/10 to-[#157d3c]/20">
                                                    <span className="text-sm font-semibold text-[#157d3c] tracking-wide">
                                                        {form.fileType}
                                                    </span>
                                                </div>
                                            )}
                                            <span className="absolute top-3 left-3 px-2.5 py-1 bg-white/90 backdrop-blur-sm text-[0.7rem] font-semibold text-[#0f5c2c] rounded-full shadow-sm">
                                                {form.category}
                                            </span>
                                        </div>

                                        <div className="flex-1 p-5">
                                            <h3 className="m-0 mb-2 text-lg font-semibold text-gray-900 leading-snug">
                                                {form.title}
                                            </h3>
                                            <p className="m-0 mb-4 text-sm text-gray-500 leading-relaxed">
                                                {form.description}
                                            </p>
                                            <div className="flex flex-wrap gap-3 text-xs text-gray-500">
                                                <span>{form.fileSize}</span>
                                                <span>•</span>
                                                <span>{formatDate(form.uploadDate)}</span>
                                                <span>•</span>
                                                <span>
                                                    {form.downloads.toLocaleString()} downloads
                                                </span>
                                            </div>
                                        </div>

                                        <div className="px-5 py-4 border-t border-gray-200">
                                            <motion.button
                                                type="button"
                                                onClick={() => handleDownload(form)}
                                                whileHover={{ scale: 1.02 }}
                                                whileTap={{ scale: 0.97 }}
                                                className="w-full flex items-center justify-center px-4 py-2.5 bg-[#157d3c] hover:bg-[#0f5c2c] text-white border-none rounded-lg text-sm font-semibold cursor-pointer transition-colors duration-200"
                                            >
                                                Download
                                            </motion.button>
                                        </div>
                                    </motion.div>
                                ))}
                            </motion.div>
                        </AnimatePresence>

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <motion.div
                                className="mt-10 flex flex-wrap items-center justify-center gap-2"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: 0.2 }}
                            >
                                <motion.button
                                    type="button"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => goToPage(safePage - 1)}
                                    disabled={safePage === 1}
                                    className="px-4 py-2 text-sm font-semibold rounded-lg border-2 transition-colors duration-200 disabled:opacity-40 disabled:cursor-not-allowed border-gray-200 text-gray-700 hover:border-[#157d3c] hover:text-[#157d3c] bg-white"
                                >
                                    ← Prev
                                </motion.button>

                                {getPageNumbers().map((page, idx) =>
                                    page === "..." ? (
                                        <span
                                            key={`e-${idx}`}
                                            className="px-2 text-gray-400 select-none"
                                        >
                                            …
                                        </span>
                                    ) : (
                                        <motion.button
                                            key={page}
                                            type="button"
                                            whileHover={{ scale: 1.08 }}
                                            whileTap={{ scale: 0.92 }}
                                            onClick={() => goToPage(page)}
                                            className={`min-w-[40px] h-10 px-3 text-sm font-semibold rounded-lg border-2 transition-colors duration-200 ${
                                                page === safePage
                                                    ? "bg-[#157d3c] border-[#157d3c] text-white shadow-sm"
                                                    : "bg-white border-gray-200 text-gray-700 hover:border-[#157d3c] hover:text-[#157d3c]"
                                            }`}
                                        >
                                            {page}
                                        </motion.button>
                                    )
                                )}

                                <motion.button
                                    type="button"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => goToPage(safePage + 1)}
                                    disabled={safePage === totalPages}
                                    className="px-4 py-2 text-sm font-semibold rounded-lg border-2 transition-colors duration-200 disabled:opacity-40 disabled:cursor-not-allowed border-gray-200 text-gray-700 hover:border-[#157d3c] hover:text-[#157d3c] bg-white"
                                >
                                    Next →
                                </motion.button>
                            </motion.div>
                        )}
                    </>
                )}
            </div>
        </MainLayout>
    );
}