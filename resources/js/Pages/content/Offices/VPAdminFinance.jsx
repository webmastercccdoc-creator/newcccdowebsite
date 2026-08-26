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
   BIONOTE — existing biography content, unchanged.
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

const PROFILE_QUOTE =
    'Committed to excellence in administration, innovation in services, and integrity in leadership.';

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

function OfficeOrgChart({ levels }) {
    return (
        <div className="flex flex-col items-center">
            {levels.map((level, levelIndex) => (
                <div key={level.title} className="w-full flex flex-col items-center">
                    {levelIndex > 0 && (
                        <div className="flex flex-col items-center" aria-hidden="true">
                            <div className="w-px h-4 bg-green-300" />
                            <div className="w-1.5 h-1.5 rounded-full bg-green-600" />
                            <div className="w-px h-4 bg-green-300" />
                        </div>
                    )}
                    <p className="text-[10px] font-bold tracking-[0.2em] text-green-700/70 uppercase mb-2.5 font-sans">
                        {level.title}
                    </p>
                    <div className="flex flex-wrap justify-center gap-3 w-full mb-1">
                        {level.nodes.map((node) => (
                            <div
                                key={node}
                                className="min-w-[150px] px-4 py-3 bg-white border border-gray-200 rounded-lg shadow-sm text-center hover:border-green-700 hover:shadow-md transition-all duration-200"
                            >
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

/* Small reusable "letterhead" section eyebrow — a double rule with a label,
   echoing the look of an official academic letterhead or diploma. */
function SectionEyebrow({ children }) {
    return (
        <div className="flex items-center gap-3 mb-2" aria-hidden="false">
            <span className="text-[10.5px] font-bold tracking-[0.25em] text-amber-600 uppercase font-sans">
                {children}
            </span>
        </div>
    );
}

function SectionRule() {
    return (
        <div className="mt-2 mb-6 flex items-center gap-1.5" aria-hidden="true">
            <span className="h-[3px] w-10 bg-green-700 rounded-full" />
            <span className="h-[3px] w-2.5 bg-amber-500 rounded-full" />
        </div>
    );
}

/* ============================================================================
   TIDMAC Team Carousel Component (Drag to scroll)
   ============================================================================ */
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
            // Tighter bounds for a smaller track
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

    // Reordered array to match requested arrangement: ceb, ana, notal, topson, jerax
    const teamMembers = [
        { name: 'Jocynt', img: cebImg },
        { name: 'Zy', img: anaImg },
        { name: 'Jamie', img: notailImg },
        { name: 'Jess', img: topsonImg },
        { name: 'Christian', img: jeraxImg },
    ];

    return (
        <div className="mt-10">
            <p className="text-xs font-bold tracking-widest text-green-800/60 uppercase mb-6 font-sans">
                Meet the Team
            </p>
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
            {/* Local keyframes, type import, and carousel CSS */}
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
                    font-size: 2.9rem;
                    font-weight: 600;
                    float: left;
                    line-height: 0.8;
                    padding-right: 0.35rem;
                    padding-top: 0.3rem;
                    color: var(--vp-green-800);
                }

                @keyframes borderRotate {
                    0% { transform: translate(-50%, -50%) rotate(0deg); }
                    100% { transform: translate(-50%, -50%) rotate(360deg); }
                }

                @keyframes vpFadeUp {
                    from { opacity: 0; transform: translateY(14px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .vp-stagger { animation: vpFadeUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) both; }

                @media (prefers-reduced-motion: reduce) {
                    .vp-stagger { animation: none; }
                }

                /* TIDMAC Carousel - Sized down to fit container cleanly */
                .tidmac-carousel {
                    position: relative;
                    width: 100%;
                    height: 300px; 
                    overflow: hidden;
                    user-select: none;
                    -webkit-user-select: none;
                }
                @media (min-width: 768px) {
                    .tidmac-carousel { height: 360px; }
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
                    width: 14vmin;
                    height: 36vmin;
                    max-height: 280px;
                    transition: all 1s ease;
                    filter: brightness(45%);
                    user-select: none;
                    display: grid;
                    grid-template-rows: auto 20%;
                    overflow: hidden;
                    position: relative;
                    border-radius: 10px;
                    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
                }
                .tidmac-frame:hover {
                    width: 26vmin; /* Smaller expanded width */
                    filter: brightness(100%);
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
                    font-size: 2vmin;
                    position: relative;
                    left: 10vmin;
                    top: 2vmin;
                    transition: all 1s ease;
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
                    transition: all 1s ease;
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
                    background-color: rgba(11, 61, 31, 0.8);
                }
                .tidmac-subheader {
                    font-family: 'Inter', sans-serif;
                    font-size: 1.2vmin;
                    position: relative;
                    left: 10vmin;
                    transition: all 1s ease;
                    color: transparent;
                    white-space: nowrap;
                    align-self: end;
                }
                .tidmac-frame:hover .tidmac-subheader {
                    left: 1.5vmin;
                    color: #ffffff;
                    text-shadow: 0 0 1rem #000, 0 0 1rem #000, 0 0 1rem #000;
                }
            `}</style>

            {/* Scroll Progress Indicator */}
            <div className="fixed top-0 left-0 w-full h-1 z-[1000] bg-transparent">
                <div
                    className="h-full transition-[width] duration-100 ease-out"
                    style={{ width: `${scrollProgress}%`, background: 'linear-gradient(90deg, var(--vp-green-700), var(--vp-gold))' }}
                />
            </div>

            {/* ===================== Hero Banner with Image — UNCHANGED ===================== */}
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
                    <div className="flex items-center justify-center gap-3 mb-4" aria-hidden="true">
                        <span className="h-px w-10" style={{ background: 'var(--vp-gold)' }} />
                        <span className="text-[11px] font-bold tracking-[0.3em] uppercase" style={{ color: 'var(--vp-green-700)' }}>Office of the</span>
                        <span className="h-px w-10" style={{ background: 'var(--vp-gold)' }} />
                    </div>
                    <h2 className="vp-serif text-3xl md:text-[2.75rem] font-semibold tracking-tight" style={{ color: 'var(--vp-green-950)' }}>
                        Vice President for Administration and Finance
                    </h2>
                    <p className="mt-3 text-sm tracking-wide text-gray-500">
                        Administrative Leadership &nbsp;&middot;&nbsp; Institutional Services &nbsp;&middot;&nbsp; Operational Excellence
                    </p>
                    <div className="mt-5 flex items-center justify-center gap-1.5" aria-hidden="true">
                        <span className="h-[3px] w-14 rounded-full" style={{ background: 'var(--vp-green-700)' }} />
                        <span className="h-[3px] w-3 rounded-full" style={{ background: 'var(--vp-gold)' }} />
                    </div>
                </div>
            </section>

            {/* ===================== Profile + Tabs ===================== */}
            <section className="vp-sans" style={{ background: 'var(--vp-paper)' }}>
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
                                <div className="bg-white rounded-2xl shadow-[0_1px_2px_rgba(11,61,31,0.06),0_12px_28px_-14px_rgba(11,61,31,0.25)] border border-gray-200/80 p-5">
                                    {/* Photo with animated sweeping light border */}
                                    <div className="relative pb-7">
                                        <div
                                            className="absolute -inset-[3px] rounded-[17px] z-0 overflow-hidden"
                                            style={{ background: 'var(--vp-green-800)', boxShadow: '0 0 24px rgba(199,154,62,0.25)' }}
                                        >
                                            <div
                                                className="absolute left-1/2 top-1/2 w-[200%] h-[200%]"
                                                style={{
                                                    background: 'conic-gradient(from 0deg, transparent 0deg, rgba(199,154,62,0.95) 40deg, transparent 80deg, transparent 360deg)',
                                                    animation: 'borderRotate 5s linear infinite',
                                                    transform: 'translate(-50%, -50%)'
                                                }}
                                            ></div>
                                        </div>

                                        <div className="relative z-10 rounded-xl p-1.5 bg-white">
                                            <div className="overflow-hidden rounded-lg">
                                                <img
                                                    src={kurtCandilasImage}
                                                    alt="Dr. Kurt S. Candilas"
                                                    className="w-full aspect-[4/5] object-cover"
                                                />
                                            </div>
                                        </div>

                                        <div
                                            className="absolute left-1/2 bottom-0 -translate-x-1/2 z-20 w-16 h-16 rounded-full bg-white shadow-sm flex items-center justify-center p-1.5"
                                            style={{ border: '2px solid var(--vp-gold)' }}
                                        >
                                            <img
                                                src={ccdologo}
                                                alt="City College of Cagayan de Oro Logo"
                                                className="w-full h-full object-contain"
                                            />
                                        </div>
                                    </div>

                                    <div className="text-center pt-1">
                                        <h3 className="vp-serif text-xl font-semibold tracking-tight" style={{ color: 'var(--vp-ink)' }}>
                                            Dr. Kurt S. Candilas
                                        </h3>
                                        <p className="mt-1.5 text-[13px] font-bold tracking-wide uppercase" style={{ color: 'var(--vp-green-700)' }}>
                                            Vice President for Administration and Finance
                                        </p>
                                        <div className="mt-4 pt-4 flex items-center justify-center gap-2 text-xs text-gray-500" style={{ borderTop: '1px solid #ECE7DA' }}>
                                            <svg className="w-4 h-4 flex-shrink-0" style={{ color: 'var(--vp-gold-dark)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                                            </svg>
                                            <span>City College of Cagayan de Oro</span>
                                        </div>
                                    </div>
                                </div>

                                <div
                                    className="relative rounded-2xl p-5 overflow-hidden"
                                    style={{ background: 'var(--vp-green-950)' }}
                                >
                                    <span
                                        className="vp-serif absolute -top-3 left-4 text-6xl leading-none select-none"
                                        style={{ color: 'rgba(199,154,62,0.35)' }}
                                        aria-hidden="true"
                                    >
                                        &ldquo;
                                    </span>
                                    <p className="relative vp-serif text-[15px] italic leading-relaxed text-white/90 pt-3">
                                        {PROFILE_QUOTE}
                                    </p>
                                    <div className="mt-4 h-0.5 w-8 rounded-full" style={{ background: 'var(--vp-gold)' }} aria-hidden="true" />
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
                            <div className="bg-white rounded-2xl border border-gray-200/80 shadow-[0_1px_2px_rgba(11,61,31,0.06),0_12px_28px_-14px_rgba(11,61,31,0.2)] overflow-hidden">
                                {/* Tab navigation */}
                                <div className="flex overflow-x-auto" style={{ background: 'var(--vp-sage)', borderBottom: '1px solid #DEE6DB' }}>
                                    {TABS.map((tab) => {
                                        const isActive = tab.id === activeTab;
                                        return (
                                            <button
                                                key={tab.id}
                                                type="button"
                                                onClick={() => setActiveTab(tab.id)}
                                                aria-pressed={isActive}
                                                className={[
                                                    'group relative flex-shrink-0 inline-flex items-center gap-2 px-5 py-4 text-sm font-semibold whitespace-nowrap',
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

                                <div className="p-6 md:p-8">
                                    {/* Bionote panel */}
                                    {activeTab === 'bionote' && (
                                        <AnimatedPanel key="bionote">
                                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                                <div className="lg:col-span-2 min-w-0">
                                                    <SectionEyebrow>Vice President for Administration and Finance</SectionEyebrow>
                                                    <h3 className="vp-serif text-2xl font-semibold tracking-tight" style={{ color: 'var(--vp-green-950)' }}>Bionote</h3>
                                                    <SectionRule />

                                                    <div className="space-y-4 text-[14.5px] leading-7 text-gray-700 vp-bio">
                                                        {visibleParagraphs.map((paragraph, index) => (
                                                            <p key={index} className={index === 0 ? 'vp-bio-lead' : ''}>{paragraph}</p>
                                                        ))}
                                                    </div>

                                                    {BIONOTE_PARAGRAPHS.length > BIONOTE_PREVIEW_COUNT && (
                                                        <button
                                                            type="button"
                                                            onClick={() => setBioExpanded((v) => !v)}
                                                            className="mt-5 inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-colors duration-200"
                                                            style={{ border: '1.5px solid var(--vp-green-700)', color: 'var(--vp-green-700)' }}
                                                            onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--vp-green-700)'; e.currentTarget.style.color = '#fff'; }}
                                                            onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--vp-green-700)'; }}
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
                                                    <div className="rounded-xl p-4 divide-y" style={{ background: 'var(--vp-sage)', border: '1px solid #DEE6DB', borderColor: '#DEE6DB' }}>
                                                        {CREDENTIALS.map((item, i) => (
                                                            <div
                                                                key={item.title}
                                                                className="flex items-start gap-3 py-3 first:pt-0 last:pb-0 vp-stagger"
                                                                style={{ borderColor: '#DEE6DB', animationDelay: `${i * 90}ms` }}
                                                            >
                                                                <div
                                                                    className="w-9 h-9 rounded-full bg-white shadow-sm flex items-center justify-center flex-shrink-0"
                                                                    style={{ border: '1px solid #DEE6DB' }}
                                                                >
                                                                    <svg className="w-4 h-4" style={{ color: 'var(--vp-green-700)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                        {item.icon}
                                                                    </svg>
                                                                </div>
                                                                <div className="min-w-0">
                                                                    <p className="text-sm font-bold" style={{ color: 'var(--vp-green-950)' }}>{item.title}</p>
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
                                                <SectionEyebrow>Office Overview &mdash; Sample Content</SectionEyebrow>
                                                <h3 className="vp-serif text-xl font-semibold tracking-tight" style={{ color: 'var(--vp-green-950)' }}>
                                                    {activeOffice.name}
                                                </h3>
                                                <SectionRule />
                                                <p
                                                    className="text-sm text-gray-600 leading-relaxed max-w-[68ch] pl-4 py-1"
                                                    style={{ borderLeft: '3px solid var(--vp-gold)' }}
                                                >
                                                    {activeOffice.description}
                                                </p>

                                                <div className="mt-9">
                                                    <p className="text-xs font-bold tracking-widest uppercase mb-4" style={{ color: '#8A9A8D' }}>
                                                        Core Functions
                                                    </p>
                                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                                        {activeOffice.functions.map((fn, i) => (
                                                            <div
                                                                key={fn}
                                                                className="flex items-start gap-2.5 px-4 py-3 rounded-lg vp-stagger hover:shadow-sm transition-shadow duration-200"
                                                                style={{ background: 'var(--vp-sage)', border: '1px solid #DEE6DB', animationDelay: `${i * 60}ms` }}
                                                            >
                                                                <svg className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: 'var(--vp-green-700)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                                </svg>
                                                                <span className="text-sm text-gray-700">{fn}</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>

                                                <div className="mt-10">
                                                    <p className="text-xs font-bold tracking-widest uppercase mb-6" style={{ color: '#8A9A8D' }}>
                                                        Organizational Structure &mdash; Sample
                                                    </p>
                                                    <div className="rounded-xl p-6 overflow-x-auto" style={{ background: 'var(--vp-sage)', border: '1px solid #DEE6DB' }}>
                                                        <div className="min-w-[280px]">
                                                            <OfficeOrgChart levels={activeOffice.orgChart} />
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* TIDMAC Team Carousel */}
                                                {activeOffice.id === 'tidmac' && (
                                                    <TidmacTeamCarousel />
                                                )}
                                            </div>
                                        </AnimatedPanel>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ===================== Institutional Stats Bar ===================== */}
                    <div
                        className="mt-10 rounded-2xl overflow-hidden relative"
                        style={{ background: 'linear-gradient(120deg, var(--vp-green-950), var(--vp-green-800))' }}
                    >
                        <div
                            className="absolute inset-0 opacity-[0.08] pointer-events-none"
                            style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)', backgroundSize: '18px 18px' }}
                            aria-hidden="true"
                        />
                        <div className="relative grid grid-cols-2 sm:grid-cols-4 sm:divide-x sm:divide-white/10">
                            {STATS.map((stat, i) => (
                                <div
                                    key={stat.label}
                                    className="flex items-center gap-3 px-5 py-6 sm:px-6 vp-stagger"
                                    style={{ animationDelay: `${i * 80}ms` }}
                                >
                                    <div
                                        className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0"
                                        style={{ background: 'rgba(199,154,62,0.16)', border: '1px solid rgba(199,154,62,0.4)' }}
                                    >
                                        <svg className="w-5 h-5" style={{ color: 'var(--vp-gold)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            {stat.icon}
                                        </svg>
                                    </div>
                                    <div className="min-w-0">
                                        <p className="text-[11px] text-white/60 uppercase tracking-wide leading-none">{stat.label}</p>
                                        <p className="vp-serif text-lg font-semibold text-white leading-tight mt-1">{stat.value}</p>
                                        <p className="text-[11px] text-white/60 leading-snug">{stat.caption}</p>
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