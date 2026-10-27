import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import MainLayout from '../../../layouts/MainLayout';
import AnimatedBannerText from '../../../components/content/AnimatedBannerText';
import researchBannerImg from '../../../assets/banner/coregoals-banner.png';
import joelPotanePhoto from '../../../assets/images/JOEL_POTANE.png';

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

            </div>
        </MainLayout>
    );
}
