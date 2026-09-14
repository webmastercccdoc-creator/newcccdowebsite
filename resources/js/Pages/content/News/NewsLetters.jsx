import { useEffect, useState, useCallback } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

import MainLayout from "../../../layouts/MainLayout";
import NewsLetterBanner from '../../../assets/banner/News Banner.png';
import ExtensionComingSoon from "../Extension/ExtensionComingSoon";

// PDFs
import Pdf1 from "../../../assets/newsletters/CCCDO-Newsletter_Vol-1-Issue-1.pdf";
import Pdf2 from "../../../assets/newsletters/City-College-of-CDO-Newsletter-Vol-1-Issue-2-2025.pdf";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    "pdfjs-dist/build/pdf.worker.min.mjs",
    import.meta.url
).toString();

const NEWSLETTERS = [
    {
        id: 1,
        badge: "Vol. 1 · Issue 1",
        title: "HANDURAW 1st Issue 2025",
        publisher: "City College of Cagayan de Oro",
        edition: "Quarter 1 · 2025 Edition",
        description:
            "Featuring the LGU-CDO Monday Convocation, Women's Month celebration, and the college's milestone in the Times Higher Education Impact Rankings 2025.",
        file: Pdf1,
        accent: "from-green-700 to-emerald-500",
    },
    {
        id: 2,
        badge: "Vol. 1 · Issue 2",
        title: "HANDURAW 2nd Issue 2025",
        publisher: "City College of Cagayan de Oro",
        edition: "Quarter 2 · 2025 Edition",
        description:
            "Continued stories of academic excellence, community engagement, and the college's ongoing journey toward sustainable and inclusive education.",
        file: Pdf2,
        accent: "from-yellow-500 to-amber-400",
    },
];

export default function NewsLetters() {
    useEffect(() => {
        document.title = "Newsletters - City College of Cagayan de Oro";
    }, []);

    const [openPdf, setOpenPdf] = useState(null);
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);

    // ============================================================
    // ⚠️ PAGE VISIBILITY FLAG
    // ============================================================
    const COMING_SOON = false;

    if (COMING_SOON) {
        return (
            <ExtensionComingSoon
                title="Newsletters"
                description="Stay updated with the latest news and announcements from the City College of Cagayan de Oro."
                bannerImage={NewsLetterBanner}
            />
        );
    }

    const openViewer = (item) => {
        setOpenPdf(item);
        setPageNumber(1);
        setNumPages(null);
    };

    const closeViewer = useCallback(() => {
        setOpenPdf(null);
        setPageNumber(1);
        setNumPages(null);
    }, []);

    useEffect(() => {
        if (!openPdf) return;
        const onKey = (e) => {
            if (e.key === "Escape") closeViewer();
            if (e.key === "ArrowRight" && numPages && pageNumber < numPages)
                setPageNumber((p) => p + 1);
            if (e.key === "ArrowLeft" && pageNumber > 1)
                setPageNumber((p) => p - 1);
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [openPdf, numPages, pageNumber, closeViewer]);

    return (
        <MainLayout
            maxWidth="full"
            containerClassName="px-0"
            mainClassName="py-0"
            className="overflow-hidden pb-0"
        >
            {/* ==================== BANNER (UNCHANGED) ==================== */}
            <div
                className="relative w-full bg-cover bg-center bg-no-repeat shadow-lg min-h-[350px] md:min-h-[450px] lg:min-h-[550px] flex items-center justify-center"
                style={{
                    backgroundImage: `url(${NewsLetterBanner})`,
                }}
            >
                <div className="absolute inset-0 bg-black/50"></div>
                <AnimatedBannerText
                    title="Newsletters"
                    description="Stay updated with the latest news and announcements from the City College of Cagayan de Oro."
                />
            </div>

            {/* ==================== HANDURAW SECTION ==================== */}
            <section className="bg-gray-100 py-16 px-4 md:px-8">
                <div className="max-w-6xl mx-auto">
                    {/* Section header */}
                    <div className="text-center mb-12">
                        <span className="inline-block px-4 py-1.5 rounded-full bg-green-900 text-yellow-300 font-semibold text-xs tracking-widest uppercase shadow-md">
                            Official Publication
                        </span>
                        <h2 className="mt-5 text-4xl md:text-5xl font-extrabold text-green-900 tracking-tight">
                            HANDURAW
                        </h2>
                        <p className="mt-2 text-yellow-600 italic text-base md:text-lg font-medium">
                            "Reflection · Growth · Innovation"
                        </p>
                        <p className="mt-4 max-w-2xl mx-auto text-gray-600 text-sm md:text-base leading-relaxed">
                            The Official Newsletter of the City College of Cagayan de Oro.
                            Explore our quarterly issues below.
                        </p>
                        {/* Decorative divider */}
                        <div className="mt-6 flex items-center justify-center gap-3">
                            <span className="h-px w-16 bg-gradient-to-r from-transparent to-green-700" />
                            <span className="w-2 h-2 rounded-full bg-green-700" />
                            <span className="w-2 h-2 rounded-full bg-yellow-500" />
                            <span className="w-2 h-2 rounded-full bg-green-700" />
                            <span className="h-px w-16 bg-gradient-to-l from-transparent to-green-700" />
                        </div>
                    </div>

                    {/* Cards grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        {NEWSLETTERS.map((item) => (
                            <NewsletterCard
                                key={item.id}
                                item={item}
                                onOpen={() => openViewer(item)}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* ==================== PDF MODAL ==================== */}
            {openPdf && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-0 md:p-6 bg-black/80 backdrop-blur-sm">
                    <div
                        className="absolute inset-0"
                        onClick={closeViewer}
                        aria-hidden="true"
                    />

                    <div className="relative w-full h-full md:max-w-5xl md:h-[92vh] bg-white md:rounded-2xl shadow-2xl flex flex-col overflow-hidden">
                        {/* Modal header */}
                        <div className="flex items-center justify-between gap-4 px-5 py-3 bg-gradient-to-r from-green-900 to-emerald-700 text-white">
                            <div className="min-w-0">
                                <h2 className="font-bold truncate">{openPdf.title}</h2>
                                <p className="text-xs text-green-100 truncate">
                                    {openPdf.edition}
                                </p>
                            </div>
                            <div className="flex items-center gap-2 shrink-0">
                                <a
                                    href={openPdf.file}
                                    download
                                    className="hidden md:inline-flex items-center gap-1.5 bg-yellow-400 hover:bg-yellow-300 text-green-900 text-sm font-semibold px-3 py-1.5 rounded-lg transition"
                                >
                                    ⬇ Download
                                </a>
                                <button
                                    onClick={closeViewer}
                                    className="bg-red-600 hover:bg-red-700 px-3 py-1.5 rounded-lg text-sm font-semibold transition"
                                    aria-label="Close viewer"
                                >
                                    Close ✕
                                </button>
                            </div>
                        </div>

                        {/* PDF body */}
                        <div className="flex-1 overflow-auto bg-gray-200 flex justify-center p-4">
                            <Document
                                file={openPdf.file}
                                onLoadSuccess={({ numPages }) => setNumPages(numPages)}
                                loading={
                                    <div className="flex items-center justify-center h-full">
                                        <div className="animate-spin rounded-full h-10 w-10 border-4 border-green-700 border-t-transparent" />
                                    </div>
                                }
                                error={
                                    <div className="text-red-600 font-semibold p-8">
                                        Failed to load PDF.
                                    </div>
                                }
                            >
                                <Page
                                    pageNumber={pageNumber}
                                    width={Math.min(900, window.innerWidth - 80)}
                                    renderAnnotationLayer={false}
                                    renderTextLayer={false}
                                    className="shadow-xl"
                                />
                            </Document>
                        </div>

                        {/* Modal footer — pagination */}
                        {numPages && (
                            <div className="flex items-center justify-between px-5 py-3 border-t bg-white">
                                <button
                                    onClick={() =>
                                        setPageNumber((p) => Math.max(1, p - 1))
                                    }
                                    disabled={pageNumber <= 1}
                                    className="px-3 py-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-800 text-sm font-semibold disabled:opacity-40 disabled:cursor-not-allowed transition"
                                >
                                    ← Prev
                                </button>
                                <span className="text-sm text-gray-600">
                                    Page <strong>{pageNumber}</strong> of {numPages}
                                </span>
                                <button
                                    onClick={() =>
                                        setPageNumber((p) =>
                                            Math.min(numPages, p + 1)
                                        )
                                    }
                                    disabled={pageNumber >= numPages}
                                    className="px-3 py-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-800 text-sm font-semibold disabled:opacity-40 disabled:cursor-not-allowed transition"
                                >
                                    Next →
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </MainLayout>
    );
}

/* ================================================================== */
/*                              CARD                                  */
/* ================================================================== */
function NewsletterCard({ item, onOpen }) {
    return (
        <article className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col transform hover:-translate-y-1">
            <div className={`h-1.5 w-full bg-gradient-to-r ${item.accent}`} />

            <div className="absolute top-4 left-4 z-10">
                <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-bold text-white bg-gradient-to-r ${item.accent} shadow-md`}
                >
                    {item.badge}
                </span>
            </div>

            <div className="relative w-full bg-gradient-to-br from-gray-100 to-gray-200 flex justify-center items-start overflow-hidden h-[380px]">
                <Document
                    file={item.file}
                    loading={
                        <div className="flex flex-col items-center justify-center h-full text-gray-500 gap-3">
                            <div className="animate-spin rounded-full h-8 w-8 border-4 border-green-700 border-t-transparent" />
                            <span className="text-xs">Loading preview…</span>
                        </div>
                    }
                    error={
                        <div className="flex flex-col items-center justify-center h-full text-red-500 gap-2 p-6 text-center">
                            <span className="text-3xl">⚠️</span>
                            <span className="text-sm">
                                Failed to load PDF preview.
                            </span>
                        </div>
                    }
                >
                    <Page
                        pageNumber={1}
                        width={460}
                        renderAnnotationLayer={false}
                        renderTextLayer={false}
                        className="shadow-md mt-4 group-hover:scale-[1.02] transition-transform duration-500"
                    />
                </Document>

                <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent" />
            </div>

            <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-2xl font-extrabold text-green-900 leading-tight">
                    {item.title}
                </h3>
                <p className="text-gray-700 mt-1 font-medium">
                    {item.publisher}
                </p>
                <p className="text-gray-500 text-sm mt-1">{item.edition}</p>

                <p className="text-gray-600 text-sm mt-4 leading-relaxed line-clamp-3">
                    {item.description}
                </p>

                <div className="flex-1" />

                <button
                    onClick={onOpen}
                    className="mt-6 w-full bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-green-900 font-extrabold py-3.5 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg active:scale-[0.98] flex items-center justify-center gap-2"
                >
                    <span>ACCESS THE FULL VERSION</span>
                    <span className="transition-transform group-hover:translate-x-1">
                        →
                    </span>
                </button>
            </div>
        </article>
    );
}

/* ================================================================== */
/*                         ANIMATED BANNER TEXT                       */
/* ================================================================== */
function AnimatedBannerText({ title, description }) {
    return (
        <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-extrabold text-white drop-shadow-lg tracking-tight">
                {title}
            </h1>
            <p className="mt-4 text-white/90 text-sm md:text-lg leading-relaxed drop-shadow">
                {description}
            </p>
        </div>
    );
}