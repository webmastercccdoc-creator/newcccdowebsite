import { useEffect, useMemo, useRef, useState } from 'react';
import MainLayout from '../../../layouts/MainLayout';
import presidentBanner from '../../../assets/banner/op-banner.png';
import presidentImage from '../../../assets/images/Dr_Jestoni_Babia.png';
import AnimatedBannerText from '../../../components/content/AnimatedBannerText';
import ccdologo from '../../../assets/logos/ccdologo.png';

/* ============================================================================
   CONSTANTS
   ============================================================================ */
const MEMO_URL = 'https://drive.google.com/drive/folders/1gTsEWOv0Vtv-pGaFauEY2cgRtJDymqW-?usp=drive_link';

/* Official Memo Seal Icon — document with a presidential seal & ribbon */
function MemoSealIcon({ className = '' }) {
    return (
        <svg
            className={className}
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            viewBox="0 0 24 24"
            aria-hidden="true"
        >
            {/* Document outline with folded corner */}
            <path strokeLinecap="round" strokeLinejoin="round" d="M7 3.5h5.75L17.5 8.25v5.5" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M7 3.5A2.25 2.25 0 004.75 5.75v12.5A2.25 2.25 0 007 20.5h4.25" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M12.75 3.5v4.75H17.5" />
            {/* Text lines */}
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 10.75h4.5M8.25 14.25h3" />
            {/* Presidential seal with ribbon */}
            <circle cx="17.25" cy="17" r="3.25" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.8 19.9l-.8 2.4 2.25-1.15 2.25 1.15-.8-2.4" />
        </svg>
    );
}

/* ============================================================================
   DATA CONTENT
   ============================================================================ */
const BIONOTE_PARAGRAPHS = [
    'Dr. Jestoni P. Babia previously served as the Visayas Representative of the Teacher Education Council (TEC), appointed by the Office of the President of the Philippines pursuant to Republic Act No. 7836. He currently serves as a Technical Working Group (TWG) Member of the Commission on Higher Education–Teacher Education Council (CHED-TEC) for the development of the National Quality Assurance Framework for Teacher Education (NQAF-TE).',
    'Dr. Babia served as Dean of the School of Education at the University of San Jose–Recoletos (USJ-R) for seven years, followed by a one-year tenure as Associate Vice President for Academics and Research, where he played a pivotal role in advancing the institution’s academic and research agenda. He also served as College Chairman for four years and as Director for Education for Sustainable Development (ESD) for three years, demonstrating his commitment to academic excellence, innovation, and sustainability.',
    'He served as an Education for Sustainable Development (ESD) Consultant of the UNESCO National Commission of the Philippines (UNACOM), a CHED Regional Quality Assessment Team (RQAT) Evaluator for Region VII, and a PAASCU Accreditor. In recognition of his extensive contributions to quality assurance in higher education, he was recently appointed as a PAASCU Commissioner for Tertiary Education.',
    'His dedication to sustainability and global engagement is reflected in his work as an ESD Fellow of the Southeast Asian Ministers of Education Organization (SEAMEO) and his participation in UNESCO-related initiatives in Japan, Kazakhstan, Mongolia, Indonesia, and other countries, where he advocated for climate change education and the development of microcredential programs on sustainability and climate action.',
    'Dr. Babia’s scholarly work focuses on teacher education, educational policy, Education for Sustainable Development (ESD), sustainability, and climate change education. His recent scholarly contributions include a Springer-published book chapter on climate change education that presents a framework for integrating climate change concepts into teacher education curricula.',
    'As a Country Program Manager and project leader, he has spearheaded education initiatives in collaboration with UNESCO Bangkok, UNESCO Japan, USAID, the Aboitiz Foundation, the Coalition for Better Education (CBE), the Department of Education (DepEd), and various local government units. His commitment to capacity-building is demonstrated through his facilitation of several national and international teacher-training programs and professional development engagements.',
    'Dr. Babia earned his Doctor of Education degree from the University of San Jose–Recoletos. He holds a Master of Arts in Special Education from Cebu Normal University, where he received the Master’s Best Thesis Commendation, and graduated Magna Cum Laude with a Bachelor of Special Education degree from Xavier University–Ateneo de Cagayan.',
    'At present, he serves as the inaugural College President III of the government-established City College of Cagayan de Oro. Under his leadership, the institution achieved international recognition through its inclusion in the Times Higher Education Impact Rankings (800- 1000 band), GreenMetric World University Rankings, and the World University Rankings for Innovation (WURI), where it earned global distinctions in Student Engagement, Culture and Arts, and Student Support and Services, remarkable accomplishments for one of the Philippines’ youngest higher education institutions.'
];

const BIONOTE_PREVIEW_COUNT = 2;

const CREDENTIALS = [
    {
        title: 'Academic Leadership',
        lines: ['Dean & VP for Academics', 'College Chairman'],
        icon: (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
                d="M12 14l9-5-9-5-9 5 9 5z M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
        ),
    },
    {
        title: 'Global Sustainability',
        lines: ['UNESCO ESD Consultant', 'SEAMEO ESD Fellow'],
        icon: (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
                d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
        ),
    },
    {
        title: 'Quality Assurance',
        lines: ['PAASCU Commissioner', 'CHED-RQAT Evaluator'],
        icon: (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        ),
    },
    {
        title: 'Educational Policy',
        lines: ['TEC Visayas Representative', 'CHED-TEC TWG Member'],
        icon: (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        ),
    },
];

const OFFICES = [
    {
        id: 'internationalization',
        label: 'Internationalization',
        name: 'Internationalization Office',
        description: 'Global partnerships, mobility programs, and international recognition.',
        functions: ['International Partnerships', 'Student & Faculty Exchange', 'Global Rankings Engagement', 'International Programs', 'Mobility & Scholarships', 'Cross-Border Collaboration'],
        orgChart: {
            name: 'College President III',
            children: [
                {
                    name: 'Internationalization Head',
                    children: [
                        { name: 'International Programs Officers' },
                        { name: 'Administrative Staff' }
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
        id: 'promotions-communications',
        label: 'Promotions & Communications',
        name: 'Promotions and Communications Office',
        description: 'Institutional branding, media relations, and public engagement.',
        functions: ['Public Information', 'Media Relations', 'Marketing & Promotions', 'Digital Content', 'Publications', 'Brand Management'],
        orgChart: {
            name: 'College President III',
            children: [
                {
                    name: 'Promotions and Communications Head',
                    children: [
                        { name: 'Information Officers' },
                        { name: 'Creative & Media Staff' }
                    ]
                }
            ]
        },
        icon: (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
                d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
        ),
    },
    {
        id: 'quality-assurance',
        label: 'Quality Assurance',
        name: 'Quality Assurance Office',
        description: 'Accreditation, standards monitoring, and continuous quality improvement.',
        functions: ['Accreditation Management', 'Quality Standards', 'Program Evaluation', 'Compliance Monitoring', 'Policy Review', 'Continuous Improvement'],
        orgChart: {
            name: 'College President III',
            children: [
                {
                    name: 'Quality Assurance Head',
                    children: [
                        { name: 'Accreditation Officers' },
                        { name: 'QA Staff' }
                    ]
                }
            ]
        },
        icon: (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
        ),
    },
    {
        id: 'culture-arts',
        label: 'Culture and Arts',
        name: 'Office for Culture and Arts',
        description: 'Cultural preservation, artistic development, and creative expression.',
        functions: ['Cultural Programs', 'Arts Development', 'Heritage Preservation', 'Cultural Events', 'Talent Development', 'Creative Productions'],
        orgChart: {
            name: 'College President III',
            children: [
                {
                    name: 'Culture and Arts Head',
                    children: [
                        { name: 'Cultural Affairs Officers' },
                        { name: 'Arts Coordinators' }
                    ]
                }
            ]
        },
        icon: (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
                d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        ),
    },
    {
        id: 'linkages-partnership',
        label: 'Linkages & Partnership',
        name: 'Linkages and Partnership Office',
        description: 'Strategic alliances with industry, government, academe, and communities.',
        functions: ['Institutional Linkages', 'MOU & MOA Management', 'Industry Partnerships', 'Consortium Membership', 'Stakeholder Engagement', 'Collaborative Projects'],
        orgChart: {
            name: 'College President III',
            children: [
                {
                    name: 'Linkages and Partnership Head',
                    children: [
                        { name: 'Linkages Officers' },
                        { name: 'Partnership Staff' }
                    ]
                }
            ]
        },
        icon: (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
                d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
        ),
    },
];

/* ---- Presidential Message Content ---- */
function Em({ children }) {
    return <span className="text-[#E5C68A] font-medium">{children}</span>;
}

const MESSAGE_OPENING = [
    <>City College was founded on a vision: to create meaningful opportunities for deserving Kagay-anons to pursue higher education, develop their potential, and build better futures. From this vision, the College continues to grow as an institution committed to <Em>accessible, inclusive, and transformative education</Em>.</>,
    <>As the College moves forward, we take pride in how far we have come. From our beginnings as a young local institution, we have steadily developed into a growing center of quality education, innovation, and service. Our inclusion in the <Em>2025 and 2026 Times Higher Education Impact Ratings</Em>, where we placed in the 1001–1500 and 801–1000 global brackets, respectively, and our recognition in the <Em>World University Rankings for Innovation (WURI)</Em>, where we ranked 55th worldwide for Culture/Values and 64th for Curricular Innovation for Future-Readiness, among many other significant milestones, mark important milestones in our journey. These achievements reflect the collective efforts of our faculty, staff, students, partners, and the City Government of Cagayan de Oro, whose shared commitment continues to move the College forward.</>,
    <>Yet, while rankings and recognitions affirm our progress, they do not define the full measure of our success. Our greatest achievement lies in the lives we touch, the opportunities we create, and the communities we serve. Every student who discovers their potential, every faculty member who inspires learning, every staff member who enables student success, and every partnership that opens new possibilities contributes to the continuing story of City College.</>,
];

const MESSAGE_CLOSING = [
    <>Today, we remain committed to strengthening research and innovation, advancing sustainability and internationalization, expanding meaningful partnerships, and creating learning experiences that prepare our students to contribute to a changing world. We strive not only to provide access to education, but to ensure that such access leads to growth, purpose, and meaningful opportunities.</>,
    <>The City College of Cagayan de Oro is, above all, an institution built with and for the people of Cagayan de Oro. As we continue this journey, may we remain guided by <Em>excellence, integrity, innovation, and service</Em>. May we continue building a College that is inclusive in its opportunities, ambitious in its aspirations, and responsive to the needs of the communities we serve.</>,
    <>Welcome to the City College of Cagayan de Oro, a home for learning, a community of opportunity, and a place where education helps turn aspirations into possibilities.</>,
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
            className={`transition-all ${className} ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
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

/* Self-Drawing Gold Signature Flourish */
function GoldFlourish({ className = '' }) {
    const [ref, visible] = useReveal();
    return (
        <svg
            ref={ref}
            viewBox="0 0 260 30"
            fill="none"
            className={`block w-52 sm:w-64 h-auto ${className}`}
            aria-hidden="true"
        >
            <defs>
                <linearGradient id="vpFlourishGold" x1="0" y1="0" x2="260" y2="0" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#A97F2E" />
                    <stop offset="50%" stopColor="#E9CE8C" />
                    <stop offset="100%" stopColor="#A97F2E" />
                </linearGradient>
            </defs>
            <path
                d="M6 20 C 52 6, 92 28, 132 15 C 166 4, 204 24, 254 12"
                stroke="url(#vpFlourishGold)"
                strokeWidth="1.5"
                strokeLinecap="round"
                pathLength="1"
                strokeDasharray="1"
                strokeDashoffset={visible ? 0 : 1}
                style={{ transition: 'stroke-dashoffset 1.8s cubic-bezier(0.16, 1, 0.3, 1) 0.4s' }}
            />
        </svg>
    );
}

/* Rotating Presidential Seal */
function PresidentialSeal() {
    return (
        <div className="relative w-32 h-32 md:w-40 md:h-40 select-none" aria-hidden="true">
            {/* Soft gold halo */}
            <div
                className="absolute inset-0 rounded-full"
                style={{ background: 'radial-gradient(circle, rgba(212,175,55,0.18), transparent 70%)' }}
            ></div>
            <svg viewBox="0 0 120 120" className="relative w-full h-full vp-spin-slow">
                <defs>
                    <path id="vpSealRing" d="M60,60 m-46,0 a46,46 0 1,1 92,0 a46,46 0 1,1 -92,0" fill="none" />
                </defs>
                <circle cx="60" cy="60" r="57" fill="none" stroke="rgba(212,175,55,0.35)" strokeWidth="1" />
                <circle cx="60" cy="60" r="34" fill="none" stroke="rgba(212,175,55,0.3)" strokeWidth="0.75" strokeDasharray="1.5 3" />
                <text
                    fill="#D4AF37"
                    fontSize="5.6"
                    fontWeight="600"
                    letterSpacing="1.1"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                >
                    <textPath href="#vpSealRing">CITY COLLEGE OF CAGAYAN DE ORO ★ OFFICE OF THE COLLEGE PRESIDENT ★</textPath>
                </text>
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-14 h-14 md:w-[4.25rem] md:h-[4.25rem] rounded-full bg-white p-1.5 shadow-lg border border-[#D4AF37]/50">
                    <img src={ccdologo} alt="" className="w-full h-full object-contain" />
                </div>
            </div>
        </div>
    );
}

/* Recursive Node — Tree layout (Tablet / Desktop) */
function OrgNode({ node, isRoot = false }) {
    const hasChildren = node.children && node.children.length > 0;

    return (
        <li className="relative flex flex-col items-center list-none">
            <div className={`relative px-3 sm:px-5 py-3 sm:py-4 bg-white border rounded-xl shadow-sm text-center transition-all duration-500 ease-out-expo group hover:-translate-y-1 z-10 w-[170px] sm:w-[240px] ${isRoot
                ? 'sm:w-[300px] border-[#C79A3E] shadow-md hover:shadow-xl'
                : 'border-[#E7E2D6] hover:border-[#145A32] hover:shadow-xl'
                }`}>
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#145A32] to-[#C79A3E] rounded-t-lg transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                <span className="text-[12px] sm:text-[13px] font-semibold text-gray-800 leading-snug">{node.name}</span>
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

/* Recursive Node — Vertical stacked layout (Mobile — fully visible, no scroll) */
function OrgNodeMobile({ node, isRoot = false }) {
    const hasChildren = node.children && node.children.length > 0;

    return (
        <li className="relative flex flex-col items-center w-full list-none">
            <div className={`relative w-full max-w-[280px] px-4 py-3 bg-white border rounded-xl text-center shadow-sm ${isRoot ? 'border-[#C79A3E] shadow-md' : 'border-[#E7E2D6]'}`}>
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#145A32] to-[#C79A3E] rounded-t-lg"></div>
                <span className="text-[12px] font-semibold text-gray-800 leading-snug">{node.name}</span>
            </div>

            {hasChildren && (
                <div className="flex flex-col items-center w-full">
                    {/* Connector: parent → children block */}
                    <span className="w-px h-4 bg-[#145A32]/25" aria-hidden="true"></span>
                    <ul className="flex flex-col items-center w-full">
                        {node.children.map((child, i) => (
                            <li key={i} className="flex flex-col items-center w-full">
                                {/* Connector: previous level → this child */}
                                <span className="w-px h-4 bg-[#145A32]/25" aria-hidden="true"></span>
                                <OrgNodeMobile node={child} />
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </li>
    );
}

/* Office Org Chart Wrapper — auto-switches layout per device */
function OfficeOrgChart({ root }) {
    return (
        <>
            {/* Mobile: vertical stacked — everything visible */}
            <div className="sm:hidden">
                <ul className="flex flex-col items-center w-full">
                    <OrgNodeMobile node={root} isRoot={true} />
                </ul>
            </div>

            {/* Tablet / Desktop: tree layout */}
            <div className="hidden sm:block w-full overflow-x-auto no-scrollbar">
                <ul className="org-tree flex justify-center min-w-max mx-auto py-1">
                    <OrgNode node={root} isRoot={true} />
                </ul>
            </div>
        </>
    );
}

export default function PresidentUnit() {
    const [scrollProgress, setScrollProgress] = useState(0);
    const [activeOffice, setActiveOffice] = useState('internationalization');
    const [bioExpanded, setBioExpanded] = useState(false);
    const [pendingScroll, setPendingScroll] = useState(false);

    const officeNavRef = useRef(null);
    const officeDetailsRef = useRef(null);

    useEffect(() => {
        document.title = "Office of the College President - City College of Cagayan de Oro";

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
                @import url('https://fonts.googleapis.com/css2?family=Merriweather:wght@400;700;900&display=swap');

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

                .vp-serif { font-family: 'Merriweather', Georgia, serif; }
                .vp-sans { font-family: Tahoma, 'Segoe UI', sans-serif; }
                .ease-out-expo { transition-timing-function: cubic-bezier(0.16, 1, 0.3, 1) !important; }

                /* Responsive Drop Cap */
                .vp-bio-lead::first-letter {
                    font-family: 'Merriweather', Georgia, serif;
                    font-size: clamp(3rem, 12vw, 5rem);
                    font-weight: 500;
                    float: left;
                    line-height: 0.85;
                    padding-right: 0.75rem;
                    padding-top: 0.5rem;
                    color: var(--vp-green-mid);
                }

                /* ---- Presidential Message Additions ---- */
                .vp-gold-text {
                    background: linear-gradient(120deg, #B8922E 0%, #E5C68A 30%, #D4AF37 55%, #F1DFAE 80%, #B8922E 100%);
                    -webkit-background-clip: text;
                    background-clip: text;
                    -webkit-text-fill-color: transparent;
                    color: transparent;
                }

                .vp-message-lead::first-letter {
                    font-family: 'Merriweather', Georgia, serif;
                    font-size: clamp(3rem, 9vw, 4.25rem);
                    font-weight: 600;
                    float: left;
                    line-height: 0.8;
                    padding-right: 0.7rem;
                    padding-top: 0.45rem;
                    color: var(--vp-gold);
                }

                @keyframes vp-spin-slow {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                .vp-spin-slow {
                    animation: vp-spin-slow 36s linear infinite;
                    transform-origin: 50% 50%;
                }

                @media (prefers-reduced-motion: reduce) {
                    .vp-spin-slow { animation: none !important; }
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

                /* Bulletproof CSS Tree Connectors for Org Chart (Desktop) */
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

                /* ---- President's Memo floating button pulse ---- */
                @keyframes vpMemoPulse {
                    0% { box-shadow: 0 0 0 0 rgba(212,175,55,0.45); }
                    70% { box-shadow: 0 0 0 14px rgba(212,175,55,0); }
                    100% { box-shadow: 0 0 0 0 rgba(212,175,55,0); }
                }
                .vp-memo-pulse {
                    animation: vpMemoPulse 2.6s ease-out infinite;
                }

                @media (prefers-reduced-motion: reduce) {
                    .office-chip .vp-chip-shimmer { animation: none !important; opacity: 0 !important; }
                    .vp-memo-pulse { animation: none !important; }
                }
            `}</style>

            {/* Scroll Progress Indicator */}
            <div className="fixed top-0 left-0 w-full h-1 z-[1000] bg-transparent">
                <div
                    className="h-full transition-[width] duration-100 ease-out"
                    style={{ width: `${scrollProgress}%`, background: 'linear-gradient(90deg, var(--vp-green-mid), var(--vp-gold))' }}
                />
            </div>

            {/* ===================== President's Memo — Floating Button (top-right, lowered) ===================== */}
            <a
                href={MEMO_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Open President's Memo in a new tab"
                className="group fixed top-28 right-4 sm:top-32 sm:right-8 z-[900] inline-flex items-center gap-2.5 sm:gap-3 rounded-full pl-3 pr-4 sm:pl-4 sm:pr-5 py-2.5 sm:py-3 text-white border border-[#D4AF37]/60 shadow-[0_18px_40px_-12px_rgba(10,46,24,0.7)] transition-all duration-500 ease-out-expo hover:-translate-y-1 hover:shadow-[0_26px_55px_-12px_rgba(10,46,24,0.8)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]/70 focus-visible:ring-offset-2"
                style={{ background: 'linear-gradient(120deg, #0A2E18 0%, #145A32 60%, #0A2E18 100%)' }}
            >
                {/* Pulsing gold halo */}
                <span
                    className="vp-memo-pulse absolute inset-0 rounded-full pointer-events-none"
                    aria-hidden="true"
                ></span>

                {/* Icon medallion — official memo seal */}
                <span className="relative flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full border border-[#D4AF37]/60 bg-white/10 text-[#E5C68A] transition-all duration-500 group-hover:bg-[#D4AF37] group-hover:text-[#0A2E18]">
                    <MemoSealIcon className="h-4 w-4 sm:h-[18px] sm:w-[18px]" />
                </span>

                {/* Label */}
                <span className="relative flex flex-col gap-[3px] leading-none">
                    <span className="text-[8px] sm:text-[9px] font-bold tracking-[0.25em] uppercase text-[#D4AF37]">
                        Official
                    </span>
                    <span className="text-[11px] sm:text-xs font-semibold tracking-wide whitespace-nowrap">
                        President's Memo
                    </span>
                </span>

                {/* External-link arrow */}
                <svg
                    className="relative h-3 w-3 text-[#E5C68A] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" aria-hidden="true"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                </svg>
            </a>

            {/* ===================== Hero Banner ===================== */}
            <div
                className="relative w-full bg-cover bg-center bg-no-repeat shadow-lg min-h-[350px] md:min-h-[450px] lg:min-h-[550px] flex items-center justify-center"
                style={{ backgroundImage: `url(${presidentBanner})` }}
            >
                <div className="absolute inset-0 bg-black/50"></div>
                <AnimatedBannerText
                    title="Office of the College President"
                    description="Executive leadership and strategic direction for the City College of Cagayan de Oro."
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
                                Office of the President
                            </span>
                        </Reveal>
                        <Reveal delay={150}>
                            <h1 className="vp-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium leading-[1.05] tracking-tight mb-4 sm:mb-6">
                                Dr. Jestoni P. <br />Babia, LPT
                            </h1>
                        </Reveal>
                        <Reveal delay={300}>
                            <p className="text-base sm:text-lg md:text-xl text-white/60 max-w-xl mb-8 sm:mb-12">
                                College President III at the City College of Cagayan de Oro.
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
                                    src={presidentImage}
                                    alt="Dr. Jestoni P. Babia"
                                    className="w-full aspect-[4/5] object-cover transition-transform duration-[1.5s] ease-out-expo group-hover:scale-105"
                                />
                                {/* Gradient Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0A2E18] via-[#0A2E18]/20 to-transparent opacity-80 pointer-events-none"></div>

                                {/* Floating CCDO Seal & Label */}
                                <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 flex items-center gap-3 sm:gap-4 z-10">
                                    <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-white p-1.5 sm:p-2 shadow-xl border border-[#D4AF37]/50 flex-shrink-0">
                                        <img src={ccdologo} alt="CCDO Logo" className="w-full h-full object-contain" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] sm:text-xs text-[#D4AF37] tracking-widest uppercase">City College of Cagayan de Oro</p>
                                        <p className="text-xs sm:text-sm font-semibold text-white">Dr. Jestoni P. Babia, LPT</p>
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

            {/* ===================== 3. Presidential Message (Ceremonial Address) ===================== */}
            <section
                className="relative vp-sans text-white overflow-hidden"
                style={{ background: 'linear-gradient(180deg, #0A2E18 0%, #0C371E 50%, #0A2E18 100%)' }}
                aria-label="Message from the College President"
            >
                {/* Gilded seam */}
                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#D4AF37]/40 to-transparent" aria-hidden="true"></div>

                {/* Ambient texture & glows */}
                <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(#D4AF37 1px, transparent 1px)', backgroundSize: '34px 34px' }} aria-hidden="true"></div>
                <div className="absolute -top-40 -left-40 w-[34rem] h-[34rem] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(212,175,55,0.10), transparent 65%)' }} aria-hidden="true"></div>
                <div className="absolute -bottom-48 -right-32 w-[36rem] h-[36rem] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(212,175,55,0.08), transparent 65%)' }} aria-hidden="true"></div>

                {/* Charter-style inset frame */}
                <div className="absolute inset-3 sm:inset-5 border border-[#D4AF37]/10 rounded pointer-events-none" aria-hidden="true"></div>
                {/* Corner ornaments */}
                <div className="absolute top-3 sm:top-5 left-3 sm:left-5 w-7 h-7 border-t-2 border-l-2 border-[#D4AF37]/50 pointer-events-none" aria-hidden="true"></div>
                <div className="absolute top-3 sm:top-5 right-3 sm:right-5 w-7 h-7 border-t-2 border-r-2 border-[#D4AF37]/50 pointer-events-none" aria-hidden="true"></div>
                <div className="absolute bottom-3 sm:bottom-5 left-3 sm:left-5 w-7 h-7 border-b-2 border-l-2 border-[#D4AF37]/50 pointer-events-none" aria-hidden="true"></div>
                <div className="absolute bottom-3 sm:bottom-5 right-3 sm:right-5 w-7 h-7 border-b-2 border-r-2 border-[#D4AF37]/50 pointer-events-none" aria-hidden="true"></div>

                {/* Vertical margin annotations */}
                <span
                    className="hidden xl:block absolute left-10 top-1/2 -translate-y-1/2 text-[9px] font-semibold tracking-[0.5em] uppercase text-white/20 select-none pointer-events-none"
                    style={{ writingMode: 'vertical-rl' }}
                    aria-hidden="true"
                >
                    Office of the College President
                </span>
                <span
                    className="hidden xl:block absolute right-10 top-1/2 -translate-y-1/2 text-[9px] font-semibold tracking-[0.5em] uppercase text-white/20 select-none pointer-events-none"
                    style={{ writingMode: 'vertical-rl' }}
                    aria-hidden="true"
                >
                    City College of Cagayan de Oro
                </span>

                <div className="relative max-w-4xl mx-auto px-5 sm:px-8 py-20 sm:py-24 md:py-32">

                    {/* Ceremonial header */}
                    <div className="text-center max-w-3xl mx-auto">
                        <Reveal>
                            <div className="inline-flex items-center gap-4 mb-7 sm:mb-9">
                                <span className="h-px w-8 sm:w-12 bg-gradient-to-r from-transparent to-[#D4AF37]/70"></span>
                                <span className="text-[10px] sm:text-[11px] font-bold tracking-[0.3em] sm:tracking-[0.35em] uppercase text-[#D4AF37]">
                                    Message from the College President
                                </span>
                                <span className="h-px w-8 sm:w-12 bg-gradient-to-l from-transparent to-[#D4AF37]/70"></span>
                            </div>
                        </Reveal>

                        <Reveal delay={100}>
                            <div className="vp-serif vp-gold-text text-[5rem] sm:text-[6.5rem] leading-[0.5] select-none" aria-hidden="true">“</div>
                        </Reveal>

                        <Reveal delay={180}>
                            <h2 className="vp-serif italic font-medium text-[1.4rem] sm:text-3xl md:text-[2.5rem] leading-[1.25] tracking-tight text-white -mt-2 sm:-mt-4">
                                <span className="vp-gold-text">Maayong pag-abot</span> sa City College of Cagayan de Oro, Kauban!
                            </h2>
                        </Reveal>

                        <Reveal delay={260}>
                            <p className="vp-serif italic text-sm sm:text-base text-white/40 mt-5">
                                — a warm welcome to the City College of Cagayan de Oro, kauban —
                            </p>
                        </Reveal>

                        <Reveal delay={340}>
                            <GoldDivider className="mt-10 sm:mt-12" />
                        </Reveal>
                    </div>

                    {/* Message body — opening */}
                    <div className="mt-12 sm:mt-16 md:mt-20 max-w-[42rem] mx-auto text-white/70 text-[15px] sm:text-base md:text-[17px] leading-[1.85] sm:leading-[1.95] space-y-6 sm:space-y-8">
                        {MESSAGE_OPENING.map((para, i) => (
                            <Reveal key={`msg-open-${i}`} delay={i * 70}>
                                <p className={i === 0 ? 'vp-message-lead' : ''}>{para}</p>
                            </Reveal>
                        ))}
                    </div>

                    {/* Pull quote */}
                    <Reveal className="mt-14 sm:mt-20">
                        <figure className="relative text-center px-2 sm:px-10">
                            <span
                                className="absolute -top-6 sm:-top-10 left-1/2 -translate-x-1/2 vp-serif text-[6rem] sm:text-[8rem] leading-none text-[#D4AF37]/10 select-none pointer-events-none"
                                aria-hidden="true"
                            >
                                “
                            </span>
                            <GoldDivider />
                            <blockquote className="relative vp-serif italic text-xl sm:text-2xl md:text-[1.7rem] leading-snug text-white/90 max-w-2xl mx-auto mt-8 sm:mt-10">
                                “Our greatest achievement lies in the lives we touch, the opportunities we create, and the communities we serve.”
                            </blockquote>
                            <GoldDivider className="mt-8 sm:mt-10" />
                        </figure>
                    </Reveal>

                    {/* Message body — closing */}
                    <div className="mt-12 sm:mt-16 max-w-[42rem] mx-auto text-white/70 text-[15px] sm:text-base md:text-[17px] leading-[1.85] sm:leading-[1.95] space-y-6 sm:space-y-8">
                        {MESSAGE_CLOSING.map((para, i) => {
                            const isLast = i === MESSAGE_CLOSING.length - 1;
                            return (
                                <Reveal key={`msg-close-${i}`} delay={i * 70}>
                                    <p className={isLast ? 'vp-serif italic text-lg sm:text-xl md:text-[1.35rem] leading-relaxed text-white/85' : ''}>
                                        {para}
                                    </p>
                                </Reveal>
                            );
                        })}
                    </div>

                    {/* Signature & seal */}
                    <Reveal className="mt-16 sm:mt-20">
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-10 sm:gap-16">
                            <div className="text-center">
                                <p className="vp-serif italic font-medium text-3xl sm:text-4xl text-white/95">Dr. Jestoni P. Babia</p>
                                <GoldFlourish className="mt-1 mx-auto" />
                                <p className="text-[10px] sm:text-[11px] font-bold tracking-[0.35em] uppercase text-[#D4AF37]">
                                    College President III
                                </p>
                                <p className="mt-2 text-[9px] sm:text-[10px] font-semibold tracking-[0.25em] uppercase text-white/35">
                                    City College of Cagayan de Oro
                                </p>
                            </div>
                            <div className="transform sm:-rotate-6 hover:rotate-0 transition-transform duration-700 ease-out-expo">
                                <PresidentialSeal />
                            </div>
                        </div>
                    </Reveal>

                    {/* President's Memo — inline CTA */}
                    <Reveal className="mt-12 sm:mt-16">
                        <div className="flex flex-col items-center gap-3">
                            <a
                                href={MEMO_URL}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group inline-flex items-center gap-3 rounded-full border border-[#D4AF37]/60 bg-white/5 backdrop-blur-md px-6 sm:px-8 py-3 sm:py-3.5 text-white transition-all duration-500 ease-out-expo hover:-translate-y-1 hover:bg-[#D4AF37] hover:border-[#D4AF37] hover:text-[#0A2E18] hover:shadow-[0_18px_40px_-14px_rgba(212,175,55,0.6)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A2E18]"
                            >
                                <MemoSealIcon className="h-4 w-4 text-[#D4AF37] transition-colors duration-500 group-hover:text-[#0A2E18]" />
                                <span className="text-[10px] sm:text-xs font-bold tracking-widest uppercase">
                                    President's Memo
                                </span>
                                <svg
                                    className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                                    fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" aria-hidden="true"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                                </svg>
                            </a>
                            <p className="text-[9px] font-semibold tracking-[0.3em] uppercase text-white/30">
                                Opens in a new tab · Google Drive
                            </p>
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* ===================== 04 — Institutional Offices Cluster (Selector + Details) ===================== */}
            <section
                className="relative vp-sans overflow-hidden"
                style={{ background: 'var(--vp-paper)' }}
                aria-label="Institutional Offices Cluster"
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
                                04 &nbsp;·&nbsp; Cluster Offices
                            </span>
                            <span className="h-px w-8 bg-gradient-to-l from-transparent to-[#A97F2E]/60" aria-hidden="true"></span>
                        </div>
                        <h2 className="vp-serif text-3xl sm:text-4xl md:text-[2.75rem] font-semibold tracking-tight" style={{ color: 'var(--vp-green-950)' }}>
                            Institutional Offices
                        </h2>
                        <p className="mt-3 text-sm sm:text-[15px] text-gray-500 leading-relaxed">
                            Five offices operating under the direct leadership of the College President.
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
                                            <span className="relative z-10 flex flex-col gap-[3px] leading-none">
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
                                                    Office {String(OFFICES.findIndex(o => o.id === activeOffice) + 1).padStart(2, '0')} · Presidential Cluster
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
                                            <OfficeOrgChart root={activeOfficeData.orgChart} />
                                        </div>
                                    </div>
                                </div>

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
        </MainLayout>
    );
}