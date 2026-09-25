import { useEffect, useState, useRef } from 'react';
import MainLayout from '../../../layouts/MainLayout';
import cedBanner from '../../../assets/banner/tsti-banner.png';
import ccdologo from '../../../assets/logos/ccdologo.png';
import acad_bg from '../../../assets/images/prog_bg.png';

// --- Trainer Images ---
import arielDablioImg from '../../../assets/images/TSTI Trainers/Ariel Dablio.png';
import brianLargoImg from '../../../assets/images/TSTI Trainers/Brian M. Largo.png';
import charlotteCansinoImg from '../../../assets/images/TSTI Trainers/Charlotte Y. Cansino.png';
import elnardCastillonImg from '../../../assets/images/TSTI Trainers/elnard-image.png';
import gayMarieHawinayImg from '../../../assets/images/TSTI Trainers/Gay Marie C. Hawinay.png';
import gemmaGonzalesImg from '../../../assets/images/TSTI Trainers/Brian M. Largo.png';
import irielAnsayImg from '../../../assets/images/TSTI Trainers/Iriel P. Ansay.png';
import junFuentesImg from '../../../assets/images/TSTI Trainers/Jun Junrie A. Fuentes.png';
import omiyaLinogImg from '../../../assets/images/TSTI Trainers/Omiya O. Linog.png';
import ricaOmictinImg from '../../../assets/images/TSTI Trainers/Rica Mae L. Omictin.png';
import romuloAranaImg from '../../../assets/images/TSTI Trainers/Romulo P. Arana.png';
import valcyrusMadarietaImg from '../../../assets/images/TSTI Trainers/Brian M. Largo.png';
import karlImg from '../../../assets/images/TSTI Trainers/karl-image.png';

import { motion, AnimatePresence } from 'framer-motion';

// --- Background tokens for the Curriculum section ---
const PANEL = '#F3EFE4';
const HAIRLINE = '#D8D2C4';

// --- Premium Sub-components ---
const MaskedText = ({ text, className }) => (
    <span className={`relative inline-block overflow-hidden ${className}`}>
        <motion.span
            initial={{ y: "110%" }}
            whileInView={{ y: "0%" }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.9, ease: [0.33, 1, 0.68, 1] }}
            className="inline-block"
        >
            {text}
        </motion.span>
    </span>
);

const Kicker = ({ children, textClass = "text-emerald-600", ruleClass = "bg-emerald-600", align = "left" }) => (
    <div className={`flex items-center gap-3 mb-3 ${align === "center" ? "justify-center" : ""}`}>
        <span className={`w-8 h-px ${ruleClass}`} />
        <span className={`text-[13px] italic font-serif ${textClass}`}>{children}</span>
        {align === "center" && <span className={`w-8 h-px ${ruleClass}`} />}
    </div>
);

// --- Under Development Placeholder ---
const UnderDevelopment = ({ label = "Content" }) => (
    <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
        <div className="w-16 h-16 rounded-full bg-slate-200 flex items-center justify-center mb-4">
            <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z" />
            </svg>
        </div>
        <p className="text-slate-500 font-medium text-sm uppercase tracking-wider">Under Development</p>
        <p className="text-slate-400 text-xs mt-1">{label} will be available soon</p>
    </div>
);

// --- Trainer Card Component ---
// `qualification`  — single qualification string (legacy)
// `qualifications` — array of qualifications (for multi-qualified trainers)
const TrainerCard = ({ trainer, idx, qualification, qualifications }) => {
    // Build the list of quals to display under the name.
    // Prefer the array form when provided; otherwise fall back to a single string.
    const qualList = Array.isArray(qualifications) && qualifications.length > 0
        ? qualifications
        : (qualification || trainer.position ? [qualification || trainer.position] : []);

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.08, duration: 0.6 }}
            className="group flex flex-col items-center w-full max-w-[260px] mx-auto"
        >
            <div className="relative w-full">
                <div className="relative z-10 rounded-lg p-2 bg-white border border-slate-100 shadow-md transition-all duration-500 group-hover:shadow-xl">
                    <div className="overflow-hidden rounded-md w-full aspect-[4/5] bg-slate-200 border-[3px] border-slate-900/90 flex items-center justify-center">
                        {trainer.image ? (
                            <img
                                src={trainer.image}
                                alt={trainer.name}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                        ) : (
                            <span className="text-slate-400 text-xs uppercase tracking-wider">Photo</span>
                        )}
                    </div>
                </div>

                <div className="absolute inset-0 z-0 rounded-lg translate-x-2.5 translate-y-2.5 border-2 border-emerald-700/50 transition-all duration-500 group-hover:translate-x-1.5 group-hover:translate-y-1.5"></div>

                <div className="absolute top-1 left-1 w-5 h-5 border-t-2 border-l-2 border-amber-500/80 z-20 rounded-tl-md transition-all duration-500 group-hover:top-0.5 group-hover:left-0.5"></div>
                <div className="absolute bottom-1 right-1 w-5 h-5 border-b-2 border-r-2 border-amber-500/80 z-20 rounded-br-md transition-all duration-500 group-hover:bottom-0.5 group-hover:right-0.5"></div>
            </div>

            <div className="mt-6 text-center px-2">
                <h3 className="text-base font-serif font-bold text-slate-800 tracking-tight leading-tight">{trainer.name}</h3>
                <div className="mt-2 flex flex-col items-center gap-1">
                    {qualList.map((q, i) => (
                        <p key={i} className="text-[11px] text-emerald-600 font-semibold uppercase tracking-[0.1em]">
                            {q}
                        </p>
                    ))}
                </div>
                <div className="mt-3 h-px w-12 bg-slate-200 mx-auto"></div>
            </div>
        </motion.div>
    );
};

// --- Main Component ---
export default function TechnicalSkillsTechnologyInstitute() {
    const [imageError, setImageError] = useState(false);
    const [activeVMO, setActiveVMO] = useState('vision');
    const [activeProg, setActiveProg] = useState(0);
    const [activeSector, setActiveSector] = useState(0);
    const [tstiNews, setTstiNews] = useState([]);
    const [isLoadingNews, setIsLoadingNews] = useState(true);
    const [isNewsVisible, setIsNewsVisible] = useState(false);

    // Refs for 3D Carousel
    const dragRef = useRef(null);
    const spinRef = useRef(null);
    const groundRef = useRef(null);
    const newsSectionRef = useRef(null);

    // Animation Frame & State Refs
    const rafRef = useRef(null);
    const rotationRef = useRef(0);
    const isPausedRef = useRef(false);
    const isTweeningRef = useRef(false);
    const resumeTimerRef = useRef(null);
    const tweenStateRef = useRef({ start: 0, from: 0, to: 0, duration: 600, callback: null });

    const stripHtml = (html = '') => html.replace(/<[^>]*>/g, '').trim();
    const normalizeImagePath = (value) => {
        if (!value) return 'https://placehold.co/600x400/1e3a8a/ffffff?text=No+Image';
        if (/^https?:\/\//i.test(value) || value.startsWith('data:')) return value;
        return '/' + value.replace(/^\/+/, '');
    };
    const formatDate = (value) => {
        if (!value) return 'Recently';
        const date = new Date(value);
        if (Number.isNaN(date.getTime())) return value;
        return new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric', year: 'numeric' }).format(date);
    };

    useEffect(() => {
        document.title = "Technical Skills & Technology Institute - City College of Cagayan de Oro";

        let isMounted = true;
        fetch('/api/news?department=tsti')
            .then((response) => {
                if (!response.ok) throw new Error('Failed to fetch TSTI news');
                return response.json();
            })
            .then((data) => {
                if (isMounted) {
                    setTstiNews(Array.isArray(data) ? data : []);
                }
            })
            .catch(() => {
                if (isMounted) setTstiNews([]);
            })
            .finally(() => {
                if (isMounted) setIsLoadingNews(false);
            });

        return () => { isMounted = false; };
    }, []);

    useEffect(() => {
        const el = newsSectionRef.current;
        if (!el) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsNewsVisible(entry.isIntersecting || entry.intersectionRatio > 0);
            },
            { threshold: 0.2, rootMargin: '0px 0px -10% 0px' }
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    // --- News Items ---
    const newsItems = Array.isArray(tstiNews) && tstiNews.length > 0 ? tstiNews.slice(0, 6).map((item, index) => ({
        id: item.id || `tsti-article-${index}`,
        date: formatDate(item.date),
        title: item.title || 'TSTI News',
        excerpt: stripHtml(item.content || 'The latest update from the Technical Skills & Technology Institute.'),
        category: item.category || 'Technical Skills',
        department: item.department || 'TSTI',
        image: normalizeImagePath(item.image_path || item.image || item.image_url),
        alt: item.title || 'TSTI News',
        link: `/news/${item.id}`,
        sdgNumbers: Array.isArray(item.sdg_numbers) ? item.sdg_numbers : (item.sdg_numbers ? String(item.sdg_numbers).split(',').map(Number).filter(n => !isNaN(n)) : []),
    })) : [
        { id: 'tsti-1', date: 'March 18, 2025', title: 'Placeholder News Title', excerpt: 'Placeholder excerpt for the Technical Skills & Technology Institute news section.', category: 'Technical Skills', image: 'https://placehold.co/600x400/1a237e/ffffff?text=TSTI+News', link: '#', sdgNumbers: [4, 9] },
        { id: 'tsti-2', date: 'March 10, 2025', title: 'Placeholder News Title', excerpt: 'Placeholder excerpt for the Technical Skills & Technology Institute news section.', category: 'Technology', image: 'https://placehold.co/600x400/0d47a1/ffffff?text=TSTI+News', link: '#', sdgNumbers: [8] },
        { id: 'tsti-3', date: 'February 28, 2025', title: 'Placeholder News Title', excerpt: 'Placeholder excerpt for the Technical Skills & Technology Institute news section.', category: 'Innovation', image: 'https://placehold.co/600x400/1565c0/ffffff?text=TSTI+News', link: '#', sdgNumbers: [4, 9] },
        { id: 'tsti-4', date: 'February 15, 2025', title: 'Placeholder News Title', excerpt: 'Placeholder excerpt for the Technical Skills & Technology Institute news section.', category: 'Training', image: 'https://placehold.co/600x400/1a237e/ffffff?text=TSTI+News', link: '#', sdgNumbers: [4] },
        { id: 'tsti-5', date: 'January 30, 2025', title: 'Placeholder News Title', excerpt: 'Placeholder excerpt for the Technical Skills & Technology Institute news section.', category: 'Community', image: 'https://placehold.co/600x400/0d47a1/ffffff?text=TSTI+News', link: '#', sdgNumbers: [1, 8] }
    ];

    // 3D Carousel Auto-Spin + Next/Prev Logic
    useEffect(() => {
        if (!isNewsVisible || isLoadingNews || newsItems.length === 0) return;

        const odrag = dragRef.current;
        const ospin = spinRef.current;
        const ground = groundRef.current;
        if (!odrag || !ospin || !ground) return;

        const radius = 280;
        const imgWidth = 220;
        const imgHeight = 320;

        const aEle = Array.from(ospin.children);
        ospin.style.width = imgWidth + "px";
        ospin.style.height = imgHeight + "px";
        ground.style.width = radius * 3 + "px";
        ground.style.height = radius * 3 + "px";

        for (let i = 0; i < aEle.length; i++) {
            aEle[i].style.transform = `rotateY(${i * (360 / aEle.length)}deg) translateZ(${radius}px)`;
            aEle[i].style.transition = "transform 1s";
            aEle[i].style.transitionDelay = ((aEle.length - i) / 4) + "s";
        }

        odrag.style.transform = "rotateX(-10deg)";

        const animate = (now) => {
            if (isTweeningRef.current) {
                let { start, from, to, duration, callback } = tweenStateRef.current;
                let elapsed = now - start;
                let t = Math.min(elapsed / duration, 1);
                t = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

                rotationRef.current = from + (to - from) * t;

                if (elapsed >= duration) {
                    isTweeningRef.current = false;
                    if (callback) callback();
                }
            } else if (!isPausedRef.current) {
                rotationRef.current -= 0.15;
            }

            if (spinRef.current) {
                spinRef.current.style.transform = `rotateY(${rotationRef.current}deg)`;
            }
            rafRef.current = requestAnimationFrame(animate);
        };

        rafRef.current = requestAnimationFrame(animate);

        return () => {
            cancelAnimationFrame(rafRef.current);
            if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
        };
    }, [isLoadingNews, isNewsVisible, newsItems]);

    const startTween = (to, duration, callback) => {
        isTweeningRef.current = true;
        tweenStateRef.current = {
            start: performance.now(),
            from: rotationRef.current,
            to: to,
            duration: duration,
            callback: callback
        };
    };

    const handleNext = () => {
        if (isTweeningRef.current || newsItems.length === 0) return;
        if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
        isPausedRef.current = true;

        const anglePerItem = 360 / newsItems.length;
        let currentFrontIndex = Math.round(-rotationRef.current / anglePerItem);
        let targetIndex = currentFrontIndex + 1;
        let targetRot = -targetIndex * anglePerItem;

        startTween(targetRot, 600, () => {
            resumeTimerRef.current = setTimeout(() => { isPausedRef.current = false; }, 2500);
        });
    };

    const handlePrev = () => {
        if (isTweeningRef.current || newsItems.length === 0) return;
        if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
        isPausedRef.current = true;

        const anglePerItem = 360 / newsItems.length;
        let currentFrontIndex = Math.round(-rotationRef.current / anglePerItem);
        let targetIndex = currentFrontIndex - 1;
        let targetRot = -targetIndex * anglePerItem;

        startTween(targetRot, 600, () => {
            resumeTimerRef.current = setTimeout(() => { isPausedRef.current = false; }, 2500);
        });
    };

    const getCurrentFrontIndex = () => {
        if (!newsItems.length) return 0;
        const anglePerItem = 360 / newsItems.length;
        const normalized = ((-rotationRef.current % 360) + 360) % 360;
        return Math.round(normalized / anglePerItem) % newsItems.length;
    };

    const handleCardMouseEnter = (index) => {
        if (index !== getCurrentFrontIndex()) return;
        isPausedRef.current = true;
        if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    };

    const handleCardMouseLeave = () => {
        if (!isTweeningRef.current) {
            isPausedRef.current = false;
        }
    };

    // ============================================================
    // TRAINERS DATA — grouped by SECTOR, each trainer lists the
    // qualification(s) they hold for that sector.
    //
    // A trainer with multiple qualifications appears in EACH
    // relevant sector tab. The `qualifications` array (or single
    // `qualification` string) is what gets displayed under the
    // trainer's name inside that tab.
    // ============================================================
    const trainersBySector = [
        {
            sector: "Construction Sector",
            shortLabel: "Construction",
            trainers: [
                {
                    name: "Romulo P. Araña",
                    image: romuloAranaImg,
                    qualification: "Trainer, EIM NCII",
                },
                {
                    name: "Ariel Dablio",
                    image: arielDablioImg,
                    qualification: "Trainer, EIM NCII",
                },
                {
                    name: "Jun Junrie A. Fuentes",
                    image: junFuentesImg,
                    qualification: "Trainer, SMAW NCI & NCII",
                },
                {
                    name: "Brian M. Largo",
                    image: brianLargoImg,
                    qualification: "Trainer, SMAW NCI & NCII (CBT & MTP)",
                },
                {
                    // Iriel is dual-qualified: appears here for Carpentry, and again under Plumbing below
                    name: "Iriel P. Ansay, MPA",
                    image: irielAnsayImg,
                    qualification: "Trainer, Carpentry NCII",
                },
                {
                    // NEW TRAINER — Mr. Elnard R. Castillon (multi-qualified)
                    name: "Mr. Elnard R. Castillon",
                    image: elnardCastillonImg,
                    qualifications: [
                        "Trainer, Carpentry NCII",
                        "Trainer, SMAW NCI & NCII",
                        "Trainer, Construction Painting NCII",
                    ],
                },
            ],
        },
        {
            // Separate tab for Plumbing since Iriel handles both Carpentry AND Plumbing
            sector: "Plumbing",
            shortLabel: "Plumbing",
            trainers: [
                {
                    name: "Iriel P. Ansay, MPA",
                    image: irielAnsayImg,
                    qualification: "Trainer, Plumbing NCI & NCII",
                },
            ],
        },
        {
            // Separate tab for Construction Painting — Elnard is the assigned trainer
            sector: "Construction Painting",
            shortLabel: "Construction Painting",
            trainers: [
                {
                    name: "Mr. Elnard R. Castillon",
                    image: elnardCastillonImg,
                    qualification: "Trainer, Construction Painting NCII",
                },
            ],
        },
        {
            sector: "Tourism Sector",
            shortLabel: "Tourism",
            trainers: [
                {
                    name: "Gay Marie C. Hawinay, LPT",
                    image: gayMarieHawinayImg,
                    qualification: "Trainer, Housekeeping NCII & NCIII",
                },
                {
                    name: "Omiya O. Linog, LPT",
                    image: omiyaLinogImg,
                    qualification: "Trainer, Housekeeping NCII",
                },
                {
                    name: "Gemma E. Gonzales",
                    image: gemmaGonzalesImg,
                    qualification: "Trainer, Housekeeping NCII (CBT)",
                },
                           {
                    name: "Rica Mae L. Omictin",
                    image: ricaOmictinImg,
                    qualification: "Trainer, Events Management Services NCIII",
                },
            ],
        },
        {
            sector: "Human Health / Health Care Sector",
            shortLabel: "Health Care",
            trainers: [
                {
                    name: "Charlotte Y. Cansino, RN, MN, MPA",
                    image: charlotteCansinoImg,
                    qualification: "Trainer, Barangay Health Services NCII",
                },
            ],
        },
        {
            // Tab dedicated to Bookkeeping — Rica Mae is dual-qualified
            sector: "Health, Social, and Other Community Development Services Sector",
            shortLabel: "Health, Social, and Other...",
            trainers: [
                {
                    name: "Rica Mae L. Omictin",
                    image: ricaOmictinImg,
                    qualification: "Trainer, Bookkeeping NCIII",
                },
            ],
        },
        {
            sector: "Trainer's Methodology",
            shortLabel: "Trainer's Methodology",
            trainers: [
                {
                    name: "Valcyrus A. Madarieta",
                    image: valcyrusMadarietaImg,
                    qualification: "Trainer, Trainer's Methodology I",
                },
            ],
        },
    ];

   // --- Programs (aligned with trainer specializations) ---
const programs = [
    {
        name: "Electrical Installation & Maintenance (EIM) NC II",
        degree: "Construction Sector",
        desc: "This program equips learners with the competencies to install, maintain, and troubleshoot electrical wiring systems, fixtures, and equipment in residential, commercial, and industrial settings in accordance with the Philippine Electrical Code and TESDA standards.",
        tags: ["Electrical Wiring", "Troubleshooting", "PEC Compliance", "Safety Practices"],
        careers: ["Electrical Technician", "Maintenance Electrician", "Wiring Installer", "Building Maintenance Staff"],
        trainers: ["Romulo P. Araña", "Ariel Dablio"],
    },
    {
        name: "Shielded Metal Arc Welding (SMAW) NC I & NC II",
        degree: "Construction Sector",
        desc: "A hands-on welding program covering arc welding techniques on carbon steel plates and pipes, weld inspection, and safety procedures. Learners are trained for both community-based and institution-based delivery, including the Mobile Training Program (MTP).",
        tags: ["Arc Welding", "Carbon Steel", "Weld Inspection", "MTP & Community-Based"],
        careers: ["Welder / Fabricator", "Structural Welder", "Pipe Welder", "Welding Inspector"],
        trainers: ["Jun Junrie A. Fuentes", "Brian M. Largo", "Mr. Elnard R. Castillon"],
    },
    {
        name: "Carpentry NC II",
        degree: "Construction Sector",
        desc: "This program trains learners in layout, cutting, assembling, and installing wooden structures and fixtures using hand and power tools, following occupational health and safety standards for construction sites.",
        tags: ["Wood Framing", "Layout & Cutting", "Formworks", "Power Tools"],
        careers: ["Carpenter", "Formwork Builder", "Furniture Maker", "Construction Worker"],
        trainers: ["Iriel P. Ansay, MPA", "Mr. Elnard R. Castillon"],
    },
    {
        name: "Plumbing NC I & NC II",
        degree: "Plumbing",
        desc: "Covers the installation, repair, and maintenance of water supply, drainage, and venting systems for residential and commercial buildings, including pipe fitting, fixtures installation, and leak testing.",
        tags: ["Pipe Fitting", "Water Supply", "Drainage Systems", "Fixture Installation"],
        careers: ["Plumber", "Pipefitter", "Sanitary Installer", "Maintenance Plumber"],
        trainers: ["Iriel P. Ansay, MPA"],
    },
    {
        name: "Construction Painting NC II",
        degree: "Construction Painting",
        desc: "This program trains learners in surface preparation, paint mixing, and the application of decorative and protective coatings on interior and exterior building surfaces. It covers the proper use of brushes, rollers, and spray equipment, along with safety and quality standards for construction painting works.",
        tags: ["Surface Preparation", "Paint Application", "Coating Systems", "Safety Practices"],
        careers: ["Construction Painter", "Painting Contractor", "Building Finisher", "Maintenance Painter"],
        trainers: ["Mr. Elnard R. Castillon"],
    },
    {
        name: "Housekeeping NC II & NC III",
        degree: "Tourism Sector",
        desc: "A tourism-sector program that develops skills in guest room preparation, cleaning, laundry operations, and guest relations. Graduates are equipped for employment in hotels, resorts, and other hospitality establishments. Offered through both institution-based and community-based (CBT) delivery modes.",
        tags: ["Guest Room Prep", "Laundry Operations", "Guest Relations", "CBT & Community-Based"],
        careers: ["Room Attendant", "Housekeeping Staff", "Laundry Attendant", "Public Area Cleaner"],
        trainers: ["Gay Marie C. Hawinay, LPT", "Omiya O. Linog, LPT", "Gemma E. Gonzales"],
    },
    {
        name: "Barangay Health Services NC II",
        degree: "Human Health / Health Care Sector",
        desc: "This program prepares learners to deliver basic health care services at the barangay level, including health promotion, disease prevention, maternal and child care, and first aid. Graduates are equipped to serve as barangay health workers and community health aides in partnership with local government units and rural health units.",
        tags: ["Community Health", "Maternal & Child Care", "First Aid", "Health Promotion"],
        careers: ["Barangay Health Worker", "Community Health Aide", "Rural Health Unit Staff", "Health Program Assistant"],
        trainers: ["Charlotte Y. Cansino, RN, MN, MPA"],
    },
    {
        name: "Events Management Services NC III",
        degree: "Tourism Sector",
        desc: "This program equips learners with the competencies to plan, organize, and coordinate events such as conferences, weddings, corporate gatherings, and community activities. It covers client relations, budgeting, logistics, supplier coordination, and on-site event execution following TESDA's Events Management Services NC III standards.",
        tags: ["Event Planning", "Client Relations", "Logistics & Coordination", "Budgeting"],
        careers: ["Events Coordinator", "Events Assistant", "Conference Organizer", "Banquet Staff"],
        trainers: ["Rica Mae L. Omictin"],
    },
    {
        name: "Bookkeeping NC III",
        degree: "Health, Social, and Other Community Development Services Sector",
        desc: "This program equips learners with the knowledge and skills to record financial transactions, prepare reports, and maintain books of accounts for small businesses, following the Philippine Financial Reporting Standards (PFRS) for micro and small enterprises. Graduates are prepared for TESDA's Bookkeeping NC III assessment.",
        tags: ["Financial Recording", "Book of Accounts", "Financial Reports", "PFRS Compliance"],
        careers: ["Bookkeeper", "Accounting Clerk", "Accounts Receivable/Payable Staff", "Small Business Bookkeeper"],
        trainers: ["Rica Mae L. Omictin"],
    },
    {
        name: "Trainer's Methodology Level I",
        degree: "Trainer's Methodology",
        desc: "This program equips aspiring and practicing TVET trainers with the competencies to plan and prepare training sessions, facilitate learning, maintain training facilities, and assess learner progress. It is a prerequisite qualification for anyone who wants to become a nationally certified TVET trainer under TESDA's Philippine TVET Trainers Qualifications Framework.",
        tags: ["Training Delivery", "Session Planning", "Competency Assessment", "TVET Standards"],
        careers: ["TVET Trainer", "Training Coordinator", "Skills Assessor", "In-Company Instructor"],
        trainers: ["Valcyrus A. Madarieta"],
    },
];

    const activeSectorData = trainersBySector[activeSector];

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

                /* Hide scrollbar for tab strip */
                .no-scrollbar::-webkit-scrollbar { display: none; }
                .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
                
                #drag-container, #spin-container {
                  position: relative;
                  display: flex;
                  margin: auto;
                  transform-style: preserve-3d;
                  transform: rotateX(-10deg);
                }
                #drag-container .cbm-3d-card {
                  transform-style: preserve-3d;
                  position: absolute;
                  left: 0;
                  top: 0;
                  width: 100%;
                  height: 100%;
                  border-radius: 12px;
                  overflow: hidden;
                  box-shadow: 0 0 15px rgba(255,255,255,0.2);
                  -webkit-box-reflect: below 10px linear-gradient(transparent, transparent, #0005);
                  background: #111;
                  text-decoration: none;
                }
                #drag-container .cbm-3d-card img {
                  width: 100%;
                  height: 100%;
                  object-fit: cover;
                  transition: transform 0.5s ease;
                }
                .cbm-3d-overlay {
                  position: absolute;
                  bottom: 0;
                  left: 0;
                  right: 0;
                  padding: 24px 20px 20px;
                  background: linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.7) 50%, transparent 100%);
                  color: white;
                  pointer-events: none;
                  text-align: left;
                }
                .cbm-3d-date { font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: #34d399; font-weight: 700; display: block; margin-bottom: 8px; }
                .cbm-3d-title {
                  font-size: 18px;
                  font-weight: 700;
                  margin: 0 0 8px;
                  line-height: 1.2;
                  min-height: 2.4em;
                  display: -webkit-box;
                  -webkit-line-clamp: 2;
                  -webkit-box-orient: vertical;
                  overflow: hidden;
                  font-family: 'Fraunces', serif;
                }
                .cbm-3d-excerpt {
                  font-size: 13px;
                  opacity: 0.85;
                  line-height: 1.4;
                  min-height: 4.2em;
                  display: -webkit-box;
                  -webkit-line-clamp: 3;
                  -webkit-box-orient: vertical;
                  overflow: hidden;
                  margin-bottom: 12px;
                }
                
                .cbm-3d-sdg-container { display: flex; flex-wrap: wrap; gap: 6px; pointer-events: none; }
                .cbm-3d-sdg { background: rgba(52, 211, 153, 0.15); color: #34d399; border: 1px solid rgba(52, 211, 153, 0.3); padding: 4px 8px; border-radius: 4px; font-size: 10px; font-weight: 700; text-transform: uppercase; }
                
                #ground {
                  width: 900px;
                  height: 900px;
                  position: absolute;
                  top: 100%;
                  left: 50%;
                  transform: translate(-50%,-50%) rotateX(90deg);
                  background: -webkit-radial-gradient(center center, farthest-side , #9993, transparent);
                }
            `}</style>

            {/* === HERO BANNER === */}
            <div
                className="relative w-full bg-cover bg-center bg-no-repeat shadow-lg min-h-[350px] md:min-h-[450px] lg:min-h-[550px] flex items-center justify-center"
                style={{
                    backgroundImage: imageError ? 'none' : `url(${cedBanner})`,
                    backgroundColor: imageError ? '#1a365d' : 'transparent',
                    backgroundPosition: 'center 18%',
                    backgroundSize: 'cover',
                }}
            >
                {imageError && (
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-900 to-blue-700"></div>
                )}
                <div className="absolute inset-0 bg-black/50"></div>

                <motion.div
                    className="relative z-10 mx-auto max-w-5xl px-6 text-center"
                    initial="hidden"
                    animate="visible"
                    variants={{ visible: { transition: { staggerChildren: 0.2 } } }}
                >
                    <motion.h1
                        variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}
                        className="text-4xl font-bold tracking-tight text-white drop-shadow-md sm:text-5xl md:text-6xl vp-serif"
                    >
                        Technical Skills & Technology Institute
                    </motion.h1>

                    <motion.p
                        variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}
                        className="mx-auto mt-4 max-w-2xl text-lg text-white/90 drop-shadow-md"
                    >
                        Building practical skills, technology-driven opportunities, and future-ready pathways for learners.
                    </motion.p>
                </motion.div>

                <img
                    src={cedBanner}
                    alt=""
                    className="hidden"
                    onError={() => setImageError(true)}
                    onLoad={() => setImageError(false)}
                />
            </div>

            {/* === MAIN CONTENT BODY === */}
            <div className="relative bg-slate-50 overflow-hidden">

                {/* === VOCATIONAL SCHOOL ADMINISTRATOR SECTION === */}
                <section className="relative max-w-7xl mx-auto px-6 py-20 md:py-28">
                    <div className="grid md:grid-cols-12 gap-8 md:gap-12 items-start">

                        <motion.div
                            className="md:col-span-5 relative flex flex-col items-center"
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <div className="relative w-full max-w-sm mx-auto pb-8">
                                <div className="relative z-10 rounded-xl p-2 bg-white border border-slate-100 shadow-2xl">
                                    <div className="overflow-hidden rounded-lg w-full aspect-[4/5] bg-slate-100 flex items-center justify-center">
                                        <img
                                            src={karlImg}
                                            alt="Karl Hein M. Pios, LPT"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                </div>

                                <div className="absolute inset-0 z-0 rounded-2xl translate-x-2 translate-y-2 border-2 border-amber-400"></div>

                                <div
                                    className="absolute left-1/2 bottom-0 -translate-x-1/2 z-20 w-20 h-20 rounded-full bg-white shadow-md flex items-center justify-center p-2 transition-transform duration-300 hover:scale-105 border-2 border-emerald-700"
                                >
                                    <img
                                        src={ccdologo}
                                        alt="City College of Cagayan de Oro Logo"
                                        className="w-full h-full object-contain"
                                    />
                                </div>
                            </div>

                            <div className="text-center mt-8 w-full max-w-xs mx-auto">
                                <h3 className="text-2xl vp-serif font-semibold tracking-tight text-slate-800">
                                    Karl Hein M. Pios
                                </h3>
                                <p className="mt-2 text-[12px] font-bold tracking-wider uppercase text-emerald-700">
                                    Vocational School Administrator
                                </p>
                                <p className="mt-1 text-sm text-slate-400 font-medium">Licensed Professional Teacher</p>
                                <div className="mt-5 pt-4 flex items-center justify-center gap-2 text-xs text-slate-500 border-t border-slate-200">
                                    <svg className="w-4 h-4 flex-shrink-0 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                                    </svg>
                                    <span>City College of Cagayan de Oro</span>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* === VISION & MISSION === */}
                <section className="relative py-16 md:py-24 bg-emerald-800 text-white overflow-hidden">
                    <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] bg-amber-400/10 rounded-full blur-[120px]"></div>

                    <div className="relative max-w-3xl mx-auto px-6 text-center">
                        <div className="inline-flex p-1 bg-white/10 border border-white/20 rounded-full backdrop-blur-sm mb-8">
                            <button
                                onClick={() => setActiveVMO('vision')}
                                className={`relative px-6 py-2 text-sm font-semibold rounded-full transition-colors duration-300 ${activeVMO === 'vision' ? 'text-slate-900' : 'text-white/80 hover:text-white'}`}
                            >
                                {activeVMO === 'vision' && (
                                    <motion.span layoutId="vmoPill" className="absolute inset-0 bg-amber-400 rounded-full -z-0"></motion.span>
                                )}
                                <span className="relative z-10">Vision</span>
                            </button>
                            <button
                                onClick={() => setActiveVMO('mission')}
                                className={`relative px-6 py-2 text-sm font-semibold rounded-full transition-colors duration-300 ${activeVMO === 'mission' ? 'text-slate-900' : 'text-white/80 hover:text-white'}`}
                            >
                                {activeVMO === 'mission' && (
                                    <motion.span layoutId="vmoPill" className="absolute inset-0 bg-amber-400 rounded-full -z-0"></motion.span>
                                )}
                                <span className="relative z-10">Mission</span>
                            </button>
                        </div>
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeVMO}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.5, ease: "easeInOut" }}
                                className="relative"
                            >
                                <svg className="w-10 h-10 mx-auto text-amber-300 mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 8.689c0-.864.933-1.405 1.683-.977l7.108 4.062a1.125 1.125 0 010 1.953l-7.108 4.062A1.125 1.125 0 013 16.81V8.69zM12.336 8.689c0-.864.933-1.405 1.683-.977l7.108 4.062a1.125 1.125 0 010 1.953l-7.108 4.062a1.125 1.125 0 01-1.683-.977V8.69z" />
                                </svg>
                                <p className="text-xl md:text-2xl text-white/95 leading-relaxed vp-serif font-medium">
                                    Under Development
                                </p>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </section>

                {/* === TRAINERS SECTION (WITH SECTOR TABS) === */}
                <section
                    className="relative overflow-hidden py-20 md:py-28"
                    style={{ backgroundColor: PANEL, borderTop: `1px solid ${HAIRLINE}`, borderBottom: `1px solid ${HAIRLINE}` }}
                >
                    <div className="relative max-w-7xl mx-auto px-6">
                        <div className="text-center mb-12">
                            <Kicker textClass="text-blue-600" ruleClass="bg-blue-600" align="center">Our Trainers</Kicker>
                            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mt-1 vp-serif">
                                <MaskedText text="Trainers" />
                            </h2>
                        </div>

                        {/* === SECTOR TABS === */}
                        <div className="mb-14">
                            <div className="flex justify-center">
                                <div className="no-scrollbar flex gap-2 overflow-x-auto p-1.5 bg-white/60 backdrop-blur-md border border-white/80 rounded-full shadow-lg max-w-full">
                                    {trainersBySector.map((group, idx) => (
                                        <button
                                            key={group.sector}
                                            onClick={() => setActiveSector(idx)}
                                            className={`relative px-4 sm:px-5 py-2.5 text-xs sm:text-sm font-semibold rounded-full whitespace-nowrap transition-colors duration-300 ${activeSector === idx ? 'text-white' : 'text-slate-600 hover:text-emerald-700'}`}
                                        >
                                            {activeSector === idx && (
                                                <motion.span
                                                    layoutId="sectorTabPill"
                                                    className="absolute inset-0 bg-emerald-700 rounded-full shadow-md shadow-emerald-500/30"
                                                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                                                />
                                            )}
                                            <span className="relative z-10">{group.shortLabel}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* === ACTIVE SECTOR CONTENT === */}
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeSector}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.4, ease: 'easeInOut' }}
                            >
                                {/* Sector header */}
                                <div className="flex items-center gap-4 mb-10">
                                    <span className="w-8 h-px bg-emerald-600" />
                                    <h3 className="text-xl md:text-2xl font-bold text-slate-800 vp-serif tracking-tight">
                                        {activeSectorData.sector}
                                    </h3>
                                    <span className="flex-1 h-px bg-slate-200" />
                                    <span className="text-xs font-semibold text-emerald-600 uppercase tracking-wider">
                                        {activeSectorData.trainers.length} {activeSectorData.trainers.length === 1 ? 'Trainer' : 'Trainers'}
                                    </span>
                                </div>

                                {/* Trainer grid for the active sector */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 justify-items-center">
                                    {activeSectorData.trainers.map((trainer, idx) => (
                                        <TrainerCard
                                            key={`${activeSector}-${trainer.name}-${idx}`}
                                            trainer={trainer}
                                            idx={idx}
                                            qualification={trainer.qualification}
                                            qualifications={trainer.qualifications}
                                        />
                                    ))}
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </section>

                {/* === CURRICULUM === */}
                <section
                    className="relative pt-24 pb-12 md:pt-32 md:pb-16 overflow-hidden bg-cover bg-no-repeat"
                    style={{
                        backgroundImage: `url(${acad_bg})`,
                        backgroundColor: PANEL,
                        borderTop: `1px solid ${HAIRLINE}`,
                        borderBottom: `1px solid ${HAIRLINE}`,
                        backgroundPosition: 'center top',
                        backgroundSize: '100% auto',
                        backgroundAttachment: 'scroll',
                        backgroundRepeat: 'no-repeat',
                    }}
                >
                    <div className="relative max-w-7xl mx-auto px-6 z-10">
                        <div className="text-center mb-16">
                            <Kicker textClass="text-amber-600" ruleClass="bg-amber-500" align="center">Qualifications</Kicker>
                            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mt-1 vp-serif drop-shadow-[0_2px_5px_rgba(255,255,255,0.8)]">
                                <MaskedText text="Courses Offered" />
                            </h2>
                        </div>

                        <div className="grid md:grid-cols-12 gap-8 md:gap-12 items-center">

                            <div className="md:col-span-5 space-y-4 relative p-4 md:p-6 rounded-2xl bg-white/40 backdrop-blur-md border border-white/60 shadow-lg">
                                {programs.map((prog, idx) => (
                                    <motion.button
                                        key={idx}
                                        onClick={() => setActiveProg(idx)}
                                        className={`w-full text-left p-6 rounded-2xl border-[1px] transition-[background-color,border-color,color,box-shadow] duration-200 relative overflow-hidden group ${activeProg === idx
                                                ? 'bg-emerald-700 text-white border-amber-400 shadow-md shadow-emerald-500/10'
                                                : 'bg-white text-slate-800 border-slate-100 hover:border-emerald-200 hover:shadow-sm'
                                            }`}
                                    >
                                        <div className="flex items-center gap-6 relative z-10">
                                            <div>
                                                <p className={`text-xs font-bold uppercase tracking-wider mb-1 ${activeProg === idx ? 'text-white/80' : 'text-amber-500'}`}>
                                                    {prog.degree}
                                                </p>
                                                <h3 className="text-lg font-bold vp-serif leading-snug">
                                                    {prog.name}
                                                </h3>
                                            </div>
                                        </div>
                                        {activeProg === idx && (
                                            <motion.div
                                                layoutId="progHighlight"
                                                className="absolute right-0 top-0 h-full w-1.5 bg-amber-400"
                                            />
                                        )}
                                    </motion.button>
                                ))}
                            </div>

                            <div className="md:col-span-7 relative min-h-[400px]">
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={activeProg}
                                        initial={{ opacity: 0, y: 30 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -30 }}
                                        transition={{ duration: 0.5, ease: "easeInOut" }}
                                        className="relative p-8 md:p-10 bg-white rounded-[2rem] border border-emerald-100 shadow-2xl shadow-emerald-500/10 overflow-hidden"
                                    >
                                        <div className="relative z-10">
                                            <p className="text-sm text-amber-500 font-bold uppercase tracking-wider mb-2">
                                                {programs[activeProg]?.degree || 'Program Overview'}
                                            </p>
                                            <h3 className="text-2xl md:text-3xl font-bold vp-serif text-slate-900 mb-6">
                                                {programs[activeProg]?.name}
                                            </h3>
                                            <p className="text-slate-600 leading-relaxed mb-8 text-[15px]">
                                                {programs[activeProg]?.desc}
                                            </p>

                                            <div className="mb-8">
                                                <p className="text-xs uppercase tracking-wider text-slate-400 mb-3 font-semibold">Curriculum Focus</p>
                                                <div className="flex flex-wrap gap-2">
                                                    {(programs[activeProg]?.tags || []).map((tag, i) => (
                                                        <span key={i} className="px-3 py-1.5 bg-white border border-[#086618]/30 text-[#086618] rounded-full text-xs font-medium">
                                                            {tag}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>

                                            <div className="pt-6 border-t border-slate-100">
                                                <p className="text-xs uppercase tracking-wider text-slate-400 mb-4 font-semibold">Career Paths</p>
                                                <div className="grid grid-cols-2 gap-4">
                                                    {(programs[activeProg]?.careers || []).map((career, i) => (
                                                        <div key={i} className="flex items-center gap-2 text-sm text-slate-600 font-medium">
                                                            <svg className="w-4 h-4 text-emerald-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                            </svg>
                                                            {career}
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                </AnimatePresence>
                            </div>
                        </div>
                    </div>
                </section>

                {/* =================================================== */}
                {/* === NEWS & ANNOUNCEMENTS (3D Auto-Spin Carousel) === */}
                {/* =================================================== */}
                <section ref={newsSectionRef} className="news-section bg-slate-900 pt-6 md:pt-8 pb-16 overflow-hidden">
                    <div className="news-container max-w-7xl mx-auto px-6">
                        <div className="news-header text-center mb-12">
                            <span className="features-eyebrow text-emerald-400">Stay Informed</span>
                            <h2 className="news-title text-4xl font-bold text-white mt-2 vp-serif">
                                Latest <span className="text-emerald-400">News</span> & <span className="text-emerald-400">Updates</span>
                            </h2>
                            <div className="news-title-underline mx-auto mt-4 h-1 w-20 bg-amber-400 rounded-full"></div>
                        </div>

                        {isLoadingNews ? (
                            <div className="news-empty-message text-center text-slate-400 py-20">
                                Loading TSTI news...
                            </div>
                        ) : newsItems.length > 0 ? (
                            <div className="flex flex-col items-center justify-center">
                                <motion.div
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, amount: 0.3 }}
                                    transition={{ duration: 0.7, ease: 'easeOut' }}
                                    className="relative w-full"
                                    style={{ height: '620px', perspective: '1000px', marginBottom: '40px', paddingTop: '24px' }}
                                >
                                    <div id="drag-container" ref={dragRef} style={{ position: 'relative', height: '100%', transformStyle: 'preserve-3d', top: '10px' }}>
                                        <div id="spin-container" ref={spinRef} style={{ margin: '0 auto', width: '220px', height: '320px', position: 'relative', transformStyle: 'preserve-3d', top: '8px' }}>
                                            {newsItems.map((item, index) => (
                                                <a
                                                    href={item.link}
                                                    key={item.id}
                                                    className="cbm-3d-card"
                                                    style={{ textDecoration: 'none', width: '100%', height: '100%', position: 'absolute' }}
                                                    onMouseEnter={() => handleCardMouseEnter(index)}
                                                    onMouseLeave={handleCardMouseLeave}
                                                >
                                                    <img src={item.image} alt={item.alt} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                                    <div className="cbm-3d-overlay">
                                                        <span className="cbm-3d-date">{item.date} • {item.category}</span>
                                                        <h3 className="cbm-3d-title">{item.title}</h3>
                                                        <p className="cbm-3d-excerpt">
                                                            {item.excerpt.length > 90 ? item.excerpt.substring(0, 90) + '...' : item.excerpt}
                                                        </p>
                                                        {item.sdgNumbers && item.sdgNumbers.length > 0 && (
                                                            <div className="cbm-3d-sdg-container">
                                                                {item.sdgNumbers.map(num => (
                                                                    <span key={num} className="cbm-3d-sdg">SDG {num}</span>
                                                                ))}
                                                            </div>
                                                        )}
                                                    </div>
                                                </a>
                                            ))}
                                        </div>
                                        <div id="ground" ref={groundRef} style={{ position: 'absolute', top: '100%', left: '50%', width: '900px', height: '900px', transform: 'translate(-50%,-50%) rotateX(90deg)', background: '-webkit-radial-gradient(center center, farthest-side , #9993, transparent)' }}></div>
                                    </div>

                                    <button
                                        onClick={handlePrev}
                                        className="absolute left-4 md:left-12 top-40 z-50 w-12 h-12 rounded-full bg-white/10 hover:bg-emerald-500 border border-white/30 backdrop-blur-md flex items-center justify-center text-white transition-all duration-300 group"
                                        aria-label="Previous News"
                                    >
                                        <svg className="w-5 h-5 group-hover:scale-125 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                        </svg>
                                    </button>

                                    <button
                                        onClick={handleNext}
                                        className="absolute right-4 md:right-12 top-40 z-50 w-12 h-12 rounded-full bg-white/10 hover:bg-emerald-500 border border-white/30 backdrop-blur-md flex items-center justify-center text-white transition-all duration-300 group"
                                        aria-label="Next News"
                                    >
                                        <svg className="w-5 h-5 group-hover:scale-125 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </button>
                                </motion.div>

                                <div className="w-full pt-2 text-center">
                                    <a href="/news/latest" className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-emerald-600 text-white font-semibold hover:bg-emerald-500 transition-colors duration-300 shadow-lg shadow-emerald-500/20">
                                        View All News
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                                    </a>
                                </div>
                            </div>
                        ) : (
                            <div className="news-empty-message text-center text-slate-400 py-20">
                                No news articles are available at this time.
                            </div>
                        )}
                    </div>
                </section>

            </div>
        </MainLayout>
    );
}