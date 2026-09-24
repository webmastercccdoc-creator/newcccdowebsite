import { useEffect, useMemo, useRef, useState } from 'react';
import MainLayout from '../../../layouts/MainLayout';
import vpAcademicsBanner from '../../../assets/banner/ovpacads-banner.png';
import AnimatedBannerText from '../../../components/content/AnimatedBannerText';
import ccdologo from '../../../assets/logos/ccdologo.png';
import kurtCandilasImage from '../../../assets/images/Dr_Kurt_Candilas.png';

/* ============================================================================
   DATA CONTENT
   ============================================================================ */
const BIONOTE_PARAGRAPHS = [
    <>Dr. Kurt S. Candilas, PhD, LPT is the Vice President for Administration at the City College of Cagayan de Oro, Philippines, and former College Dean of Lourdes College, Inc. In his current capacity, he provides administrative and financial leadership and oversees key institutional offices and services, including Human Resources, the Technology Innovation and Data Management Center, and Physical Plant Services. He earned his Bachelor of Arts in English from Bukidnon State University, his Master&rsquo;s in Education majoring in Teaching English Communication Arts from Lourdes College, and his Doctor of Philosophy in English majoring in Literature from the University of San Jose&ndash;Recoletos, Cebu City. He also holds an advanced TESOL certification from the American TESOL Institute of the Philippines.</>,
    <>With his expertise in English communication arts, Dr. Candilas was designated by the Commission on Higher Education (CHED) as a regional trainer for Purposive Communication, a General Education subject in the higher education curriculum. He is the lead author of Purposive Communication with Sustainable Development Goals Integration, published by Mindshapers Co., Inc. in 2025, and the author of Qualitative Research Design: Concepts, Methods, and Applications, published by Unlimited Books Library Services &amp; Publishing Inc. His scholarly work focuses on communication, education, qualitative research methodology, literature, linguistics, and related interdisciplinary fields.</>,
    <>Dr. Candilas has received several international and national research distinctions, including Best Paper Presentation at the 2nd International Conference on Languages, Linguistics, and Society (Malaysia, 2018), the 7th OpenTESOL International Conference (Vietnam, 2019), and the Best Research Paper and Best Presenter Awards at the 2023 International Conference on Education, Business, and Science and Technology (Philippines). In 2025, he received the Best Session Paper Award during the 5th International Conference and 2025 NOTED National Convention. In 2026, he received the Best Research Paper and Best Research Presentation Awards during the Research Congress of St. Michael&rsquo;s College of Iligan, Inc.</>,
    <>He has also served as a Judge in Regional and Division School Press Conferences in Northern Mindanao and as an Internal Auditor for ISO 9001:2015. He serves as an Advisory Board Member of the International Conference in TESOL and Education and as a peer reviewer for various academic journals and conference proceedings in the Philippines and Vietnam. He also serves as an Editorial Board Member of the International Review of Social Science Research and has undertaken peer-review engagements in Indigenous Studies, Social Development, Multidisciplinary Research, TESOL, and Education.</>,
    <>His professional affiliations include Associate Member of the National Research Council of the Philippines (NRCP); Associate Member of the International Conference of TESOL &amp; Education; Regular Member of the Professional Organization of Researchers and Educators of the Philippines (POREP); and membership in the Rotary Club of Cagayan de Oro Torch.</>,
    <>His research interests include communication, literature, linguistics, education, qualitative research methodology, and interdisciplinary studies.</>,
];

const BIONOTE_PREVIEW_COUNT = 2;

const CREDENTIALS = [
    {
        title: 'Academic Background',
        lines: ['PhD in English (Literature)', 'MA in Education (English)'],
        icon: (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
                d="M12 14l9-5-9-5-9 5 9 5z M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
        ),
    },
    {
        title: 'Research & Publications',
        lines: ['Lead Author, Purposive Communication', 'Author, Qualitative Research Design'],
        icon: (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        ),
    },
    {
        title: 'Leadership & Awards',
        lines: ['Best Paper, OpenTESOL (Vietnam)', 'Best Research Paper (2023)'],
        icon: (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
                d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        ),
    },
    {
        title: 'Academic Certifications',
        lines: ['CHED Regional Trainer', 'ISO 9001:2015 Internal Auditor'],
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
        description: 'Quality instruction and training for future educators across disciplines.',
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
        description: 'Critical thinking, communication, and analytical skill development.',
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
        description: 'Leadership preparation for business, entrepreneurship, and administration.',
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
        description: 'Civic welfare, literacy training, and ROTC programs for students.',
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
        name: 'Technical Skills and Technology Institute',
        description: 'Technical-vocational education, skills training, and industry linkages.',
        functions: [
            'Technical Skills Training', 'Vocational Education', 'Industry Partnership',
            'Skills Assessment', 'Facility Management', 'Program Development',
        ],
        orgChart: {
            name: 'Vocational School Administrator, Technical Skills and Technology Institute',
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
        description: 'Curriculum, library, registrar, licensure review, and student affairs services.',
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

/* Recursive Node — Tree layout (Desktop lg+) */
function OrgNode({ node, isRoot = false }) {
    const hasChildren = node.children && node.children.length > 0;

    return (
        <li className="relative flex flex-col items-center list-none">
            <div className={`relative px-4 py-3.5 bg-white border rounded-xl shadow-sm text-center transition-all duration-500 ease-out-expo group hover:-translate-y-1 z-10 w-[185px] ${isRoot
                ? 'w-[280px] border-[#C79A3E] shadow-md hover:shadow-xl'
                : 'border-[#E7E2D6] hover:border-[#145A32] hover:shadow-xl'
                }`}>
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#145A32] to-[#C79A3E] rounded-t-lg transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                <span className="text-[12px] font-semibold text-gray-800 leading-snug">{node.name}</span>
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

/* Recursive Node — Vertical stacked layout (fully visible, no scroll) */
function OrgNodeMobile({ node, isRoot = false }) {
    const hasChildren = node.children && node.children.length > 0;

    return (
        <li className="relative flex flex-col items-center w-full list-none">
            <div className={`relative w-full max-w-[290px] px-4 py-3 bg-white border rounded-xl text-center shadow-sm ${isRoot ? 'border-[#C79A3E] shadow-md' : 'border-[#E7E2D6]'}`}>
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#145A32] to-[#C79A3E] rounded-t-lg"></div>
                <span className="text-[12px] font-semibold text-gray-800 leading-snug">{node.name}</span>
            </div>

            {hasChildren && (
                <div className="flex flex-col items-center w-full">
                    <span className="w-px h-4 bg-[#145A32]/25" aria-hidden="true"></span>
                    <ul className="flex flex-col items-center w-full">
                        {node.children.map((child, i) => (
                            <li key={i} className="flex flex-col items-center w-full">
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

/* Office Org Chart Wrapper — stacked below lg, fitted tree at lg+ */
function OfficeOrgChart({ root }) {
    return (
        <>
            <div className="lg:hidden">
                <ul className="flex flex-col items-center w-full">
                    <OrgNodeMobile node={root} isRoot={true} />
                </ul>
            </div>

            <div className="hidden lg:block w-full">
                <ul className="org-tree flex justify-center w-full">
                    <OrgNode node={root} isRoot={true} />
                </ul>
            </div>
        </>
    );
}

/* Academic Support Org Chart — fluid grouped-card layout, fully visible on every device */
function AcademicSupportOrgChart({ root }) {
    const osas = root.children[0];
    const supportOffices = root.children[1].children;

    const healthNames = ['Head, Health Services', 'College Physician and Nurses', 'College Dentist'];
    const healthUnits = osas.children.filter((n) => healthNames.includes(n.name));
    const osasUnits = osas.children.filter((n) => !healthNames.includes(n.name));

    return (
        <div className="w-full flex flex-col items-center">
            {/* Root */}
            <div className="relative w-full max-w-[300px] px-4 py-3.5 bg-white border border-[#C79A3E] rounded-xl shadow-md text-center z-10">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#145A32] to-[#C79A3E] rounded-t-lg"></div>
                <span className="text-[13px] font-semibold text-gray-800 leading-snug">{root.name}</span>
            </div>

            {/* Connector */}
            <span className="w-px h-6 bg-[#145A32]/25" aria-hidden="true"></span>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 w-full">
                {/* OSAS Branch */}
                <div className="lg:col-span-7">
                    <div className="h-full rounded-xl border border-[#E7E2D6] bg-white p-4 sm:p-5">
                        <div className="flex items-start gap-2.5 mb-3 sm:mb-4">
                            <span className="mt-1.5 h-1.5 w-1.5 rotate-45 bg-[#D4AF37] flex-shrink-0" aria-hidden="true"></span>
                            <p className="text-[12px] sm:text-[13px] font-bold text-[#0B3D1F] leading-snug">{osas.name}</p>
                        </div>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-2">
                            {osasUnits.map((u) => (
                                <li
                                    key={u.name}
                                    className="flex items-start gap-2.5 rounded-lg border border-[#E7E2D6] bg-[#FDFCF9] px-3 py-2.5 text-[11.5px] sm:text-xs font-medium text-[#3A4A41] leading-snug transition-all duration-300 hover:border-[#145A32]/40 hover:bg-white hover:shadow-[0_8px_18px_-10px_rgba(20,90,50,0.35)]"
                                >
                                    <span className="mt-1.5 h-1.5 w-1.5 rotate-45 flex-shrink-0 bg-[#145A32]/50" aria-hidden="true"></span>
                                    <span>{u.name}</span>
                                </li>
                            ))}
                        </ul>

                        {/* Health Services sub-group */}
                        <div className="mt-3 rounded-lg border border-[#D4AF37]/35 bg-[#FBF6E9] p-3">
                            <p className="text-[9px] font-bold tracking-[0.25em] uppercase text-[#A97F2E] mb-2">Health Services</p>
                            <ul className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                                {healthUnits.map((u) => (
                                    <li
                                        key={u.name}
                                        className="flex items-start gap-2.5 rounded-md border border-[#D4AF37]/30 bg-white px-3 py-2.5 text-[11.5px] sm:text-xs font-medium text-[#6B5316] leading-snug transition-all duration-300 hover:border-[#D4AF37]/60"
                                    >
                                        <span className="mt-1.5 h-1.5 w-1.5 rotate-45 flex-shrink-0 bg-[#D4AF37]" aria-hidden="true"></span>
                                        <span>{u.name}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Academic Support Offices Branch */}
                <div className="lg:col-span-5">
                    <div className="h-full rounded-xl border border-[#E7E2D6] bg-white p-4 sm:p-5">
                        <div className="flex items-start gap-2.5 mb-3 sm:mb-4">
                            <span className="mt-1.5 h-1.5 w-1.5 rotate-45 bg-[#D4AF37] flex-shrink-0" aria-hidden="true"></span>
                            <p className="text-[12px] sm:text-[13px] font-bold text-[#0B3D1F] leading-snug">{root.children[1].name}</p>
                        </div>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2">
                            {supportOffices.map((u) => (
                                <li
                                    key={u.name}
                                    className="flex items-start gap-2.5 rounded-lg border border-[#E7E2D6] bg-[#FDFCF9] px-3 py-2.5 text-[11.5px] sm:text-xs font-medium text-[#3A4A41] leading-snug transition-all duration-300 hover:border-[#145A32]/40 hover:bg-white hover:shadow-[0_8px_18px_-10px_rgba(20,90,50,0.35)]"
                                >
                                    <span className="mt-1.5 h-1.5 w-1.5 rotate-45 flex-shrink-0 bg-[#145A32]/50" aria-hidden="true"></span>
                                    <span>{u.name}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function VPAcademics() {
    const [scrollProgress, setScrollProgress] = useState(0);
    const [activeOffice, setActiveOffice] = useState('coe');
    const [bioExpanded, setBioExpanded] = useState(false);
    const [pendingScroll, setPendingScroll] = useState(false);

    const officeNavRef = useRef(null);
    const officeDetailsRef = useRef(null);

    useEffect(() => {
        document.title = "Vice President for Administration - City College of Cagayan de Oro";
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

    const isSupport = activeOffice === 'support';

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

                /* Bulletproof CSS Tree Connectors for Org Chart (Desktop lg+) */
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
                    padding: 18px 8px 0 8px;
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
                    height: 18px;
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
                    padding-top: 18px;
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
                    height: 18px;
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

                @media (prefers-reduced-motion: reduce) {
                    .office-chip .vp-chip-shimmer { animation: none !important; opacity: 0 !important; }
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
                style={{ backgroundImage: `url(${vpAcademicsBanner})` }}
            >
                <div className="absolute inset-0 bg-black/50"></div>
                <AnimatedBannerText
                    title="Vice President for Administration"
                    description="Administrative leadership, institutional support, and operational excellence at the City College of Cagayan de Oro."
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
                                Dr. Kurt S. <br />Candilas, PhD, LPT
                            </h1>
                        </Reveal>
                        <Reveal delay={300}>
                            <p className="text-base sm:text-lg md:text-xl text-white/60 max-w-xl mb-8 sm:mb-12">
                                Vice President for Administration at the City College of Cagayan de Oro.
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
                                        <p className="text-xs sm:text-sm font-semibold text-white">Dr. Kurt S. Candilas, PhD, LPT</p>
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

            {/* ===================== 03 — Academic Cluster (Selector + Details) ===================== */}
            <section
                className="relative vp-sans overflow-hidden"
                style={{ background: 'var(--vp-paper)' }}
                aria-label="Academic Cluster"
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
                            Academic Cluster
                        </h2>
                        <p className="mt-3 text-sm sm:text-[15px] text-gray-500 leading-relaxed">
                            Six offices and colleges operating under the Vice President for Academic Affairs.
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
                                                    Office {String(OFFICES.findIndex(o => o.id === activeOffice) + 1).padStart(2, '0')} · Academic Cluster
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
                                            {isSupport ? (
                                                <AcademicSupportOrgChart root={activeOfficeData.orgChart} />
                                            ) : (
                                                <OfficeOrgChart root={activeOfficeData.orgChart} />
                                            )}
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

            {/* ===================== Footer spacing ===================== */}
            <div className="h-4" style={{ background: 'var(--vp-paper)' }} aria-hidden="true" />
        </MainLayout>
    );
}