import { useEffect, useState, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

import MainLayout from "../../../layouts/MainLayout";
import formsBannerImg from "../../../assets/banner/News Banner.png";

// ============ PDF.js worker setup ============
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    "pdfjs-dist/build/pdf.worker.min.mjs",
    import.meta.url
).toString();

// ============ Auto-load all PDFs ============
const pdfModules = import.meta.glob(
    "../../../assets/Downloadable Fiile/Internationalization/*.pdf",
    { eager: true }
);

const INTERNATIONALIZATION_CATEGORIES = ["Internationalization"];
const FORMS_PER_PAGE = 6;

// ============ Helpers ============
const formatTitle = (fileName) =>
    fileName
        .replace(/\.pdf$/i, "")
        .replace(/^SDG(\d+)/, "SDG $1 - ")
        .replace(/-/g, " ")
        .replace(/\s+/g, " ")
        .trim()
        .replace(/\b\w/g, (c) => c.toUpperCase());

const formatBytes = (bytes) => {
    if (!bytes || Number.isNaN(bytes)) return "—";
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
    return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
};

const formatDate = (dateString) => {
    if (!dateString) return "—";
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
};

// ===================== Motion variants =====================
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

// ============ Banner text (in-file so no extra import is needed) ============
function AnimatedBannerText({ title, description }) {
    return (
        <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
            <motion.h1
                className="text-4xl md:text-6xl font-extrabold text-white drop-shadow-lg tracking-tight"
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
                {title}
            </motion.h1>
            <motion.p
                className="mt-4 text-white/90 text-sm md:text-lg leading-relaxed drop-shadow"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                    duration: 0.7,
                    ease: [0.22, 1, 0.36, 1],
                    delay: 0.15,
                }}
            >
                {description}
            </motion.p>
        </div>
    );
}

export default function DownloadableForms() {
    useEffect(() => {
        document.title = "Downloadable Forms - City College of Cagayan de Oro";
    }, []);

    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [sortOrder, setSortOrder] = useState("newest");
    const [currentPage, setCurrentPage] = useState(1);

    // ----- Modal / Viewer state -----
    const [openPdf, setOpenPdf] = useState(null);
    const [numPages, setNumPages] = useState(null);
    const [viewerPage, setViewerPage] = useState(1);

    // ----- Build forms from discovered PDFs -----
    const [forms, setForms] = useState(() => {
        const fileKeys = Object.keys(pdfModules);
        if (fileKeys.length === 0) return [];

        return fileKeys
            .map((path, index) => {
                const fileName = path.split("/").pop() || "Unknown.pdf";
                const title = formatTitle(fileName);
                const url = pdfModules[path].default || pdfModules[path];

                return {
                    id: index + 1,
                    title,
                    description: `Download the ${title} report.`,
                    category: "Internationalization",
                    fileType: "PDF",
                    fileSize: "…", // filled after HEAD fetch
                    uploadDate: null, // filled after HEAD fetch
                    fileUrl: url,
                };
            })
            .sort((a, b) => a.title.localeCompare(b.title));
    });

    // ============ Enrich with real size + Last-Modified via HEAD ============
    useEffect(() => {
        let cancelled = false;

        const enrich = async () => {
            const updated = await Promise.all(
                forms.map(async (form) => {
                    try {
                        const res = await fetch(form.fileUrl, {
                            method: "HEAD",
                        });
                        if (!res.ok) return form;

                        const len = res.headers.get("content-length");
                        const lastMod = res.headers.get("last-modified");

                        return {
                            ...form,
                            fileSize: len
                                ? formatBytes(parseInt(len, 10))
                                : "—",
                            uploadDate: lastMod
                                ? new Date(lastMod).toISOString().split("T")[0]
                                : null,
                        };
                    } catch {
                        return form;
                    }
                })
            );
            if (!cancelled) setForms(updated);
        };

        if (forms.length > 0 && forms[0].fileSize === "…") {
            enrich();
        }
        return () => {
            cancelled = true;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const categories = ["All", ...INTERNATIONALIZATION_CATEGORIES];

    // ----- Filter + sort -----
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
                    if (!a.uploadDate) return 1;
                    if (!b.uploadDate) return -1;
                    return new Date(b.uploadDate) - new Date(a.uploadDate);
                case "oldest":
                    if (!a.uploadDate) return 1;
                    if (!b.uploadDate) return -1;
                    return new Date(a.uploadDate) - new Date(b.uploadDate);
                case "alphabetical":
                    return a.title.localeCompare(b.title);
                case "alphabetical-desc":
                    return b.title.localeCompare(a.title);
                default:
                    return 0;
            }
        });

        return result;
    }, [forms, searchTerm, selectedCategory, sortOrder]);

    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, selectedCategory, sortOrder]);

    // ----- Pagination -----
    const totalPages = Math.max(1, Math.ceil(filteredForms.length / FORMS_PER_PAGE));
    const safePage = Math.min(currentPage, totalPages);
    const startIndex = (safePage - 1) * FORMS_PER_PAGE;
    const paginatedForms = filteredForms.slice(
        startIndex,
        startIndex + FORMS_PER_PAGE
    );

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

    // ----- Actions -----
    const handleDownload = (form) => {
        const link = document.createElement("a");
        link.href = form.fileUrl;
        link.download = `${form.title}.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const openViewer = (form) => {
        setOpenPdf(form);
        setViewerPage(1);
        setNumPages(null);
    };

    const closeViewer = useCallback(() => {
        setOpenPdf(null);
        setViewerPage(1);
        setNumPages(null);
    }, []);

    // Keyboard controls inside modal
    useEffect(() => {
        if (!openPdf) return;
        const onKey = (e) => {
            if (e.key === "Escape") closeViewer();
            if (e.key === "ArrowRight" && numPages && viewerPage < numPages)
                setViewerPage((p) => p + 1);
            if (e.key === "ArrowLeft" && viewerPage > 1)
                setViewerPage((p) => p - 1);
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [openPdf, numPages, viewerPage, closeViewer]);

    // Lock body scroll when modal open
    useEffect(() => {
        document.body.style.overflow = openPdf ? "hidden" : "";
        return () => {
            document.body.style.overflow = "";
        };
    }, [openPdf]);

    return (
        <MainLayout
            maxWidth="full"
            containerClassName="px-0"
            mainClassName="py-0"
            className="overflow-hidden pb-0"
        >
            {/* ==================== BANNER (restored) ==================== */}
            <div
                className="relative w-full bg-cover bg-center bg-no-repeat shadow-lg min-h-[350px] md:min-h-[450px] lg:min-h-[550px] flex items-center justify-center"
                style={{
                    backgroundImage: `url('${formsBannerImg}')`,
                }}
            >
                <div className="absolute inset-0 bg-black/50"></div>

                <AnimatedBannerText
                    title="Downloadable Forms"
                    description="Access and download commonly used forms and templates at City College of Cagayan de Oro."
                />
            </div>

            {/* ==================== HERO / TITLE + SEARCH ==================== */}
            <motion.section
                className="w-full bg-[#f5f7fb] pt-16 md:pt-20 pb-12 md:pb-16"
                variants={heroVariants}
                initial="hidden"
                animate="visible"
            >
                <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
                    <motion.h1
                        className="font-extrabold text-[#1a1a1a] leading-[1.1] tracking-tight mb-4"
                        style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
                        variants={titleVariants}
                    >
                        Find the{" "}
                        <span className="text-[#157d3c]">Forms You Need</span>
                    </motion.h1>

                    <motion.p
                        className="mx-auto max-w-2xl text-[#4b5563] text-base sm:text-lg leading-relaxed mb-8"
                        variants={titleVariants}
                    >
                        Browse, search, and download official forms, reports, and
                        institutional documents — all in one place.
                    </motion.p>

                    <motion.div
                        className="mx-auto w-24 h-1 bg-[#157d3c] rounded-full mb-10 origin-center"
                        variants={dividerVariants}
                    />

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

            {/* ==================== MAIN ==================== */}
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10 md:py-14">
                {/* Filters — sort options restored */}
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
                            className="w-full sm:w-auto pl-4 pr-10 py-3 border-2 border-gray-200 rounded-lg text-sm bg-white cursor-pointer outline-none focus:border-[#157d3c] appearance-none bg-no-repeat bg-[right_0.75rem_center]"
                            style={{
                                backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%236b7280' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`,
                                backgroundSize: "1.1rem",
                            }}
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
                            className="w-full sm:w-auto pl-4 pr-10 py-3 border-2 border-gray-200 rounded-lg text-sm bg-white cursor-pointer outline-none focus:border-[#157d3c] appearance-none bg-no-repeat bg-[right_0.75rem_center]"
                            style={{
                                backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%236b7280' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`,
                                backgroundSize: "1.1rem",
                            }}
                        >
                            <option value="newest">Newest First</option>
                            <option value="oldest">Oldest First</option>
                            <option value="alphabetical">A – Z</option>
                            <option value="alphabetical-desc">Z – A</option>
                        </select>                    </div>
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
                                        {/* THUMBNAIL */}
                                        <div
                                            className="relative w-full h-48 bg-gray-100 overflow-hidden flex items-start justify-center cursor-pointer"
                                            onClick={() => openViewer(form)}
                                        >
                                            <Document
                                                file={form.fileUrl}
                                                loading={
                                                    <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                                                        <div className="animate-pulse flex flex-col items-center gap-2">
                                                            <div className="w-10 h-14 bg-gray-300 rounded-sm" />
                                                            <span className="text-[0.6rem] font-semibold text-gray-400 tracking-widest">
                                                                LOADING
                                                            </span>
                                                        </div>
                                                    </div>
                                                }
                                                error={
                                                    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#157d3c]/10 to-[#157d3c]/25">
                                                        <span className="text-sm font-semibold text-[#157d3c] tracking-wide">
                                                            PDF
                                                        </span>
                                                    </div>
                                                }
                                            >
                                                <Page
                                                    pageNumber={1}
                                                    width={340}
                                                    renderAnnotationLayer={false}
                                                    renderTextLayer={false}
                                                    className="shadow-sm"
                                                />
                                            </Document>

                                            {/* Category pill — top-right */}
                                            <span className="absolute top-3 right-3 z-10 px-2.5 py-1 bg-white/90 backdrop-blur-sm text-[0.7rem] font-semibold text-[#0f5c2c] rounded-full shadow-sm">
                                                {form.category}
                                            </span>

                                            {/* Hover overlay */}
                                            <div className="absolute inset-0 z-10 bg-black/0 hover:bg-black/30 transition-colors duration-300 flex items-center justify-center opacity-0 hover:opacity-100">
                                                <span className="bg-white/95 text-[#0f5c2c] text-xs font-bold px-4 py-2 rounded-full shadow-lg">
                                                    Preview PDF
                                                </span>
                                            </div>

                                            <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-white to-transparent" />
                                        </div>

                                        {/* BODY */}
                                        <div className="flex-1 p-5">
                                            <h3 className="m-0 mb-2 text-lg font-semibold text-gray-900 leading-snug line-clamp-2">
                                                {form.title}
                                            </h3>
                                            <p className="m-0 mb-4 text-sm text-gray-500 leading-relaxed line-clamp-2">
                                                {form.description}
                                            </p>
                                            <div className="flex flex-wrap gap-3 text-xs text-gray-500">
                                                <span>{form.fileSize}</span>
                                                <span>•</span>
                                                <span>{formatDate(form.uploadDate)}</span>
                                                <span>•</span>
                                                <span>{form.fileType}</span>
                                            </div>
                                        </div>

                                        {/* FOOTER */}
                                        <div className="px-5 py-4 border-t border-gray-200 flex gap-2">
                                            <motion.button
                                                type="button"
                                                onClick={() => openViewer(form)}
                                                whileHover={{ scale: 1.02 }}
                                                whileTap={{ scale: 0.97 }}
                                                className="flex-1 flex items-center justify-center px-4 py-2.5 bg-white hover:bg-gray-50 text-[#157d3c] border-2 border-[#157d3c] rounded-lg text-sm font-semibold cursor-pointer transition-colors duration-200"
                                            >
                                                Preview
                                            </motion.button>
                                            <motion.button
                                                type="button"
                                                onClick={() => handleDownload(form)}
                                                whileHover={{ scale: 1.02 }}
                                                whileTap={{ scale: 0.97 }}
                                                className="flex-1 flex items-center justify-center px-4 py-2.5 bg-[#157d3c] hover:bg-[#0f5c2c] text-white border-none rounded-lg text-sm font-semibold cursor-pointer transition-colors duration-200"
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

            {/* ==================== PDF MODAL VIEWER ==================== */}
            <AnimatePresence>
                {openPdf && (
                    <motion.div
                        className="fixed inset-0 z-50 flex items-center justify-center p-0 md:p-6 bg-black/80 backdrop-blur-sm"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25 }}
                    >
                        <div
                            className="absolute inset-0"
                            onClick={closeViewer}
                            aria-hidden="true"
                        />

                        <motion.div
                            className="relative w-full h-full md:max-w-5xl md:h-[92vh] bg-white md:rounded-2xl shadow-2xl flex flex-col overflow-hidden"
                            initial={{ scale: 0.95, y: 20, opacity: 0 }}
                            animate={{ scale: 1, y: 0, opacity: 1 }}
                            exit={{ scale: 0.95, y: 20, opacity: 0 }}
                            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        >
                            <div className="flex items-center justify-between gap-4 px-5 py-3 bg-gradient-to-r from-[#0f5c2c] to-[#157d3c] text-white">
                                <div className="min-w-0">
                                    <h2 className="font-bold truncate text-base md:text-lg">
                                        {openPdf.title}
                                    </h2>
                                    <p className="text-xs text-green-100 truncate">
                                        {openPdf.category}
                                    </p>
                                </div>
                                <div className="flex items-center gap-2 shrink-0">
                                    <button
                                        onClick={() => handleDownload(openPdf)}
                                        className="hidden md:inline-flex items-center gap-1.5 bg-[#f5c518] hover:bg-[#e6b800] text-[#1a1a1a] text-sm font-semibold px-3 py-1.5 rounded-lg transition-colors"
                                    >
                                        ⬇ Download
                                    </button>
                                    <button
                                        onClick={closeViewer}
                                        className="bg-red-600 hover:bg-red-700 px-3 py-1.5 rounded-lg text-sm font-semibold transition-colors"
                                        aria-label="Close viewer"
                                    >
                                        Close ✕
                                    </button>
                                </div>
                            </div>

                            <div className="flex-1 overflow-auto bg-gray-200 flex justify-center p-4">
                                <Document
                                    file={openPdf.fileUrl}
                                    onLoadSuccess={({ numPages }) =>
                                        setNumPages(numPages)
                                    }
                                    loading={
                                        <div className="flex items-center justify-center h-full">
                                            <div className="animate-spin rounded-full h-10 w-10 border-4 border-[#157d3c] border-t-transparent" />
                                        </div>
                                    }
                                    error={
                                        <div className="text-red-600 font-semibold p-8">
                                            Failed to load PDF.
                                        </div>
                                    }
                                >
                                    <Page
                                        pageNumber={viewerPage}
                                        width={Math.min(
                                            900,
                                            typeof window !== "undefined"
                                                ? window.innerWidth - 80
                                                : 900
                                        )}
                                        renderAnnotationLayer={false}
                                        renderTextLayer={false}
                                        className="shadow-xl bg-white"
                                    />
                                </Document>
                            </div>

                            {numPages && (
                                <div className="flex items-center justify-between px-5 py-3 border-t bg-white">
                                    <button
                                        onClick={() =>
                                            setViewerPage((p) =>
                                                Math.max(1, p - 1)
                                            )
                                        }
                                        disabled={viewerPage <= 1}
                                        className="px-3 py-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-800 text-sm font-semibold disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                                    >
                                        ← Prev
                                    </button>
                                    <span className="text-sm text-gray-600">
                                        Page <strong>{viewerPage}</strong> of{" "}
                                        {numPages}
                                    </span>
                                    <button
                                        onClick={() =>
                                            setViewerPage((p) =>
                                                Math.min(numPages, p + 1)
                                            )
                                        }
                                        disabled={viewerPage >= numPages}
                                        className="px-3 py-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-800 text-sm font-semibold disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                                    >
                                        Next →
                                    </button>
                                </div>
                            )}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </MainLayout>
    );
}