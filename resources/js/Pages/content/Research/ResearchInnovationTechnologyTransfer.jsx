import { useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import MainLayout from '../../../layouts/MainLayout';
import AnimatedBannerText from '../../../components/content/AnimatedBannerText';
import researchBannerImg from '../../../assets/banner/coregoals-banner.png';
import joelPotanePhoto from '../../../assets/images/JOEL_POTANE.png';
import higalaay2024Cover from '../../../assets/RITTS/Higalaay Multidisciplinary Research Abstract Vol 1 No.1 (2024).png';
import higalaay2025Cover from '../../../assets/RITTS/Higalaay Multidisciplinary Research Abstract Vol 2 No.1 (2025).png';
import mindanaoJournal2026Cover from '../../../assets/RITTS/Mindanao Journal of Alternative Education Studies Vol. 3 No.1 (2026).png';
import oroJournal2026Cover from '../../../assets/RITTS/Oro Journal of Sustainability and Development Research Vol. 1 No. 1 (2026).png';
import higalaay2024Pdf from '../../../assets/RITTS/HIGALAAY/Higalaay-Multidisciplinary-Research-Abstract-2024.pdf';
import higalaay2025Pdf from '../../../assets/RITTS/HIGALAAY/Higalaay-Multidisciplinary-Research-Abstracts-2025.pdf';
import mjaesPdf01 from '../../../assets/RITTS/MJAE/MJAES-01.pdf';
import mjaesPdf02 from '../../../assets/RITTS/MJAE/MJAES-02.pdf';
import mjaesPdf03 from '../../../assets/RITTS/MJAE/MJAES-03.pdf';
import mjaesPdf04 from '../../../assets/RITTS/MJAE/MJAES-04.pdf';
import mjaesPdf05 from '../../../assets/RITTS/MJAE/MJAES-05.pdf';
import mjaesPdf06 from '../../../assets/RITTS/MJAE/MJAES-06.pdf';
import mjaesPdf07 from '../../../assets/RITTS/MJAE/MJAES-07.pdf';
import mjaesPdf08 from '../../../assets/RITTS/MJAE/MJAES-08.pdf';
import mjaesPdf09 from '../../../assets/RITTS/MJAE/MJAES-09.pdf';
import ojsrPdf00 from '../../../assets/RITTS/OJSR/OJSR-00.pdf';
import ojsrPdf01 from '../../../assets/RITTS/OJSR/OJSR-01.pdf';
import ojsrPdf02 from '../../../assets/RITTS/OJSR/OJSR-02.pdf';
import ojsrPdf03 from '../../../assets/RITTS/OJSR/OJSR-03.pdf';
import ojsrPdf04 from '../../../assets/RITTS/OJSR/OJSR-04.pdf';
import ojsrPdf05 from '../../../assets/RITTS/OJSR/OJSR-05.pdf';
import ojsrPdf06 from '../../../assets/RITTS/OJSR/OJSR-06.pdf';
import ojsrPdf07 from '../../../assets/RITTS/OJSR/OJSR-07.pdf';

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

const tabs = [
    { id: 'about', label: 'Bionote', shortLabel: 'Bionote' },
    { id: 'editorial-board', label: 'Editorial Board', shortLabel: 'Board' },
    { id: 'advisory-board', label: 'Advisory Board', shortLabel: 'Advisory' },
];

const mjaesArticles = [
    {
        title: "Institutional and Learners' Perspectives on the Implementation of ALS SHS Programs in Jail Facilities: A Qualitative Inquiry",
        doi: '10.17613/menyd-b0109',
        pdf: mjaesPdf01,
    },
    {
        title: 'Project ABANIL: Bridging Foundational Learning Gaps to Improve Accreditation and Equivalency Performance among ALS Learners',
        doi: '10.17613/z7f44-mcj96',
        pdf: mjaesPdf02,
    },
    {
        title: 'Integrating Digital Tools in the Alternative Learning System: A Quasi-Experimental Study on Digital Citizenship and Learner Performance',
        doi: '10.17613/x029n-29d36',
        pdf: mjaesPdf03,
    },
    {
        title: 'Improving Learner Completion in the Alternative Learning System: Evidence-Based Inputs for an Intervention Program in SDO Misamis Occidental',
        doi: '10.17613/k4823-26s13',
        pdf: mjaesPdf04,
    },
    {
        title: 'Assessing Blended Learning Readiness among ALS Senior High School Learners: Evidence from Bukidnon Province',
        doi: '10.17613/yql7d-qxb28',
        pdf: mjaesPdf05,
    },
    {
        title: 'An Ecological Systems Analysis of Functional Literacy and Learning Gaps among Non-Enrolled Populations in Northern Mindanao',
        doi: '10.17613/tssn9-fv992',
        pdf: mjaesPdf06,
    },
    {
        title: 'Understanding the Challenges of ALS Delivery: A Three-Domain Analysis of Teaching, Resources, and Learner Mindsets',
        doi: '10.17613/bqf33-epf68',
        pdf: mjaesPdf07,
    },
    {
        title: 'Lived Experiences of Students and Implementers in the Pilot Implementation of the Academic-Focused Bridging Program',
        doi: '10.17613/2kpj4-ztb68',
        pdf: mjaesPdf08,
    },
    {
        title: 'Mental Well-Being and A&E Test Readiness among Alternative Learning System Learners',
        doi: '10.17613/9vkl9m-kad12',
        pdf: mjaesPdf09,
    },
];

const ojsrArticles = [
    {
        title: 'Oro Journal of Sustainability and Development Research',
        doi: '10.17613/bkpje-lqr97',
        pdf: ojsrPdf00,
    },
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

const researchPublications = [
    {
        id: 'higalaay',
        label: 'Higalaay Multidisciplinary Research Abstract',
        shortLabel: 'Higalaay Abstract',
        books: [
            {
                id: 'higalaay-2024',
                title: 'Higalaay Multidisciplinary Research Abstract',
                edition: 'Volume 1, No. 1',
                year: '2024',
                cover: higalaay2024Cover,
                pdf: higalaay2024Pdf,
                doi: '—',
                issn: '—',
            },
            {
                id: 'higalaay-2025',
                title: 'Higalaay Multidisciplinary Research Abstract',
                edition: 'Volume 2, No. 1',
                year: '2025',
                cover: higalaay2025Cover,
                pdf: higalaay2025Pdf,
                doi: '10.17613/menyd-b0109',
                issn: '3082-5970',
            },
        ],
    },
    {
        id: 'mjaes',
        label: 'Mindanao Journal of Alternative Education Studies',
        shortLabel: 'Mindanao Journal',
        books: [
            {
                id: 'mjaes-2026',
                title: 'Mindanao Journal of Alternative Education Studies',
                edition: 'Volume 3, No. 1',
                year: '2026',
                cover: mindanaoJournal2026Cover,
                articles: mjaesArticles,
            },
        ],
    },
    {
        id: 'oro-journal',
        label: 'Oro Journal of Sustainability and Development Research',
        shortLabel: 'Oro Journal',
        books: [
            {
                id: 'oro-2026',
                title: 'Oro Journal of Sustainability and Development Research',
                edition: 'Volume 1, No. 1',
                year: '2026',
                cover: oroJournal2026Cover,
                articles: ojsrArticles,
            },
        ],
    },
];

function BoardMemberCard({ member, index }) {
    const nameParts = member.name
        .split(',')[0]
        .replace(/\b(Dr|Mr|Ms)\.?\s*/gi, '')
        .trim()
        .split(/\s+/);
    const initials = `${nameParts[0]?.[0] || ''}${nameParts[nameParts.length - 1]?.[0] || ''}`.toUpperCase();

    return (
        <motion.article
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: Math.min(index * 0.02, 0.16) }}
            className="group flex min-h-[88px] items-center gap-3 rounded-xl border border-gray-200 border-l-4 border-l-[#157d3c] bg-white p-4 shadow-sm transition-shadow duration-200 hover:shadow-md"
        >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#f0f7f2] text-xs font-bold text-[#157d3c] ring-1 ring-[#157d3c]/10 transition-colors group-hover:bg-[#157d3c] group-hover:text-white">
                {initials}
            </div>
            <div className="min-w-0 flex-1">
                <h3 className="text-sm font-bold leading-snug text-[#173b27]">
                    {member.name}
                </h3>
                <p className="mt-1 text-xs font-medium text-gray-500">
                    {member.role}
                </p>
            </div>
            <span className="self-start text-[10px] font-semibold tabular-nums text-gray-400">
                {String(index + 1).padStart(2, '0')}
            </span>
        </motion.article>
    );
}

export default function ResearchInnovationTechnologyTransfer() {
    const [activeTab, setActiveTab] = useState(tabs[0].id);
    const [activePublication, setActivePublication] = useState(researchPublications[0].id);
    const [activeBookId, setActiveBookId] = useState(null);
    const bookContentRef = useRef(null);

    const currentPublication = researchPublications.find(
        (publication) => publication.id === activePublication,
    );
    const activeBook = currentPublication?.books.find((book) => book.id === activeBookId);
    const activeBoardMembers = activeTab === 'editorial-board' ? editorialBoard : advisoryBoard;

    return (
        <MainLayout
            maxWidth="full"
            containerClassName="px-0"
            mainClassName="py-0"
            className="overflow-hidden pb-0"
        >
            <div
                className="relative flex min-h-[350px] w-full items-center justify-center bg-cover bg-center bg-no-repeat shadow-lg md:min-h-[450px] lg:min-h-[550px]"
                style={{ backgroundImage: `url('${researchBannerImg}')` }}
            >
                <div className="absolute inset-0 bg-black/50" />
                <AnimatedBannerText
                    title="Research, Innovation, and Technology Transfer Services"
                    description="Supporting research coordination, innovation, and technology transfer at City College of Cagayan de Oro."
                />
            </div>

            <div className="mx-auto w-full max-w-[1600px] px-6 py-14 sm:px-10 md:py-20 lg:px-16 xl:px-20">
                <motion.div
                    className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-shadow duration-300 hover:shadow-xl"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
                >
                    <div className="flex flex-col items-start gap-10 p-8 md:flex-row md:p-10 lg:gap-14 lg:p-14">
                        <div className="mx-auto flex w-full shrink-0 flex-col gap-8 md:mx-0 md:w-80 lg:w-96">
                            <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
                                <div className="flex aspect-[4/5] w-full items-center justify-center bg-white p-2">
                                    <img
                                        src={joelPotanePhoto}
                                        alt="Dr. Joel D. Potane"
                                        className="h-full w-full object-contain"
                                    />
                                </div>
                                <div className="border-t-4 border-[#f5c518] bg-white px-4 py-4 text-center">
                                    <p className="m-0 text-sm font-bold uppercase tracking-wide text-[#157d3c] sm:text-base md:text-lg">
                                        Dr. Joel D. Potane
                                    </p>
                                    <p className="mt-1 text-xs font-semibold leading-tight text-[#1a1a1a] sm:text-sm md:text-base">
                                        Director of Research, Innovation, and Technology Transfer Services
                                    </p>
                                    <a
                                        href="https://orcid.org/0000-0003-0210-8149"
                                        target="_blank"
                                        rel="noreferrer"
                                        className="mt-3 inline-flex items-center gap-2 rounded-full bg-[#f0f7f2] px-3 py-1.5 text-xs font-semibold text-[#157d3c] transition-colors hover:bg-[#e3f1e7]"
                                    >
                                        <span className="flex h-4 w-4 items-center justify-center rounded-full bg-[#a6ce39] text-[9px] font-bold text-white">
                                            iD
                                        </span>
                                        ORCID: 0000-0003-0210-8149
                                    </a>
                                </div>
                            </div>

                            <div className="rounded-xl border border-[#157d3c] bg-[#157d3c] p-6 shadow-sm">
                                <div className="mb-5 flex flex-col items-start text-left">
                                    <h3 className="m-0 text-lg font-extrabold tracking-tight text-white">
                                        Contact <span className="text-[#f5c518]">Us</span>
                                    </h3>
                                    <div className="mt-2 h-1 w-12 rounded-full bg-[#f5c518]" />
                                </div>

                                <ul className="space-y-3.5 text-sm text-white">
                                    <li className="flex items-start gap-2.5">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="#f5c518"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            className="mt-0.5 h-4 w-4 shrink-0"
                                            aria-hidden="true"
                                        >
                                            <rect width="20" height="16" x="2" y="4" rx="2" />
                                            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                                        </svg>
                                        <span>
                                            <strong>Email: </strong>
                                            <a
                                                href="mailto:cccdoofficeofresearch@gmail.com"
                                                className="break-all underline decoration-white/60 underline-offset-2 hover:text-[#f5c518]"
                                            >
                                                cccdoofficeofresearch@gmail.com
                                            </a>
                                        </span>
                                    </li>
                                    <li className="flex items-start gap-2.5">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="#f5c518"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            className="mt-0.5 h-4 w-4 shrink-0"
                                            aria-hidden="true"
                                        >
                                            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                                        </svg>
                                        <span>
                                            <strong>Messenger: </strong>
                                            <a
                                                href="https://m.me/519668507885653"
                                                target="_blank"
                                                rel="noreferrer"
                                                className="underline decoration-white/60 underline-offset-2 hover:text-[#f5c518]"
                                            >
                                                Research, Innovation &amp; Technology Transfer - City College CDO
                                            </a>
                                        </span>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className="min-w-0 w-full flex-1">
                            <div className="-mx-8 -mt-8 mb-8 border-b border-gray-200 bg-[#f0f7f2] md:-mx-10 md:-mt-10 lg:-mx-14 lg:-mt-14">
                                <div
                                    className="flex w-full items-stretch overflow-x-auto"
                                    role="tablist"
                                    aria-label="Research services information"
                                >
                                    {tabs.map((tab) => {
                                        const isActive = activeTab === tab.id;
                                        return (
                                            <button
                                                key={tab.id}
                                                type="button"
                                                role="tab"
                                                id={`research-tab-${tab.id}`}
                                                aria-selected={isActive}
                                                aria-controls={`research-panel-${tab.id}`}
                                                onClick={() => setActiveTab(tab.id)}
                                                className={`relative flex-1 shrink-0 whitespace-nowrap px-6 py-5 text-sm font-semibold tracking-wide transition-colors duration-200 focus:outline-none ${
                                                    isActive
                                                        ? 'bg-[#157d3c] text-white'
                                                        : 'bg-transparent text-gray-600 hover:bg-[#f5c518] hover:text-[#1a1a1a]'
                                                }`}
                                            >
                                                <span className="hidden sm:inline">{tab.label}</span>
                                                <span className="sm:hidden">{tab.shortLabel}</span>
                                                {isActive && (
                                                    <motion.span
                                                        layoutId="activeResearchTabIndicator"
                                                        className="absolute bottom-0 left-0 right-0 h-1 rounded-t-full bg-[#f5c518]"
                                                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                                                    />
                                                )}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            <AnimatePresence mode="wait">
                                <motion.section
                                    key={activeTab}
                                    role="tabpanel"
                                    id={`research-panel-${activeTab}`}
                                    aria-labelledby={`research-tab-${activeTab}`}
                                    initial={{ opacity: 0, y: 15 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <h2 className="m-0 mb-4 text-center text-2xl font-extrabold tracking-tight text-[#1a1a1a] md:text-3xl">
                                        {activeTab === 'about' ? (
                                            <>
                                                Bio <span className="text-[#157d3c]">Note</span>
                                            </>
                                        ) : activeTab === 'editorial-board' ? (
                                            <>
                                                Editorial <span className="text-[#157d3c]">Board</span>
                                            </>
                                        ) : (
                                            <>
                                                Advisory <span className="text-[#157d3c]">Board</span>
                                            </>
                                        )}
                                    </h2>
                                    <div className="mx-auto mb-6 h-1 w-16 rounded-full bg-[#f5c518]" />

                                    {activeTab === 'about' ? (
                                        <div className="mx-auto max-w-3xl">
                                            <p className="mb-4 text-sm font-bold uppercase tracking-widest text-[#157d3c]">
                                                Bionote
                                            </p>
                                            <p className="mb-4 text-justify leading-relaxed text-gray-700">
                                                <strong className="text-[#1a1a1a]">Dr. Joel D. Potane</strong> is
                                                the Director of Research, Innovation, and Technology Transfer
                                                Services (RITTS) at the City College of Cagayan de Oro. He
                                                began his career as a science teacher and mentor in science
                                                investigatory projects before joining the Department of
                                                Education, where he served as a Senior Education Program
                                                Specialist for Research and Division Science Coordinator,
                                                spearheading research capacity-building programs and science
                                                education initiatives.
                                            </p>
                                            <p className="mb-4 text-justify leading-relaxed text-gray-700">
                                                He is an Associate Member of the National Research Council of
                                                the Philippines (NRCP), a Japan International Cooperation
                                                Agency (JICA) Fellow, a Fellow of the Royal Institute of
                                                Educators, Singapore, and Vice President for Division Affairs
                                                of the Academic Doctors&apos; Circle, Inc. His international
                                                engagements include JICA programs on disaster science,
                                                education, and the Sustainable Development Goals in Japan and
                                                the 2025 CommTECH Camp Insight at Institut Teknologi Sepuluh
                                                Nopember (ITS), Indonesia, where his international team
                                                received the Best Idea Award.
                                            </p>
                                            <p className="mb-4 text-justify leading-relaxed text-gray-700">
                                                An active researcher and academic leader, Dr. Potane has
                                                presented research in Japan, Thailand, Indonesia, Malaysia,
                                                and the Philippines, published in peer-reviewed and indexed
                                                journals, and served as a journal reviewer and editorial
                                                board member. He currently co-leads a nationwide Teacher
                                                Education Council (TEC)-funded research project on mentorship
                                                among pre-service teachers involving teacher education
                                                institutions across the Philippines.
                                            </p>
                                            <p className="text-justify leading-relaxed text-gray-700">
                                                His research teams have earned several distinctions,
                                                including four First Place Best Paper Awards in 2025 at
                                                national and international conferences and a 2026 Best Paper
                                                Award for research on climate change courseware. He is also a
                                                passer of the Career Executive Service (CES) Written
                                                Examination and the Licensure Examination for Teachers (LET).
                                                His work centers on research, science education, innovation,
                                                technology, sustainability, and research capacity building.
                                            </p>
                                        </div>
                                    ) : (
                                        <>
                                            <div className="mx-auto mb-7 flex max-w-5xl flex-wrap items-center justify-center gap-3 text-center">
                                                <p className="text-sm leading-6 text-gray-600">
                                                    {activeTab === 'editorial-board'
                                                        ? 'Meet the editors supporting the quality and integrity of our scholarly publications.'
                                                        : 'Meet the advisors and collaborators contributing expertise to research and publication.'}
                                                </p>
                                                <span className="rounded-full border border-[#f5c518]/60 bg-[#fff9df] px-3 py-1 text-xs font-bold text-[#765d12]">
                                                    {activeBoardMembers.length} members
                                                </span>
                                            </div>
                                            <div className="mx-auto grid max-w-5xl gap-4 sm:grid-cols-2 xl:grid-cols-3">
                                                {activeBoardMembers.map((member, index) => (
                                                    <BoardMemberCard
                                                        key={member.name}
                                                        member={member}
                                                        index={index}
                                                        boardType={activeTab === 'editorial-board' ? 'Editorial Board' : 'Advisory Board'}
                                                    />
                                                ))}
                                            </div>
                                        </>
                                    )}
                                </motion.section>
                            </AnimatePresence>
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    className="mt-14 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm md:mt-20"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.15 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                >
                    <div className="border-b border-gray-200 bg-[#f0f7f2]">
                        <div
                            role="tablist"
                            aria-label="Research publications"
                            className="flex w-full items-stretch overflow-x-auto"
                        >
                            {researchPublications.map((publication) => {
                                const isActive = activePublication === publication.id;
                                return (
                                    <button
                                        key={publication.id}
                                        type="button"
                                        role="tab"
                                        id={`publication-tab-${publication.id}`}
                                        aria-selected={isActive}
                                        aria-controls={`publication-panel-${publication.id}`}
                                        onClick={() => {
                                            setActivePublication(publication.id);
                                            setActiveBookId(null);
                                        }}
                                        className={`relative flex-1 shrink-0 whitespace-nowrap px-6 py-5 text-sm font-semibold tracking-wide transition-colors duration-200 focus:outline-none ${
                                            isActive
                                                ? 'bg-[#157d3c] text-white'
                                                : 'bg-transparent text-gray-600 hover:bg-[#f5c518] hover:text-[#1a1a1a]'
                                        }`}
                                    >
                                        <span className="hidden lg:inline">{publication.label}</span>
                                        <span className="lg:hidden">{publication.shortLabel}</span>
                                        {isActive && (
                                            <motion.span
                                                layoutId="activePublicationTabIndicator"
                                                className="absolute bottom-0 left-0 right-0 h-1 rounded-t-full bg-[#f5c518]"
                                                transition={{
                                                    type: 'spring',
                                                    stiffness: 380,
                                                    damping: 30,
                                                }}
                                            />
                                        )}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    <div className="min-h-[180px] p-8 md:p-10 lg:p-14">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activePublication}
                                role="tabpanel"
                                id={`publication-panel-${activePublication}`}
                                aria-labelledby={`publication-tab-${activePublication}`}
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.3 }}
                            >
                                <h2 className="m-0 text-xl font-extrabold tracking-tight text-[#1a1a1a] md:text-2xl">
                                    {currentPublication?.label}
                                </h2>
                                <div className="mb-8 mt-3 h-1 w-16 rounded-full bg-[#f5c518]" />

                                <div className="grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.5fr)] lg:items-start">
                                    <div className="flex flex-wrap justify-center gap-6 sm:justify-start">
                                        {currentPublication?.books.map((book) => {
                                            const isSelected = activeBookId === book.id;

                                            return (
                                                <button
                                                    key={book.id}
                                                    type="button"
                                                    aria-pressed={isSelected}
                                                    aria-label={`Open ${book.title}, ${book.edition} (${book.year})`}
                                                    onClick={() => {
                                                        setActiveBookId(book.id);
                                                        requestAnimationFrame(() => {
                                                            requestAnimationFrame(() => {
                                                                bookContentRef.current?.scrollIntoView({
                                                                    behavior: 'smooth',
                                                                    block: 'start',
                                                                });
                                                            });
                                                        });
                                                    }}
                                                    className={`group w-56 text-left transition-transform hover:-translate-y-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#157d3c] focus-visible:ring-offset-4 sm:w-64 lg:w-60 xl:w-64 ${
                                                        isSelected ? '-translate-y-1' : ''
                                                    }`}
                                                >
                                                    <span
                                                        className="relative block aspect-[3/4] overflow-hidden rounded-r-md border border-black/10 bg-white shadow-[4px_5px_8px_rgba(0,0,0,0.2)] transition-shadow group-hover:shadow-[7px_9px_14px_rgba(0,0,0,0.25)]"
                                                    >
                                                        <img
                                                            src={book.cover}
                                                            alt={`${book.title} ${book.edition} (${book.year}) cover`}
                                                            className="h-full w-full object-contain"
                                                        />
                                                        <span className="absolute inset-y-0 left-0 w-2 border-r border-black/10 bg-black/10" />
                                                    </span>
                                                    <span className="mt-3 block text-center text-sm font-semibold leading-5 text-gray-700">
                                                        {book.edition} ({book.year})
                                                    </span>
                                                </button>
                                            );
                                        })}
                                    </div>

                                    <div ref={bookContentRef} className="scroll-mt-32">
                                    <AnimatePresence mode="wait">
                                        {activeBook ? (
                                            <motion.article
                                                key={activeBook.id}
                                                aria-live="polite"
                                                initial={{ opacity: 0, x: 12 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0, x: -12 }}
                                                transition={{ duration: 0.25 }}
                                                className="relative overflow-hidden rounded-r-xl border border-[#d8caa4] bg-[#fffdf6] shadow-[0_8px_24px_rgba(71,57,31,0.16)]"
                                            >
                                                <div className="absolute inset-y-0 left-0 w-3 bg-gradient-to-r from-[#b79d67] to-[#e8dcbd]" />
                                                <div className="flex flex-col gap-5 py-6 pl-8 pr-6 sm:flex-row sm:items-center sm:justify-between sm:py-8 sm:pl-10 sm:pr-8">
                                                    <div className="min-w-0">
                                                        <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#157d3c]">
                                                            {activeBook.edition} · {activeBook.year}
                                                        </p>
                                                        <h3 className="mt-2 font-serif text-lg font-bold leading-snug text-[#2e352d] sm:text-xl">
                                                            {activeBook.title}
                                                        </h3>
                                                        <p className="mt-2 font-serif text-sm leading-6 text-gray-600">
                                                            {activeBook.articles
                                                                ? 'Browse the articles below and open available full-text PDFs.'
                                                                : activeBook.pdf
                                                                ? 'Open the full publication to read its research abstracts and articles.'
                                                                : 'Publication details and full text will be available here soon.'}
                                                        </p>
                                                        {(activeBook.doi || activeBook.issn) && (
                                                            <dl className="mt-4 grid gap-2 text-sm sm:grid-cols-2">
                                                                <div>
                                                                    <dt className="font-semibold text-gray-700">DOI</dt>
                                                                    <dd className="mt-0.5 break-all text-gray-600">
                                                                        {activeBook.doi || '—'}
                                                                    </dd>
                                                                </div>
                                                                <div>
                                                                    <dt className="font-semibold text-gray-700">ISSN</dt>
                                                                    <dd className="mt-0.5 text-gray-600">
                                                                        {activeBook.issn || '—'}
                                                                    </dd>
                                                                </div>
                                                            </dl>
                                                        )}
                                                    </div>
                                                    {activeBook.pdf && (
                                                        <a
                                                            href={activeBook.pdf}
                                                            target="_blank"
                                                            rel="noreferrer"
                                                            className="inline-flex shrink-0 items-center justify-center gap-2 self-start rounded-md bg-[#157d3c] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#105f2e] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#157d3c] focus-visible:ring-offset-2 sm:self-center"
                                                        >
                                                            <svg
                                                                aria-hidden="true"
                                                                viewBox="0 0 24 24"
                                                                fill="none"
                                                                stroke="currentColor"
                                                                strokeWidth="2"
                                                                className="h-4 w-4"
                                                            >
                                                                <path d="M14 3h7v7" />
                                                                <path d="M10 14 21 3" />
                                                                <path d="M21 14v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5" />
                                                            </svg>
                                                            Open PDF
                                                        </a>
                                                    )}
                                                </div>
                                                {activeBook.articles && (
                                                    <div className="border-t border-[#e7dfce] bg-white/70 p-5 sm:p-7">
                                                        <h4 className="mb-4 font-serif text-base font-bold text-[#2e352d]">
                                                            Articles in this issue
                                                        </h4>
                                                        <div className="space-y-3">
                                                            {activeBook.articles.map((article, index) => (
                                                                <article
                                                                    key={article.doi}
                                                                    className="rounded-lg border border-gray-200 bg-white p-4 sm:p-5"
                                                                >
                                                                    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                                                                        <div className="min-w-0">
                                                                            <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                                                                                Article {String(index + 1).padStart(2, '0')}
                                                                            </p>
                                                                            <h5 className="mt-1 text-sm font-semibold leading-6 text-gray-800">
                                                                                {article.title}
                                                                            </h5>
                                                                            <p className="mt-2 text-sm text-gray-600">
                                                                                <span className="font-semibold text-gray-700">DOI: </span>
                                                                                <a
                                                                                    href={`https://doi.org/${article.doi}`}
                                                                                    target="_blank"
                                                                                    rel="noreferrer"
                                                                                    className="break-all text-[#157d3c] underline decoration-[#157d3c]/40 underline-offset-2 hover:text-[#105f2e]"
                                                                                >
                                                                                    {article.doi}
                                                                                </a>
                                                                            </p>
                                                                        </div>
                                                                        {article.pdf && (
                                                                            <a
                                                                                href={article.pdf}
                                                                                target="_blank"
                                                                                rel="noreferrer"
                                                                                className="inline-flex shrink-0 items-center justify-center rounded-md bg-[#157d3c] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#105f2e] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#157d3c] focus-visible:ring-offset-2"
                                                                            >
                                                                                Open PDF
                                                                            </a>
                                                                        )}
                                                                    </div>
                                                                </article>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}
                                            </motion.article>
                                        ) : (
                                            <div className="flex min-h-[220px] items-center justify-center rounded-r-xl border border-dashed border-[#d8caa4] bg-[#fffdf6] p-8 text-center">
                                                <div>
                                                    <svg
                                                        aria-hidden="true"
                                                        viewBox="0 0 24 24"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        strokeWidth="1.5"
                                                        className="mx-auto h-10 w-10 text-[#157d3c]"
                                                    >
                                                        <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v17H6.5A2.5 2.5 0 0 0 4 22V5.5Z" />
                                                        <path d="M4 5.5V22m0-2h16M8 7h8m-8 4h8" />
                                                    </svg>
                                                    <p className="mt-4 font-serif text-sm text-gray-600">
                                                        Select a book to open its preview.
                                                    </p>
                                                </div>
                                            </div>
                                        )}
                                    </AnimatePresence>
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </motion.div>
            </div>
        </MainLayout>
    );
}
