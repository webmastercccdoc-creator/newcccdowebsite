import { useEffect, useMemo, useRef, useState } from 'react';
import MainLayout from '../../../layouts/MainLayout';
import vpAdminFinanceBanner from '../../../assets/banner/vpadminfinance-banner.png';
import kurtCandilasImage from '../../../assets/images/Dr_Kurt_Candilas.png';
// Assuming the logo is a .png file. If it's .svg or .jpg, just update the extension below.
import ccdologo from '../../../assets/logos/ccdologo.png'; 

/* ============================================================================
   BIONOTE — existing biography content, unchanged. First two paragraphs show
   by default; "View Full Bionote" reveals the rest without losing anything.
   ============================================================================ */
const BIONOTE_PARAGRAPHS = [
    <>Dr. Kurt S. Candilas is the Vice President for Administration at the City College of Cagayan de Oro, Philippines, and former College Dean of Lourdes College, Inc. In his current capacity, he provides administrative and financial leadership and oversees key institutional offices and services, including Human Resources, the Technology Innovation and Data Management Center, and Physical Plant Services. He earned his Bachelor of Arts in English from Bukidnon State University, his Master&apos;s in Education majoring in Teaching English Communication Arts from Lourdes College, and his Doctor of Philosophy in English majoring in Literature from the University of San Jose&ndash;Recoletos, Cebu City. He also holds an advanced TESOL certification from the American TESOL Institute of the Philippines.</>,
    <>With his expertise in English communication arts, Dr. Candilas was designated by the Commission on Higher Education (CHED) as a regional trainer for Purposive Communication, a General Education subject in the higher education curriculum. He is also the lead author of <em>Purposive Communication with Sustainable Development Goals Integration</em>, published by Mindshapers Co., Inc. in 2025. As a researcher, he has also contributed to scholarly work on qualitative research design and methodology.</>,
    <>He has received several international research distinctions, including Best Paper Presentation at the 2nd International Conference on Languages, Linguistics, and Society (Malaysia, 2018), the 7th OpenTESOL International Conference (Vietnam, 2019), and the Best Research Paper and Best Presenter Awards at the 2023 International Conference on Education, Business, and Science and Technology (Philippines). In 2025, he was awarded the Best Session Paper Award, together with his colleagues, during the 5th International Conference and 2025 NOTED National Convention (Network of Outstanding Teachers and Educators).</>,
    <>He also serves on advisory and editorial boards and as a peer reviewer for journals and conferences across Asia and North America. His research interests include communication, literature, linguistics, education, and religion.</>,
];

const BIONOTE_PREVIEW_COUNT = 2;

/* Credential highlights — pulled directly from the bio above, not fabricated. */
const CREDENTIALS = [
    {
        title: 'Academic Background',
        lines: ['PhD in English Literature', 'MA in Education | BA in English'],
        icon: (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.75"
                d="M12 14l9-5-9-5-9 5 9 5z M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
        ),
    },
    {
        title: 'Professional Certification',
        lines: ['Advanced TESOL Certification', 'American TESOL Institute'],
        icon: (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.75"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        ),
    },
    {
        title: 'Regional CHED Trainer',
        lines: ['Purposive Communication', 'General Education Subject'],
        icon: (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.75"
                d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m5-2.13a4 4 0 100-8 4 4 0 000 8z" />
        ),
    },
    {
        title: 'Published Author',
        lines: ['Purposive Communication with', 'SDG Integration (2025)'],
        icon: (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.75"
                d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
        ),
    },
];

/* Quote / mission statement shown under the profile. */
const PROFILE_QUOTE =
    'Committed to excellence in administration, innovation in services, and integrity in leadership.';

/* Institution-wide stats bar under the profile + tabs. Update the figures
   below (100+, etc.) with confirmed numbers before this goes live. */
const STATS = [
    {
        label: 'Oversees',
        value: '4',
        caption: 'Key Offices',
        icon: (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.75"
                d="M3 21h18M5 21V7l7-4 7 4v14M9 21v-6h6v6" />
        ),
    },
    {
        label: 'Leads',
        value: '100+',
        caption: 'Personnel',
        icon: (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.75"
                d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m5-2.13a4 4 0 100-8 4 4 0 000 8zm6 1a4 4 0 10-1-7.87" />
        ),
    },
    {
        label: 'Ensures',
        value: 'Efficient',
        caption: 'Institutional Operations',
        icon: (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.75"
                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        ),
    },
    {
        label: 'Driven by',
        value: 'Integrity',
        caption: 'Service and Excellence',
        icon: (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.75"
                d="M12 21a9 9 0 100-18 9 9 0 000 18zM12 16a4 4 0 100-8 4 4 0 000 8zM12 13a1 1 0 100-2 1 1 0 000 2z" />
        ),
    },
];

/* ============================================================================
   OFFICE DATA MODEL — sample/placeholder content only.
   ============================================================================ */
const OFFICES = [
    {
        id: 'hr',
        label: 'Human Resources',
        name: 'Human Resources Office',
        description:
            'Sample placeholder text: the Human Resources Office manages personnel administration, employee services, recruitment, development, records, and related institutional functions.',
        functions: [
            'Recruitment and Selection',
            'Personnel Records Management',
            'Employee Relations',
            'Training and Development',
            'Performance Management',
            'Employee Welfare',
        ],
        orgChart: [
            { title: 'Vice President', nodes: ['VP for Administration and Finance'] },
            { title: 'Office Head', nodes: ['Director / Head of Human Resources'] },
            { title: 'Staff', nodes: ['HR Officers / Staff'] },
        ],
        icon: (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.75"
                d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m5-2.13a4 4 0 100-8 4 4 0 000 8zm6 1a4 4 0 10-1-7.87" />
        ),
    },
    {
        id: 'finance',
        label: 'Finance',
        name: 'Finance Office',
        description:
            'Sample placeholder text: the Finance Office description will be provided later.',
        functions: [
            'Budget Management',
            'Financial Planning',
            'Accounting Services',
            'Disbursement',
            'Financial Reporting',
            'Records and Documentation',
        ],
        orgChart: [
            { title: 'Vice President', nodes: ['VP for Administration and Finance'] },
            { title: 'Office Head', nodes: ['Finance Director / Head'] },
            { title: 'Staff', nodes: ['Accounting', 'Budget', 'Cashier', 'Finance Staff'] },
        ],
        icon: (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.75"
                d="M9 17V9m3 8V5m3 12v-5M5 21h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2z" />
        ),
    },
    {
        id: 'pps',
        label: 'PPS',
        name: 'Physical Plant and Services',
        description:
            'Sample placeholder text related to facilities, maintenance, campus infrastructure, utilities, safety, and physical plant operations.',
        functions: [
            'Facilities Management',
            'Building Maintenance',
            'Electrical and Plumbing Services',
            'Campus Grounds and Landscaping',
            'Utilities Management',
            'Equipment and Facility Maintenance',
            'General Physical Plant Services',
        ],
        orgChart: [
            { title: 'Vice President', nodes: ['VP for Administration and Finance'] },
            { title: 'Office Head', nodes: ['PPS Head / Director'] },
            { title: 'Staff', nodes: ['Maintenance', 'Facilities', 'Utility', 'Support Personnel'] },
        ],
        icon: (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.75"
                d="M3 21h18M5 21V10l7-6 7 6v11M9 21v-6h6v6" />
        ),
    },
    {
        id: 'tidmac',
        label: 'TIDMAC',
        name: 'Technology Innovation and Data Management Center',
        description:
            'Sample placeholder text covering institutional technology, information systems, data management, digital services, technical support, and technology innovation.',
        functions: [
            'Information Systems Management',
            'Data Management',
            'IT Technical Support',
            'Website and Web Systems',
            'Digital Transformation',
            'Network and Infrastructure Support',
            'Technology Innovation',
            'Institutional Data Services',
        ],
        orgChart: [
            { title: 'Vice President', nodes: ['VP for Administration and Finance'] },
            { title: 'Office Head', nodes: ['TIDMAC Director / Head'] },
            { title: 'Staff', nodes: ['Systems', 'Network', 'Data', 'Technical Support', 'Development Staff'] },
        ],
        icon: (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.75"
                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
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

/* ============================================================================
   Reveal-on-scroll — fades a section in once, the first time it enters view.
   ============================================================================ */
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

/* Reusable org chart. */
function OfficeOrgChart({ levels }) {
    return (
        <div className="flex flex-col items-center">
            {levels.map((level, levelIndex) => (
                <div key={level.title} className="w-full flex flex-col items-center">
                    {levelIndex > 0 && <div className="w-px h-6 bg-green-200" aria-hidden="true" />}
                    <p className="text-[11px] font-semibold tracking-widest text-gray-400 uppercase mb-2">
                        {level.title}
                    </p>
                    <div className="flex flex-wrap justify-center gap-3 w-full">
                        {level.nodes.map((node) => (
                            <div
                                key={node}
                                className="min-w-[150px] px-4 py-3 bg-white border border-gray-200 rounded-md shadow-sm text-center hover:border-green-700 transition-colors duration-200"
                            >
                                <span className="text-sm font-medium text-gray-800">{node}</span>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}

/* Fades + shifts up on tab change (key-driven remount). */
function AnimatedPanel({ children }) {
    const [show, setShow] = useState(false);

    useEffect(() => {
        const id = requestAnimationFrame(() => setShow(true));
        return () => cancelAnimationFrame(id);
    }, []);

    return (
        <div className={`transition-all duration-300 ease-out ${show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
            {children}
        </div>
    );
}

export default function VPAdminFinance() {
    const [scrollProgress, setScrollProgress] = useState(0);
    const [activeTab, setActiveTab] = useState('bionote');
    const [bioExpanded, setBioExpanded] = useState(false);

    useEffect(() => {
        document.title = "VP for Administration & Finance - City College of Cagayan de Oro";

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

    const [profileRef, profileVisible] = useRevealOnScroll();
    const [contentRef, contentVisible] = useRevealOnScroll();

    return (
        <MainLayout
            maxWidth="full"
            containerClassName="px-0"
            mainClassName="py-0"
            className="overflow-hidden pb-0"
        >
            {/* Local keyframes for the animated moving border */}
            <style>{`
                @keyframes borderRotate {
                    0% { transform: translate(-50%, -50%) rotate(0deg); }
                    100% { transform: translate(-50%, -50%) rotate(360deg); }
                }
            `}</style>

            {/* Scroll Progress Indicator */}
            <div className="fixed top-0 left-0 w-full h-1 z-[1000] bg-transparent">
                <div
                    className="h-full bg-green-700 transition-[width] duration-100 ease-out"
                    style={{ width: `${scrollProgress}%` }}
                />
            </div>

            {/* Hero Banner with Image - UNTOUCHED */}
            <div
                className="relative w-full bg-cover bg-center bg-no-repeat shadow-lg min-h-[350px] md:min-h-[450px] lg:min-h-[550px] flex items-center justify-center"
                style={{ backgroundImage: `url(${vpAdminFinanceBanner})` }}
            >
                <div className="absolute inset-0 bg-black/50"></div>
                <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
                    <h1 className="text-4xl font-bold tracking-tight text-white drop-shadow-md sm:text-5xl md:text-6xl">
                        Vice President for Administration & Finance
                    </h1>
                    <p className="mx-auto mt-4 max-w-2xl text-lg text-white/90 drop-shadow-md">
                        Administrative and financial leadership at the City College of Cagayan de Oro.
                    </p>
                </div>
            </div>

            {/* ===================== Page Header ===================== */}
            <section className="relative bg-slate-50 border-b border-gray-100 overflow-hidden">
                {/* Decorative building watermark, faint, right side */}
                <svg
                    className="hidden md:block absolute -right-10 top-1/2 -translate-y-1/2 w-[420px] h-[420px] text-green-800 opacity-[0.05] pointer-events-none"
                    viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.5" aria-hidden="true"
                >
                    <path d="M4 21V8l8-5 8 5v13M4 21h16M8 21V11h3v10M13 21V11h3v10M9 14h1M9 17h1M14 14h1M14 17h1" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {/* Soft ambient wash, lower-left */}
                <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-green-100 rounded-full blur-3xl opacity-40 pointer-events-none" aria-hidden="true" />

                <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-14 pb-10 text-center">
                    <div className="flex items-center justify-center gap-3 mb-3" aria-hidden="true">
                        <span className="h-px w-9 bg-amber-500" />
                        <span className="text-xs font-bold tracking-[0.2em] text-green-700 uppercase">Office of the</span>
                        <span className="h-px w-9 bg-amber-500" />
                    </div>
                    <h2 className="text-3xl md:text-4xl font-extrabold text-green-800 tracking-tight">
                        Vice President for Administration and Finance
                    </h2>
                    <p className="mt-3 text-sm text-gray-500">
                        Administrative Leadership. Institutional Services. Operational Excellence.
                    </p>
                    <div className="mt-4 h-1 w-14 bg-green-600 rounded-full mx-auto" aria-hidden="true" />
                </div>
            </section>

            {/* ===================== Profile + Tabs ===================== */}
            <section className="bg-white">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 md:py-16">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-10">

                        {/* Left: Profile Card */}
                        <div
                            ref={profileRef}
                            className={`lg:col-span-4 transition-all duration-700 ease-out ${
                                profileVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                            }`}
                        >
                            <div className="lg:sticky lg:top-8 space-y-5">
                                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
                                    {/* Photo, framed by an animated sweeping light border */}
                                    <div className="relative pb-7">
                                        {/* Animated Border Background & Glow */}
                                        <div className="absolute -inset-[3px] rounded-[15px] bg-green-700 z-0 overflow-hidden shadow-[0_0_20px_rgba(21,128,61,0.35)]">
                                            <div
                                                className="absolute left-1/2 top-1/2 w-[200%] h-[200%]"
                                                style={{
                                                    background: 'conic-gradient(from 0deg, transparent 0deg, rgba(255,255,255,0.9) 40deg, transparent 80deg, transparent 360deg)',
                                                    animation: 'borderRotate 4s linear infinite',
                                                    transform: 'translate(-50%, -50%)'
                                                }}
                                            ></div>
                                        </div>

                                        {/* Solid White Frame & Image */}
                                        <div className="relative z-10 rounded-xl p-1.5 bg-white">
                                            <div className="overflow-hidden rounded-lg">
                                                <img
                                                    src={kurtCandilasImage}
                                                    alt="Dr. Kurt S. Candilas"
                                                    className="w-full aspect-[4/5] object-cover"
                                                />
                                            </div>
                                        </div>

                                        {/* Institutional logo, overlapping the bottom edge of the photo */}
                                        <div className="absolute left-1/2 bottom-0 -translate-x-1/2 z-20 w-16 h-16 rounded-full bg-white border-2 border-green-700 shadow-sm flex items-center justify-center p-1.5">
                                            <img 
                                                src={ccdologo} 
                                                alt="City College of Cagayan de Oro Logo" 
                                                className="w-full h-full object-contain"
                                            />
                                        </div>
                                    </div>

                                    <div className="text-center pt-1">
                                        <h3 className="text-lg font-bold text-gray-900 tracking-tight">
                                            Dr. Kurt S. Candilas
                                        </h3>
                                        <p className="mt-1 text-sm font-semibold text-green-700">
                                            Vice President for Administration and Finance
                                        </p>
                                        <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-center gap-2 text-xs text-gray-500">
                                            <svg className="w-4 h-4 flex-shrink-0 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                                            </svg>
                                            <span>City College of Cagayan de Oro</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Quote / mission statement */}
                                <div className="bg-slate-50 border border-gray-200 rounded-xl p-5">
                                    <svg className="w-6 h-6 text-green-700/70" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                        <path d="M7.17 6C4.86 6 3 7.86 3 10.17c0 2.06 1.5 3.75 3.46 4.08-.35 1.2-1.34 2.2-2.86 2.94l.5 1.31c2.9-1.02 4.9-3.2 4.9-6.5C9 9.65 8.06 8.5 6.9 8.02c.24-.9 1.02-1.5 2.1-1.5V6H7.17zm10 0c-2.31 0-4.17 1.86-4.17 4.17 0 2.06 1.5 3.75 3.46 4.08-.35 1.2-1.34 2.2-2.86 2.94l.5 1.31c2.9-1.02 4.9-3.2 4.9-6.5C19 9.65 18.06 8.5 16.9 8.02c.24-.9 1.02-1.5 2.1-1.5V6h-1.83z" />
                                    </svg>
                                    <p className="mt-2 text-sm italic text-gray-600 leading-relaxed">
                                        &ldquo;{PROFILE_QUOTE}&rdquo;
                                    </p>
                                    <div className="mt-3 h-0.5 w-8 bg-amber-500 rounded-full" aria-hidden="true" />
                                </div>
                            </div>
                        </div>

                        {/* Right: Tabs + Content */}
                        <div
                            ref={contentRef}
                            className={`lg:col-span-8 min-w-0 transition-all duration-700 ease-out delay-100 ${
                                contentVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                            }`}
                        >
                            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                                {/* Tab navigation — underline style */}
                                <div className="flex overflow-x-auto border-b border-gray-200">
                                    {TABS.map((tab) => {
                                        const isActive = tab.id === activeTab;
                                        return (
                                            <button
                                                key={tab.id}
                                                type="button"
                                                onClick={() => setActiveTab(tab.id)}
                                                aria-pressed={isActive}
                                                className={[
                                                    'group flex-shrink-0 inline-flex items-center gap-2 px-5 py-4 text-sm font-semibold whitespace-nowrap',
                                                    'border-b-[3px] transition-colors duration-200',
                                                    isActive
                                                        ? 'border-green-700 text-green-700'
                                                        : 'border-transparent text-gray-500 hover:text-green-700 hover:border-green-200',
                                                ].join(' ')}
                                            >
                                                <svg
                                                    className={`w-4 h-4 flex-shrink-0 ${isActive ? 'text-green-700' : 'text-gray-400 group-hover:text-green-600'}`}
                                                    fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                                >
                                                    {tab.icon}
                                                </svg>
                                                {tab.label}
                                            </button>
                                        );
                                    })}
                                </div>

                                <div className="p-6 md:p-8">
                                    {/* Bionote panel */}
                                    {activeTab === 'bionote' && (
                                        <AnimatedPanel key="bionote">
                                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                                <div className="lg:col-span-2 min-w-0">
                                                    <p className="text-[11px] font-bold tracking-widest text-amber-600 uppercase mb-1">
                                                        Vice President for Administration and Finance
                                                    </p>
                                                    <h3 className="text-2xl font-extrabold text-green-800 tracking-tight">Bionote</h3>
                                                    <div className="mt-2 mb-5 h-1 w-10 bg-green-600 rounded-full" aria-hidden="true" />

                                                    <div className="space-y-4 text-[14.5px] leading-7 text-gray-700">
                                                        {visibleParagraphs.map((paragraph, index) => (
                                                            <p key={index}>{paragraph}</p>
                                                        ))}
                                                    </div>

                                                    {BIONOTE_PARAGRAPHS.length > BIONOTE_PREVIEW_COUNT && (
                                                        <button
                                                            type="button"
                                                            onClick={() => setBioExpanded((v) => !v)}
                                                            className="mt-5 inline-flex items-center gap-2 px-4 py-2 rounded-full border border-green-700 text-green-700 text-sm font-semibold hover:bg-green-700 hover:text-white transition-colors duration-200"
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

                                                {/* Credential highlights sidebar */}
                                                <div className="lg:col-span-1">
                                                    <div className="bg-slate-50 border border-gray-200 rounded-xl p-4 divide-y divide-gray-200">
                                                        {CREDENTIALS.map((item) => (
                                                            <div key={item.title} className="flex items-start gap-3 py-3 first:pt-0 last:pb-0">
                                                                <div className="w-9 h-9 rounded-full bg-white border border-gray-200 shadow-sm flex items-center justify-center flex-shrink-0">
                                                                    <svg className="w-4 h-4 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                        {item.icon}
                                                                    </svg>
                                                                </div>
                                                                <div className="min-w-0">
                                                                    <p className="text-sm font-bold text-green-800">{item.title}</p>
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
                                                <p className="text-[11px] font-bold tracking-widest text-amber-600 uppercase mb-1">
                                                    Office Overview &mdash; Sample Content
                                                </p>
                                                <h3 className="text-xl font-extrabold text-green-800 tracking-tight">
                                                    {activeOffice.name}
                                                </h3>
                                                <div className="mt-2 mb-4 h-1 w-10 bg-green-600 rounded-full" aria-hidden="true" />
                                                <p className="text-sm text-gray-600 leading-relaxed max-w-[68ch]">
                                                    {activeOffice.description}
                                                </p>

                                                {/* Core functions */}
                                                <div className="mt-8">
                                                    <p className="text-xs font-semibold tracking-widest text-gray-400 uppercase mb-4">
                                                        Core Functions
                                                    </p>
                                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                                        {activeOffice.functions.map((fn) => (
                                                            <div
                                                                key={fn}
                                                                className="flex items-start gap-2.5 px-4 py-3 bg-slate-50 border border-gray-200 rounded-md"
                                                            >
                                                                <svg className="w-4 h-4 mt-0.5 flex-shrink-0 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                                </svg>
                                                                <span className="text-sm text-gray-700">{fn}</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>

                                                {/* Organizational structure */}
                                                <div className="mt-10">
                                                    <p className="text-xs font-semibold tracking-widest text-gray-400 uppercase mb-6">
                                                        Organizational Structure &mdash; Sample
                                                    </p>
                                                    <div className="bg-slate-50 border border-gray-200 rounded-lg p-6 overflow-x-auto">
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
                        </div>
                    </div>

                    {/* ===================== Institutional Stats Bar ===================== */}
                    <div className="mt-10 rounded-xl overflow-hidden bg-green-800">
                        <div className="grid grid-cols-2 sm:grid-cols-4 sm:divide-x sm:divide-white/15">
                            {STATS.map((stat) => (
                                <div key={stat.label} className="flex items-center gap-3 px-5 py-6 sm:px-6">
                                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            {stat.icon}
                                        </svg>
                                    </div>
                                    <div className="min-w-0">
                                        <p className="text-[11px] text-green-100/80 uppercase tracking-wide leading-none">{stat.label}</p>
                                        <p className="text-lg font-extrabold text-white leading-tight mt-1">{stat.value}</p>
                                        <p className="text-[11px] text-green-100/70 leading-snug">{stat.caption}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </MainLayout>
    );
}