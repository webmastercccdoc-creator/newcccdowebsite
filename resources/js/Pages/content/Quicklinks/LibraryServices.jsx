import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import MainLayout from "../../../layouts/MainLayout";
import libraryBannerImg from '../../../assets/banner/ovpacads-banner.png';
import libraryLogo from '../../../assets/logos/osas-logo.png';
import sdg1 from '../../../assets/images/sdg1.png';
import sdg2 from '../../../assets/images/sdg2.jpg';
import sdg3 from '../../../assets/images/sdg3.png';
import sdg4 from '../../../assets/images/sdg4.png';
import sdg5 from '../../../assets/images/sdg5.jpg';
import sdg6 from '../../../assets/images/sdg6.png';
import sdg7 from '../../../assets/images/sdg7.png';
import sdg8 from '../../../assets/images/sdg8.png';
import sdg9 from '../../../assets/images/sdg9.png';
import sdg10 from '../../../assets/images/sdg10.png';
import sdg11 from '../../../assets/images/sdg11.png';
import sdg12 from '../../../assets/images/sdg12.jpg';
import sdg13 from '../../../assets/images/sdg13.png';
import sdg14 from '../../../assets/images/sdg14.png';
import sdg15 from '../../../assets/images/sdg15.png';
import sdg16 from '../../../assets/images/sdg16.png';
import sdg17 from '../../../assets/images/sdg17.png';

// ===================== Motion variants =====================
const contentVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.45 },
    },
};

const tabPanelVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
    },
    exit: {
        opacity: 0,
        y: -10,
        transition: { duration: 0.25, ease: [0.22, 1, 0.36, 1] },
    },
};

// ===================== Slideshow Data =====================
const SLIDES = [
    {
        id: "library-1",
        image: libraryBannerImg,
        title: "A Welcoming Space for Learning",
        description:
            "The Library provides a comfortable and conducive environment where students can study, research, and explore a wide collection of resources.",
    },
    {
        id: "library-2",
        image: libraryBannerImg,
        title: "Reading & Study Areas",
        description:
            "Quiet reading zones and group study spaces designed to support focused learning, collaboration, and academic success.",
    },
    {
        id: "library-3",
        image: libraryBannerImg,
        title: "Digital & E-Learning Resources",
        description:
            "Access to online databases, e-books, journals, and digital materials to support modern research and coursework.",
    },
    {
        id: "library-4",
        image: libraryBannerImg,
        title: "Library Programs & Services",
        description:
            "The library hosts orientations, book fairs, information literacy sessions, and other activities that promote lifelong learning.",
    },
];

const stripHtml = (html = "") => html.replace(/<[^>]*>/g, "").trim();

const normalizeImagePath = (value) => {
    if (!value) return "";
    if (/^https?:\/\//i.test(value) || value.startsWith("data:")) return value;
    return "/" + String(value).replace(/^\/+/, "");
};

const formatDate = (value) => {
    if (!value) return "Recently";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return value;
    return new Intl.DateTimeFormat("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
    }).format(date);
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

// ============ Under Development placeholder ============
const UnderDevelopment = () => (
    <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-[#157d3c] bg-[#f0f7f2] px-6 py-14 text-center">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#157d3c]">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#ffffff"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-8 w-8"
            >
                <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
            </svg>
        </div>

        <h4 className="mb-2 text-lg font-extrabold tracking-tight text-[#1a1a1a]">
            Under Development
        </h4>

        <p className="max-w-md text-sm leading-relaxed text-gray-600">
            This section is currently being prepared. Please check back soon
            for updated content and information.
        </p>

        <div className="mt-4 h-1 w-16 rounded-full bg-[#f5c518]" />
    </div>
);

// ===================== Lower Tabs Data =====================
const TABS = [
    {
        id: "collections",
        label: "Library Collections",
        shortLabel: "Collections",
        content: <UnderDevelopment />,
    },
    {
        id: "services",
        label: "Library Services",
        shortLabel: "Services",
        content: <UnderDevelopment />,
    },
    {
        id: "e-resources",
        label: "Electronic Resources",
        shortLabel: "E-Resources",
        content: <UnderDevelopment />,
    },
    {
        id: "policies",
        label: "Policies & Guidelines",
        shortLabel: "Policies",
        content: <UnderDevelopment />,
    },
    {
        id: "news",
        label: "News",
        shortLabel: "News",
        content: (
            <>
                <p className="mb-4 text-justify leading-relaxed text-gray-700">
                    Stay updated with the latest <strong>news, announcements, and events</strong> from
                    the Library Services Office. This section features important
                    updates on library schedules, new acquisitions, programs, and
                    other relevant information for the student body.
                </p>

                <div className="space-y-6">
                    <div className="border-l-4 border-[#157d3c] pl-4 py-1">
                        <h4 className="font-bold text-[#1a1a1a] mb-1">
                            Library Hours for the New Semester
                        </h4>
                        <p className="text-sm text-gray-600 mb-1">
                            Posted: August 15, 2025
                        </p>
                        <p className="text-justify leading-relaxed text-gray-700 text-sm">
                            The Library will be open from 7:00 AM to 7:00 PM,
                            Monday through Saturday. Students are encouraged to
                            bring their valid school ID at all times.
                        </p>
                    </div>

                    <div className="border-l-4 border-[#f5c518] pl-4 py-1">
                        <h4 className="font-bold text-[#1a1a1a] mb-1">
                            New Books Now Available
                        </h4>
                        <p className="text-sm text-gray-600 mb-1">
                            Posted: August 10, 2025
                        </p>
                        <p className="text-justify leading-relaxed text-gray-700 text-sm">
                            A fresh batch of new books and references has arrived
                            across various disciplines. Visit the Library's New
                            Acquisitions shelf to browse the latest titles.
                        </p>
                    </div>

                    <div className="border-l-4 border-[#157d3c] pl-4 py-1">
                        <h4 className="font-bold text-[#1a1a1a] mb-1">
                            Information Literacy Orientation
                        </h4>
                        <p className="text-sm text-gray-600 mb-1">
                            Posted: August 5, 2025
                        </p>
                        <p className="text-justify leading-relaxed text-gray-700 text-sm">
                            Freshmen and transferee students are invited to join
                            the Library Orientation and Information Literacy
                            session. Please coordinate with your respective
                            college for schedules.
                        </p>
                    </div>
                </div>
            </>
        ),
    },
];

// ===================== Upper (Head Librarian) Tabs Data =====================
const DIRECTOR_TABS = [
    {
        id: "bionote",
        label: "Bionote",
        shortLabel: "Bionote",
        content: (
            <>
                <p className="mb-4 text-justify leading-relaxed text-gray-700">
                    <strong>Ms. Juana R. Dela Cruz</strong> serves as the Head
                    Librarian of the City College of Cagayan de Oro. She holds a
                    Master's degree in Library and Information Science and has
                    dedicated her career to promoting information literacy and
                    lifelong learning among students.
                </p>
                <p className="mb-4 text-justify leading-relaxed text-gray-700">
                    Throughout her career, she has championed initiatives
                    focused on modernizing library services, expanding digital
                    collections, and creating welcoming spaces for learning. She
                    has led numerous programs that empower students to become
                    confident, ethical, and independent users of information.
                </p>
                <p className="text-justify leading-relaxed text-gray-700">
                    Her vision for the Library centers on building a
                    future-ready, inclusive, and student-centered learning hub
                    that supports the academic and personal growth of every
                    learner.
                </p>
            </>
        ),
    },
    {
        id: "general-functions",
        label: "General Functions",
        shortLabel: "General Functions",
        content: (
            <>
                <p className="mb-5 text-justify leading-relaxed text-gray-700">
                    The Library Services Office provides access to quality
                    information resources and services that support the
                    instructional, research, and extension programs of the
                    College. It acquires, organizes, preserves, and disseminates
                    information in various formats to meet the needs of students,
                    faculty, and staff.
                </p>
                <p className="text-justify leading-relaxed text-gray-700">
                    The Library also conducts user education programs,
                    orientation sessions, and information literacy activities to
                    help the academic community maximize available resources.
                    It collaborates with academic departments to ensure that
                    collections remain relevant and responsive to the changing
                    needs of the curriculum. The organizational structure
                    provided below delineates the chain of command and
                    associated responsibilities.
                </p>
            </>
        ),
    },
];

// ============ Banner text ============
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

// ============ Office Slideshow ============
function OfficeSlideshow() {
    const [current, setCurrent] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    useEffect(() => {
        if (isPaused) return;
        const timer = setInterval(() => {
            setCurrent((prev) => (prev + 1) % SLIDES.length);
        }, 5000);
        return () => clearInterval(timer);
    }, [isPaused]);

    const goTo = (index) => setCurrent(index);
    const goPrev = () =>
        setCurrent((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
    const goNext = () => setCurrent((prev) => (prev + 1) % SLIDES.length);

    const slide = SLIDES[current];

    return (
        <motion.div
            className="mt-14 md:mt-20 bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-xl transition-shadow duration-300 overflow-hidden"
            variants={contentVariants}
            initial="hidden"
            animate="visible"
        >
            {/* Section heading */}
            <div className="border-b border-gray-200 bg-[#f0f7f2] px-6 sm:px-8 md:px-10 lg:px-14 py-6 text-center">
                <h2 className="m-0 text-2xl md:text-3xl font-extrabold text-[#1a1a1a] tracking-tight">
                    Our{" "}
                    <span className="text-[#157d3c]">Library</span>
                </h2>
                <div className="w-16 h-1 bg-[#f5c518] rounded-full mt-3 mx-auto" />
                <p className="mt-3 text-sm md:text-base text-gray-600 max-w-2xl mx-auto">
                    Take a look inside the Library — a space built for
                    learning, discovery, and academic growth.
                </p>
            </div>

            <div
                className="relative w-full overflow-hidden"
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
            >
                {/* Slides */}
                <div className="relative w-full aspect-[16/9] md:aspect-[21/9] bg-gray-100">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={slide.id}
                            className="absolute inset-0"
                            initial={{ opacity: 0, scale: 1.03 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 1.02 }}
                            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                        >
                            <img
                                src={slide.image}
                                alt={slide.title}
                                className="h-full w-full object-cover"
                                onError={(e) => {
                                    e.currentTarget.style.opacity = "0";
                                }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                        </motion.div>
                    </AnimatePresence>

                    {/* ===== Centered placeholder notice ON THE IMAGE ===== */}
                    <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center px-4">
                        <div className="rounded-xl border-2 border-[#f5c518] bg-black/60 px-5 py-3 sm:px-7 sm:py-4 text-center backdrop-blur-sm shadow-lg">
                            <p className="m-0 text-sm sm:text-base md:text-lg font-extrabold tracking-wide text-[#f5c518] uppercase">
                                Images are placeholders
                            </p>
                            <p className="mt-1 text-xs sm:text-sm font-medium text-white/90">
                                Actual library photos will be updated soon.
                            </p>
                        </div>
                    </div>

                    {/* Prev / Next buttons */}
                    <button
                        type="button"
                        onClick={goPrev}
                        aria-label="Previous slide"
                        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 flex h-10 w-10 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm transition-colors duration-200 hover:bg-[#157d3c] focus:outline-none"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-5 w-5"
                        >
                            <path d="m15 18-6-6 6-6" />
                        </svg>
                    </button>
                    <button
                        type="button"
                        onClick={goNext}
                        aria-label="Next slide"
                        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 flex h-10 w-10 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm transition-colors duration-200 hover:bg-[#157d3c] focus:outline-none"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-5 w-5"
                        >
                            <path d="m9 18 6-6-6-6" />
                        </svg>
                    </button>

                    {/* Counter */}
                    <div className="absolute top-4 right-4 z-30 rounded-full bg-black/50 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
                        {current + 1} / {SLIDES.length}
                    </div>
                </div>

                {/* Text content below the image */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={slide.id}
                        className="px-6 sm:px-8 md:px-10 lg:px-14 py-8 md:py-10 text-center md:text-left"
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <h3 className="m-0 mb-3 text-xl md:text-2xl font-extrabold text-[#1a1a1a] tracking-tight">
                            {slide.title}
                        </h3>
                        <div className="w-12 h-1 bg-[#f5c518] rounded-full mb-4 mx-auto md:mx-0" />
                        <p className="text-justify md:text-left leading-relaxed text-gray-700 max-w-3xl">
                            {slide.description}
                        </p>
                    </motion.div>
                </AnimatePresence>

                {/* Dots */}
                <div className="pb-6 flex items-center justify-center gap-2">
                    {SLIDES.map((s, i) => (
                        <button
                            key={s.id}
                            type="button"
                            onClick={() => goTo(i)}
                            aria-label={`Go to slide ${i + 1}`}
                            className={`h-2.5 rounded-full transition-all duration-300 focus:outline-none ${
                                i === current
                                    ? "w-8 bg-[#157d3c]"
                                    : "w-2.5 bg-gray-300 hover:bg-[#f5c518]"
                            }`}
                        />
                    ))}
                </div>
            </div>
        </motion.div>
    );
}

export default function LibraryServices() {
    const [activeTab, setActiveTab] = useState(TABS[0].id);
    const [activeDirectorTab, setActiveDirectorTab] = useState(DIRECTOR_TABS[0].id);
    const [libraryNews, setLibraryNews] = useState([]);
    const [isLoadingLibraryNews, setIsLoadingLibraryNews] = useState(true);

    const tabStripRef = useRef(null);

    useEffect(() => {
        document.title =
            "Library Services - City College of Cagayan de Oro";
    }, []);

    useEffect(() => {
        let isMounted = true;

        fetch("/api/news?department=LIBRARY")
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to fetch Library news");
                }

                return response.json();
            })
            .then((data) => {
                if (isMounted) {
                    setLibraryNews(Array.isArray(data) ? data : []);
                }
            })
            .catch(() => {
                if (isMounted) {
                    setLibraryNews([]);
                }
            })
            .finally(() => {
                if (isMounted) {
                    setIsLoadingLibraryNews(false);
                }
            });

        return () => {
            isMounted = false;
        };
    }, []);

    useEffect(() => {
        const el = tabStripRef.current;
        if (!el) return;
        const activeEl = el.querySelector(`#tab-${activeTab}`);
        if (activeEl) {
            activeEl.scrollIntoView({
                behavior: "smooth",
                block: "nearest",
                inline: "center",
            });
        }
    }, [activeTab]);

    const activeTabData = TABS.find((t) => t.id === activeTab);
    const activeDirectorTabData = DIRECTOR_TABS.find((t) => t.id === activeDirectorTab);

    const renderNewsTabContent = () => {
        if (isLoadingLibraryNews) {
            return (
                <div className="flex items-center justify-center rounded-xl border border-dashed border-gray-300 bg-gray-50 px-6 py-10 text-sm text-gray-600">
                    Loading news...
                </div>
            );
        }

        if (!libraryNews.length) {
            return (
                <div className="rounded-xl border border-dashed border-gray-300 bg-gray-50 px-6 py-10 text-center text-sm text-gray-600">
                    No news articles are available at the moment.
                </div>
            );
        }

        return (
            <div className="space-y-6">
                {libraryNews.map((article) => {
                    const excerpt = stripHtml(article.content || "");
                    const imageUrl = normalizeImagePath(article.image_path || article.image || article.image_url);
                    const sdgNumbers = Array.isArray(article.sdg_numbers)
                        ? article.sdg_numbers
                        : typeof article.sdg_numbers === "string" && article.sdg_numbers
                            ? article.sdg_numbers
                                .split(",")
                                .map((value) => Number(value.trim()))
                                .filter((value) => !Number.isNaN(value))
                            : [];

                    return (
                        <article
                            key={article.id}
                            className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-shadow duration-200 hover:shadow-md"
                        >
                            <div className="flex flex-col gap-4 p-4 md:flex-row md:items-center md:p-5">
                                {imageUrl && (
                                    <a href={`/news/${article.id}`} className="block w-full shrink-0 overflow-hidden rounded-xl md:w-52">
                                        <img
                                            src={imageUrl}
                                            alt={article.title || "News article"}
                                            className="h-32 w-full object-cover transition-transform duration-300 hover:scale-[1.02] md:h-28 md:w-52"
                                            onError={(e) => {
                                                e.currentTarget.style.display = "none";
                                            }}
                                        />
                                    </a>
                                )}

                                <div className="flex-1">
                                    <div className="mb-2 flex flex-wrap items-center justify-between gap-2 text-xs text-gray-500">
                                        <div className="flex flex-wrap items-center gap-2">
                                            <span className="rounded-full bg-[#e6f2ea] px-2.5 py-1 font-medium text-[#157d3c]">
                                                LIBRARY
                                            </span>
                                            <span>{formatDate(article.date)}</span>
                                        </div>

                                        {sdgNumbers.length > 0 && (
                                            <div className="flex flex-wrap items-center gap-2">
                                                {sdgNumbers.slice(0, 2).map((sdgNumber) => (
                                                    <img
                                                        key={`${article.id}-sdg-${sdgNumber}`}
                                                        src={sdgImages[sdgNumber]}
                                                        alt={`Sustainable Development Goal ${sdgNumber}`}
                                                        title={`SDG ${sdgNumber}`}
                                                        className="h-9 w-9 rounded-md border border-gray-200 object-cover shadow-sm"
                                                    />
                                                ))}
                                            </div>
                                        )}
                                    </div>

                                    <h4 className="mb-2 text-lg font-bold text-[#1a1a1a]">
                                        {article.title}
                                    </h4>

                                    <p className="line-clamp-3 text-sm leading-relaxed text-gray-700">
                                        {excerpt.length > 180 ? `${excerpt.slice(0, 180)}...` : excerpt}
                                    </p>

                                    <div className="mt-3">
                                        <a
                                            href={`/news/${article.id}`}
                                            className="inline-flex items-center gap-2 text-sm font-semibold text-[#157d3c] transition-colors hover:text-[#0f5c2c]"
                                        >
                                            Read more
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                className="h-4 w-4"
                                            >
                                                <path d="M5 12h14" />
                                                <path d="m12 5 7 7-7 7" />
                                            </svg>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </article>
                    );
                })}
            </div>
        );
    };

    const tabContent = activeTab === "news" ? renderNewsTabContent() : activeTabData.content;

    return (
        <MainLayout
            maxWidth="full"
            containerClassName="px-0"
            mainClassName="py-0"
            className="overflow-hidden pb-0"
        >
            <style>{`
                .library-tab-strip::-webkit-scrollbar {
                    display: none;
                    width: 0;
                    height: 0;
                }
                .library-tab-strip {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}</style>

            {/* ==================== BANNER ==================== */}
            <div
                className="relative w-full bg-cover bg-center bg-no-repeat shadow-lg min-h-[350px] md:min-h-[450px] lg:min-h-[550px] flex items-center justify-center"
                style={{
                    backgroundImage: `url('${libraryBannerImg}')`,
                }}
            >
                <div className="absolute inset-0 bg-black/50"></div>

                <AnimatedBannerText
                    title="Library Services"
                    description="Empowering learning, discovery, and research through quality collections, innovative services, and student-centered spaces."
                />
            </div>


            {/* ==================== MAIN CONTENT ==================== */}
            <div className="mx-auto w-full max-w-[1600px] px-6 sm:px-10 lg:px-16 xl:px-20 py-14 md:py-20">
                <motion.div
                    className="bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-xl transition-shadow duration-300 overflow-hidden"
                    variants={contentVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <div className="flex flex-col md:flex-row gap-10 lg:gap-14 p-8 md:p-10 lg:p-14 items-start">
                        {/* ================= LEFT COLUMN: Image + Contact Us ================= */}
                        <div className="w-full shrink-0 md:w-80 lg:w-96 mx-auto md:mx-0 flex flex-col gap-8">
                            {/* Head Librarian Image */}
                            <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
                                {/* Image */}
                                <div className="relative w-full aspect-[4/5] flex items-center justify-center bg-white p-2">
                                    {/* Placeholder — replace with `libraryHeadImage` when available */}
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="#157d3c"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="w-20 h-20"
                                    >
                                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                                        <circle cx="12" cy="7" r="4" />
                                    </svg>

                                    <p className="absolute bottom-4 left-4 right-4 text-center text-xs font-semibold uppercase tracking-widest text-[#157d3c]">
                                        Photo Coming Soon
                                    </p>
                                </div>

                                {/* Name + Position panel */}
                                <div className="border-t-4 border-[#f5c518] bg-white px-4 py-4 text-center">
                                    <p className="m-0 text-sm sm:text-base md:text-lg font-bold tracking-wide uppercase text-[#157d3c]">
                                        Ms. Juana R. Dela Cruz
                                    </p>
                                    <p className="mt-1 text-xs sm:text-sm md:text-base font-semibold text-[#1a1a1a] leading-tight">
                                        Head Librarian
                                    </p>
                                </div>
                            </div>

                            {/* ===== Contact Us — below the head librarian image ===== */}
                            <div className="rounded-xl border border-[#157d3c] bg-[#157d3c] p-6 shadow-sm">
                                <div className="flex flex-col items-left text-left mb-5">
                                    <h3 className="m-0 text-lg font-extrabold text-white tracking-tight">
                                        Contact{" "}
                                        <span className="text-[#f5c518]">
                                            Us
                                        </span>
                                    </h3>
                                    <div className="w-12 h-1 bg-[#f5c518] rounded-full mt-2" />
                                </div>

                                <ul className="space-y-3.5 text-sm text-white">
                                    <li className="flex items-start gap-2.5">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="#f5c518"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            className="w-4 h-4 mt-0.5 shrink-0"
                                        >
                                            <path d="M3 21h18" />
                                            <path d="M5 21V7l7-4 7 4v14" />
                                            <path d="M9 9h.01" />
                                            <path d="M9 12h.01" />
                                            <path d="M9 15h.01" />
                                            <path d="M15 9h.01" />
                                            <path d="M15 12h.01" />
                                            <path d="M15 15h.01" />
                                        </svg>
                                        <span>
                                            <strong>Office:</strong> Library
                                            Services, City College of Cagayan de
                                            Oro
                                        </span>
                                    </li>
                                    <li className="flex items-start gap-2.5">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="#f5c518"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            className="w-4 h-4 mt-0.5 shrink-0"
                                        >
                                            <rect
                                                width="20"
                                                height="16"
                                                x="2"
                                                y="4"
                                                rx="2"
                                            />
                                            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                                        </svg>
                                        <span>
                                            <strong>Email:</strong>{" "}
                                            library@cccdo.edu.ph
                                        </span>
                                    </li>
                                    <li className="flex items-start gap-2.5">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="#f5c518"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            className="w-4 h-4 mt-0.5 shrink-0"
                                        >
                                            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                                        </svg>
                                        <span>
                                            <strong>Phone:</strong> +63 927 777 2946
                                        </span>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* ================= RIGHT COLUMN: Tabs on top, then Content ================= */}
                        <div className="flex-1 w-full">
                            {/* ===== Upper Tab Switcher — at the top of the content area ===== */}
                            <div className="-mx-8 md:-mx-10 lg:-mx-14 -mt-8 md:-mt-10 lg:-mt-14 mb-8 border-b border-gray-200 bg-[#f0f7f2]">
                                <div
                                    role="tablist"
                                    aria-label="Library information tabs"
                                    className="flex w-full items-stretch overflow-x-auto"
                                >
                                    {DIRECTOR_TABS.map((tab) => {
                                        const isActive = activeDirectorTab === tab.id;
                                        return (
                                            <button
                                                key={tab.id}
                                                role="tab"
                                                id={`director-tab-${tab.id}`}
                                                aria-selected={isActive}
                                                aria-controls={`director-panel-${tab.id}`}
                                                onClick={() => setActiveDirectorTab(tab.id)}
                                                className={`relative flex-1 shrink-0 px-6 py-5 text-sm font-semibold tracking-wide whitespace-nowrap transition-colors duration-200 focus:outline-none ${
                                                    isActive
                                                        ? "text-white bg-[#157d3c]"
                                                        : "text-gray-600 bg-transparent hover:bg-[#f5c518] hover:text-[#1a1a1a]"
                                                }`}
                                            >
                                                <span className="hidden lg:inline">
                                                    {tab.label}
                                                </span>
                                                <span className="lg:hidden">
                                                    {tab.shortLabel}
                                                </span>

                                                {isActive && (
                                                    <motion.span
                                                        layoutId="activeDirectorTabIndicator"
                                                        className="absolute bottom-0 left-0 right-0 h-1 bg-[#f5c518] rounded-t-full"
                                                        transition={{
                                                            type: "spring",
                                                            stiffness: 380,
                                                            damping: 30,
                                                        }}
                                                    />
                                                )}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* ===== Tab Panel ===== */}
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeDirectorTab}
                                    role="tabpanel"
                                    id={`director-panel-${activeDirectorTab}`}
                                    aria-labelledby={`director-tab-${activeDirectorTab}`}
                                    variants={tabPanelVariants}
                                    initial="hidden"
                                    animate="visible"
                                    exit="exit"
                                >
                                    <h2 className="m-0 mb-4 text-2xl md:text-3xl font-extrabold text-[#1a1a1a] tracking-tight text-center">
                                        {activeDirectorTab === "bionote" ? (
                                            <>
                                                Bio{" "}
                                                <span className="text-[#157d3c]">
                                                    Note
                                                </span>
                                            </>
                                        ) : (
                                            <>
                                                General{" "}
                                                <span className="text-[#157d3c]">
                                                    Functions
                                                </span>
                                            </>
                                        )}
                                    </h2>

                                    <div className="w-16 h-1 bg-[#f5c518] rounded-full mb-6 mx-auto" />

                                    {activeDirectorTabData.content}
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>
                </motion.div>

                {/* ==================== OFFICE SLIDESHOW ==================== */}
                <OfficeSlideshow />

                {/* ==================== LOWER TABS SECTION ==================== */}
                <motion.div
                    className="mt-14 md:mt-20 bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden"
                    variants={contentVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {/* Tab Header Bar */}
                    <div className="border-b border-gray-200 bg-[#f0f7f2]">
                        <div
                            ref={tabStripRef}
                            role="tablist"
                            aria-label="Library Services divisions"
                            className="library-tab-strip flex w-full items-stretch overflow-x-auto"
                        >
                            {TABS.map((tab) => {
                                const isActive = activeTab === tab.id;
                                return (
                                    <button
                                        key={tab.id}
                                        role="tab"
                                        id={`tab-${tab.id}`}
                                        aria-selected={isActive}
                                        aria-controls={`panel-${tab.id}`}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`relative flex-1 shrink-0 px-6 py-5 text-sm font-semibold tracking-wide whitespace-nowrap transition-colors duration-200 focus:outline-none ${
                                            isActive
                                                ? "text-white bg-[#157d3c]"
                                                : "text-gray-600 bg-transparent hover:bg-[#f5c518] hover:text-[#1a1a1a]"
                                        }`}
                                    >
                                        <span className="hidden lg:inline">
                                            {tab.label}
                                        </span>
                                        <span className="lg:hidden">
                                            {tab.shortLabel}
                                        </span>

                                        {isActive && (
                                            <motion.span
                                                layoutId="activeTabIndicator"
                                                className="absolute bottom-0 left-0 right-0 h-1 bg-[#f5c518] rounded-t-full"
                                                transition={{
                                                    type: "spring",
                                                    stiffness: 380,
                                                    damping: 30,
                                                }}
                                            />
                                        )}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Tab Panel */}
                    <div className="p-8 md:p-10 lg:p-14 min-h-[260px]">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeTab}
                                role="tabpanel"
                                id={`panel-${activeTab}`}
                                aria-labelledby={`tab-${activeTab}`}
                                variants={tabPanelVariants}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                            >
                                <h3 className="m-0 mb-2 text-xl md:text-2xl font-extrabold text-[#1a1a1a] tracking-tight">
                                    {activeTabData.label}
                                </h3>
                                <div className="w-16 h-1 bg-[#f5c518] rounded-full mb-6" />
                                {tabContent}
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </motion.div>
            </div>
        </MainLayout>
    );
}