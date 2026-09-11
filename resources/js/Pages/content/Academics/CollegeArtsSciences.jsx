import { useEffect, useState, useRef } from 'react';
import MainLayout from '../../../layouts/MainLayout';
import casBanner from '../../../assets/banner/cas-banner.png';
import { motion, AnimatePresence } from 'framer-motion';
import ccdologo from '../../../assets/logos/ccdologo.png';

// --- Faculty Photo & Background Imports ---
// Replace these placeholder strings with actual imports (e.g., import deanPhoto from '../../../assets/images/dean_name.jpg';)
const deanPhoto = 'https://placehold.co/600x750/e2e8f0/1e293b?text=Dean+Photo';
const facultyPlaceholder = 'https://placehold.co/400x500/e2e8f0/1e293b?text=Faculty+Photo';

// Imported exactly as it is in CBM.jsx
import acad_bg from '../../../assets/images/prog_bg.png';

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

// --- Main Component ---
export default function CollegeArtsSciences() {
    const [imageError, setImageError] = useState(false);
    const [activeVMO, setActiveVMO] = useState('vision');
    const [activeProg, setActiveProg] = useState(0);
    const [casNews, setCasNews] = useState([]);
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

    // ============================================================
    // ⚠️ PAGE VISIBILITY FLAG
    // Set this to `false` when the page content is ready to go live.
    // All original page code is preserved below — nothing was deleted.
    // ============================================================
    const COMING_SOON = true;

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
        document.title = "College of Arts and Sciences - City College of Cagayan de Oro";

        // Skip the news fetch while the page is hidden
        if (COMING_SOON) return;

        let isMounted = true;
        // Fetching specifically for College of Arts and Sciences (CAS - Upperccase to match DB)
        fetch('/api/news?department=CAS')
            .then((response) => {
                if (!response.ok) throw new Error('Failed to fetch CAS news');
                return response.json();
            })
            .then((data) => {
                if (isMounted) {
                    setCasNews(Array.isArray(data) ? data : []);
                }
            })
            .catch(() => {
                if (isMounted) setCasNews([]);
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
    const newsItems = Array.isArray(casNews) && casNews.length > 0 ? casNews.slice(0, 6).map((item, index) => ({
        id: item.id || `cas-article-${index}`,
        date: formatDate(item.date),
        title: item.title || 'CAS News',
        excerpt: stripHtml(item.content || 'The latest update from the College of Arts and Sciences.'),
        category: item.category || 'Arts & Sciences',
        department: item.department || 'CAS',
        image: normalizeImagePath(item.image_path || item.image || item.image_url),
        alt: item.title || 'CAS News',
        link: `/news/${item.id}`,
        sdgNumbers: Array.isArray(item.sdg_numbers) ? item.sdg_numbers : (item.sdg_numbers ? String(item.sdg_numbers).split(',').map(Number).filter(n => !isNaN(n)) : []),
    })) : [
        { id: 'cas-1', date: 'Coming Soon', title: 'College of Arts and Sciences News', excerpt: 'Updates and articles from the College of Arts and Sciences will be displayed here once available.', category: 'Announcement', image: 'https://placehold.co/600x400/1a237e/ffffff?text=CAS+News', link: '#', sdgNumbers: [4] },
        { id: 'cas-2', date: 'Coming Soon', title: 'Annual Science Research Symposium', excerpt: 'Students and faculty showcase innovative research projects in our annual symposium.', category: 'Event', image: 'https://placehold.co/600x400/0d47a1/ffffff?text=Research', link: '#', sdgNumbers: [4, 9] },
        { id: 'cas-3', date: 'Coming Soon', title: 'Humanities and Arts Exhibit Launch', excerpt: 'A celebration of student creativity featuring artworks, literature, and performances.', category: 'Exhibit', image: 'https://placehold.co/600x400/1565c0/ffffff?text=Arts', link: '#', sdgNumbers: [4] }
    ];

    // 3D Carousel Auto-Spin + Next/Prev Logic
    useEffect(() => {
        if (!isNewsVisible || isLoadingNews || newsItems.length === 0) return;

        const odrag = dragRef.current;
        const ospin = spinRef.current;
        const ground = groundRef.current;
        if (!odrag || !ospin || !ground) return;

        // Settings
        const radius = 280;
        const imgWidth = 220;
        const imgHeight = 320;

        const aEle = Array.from(ospin.children);
        ospin.style.width = imgWidth + "px";
        ospin.style.height = imgHeight + "px";
        ground.style.width = radius * 3 + "px";
        ground.style.height = radius * 3 + "px";

        // Position items in 3D space
        for (let i = 0; i < aEle.length; i++) {
            aEle[i].style.transform = `rotateY(${i * (360 / aEle.length)}deg) translateZ(${radius}px)`;
            aEle[i].style.transition = "transform 1s";
            aEle[i].style.transitionDelay = ((aEle.length - i) / 4) + "s";
        }

        // Set static viewing angle
        odrag.style.transform = "rotateX(-10deg)";

        const animate = (now) => {
            if (isTweeningRef.current) {
                let { start, from, to, duration, callback } = tweenStateRef.current;
                let elapsed = now - start;
                let t = Math.min(elapsed / duration, 1);
                // EaseInOutCubic
                t = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

                rotationRef.current = from + (to - from) * t;

                if (elapsed >= duration) {
                    isTweeningRef.current = false;
                    if (callback) callback();
                }
            } else if (!isPausedRef.current) {
                rotationRef.current -= 0.15; // Continuous spin speed
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

    // ============================================================
    // ⚠️ COMING SOON EARLY RETURN
    // Placed after all hooks to respect React's rules of hooks.
    // While COMING_SOON is true, the page renders the placeholder
    // below and skips everything after this block.
    // ============================================================
    if (COMING_SOON) {
        return (
            <MainLayout>
                <motion.div
                    className="flex flex-col items-center justify-center text-center px-6 py-24 md:py-32"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6 }}
                >
                    {/* Animated icon */}
                    <motion.div
                        className="mb-8 flex h-28 w-28 items-center justify-center rounded-full bg-emerald-100 border border-emerald-200 shadow-lg"
                        animate={{ y: [0, -8, 0] }}
                        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                    >
                        <span className="text-5xl">🛠️</span>
                    </motion.div>

                    <motion.h1
                        className="text-4xl md:text-5xl font-bold text-gray-800 tracking-tight"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.15, type: 'spring', stiffness: 100, damping: 15 }}
                    >
                        Coming Soon
                    </motion.h1>

                    <motion.p
                        className="mt-4 max-w-md text-lg text-gray-600"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, type: 'spring', stiffness: 100, damping: 15 }}
                    >
                        We're still developing this page. Please check back soon for updates!
                    </motion.p>

                    {/* Subtle animated progress bar */}
                    <motion.div
                        className="mt-10 h-1.5 w-40 rounded-full bg-emerald-200 overflow-hidden"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.45 }}
                    >
                        <motion.div
                            className="h-full w-1/3 rounded-full bg-emerald-500"
                            animate={{ x: ['-100%', '300%'] }}
                            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                        />
                    </motion.div>
                </motion.div>
            </MainLayout>
        );
    }

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

    // Temporary Data Arrays
    const coreValues = [
        { title: "Excellence", desc: "Coming soon...", icon: "M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 002.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-3.492a46.32 46.32 0 012.916.52 6.003 6.003 0 01-5.395 4.972m0 0a6.726 6.726 0 01-2.749 1.35m0 0a6.772 6.772 0 01-3.044 0" },
        { title: "Integrity", desc: "Coming soon...", icon: "M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" },
        { title: "Innovation", desc: "Coming soon...", icon: "M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z" },
        { title: "Adaptability", desc: "Coming soon...", icon: "M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" },
        { title: "Lifelong Learning", desc: "Coming soon...", icon: "M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" }
    ];

    const programs = [
        {
            name: "Program Name",
            degree: "Bachelor of Arts/Science",
            desc: "Coming soon. Details about the program will be updated shortly.",
            tags: ["Coming Soon", "TBD"],
            careers: ["TBD", "TBD"]
        }
    ];

    const chairpersons = [
        { name: "Faculty Name", role: "Chairperson", photo: facultyPlaceholder },
    ];

    const facultyMembers = [
        { name: "Faculty Name", role: "Faculty Member", photo: facultyPlaceholder },
        { name: "Faculty Name", role: "Faculty Member", photo: facultyPlaceholder },
        { name: "Faculty Name", role: "Faculty Member", photo: facultyPlaceholder },
        { name: "Faculty Name", role: "Faculty Member", photo: facultyPlaceholder },
    ];

    const FacultyCard = ({ member, idx }) => (
        <motion.div
            key={idx}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1, duration: 0.6 }}
            className="group flex flex-col items-center w-full max-w-[260px] mx-auto"
        >
            <div className="relative w-full">
                <div className="relative z-10 rounded-lg p-2 bg-white border border-slate-100 shadow-md transition-all duration-500 group-hover:shadow-xl">
                    <div className="overflow-hidden rounded-md w-full aspect-[4/5] bg-slate-200 border-[3px] border-slate-900/90">
                        <img
                            src={member.photo}
                            alt={member.name}
                            className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-110"
                        />
                    </div>
                </div>

                <div className="absolute inset-0 z-0 rounded-lg translate-x-2.5 translate-y-2.5 border-2 border-emerald-700/50 transition-all duration-500 group-hover:translate-x-1.5 group-hover:translate-y-1.5"></div>

                <div className="absolute top-1 left-1 w-5 h-5 border-t-2 border-l-2 border-amber-500/80 z-20 rounded-tl-md transition-all duration-500 group-hover:top-0.5 group-hover:left-0.5"></div>
                <div className="absolute bottom-1 right-1 w-5 h-5 border-b-2 border-r-2 border-amber-500/80 z-20 rounded-br-md transition-all duration-500 group-hover:bottom-0.5 group-hover:right-0.5"></div>
            </div>

            <div className="mt-8 text-center px-2">
                <h3 className="text-base font-serif font-bold text-slate-800 tracking-tight leading-tight">{member.name}</h3>
                <p className="text-[11px] text-emerald-600 font-semibold uppercase tracking-[0.1em] mt-2">{member.role}</p>
                <div className="mt-3 h-px w-12 bg-slate-200 mx-auto"></div>
            </div>
        </motion.div>
    );

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
                
                /* 3D Carousel Spin Styles */
                #drag-container, #spin-container {
                  position: relative;
                  display: flex;
                  margin: auto;
                  transform-style: preserve-3d;
                  transform: rotateX(-10deg);
                }
                #drag-container .cas-3d-card {
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
                #drag-container .cas-3d-card img {
                  width: 100%;
                  height: 100%;
                  object-fit: cover;
                  transition: transform 0.5s ease;
                }
                .cas-3d-overlay {
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
                .cas-3d-date { font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: #34d399; font-weight: 700; display: block; margin-bottom: 8px; }
                .cas-3d-title {
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
                .cas-3d-excerpt {
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
                
                .cas-3d-sdg-container { display: flex; flex-wrap: wrap; gap: 6px; pointer-events: none; }
                .cas-3d-sdg { background: rgba(52, 211, 153, 0.15); color: #34d399; border: 1px solid rgba(52, 211, 153, 0.3); padding: 4px 8px; border-radius: 4px; font-size: 10px; font-weight: 700; text-transform: uppercase; }
                
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
                    backgroundImage: imageError ? 'none' : `url(${casBanner})`,
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
                        College of Arts and Sciences
                    </motion.h1>

                    <motion.p
                        variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}
                        className="mx-auto mt-4 max-w-2xl text-lg text-white/90 drop-shadow-md"
                    >
                        Fostering critical thinking and holistic development through diverse academic disciplines.
                    </motion.p>
                </motion.div>

                <img
                    src={casBanner}
                    alt=""
                    className="hidden"
                    onError={() => setImageError(true)}
                    onLoad={() => setImageError(false)}
                />
            </div>

            {/* === MAIN CONTENT BODY === */}
            <div className="relative bg-slate-50 overflow-hidden">

                {/* === DEAN SECTION === */}
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
                                    <div className="overflow-hidden rounded-lg w-full aspect-[4/5] bg-slate-101">
                                        <img
                                            src={deanPhoto}
                                            alt="Dr. Donna Grace I. Cotejo"
                                            className="w-full h-full object-cover object-top"
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
                                    Dr. Donna Grace I. Cotejo
                                </h3>
                                <p className="mt-2 text-[12px] font-bold tracking-wider uppercase text-emerald-700">
                                    Dean, College of Arts and Sciences
                                </p>
                                <p className="mt-1 text-sm text-slate-400 font-medium">Doctor of Arts in Literature and Communication</p>
                                <div className="mt-5 pt-4 flex items-center justify-center gap-2 text-xs text-slate-500 border-t border-slate-200">
                                    <svg className="w-4 h-4 flex-shrink-0 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                                    </svg>
                                    <span>City College of Cagayan de Oro</span>
                                </div>
                            </div>
                        </motion.div>

                        <div className="md:col-span-7 md:pt-4">
                            <Kicker textClass="text-emerald-600" ruleClass="bg-emerald-600">Leadership & Excellence</Kicker>
                            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mt-1 vp-serif mb-6">
                                <MaskedText text="Bionote" />
                            </h2>

                            <motion.div
                                className="space-y-4 text-slate-600 leading-relaxed text-[15px]"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                            >
                                <p>
                                    Dr. Donna Grace I. Cotejo is a Filipino educator, academic leader, researcher, published author, and communication specialist who currently serves as Assistant Director of the Office of Curriculum and Instruction at the City College of Cagayan de Oro. She previously served as Dean of the College of Arts and Sciences and Director for Internationalization, and has held various leadership positions in higher education.
                                </p>
                                <p>
                                    A Licensed Professional Teacher, she earned her Doctor of Arts in Literature and Communication from Cebu Normal University, where she received the Best Dissertation Award, as well as master's degrees in English Language and Literature Teaching and Educational Management. Her scholarly work encompasses language, literature, communication, curriculum development, educational leadership, social inquiry, and internationalization. She has published research articles in national and international academic journals, including Scopus-indexed publications, and has presented her studies at various scholarly conferences.
                                </p>
                                <p>
                                    In recognition of her research productivity, scholarly influence, and citation record, she is listed as a World Scientist in the AD Scientific Index. She has also served as a research adviser, consultant, academic reviewer, and resource speaker, and contributed as a writer to UNESCO Japan, UNACOM Philippines, the Teacher Education Council, Times Higher Education, and the World University Rankings for Innovation. She is likewise a member of the Board of Directors of the World University Network of Innovation for Leaders for 2025–2026, reflecting her continuing commitment to research, educational excellence, responsible communication, and globally responsive institutional development.
                                </p>
                            </motion.div>

                            <motion.div
                                className="mt-6 flex flex-wrap gap-2"
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.4 }}
                            >
                                {["Doctor of Arts in Literature and Communication", "MA English Language and Literature Teaching", "MA Educational Management"].map((deg, i) => (
                                    <span key={i} className="px-3 py-1.5 bg-white border border-slate-200 rounded-full text-xs font-medium text-slate-600 shadow-sm">
                                        {deg}
                                    </span>
                                ))}
                            </motion.div>
                        </div>
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
                                    {activeVMO === 'vision' ? (
                                        "Coming soon..."
                                    ) : (
                                        "Coming soon..."
                                    )}
                                </p>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </section>

                {/* === FACULTY SECTION === */}
                <section
                    className="relative overflow-hidden py-20 md:py-28"
                    style={{ backgroundColor: PANEL, borderTop: `1px solid ${HAIRLINE}`, borderBottom: `1px solid ${HAIRLINE}` }}
                >
                    <div className="relative max-w-7xl mx-auto px-6">
                        <div className="flex flex-col sm:flex-row justify-between sm:items-end mb-16 gap-4">
                            <div>
                                <Kicker textClass="text-blue-600" ruleClass="bg-blue-600">Our Educators</Kicker>
                                <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mt-1 vp-serif">
                                    <MaskedText text="Faculty & Staff" />
                                </h2>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-20 max-w-3xl mx-auto">
                            {chairpersons.map((member, idx) => (
                                <FacultyCard key={idx} member={member} idx={idx} />
                            ))}
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                            {facultyMembers.map((member, idx) => (
                                <FacultyCard key={idx} member={member} idx={idx} />
                            ))}
                        </div>
                    </div>
                </section>

                {/* === CURRICULUM === */}
                <section
                    className="relative py-24 md:py-32 overflow-hidden bg-cover bg-no-repeat"
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
                            <Kicker textClass="text-amber-600" ruleClass="bg-amber-500" align="center">Curriculum</Kicker>
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
                                                <h3 className="text-xl font-bold vp-serif">
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
                                            <p className="text-sm text-amber-500 font-bold uppercase tracking-wider mb-2">Program Overview</p>
                                            <h3 className="text-2xl md:text-3xl font-bold vp-serif text-slate-900 mb-6">
                                                {programs[activeProg].degree} in {programs[activeProg].name}
                                            </h3>
                                            <p className="text-slate-600 leading-relaxed mb-8 text-[15px]">
                                                {programs[activeProg].desc}
                                            </p>

                                            <div className="mb-8">
                                                <p className="text-xs uppercase tracking-wider text-slate-400 mb-3 font-semibold">Curriculum Focus</p>
                                                <div className="flex flex-wrap gap-2">
                                                    {programs[activeProg].tags.map(tag => (
                                                        <span key={tag} className="px-3 py-1.5 bg-white border border-[#086618]/30 text-[#086618] rounded-full text-xs font-medium">
                                                            {tag}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>

                                            <div className="pt-6 border-t border-slate-100">
                                                <p className="text-xs uppercase tracking-wider text-slate-400 mb-4 font-semibold">Career Paths</p>
                                                <div className="grid grid-cols-2 gap-4">
                                                    {programs[activeProg].careers.map(career => (
                                                        <div key={career} className="flex items-center gap-2 text-sm text-slate-700 font-medium">
                                                            <svg className="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                <section ref={newsSectionRef} className="news-section bg-slate-900 pt-12 pb-16 overflow-hidden">
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
                                Loading CAS news...
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
                                                    className="cas-3d-card"
                                                    style={{ textDecoration: 'none', width: '100%', height: '100%', position: 'absolute' }}
                                                    onMouseEnter={() => handleCardMouseEnter(index)}
                                                    onMouseLeave={handleCardMouseLeave}
                                                >
                                                    <img src={item.image} alt={item.alt} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                                    <div className="cas-3d-overlay">
                                                        <span className="cas-3d-date">{item.date} • {item.category}</span>
                                                        <h3 className="cas-3d-title">{item.title}</h3>
                                                        <p className="cas-3d-excerpt">
                                                            {item.excerpt.length > 90 ? item.excerpt.substring(0, 90) + '...' : item.excerpt}
                                                        </p>
                                                        {item.sdgNumbers && item.sdgNumbers.length > 0 && (
                                                            <div className="cas-3d-sdg-container">
                                                                {item.sdgNumbers.map(num => (
                                                                    <span key={num} className="cas-3d-sdg">SDG {num}</span>
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
                            </div>
                        ) : (
                            <div className="news-empty-message text-center text-slate-400 py-20">
                                No CAS news available at the moment.
                            </div>
                        )}
                    </div>
                </section>

            </div>
        </MainLayout>
    );
}