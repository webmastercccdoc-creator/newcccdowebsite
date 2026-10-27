import { AnimatePresence, motion } from 'framer-motion';
import { useRef, useState } from 'react';
import MainLayout from '../../../layouts/MainLayout';

export default function JournalBooksPage({ title, description, books }) {
    const featuredBook = books[0];
    const [activeBookId, setActiveBookId] = useState(null);
    const contentsRef = useRef(null);
    const activeBook = books.find((book) => book.id === activeBookId);

    return (
        <MainLayout
            maxWidth="full"
            containerClassName="px-0"
            mainClassName="py-0"
            className="overflow-hidden bg-[#f8f7f2] pb-0"
        >
            <main className="text-[#1f3329]">
                <section className="relative isolate overflow-hidden bg-[#10271f] text-white">
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

                    <div className="mx-auto grid min-h-[620px] max-w-[1440px] items-center gap-12 px-6 py-20 sm:px-10 lg:min-h-[720px] lg:grid-cols-[1.15fr_0.85fr] lg:gap-16 lg:px-16 lg:py-24">
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
                                Research Publications
                            </p>
                            <h1 className="mt-5 max-w-4xl font-serif text-4xl font-medium leading-[1.08] tracking-[-0.04em] text-white sm:text-5xl md:text-6xl lg:text-[4.5rem]">
                                {title}
                            </h1>
                            {description && (
                                <p className="mt-7 max-w-2xl text-base leading-8 text-white/70 sm:text-lg">
                                    {description}
                                </p>
                            )}
                            <a
                                href="#journal-books"
                                className="mt-9 inline-flex items-center gap-3 rounded-full bg-[#d8b45c] px-6 py-3.5 text-sm font-bold text-[#17251c] transition-transform hover:-translate-y-0.5 hover:bg-[#e6c875] focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#10271f]"
                            >
                                Browse volumes
                                <span aria-hidden="true">↓</span>
                            </a>
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
                                <img src={featuredBook.cover} alt={featuredBook.alt} className="h-full w-full object-contain" />
                                <div aria-hidden="true" className="absolute inset-y-0 left-0 w-3 border-r border-black/10 bg-gradient-to-r from-black/25 to-black/5" />
                            </motion.div>
                        </motion.div>
                    </div>
                </section>

                <section id="journal-books" className="mx-auto max-w-[1440px] scroll-mt-24 px-6 py-16 sm:px-10 lg:px-16 lg:py-24">
                    <div className="flex flex-wrap items-end justify-between gap-4 border-b border-[#d8d1c1] pb-5">
                        <h2 className="font-serif text-2xl font-semibold text-[#173b27] sm:text-3xl">{title}</h2>
                        <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#8b7b55]">Volumes</span>
                    </div>
                    <div className="mt-10 grid items-start gap-8 lg:grid-cols-[minmax(240px,0.72fr)_minmax(0,1.8fr)] lg:gap-10">
                        <div className="flex flex-wrap justify-center gap-6 sm:justify-start">
                        {books.map((book, index) => (
                            <motion.button
                                key={book.id}
                                type="button"
                                aria-expanded={activeBookId === book.id}
                                aria-controls="journal-book-contents"
                                aria-label={`${activeBookId === book.id ? 'Close' : 'Open'} ${book.edition} (${book.year})`}
                                onClick={() => {
                                    const nextBookId = activeBookId === book.id ? null : book.id;
                                    setActiveBookId(nextBookId);
                                    if (nextBookId) {
                                        requestAnimationFrame(() => {
                                            contentsRef.current?.scrollIntoView({
                                                behavior: 'smooth',
                                                block: 'nearest',
                                            });
                                        });
                                    }
                                }}
                                initial={{ opacity: 0, y: 24 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.2 }}
                                transition={{ duration: 0.5, delay: Math.min(index * 0.1, 0.4) }}
                                className={`group w-56 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#a77b28] focus-visible:ring-offset-4 sm:w-64 ${
                                    activeBookId === book.id ? '-translate-y-1' : ''
                                }`}
                            >
                                <motion.span
                                    whileHover={{ rotateY: -5, y: -7 }}
                                    transition={{ type: 'spring', stiffness: 180, damping: 18 }}
                                    className="relative block aspect-[3/4] overflow-hidden rounded-r-md border border-black/10 bg-white shadow-[8px_12px_22px_rgba(35,47,38,0.2)] transition-shadow group-hover:shadow-[12px_16px_26px_rgba(35,47,38,0.26)]"
                                >
                                    <img src={book.cover} alt={book.alt} className="h-full w-full object-contain" />
                                    <div aria-hidden="true" className="absolute inset-y-0 left-0 w-3 border-r border-black/10 bg-gradient-to-r from-black/20 to-black/5" />
                                </motion.span>
                                <span className="mt-4 block text-center font-serif text-lg font-semibold text-[#263d30]">
                                    {book.edition} ({book.year})
                                </span>
                                <span className="mt-1 block text-center text-xs font-medium text-[#718074]">
                                    {activeBookId === book.id ? 'Click to close the issue' : 'Click to open the issue'}
                                </span>
                            </motion.button>
                        ))}
                        </div>

                        <div ref={contentsRef} className="min-h-[280px] scroll-mt-24">
                            <AnimatePresence mode="wait">
                                {activeBook ? (
                                    <motion.article
                                        key={activeBook.id}
                                        id="journal-book-contents"
                                        role="region"
                                        aria-label={`${activeBook.edition} (${activeBook.year}) contents`}
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
                                                    {title}
                                                </p>
                                                <h3 className="mt-4 font-serif text-2xl font-semibold leading-tight text-[#263d30] sm:text-3xl">
                                                    {activeBook.edition}
                                                </h3>
                                                <p className="mt-3 font-serif text-sm italic text-[#68766d]">
                                                    {activeBook.year}
                                                </p>
                                                <div className="mt-8 border-t border-[#d8caa4] pt-5">
                                                    <p className="text-xs leading-6 text-[#68766d]">
                                                        {activeBook.articles
                                                            ? `${activeBook.articles.length} articles in this issue. Select an article to view its full text.`
                                                            : 'Read the complete volume below.'}
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

                                                {activeBook.articles?.length ? (
                                                    <ol className="mt-5 divide-y divide-[#ebe5d8]">
                                                        {activeBook.articles.map((article, index) => (
                                                            <li key={article.doi || article.title} className="py-4 first:pt-0 last:pb-0">
                                                                <div className="flex items-start gap-3">
                                                                    <span className="mt-0.5 shrink-0 font-serif text-sm text-[#a17a30]">
                                                                        {String(index + 1).padStart(2, '0')}
                                                                    </span>
                                                                    <div className="min-w-0">
                                                                        <h4 className="font-serif text-sm font-semibold leading-6 text-[#263d30] sm:text-base">
                                                                            {article.title}
                                                                        </h4>
                                                                        <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-2">
                                                                            {article.doi && (
                                                                                <a
                                                                                    href={`https://doi.org/${article.doi}`}
                                                                                    target="_blank"
                                                                                    rel="noreferrer"
                                                                                    className="break-all text-[11px] font-medium text-[#657467] underline decoration-[#c4cdbf] underline-offset-4 transition-colors hover:text-[#9a7125]"
                                                                                >
                                                                                    DOI: {article.doi}
                                                                                </a>
                                                                            )}
                                                                            {article.pdf && (
                                                                                <a
                                                                                    href={article.pdf}
                                                                                    target="_blank"
                                                                                    rel="noreferrer"
                                                                                    className="inline-flex items-center gap-1 text-[11px] font-bold text-[#9a7125] transition-colors hover:text-[#705116]"
                                                                                >
                                                                                    Open full text
                                                                                    <span aria-hidden="true">↗</span>
                                                                                </a>
                                                                            )}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </li>
                                                        ))}
                                                    </ol>
                                                ) : activeBook.pdf ? (
                                                    <div className="mt-5">
                                                        <a
                                                            href={activeBook.pdf}
                                                            target="_blank"
                                                            rel="noreferrer"
                                                            className="inline-flex items-center gap-2 rounded-full bg-[#17372b] px-5 py-3 text-xs font-bold text-white transition-colors hover:bg-[#24533e] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#a77b28] focus-visible:ring-offset-2"
                                                        >
                                                            Open full volume
                                                            <span aria-hidden="true">↗</span>
                                                        </a>
                                                        <iframe
                                                            title={`${activeBook.edition} (${activeBook.year}) full volume`}
                                                            src={`${activeBook.pdf}#toolbar=1&navpanes=0`}
                                                            className="mt-5 h-[65vh] min-h-[420px] w-full rounded-md border border-[#e2d9c5] bg-white"
                                                        />
                                                    </div>
                                                ) : (
                                                    <p className="mt-5 text-sm leading-6 text-[#68766d]">
                                                        Contents for this volume are not available yet.
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    </motion.article>
                                ) : (
                                    <div className="flex min-h-[280px] items-center justify-center rounded-r-lg border border-dashed border-[#d8caa4] bg-[#fffdf6] p-8 text-center">
                                        <div>
                                            <svg
                                                aria-hidden="true"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="1.5"
                                                className="mx-auto h-10 w-10 text-[#9a7125]"
                                            >
                                                <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v17H6.5A2.5 2.5 0 0 0 4 22V5.5Z" />
                                                <path d="M4 5.5V22m0-2h16M8 7h8m-8 4h8" />
                                            </svg>
                                            <p className="mt-4 font-serif text-sm text-[#68766d]">
                                                Select a book to open its contents.
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </section>
            </main>
        </MainLayout>
    );
}
