import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import MainLayout from "../../../layouts/MainLayout";
import guidanceBannerImg from '../../../assets/banner/guidance-banner.png';

// ===================== Motion variants =====================
const contentVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.45 },
    },
};

const cardVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
    },
    exit: {
        opacity: 0,
        y: -10,
        transition: { duration: 0.2, ease: [0.22, 1, 0.36, 1] },
    },
};

const modalBackdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.25 } },
    exit: { opacity: 0, transition: { duration: 0.2 } },
};

const modalPanelVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.97 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
    },
    exit: {
        opacity: 0,
        y: 20,
        scale: 0.98,
        transition: { duration: 0.2, ease: [0.22, 1, 0.36, 1] },
    },
};

// ===================== Alphabet =====================
const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

// ===================== Helpers =====================
const getInitials = (name = "") => {
    const parts = name.trim().split(/\s+/);
    if (parts.length === 0) return "";
    const first = parts[0]?.[0] ?? "";
    const last = parts.length > 1 ? parts[parts.length - 1][0] : "";
    return (first + last).toUpperCase();
};

const getSortKey = (name = "") => {
    const parts = name.trim().split(/\s+/);
    const lastName = parts.length > 1 ? parts[parts.length - 1] : parts[0];
    return lastName.toLowerCase();
};

const getFirstLetter = (name = "") => {
    const key = getSortKey(name);
    const letter = key.charAt(0).toUpperCase();
    return /[A-Z]/.test(letter) ? letter : "#";
};

// Normalize API response into the shape the UI expects
const normalizePerson = (raw = {}, index = 0) => {
    const parseList = (value) => {
        if (Array.isArray(value)) return value;
        if (typeof value === "string" && value.trim()) {
            try {
                const parsed = JSON.parse(value);
                return Array.isArray(parsed) ? parsed : [];
            } catch {
                return value
                    .split(",")
                    .map((v) => v.trim())
                    .filter(Boolean);
            }
        }
        return [];
    };

    return {
        id: raw.id ?? raw.personnel_id ?? index,
        name: raw.name ?? raw.full_name ?? "",
        position: raw.position ?? raw.role ?? "",
        department: raw.department ?? raw.office ?? "",
        email: raw.email ?? "",
        phone: raw.phone ?? raw.contact ?? "",
        image: raw.image ?? raw.image_path ?? raw.photo ?? "",
        bio: raw.bio ?? raw.about ?? raw.description ?? "",
        education: parseList(raw.education),
        expertise: parseList(raw.expertise ?? raw.skills),
        affiliations: parseList(raw.affiliations),
        experience: parseList(raw.experience),
    };
};

// ===================== Banner text =====================
function AnimatedBannerText({ title, description }) {
    return (
        <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
            <motion.h1
                className="text-4xl font-extrabold tracking-tight text-white drop-shadow-lg md:text-6xl"
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
                {title}
            </motion.h1>
            <motion.p
                className="mt-4 text-sm leading-relaxed text-white/90 drop-shadow md:text-lg"
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

// ===================== Search Bar =====================
function DirectorySearchBar({
    value,
    onChange,
    onSearch,
    placeholder = "Search faculty and staff...",
}) {
    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch?.(value);
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="relative flex w-full items-center"
        >
            <input
                type="text"
                value={value}
                onChange={(e) => onChange?.(e.target.value)}
                placeholder={placeholder}
                aria-label="Search faculty and staff"
                className="w-full rounded-full border border-transparent bg-white py-4 pl-6 pr-20 text-sm text-gray-700 placeholder-gray-400 shadow-[0_2px_10px_rgba(0,0,0,0.06)] outline-none transition-shadow duration-200 focus:shadow-[0_4px_16px_rgba(0,0,0,0.10)] md:text-base"
            />

            <button
                type="submit"
                aria-label="Search"
                className="absolute right-2 top-1/2 flex h-11 w-11 -translate-y-1/2 shrink-0 items-center justify-center rounded-full border border-black/80 bg-[#f5c518] text-black transition-transform duration-200 hover:scale-105 hover:bg-[#f0bd00] active:scale-95 md:h-12 md:w-12"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5 md:h-6 md:w-6"
                >
                    <circle cx="11" cy="11" r="7" />
                    <path d="m20 20-3.5-3.5" />
                </svg>
            </button>
        </form>
    );
}

// ===================== Personnel Card (clickable) =====================
function PersonnelCard({ person, onOpen }) {
    return (
        <motion.button
            type="button"
            onClick={() => onOpen(person)}
            layout
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="group flex w-full flex-col items-center overflow-hidden rounded-2xl border border-gray-200 bg-white p-5 text-center shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-[#157d3c] hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-[#157d3c]/40"
        >
            {/* Avatar */}
            <div className="mb-4 flex h-24 w-24 items-center justify-center overflow-hidden rounded-full border-4 border-[#f0f7f2] bg-[#157d3c]">
                {person.image ? (
                    <img
                        src={person.image}
                        alt={person.name}
                        className="h-full w-full object-cover"
                        onError={(e) => {
                            e.currentTarget.style.display = "none";
                        }}
                    />
                ) : (
                    <span className="text-2xl font-extrabold text-white">
                        {getInitials(person.name)}
                    </span>
                )}
            </div>

            <h3 className="text-base font-extrabold tracking-tight text-[#1a1a1a] transition-colors group-hover:text-[#157d3c]">
                {person.name}
            </h3>

            <p className="mt-1 text-sm font-semibold text-[#157d3c]">
                {person.position}
            </p>

            <p className="mt-2 text-xs leading-relaxed text-gray-600">
                {person.department}
            </p>

            <div className="my-3 h-1 w-10 rounded-full bg-[#f5c518]" />

            {/* View CV hint */}
            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#157d3c] transition-transform duration-200 group-hover:translate-x-0.5">
                View CV / Portfolio
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
        </motion.button>
    );
}

// ===================== CV / Portfolio Modal =====================
function CVModal({ person, onClose }) {
    useEffect(() => {
        const handleKey = (e) => {
            if (e.key === "Escape") onClose();
        };
        document.addEventListener("keydown", handleKey);
        const prevOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => {
            document.removeEventListener("keydown", handleKey);
            document.body.style.overflow = prevOverflow;
        };
    }, [onClose]);

    if (!person) return null;

    const hasEducation = person.education && person.education.length > 0;
    const hasExpertise = person.expertise && person.expertise.length > 0;
    const hasAffiliations = person.affiliations && person.affiliations.length > 0;
    const hasExperience = person.experience && person.experience.length > 0;

    return (
        <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 px-3 py-4 backdrop-blur-sm sm:px-4 sm:py-6"
            variants={modalBackdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={onClose}
        >
            <motion.div
                className="relative flex max-h-[92vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl"
                variants={modalPanelVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                onClick={(e) => e.stopPropagation()}
                role="dialog"
                aria-modal="true"
                aria-labelledby={`cv-modal-title-${person.id}`}
            >
                {/* Header band */}
                <div className="relative shrink-0 bg-[#157d3c] px-5 pb-5 pt-6 text-center sm:px-8 sm:pb-6 sm:pt-7">
                    <button
                        type="button"
                        onClick={onClose}
                        aria-label="Close"
                        className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/15 text-white transition-colors hover:bg-white/30 focus:outline-none"
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
                            <path d="M18 6 6 18" />
                            <path d="m6 6 12 12" />
                        </svg>
                    </button>

                    <div className="mx-auto mb-3 flex h-20 w-20 items-center justify-center overflow-hidden rounded-full border-4 border-[#f5c518] bg-white shadow-md sm:h-24 sm:w-24">
                        {person.image ? (
                            <img
                                src={person.image}
                                alt={person.name}
                                className="h-full w-full object-cover"
                            />
                        ) : (
                            <span className="text-2xl font-extrabold text-[#157d3c] sm:text-3xl">
                                {getInitials(person.name)}
                            </span>
                        )}
                    </div>

                    <h2
                        id={`cv-modal-title-${person.id}`}
                        className="text-xl font-extrabold tracking-tight text-white sm:text-2xl"
                    >
                        {person.name}
                    </h2>
                    <p className="mt-0.5 text-xs font-bold text-[#f5c518] sm:text-sm">
                        {person.position}
                    </p>
                    <p className="mt-0.5 text-[11px] text-white/85 sm:text-xs">
                        {person.department}
                    </p>

                    <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
                        {person.email && (
                            <a
                                href={`mailto:${person.email}`}
                                className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1.5 text-[11px] font-semibold text-white transition-colors hover:bg-white/25 sm:text-xs"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="h-3 w-3"
                                >
                                    <rect width="20" height="16" x="2" y="4" rx="2" />
                                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                                </svg>
                                {person.email}
                            </a>
                        )}
                        {person.phone && (
                            <a
                                href={`tel:${person.phone}`}
                                className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1.5 text-[11px] font-semibold text-white transition-colors hover:bg-white/25 sm:text-xs"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="h-3 w-3"
                                >
                                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                                </svg>
                                {person.phone}
                            </a>
                        )}
                    </div>
                </div>

                {/* Body */}
                <div className="flex-1 overflow-y-auto px-5 py-6 sm:px-8 sm:py-7">
                    {person.bio && (
                        <section className="mb-6">
                            <h3 className="mb-2 flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-[#157d3c]">
                                <span className="h-1 w-5 rounded-full bg-[#f5c518]" />
                                About
                            </h3>
                            <p className="text-justify text-sm leading-relaxed text-gray-700">
                                {person.bio}
                            </p>
                        </section>
                    )}

                    {hasEducation && (
                        <section className="mb-6">
                            <h3 className="mb-2 flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-[#157d3c]">
                                <span className="h-1 w-5 rounded-full bg-[#f5c518]" />
                                Education
                            </h3>
                            <ul className="space-y-2">
                                {person.education.map((edu, i) => {
                                    const isObject = typeof edu === "object" && edu !== null;
                                    return (
                                        <li
                                            key={i}
                                            className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5"
                                        >
                                            {isObject ? (
                                                <>
                                                    <p className="text-sm font-bold text-[#1a1a1a]">
                                                        {edu.degree || edu.title || ""}
                                                    </p>
                                                    <p className="mt-0.5 text-xs text-gray-600">
                                                        {edu.school || edu.institution || ""}
                                                        {edu.year ? ` • ${edu.year}` : ""}
                                                    </p>
                                                </>
                                            ) : (
                                                <p className="text-sm text-gray-700">{edu}</p>
                                            )}
                                        </li>
                                    );
                                })}
                            </ul>
                        </section>
                    )}

                    {hasExpertise && (
                        <section className="mb-6">
                            <h3 className="mb-2 flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-[#157d3c]">
                                <span className="h-1 w-5 rounded-full bg-[#f5c518]" />
                                Areas of Expertise
                            </h3>
                            <div className="flex flex-wrap gap-1.5">
                                {person.expertise.map((item, i) => (
                                    <span
                                        key={i}
                                        className="rounded-full border border-[#157d3c]/20 bg-[#f0f7f2] px-2.5 py-1 text-[11px] font-semibold text-[#157d3c]"
                                    >
                                        {typeof item === "object" ? item.name || item.title : item}
                                    </span>
                                ))}
                            </div>
                        </section>
                    )}

                    {hasExperience && (
                        <section className="mb-6">
                            <h3 className="mb-2 flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-[#157d3c]">
                                <span className="h-1 w-5 rounded-full bg-[#f5c518]" />
                                Professional Experience
                            </h3>
                            <ol className="relative space-y-3 border-l-2 border-[#f0f7f2] pl-4">
                                {person.experience.map((exp, i) => {
                                    const isObject = typeof exp === "object" && exp !== null;
                                    return (
                                        <li key={i} className="relative">
                                            <span className="absolute -left-[22px] top-1.5 flex h-3 w-3 items-center justify-center rounded-full border-2 border-white bg-[#f5c518]" />
                                            {isObject ? (
                                                <>
                                                    <p className="text-sm font-bold text-[#1a1a1a]">
                                                        {exp.role || exp.position || ""}
                                                    </p>
                                                    <p className="mt-0.5 text-xs text-gray-600">
                                                        {exp.org || exp.company || ""}
                                                        {exp.period ? ` • ${exp.period}` : ""}
                                                    </p>
                                                </>
                                            ) : (
                                                <p className="text-sm text-gray-700">{exp}</p>
                                            )}
                                        </li>
                                    );
                                })}
                            </ol>
                        </section>
                    )}

                    {hasAffiliations && (
                        <section>
                            <h3 className="mb-2 flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-[#157d3c]">
                                <span className="h-1 w-5 rounded-full bg-[#f5c518]" />
                                Affiliations
                            </h3>
                            <ul className="space-y-1.5">
                                {person.affiliations.map((aff, i) => (
                                    <li
                                        key={i}
                                        className="flex items-start gap-2 text-sm text-gray-700"
                                    >
                                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#157d3c]" />
                                        <span>
                                            {typeof aff === "object" ? aff.name || aff.title : aff}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </section>
                    )}
                </div>

                {/* Footer */}
                <div className="flex shrink-0 items-center justify-end gap-2 border-t border-gray-200 bg-gray-50 px-5 py-3 sm:px-8">
                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded-full border border-gray-300 bg-white px-4 py-1.5 text-xs font-bold text-gray-700 transition-colors hover:bg-gray-100"
                    >
                        Close
                    </button>
                    {person.email && (
                        <a
                            href={`mailto:${person.email}`}
                            className="rounded-full bg-[#157d3c] px-4 py-1.5 text-xs font-bold text-white transition-colors hover:bg-[#0f5c2c]"
                        >
                            Contact
                        </a>
                    )}
                </div>
            </motion.div>
        </motion.div>
    );
}

// ===================== Main Component =====================
export default function FacultyStaff() {
    const [searchTerm, setSearchTerm] = useState("");
    const [activeLetter, setActiveLetter] = useState("ALL");
    const [personnel, setPersonnel] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedPerson, setSelectedPerson] = useState(null);

    const sectionRefs = useRef({});

    // Set document title
    useEffect(() => {
        document.title =
            "Faculty & Staff Directory - City College of Cagayan de Oro";
    }, []);

    // Fetch personnel from API
    useEffect(() => {
        let isMounted = true;

        const fetchPersonnel = async () => {
            try {
                setIsLoading(true);
                setError(null);

                const response = await fetch("/api/faculty-staff");
                if (!response.ok) {
                    throw new Error("Failed to fetch faculty and staff");
                }

                const data = await response.json();

                const list = Array.isArray(data)
                    ? data
                    : Array.isArray(data?.data)
                    ? data.data
                    : [];

                const normalized = list.map(normalizePerson);

                if (isMounted) setPersonnel(normalized);
            } catch (err) {
                if (isMounted) {
                    setError(err.message || "Failed to load directory");
                    setPersonnel([]);
                }
            } finally {
                if (isMounted) setIsLoading(false);
            }
        };

        fetchPersonnel();

        return () => {
            isMounted = false;
        };
    }, []);

    // Filter + sort
    const filteredPersonnel = useMemo(() => {
        const term = searchTerm.trim().toLowerCase();

        const filtered = personnel.filter((person) => {
            const matchesLetter =
                activeLetter === "ALL" ||
                getFirstLetter(person.name) === activeLetter;

            if (!matchesLetter) return false;
            if (!term) return true;

            const haystack = [
                person.name,
                person.position,
                person.department,
                person.email,
            ]
                .filter(Boolean)
                .join(" ")
                .toLowerCase();

            return haystack.includes(term);
        });

        return [...filtered].sort((a, b) =>
            getSortKey(a.name).localeCompare(getSortKey(b.name))
        );
    }, [personnel, searchTerm, activeLetter]);

    // Group by first letter
    const groupedPersonnel = useMemo(() => {
        const groups = {};
        filteredPersonnel.forEach((person) => {
            const letter = getFirstLetter(person.name);
            if (!groups[letter]) groups[letter] = [];
            groups[letter].push(person);
        });

        const sortedKeys = Object.keys(groups).sort((a, b) => {
            if (a === "#") return 1;
            if (b === "#") return -1;
            return a.localeCompare(b);
        });

        return sortedKeys.map((key) => ({ letter: key, people: groups[key] }));
    }, [filteredPersonnel]);

    // Available letters
    const availableLetters = useMemo(() => {
        const set = new Set();
        personnel.forEach((person) => set.add(getFirstLetter(person.name)));
        return set;
    }, [personnel]);

    const scrollToLetter = (letter) => {
        setActiveLetter(letter);

        if (letter === "ALL") {
            window.scrollTo({ top: 0, behavior: "smooth" });
            return;
        }

        const el = sectionRefs.current[letter];
        if (el) {
            const top = el.getBoundingClientRect().top + window.scrollY - 140;
            window.scrollTo({ top, behavior: "smooth" });
        }
    };

    return (
        <MainLayout
            maxWidth="full"
            containerClassName="px-0"
            mainClassName="py-0"
            className="overflow-hidden pb-0"
        >
            <style>{`
                .faculty-staff-scroll::-webkit-scrollbar {
                    display: none;
                    width: 0;
                    height: 0;
                }
                .faculty-staff-scroll {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}</style>

            {/* ==================== BANNER ==================== */}
            <div
                className="relative flex min-h-[350px] w-full items-center justify-center bg-cover bg-center bg-no-repeat shadow-lg md:min-h-[450px] lg:min-h-[500px]"
                style={{
                    backgroundImage: `url('${guidanceBannerImg}')`,
                }}
            >
                <div className="absolute inset-0 bg-black/50" />
                <AnimatedBannerText
                    title="Faculty & Staff Directory"
                    description="Meet the dedicated faculty and staff of the City College of Cagayan de Oro. Click a profile to view their CV and portfolio."
                />
            </div>

            {/* ==================== MAIN CONTENT ==================== */}
            <div className="mx-auto w-full max-w-[1600px] px-6 py-14 sm:px-10 lg:px-16 xl:px-20 md:py-20">
                <motion.div
                    className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-shadow duration-300 hover:shadow-xl"
                    variants={contentVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {/* Header */}
                    <div className="border-b border-gray-200 bg-[#f0f7f2] px-6 py-6 text-center sm:px-8 md:px-10 lg:px-14">
                        <h2 className="m-0 text-2xl font-extrabold tracking-tight text-[#1a1a1a] md:text-3xl">
                            Directory of{" "}
                            <span className="text-[#157d3c]">
                                Faculty &amp; Staff
                            </span>
                        </h2>
                        <div className="mx-auto mt-3 h-1 w-16 rounded-full bg-[#f5c518]" />
                        <p className="mx-auto mt-3 max-w-2xl text-sm text-gray-600 md:text-base">
                            Browse alphabetically, search, or click a profile
                            to view their CV and portfolio.
                        </p>
                    </div>

                    {/* Search + Alphabet */}
                    <div className="border-b border-gray-200 bg-gray-50 px-6 py-6 sm:px-8 md:px-10 lg:px-14">
                        <div className="mx-auto max-w-2xl">
                            <DirectorySearchBar
                                value={searchTerm}
                                onChange={setSearchTerm}
                                onSearch={(val) => setSearchTerm(val)}
                                placeholder="Search faculty and staff by name, position, department, or email..."
                            />

                            <p className="mt-3 text-center text-xs text-gray-500">
                                {isLoading
                                    ? "Loading directory..."
                                    : error
                                    ? "Directory unavailable"
                                    : `${filteredPersonnel.length} ${
                                          filteredPersonnel.length === 1
                                              ? "result"
                                              : "results"
                                      } found`}
                            </p>
                        </div>

                        {/* Alphabet filter */}
                        <div className="faculty-staff-scroll mt-6 flex items-center justify-start gap-1.5 overflow-x-auto pb-1 md:justify-center">
                            <button
                                type="button"
                                onClick={() => scrollToLetter("ALL")}
                                className={`shrink-0 rounded-full px-3.5 py-1.5 text-xs font-bold transition-colors duration-200 ${
                                    activeLetter === "ALL"
                                        ? "bg-[#157d3c] text-white"
                                        : "bg-gray-100 text-gray-600 hover:bg-[#f5c518] hover:text-[#1a1a1a]"
                                }`}
                            >
                                ALL
                            </button>

                            {ALPHABET.map((letter) => {
                                const hasPeople = availableLetters.has(letter);
                                const isActive = activeLetter === letter;

                                return (
                                    <button
                                        key={letter}
                                        type="button"
                                        onClick={() => scrollToLetter(letter)}
                                        disabled={!hasPeople}
                                        className={`h-8 w-8 shrink-0 rounded-full text-xs font-bold transition-colors duration-200 ${
                                            isActive
                                                ? "bg-[#157d3c] text-white"
                                                : hasPeople
                                                ? "bg-gray-100 text-gray-600 hover:bg-[#f5c518] hover:text-[#1a1a1a]"
                                                : "cursor-not-allowed bg-gray-50 text-gray-300"
                                        }`}
                                    >
                                        {letter}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Directory Content */}
                    <div className="px-6 py-10 sm:px-8 md:px-10 lg:px-14">
                        {isLoading ? (
                            <div className="flex items-center justify-center rounded-xl border border-dashed border-gray-300 bg-gray-50 px-6 py-14 text-sm text-gray-600">
                                Loading directory...
                            </div>
                        ) : error || filteredPersonnel.length === 0 ? (
                            <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-gray-300 bg-gray-50 px-6 py-14 text-center">
                                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#f0f7f2]">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="#157d3c"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="h-6 w-6"
                                    >
                                        <circle cx="11" cy="11" r="8" />
                                        <path d="m21 21-4.3-4.3" />
                                    </svg>
                                </div>
                                <h4 className="mb-1 text-base font-bold text-[#1a1a1a]">
                                    {error
                                        ? "No faculty or staff found"
                                        : "No results found"}
                                </h4>
                                <p className="max-w-md text-sm text-gray-600">
                                    {error
                                        ? "The directory is currently empty. Please check back later."
                                        : "We couldn't find anyone matching your search. Try a different name, position, or department."}
                                </p>
                                {!error && (
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setSearchTerm("");
                                            setActiveLetter("ALL");
                                        }}
                                        className="mt-4 rounded-full bg-[#157d3c] px-5 py-2 text-xs font-bold text-white transition-colors hover:bg-[#0f5c2c]"
                                    >
                                        Reset filters
                                    </button>
                                )}
                            </div>
                        ) : (
                            <AnimatePresence mode="popLayout">
                                <div className="space-y-12">
                                    {groupedPersonnel.map(({ letter, people }) => (
                                        <motion.section
                                            key={letter}
                                            ref={(el) => {
                                                sectionRefs.current[letter] = el;
                                            }}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{
                                                duration: 0.4,
                                                ease: [0.22, 1, 0.36, 1],
                                            }}
                                        >
                                            <div className="mb-5 flex items-center gap-4">
                                                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#157d3c] text-lg font-extrabold text-white shadow-sm">
                                                    {letter}
                                                </div>
                                                <div className="h-px flex-1 bg-gradient-to-r from-[#f5c518] via-gray-200 to-transparent" />
                                                <span className="text-xs font-semibold uppercase tracking-widest text-gray-400">
                                                    {people.length}{" "}
                                                    {people.length === 1
                                                        ? "person"
                                                        : "people"}
                                                </span>
                                            </div>

                                            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                                                {people.map((person) => (
                                                    <PersonnelCard
                                                        key={person.id}
                                                        person={person}
                                                        onOpen={setSelectedPerson}
                                                    />
                                                ))}
                                            </div>
                                        </motion.section>
                                    ))}
                                </div>
                            </AnimatePresence>
                        )}
                    </div>
                </motion.div>
            </div>

            {/* ==================== CV MODAL ==================== */}
            <AnimatePresence>
                {selectedPerson && (
                    <CVModal
                        person={selectedPerson}
                        onClose={() => setSelectedPerson(null)}
                    />
                )}
            </AnimatePresence>
        </MainLayout>
    );
}