import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import MainLayout from "../../../layouts/MainLayout";
import libraryBannerImg from "../../../assets/banner/ovpacads-banner.png";
import libraryLogo from "../../../assets/logos/osas-logo.png";
import sdg1 from "../../../assets/images/sdg1.png";
import sdg2 from "../../../assets/images/sdg2.jpg";
import sdg3 from "../../../assets/images/sdg3.png";
import sdg4 from "../../../assets/images/sdg4.png";
import sdg5 from "../../../assets/images/sdg5.jpg";
import sdg6 from "../../../assets/images/sdg6.png";
import sdg7 from "../../../assets/images/sdg7.png";
import sdg8 from "../../../assets/images/sdg8.png";
import sdg9 from "../../../assets/images/sdg9.png";
import sdg10 from "../../../assets/images/sdg10.png";
import sdg11 from "../../../assets/images/sdg11.png";
import sdg12 from "../../../assets/images/sdg12.jpg";
import sdg13 from "../../../assets/images/sdg13.png";
import sdg14 from "../../../assets/images/sdg14.png";
import sdg15 from "../../../assets/images/sdg15.png";
import sdg16 from "../../../assets/images/sdg16.png";
import sdg17 from "../../../assets/images/sdg17.png";

// ===================== Motion variants =====================
const riseIn = {
    hidden: { opacity: 0, y: 32 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
    },
};

const staggerParent = {
    hidden: {},
    visible: {
        transition: { staggerChildren: 0.09, delayChildren: 0.05 },
    },
};

const panelSwitch = {
    hidden: { opacity: 0, y: 16 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
    },
    exit: {
        opacity: 0,
        y: -10,
        transition: { duration: 0.22, ease: [0.22, 1, 0.36, 1] },
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

// ===================== Helpers =====================
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

const getInitials = (name = "") =>
    String(name)
        .trim()
        .split(/\s+/)
        .filter(Boolean)
        .slice(0, 2)
        .map((word) => word[0])
        .join("")
        .toUpperCase();

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

// ===================== Contact data =====================
const CONTACT_ITEMS = [
    {
        label: "Office",
        value: "Library Services, City College of Cagayan de Oro",
        icon: (
            <>
                <path d="M3 21h18" />
                <path d="M5 21V7l7-4 7 4v14" />
                <path d="M9 9h.01" />
                <path d="M9 12h.01" />
                <path d="M9 15h.01" />
                <path d="M15 9h.01" />
                <path d="M15 12h.01" />
                <path d="M15 15h.01" />
            </>
        ),
    },
    {
        label: "Email",
        value: "---------",
        icon: (
            <>
                <rect width="20" height="16" x="2" y="4" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </>
        ),
    },
    {
        label: "Phone",
        value: "---------",
        icon: (
            <>
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
            </>
        ),
    },
];

// ===================== Top Library User Data =====================
const TOP_LIBRARY_USER = {
    name: "Andrea Mae B. Salvador",
    program: "BS Information Technology",
    yearLevel: "3rd Year",
    visits: 214,
    borrowed: 48,
};

// ===================== Org Chart Data =====================
const ORG_CHART = {
    head: {
        role: "College Librarian",
        name: "Dr. Melody R. Agcito",
    },
    sections: [
        {
            title: "Technical Services",
            description:
                "Acquisition, cataloging, classification, and physical processing of library materials.",
            icon: (
                <>
                    <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
                </>
            ),
        },
        {
            title: "Reader Services",
            description:
                "Circulation, shelving, reader assistance, and library orientation programs.",
            icon: (
                <>
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </>
            ),
        },
        {
            title: "Reference & Information",
            description:
                "Research assistance, information literacy, and user education services.",
            icon: (
                <>
                    <circle cx="11" cy="11" r="8" />
                    <path d="m21 21-4.3-4.3" />
                </>
            ),
        },
        {
            title: "Periodicals & E-Resources",
            description:
                "Management of journals, databases, and digital collections.",
            icon: (
                <>
                    <rect width="20" height="14" x="2" y="3" rx="2" />
                    <line x1="8" x2="16" y1="21" y2="21" />
                    <line x1="12" x2="12" y1="17" y2="21" />
                </>
            ),
        },
    ],
};

// ============ Org Chart Component ============
function OrgChart() {
    const { head, sections } = ORG_CHART;

    return (
        <div className="relative">
            {/* Head card */}
            <div className="flex justify-center">
                <div className="relative w-full max-w-xs overflow-hidden rounded-2xl border-2 border-[#157d3c] bg-gradient-to-br from-[#157d3c] to-[#0b3d1e] p-5 text-center text-white shadow-lg shadow-[#157d3c]/25">
                    <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-[#f5c518]/15 blur-2xl" />
                    <p className="relative font-mono text-[9px] font-bold uppercase tracking-[0.28em] text-[#f5c518]">
                        Library Services Office
                    </p>
                    <p className="relative mt-2 text-base font-black leading-tight">
                        {head.role}
                    </p>
                    <p className="relative mt-1 text-xs font-medium text-white/75">
                        {head.name}
                    </p>
                </div>
            </div>

            {/* Vertical connector from head to branch */}
            <div className="flex justify-center">
                <div className="h-8 w-px bg-[#157d3c]/30" />
            </div>

            {/* Sections with connectors */}
            <div className="relative pt-6">
                {/* Horizontal connector (desktop) */}
                <div className="absolute top-0 hidden h-px bg-[#157d3c]/30 md:left-[calc(12.5%_-_0.375rem)] md:right-[calc(12.5%_-_0.375rem)] md:block" />

                <div className="grid gap-4 md:grid-cols-4">
                    {sections.map((section) => (
                        <div key={section.title} className="relative">
                            {/* Vertical drop from horizontal line (desktop) */}
                            <div className="absolute -top-6 left-1/2 hidden h-6 w-px -translate-x-1/2 bg-[#157d3c]/30 md:block" />

                            <div className="h-full rounded-2xl border border-gray-200 bg-white p-5 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#f5c518] hover:shadow-md">
                                <div className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-[#e6f2ea]">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="#157d3c"
                                        strokeWidth="1.9"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="h-5 w-5"
                                    >
                                        {section.icon}
                                    </svg>
                                </div>

                                <p className="m-0 text-sm font-black leading-snug text-[#1a1a1a]">
                                    {section.title}
                                </p>

                                <div className="mx-auto mt-3 h-0.5 w-8 rounded-full bg-[#f5c518]" />

                                <p className="mt-3 text-xs leading-relaxed text-gray-500">
                                    {section.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

// ============ Under Development placeholder ============
const UnderDevelopment = () => (
    <div className="relative flex flex-col items-center justify-center overflow-hidden rounded-2xl border border-dashed border-[#157d3c]/40 bg-[#f7fbf8] px-6 py-14 text-center">
        <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-[#f5c518]/10" />

        <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#157d3c] shadow-lg shadow-[#157d3c]/25">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#ffffff"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-7 w-7"
            >
                <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
            </svg>
        </div>

        <p className="mb-1 font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-[#157d3c]">
            Section 00
        </p>

        <h4 className="mb-2 text-lg font-extrabold tracking-tight text-[#1a1a1a]">
            Under Development
        </h4>

        <p className="max-w-md text-sm leading-relaxed text-gray-600">
            This section is currently being prepared. Please check back soon
            for updated content and information.
        </p>

        <div className="mt-5 h-1 w-16 rounded-full bg-[#f5c518]" />
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
        content: null, // rendered dynamically
    },
];

// ===================== Upper (Head Librarian) Tabs Data =====================
const DIRECTOR_TABS = [
    {
        id: "bionote",
        label: "Bionote",
        content: (
            <>
                <p className="mb-4 text-justify leading-relaxed text-gray-700">
                    <strong>Dr. Melody R. Agcito</strong> Melody Retazo Agcito is the College Librarian of City College of Cagayan de Oro. She received her PhD in Educational Management (Capitol University) in March 2019. Currently, she is the President of PLAI-Northern Mindanao Region Librarians Council and has been in the profession for 13 years.
                </p>
            </>
        ),
    },
    {
        id: "general-functions",
        label: "General Functions",
        content: (
            <>
                <p className="mb-5 text-justify leading-relaxed text-gray-700">
                    The City College of Cagayan de Oro Library supports the
                    academic and research needs of students, faculty, staff,
                    and the community by providing access to a wide range of
                    on-campus and remote resources. It offers expert reference
                    services and instructional programs to encourage
                    independent inquiry. With a focus on creating a conducive
                    learning environment, the library remains up-to-date with
                    advancements in librarianship to continually improve its
                    services.
                </p>

                <p className="mb-3 font-bold text-[#1a1a1a]">
                    General Responsibilities
                </p>

                <ol className="list-decimal space-y-2 pl-6 text-justify leading-relaxed text-gray-700 marker:font-semibold marker:text-[#157d3c]">
                    <li>
                        Plan, organize, coordinate, and manage activities of
                        the library;
                    </li>
                    <li>
                        Implement approved developmental programs and policies
                        for the library in accordance with established goals
                        and objectives;
                    </li>
                    <li>
                        Recommend to the President the hiring, promotion, and
                        dismissal of library personnel;
                    </li>
                    <li>
                        Define the duties and responsibilities of library
                        personnel;
                    </li>
                    <li>
                        Provide direction to library personnel toward the
                        attainment of the school's goals and objectives;
                    </li>
                    <li>
                        Supervise the inventory of library materials, furniture,
                        and equipment to maintain quality library collections
                        and holdings;
                    </li>
                    <li>
                        Determine the needs and requirements of the library in
                        coordination with the Deans and Program Heads to meet
                        the academic expectations of the students and faculty;
                    </li>
                    <li>Prepare and implement the approved library budget;</li>
                    <li>
                        Sustain the computerization of the library services and
                        operations;
                    </li>
                    <li>
                        Prepare and submit the required library quarterly and
                        yearly reports and other documents;
                    </li>
                    <li>
                        Establish linkages on resource sharing, consortium, and
                        networking activities with the various local, regional,
                        national, or international agencies and libraries to
                        optimize the use of resources and promote library use;
                    </li>
                    <li>
                        Formulate and implement the Development Plan of the
                        Library Services;
                    </li>
                    <li>
                        Perform other tasks as may be assigned by the Director
                        of Academic Resources and Service Office, Vice-President
                        for Academic Affairs, and the President.
                    </li>
                </ol>
            </>
        ),
    },
    {
        id: "org-structure",
        label: "Organizational Structure",
        content: <OrgChart />,
    },
];

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
        <motion.section
            className="mt-20 md:mt-28"
            variants={riseIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
        >
            {/* Section header — editorial style */}
            <div className="mb-8 flex flex-wrap items-end gap-x-6 gap-y-4 md:mb-10">
                <div>
                    <p className="mb-2 font-mono text-[10px] font-bold uppercase tracking-[0.35em] text-[#157d3c]">
                        Gallery
                    </p>
                    <h2 className="m-0 text-3xl font-black leading-none tracking-tight text-[#1a1a1a] md:text-5xl">
                        Our{" "}
                        <span className="text-[#157d3c]">Library</span>
                    </h2>
                </div>
                <div className="hidden h-px flex-1 bg-gradient-to-r from-gray-300 to-transparent md:block" />
                <p className="max-w-md text-sm leading-relaxed text-gray-500">
                    A space built for learning, discovery, and academic growth.
                </p>
            </div>

            {/* Split cinema panel */}
            <div
                className="grid overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm lg:grid-cols-12"
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
            >
                {/* Image side */}
                <div className="relative aspect-[16/10] overflow-hidden bg-gray-100 lg:col-span-7 lg:aspect-auto">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={slide.id}
                            className="absolute inset-0"
                            initial={{ opacity: 0, scale: 1.06 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 1.02 }}
                            transition={{
                                duration: 0.65,
                                ease: [0.22, 1, 0.36, 1],
                            }}
                        >
                            <img
                                src={slide.image}
                                alt={slide.title}
                                className="h-full w-full object-cover"
                                onError={(e) => {
                                    e.currentTarget.style.opacity = "0";
                                }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
                        </motion.div>
                    </AnimatePresence>

                    {/* Placeholder notice */}
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 flex justify-start p-5 md:p-7">
                        <div className="rounded-xl border border-[#f5c518]/70 bg-black/55 px-4 py-2.5 backdrop-blur-sm">
                            <p className="m-0 text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#f5c518] sm:text-xs">
                                Images are placeholders
                            </p>
                            <p className="mt-0.5 text-[10px] font-medium text-white/85 sm:text-xs">
                                Actual library photos will be updated soon.
                            </p>
                        </div>
                    </div>

                    {/* Slide counter */}
                    <div className="absolute right-5 top-5 z-20 flex items-baseline gap-1 rounded-full bg-black/50 px-3.5 py-1.5 backdrop-blur-sm">
                        <span className="font-mono text-sm font-bold text-[#f5c518]">
                            {String(current + 1).padStart(2, "0")}
                        </span>
                        <span className="font-mono text-[10px] font-semibold text-white/70">
                            / {String(SLIDES.length).padStart(2, "0")}
                        </span>
                    </div>
                </div>

                {/* Content side */}
                <div className="flex flex-col justify-between bg-[#0b3d1e] p-8 text-white md:p-10 lg:col-span-5 lg:p-12">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={slide.id}
                            initial={{ opacity: 0, y: 18 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -12 }}
                            transition={{
                                duration: 0.4,
                                ease: [0.22, 1, 0.36, 1],
                            }}
                        >
                            <span className="block font-mono text-[56px] font-black leading-none text-white/10 md:text-[72px]">
                                {String(current + 1).padStart(2, "0")}
                            </span>

                            <h3 className="mt-2 text-xl font-extrabold leading-snug tracking-tight md:text-2xl">
                                {slide.title}
                            </h3>

                            <div className="mt-4 h-1 w-12 rounded-full bg-[#f5c518]" />

                            <p className="mt-5 text-sm leading-relaxed text-white/75 md:text-[15px]">
                                {slide.description}
                            </p>
                        </motion.div>
                    </AnimatePresence>

                    {/* Controls */}
                    <div className="mt-10 flex items-center justify-between gap-4">
                        <div className="flex items-center gap-2">
                            {SLIDES.map((s, i) => (
                                <button
                                    key={s.id}
                                    type="button"
                                    onClick={() => goTo(i)}
                                    aria-label={`Go to slide ${i + 1}`}
                                    className={`h-1.5 rounded-full transition-all duration-300 focus:outline-none ${
                                        i === current
                                            ? "w-10 bg-[#f5c518]"
                                            : "w-4 bg-white/25 hover:bg-white/50"
                                    }`}
                                />
                            ))}
                        </div>

                        <div className="flex items-center gap-2">
                            <button
                                type="button"
                                onClick={goPrev}
                                aria-label="Previous slide"
                                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white transition-colors duration-200 hover:border-[#f5c518] hover:bg-[#f5c518] hover:text-[#1a1a1a] focus:outline-none"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="h-4 w-4"
                                >
                                    <path d="m15 18-6-6 6-6" />
                                </svg>
                            </button>
                            <button
                                type="button"
                                onClick={goNext}
                                aria-label="Next slide"
                                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white transition-colors duration-200 hover:border-[#f5c518] hover:bg-[#f5c518] hover:text-[#1a1a1a] focus:outline-none"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="h-4 w-4"
                                >
                                    <path d="m9 18 6-6-6-6" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </motion.section>
    );
}

// ============ Top Library User ============
function TopLibraryUser() {
    const user = TOP_LIBRARY_USER;

    return (
        <motion.section
            className="mt-20 md:mt-28"
            variants={riseIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
        >
            {/* Section header */}
            <div className="mb-8 flex flex-wrap items-end gap-x-6 gap-y-4 md:mb-10">
                <div>
                    <p className="mb-2 font-mono text-[10px] font-bold uppercase tracking-[0.35em] text-[#157d3c]">
                        Recognition
                    </p>
                    <h2 className="m-0 text-3xl font-black leading-none tracking-tight text-[#1a1a1a] md:text-5xl">
                        Top{" "}
                        <span className="text-[#157d3c]">Library User</span>
                    </h2>
                </div>
                <div className="hidden h-px flex-1 bg-gradient-to-r from-gray-300 to-transparent md:block" />
                <p className="max-w-md text-sm leading-relaxed text-gray-500">
                    Celebrating the student who made the most of the Library's
                    collections, spaces, and services.
                </p>
            </div>

            {/* Period badge */}
            <div className="mb-6 flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-2 rounded-full border border-[#157d3c]/25 bg-[#f0f7f2] px-4 py-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#157d3c]" />
                    <span className="font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-[#157d3c]">
                        1st Semester · A.Y. 2025–2026
                    </span>
                </span>
            </div>

            {/* Featured top user card */}
            <motion.div
                variants={riseIn}
                className="relative overflow-hidden rounded-3xl border border-[#f5c518]/60 bg-gradient-to-b from-[#fffdf3] to-white shadow-sm"
            >
                {/* Decorative glow */}
                <div className="pointer-events-none absolute -top-20 left-1/2 h-52 w-52 -translate-x-1/2 rounded-full bg-[#f5c518]/20 blur-3xl" />

                <div className="relative grid gap-8 p-8 md:grid-cols-[auto_minmax(0,1fr)] md:items-center md:p-10 lg:p-12">
                    {/* Avatar */}
                    <div className="flex justify-center md:justify-start">
                        <div className="relative">
                            <div className="flex h-32 w-32 items-center justify-center rounded-full border-4 border-[#f5c518] bg-[#f0f7f2] text-4xl font-black text-[#157d3c] shadow-lg shadow-[#f5c518]/30 md:h-36 md:w-36 md:text-5xl">
                                {getInitials(user.name)}
                            </div>

                            <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-[#f5c518] px-3 py-1 font-mono text-[9px] font-black uppercase tracking-[0.2em] text-[#7a5c00] shadow-sm">
                                Top User
                            </span>
                        </div>
                    </div>

                    {/* Details */}
                    <div className="text-center md:text-left">
                        <h3 className="m-0 text-2xl font-black leading-snug tracking-tight text-[#1a1a1a] md:text-3xl">
                            {user.name}
                        </h3>

                        <p className="mt-2 text-sm font-semibold text-gray-500">
                            {user.program}
                        </p>
                        <p className="mt-1 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[#157d3c]">
                            {user.yearLevel}
                        </p>

                        <div className="mx-auto mt-6 h-px w-20 bg-gray-200 md:mx-0" />

                        <div className="mt-6 flex items-center justify-center gap-10 md:justify-start">
                            <div>
                                <p className="m-0 font-mono text-3xl font-black text-[#157d3c]">
                                    {user.visits}
                                </p>
                                <p className="m-0 font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-gray-400">
                                    Visits
                                </p>
                            </div>

                            <span className="h-10 w-px bg-gray-200" />

                            <div>
                                <p className="m-0 font-mono text-3xl font-black text-[#157d3c]">
                                    {user.borrowed}
                                </p>
                                <p className="m-0 font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-gray-400">
                                    Books Borrowed
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Disclaimer */}
            <div className="mt-6 flex items-start gap-3 rounded-2xl border border-dashed border-[#f5c518]/60 bg-[#fffdf3] px-5 py-4">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#b8860b"
                    strokeWidth="1.9"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mt-0.5 h-4 w-4 shrink-0"
                >
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 16v-4" />
                    <path d="M12 8h.01" />
                </svg>
                <p className="m-0 text-xs leading-relaxed text-gray-600">
                    <strong className="font-bold text-[#1a1a1a]">
                        Sample profile.
                    </strong>{" "}
                    The name and figures shown are placeholders for layout
                    purposes. The official top library user will be announced
                    by the Library Services Office after the end of the
                    semester.
                </p>
            </div>
        </motion.section>
    );
}

// ===================== Page =====================
export default function LibraryServices() {
    const [activeTab, setActiveTab] = useState(TABS[0].id);
    const [activeDirectorTab, setActiveDirectorTab] = useState(
        DIRECTOR_TABS[0].id
    );
    const [libraryNews, setLibraryNews] = useState([]);
    const [isLoadingLibraryNews, setIsLoadingLibraryNews] = useState(true);

    const tabStripRef = useRef(null);

    useEffect(() => {
        document.title = "Library Services - City College of Cagayan de Oro";
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
    const activeDirectorTabData = DIRECTOR_TABS.find(
        (t) => t.id === activeDirectorTab
    );

    // Split the active director tab label: last word gets the green highlight
    const directorLabelParts = activeDirectorTabData.label.split(" ");
    const directorLabelLast =
        directorLabelParts.length > 1 ? directorLabelParts.pop() : null;
    const directorLabelFirst = directorLabelParts.join(" ");

    const renderNewsTabContent = () => {
        if (isLoadingLibraryNews) {
            return (
                <div className="flex items-center justify-center gap-3 rounded-2xl border border-dashed border-gray-300 bg-gray-50 px-6 py-12 text-sm text-gray-600">
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-[#157d3c] border-t-transparent" />
                    Loading news...
                </div>
            );
        }

        if (!libraryNews.length) {
            return (
                <div className="rounded-2xl border border-dashed border-gray-300 bg-gray-50 px-6 py-12 text-center text-sm text-gray-600">
                    No news articles are available at the moment.
                </div>
            );
        }

        return (
            <div className="grid gap-5 xl:grid-cols-2">
                {libraryNews.map((article) => {
                    const excerpt = stripHtml(article.content || "");
                    const imageUrl = normalizeImagePath(
                        article.image_path || article.image || article.image_url
                    );
                    const sdgNumbers = Array.isArray(article.sdg_numbers)
                        ? article.sdg_numbers
                        : typeof article.sdg_numbers === "string" &&
                          article.sdg_numbers
                        ? article.sdg_numbers
                              .split(",")
                              .map((value) => Number(value.trim()))
                              .filter((value) => !Number.isNaN(value))
                        : [];

                    return (
                        <article
                            key={article.id}
                            className="group flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#157d3c]/30 hover:shadow-lg"
                        >
                            {imageUrl && (
                                <a
                                    href={`/news/${article.id}`}
                                    className="block overflow-hidden"
                                >
                                    <img
                                        src={imageUrl}
                                        alt={article.title || "News article"}
                                        className="h-44 w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                                        onError={(e) => {
                                            e.currentTarget.parentElement.style.display =
                                                "none";
                                        }}
                                    />
                                </a>
                            )}

                            <div className="flex flex-1 flex-col p-5">
                                <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                                    <div className="flex flex-wrap items-center gap-2 text-[11px] text-gray-500">
                                        <span className="rounded-full bg-[#e6f2ea] px-2.5 py-1 font-bold uppercase tracking-wider text-[#157d3c]">
                                            Library
                                        </span>
                                        <span className="font-medium">
                                            {formatDate(article.date)}
                                        </span>
                                    </div>

                                    {sdgNumbers.length > 0 && (
                                        <div className="flex flex-wrap items-center gap-1.5">
                                            {sdgNumbers
                                                .slice(0, 3)
                                                .map((sdgNumber) => (
                                                    <img
                                                        key={`${article.id}-sdg-${sdgNumber}`}
                                                        src={sdgImages[sdgNumber]}
                                                        alt={`Sustainable Development Goal ${sdgNumber}`}
                                                        title={`SDG ${sdgNumber}`}
                                                        className="h-8 w-8 rounded-md border border-gray-200 object-cover shadow-sm"
                                                    />
                                                ))}
                                        </div>
                                    )}
                                </div>

                                <h4 className="mb-2 text-base font-bold leading-snug text-[#1a1a1a] md:text-lg">
                                    {article.title}
                                </h4>

                                <p className="mb-4 flex-1 text-sm leading-relaxed text-gray-600">
                                    {excerpt.length > 160
                                        ? `${excerpt.slice(0, 160)}...`
                                        : excerpt}
                                </p>

                                <a
                                    href={`/news/${article.id}`}
                                    className="inline-flex items-center gap-2 text-sm font-semibold text-[#157d3c] transition-all duration-200 hover:gap-3 hover:text-[#0f5c2c]"
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
                        </article>
                    );
                })}
            </div>
        );
    };

    const tabContent =
        activeTab === "news" ? renderNewsTabContent() : activeTabData.content;

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

            {/* ==================== HERO ==================== */}
            <section className="relative isolate flex min-h-[480px] items-center overflow-hidden md:min-h-[560px]">
                {/* Background image */}
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{ backgroundImage: `url('${libraryBannerImg}')` }}
                />

                {/* Gradient veil */}
                <div className="absolute inset-0 bg-gradient-to-tr from-[#05230f]/95 via-[#0b3d1e]/85 to-[#157d3c]/55" />

                {/* Blueprint grid */}
                <div
                    className="absolute inset-0 opacity-[0.12]"
                    style={{
                        backgroundImage:
                            "linear-gradient(to right, rgba(255,255,255,.6) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,.6) 1px, transparent 1px)",
                        backgroundSize: "84px 84px",
                    }}
                />

                {/* Yellow glow */}
                <div className="pointer-events-none absolute -left-24 top-1/4 h-80 w-80 rounded-full bg-[#f5c518]/20 blur-3xl" />
                <div className="pointer-events-none absolute -right-20 bottom-0 h-72 w-72 rounded-full bg-[#157d3c]/40 blur-3xl" />

                {/* Content */}
                <div className="relative z-10 mx-auto w-full max-w-[1600px] px-6 pb-28 pt-28 sm:px-10 md:pb-36 lg:px-16 xl:px-20">
                    <motion.div
                        variants={staggerParent}
                        initial="hidden"
                        animate="visible"
                        className="max-w-3xl"
                    >
                        <motion.div
                            variants={riseIn}
                            className="inline-flex items-center gap-3 rounded-full border border-[#f5c518]/50 bg-black/30 px-4 py-2 backdrop-blur-sm"
                        >
                            <img
                                src={libraryLogo}
                                alt=""
                                className="h-5 w-5 object-contain"
                                onError={(e) => {
                                    e.currentTarget.style.display = "none";
                                }}
                            />
                            <span className="font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-[#f5c518] sm:text-[11px]">
                                Library Services Office
                            </span>
                        </motion.div>

                        <motion.h1
                            variants={riseIn}
                            className="mt-6 text-[42px] font-black leading-[0.95] tracking-tight text-white drop-shadow-xl sm:text-6xl md:text-7xl"
                        >
                            Library
                            <br />
                            <span className="text-[#f5c518]">Services</span>
                        </motion.h1>

                        <motion.div
                            variants={riseIn}
                            className="mt-6 flex items-center gap-3"
                        >
                            <span className="h-1 w-16 rounded-full bg-[#f5c518]" />
                            <span className="h-1 w-6 rounded-full bg-white/30" />
                        </motion.div>

                        <motion.p
                            variants={riseIn}
                            className="mt-6 max-w-2xl text-sm leading-relaxed text-white/85 sm:text-base md:text-lg"
                        >
                            Empowering learning, discovery, and research through
                            quality collections, innovative services, and
                            student-centered spaces.
                        </motion.p>
                    </motion.div>
                </div>

                {/* Angled bottom edge */}
                <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-20 leading-[0]">
                    <svg
                        viewBox="0 0 1440 90"
                        preserveAspectRatio="none"
                        className="h-10 w-full fill-white md:h-16"
                    >
                        <path d="M0,0 L1440,90 L0,90 Z" />
                    </svg>
                </div>
            </section>

            {/* ==================== PROFILE + DIRECTOR TABS ==================== */}
            <section className="relative z-10 mx-auto w-full max-w-[1600px] px-6 sm:px-10 lg:px-16 xl:px-20">
                <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
                    {/* -------- Left: Head Librarian card (overlaps hero) -------- */}
                    <div className="lg:col-span-4 xl:col-span-3">
                        <motion.div
                            variants={riseIn}
                            initial="hidden"
                            animate="visible"
                            className="relative mx-auto -mt-16 w-full max-w-[300px] md:-mt-24 lg:mx-0 lg:max-w-none lg:-mt-28"
                        >
                            {/* Offset yellow frame */}
                            <div className="pointer-events-none absolute -left-3 -top-3 h-full w-full rounded-2xl border-2 border-[#f5c518]" />

                            <div className="relative overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl shadow-black/10">
                                <div className="relative flex aspect-[4/5] w-full items-center justify-center bg-gradient-to-br from-[#f0f7f2] to-white p-2">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="#157d3c"
                                        strokeWidth="1.25"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="h-20 w-20 opacity-70"
                                    >
                                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                                        <circle cx="12" cy="7" r="4" />
                                    </svg>

                                    <p className="absolute bottom-4 left-4 right-4 text-center font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-[#157d3c]">
                                        Photo Coming Soon
                                    </p>
                                </div>

                                <div className="bg-[#157d3c] px-4 py-5 text-center">
                                    <p className="m-0 text-sm font-bold uppercase tracking-wide text-white sm:text-base">
                                        Dr. Melody R. Agcito"
                                    </p>
                                    <p className="mt-1 text-xs font-semibold text-[#f5c518] sm:text-sm">
                                        College Librarian
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* -------- Right: Vertical tab rail + panel -------- */}
                    <div className="lg:col-span-8 lg:pt-10 xl:col-span-9">
                        <div className="grid gap-8 md:grid-cols-[240px_minmax(0,1fr)] md:gap-10 lg:gap-14">
                            {/* Vertical rail */}
                            <div
                                role="tablist"
                                aria-label="Head Librarian information"
                                className="library-tab-strip flex gap-3 overflow-x-auto pb-1 md:flex-col md:gap-3 md:overflow-visible md:pb-0"
                            >
                                {DIRECTOR_TABS.map((tab) => {
                                    const isActive =
                                        activeDirectorTab === tab.id;
                                    return (
                                        <button
                                            key={tab.id}
                                            role="tab"
                                            id={`director-tab-${tab.id}`}
                                            aria-selected={isActive}
                                            aria-controls={`director-panel-${tab.id}`}
                                            onClick={() =>
                                                setActiveDirectorTab(tab.id)
                                            }
                                            className={`group relative shrink-0 overflow-hidden rounded-xl border px-5 py-4 text-left transition-all duration-300 focus:outline-none md:w-full ${
                                                isActive
                                                    ? "border-[#157d3c] bg-[#157d3c] shadow-lg shadow-[#157d3c]/20"
                                                    : "border-gray-200 bg-white hover:-translate-y-0.5 hover:border-[#f5c518] hover:bg-[#fffdf3]"
                                            }`}
                                        >
                                            <span
                                                className={`block whitespace-nowrap text-sm font-bold tracking-wide ${
                                                    isActive
                                                        ? "text-white"
                                                        : "text-gray-700"
                                                }`}
                                            >
                                                {tab.label}
                                            </span>

                                            {isActive && (
                                                <motion.span
                                                    layoutId="directorTabBar"
                                                    className="absolute bottom-0 left-0 top-0 w-1 bg-[#f5c518]"
                                                    transition={{
                                                        type: "spring",
                                                        stiffness: 400,
                                                        damping: 32,
                                                    }}
                                                />
                                            )}
                                        </button>
                                    );
                                })}
                            </div>

                            {/* Panel */}
                            <div className="min-w-0">
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={activeDirectorTab}
                                        role="tabpanel"
                                        id={`director-panel-${activeDirectorTab}`}
                                        aria-labelledby={`director-tab-${activeDirectorTab}`}
                                        variants={panelSwitch}
                                        initial="hidden"
                                        animate="visible"
                                        exit="exit"
                                    >
                                        <div className="mb-5 flex items-center gap-4">
                                            <h2 className="m-0 text-2xl font-black tracking-tight text-[#1a1a1a] md:text-3xl">
                                                {directorLabelFirst
                                                    ? `${directorLabelFirst} `
                                                    : ""}
                                                <span className="text-[#157d3c]">
                                                    {directorLabelLast ||
                                                        activeDirectorTabData.label}
                                                </span>
                                            </h2>
                                            <span className="hidden h-px flex-1 bg-gray-200 sm:block" />
                                        </div>

                                        <div className="mb-6 h-1 w-14 rounded-full bg-[#f5c518]" />

                                        {activeDirectorTabData.content}
                                    </motion.div>
                                </AnimatePresence>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ==================== CONTACT STRIP (full bleed) ==================== */}
            <section className="relative mt-20 overflow-hidden bg-[#0b3d1e] md:mt-28">
                <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#157d3c]/50 blur-3xl" />
                <div className="pointer-events-none absolute -bottom-24 left-1/4 h-64 w-64 rounded-full bg-[#f5c518]/10 blur-3xl" />

                <div className="relative mx-auto w-full max-w-[1600px] px-6 py-14 sm:px-10 md:py-16 lg:px-16 xl:px-20">
                    <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
                        <div className="lg:col-span-3">
                            <p className="mb-2 font-mono text-[10px] font-bold uppercase tracking-[0.35em] text-[#f5c518]">
                                Get in touch
                            </p>
                            <h3 className="m-0 text-3xl font-black tracking-tight text-white md:text-4xl">
                                Contact{" "}
                                <span className="text-[#f5c518]">Us</span>
                            </h3>
                            <div className="mt-4 h-1 w-14 rounded-full bg-[#f5c518]" />
                        </div>

                        <div className="grid gap-4 sm:grid-cols-3 lg:col-span-9">
                            {CONTACT_ITEMS.map((item) => (
                                <div
                                    key={item.label}
                                    className="rounded-2xl border border-white/10 bg-white/[0.06] p-5 backdrop-blur-sm transition-colors duration-300 hover:border-[#f5c518]/40 hover:bg-white/[0.09]"
                                >
                                    <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-[#f5c518]/15">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="#f5c518"
                                            strokeWidth="1.9"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            className="h-5 w-5"
                                        >
                                            {item.icon}
                                        </svg>
                                    </div>
                                    <p className="mb-1 font-mono text-[9px] font-bold uppercase tracking-[0.28em] text-white/45">
                                        {item.label}
                                    </p>
                                    <p className="text-sm font-semibold leading-snug text-white">
                                        {item.value}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ==================== MAIN CONTENT ==================== */}
            <div className="mx-auto w-full max-w-[1600px] px-6 py-16 sm:px-10 md:py-20 lg:px-16 xl:px-20">
                {/* -------- Slideshow -------- */}
                <OfficeSlideshow />

                {/* -------- Top Library User -------- */}
                <TopLibraryUser />

                {/* -------- Lower Tabs -------- */}
                <motion.section
                    className="mt-20 md:mt-28"
                    variants={riseIn}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}
                >
                    {/* Section header */}
                    <div className="mb-8 flex flex-wrap items-end gap-x-6 gap-y-4 md:mb-10">
                        <div>
                            <p className="mb-2 font-mono text-[10px] font-bold uppercase tracking-[0.35em] text-[#157d3c]">
                                Explore
                            </p>
                            <h2 className="m-0 text-3xl font-black leading-none tracking-tight text-[#1a1a1a] md:text-5xl">
                                Library{" "}
                                <span className="text-[#157d3c]">Divisions</span>
                            </h2>
                        </div>
                        <div className="hidden h-px flex-1 bg-gradient-to-r from-gray-300 to-transparent md:block" />
                    </div>

                    <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">
                        {/* Pill tab bar */}
                        <div className="border-b border-gray-100 bg-gradient-to-r from-[#f0f7f2] to-white px-4 py-4 md:px-6 md:py-5">
                            <div
                                ref={tabStripRef}
                                role="tablist"
                                aria-label="Library Services divisions"
                                className="library-tab-strip flex w-full items-center gap-2 overflow-x-auto"
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
                                            className={`relative shrink-0 rounded-full px-5 py-2.5 text-sm font-semibold whitespace-nowrap transition-colors duration-200 focus:outline-none ${
                                                isActive
                                                    ? "text-white"
                                                    : "text-gray-600 hover:bg-white hover:text-[#1a1a1a]"
                                            }`}
                                        >
                                            {isActive && (
                                                <motion.span
                                                    layoutId="libraryPillTab"
                                                    className="absolute inset-0 rounded-full bg-[#157d3c] shadow-md shadow-[#157d3c]/25"
                                                    transition={{
                                                        type: "spring",
                                                        stiffness: 420,
                                                        damping: 34,
                                                    }}
                                                />
                                            )}
                                            <span className="relative z-10">
                                                <span className="hidden lg:inline">
                                                    {tab.label}
                                                </span>
                                                <span className="lg:hidden">
                                                    {tab.shortLabel}
                                                </span>
                                            </span>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Panel */}
                        <div className="relative min-h-[280px] p-7 md:p-10 lg:p-14">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeTab}
                                    role="tabpanel"
                                    id={`panel-${activeTab}`}
                                    aria-labelledby={`tab-${activeTab}`}
                                    variants={panelSwitch}
                                    initial="hidden"
                                    animate="visible"
                                    exit="exit"
                                    className="relative"
                                >
                                    <div className="mb-5 flex items-center gap-4">
                                        <h3 className="m-0 text-xl font-black tracking-tight text-[#1a1a1a] md:text-2xl">
                                            {activeTabData.label}
                                        </h3>
                                        <span className="hidden h-px flex-1 bg-gray-200 sm:block" />
                                    </div>

                                    <div className="mb-6 h-1 w-14 rounded-full bg-[#f5c518]" />

                                    {tabContent}
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>
                </motion.section>
            </div>
        </MainLayout>
    );
}