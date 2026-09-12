import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import MainLayout from '../../../layouts/MainLayout';

// ---- Org photos ----
import imgCentralGov from '../../../assets/OrgPics/CentralStudentGovernment.jpg';
import imgCivic from '../../../assets/OrgPics/CIVIC.png';
import imgCAS from '../../../assets/OrgPics/CollegeofArts&Sciences.jpg';
import imgCBM from '../../../assets/OrgPics/CollegeofBusinessandManagement.jpg';
import imgCOE from '../../../assets/OrgPics/CollegeofEducation.jpg';
import imgISDA from '../../../assets/OrgPics/ISDA-CCCDO.png';
import imgOroDayaw from '../../../assets/OrgPics/OroDayaw.png';
import imgOroNexus from '../../../assets/OrgPics/OroNexus.png';
import imgPASOA from '../../../assets/OrgPics/PASOA.png';
import imgPeerFac from '../../../assets/OrgPics/PeerFaciCircle.jpg';
import imgPrayground from '../../../assets/OrgPics/Prayground.png';
import imgRedCross from '../../../assets/OrgPics/RedCrossYouthCouncil.png';
import imgSWAF from '../../../assets/OrgPics/SWAF.png';
import imgTalindaw from '../../../assets/OrgPics/TalindawChorale.png';
import imgBraveKnights from '../../../assets/OrgPics/TheBraveKnights.jpg';
import imgTukma from '../../../assets/OrgPics/TukmaFilmCircle.jpg';
import imgYES from '../../../assets/OrgPics/YES.png';
import imgSocialWork from '../../../assets/OrgPics/SocialWork.jpg';
import imgSmashers from '../../../assets/OrgPics/CCCDOSMASHERS.jpg';

// ---- Event/Activity photos ----
import imgAblaze1 from '../../../assets/Events/ablaze1.png';
import imgAblaze2 from '../../../assets/Events/ablaze2.png';
import imgAblaze3 from '../../../assets/Events/ablaze3.png';
import imgAblaze4 from '../../../assets/Events/ablaze4.png';
import imgAblaze5 from '../../../assets/Events/ablaze5.png';
// TODO: add HIUSA imports here once you confirm the filenames, e.g.:
// import imgHiusa1 from '../../../assets/Events/hiusa1.png';

const orgs = [
    { icon: 'fa-landmark', title: 'Central Student Government', image: imgCentralGov, desc: 'The representative body of the CCCDO student community, promoting student welfare, leadership, participation, and responsible representation.' },
    { icon: 'fa-book-open', title: 'College of Arts and Sciences Student Council', image: imgCAS, desc: 'Represents students in the college and fosters leadership, engagement, collaboration, and a vibrant academic community.' },
    { icon: 'fa-briefcase', title: 'College of Business and Management Student Council', image: imgCBM, desc: 'Promotes student leadership, professional development, collaboration, and active participation in college life.' },
    { icon: 'fa-chalkboard-teacher', title: 'College of Education Student Council', image: imgCOE, desc: 'Represents education students and encourages leadership, service, collaboration, and meaningful participation in campus activities.' },
    { icon: 'fa-newspaper', title: 'Oro Nexus Publication', image: imgOroNexus, desc: 'The school\u2019s official student publication that provides a platform for student voices, stories, perspectives, and creative expression.' },
    { icon: 'fa-hand-holding-heart', title: 'Red Cross Youth Council', image: imgRedCross, desc: 'Engages students in volunteerism, humanitarian service, preparedness, and activities that promote a culture of compassion and community involvement.' },
    { icon: 'fa-music', title: 'Talindaw Chorale', image: imgTalindaw, desc: 'Brings students together through choral music, developing musical expression, teamwork, discipline, and appreciation for the performing arts.' },
    { icon: 'fa-people-arrows', title: 'Peer Facilitators\u2019 Circle', image: imgPeerFac, desc: 'Promotes peer support and student development by encouraging empathy, communication, collaboration, and a culture of mutual assistance.' },
    { icon: 'fa-water', title: 'ISDA-CCCDO', image: imgISDA, desc: 'Provides students with opportunities to engage in activities that foster camaraderie, leadership, participation, and appreciation of their shared interests.' },
    { icon: 'fa-drum', title: 'Oro Dayaw Dance Ensemble', image: imgOroDayaw, desc: 'Celebrates culture and artistic expression through dance while cultivating discipline, creativity, teamwork, and pride in local heritage.' },
    { icon: 'fa-chess-knight', title: 'The Brave Knights', image: imgBraveKnights, desc: 'Brings students together through shared interests and activities that encourage camaraderie, teamwork, leadership, and active campus participation.' },
    { icon: 'fa-hands-helping', title: 'CIVIC: City College Volunteerism and Involvement Center', image: imgCivic, desc: 'Promotes volunteerism and civic engagement by providing students with opportunities to serve, participate, and contribute meaningfully to the community.' },
    { icon: 'fa-film', title: 'Tukma Film Circle', image: imgTukma, desc: 'Provides a creative space for students interested in film, storytelling, and visual media, encouraging collaboration, creativity, and critical appreciation of cinema.' },
    { icon: 'fa-file-lines', title: 'PASOA-CCCDO', image: imgPASOA, desc: 'Supports students in Office Administration through professional development, peer engagement, leadership opportunities, and activities related to their field.' },
    { icon: 'fa-lightbulb', title: 'Young Entrepreneurial Society (YES)', image: imgYES, desc: 'Encourages students to explore entrepreneurship, innovation, and business-minded thinking through learning experiences, collaboration, and practical engagement.' },
    { icon: 'fa-dumbbell', title: 'Students\u2019 Wellness & Fitness Society (SWAF)', image: imgSWAF, desc: 'Promotes student well-being through activities that encourage physical fitness, healthy habits, recreation, and a balanced campus experience.' },
    { icon: 'fa-hands-praying', title: 'Prayground', image: imgPrayground, desc: 'Provides a welcoming space for students to nurture their spiritual life, build community, and engage in activities centered on faith, reflection, and fellowship.' },
    { icon: 'fa-table-tennis-paddle-ball', title: 'CCCDO SMASHERS', image: imgSmashers, desc: 'Brings students together through badminton and sports-related activities, promoting physical fitness, teamwork, discipline, and camaraderie.' },
    { icon: 'fa-people-group', title: 'Social Work Students\u2019 Association', image: imgSocialWork, desc: 'Brings social work students together through activities that promote professional development, service, advocacy, leadership, and community engagement.' },
];

// ---- Events & Activities ----
const activities = [
    {
        icon: 'fa-fire',
        title: 'ABLAZE Welcome Week',
        desc: 'ABLAZE Welcome Week welcomes students to the CCCDO community through engaging activities, opportunities to connect, and experiences that foster belonging and school spirit.',
        images: [imgAblaze1, imgAblaze2, imgAblaze3, imgAblaze4, imgAblaze5],
    },
    {
        icon: 'fa-volleyball',
        title: 'HIUSA Sports League',
        desc: 'The HIUSA Sports League brings students together through competitive sports, promoting teamwork, discipline, camaraderie, and healthy competition across the CCCDO community.',
        images: [], // add HIUSA imports once filenames are confirmed
    },
];

// ---- Shared org photo/placeholder banner ----
const OrgBanner = ({ org, className = '' }) => (
    org.image ? (
        <img
            src={org.image}
            alt={org.title}
            className={`w-full object-cover ${className}`}
            loading="lazy"
        />
    ) : (
        <div className={`w-full flex items-center justify-center bg-[#ecfdf5] ${className}`}>
            <i className={`fas ${org.icon} text-[#059669]/40 text-3xl`} />
        </div>
    )
);

// ---- Auto-rotating photo gallery for activity cards ----
const EventGallery = ({ images, title, icon, className = 'h-56' }) => {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        if (images.length <= 1) return;
        const id = setInterval(() => setIndex((i) => (i + 1) % images.length), 3500);
        return () => clearInterval(id);
    }, [images.length]);

    if (!images.length) {
        return (
            <div className={`w-full flex items-center justify-center bg-[#ecfdf5] ${className}`}>
                <i className={`fas ${icon} text-[#059669]/40 text-4xl`} />
            </div>
        );
    }

    return (
        <div className={`relative w-full overflow-hidden ${className}`}>
            <AnimatePresence mode="wait">
                <motion.img
                    key={index}
                    src={images[index]}
                    alt={title}
                    className="w-full h-full object-cover absolute inset-0"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6 }}
                />
            </AnimatePresence>
            {images.length > 1 && (
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
                    {images.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setIndex(i)}
                            aria-label={`Show photo ${i + 1}`}
                            className={`w-2 h-2 rounded-full transition-colors ${i === index ? 'bg-white' : 'bg-white/50'}`}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

// ---- Infinite Org Carousel ----
const CARD_WIDTH = 300; // px, includes gap
const CARD_GAP = 20;
const STEP = CARD_WIDTH + CARD_GAP;
const SPEED = 45; // px per second for autoplay

const OrgCarousel = ({ onSelect }) => {
    const controls = useAnimation();
    const trackRef = useRef(null);
    const xRef = useRef(0);
    const isPausedRef = useRef(false);

    const loopOrgs = [...orgs, ...orgs];
    const totalWidth = orgs.length * STEP;

    const startAutoplay = React.useCallback(() => {
        if (isPausedRef.current) return;
        const remaining = totalWidth + xRef.current;
        const duration = remaining / SPEED;
        controls.start({
            x: -totalWidth,
            transition: { duration, ease: 'linear' },
        }).then(() => {
            if (!isPausedRef.current) {
                xRef.current = 0;
                controls.set({ x: 0 });
                startAutoplay();
            }
        });
    }, [controls, totalWidth]);

    useEffect(() => {
        startAutoplay();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handlePause = () => {
        isPausedRef.current = true;
        controls.stop();
    };

    const handleResume = () => {
        isPausedRef.current = false;
        startAutoplay();
    };

    const nudge = (direction) => {
        isPausedRef.current = true;
        controls.stop();
        let next = xRef.current - direction * STEP;
        if (next > 0) next -= totalWidth;
        if (next < -totalWidth) next += totalWidth;
        xRef.current = next;
        controls.start({ x: next, transition: { duration: 0.4, ease: 'easeOut' } }).then(() => {
            isPausedRef.current = false;
            startAutoplay();
        });
    };

    return (
        <div className="relative" onMouseEnter={handlePause} onMouseLeave={handleResume}>
            <button
                onClick={() => nudge(-1)}
                aria-label="Previous organizations"
                className="hidden md:flex absolute -left-5 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white border border-gray-200 shadow-md items-center justify-center hover:bg-gray-50 transition-colors"
            >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-gray-600">
                    <path d="m15 18-6-6 6-6" />
                </svg>
            </button>

            <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-12 z-[5] bg-gradient-to-r from-white to-transparent" />
            <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-12 z-[5] bg-gradient-to-l from-white to-transparent" />

            <div className="overflow-hidden">
                <motion.div
                    ref={trackRef}
                    className="flex"
                    style={{ gap: `${CARD_GAP}px` }}
                    animate={controls}
                    initial={{ x: 0 }}
                    onUpdate={(latest) => {
                        if (typeof latest.x === 'number') xRef.current = latest.x;
                    }}
                >
                    {loopOrgs.map((org, idx) => (
                        <button
                            key={`${org.title}-${idx}`}
                            onClick={() => onSelect(org)}
                            className="bg-white rounded-2xl border border-gray-100 shrink-0 text-left overflow-hidden hover:border-[#059669]/30 hover:shadow-md transition-all duration-200"
                            style={{ width: `${CARD_WIDTH}px` }}
                        >
                            <OrgBanner org={org} className="h-32" />
                            <div className="p-5">
                                <h3
                                    className="font-bold text-gray-800 mb-1.5 text-sm leading-snug"
                                    style={{ fontFamily: '"Bricolage Grotesque", sans-serif' }}
                                >
                                    {org.title}
                                </h3>
                                <p className="text-sm text-gray-600 leading-relaxed line-clamp-2">{org.desc}</p>
                            </div>
                        </button>
                    ))}
                </motion.div>
            </div>

            <button
                onClick={() => nudge(1)}
                aria-label="Next organizations"
                className="hidden md:flex absolute -right-5 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white border border-gray-200 shadow-md items-center justify-center hover:bg-gray-50 transition-colors"
            >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-gray-600">
                    <path d="m9 18 6-6-6-6" />
                </svg>
            </button>
        </div>
    );
};

// ---- "See All" grid modal ----
const AllOrgsModal = ({ onClose, onSelect }) => (
    <motion.div
        className="fixed inset-0 z-50 flex items-start md:items-center justify-center bg-black/50 backdrop-blur-sm p-4 overflow-y-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={onClose}
    >
        <motion.div
            className="bg-white rounded-3xl w-full max-w-5xl my-8 md:my-0 max-h-[85vh] overflow-y-auto shadow-2xl"
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            onClick={(e) => e.stopPropagation()}
        >
            <div className="sticky top-0 bg-white/90 backdrop-blur-sm border-b border-gray-100 px-6 md:px-8 py-5 flex items-center justify-between">
                <div>
                    <h2
                        className="text-xl md:text-2xl font-extrabold text-gray-800"
                        style={{ fontFamily: '"Bricolage Grotesque", sans-serif' }}
                    >
                        All Student Organizations
                    </h2>
                    <p className="text-sm text-gray-500 mt-0.5">{orgs.length} groups to lead, compete, create, and give back.</p>
                </div>
                <button
                    onClick={onClose}
                    aria-label="Close"
                    className="shrink-0 w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-gray-600">
                        <path d="M18 6 6 18M6 6l12 12" />
                    </svg>
                </button>
            </div>

            <div className="p-6 md:p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {orgs.map((org) => (
                    <button
                        key={org.title}
                        onClick={() => onSelect(org)}
                        className="text-left bg-gray-50 hover:bg-[#ecfdf5] border border-transparent hover:border-[#059669]/20 rounded-2xl overflow-hidden transition-all duration-200 group"
                    >
                        <OrgBanner org={org} className="h-28" />
                        <div className="p-5">
                            <h3
                                className="font-bold text-gray-800 text-sm leading-snug mb-1.5"
                                style={{ fontFamily: '"Bricolage Grotesque", sans-serif' }}
                            >
                                {org.title}
                            </h3>
                            <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">{org.desc}</p>
                            <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#059669] mt-2">
                                Read more
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="w-2.5 h-2.5">
                                    <path d="M5 12h14" />
                                    <path d="m12 5 7 7-7 7" />
                                </svg>
                            </span>
                        </div>
                    </button>
                ))}
            </div>
        </motion.div>
    </motion.div>
);

// ---- Full description detail modal ----
const OrgDetailModal = ({ org, onBack, onClose }) => (
    <motion.div
        className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={onClose}
    >
        <motion.div
            className="bg-white rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden"
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.96 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            onClick={(e) => e.stopPropagation()}
        >
            <div className="relative">
                <OrgBanner org={org} className="h-48" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/0 to-black/0" />
                <button
                    onClick={onClose}
                    aria-label="Close"
                    className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/90 hover:bg-white flex items-center justify-center transition-colors shadow-md"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-gray-700">
                        <path d="M18 6 6 18M6 6l12 12" />
                    </svg>
                </button>
                <div className="absolute -bottom-6 left-7 w-12 h-12 rounded-xl bg-white shadow-md flex items-center justify-center">
                    <i className={`fas ${org.icon} text-[#059669] text-lg`} />
                </div>
            </div>

            <div className="p-7 md:p-8 pt-10">
                <h2
                    className="text-2xl font-extrabold text-gray-800 leading-tight"
                    style={{ fontFamily: '"Bricolage Grotesque", sans-serif' }}
                >
                    {org.title}
                </h2>
                <div className="w-10 h-[3px] bg-[#eab308] rounded-full mt-3 mb-5" />

                <p className="text-gray-600 leading-relaxed">{org.desc}</p>

                <button
                    onClick={onBack}
                    className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-[#059669] hover:text-[#047857] transition-colors"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3">
                        <path d="M19 12H5" />
                        <path d="m12 19-7-7 7-7" />
                    </svg>
                    Back to all organizations
                </button>
            </div>
        </motion.div>
    </motion.div>
);

const CampusLife = () => {
    const [showAllOrgs, setShowAllOrgs] = useState(false);
    const [selectedOrg, setSelectedOrg] = useState(null);

    // Close modals on Escape
    useEffect(() => {
        const handleKey = (e) => {
            if (e.key !== 'Escape') return;
            if (selectedOrg) setSelectedOrg(null);
            else if (showAllOrgs) setShowAllOrgs(false);
        };
        window.addEventListener('keydown', handleKey);
        return () => window.removeEventListener('keydown', handleKey);
    }, [selectedOrg, showAllOrgs]);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.6, ease: 'easeOut', staggerChildren: 0.12 } },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 24 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
    };

    const revealVariant = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
    };

    const cardHover = {
        rest: { y: 0, boxShadow: '0 1px 2px rgba(0,0,0,0.04)' },
        hover: { y: -4, boxShadow: '0 12px 30px rgba(5,150,105,0.15)', transition: { duration: 0.25, ease: 'easeOut' } },
    };

    return (
        <MainLayout showTitle={false} maxWidth="full" containerClassName="px-0" mainClassName="py-6 md:py-8" className="bg-transparent">
            <motion.div className="max-w-6xl mx-auto" variants={containerVariants} initial="hidden" animate="visible">

                {/* Campus Life Introduction */}
                <section
                    style={{
                        width: '80vw',
                        position: 'relative',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        padding: '2rem 1.5rem 4rem',
                        background: 'linear-gradient(180deg, #ffffff 0%, #ffffff 85%, #f7faf8 100%)',
                        boxSizing: 'border-box',
                    }}
                >
                    <motion.div
                        className="reveal-on-scroll home-content-reveal"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                        variants={revealVariant}
                        transition={{ duration: 0.6, ease: 'easeOut' }}
                        style={{ maxWidth: '760px', margin: '0 auto', textAlign: 'center' }}
                    >
                        <h1
                            style={{
                                fontFamily: '"Bricolage Grotesque", sans-serif',
                                fontSize: 'clamp(2rem, 4vw, 3rem)',
                                fontWeight: 800,
                                color: '#1f2937',
                                lineHeight: 1.2,
                                textAlign: 'center',
                            }}
                        >
                            Campus <span style={{ color: '#059669' }}>Life</span>
                        </h1>

                        <div
                            aria-hidden="true"
                            style={{ width: '48px', height: '3px', background: '#eab308', borderRadius: '999px', margin: '0.75rem auto 0' }}
                        ></div>

                        <p
                            style={{
                                fontSize: '1.0625rem',
                                color: '#4b5563',
                                lineHeight: 1.75,
                                marginTop: '1rem',
                                maxWidth: '680px',
                                marginLeft: 'auto',
                                marginRight: 'auto',
                                textAlign: 'center',
                            }}
                        >
                            At City College of Cagayan de Oro, learning extends beyond the classroom.
                            Campus life is shaped by meaningful experiences, vibrant student communities,
                            and opportunities to grow, lead, serve, and connect. Through student
                            organizations, campus activities, support services, and shared experiences,
                            City College of CDO provides a welcoming environment where every Kauban can
                            learn, belong, and thrive.
                        </p>
                    </motion.div>
                </section>

                {/* Student Organizations — Infinite Carousel + See All */}
                <motion.section className="mb-16 px-4" variants={itemVariants}>
                    <SectionHeader
                        title="Student Organizations"
                        subtitle="Groups students join to lead, compete, create, and give back."
                        action={
                            <button
                                onClick={() => setShowAllOrgs(true)}
                                className="hidden sm:inline-flex items-center gap-2 rounded-full bg-[#059669] border-2 border-[#059669] text-white font-semibold text-sm pl-5 pr-4 py-2.5 hover:bg-[#047857] hover:border-[#047857] hover:pr-5 hover:pl-4 transition-all duration-300 shrink-0 group"
                            >
                                See all
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="w-3.5 h-3.5 text-white transition-transform duration-300 group-hover:translate-x-1"
                                >
                                    <path d="M5 12h14" />
                                    <path d="m12 5 7 7-7 7" />
                                </svg>
                            </button>
                        }
                    />
                    <div className="sm:hidden mb-4">
                        <button
                            onClick={() => setShowAllOrgs(true)}
                            className="inline-flex items-center gap-2 rounded-full bg-[#059669] text-white font-semibold text-sm px-5 py-2.5 hover:bg-[#047857] transition-colors duration-200"
                        >
                            See all organizations
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5">
                                <path d="M5 12h14" />
                                <path d="m12 5 7 7-7 7" />
                            </svg>
                        </button>
                    </div>
                    <OrgCarousel onSelect={setSelectedOrg} />
                </motion.section>

                {/* Events & Activities */}
                <motion.section className="mb-16 px-4" variants={itemVariants}>
                    <SectionHeader title="Events & Activities" subtitle="Signature experiences that bring the CCCDO community together." />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {activities.map((a) => (
                            <motion.div
                                key={a.title}
                                className="bg-white rounded-2xl border border-gray-100 overflow-hidden"
                                variants={cardHover}
                                initial="rest"
                                whileHover="hover"
                            >
                                <EventGallery images={a.images} title={a.title} icon={a.icon} className="h-56" />
                                <div className="p-6">
                                    <h3
                                        className="font-bold text-lg text-gray-800 mb-2"
                                        style={{ fontFamily: '"Bricolage Grotesque", sans-serif' }}
                                    >
                                        {a.title}
                                    </h3>
                                    <p className="text-sm text-gray-600 leading-relaxed">{a.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.section>

                {/* Footer note */}
                <motion.div className="text-center text-sm text-gray-500 px-4" variants={itemVariants}>
                    <p>
                        Want to join an organization or learn more about an activity?{' '}
                        <span className="text-[#059669] font-semibold">Visit the Student Affairs office</span> or your department chair.
                    </p>
                </motion.div>
            </motion.div>

            {/* Modals */}
            <AnimatePresence>
                {showAllOrgs && !selectedOrg && (
                    <AllOrgsModal onClose={() => setShowAllOrgs(false)} onSelect={setSelectedOrg} />
                )}
            </AnimatePresence>
            <AnimatePresence>
                {selectedOrg && (
                    <OrgDetailModal
                        org={selectedOrg}
                        onBack={() => setSelectedOrg(null)}
                        onClose={() => {
                            setSelectedOrg(null);
                            setShowAllOrgs(false);
                        }}
                    />
                )}
            </AnimatePresence>
        </MainLayout>
    );
};

const SectionHeader = ({ title, subtitle, action }) => (
    <div className="mb-6 flex items-start justify-between gap-4 flex-wrap">
        <div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-gray-800" style={{ fontFamily: '"Bricolage Grotesque", sans-serif' }}>
                {title}
            </h2>
            <p className="text-gray-500 mt-1">{subtitle}</p>
        </div>
        {action}
    </div>
);

export default CampusLife;
