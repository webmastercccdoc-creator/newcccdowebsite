<<<<<<< HEAD
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
=======
import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion';
import MainLayout from '../../../layouts/MainLayout';
import AnimatedBannerText from '../../../components/content/AnimatedBannerText';
import extensionBanner from '../../../assets/banner/extension-banner.png';
import esdsLogo from '../../../assets/logos/ESDS-logo.png';

const DEFAULT_BANNER = extensionBanner;

/* ================================================================== */
/*  COLLEGE LOGO                                                       */
/* ================================================================== */

const LOGO = esdsLogo;

/* ================================================================== */
/*  FONT SYSTEM — Tahoma for titles/labels · Merriweather for reading  */
/* ================================================================== */

const F_TITLE = { fontFamily: "Tahoma, Verdana, 'Segoe UI', sans-serif" };
const F_BODY = { fontFamily: "'Merriweather', Georgia, 'Times New Roman', serif" };

/* Fluid display sizes */
const CLAMP_H2 = { fontSize: 'clamp(2.1rem, 4.5vw, 4.25rem)' };
const CLAMP_H3 = { fontSize: 'clamp(1.35rem, 2.2vw, 2rem)' };

/* ================================================================== */
/*  EXTENSION PROJECT DATA                                             */
/*  `image`: null = designed placeholder · or drop a photo path/URL    */
/* ================================================================== */

const extensionProjects = [
    {
        office: 'Technical Skills and Technology Institute',
        abbreviation: 'TSTI',
        image: null, // TODO: Confirm title — "Revised Project Proposal" was unlabeled
        name: 'Revised Project Proposal',
        subtitle: null,
        leader: 'Mr. Karl Hein M. Pios',
        coLeaders: ['Mr. Mark Adrian S. Baa'],
        members: ['Ms. Gemma E. Gonzales', 'Ms. Marivic I. Martinez', 'Ms. Rutchie E. Montano'],
    },
    {
        office: 'College of Arts and Sciences',
        abbreviation: 'CAS',
        image: null,
        name: 'Project KAHANAS',
        subtitle: null,
        leader: 'Mr. Mark P. Janubas',
        coLeaders: [],
        members: ['Ms. Ma. Katerina F. Janubas'],
    },
    {
        office: 'Social Work Program',
        abbreviation: 'SWP',
        image: null,
        name: 'Project COMM READY',
        subtitle:
            'A Needs-Based GE-BAComm Extension Program on Professional Communication for Senior High School Learners',
        leader: 'Ms. Sheena Marie P. Abad',
        coLeaders: ['Ms. Jan Trisha L. Sabaiton'],
        members: ['Ms. Herna Francis Mae B. Tano', 'Dr. Donna Grace I. Cotejo'],
    },
    {
        office: 'National Service Training Program',
        abbreviation: 'NSTP',
        image: null,
        name: 'TalentRail Academy',
        subtitle: 'A Reintegration Program in Cagayan de Oro',
        leader: 'Ms. Candice May B. Gamayon',
        coLeaders: ['Ms. Angelou V. Pepino'],
        members: [],
    },
    {
        office: 'PATHFIT Office',
        abbreviation: 'PATHFIT',
        image: null,
        name: 'Project L.I.G.T.A.S',
        subtitle:
            'Lihok, Ihap, Giya, Tuk, Alerto, Sigurado — The NSRC Community Resilience and Disaster Preparedness Program',
        leader: 'Mr. Paolo Matutinao',
        coLeaders: [],
        members: ['Ms. Shaena Dance Ucat', 'Mr. Erlouise Vargas'],
    },
    {
        office: 'College of Business & Management',
        abbreviation: 'CBM',
        image: null,
        name: 'Project S.U.G.A.K.O.D',
        subtitle: 'Strengthening Unity & Growth Among Kids through Outreach in Dance and Sports',
        leader: 'Ms. Jessa S. Cortez',
        coLeaders: [],
        members: [
            'Ms. Catherine Uayan',
            'Ms. Herna Francis Mae B. Tano',
            'Dr. Rowena Orbeta',
            'Mr. Joseph Barillo',
            'Dr. Mary Joy Teodosio',
        ],
    },
    {
        office: 'College of Education',
        abbreviation: 'COEd',
        image: null,
        name: 'ASENSO sa AGUSAN',
        subtitle: 'Empowering Fisherfolk Wives Through Fish-Based Enterprise Development',
        leader: 'Dr. Liza L. Chua',
        coLeaders: [],
        members: [
            'Ms. Mary Vil Acenas',
            'Aiza Mae D. Cahansa',
            'Psyche Cambo',
            'Charlito M. Castrodes',
            'Charlie H. Cosmiano',
            'Charlie Job Sumili',
            'Jason Herrera',
        ],
    },
    {
        office: 'Research, Innovation & Technology Transfer',
        abbreviation: 'RITTS',
        image: null,
        name: 'Project Solaris',
        subtitle: null,
        leader: 'Dr. Joel Potane',
        coLeaders: [
            'Prof. Mark P. Janubas',
            'Mr. Earl Louise Vargas',
            'Dr. Mary Joy Teodosio',
            'Dr. Psyche Cambo',
        ],
        members: ['Dr. Jean T. Loquillano', 'Mr. Ryan Sarip', 'Mr. Jason Herrera'],
    },
    {
        office: 'Alternative Learning System',
        abbreviation: 'ALS',
        image: null,
        name: 'Project Mentor 2.0',
        subtitle: null,
        leader: 'Dr. Ray Butch Mahinay',
        coLeaders: [],
        members: [
            'Dr. Jean T. Loquillano',
            'Mr. Eldin Camposo',
            'Mr. Jonathan Madronero',
            'Mr. Mark Janubas',
            'Dr. Joel D. Potane',
            'Ms. Ma. Katarina Janubas',
            'Dr. Faith Colarte',
            'Mr. Howard Christian O. Aranar',
        ],
    },
    {
        office: 'Extension and Social Development Services',
        abbreviation: 'ESDS',
        image: null,
        name: 'ALS Weekend Bridging Academy',
        subtitle: null,
        leader: 'Dr. Jean T. Loquillano',
        coLeaders: [],
        members: ['Dr. Joel D. Potane', 'Mr. Jason R. Basiculan', 'Mr. James D. Manas'],
    },
];

/* ================================================================== */
/*  OFFICE LEADERSHIP — add photos via `image` when available          */
/* ================================================================== */

const OFFICE = {
    name: 'Extension and Social Development Services',
    director: {
        name: 'Jean T. Loquillano, PhD',
        role: 'Director',
        image: null, // ← e.g. '/images/leadership/loquillano.jpg'
    },
    coordinator: {
        name: 'James D. Manas',
        role: 'Coordinator',
        unit: 'Extension and Social Development Services',
        abbreviation: 'ESDS',
        image: null,
    },
    focalPersons: [
        {
            name: 'Earlouise Vargas, MAed',
            role: 'Focal Person',
            unit: 'College of Arts and Sciences',
            abbreviation: 'CAS',
            image: null,
        },
        {
            name: 'Joseph G. Barillo, MBA',
            role: 'Focal Person',
            unit: 'College of Business & Management',
            abbreviation: 'CBM',
            image: null,
        },
        {
            name: 'Mary Vil C. Acenas, MAed',
            role: 'Focal Person',
            unit: 'College of Education',
            abbreviation: 'COE',
            image: null,
        },
    ],
};

/* Coordinator + focal persons share one uniform card grid */
const TEAM_GRID = [OFFICE.coordinator, ...OFFICE.focalPersons];

const TOTAL_PROJECTS = extensionProjects.length;
const TOTAL_OFFICES = new Set(extensionProjects.map((p) => p.office)).size;
const TOTAL_EXTENSIONISTS = extensionProjects.reduce(
    (sum, p) => sum + 1 + p.coLeaders.length + p.members.length,
    0
);

/* ================================================================== */
/*  MOTION                                                             */
/* ================================================================== */

const EASE = [0.22, 1, 0.36, 1];

function FadeIn({ children, delay = 0, className }) {
    return (
        <motion.div
            className={className}
            initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.85, delay, ease: EASE }}
        >
            {children}
        </motion.div>
    );
}

function Aurora({ className, duration = 20, delay = 0 }) {
    return (
        <motion.div
            className={`pointer-events-none absolute rounded-full blur-3xl ${className}`}
            animate={{ x: [0, 40, -20, 0], y: [0, -30, 20, 0] }}
            transition={{ duration, repeat: Infinity, ease: 'easeInOut', delay }}
            aria-hidden="true"
        />
    );
}

function ScrollProgress() {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.4 });
    return (
        <motion.div
            className="fixed inset-x-0 top-0 z-50 h-[3px] origin-left bg-gradient-to-r from-[#086618] via-[#d9a900] to-[#FF3131]"
            style={{ scaleX }}
        />
    );
}

/* ================================================================== */
/*  SHARED PIECES                                                      */
/* ================================================================== */

const TITLE_PREFIX = /^(Mr|Ms|Mrs|Dr|Prof|Engr)\.?\s+/i;

function getInitials(name) {
    return name
        .replace(TITLE_PREFIX, '')
        .split(/\s+/)
        .filter(Boolean)
        .map((word) => word[0])
        .slice(0, 2)
        .join('')
        .toUpperCase();
}

/* First letters of first & last name — strips degree suffixes (PhD, MAed, MBA) */
function personInitials(name) {
    const parts = name
        .replace(/,.*$/, '')
        .trim()
        .split(/\s+/)
        .filter(Boolean);
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

function Eyebrow({ children, align = 'center' }) {
    return (
        <div
            className={`flex items-center gap-4 ${
                align === 'center' ? 'justify-center' : 'justify-start'
            }`}
        >
            <span
                className="h-px w-10 shrink-0 bg-gradient-to-r from-transparent to-[#d9a900]/70"
                aria-hidden="true"
            />
            <span
                className="text-[10px] font-bold uppercase tracking-[0.35em] text-[#a3840a] sm:text-[11px]"
                style={F_TITLE}
            >
                {children}
            </span>
            <span
                className="h-px w-10 shrink-0 bg-gradient-to-l from-transparent to-[#d9a900]/70"
                aria-hidden="true"
            />
>>>>>>> 2cf9d51e5434aeb7afe326f15ca53ec6483adc62
        </div>
    );
}

<<<<<<< HEAD
const selectClass =
    "pl-4 pr-10 py-2.5 border border-gray-300 rounded-md text-sm bg-white cursor-pointer outline-none focus:border-[#157d3c] appearance-none bg-no-repeat bg-[right_0.75rem_center] transition-colors";
const selectStyle = {
    backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%236b7280' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`,
    backgroundSize: "1rem",
};
=======
function Ornament() {
    return (
        <div className="flex items-center justify-center gap-2.5" aria-hidden="true">
            <span className="h-px w-12 bg-[#dfe3d8] sm:w-16" />
            <span className="h-1.5 w-1.5 rotate-45 bg-[#086618]" />
            <span className="h-2 w-2 rotate-45 bg-[#d9a900]" />
            <span className="h-2 w-2 rotate-45 bg-[#FF3131]/80" />
            <span className="h-1.5 w-1.5 rotate-45 bg-[#086618]" />
            <span className="h-px w-12 bg-[#dfe3d8] sm:w-16" />
        </div>
    );
}

/* ================================================================== */
/*  LOGO MARK — renders the ESDS logo in a clean circular badge        */
/* ================================================================== */

function LogoMark({ className = '' }) {
    if (LOGO) {
        return (
            <div
                className={`flex items-center justify-center overflow-hidden rounded-full bg-white shadow-[0_18px_40px_-22px_rgba(217,169,0,0.55)] ${className}`}
            >
                <img
                    src={LOGO}
                    alt="ESDS logo"
                    className="h-full w-full object-contain p-1.5"
                />
            </div>
        );
    }

    return (
        <div
            className={`flex items-center justify-center rounded-full border-2 border-dashed border-[#d9a900]/60 bg-white shadow-[0_18px_40px_-22px_rgba(217,169,0,0.55)] ${className}`}
        >
            <div className="flex h-[72%] w-[72%] items-center justify-center rounded-full bg-gradient-to-br from-[#e9f5ec] to-[#d2e5d7]">
                <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="h-1/2 w-1/2 text-[#0a6b1c]/40"
                    aria-hidden="true"
                >
                    <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 12.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" />
                </svg>
            </div>
        </div>
    );
}

/* ================================================================== */
/*  PORTRAIT FRAME — one shared 4:5 frame = identical photo size       */
/* ================================================================== */

const PORTRAIT_TONES = {
    gold: {
        offsetRing: 'border-[#d9a900]/40',
        frameRing: 'ring-[#d9a900]/25',
        mat: 'bg-gradient-to-br from-[#f7efcf] via-[#f0e2a8] to-[#e0ca80]',
        initials: 'text-[#8a6d00]',
        silhouette: 'text-[#8a6d00]/[0.12]',
        rolePill: 'bg-[#fdf6dc] text-[#8a6d00] ring-1 ring-[#eedf9a]',
        tick: 'bg-[#d9a900]',
        shadow: 'shadow-[0_36px_80px_-44px_rgba(217,169,0,0.6)]',
        hoverShadow: 'group-hover:shadow-[0_48px_95px_-44px_rgba(217,169,0,0.7)]',
    },
    green: {
        offsetRing: 'border-[#086618]/25',
        frameRing: 'ring-[#086618]/15',
        mat: 'bg-gradient-to-br from-[#e9f5ec] via-[#d7ecdc] to-[#b9d9c1]',
        initials: 'text-[#0a6b1c]',
        silhouette: 'text-[#0a6b1c]/[0.12]',
        rolePill: 'bg-[#eaf3ec] text-[#0a6b1c] ring-1 ring-[#cfe4d5]',
        tick: 'bg-[#086618]/70',
        shadow: 'shadow-[0_26px_60px_-38px_rgba(8,102,24,0.45)]',
        hoverShadow: 'group-hover:shadow-[0_38px_75px_-38px_rgba(8,102,24,0.5)]',
    },
    sage: {
        offsetRing: 'border-black/[0.08]',
        frameRing: 'ring-black/[0.06]',
        mat: 'bg-gradient-to-br from-[#f1f6f1] via-[#e4efe6] to-[#d2e5d7]',
        initials: 'text-[#0a6b1c]',
        silhouette: 'text-[#0a6b1c]/[0.1]',
        rolePill: 'bg-[#eef3ea] text-[#0a6b1c] ring-1 ring-[#cfe4d5]',
        tick: 'bg-[#d9a900]',
        shadow: 'shadow-[0_26px_60px_-38px_rgba(15,36,21,0.4)]',
        hoverShadow: 'group-hover:shadow-[0_38px_75px_-38px_rgba(8,102,24,0.45)]',
    },
};

function PortraitFrame({ person, tone = 'sage' }) {
    const t = PORTRAIT_TONES[tone];
    return (
        <div className="relative">
            <span
                className={`pointer-events-none absolute -inset-2 rounded-2xl border sm:-inset-2.5 sm:rounded-[1.5rem] ${t.offsetRing}`}
                aria-hidden="true"
            />
            <div
                className={`relative rounded-2xl bg-white p-2 ring-1 transition-transform duration-500 group-hover:-translate-y-1 sm:p-2.5 ${t.frameRing} ${t.shadow} ${t.hoverShadow}`}
            >
                <div className="relative aspect-[4/5] overflow-hidden rounded-xl">
                    {person.image ? (
                        <img
                            src={person.image}
                            alt={person.name}
                            loading="lazy"
                            className="h-full w-full object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-[1.05]"
                        />
                    ) : (
                        <div
                            className={`relative flex h-full w-full items-center justify-center ${t.mat}`}
                        >
                            <svg
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className={`absolute h-[62%] w-[62%] translate-y-[8%] ${t.silhouette}`}
                                aria-hidden="true"
                            >
                                <path d="M12 12.5c2.9 0 5.2-2.4 5.2-5.3S14.9 1.9 12 1.9 6.8 4.3 6.8 7.2 9.1 12.5 12 12.5zm0 2.4c-3.5 0-10.4 1.8-10.4 5.3v2.9h20.8v-2.9c0-3.5-6.9-5.3-10.4-5.3z" />
                            </svg>
                            <span
                                className={`relative text-3xl font-bold tracking-tight sm:text-4xl ${t.initials}`}
                                style={F_TITLE}
                            >
                                {personInitials(person.name)}
                            </span>
                        </div>
                    )}
                    <span
                        className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-black/[0.06]"
                        aria-hidden="true"
                    />
                </div>
            </div>
        </div>
    );
}

/* ================================================================== */
/*  DIRECTOR SPOTLIGHT — the only larger portrait (featured tier)      */
/* ================================================================== */

function DirectorSpotlight({ person }) {
    const t = PORTRAIT_TONES.gold;
    return (
        <motion.div
            initial={{ opacity: 0, y: 32, filter: 'blur(6px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, ease: EASE }}
            className="group relative overflow-hidden rounded-3xl bg-white p-6 shadow-[0_30px_70px_-42px_rgba(15,36,21,0.4)] ring-1 ring-[#d9a900]/40 transition-all duration-500 hover:-translate-y-1 sm:p-8 md:p-10"
        >
            <span
                className="absolute inset-x-10 top-0 h-[2px] bg-gradient-to-r from-transparent via-[#d9a900] to-transparent"
                aria-hidden="true"
            />

            <div className="grid items-center gap-7 md:grid-cols-12 md:gap-9">
                <div className="mx-auto w-44 sm:w-52 md:col-span-4 md:mx-0 md:w-auto md:px-2">
                    <PortraitFrame person={person} tone="gold" />
                </div>

                <div className="text-center md:col-span-8 md:text-left">
                    <span
                        className={`inline-block rounded-full px-4 py-1.5 text-[9px] font-bold uppercase tracking-[0.32em] sm:text-[10px] ${t.rolePill}`}
                        style={F_TITLE}
                    >
                        {person.role}
                    </span>

                    <h3
                        className="mt-4 text-xl font-bold leading-snug tracking-tight text-[#122615] sm:text-2xl md:text-3xl"
                        style={{ ...F_TITLE, ...CLAMP_H3 }}
                    >
                        {person.name}
                    </h3>

                    <span
                        className="mx-auto mt-4 block h-[3px] w-10 rounded-full bg-[#d9a900] transition-all duration-500 group-hover:w-20 md:mx-0"
                        aria-hidden="true"
                    />

                    <p
                        className="mx-auto mt-4 max-w-md text-sm leading-[1.9] text-slate-600 md:mx-0 md:text-[15px]"
                        style={F_BODY}
                    >
                        Provides overall leadership and strategic direction for the extension
                        programs of the College.
                    </p>

                    <p
                        className="mt-5 text-[9px] font-semibold uppercase leading-loose tracking-[0.25em] text-slate-400 sm:text-[10px]"
                        style={F_TITLE}
                    >
                        {OFFICE.name}
                        <br />
                        City College of Cagayan de Oro
                    </p>
                </div>
            </div>
        </motion.div>
    );
}

/* ================================================================== */
/*  TEAM CARD — one uniform size for Coordinator AND Focal Persons     */
/* ================================================================== */

function TeamCard({ person, tone = 'sage', index }) {
    const t = PORTRAIT_TONES[tone];
    return (
        <motion.figure
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.65, delay: index * 0.08, ease: EASE }}
            className="group mx-auto w-full max-w-[16rem]"
        >
            <PortraitFrame person={person} tone={tone} />

            <figcaption className="mt-6 text-center">
                <span
                    className={`inline-block rounded-full px-4 py-1.5 text-[9px] font-bold uppercase tracking-[0.32em] ${t.rolePill}`}
                    style={F_TITLE}
                >
                    {person.role}
                </span>

                <h4
                    className="mt-3 text-base font-bold leading-snug tracking-tight text-[#122615] sm:text-lg"
                    style={F_TITLE}
                >
                    {person.name}
                </h4>

                <span
                    className={`mx-auto mt-3 block h-[3px] w-8 rounded-full transition-all duration-500 group-hover:w-14 ${t.tick}`}
                    aria-hidden="true"
                />

                <p
                    className="mt-3 text-[10px] font-semibold uppercase leading-relaxed tracking-[0.18em] text-slate-400"
                    style={F_TITLE}
                >
                    {person.unit}
                </p>
            </figcaption>
        </motion.figure>
    );
}

/* ================================================================== */
/*  PROGRAM VISUAL — real photo or designed placeholder                */
/* ================================================================== */

function ProgramVisual({ project }) {
    if (project.image) {
        return (
            <img
                src={project.image}
                alt={project.name}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.06]"
            />
        );
    }

    return (
        <div className="relative h-full w-full overflow-hidden bg-gradient-to-br from-[#1d8a35] via-[#126526] to-[#0a3d14]">
            <div
                className="absolute inset-0 opacity-50"
                style={{
                    backgroundImage:
                        'radial-gradient(rgba(255,255,255,0.14) 1px, transparent 1px)',
                    backgroundSize: '22px 22px',
                }}
                aria-hidden="true"
            />
            <div
                className="absolute -right-12 -top-12 h-48 w-48 rounded-full bg-[#FED421]/20 blur-2xl"
                aria-hidden="true"
            />
            <div
                className="absolute -bottom-16 -left-10 h-44 w-44 rounded-full bg-white/10 blur-2xl"
                aria-hidden="true"
            />
            <span
                className="absolute inset-0 flex items-center justify-center text-6xl font-bold tracking-tight text-white/15 transition-all duration-700 group-hover:text-[#FED421]/40 sm:text-7xl"
                style={F_TITLE}
                aria-hidden="true"
            >
                {project.abbreviation}
            </span>
        </div>
    );
}

/* ================================================================== */
/*  PROGRAM DIRECTORY — master–detail viewer                           */
/* ================================================================== */

const memberParent = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.035 } },
};

const memberChild = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: EASE } },
};

function ProgramRow({ project, index, active, onSelect }) {
    const number = String(index + 1).padStart(2, '0');

    return (
        <button
            type="button"
            onClick={onSelect}
            aria-selected={active}
            role="tab"
            className={`group flex w-full items-center gap-4 rounded-2xl px-4 py-3.5 text-left transition-all duration-300 sm:px-5 ${
                active
                    ? 'bg-gradient-to-r from-[#0c5e1f] to-[#086618] shadow-[0_16px_36px_-16px_rgba(8,102,24,0.55)]'
                    : 'hover:bg-[#f2f5ee]'
            }`}
        >
            {/* Number */}
            <span
                className={`w-8 shrink-0 text-sm font-bold tabular-nums tracking-tight transition-colors duration-300 ${
                    active ? 'text-[#FED421]' : 'text-[#c9d2c2] group-hover:text-[#0a6b1c]'
                }`}
                style={F_BODY}
            >
                {number}
            </span>

            {/* Name + office */}
            <span className="min-w-0 flex-1">
                <span
                    className={`block truncate text-sm font-bold leading-snug tracking-tight transition-colors duration-300 sm:text-[15px] ${
                        active ? 'text-white' : 'text-[#122615]'
                    }`}
                    style={F_TITLE}
                >
                    {project.name}
                </span>
                <span
                    className={`mt-0.5 block truncate text-[10px] font-semibold uppercase tracking-[0.18em] transition-colors duration-300 ${
                        active ? 'text-emerald-100/70' : 'text-slate-400'
                    }`}
                    style={F_TITLE}
                >
                    {project.abbreviation} · {project.office}
                </span>
            </span>

            {/* Chevron */}
            <span
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
                    active
                        ? 'border-[#FED421]/60 bg-[#FED421]/15 text-[#FED421]'
                        : 'border-[#e7eae2] text-slate-300 group-hover:border-[#086618]/30 group-hover:text-[#0a6b1c]'
                }`}
                aria-hidden="true"
            >
                <svg
                    viewBox="0 0 16 16"
                    fill="none"
                    className={`h-3.5 w-3.5 transition-transform duration-300 ${
                        active ? 'translate-x-px' : 'group-hover:translate-x-0.5'
                    }`}
                >
                    <path
                        d="M6 3.5L10.5 8L6 12.5"
                        stroke="currentColor"
                        strokeWidth="1.75"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </span>
        </button>
    );
}

function ProgramDetail({ project, index, total, onPrev, onNext }) {
    const number = String(index + 1).padStart(2, '0');
    const visibleMembers = project.members.slice(0, 12);
    const hiddenCount = project.members.length - visibleMembers.length;

    return (
        <motion.div
            initial={{ opacity: 0, x: 28, filter: 'blur(6px)' }}
            animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, x: -28, filter: 'blur(6px)' }}
            transition={{ duration: 0.4, ease: EASE }}
            className="group overflow-hidden rounded-3xl bg-white shadow-[0_30px_70px_-40px_rgba(15,36,21,0.4)] ring-1 ring-black/[0.06]"
        >
            {/* ---------- Visual header ---------- */}
            <div className="relative aspect-[16/10] overflow-hidden sm:aspect-[2/1]">
                <ProgramVisual project={project} />

                <div
                    className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/35 to-transparent"
                    aria-hidden="true"
                />

                {/* Number chip */}
                <span
                    className="absolute left-5 top-5 rounded-full bg-[#FED421] px-3.5 py-1.5 text-[10px] font-bold tracking-[0.3em] text-[#3a2f00] shadow-md"
                    style={F_TITLE}
                >
                    {number}
                </span>

                {/* Office tag */}
                <span
                    className="absolute bottom-4 left-5 max-w-[55%] truncate text-[10px] font-semibold uppercase tracking-[0.25em] text-white/90 drop-shadow"
                    style={F_TITLE}
                >
                    {project.office}
                </span>

                {/* Prev / counter / next */}
                <div className="absolute right-4 top-4 flex items-center gap-2">
                    <button
                        type="button"
                        onClick={onPrev}
                        aria-label="Previous program"
                        className="flex h-9 w-9 items-center justify-center rounded-full bg-black/40 text-white ring-1 ring-white/25 backdrop-blur-md transition-all duration-300 hover:bg-[#FED421] hover:text-[#3a2f00]"
                    >
                        <svg viewBox="0 0 16 16" fill="none" className="h-3.5 w-3.5" aria-hidden="true">
                            <path
                                d="M10 3.5L5.5 8L10 12.5"
                                stroke="currentColor"
                                strokeWidth="1.75"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </button>

                    <span
                        className="rounded-full bg-black/40 px-3 py-1.5 text-[10px] font-bold tracking-[0.2em] text-white ring-1 ring-white/25 backdrop-blur-md"
                        style={F_TITLE}
                    >
                        {number} / {String(total).padStart(2, '0')}
                    </span>

                    <button
                        type="button"
                        onClick={onNext}
                        aria-label="Next program"
                        className="flex h-9 w-9 items-center justify-center rounded-full bg-black/40 text-white ring-1 ring-white/25 backdrop-blur-md transition-all duration-300 hover:bg-[#FED421] hover:text-[#3a2f00]"
                    >
                        <svg viewBox="0 0 16 16" fill="none" className="h-3.5 w-3.5" aria-hidden="true">
                            <path
                                d="M6 3.5L10.5 8L6 12.5"
                                stroke="currentColor"
                                strokeWidth="1.75"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </button>
                </div>
            </div>

            {/* ---------- Body ---------- */}
            <div className="p-6 sm:p-8">
                {/* Eyebrow */}
                <div className="flex items-center gap-2.5">
                    <span className="h-1.5 w-1.5 rotate-45 bg-[#d9a900]" aria-hidden="true" />
                    <span
                        className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#0a6b1c]"
                        style={F_TITLE}
                    >
                        {project.abbreviation}
                    </span>
                </div>

                {/* Title */}
                <h3
                    className="mt-3.5 text-xl font-bold leading-snug tracking-tight text-[#122615] sm:text-2xl md:text-[1.7rem]"
                    style={F_TITLE}
                >
                    {project.name}
                </h3>

                {project.subtitle && (
                    <p
                        className="mt-3 text-[13px] leading-[1.9] text-slate-500 sm:text-sm"
                        style={F_BODY}
                    >
                        {project.subtitle}
                    </p>
                )}

                <span
                    className="mt-6 block h-[3px] w-12 rounded-full bg-[#FED421] transition-all duration-500 group-hover:w-20"
                    aria-hidden="true"
                />

                {/* Leadership + Members */}
                <div className="mt-7 grid gap-8 md:grid-cols-5">
                    {/* Leadership */}
                    <div className="md:col-span-2">
                        <p
                            className="text-[9px] font-bold uppercase tracking-[0.3em] text-slate-400"
                            style={F_TITLE}
                        >
                            Leadership
                        </p>

                        <div className="mt-4 flex items-center gap-4">
                            <span
                                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#1d8a35] to-[#086618] text-xs font-bold text-white shadow-[0_10px_20px_-8px_rgba(8,102,24,0.55)]"
                                style={F_TITLE}
                            >
                                {getInitials(project.leader)}
                            </span>
                            <div>
                                <p
                                    className="text-[9px] font-semibold uppercase tracking-[0.28em] text-[#8b9488]"
                                    style={F_TITLE}
                                >
                                    Project Leader
                                </p>
                                <p
                                    className="mt-0.5 text-sm font-bold text-[#122615]"
                                    style={F_BODY}
                                >
                                    {project.leader}
                                </p>
                            </div>
                        </div>

                        {project.coLeaders.map((name) => (
                            <div key={name} className="mt-3.5 flex items-center gap-4">
                                <span
                                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#fdf6dc] text-xs font-bold text-[#8a6d00] ring-1 ring-[#eedf9a]"
                                    style={F_TITLE}
                                >
                                    {getInitials(name)}
                                </span>
                                <div>
                                    <p
                                        className="text-[9px] font-semibold uppercase tracking-[0.28em] text-[#8b9488]"
                                        style={F_TITLE}
                                    >
                                        Co-Project Leader
                                    </p>
                                    <p
                                        className="mt-0.5 text-sm font-bold text-[#122615]"
                                        style={F_BODY}
                                    >
                                        {name}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Members */}
                    {project.members.length > 0 && (
                        <div className="md:col-span-3 md:border-l md:border-[#e7eae2] md:pl-8">
                            <div className="flex items-center gap-2.5">
                                <p
                                    className="text-[9px] font-bold uppercase tracking-[0.3em] text-slate-400"
                                    style={F_TITLE}
                                >
                                    Members
                                </p>
                                <span
                                    className="rounded-full bg-[#eaf3ec] px-2 py-0.5 text-[10px] font-bold text-[#0a6b1c]"
                                    style={F_TITLE}
                                >
                                    {project.members.length}
                                </span>
                            </div>

                            <motion.div
                                key={index}
                                variants={memberParent}
                                initial="hidden"
                                animate="visible"
                                className="mt-4 flex flex-wrap gap-2"
                            >
                                {visibleMembers.map((name) => (
                                    <motion.span
                                        key={name}
                                        variants={memberChild}
                                        className="rounded-full border border-[#e7eae2] bg-[#fafbf7] px-3.5 py-1.5 text-xs font-medium text-slate-600 transition-colors duration-300 hover:border-[#086618]/40 hover:text-[#0a6b1c]"
                                        style={F_BODY}
                                    >
                                        {name}
                                    </motion.span>
                                ))}
                                {hiddenCount > 0 && (
                                    <motion.span
                                        variants={memberChild}
                                        className="rounded-full border border-dashed border-[#c9d2c2] px-3.5 py-1.5 text-xs font-bold text-slate-400"
                                        style={F_TITLE}
                                    >
                                        +{hiddenCount} more
                                    </motion.span>
                                )}
                            </motion.div>
                        </div>
                    )}
                </div>
            </div>
        </motion.div>
    );
}

function ProgramDirectory({ projects }) {
    const [activeIndex, setActiveIndex] = useState(0);
    const go = (dir) =>
        setActiveIndex((cur) => (cur + dir + projects.length) % projects.length);

    return (
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
            {/* ---------- Index list ---------- */}
            <FadeIn className="lg:col-span-5 xl:col-span-4">
                <div className="rounded-3xl bg-white p-2.5 shadow-[0_24px_60px_-38px_rgba(15,36,21,0.4)] ring-1 ring-black/[0.06]">
                    {/* List header */}
                    <div className="flex items-center justify-between px-4 pb-3 pt-3 sm:px-5">
                        <span
                            className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#a3840a]"
                            style={F_TITLE}
                        >
                            Program Index
                        </span>
                        <span
                            className="rounded-full bg-[#eef3ea] px-2.5 py-1 text-[10px] font-bold text-[#0a6b1c]"
                            style={F_TITLE}
                        >
                            {projects.length} Total
                        </span>
                    </div>

                    <div className="space-y-1" role="tablist" aria-label="Extension programs">
                        {projects.map((project, index) => (
                            <ProgramRow
                                key={project.name}
                                project={project}
                                index={index}
                                active={activeIndex === index}
                                onSelect={() => setActiveIndex(index)}
                            />
                        ))}
                    </div>
                </div>
            </FadeIn>

            {/* ---------- Detail panel ---------- */}
            <FadeIn delay={0.08} className="lg:col-span-7 xl:col-span-8">
                <div className="lg:sticky lg:top-24">
                    <AnimatePresence mode="wait" initial={false}>
                        <ProgramDetail
                            key={activeIndex}
                            project={projects[activeIndex]}
                            index={activeIndex}
                            total={projects.length}
                            onPrev={() => go(-1)}
                            onNext={() => go(1)}
                        />
                    </AnimatePresence>
                </div>
            </FadeIn>
        </div>
    );
}

/* ================================================================== */
/*  MAIN PAGE                                                          */
/* ================================================================== */
>>>>>>> 2cf9d51e5434aeb7afe326f15ca53ec6483adc62

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
<<<<<<< HEAD
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
=======
            className="overflow-hidden pb-0 bg-[#faf9f4]"
        >
            <ScrollProgress />

            {/* ============================ HERO BANNER ============================ */}
            <div
                className="relative flex min-h-[350px] w-full items-center justify-center bg-cover bg-center bg-no-repeat shadow-lg sm:min-h-[420px] md:min-h-[480px] lg:min-h-[550px]"
                style={{ backgroundImage: `url('${DEFAULT_BANNER}')` }}
            >
                <AnimatedBannerText
                    title="Community Extension Programs"
                    description="Discover the community outreach and extension programs of the City College of Cagayan de Oro."
                />
            </div>

            {/* ============================ INTRO — centered seal letterhead ============================ */}
            <section className="relative overflow-hidden">
                <Aurora
                    className="-left-40 top-0 h-[26rem] w-[26rem] bg-[#1d8a35]/[0.08] sm:h-[30rem] sm:w-[30rem]"
                    duration={22}
                />
                <Aurora
                    className="-right-40 top-32 h-[22rem] w-[22rem] bg-[#FED421]/[0.14] sm:h-[26rem] sm:w-[26rem]"
                    duration={26}
                    delay={2}
                />

                <div className="relative mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-20 md:py-28 lg:px-8 lg:py-32">
                    <FadeIn className="flex flex-col items-center">
                        {/* --- Logo seal: large emblem with double rings + gold glow --- */}
                        <div className="relative">
                            <span
                                className="pointer-events-none absolute -inset-10 rounded-full bg-[#FED421]/20 blur-2xl sm:-inset-12"
                                aria-hidden="true"
                            />
                            <span
                                className="pointer-events-none absolute -inset-7 rounded-full border border-black/[0.06] sm:-inset-9"
                                aria-hidden="true"
                            />
                            <span
                                className="pointer-events-none absolute -inset-3.5 rounded-full border border-[#d9a900]/40 sm:-inset-5"
                                aria-hidden="true"
                            />
                            <LogoMark className="relative h-24 w-24 sm:h-32 sm:w-32" />
                        </div>

                        {/* --- Office caption --- */}
                        <div className="mt-9 text-center sm:mt-10">
                            <Eyebrow>Extension &amp; Social Development</Eyebrow>
                            <p
                                className="mt-3.5 text-[11px] font-semibold uppercase tracking-[0.32em] text-slate-400 sm:text-xs"
                                style={F_TITLE}
                            >
                                City College of Cagayan de Oro
                            </p>
                        </div>

                        {/* --- Headline --- */}
                        <h2
                            className="mt-8 text-center font-bold leading-[1.12] tracking-tight text-[#0f2415]"
                            style={{ ...F_TITLE, ...CLAMP_H2 }}
                        >
                            Service that reaches{' '}
                            <span className="relative inline-block">
                                <span
                                    className="absolute inset-x-0 bottom-1 z-0 h-3 bg-[#FED421]/70 md:h-4"
                                    aria-hidden="true"
                                />
                                <span className="relative text-[#0a6b1c]">beyond</span>
                            </span>{' '}
                            the classroom.
                        </h2>

                        <span
                            className="mt-8 block h-[3px] w-16 rounded-full bg-[#d9a900]"
                            aria-hidden="true"
                        />

                        {/* --- Paragraph --- */}
                        <p
                            className="mt-8 max-w-2xl text-center text-[15px] leading-[2] text-slate-600 sm:text-base md:text-lg"
                            style={F_BODY}
                        >
                            The City College of Cagayan de Oro believes that education must reach
                            beyond the four walls of the classroom. Through the dedication of our
                            faculty and staff, we bring needs-based programs straight to the
                            communities we serve.
                        </p>
                    </FadeIn>

                    <FadeIn delay={0.15} className="mt-12 md:mt-14">
                        <Ornament />
                    </FadeIn>
                </div>
            </section>

            {/* ============================ OFFICE LEADERSHIP ============================ */}
            <section className="relative overflow-hidden">
                <Aurora
                    className="-left-32 top-1/3 h-80 w-80 bg-[#1d8a35]/[0.08] sm:h-96 sm:w-96"
                    duration={24}
                    delay={1}
                />
                <Aurora
                    className="-right-32 bottom-1/4 h-72 w-72 bg-[#FED421]/[0.1] sm:h-80 sm:w-80"
                    duration={28}
                    delay={3}
                />

                <div className="relative mx-auto max-w-6xl px-4 pb-16 pt-4 sm:px-6 sm:pb-20 md:pb-28 lg:px-8">
                    <FadeIn className="mx-auto max-w-2xl text-center">
                        <Eyebrow>The Office</Eyebrow>
                        <h2
                            className="mt-7 font-bold leading-[1.15] tracking-tight text-[#0f2415]"
                            style={{ ...F_TITLE, fontSize: 'clamp(1.9rem, 3.5vw, 3.25rem)' }}
                        >
                            The people behind{' '}
                            <span className="text-[#a3840a]">the mission</span>
                        </h2>
                        <p
                            className="mx-auto mt-5 max-w-xl text-[15px] leading-[1.9] text-slate-600 sm:text-base"
                            style={F_BODY}
                        >
                            The {OFFICE.name} Office leads the planning, implementation, and
                            monitoring of the College&apos;s extension programs — forging
                            partnerships that serve the communities of Cagayan de Oro.
                        </p>
                    </FadeIn>

                    {/* --- Director (featured tier) --- */}
                    <FadeIn className="mt-12 sm:mt-14">
                        <DirectorSpotlight person={OFFICE.director} />
                    </FadeIn>

                    {/* --- Coordinator + Focal Persons: one uniform grid --- */}
                    <FadeIn delay={0.05} className="mt-14 sm:mt-16">
                        <div className="flex items-center justify-center gap-3">
                            <span className="h-px w-8 bg-[#dfe3d8]" aria-hidden="true" />
                            <span
                                className="text-[9px] font-bold uppercase tracking-[0.35em] text-slate-400 sm:text-[10px]"
                                style={F_TITLE}
                            >
                                Coordinator &amp; College Focal Persons
                            </span>
                            <span className="h-px w-8 bg-[#dfe3d8]" aria-hidden="true" />
                        </div>
                    </FadeIn>

                    <div className="mx-auto mt-10 grid max-w-5xl grid-cols-2 justify-items-center gap-x-5 gap-y-12 sm:gap-x-8 lg:grid-cols-4">
                        {TEAM_GRID.map((person, index) => (
                            <TeamCard
                                key={person.name}
                                person={person}
                                tone={person.role === 'Coordinator' ? 'green' : 'sage'}
                                index={index}
                            />
                        ))}
>>>>>>> 2cf9d51e5434aeb7afe326f15ca53ec6483adc62
                    </div>
                </div>
            </section>

<<<<<<< HEAD
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
=======
            {/* ============================ PROGRAM DIRECTORY ============================ */}
            <section className="relative">
                {/* Clipped decoration layer — keeps sticky working */}
                <div
                    className="pointer-events-none absolute inset-0 overflow-hidden"
                    aria-hidden="true"
                >
                    <Aurora
                        className="-top-40 left-1/2 h-[26rem] w-[36rem] -translate-x-1/2 bg-[#1d8a35]/[0.07] sm:h-[30rem] sm:w-[44rem]"
                        duration={28}
                    />
                </div>

                <div className="relative mx-auto max-w-7xl px-4 pb-20 pt-12 sm:px-6 sm:pb-24 md:pb-32 md:pt-16 lg:px-8">
                    <FadeIn className="mx-auto max-w-3xl text-center">
                        <Eyebrow>The Directory</Eyebrow>
                        <h2
                            className="mt-7 font-bold leading-[1.15] tracking-tight text-[#0f2415]"
                            style={{ ...F_TITLE, fontSize: 'clamp(1.9rem, 3.5vw, 3.25rem)' }}
                        >
                            Projects &amp; <span className="text-[#a3840a]">Programs</span>
                        </h2>
                        <p
                            className="mx-auto mt-5 max-w-xl text-[15px] leading-[1.9] text-slate-600 sm:text-base"
                            style={F_BODY}
                        >
                            Browse the College&apos;s extension portfolio — select a program from
                            the index to view its full profile and proponents.
                        </p>

                        {/* Typographic figures */}
                        <div className="mx-auto mt-10 flex max-w-3xl flex-col items-center gap-6 sm:mt-12 sm:flex-row sm:justify-center sm:gap-0 sm:divide-x sm:divide-[#dde3d6]">
                            {[
                                { value: TOTAL_PROJECTS, label: 'Projects & Programs' },
                                { value: TOTAL_OFFICES, label: 'Colleges & Offices' },
                                { value: TOTAL_EXTENSIONISTS, label: 'Extensionists' },
                            ].map((stat) => (
                                <div
                                    key={stat.label}
                                    className="flex flex-col items-center px-0 sm:px-10 lg:px-12"
                                >
                                    <span
                                        className="text-4xl font-bold tracking-tight text-[#086618] sm:text-5xl"
                                        style={F_BODY}
                                    >
                                        {stat.value}
                                    </span>
                                    <span
                                        className="mt-2 text-[9px] font-semibold uppercase tracking-[0.3em] text-slate-400 sm:text-[10px]"
                                        style={F_TITLE}
                                    >
                                        {stat.label}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </FadeIn>

                    <FadeIn delay={0.1} className="mt-12 sm:mt-14">
                        <ProgramDirectory projects={extensionProjects} />
                    </FadeIn>
>>>>>>> 2cf9d51e5434aeb7afe326f15ca53ec6483adc62
                </div>
            </section>
        </MainLayout>
    );
}