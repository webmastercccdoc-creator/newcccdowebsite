import { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

import MainLayout from "../../../layouts/MainLayout";
import extensionBannerImg from "../../../assets/banner/the-banner.png";

const EXTENSION_PROJECTS = [
    {
        id: 1,
        year: "2026",
        proposedYear: "2022",
        office: "Technical Skills and Technology Institute",
        title: "Project KAHANAS",
        description:
            "A technical-skills and technology-focused extension initiative led by the Technical Skills and Technology Institute, aimed at equipping partner communities with practical, industry-relevant skills.",
        projectLeader: "Mr. Karl Hein M. Pios",
        coLeader: "Mr. Mark Adrian S. Baa",
        members: [
            "Ms. Gemma E. Gonzales",
            "Ms. Marivic I. Martinez",
            "Ms. Ruthcie E. Montano",
        ],
    },
    {
        id: 2,
        year: "2026",
        proposedYear: "2022",
        office: "College of Arts and Sciences",
        title:
            "Project COMM READY: A Needs-Based GE-BAComm Extension Program on Professional Communication for Senior High School Learners",
        description:
            "A needs-based communication extension program designed to strengthen the professional communication skills of senior high school learners through the College of Arts and Sciences.",
        projectLeader: "Mr. Mark P. Janubas",
        coLeader: null,
        members: ["Ms. Ma. Katerina F. Janubas"],
    },
    {
        id: 3,
        year: "2026",
        proposedYear: "2022",
        office: "Social Work Program",
        title: "TalentRail Academy: A Reintegration Program in Cagayan de Oro",
        description:
            "A reintegration program for vulnerable sectors in Cagayan de Oro, delivered through the Social Work Program and focused on restoring dignity, skills, and livelihood pathways.",
        projectLeader: "Ms. Sheena Marie P. Abad",
        coLeader: "Ms. Jan Trisha L. Sabaiton",
        members: [
            "Ms. Herna Francis Mae B. Tano",
            "Dr. Donna Grace I. Cotejo",
        ],
    },
    {
        id: 4,
        year: "2026",
        proposedYear: "2022",
        office: "National Service Training Program",
        title:
            "Project L.I.G.T.A.S (Lihok, Ihap, Giya, Tuk, Alerto, Sigurado): The National Service Reserve Corps (NSRC) Community Resilience and Disaster Preparedness Program",
        description:
            "A community resilience and disaster preparedness program under the National Service Reserve Corps (NSRC), empowering communities to respond to emergencies through organized, trained volunteers.",
        projectLeader: "Ms. Candice May B. Gamayon",
        coLeader: "Ms. Angelou V. Pepino",
        members: [],
    },
    {
        id: 5,
        year: "2026",
        proposedYear: "2021",
        office: "PATHFIT Office",
        title:
            "S.U.G.A.K.O.D – Strengthening Unity & Growth Among Kids through Outreach in Dance and Sports",
        description:
            "A youth-oriented outreach program using dance and sports as tools to strengthen unity, discipline, and growth among children in partner communities.",
        projectLeader: "Mr. Paolo Matutina",
        coLeader: null,
        members: ["Ms. Shaena Dance Ucat", "Mr. Erlouise Vargas"],
    },
    {
        id: 6,
        year: "2026",
        proposedYear: "2021",
        office: "College of Business & Management",
        title:
            "ASENSO sa AGUSAN: Empowering Fisherfolk Wives Through Fish-Based Enterprise Development",
        description:
            "A livelihood extension program empowering fisherfolk wives in Agusan through fish-based enterprise development, business training, and market linkage support.",
        projectLeader: "Ms. Jessa S. Cortez",
        coLeader: null,
        members: [
            "Ms. Catherine Uayan",
            "Ms. Herna Francis Mae B. Tano",
            "Dr. Rowena Orbeta",
            "Mr. Joseph Barillo",
            "Dr. Mary Joy Teodosio",
        ],
    },
    {
        id: 7,
        year: "2026",
        proposedYear: "2021",
        office: "College of Education",
        title: "Project Solaris",
        description:
            "An education-driven extension initiative of the College of Education focused on literacy, teacher training, and learning support for underserved schools.",
        projectLeader: "Dr. Liza L. Chua",
        coLeader: null,
        members: [
            "Ms. Mary Vil Acenas",
            "Aiza Mae D. Cahansa",
            "Psyche Cambo",
            "Charlito M. Castrodes",
            "Charlie H. Cosmiano",
            "Charlie Job Sumili",
            "Jason Herrera",
        ],
    },
    {
        id: 8,
        year: "2026",
        proposedYear: "2021",
        office: "Research, Innovation & Technology Transfer",
        title: "Project Mentor 2.0",
        description:
            "A mentoring and research-to-community program under RITTS, connecting faculty mentors with partner communities to translate research into practical, lasting impact.",
        projectLeader: "Dr. Joel Potane",
        coLeader: "Prof. Mark P. Janubas",
        members: [
            "Mr. Earl Louise Vargas",
            "Dr. Mary Joy Teodosio",
            "Dr. Psyche Cambo",
            "Dr. Jean T. Loquillano",
            "Mr. Ryan Sarip",
            "Mr. Jason Herrera",
        ],
    },
    {
        id: 9,
        year: "2026",
        proposedYear: "2022",
        office: "Alternative Learning System",
        title: "ALS Weekend Bridging Academy",
        description:
            "A weekend bridging academy under the Alternative Learning System, providing out-of-school youth and adults with pathways to complete basic education.",
        projectLeader: "Dr. Ray Butch Mahinay",
        coLeader: null,
        members: [
            "Dr. Jean T. Loquillano",
            "Mr. Eldin Camposo",
            "Mr. Jonathan Madronero",
            "Mr. Mark Janubas",
            "Dr. Joel D. Potane",
            "Ms. Ma. Katarina Janubas",
            "Dr. Faith Colarte",
            "Mr. Howard Christian O. Aranar",
        ],
    },
    {
        id: 10,
        year: "2026",
        proposedYear: "2022",
        office: "Extension and Social Development Services",
        title:
            "PROJECT RIGHT 2.0 (Raising Information and Generating Human Rights Training)",
        description:
            "A human-rights-focused extension program that raises awareness and builds capacity through information campaigns and structured human rights training.",
        projectLeader: "Dr. Jean T. Loquillano",
        coLeader: null,
        members: [
            "Dr. Joel D. Potane",
            "Mr. Jason R. Basiculan",
            "Mr. James D. Manas",
        ],
    },
];

const YEARS = ["All", "2026"];
const INITIAL_VISIBLE = 5;
const LOAD_STEP = 5;

const fadeUp = {
    hidden: { opacity: 0, y: 12 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
    },
};

function AnimatedBannerText({ title, description }) {
    return (
        <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
            <motion.p
                className="text-white/75 text-[0.7rem] md:text-xs font-semibold tracking-[0.4em] uppercase mb-4"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                City College of Cagayan de Oro
            </motion.p>
            <motion.h1
                className="text-4xl md:text-6xl font-extrabold text-white drop-shadow-lg tracking-tight leading-[1.05]"
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
                {title}
            </motion.h1>
            <motion.div
                className="mx-auto my-5 w-12 h-px bg-[#f5c518]"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
            />
            <motion.p
                className="text-white/90 text-sm md:text-base leading-relaxed max-w-2xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.15 }}
            >
                {description}
            </motion.p>
        </div>
    );
}

const selectClass =
    "pl-4 pr-10 py-2.5 border border-gray-300 rounded-md text-sm bg-white cursor-pointer outline-none focus:border-[#157d3c] appearance-none bg-no-repeat bg-[right_0.75rem_center] transition-colors";
const selectStyle = {
    backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%236b7280' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`,
    backgroundSize: "1rem",
};

export default function CommunityExtension() {
    useEffect(() => {
        document.title =
            "Community Extension Programs - City College of Cagayan de Oro";
    }, []);

    const [searchTerm, setSearchTerm] = useState("");
    const [selectedYear, setSelectedYear] = useState("All");
    const [sortOrder, setSortOrder] = useState("alphabetical");
    const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE);

    const filteredProjects = useMemo(() => {
        let result = [...EXTENSION_PROJECTS];
        if (searchTerm) {
            const q = searchTerm.toLowerCase();
            result = result.filter(
                (p) =>
                    p.title.toLowerCase().includes(q) ||
                    p.office.toLowerCase().includes(q) ||
                    p.description.toLowerCase().includes(q) ||
                    p.projectLeader.toLowerCase().includes(q)
            );
        }
        if (selectedYear !== "All")
            result = result.filter((p) => p.year === selectedYear);
        result.sort((a, b) => {
            if (sortOrder === "newest")
                return b.proposedYear.localeCompare(a.proposedYear);
            if (sortOrder === "oldest")
                return a.proposedYear.localeCompare(b.proposedYear);
            if (sortOrder === "alphabetical-desc")
                return b.title.localeCompare(a.title);
            return a.title.localeCompare(b.title);
        });
        return result;
    }, [searchTerm, selectedYear, sortOrder]);

    useEffect(() => setVisibleCount(INITIAL_VISIBLE), [
        searchTerm,
        selectedYear,
        sortOrder,
    ]);

    const visibleProjects = filteredProjects.slice(0, visibleCount);
    const remaining = filteredProjects.length - visibleCount;
    const hasMore = remaining > 0;

    return (
        <MainLayout
            maxWidth="full"
            containerClassName="px-0"
            mainClassName="py-0"
            className="overflow-hidden pb-0"
        >
            {/* Banner */}
            <div
                className="relative w-full bg-cover bg-center bg-no-repeat min-h-[380px] md:min-h-[440px] flex items-center justify-center"
                style={{ backgroundImage: `url('${extensionBannerImg}')` }}
            >
                <div className="absolute inset-0 bg-[#0f2e1a]/75" />
                <AnimatedBannerText
                    title="Community Extension Programs"
                    description="Approved extension projects for 2026 — outreach, partnerships, and programs serving the communities of Cagayan de Oro."
                />
            </div>

            {/* Intro */}
            <section className="bg-white border-b border-gray-100">
                <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-14 md:py-16 text-center">
                    <motion.p
                        className="m-0 mb-3 text-[0.7rem] font-bold tracking-[0.35em] uppercase text-[#157d3c]"
                        variants={fadeUp}
                        initial="hidden"
                        animate="visible"
                    >
                        Approved 2026
                    </motion.p>
                    <motion.h2
                        className="m-0 mb-5 text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight tracking-tight"
                        variants={fadeUp}
                        initial="hidden"
                        animate="visible"
                    >
                        Extension Projects Directory
                    </motion.h2>
                    <motion.p
                        className="m-0 mx-auto max-w-xl text-sm md:text-base text-gray-600 leading-relaxed"
                        variants={fadeUp}
                        initial="hidden"
                        animate="visible"
                    >
                        Browse the approved extension projects formally
                        recognized by the College for 2026. Search by title,
                        office, or project leader.
                    </motion.p>
                </div>
            </section>

            {/* Controls */}
            <section className="bg-white border-b border-gray-100 sticky top-0 z-30">
                <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-5">
                    <div className="flex flex-col md:flex-row gap-3 md:items-center">
                        <div className="relative flex-1">
                            <input
                                type="text"
                                placeholder="Search projects, offices, or leaders…"
                                value={searchTerm}
                                onChange={(e) =>
                                    setSearchTerm(e.target.value)
                                }
                                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-md text-sm bg-white outline-none focus:border-[#157d3c] transition-colors"
                            />
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="#9ca3af"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4"
                            >
                                <circle cx="11" cy="11" r="7" />
                                <line x1="21" y1="21" x2="16.65" y2="16.65" />
                            </svg>
                        </div>

                        <select
                            value={selectedYear}
                            onChange={(e) => setSelectedYear(e.target.value)}
                            className={selectClass}
                            style={selectStyle}
                        >
                            {YEARS.map((y) => (
                                <option key={y} value={y}>
                                    {y === "All" ? "All Years" : `Year ${y}`}
                                </option>
                            ))}
                        </select>

                        <select
                            value={sortOrder}
                            onChange={(e) => setSortOrder(e.target.value)}
                            className={selectClass}
                            style={selectStyle}
                        >
                            <option value="alphabetical">Sort: A – Z</option>
                            <option value="alphabetical-desc">
                                Sort: Z – A
                            </option>
                            <option value="newest">Newest Proposal</option>
                            <option value="oldest">Oldest Proposal</option>
                        </select>
                    </div>
                </div>
            </section>

            {/* List */}
            <section className="bg-[#fafafa]">
                <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-12 md:py-16">
                    <div className="flex items-baseline justify-between mb-8 pb-4 border-b border-gray-200">
                        <p className="m-0 text-xs font-semibold tracking-widest uppercase text-gray-500">
                            {filteredProjects.length} Project
                            {filteredProjects.length === 1 ? "" : "s"}
                        </p>
                        <p className="m-0 text-xs text-gray-400">
                            Showing {visibleProjects.length}
                        </p>
                    </div>

                    {filteredProjects.length === 0 ? (
                        <div className="text-center py-20">
                            <p className="m-0 mb-2 text-base font-semibold text-gray-800">
                                No matching projects
                            </p>
                            <p className="m-0 mb-6 text-sm text-gray-500">
                                Try another keyword or reset the filters.
                            </p>
                            <button
                                onClick={() => {
                                    setSearchTerm("");
                                    setSelectedYear("All");
                                }}
                                className="px-5 py-2.5 bg-[#157d3c] hover:bg-[#0f5c2c] text-white rounded-md text-sm font-semibold transition-colors"
                            >
                                Reset Filters
                            </button>
                        </div>
                    ) : (
                        <AnimatePresence mode="popLayout">
                            <ol className="m-0 p-0 list-none">
                                {visibleProjects.map((project, idx) => (
                                    <motion.li
                                        key={project.id}
                                        layout
                                        variants={fadeUp}
                                        initial="hidden"
                                        animate="visible"
                                        exit="exit"
                                        className="group relative border-b border-gray-200 last:border-b-0"
                                    >
                                        <div className="grid grid-cols-1 md:grid-cols-[80px_1fr_auto] gap-4 md:gap-8 py-8">
                                            {/* Number */}
                                            <div className="flex md:flex-col items-baseline gap-2 md:gap-1">
                                                <span className="text-2xl md:text-3xl font-bold text-gray-300 leading-none tabular-nums">
                                                    {String(idx + 1).padStart(
                                                        2,
                                                        "0"
                                                    )}
                                                </span>
                                                <span className="text-[0.65rem] font-semibold tracking-widest uppercase text-gray-400">
                                                    {project.year}
                                                </span>
                                            </div>

                                            {/* Content */}
                                            <div>
                                                <p className="m-0 mb-2 text-[0.7rem] font-semibold tracking-[0.2em] uppercase text-[#157d3c]">
                                                    {project.office}
                                                </p>
                                                <h3 className="m-0 mb-3 text-lg md:text-xl font-bold text-gray-900 leading-snug group-hover:text-[#0f5c2c] transition-colors">
                                                    {project.title}
                                                </h3>
                                                <p className="m-0 mb-4 text-sm text-gray-600 leading-relaxed">
                                                    {project.description}
                                                </p>
                                                <div className="flex flex-wrap gap-x-6 gap-y-1 text-xs text-gray-500">
                                                    <span>
                                                        <span className="font-semibold text-gray-700">
                                                            Leader:
                                                        </span>{" "}
                                                        {project.projectLeader}
                                                    </span>
                                                    {project.coLeader && (
                                                        <span>
                                                            <span className="font-semibold text-gray-700">
                                                                Co-Leader:
                                                            </span>{" "}
                                                            {project.coLeader}
                                                        </span>
                                                    )}
                                                    {project.members.length >
                                                        0 && (
                                                        <span>
                                                            <span className="font-semibold text-gray-700">
                                                                Members:
                                                            </span>{" "}
                                                            {project.members
                                                                .length +
                                                                (project.coLeader
                                                                    ? 1
                                                                    : 0)}{" "}
                                                            total
                                                        </span>
                                                    )}
                                                </div>

                                                {project.members.length > 0 && (
                                                    <details className="mt-3 group/details">
                                                        <summary className="cursor-pointer list-none text-xs font-semibold text-[#157d3c] hover:text-[#0f5c2c] inline-flex items-center gap-1">
                                                            <span className="group-open/details:rotate-90 inline-block transition-transform">
                                                                ▸
                                                            </span>
                                                            Show full team
                                                        </summary>
                                                        <ul className="m-0 mt-2 pl-4 list-none space-y-0.5 text-xs text-gray-600">
                                                            {project.members.map(
                                                                (m, i) => (
                                                                    <li
                                                                        key={i}
                                                                    >
                                                                        · {m}
                                                                    </li>
                                                                )
                                                            )}
                                                        </ul>
                                                    </details>
                                                )}
                                            </div>

                                            {/* Proposed year (right col) */}
                                            <div className="hidden md:flex md:flex-col md:items-end md:justify-start md:w-32">
                                                <p className="m-0 text-[0.65rem] font-semibold tracking-widest uppercase text-gray-400">
                                                    Proposed
                                                </p>
                                                <p className="m-0 mt-1 text-sm font-bold text-gray-800">
                                                    {project.proposedYear}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Hover underline */}
                                        <span className="absolute left-0 bottom-0 h-0.5 w-0 bg-[#157d3c] group-hover:w-full transition-all duration-500" />
                                    </motion.li>
                                ))}
                            </ol>
                        </AnimatePresence>
                    )}

                    {hasMore && (
                        <div className="mt-10 flex flex-col items-center gap-3">
                            <button
                                onClick={() =>
                                    setVisibleCount((c) => c + LOAD_STEP)
                                }
                                className="px-7 py-3 bg-white border border-gray-300 hover:border-[#157d3c] hover:text-[#157d3c] text-gray-800 rounded-md text-sm font-semibold transition-colors"
                            >
                                Load More ({Math.min(LOAD_STEP, remaining)})
                            </button>
                            <span className="text-xs text-gray-400">
                                {remaining} remaining
                            </span>
                        </div>
                    )}

                    {!hasMore && filteredProjects.length > 0 && (
                        <p className="mt-12 text-center text-[0.7rem] font-semibold tracking-widest uppercase text-gray-400">
                            End of Directory
                        </p>
                    )}
                </div>
            </section>
        </MainLayout>
    );
}