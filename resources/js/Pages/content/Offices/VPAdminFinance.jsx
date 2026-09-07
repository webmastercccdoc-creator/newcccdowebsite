import { useEffect, useMemo, useRef, useState } from 'react';
import MainLayout from '../../../layouts/MainLayout';
import vpAdminFinanceBanner from '../../../assets/banner/vpadminfinance-banner.png';
import AnimatedBannerText from '../../../components/content/AnimatedBannerText';
import kurtCandilasImage from '../../../assets/images/Dr_Kurt_Candilas.png';
import ccdologo from '../../../assets/logos/ccdologo.png';
import topsonImg from '../../../assets/images/topson.png';
import cebImg from '../../../assets/images/ceb.png';
import anaImg from '../../../assets/images/ana.png';
import notailImg from '../../../assets/images/notail.png';
import jeraxImg from '../../../assets/images/jerax.png';

/* ============================================================================
   DATA CONTENT
   ============================================================================ */
const BIONOTE_PARAGRAPHS = [
    <>Dr. Kurt S. Candilas is the Vice President for Administration at the City College of Cagayan de Oro, Philippines, and former College Dean of Lourdes College, Inc. In his current capacity, he provides administrative and financial leadership and oversees key institutional offices and services, including Human Resources, the Technology Innovation and Data Management Center, and Physical Plant Services. He earned his Bachelor of Arts in English from Bukidnon State University, his Master&apos;s in Education majoring in Teaching English Communication Arts from Lourdes College, and his Doctor of Philosophy in English majoring in Literature from the University of San Jose&ndash;Recoletos, Cebu City. He also holds an advanced TESOL certification from the American TESOL Institute of the Philippines.</>,
    <>With his expertise in English communication arts, Dr. Candilas was designated by the Commission on Higher Education (CHED) as a regional trainer for Purposive Communication, a General Education subject in the higher education curriculum. He is also the lead author of <em>Purposive Communication with Sustainable Development Goals Integration</em>, published by Mindshapers Co., Inc. in 2025. As a researcher, he has also contributed to scholarly work on qualitative research design and methodology.</>,
    <>He has received several international research distinctions, including Best Paper Presentation at the 2nd International Conference on Languages, Linguistics, and Society (Malaysia, 2018), the 7th OpenTESOL International Conference (Vietnam, 2019), and the Best Research Paper and Best Presenter Awards at the 2023 International Conference on Education, Business, and Science and Technology (Philippines). In 2025, he was awarded the Best Session Paper Award, together with his colleagues, during the 5th International Conference and 2025 NOTED National Convention (Network of Outstanding Teachers and Educators).</>,
    <>He also serves on advisory and editorial boards and as a peer reviewer for journals and conferences across Asia and North America. His research interests include communication, literature, linguistics, education, and religion.</>,
];

const BIONOTE_PREVIEW_COUNT = 2;

const CREDENTIALS = [
    {
        title: 'Academic Background',
        lines: ['PhD in English Literature', 'MA in Education | BA in English'],
        icon: (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
                d="M12 14l9-5-9-5-9 5 9 5z M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
        ),
    },
    {
        title: 'Professional Certification',
        lines: ['Advanced TESOL Certification', 'American TESOL Institute'],
        icon: (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        ),
    },
    {
        title: 'Regional CHED Trainer',
        lines: ['Purposive Communication', 'General Education Subject'],
        icon: (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
                d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m5-2.13a4 4 0 100-8 4 4 0 000 8z" />
        ),
    },
    {
        title: 'Published Author',
        lines: ['Purposive Communication with', 'SDG Integration (2025)'],
        icon: (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
                d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
        ),
    },
];

const OFFICES = [
    {
        id: 'hr',
        label: 'Human Resources',
        name: 'Human Resources Office',
        description:
            'The Human Resources Office manages personnel administration, employee services, recruitment, development, records, and related institutional functions.',
        functions: [
            'Recruitment and Selection', 'Personnel Records Management', 'Employee Relations',
            'Training and Development', 'Performance Management', 'Employee Welfare',
        ],
        // Updated Org Chart Structure based on Text Tree
        orgChart: [
            { title: 'Executive Level', nodes: ['Office of the Vice President for Administration and Finance'], emphasize: true },
            { title: 'Office Head', nodes: ['Director, Human Resource Management and Development Office'], emphasize: true },
            {
                title: 'Unit Heads',
                nodes: [
                    'Head, Human Resource Development',
                    'Head, Human Resource and Management',
                ],
                branch: true,
            },
        ],
        icon: (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
                d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m5-2.13a4 4 0 100-8 4 4 0 000 8zm6 1a4 4 0 10-1-7.87" />
        ),
    },
    {
        id: 'finance',
        label: 'Finance',
        name: 'Finance Office',
        description:
            'The Finance Office handles budget management, financial planning, accounting services, disbursements, financial reporting, and institutional records.',
        functions: [
            'Budget Management', 'Financial Planning', 'Accounting Services',
            'Disbursement', 'Financial Reporting', 'Records and Documentation',
        ],
        // Updated Org Chart Structure based on Text Tree
        orgChart: [
            { title: 'Executive Level', nodes: ['Office of the Vice President for Administration and Finance'], emphasize: true },
            { title: 'Office Head', nodes: ['Director, Finance'], emphasize: true },
            {
                title: 'Unit Heads',
                nodes: [
                    'Head, Budget Management Division',
                    'Head, Payroll Management Division',
                    'Head, Procurement Services Division',
                    'Head, Local Economic Enterprise',
                    'In Charge, Assessment Center',
                ],
                branch: true,
            },
        ],
        icon: (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
                d="M9 17V9m3 8V5m3 12v-5M5 21h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2z" />
        ),
    },
    {
        id: 'pps',
        label: 'PPS',
        name: 'Physical Plant and Services',
        description:
            'PPS oversees facilities, maintenance, campus infrastructure, utilities, safety, and physical plant operations to ensure a conducive learning environment.',
        functions: [
            'Facilities Management', 'Building Maintenance', 'Electrical and Plumbing',
            'Campus Grounds', 'Utilities Management', 'General Physical Plant Services',
        ],
        // Updated Org Chart Structure based on Text Tree
        orgChart: [
            { title: 'Executive Level', nodes: ['Office of the Vice President for Administration and Finance'], emphasize: true },
            { title: 'Office Head', nodes: ['Director, Physical Plant Services'], emphasize: true },
            {
                title: 'Unit Heads',
                nodes: [
                    'Head, Campus Infrastructure and Maintenance',
                    'Head, General Maintenance',
                    'Head, Events and Mobility',
                    'Head, Campus Security',
                ],
                branch: true,
            },
        ],
        icon: (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
                d="M3 21h18M5 21V10l7-6 7 6v11M9 21v-6h6v6" />
        ),
    },
    {
        id: 'tidmac',
        label: 'TIDMAC',
        name: 'Technology Innovation & Data Management Center',
        description:
            'TIDMAC covers institutional technology, information systems, data management, digital services, technical support, and institutional technology innovation.',
        functions: [
            'Information Systems', 'Data Management', 'IT Technical Support',
            'Website and Web Systems', 'Digital Transformation', 'Network Infrastructure',
            'Technology Innovation', 'Institutional Data Services',
        ],
        // Updated Org Chart Structure based on Text Tree
        orgChart: [
            { title: 'Executive Level', nodes: ['Office of the Vice President for Administration and Finance'], emphasize: true },
            { title: 'Office Head', nodes: ['Director, Technology Innovation and Data Management Center'], emphasize: true },
            {
                title: 'Unit Heads',
                nodes: [
                    'Head, System Network and Infrastructure',
                    'Head, System Management and Development',
                    'Head, Digital System and Innovation',
                    'Head, System Planning and Quality Assurance',
                ],
                branch: true,
            },
        ],
        icon: (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
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

/* Office Org Chart Component — Tree-style with branch connectors */
function OfficeOrgChart({ levels }) {
    const isLastLevel = (idx) => idx === levels.length - 1;

    return (
        <div className="flex flex-col items-center w-full">
            {levels.map((level, levelIndex) => {
                const isMulti = level.nodes.length > 1;
                const showBranchConnector = level.branch && levelIndex > 0;

                return (
                    <div key={level.title} className="w-full flex flex-col items-center">
                        {/* Vertical connector from previous level */}
                        {levelIndex > 0 && !showBranchConnector && (
                            <div className="flex flex-col items-center mb-4" aria-hidden="true">
                                <div className="w-px h-10 bg-gradient-to-b from-transparent to-[#145A32]/30" />
                            </div>
                        )}
                        {levelIndex > 0 && showBranchConnector && (
                            <div className="flex flex-col items-center mb-2" aria-hidden="true">
                                <div className="w-px h-8 bg-gradient-to-b from-transparent to-[#145A32]/30" />
                            </div>
                        )}

                        {/* Level Label */}
                        <p className="text-[10px] font-bold tracking-[0.3em] text-[#A97F2E] uppercase mb-4 font-sans text-center">
                            {level.title}
                        </p>

                        {/* Branch row with tree connectors */}
                        {showBranchConnector ? (
                            <div className="relative w-full max-w-5xl mx-auto">
                                {/* Top horizontal connector line that spans across nodes */}
                                <div className="relative flex justify-center items-start gap-4 flex-wrap">
                                    {level.nodes.map((node, nodeIdx) => {
                                        const isFirstChild = nodeIdx === 0;
                                        const isLastChild = nodeIdx === level.nodes.length - 1;
                                        return (
                                            <div key={node} className="relative flex flex-col items-center min-w-[180px]">
                                                {/* Vertical drop line from horizontal connector */}
                                                <div
                                                    className="w-px h-6 bg-[#145A32]/30 mb-0"
                                                    aria-hidden="true"
                                                />
                                                <div
                                                    className={`min-w-[180px] px-5 py-4 bg-white border rounded-xl shadow-sm text-center transition-all duration-500 ease-out-expo relative group hover:-translate-y-1 ${
                                                        level.emphasize
                                                            ? 'border-[#C79A3E] shadow-md'
                                                            : 'border-[#E7E2D6] hover:border-[#145A32] hover:shadow-xl'
                                                    }`}
                                                >
                                                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#145A32] to-[#C79A3E] rounded-t-lg transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                                                    <span className="text-[13px] font-semibold text-gray-800 leading-snug">{node}</span>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                                {/* Horizontal line connecting all branch nodes */}
                                <div
                                    className="absolute top-0 left-1/2 -translate-x-1/2 h-px bg-[#145A32]/30"
                                    style={{
                                        width: `calc(100% - 180px)`,
                                        maxWidth: '700px',
                                    }}
                                    aria-hidden="true"
                                />
                            </div>
                        ) : (
                            /* Single (or emphasized) level row */
                            <div className="flex flex-wrap justify-center gap-4 w-full mb-8">
                                {level.nodes.map((node) => (
                                    <div
                                        key={node}
                                        className={`min-w-[220px] px-6 py-4 bg-white border rounded-xl shadow-sm text-center hover:-translate-y-1 transition-all duration-500 ease-out-expo relative group ${
                                            level.emphasize
                                                ? 'border-[#C79A3E] shadow-md hover:shadow-xl'
                                                : 'border-[#E7E2D6] hover:border-[#145A32] hover:shadow-xl'
                                        }`}
                                    >
                                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#145A32] to-[#C79A3E] rounded-t-lg transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                                        <span className="text-sm font-semibold text-gray-800">{node}</span>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Trailing space for non-final branch levels */}
                        {showBranchConnector && !isLastLevel(levelIndex) && (
                            <div className="h-8" aria-hidden="true" />
                        )}
                    </div>
                );
            })}
        </div>
    );
}

/* TIDMAC Team Carousel Component */
function TidmacTeamCarousel() {
    const trackRef = useRef(null);
    const mouseDownAt = useRef(0);
    const prevPercentage = useRef(-50);
    const percentage = useRef(-50);

    useEffect(() => {
        const handleMouseUp = () => {
            if (mouseDownAt.current !== 0) {
                mouseDownAt.current = 0;
                prevPercentage.current = percentage.current;
            }
        };

        const handleMouseMove = (e) => {
            if (mouseDownAt.current === 0) return;
            const track = trackRef.current;
            if (!track) return;

            const mouseDelta = mouseDownAt.current - e.clientX;
            const maxDelta = window.innerWidth / 2;

            const movePercentage = (mouseDelta / maxDelta) * -100;
            const nextPercentageUnconstrained = prevPercentage.current + movePercentage;
            const nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, -20), -80);

            percentage.current = nextPercentage;

            track.animate({
                transform: `translate(${nextPercentage}%, -50%)`
            }, { duration: 1200, fill: "forwards" });

            const children = track.childElementCount;
            for (const image of track.querySelectorAll(".tidmac-image")) {
                image.animate({
                    objectPosition: `${nextPercentage / children + (50 + 50 / children)}% center`
                }, { duration: 1200, fill: "forwards" });
            }
        };

        window.addEventListener('mouseup', handleMouseUp);
        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('mouseup', handleMouseUp);
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    const handleMouseDown = (e) => {
        mouseDownAt.current = e.clientX;
    };

    const teamMembers = [
        { name: 'Jocynt', img: cebImg },
        { name: 'Zy', img: anaImg },
        { name: 'Jamie', img: notailImg },
        { name: 'Jess', img: topsonImg },
        { name: 'Christian', img: jeraxImg },
    ];

    return (
        <div className="mt-12 sm:mt-16 border-t border-white/10 pt-8 sm:pt-12">
            <h4 className="text-xs font-bold tracking-[0.3em] uppercase text-[#D4AF37] mb-6 text-center">Meet the Team</h4>
            <div className="tidmac-carousel">
                <div
                    ref={trackRef}
                    className="tidmac-track"
                    onMouseDown={handleMouseDown}
                    style={{ transform: 'translate(-50%, -50%)' }}
                >
                    {teamMembers.map((member, i) => (
                        <div className="tidmac-frame" key={i}>
                            <span className="tidmac-header">{member.name}</span>
                            <img className="tidmac-image" src={member.img} alt={member.name} draggable="false" />
                            <div className="tidmac-textbox">
                                <span className="tidmac-subheader">TIDMAC Staff</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default function VPAdminFinance() {
    const [scrollProgress, setScrollProgress] = useState(0);
    const [activeOffice, setActiveOffice] = useState('hr');
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

                /* TIDMAC Carousel Dark Premium Skin */
                .tidmac-carousel {
                    position: relative;
                    width: 100%;
                    height: 320px; 
                    overflow: hidden;
                    user-select: none;
                    -webkit-user-select: none;
                }
                @media (min-width: 768px) {
                    .tidmac-carousel { height: 400px; }
                }
                .tidmac-track {
                    display: flex;
                    gap: 1.5vmin;
                    position: absolute;
                    left: 50%;
                    top: 50%;
                    align-items: center;
                    cursor: grab;
                }
                .tidmac-track:active { cursor: grabbing; }
                .tidmac-frame {
                    width: 18vmin;
                    height: 40vmin;
                    max-height: 280px;
                    transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
                    filter: brightness(50%) saturate(0.8);
                    user-select: none;
                    display: grid;
                    grid-template-rows: auto 20%;
                    overflow: hidden;
                    position: relative;
                    border-radius: 12px;
                    border: 1px solid rgba(255,255,255,0.1);
                    box-shadow: 0 10px 30px -5px rgba(0,0,0,0.5);
                }
                @media (min-width: 768px) {
                    .tidmac-frame { width: 16vmin; max-height: 320px; }
                }
                .tidmac-frame:hover {
                    width: 32vmin; 
                    filter: brightness(100%) saturate(1);
                }
                .tidmac-image {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    object-position: 50% 50%;
                    grid-row-start: 1;
                    grid-row-end: 3;
                    grid-column-start: 1;
                    grid-column-end: 2;
                    pointer-events: none;
                }
                .tidmac-header {
                    font-family: 'Inter', sans-serif;
                    font-size: clamp(1rem, 2.5vw, 1.5rem);
                    position: relative;
                    left: 10vmin;
                    top: 2vmin;
                    transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
                    grid-row-start: 1;
                    grid-row-end: 2;
                    grid-column-start: 1;
                    grid-column-end: 2;
                    color: transparent;
                    white-space: nowrap;
                    z-index: 10;
                    font-weight: 600;
                }
                .tidmac-frame:hover .tidmac-header {
                    left: 1.5vmin;
                    color: #ffffff;
                    text-shadow: 0 0 1rem #000, 0 0 1rem #000, 0 0 1rem #000;
                }
                .tidmac-textbox {
                    background-color: transparent;
                    transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
                    grid-row-start: 2;
                    grid-row-end: 3;
                    grid-column-start: 1;
                    grid-column-end: 2;
                    display: flex;
                    width: 90%;
                    height: fit-content;
                    padding: 1.5vmin;
                    margin: 1.5vmin;
                    box-sizing: border-box;
                    max-height: 90%;
                    justify-self: center;
                    align-self: end;
                }
                .tidmac-frame:hover .tidmac-textbox {
                    background-color: rgba(10, 46, 24, 0.9);
                    backdrop-filter: blur(4px);
                }
                .tidmac-subheader {
                    font-family: 'Inter', sans-serif;
                    font-size: clamp(0.6rem, 1.4vw, 0.8rem);
                    position: relative;
                    left: 10vmin;
                    transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
                    color: transparent;
                    white-space: nowrap;
                    align-self: end;
                }
                .tidmac-frame:hover .tidmac-subheader {
                    left: 1.5vmin;
                    color: #D4AF37;
                    text-shadow: 0 0 1rem #000, 0 0 1rem #000, 0 0 1rem #000;
                }
            `}</style>

            {/* Scroll Progress Indicator */}
            <div className="fixed top-0 left-0 w-full h-1 z-[1000] bg-transparent">
                <div
                    className="h-full transition-[width] duration-100 ease-out"
                    style={{ width: `${scrollProgress}%`, background: 'linear-gradient(90deg, var(--vp-green-mid), var(--vp-gold))' }}
                />
            </div>

            {/* ===================== Hero Banner (UNCHANGED) ===================== */}
            <div
                className="relative w-full bg-cover bg-center bg-no-repeat shadow-lg min-h-[350px] md:min-h-[450px] lg:min-h-[550px] flex items-center justify-center"
                style={{ backgroundImage: `url(${vpAdminFinanceBanner})` }}
            >
                <div className="absolute inset-0 bg-black/50"></div>
                <AnimatedBannerText
                    title="Vice President for Administration & Finance"
                    description="Administrative and financial leadership at the City College of Cagayan de Oro."
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
                                Dr. Kurt S. <br/>Candilas
                            </h1>
                        </Reveal>
                        <Reveal delay={300}>
                            <p className="text-base sm:text-lg md:text-xl text-white/60 max-w-xl mb-8 sm:mb-12">
                                Vice President for Administration & Finance at the City College of Cagayan de Oro.
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
                                    src={kurtCandilasImage} 
                                    alt="Dr. Kurt S. Candilas" 
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
                                        <p className="text-xs sm:text-sm font-semibold text-white">Dr. Kurt S. Candilas</p>
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

            {/* ===================== 04 — Administration & Finance Cluster ===================== */}
            <section
                className="relative vp-sans overflow-hidden"
                style={{ background: 'var(--vp-paper)' }}
                aria-label="Administration and Finance Cluster"
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
                                Administration &amp; Finance Cluster
                            </h2>
                            <p className="text-sm text-gray-500 max-w-md leading-relaxed">
                                Four institutional offices operating under the leadership of the Vice President for Administration and Finance.
                            </p>
                        </div>
                    </Reveal>

                    <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
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

            {/* ===================== 05 — Office Detail Panel ===================== */}
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
                                                Under the Vice President for Administration and Finance.
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
                                    <div className="min-w-[320px]">
                                        <OfficeOrgChart levels={activeOfficeData.orgChart} />
                                    </div>
                                </div>
                            </div>

                            {/* TIDMAC Team Carousel */}
                            {activeOffice === 'tidmac' && (
                                <TidmacTeamCarousel />
                            )}
                        </AnimatedPanel>
                    )}
                </div>
            </section>

            {/* ===================== Footer spacing ===================== */}
            <div className="h-4" style={{ background: 'var(--vp-paper)' }} aria-hidden="true" />
        </MainLayout>
    );
}