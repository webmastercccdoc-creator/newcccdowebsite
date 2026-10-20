import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import MainLayout from '../../../layouts/MainLayout';
import AnimatedBannerText from '../../../components/content/AnimatedBannerText';
import ollpdBannerImg from '../../../assets/banner/coregoals-banner.png';
import jeromeTorresImage from '../../../assets/images/JEROME_TORRES.png';
import educationTraining from '../../../assets/images/Education Training.png';
import financeMarketingTraining from '../../../assets/images/Finance and Marketing Training.png';
import humanResourcesManagement from '../../../assets/images/Human Resources Management.png';
import researchStatistics from '../../../assets/images/Research & Statistics.png';
import riseLearningAcademy from '../../../assets/images/RISE-Learning-Academy-Series.png';
import valuesFormation from '../../../assets/images/Values Formation and Spirituality.png';
import youthDevelopment from '../../../assets/images/Youth-Development-Program.png';
import sdg1 from '../../../assets/images/sdg1.png';
import sdg2 from '../../../assets/images/sdg2.jpg';
import sdg3 from '../../../assets/images/sdg3.png';
import sdg4 from '../../../assets/images/sdg4.png';
import sdg5 from '../../../assets/images/sdg5.jpg';
import sdg6 from '../../../assets/images/sdg6.png';
import sdg7 from '../../../assets/images/sdg7.png';
import sdg8 from '../../../assets/images/sdg8.png';
import sdg9 from '../../../assets/images/sdg9.png';
import sdg10 from '../../../assets/images/sdg10.png';
import sdg11 from '../../../assets/images/sdg11.png';
import sdg12 from '../../../assets/images/sdg12.jpg';
import sdg13 from '../../../assets/images/sdg13.png';
import sdg14 from '../../../assets/images/sdg14.png';
import sdg15 from '../../../assets/images/sdg15.png';
import sdg16 from '../../../assets/images/sdg16.png';
import sdg17 from '../../../assets/images/sdg17.png';

const contentVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.45 },
    },
};

const tabPanelVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
    },
    exit: {
        opacity: 0,
        y: -10,
        transition: { duration: 0.25, ease: [0.22, 1, 0.36, 1] },
    },
};

const tabs = [
    {
        id: 'bionote',
        label: 'Bionote',
        heading: 'Bionote',
    },
    {
        id: 'about',
        label: 'About OLLPD',
        heading: 'About',
        headingAccent: 'OLLPD',
    },
    {
        id: 'functions',
        label: 'General Functions',
        heading: 'General',
        headingAccent: 'Functions',
    },
    {
        id: 'goals',
        label: 'Goals and Key Objectives',
        heading: 'Goals and',
        headingAccent: 'Key Objectives',
    },
];

const trainingPrograms = [
    { title: 'Education Training', image: educationTraining },
    { title: 'Finance and Marketing Training', image: financeMarketingTraining },
    { title: 'Human Resources Management', image: humanResourcesManagement },
    { title: 'RISE Learning Academy Series', image: riseLearningAcademy },
    { title: 'Research & Statistics', image: researchStatistics },
    { title: 'Values Formation and Spirituality', image: valuesFormation },
    { title: 'Youth Development Program', image: youthDevelopment },
];

const stripHtml = (html = '') => html.replace(/<[^>]*>/g, '').trim();

const normalizeImagePath = (value) => {
    if (!value) return '';
    if (/^https?:\/\//i.test(value) || value.startsWith('data:')) return value;
    return `/${String(value).replace(/^\/+/, '')}`;
};

const formatDate = (value) => {
    if (!value) return 'Recently';
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return value;
    return new Intl.DateTimeFormat('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
    }).format(date);
};

const sdgImages = {
    1: sdg1,
    2: sdg2,
    3: sdg3,
    4: sdg4,
    5: sdg5,
    6: sdg6,
    7: sdg7,
    8: sdg8,
    9: sdg9,
    10: sdg10,
    11: sdg11,
    12: sdg12,
    13: sdg13,
    14: sdg14,
    15: sdg15,
    16: sdg16,
    17: sdg17,
};

function SectionHeading({ children }) {
    return (
        <>
            <h3 className="mb-3 text-lg font-extrabold tracking-tight text-[#1a1a1a]">
                {children}
            </h3>
            <div className="mb-5 h-1 w-12 rounded-full bg-[#f5c518]" />
        </>
    );
}

function AboutContent() {
    return (
        <div className="space-y-5 text-justify leading-relaxed text-gray-700">
            <p>
                An LGU-run Higher Education Institution (HEI) managed and
                operated by the local government unit (LGU) of Cagayan de Oro
                City. It offers strategic training solutions for institutions,
                including continuing education, leadership development, and
                customized programs for public and private organizations.
                Programs are developed in collaboration with individuals across
                the industry to support both professionals&apos; advancement
                and organizations&apos; growth in line with national and global
                objectives.
            </p>
            <p>
                It also facilitates public lectures and consulting services
                specifically tailored to meet the changing requirements of
                professionals in many industries. Its programs are designed to
                be thorough and practical by utilizing the substantial
                expertise of faculty and professors, which consists of both
                academicians and seasoned professionals from numerous
                industries. Our commitment is to provide high-quality
                education and consulting services that bridge the gap between
                theoretical knowledge and practical application.
            </p>
        </div>
    );
}

function FunctionsContent() {
    return (
        <div className="space-y-5 text-justify leading-relaxed text-gray-700">
            <p>
                The Office for Lifelong Learning and Professional Development
                at the City College of Cagayan de Oro is a prominent provider
                of continuing education, leadership and formation development,
                specialized certificate courses, and customized short-term
                programs in collaboration with industry partners and
                associations. These programs are tailored for faculty, staff,
                students, professionals, and client institutions in alignment
                with the RISE Government Agenda and Sustainable Development
                Goals (SDGs). Our commitment lies in fostering professional
                growth, career advancement, and organizational development.
            </p>
            <p>
                It also facilitates public lectures and consulting services
                specifically tailored to meet the changing requirements of
                professionals in many industries. Its programs are designed to
                be thorough and practical by utilizing the substantial
                expertise of faculty and professors, which consists of both
                academicians and seasoned professionals from numerous
                industries.
            </p>
            <p>
                Our commitment is to provide high-quality education and
                consulting services that bridge the gap between theoretical
                knowledge and practical application.
            </p>
        </div>
    );
}

const keyFunctions = [
    'Lead in continuing education and professional development in the region.',
    'Foster lifelong learning and enhance professional skills across industries.',
    'Build strong partnerships with industry associations and client institutions.',
    'Promote lifelong learning opportunities for students, alumni, and professionals.',
];

const keyObjectives = [
    'Promote lifelong learning opportunities for students, alumni, and professionals.',
    'Develop specialized certificate courses with industry associations.',
    'Implement customized short-term programs for client institutions.',
    'Continuously update programs based on feedback from industry partners and participants.',
];

function NumberedList({ items }) {
    return (
        <ol className="space-y-3 text-gray-700">
            {items.map((item, index) => (
                <li key={item} className="flex items-start gap-3 leading-relaxed">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#e6f2ea] text-sm font-bold text-[#157d3c]">
                        {index + 1}
                    </span>
                    <span className="pt-0.5">{item}</span>
                </li>
            ))}
        </ol>
    );
}

function GoalsContent() {
    return (
        <div className="grid gap-8 lg:grid-cols-2">
            <section className="rounded-xl border border-gray-200 bg-[#f8fbf8] p-5 sm:p-6">
                <SectionHeading>Key Functions</SectionHeading>
                <NumberedList items={keyFunctions} />
            </section>
            <section className="rounded-xl border border-gray-200 bg-[#f8fbf8] p-5 sm:p-6">
                <SectionHeading>Key Objectives</SectionHeading>
                <NumberedList items={keyObjectives} />
            </section>
        </div>
    );
}

function BionoteContent() {
    return (
        <div className="space-y-5 text-justify leading-relaxed text-gray-700">
            <p>
                Mr. Jerome &quot;Jett&quot; L. Torres, the Director for Lifelong
                Learning and Professional Development at the City College of
                Cagayan de Oro, is an experienced leader in education. His
                expertise lies in academic leadership and management,
                instructional development, and the advancement of
                students&apos; essential life skills and career opportunities.
                He has broadened educational experiences and created new paths
                for student success through strategic partnerships with key
                industries. To meet the demands of today&apos;s job market, Mr.
                Torres dedicates himself to innovating higher education
                institutions, technical and vocational education and training
                (TVET), and alternative learning systems.
            </p>
            <p>
                With over 19 years of experience in academe, formation, and
                social development, Mr. Torres has distinguished himself as a
                dedicated educator and advocate for societal progress. His
                contributions to both the academic and local communities
                underscore his commitment to fostering a culture of inclusive
                and impactful learning and development.
            </p>
            <p>
                Mr. Torres has made a significant impact on education and
                social development in Cagayan de Oro City, founding the Street
                Tutorial Advocacy, Inc. and the XU Night School
                Program—Alternative Learning System at Xavier University.
                These initiatives, aimed at enhancing educational equity and
                pedagogical innovation, demonstrate his commitment to inclusive
                and comprehensive learning. Awards such as Xavier
                University&apos;s first Outstanding Formator award, regional
                and national ABS-CBN Geny Lopez Bayaning Pilipino Awards, and
                the National Award for Ten Accomplished Youth Organizations
                (TAYO) 16 recognize his exceptional leadership and dedication
                to formative education, highlighting his profound influence on
                youth empowerment and community development.
            </p>
            <p>
                A visionary individual with a focus on enhancing non-formal and
                technical vocational education, Mr. Torres actively
                collaborates with higher education institutions, TESDA, and
                local government agencies to bridge the educational gap for
                out-of-school youth and underserved communities.
            </p>
        </div>
    );
}

function NewsContent({ articles, isLoading, error }) {
    if (isLoading) {
        return (
            <div className="flex items-center justify-center rounded-xl border border-dashed border-gray-300 bg-gray-50 px-6 py-10 text-sm text-gray-600">
                Loading news...
            </div>
        );
    }

    if (error) {
        return (
            <div role="alert" className="rounded-xl border border-red-200 bg-red-50 px-6 py-10 text-center text-sm text-red-700">
                {error}
            </div>
        );
    }

    if (!articles.length) {
        return (
            <div className="rounded-xl border border-dashed border-gray-300 bg-gray-50 px-6 py-10 text-center text-sm text-gray-600">
                No OLLPD news articles are available at the moment.
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {articles.map((article) => {
                const excerpt = stripHtml(article.content || '');
                const imageUrl = normalizeImagePath(
                    article.image_path || article.image || article.image_url
                );
                const sdgNumbers = Array.isArray(article.sdg_numbers)
                    ? article.sdg_numbers
                    : typeof article.sdg_numbers === 'string' && article.sdg_numbers
                      ? article.sdg_numbers
                            .split(',')
                            .map((value) => Number(value.trim()))
                            .filter((value) => Number.isInteger(value) && sdgImages[value])
                      : [];

                return (
                    <article
                        key={article.id}
                        className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-shadow duration-200 hover:shadow-md"
                    >
                        <div className="flex flex-col gap-4 p-4 md:flex-row md:items-center md:p-5">
                            {imageUrl && (
                                <a
                                    href={`/news/${article.id}`}
                                    className="block w-full shrink-0 overflow-hidden rounded-xl md:w-52"
                                >
                                    <img
                                        src={imageUrl}
                                        alt={article.article_alt_text || article.title || 'News article'}
                                        className="h-40 w-full object-cover transition-transform duration-300 hover:scale-[1.02] md:h-28 md:w-52"
                                        onError={(event) => {
                                            event.currentTarget.style.display = 'none';
                                        }}
                                    />
                                </a>
                            )}

                            <div className="min-w-0 flex-1">
                                <div className="mb-2 flex flex-wrap items-center justify-between gap-2 text-xs text-gray-500">
                                    <div className="flex flex-wrap items-center gap-2">
                                        <span className="rounded-full bg-[#e6f2ea] px-2.5 py-1 font-medium text-[#157d3c]">
                                            OLLPD
                                        </span>
                                        <span>{formatDate(article.date)}</span>
                                    </div>
                                    {sdgNumbers.length > 0 && (
                                        <div className="flex flex-wrap items-center gap-2">
                                            {sdgNumbers.slice(0, 2).map((number) => (
                                                <img
                                                    key={`${article.id}-sdg-${number}`}
                                                    src={sdgImages[number]}
                                                    alt={`Sustainable Development Goal ${number}`}
                                                    title={`SDG ${number}`}
                                                    className="h-9 w-9 rounded-md border border-gray-200 object-cover shadow-sm"
                                                />
                                            ))}
                                        </div>
                                    )}
                                </div>

                                <h4 className="mb-2 text-lg font-bold text-[#1a1a1a]">
                                    {article.title}
                                </h4>
                                <p className="line-clamp-3 text-sm leading-relaxed text-gray-700">
                                    {excerpt.length > 180
                                        ? `${excerpt.slice(0, 180)}...`
                                        : excerpt}
                                </p>
                                <div className="mt-3">
                                    <a
                                        href={`/news/${article.id}`}
                                        className="inline-flex items-center gap-2 text-sm font-semibold text-[#157d3c] transition-colors hover:text-[#0f5c2c]"
                                    >
                                        Read more
                                        <span aria-hidden="true">→</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </article>
                );
            })}
        </div>
    );
}

function TrainingsContent() {
    return (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {trainingPrograms.map((training) => (
                <article
                    key={training.title}
                    className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-shadow duration-200 hover:shadow-lg"
                >
                    <a
                        href={training.image}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Open ${training.title} training in a new tab`}
                        className="block aspect-video w-full overflow-hidden bg-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#157d3c]"
                    >
                        <img
                            src={training.image}
                            alt={`${training.title} training overview`}
                            className="h-full w-full object-cover object-top transition-transform duration-300 hover:scale-[1.02]"
                        />
                    </a>
                    <div className="flex min-h-24 flex-col justify-between gap-4 p-4">
                        <h3 className="font-bold text-[#1a1a1a]">{training.title}</h3>
                        <a
                            href={training.image}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`Open ${training.title} training in a new tab`}
                            className="inline-flex w-full items-center justify-center gap-2 rounded-sm bg-[#26a64a] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#19863a] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#157d3c] focus-visible:ring-offset-2"
                        >
                            <svg
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                className="h-4 w-4"
                            >
                                <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" />
                                <circle cx="12" cy="12" r="3" />
                            </svg>
                            View Training
                        </a>
                    </div>
                </article>
            ))}
        </div>
    );
}

const tabContent = {
    about: <AboutContent />,
    functions: <FunctionsContent />,
    goals: <GoalsContent />,
    bionote: <BionoteContent />,
};

export default function OLLPD() {
    const [activeTab, setActiveTab] = useState(tabs[0].id);
    const activeTabData = tabs.find((tab) => tab.id === activeTab);
    const [activeResourceTab, setActiveResourceTab] = useState('news');
    const [ollpdNews, setOllpdNews] = useState([]);
    const [isLoadingNews, setIsLoadingNews] = useState(true);
    const [newsError, setNewsError] = useState('');

    useEffect(() => {
        document.title =
            'Office for Lifelong Learning and Professional Development - City College of Cagayan de Oro';
    }, []);

    useEffect(() => {
        const controller = new AbortController();

        fetch('/api/news?department=OLLPD', { signal: controller.signal })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to load OLLPD news.');
                }
                return response.json();
            })
            .then((data) => {
                if (!Array.isArray(data)) {
                    throw new Error('The OLLPD news response was not a list.');
                }
                setOllpdNews(data);
            })
            .catch((error) => {
                if (error.name !== 'AbortError') {
                    setNewsError(error.message || 'Unable to load OLLPD news.');
                }
            })
            .finally(() => {
                if (!controller.signal.aborted) {
                    setIsLoadingNews(false);
                }
            });

        return () => controller.abort();
    }, []);

    return (
        <MainLayout
            maxWidth="full"
            containerClassName="px-0"
            mainClassName="py-0"
            className="overflow-hidden pb-0"
        >
            <div
                className="relative flex min-h-[350px] w-full items-center justify-center bg-cover bg-center bg-no-repeat shadow-lg md:min-h-[450px] lg:min-h-[550px]"
                style={{ backgroundImage: `url('${ollpdBannerImg}')` }}
            >
                <div className="absolute inset-0 bg-black/50" />
                <AnimatedBannerText
                    title="Office for Lifelong Learning and Professional Development"
                    description="Supporting lifelong learning and professional development at City College of Cagayan de Oro."
                />
            </div>

            <div className="mx-auto w-full max-w-[1600px] px-6 py-14 sm:px-10 md:py-20 lg:px-16 xl:px-20">
                <motion.div
                    className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-shadow duration-300 hover:shadow-xl"
                    variants={contentVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <div className="flex flex-col items-start gap-10 p-6 sm:p-8 md:p-10 lg:flex-row lg:gap-14 lg:p-14">
                        <aside className="mx-auto flex w-full shrink-0 flex-col gap-6 sm:max-w-md lg:mx-0 lg:w-80 xl:w-96">
                            <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
                                <div className="flex aspect-[4/5] w-full items-center justify-center bg-white p-2">
                                    <img
                                        src={jeromeTorresImage}
                                        alt="Mr. Jerome L. Torres"
                                        className="h-full w-full object-contain"
                                    />
                                </div>
                                <div className="border-t-4 border-[#f5c518] bg-white px-4 py-4 text-center">
                                    <p className="m-0 text-sm font-bold uppercase tracking-wide text-[#157d3c] sm:text-base md:text-lg">
                                        Mr. Jerome L. Torres
                                    </p>
                                    <p className="mt-1 text-xs font-semibold leading-tight text-[#1a1a1a] sm:text-sm md:text-base">
                                        Director, Office for Lifelong Learning
                                        and Professional Development
                                    </p>
                                </div>
                            </div>
                        </aside>

                        <div className="min-w-0 flex-1">
                            <div
                                role="tablist"
                                aria-label="Office for Lifelong Learning and Professional Development information"
                                className="mb-8 flex w-full flex-wrap border-b border-gray-200 bg-[#f0f7f2]"
                            >
                                {tabs.map((tab) => {
                                    const isActive = activeTab === tab.id;
                                    return (
                                        <button
                                            key={tab.id}
                                            type="button"
                                            role="tab"
                                            id={`ollpd-tab-${tab.id}`}
                                            aria-selected={isActive}
                                            aria-controls={`ollpd-panel-${tab.id}`}
                                            onClick={() => setActiveTab(tab.id)}
                                            className={`relative min-h-14 flex-1 px-4 py-4 text-sm font-semibold transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#157d3c] ${
                                                isActive
                                                    ? 'bg-[#157d3c] text-white'
                                                    : 'text-gray-600 hover:bg-[#f5c518] hover:text-[#1a1a1a]'
                                            }`}
                                        >
                                            {tab.label}
                                            {isActive && (
                                                <motion.span
                                                    layoutId="ollpdActiveTabIndicator"
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

                            <AnimatePresence mode="wait">
                                <motion.section
                                    key={activeTab}
                                    role="tabpanel"
                                    id={`ollpd-panel-${activeTab}`}
                                    aria-labelledby={`ollpd-tab-${activeTab}`}
                                    variants={tabPanelVariants}
                                    initial="hidden"
                                    animate="visible"
                                    exit="exit"
                                >
                                    <h2 className="mb-4 text-center text-2xl font-extrabold tracking-tight text-[#1a1a1a] md:text-3xl">
                                        {activeTabData.headingAccent ? (
                                            <>
                                                {activeTabData.heading}{' '}
                                                <span className="text-[#157d3c]">
                                                    {activeTabData.headingAccent}
                                                </span>
                                            </>
                                        ) : (
                                            activeTabData.heading
                                        )}
                                    </h2>
                                    <div className="mx-auto mb-6 h-1 w-16 rounded-full bg-[#f5c518]" />
                                    {tabContent[activeTab]}
                                </motion.section>
                            </AnimatePresence>
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    className="mt-14 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm md:mt-20"
                    variants={contentVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <div className="border-b border-gray-200 bg-[#f0f7f2]">
                        <div
                            role="tablist"
                            aria-label="OLLPD news and training offerings"
                            className="flex w-full items-stretch overflow-x-auto"
                        >
                            {[
                                { id: 'news', label: 'News' },
                                { id: 'trainings', label: 'Trainings Offered' },
                            ].map((tab) => {
                                const isActive = activeResourceTab === tab.id;
                                return (
                                    <button
                                        key={tab.id}
                                        type="button"
                                        role="tab"
                                        id={`ollpd-resource-tab-${tab.id}`}
                                        aria-selected={isActive}
                                        aria-controls={`ollpd-resource-panel-${tab.id}`}
                                        onClick={() => setActiveResourceTab(tab.id)}
                                        className={`relative flex-1 shrink-0 whitespace-nowrap px-6 py-5 text-sm font-semibold tracking-wide transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#157d3c] ${
                                            isActive
                                                ? 'bg-[#157d3c] text-white'
                                                : 'bg-transparent text-gray-600 hover:bg-[#f5c518] hover:text-[#1a1a1a]'
                                        }`}
                                    >
                                        {tab.label}
                                        {isActive && (
                                            <motion.span
                                                layoutId="ollpdResourceTabIndicator"
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

                    <div className="min-h-[260px] p-6 sm:p-8 md:p-10 lg:p-14">
                        <AnimatePresence mode="wait">
                            <motion.section
                                key={activeResourceTab}
                                role="tabpanel"
                                id={`ollpd-resource-panel-${activeResourceTab}`}
                                aria-labelledby={`ollpd-resource-tab-${activeResourceTab}`}
                                variants={tabPanelVariants}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                            >
                                <h2 className="mb-2 text-xl font-extrabold tracking-tight text-[#1a1a1a] md:text-2xl">
                                    {activeResourceTab === 'news' ? (
                                        <>
                                            OLLPD <span className="text-[#157d3c]">News</span>
                                        </>
                                    ) : (
                                        <>
                                            Trainings <span className="text-[#157d3c]">Offered</span>
                                        </>
                                    )}
                                </h2>
                                <div className="mb-6 h-1 w-16 rounded-full bg-[#f5c518]" />
                                {activeResourceTab === 'news' ? (
                                    <NewsContent
                                        articles={ollpdNews}
                                        isLoading={isLoadingNews}
                                        error={newsError}
                                    />
                                ) : (
                                    <TrainingsContent />
                                )}
                            </motion.section>
                        </AnimatePresence>
                    </div>
                </motion.div>
            </div>
        </MainLayout>
    );
}
