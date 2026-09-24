import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import MainLayout from "../../../layouts/MainLayout";
import libraryBannerImg from "../../../assets/banner/ovpacads-banner.png";
import libraryLogo from "../../../assets/logos/osas-logo.png";
import melodyImage from "../../../assets/images/melody-image.png";
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

// ===================== Top Library Users (dynamic from assets folder) =====================
const topUserImageModules = import.meta.glob(
    "../../../assets/Library Users/*.{png,PNG,jpg,JPG,jpeg,JPEG,webp,WEBP,avif,AVIF}",
    { eager: true, import: "default" }
);

const formatNameFromFilename = (filename = "") => {
    const base = filename.replace(/\.[^.]+$/, "");
    const cleaned = base
        .replace(/[_\-]+/g, " ")
        .replace(/\s+/g, " ")
        .trim();
    return cleaned
        .split(" ")
        .map((word) =>
            word.length > 1 && word === word.toUpperCase()
                ? word
                : word.charAt(0).toUpperCase() + word.slice(1)
        )
        .join(" ");
};

const TOP_LIBRARY_USERS = Object.entries(topUserImageModules)
    .map(([path, image]) => {
        const filename = path.split("/").pop() || "";
        const name = formatNameFromFilename(filename);
        return {
            id: path,
            name: name || "Top Library User",
            image,
        };
    })
    .sort((a, b) => a.name.localeCompare(b.name));

const TOP_LIBRARY_USER_FALLBACK = {
    name: "Andrea Mae B. Salvador",
    program: "BTLED",
    yearLevel: "3rd Year",
    visits: 214,
    borrowed: 48,
};

// ===================== Contact data =====================
const CONTACT_ITEMS = [
    {
        label: "Office",
        value: "Library Services, City College of Cagayan de Oro",
        link: null,
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
        value: "library.citycollege@gmail.com",
        link: "mailto:library.citycollege@gmail.com",
        icon: (
            <>
                <rect width="20" height="16" x="2" y="4" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </>
        ),
    },
    {
        label: "Facebook",
        value: "www.facebook.com/cccdolibrary",
        link: "https://www.facebook.com/profile.php?id=61580317454211",
        icon: (
            <>
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
            </>
        ),
    },
];

// ===================== Org Chart Data =====================
const ORG_CHART = {
    top: {
        role: "VP FOR ACADEMIC AFFAIRS",
    },
    head: {
        role: "HEAD LIBRARIAN",
    },
    branches: [
        {
            title: "Reference & User Services Librarian",
            children: [
                { title: "Reference & User Services Assistant" },
            ],
        },
        {
            title: "Collections and Processing Librarian",
            children: [
                { title: "Collections and Processing Clerk" },
            ],
        },
    ],
};

// ============ Org Chart Component ============
function OrgChart() {
    const { top, head, branches } = ORG_CHART;

    return (
        <div className="relative">
            <div className="flex justify-center">
                <div className="relative w-full max-w-xs overflow-hidden rounded-2xl border-2 border-[#157d3c] bg-gradient-to-br from-[#157d3c] to-[#0b3d1e] p-5 text-center text-white shadow-lg shadow-[#157d3c]/25">
                    <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-[#f5c518]/15 blur-2xl" />
                    <p className="relative text-sm font-black uppercase leading-tight tracking-wide">
                        {top.role}
                    </p>
                </div>
            </div>

            <div className="flex justify-center">
                <div className="h-8 w-px bg-[#157d3c]/30" />
            </div>

            <div className="flex justify-center">
                <div className="relative w-full max-w-xs overflow-hidden rounded-2xl border-2 border-[#157d3c] bg-gradient-to-br from-[#157d3c] to-[#0b3d1e] p-5 text-center text-white shadow-lg shadow-[#157d3c]/25">
                    <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-[#f5c518]/15 blur-2xl" />
                    <p className="relative text-sm font-black uppercase leading-tight tracking-wide">
                        {head.role}
                    </p>
                </div>
            </div>

            <div className="flex justify-center">
                <div className="h-8 w-px bg-[#157d3c]/30" />
            </div>

            <div className="relative pt-6">
                <div className="absolute top-0 hidden h-px bg-[#157d3c]/30 md:left-[25%] md:right-[25%] md:block" />

                <div className="grid gap-8 md:grid-cols-2 md:gap-12">
                    {branches.map((branch) => (
                        <div
                            key={branch.title}
                            className="relative flex flex-col items-center"
                        >
                            <div className="absolute -top-6 left-1/2 hidden h-6 w-px -translate-x-1/2 bg-[#157d3c]/30 md:block" />

                            <div className="w-full max-w-xs rounded-2xl border-2 border-[#157d3c] bg-white p-5 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#f5c518] hover:shadow-md">
                                <p className="m-0 text-sm font-black leading-snug text-[#1a1a1a]">
                                    {branch.title}
                                </p>
                            </div>

                            {branch.children?.length > 0 && (
                                <>
                                    <div className="h-6 w-px bg-[#157d3c]/30" />

                                    <div className="flex w-full flex-col items-center gap-4">
                                        {branch.children.map((child) => (
                                            <div
                                                key={child.title}
                                                className="w-full max-w-xs rounded-2xl border border-gray-200 bg-white p-5 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#f5c518] hover:shadow-md"
                                            >
                                                <p className="m-0 text-sm font-black leading-snug text-[#1a1a1a]">
                                                    {child.title}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </>
                            )}
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

// ============ About Us : Vision ============
function AboutVision() {
    return (
        <div className="space-y-6">
            <div className="relative overflow-hidden rounded-2xl border border-[#157d3c]/25 bg-white p-6 shadow-sm md:p-8">
                <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-[#157d3c]/5" />
                <div className="pointer-events-none absolute -bottom-10 -left-10 h-32 w-32 rounded-full bg-[#f5c518]/10" />

                <div className="relative mb-4 flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#157d3c] to-[#0b3d1e] shadow-lg shadow-[#157d3c]/25">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="#f5c518"
                            strokeWidth="1.9"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-6 w-6"
                        >
                            <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" />
                            <circle cx="12" cy="12" r="3" />
                        </svg>
                    </div>
                    <div>
                        <p className="m-0 font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-[#157d3c]">
                            Our Vision
                        </p>
                        <h4 className="m-0 text-xl font-black tracking-tight text-[#1a1a1a] md:text-2xl">
                            A Steadfast Library
                        </h4>
                    </div>
                </div>

                <div className="relative mb-4 h-1 w-14 rounded-full bg-[#f5c518]" />

                <p className="relative text-justify text-[15px] leading-relaxed text-gray-700 md:text-base">
                    In support of the vision and mission of City College of
                    Cagayan de Oro, the library is steadfast in providing access
                    to information resources using cutting-edge technologies,
                    facilitating their use in the learning process, and
                    reinforcing the College values of academic excellence and
                    lifelong learning.
                </p>
            </div>
        </div>
    );
}

// ============ About Us : Mission ============
const MISSION_GOALS = [
    "Provide access to information resources that meet the teaching and learning needs of students, faculty, staff, and others in the community.",
    "Provide access, both on and off campus, to networked information resources.",
    "Provide reference services and a program of instruction that will help empower independent inquiry.",
    "Provide a physical environment conducive to study and learning.",
    "Remain current in the fields of librarianship and information science.",
];

function AboutMission() {
    return (
        <div className="space-y-6">
            <div className="relative overflow-hidden rounded-2xl border border-[#f5c518]/50 bg-[#fffdf3] p-6 shadow-sm md:p-8">
                <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-[#f5c518]/15" />

                <div className="relative mb-4 flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#f5c518] shadow-lg shadow-[#f5c518]/30">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="#7a5c00"
                            strokeWidth="1.9"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-6 w-6"
                        >
                            <circle cx="12" cy="12" r="10" />
                            <circle cx="12" cy="12" r="6" />
                            <circle cx="12" cy="12" r="2" />
                        </svg>
                    </div>
                    <div>
                        <p className="m-0 font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-[#b8860b]">
                            Our Mission
                        </p>
                        <h4 className="m-0 text-xl font-black tracking-tight text-[#1a1a1a] md:text-2xl">
                            Long-Term Goals
                        </h4>
                    </div>
                </div>

                <div className="relative mb-4 h-1 w-14 rounded-full bg-[#157d3c]" />

                <p className="relative mb-5 text-justify text-[15px] leading-relaxed text-gray-700 md:text-base">
                    To this end, the library pursues the following long-term
                    goals:
                </p>

                <ol className="relative space-y-3">
                    {MISSION_GOALS.map((goal, i) => (
                        <li
                            key={i}
                            className="flex items-start gap-4 rounded-xl border border-[#157d3c]/15 bg-white p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#f5c518] hover:shadow-md"
                        >
                            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#157d3c] font-mono text-[11px] font-black text-[#f5c518]">
                                {String(i + 1).padStart(2, "0")}
                            </span>
                            <span className="text-sm leading-relaxed text-gray-700">
                                {goal}
                            </span>
                        </li>
                    ))}
                </ol>
            </div>
        </div>
    );
}

// ============ About Us : Goals ============
const STRATEGIC_GOALS = [
    {
        title: "Resource Development",
        description:
            "To develop and enhance the capability of the library resources and services in meeting the demands of the curricular, instructional, informational, and research programs of the academic community by providing regular funding for the yearly acquisition of print, non-print, and digital library resources.",
        icon: (
            <>
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
            </>
        ),
    },
    {
        title: "Collaborative Learning Spaces",
        description:
            "To establish collaborative learning spaces and information commons that provide interactive, seamless access to various digital resources and a scholarly atmosphere for learning.",
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
        title: "Institutional Linkages",
        description:
            "To establish a strong library linkage with other institutions and agencies in the country and explore possible linkages with organizations and agencies from foreign countries.",
        icon: (
            <>
                <circle cx="12" cy="12" r="10" />
                <path d="M2 12h20" />
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
            </>
        ),
    },
    {
        title: "Knowledge Services",
        description:
            "To provide services that enhance the quest for knowledge and intellectual activity.",
        icon: (
            <>
                <path d="M9 18h6" />
                <path d="M10 22h4" />
                <path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14" />
            </>
        ),
    },
];

function AboutGoals() {
    return (
        <div className="space-y-6">
            <div className="rounded-2xl border border-[#157d3c]/20 bg-[#f0f7f2] px-6 py-5">
                <p className="m-0 text-sm leading-relaxed text-gray-700">
                    The Library Services Office pursues the following
                    strategic goals in support of the College&rsquo;s academic
                    and research programs.
                </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
                {STRATEGIC_GOALS.map((goal, i) => (
                    <div
                        key={goal.title}
                        className="group relative flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:border-[#157d3c]/40 hover:shadow-lg"
                    >
                        <span className="pointer-events-none absolute right-4 top-3 font-mono text-4xl font-black text-[#157d3c]/[0.06] transition-colors duration-500 group-hover:text-[#f5c518]/20">
                            {String(i + 1).padStart(2, "0")}
                        </span>

                        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#e6f2ea] transition-colors duration-500 group-hover:bg-[#157d3c]">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="#157d3c"
                                strokeWidth="1.9"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="h-6 w-6 transition-colors duration-500 group-hover:stroke-[#f5c518]"
                            >
                                {goal.icon}
                            </svg>
                        </div>

                        <h4 className="mb-2 text-base font-black leading-snug text-[#1a1a1a] transition-colors duration-300 group-hover:text-[#157d3c]">
                            {goal.title}
                        </h4>

                        <div className="mb-3 h-0.5 w-8 rounded-full bg-[#f5c518]" />

                        <p className="m-0 flex-1 text-sm leading-relaxed text-gray-600">
                            {goal.description}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}

// ============ About Us : Personnel ============
const PERSONNEL = [
    {
        name: "Melody R. Agcito",
        role: "Head Librarian",
        unit: "Library Services Office",
        accent: "green",
    },
    {
        name: "April Grace S. Almahan",
        role: "Reference & User Services Assistant",
        unit: "Reference & User Services",
        accent: "gold",
    },
    {
        name: "Marie Fe S. Cagasan",
        role: "Collections & Processing Clerk",
        unit: "Collections & Processing",
        accent: "green",
    },
];

function Personnel() {
    return (
        <div className="space-y-6">
            <div className="rounded-2xl border border-[#157d3c]/20 bg-[#f0f7f2] px-6 py-5">
                <p className="m-0 text-sm leading-relaxed text-gray-700">
                    The Library Services Office is staffed by a dedicated team of
                    library personnel who manage the collections, deliver
                    reference and user services, and ensure the smooth day-to-day
                    operations of the Library.
                </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {PERSONNEL.map((person) => {
                    const isGold = person.accent === "gold";
                    return (
                        <div
                            key={person.name}
                            className="group relative flex flex-col items-center overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 text-center shadow-sm transition-all duration-500 hover:-translate-y-1 hover:border-[#157d3c]/40 hover:shadow-lg"
                        >
                            <div
                                className={`pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full blur-2xl transition-all duration-500 ${
                                    isGold ? "bg-[#f5c518]/15" : "bg-[#157d3c]/10"
                                }`}
                            />

                            <div className="relative mb-4">
                                <div
                                    className={`flex h-20 w-20 items-center justify-center rounded-full border-4 shadow-lg transition-transform duration-500 group-hover:scale-105 ${
                                        isGold
                                            ? "border-[#f5c518] bg-[#fffdf3] text-[#b8860b] shadow-[#f5c518]/25"
                                            : "border-[#157d3c] bg-[#f0f7f2] text-[#157d3c] shadow-[#157d3c]/25"
                                    }`}
                                >
                                    <span className="text-2xl font-black">
                                        {getInitials(person.name)}
                                    </span>
                                </div>

                                <span
                                    className={`absolute -bottom-1 left-1/2 h-3 w-3 -translate-x-1/2 rotate-45 border-2 border-white shadow ${
                                        isGold ? "bg-[#f5c518]" : "bg-[#157d3c]"
                                    }`}
                                    aria-hidden="true"
                                />
                            </div>

                            <h4 className="mb-1 text-base font-black leading-snug text-[#1a1a1a] transition-colors duration-300 group-hover:text-[#157d3c]">
                                {person.name}
                            </h4>

                            <div className="mb-3 h-0.5 w-10 rounded-full bg-[#f5c518] transition-all duration-500 group-hover:w-16" />

                            <p className="m-0 text-sm font-bold text-[#1a1a1a]">
                                {person.role}
                            </p>

                            <p className="m-0 mt-2 font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-gray-400">
                                {person.unit}
                            </p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

// ============ About Us : Service Hours ============
function ServiceHours() {
    return (
        <div className="space-y-6">
            <div className="rounded-2xl border border-[#157d3c]/20 bg-[#f0f7f2] px-6 py-5">
                <p className="m-0 text-sm leading-relaxed text-gray-700">
                    The Library follows the official academic calendar of the
                    City College of Cagayan de Oro. Schedules may be adjusted
                    during examinations, semestral breaks, and special
                    institutional activities.
                </p>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
                <div className="group relative overflow-hidden rounded-2xl border border-[#157d3c]/25 bg-white p-6 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:border-[#157d3c]/50 hover:shadow-lg md:p-7">
                    <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-[#157d3c]/5" />

                    <div className="mb-4 flex items-center gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#157d3c] to-[#0b3d1e] shadow-lg shadow-[#157d3c]/25">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="#f5c518"
                                strokeWidth="1.9"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="h-6 w-6"
                            >
                                <circle cx="12" cy="12" r="10" />
                                <path d="M12 6v6l4 2" />
                            </svg>
                        </div>
                        <div>
                            <p className="m-0 font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-[#157d3c]">
                                Library Hours
                            </p>
                            <h4 className="m-0 text-lg font-black tracking-tight text-[#1a1a1a]">
                                Open
                            </h4>
                        </div>
                    </div>

                    <div className="mb-4 h-1 w-14 rounded-full bg-[#f5c518]" />

                    <p className="mb-2 font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-gray-400">
                        Monday – Friday
                    </p>
                    <p className="m-0 text-3xl font-black tracking-tight text-[#157d3c] md:text-4xl">
                        8:00 AM
                        <span className="mx-2 text-xl font-bold text-gray-300">
                            –
                        </span>
                        5:00 PM
                    </p>

                    <div className="mt-5 flex items-center gap-2 rounded-lg border border-[#157d3c]/15 bg-[#f0f7f2] px-3 py-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#157d3c]" />
                        <p className="m-0 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[#157d3c]">
                            Regular Service Schedule
                        </p>
                    </div>
                </div>

                <div className="group relative overflow-hidden rounded-2xl border border-dashed border-[#f5c518]/60 bg-[#fffdf3] p-6 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:border-[#f5c518] hover:shadow-lg md:p-7">
                    <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-[#f5c518]/15" />

                    <div className="mb-4 flex items-center gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#f5c518] shadow-lg shadow-[#f5c518]/30">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="#7a5c00"
                                strokeWidth="1.9"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="h-6 w-6"
                            >
                                <rect x="3" y="4" width="18" height="18" rx="2" />
                                <path d="M16 2v4" />
                                <path d="M8 2v4" />
                                <path d="M3 10h18" />
                                <path d="m9 16 3-3" />
                                <path d="m12 16-3-3" />
                            </svg>
                        </div>
                        <div>
                            <p className="m-0 font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-[#b8860b]">
                                Library Hours
                            </p>
                            <h4 className="m-0 text-lg font-black tracking-tight text-[#1a1a1a]">
                                Closed
                            </h4>
                        </div>
                    </div>

                    <div className="mb-4 h-1 w-14 rounded-full bg-[#157d3c]" />

                    <div className="space-y-3">
                        {[
                            { label: "Saturday", note: "No library service" },
                            { label: "Sunday", note: "No library service" },
                            { label: "Public Holidays", note: "Per official proclamation" },
                        ].map((day) => (
                            <div
                                key={day.label}
                                className="flex items-center justify-between rounded-lg border border-[#157d3c]/10 bg-white px-4 py-3"
                            >
                                <div>
                                    <p className="m-0 text-sm font-black text-[#1a1a1a]">
                                        {day.label}
                                    </p>
                                    <p className="m-0 mt-0.5 text-[11px] text-gray-500">
                                        {day.note}
                                    </p>
                                </div>
                                <span className="rounded-full bg-gray-100 px-2.5 py-1 font-mono text-[9px] font-black uppercase tracking-[0.15em] text-gray-500">
                                    Closed
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="relative overflow-hidden rounded-2xl border border-[#f5c518]/50 bg-[#fffdf3] p-6 md:p-7">
                <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-[#f5c518]/15" />

                <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-[#f5c518]">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#7a5c00"
                        strokeWidth="1.9"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-5 w-5"
                    >
                        <circle cx="12" cy="12" r="10" />
                        <path d="M12 6v6l4 2" />
                    </svg>
                </div>

                <p className="mb-1 font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-[#b8860b]">
                    Online Resources
                </p>

                <p className="mt-3 text-sm leading-relaxed text-gray-700">
                    Electronic resources — including e-books, e-journals, and
                    online databases — remain accessible{" "}
                    <strong className="text-[#1a1a1a]">
                        24 hours a day, 7 days a week
                    </strong>{" "}
                    via the Library Access Module (LAM), even when the physical
                    library is closed.
                </p>
            </div>
        </div>
    );
}

// ============ About Us : Sub-tabs ============
const ABOUT_TABS = [
    {
        id: "vision",
        label: "Vision",
        content: <AboutVision />,
    },
    {
        id: "mission",
        label: "Mission",
        content: <AboutMission />,
    },
    {
        id: "goals",
        label: "Goals",
        content: <AboutGoals />,
    },
    {
        id: "personnel",
        label: "Personnel",
        content: <Personnel />,
    },
    {
        id: "service-hours",
        label: "Service Hours",
        content: <ServiceHours />,
    },
];

function AboutUs() {
    const [subTab, setSubTab] = useState(ABOUT_TABS[0].id);
    const activeSubTab =
        ABOUT_TABS.find((t) => t.id === subTab) || ABOUT_TABS[0];

    return (
        <div className="space-y-8">
            <div
                role="tablist"
                aria-label="About Us sub-sections"
                className="inline-flex flex-wrap gap-2 rounded-full border border-gray-200 bg-[#f7fbf8] p-1.5"
            >
                {ABOUT_TABS.map((t) => {
                    const isActive = subTab === t.id;
                    return (
                        <button
                            key={t.id}
                            role="tab"
                            id={`about-subtab-${t.id}`}
                            aria-selected={isActive}
                            aria-controls={`about-subpanel-${t.id}`}
                            onClick={() => setSubTab(t.id)}
                            className={`relative shrink-0 rounded-full px-5 py-2 text-sm font-semibold transition-colors duration-200 focus:outline-none ${
                                isActive
                                    ? "text-white"
                                    : "text-gray-600 hover:text-[#1a1a1a]"
                            }`}
                        >
                            {isActive && (
                                <motion.span
                                    layoutId="aboutSubPillTab"
                                    className="absolute inset-0 rounded-full bg-[#157d3c] shadow-md shadow-[#157d3c]/25"
                                    transition={{
                                        type: "spring",
                                        stiffness: 420,
                                        damping: 34,
                                    }}
                                />
                            )}
                            <span className="relative z-10">{t.label}</span>
                        </button>
                    );
                })}
            </div>

            <AnimatePresence mode="wait">
                <motion.div
                    key={subTab}
                    role="tabpanel"
                    id={`about-subpanel-${subTab}`}
                    aria-labelledby={`about-subtab-${subTab}`}
                    variants={panelSwitch}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="relative"
                >
                    {activeSubTab.content}
                </motion.div>
            </AnimatePresence>
        </div>
    );
}

// ============ Online Forms Links ============
const FORM_LINKS = [
    {
        id: "book-a-spot",
        title: "Book-A-Spot: Library Facility Reservation Service",
        description:
            "Need a space for a meeting, class, group activity or other academic and non-academic activities? Reserve an available library space conveniently through our Book-A-Spot service.",
        url: "https://bit.ly/CLSO_BAS",
        icon: (
            <>
                <rect x="3" y="4" width="18" height="18" rx="2" />
                <path d="M16 2v4" />
                <path d="M8 2v4" />
                <path d="M3 10h18" />
                <path d="m9 16 2 2 4-4" />
            </>
        ),
    },
    {
        id: "attendance",
        title: "Library Attendance Monitoring",
        description:
            "Visiting the library today? Register your visit through the Library Attendance Monitoring system upon entering the library.",
        url: "https://bit.ly/CLSO_LAM",
        icon: (
            <>
                <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" />
                <rect x="9" y="3" width="6" height="4" rx="1" />
                <path d="m9 12 2 2 4-4" />
            </>
        ),
    },
    {
        id: "shelf2screen",
        title: "Shelf2Screen Request",
        description:
            "Need access to a portion of a library resource? Request a digital copy of selected portions of available library materials for educational, teaching, research, or personal study purposes.",
        url: "https://bit.ly/CLSO_S2S",
        icon: (
            <>
                <path d="M3 7V5a2 2 0 0 1 2-2h2" />
                <path d="M17 3h2a2 2 0 0 1 2 2v2" />
                <path d="M21 17v2a2 2 0 0 1-2 2h-2" />
                <path d="M7 21H5a2 2 0 0 1-2-2v-2" />
                <path d="M7 12h10" />
                <path d="M7 8h10" />
                <path d="M7 16h6" />
            </>
        ),
    },
];

const OnlineForms = () => (
    <div className="grid gap-6 md:grid-cols-3">
        {FORM_LINKS.map((form, index) => (
            <a
                key={form.id}
                href={form.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex flex-col overflow-hidden rounded-2xl border border-[#157d3c]/20 bg-gradient-to-b from-[#f7fbf8] via-white to-white p-6 shadow-[0_8px_24px_-12px_rgba(21,125,60,0.15)] transition-all duration-500 ease-out hover:-translate-y-2 hover:border-[#f5c518] hover:shadow-[0_24px_48px_-16px_rgba(21,125,60,0.35)]"
            >
                <div className="absolute left-0 right-0 top-0 h-1 bg-gradient-to-r from-[#157d3c] via-[#f5c518] to-[#157d3c] opacity-90 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-[#f5c518]/10 blur-2xl transition-all duration-500 group-hover:bg-[#f5c518]/20" />
                <div className="pointer-events-none absolute -bottom-16 -left-12 h-40 w-40 rounded-full bg-[#157d3c]/[0.05] blur-2xl transition-all duration-500 group-hover:bg-[#157d3c]/10" />

                <span className="absolute right-5 top-5 font-mono text-[10px] font-black tracking-[0.2em] text-[#157d3c]/30 transition-colors duration-500 group-hover:text-[#f5c518]">
                    {String(index + 1).padStart(2, "0")}
                </span>

                <div className="relative mb-5 flex h-14 w-14 items-center justify-center rounded-xl border border-[#157d3c]/20 bg-gradient-to-br from-[#e6f2ea] to-white shadow-sm transition-all duration-500 group-hover:border-[#f5c518] group-hover:from-[#157d3c] group-hover:to-[#0b3d1e] group-hover:shadow-lg group-hover:shadow-[#157d3c]/30">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#157d3c"
                        strokeWidth="1.9"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-6 w-6 transition-colors duration-500 group-hover:stroke-[#f5c518]"
                    >
                        {form.icon}
                    </svg>
                </div>

                <h4 className="relative mb-3 text-base font-black leading-snug text-[#1a1a1a] transition-colors duration-300 group-hover:text-[#157d3c]">
                    {form.title}
                </h4>

                <div className="mb-3 h-0.5 w-10 rounded-full bg-[#f5c518] transition-all duration-500 group-hover:w-16" />

                <p className="relative mb-5 flex-1 text-sm leading-relaxed text-gray-600">
                    {form.description}
                </p>

                <div className="relative mt-auto flex items-center justify-between border-t border-dashed border-[#157d3c]/15 pt-4">
                    <span className="inline-flex items-center gap-2 text-sm font-bold text-[#157d3c] transition-all duration-300 group-hover:gap-3 group-hover:text-[#0b3d1e]">
                        Open Form
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
                        >
                            <path d="M5 12h14" />
                            <path d="m12 5 7 7-7 7" />
                        </svg>
                    </span>

                    <span className="flex h-8 w-8 items-center justify-center rounded-full border border-[#157d3c]/20 bg-white text-[#157d3c] transition-all duration-500 group-hover:border-[#f5c518] group-hover:bg-[#f5c518] group-hover:text-[#0b3d1e]">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-3.5 w-3.5"
                        >
                            <path d="M7 17 17 7" />
                            <path d="M7 7h10v10" />
                        </svg>
                    </span>
                </div>
            </a>
        ))}
    </div>
);

// ============ Library Holdings ============
const HOLDINGS_GROUPS = [
    {
        id: "cas",
        college: "College of Arts & Sciences",
        shortLabel: "CAS",
        programs: [
            {
                title: "Bachelor of Arts in Communication",
                url: "https://drive.google.com/drive/folders/1-Rv99-02A7MYMdnDK7QVi28kqOlnMaMm?usp=drive_link",
            },
            {
                title: "Bachelor of Science in Social Work",
                url: "https://drive.google.com/drive/folders/1-t9Y8pdfK-yWg-q2Um97CtZyWt1n0J4M?usp=drive_link",
            },
            {
                title: "General Education",
                url: "https://drive.google.com/drive/folders/1-t9Y8pdfK-yWg-q2Um97CtZyWt1n0J4M?usp=drive_link",
            },
        ],
    },
    {
        id: "cbm",
        college: "College of Business Management",
        shortLabel: "CBM",
        programs: [
            {
                title: "Bachelor of Science in Entrepreneurship",
                url: "https://drive.google.com/drive/folders/1kktN2cBSNMz_ZmtUC2UrtgXhCogbUzWm?usp=drive_link",
            },
            {
                title: "Bachelor of Science in Office Administration",
                url: "https://drive.google.com/drive/folders/1b7pqsC4PVFts1O50s6gywfampAX4tYEd?usp=drive_link",
            },
        ],
    },
    {
        id: "coe",
        college: "College of Education",
        shortLabel: "COE",
        programs: [
            {
                title: "Bachelor of Technology and Livelihood Education",
                url: "https://drive.google.com/drive/folders/1bBjN3EpRAxcRFNNuUeAa4PGnQ1ta_qn3?usp=drive_link",
            },
            {
                title: "Bachelor of Technical Vocational Teacher Education",
                url: "https://drive.google.com/drive/folders/1XcPIEoQwo2GhmNo-RpGr72SOJ_9-MWKE?usp=drive_link",
            },
            {
                title: "Professional Education",
                url: "https://drive.google.com/drive/folders/1wuGyTCZuIZhJK8m0nIssxSpV5DWsPzS9?usp=drive_link",
            },
        ],
    },
];

function LibraryHoldings() {
    return (
        <div className="space-y-8">
            <div className="relative overflow-hidden rounded-2xl border border-[#157d3c]/25 bg-gradient-to-br from-[#f0f7f2] to-white p-6 md:p-7">
                <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-[#f5c518]/10" />
                <div className="pointer-events-none absolute -bottom-10 -left-10 h-32 w-32 rounded-full bg-[#157d3c]/5" />

                <div className="relative mb-4 flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#157d3c] to-[#0b3d1e] shadow-lg shadow-[#157d3c]/25">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="#f5c518"
                            strokeWidth="1.9"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-6 w-6"
                        >
                            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                        </svg>
                    </div>
                    <div>
                        <p className="m-0 font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-[#157d3c]">
                            Learning Resources
                        </p>
                        <h4 className="m-0 text-xl font-black tracking-tight text-[#1a1a1a] md:text-2xl">
                            Explore by Program
                        </h4>
                    </div>
                </div>

                <div className="relative mb-4 h-1 w-14 rounded-full bg-[#f5c518]" />

                <p className="relative text-sm leading-relaxed text-gray-700">
                    Looking for library resources for your program or subject
                    area? Explore the Library Holdings to view available learning
                    resources organized according to academic program and subject
                    area.
                </p>
            </div>

            <div className="space-y-6">
                {HOLDINGS_GROUPS.map((group, groupIndex) => (
                    <div
                        key={group.id}
                        className="relative overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm"
                    >
                        <div className="relative flex flex-wrap items-center justify-between gap-3 border-b border-gray-100 bg-gradient-to-r from-[#f0f7f2] to-white px-5 py-4 md:px-6">
                            <div className="flex items-center gap-3">
                                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-[#157d3c] to-[#0b3d1e] font-mono text-[10px] font-black tracking-wider text-[#f5c518] shadow-sm">
                                    {group.shortLabel}
                                </span>
                                <div>
                                    <p className="m-0 font-mono text-[9px] font-bold uppercase tracking-[0.25em] text-[#157d3c]/70">
                                        College {String(groupIndex + 1).padStart(2, "0")}
                                    </p>
                                    <h4 className="m-0 text-base font-black tracking-tight text-[#1a1a1a] md:text-lg">
                                        {group.college}
                                    </h4>
                                </div>
                            </div>

                            <span className="rounded-full border border-[#157d3c]/20 bg-white px-3 py-1 font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-[#157d3c]">
                                {group.programs.length} {group.programs.length === 1 ? "Program" : "Programs"}
                            </span>
                        </div>

                        <ul className="divide-y divide-gray-100">
                            {group.programs.map((program) => (
                                <li key={program.title}>
                                    <a
                                        href={program.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group/program flex items-center gap-4 px-5 py-4 transition-all duration-300 hover:bg-[#f7fbf8] md:px-6"
                                    >
                                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#157d3c]/15 bg-[#f0f7f2] transition-all duration-300 group-hover/program:border-[#f5c518] group-hover/program:bg-[#157d3c]">
                                            <span className="h-2 w-2 rotate-45 bg-[#157d3c] transition-colors duration-300 group-hover/program:bg-[#f5c518]" />
                                        </span>

                                        <span className="flex-1 text-sm font-bold text-[#1a1a1a] transition-colors duration-300 group-hover/program:text-[#157d3c] md:text-[15px]">
                                            {program.title}
                                        </span>

                                        <span className="hidden items-center gap-2 text-xs font-bold text-[#157d3c] transition-all duration-300 group-hover/program:gap-3 sm:inline-flex">
                                            View Resources
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2.5"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                className="h-4 w-4 transition-transform duration-300 group-hover/program:translate-x-0.5"
                                            >
                                                <path d="M5 12h14" />
                                                <path d="m12 5 7 7-7 7" />
                                            </svg>
                                        </span>

                                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#157d3c]/20 bg-white text-[#157d3c] transition-all duration-500 group-hover/program:border-[#f5c518] group-hover/program:bg-[#f5c518] group-hover/program:text-[#0b3d1e] sm:hidden">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2.5"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                className="h-3.5 w-3.5"
                                            >
                                                <path d="M5 12h14" />
                                                <path d="m12 5 7 7-7 7" />
                                            </svg>
                                        </span>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>

            <div className="flex items-start gap-3 rounded-2xl border border-dashed border-[#f5c518]/60 bg-[#fffdf3] px-5 py-4">
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
                        External link notice.
                    </strong>{" "}
                    Program holdings open in Google Drive. Sign in with your
                    institutional account if prompted.
                </p>
            </div>
        </div>
    );
}

// ============ Electronic Resources ============
const ELECTRONIC_RESOURCES = [
    {
        id: "bccampus",
        title: "BCcampus Open Education",
        description:
            "Access open textbooks and other teaching and learning resources.",
        url: "https://bccampus.ca/",
        icon: (
            <>
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
            </>
        ),
    },
    {
        id: "digital-commons",
        title: "Digital Commons Network",
        description:
            "Discover freely available scholarly works and research from universities and academic institutions.",
        url: "https://network.bepress.com/#/social-and-behavioral-sciences/",
        icon: (
            <>
                <circle cx="12" cy="12" r="10" />
                <path d="M2 12h20" />
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
            </>
        ),
    },
    {
        id: "doab",
        title: "Directory of Open Access Books (DOAB)",
        description:
            "Search peer-reviewed academic books that are freely available online.",
        url: "https://www.doabooks.org/en",
        icon: (
            <>
                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
            </>
        ),
    },
    {
        id: "filipinas-heritage",
        title: "Filipinas Heritage Library – Online Library",
        description:
            "Explore digitized materials and collections related to Philippine history, culture, and heritage.",
        url: "https://www.filipinaslibrary.org.ph/online-library/",
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
        id: "libretexts",
        title: "LibreTexts",
        description:
            "Access free textbooks and learning materials across multiple academic disciplines.",
        url: "https://socialsci.libretexts.org/",
        icon: (
            <>
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                <path d="M8 7h8" />
                <path d="M8 11h8" />
            </>
        ),
    },
];

function ElectronicResources() {
    return (
        <div className="space-y-8">
            <div className="relative overflow-hidden rounded-2xl border border-[#157d3c]/25 bg-gradient-to-br from-[#f0f7f2] to-white p-6 md:p-7">
                <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-[#f5c518]/10" />
                <div className="pointer-events-none absolute -bottom-10 -left-10 h-32 w-32 rounded-full bg-[#157d3c]/5" />

                <div className="relative mb-4 flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#157d3c] to-[#0b3d1e] shadow-lg shadow-[#157d3c]/25">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="#f5c518"
                            strokeWidth="1.9"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-6 w-6"
                        >
                            <circle cx="12" cy="12" r="10" />
                            <path d="M2 12h20" />
                            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                        </svg>
                    </div>
                    <div>
                        <p className="m-0 font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-[#157d3c]">
                            Free Online Resources
                        </p>
                        <h4 className="m-0 text-xl font-black tracking-tight text-[#1a1a1a] md:text-2xl">
                            Open Access Collections
                        </h4>
                    </div>
                </div>

                <div className="relative mb-4 h-1 w-14 rounded-full bg-[#f5c518]" />

                <p className="relative mb-3 text-sm leading-relaxed text-gray-700">
                    Looking for free books, textbooks, research materials, and
                    other learning resources online?
                </p>

                <p className="relative text-sm leading-relaxed text-gray-700">
                    Explore these freely accessible electronic resources offering
                    open textbooks, e-books, scholarly works, educational
                    materials, and digital collections to support learning,
                    teaching, and research.
                </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {ELECTRONIC_RESOURCES.map((resource, index) => (
                    <a
                        key={resource.id}
                        href={resource.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative flex flex-col overflow-hidden rounded-2xl border border-[#157d3c]/20 bg-gradient-to-b from-[#f7fbf8] via-white to-white p-6 shadow-[0_8px_24px_-12px_rgba(21,125,60,0.15)] transition-all duration-500 ease-out hover:-translate-y-2 hover:border-[#f5c518] hover:shadow-[0_24px_48px_-16px_rgba(21,125,60,0.35)]"
                    >
                        <div className="absolute left-0 right-0 top-0 h-1 bg-gradient-to-r from-[#157d3c] via-[#f5c518] to-[#157d3c] opacity-90 transition-opacity duration-500 group-hover:opacity-100" />
                        <div className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-[#f5c518]/10 blur-2xl transition-all duration-500 group-hover:bg-[#f5c518]/20" />

                        <span className="absolute right-5 top-5 font-mono text-[10px] font-black tracking-[0.2em] text-[#157d3c]/30 transition-colors duration-500 group-hover:text-[#f5c518]">
                            {String(index + 1).padStart(2, "0")}
                        </span>

                        <div className="relative mb-5 flex h-14 w-14 items-center justify-center rounded-xl border border-[#157d3c]/20 bg-gradient-to-br from-[#e6f2ea] to-white shadow-sm transition-all duration-500 group-hover:border-[#f5c518] group-hover:from-[#157d3c] group-hover:to-[#0b3d1e] group-hover:shadow-lg group-hover:shadow-[#157d3c]/30">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="#157d3c"
                                strokeWidth="1.9"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="h-6 w-6 transition-colors duration-500 group-hover:stroke-[#f5c518]"
                            >
                                {resource.icon}
                            </svg>
                        </div>

                        <h4 className="relative mb-3 text-base font-black leading-snug text-[#1a1a1a] transition-colors duration-300 group-hover:text-[#157d3c]">
                            {resource.title}
                        </h4>

                        <div className="mb-3 h-0.5 w-10 rounded-full bg-[#f5c518] transition-all duration-500 group-hover:w-16" />

                        <p className="relative mb-5 flex-1 text-sm leading-relaxed text-gray-600">
                            {resource.description}
                        </p>

                        <div className="relative mt-auto flex items-center justify-between border-t border-dashed border-[#157d3c]/15 pt-4">
                            <span className="inline-flex items-center gap-2 text-sm font-bold text-[#157d3c] transition-all duration-300 group-hover:gap-3 group-hover:text-[#0b3d1e]">
                                Visit Site
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
                                >
                                    <path d="M5 12h14" />
                                    <path d="m12 5 7 7-7 7" />
                                </svg>
                            </span>

                            <span className="flex h-8 w-8 items-center justify-center rounded-full border border-[#157d3c]/20 bg-white text-[#157d3c] transition-all duration-500 group-hover:border-[#f5c518] group-hover:bg-[#f5c518] group-hover:text-[#0b3d1e]">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="h-3.5 w-3.5"
                                >
                                    <path d="M7 17 17 7" />
                                    <path d="M7 7h10v10" />
                                </svg>
                            </span>
                        </div>
                    </a>
                ))}
            </div>
        </div>
    );
}

// ============ Library Resources (sub-tabs) ============
const LIBRARY_RESOURCES_SUBTABS = [
    {
        id: "e-resources",
        label: "Electronic Resources",
        content: <ElectronicResources />,
    },
    {
        id: "holdings",
        label: "Library Holdings",
        content: <LibraryHoldings />,
    },
];

function LibraryResources() {
    const [subTab, setSubTab] = useState(LIBRARY_RESOURCES_SUBTABS[0].id);
    const activeSubTab =
        LIBRARY_RESOURCES_SUBTABS.find((t) => t.id === subTab) ||
        LIBRARY_RESOURCES_SUBTABS[0];

    return (
        <div className="space-y-6">
            <div
                role="tablist"
                aria-label="Library Resources sub-sections"
                className="inline-flex flex-wrap gap-2 rounded-full border border-gray-200 bg-[#f7fbf8] p-1.5"
            >
                {LIBRARY_RESOURCES_SUBTABS.map((t) => {
                    const isActive = subTab === t.id;
                    return (
                        <button
                            key={t.id}
                            role="tab"
                            id={`subtab-${t.id}`}
                            aria-selected={isActive}
                            aria-controls={`subpanel-${t.id}`}
                            onClick={() => setSubTab(t.id)}
                            className={`relative shrink-0 rounded-full px-5 py-2 text-sm font-semibold transition-colors duration-200 focus:outline-none ${
                                isActive
                                    ? "text-white"
                                    : "text-gray-600 hover:text-[#1a1a1a]"
                            }`}
                        >
                            {isActive && (
                                <motion.span
                                    layoutId="librarySubPillTab"
                                    className="absolute inset-0 rounded-full bg-[#157d3c] shadow-md shadow-[#157d3c]/25"
                                    transition={{
                                        type: "spring",
                                        stiffness: 420,
                                        damping: 34,
                                    }}
                                />
                            )}
                            <span className="relative z-10">{t.label}</span>
                        </button>
                    );
                })}
            </div>

            <AnimatePresence mode="wait">
                <motion.div
                    key={subTab}
                    role="tabpanel"
                    id={`subpanel-${subTab}`}
                    aria-labelledby={`subtab-${subTab}`}
                    variants={panelSwitch}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="relative"
                >
                    {activeSubTab.content}
                </motion.div>
            </AnimatePresence>
        </div>
    );
}

// ============ Library Services Tab Content ============
const LIBRARY_SERVICES = [
    {
        id: "bibliographic",
        title: "Bibliographic Assistance",
        lead: "Looking for books and resources on a specific subject?",
        description:
            "The Library provides bibliographic assistance by preparing a list of available books and other learning resources on selected subject areas upon request of faculty members.",
        icon: (
            <>
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                <path d="M8 7h8" />
                <path d="M8 11h6" />
            </>
        ),
    },
    {
        id: "circulation",
        title: "Circulation Services",
        lead: "Need to borrow or return a book?",
        description:
            "Eligible library users may borrow materials from the Library's circulating collection upon presentation of a valid identification card.",
        icon: (
            <>
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                <path d="m9 12 2 2 4-4" />
            </>
        ),
    },
    {
        id: "printing",
        title: "Free Printing",
        lead: "Need to print your academic requirements?",
        description:
            "The Library offers free printing services to support students in their academic needs. Simply bring your own paper and visit the Library during service hours.",
        note: "Printing is available on a first-come, first-served basis and is subject to the Library's printing guidelines and available resources.",
        icon: (
            <>
                <path d="M6 9V2h12v7" />
                <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
                <rect x="6" y="14" width="12" height="8" rx="1" />
            </>
        ),
    },
    {
        id: "orientation",
        title: "Library Orientation & Tour",
        lead: "New to the Library? Let us show you around!",
        description:
            "Library Orientation and Tour sessions introduce users to the Library's spaces, collections, services, resources, and guidelines. These sessions are especially designed for new students, transferees, and newly hired faculty and personnel.",
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
        id: "net-hub",
        title: "Net Hub",
        lead: "Need a computer or internet access for your academic work?",
        description:
            "The Net Hub provides Wi-Fi connectivity and ten (10) computer workstations to support students and other library users in research, academic work, and access to online learning resources.",
        icon: (
            <>
                <rect x="2" y="3" width="20" height="14" rx="2" />
                <path d="M8 21h8" />
                <path d="M12 17v4" />
            </>
        ),
    },
];

function LibraryServices() {
    return (
        <div className="space-y-8">
            <div className="relative overflow-hidden rounded-2xl border border-[#157d3c]/25 bg-gradient-to-br from-[#f0f7f2] to-white p-6 md:p-7">
                <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-[#f5c518]/10" />
                <div className="pointer-events-none absolute -bottom-10 -left-10 h-32 w-32 rounded-full bg-[#157d3c]/5" />

                <div className="relative mb-4 flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#157d3c] to-[#0b3d1e] shadow-lg shadow-[#157d3c]/25">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="#f5c518"
                            strokeWidth="1.9"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-6 w-6"
                        >
                            <circle cx="12" cy="12" r="10" />
                            <path d="M12 6v6l4 2" />
                        </svg>
                    </div>
                    <div>
                        <p className="m-0 font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-[#157d3c]">
                            What We Offer
                        </p>
                        <h4 className="m-0 text-xl font-black tracking-tight text-[#1a1a1a] md:text-2xl">
                            Services
                        </h4>
                    </div>
                </div>

                <div className="relative mb-4 h-1 w-14 rounded-full bg-[#f5c518]" />

                <p className="relative text-sm leading-relaxed text-gray-700">
                    The Library Services Office offers a range of services
                    designed to support the teaching, learning, and research
                    needs of the academic community.
                </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {LIBRARY_SERVICES.map((service, index) => (
                    <div
                        key={service.id}
                        className="group relative flex flex-col overflow-hidden rounded-2xl border border-[#157d3c]/20 bg-gradient-to-b from-[#f7fbf8] via-white to-white p-6 shadow-[0_8px_24px_-12px_rgba(21,125,60,0.15)] transition-all duration-500 ease-out hover:-translate-y-2 hover:border-[#f5c518] hover:shadow-[0_24px_48px_-16px_rgba(21,125,60,0.35)]"
                    >
                        <div className="absolute left-0 right-0 top-0 h-1 bg-gradient-to-r from-[#157d3c] via-[#f5c518] to-[#157d3c] opacity-90 transition-opacity duration-500 group-hover:opacity-100" />
                        <div className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-[#f5c518]/10 blur-2xl transition-all duration-500 group-hover:bg-[#f5c518]/20" />
                        <div className="pointer-events-none absolute -bottom-16 -left-12 h-40 w-40 rounded-full bg-[#157d3c]/[0.05] blur-2xl transition-all duration-500 group-hover:bg-[#157d3c]/10" />

                        <span className="absolute right-5 top-5 font-mono text-[10px] font-black tracking-[0.2em] text-[#157d3c]/30 transition-colors duration-500 group-hover:text-[#f5c518]">
                            {String(index + 1).padStart(2, "0")}
                        </span>

                        <div className="relative mb-5 flex h-14 w-14 items-center justify-center rounded-xl border border-[#157d3c]/20 bg-gradient-to-br from-[#e6f2ea] to-white shadow-sm transition-all duration-500 group-hover:border-[#f5c518] group-hover:from-[#157d3c] group-hover:to-[#0b3d1e] group-hover:shadow-lg group-hover:shadow-[#157d3c]/30">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="#157d3c"
                                strokeWidth="1.9"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="h-6 w-6 transition-colors duration-500 group-hover:stroke-[#f5c518]"
                            >
                                {service.icon}
                            </svg>
                        </div>

                        <h4 className="relative mb-2 text-base font-black leading-snug text-[#1a1a1a] transition-colors duration-300 group-hover:text-[#157d3c]">
                            {service.title}
                        </h4>

                        <div className="mb-3 h-0.5 w-10 rounded-full bg-[#f5c518] transition-all duration-500 group-hover:w-16" />

                        <p className="relative mb-2 text-sm font-bold italic leading-snug text-[#157d3c]">
                            {service.lead}
                        </p>

                        <p className="relative flex-1 text-sm leading-relaxed text-gray-600">
                            {service.description}
                        </p>

                        {service.note && (
                            <p className="relative mt-3 rounded-lg border border-dashed border-[#f5c518]/60 bg-[#fffdf3] px-3 py-2 text-[11px] italic leading-relaxed text-gray-500">
                                {service.note}
                            </p>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

// ===================== Lower Tabs Data =====================
const TABS = [
    {
        id: "about",
        label: "About Us",
        shortLabel: "About",
        content: <AboutUs />,
    },
    {
        id: "services",
        label: "Library Services",
        shortLabel: "Services",
        content: <LibraryServices />,
    },
    {
        id: "resources",
        label: "Library Resources",
        shortLabel: "Resources",
        content: <LibraryResources />,
    },
    {
        id: "online-forms",
        label: "Online Forms",
        shortLabel: "Forms",
        content: <OnlineForms />,
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
        content: null,
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
                    <strong>Dr. Melody R. Agcito</strong> is the College
                    Librarian of City College of Cagayan de Oro. She received
                    her PhD in Educational Management (Capitol University) in
                    March 2019. Currently, she is the President of
                    PLAI-Northern Mindanao Region Librarians Council and has
                    been in the profession for 13 years.
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

            <div
                className="grid overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm lg:grid-cols-12"
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
            >
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

                    <div className="absolute right-5 top-5 z-20 flex items-baseline gap-1 rounded-full bg-black/50 px-3.5 py-1.5 backdrop-blur-sm">
                        <span className="font-mono text-sm font-bold text-[#f5c518]">
                            {String(current + 1).padStart(2, "0")}
                        </span>
                        <span className="font-mono text-[10px] font-semibold text-white/70">
                            / {String(SLIDES.length).padStart(2, "0")}
                        </span>
                    </div>
                </div>

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

// ============ Top Library Users (dynamic gallery) ============
function TopLibraryUsers() {
    const hasImages = TOP_LIBRARY_USERS.length > 0;

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
                        <span className="text-[#157d3c]">Library Users</span>
                    </h2>
                </div>
                <div className="hidden h-px flex-1 bg-gradient-to-r from-gray-300 to-transparent md:block" />
                <p className="max-w-md text-sm leading-relaxed text-gray-500">
                    Celebrating the students who made the most of the Library's
                    collections, spaces, and services.
                </p>
            </div>

            {/* Period badge */}
            <div className="mb-6 flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-2 rounded-full border border-[#157d3c]/25 bg-[#f0f7f2] px-4 py-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#157d3c]" />
                    <span className="font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-[#157d3c]">
                        Monthly Recognition · September 2026
                    </span>
                </span>
            </div>

            {hasImages ? (
                <>
                    {/* Gallery of top users */}
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {TOP_LIBRARY_USERS.map((user, index) => (
                            <motion.div
                                key={user.id}
                                variants={riseIn}
                                className="group relative flex aspect-[4/5] flex-col overflow-hidden rounded-2xl border border-[#f5c518]/60 bg-[#f0f7f2] shadow-sm transition-all duration-500 hover:-translate-y-2 hover:border-[#f5c518] hover:shadow-[0_24px_48px_-16px_rgba(245,197,24,0.35)]"
                            >
                                {/* Top gold accent */}
                                <div className="absolute left-0 right-0 top-0 z-10 h-1 bg-gradient-to-r from-[#157d3c] via-[#f5c518] to-[#157d3c]" />

                                {/* Number badge */}
                                <span className="absolute right-4 top-4 z-10 rounded-full bg-[#f5c518] px-2.5 py-1 font-mono text-[9px] font-black uppercase tracking-[0.15em] text-[#7a5c00] shadow-md">
                                    {String(index + 1).padStart(2, "0")}
                                </span>

                                {/* Image fills the entire card */}
                                <img
                                    src={user.image}
                                    alt={user.name}
                                    loading="lazy"
                                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105"
                                    onError={(e) => {
                                        e.currentTarget.style.display = "none";
                                    }}
                                />
                            </motion.div>
                        ))}
                    </div>

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
                                Top users gallery.
                            </strong>{" "}
                            Images are automatically loaded from the
                            &ldquo;Library Users&rdquo; folder.
                        </p>
                    </div>
                </>
            ) : (
                <>
                    {/* Fallback featured card */}
                    <motion.div
                        variants={riseIn}
                        className="relative overflow-hidden rounded-3xl border border-[#f5c518]/60 bg-gradient-to-b from-[#fffdf3] to-white shadow-sm"
                    >
                        <div className="pointer-events-none absolute -top-20 left-1/2 h-52 w-52 -translate-x-1/2 rounded-full bg-[#f5c518]/20 blur-3xl" />

                        <div className="relative grid gap-8 p-8 md:grid-cols-[auto_minmax(0,1fr)] md:items-center md:p-10 lg:p-12">
                            <div className="flex justify-center md:justify-start">
                                <div className="relative">
                                    <div className="flex h-32 w-32 items-center justify-center rounded-full border-4 border-[#f5c518] bg-[#f0f7f2] text-4xl font-black text-[#157d3c] shadow-lg shadow-[#f5c518]/30 md:h-36 md:w-36 md:text-5xl">
                                        {getInitials(TOP_LIBRARY_USER_FALLBACK.name)}
                                    </div>

                                    <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-[#f5c518] px-3 py-1 font-mono text-[9px] font-black uppercase tracking-[0.2em] text-[#7a5c00] shadow-sm">
                                        Top User
                                    </span>
                                </div>
                            </div>

                            <div className="text-center md:text-left">
                                <h3 className="m-0 text-2xl font-black leading-snug tracking-tight text-[#1a1a1a] md:text-3xl">
                                    {TOP_LIBRARY_USER_FALLBACK.name}
                                </h3>

                                <p className="mt-2 text-sm font-semibold text-gray-500">
                                    {TOP_LIBRARY_USER_FALLBACK.program}
                                </p>
                                <p className="mt-1 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[#157d3c]">
                                    {TOP_LIBRARY_USER_FALLBACK.yearLevel}
                                </p>

                                <div className="mx-auto mt-6 h-px w-20 bg-gray-200 md:mx-0" />

                                <div className="mt-6 flex items-center justify-center gap-10 md:justify-start">
                                    <div>
                                        <p className="m-0 font-mono text-3xl font-black text-[#157d3c]">
                                            {TOP_LIBRARY_USER_FALLBACK.visits}
                                        </p>
                                        <p className="m-0 font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-gray-400">
                                            Visits
                                        </p>
                                    </div>

                                    <span className="h-10 w-px bg-gray-200" />

                                    <div>
                                        <p className="m-0 font-mono text-3xl font-black text-[#157d3c]">
                                            {TOP_LIBRARY_USER_FALLBACK.borrowed}
                                        </p>
                                        <p className="m-0 font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-gray-400">
                                            Books Borrowed
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

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
                            No images found in{" "}
                            <code className="rounded bg-white px-1.5 py-0.5 text-[10px] text-[#157d3c]">
                                resources/js/assets/Library Users
                            </code>
                            . Add top-user photos to that folder to display them
                            automatically.
                        </p>
                    </div>
                </>
            )}
        </motion.section>
    );
}

// ===================== Page =====================
export default function LibraryServicesPage() {
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
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{ backgroundImage: `url('${libraryBannerImg}')` }}
                />

                <div className="absolute inset-0 bg-gradient-to-tr from-[#05230f]/95 via-[#0b3d1e]/85 to-[#157d3c]/55" />

                <div
                    className="absolute inset-0 opacity-[0.12]"
                    style={{
                        backgroundImage:
                            "linear-gradient(to right, rgba(255,255,255,.6) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,.6) 1px, transparent 1px)",
                        backgroundSize: "84px 84px",
                    }}
                />

                <div className="pointer-events-none absolute -left-24 top-1/4 h-80 w-80 rounded-full bg-[#f5c518]/20 blur-3xl" />
                <div className="pointer-events-none absolute -right-20 bottom-0 h-72 w-72 rounded-full bg-[#157d3c]/40 blur-3xl" />

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
                    <div className="lg:col-span-4 xl:col-span-3">
                        <motion.div
                            variants={riseIn}
                            initial="hidden"
                            animate="visible"
                            className="relative mx-auto -mt-16 w-full max-w-[300px] md:-mt-24 lg:mx-0 lg:max-w-none lg:-mt-28"
                        >
                            <div className="pointer-events-none absolute -left-3 -top-3 h-full w-full rounded-2xl border-2 border-[#f5c518]" />

                            <div className="relative overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl shadow-black/10">
                                <div className="relative flex aspect-[4/5] w-full items-center justify-center bg-gradient-to-br from-[#f0f7f2] to-white">
                                    <img
                                        src={melodyImage}
                                        alt="Dr. Melody R. Agcito"
                                        className="h-full w-full object-contain"
                                        onError={(e) => {
                                            e.currentTarget.style.display =
                                                "none";
                                        }}
                                    />
                                </div>

                                <div className="bg-[#157d3c] px-4 py-5 text-center">
                                    <p className="m-0 text-sm font-bold uppercase tracking-wide text-white sm:text-base">
                                        Dr. Melody R. Agcito
                                    </p>
                                    <p className="mt-1 text-xs font-semibold text-[#f5c518] sm:text-sm">
                                        Head, Library Services
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    <div className="lg:col-span-8 lg:pt-10 xl:col-span-9">
                        <div className="grid gap-8 md:grid-cols-[240px_minmax(0,1fr)] md:gap-10 lg:gap-14">
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

            {/* ==================== CONTACT STRIP ==================== */}
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
                                    {item.link ? (
                                        <a
                                            href={item.link}
                                            target={item.link.startsWith("http") ? "_blank" : undefined}
                                            rel={item.link.startsWith("http") ? "noopener noreferrer" : undefined}
                                            className="break-all text-sm font-semibold leading-snug text-white transition-colors duration-200 hover:text-[#f5c518] hover:underline"
                                        >
                                            {item.value}
                                        </a>
                                    ) : (
                                        <p className="break-all text-sm font-semibold leading-snug text-white">
                                            {item.value}
                                        </p>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ==================== MAIN CONTENT ==================== */}
            <div className="mx-auto w-full max-w-[1600px] px-6 py-16 sm:px-10 md:py-20 lg:px-16 xl:px-20">
                <OfficeSlideshow />
                <TopLibraryUsers />

                <motion.section
                    className="mt-20 md:mt-28"
                    variants={riseIn}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}
                >
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