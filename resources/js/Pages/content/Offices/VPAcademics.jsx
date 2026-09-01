import { useEffect, useMemo, useRef, useState } from 'react';
import MainLayout from '../../../layouts/MainLayout';
import ovpacadsBanner from '../../../assets/banner/ovpacads-banner.png';
import AnimatedBannerText from '../../../components/content/AnimatedBannerText';
import ccdologo from '../../../assets/logos/ccdologo.png';

/* ============================================================================
   PLACEHOLDER CONTENT — To be updated with actual VP for Academics information.
   ============================================================================ */
const BIONOTE_PARAGRAPHS = [
    <>The Vice President for Academics provides strategic leadership and direction for all academic programs at the City College of Cagayan de Oro. This section will feature their professional background, educational attainments, and commitment to advancing academic excellence.</>,
    <>With a strong focus on curriculum innovation, faculty development, and student success, the VP for Academics ensures that the institution maintains high standards of teaching and learning. Further biographical details will be provided here.</>,
    <>Information regarding their previous administrative roles, teaching experience, and contributions to higher education will be highlighted in this paragraph.</>,
    <>Their research interests, academic philosophies, and strategic goals for the academic community will be outlined in this final section once available.</>,
];

const BIONOTE_PREVIEW_COUNT = 2;

const CREDENTIALS = [
    {
        title: 'Academic Background',
        lines: ['To be determined', 'TBD'],
        icon: (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.75"
                d="M12 14l9-5-9-5-9 5 9 5z M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
        ),
    },
    {
        title: 'Academic Leadership',
        lines: ['To be determined', 'TBD'],
        icon: (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.75"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        ),
    },
    {
        title: 'Research & Extension',
        lines: ['To be determined', 'TBD'],
        icon: (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.75"
                d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m5-2.13a4 4 0 100-8 4 4 0 000 8z" />
        ),
    },
    {
        title: 'Published Works',
        lines: ['To be determined', 'TBD'],
        icon: (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.75"
                d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
        ),
    },
];

const PROFILE_QUOTE =
    'Dedicated to fostering a culture of academic rigor, innovative instruction, and holistic student development.';

const STATS = [
    {
        label: 'Oversees',
        value: 'TBD',
        caption: 'Academic Departments',
        icon: (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.75"
                d="M3 21h18M5 21V7l7-4 7 4v14M9 21v-6h6v6" />
        ),
    },
    {
        label: 'Manages',
        value: 'TBD',
        caption: 'Faculty & Personnel',
        icon: (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.75"
                d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m5-2.13a4 4 0 100-8 4 4 0 000 8zm6 1a4 4 0 10-1-7.87" />
        ),
    },
    {
        label: 'Ensures',
        value: 'TBD',
        caption: 'Curriculum Standards',
        icon: (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.75"
                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        ),
    },
    {
        label: 'Driven by',
        value: 'TBD',
        caption: 'Academic Excellence',
        icon: (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.75"
                d="M12 21a9 9 0 100-18 9 9 0 000 18zM12 16a4 4 0 100-8 4 4 0 000 8zM12 13a1 1 0 100-2 1 1 0 000 2z" />
        ),
    },
];

const OFFICES = [
    {
        id: 'registrar',
        label: 'Registrar',
        name: 'Registrar Office',
        description:
            'Sample placeholder text: The Registrar Office handles student records, enrollment, academic scheduling, grading, and credential verification.',
        functions: [
            'Student Records Management',
            'Enrollment and Registration',
            'Academic Scheduling',
            'Graduation Processing',
            'Credential Verification',
            'Transcripts and Documents',
        ],
        orgChart: [
            { title: 'Vice President', nodes: ['VP for Academics'] },
            { title: 'Office Head', nodes: ['University/College Registrar'] },
            { title: 'Staff', nodes: ['Assistant Registrars', 'Records Staff'] },
        ],
        icon: (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.75"
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        ),
    },
    {
        id: 'departments',
        label: 'Departments',
        name: 'Academic Departments',
        description:
            'Sample placeholder text: Oversees all academic departments, ensuring curriculum standards, faculty development, and instructional quality across various disciplines.',
        functions: [
            'Curriculum Development',
            'Faculty Management & Development',
            'Instructional Design',
            'Student Assessment',
            'Program Accreditation',
            'Academic Advising',
        ],
        orgChart: [
            { title: 'Vice President', nodes: ['VP for Academics'] },
            { title: 'Office Head', nodes: ['Deans / Department Chairs'] },
            { title: 'Staff', nodes: ['Faculty Members', 'Academic Coordinators'] },
        ],
        icon: (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.75"
                d="M12 14l9-5-9-5-9 5 9 5z M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
        ),
    },
    {
        id: 'research',
        label: 'Research',
        name: 'Research & Extension',
        description:
            'Sample placeholder text: Coordinates institutional research initiatives, community extension programs, and scholarly publications to foster a strong research culture.',
        functions: [
            'Research Oversight',
            'Extension Programs',
            'Community Partnerships',
            'Scholarly Publications',
            'Research Funding & Grants',
            'Conferences & Seminars',
        ],
        orgChart: [
            { title: 'Vice President', nodes: ['VP for Academics'] },
            { title: 'Office Head', nodes: ['Director of Research & Extension'] },
            { title: 'Staff', nodes: ['Research Coordinators', 'Extension Staff'] },
        ],
        icon: (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.75"
                d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        ),
    },
];

const BIONOTE_ICON = (
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.75"
        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
);

const TABS = [
    { id: 'bionote', label: 'Bionote', icon: BIONOTE_ICON },
    ...OFFICES.map((o) => ({ id: o.id, label: o.label, icon: o.icon })),
];

/* Scroll Reveal Hook */
function useRevealOnScroll(threshold = 0.15) {
    const ref = useRef(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const node = ref.current;
        if (!node) return;
        if (typeof IntersectionObserver === 'undefined') {
            setVisible(true);
            return;
        }
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setVisible(true);
                    observer.disconnect();
                }
            },
            { threshold }
        );
        observer.observe(node);
        return () => observer.disconnect();
    }, [threshold]);

    return [ref, visible];
}

/* Reusable Reveal Wrapper */
function Reveal({ children, delay = 0, className = '' }) {
    const [ref, visible] = useRevealOnScroll(0.1);
    return (
        <div
            ref={ref}
            className={`transition-all duration-700 ease-out ${className} ${
                visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: `${delay}ms` }}
        >
            {children}
        </div>
    );
}

function OfficeOrgChart({ levels }) {
    return (
        <div className="flex flex-col items-center">
            {levels.map((level, levelIndex) => (
                <div key={level.title} className="w-full flex flex-col items-center relative">
                    {levelIndex > 0 && (
                        <div className="flex flex-col items-center mb-4" aria-hidden="true">
                            <div className="w-px h-8 bg-gray-300" />
                        </div>
                    )}
                    <p className="text-[11px] font-bold tracking-[0.2em] text-amber-700 uppercase mb-4 font-sans">
                        {level.title}
                    </p>
                    <div className="flex flex-wrap justify-center gap-4 w-full mb-8">
                        {level.nodes.map((node) => (
                            <div
                                key={node}
                                className="min-w-[180px] px-6 py-4 bg-white border border-gray-200 rounded-lg shadow-sm text-center hover:border-green-700 hover:shadow-md transition-all duration-300 relative group"
                            >
                                <div className="absolute top-0 left-0 w-full h-1 bg-green-700 rounded-t-lg transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                                <span className="text-sm font-semibold text-gray-800">{node}</span>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}

function AnimatedPanel({ children }) {
    const [show, setShow] = useState(false);

    useEffect(() => {
        const id = requestAnimationFrame(() => setShow(true));
        return () => cancelAnimationFrame(id);
    }, []);

    return (
        <div className={`transition-all duration-500 ease-out ${show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}>
            {children}
        </div>
    );
}

export default function VPAcademics() {
    const [scrollProgress, setScrollProgress] = useState(0);
    const [activeTab, setActiveTab] = useState('bionote');
    const [bioExpanded, setBioExpanded] = useState(false);

    useEffect(() => {
        document.title = "VP for Academics - City College of Cagayan de Oro";

        const handleScroll = () => {
            const top = window.pageYOffset;
            const height = document.documentElement.scrollHeight - window.innerHeight;
            const percent = height > 0 ? (top / height) * 100 : 0;
            setScrollProgress(percent);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const activeOffice = useMemo(
        () => OFFICES.find((office) => office.id === activeTab),
        [activeTab]
    );

    const visibleParagraphs = bioExpanded
        ? BIONOTE_PARAGRAPHS
        : BIONOTE_PARAGRAPHS.slice(0, BIONOTE_PREVIEW_COUNT);

    return (
        <MainLayout
            maxWidth="full"
            containerClassName="px-0"
            mainClassName="py-0"
            className="overflow-hidden pb-0"
        >
            {/* Local keyframes and type import */}
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&family=Inter:wght@400;500;600;700;800&display=swap');

                :root {
                    --vp-ink: #1E2A22;
                    --vp-green-950: #0B3D1F;
                    --vp-green-800: #145A32;
                    --vp-green-700: #1B6B3D;
                    --vp-gold: #C79A3E;
                    --vp-gold-dark: #A97F2E;
                    --vp-paper: #FBF9F4;
                    --vp-sage: #EEF2EC;
                }

                .vp-serif { font-family: 'Fraunces', ui-serif, Georgia, serif; }
                .vp-sans { font-family: 'Inter', ui-sans-serif, system-ui, sans-serif; }

                .vp-bio-lead::first-letter {
                    font-family: 'Fraunces', ui-serif, Georgia, serif;
                    font-size: 3.2rem;
                    font-weight: 600;
                    float: left;
                    line-height: 0.8;
                    padding-right: 0.5rem;
                    padding-top: 0.3rem;
                    color: var(--vp-green-800);
                }
            `}</style>

            {/* Scroll Progress Indicator */}
            <div className="fixed top-0 left-0 w-full h-1 z-[1000] bg-transparent">
                <div
                    className="h-full transition-[width] duration-100 ease-out"
                    style={{ width: `${scrollProgress}%`, background: 'linear-gradient(90deg, var(--vp-green-700), var(--vp-gold))' }}
                />
            </div>

            {/* ===================== Hero Banner (UNCHANGED) ===================== */}
            <div 
                className="relative w-full bg-cover bg-center bg-no-repeat shadow-lg min-h-[350px] md:min-h-[450px] lg:min-h-[550px] flex items-center justify-center"
                style={{
                    backgroundImage: `url(${ovpacadsBanner})`
                }}
            >
                {/* Dark Overlay for text readability */}
                <div className="absolute inset-0 bg-black/50"></div>
                
                <AnimatedBannerText
                    title="Vice President for Academics"
                    description="Academic leadership and excellence at the City College of Cagayan de Oro."
                />
            </div>

            {/* ===================== Page Header ===================== */}
            <section className="relative overflow-hidden vp-sans" style={{ background: 'var(--vp-paper)', borderBottom: '1px solid #E7E2D6' }}>
                <svg
                    className="hidden md:block absolute -right-10 top-1/2 -translate-y-1/2 w-[420px] h-[420px] opacity-[0.06] pointer-events-none"
                    style={{ color: 'var(--vp-green-800)' }}
                    viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.5" aria-hidden="true"
                >
                    <path d="M4 21V8l8-5 8 5v13M4 21h16M8 21V11h3v10M13 21V11h3v10M9 14h1M9 17h1M14 14h1M14 17h1" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full blur-3xl opacity-40 pointer-events-none" style={{ background: 'var(--vp-sage)' }} aria-hidden="true" />

                <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-16 pb-11 text-center">
                    <Reveal>
                        <div className="flex items-center justify-center gap-3 mb-4" aria-hidden="true">
                            <span className="h-px w-10" style={{ background: 'var(--vp-gold)' }} />
                            <span className="text-[11px] font-bold tracking-[0.3em] uppercase" style={{ color: 'var(--vp-green-700)' }}>Office of the</span>
                            <span className="h-px w-10" style={{ background: 'var(--vp-gold)' }} />
                        </div>
                        <h2 className="vp-serif text-3xl md:text-[2.75rem] font-semibold tracking-tight" style={{ color: 'var(--vp-green-950)' }}>
                            Vice President for Academics
                        </h2>
                        <p className="mt-3 text-sm tracking-wide text-gray-500">
                            Academic Leadership &nbsp;&middot;&nbsp; Curriculum Innovation &nbsp;&middot;&nbsp; Faculty Excellence
                        </p>
                        <div className="mt-5 flex items-center justify-center gap-1.5" aria-hidden="true">
                            <span className="h-[3px] w-14 rounded-full" style={{ background: 'var(--vp-green-700)' }} />
                            <span className="h-[3px] w-3 rounded-full" style={{ background: 'var(--vp-gold)' }} />
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* ===================== Profile + Tabs ===================== */}
            <section className="vp-sans relative" style={{ background: 'var(--vp-paper)' }}>
                {/* Subtle Background Pattern */}
                <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#145A32 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>

                <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 md:py-20">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">

                        {/* Left: Profile Card */}
                        <div className="lg:col-span-4">
                            <div className="lg:sticky lg:top-8 space-y-6">
                                <Reveal>
                                    <div className="bg-white rounded-2xl shadow-[0_1px_2px_rgba(11,61,31,0.06),0_12px_28px_-14px_rgba(11,61,31,0.25)] border border-gray-200/80 p-6">
                                        {/* Formal Frame Image Placeholder */}
                                        <div className="relative pb-8">
                                            <div className="relative z-10 rounded-xl p-2 bg-white border border-gray-100">
                                                <div className="overflow-hidden rounded-lg w-full aspect-[4/5] bg-gray-100 flex items-center justify-center">
                                                    <svg className="w-24 h-24 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                    </svg>
                                                </div>
                                            </div>

                                            {/* Gold border accent */}
                                            <div className="absolute inset-0 z-0 rounded-2xl translate-x-2 translate-y-2 border-2" style={{ borderColor: 'var(--vp-gold)' }}></div>

                                            <div
                                                className="absolute left-1/2 bottom-0 -translate-x-1/2 z-20 w-20 h-20 rounded-full bg-white shadow-md flex items-center justify-center p-2 transition-transform duration-300 hover:scale-105"
                                                style={{ border: '2px solid var(--vp-green-700)' }}
                                            >
                                                <img
                                                    src={ccdologo}
                                                    alt="City College of Cagayan de Oro Logo"
                                                    className="w-full h-full object-contain"
                                                />
                                            </div>
                                        </div>

                                        <div className="text-center pt-2">
                                            <h3 className="vp-serif text-2xl font-semibold tracking-tight" style={{ color: 'var(--vp-ink)' }}>
                                                Dr. Helmae E. Tapanan
                                            </h3>
                                            <p className="mt-2 text-[12px] font-bold tracking-wider uppercase" style={{ color: 'var(--vp-green-700)' }}>
                                                Vice President for Academics
                                            </p>
                                            <div className="mt-5 pt-4 flex items-center justify-center gap-2 text-xs text-gray-500" style={{ borderTop: '1px solid #ECE7DA' }}>
                                                <svg className="w-4 h-4 flex-shrink-0" style={{ color: 'var(--vp-gold-dark)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                                                </svg>
                                                <span>City College of Cagayan de Oro</span>
                                            </div>
                                        </div>
                                    </div>
                                </Reveal>

                                <Reveal delay={150}>
                                    <div
                                        className="relative rounded-2xl p-6 overflow-hidden"
                                        style={{ background: 'var(--vp-green-950)' }}
                                    >
                                        <div className="absolute top-0 right-0 w-32 h-32 rounded-full blur-2xl opacity-20" style={{ background: 'var(--vp-gold)' }}></div>
                                        <span
                                            className="vp-serif absolute -top-3 left-4 text-7xl leading-none select-none"
                                            style={{ color: 'rgba(199,154,62,0.35)' }}
                                            aria-hidden="true"
                                        >
                                            &ldquo;
                                        </span>
                                        <p className="relative vp-serif text-base italic leading-relaxed text-white/90 pt-4">
                                            {PROFILE_QUOTE}
                                        </p>
                                        <div className="mt-4 h-0.5 w-12 rounded-full" style={{ background: 'var(--vp-gold)' }} aria-hidden="true" />
                                    </div>
                                </Reveal>
                            </div>
                        </div>

                        {/* Right: Tabs + Content */}
                        <div className="lg:col-span-8 min-w-0">
                            <Reveal delay={200}>
                                <div className="bg-white rounded-2xl border border-gray-200/80 shadow-[0_1px_2px_rgba(11,61,31,0.06),0_12px_28px_-14px_rgba(11,61,31,0.2)] overflow-hidden">
                                    {/* Tab navigation */}
                                    <div className="flex overflow-x-auto" style={{ background: 'var(--vp-sage)', borderBottom: '2px solid #DEE6DB' }}>
                                        {TABS.map((tab) => {
                                            const isActive = tab.id === activeTab;
                                            return (
                                                <button
                                                    key={tab.id}
                                                    type="button"
                                                    onClick={() => setActiveTab(tab.id)}
                                                    aria-pressed={isActive}
                                                    className={[
                                                        'group relative flex-shrink-0 inline-flex items-center gap-2 px-6 py-5 text-sm font-semibold whitespace-nowrap',
                                                        'transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px]',
                                                        isActive ? 'text-white' : 'hover:text-green-800',
                                                    ].join(' ')}
                                                    style={{
                                                        color: isActive ? '#ffffff' : 'var(--vp-ink)',
                                                        background: isActive ? 'var(--vp-green-800)' : 'transparent',
                                                        outlineColor: 'var(--vp-gold)',
                                                    }}
                                                >
                                                    <svg
                                                        className="w-4 h-4 flex-shrink-0"
                                                        style={{ color: isActive ? 'var(--vp-gold)' : '#8A9A8D' }}
                                                        fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                                    >
                                                        {tab.icon}
                                                    </svg>
                                                    {tab.label}
                                                    {isActive && (
                                                        <span
                                                            className="absolute left-0 right-0 bottom-0 h-[3px]"
                                                            style={{ background: 'var(--vp-gold)' }}
                                                            aria-hidden="true"
                                                        />
                                                    )}
                                                </button>
                                            );
                                        })}
                                    </div>

                                    <div className="p-6 md:p-10">
                                        {/* Bionote panel */}
                                        {activeTab === 'bionote' && (
                                            <AnimatedPanel key="bionote">
                                                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                                                    <div className="lg:col-span-2 min-w-0">
                                                        <span className="text-[11px] font-bold tracking-[0.25em] text-amber-600 uppercase font-sans block mb-2">
                                                            Vice President for Academics
                                                        </span>
                                                        <h3 className="vp-serif text-3xl font-semibold tracking-tight" style={{ color: 'var(--vp-green-950)' }}>Bionote</h3>
                                                        <div className="mt-2 mb-6 flex items-center gap-1.5" aria-hidden="true">
                                                            <span className="h-[3px] w-12 bg-green-700 rounded-full" />
                                                            <span className="h-[3px] w-3 bg-amber-500 rounded-full" />
                                                        </div>

                                                        <div className="space-y-5 text-[15px] leading-8 text-gray-700 vp-bio">
                                                            {visibleParagraphs.map((paragraph, index) => (
                                                                <p key={index} className={index === 0 ? 'vp-bio-lead' : ''}>{paragraph}</p>
                                                            ))}
                                                        </div>

                                                        {BIONOTE_PARAGRAPHS.length > BIONOTE_PREVIEW_COUNT && (
                                                            <button
                                                                type="button"
                                                                onClick={() => setBioExpanded((v) => !v)}
                                                                className="mt-8 inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300"
                                                                style={{ border: '1.5px solid var(--vp-green-700)', color: 'var(--vp-green-700)' }}
                                                                onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--vp-green-700)'; e.currentTarget.style.color = '#fff'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                                                                onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--vp-green-700)'; e.currentTarget.style.transform = 'translateY(0)'; }}
                                                            >
                                                                {bioExpanded ? 'Show Less' : 'View Full Bionote'}
                                                                <svg
                                                                    className={`w-3.5 h-3.5 transition-transform duration-200 ${bioExpanded ? '-rotate-90' : 'rotate-0'}`}
                                                                    fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                                                >
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 17L17 7M17 7H9m8 0v8" />
                                                                </svg>
                                                            </button>
                                                        )}
                                                    </div>

                                                    <div className="lg:col-span-1">
                                                        <div className="rounded-xl p-5 divide-y" style={{ background: 'var(--vp-sage)', border: '1px solid #DEE6DB' }}>
                                                            <h4 className="text-xs font-bold tracking-widest uppercase text-gray-500 pb-3">Credentials</h4>
                                                            {CREDENTIALS.map((item, i) => (
                                                                <div
                                                                    key={item.title}
                                                                    className="flex items-start gap-4 py-4 first:pt-0 last:pb-0 transition-transform duration-300 hover:translate-x-1"
                                                                    style={{ borderColor: '#DEE6DB' }}
                                                                >
                                                                    <div
                                                                        className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center flex-shrink-0"
                                                                        style={{ border: '1px solid #DEE6DB' }}
                                                                    >
                                                                        <svg className="w-4 h-4" style={{ color: 'var(--vp-green-700)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                            {item.icon}
                                                                        </svg>
                                                                    </div>
                                                                    <div className="min-w-0">
                                                                        <p className="text-sm font-bold mb-1" style={{ color: 'var(--vp-green-950)' }}>{item.title}</p>
                                                                        {item.lines.map((line) => (
                                                                            <p key={line} className="text-xs text-gray-500 leading-snug">{line}</p>
                                                                        ))}
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                            </AnimatedPanel>
                                        )}

                                        {/* Office panels */}
                                        {activeOffice && (
                                            <AnimatedPanel key={activeOffice.id}>
                                                <div>
                                                    <span className="text-[11px] font-bold tracking-[0.25em] text-amber-600 uppercase font-sans block mb-2">
                                                        Office Overview &mdash; Sample Content
                                                    </span>
                                                    <h3 className="vp-serif text-2xl font-semibold tracking-tight" style={{ color: 'var(--vp-green-950)' }}>
                                                        {activeOffice.name}
                                                    </h3>
                                                    <div className="mt-2 mb-6 flex items-center gap-1.5" aria-hidden="true">
                                                        <span className="h-[3px] w-12 bg-green-700 rounded-full" />
                                                        <span className="h-[3px] w-3 bg-amber-500 rounded-full" />
                                                    </div>
                                                    <p
                                                        className="text-sm text-gray-600 leading-relaxed max-w-[68ch] pl-5 py-2"
                                                        style={{ borderLeft: '4px solid var(--vp-gold)', background: 'rgba(238, 242, 236, 0.5)' }}
                                                    >
                                                        {activeOffice.description}
                                                    </p>

                                                    <div className="mt-10">
                                                        <p className="text-xs font-bold tracking-widest uppercase mb-4 text-gray-500">
                                                            Core Functions
                                                        </p>
                                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                            {activeOffice.functions.map((fn, i) => (
                                                                <div
                                                                    key={fn}
                                                                    className="flex items-start gap-3 px-5 py-4 rounded-lg transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 bg-white border border-gray-200"
                                                                >
                                                                    <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center flex-shrink-0">
                                                                        <svg className="w-4 h-4" style={{ color: 'var(--vp-green-700)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                                        </svg>
                                                                    </div>
                                                                    <span className="text-sm text-gray-700 font-medium pt-1">{fn}</span>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>

                                                    <div className="mt-12">
                                                        <p className="text-xs font-bold tracking-widest uppercase mb-6 text-gray-500">
                                                            Organizational Structure &mdash; Sample
                                                        </p>
                                                        <div className="rounded-xl p-8 overflow-x-auto bg-gray-50 border border-gray-200">
                                                            <div className="min-w-[280px]">
                                                                <OfficeOrgChart levels={activeOffice.orgChart} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </AnimatedPanel>
                                        )}
                                    </div>
                                </div>
                            </Reveal>
                        </div>
                    </div>

                    {/* ===================== Institutional Stats Bar ===================== */}
                    <Reveal className="mt-14">
                        <div
                            className="rounded-2xl overflow-hidden relative shadow-lg"
                            style={{ background: 'linear-gradient(120deg, var(--vp-green-950), var(--vp-green-800))' }}
                        >
                            <div
                                className="absolute inset-0 opacity-[0.08] pointer-events-none"
                                style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)', backgroundSize: '18px 18px' }}
                                aria-hidden="true"
                            />
                            {/* Top Border Accent */}
                            <div className="absolute top-0 left-0 w-full h-1" style={{ background: 'var(--vp-gold)' }}></div>
                            
                            <div className="relative grid grid-cols-2 sm:grid-cols-4 sm:divide-x sm:divide-white/10">
                                {STATS.map((stat, i) => (
                                    <div
                                        key={stat.label}
                                        className="flex items-center gap-4 px-6 py-8 sm:px-8"
                                    >
                                        <div
                                            className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 transition-transform duration-300 hover:scale-110"
                                            style={{ background: 'rgba(199,154,62,0.16)', border: '1px solid rgba(199,154,62,0.4)' }}
                                        >
                                            <svg className="w-5 h-5" style={{ color: 'var(--vp-gold)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                {stat.icon}
                                            </svg>
                                        </div>
                                        <div className="min-w-0">
                                            <p className="text-[11px] text-white/60 uppercase tracking-wider leading-none mb-2">{stat.label}</p>
                                            <p className="vp-serif text-xl font-semibold text-white leading-tight">{stat.value}</p>
                                            <p className="text-[11px] text-white/60 leading-snug mt-1">{stat.caption}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </Reveal>
                </div>
            </section>
        </MainLayout>
    );
}