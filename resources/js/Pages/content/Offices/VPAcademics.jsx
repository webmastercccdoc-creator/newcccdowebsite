import { useEffect, useMemo, useRef, useState } from 'react';
import MainLayout from '../../../layouts/MainLayout';
import vpAcademicsBanner from '../../../assets/banner/ovpacads-banner.png';
import AnimatedBannerText from '../../../components/content/AnimatedBannerText';
import ccdologo from '../../../assets/logos/ccdologo.png';
import helmaeTapananImage from '../../../assets/images/Dr_Helmae_Tapanan.png'; 

/* ============================================================================
   DATA CONTENT
   ============================================================================ */
const BIONOTE_PARAGRAPHS = [
    <>Dr. Helmae E. Tapanan, LPT, is a distinguished academic leader, recognized for her extensive experience and profound commitment to educational excellence and research. With a Doctor of Education major in Instructional System and Resource Management from the University of San Jose&ndash;Recoletos (2019) and a Master of Arts in Education major in Mathematics from the University of the Philippines Cebu (2011), Dr. Tapanan possesses a robust academic foundation.</>,
    <>Her Magna Cum Laude, Best in Mathematics, and Extra-curricular awards from La Salle University Ozamiz City of her Bachelor&rsquo;s degree, underscore her dedication to both scholarly achievement and professional standards. Her recognition as the Most Outstanding Principal of the Year by International School Awards in Bangkok, Thailand in 2023 and the given distinction as the Soft Skills Ambassador of the Philippines by Soft Skills A.H.A. USA, further attests to her exemplary leadership and administrative prowess.</>,
    <>Throughout her career, Dr. Tapanan has consistently championed excellent quality in education. As Principal of the University of San Jose&ndash;Recoletos Senior High School Department since 2019, she has overseen curriculum implementation and school operations, ensuring high standards. Her role as a TEI Curriculum Quality Audit (CQA) Specialist since 2017 demonstrates her expertise in evaluating and enhancing educational programs, a critical skill for maintaining and elevating tertiary education standards.</>,
    <>Furthermore, her experience as a Faculty Researcher and Research Peer Reviewer for the Recoletos Multidisciplinary Research Journal&mdash;a Scopus-indexed Journal&mdash;highlights her commitment to evidence-based practices and scholarly rigor, which are foundational to a thriving academic environment and students&rsquo; growth towards success. At present, Dr. Tapanan is the Vice President for Academic Affairs at City College of Cagayan de Oro, Philippines, a World University Ranking for Innovation (WURI) Top 56 and Times Higher Education Impact Ranking of 1001-1500 ranks.</>,
    <>Dr. Tapanan&apos;s dedication to academic advancement extends beyond her institutional roles. She has published 13 international and 2 Scopus-indexed research journals and has presented her findings at numerous national and international conferences, showcasing her active contribution to the academic discourse. Her involvement in developing assessment and learning modules, coupled with her work as a Language Evaluator in MTB-MLE, reflects her comprehensive understanding of pedagogical best practices.</>,
    <>Having conducted diverse community and research projects in partnership with CHED, USAID, Ramon Aboitiz Foundation, research grant by Meralco Foundation, Region VII Department of Education, LGUs, and as consultant of the Set Forth Philippines Foundation, Dr. Tapanan brings a wealth of experience in fostering collaborative initiatives that can significantly benefit the academic and community engagement goals of education sectors in the country.</>,
];

const BIONOTE_PREVIEW_COUNT = 2;

const CREDENTIALS = [
    {
        title: 'Academic Background',
        lines: ['Doctor of Education (EdD)', 'MA in Education | Mathematics'],
        icon: (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
                d="M12 14l9-5-9-5-9 5 9 5z M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
        ),
    },
    {
        title: 'Research & Publications',
        lines: ['13 International Journals', '2 Scopus-Indexed Papers'],
        icon: (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        ),
    },
    {
        title: 'Leadership & Awards',
        lines: ['Most Outstanding Principal (2023)', 'Soft Skills Ambassador PH'],
        icon: (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
                d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        ),
    },
    {
        title: 'Academic Certifications',
        lines: ['TEI Curriculum Quality Audit', 'Language Evaluator (MTB-MLE)'],
        icon: (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        ),
    },
];

const OFFICES = [
    {
        id: 'coe',
        label: 'COE',
        name: 'College of Education',
        description:
            'The College of Education provides quality instruction and training for future educators in various disciplines.',
        functions: [
            'Curriculum Development', 'Faculty Development', 'Instructional Design', 
            'Student Assessment', 'Program Accreditation', 'Academic Advising',
        ],
        orgChart: {
            name: 'Dean, College of Education',
            children: [
                {
                    name: 'Program Chair, Technology and Livelihood Education Dept.',
                    children: [
                        { name: 'Faculty, Technology and Livelihood Education' }
                    ]
                },
                {
                    name: 'Program Chair, Technical-Vocational Teacher Education Dept.',
                    children: [
                        { name: 'Faculty, Communication Arts Technical-Vocational Teacher Education' }
                    ]
                }
            ]
        },
        icon: (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
                d="M12 14l9-5-9-5-9 5 9 5z M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z M3 11l9 5 9-5" />
        ),
    },
    {
        id: 'cas',
        label: 'CAS',
        name: 'College of Arts and Sciences',
        description:
            'The College of Arts and Sciences offers programs that develop critical thinking, communication, and analytical skills.',
        functions: [
            'Curriculum Development', 'Faculty Development', 'Instructional Design', 
            'Student Assessment', 'Program Accreditation', 'Academic Advising',
        ],
        orgChart: {
            name: 'Dean, College of Arts and Sciences',
            children: [
                {
                    name: 'Program Chair, Communication Arts Dept.',
                    children: [{ name: 'Faculty, Communication Arts' }]
                },
                {
                    name: 'Program Chair, Social Work Dept.',
                    children: [{ name: 'Faculty, Social Work' }]
                },
                {
                    name: 'Program Chair, General Education Dept.',
                    children: [{ name: 'Faculty, General Education' }]
                },
                {
                    name: 'Program Chair, Physical Education Dept.',
                    children: [{ name: 'Faculty, Physical Education' }]
                }
            ]
        },
        icon: (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
                d="M12 14l9-5-9-5-9 5 9 5z M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z M3 11l9 5 9-5" />
        ),
    },
    {
        id: 'cbm',
        label: 'CBM',
        name: 'College of Business and Management',
        description:
            'The College of Business and Management prepares students for leadership roles in business, entrepreneurship, and administration.',
        functions: [
            'Curriculum Development', 'Faculty Development', 'Instructional Design', 
            'Student Assessment', 'Program Accreditation', 'Academic Advising',
        ],
        orgChart: {
            name: 'Dean, College of Business and Management',
            children: [
                {
                    name: 'Program Chair, Office Administration Dept.',
                    children: [{ name: 'Faculty, Office Administration' }]
                },
                {
                    name: 'Program Chair, Entrepreneurship Department',
                    children: [{ name: 'Faculty, Entrepreneurship' }]
                }
            ]
        },
        icon: (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
                d="M12 14l9-5-9-5-9 5 9 5z M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z M3 11l9 5 9-5" />
        ),
    },
    {
        id: 'nstp',
        label: 'NSTP',
        name: 'National Service Training Program',
        description:
            'The NSTP Office oversees the implementation of civic welfare, literacy, and ROTC programs for college students.',
        functions: [
            'Program Implementation', 'Student Training', 'Community Engagement', 
            'Compliance Monitoring', 'Event Coordination', 'Safety and Logistics',
        ],
        orgChart: {
            name: 'Director, National Service Training Program',
            children: [
                { name: 'In-Charge, LTS' },
                { name: 'In-Charge, CWTS' },
                { name: 'In-Charge, ROTC' }
            ]
        },
        icon: (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
                d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 002.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 012.916.52 6.003 6.003 0 01-5.395 4.972m0 0a6.726 6.726 0 01-2.749 1.35m0 0a6.772 6.772 0 01-3.044 0" />
        ),
    },
    {
        id: 'tsti',
        label: 'TSTI',
        name: 'Technical Skills and Training Institute',
        description:
            'The Vocational School Administrator oversees the Technical Skills and Training Institute, providing technical-vocational education and institutional linkages.',
        functions: [
            'Technical Skills Training', 'Vocational Education', 'Industry Partnership', 
            'Skills Assessment', 'Facility Management', 'Program Development',
        ],
        orgChart: {
            name: 'Vocational School Administrator, Technical Skills and Training Institute',
            children: [
                { name: 'Training and Instruction' },
                { name: 'Administrative Support' },
                { name: 'Institutional Development and External Linkages' }
            ]
        },
        icon: (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
                d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.69c.329-.486.291-1.128-.139-1.578l-2.03-2.03A1.125 1.125 0 0010.5 7.14l-3.69 2.496M11.42 15.17l-4.655 4.655a2.25 2.25 0 01-3.182-3.182l4.655-4.655m0 0L8.25 8.25m0 0l-3.69 2.496c-.486.329-.626.971-.355 1.477.38.683.987 1.251 1.717 1.586m0 0l3.69-2.496 3.69 2.496M8.25 8.25l-3.69 2.496 3.69 2.496m0 0l3.69-2.496-3.69-2.496" />
        ),
    },
    {
        id: 'support',
        label: 'Academic Support',
        name: 'Academic Support Offices',
        description:
            'Academic Support Offices provide essential services including curriculum, library, registrar, licensure review, and student affairs support.',
        functions: [
            'Curriculum Management', 'Library Resources', 'Records Management', 
            'Review Coordination', 'Student Welfare', 'Academic Support',
        ],
        orgChart: {
            name: 'Academic Support Division',
            children: [
                {
                    name: 'Director, Office of Student Affairs and Services',
                    children: [
                        { name: 'Incharge, Information and Orientation' },
                        { name: 'Head, Guidance and Counseling' },
                        { name: 'Head, Career and Job Placement' },
                        { name: 'Incharge, Student Activities and Leadership' },
                        { name: 'Chairman, Committee on Student Discipline' },
                        { name: 'Incharge, Student Media and Publication' },
                        { name: 'Central Student Government, Student Councils and Recognized Student Organizations' },
                        { name: 'Head, Admission' },
                        { name: 'Manager, Canteen Services' },
                        { name: 'Head, Health Services' },
                        { name: 'College Physician and Nurses' },
                        { name: 'College Dentist' },
                        { name: 'Incharge, Students with Special Needs Services' },
                        { name: 'Incharge, Multi-Faith Services' },
                        { name: 'Head, Athletics Office' }
                    ]
                },
                {
                    name: 'Academic Support Offices',
                    children: [
                        { name: 'Head, Office of the Curriculum and Instruction' },
                        { name: 'Head, Library Services' },
                        { name: 'Head, Office of the Registrar' },
                        { name: 'Head, Licensure and Board Exam Review Office' }
                    ]
                }
            ]
        },
        icon: (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        ),
    }
];

/* Premium Scroll Reveal Hook */
function useReveal() {
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
            { threshold: 0.1 }
        );
        observer.observe(node);
        return () => observer.disconnect();
    }, []);

    return [ref, visible];
}

/* Premium Reveal Wrapper with Stagger Support */
function Reveal({ children, delay = 0, className = '' }) {
    const [ref, visible] = useReveal();
    return (
        <div
            ref={ref}
            className={`transition-all ${className} ${
                visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            }`}
            style={{ 
                transitionDelay: `${delay}ms`, 
                transitionDuration: '1.2s', 
                transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' 
            }}
        >
            {children}
        </div>
    );
}

/* Premium Animated Panel */
function AnimatedPanel({ children }) {
    const [show, setShow] = useState(false);

    useEffect(() => {
        const id = requestAnimationFrame(() => setShow(true));
        return () => cancelAnimationFrame(id);
    }, []);

    return (
        <div 
            className={`transition-all duration-700 ease-out-expo ${show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
        >
            {children}
        </div>
    );
}

/* Recursive Node Component for Tree-style Org Chart */
function OrgNode({ node }) {
    const hasChildren = node.children && node.children.length > 0;

    return (
        <div className="flex flex-col items-center relative">
            {/* Node Box */}
            <div className="relative px-5 py-4 bg-white border border-[#E7E2D6] rounded-xl shadow-sm text-center transition-all duration-500 ease-out-expo group hover:-translate-y-1 hover:border-[#145A32] hover:shadow-xl w-full max-w-[260px]">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#145A32] to-[#C79A3E] rounded-t-lg transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                <span className="text-[13px] font-semibold text-gray-800 leading-snug">{node.name}</span>
            </div>

            {/* Children Branch */}
            {hasChildren && (
                <div className="flex flex-wrap justify-center gap-x-6 gap-y-8 pt-10 relative w-full max-w-7xl mx-auto">
                    {/* Vertical drop line from parent */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-10 bg-[#145A32]/30" aria-hidden="true"></div>
                    
                    {/* Render Children */}
                    {node.children.map((child, i) => (
                        <div key={i} className="relative flex flex-col items-center w-[220px]">
                            {/* Vertical drop line to child */}
                            <div className="w-px h-10 bg-[#145A32]/30" aria-hidden="true"></div>
                            <div className="w-full flex justify-center">
                                <OrgNode node={child} />
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

/* Office Org Chart Wrapper */
function OfficeOrgChart({ root }) {
    return (
        <div className="flex flex-col items-center w-full">
            <OrgNode node={root} />
        </div>
    );
}

export default function VPAcademics() {
    const [scrollProgress, setScrollProgress] = useState(0);
    const [activeOffice, setActiveOffice] = useState('coe');
    const [bioExpanded, setBioExpanded] = useState(false);

    useEffect(() => {
        document.title = "Vice President for Academics - City College of Cagayan de Oro";
        const handleScroll = () => {
            const top = window.pageYOffset;
            const height = document.documentElement.scrollHeight - window.innerHeight;
            const percent = height > 0 ? (top / height) * 100 : 0;
            setScrollProgress(percent);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const activeOfficeData = useMemo(
        () => OFFICES.find((office) => office.id === activeOffice),
        [activeOffice]
    );

    const visibleParagraphs = bioExpanded
        ? BIONOTE_PARAGRAPHS
        : BIONOTE_PARAGRAPHS.slice(0, BIONOTE_PREVIEW_COUNT);

    return (
        <MainLayout
            maxWidth="full"
            containerClassName="px-0"
            mainClassName="py-0"
            className="overflow-x-hidden pb-0"
        >
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700&family=Inter:wght@300;400;500;600;700;800&display=swap');

                :root {
                    --vp-ink: #1E2A22;
                    --vp-green-dark: #0A2E18;
                    --vp-green-950: #0B3D1F;
                    --vp-green-mid: #145A32;
                    --vp-green-700: #1B6B3D;
                    --vp-gold: #D4AF37;
                    --vp-gold-light: #E5C68A;
                    --vp-cream: #F9F7F2;
                    --vp-gray: #8C9A92;
                    
                    /* Variables requested by the provided snippet */
                    --vp-paper: #FBFAF6;
                    --vp-sage: #EFF3ED;
                    --vp-gold-dark: #A97F2E;
                    --vp-line: #E5E0D3;
                }

                .vp-serif { font-family: 'Fraunces', ui-serif, Georgia, serif; }
                .vp-sans { font-family: 'Inter', ui-sans-serif, system-ui, sans-serif; }
                .ease-out-expo { transition-timing-function: cubic-bezier(0.16, 1, 0.3, 1) !important; }
                
                /* Responsive Drop Cap */
                .vp-bio-lead::first-letter {
                    font-family: 'Fraunces', ui-serif, Georgia, serif;
                    font-size: clamp(3rem, 12vw, 5rem);
                    font-weight: 500;
                    float: left;
                    line-height: 0.85;
                    padding-right: 0.75rem;
                    padding-top: 0.5rem;
                    color: var(--vp-green-mid);
                }

                @keyframes fadeInPanel {
                    from { opacity: 0; transform: translateY(20px); filter: blur(4px); }
                    to { opacity: 1; transform: translateY(0); filter: blur(0); }
                }
                .animate-panel {
                    animation: fadeInPanel 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                }

                /* Hide Scrollbar utility */
                .no-scrollbar::-webkit-scrollbar { display: none; }
                .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
            `}</style>

            {/* Scroll Progress Indicator */}
            <div className="fixed top-0 left-0 w-full h-1 z-[1000] bg-transparent">
                <div
                    className="h-full transition-[width] duration-100 ease-out"
                    style={{ width: `${scrollProgress}%`, background: 'linear-gradient(90deg, var(--vp-green-mid), var(--vp-gold))' }}
                />
            </div>

            {/* ===================== Hero Banner ===================== */}
            <div
                className="relative w-full bg-cover bg-center bg-no-repeat shadow-lg min-h-[350px] md:min-h-[450px] lg:min-h-[550px] flex items-center justify-center"
                style={{ backgroundImage: `url(${vpAcademicsBanner})` }}
            >
                <div className="absolute inset-0 bg-black/50"></div>
                <AnimatedBannerText
                    title="Vice President for Academics"
                    description="Academic leadership, quality instruction, and student success at the City College of Cagayan de Oro."
                />
            </div>

            {/* ===================== 1. Executive Spotlight (Dark Premium) ===================== */}
            <section className="relative bg-[#0A2E18] text-white py-16 sm:py-20 md:py-28 lg:py-32 overflow-hidden vp-sans">
                {/* Background Pattern & Accents */}
                <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#D4AF37 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>
                <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-[#145A32]/20 to-transparent pointer-events-none"></div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-16 items-center">
                    {/* Left: Profile Text & Credentials */}
                    <div className="lg:col-span-7 order-2 lg:order-1">
                        <Reveal>
                            <span className="inline-block px-3 py-1.5 text-[10px] sm:text-[11px] tracking-[0.25em] sm:tracking-[0.3em] uppercase border border-[#D4AF37]/30 text-[#D4AF37] rounded-full mb-6 sm:mb-8">
                                Office of the Vice President
                            </span>
                        </Reveal>
                        <Reveal delay={150}>
                            <h1 className="vp-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium leading-[1.05] tracking-tight mb-4 sm:mb-6">
                                Dr. Helmae E. <br/>Tapanan
                            </h1>
                        </Reveal>
                        <Reveal delay={300}>
                            <p className="text-base sm:text-lg md:text-xl text-white/60 max-w-xl mb-8 sm:mb-12">
                                Vice President for Academics at the City College of Cagayan de Oro.
                            </p>
                        </Reveal>

                        {/* Glassmorphism Credentials Grid */}
                        <Reveal delay={450}>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 max-w-2xl">
                                {CREDENTIALS.map(c => (
                                    <div key={c.title} className="bg-white/5 backdrop-blur-md border border-white/10 p-4 sm:p-5 rounded-xl hover:border-[#D4AF37]/40 hover:bg-white/10 transition-all duration-500 ease-out-expo group cursor-default">
                                        <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center mb-3 sm:mb-4 group-hover:bg-[#D4AF37] transition-all duration-300">
                                            <svg className="w-4 h-4 sm:w-5 sm:h-5 text-[#D4AF37] group-hover:text-[#0A2E18] transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                {c.icon}
                                            </svg>
                                        </div>
                                        <h4 className="text-sm font-semibold text-white mb-1 sm:mb-2">{c.title}</h4>
                                        {c.lines.map(l => <p key={l} className="text-[11px] sm:text-xs text-white/50 leading-snug">{l}</p>)}
                                    </div>
                                ))}
                            </div>
                        </Reveal>
                    </div>

                    {/* Right: High-End Image Frame */}
                    <div className="lg:col-span-5 order-1 lg:order-2 mb-8 lg:mb-0">
                        <Reveal delay={300} className="relative max-w-sm mx-auto lg:max-w-none">
                            {/* Floating Gold Border Frame */}
                            <div className="absolute inset-0 border border-[#D4AF37]/30 rounded-2xl transform translate-x-3 translate-y-3 sm:translate-x-6 sm:translate-y-6 transition-transform duration-700 ease-out-expo hover:translate-x-2 hover:translate-y-2 sm:hover:translate-x-3 sm:hover:translate-y-3"></div>
                            
                            <div className="relative rounded-2xl overflow-hidden shadow-2xl group border border-white/10">
                                <img 
                                    src={helmaeTapananImage} 
                                    alt="Dr. Helmae E. Tapanan" 
                                    className="w-full aspect-[4/5] object-cover transition-transform duration-[1.5s] ease-out-expo group-hover:scale-105"
                                />
                                {/* Gradient Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0A2E18] via-[#0A2E18]/20 to-transparent opacity-80"></div>
                                
                                {/* Floating CCDO Seal & Label */}
                                <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 flex items-center gap-3 sm:gap-4">
                                    <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-white p-1.5 sm:p-2 shadow-xl border border-[#D4AF37]/50 flex-shrink-0">
                                        <img src={ccdologo} alt="CCDO Logo" className="w-full h-full object-contain" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] sm:text-xs text-[#D4AF37] tracking-widest uppercase">City College of Cagayan de Oro</p>
                                        <p className="text-xs sm:text-sm font-semibold text-white">Dr. Helmae E. Tapanan</p>
                                    </div>
                                </div>
                            </div>
                        </Reveal>
                    </div>
                </div>
            </section>

            {/* ===================== 2. Editorial Bionote (Light & Clean) ===================== */}
            <section className="bg-[#F9F7F2] py-16 sm:py-20 md:py-28 lg:py-32 vp-sans relative overflow-hidden">
                {/* Subtle top accent */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#145A32] to-transparent opacity-10"></div>
                
                <div className="max-w-3xl mx-auto px-4 sm:px-6">
                    <Reveal className="text-center mb-10 sm:mb-16">
                        <div className="inline-flex items-center gap-4 mb-4">
                            <span className="h-px w-8 sm:w-12 bg-[#145A32]"></span>
                            <span className="text-[10px] sm:text-[11px] font-bold tracking-[0.25sm] sm:tracking-[0.3em] uppercase text-[#145A32]">Biography</span>
                            <span className="h-px w-8 sm:w-12 bg-[#145A32]"></span>
                        </div>
                        <h2 className="vp-serif text-3xl sm:text-4xl md:text-5xl font-medium text-[#0A2E18] tracking-tight">
                            Professional Bionote
                        </h2>
                    </Reveal>

                    <div className="text-[15px] sm:text-[16px] md:text-[17px] leading-[1.8] sm:leading-[1.9] text-gray-700 space-y-5 sm:space-y-6 vp-bio">
                        {visibleParagraphs.map((p, i) => (
                            <p key={i} className={i === 0 ? 'vp-bio-lead' : ''}>{p}</p>
                        ))}
                    </div>

                    <div className="mt-10 sm:mt-12 text-center">
                        <button
                            onClick={() => setBioExpanded(!bioExpanded)}
                            className="inline-flex items-center gap-3 px-6 sm:px-8 py-3 sm:py-3.5 bg-[#0A2E18] text-white rounded-full text-[10px] sm:text-xs font-bold tracking-widest uppercase hover:bg-[#145A32] transition-all duration-300 hover:-translate-y-1 shadow-lg shadow-green-950/20"
                        >
                            {bioExpanded ? 'Collapse Biography' : 'Read Full Biography'}
                            <svg className={`w-3 h-3 sm:w-4 sm:h-4 transition-transform duration-300 ${bioExpanded ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                            </svg>
                        </button>
                    </div>
                </div>
            </section>

            {/* ===================== 03 — Academics Cluster ===================== */}
            <section
                className="relative vp-sans overflow-hidden"
                style={{ background: 'var(--vp-paper)' }}
                aria-label="Academic Cluster"
            >
                <div
                    className="absolute inset-0 opacity-[0.02] pointer-events-none"
                    style={{ backgroundImage: 'radial-gradient(#145A32 1px, transparent 1px)', backgroundSize: '32px 32px' }}
                    aria-hidden="true"
                />

                <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 md:py-28">
                    <Reveal>
                        <div className="flex items-center gap-3 mb-4">
                            <p className="vp-serif text-3xl md:text-4xl font-semibold" style={{ color: 'var(--vp-gold)' }}>03</p>
                            <span className="text-[11px] font-bold tracking-[0.3em] uppercase" style={{ color: 'var(--vp-green-700)' }}>
                                Cluster Offices
                            </span>
                        </div>
                        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
                            <h2 className="vp-serif text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight" style={{ color: 'var(--vp-green-950)' }}>
                                Academic Cluster
                            </h2>
                            <p className="text-sm text-gray-500 max-w-md leading-relaxed">
                                Six major academic offices and colleges operating under the leadership of the Vice President for Academic Affairs.
                            </p>
                        </div>
                    </Reveal>

                    <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        {OFFICES.map((office, i) => {
                            const isActive = activeOffice === office.id;
                            return (
                                <Reveal key={office.id} delay={i * 100}>
                                    <button
                                        type="button"
                                        onClick={() => setActiveOffice(office.id)}
                                        aria-pressed={isActive}
                                        aria-label={`View ${office.name} details`}
                                        className="group w-full text-left h-full rounded-xl p-7 transition-all duration-500 relative overflow-hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                                        style={{
                                            background: isActive ? 'var(--vp-green-950)' : '#fff',
                                            border: `1px solid ${isActive ? 'var(--vp-gold)' : '#E7E2D6'}`,
                                            transform: isActive ? 'translateY(-6px)' : 'translateY(0)',
                                            boxShadow: isActive
                                                ? '0 24px 48px -16px rgba(11,61,31,0.35)'
                                                : '0 1px 3px rgba(11,61,31,0.06)',
                                            outlineColor: 'var(--vp-gold)',
                                        }}
                                    >
                                        {/* Subtle inner corner accent */}
                                        <div
                                            className="absolute top-0 right-0 w-20 h-20 opacity-10 pointer-events-none transition-opacity duration-500 group-hover:opacity-20"
                                            style={{
                                                background: `radial-gradient(circle at top right, ${isActive ? 'var(--vp-gold)' : 'var(--vp-green-700)'}, transparent 70%)`
                                            }}
                                            aria-hidden="true"
                                        />
                                        {/* Number */}
                                        <div className="flex items-start justify-between mb-6 relative">
                                            <span
                                                className="vp-serif text-5xl font-semibold leading-none"
                                                style={{ color: isActive ? 'var(--vp-gold)' : 'var(--vp-green-700)' }}
                                            >
                                                0{i + 1}
                                            </span>
                                            <div
                                                className="w-12 h-12 rounded-full flex items-center justify-center transition-transform duration-500 group-hover:scale-110"
                                                style={{
                                                    background: isActive ? 'rgba(199,154,62,0.15)' : 'var(--vp-sage)',
                                                    border: `1px solid ${isActive ? 'rgba(199,154,62,0.3)' : '#DEE6DB'}`,
                                                }}
                                            >
                                                <svg
                                                    className="w-5 h-5"
                                                    style={{ color: isActive ? 'var(--vp-gold)' : 'var(--vp-green-700)' }}
                                                    fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                                    aria-hidden="true"
                                                >
                                                    {office.icon}
                                                </svg>
                                            </div>
                                        </div>
                                        {/* Abbreviation label */}
                                        <p
                                            className="text-[10px] font-bold tracking-[0.25em] uppercase mb-2"
                                            style={{ color: isActive ? 'var(--vp-gold)' : 'var(--vp-gold-dark)' }}
                                        >
                                            {office.label}
                                        </p>
                                        {/* Office name */}
                                        <h3
                                            className="vp-serif text-lg font-semibold mb-4 leading-snug min-h-[3.5rem]"
                                            style={{ color: isActive ? '#fff' : 'var(--vp-green-950)' }}
                                        >
                                            {office.name}
                                        </h3>
                                        {/* Gold accent line — animates on hover */}
                                        <div
                                            className="h-0.5 w-0 group-hover:w-full transition-all duration-500"
                                            style={{ background: 'var(--vp-gold)' }}
                                            aria-hidden="true"
                                        />
                                        {/* Explore indicator */}
                                        <div
                                            className="mt-5 flex items-center gap-2 text-xs font-semibold"
                                            style={{ color: isActive ? 'var(--vp-gold)' : 'var(--vp-green-700)' }}
                                        >
                                            <span>{isActive ? 'Currently Viewing' : 'Explore Office'}</span>
                                            <svg className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                            </svg>
                                        </div>
                                    </button>
                                </Reveal>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ===================== 04 — Office Detail Panel ===================== */}
            <section
                className="relative vp-sans overflow-hidden"
                style={{ background: 'var(--vp-sage)' }}
                aria-label="Office Details"
            >
                <div className="absolute top-0 left-0 w-full h-0.5" style={{ background: 'var(--vp-gold)' }} aria-hidden="true" />

                <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-24">
                    {activeOfficeData && (
                        <AnimatedPanel key={activeOffice}>
                            {/* Office Header */}
                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-12">
                                <div className="lg:col-span-8 min-w-0">
                                    <div className="flex items-center gap-3 mb-3">
                                        <span className="h-px w-8" style={{ background: 'var(--vp-gold)' }} aria-hidden="true" />
                                        <span className="text-[10px] font-bold tracking-[0.3em] uppercase" style={{ color: 'var(--vp-gold-dark)' }}>
                                            {activeOfficeData.label} · Office Overview
                                        </span>
                                    </div>
                                    <h3 className="vp-serif text-2xl md:text-3xl lg:text-[2.25rem] font-semibold tracking-tight mb-5 leading-tight" style={{ color: 'var(--vp-green-950)' }}>
                                        {activeOfficeData.name}
                                    </h3>
                                    <p className="text-base leading-relaxed text-gray-700 max-w-[65ch]">
                                        {activeOfficeData.description}
                                    </p>
                                </div>
                                <div className="lg:col-span-4">
                                    <div
                                        className="rounded-xl p-6 h-full relative overflow-hidden"
                                        style={{ background: 'var(--vp-green-950)' }}
                                    >
                                        <div className="absolute top-0 right-0 w-24 h-24 rounded-full blur-2xl opacity-20" style={{ background: 'var(--vp-gold)' }} aria-hidden="true" />
                                        <div className="relative">
                                            <div
                                                className="w-14 h-14 rounded-full flex items-center justify-center mb-5"
                                                style={{ background: 'rgba(199,154,62,0.15)', border: '1px solid rgba(199,154,62,0.3)' }}
                                            >
                                                <svg className="w-6 h-6" style={{ color: 'var(--vp-gold)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                                    {activeOfficeData.icon}
                                                </svg>
                                            </div>
                                            <p className="text-[10px] font-bold tracking-[0.25em] uppercase mb-2" style={{ color: 'var(--vp-gold)' }}>
                                                Cluster Office
                                            </p>
                                            <p className="vp-serif text-lg font-semibold text-white leading-snug mb-3">
                                                {activeOfficeData.label}
                                            </p>
                                            <p className="text-xs text-white/60 leading-relaxed">
                                                Under the Vice President for Academics.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Core Functions */}
                            <div className="mb-16">
                                <div className="flex items-center gap-3 mb-6">
                                    <span className="h-px w-8" style={{ background: 'var(--vp-gold)' }} aria-hidden="true" />
                                    <p className="text-[10px] font-bold tracking-[0.3em] uppercase" style={{ color: 'var(--vp-gold-dark)' }}>
                                        Core Functions
                                    </p>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                                    {activeOfficeData.functions.map((fn, i) => (
                                        <div
                                            key={fn}
                                            className="group flex items-start gap-4 px-5 py-4 rounded-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg bg-white relative overflow-hidden"
                                            style={{ border: '1px solid #E7E2D6' }}
                                        >
                                            {/* Left gold accent bar */}
                                            <div
                                                className="absolute left-0 top-0 h-full w-0.5 transition-all duration-300 group-hover:w-1"
                                                style={{ background: 'var(--vp-gold)' }}
                                                aria-hidden="true"
                                            />
                                            <span
                                                className="vp-serif text-lg font-semibold flex-shrink-0 leading-none pt-1"
                                                style={{ color: 'var(--vp-green-700)' }}
                                            >
                                                {String(i + 1).padStart(2, '0')}
                                            </span>
                                            <span className="text-sm text-gray-700 font-medium pt-0.5">{fn}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Organizational Structure */}
                            <div>
                                <div className="flex items-center gap-3 mb-8">
                                    <span className="h-px w-8" style={{ background: 'var(--vp-gold)' }} aria-hidden="true" />
                                    <p className="text-[10px] font-bold tracking-[0.3em] uppercase" style={{ color: 'var(--vp-gold-dark)' }}>
                                        Organizational Structure
                                    </p>
                                </div>
                                <div
                                    className="rounded-xl p-6 md:p-10 overflow-x-auto relative"
                                    style={{
                                        background: 'linear-gradient(180deg, rgba(238,242,236,0.6), rgba(251,249,244,0.4))',
                                        border: '1px solid rgba(199,154,62,0.15)',
                                    }}
                                >
                                    <div className="min-w-[320px] flex justify-center">
                                        {activeOffice === 'support' ? (
                                            <AcademicSupportOrgChart root={activeOfficeData.orgChart} />
                                        ) : (
                                            <OfficeOrgChart root={activeOfficeData.orgChart} />
                                        )}
                                    </div>
                                </div>
                            </div>
                        </AnimatedPanel>
                    )}
                </div>
            </section>

            {/* ===================== Footer spacing ===================== */}
            <div className="h-4" style={{ background: 'var(--vp-paper)' }} aria-hidden="true" />
        </MainLayout>
    );
}

function AcademicSupportOrgChart({ root }) {
    const osas = root.children[0];
    const supportOffices = root.children[1].children;

    const health = osas.children.find((n) => n.name === 'Head, Health Services');
    const nurses = osas.children.find((n) => n.name === 'College Physician and Nurses');
    const dentist = osas.children.find((n) => n.name === 'College Dentist');
    const osasMain = osas.children.filter((n) => ![health, nurses, dentist].includes(n));

    const LINE = 'bg-[#145A32]/30';

    // Upgraded to match the white card theme of OfficeOrgChart
    const WhiteCard = ({ name }) => (
        <div className="relative w-full px-5 py-4 bg-white border border-[#E7E2D6] rounded-xl shadow-sm text-center transition-all duration-500 ease-out-expo group hover:-translate-y-1 hover:border-[#145A32] hover:shadow-xl">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#145A32] to-[#C79A3E] rounded-t-lg transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
            <span className="text-[13px] font-semibold text-gray-800 leading-snug">{name}</span>
        </div>
    );

    return (
        <div className="w-full max-w-[280px] mx-auto flex flex-col items-stretch">
            {/* Root */}
            <WhiteCard name={root.name} />
            <div className={`w-px h-10 mx-auto ${LINE}`} aria-hidden="true" />

            {/* Director */}
            <WhiteCard name={osas.name} />
            <div className={`w-px h-10 mx-auto ${LINE}`} aria-hidden="true" />

            {/* Main spine list */}
            <div className="relative pl-6 pr-6">
                {/* vertical spine */}
                <span className={`absolute left-0 top-4 bottom-4 w-px ${LINE}`} aria-hidden="true" />

                {osasMain.map((node) => (
                    <div key={node.name} className="relative py-2">
                        <span className={`absolute -left-6 top-1/2 w-6 h-px ${LINE} -translate-y-1/2`} aria-hidden="true" />
                        <WhiteCard name={node.name} />
                    </div>
                ))}

                {/* Health services + nurses + dentist, grouped by a right-side bracket */}
                <div className="relative mt-2">
                    <span
                        className={`absolute -right-6 top-4 bottom-4 w-px ${LINE}`}
                        aria-hidden="true"
                    />

                    <div className="relative py-2">
                        <span className={`absolute -left-6 top-1/2 w-6 h-px ${LINE} -translate-y-1/2`} aria-hidden="true" />
                        <span className={`absolute -right-6 top-1/2 w-6 h-px ${LINE} -translate-y-1/2`} aria-hidden="true" />
                        <WhiteCard name={health.name} />
                    </div>
                    <div className="relative py-2">
                        <span className={`absolute -right-6 top-1/2 w-6 h-px ${LINE} -translate-y-1/2`} aria-hidden="true" />
                        <WhiteCard name={nurses.name} />
                    </div>
                    <div className="relative py-2">
                        <span className={`absolute -right-6 top-1/2 w-6 h-px ${LINE} -translate-y-1/2`} aria-hidden="true" />
                        <WhiteCard name={dentist.name} />
                    </div>
                </div>
            </div>

            {/* Support offices — stacked block, no spine, just a gap */}
            <div className="mt-16 flex flex-col gap-3">
                {supportOffices.map((node) => (
                    <WhiteCard key={node.name} name={node.name} />
                ))}
            </div>
        </div>
    );
}