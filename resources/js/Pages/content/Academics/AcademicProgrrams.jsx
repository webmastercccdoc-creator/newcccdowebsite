import { useEffect, useState, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MainLayout from '../../../layouts/MainLayout';

// --- Banner / imagery ---
import acadHero from '../../../assets/banner/ovpacads-banner.png';
import casBanner from '../../../assets/banner/cas-banner.png';
import cbmBanner from '../../../assets/banner/cbm-banner.png';
import coeBanner from '../../../assets/banner/coe-banner.png';
import tstiBanner from '../../../assets/banner/tsti-banner.png';
import acad_bg from '../../../assets/images/prog_bg.png';

// --- Program head / dean photos ---
import drDonnaCotejoPhoto from '../../../assets/images/DR_DONNA_COTEJO.png';
import deanOrbetaPhoto from '../../../assets/images/Dr_Rowena_Orbeta.jpg';
import deanChuaPhoto from '../../../assets/images/Dr_Liza_Chua.png';
import karlPiosPhoto from '../../../assets/images/TSTI Trainers/karl-image.png';

// --- Background tokens (matches the program pages) ---
const PANEL = '#F3EFE4';
const HAIRLINE = '#D8D2C4';

// --- Premium sub-components (shared style with program pages) ---
const MaskedText = ({ text, className = '' }) => (
    <span className={`relative inline-block overflow-hidden ${className}`}>
        <motion.span
            initial={{ y: '110%' }}
            whileInView={{ y: '0%' }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.9, ease: [0.33, 1, 0.68, 1] }}
            className="inline-block"
        >
            {text}
        </motion.span>
    </span>
);

const Kicker = ({ children, textClass = 'text-emerald-600', ruleClass = 'bg-emerald-600', align = 'left' }) => (
    <div className={`flex items-center gap-3 mb-3 ${align === 'center' ? 'justify-center' : ''}`}>
        <span className={`w-8 h-px ${ruleClass}`} />
        <span className={`text-[13px] italic font-serif ${textClass}`}>{children}</span>
        {align === 'center' && <span className={`w-8 h-px ${ruleClass}`} />}
    </div>
);

// --- Program data ----------------------------------------------------------
const PROGRAMS = [
    {
        id: 'cas',
        code: 'CAS',
        name: 'College of Arts and Sciences',
        banner: casBanner,
        route: '/programs/college-of-arts-and-sciences',
        accent: 'emerald',
        accentHex: '#047857',
        leader: {
            name: 'Dr. Donna Grace I. Cotejo',
            role: 'Dean, College of Arts and Sciences',
            photo: drDonnaCotejoPhoto,
        },
        offerings: [
            {
                name: 'Bachelor of Arts in Communication',
                description: "An outcomes-based undergraduate program that develops students' knowledge and skills in communication theory and practice across media, culture, organization, and community contexts.",
            },
            {
                name: 'Bachelor of Science in Social Work',
                description: 'A professional undergraduate program that prepares students to promote well-being, justice, and community development through ethical, people-centered social work practice.',
            },
        ],
        departments: ['BACOMM', 'BSSW', 'GEN ED', 'P.E.', 'NSTP'],
        focus: ['Communication Theory', 'Media Production', 'Community Development', 'Social Welfare'],
        stats: { programs: 2, departments: 5, faculty: 35 },
    },
    {
        id: 'cbm',
        code: 'CBM',
        name: 'College of Business and Management',
        banner: cbmBanner,
        route: '/programs/college-of-business-and-management',
        accent: 'amber',
        accentHex: '#B45309',
        leader: {
            name: 'Dr. Rowena R. Orbeta',
            role: 'Dean, College of Business Management',
            photo: deanOrbetaPhoto,
        },
        offerings: [
            {
                name: 'Bachelor of Science in Entrepreneurship',
                description: 'Designed to develop innovative, opportunity-driven individuals capable of creating, managing, and growing sustainable business ventures. Emphasizes entrepreneurial mindset development, business planning, marketing, financial management, innovation, and strategic decision-making.',
            },
            {
                name: 'Bachelor of Science in Office Administration',
                description: 'A four-year degree program that develops highly competent administrative professionals equipped with strong organizational, communication, and managerial skills. Focuses on office management, records management, business correspondence, information technology, customer relations, and workplace ethics.',
            },
        ],
        departments: ['BSE', 'BSOA'],
        focus: ['Business Planning', 'Financial Management', 'Office Management', 'Innovation'],
        stats: { programs: 2, departments: 2, faculty: 6 },
    },
    {
        id: 'coe',
        code: 'COE',
        name: 'College of Education',
        banner: coeBanner,
        route: '/programs/college-of-education',
        accent: 'blue',
        accentHex: '#1D4ED8',
        leader: {
            name: 'Dr. Liza L. Chua',
            role: 'Dean, College of Education',
            photo: deanChuaPhoto,
        },
        offerings: [
            {
                name: 'Bachelor of Technical-Vocational Teacher Education',
                description: 'Prepares future teachers and trainers for vocational and technical education through a balanced foundation in teaching theory, technology, and practical industry experience. Graduates are equipped to teach TLE in Grades 9-10, the TVL track in senior high school, TVET, and related higher education programs.',
            },
            {
                name: 'Bachelor of Technology and Livelihood Education',
                description: 'Develops competent teachers for Technology and Livelihood Education through integrated theoretical and practical training. The program prepares graduates to teach TLE in Grades 4-8 and support learners in building useful technology, livelihood, and entrepreneurial skills.',
            },
        ],
        departments: ['BTVTED', 'BTLED', 'Professional Education', 'General Education', 'PATHFIT'],
        focus: ['TLE & TVL Instruction', 'TVET', 'Practical Training', 'Pedagogy'],
        stats: { programs: 2, departments: 5, faculty: 30 },
    },
    {
        id: 'tsti',
        code: 'TSTI',
        name: 'Technical Skills & Technology Institute',
        banner: tstiBanner,
        route: '/programs/technical-skill-technology',
        accent: 'emerald',
        accentHex: '#047857',
        leader: {
            name: 'Karl Hein M. Pios, LPT',
            role: 'Vocational School Administrator',
            photo: karlPiosPhoto,
        },
        offerings: [
            {
                name: 'Electrical Installation & Maintenance (EIM) NC II',
                description: 'Equips learners with the competencies to install, maintain, and troubleshoot electrical wiring systems, fixtures, and equipment in residential, commercial, and industrial settings in accordance with the Philippine Electrical Code and TESDA standards.',
            },
            {
                name: 'Shielded Metal Arc Welding (SMAW) NC I & NC II',
                description: 'A hands-on welding program covering arc welding techniques on carbon steel plates and pipes, weld inspection, and safety procedures. Learners are trained for both community-based and institution-based delivery, including the Mobile Training Program (MTP).',
            },
            {
                name: 'Carpentry NC II',
                description: 'Trains learners in layout, cutting, assembling, and installing wooden structures and fixtures using hand and power tools, following occupational health and safety standards for construction sites.',
            },
            {
                name: 'Plumbing NC I & NC II',
                description: 'Covers the installation, repair, and maintenance of water supply, drainage, and venting systems for residential and commercial buildings, including pipe fitting, fixtures installation, and leak testing.',
            },
            {
                name: 'Construction Painting NC II',
                description: 'Trains learners in surface preparation, paint mixing, and the application of decorative and protective coatings on interior and exterior building surfaces. It covers the proper use of brushes, rollers, and spray equipment, along with safety and quality standards for construction painting works.',
            },
            {
                name: 'Housekeeping NC II & NC III',
                description: 'Develops skills in guest room preparation, cleaning, laundry operations, and guest relations. Graduates are equipped for employment in hotels, resorts, and other hospitality establishments. Offered through institution-based and community-based delivery modes.',
            },
            {
                name: 'Barangay Health Services NC II',
                description: 'Prepares learners to deliver basic health care services at the barangay level, including health promotion, disease prevention, maternal and child care, and first aid. Graduates are equipped to serve as barangay health workers and community health aides in partnership with local government units and rural health units.',
            },
            {
                name: 'Events Management Services NC III',
                description: "Equips learners with the competencies to plan, organize, and coordinate events such as conferences, weddings, corporate gatherings, and community activities. It covers client relations, budgeting, logistics, supplier coordination, and on-site event execution following TESDA's Events Management Services NC III standards.",
            },
            {
                name: 'Bookkeeping NC III',
                description: "Equips learners with the knowledge and skills to record financial transactions, prepare reports, and maintain books of accounts for small businesses, following the Philippine Financial Reporting Standards (PFRS) for micro and small enterprises. Graduates are prepared for TESDA's Bookkeeping NC III assessment.",
            },
            {
                name: "Trainer's Methodology Level I",
                description: "Equips aspiring and practicing TVET trainers with the competencies to plan and prepare training sessions, facilitate learning, maintain training facilities, and assess learner progress. It is a prerequisite qualification for nationally certified TVET trainers under TESDA's Philippine TVET Trainers Qualifications Framework.",
            },
        ],
        departments: ['Construction', 'Tourism', 'Health Care', 'Trainer’s Methodology'],
        focus: ['Electrical Wiring', 'Arc Welding', 'Guest Room Prep', 'TVET Standards'],
        stats: { programs: 10, departments: 7, faculty: 20 },
    },
];

const FILTERS = [
    { id: 'all', label: 'All Programs' },
    { id: 'degree', label: 'Degree Programs', match: (p) => p.id !== 'tsti' },
    { id: 'tvet', label: 'TVET / Certificate', match: (p) => p.id === 'tsti' },
];

// --- Program card ----------------------------------------------------------
const ProgramCard = ({ program, idx }) => (
    <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ delay: idx * 0.08, duration: 0.55, ease: [0.33, 1, 0.68, 1] }}
        className="group relative flex flex-col bg-white rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden"
    >
        {/* Accent bar */}
        <div className="h-[4px] w-full" style={{ background: program.accentHex }} />

        {/* Banner strip */}
        <div className="relative w-full aspect-[16/9] overflow-hidden bg-slate-200">
            <img
                src={program.banner}
                alt={program.name}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <span
                className="absolute top-3 left-3 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-[0.16em] text-white shadow-md"
                style={{ background: program.accentHex }}
            >
                {program.code}
            </span>
            <h3 className="absolute bottom-3 left-4 right-4 text-white vp-serif font-bold text-lg md:text-xl leading-tight drop-shadow-md">
                {program.name}
            </h3>
        </div>

        {/* Body */}
        <div className="flex flex-col flex-1 p-5 md:p-6">
            {/* Complete program offerings */}
            <div>
                <p className="text-[10px] uppercase tracking-[0.14em] text-slate-400 font-bold mb-2">
                    All Programs Offered ({program.offerings.length})
                </p>
                <div className="space-y-4">
                    {program.offerings.map((offering) => (
                        <div
                            key={offering.name}
                            className="border-l-2 pl-3"
                            style={{ borderColor: `${program.accentHex}80` }}
                        >
                            <h4 className="text-sm font-bold text-slate-800 leading-snug">
                                {offering.name}
                            </h4>
                            <p className="mt-1.5 text-sm text-slate-600 leading-relaxed">
                                {offering.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="mt-5">
                <p className="text-[10px] uppercase tracking-[0.14em] text-slate-400 font-bold mb-2">
                    Departments and Sectors
                </p>
                <ul className="flex flex-wrap gap-2">
                    {program.departments.map((department) => (
                        <li
                            key={department}
                            className="px-2.5 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-700"
                        >
                            {department}
                        </li>
                    ))}
                </ul>
            </div>

            {/* Leader */}
            <div className="mt-5 pt-4 border-t border-slate-100 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full overflow-hidden bg-slate-100 ring-2 ring-white shadow-sm flex-shrink-0">
                    <img
                        src={program.leader.photo}
                        alt={program.leader.name}
                        loading="lazy"
                        className="w-full h-full object-cover object-top"
                    />
                </div>
                <div className="min-w-0">
                    <p className="text-xs font-bold text-slate-800">{program.leader.name}</p>
                    <p className="text-[10px] uppercase tracking-wider text-slate-400">
                        {program.leader.role}
                    </p>
                </div>
            </div>

            {/* CTA */}
            <a
                href={program.route}
                className="mt-5 inline-flex items-center justify-between gap-2 w-full px-4 py-2.5 rounded-xl text-sm font-semibold text-white transition-colors duration-300"
                style={{ background: program.accentHex }}
            >
                Explore {program.code}
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
            </a>
        </div>
    </motion.div>
);

// --- Main component --------------------------------------------------------
export default function AcademicPrograms() {
    const [imageError, setImageError] = useState(false);
    const [activeFilter, setActiveFilter] = useState('all');
    const heroRef = useRef(null);

    useEffect(() => {
        document.title = 'Academic Programs - City College of Cagayan de Oro';
    }, []);

    const filteredPrograms = useMemo(() => {
        const filter = FILTERS.find((f) => f.id === activeFilter);
        if (!filter || !filter.match) return PROGRAMS;
        return PROGRAMS.filter(filter.match);
    }, [activeFilter]);

    const totals = useMemo(
        () =>
            PROGRAMS.reduce(
                (acc, p) => ({
                    programs: acc.programs + p.stats.programs,
                    departments: acc.departments + p.stats.departments,
                    faculty: acc.faculty + p.stats.faculty,
                    colleges: acc.colleges + 1,
                }),
                { programs: 0, departments: 0, faculty: 0, colleges: 0 }
            ),
        []
    );

    return (
        <MainLayout
            maxWidth="full"
            containerClassName="px-0"
            mainClassName="py-0"
            className="overflow-x-hidden pb-0 bg-slate-50"
        >
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&family=Inter:wght@400;500;600;700;800&display=swap');
                body { font-family: 'Inter', ui-sans-serif, system-ui, sans-serif; background-color: #F8FAFC; }
                .vp-serif { font-family: 'Fraunces', ui-serif, Georgia, serif; }
            `}</style>

            {/* === HERO === */}
            <div
                ref={heroRef}
                className="relative w-full bg-cover bg-center bg-no-repeat shadow-lg min-h-[380px] md:min-h-[480px] lg:min-h-[560px] flex items-center justify-center"
                style={{
                    backgroundImage: imageError ? 'none' : `url(${acadHero})`,
                    backgroundColor: imageError ? '#0f172a' : 'transparent',
                    backgroundPosition: 'center 30%',
                    backgroundSize: 'cover',
                }}
            >
                {imageError && <div className="absolute inset-0 bg-gradient-to-r from-slate-900 to-emerald-900" />}
                <div className="absolute inset-0 bg-black/55" />

                <motion.div
                    className="relative z-10 mx-auto max-w-5xl px-6 text-center"
                    initial="hidden"
                    animate="visible"
                    variants={{ visible: { transition: { staggerChildren: 0.2 } } }}
                >
                    <motion.span
                        variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                        className="inline-block text-[11px] font-bold uppercase tracking-[0.24em] text-amber-300 mb-4"
                    >
                        Academics
                    </motion.span>
                    <motion.h1
                        variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}
                        className="text-4xl font-bold tracking-tight text-white drop-shadow-md sm:text-5xl md:text-6xl vp-serif"
                    >
                        Our Academic Programs
                    </motion.h1>
                    <motion.p
                        variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}
                        className="mx-auto mt-4 max-w-2xl text-base md:text-lg text-white/90 drop-shadow-md"
                    >
                        Four colleges. Endless possibilities. Discover the degree programs and technical-vocational
                        qualifications that will shape your future at the City College of Cagayan de Oro.
                    </motion.p>
                </motion.div>
            </div>

            {/* === STATS STRIP === */}
            <div className="relative -mt-10 z-20 max-w-6xl mx-auto px-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                    {[
                        { label: 'Colleges', value: totals.colleges },
                        { label: 'Programs', value: totals.programs },
                        { label: 'Departments', value: totals.departments },
                        { label: 'Faculty & Trainers', value: `${totals.faculty}+` },
                    ].map((stat, i) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.08, duration: 0.5 }}
                            className="bg-white rounded-2xl border border-slate-200/80 shadow-md p-4 md:p-5 text-center"
                        >
                            <p className="text-2xl md:text-3xl font-bold vp-serif text-emerald-700">{stat.value}</p>
                            <p className="mt-1 text-[10px] md:text-[11px] font-bold uppercase tracking-[0.14em] text-slate-400">
                                {stat.label}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* === PROGRAM DIRECTORY === */}
            <section className="relative py-20 md:py-28">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-10">
                        <Kicker textClass="text-amber-600" ruleClass="bg-amber-500" align="center">
                            Explore
                        </Kicker>
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mt-1 vp-serif">
                            <MaskedText text="Colleges & Institutes" />
                        </h2>
                        <p className="mx-auto mt-3 max-w-2xl text-sm md:text-base text-slate-500 leading-relaxed">
                            Each college and institute offers distinct programs designed to prepare students for
                            meaningful careers, community engagement, and lifelong learning.
                        </p>
                    </div>

                    {/* Filter pills */}
                    <div className="flex flex-wrap items-center justify-center gap-2.5 mb-10 md:mb-14">
                        {FILTERS.map((filter) => {
                            const isActive = activeFilter === filter.id;
                            return (
                                <button
                                    key={filter.id}
                                    onClick={() => setActiveFilter(filter.id)}
                                    aria-pressed={isActive}
                                    className={`px-5 py-2.5 rounded-full text-[12px] font-bold uppercase tracking-[0.12em] border transition-all duration-300 ${
                                        isActive
                                            ? 'bg-emerald-700 text-white border-amber-400 shadow-md shadow-emerald-900/10'
                                            : 'bg-white text-slate-500 border-slate-200 hover:border-emerald-300 hover:text-emerald-700'
                                    }`}
                                >
                                    {filter.label}
                                </button>
                            );
                        })}
                    </div>

                    {/* Cards */}
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeFilter}
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -16 }}
                            transition={{ duration: 0.35, ease: 'easeOut' }}
                            className="grid grid-cols-1 lg:grid-cols-2 gap-6"
                        >
                            {filteredPrograms.map((program, idx) => (
                                <ProgramCard key={program.id} program={program} idx={idx} />
                            ))}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </section>

            {/* === LEADERSHIP SHOWCASE === */}
            <section
                className="relative py-20 md:py-28 overflow-hidden"
                style={{ backgroundColor: PANEL, borderTop: `1px solid ${HAIRLINE}`, borderBottom: `1px solid ${HAIRLINE}` }}
            >
                <div
                    className="absolute inset-0 opacity-40 pointer-events-none"
                    style={{
                        backgroundImage: `radial-gradient(${HAIRLINE} 1px, transparent 1px)`,
                        backgroundSize: '28px 28px',
                    }}
                />
                <div className="relative max-w-7xl mx-auto px-6">
                    <div className="text-center mb-12">
                        <Kicker textClass="text-blue-600" ruleClass="bg-blue-600" align="center">
                            Leadership
                        </Kicker>
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mt-1 vp-serif">
                            <MaskedText text="Meet the Deans & Administrators" />
                        </h2>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
                        {PROGRAMS.map((program, idx) => (
                            <motion.div
                                key={program.id}
                                initial={{ opacity: 0, y: 24 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.2 }}
                                transition={{ delay: idx * 0.08, duration: 0.55 }}
                                className="group flex flex-col items-center"
                            >
                                <div className="relative w-full max-w-[180px]">
                                    <div className="relative z-10 rounded-xl p-1.5 bg-white border border-slate-100 shadow-md transition-all duration-500 group-hover:shadow-xl">
                                        <div className="overflow-hidden rounded-lg w-full aspect-[4/5] bg-slate-100">
                                            <img
                                                src={program.leader.photo}
                                                alt={program.leader.name}
                                                loading="lazy"
                                                className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                                            />
                                        </div>
                                    </div>
                                    <div
                                        className="absolute inset-0 z-0 rounded-xl translate-x-1.5 translate-y-1.5 border-2"
                                        style={{ borderColor: `${program.accentHex}80` }}
                                    />
                                </div>
                                <h3 className="mt-5 text-sm md:text-base vp-serif font-bold text-slate-800 text-center leading-tight">
                                    {program.leader.name}
                                </h3>
                                <p
                                    className="mt-1 text-[10px] md:text-[11px] font-bold uppercase tracking-[0.12em] text-center"
                                    style={{ color: program.accentHex }}
                                >
                                    {program.leader.role}
                                </p>
                                <span className="mt-3 h-px w-10 bg-slate-300" />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* === CURRICULUM SNAPSHOT / QUICK LINKS === */}
            <section
                className="relative py-20 md:py-28 overflow-hidden bg-cover bg-no-repeat"
                style={{
                    backgroundImage: `url(${acad_bg})`,
                    backgroundColor: PANEL,
                    backgroundPosition: 'center top',
                    backgroundSize: '100% auto',
                    backgroundRepeat: 'no-repeat',
                }}
            >
                <div className="relative max-w-6xl mx-auto px-6 z-10">
                    <div className="text-center mb-12">
                        <Kicker textClass="text-amber-600" ruleClass="bg-amber-500" align="center">
                            Quick Reference
                        </Kicker>
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mt-1 vp-serif drop-shadow-[0_2px_5px_rgba(255,255,255,0.8)]">
                            <MaskedText text="Programs at a Glance" />
                        </h2>
                    </div>

                    <div className="grid gap-4">
                        {PROGRAMS.map((program, idx) => (
                            <motion.div
                                key={program.id}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, amount: 0.3 }}
                                transition={{ delay: idx * 0.08, duration: 0.5 }}
                                className="bg-white/90 backdrop-blur-sm rounded-2xl border border-white/60 shadow-lg overflow-hidden"
                            >
                                <div className="grid md:grid-cols-12 items-center">
                                    <div className="md:col-span-3 p-5 md:p-6 flex items-center gap-3">
                                        <span
                                            className="w-1.5 h-12 rounded-full flex-shrink-0"
                                            style={{ background: program.accentHex }}
                                        />
                                        <div>
                                            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">
                                                {program.code}
                                            </p>
                                            <p className="text-sm md:text-base font-bold vp-serif text-slate-800 leading-tight">
                                                {program.name}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="md:col-span-7 px-5 md:px-0 py-3 md:py-6">
                                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                            {program.focus.map((f) => (
                                                <span
                                                    key={f}
                                                    className="text-[11px] font-medium text-slate-600 bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-center"
                                                >
                                                    {f}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="md:col-span-2 p-5 md:p-6 flex md:justify-end">
                                        <a
                                            href={program.route}
                                            className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.12em] transition-colors"
                                            style={{ color: program.accentHex }}
                                        >
                                            View Programs
                                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                            </svg>
                                        </a>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* === CTA === */}
            <section className="relative py-20 md:py-24 bg-emerald-800 text-white overflow-hidden">
                <div
                    className="absolute inset-0 opacity-[0.05] pointer-events-none"
                    style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '24px 24px' }}
                />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] bg-amber-400/10 rounded-full blur-[120px]" />

                <div className="relative max-w-3xl mx-auto px-6 text-center">
                    <Kicker textClass="text-amber-300" ruleClass="bg-amber-300" align="center">
                        Ready to Begin?
                    </Kicker>
                    <h2 className="text-3xl md:text-4xl font-bold vp-serif mb-4">
                        Find the program that fits your future.
                    </h2>
                    <p className="text-white/85 leading-relaxed mb-8">
                        Whether you're drawn to the arts, driven by business, passionate about teaching, or ready to
                        master a technical skill — there's a path for you at CCCDO.
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-3">
                        <a
                            href="/apply"
                            className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-amber-400 text-slate-900 font-bold hover:bg-amber-300 transition-colors duration-300 shadow-lg shadow-amber-500/30"
                        >
                            Apply for Admission
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                        </a>
                        <a
                            href="/contact-us"
                            className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-white/10 border border-white/30 text-white font-semibold hover:bg-white/20 transition-colors duration-300 backdrop-blur-sm"
                        >
                            Contact Us
                        </a>
                    </div>
                </div>
            </section>
        </MainLayout>
    );
}