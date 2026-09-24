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
    <>Dr. Kurt S. Candilas, PhD, LPT is the Vice President for Administration at the City College of Cagayan de Oro, Philippines, and former College Dean of Lourdes College, Inc. In his current capacity, he provides administrative and financial leadership and oversees key institutional offices and services, including Human Resources, the Technology Innovation and Data Management Center, and Physical Plant Services. He earned his Bachelor of Arts in English from Bukidnon State University, his Master&apos;s in Education majoring in Teaching English Communication Arts from Lourdes College, and his Doctor of Philosophy in English majoring in Literature from the University of San Jose&ndash;Recoletos, Cebu City. He also holds an advanced TESOL certification from the American TESOL Institute of the Philippines.</>,

    <>With his expertise in English communication arts, Dr. Candilas was designated by the Commission on Higher Education (CHED) as a regional trainer for Purposive Communication, a General Education subject in the higher education curriculum. He is the lead author of <em>Purposive Communication with Sustainable Development Goals Integration</em>, published by Mindshapers Co., Inc. in 2025, and the author of <em>Qualitative Research Design: Concepts, Methods, and Applications</em>, published by Unlimited Books Library Services &amp; Publishing Inc. His scholarly work focuses on communication, education, qualitative research methodology, literature, linguistics, and related interdisciplinary fields.</>,

    <>Dr. Candilas has received several international and national research distinctions, including Best Paper Presentation at the 2nd International Conference on Languages, Linguistics, and Society (Malaysia, 2018), the 7th OpenTESOL International Conference (Vietnam, 2019), and the Best Research Paper and Best Presenter Awards at the 2023 International Conference on Education, Business, and Science and Technology (Philippines). In 2025, he received the Best Session Paper Award during the 5th International Conference and 2025 NOTED National Convention. In 2026, he received the Best Research Paper and Best Research Presentation Awards during the Research Congress of St. Michael&rsquo;s College of Iligan, Inc.</>,

    <>He has also served as a Judge in Regional and Division School Press Conferences in Northern Mindanao and as an Internal Auditor for ISO 9001:2015. He serves as an Advisory Board Member of the International Conference in TESOL and Education and as a peer reviewer for various academic journals and conference proceedings in the Philippines and Vietnam. He also serves as an Editorial Board Member of the International Review of Social Science Research and has undertaken peer-review engagements in Indigenous Studies, Social Development, Multidisciplinary Research, TESOL, and Education.</>,

    <>His professional affiliations include Associate Member of the National Research Council of the Philippines (NRCP); Associate Member of the International Conference of TESOL &amp; Education; Regular Member of the Professional Organization of Researchers and Educators of the Philippines (POREP); and membership in the Rotary Club of Cagayan de Oro Torch.</>,

    <>His research interests include communication, literature, linguistics, education, qualitative research methodology, and interdisciplinary studies.</>,
];

const BIONOTE_PREVIEW_COUNT = 2;

const CREDENTIALS = [
    {
        title: 'Academic Background',
        lines: ['PhD in English', 'MAED in English | BA in English'],
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
        lines: ['Purposive Communication with','SDG Integration (2025)', 'Qualitative Research Design:','Concepts, Methods & Applications (2027)'],
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
        description: 'Personnel administration, recruitment, development, and employee services.',
        functions: [
            'Recruitment and Selection', 'Personnel Records Management', 'Employee Relations',
            'Training and Development', 'Performance Management', 'Employee Welfare',
        ],
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
        description: 'Budgeting, accounting, disbursement, and financial reporting services.',
        functions: [
            'Budget Management', 'Financial Planning', 'Accounting Services',
            'Disbursement', 'Financial Reporting', 'Records and Documentation',
        ],
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
        description: 'Facilities, maintenance, campus infrastructure, utilities, and safety.',
        functions: [
            'Facilities Management', 'Building Maintenance', 'Electrical and Plumbing',
            'Campus Grounds', 'Utilities Management', 'General Physical Plant Services',
        ],
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
        description: 'Institutional technology, information systems, and digital innovation.',
        functions: [
            'Information Systems', 'Data Management', 'IT Technical Support',
            'Website and Web Systems', 'Digital Transformation', 'Network Infrastructure',
            'Technology Innovation', 'Institutional Data Services',
        ],
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

/* Gilded Divider with Center Diamond */
function GoldDivider({ className = '' }) {
    return (
        <div className={`flex items-center justify-center gap-3 ${className}`} aria-hidden="true">
            <span className="h-px w-14 sm:w-20 bg-gradient-to-r from-transparent to-[#D4AF37]/70"></span>
            <span className="w-1.5 h-1.5 rotate-45 bg-[#D4AF37] shadow-[0_0_12px_rgba(212,175,55,0.8)]"></span>
            <span className="h-px w-14 sm:w-20 bg-gradient-to-l from-transparent to-[#D4AF37]/70"></span>
        </div>
    );
}

/* ============================================================================
   LEVELS-BASED ORG CHART — fully visible on every device, no scrolling
   ============================================================================ */

/* Shared node card — variant: 'branch' (fixed width), 'single' (wide root), 'full' (mobile full width) */
function LevelNode({ name, emphasized = false, variant = 'branch' }) {
    const widthClass =
        variant === 'full'
            ? 'w-full max-w-[320px]'
            : variant === 'single'
                ? 'w-[240px] xl:w-[300px]'
                : 'w-[190px]';

    return (
        <div
            className={`relative ${widthClass} px-4 py-3.5 bg-white border rounded-xl shadow-sm text-center transition-all duration-500 ease-out-expo group hover:-translate-y-1 ${
                emphasized
                    ? 'border-[#C79A3E] shadow-md hover:shadow-xl'
                    : 'border-[#E7E2D6] hover:border-[#145A32] hover:shadow-xl'
            }`}
        >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#145A32] to-[#C79A3E] rounded-t-lg transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
            <span className="text-[12px] font-semibold text-gray-800 leading-snug">{name}</span>
        </div>
    );
}

/* Mobile / Tablet — vertical stacked levels, everything visible */
function OrgChartStacked({ levels }) {
    return (
        <div className="w-full flex flex-col items-center">
            {levels.map((level, li) => (
                <div key={level.title} className="w-full flex flex-col items-center">
                    {li > 0 && <span className="w-px h-5 bg-[#145A32]/25 my-1" aria-hidden="true" />}
                    <p className="text-[9px] font-bold tracking-[0.25em] uppercase text-[#A97F2E] mb-2.5 text-center">
                        {level.title}
                    </p>
                    <div className="w-full flex flex-col items-center gap-2.5">
                        {level.nodes.map((n) => (
                            <LevelNode key={n} name={n} emphasized={level.emphasize} variant="full" />
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}

/* Desktop (xl+) — tree layout with branch rail connectors (full panel width) */
function OrgChartTree({ levels }) {
    return (
        <div className="w-full flex flex-col items-center">
            {levels.map((level, li) => {
                const isBranch = level.nodes.length > 1;

                return (
                    <div key={level.title} className="w-full flex flex-col items-center">
                        {/* Connector from previous level */}
                        {li > 0 && <span className="w-px h-6 bg-[#145A32]/30" aria-hidden="true" />}

                        {/* Level label */}
                        <p className="text-[9px] font-bold tracking-[0.3em] uppercase text-[#A97F2E] mb-3 text-center">
                            {level.title}
                        </p>

                        {isBranch ? (
                            <div className="flex flex-col items-center w-full">
                                {/* Drop from label down to the rail */}
                                <span className="w-px h-5 bg-[#145A32]/30" aria-hidden="true" />
                                {/* Branch row */}
                                <div className="relative flex justify-center gap-3">
                                    {/* Horizontal rail spanning first → last node centers */}
                                    <span
                                        className="absolute top-0 h-px bg-[#145A32]/30"
                                        style={{ left: '95px', right: '95px' }}
                                        aria-hidden="true"
                                    />
                                    {level.nodes.map((n) => (
                                        <div key={n} className="flex flex-col items-center">
                                            <span className="w-px h-5 bg-[#145A32]/30" aria-hidden="true" />
                                            <LevelNode name={n} emphasized={level.emphasize} variant="branch" />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <LevelNode name={level.nodes[0]} emphasized={level.emphasize} variant="single" />
                        )}
                    </div>
                );
            })}
        </div>
    );
}

/* Wrapper — stacked below xl (fully visible), tree at xl+ */
function OfficeOrgChart({ levels }) {
    return (
        <>
            <div className="xl:hidden">
                <OrgChartStacked levels={levels} />
            </div>
            <div className="hidden xl:block w-full overflow-x-auto no-scrollbar">
                <OrgChartTree levels={levels} />
            </div>
        </>
    );
}

/* ============================================================================
   TIDMAC TEAM — light, clear, no dimming. Grid on mobile, drag carousel on desktop
   ============================================================================ */
const TIDMAC_TEAM = [
    { name: 'Jocynt', img: cebImg },
    { name: 'Zy', img: anaImg },
    { name: 'Jamie', img: notailImg },
    { name: 'Jess', img: topsonImg },
    { name: 'Christian', img: jeraxImg },
];

/* Drag carousel — desktop only (clear images, always-visible captions) */
function TidmacDragCarousel() {
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

    return (
        <div className="tidmac-carousel">
            <div
                ref={trackRef}
                className="tidmac-track"
                onMouseDown={handleMouseDown}
                style={{ transform: 'translate(-50%, -50%)' }}
            >
                {TIDMAC_TEAM.map((member, i) => (
                    <div className="tidmac-frame" key={i}>
                        <img className="tidmac-image" src={member.img} alt={member.name} draggable="false" />
                        <div className="tidmac-caption">
                            <span className="tidmac-header">{member.name}</span>
                            <span className="tidmac-subheader">TIDMAC Staff</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

/* Team section — grid (mobile, fully visible) + drag carousel (desktop) */
function TidmacTeamSection() {
    return (
        <div>
            <h4 className="text-xs font-bold tracking-[0.3em] uppercase text-[#A97F2E] mb-6 sm:mb-8 text-center">
                Meet the Team
            </h4>

            {/* Mobile: static grid — full color, everything visible, no dragging */}
            <div className="md:hidden grid grid-cols-2 sm:grid-cols-3 gap-3">
                {TIDMAC_TEAM.map((member) => (
                    <div
                        key={member.name}
                        className="rounded-xl overflow-hidden border border-[#E5E0D3] bg-white shadow-[0_10px_25px_-15px_rgba(11,61,31,0.3)]"
                    >
                        <img
                            src={member.img}
                            alt={member.name}
                            className="w-full aspect-[3/4] object-cover"
                            draggable="false"
                        />
                        <div className="px-3 py-2.5 border-t border-[#EFEAE0]">
                            <p className="text-xs font-semibold text-[#0B3D1F]">{member.name}</p>
                            <p className="text-[9px] font-bold tracking-[0.2em] uppercase text-[#A97F2E] mt-0.5">
                                TIDMAC Staff
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Desktop: interactive drag carousel */}
            <div className="hidden md:block">
                <TidmacDragCarousel />
            </div>
        </div>
    );
}

export default function VPAdminFinance() {
    const [scrollProgress, setScrollProgress] = useState(0);
    const [activeOffice, setActiveOffice] = useState('hr');
    const [bioExpanded, setBioExpanded] = useState(false);
    const [pendingScroll, setPendingScroll] = useState(false);

    const officeNavRef = useRef(null);
    const officeDetailsRef = useRef(null);

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

    /* Auto-scroll to details after selecting an office */
    useEffect(() => {
        if (!pendingScroll) return;
        const t = setTimeout(() => {
            officeDetailsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            setPendingScroll(false);
        }, 120);
        return () => clearTimeout(t);
    }, [pendingScroll]);

    const handleSelectOffice = (id) => {
        setActiveOffice(id);
        setPendingScroll(true);
    };

    /* Return to the exact location of the office buttons */
    const handleBackToOffices = () => {
        officeNavRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    };

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

                /* ---- Office chip shimmer sweep ---- */
                @keyframes vpChipShimmer {
                    0% { left: -160%; }
                    100% { left: 160%; }
                }
                .office-chip .vp-chip-shimmer {
                    position: absolute;
                    top: 0;
                    left: -160%;
                    width: 55%;
                    height: 100%;
                    transform: skewX(-18deg);
                    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.35), transparent);
                    opacity: 0;
                    pointer-events: none;
                }
                .office-chip:hover .vp-chip-shimmer,
                .office-chip:focus-visible .vp-chip-shimmer {
                    opacity: 1;
                    animation: vpChipShimmer 0.9s ease forwards;
                }

                /* Function list item entrance */
                @keyframes vpItemIn {
                    from { opacity: 0; transform: translateX(-8px); }
                    to { opacity: 1; transform: translateX(0); }
                }

                @media (prefers-reduced-motion: reduce) {
                    .office-chip .vp-chip-shimmer { animation: none !important; opacity: 0 !important; }
                }

                /* ---- TIDMAC Carousel — Light / Clear skin (desktop) ---- */
                .tidmac-carousel {
                    position: relative;
                    width: 100%;
                    height: 420px;
                    overflow: hidden;
                    user-select: none;
                    -webkit-user-select: none;
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
                    width: 16vmin;
                    height: 38vmin;
                    max-height: 340px;
                    min-height: 240px;
                    display: flex;
                    flex-direction: column;
                    overflow: hidden;
                    position: relative;
                    border-radius: 12px;
                    background: #ffffff;
                    border: 1px solid #E5E0D3;
                    box-shadow: 0 10px 30px -12px rgba(11, 61, 31, 0.25);
                    transition: width 0.8s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
                    user-select: none;
                }
                .tidmac-frame:hover {
                    width: 30vmin;
                    box-shadow: 0 18px 40px -14px rgba(11, 61, 31, 0.35);
                    transform: translateY(-4px);
                }
                /* Full-color, clear image — no brightness or opacity filters */
                .tidmac-image {
                    width: 100%;
                    flex: 1;
                    min-height: 0;
                    object-fit: cover;
                    object-position: 50% 50%;
                    pointer-events: none;
                }
                .tidmac-caption {
                    background: #ffffff;
                    border-top: 1px solid #EFEAE0;
                    padding: 0.75rem 0.9rem;
                    display: flex;
                    flex-direction: column;
                    gap: 2px;
                    flex-shrink: 0;
                }
                .tidmac-header {
                    font-family: 'Inter', sans-serif;
                    font-size: clamp(0.85rem, 1.6vw, 1.05rem);
                    font-weight: 600;
                    color: #0B3D1F;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }
                .tidmac-subheader {
                    font-family: 'Inter', sans-serif;
                    font-size: clamp(0.55rem, 1vw, 0.65rem);
                    font-weight: 700;
                    letter-spacing: 0.2em;
                    text-transform: uppercase;
                    color: #A97F2E;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
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
                                Dr. Kurt S. <br />Candilas, LPT
                            </h1>
                        </Reveal>
                        <Reveal delay={300}>
                            <p className="text-base sm:text-lg md:text-xl text-white/60 max-w-xl mb-8 sm:mb-12">
                                Vice President for Administration &amp; Finance at the City College of Cagayan de Oro.
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
                                        <p className="text-xs sm:text-sm font-semibold text-white">Dr. Kurt S. Candilas, LPT</p>
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

            {/* ===================== 03 — Administration & Finance Cluster (Selector + Details) ===================== */}
            <section
                className="relative vp-sans overflow-hidden"
                style={{ background: 'var(--vp-paper)' }}
                aria-label="Administration and Finance Cluster"
            >
                {/* Ambient texture & glow */}
                <div
                    className="absolute inset-0 opacity-[0.025] pointer-events-none"
                    style={{ backgroundImage: 'radial-gradient(#145A32 1px, transparent 1px)', backgroundSize: '32px 32px' }}
                    aria-hidden="true"
                />
                <div
                    className="absolute -top-24 right-0 w-[28rem] h-[28rem] rounded-full pointer-events-none"
                    style={{ background: 'radial-gradient(circle, rgba(212,175,55,0.07), transparent 65%)' }}
                    aria-hidden="true"
                />

                <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20 md:py-24">

                    {/* ---- Ceremonial Header ---- */}
                    <Reveal className="text-center max-w-2xl mx-auto">
                        <div className="inline-flex items-center gap-3 mb-4">
                            <span className="h-px w-8 bg-gradient-to-r from-transparent to-[#A97F2E]/60" aria-hidden="true"></span>
                            <span className="text-[10px] sm:text-[11px] font-bold tracking-[0.3em] uppercase" style={{ color: 'var(--vp-gold-dark)' }}>
                                03 &nbsp;·&nbsp; Cluster Offices
                            </span>
                            <span className="h-px w-8 bg-gradient-to-l from-transparent to-[#A97F2E]/60" aria-hidden="true"></span>
                        </div>
                        <h2 className="vp-serif text-3xl sm:text-4xl md:text-[2.75rem] font-semibold tracking-tight" style={{ color: 'var(--vp-green-950)' }}>
                            Administration &amp; Finance Cluster
                        </h2>
                        <p className="mt-3 text-sm sm:text-[15px] text-gray-500 leading-relaxed">
                            Four offices operating under the Vice President for Administration and Finance.
                        </p>
                        <GoldDivider className="mt-6" />
                    </Reveal>

                    {/* ---- Compact Office Selector (vertical list on mobile — ALL visible) ---- */}
                    <Reveal delay={120}>
                        <div ref={officeNavRef} className="mt-10 sm:mt-12 scroll-mt-32">
                            <div
                                role="tablist"
                                aria-label="Select an office"
                                className="flex flex-col gap-2.5 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-3 lg:max-w-5xl lg:mx-auto"
                            >
                                {OFFICES.map((office, i) => {
                                    const isActive = activeOffice === office.id;
                                    return (
                                        <button
                                            key={office.id}
                                            type="button"
                                            role="tab"
                                            aria-selected={isActive}
                                            onClick={() => handleSelectOffice(office.id)}
                                            className={`office-chip group relative w-full sm:w-auto overflow-hidden flex items-center gap-3 sm:gap-2.5 rounded-2xl sm:rounded-full pl-3 pr-4 sm:pl-2.5 sm:pr-5 py-3 sm:py-2 text-left transition-all duration-500 ease-out-expo focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#FBFAF6] ${
                                                isActive
                                                    ? 'text-white shadow-[0_14px_30px_-12px_rgba(10,46,24,0.6)] ring-1 ring-[#D4AF37]/50'
                                                    : 'bg-white border border-[#E5E0D3] text-[#3A4A41] hover:-translate-y-0.5 hover:border-[#D4AF37]/60 hover:shadow-[0_14px_28px_-16px_rgba(169,127,46,0.5)]'
                                            }`}
                                        >
                                            {/* Active gradient fill */}
                                            {isActive && (
                                                <span
                                                    className="absolute inset-0"
                                                    style={{ background: 'linear-gradient(120deg, #0A2E18 0%, #145A32 55%, #0A2E18 100%)' }}
                                                    aria-hidden="true"
                                                />
                                            )}
                                            {/* Shimmer sweep on hover */}
                                            <span className="vp-chip-shimmer" aria-hidden="true" />

                                            {/* Icon medallion */}
                                            <span className={`relative z-10 flex h-8 w-8 items-center justify-center rounded-full border flex-shrink-0 transition-all duration-500 ${
                                                isActive
                                                    ? 'border-[#D4AF37]/60 bg-white/10 text-[#E5C68A]'
                                                    : 'border-[#E5E0D3] bg-[#F9F7F2] text-[#145A32] group-hover:border-[#D4AF37]/50 group-hover:text-[#A97F2E]'
                                            }`}>
                                                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                                    {office.icon}
                                                </svg>
                                            </span>

                                            {/* Number + label */}
                                            <span className="relative z-10 flex flex-col gap-[3px] leading-none min-w-0">
                                                <span className={`text-[8px] sm:text-[9px] font-bold tracking-[0.25em] uppercase transition-colors duration-500 ${
                                                    isActive ? 'text-[#D4AF37]' : 'text-[#A8B0AA] group-hover:text-[#A97F2E]'
                                                }`}>
                                                    {String(i + 1).padStart(2, '0')} · {office.label}
                                                </span>
                                                <span className="text-[12px] sm:text-xs font-semibold tracking-wide whitespace-normal sm:whitespace-nowrap">
                                                    {office.name}
                                                </span>
                                            </span>

                                            {/* Active diamond marker — pills (sm+) */}
                                            <span
                                                className={`relative z-10 ml-0.5 h-1.5 w-1.5 rotate-45 transition-all duration-500 hidden sm:block ${
                                                    isActive ? 'bg-[#D4AF37] shadow-[0_0_8px_rgba(212,175,55,0.9)] scale-100' : 'bg-transparent scale-0'
                                                }`}
                                                aria-hidden="true"
                                            />

                                            {/* Chevron — mobile affordance */}
                                            <svg
                                                className={`relative z-10 ml-auto h-4 w-4 flex-shrink-0 transition-all duration-300 sm:hidden ${
                                                    isActive ? 'text-[#D4AF37]' : 'text-[#A8B0AA] group-hover:text-[#A97F2E]'
                                                }`}
                                                fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" aria-hidden="true"
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                                            </svg>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    </Reveal>

                    {/* ---- Office Details Panel ---- */}
                    <div ref={officeDetailsRef} className="mt-8 sm:mt-10 scroll-mt-24">
                        <AnimatedPanel key={activeOffice}>
                            <div
                                role="tabpanel"
                                aria-label={activeOfficeData.name}
                                className="relative rounded-2xl border border-[#E5E0D3] bg-white overflow-hidden shadow-[0_35px_70px_-35px_rgba(10,46,24,0.25)]"
                            >
                                {/* Gilded top seam */}
                                <div className="h-[3px] w-full" style={{ background: 'linear-gradient(90deg, #A97F2E, #E9CE8C 50%, #A97F2E)' }} aria-hidden="true" />

                                {/* Panel Header */}
                                <div className="relative px-5 sm:px-8 lg:px-10 pt-6 sm:pt-8 pb-6 sm:pb-7 border-b border-[#E5E0D3]">
                                    {/* Watermark icon */}
                                    <svg
                                        className="absolute -right-4 -top-4 h-36 w-36 sm:h-44 sm:w-44 text-[#145A32] opacity-[0.045] pointer-events-none"
                                        fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"
                                    >
                                        {activeOfficeData.icon}
                                    </svg>

                                    <div className="relative flex items-start justify-between gap-3 sm:gap-6">
                                        <div className="flex items-center gap-4 sm:gap-5 min-w-0">
                                            {/* Medallion */}
                                            <div className="relative flex-shrink-0">
                                                <div
                                                    className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-xl border border-[#D4AF37]/45"
                                                    style={{ background: 'linear-gradient(145deg, #0A2E18, #145A32)' }}
                                                >
                                                    <svg className="h-5 w-5 sm:h-6 sm:w-6 text-[#E5C68A]" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                                        {activeOfficeData.icon}
                                                    </svg>
                                                </div>
                                                <span className="absolute -bottom-1.5 -right-1.5 h-3 w-3 rotate-45 bg-[#D4AF37] border-2 border-white shadow" aria-hidden="true" />
                                            </div>
                                            <div className="min-w-0">
                                                <p className="text-[9px] sm:text-[10px] font-bold tracking-[0.3em] uppercase mb-1" style={{ color: 'var(--vp-gold-dark)' }}>
                                                    Office {String(OFFICES.findIndex(o => o.id === activeOffice) + 1).padStart(2, '0')} · Admin &amp; Finance Cluster
                                                </p>
                                                <h3 className="vp-serif text-xl sm:text-2xl md:text-[1.8rem] font-semibold leading-tight tracking-tight" style={{ color: 'var(--vp-green-950)' }}>
                                                    {activeOfficeData.name}
                                                </h3>
                                            </div>
                                        </div>

                                        {/* Back to Offices — desktop */}
                                        <button
                                            type="button"
                                            onClick={handleBackToOffices}
                                            className="group hidden sm:inline-flex flex-shrink-0 items-center gap-2 self-start rounded-full border border-[#E5E0D3] bg-white px-4 py-2 text-[10px] font-bold tracking-[0.18em] uppercase text-[#145A32] transition-all duration-300 ease-out-expo hover:-translate-y-0.5 hover:border-[#D4AF37] hover:bg-[#0A2E18] hover:text-[#E5C68A] hover:shadow-[0_12px_24px_-10px_rgba(10,46,24,0.5)]"
                                        >
                                            <svg className="h-3 w-3 transition-transform duration-300 group-hover:-translate-y-0.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" aria-hidden="true">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
                                            </svg>
                                            Back to Offices
                                        </button>
                                    </div>

                                    <p className="relative mt-4 text-[13px] sm:text-sm text-gray-500 max-w-2xl leading-relaxed">
                                        {activeOfficeData.description}
                                    </p>
                                </div>

                                {/* Panel Body — Functions full-width on top, Org Chart full-width at the bottom */}
                                <div className="relative px-5 sm:px-8 lg:px-10 py-7 sm:py-9">

                                    {/* Core Functions — full width */}
                                    <div className="mb-9">
                                        <div className="flex items-center gap-3 mb-4 sm:mb-5">
                                            <span className="h-px w-6 bg-[#A97F2E]/60" aria-hidden="true"></span>
                                            <h4 className="text-[10px] sm:text-[11px] font-bold tracking-[0.28em] uppercase" style={{ color: 'var(--vp-green-700)' }}>
                                                Core Functions
                                            </h4>
                                        </div>
                                        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                                            {activeOfficeData.functions.map((fn, i) => (
                                                <li
                                                    key={fn}
                                                    className="flex items-center gap-3 rounded-lg border border-[#EFEAE0] bg-[#FDFCF9] px-3.5 py-2.5 transition-all duration-300 hover:border-[#D4AF37]/50 hover:bg-white hover:shadow-[0_8px_20px_-12px_rgba(169,127,46,0.45)] hover:translate-x-1"
                                                    style={{ animation: `vpItemIn 0.5s cubic-bezier(0.16,1,0.3,1) ${0.15 + i * 0.06}s both` }}
                                                >
                                                    <span className="vp-serif text-sm font-semibold flex-shrink-0 w-6" style={{ color: 'var(--vp-green-700)' }}>
                                                        {String(i + 1).padStart(2, '0')}
                                                    </span>
                                                    <span className="text-[12px] sm:text-[13px] font-medium text-[#3A4A41]">{fn}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    {/* Organizational Structure — full width at the bottom */}
                                    <div>
                                        <div className="flex items-center gap-3 mb-4 sm:mb-5">
                                            <span className="h-px w-6 bg-[#A97F2E]/60" aria-hidden="true"></span>
                                            <h4 className="text-[10px] sm:text-[11px] font-bold tracking-[0.28em] uppercase" style={{ color: 'var(--vp-green-700)' }}>
                                                Organizational Structure
                                            </h4>
                                        </div>
                                        <div
                                            className="rounded-xl border p-4 sm:p-6 lg:p-8"
                                            style={{
                                                background: 'linear-gradient(180deg, rgba(238,242,236,0.55), rgba(251,249,244,0.4))',
                                                borderColor: 'rgba(199,154,62,0.18)',
                                            }}
                                        >
                                            <OfficeOrgChart levels={activeOfficeData.orgChart} />
                                        </div>
                                    </div>
                                </div>

                                {/* Meet the Team (light, clear — inside the white panel) */}
                                {activeOffice === 'tidmac' && (
                                    <div className="border-t border-[#E5E0D3] px-4 sm:px-8 py-8 sm:py-10 bg-white">
                                        <TidmacTeamSection />
                                    </div>
                                )}

                                {/* Panel Footer — mobile back button */}
                                <div className="sm:hidden border-t border-[#E5E0D3] px-5 py-4 flex justify-center bg-[#FDFCF9]">
                                    <button
                                        type="button"
                                        onClick={handleBackToOffices}
                                        className="group inline-flex items-center gap-2 rounded-full border border-[#E5E0D3] bg-white px-5 py-2.5 text-[10px] font-bold tracking-[0.18em] uppercase text-[#145A32] transition-all duration-300 active:scale-95"
                                    >
                                        <svg className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" aria-hidden="true">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
                                        </svg>
                                        Back to Offices
                                    </button>
                                </div>
                            </div>
                        </AnimatedPanel>
                    </div>
                </div>
            </section>

            {/* ===================== Footer spacing ===================== */}
            <div className="h-4" style={{ background: 'var(--vp-paper)' }} aria-hidden="true" />
        </MainLayout>
    );
}