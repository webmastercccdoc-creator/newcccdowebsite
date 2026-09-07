import { useEffect, useMemo, useRef, useState } from 'react';
import MainLayout from '../../../layouts/MainLayout';
import vpResearchExtensionBanner from '../../../assets/banner/ovpreseaechextension-banner.png';
import AnimatedBannerText from '../../../components/content/AnimatedBannerText';
import drMahinayImage from '../../../assets/images/Dr_Butch_Mahinay.png';
import ccdologo from '../../../assets/logos/ccdologo.png';

/* ============================================================================
   DATA CONTENT
   ============================================================================ */
const BIONOTE_PARAGRAPHS = [
    <>Dr. Ray Butch D. Mahinay, Professor I, is an educator, researcher, academic administrator, and advocate for inclusive education who currently serves as Vice President for Research and Extension (REx) and as Coordinator of the Center for Alternative Learning System (CALS) of the City College of Cagayan de Oro. His professional work integrates research leadership, teacher education, program and policy development, community engagement, and the Alternative Learning System.</>,
    <>His research engagements focus primarily on teacher education, alternative learning, and teacher professional development. He currently serves as Co-Lead of a Teacher Education Council (TEC)-funded research study on mentoring for pre-service teachers in Teacher Education Institutions in the Visayas and Mindanao, and he coordinates a national study on the 4As instructional approach in the Alternative Learning System for the DepEd Bureau of Alternative Education (BAE). He founded the Mindanao Journal of Alternative Education Studies (MJAES) in 2024, providing the country&apos;s first scholarly platform devoted to research on alternative education. His scholarly work includes articles indexed in Scopus and Web of Science.</>,
    <>Dr. Mahinay is likewise actively involved in teacher education curriculum development and reform. He has participated in national workshops on the reframing of the pre-service teacher education curriculum and serves as Lead Person for the Certificate Program in Alternative Learning System, involving the Research Institute for Teacher Quality (RITQ), Teacher Education Council (TEC), and Commission on Higher Education (CHED).</>,
    <>He has devoted a significant part of his professional career to the Alternative Learning System. He previously served as Education Program Supervisor for ALS at DepEd Regional Office X, where he served as a national chief trainer for ALS 2.0 and co-authored the ALS 2.0 Curriculum Guide. His ALS engagements also highlighted instructional materials review with international partner institutions such as SEAMEO INNOTECH and UNESCO Jakarta. He established ALS&ndash;Senior High School inside the Cagayan de Oro City Jail and Drug Rehabilitation Center in 2019, potentially the first implementation of its kind in the country.</>,
    <>Academically, Dr. Mahinay holds a Doctor of Philosophy in Educational Planning and Management from the University of Science and Technology of Southern Philippines, a Master of Arts in Science Education major in General Science from Bukidnon State University, and a Bachelor of Secondary Education major in General Science from Xavier University&ndash;Ateneo de Cagayan.</>,
    <>He is a Career Executive Service (CES) Written Examination passer, Licensed Professional Teacher for Physical Science, Dynamic Learning Program (DLP) Ambassador by PLDT-Smart Communities, Certified Learning Facilitator of the National Educators Academy of the Philippines (NEAP), and an Associate Member of the DOST National Research Council of the Philippines (NRCP), Division VIII&ndash;Social Sciences.</>,
    <>As Vice President for Research and Extension, Dr. Mahinay advocates an evidence-driven, community-responsive approach to higher education, where research informs policy and practice, extension responds to documented community needs, and both strengthen instruction, institutional development, and sustainable community impact.</>,
];

const BIONOTE_PREVIEW_COUNT = 2;

const CREDENTIALS = [
    {
        title: 'Academic Background',
        lines: ['PhD in Educational Planning & Management', 'MA & BS in Science Education'],
        icon: (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
                d="M12 14l9-5-9-5-9 5 9 5z M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
        ),
    },
    {
        title: 'Research Leadership',
        lines: ['Vice President for R&E', 'Founder of MJAES (2024)'],
        icon: (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        ),
    },
    {
        title: 'Professional Licenses',
        lines: ['Licensed Professional Teacher', 'Career Executive Service (CES) Passer'],
        icon: (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        ),
    },
    {
        title: 'Affiliations',
        lines: ['NRCP Associate Member (Div. VIII)', 'NEAP Certified Learning Facilitator'],
        icon: (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
                d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m5-2.13a4 4 0 100-8 4 4 0 000 8zm6 1a4 4 0 10-1-7.87" />
        ),
    },
];

const OFFICES = [
    {
        id: 'research',
        label: 'Research',
        name: 'Research, Innovation and Technology Transfer Services',
        description:
            'The Research Office coordinates institutional research, facilitates grants, oversees ethical compliance, and promotes a strong research culture.',
        functions: [
            'Research Policy Formulation', 'Grant and Funding Management', 'Research Ethics Oversight', 
            'Research Dissemination', 'Faculty and Student Support', 'Research Capability Building',
        ],
        // Nested Org Chart Structure based on Text Tree
        orgChart: {
            name: 'Office of the Vice President for Research and Extension',
            children: [
                {
                    name: 'Director, Research, Innovation, and Technology Transfer Services',
                    children: [
                        { name: 'Coordinator for Research and Technology Transfer Services' },
                        { name: 'Coordinator for Innovation and Licensing Office' }
                    ]
                }
            ]
        },
        icon: (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
                d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        ),
    },
    {
        id: 'extension',
        label: 'Extension',
        name: 'Extension and Social Development Services',
        description:
            'The Extension Office manages community engagement, outreach initiatives, and technology transfer for sustainable community development.',
        functions: [
            'Community Needs Assessment', 'Extension Program Development', 'Partnership Building', 
            'Project Monitoring', 'Technology Transfer', 'Impact Assessment',
        ],
        // Nested Org Chart Structure based on Text Tree
        orgChart: {
            name: 'Office of the Vice President for Research and Extension',
            children: [
                {
                    name: 'Director, Extension and Social Development Services',
                    children: [
                        { name: 'Coordinator, Community Extension Office' },
                        { 
                            name: 'Coordinator, Outreach and Volunteerism Office',
                            children: [
                                { name: 'Focal Person, Gender and Development' },
                                { name: 'Focal Person, Center for Alternative Learning System' },
                                { name: 'Focal Person, Center for Human Rights Education' }
                            ]
                        }
                    ]
                }
            ]
        },
        icon: (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
                d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
        ),
    },
    {
        id: 'publications',
        label: 'Publications',
        name: 'Institutional Research Ethics Committee',
        description:
            'The Publications Office oversees academic journals, research folios, and scholarly dissemination while upholding academic integrity and peer review.',
        functions: [
            'Journal Management', 'Peer Review Coordination', 'Academic Publishing', 
            'Copyright and Ethics', 'Research Indexing', 'Dissemination Strategy',
        ],
        // Nested Org Chart Structure based on Text Tree
        orgChart: {
            name: 'Office of the Vice President for Research and Extension',
            children: [
                { name: 'Chair, Institutional Research Ethics Committee' }
            ]
        },
        icon: (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        ),
    },
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

/* Recursive Node Component for Mathematically Perfect Tree-style Org Chart */
function OrgNode({ node, isRoot = false }) {
    const hasChildren = node.children && node.children.length > 0;

    return (
        <li className="relative flex flex-col items-center list-none">
            {/* Node Box */}
            <div className={`relative px-5 py-4 bg-white border rounded-xl shadow-sm text-center transition-all duration-500 ease-out-expo group hover:-translate-y-1 z-10 ${
                isRoot 
                    ? 'border-[#C79A3E] shadow-md hover:shadow-xl w-[300px]' 
                    : 'border-[#E7E2D6] hover:border-[#145A32] hover:shadow-xl w-[240px]'
            }`}>
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#145A32] to-[#C79A3E] rounded-t-lg transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                <span className="text-[13px] font-semibold text-gray-800 leading-snug">{node.name}</span>
            </div>

            {hasChildren && (
                <ul className="flex justify-center relative">
                    {node.children.map((child, i) => (
                        <OrgNode key={i} node={child} />
                    ))}
                </ul>
            )}
        </li>
    );
}

/* Office Org Chart Wrapper */
function OfficeOrgChart({ root }) {
    return (
        <ul className="org-tree flex justify-center w-full">
            <OrgNode node={root} isRoot={true} />
        </ul>
    );
}

export default function VPResearchExtension() {
    const [scrollProgress, setScrollProgress] = useState(0);
    const [activeOffice, setActiveOffice] = useState('research');
    const [bioExpanded, setBioExpanded] = useState(false);

    useEffect(() => {
        document.title = "VP for Research & Extension - City College of Cagayan de Oro";

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

                /* Bulletproof CSS Tree Connectors for Org Chart */
                .org-tree, .org-tree ul {
                    display: flex;
                    justify-content: center;
                    position: relative;
                    padding: 0;
                    margin: 0;
                    list-style: none;
                }
                .org-tree li {
                    position: relative;
                    padding: 20px 12px 0 12px;
                    list-style: none;
                }
                .org-tree > li {
                    padding-top: 0;
                }
                .org-tree li::before, .org-tree li::after {
                    content: '';
                    position: absolute;
                    top: 0;
                    right: 50%;
                    border-top: 1px solid rgba(20, 90, 50, 0.3);
                    width: 50%;
                    height: 20px;
                }
                .org-tree li::after {
                    right: auto;
                    left: 50%;
                    border-left: 1px solid rgba(20, 90, 50, 0.3);
                }
                .org-tree li:only-child::after, .org-tree li:only-child::before {
                    display: none;
                }
                .org-tree li:only-child {
                    padding-top: 20px;
                }
                .org-tree > li:only-child {
                    padding-top: 0;
                }
                .org-tree li:first-child::before, .org-tree li:last-child::after {
                    border: 0 none;
                }
                .org-tree li:last-child::before {
                    border-right: 1px solid rgba(20, 90, 50, 0.3);
                    border-radius: 0 5px 0 0;
                }
                .org-tree li:first-child::after {
                    border-radius: 5px 0 0 0;
                }
                .org-tree ul ul::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 50%;
                    border-left: 1px solid rgba(20, 90, 50, 0.3);
                    width: 0;
                    height: 20px;
                }
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
                style={{ backgroundImage: `url(${vpResearchExtensionBanner})` }}
            >
                <div className="absolute inset-0 bg-black/50"></div>
                <AnimatedBannerText
                    title="Vice President for Research & Extension"
                    description="Impactful research, innovation, and community partnerships for sustainable development."
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
                                Dr. Ray Butch D. <br/>Mahinay
                            </h1>
                        </Reveal>
                        <Reveal delay={300}>
                            <p className="text-base sm:text-lg md:text-xl text-white/60 max-w-xl mb-8 sm:mb-12">
                                Vice President for Research & Extension at the City College of Cagayan de Oro.
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
                                    src={drMahinayImage} 
                                    alt="Dr. Ray Butch D. Mahinay" 
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
                                        <p className="text-xs sm:text-sm font-semibold text-white">Dr. Ray Butch D. Mahinay</p>
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

            {/* ===================== 03 — Research & Extension Cluster ===================== */}
            <section
                className="relative vp-sans overflow-hidden"
                style={{ background: 'var(--vp-paper)' }}
                aria-label="Research and Extension Cluster"
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
                                Research &amp; Extension Cluster
                            </h2>
                            <p className="text-sm text-gray-500 max-w-md leading-relaxed">
                                Three institutional offices operating under the leadership of the Vice President for Research and Extension.
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
                                                Under the Vice President for Research and Extension.
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
                                        <OfficeOrgChart root={activeOfficeData.orgChart} />
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