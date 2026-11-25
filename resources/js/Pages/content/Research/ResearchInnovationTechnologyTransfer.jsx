import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import MainLayout from '../../../layouts/MainLayout';
import AnimatedBannerText from '../../../components/content/AnimatedBannerText';
import researchBannerImg from '../../../assets/banner/coregoals-banner.png';
import joelPotanePhoto from '../../../assets/images/JOEL_POTANE.png';
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

const directorTabs = [
    { id: 'bionote', anchor: '1', label: 'Bionote' },
    { id: 'about', anchor: '2', label: 'About RITTS' },
    { id: 'general-functions', anchor: '3', label: 'General Functions' },
];

const contentTabs = [
    { id: 'faculty-research', anchor: '4', label: 'Faculty Research' },
    { id: 'rice-news', anchor: '5', label: 'RITTS News' },
];

const NEWS_PAGE_SIZE = 4;

const officeFunctions = [
    'Research policy formulation',
    'Grant and funding management',
    'Research ethics oversight',
    'Research dissemination',
    'Faculty and student support',
    'Research capability building',
];

const facultyResearch = [];

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

function DirectorProfileLinks() {
    return (
        <div className="mt-3 flex justify-center gap-3">
            <a
                href="https://orcid.org/0000-0003-0210-8149"
                target="_blank"
                rel="noreferrer"
                aria-label="ORCID profile"
                title="ORCID"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-[#a6ce39] transition-transform hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#157d3c]"
            >
                <span className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-white text-[11px] font-bold tracking-tight text-white">
                    iD
                </span>
            </a>
            <a
                href="https://scholar.google.com/citations?user=nJqgrxAAAAAJ&hl=en&oi=ao"
                target="_blank"
                rel="noreferrer"
                aria-label="Google Scholar profile"
                title="Google Scholar"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-gray-200 bg-white transition-transform hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#157d3c]"
            >
                <svg viewBox="0 0 32 32" className="h-7 w-7" aria-hidden="true">
                    <path fill="#4285f4" d="M3 12.2 16 5l13 7.2-13 7.2L3 12.2Z" />
                    <path fill="#1a73e8" d="M8 15v6.2c0 3.2 3.6 5.8 8 5.8s8-2.6 8-5.8V15l-8 4.4L8 15Z" />
                    <path fill="#fbbc04" d="M28 13v8h2v-9.1l-2 .1Z" />
                </svg>
            </a>
            <a
                href="https://adscientificindex.com/scientist/joel-d-potane/4976407/"
                target="_blank"
                rel="noreferrer"
                aria-label="AD Scientific Index profile"
                title="AD Scientific Index"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-[#157d3c] text-sm font-extrabold tracking-tight text-white transition-transform hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#157d3c]"
            >
                AD
            </a>
        </div>
    );
}

function DirectorTabContent({ activeTab }) {
    if (activeTab === 'bionote') {
        return (
            <div className="mx-auto max-w-3xl">
                <p className="mb-4 text-justify leading-relaxed text-gray-700">
                    <strong className="text-[#1a1a1a]">Dr. Joel D. Potane</strong> is the Director of Research, Innovation, and Technology Transfer Services (RITTS) at the City College of Cagayan de Oro. He began his career as a science teacher and mentor in science investigatory projects before joining the Department of Education, where he served as a Senior Education Program Specialist for Research and Division Science Coordinator, spearheading research capacity-building programs and science education initiatives.
                </p>
                <p className="mb-4 text-justify leading-relaxed text-gray-700">
                    He is an Associate Member of the National Research Council of the Philippines (NRCP), a Japan International Cooperation Agency (JICA) Fellow, a Fellow of the Royal Institute of Educators, Singapore, and Vice President for Division Affairs of the Academic Doctors&apos; Circle, Inc. His international engagements include JICA programs on disaster science, education, and the Sustainable Development Goals in Japan and the 2025 CommTECH Camp Insight at Institut Teknologi Sepuluh Nopember (ITS), Indonesia, where his international team received the Best Idea Award.
                </p>
                <p className="mb-4 text-justify leading-relaxed text-gray-700">
                    An active researcher and academic leader, Dr. Potane has presented research in Japan, Thailand, Indonesia, Malaysia, and the Philippines, published in peer-reviewed and indexed journals, and served as a journal reviewer and editorial board member. He currently co-leads a nationwide Teacher Education Council (TEC)-funded research project on mentorship among pre-service teachers involving teacher education institutions across the Philippines.
                </p>
                <p className="text-justify leading-relaxed text-gray-700">
                    His research teams have earned several distinctions, including four First Place Best Paper Awards in 2025 at national and international conferences and a 2026 Best Paper Award for research on climate change courseware. He is also a passer of the Career Executive Service (CES) Written Examination and the Licensure Examination for Teachers (LET). His work centers on research, science education, innovation, technology, sustainability, and research capacity building.
                </p>
            </div>
        );
    }

    if (activeTab === 'about') {
        return (
            <div className="mx-auto max-w-3xl space-y-4 text-justify leading-relaxed text-gray-700">
                <p>
                    The Research, Innovation, and Technology Transfer Services office coordinates and supports research at City College of Cagayan de Oro. RITTS works to strengthen research culture, support faculty and student scholarship, and encourage the responsible sharing of research outcomes.
                </p>
                <p>
                    The office also supports innovation and technology transfer, helping connect research knowledge with practical applications and opportunities to serve the college and its communities.
                </p>
            </div>
        );
    }

    return (
        <div className="mx-auto max-w-3xl">
            <p className="mb-6 text-justify leading-relaxed text-gray-700">
                RITTS supports institutional research coordination, grant facilitation, ethics oversight, research capability building, and the dissemination and application of scholarly work.
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
                {officeFunctions.map((item, index) => (
                    <div key={item} className="flex items-start gap-3 rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
                        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#f0f7f2] text-xs font-bold text-[#157d3c]">
                            {String(index + 1).padStart(2, '0')}
                        </span>
                        <span className="pt-1 text-sm font-semibold text-gray-700">{item}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

function FacultyResearchPanel({ filteredResearch, years, selectedYear, onYearChange }) {
    return (
        <>
            <div className="mb-6 flex flex-col gap-4 border-b border-gray-200 pb-5 sm:flex-row sm:items-end sm:justify-between">
                <div>
                    <h3 className="m-0 text-xl font-extrabold tracking-tight text-[#1a1a1a] md:text-2xl">
                        Faculty <span className="text-[#157d3c]">Research</span>
                    </h3>
                    <div className="mt-2 h-1 w-14 rounded-full bg-[#f5c518]" />
                </div>
                <label className="flex min-w-[180px] flex-col gap-1 text-xs font-bold uppercase tracking-widest text-gray-600">
                    Filter by year
                    <select
                        value={selectedYear}
                        onChange={(event) => onYearChange(event.target.value)}
                        disabled={years.length === 0}
                        className="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium normal-case tracking-normal text-gray-700 focus:border-[#157d3c] focus:ring-[#157d3c] disabled:cursor-not-allowed disabled:bg-gray-100"
                    >
                        <option value="all">{years.length ? 'All years' : 'No years available yet'}</option>
                        {years.map((year) => <option key={year} value={year}>{year}</option>)}
                    </select>
                </label>
            </div>

            {filteredResearch.length > 0 ? (
                <div className="space-y-4">
                    {filteredResearch.map((research, index) => (
                        <article key={`${research.year}-${research.title}-${index}`} className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md sm:p-6">
                            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                                <div className="min-w-0">
                                    <p className="mb-2 text-xs font-bold uppercase tracking-widest text-[#157d3c]">{research.year}</p>
                                    <h4 className="text-lg font-extrabold leading-snug text-[#1a1a1a]">{research.title}</h4>
                                    <p className="mt-2 text-sm text-gray-600">{research.author}</p>
                                    {research.doi && <p className="mt-2 break-all text-xs text-gray-600">DOI: {research.doi}</p>}
                                    {research.links?.length > 0 && (
                                        <div className="mt-4 flex flex-wrap gap-3">
                                            {research.links.map((link) => (
                                                <a key={link.href} href={link.href} target="_blank" rel="noreferrer" className="rounded-full border border-gray-200 px-3 py-1.5 text-xs font-semibold text-[#157d3c] transition-colors hover:border-[#157d3c] hover:bg-[#f0f7f2]">
                                                    {link.label}
                                                </a>
                                            ))}
                                        </div>
                                    )}
                                </div>
                                {research.href && (
                                    <a href={research.href} target="_blank" rel="noreferrer" className="inline-flex shrink-0 items-center gap-2 rounded-lg bg-[#157d3c] px-4 py-2.5 text-sm font-bold text-white transition-colors hover:bg-[#105d2d]">
                                        View research <span aria-hidden="true">→</span>
                                    </a>
                                )}
                            </div>
                        </article>
                    ))}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-[#157d3c] bg-[#f0f7f2] px-6 py-14 text-center">
                    <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#157d3c]">
                        <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8" aria-hidden="true">
                            <path d="M6 3h12v18H6z M9 7h6 M9 11h6 M9 15h4" />
                        </svg>
                    </div>
                    <h4 className="mb-2 text-lg font-extrabold tracking-tight text-[#1a1a1a]">Faculty research is being prepared</h4>
                    <p className="max-w-md text-sm leading-relaxed text-gray-600">
                        Publications will appear here with their title, author, publication link, DOI, and related links.
                    </p>
                    <div className="mt-4 h-1 w-16 rounded-full bg-[#f5c518]" />
                </div>
            )}
        </>
    );
}

function RiceNewsPanel({ articles, isLoading, error, currentPage, onPageChange }) {
    const pageCount = Math.ceil(articles.length / NEWS_PAGE_SIZE);
    const firstPage = Math.max(1, Math.min(currentPage - 2, pageCount - 4));
    const pageNumbers = Array.from(
        { length: Math.max(0, Math.min(pageCount, firstPage + 4) - firstPage + 1) },
        (_, index) => firstPage + index
    );
    const paginatedArticles = articles.slice(
        (currentPage - 1) * NEWS_PAGE_SIZE,
        currentPage * NEWS_PAGE_SIZE
    );

    return (
        <>
            <h3 className="m-0 mb-2 text-xl font-extrabold tracking-tight text-[#1a1a1a] md:text-2xl">
                RITTS <span className="text-[#157d3c]">News &amp; Updates</span>
            </h3>
            <div className="mb-6 h-1 w-14 rounded-full bg-[#f5c518]" />

            {isLoading ? (
                <div role="status" className="flex items-center justify-center rounded-xl border border-dashed border-gray-300 bg-gray-50 px-6 py-10 text-sm text-gray-600">
                    Loading RITTS news...
                </div>
            ) : error ? (
                <div role="alert" className="rounded-xl border border-red-200 bg-red-50 px-6 py-10 text-center text-sm text-red-700">
                    {error}
                </div>
            ) : articles.length === 0 ? (
                <div className="rounded-xl border border-dashed border-gray-300 bg-gray-50 px-6 py-10 text-center text-sm text-gray-600">
                    No RITTS news articles are available at the moment.
                </div>
            ) : (
                <>
                    <div className="space-y-6">
                    {paginatedArticles.map((article) => {
                        const excerpt = stripHtml(article.content || '');
                        const imageUrl = normalizeImagePath(article.image_path || article.image || article.image_url);
                        const sdgNumbers = Array.isArray(article.sdg_numbers)
                            ? article.sdg_numbers
                            : typeof article.sdg_numbers === 'string' && article.sdg_numbers
                                ? article.sdg_numbers
                                    .split(',')
                                    .map((value) => Number(value.trim()))
                                    .filter((value) => !Number.isNaN(value))
                                : [];

                        return (
                            <article
                                key={article.id}
                                className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-shadow duration-200 hover:shadow-md"
                            >
                                <div className="flex flex-col gap-4 p-4 md:flex-row md:items-center md:p-5">
                                    {imageUrl && (
                                        <a href={`/news/${article.id}`} className="block w-full shrink-0 overflow-hidden rounded-xl md:w-52">
                                            <img
                                                src={imageUrl}
                                                alt={article.title || 'RITTS news article'}
                                                className="h-32 w-full object-cover transition-transform duration-300 hover:scale-[1.02] md:h-28 md:w-52"
                                                onError={(event) => {
                                                    event.currentTarget.style.display = 'none';
                                                }}
                                            />
                                        </a>
                                    )}

                                    <div className="flex-1">
                                        <div className="mb-2 flex flex-wrap items-center justify-between gap-2 text-xs text-gray-500">
                                            <div className="flex flex-wrap items-center gap-2">
                                                <span className="rounded-full bg-[#e6f2ea] px-2.5 py-1 font-medium text-[#157d3c]">RITTS</span>
                                                <span>{formatDate(article.date)}</span>
                                            </div>
                                            {sdgNumbers.length > 0 && (
                                                <div className="flex flex-wrap items-center gap-2">
                                                    {sdgNumbers.slice(0, 2).map((sdgNumber) => sdgImages[sdgNumber] && (
                                                        <img
                                                            key={`${article.id}-sdg-${sdgNumber}`}
                                                            src={sdgImages[sdgNumber]}
                                                            alt={`Sustainable Development Goal ${sdgNumber}`}
                                                            title={`SDG ${sdgNumber}`}
                                                            className="h-9 w-9 rounded-md border border-gray-200 object-cover shadow-sm"
                                                        />
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                        <h4 className="mb-2 text-lg font-bold text-[#1a1a1a]">{article.title}</h4>
                                        <p className="line-clamp-3 text-sm leading-relaxed text-gray-700">
                                            {excerpt.length > 180 ? `${excerpt.slice(0, 180)}...` : excerpt}
                                        </p>
                                        <a
                                            href={`/news/${article.id}`}
                                            className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-[#157d3c] transition-colors hover:text-[#0f5c2c]"
                                        >
                                            Read more
                                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4" aria-hidden="true">
                                                <path d="M5 12h14" />
                                                <path d="m12 5 7 7-7 7" />
                                            </svg>
                                        </a>
                                    </div>
                                </div>
                            </article>
                        );
                    })}
                    </div>
                    {pageCount > 1 && (
                        <div className="mt-7 flex flex-col items-center justify-between gap-4 border-t border-gray-200 pt-5 sm:flex-row">
                            <p className="m-0 text-xs text-gray-500" aria-live="polite">
                                Showing {(currentPage - 1) * NEWS_PAGE_SIZE + 1}–{Math.min(currentPage * NEWS_PAGE_SIZE, articles.length)} of {articles.length} articles
                            </p>
                            <nav aria-label="RITTS news pagination" className="flex items-center gap-1">
                                <button
                                    type="button"
                                    onClick={() => onPageChange(currentPage - 1)}
                                    disabled={currentPage === 1}
                                    className="rounded-md px-3 py-2 text-sm font-semibold text-[#157d3c] transition-colors hover:bg-[#f0f7f2] disabled:cursor-not-allowed disabled:text-gray-400"
                                >
                                    Previous
                                </button>
                                {pageNumbers.map((pageNumber) => (
                                    <button
                                        key={pageNumber}
                                        type="button"
                                        onClick={() => onPageChange(pageNumber)}
                                        aria-label={`Go to news page ${pageNumber}`}
                                        aria-current={pageNumber === currentPage ? 'page' : undefined}
                                        className={`h-9 min-w-9 rounded-md px-2 text-sm font-bold transition-colors ${
                                            pageNumber === currentPage
                                                ? 'bg-[#157d3c] text-white'
                                                : 'text-gray-600 hover:bg-[#f0f7f2] hover:text-[#157d3c]'
                                        }`}
                                    >
                                        {pageNumber}
                                    </button>
                                ))}
                                <button
                                    type="button"
                                    onClick={() => onPageChange(currentPage + 1)}
                                    disabled={currentPage === pageCount}
                                    className="rounded-md px-3 py-2 text-sm font-semibold text-[#157d3c] transition-colors hover:bg-[#f0f7f2] disabled:cursor-not-allowed disabled:text-gray-400"
                                >
                                    Next
                                </button>
                            </nav>
                        </div>
                    )}
                </>
            )}
        </>
    );
}

export default function ResearchInnovationTechnologyTransfer() {
    const [activeDirectorTab, setActiveDirectorTab] = useState(directorTabs[0].id);
    const [activeContentTab, setActiveContentTab] = useState(contentTabs[0].id);
    const [selectedYear, setSelectedYear] = useState('all');
    const [riceNews, setRiceNews] = useState([]);
    const [riceNewsPage, setRiceNewsPage] = useState(1);
    const [isLoadingRiceNews, setIsLoadingRiceNews] = useState(true);
    const [riceNewsError, setRiceNewsError] = useState('');
    const years = [...new Set(facultyResearch.map((research) => String(research.year)))].sort((a, b) => b.localeCompare(a));
    const filteredResearch = selectedYear === 'all'
        ? facultyResearch
        : facultyResearch.filter((research) => String(research.year) === selectedYear);

    useEffect(() => {
        const controller = new AbortController();

        const loadRiceNews = async () => {
            try {
                const response = await fetch('/api/news?department=RICE', {
                    headers: { Accept: 'application/json' },
                    signal: controller.signal,
                });

                if (!response.ok) {
                    throw new Error(`RITTS news request failed: ${response.status}`);
                }

                const articles = await response.json();
                if (!Array.isArray(articles)) {
                    throw new Error('RICE news response was not a list.');
                }

                setRiceNews(articles);
                setRiceNewsPage(1);
            } catch (error) {
                if (error.name !== 'AbortError') {
                    console.error('Failed to load RITTS news:', error);
                    setRiceNewsError('News could not be loaded. Please try again later.');
                }
            } finally {
                if (!controller.signal.aborted) {
                    setIsLoadingRiceNews(false);
                }
            }
        };

        loadRiceNews();
        return () => controller.abort();
    }, []);

    useEffect(() => {
        let scrollTimeout;

        const goToHash = () => {
            const hash = window.location.hash.slice(1);
            const directorTab = directorTabs.find((tab) => tab.anchor === hash);
            const contentTab = contentTabs.find((tab) => tab.anchor === hash);
            let panelId;

            if (directorTab) {
                setActiveDirectorTab(directorTab.id);
                panelId = `director-panel-${directorTab.id}`;
            } else if (contentTab) {
                setActiveContentTab(contentTab.id);
                panelId = `content-panel-${contentTab.id}`;
            } else {
                return;
            }

            window.clearTimeout(scrollTimeout);
            scrollTimeout = window.setTimeout(() => {
                document.getElementById(panelId)?.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start',
                });
            }, 400);
        };

        goToHash();
        window.addEventListener('hashchange', goToHash);

        return () => {
            window.clearTimeout(scrollTimeout);
            window.removeEventListener('hashchange', goToHash);
        };
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
                                    <DirectorProfileLinks />
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
                                        <svg viewBox="0 0 24 24" fill="none" stroke="#f5c518" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true">
                                            <rect width="20" height="16" x="2" y="4" rx="2" />
                                            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                                        </svg>
                                        <span>
                                            <strong>Email: </strong>
                                            <a href="mailto:cccdoofficeofresearch@gmail.com" className="break-all underline decoration-white/60 underline-offset-2 hover:text-[#f5c518]">
                                                cccdoofficeofresearch@gmail.com
                                            </a>
                                        </span>
                                    </li>
                                    <li className="flex items-start gap-2.5">
                                        <svg viewBox="0 0 24 24" fill="none" stroke="#f5c518" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true">
                                            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                                        </svg>
                                        <span>
                                            <strong>Messenger: </strong>
                                            <a href="https://m.me/519668507885653" target="_blank" rel="noreferrer" className="underline decoration-white/60 underline-offset-2 hover:text-[#f5c518]">
                                                Research, Innovation &amp; Technology Transfer - City College CDO
                                            </a>
                                        </span>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className="min-w-0 w-full flex-1">
                            <div className="-mx-8 -mt-8 mb-8 border-b border-gray-200 bg-[#f0f7f2] md:-mx-10 md:-mt-10 lg:-mx-14 lg:-mt-14">
                                <div role="tablist" aria-label="Director information tabs" className="flex w-full items-stretch overflow-x-auto">
                                    {directorTabs.map((tab) => {
                                        const isActive = activeDirectorTab === tab.id;
                                        return (
                                            <button
                                                key={tab.id}
                                                type="button"
                                                role="tab"
                                                id={`director-tab-${tab.id}`}
                                                aria-label={`Section ${tab.anchor.padStart(2, '0')}: ${tab.label}`}
                                                aria-selected={isActive}
                                                aria-controls={`director-panel-${tab.id}`}
                                                onClick={() => {
                                                    window.location.hash = tab.anchor;
                                                }}
                                                className={`relative flex-1 shrink-0 whitespace-nowrap px-6 py-5 text-sm font-semibold tracking-wide transition-colors duration-200 focus:outline-none ${
                                                    isActive
                                                        ? 'bg-[#157d3c] text-white'
                                                        : 'bg-transparent text-gray-600 hover:bg-[#f5c518] hover:text-[#1a1a1a]'
                                                }`}
                                            >
                                                <span>{tab.label}</span>
                                                {isActive && (
                                                    <motion.span
                                                        layoutId="activeResearchDirectorTab"
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
                                <motion.div
                                    key={activeDirectorTab}
                                    role="tabpanel"
                                    id={`director-panel-${activeDirectorTab}`}
                                    aria-labelledby={`director-tab-${activeDirectorTab}`}
                                    className="scroll-mt-24"
                                    variants={tabPanelVariants}
                                    initial="hidden"
                                    animate="visible"
                                    exit="exit"
                                >
                                    <h2 className="m-0 mb-4 text-center text-2xl font-extrabold tracking-tight text-[#1a1a1a] md:text-3xl">
                                        {activeDirectorTab === 'bionote' && <>Bio <span className="text-[#157d3c]">Note</span></>}
                                        {activeDirectorTab === 'about' && <>About <span className="text-[#157d3c]">RITTS</span></>}
                                        {activeDirectorTab === 'general-functions' && <>General <span className="text-[#157d3c]">Functions</span></>}
                                    </h2>
                                    <div className="mx-auto mb-6 h-1 w-16 rounded-full bg-[#f5c518]" />
                                    <DirectorTabContent activeTab={activeDirectorTab} />
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    className="mt-14 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-shadow duration-300 hover:shadow-lg md:mt-20"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.15 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                >
                    <div className="border-b border-gray-200 bg-[#f0f7f2]">
                        <div
                            role="tablist"
                            aria-label="Faculty research and RITTS news"
                            className="flex w-full items-stretch overflow-x-auto"
                        >
                            {contentTabs.map((tab) => {
                                const isActive = activeContentTab === tab.id;
                                return (
                                    <button
                                        key={tab.id}
                                        type="button"
                                        role="tab"
                                        id={`content-tab-${tab.id}`}
                                        aria-label={`Section ${tab.anchor.padStart(2, '0')}: ${tab.label}`}
                                        aria-selected={isActive}
                                        aria-controls={`content-panel-${tab.id}`}
                                        onClick={() => {
                                            window.location.hash = tab.anchor;
                                        }}
                                        className={`relative flex-1 shrink-0 whitespace-nowrap px-6 py-5 text-sm font-semibold tracking-wide transition-colors duration-200 focus:outline-none ${
                                            isActive
                                                ? 'bg-[#157d3c] text-white'
                                                : 'bg-transparent text-gray-600 hover:bg-[#f5c518] hover:text-[#1a1a1a]'
                                        }`}
                                    >
                                        <span>{tab.label}</span>
                                        {isActive && (
                                            <motion.span
                                                layoutId="activeResearchContentTab"
                                                className="absolute bottom-0 left-0 right-0 h-1 rounded-t-full bg-[#f5c518]"
                                                transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                                            />
                                        )}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    <div className="min-h-[260px] p-6 sm:p-8 lg:p-14">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeContentTab}
                                role="tabpanel"
                                id={`content-panel-${activeContentTab}`}
                                aria-labelledby={`content-tab-${activeContentTab}`}
                                className="scroll-mt-24"
                                variants={tabPanelVariants}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                            >
                                {activeContentTab === 'faculty-research' ? (
                                    <FacultyResearchPanel
                                        filteredResearch={filteredResearch}
                                        years={years}
                                        selectedYear={selectedYear}
                                        onYearChange={setSelectedYear}
                                    />
                                ) : (
                                    <RiceNewsPanel
                                        articles={riceNews}
                                        isLoading={isLoadingRiceNews}
                                        error={riceNewsError}
                                        currentPage={riceNewsPage}
                                        onPageChange={setRiceNewsPage}
                                    />
                                )}
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </motion.div>
            </div>
        </MainLayout>
    );
}
