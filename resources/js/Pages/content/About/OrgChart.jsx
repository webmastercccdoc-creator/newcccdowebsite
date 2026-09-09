import { useCallback, useEffect, useRef, useState } from 'react';
import MainLayout from '../../../layouts/MainLayout';
import AnimatedBannerText from '../../../components/content/AnimatedBannerText';
import { motion, AnimatePresence } from 'framer-motion';

// Import SVG images
import OrgChartImage from '../../../assets/OrgChart/OrgChart.svg';
import PresidentsUnit from '../../../assets/OrgChart/PresidentsUnit.svg';
import AdministrationFinance from '../../../assets/OrgChart/AdministrationFinance.svg';
import AcademicAffairs from '../../../assets/OrgChart/AcademicAffairs.svg';
import ResearchExtension from '../../../assets/OrgChart/ResearchExtension.svg';

/* ============================================================================
   CONSTANTS & DATA
============================================================================ */

const EASE = [0.22, 1, 0.36, 1];
const ROMAN = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'];

const charts = [
  {
    id: 'organizational-chart',
    label: 'Complete Organizational Structure',
    eyebrow: 'Master Chart',
    plate: 'PLATE I',
    img: OrgChartImage,
    desc: 'The complete institutional structure — from the Governing Board to every cluster and office of the college.',
  },
  {
    id: 'presidents-unit',
    label: "President's Unit",
    eyebrow: 'Wing I',
    plate: 'PLATE II',
    img: PresidentsUnit,
    desc: 'Offices reporting directly to the Office of the President.',
  },
  {
    id: 'administration-finance',
    label: 'Administration & Finance Cluster',
    eyebrow: 'Wing II',
    plate: 'PLATE III',
    img: AdministrationFinance,
    desc: 'Administrative services, finance, and support operations of the college.',
  },
  {
    id: 'academic-affairs',
    label: 'Academic Affairs Cluster',
    eyebrow: 'Wing III',
    plate: 'PLATE IV',
    img: AcademicAffairs,
    desc: 'Instruction, learning, and academic programs across the institution.',
  },
  {
    id: 'research-extension',
    label: 'Research & Extension Cluster',
    eyebrow: 'Wing IV',
    plate: 'PLATE V',
    img: ResearchExtension,
    desc: 'Research, development, extension, and community engagement services.',
  },
];

const MASTER = charts[0];
const WINGS = charts.slice(1);

/* ============================================================================
   ICONS
============================================================================ */

const ExpandIcon = () => (
  <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
  </svg>
);

const CloseIcon = () => (
  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
    <path d="M18 6L6 18M6 6l12 12" />
  </svg>
);

const ArrowLeftIcon = () => (
  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 12H5M12 19l-7-7 7-7" />
  </svg>
);

const ArrowRightIcon = () => (
  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

/* ============================================================================
   HOOKS & SHARED PIECES
============================================================================ */

/** Cursor-following gold spotlight — tuned for white sheets on the dark hall */
function useSpotlight() {
  const ref = useRef(null);
  const onMouseMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${e.clientX - r.left}px`);
    el.style.setProperty('--my', `${e.clientY - r.top}px`);
  };
  return [ref, onMouseMove];
}

/** Illuminated white exhibit sheet with gold corner ticks + cursor spotlight */
function ExhibitSheet({ src, alt, onOpen, delay = 0, compact = false }) {
  const [ref, onMouseMove] = useSpotlight();

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMouseMove}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.75, delay, ease: EASE }}
      onClick={onOpen}
      className={`exhibit-sheet group relative cursor-zoom-in overflow-hidden rounded-xl bg-white shadow-[0_36px_80px_-30px_rgba(0,0,0,0.75)] ring-1 ring-white/15 ${
        compact ? 'p-3 sm:p-4' : 'p-3 sm:p-6 md:p-8'
      }`}
    >
      {/* Cursor spotlight on the white paper */}
      <span className="sheet-spotlight" />

      {/* Gold corner ticks */}
      <span className="pointer-events-none absolute left-2 top-2 z-10 h-4 w-4 border-l-2 border-t-2 border-[#C9A227]/35 transition-colors duration-500 group-hover:border-[#C9A227]" />
      <span className="pointer-events-none absolute right-2 top-2 z-10 h-4 w-4 border-r-2 border-t-2 border-[#C9A227]/35 transition-colors duration-500 group-hover:border-[#C9A227]" />
      <span className="pointer-events-none absolute bottom-2 left-2 z-10 h-4 w-4 border-b-2 border-l-2 border-[#C9A227]/35 transition-colors duration-500 group-hover:border-[#C9A227]" />
      <span className="pointer-events-none absolute bottom-2 right-2 z-10 h-4 w-4 border-b-2 border-r-2 border-[#C9A227]/35 transition-colors duration-500 group-hover:border-[#C9A227]" />

      <img
        src={src}
        alt={alt}
        loading="lazy"
        draggable="false"
        className="relative h-auto w-full select-none"
      />

      {/* Hover hint (desktop) */}
      <span className="pointer-events-none absolute bottom-4 right-4 hidden items-center gap-2 rounded-full bg-[#0B1524]/85 px-4 py-2 text-[9px] font-semibold uppercase tracking-[0.25em] text-[#E7C766] opacity-0 backdrop-blur-sm transition-opacity duration-500 group-hover:opacity-100 md:flex">
        <ExpandIcon />
        Click to zoom
      </span>
    </motion.div>
  );
}

/** Hairline divider with a center gold diamond */
function GoldDivider({ className = '' }) {
  return (
    <div className={`flex items-center gap-4 ${className}`} aria-hidden="true">
      <span className="h-px flex-1 bg-gradient-to-r from-transparent via-[#C9A227]/25 to-[#C9A227]/40" />
      <span className="h-1.5 w-1.5 rotate-45 bg-[#C9A227]" />
      <span className="h-px flex-1 bg-gradient-to-l from-transparent via-[#C9A227]/25 to-[#C9A227]/40" />
    </div>
  );
}

/* ============================================================================
   PAGE
============================================================================ */

export default function OrgChart() {
  const [view, setView] = useState(null); // lightbox index, null = closed

  const openAt = (i) => setView(i);
  const close = () => setView(null);

  /* Circular browsing inside the lightbox */
  const step = useCallback((d) => {
    setView((v) => (v === null ? v : (v + d + charts.length) % charts.length));
  }, []);

  /* Keyboard: ESC closes · ← → browse · body scroll-lock while open */
  useEffect(() => {
    if (view === null) return;

    const onKey = (e) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowRight') step(1);
      if (e.key === 'ArrowLeft') step(-1);
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [view, step]);

  const current = view !== null ? charts[view] : null;

  const scrollToExhibit = (id) => {
    document.getElementById(`exhibit-${id}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <MainLayout
      maxWidth="full"
      containerClassName="px-0"
      mainClassName="py-0"
      className="overflow-hidden pb-0"
    >
      {/* ==================================================================
          HERO BANNER  (unchanged)
      ================================================================== */}
      <div
        className="relative w-full bg-cover bg-center bg-no-repeat shadow-lg min-h-[350px] md:min-h-[450px] lg:min-h-[550px] flex items-center justify-center"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1523050854058-8df90110c7f1?q=80&w=1200&auto=format&fit=crop')`
        }}
      >
        {/* Dark Overlay for text readability */}
        <div className="absolute inset-0 bg-black/50"></div>

        <AnimatedBannerText title="Organizational Chart" description="Our institutional structure and leadership framework at the City College of Cagayan de Oro." />
      </div>

      {/* ==================================================================
          THE DARK GALLERY — everything below the banner is an ink-black hall
      ================================================================== */}
      <section className="hall relative overflow-hidden bg-[#0B1524] pb-28 md:pb-36">
        <div className="grain-overlay" />

        {/* Ambient gold atmosphere */}
        <div className="pointer-events-none absolute -top-40 left-1/2 h-[420px] w-[820px] -translate-x-1/2 rounded-full bg-[#C9A227]/[0.07] blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 right-0 h-[360px] w-[520px] rounded-full bg-[#C9A227]/[0.04] blur-3xl" />

        <div className="relative mx-auto max-w-6xl px-6">

          {/* ==========================================
              OVERTURE — monumental opening statement + ToC
          ========================================== */}
          <div className="pt-16 text-center md:pt-24">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: EASE }}
              className="mb-7 flex items-center justify-center gap-4"
            >
              <span className="h-px w-10 bg-gradient-to-r from-transparent to-[#C9A227] md:w-16" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.4em] text-[#C9A227] md:text-xs">
                Official Registry
              </span>
              <span className="h-px w-10 bg-gradient-to-l from-transparent to-[#C9A227] md:w-16" />
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.75, delay: 0.1, ease: EASE }}
              className="font-display mx-auto max-w-3xl text-4xl font-light leading-[1.12] tracking-tight text-white md:text-6xl"
            >
              Ordered with intention.
              <br />
              <span className="italic text-[#E7C766]">United in service.</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
              className="mx-auto mt-6 max-w-2xl leading-relaxed text-white/50"
            >
              Five official documents, presented as a single exhibition — mapping how
              the City College of Cagayan de Oro is organized, from the highest office
              to every operating cluster.
            </motion.p>
          </div>

          {/* --- Table of Contents — fine-print, dotted leaders --- */}
          <motion.nav
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3, ease: EASE }}
            className="mx-auto mt-14 max-w-3xl"
            aria-label="Registry contents"
          >
            <div className="mb-4 flex items-center justify-between">
              <span className="text-[10px] font-semibold uppercase tracking-[0.35em] text-[#C9A227]">
                Contents of the Registry
              </span>
              <span className="text-[10px] uppercase tracking-[0.3em] text-white/30">
                05 Plates
              </span>
            </div>

            <ul className="border-t border-white/10">
              {charts.map((chart, i) => (
                <li key={chart.id} className="border-b border-white/10">
                  <button
                    onClick={() => scrollToExhibit(chart.id)}
                    className="group flex w-full min-w-0 items-baseline gap-3 px-2 py-3.5 text-left transition-colors duration-300 hover:bg-white/[0.03] md:gap-4 md:px-4"
                  >
                    <span className="font-display w-6 shrink-0 text-sm text-[#C9A227]">
                      {ROMAN[i]}
                    </span>
                    <span className="min-w-0 truncate text-[13px] text-white/65 transition-colors duration-300 group-hover:text-white md:text-sm">
                      {chart.label}
                    </span>
                    <span
                      className="mx-1 flex-1 -translate-y-1 border-b border-dotted border-white/15 transition-colors duration-300 group-hover:border-[#C9A227]/50"
                      aria-hidden="true"
                    />
                    <span className="shrink-0 text-[9px] uppercase tracking-[0.3em] text-white/30 transition-colors duration-300 group-hover:text-[#C9A227]">
                      {chart.plate}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </motion.nav>

          {/* ==========================================
              EXHIBIT I — THE MASTER CHART
              Certificate-framed, under a gold spotlight beam
          ========================================== */}
          <div id="exhibit-organizational-chart" className="scroll-mt-10 pt-24 md:pt-32">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, ease: EASE }}
              className="mb-10 text-center"
            >
              <div className="mb-3 flex items-center justify-center gap-3">
                <span className="text-[10px] font-semibold tracking-[0.35em] text-[#C9A227]">
                  {MASTER.plate}
                </span>
                <span className="h-px w-6 bg-[#C9A227]/50" />
                <span className="text-[10px] uppercase tracking-[0.3em] text-white/35">
                  {MASTER.eyebrow}
                </span>
              </div>
              <h3 className="font-display text-3xl font-light text-white md:text-5xl">
                {MASTER.label}
              </h3>
              <p className="mx-auto mt-4 max-w-xl text-[14px] leading-relaxed text-white/45">
                {MASTER.desc}
              </p>
            </motion.div>

            {/* Spotlight beam from above */}
            <div className="relative mx-auto max-w-4xl">
              <div className="pointer-events-none absolute -top-28 left-1/2 z-0 h-[420px] w-[680px] -translate-x-1/2 rounded-[50%] bg-[radial-gradient(ellipse_at_top,rgba(201,162,39,0.16),transparent_62%)] blur-2xl" />

              {/* Certificate double-rule frame */}
              <motion.div
                initial={{ opacity: 0, y: 36 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.8, ease: EASE }}
                className="relative z-10 rounded-2xl border border-[#C9A227]/30 bg-white/95 p-1.5 shadow-[0_50px_100px_-40px_rgba(0,0,0,0.9)]"
              >
                <div className="rounded-xl border border-[#C9A227]/15">
                  <div
                    onClick={() => openAt(0)}
                    className="exhibit-sheet group relative m-1.5 cursor-zoom-in overflow-hidden rounded-lg p-3 sm:p-5 md:p-7"
                  >
                    <span className="sheet-spotlight" />

                    {/* OFFICIAL stamp */}
                    <span className="absolute right-4 top-4 z-20 hidden -rotate-12 select-none border border-[#C9A227]/30 px-2.5 py-1 text-[8px] font-semibold tracking-[0.35em] text-[#A8842C]/50 md:block">
                      OFFICIAL
                    </span>

                    <img
                      src={MASTER.img}
                      alt={`${MASTER.label} — official organizational chart`}
                      draggable="false"
                      className="relative h-auto w-full select-none"
                    />

                    <span className="pointer-events-none absolute bottom-4 right-4 hidden items-center gap-2 rounded-full bg-[#0B1524]/85 px-4 py-2 text-[9px] font-semibold uppercase tracking-[0.25em] text-[#E7C766] opacity-0 backdrop-blur-sm transition-opacity duration-500 group-hover:opacity-100 md:flex">
                      <ExpandIcon />
                      Click to zoom
                    </span>
                  </div>
                </div>
              </motion.div>

              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="mt-5 text-center text-[10px] uppercase tracking-[0.3em] text-white/30"
              >
                Click the chart to view fullscreen
              </motion.p>
            </div>
          </div>

          {/* ==========================================
              WINGS I–IV — alternating editorial exhibit bands
          ========================================== */}
          {WINGS.map((chart, i) => {
            const flip = i % 2 === 1;
            const globalIndex = i + 1;

            return (
              <div key={chart.id}>
                <GoldDivider className="mx-auto mt-24 max-w-4xl md:mt-32" />

                <div
                  id={`exhibit-${chart.id}`}
                  className="scroll-mt-10 pt-20 md:pt-28"
                >
                  <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">

                    {/* --- Text column --- */}
                    <motion.div
                      initial={{ opacity: 0, y: 26 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: '-80px' }}
                      transition={{ duration: 0.7, ease: EASE }}
                      className={`relative ${flip ? 'lg:order-2' : ''}`}
                    >
                      {/* Giant ghost numeral behind the text */}
                      <span
                        aria-hidden="true"
                        className={`ghost-numeral font-display pointer-events-none absolute -top-14 select-none text-[110px] font-light leading-none md:-top-20 md:text-[170px] ${
                          flip ? '-right-3 md:-right-6' : '-left-3 md:-left-6'
                        }`}
                      >
                        {ROMAN[globalIndex]}
                      </span>

                      <div className="relative">
                        <div className="mb-4 flex items-center gap-3">
                          <span className="text-[10px] font-semibold uppercase tracking-[0.35em] text-[#C9A227]">
                            {chart.eyebrow}
                          </span>
                          <span className="h-px w-8 bg-[#C9A227]/40" />
                          <span className="text-[10px] uppercase tracking-[0.3em] text-white/30">
                            {chart.plate}
                          </span>
                        </div>

                        <h3 className="font-display max-w-md text-3xl font-light leading-[1.15] text-white md:text-[40px]">
                          {chart.label}
                        </h3>

                        <p className="mt-5 max-w-md leading-relaxed text-white/45">
                          {chart.desc}
                        </p>

                        <button
                          onClick={() => openAt(globalIndex)}
                          className="group mt-8 inline-flex items-center gap-3 rounded-full border border-[#C9A227]/40 px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.25em] text-[#E7C766] transition-all duration-400 hover:border-[#C9A227] hover:bg-[#C9A227]/10"
                        >
                          View Fullscreen
                          <span className="transition-transform duration-400 group-hover:translate-x-1">
                            <ArrowRightIcon />
                          </span>
                        </button>
                      </div>
                    </motion.div>

                    {/* --- Chart column --- */}
                    <div className={flip ? 'lg:order-1' : ''}>
                      <ExhibitSheet
                        src={chart.img}
                        alt={`${chart.label} — official organizational chart`}
                        onOpen={() => openAt(globalIndex)}
                        delay={0.12}
                        compact
                      />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          {/* ==========================================
              CONTACT NOTE
          ========================================== */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="mt-24 flex flex-col items-center gap-4 text-center md:mt-32"
          >
            <GoldDivider className="w-full max-w-xs" />
            <p className="max-w-md text-sm leading-relaxed text-white/40">
              For updates or corrections to the organizational chart, please contact the{' '}
              <span className="font-medium text-[#E7C766]">Office of the President</span>.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ==================================================================
          CLOSING STATEMENT BAND — monumental serif (continuous with the hall)
      ================================================================== */}
      <section className="relative overflow-hidden border-t border-white/[0.06] bg-[#0B1524] py-24 md:py-32">
        <div className="grain-overlay" />
        <div className="pointer-events-none absolute -top-32 left-1/2 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-[#C9A227]/[0.09] blur-3xl" />
        <span className="font-display pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 select-none text-[220px] leading-none text-white/[0.04]">
          &ldquo;
        </span>

        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-10 flex items-center justify-center gap-4"
          >
            <span className="h-px w-14 bg-gradient-to-r from-transparent to-[#C9A227]/70" />
            <span className="h-1.5 w-1.5 rotate-45 bg-[#C9A227]" />
            <span className="h-px w-14 bg-gradient-to-l from-transparent to-[#C9A227]/70" />
          </motion.div>

          <motion.blockquote
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
            className="font-display text-3xl font-light leading-[1.25] text-white md:text-[44px]"
          >
            Every office, every cluster —{' '}
            <span className="italic text-[#E7C766]">one purpose:</span>{' '}
            the education and upliftment of our community.
          </motion.blockquote>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.35 }}
            className="mt-10 flex flex-col items-center gap-2"
          >
            <span className="text-[11px] font-semibold uppercase tracking-[0.4em] text-[#C9A227]">
              City College of Cagayan de Oro
            </span>
            <span className="text-[10px] uppercase tracking-[0.3em] text-white/35">
              Organizational Chart
            </span>
          </motion.div>
        </div>
      </section>

      {/* ==================================================================
          FULLSCREEN LIGHTBOX — zoom viewer with prev/next browsing (kept)
      ================================================================== */}
      <AnimatePresence>
        {current && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={close}
            role="dialog"
            aria-modal="true"
            aria-label={`${current.label} — fullscreen viewer`}
            className="fixed inset-0 z-[100] flex flex-col bg-black/90 p-4 backdrop-blur-md md:p-8"
          >
            <div className="grain-overlay" />

            <motion.div
              initial={{ scale: 0.95, y: 24 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.96, y: 16 }}
              transition={{ duration: 0.35, ease: EASE }}
              onClick={(e) => e.stopPropagation()}
              className="relative mx-auto flex h-full w-full max-w-6xl flex-col"
            >
              {/* Header: plate caption · counter · arrows · close */}
              <div className="flex items-center justify-between gap-4 pb-4">
                <div className="flex min-w-0 items-center gap-3">
                  <span className="shrink-0 text-[10px] font-semibold tracking-[0.35em] text-[#C9A227]">
                    {current.plate}
                  </span>
                  <span className="h-px w-6 shrink-0 bg-[#C9A227]/50" />
                  <span className="truncate text-sm text-white/80">{current.label}</span>
                </div>

                <div className="flex shrink-0 items-center gap-3">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => step(-1)}
                      aria-label="Previous chart"
                      className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/60 transition-colors duration-300 hover:border-[#C9A227] hover:text-[#E7C766]"
                    >
                      <ArrowLeftIcon />
                    </button>
                    <button
                      onClick={() => step(1)}
                      aria-label="Next chart"
                      className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/60 transition-colors duration-300 hover:border-[#C9A227] hover:text-[#E7C766]"
                    >
                      <ArrowRightIcon />
                    </button>
                  </div>

                  <span className="hidden text-[10px] tracking-[0.3em] text-white/35 sm:block">
                    {String(view + 1).padStart(2, '0')} / {String(charts.length).padStart(2, '0')}
                  </span>

                  <button
                    onClick={close}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/60 transition-colors duration-300 hover:border-[#C9A227] hover:bg-[#C9A227]/10 hover:text-[#E7C766]"
                    aria-label="Close viewer"
                  >
                    <CloseIcon />
                  </button>
                </div>
              </div>

              {/* Chart — scrollable, full width */}
              <div className="flex-1 overflow-auto rounded-xl bg-white p-3 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.8)] sm:p-6 md:p-8">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={current.id}
                    initial={{ opacity: 0, scale: 0.985 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.985 }}
                    transition={{ duration: 0.3, ease: EASE }}
                    src={current.img}
                    alt={`${current.label} — official organizational chart`}
                    className="mx-auto h-auto w-full select-none"
                    draggable="false"
                  />
                </AnimatePresence>
              </div>

              <p className="pt-3 text-center text-[10px] uppercase tracking-[0.3em] text-white/30">
                Press ESC to close &middot; use &larr; &rarr; to browse plates
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ==========================================================================
          PAGE-LEVEL STYLES — fonts, textures, micro-interactions
      ========================================================================== */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300..600;1,9..144,300..600&family=Inter:wght@300;400;500;600&display=swap');

        .font-display {
          font-family: 'Fraunces', 'Georgia', serif;
          font-optical-sizing: auto;
        }

        /* --- Film grain --- */
        .grain-overlay {
          position: absolute; inset: 0; pointer-events: none; opacity: 0.07;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='160' height='160' filter='url(%23n)'/%3E%3C/svg%3E");
        }

        /* --- Ghost numerals — gold outline on the dark hall --- */
        .ghost-numeral {
          -webkit-text-stroke: 1.5px rgba(201, 162, 39, 0.22);
          color: transparent;
        }

        /* --- Cursor spotlight on white exhibit sheets --- */
        .sheet-spotlight {
          position: absolute; inset: 0; pointer-events: none; opacity: 0;
          transition: opacity 0.5s ease;
          background: radial-gradient(
            420px circle at var(--mx, 50%) var(--my, 50%),
            rgba(201, 162, 39, 0.13),
            transparent 45%
          );
        }
        .exhibit-sheet { transition: box-shadow 0.5s ease; }
        .exhibit-sheet:hover .sheet-spotlight { opacity: 1; }
      `}</style>
    </MainLayout>
  );
}