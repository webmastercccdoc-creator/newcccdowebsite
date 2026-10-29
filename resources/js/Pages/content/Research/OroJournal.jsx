import { useEffect, useState } from 'react';
import { AnimatePresence, MotionConfig, motion } from 'framer-motion';
import MainLayout from '../../../layouts/MainLayout';
import oroJournalCover from '../../../assets/RITTS/Oro Journal of Sustainability and Development Research Vol. 1 No. 1 (2026).png';
import ojsrPdf01 from '../../../assets/RITTS/OJSR/OJSR-01.pdf';
import ojsrPdf02 from '../../../assets/RITTS/OJSR/OJSR-02.pdf';
import ojsrPdf03 from '../../../assets/RITTS/OJSR/OJSR-03.pdf';
import ojsrPdf04 from '../../../assets/RITTS/OJSR/OJSR-04.pdf';
import ojsrPdf05 from '../../../assets/RITTS/OJSR/OJSR-05.pdf';
import ojsrPdf06 from '../../../assets/RITTS/OJSR/OJSR-06.pdf';
import ojsrPdf07 from '../../../assets/RITTS/OJSR/OJSR-07.pdf';
import authorGuidelinesPage01 from '../../../assets/RITTS/OJSR/Oro-Journal-Guidelines-1.png';
import authorGuidelinesPage02 from '../../../assets/RITTS/OJSR/Oro-Journal-Guidelines-2.png';
import authorGuidelinesPage03 from '../../../assets/RITTS/OJSR/Oro-Journal-Guidelines-3.png';
import authorGuidelinesPage04 from '../../../assets/RITTS/OJSR/Oro-Journal-Guidelines-4.png';
import authorGuidelinesPage05 from '../../../assets/RITTS/OJSR/Oro-Journal-Guidelines-5.png';
import authorGuidelinesPage06 from '../../../assets/RITTS/OJSR/Oro-Journal-Guidelines-6.png';
import authorGuidelinesPage07 from '../../../assets/RITTS/OJSR/Oro-Journal-Guidelines-7.png';
import authorGuidelinesPage08 from '../../../assets/RITTS/OJSR/Oro-Journal-Guidelines-8.png';
import authorGuidelinesPage09 from '../../../assets/RITTS/OJSR/Oro-Journal-Guidelines-9.png';

const journalDetails = [
    ['Journal Title', 'Oro Journal of Sustainability and Development Research'],
    ['Abbreviated Title', 'OJSDR'],
    ['Publisher', 'City College of Cagayan de Oro'],
    ['Print ISSN', '3116-5044'],
    ['Electronic ISSN', '3116-5052'],
    ['First Publication', 'March 2026'],
    ['Publication Frequency', 'Semiannual'],
    ['Peer-Review Model', 'Double-blind external peer review'],
    ['Publication Format', 'Open access; electronic and print'],
    ['Publication Language', 'English'],
    ['Article Processing Charges', 'No submission, review, or publication fees'],
    ['Open-Access License', 'Creative Commons Attribution 4.0 International (CC BY 4.0)'],
    ['Documented Issue', 'Volume 1, Issue 1 (2026)'],
];

const journalObjectives = [
    'Disseminate original, methodologically rigorous, and ethically conducted interdisciplinary research.',
    'Promote research contributions aligned with the United Nations Sustainable Development Goals.',
    'Encourage collaboration among academic institutions, government, civil society, industry, and development practitioners.',
    'Strengthen translation of findings into policies, programs, innovations, and community interventions.',
    'Provide equitable publication opportunities for emerging and established scholars.',
    'Uphold editorial independence, research integrity, responsible authorship, and peer review.',
    'Enhance accessibility and discoverability of scholarly outputs.',
];

const journalTopics = [
    'Sustainable Development Goals (SDGs)',
    'Environmental Sustainability and Climate Resilience',
    'Urban and Rural Development',
    'Public Policy and Governance',
    'Social Equity, Inclusion, and Community Development',
    'Economic Sustainability and Innovation',
    'Disaster Risk Reduction and Management',
    'Education for Sustainable Development',
    'Indigenous Knowledge Systems and Sustainability',
    'Health, Well-being, and Sustainable Communities',
    'Technology and Digital Transformation for Development',
];

const authorRequirements = [
    ['Manuscript length', '4,000–7,000 words'],
    ['Title', 'No more than 14 words'],
    ['Abstract', '150–200 words'],
    ['Keywords', '3–5, separated by semicolons'],
    ['Main text', 'Book Antiqua 11 pt, 1.2 spacing'],
    ['Abstract', 'Book Antiqua 10.5 pt, italicized, single-spaced'],
    ['References, tables, figures', 'APA 7th edition'],
    ['Figures', 'At least 300 dpi'],
    ['Similarity index', '10% or less, with editorial interpretation'],
    ['Review copy', 'Anonymized for double-blind review'],
];

const journalSections = [
    { id: 'about', label: 'About the Journal', icon: ['M4 5.5A2.5 2.5 0 0 1 6.5 3H20v16H6.5A2.5 2.5 0 0 0 4 21.5z', 'M4 5.5v16', 'M8 7h8', 'M8 11h8'] },
    { id: 'scope', label: 'Aims and Scope', icon: ['M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11z', 'm9 12 2 2 4-4'] },
    { id: 'for-authors', label: 'For Authors', icon: ['M12 20h9', 'M16.5 3.5a2.1 2.1 0 0 1 3 3L8 18l-4 1 1-4Z', 'm15 5 4 4'] },
    { id: 'guidelines', label: 'Guidelines', icon: ['M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z', 'M14 2v6h6', 'M8 13h8', 'M8 17h8'] },
    { id: 'review', label: 'Editorial and Peer Review Process', icon: ['M9 11l3 3L22 4', 'M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11'] },
    { id: 'ethics', label: 'Publication Ethics and Policies', icon: ['M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11z', 'M9 12h6', 'M12 9v6'] },
    { id: 'archives', label: 'Archives and Indexing', icon: ['M3 4h18v4H3z', 'M5 8v12h14V8', 'M10 12h4', 'M10 16h4'] },
    { id: 'boards', label: 'Editorial Boards', icon: ['M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2', 'M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z', 'M20 21v-2a4 4 0 0 0-3-3.87', 'M16 3.13a4 4 0 0 1 0 7.75'] },
    { id: 'contact', label: 'Contact', icon: ['M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z', 'M12 10a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z'] },
];

const editorialBoard = [
    { name: 'Jean T. Loquillano, PhD', role: 'Editor-in-Chief' },
    { name: 'Joel D. Potane, PhD', role: 'Managing Editor' },
    { name: 'Ray Butch D. Mahinay, PhD', role: 'Senior Editors' },
    { name: 'Olga C. Alonsabe, PhD', role: 'Senior Editors' },
    { name: 'Jonathan A. Madronero, MSc', role: 'Senior Editors' },
    { name: 'Mary Joy C. Teodosio, DBA', role: 'Copy Editors' },
    { name: 'Psyche B. Cambo, MAIE', role: 'Copy Editors' },
    { name: 'Mark Janubas, MAED', role: 'Copy Editors' },
    { name: 'Erlouise Vargas, MAED', role: 'Copy Editors' },
    { name: 'Charlie Cosmiano, MTTE', role: 'Copy Editors' },
    { name: 'Jason Herrera, MITO', role: 'Copy Editors' },
    { name: 'Joseph Barillo, MBA', role: 'Copy Editors' },
    { name: 'Ma. Katerina Janubas, MAED', role: 'Copy Editors' },
];

const advisoryBoard = [
    { name: 'Jestoni P. Babia, EdD', role: 'Administration' },
    { name: 'Helmae E. Tapanan, EdD', role: 'Administration' },
    { name: 'Kurt S. Candilas, PhD', role: 'Administration' },
    { name: 'Mark Raymond Tan, EdD', role: 'Administration' },
    { name: 'Donna Grace I. Cotejo, DA', role: 'College Dean' },
    { name: 'Liza L. Chua, DevEdD, PhD', role: 'College Dean' },
    { name: 'Rowena R. Orbeta, DM', role: 'College Dean' },
    { name: 'Ronald Donceras, PhD (USA)', role: 'International Advisor' },
    { name: 'Yin Mon Swe, MEd (Myanmar)', role: 'International Advisor' },
    { name: 'Say Sokun Pharoth, MEd (Cambodia)', role: 'International Advisor' },
    { name: 'Nabiilah Tjandra, S. Tr.T. (Indonesia)', role: 'International Advisor' },
    { name: 'Souksamay Inthavongsa, MEd (Laos)', role: 'International Advisor' },
    { name: 'Jesse James Fabela', role: 'Layout and Design' },
    { name: 'Howard Christian Aranar', role: 'Layout and Design' },
];

const authorDocuments = [
    {
        label: 'Anonymized manuscript template',
        href: 'https://docs.google.com/document/d/1gAUuOR-iRqLsOV0p4u4eZIoIDH7RC1G6/edit',
    },
    {
        label: 'Author documents',
        href: 'https://docs.google.com/document/d/10rV2Lu9CuoHW3EdupFM6LKvcuU6DcRmq/edit',
    },
];

const authorGuidelinesPages = [
    authorGuidelinesPage01,
    authorGuidelinesPage02,
    authorGuidelinesPage03,
    authorGuidelinesPage04,
    authorGuidelinesPage05,
    authorGuidelinesPage06,
    authorGuidelinesPage07,
    authorGuidelinesPage08,
    authorGuidelinesPage09,
];

const reviewSteps = [
    {
        title: 'Manuscript Submission',
        description: 'Submit anonymized manuscript and supporting documents.',
    },
    {
        title: 'Initial Editorial Screening',
        description: 'Verify completeness, scope, originality, methodological rigor, and ethics.',
    },
    {
        title: 'Double-Blind External Peer Review',
        description: 'At least two qualified independent reviewers assess the work.',
    },
    {
        title: 'Editorial Decision',
        description: 'Accept, minor revision, major revision, or reject.',
    },
    {
        title: 'Final Editorial Evaluation',
        description: 'Review author responses and revisions; issue final decision.',
    },
    {
        title: 'Publication',
        description: 'Copyediting, author proof approval, metadata checks, and dissemination.',
    },
];

const inauguralArticles = [
    {
        title: 'Hot Seat: Intervention for Writing Persuasive Speeches',
        doi: '10.17613/1b6xj-22302',
        pdf: ojsrPdf01,
    },
    {
        title: 'The Illusion of Openness: Ideological Convergence and the Limits of Critique in the Social Sciences',
        doi: '10.17613/5y395-as286',
        pdf: ojsrPdf02,
    },
    {
        title: 'Knowledge, Attitudes, and Practices of Grade 6 Pupils on Sustainable Plant Care: Implications for Eco-Friendly School Gardening Programs',
        doi: '10.17613/gbdsk-4f184',
        pdf: ojsrPdf03,
    },
    {
        title: 'Enhancing Students Engagement in Technology and Livelihood Education (TLE) through Interactive Digital Play-Based Learning',
        doi: '10.17613/h47gl-ne757',
        pdf: ojsrPdf04,
    },
    {
        title: 'Bridging Certification Gaps in Electrical Installation and Maintenance: A Competency-Based Improvement Framework for TESDA Assessment Outcomes',
        doi: '10.17613/w40m9-bk832',
        pdf: ojsrPdf05,
    },
    {
        title: 'Pre-Service Teachers Preparedness in Early Childhood Education: Disposition, Cognition, and Self-Reflection',
        doi: '10.17613/8vv23-lws59',
        pdf: ojsrPdf06,
    },
    {
        title: 'Study Packet: Photo-Based Problem-Solving Worksheets in Force, Motion, and Energy',
        doi: '10.17613/278f7-r807',
        pdf: ojsrPdf07,
    },
];

const sectionMotion = {
    initial: { opacity: 0, y: 28 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.12 },
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
};

function SectionHeading({ eyebrow, title, description, light = false }) {
    return (
        <div className="mb-9 max-w-3xl">
            <p
                className={`text-xs font-bold uppercase tracking-[0.22em] ${
                    light ? 'text-[#f4d47c]' : 'text-[#a77b28]'
                }`}
            >
                {eyebrow}
            </p>
            <h2
                className={`mt-3 font-serif text-3xl font-semibold leading-tight tracking-tight sm:text-4xl ${
                    light ? 'text-white' : 'text-[#17372b]'
                }`}
            >
                {title}
            </h2>
            {description && (
                <p className={`mt-4 text-sm leading-7 sm:text-base ${light ? 'text-white/70' : 'text-[#68766d]'}`}>
                    {description}
                </p>
            )}
        </div>
    );
}

function ExternalArrow() {
    return (
        <svg
            aria-hidden="true"
            viewBox="0 0 20 20"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            className="h-4 w-4 shrink-0"
        >
            <path d="M5 15 15 5M6 5h9v9" />
        </svg>
    );
}

function DocumentIcon({ className = 'h-6 w-6' }) {
    return (
        <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
        >
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <path d="M14 2v6h6M8 13h8M8 17h8" />
        </svg>
    );
}

function groupBoardMembers(members) {
    return members.reduce((groups, member) => {
        let group = groups.find((item) => item.role === member.role);

        if (!group) {
            group = { role: member.role, members: [] };
            groups.push(group);
        }

        group.members.push(member);
        return groups;
    }, []);
}

function BoardMemberCard({ member }) {
    const nameParts = member.name.split(',')[0].trim().split(/\s+/);
    const initials = `${nameParts[0]?.[0] || ''}${nameParts[nameParts.length - 1]?.[0] || ''}`.toUpperCase();

    return (
        <motion.article
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            whileHover={{ y: -3 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="group relative flex min-h-[104px] min-w-0 items-center gap-3 overflow-hidden rounded-xl border border-[#e4e6df] bg-white p-4 shadow-[0_5px_18px_rgba(27,48,36,0.04)] transition-shadow hover:border-[#c5ad70] hover:shadow-[0_12px_26px_rgba(27,48,36,0.09)] sm:gap-4 sm:p-5"
        >
            <span aria-hidden="true" className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-[#d8b45c] to-[#9a7125] opacity-70 transition-opacity group-hover:opacity-100" />
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#d9e2d7] bg-[#edf2eb] font-serif text-sm font-semibold text-[#214b35] transition-colors group-hover:border-[#214b35] group-hover:bg-[#214b35] group-hover:text-[#f1d88a] sm:h-12 sm:w-12">
                {initials}
            </span>
            <span className="min-w-0 flex-1 py-1">
                <span className="block break-words text-sm font-semibold leading-5 text-[#263d30] sm:text-[15px]">
                    {member.name}
                </span>
            </span>
            <span aria-hidden="true" className="shrink-0 font-serif text-lg text-[#b8a774] transition-transform group-hover:translate-x-0.5">›</span>
        </motion.article>
    );
}

export default function OroJournal() {
    const [activeContentTab, setActiveContentTab] = useState('about');
    const [activeBoard, setActiveBoard] = useState('editorial');
    const [activeGuidelinePage, setActiveGuidelinePage] = useState(null);
    const [guidelineCarouselPage, setGuidelineCarouselPage] = useState(0);
    const [isIssueOpen, setIsIssueOpen] = useState(false);

    useEffect(() => {
        if (activeContentTab !== 'guidelines') {
            setActiveGuidelinePage(null);
        }
    }, [activeContentTab]);

    useEffect(() => {
        if (activeGuidelinePage === null) {
            return undefined;
        }

        const handleKeyDown = (event) => {
            if (event.key === 'Escape') {
                setActiveGuidelinePage(null);
            } else if (event.key === 'ArrowRight') {
                setActiveGuidelinePage((page) => (page + 1) % authorGuidelinesPages.length);
            } else if (event.key === 'ArrowLeft') {
                setActiveGuidelinePage(
                    (page) => (page - 1 + authorGuidelinesPages.length) % authorGuidelinesPages.length,
                );
            }
        };

        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        window.addEventListener('keydown', handleKeyDown);

        return () => {
            document.body.style.overflow = previousOverflow;
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [activeGuidelinePage]);

    return (
        <MainLayout
            maxWidth="full"
            containerClassName="px-0"
            mainClassName="py-0"
            className="overflow-hidden bg-[#f8f7f2] pb-0"
        >
            <MotionConfig reducedMotion="user">
            <main className="text-[#1f3329]">
                <section className="relative isolate min-h-[690px] overflow-hidden bg-[#10271f] text-white sm:min-h-[740px] lg:min-h-[790px]">
                    <div
                        aria-hidden="true"
                        className="absolute inset-0 -z-10 opacity-50"
                        style={{
                            backgroundImage:
                                'radial-gradient(circle at 15% 20%, rgba(193,157,79,.18), transparent 28%), radial-gradient(circle at 80% 5%, rgba(61,110,78,.4), transparent 36%), radial-gradient(rgba(255,255,255,.12) .65px, transparent .65px)',
                            backgroundSize: 'auto, auto, 5px 5px',
                        }}
                    />
                    <div
                        aria-hidden="true"
                        className="absolute -right-48 top-16 -z-10 h-[34rem] w-[34rem] rounded-full border border-[#d3b56c]/20 sm:-right-28"
                    />
                    <div
                        aria-hidden="true"
                        className="absolute -right-28 top-36 -z-10 h-[26rem] w-[26rem] rounded-full border border-[#d3b56c]/15"
                    />

                    <div className="mx-auto grid min-h-[690px] max-w-[1440px] items-center gap-12 px-6 py-20 sm:min-h-[740px] sm:px-10 lg:min-h-[790px] lg:grid-cols-[1.15fr_0.85fr] lg:gap-16 lg:px-16 lg:py-24">
                        <motion.div
                            initial={{ opacity: 0, y: 32 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                            className="relative z-10"
                        >
                            <div className="inline-flex items-center gap-3 rounded-full border border-[#d3b56c]/35 bg-white/[0.04] px-4 py-2 text-[10px] font-bold uppercase tracking-[0.22em] text-[#e7d6aa] sm:text-xs">
                                <span className="h-1.5 w-1.5 rounded-full bg-[#d8b45c]" />
                                City College of Cagayan de Oro
                            </div>
                            <p className="mt-10 font-serif text-sm italic tracking-wide text-[#e5d7b1] sm:text-base">
                                Advancing Knowledge, Innovation, and Sustainable Development.
                            </p>
                            <h1 className="mt-5 max-w-4xl font-serif text-4xl font-medium leading-[1.08] tracking-[-0.04em] text-white sm:text-5xl md:text-6xl lg:text-[4.5rem]">
                                Oro Journal of Sustainability and{' '}
                                <span className="text-[#d8b45c]">Development Research</span>
                            </h1>
                            <p className="mt-7 max-w-2xl text-base leading-8 text-white/70 sm:text-lg">
                                A peer-reviewed, open-access scholarly journal promoting interdisciplinary
                                research and evidence-based solutions to local and global development
                                challenges.
                            </p>
                            <div className="mt-9 flex flex-wrap gap-3">
                                <a
                                    href="#journal-content"
                                    onClick={() => setActiveContentTab('archives')}
                                    className="inline-flex items-center gap-3 rounded-full bg-[#d8b45c] px-6 py-3.5 text-sm font-bold text-[#17251c] transition-transform hover:-translate-y-0.5 hover:bg-[#e6c875] focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#10271f]"
                                >
                                    Explore the inaugural issue
                                    <span aria-hidden="true">↓</span>
                                </a>
                                <a
                                    href="#journal-content"
                                    onClick={() => setActiveContentTab('guidelines')}
                                    className="inline-flex items-center rounded-full border border-white/25 px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:border-white/60 hover:bg-white/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                                >
                                    View guideline pages
                                </a>
                            </div>
                            <div className="mt-12 flex flex-wrap gap-x-8 gap-y-4 border-t border-white/15 pt-6 text-xs font-medium text-white/60">
                                <span>Open access</span>
                                <span>Double-blind peer review</span>
                                <span>No publication fees</span>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.92, rotateY: 12, y: 28 }}
                            animate={{ opacity: 1, scale: 1, rotateY: 0, y: 0 }}
                            transition={{ duration: 1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                            className="relative mx-auto w-full max-w-[420px] [perspective:1400px]"
                        >
                            <div
                                aria-hidden="true"
                                className="absolute -inset-8 rounded-[48%] bg-[#c09a47]/10 blur-3xl"
                            />
                            <motion.div
                                whileHover={{ rotateY: -7, rotateX: 3, y: -8 }}
                                transition={{ type: 'spring', stiffness: 180, damping: 18 }}
                                style={{ transformStyle: 'preserve-3d' }}
                                className="relative mx-auto aspect-[3/4] w-[74%] max-w-[340px] overflow-hidden rounded-r-md border border-white/20 bg-[#eee8da] shadow-[22px_28px_50px_rgba(0,0,0,0.42)]"
                            >
                                <img
                                    src={oroJournalCover}
                                    alt="Oro Journal of Sustainability and Development Research, Volume 1, Issue 1 (2026) cover"
                                    className="h-full w-full object-contain"
                                />
                                <div className="absolute inset-y-0 left-0 w-3 border-r border-black/10 bg-gradient-to-r from-black/25 to-black/5" />
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0, y: 14 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.95, duration: 0.55 }}
                                className="absolute -bottom-5 left-0 rounded-xl border border-white/15 bg-[#18382b]/95 px-5 py-4 shadow-xl backdrop-blur-md sm:-left-4"
                            >
                                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#d8b45c]">
                                    Inaugural issue
                                </p>
                                <p className="mt-1 font-serif text-lg text-white">Volume 1 · Issue 1</p>
                                <p className="mt-1 text-xs text-white/55">March 2026</p>
                            </motion.div>
                        </motion.div>
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#d8b45c]/60 to-transparent" />
                </section>

                <div id="journal-content" className="scroll-mt-32 bg-[#f2f1eb]">
                    <div className="border-y border-[#e0ded4] bg-[#f8f7f2] px-3 py-3 sm:px-6">
                        <div className="mx-auto max-w-[1320px]">
                            <div className="mb-2 px-1">
                                <h2 className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#68766d]">
                                    Journal sections
                                </h2>
                            </div>
                            <nav
                                role="tablist"
                                aria-label="Journal sections"
                                className="grid grid-cols-2 gap-2 sm:grid-cols-4"
                            >
                            {journalSections.map((section) => {
                                const isActive = activeContentTab === section.id;

                                return (
                                    <button
                                        key={section.id}
                                        type="button"
                                        role="tab"
                                        id={`journal-tab-${section.id}`}
                                        aria-selected={isActive}
                                        aria-controls="journal-tabpanel"
                                        tabIndex={isActive ? 0 : -1}
                                        onClick={() => setActiveContentTab(section.id)}
                                        aria-label={`${isActive ? 'Currently viewing' : 'Open'} ${section.label}`}
                                        className={`group relative flex min-h-[62px] items-center gap-2 overflow-hidden rounded-md border px-2.5 py-2 text-left transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#98722d] focus-visible:ring-offset-2 sm:min-h-[68px] sm:gap-3 sm:px-3 ${
                                            isActive
                                                ? 'border-[#17372b] bg-[#17372b] text-white shadow-[0_4px_12px_rgba(23,55,43,0.16)]'
                                                : 'border-[#e2e0d7] bg-white text-[#45574b] hover:border-[#c5ad70] hover:bg-[#fffefa]'
                                        }`}
                                    >
                                        <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-md transition-colors sm:h-9 sm:w-9 ${
                                            isActive ? 'bg-[#d8b45c] text-[#17372b]' : 'bg-[#f2f1eb] text-[#8b712f] group-hover:bg-[#f5f0e2]'
                                        }`}>
                                            <svg
                                                aria-hidden="true"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="1.6"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                className="h-5 w-5"
                                            >
                                                {section.icon.map((path) => <path key={path} d={path} />)}
                                            </svg>
                                        </span>
                                        <span className="min-w-0 flex-1">
                                            <span className={`block text-[9px] font-bold uppercase tracking-[0.14em] ${
                                                isActive ? 'text-[#e7d6aa]' : 'text-[#9a7125]'
                                            }`}>
                                                Section {String(journalSections.indexOf(section) + 1).padStart(2, '0')}
                                            </span>
                                            <span className="mt-0.5 block text-[10px] font-bold leading-tight sm:text-xs">
                                                {section.label}
                                            </span>
                                        </span>
                                        <span aria-hidden="true" className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border transition-colors ${
                                            isActive
                                                ? 'border-[#d8b45c] bg-[#d8b45c] text-[#17372b]'
                                                : 'border-[#e3e1d8] text-[#9a7125] group-hover:border-[#c5ad70]'
                                        }`}>
                                            {isActive ? (
                                                <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
                                                    <path d="m4 10 4 4 8-8" />
                                                </svg>
                                            ) : (
                                                <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4">
                                                    <path d="M4 10h11M10 5l5 5-5 5" />
                                                </svg>
                                            )}
                                        </span>
                                    </button>
                                );
                            })}
                            </nav>
                        </div>
                    </div>

                    <motion.div
                        key={activeContentTab}
                        id="journal-tabpanel"
                        role="tabpanel"
                        aria-labelledby={`journal-tab-${activeContentTab}`}
                        tabIndex={0}
                        aria-live="polite"
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                        className="bg-white"
                    >
                {activeContentTab === 'about' && (
                <section id="about" className="scroll-mt-20 bg-[#f8f7f2] px-6 py-12 sm:px-10 sm:py-16 lg:px-16">
                    <motion.div {...sectionMotion} className="mx-auto max-w-[1240px]">
                        <SectionHeading
                            eyebrow="About the Journal"
                            title="Oro Journal of Sustainability and Development Research"
                            description="The Oro Journal of Sustainability and Development Research (OJSDR) is the official peer-reviewed research journal of the City College of Cagayan de Oro, Philippines. Established in 2026, the journal provides an interdisciplinary scholarly platform for disseminating original research that advances sustainability, inclusive development, innovation, evidence-informed policymaking, and community transformation."
                        />
                        <div className="grid gap-3 md:grid-cols-2">
                            <p className="text-sm leading-7 text-[#68766d] sm:text-base">
                            OJSDR welcomes contributions from researchers, academics, policymakers,
                            development practitioners, and scholars across local, national, and international
                            institutions. Guided by the United Nations Sustainable Development Goals (SDGs),
                            the journal encourages rigorous and ethically conducted research responding to
                            contemporary environmental, social, economic, technological, and governance challenges.
                            </p>
                            <p className="text-sm leading-7 text-[#68766d] sm:text-base">
                            As an open-access, semiannual publication, OJSDR promotes
                            accessibility, visibility, and responsible dissemination of scholarly knowledge.
                            Its editorial policies emphasize academic independence, methodological rigor,
                            transparent reporting, research integrity, and impartial peer review.
                            </p>
                        </div>

                        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                            {journalDetails.map(([label, value], index) => (
                                <motion.div
                                    key={label}
                                    initial={{ opacity: 0, y: 18 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, amount: 0.2 }}
                                    transition={{ duration: 0.45, delay: (index % 4) * 0.06 }}
                                    className="group border border-[#e2e1d8] border-t-2 border-t-[#c3a050] bg-white/70 p-4 transition-colors hover:bg-white"
                                >
                                    <p className="text-[10px] font-bold uppercase tracking-[0.17em] text-[#9a7125]">
                                        {label}
                                    </p>
                                    <p className="mt-2 text-sm font-semibold leading-6 text-[#273d31]">{value}</p>
                                </motion.div>
                            ))}
                        </div>

                        <div className="mt-10 grid gap-7 border-t border-[#d9ddd5] pt-8 lg:grid-cols-2">
                            <div>
                                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#9a7125]">Origins of OJSDR</p>
                                <p className="mt-4 text-sm leading-7 text-[#68766d]">
                                    The journal was established in 2026 as part of the City College of Cagayan de Oro’s commitment to strengthening research culture, scholarly publication, and sustainable community development. Its inaugural issue, Volume 1, Issue 1, published in March 2026, featured seven scholarly articles addressing educational innovation, competency development, social sciences, digital learning, and environmental sustainability.
                                </p>
                                <p className="mt-3 text-sm leading-7 text-[#68766d]">
                                    OJSDR seeks to connect locally grounded research with national and international scholarly conversations and provide opportunities for emerging and established researchers to contribute evidence-based solutions.
                                </p>
                            </div>
                            <div className="border-l-2 border-[#c3a050] pl-6">
                                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#9a7125]">The meaning of Oro</p>
                                <p className="mt-4 font-serif text-xl leading-8 text-[#344b3b]">
                                    The name Oro reflects the identity of Cagayan de Oro, the city where the
                                    journal was established. Associated with the Spanish word for gold, it
                                    symbolizes the enduring value of knowledge, discovery, and scholarly
                                    excellence.
                                </p>
                            </div>
                        </div>

                        <div className="mt-9 grid gap-4 md:grid-cols-2">
                            <article className="bg-[#17372b] p-7 text-white sm:p-9">
                                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#d8b45c]">Vision</p>
                                <p className="mt-4 font-serif text-lg leading-8 sm:text-xl">
                                    To become a recognized and credible interdisciplinary scholarly journal
                                    that advances sustainability research, promotes innovation, and contributes
                                    to inclusive, resilient, and sustainable communities locally and globally.
                                </p>
                            </article>
                            <article className="border border-[#e1dccd] bg-white p-7 sm:p-9">
                                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#9a7125]">Mission</p>
                                <p className="mt-4 font-serif text-lg leading-8 text-[#344b3b] sm:text-xl">
                                    To provide an accessible, ethically governed scholarly platform for
                                    publishing rigorous, original, policy-relevant research that generates
                                    knowledge, strengthens interdisciplinary collaboration, and supports the
                                    achievement of the Sustainable Development Goals.
                                </p>
                            </article>
                        </div>

                        <div className="mt-12">
                            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#9a7125]">Journal objectives</p>
                            <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                                {journalObjectives.map((objective, index) => (
                                    <div key={objective} className="flex gap-3 border-b border-[#dedfd7] py-4">
                                        <span className="font-serif text-sm text-[#b08a3d]">{String(index + 1).padStart(2, '0')}</span>
                                        <p className="text-sm leading-6 text-[#53645a]">{objective}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </section>
                )}

                {activeContentTab === 'scope' && (
                <section id="scope" className="scroll-mt-20 bg-[#e9eee8] px-6 py-12 sm:px-10 sm:py-16 lg:px-16">
                    <motion.div {...sectionMotion} className="mx-auto max-w-[1240px]">
                        <SectionHeading
                            eyebrow="Aims and Scope"
                            title="Aims and Scope"
                            description="The journal considers original research articles, case studies, and rigorously documented scholarly contributions, including quantitative, qualitative, mixed-methods, experimental, and evaluative research where appropriately designed. Manuscripts must demonstrate originality, methodological soundness, ethical compliance, and relevance beyond purely descriptive institutional accounts."
                        />
                        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                            {journalTopics.map((topic, index) => (
                                <motion.div
                                    key={topic}
                                    initial={{ opacity: 0, scale: 0.97 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true, amount: 0.2 }}
                                    transition={{ duration: 0.4, delay: (index % 3) * 0.06 }}
                                    className="flex min-h-24 items-center gap-4 border border-[#d6ded4] bg-white/80 p-5"
                                >
                                    <span className="font-serif text-2xl text-[#b18b43]">{String(index + 1).padStart(2, '0')}</span>
                                    <span className="text-sm font-semibold leading-6 text-[#2c4738]">{topic}</span>
                                </motion.div>
                            ))}
                        </div>
                        <div className="mt-8 grid gap-5 border-t border-[#cbd6c8] pt-6 lg:grid-cols-2">
                            <div>
                                <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#9a7125]">Who May Submit</p>
                                <p className="mt-3 text-sm leading-7 text-[#56665b]">
                                    OJSDR welcomes submissions from faculty, independent researchers, graduate students, government researchers, development professionals, policymakers, and practitioners from the Philippines and abroad. Manuscripts are evaluated on scholarly merit rather than institutional affiliation, nationality, rank, or position.
                                </p>
                            </div>
                            <div>
                                <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#9a7125]">Publication Frequency and Format</p>
                                <p className="mt-3 text-sm leading-7 text-[#56665b]">
                                    OJSDR publishes semiannually. Its inaugural issue appeared in March 2026. The journal supports open-access dissemination under CC BY 4.0, subject to reconciliation of the copyright notice in the inaugural issue.
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </section>
                )}

                {activeContentTab === 'for-authors' && (
                <section id="for-authors" className="scroll-mt-20 bg-[#f8f7f2] px-6 py-12 sm:px-10 sm:py-16 lg:px-16">
                    <motion.div {...sectionMotion} className="mx-auto max-w-[1240px]">
                        <SectionHeading
                            eyebrow="For Authors"
                            title="Manuscript Preparation"
                        />
                        <div className="grid gap-6 lg:grid-cols-[0.78fr_1.22fr]">
                            <div className="relative overflow-hidden bg-[#17372b] p-7 text-white sm:p-9">
                                <span aria-hidden="true" className="absolute -right-10 -top-10 h-40 w-40 rounded-full border border-[#d8b45c]/25" />
                                <p className="relative text-[10px] font-bold uppercase tracking-[0.2em] text-[#d8b45c]">For Authors</p>
                                <p className="relative mt-5 font-serif text-2xl leading-snug text-white">
                                    Authors must provide a separate title page, signed cover letter, author contribution statement, applicable ethics documentation, and disclosures of funding, competing interests, data availability, and third-party permissions where applicable.
                                </p>
                                <div className="relative mt-8 border-t border-white/15 pt-5">
                                    <p className="text-xs font-bold uppercase tracking-[0.17em] text-[#d8b45c]">Submission email</p>
                                    <a href="mailto:cccdoofficeofresearch@gmail.com" className="mt-2 block break-all text-sm font-semibold text-white underline decoration-white/30 underline-offset-4">
                                        cccdoofficeofresearch@gmail.com
                                    </a>
                                </div>
                            </div>
                            <div className="grid content-start gap-0 sm:grid-cols-2">
                                {authorRequirements.map(([label, value], index) => (
                                    <div key={`${label}-${index}`} className="border-b border-[#dedfd7] p-4 sm:border-l sm:border-[#dedfd7]">
                                        <p className="text-[10px] font-bold uppercase tracking-[0.17em] text-[#9a7125]">{label}</p>
                                        <p className="mt-2 text-sm font-semibold leading-6 text-[#2b4334]">{value}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="mt-7 border-t border-[#dedfd7] pt-6">
                            <div className="mb-4 flex items-center gap-3">
                                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#17372b] text-[#e5c76f]">
                                    <DocumentIcon className="h-5 w-5" />
                                </span>
                                <div>
                                    <h3 className="text-sm font-bold text-[#263d30]">Author templates</h3>
                                    <p className="mt-0.5 text-xs text-[#748074]">Open a document to prepare your submission.</p>
                                </div>
                            </div>
                            <div className="grid gap-3 md:grid-cols-2">
                                {authorDocuments.map((document, index) => (
                                    <a
                                        key={document.label}
                                        href={document.href}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="group flex min-h-[88px] items-center gap-4 rounded-lg border border-[#d9ded5] bg-white p-4 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-[#b18b43] hover:shadow-[0_12px_24px_rgba(31,51,41,0.1)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#98722d] focus-visible:ring-offset-2"
                                    >
                                        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[#eff4ef] text-[#24613b] transition-colors group-hover:bg-[#17372b] group-hover:text-[#e5c76f]">
                                            <DocumentIcon />
                                        </span>
                                        <span className="min-w-0 flex-1">
                                            <span className="block text-[9px] font-bold uppercase tracking-[0.16em] text-[#9a7125]">
                                                {index === 0 ? 'Manuscript file' : 'Submission resources'}
                                            </span>
                                            <span className="mt-1 block text-sm font-bold leading-5 text-[#293f32]">
                                                {document.label}
                                            </span>
                                            <span className="mt-1 block text-[11px] font-medium text-[#748074]">
                                                Open document
                                            </span>
                                        </span>
                                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#e1e3dc] text-[#8b712f] transition-all group-hover:border-[#b18b43] group-hover:bg-[#faf6eb]">
                                            <ExternalArrow />
                                        </span>
                                    </a>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </section>
                )}

                {activeContentTab === 'guidelines' && (
                <>
                <section id="guidelines" className="scroll-mt-20 border-y border-[#dedfd7] bg-white px-6 py-12 sm:px-10 sm:py-16 lg:px-16">
                    <motion.div {...sectionMotion} className="mx-auto max-w-[1240px]">
                        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
                            <SectionHeading
                                eyebrow="04 · Guidelines"
                                title="Browse the journal guidelines."
                                description="Explore the official Oro Journal manuscript submission and publication guidelines, one page at a time."
                            />
                            <span className="mb-9 inline-flex shrink-0 items-center self-start border border-[#dfd4b8] bg-[#f6f1e4] px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-[#765b25] sm:self-auto">
                                9 pages
                            </span>
                        </div>
                        <div
                            aria-roledescription="carousel"
                            aria-label="Oro Journal author guidelines"
                            className="relative isolate overflow-hidden rounded-2xl bg-[#10271f] text-white shadow-[0_28px_70px_rgba(20,42,33,0.22)]"
                        >
                            <div
                                aria-hidden="true"
                                className="pointer-events-none absolute inset-0 -z-10 opacity-70"
                                style={{
                                    backgroundImage:
                                        'radial-gradient(circle at 8% 12%, rgba(216,180,92,.2), transparent 28%), radial-gradient(circle at 88% 90%, rgba(61,110,78,.45), transparent 40%), radial-gradient(rgba(255,255,255,.12) .65px, transparent .65px)',
                                    backgroundSize: 'auto, auto, 6px 6px',
                                }}
                            />
                            <div className="grid lg:grid-cols-[minmax(0,1.35fr)_minmax(280px,0.65fr)]">
                                <div className="relative flex min-h-[25rem] items-center justify-center overflow-hidden p-7 sm:min-h-[37rem] sm:p-12 lg:p-14">
                                    <div aria-hidden="true" className="absolute left-1/2 top-1/2 h-[78%] w-[74%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#d8b45c]/10 blur-3xl" />
                                    <div className="relative h-[21rem] w-full max-w-[36rem] sm:h-[31rem]">
                                        <span aria-hidden="true" className="absolute inset-2 translate-x-3 translate-y-3 rounded-sm border border-white/15 bg-[#e6e0d1]/70 shadow-xl" />
                                        <span aria-hidden="true" className="absolute inset-1 translate-x-1.5 translate-y-1.5 rounded-sm border border-white/20 bg-[#f6f1e4]" />
                                        <AnimatePresence mode="wait">
                                            <motion.button
                                                key={guidelineCarouselPage}
                                                type="button"
                                                onClick={() => setActiveGuidelinePage(guidelineCarouselPage)}
                                                aria-label={`Enlarge Oro Journal guidelines page ${guidelineCarouselPage + 1}`}
                                                initial={{ opacity: 0, x: 22, rotate: 1 }}
                                                animate={{ opacity: 1, x: 0, rotate: 0 }}
                                                exit={{ opacity: 0, x: -22, rotate: -1 }}
                                                transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                                                className="group relative h-full w-full overflow-hidden rounded-sm border border-black/10 bg-[#f6f1e4] p-2 shadow-[0_24px_50px_rgba(0,0,0,0.36)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#e5c76f] focus-visible:ring-offset-4 focus-visible:ring-offset-[#10271f] sm:p-3"
                                            >
                                                <img
                                                    src={authorGuidelinesPages[guidelineCarouselPage]}
                                                    alt={`Oro Journal author guidelines page ${guidelineCarouselPage + 1}`}
                                                    className="h-full w-full object-contain"
                                                />
                                                <span className="absolute inset-x-0 bottom-0 flex translate-y-full items-center justify-center gap-2 bg-[#10271f]/95 px-4 py-3 text-[10px] font-bold uppercase tracking-[0.16em] text-white transition-transform group-hover:translate-y-0 group-focus-visible:translate-y-0">
                                                    <span aria-hidden="true">↗</span> Click to enlarge
                                                </span>
                                            </motion.button>
                                        </AnimatePresence>
                                        <div className="absolute -left-4 top-5 flex h-12 w-12 items-center justify-center rounded-full border border-[#e5c76f]/50 bg-[#17372b] font-serif text-sm text-[#e5c76f] shadow-lg sm:-left-6 sm:h-14 sm:w-14">
                                            {String(guidelineCarouselPage + 1).padStart(2, '0')}
                                        </div>
                                        <span className="absolute -bottom-5 right-4 font-serif text-xs italic tracking-wide text-white/60 sm:right-0">
                                            Oro Journal · Official guidelines
                                        </span>
                                    </div>
                                </div>

                                <div className="flex flex-col border-t border-white/10 bg-black/10 p-6 sm:p-9 lg:border-l lg:border-t-0 lg:p-10">
                                    <div className="flex items-center justify-between">
                                        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#e5c76f]">
                                            The author’s handbook
                                        </span>
                                        <span className="rounded-full border border-white/15 px-3 py-1 text-[10px] font-semibold text-white/65">
                                            2026 edition
                                        </span>
                                    </div>
                                    <h3 className="mt-6 max-w-xs font-serif text-3xl font-medium leading-tight tracking-tight text-white sm:text-4xl">
                                        Everything you need to publish with us.
                                    </h3>
                                    <p className="mt-4 max-w-sm text-sm leading-6 text-white/65">
                                        Submission requirements, manuscript preparation, and the path from draft to publication.
                                    </p>

                                    <div className="mt-8 border-t border-white/15 pt-5">
                                        <div className="flex items-end justify-between">
                                            <p aria-live="polite" className="font-serif text-lg text-white">
                                                Page {String(guidelineCarouselPage + 1).padStart(2, '0')}
                                                <span className="ml-2 text-sm text-white/45">
                                                    / {String(authorGuidelinesPages.length).padStart(2, '0')}
                                                </span>
                                            </p>
                                            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-white/45">
                                                Guidelines
                                            </p>
                                        </div>
                                        <div
                                            role="progressbar"
                                            aria-label="Guideline page progress"
                                            aria-valuemin={1}
                                            aria-valuemax={authorGuidelinesPages.length}
                                            aria-valuenow={guidelineCarouselPage + 1}
                                            className="mt-4 h-1 overflow-hidden rounded-full bg-white/15"
                                        >
                                            <motion.div
                                                className="h-full rounded-full bg-[#d8b45c]"
                                                animate={{ width: `${((guidelineCarouselPage + 1) / authorGuidelinesPages.length) * 100}%` }}
                                                transition={{ duration: 0.3 }}
                                            />
                                        </div>
                                    </div>

                                    <div className="mt-7 grid grid-cols-3 gap-2 sm:grid-cols-5 lg:grid-cols-3">
                                        {authorGuidelinesPages.map((page, index) => (
                                            <button
                                                key={page}
                                                type="button"
                                                onClick={() => setGuidelineCarouselPage(index)}
                                                aria-label={`Show guideline page ${index + 1}`}
                                                aria-current={guidelineCarouselPage === index ? 'page' : undefined}
                                                className={`group relative aspect-[4/3] overflow-hidden rounded border transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#e5c76f] ${
                                                    guidelineCarouselPage === index
                                                        ? 'border-[#e5c76f] ring-1 ring-[#e5c76f] shadow-[0_0_16px_rgba(216,180,92,0.25)]'
                                                        : 'border-white/15 opacity-55 hover:border-white/50 hover:opacity-100'
                                                }`}
                                            >
                                                <img
                                                    src={page}
                                                    alt=""
                                                    aria-hidden="true"
                                                    className="h-full w-full object-cover object-top"
                                                />
                                                <span className={`absolute inset-x-0 bottom-0 py-0.5 text-center text-[9px] font-bold ${
                                                    guidelineCarouselPage === index
                                                        ? 'bg-[#d8b45c] text-[#17251c]'
                                                        : 'bg-[#10271f]/85 text-white/80'
                                                }`}>
                                                    {String(index + 1).padStart(2, '0')}
                                                </span>
                                            </button>
                                        ))}
                                    </div>

                                    <div className="mt-auto flex items-center justify-between gap-3 pt-8">
                                        <button
                                            type="button"
                                            onClick={() =>
                                                setGuidelineCarouselPage(
                                                    (page) =>
                                                        (page - 1 + authorGuidelinesPages.length) %
                                                        authorGuidelinesPages.length,
                                                )
                                            }
                                            aria-label="Previous guideline page"
                                            className="inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-full border border-white/20 px-4 text-xs font-semibold text-white/80 transition-colors hover:border-white/50 hover:bg-white/10 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#e5c76f]"
                                        >
                                            <span aria-hidden="true">←</span> Previous
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() =>
                                                setGuidelineCarouselPage(
                                                    (page) => (page + 1) % authorGuidelinesPages.length,
                                                )
                                            }
                                            aria-label="Next guideline page"
                                            className="inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-full bg-[#d8b45c] px-4 text-xs font-bold text-[#17251c] transition-colors hover:bg-[#e6c875] focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                                        >
                                            Next <span aria-hidden="true">→</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </section>

                <AnimatePresence>
                    {activeGuidelinePage !== null && (
                        <motion.div
                            className="fixed inset-0 z-[100] flex items-center justify-center bg-[#07110c]/95 p-4 backdrop-blur-sm sm:p-8"
                            role="dialog"
                            aria-modal="true"
                            aria-label={`Oro Journal author guidelines, page ${activeGuidelinePage + 1} of ${authorGuidelinesPages.length}`}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setActiveGuidelinePage(null)}
                        >
                            <div
                                className="flex max-h-full w-full max-w-6xl flex-col items-center gap-4"
                                onClick={(event) => event.stopPropagation()}
                            >
                                <div className="flex w-full items-center justify-between text-white">
                                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/75 sm:text-sm">
                                        Guideline page {activeGuidelinePage + 1} of {authorGuidelinesPages.length}
                                    </p>
                                    <button
                                        type="button"
                                        onClick={() => setActiveGuidelinePage(null)}
                                        aria-label="Close guideline viewer"
                                        className="flex h-10 w-10 items-center justify-center rounded-full border border-white/25 text-2xl text-white transition-colors hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                                    >
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="flex min-h-0 w-full flex-1 items-center justify-center gap-3 sm:gap-6">
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setActiveGuidelinePage(
                                                (page) =>
                                                    (page - 1 + authorGuidelinesPages.length) %
                                                    authorGuidelinesPages.length,
                                            )
                                        }
                                        aria-label="Previous guideline page"
                                        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/25 bg-white/5 text-2xl text-white transition-colors hover:bg-white/15 focus:outline-none focus-visible:ring-2 focus-visible:ring-white sm:h-14 sm:w-14"
                                    >
                                        <span aria-hidden="true">&larr;</span>
                                    </button>
                                    <img
                                        src={authorGuidelinesPages[activeGuidelinePage]}
                                        alt={`Oro Journal author guidelines page ${activeGuidelinePage + 1}`}
                                        className="max-h-[calc(100vh-170px)] min-h-0 max-w-[calc(100%-6rem)] object-contain shadow-2xl sm:max-w-[calc(100%-10rem)]"
                                    />
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setActiveGuidelinePage(
                                                (page) => (page + 1) % authorGuidelinesPages.length,
                                            )
                                        }
                                        aria-label="Next guideline page"
                                        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/25 bg-white/5 text-2xl text-white transition-colors hover:bg-white/15 focus:outline-none focus-visible:ring-2 focus-visible:ring-white sm:h-14 sm:w-14"
                                    >
                                        <span aria-hidden="true">&rarr;</span>
                                    </button>
                                </div>
                                <p className="text-xs text-white/50">
                                    Use the arrow keys to browse pages, or press Escape to close.
                                </p>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
                </>
                )}

                {activeContentTab === 'review' && (
                <section id="review" className="scroll-mt-20 bg-[#142a21] px-6 py-12 text-white sm:px-10 sm:py-16 lg:px-16">
                    <motion.div {...sectionMotion} className="mx-auto max-w-[1240px]">
                        <SectionHeading
                            eyebrow="Editorial and Peer Review Process"
                            title="Editorial and Peer Review Process"
                            light
                        />
                        <div className="relative grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                            <div aria-hidden="true" className="absolute left-8 right-8 top-8 hidden h-px bg-gradient-to-r from-[#d8b45c]/50 via-white/15 to-[#d8b45c]/50 xl:block" />
                            {reviewSteps.map((step, index) => (
                                <motion.article
                                    key={step.title}
                                    initial={{ opacity: 0, y: 22 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, amount: 0.18 }}
                                    transition={{ duration: 0.5, delay: (index % 3) * 0.08 }}
                                    className="relative border border-white/10 bg-white/[0.045] p-6 backdrop-blur-sm sm:p-7"
                                >
                                    <span className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full border border-[#d8b45c]/50 bg-[#142a21] font-serif text-sm text-[#e3c878]">
                                        {String(index + 1).padStart(2, '0')}
                                    </span>
                                    <h3 className="mt-6 font-serif text-xl text-white">{step.title}</h3>
                                    <p className="mt-3 text-sm leading-6 text-white/60">{step.description}</p>
                                </motion.article>
                            ))}
                        </div>
                        <div className="mt-6 grid gap-4 border border-white/10 bg-white/[0.04] p-6 sm:grid-cols-2 sm:p-8">
                            <div>
                                <p className="text-xs font-bold uppercase tracking-[0.17em] text-[#d8b45c]">Revision periods</p>
                                <p className="mt-3 text-sm leading-6 text-white/75">
                                    Minor revisions are ordinarily due within two weeks; major revisions within
                                    four weeks. Extensions may be requested before the deadline. A revision
                                    invitation does not guarantee acceptance.
                                </p>
                            </div>
                            <div className="sm:border-l sm:border-white/10 sm:pl-8">
                                <p className="text-xs font-bold uppercase tracking-[0.17em] text-[#d8b45c]">Final decision</p>
                                <p className="mt-3 text-sm leading-6 text-white/75">
                                    The Editor-in-Chief or duly authorized independent editor makes the final publication decision.
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </section>
                )}

                {activeContentTab === 'ethics' && (
                <section id="ethics" className="scroll-mt-20 bg-[#f8f7f2] px-6 py-12 sm:px-10 sm:py-16 lg:px-16">
                    <motion.div {...sectionMotion} className="mx-auto grid max-w-[1240px] gap-12 lg:grid-cols-[0.75fr_1.25fr]">
                        <div>
                            <SectionHeading
                                eyebrow="Publication Ethics and Policies"
                                title="Publication Ethics and Policies"
                                description="OJSDR upholds ethical publishing, transparent authorship and contributions, research ethics and informed consent, conflicts-of-interest disclosure, data availability, originality, responsible use of artificial intelligence, confidentiality in peer review, and editorial independence. Allegations of misconduct are assessed confidentially and fairly. Formal appeals, corrections, expressions of concern, and retractions are handled as warranted, with appropriate public notices."
                            />
                        </div>
                        <div className="grid gap-3 border-t border-[#dedfd7] pt-6 sm:grid-cols-3 lg:col-span-2">
                            <p className="bg-white p-5 text-sm leading-7 text-[#59675d]">
                                <strong className="block text-xs uppercase tracking-[0.14em] text-[#9a7125]">Open Access</strong>
                                OJSDR adopts CC BY 4.0, permitting reuse and distribution with appropriate attribution.
                            </p>
                            <p className="bg-white p-5 text-sm leading-7 text-[#59675d]">
                                <strong className="block text-xs uppercase tracking-[0.14em] text-[#9a7125]">Publication Fees</strong>
                                OJSDR currently imposes no submission, peer-review, processing, or publication fees.
                            </p>
                            <p className="bg-white p-5 text-sm leading-7 text-[#59675d]">
                                <strong className="block text-xs uppercase tracking-[0.14em] text-[#9a7125]">Editorial Independence</strong>
                                Institutional management does not override editorial decisions or confer preferential treatment.
                            </p>
                        </div>
                    </motion.div>
                </section>
                )}

                {activeContentTab === 'boards' && (
                <section id="boards" className="scroll-mt-20 bg-[#f8f7f2] px-4 py-10 sm:px-8 sm:py-16 lg:px-16">
                    <motion.div {...sectionMotion} className="mx-auto max-w-[1240px]">
                        <SectionHeading
                            eyebrow="Editorial Governance"
                            title="The people behind the journal"
                            description="Our editorial and advisory boards bring together academic leadership, publication expertise, and international perspectives to guide the Oro Journal."
                        />
                        <div className="mb-8 overflow-hidden rounded-2xl bg-[#17372b] p-5 text-white shadow-[0_16px_40px_rgba(23,55,43,0.12)] sm:p-7 lg:flex lg:items-center lg:justify-between lg:gap-8">
                            <div className="min-w-0">
                                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#e5c76f]">Meet the board</p>
                                <p className="mt-2 font-serif text-2xl font-semibold sm:text-3xl">
                                    {activeBoard === 'editorial' ? 'Editorial Board' : 'Advisory Board'}
                                </p>
                                <p className="mt-2 max-w-2xl text-sm leading-6 text-white/70">
                                    {activeBoard === 'editorial'
                                        ? 'Editorial leadership, peer review, and manuscript preparation.'
                                        : 'Institutional and international guidance for research and publication.'}
                                </p>
                            </div>
                            <div
                                className="mt-5 grid w-full grid-cols-2 rounded-xl border border-white/15 bg-white/5 p-1 sm:inline-flex lg:mt-0 lg:w-auto lg:shrink-0"
                                role="tablist"
                                aria-label="Journal boards"
                            >
                                {[
                                    { id: 'editorial', label: 'Editorial Board', shortLabel: 'Editorial', count: editorialBoard.length },
                                    { id: 'advisory', label: 'Advisory Board', shortLabel: 'Advisory', count: advisoryBoard.length },
                                ].map((board) => {
                                    const isActive = activeBoard === board.id;

                                    return (
                                        <button
                                            key={board.id}
                                            type="button"
                                            role="tab"
                                            id={`journal-board-tab-${board.id}`}
                                            aria-selected={isActive}
                                            aria-controls="journal-board-panel"
                                            onClick={() => setActiveBoard(board.id)}
                                            className={`flex min-h-11 min-w-0 items-center justify-center gap-1.5 rounded-lg px-2 text-[10px] font-bold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#e5c76f] sm:gap-2 sm:px-4 sm:text-xs ${
                                                isActive
                                                    ? 'bg-[#f1d88a] text-[#17372b] shadow-sm'
                                                    : 'text-white/75 hover:bg-white/10 hover:text-white'
                                            }`}
                                        >
                                            <span className="sm:hidden">{board.shortLabel}</span>
                                            <span className="hidden sm:inline">{board.label}</span>
                                            <span className="tabular-nums">{String(board.count).padStart(2, '0')}</span>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                        <div
                            id="journal-board-panel"
                            role="tabpanel"
                            aria-labelledby={`journal-board-tab-${activeBoard}`}
                            tabIndex={0}
                        >
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeBoard}
                                    initial={{ opacity: 0, y: 12 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -8 }}
                                    transition={{ duration: 0.25 }}
                                    className="space-y-8 sm:space-y-10"
                                >
                                    {groupBoardMembers(activeBoard === 'editorial' ? editorialBoard : advisoryBoard).map((group) => (
                                        <section key={group.role} aria-label={group.role}>
                                            <div className="mb-3 flex items-center gap-3 sm:mb-4">
                                                <h3 className="shrink-0 text-[10px] font-bold uppercase tracking-[0.16em] text-[#8b712f] sm:text-xs">
                                                    {group.role}
                                                </h3>
                                                <span aria-hidden="true" className="h-px flex-1 bg-[#dedfd7]" />
                                                <span className="shrink-0 rounded-full bg-[#e9eee8] px-2.5 py-1 text-[10px] font-semibold tabular-nums text-[#53645a]">
                                                    {String(group.members.length).padStart(2, '0')}
                                                </span>
                                            </div>
                                            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                                                {group.members.map((member) => (
                                                    <BoardMemberCard key={member.name} member={member} />
                                                ))}
                                            </div>
                                        </section>
                                    ))}
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </motion.div>
                </section>
                )}

                {activeContentTab === 'archives' && (
                <section id="current-issue" className="scroll-mt-20 bg-[#e9eee8] px-6 py-12 sm:px-10 sm:py-16 lg:px-16">
                    <motion.div {...sectionMotion} className="mx-auto max-w-[1240px]">
                        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
                            <SectionHeading
                                eyebrow="Archives"
                                title="Volume 1, Issue 1 — March 2026"
                                description="Volume 1, Issue 1 — March 2026 | Inaugural issue | Seven scholarly articles, pages 1–139. Topics include education, technology, competency development, social sciences, and environmental sustainability."
                            />
                        </div>
                        <div className="grid items-start gap-8 lg:grid-cols-[minmax(240px,0.72fr)_minmax(0,1.8fr)] lg:gap-10">
                            <div className="flex flex-col items-center lg:items-start">
                                <button
                                    type="button"
                                    aria-expanded={isIssueOpen}
                                    aria-controls="issue-contents"
                                    aria-label={`${isIssueOpen ? 'Close' : 'Open'} Volume 1, Issue 1 (2026)`}
                                    onClick={() => setIsIssueOpen((isOpen) => !isOpen)}
                                    className="group w-full max-w-[300px] text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#a77b28] focus-visible:ring-offset-4"
                                >
                                    <span className="relative block aspect-[3/4] overflow-hidden rounded-r-md border border-black/10 bg-white shadow-[5px_7px_12px_rgba(31,51,41,0.2)] transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-[9px_13px_20px_rgba(31,51,41,0.24)]">
                                        <img
                                            src={oroJournalCover}
                                            alt="Oro Journal of Sustainability and Development Research, Volume 1, Issue 1 (2026) cover"
                                            className="h-full w-full object-contain"
                                        />
                                        <span aria-hidden="true" className="absolute inset-y-0 left-0 w-3 border-r border-black/10 bg-gradient-to-r from-black/20 to-black/5" />
                                    </span>
                                    <span className="mt-4 block text-center font-serif text-lg font-semibold text-[#263d30] lg:text-left">
                                        Volume 1, No. 1 (2026)
                                    </span>
                                    <span className="mt-1 block text-center text-xs font-medium text-[#718074] lg:text-left">
                                        {isIssueOpen ? 'Click to close the issue' : 'Click to open the issue'}
                                    </span>
                                </button>
                            </div>

                            <div className="min-h-[280px]">
                                <AnimatePresence mode="wait">
                                    {isIssueOpen ? (
                                        <motion.article
                                            key="issue-contents"
                                            id="issue-contents"
                                            role="region"
                                            aria-label="Volume 1, Issue 1 contents"
                                            initial={{ opacity: 0, y: 14 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            transition={{ duration: 0.3 }}
                                            className="relative overflow-hidden rounded-r-lg border border-[#d8caa4] bg-[#fffdf6] shadow-[0_12px_30px_rgba(71,57,31,0.15)]"
                                        >
                                            <div aria-hidden="true" className="absolute inset-y-0 left-0 w-3 bg-gradient-to-r from-[#b79d67] to-[#e8dcbd]" />
                                            <div className="grid md:grid-cols-[0.8fr_1.2fr]">
                                                <div className="flex min-h-[280px] flex-col justify-center border-b border-[#e7dfce] bg-gradient-to-br from-[#faf7ec] to-[#f0ead9] py-8 pl-9 pr-7 md:border-b-0 md:border-r md:border-[#e2d9c5] md:py-10 md:pl-11">
                                                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#9a7125]">
                                                        Oro Journal · Inaugural issue
                                                    </p>
                                                    <h3 className="mt-4 font-serif text-2xl font-semibold leading-tight text-[#263d30] sm:text-3xl">
                                                        Volume 1,<br />Issue 1
                                                    </h3>
                                                    <p className="mt-3 font-serif text-sm italic text-[#68766d]">
                                                        March 2026
                                                    </p>
                                                    <div className="mt-8 border-t border-[#d8caa4] pt-5">
                                                        <p className="text-xs leading-6 text-[#68766d]">
                                                            Seven scholarly articles, pages 1–139. Topics include education, technology, competency development, social sciences, and environmental sustainability.
                                                        </p>
                                                        <p className="mt-4 text-[10px] font-bold uppercase tracking-[0.16em] text-[#9a7125]">
                                                            Pages 1–139
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className="py-7 pl-8 pr-6 sm:py-9 sm:pl-10 sm:pr-8">
                                                    <div className="flex items-center gap-3">
                                                        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#9a7125]">
                                                            Inside this issue
                                                        </span>
                                                        <span aria-hidden="true" className="h-px flex-1 bg-[#e2d9c5]" />
                                                        <span className="font-serif text-xs text-[#9a7125]">Contents</span>
                                                    </div>
                                                    <ol className="mt-5 divide-y divide-[#ebe5d8]">
                                                        {inauguralArticles.map((article, index) => (
                                                            <li key={article.doi} className="py-4 first:pt-0 last:pb-0">
                                                                <div className="flex items-start gap-3">
                                                                    <span className="mt-0.5 shrink-0 font-serif text-sm text-[#a17a30]">
                                                                        {String(index + 1).padStart(2, '0')}
                                                                    </span>
                                                                    <div className="min-w-0">
                                                                        <h4 className="font-serif text-sm font-semibold leading-6 text-[#263d30] sm:text-base">
                                                                            {article.title}
                                                                        </h4>
                                                                        <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-2">
                                                                            <a
                                                                                href={`https://doi.org/${article.doi}`}
                                                                                target="_blank"
                                                                                rel="noreferrer"
                                                                                className="break-all text-[11px] font-medium text-[#657467] underline decoration-[#c4cdbf] underline-offset-4 transition-colors hover:text-[#9a7125]"
                                                                            >
                                                                                DOI: {article.doi}
                                                                            </a>
                                                                            <a
                                                                                href={article.pdf}
                                                                                target="_blank"
                                                                                rel="noreferrer"
                                                                                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#956f28] transition-colors hover:text-[#694b16]"
                                                                            >
                                                                                Read article <ExternalArrow />
                                                                            </a>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </li>
                                                        ))}
                                                    </ol>
                                                </div>
                                            </div>
                                        </motion.article>
                                    ) : (
                                        <motion.div
                                            key="issue-prompt"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            transition={{ duration: 0.2 }}
                                            className="flex min-h-[280px] items-center justify-center border border-dashed border-[#cbd4c8] bg-white/45 p-8 text-center"
                                        >
                                            <div>
                                                <span aria-hidden="true" className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-[#d8caa4] font-serif text-xl text-[#a17a30]">
                                                    O
                                                </span>
                                                <h3 className="mt-4 font-serif text-xl font-semibold text-[#263d30]">
                                                    Open the issue
                                                </h3>
                                                <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-[#68766d]">
                                                    Select the journal cover to browse the table of contents and open any article.
                                                </p>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>
                        <div className="mt-10 grid gap-5 border-t border-[#cbd6c8] pt-6 md:grid-cols-[0.4fr_1fr]">
                            <h3 className="text-xs font-bold uppercase tracking-[0.18em] text-[#9a7125]">
                                Indexing and Discoverability
                            </h3>
                            <p className="text-sm leading-7 text-[#647268]">
                                OJSDR uses Knowledge Commons to support open-access dissemination and research visibility.
                            </p>
                        </div>
                    </motion.div>
                </section>
                )}

                {activeContentTab === 'contact' && (
                <section id="contact" className="scroll-mt-20 bg-[#f8f7f2] px-6 py-12 sm:px-10 sm:py-16 lg:px-16">
                    <motion.div
                        {...sectionMotion}
                        className="mx-auto grid max-w-[1240px] gap-10 border-y border-[#d8d9d0] py-12 lg:grid-cols-[1fr_0.8fr] lg:items-center"
                    >
                        <div>
                            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#9a7125]">Publisher and Contact</p>
                            <h2 className="mt-3 font-serif text-3xl text-[#17372b] sm:text-4xl">
                                City College of Cagayan de Oro
                            </h2>
                            <p className="mt-4 max-w-2xl text-sm leading-7 text-[#68766d]">
                                Zone 2, Barangay Agusan, Cagayan de Oro City, Misamis Oriental 9000, Philippines
                            </p>
                        </div>
                        <div className="space-y-4 border-l-2 border-[#b18b43] pl-6">
                            <div>
                                <p className="text-[10px] font-bold uppercase tracking-[0.17em] text-[#9a7125]">Email</p>
                                <p className="mt-1 break-all text-sm font-semibold text-[#293f32]">cccdoofficeofresearch@gmail.com</p>
                            </div>
                            <div>
                                <p className="text-[10px] font-bold uppercase tracking-[0.17em] text-[#9a7125]">Telephone</p>
                                <p className="mt-1 text-sm font-semibold text-[#293f32]">+63 917 677 1881</p>
                            </div>
                        </div>
                    </motion.div>
                    <p className="mx-auto mt-8 max-w-[1240px] text-[10px] leading-5 text-[#879087]">
                        Oro Journal of Sustainability and Development Research · City College of Cagayan de Oro · Open access under CC BY 4.0
                    </p>
                </section>
                    )}
                        </motion.div>
                </div>
            </main>
            </MotionConfig>
        </MainLayout>
    );
}
