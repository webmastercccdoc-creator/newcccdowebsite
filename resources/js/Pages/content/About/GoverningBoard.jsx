import { useEffect, useRef } from 'react';
import MainLayout from '../../../layouts/MainLayout';
import AnimatedBannerText from '../../../components/content/AnimatedBannerText';
import { motion } from 'framer-motion';

// Import images (PNG format)
import GoverningBoardImage1 from '../../../assets/GoverningBoard/governing-board1.png';
import GoverningBoardImage2 from '../../../assets/GoverningBoard/governing-board2.png';
import GoverningBoardImage3 from '../../../assets/banner/coregoals-banner.png';

// Logo
import cccoLogo from '../../../assets/logos/ccdologo.png';

/* ============================================================================
   CONSTANTS & DATA
============================================================================ */

const EASE = [0.22, 1, 0.36, 1];
const ROMAN = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'];

const officers = [
  {
    role: 'Chairperson',
    name: 'City Mayor',
    desc: 'The presiding officer of the Board — leading the highest policy-making body of the City College of Cagayan de Oro.',
    note: 'Presides over the Board',
    icon: 'landmark',
  },
  {
    role: 'Vice Chairperson',
    name: 'City College President',
    desc: 'Head of the institution — serving as second officer of the Board, bridging governance and daily institutional leadership.',
    note: 'Head of the institution',
    icon: 'shield',
  },
];

const boardMembers = [
  { tag: 'Faculty', text: 'President of the duly recognized Faculty Association' },
  { tag: 'Student Body', text: 'President of the duly recognized Supreme Student Council / Government' },
  { tag: 'Alumni', text: 'President of the duly recognized Alumni Association' },
  { tag: 'Legislative', text: "Chairperson of the City Council's Committee on Education" },
  { tag: 'DOST · Region X', text: 'A representative of the Department of Science and Technology – Region X' },
  { tag: 'DA · Region X', text: 'A representative of the Department of Agriculture – Region X' },
  { tag: 'DTI · Region X', text: 'A representative of the Department of Trade and Industry – Region X' },
  { tag: 'DepEd · CDO Division', text: 'A representative of the Department of Education – Division of Cagayan de Oro' },
  { tag: 'IPS', text: 'A representative of the Nahilaran IPS' },
  { tag: 'NCIP · Region X', text: 'A representative of the National Commission on Indigenous Peoples (NCIP) – Region X' },
];

const STATS = [
  { num: '02', label: 'Presiding Officers' },
  { num: '10', label: 'Regular Members' },
  { num: '01', label: 'Shared Mandate' },
];

/* ============================================================================
   HOOKS & ICONS
============================================================================ */

/** Cursor-following gold spotlight for premium cards */
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

const LandmarkIcon = () => (
  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 21h18M4 18h16M6 18v-7M10 18v-7M14 18v-7M18 18v-7M3 8l9-5 9 5H3z" />
  </svg>
);

const ShieldIcon = () => (
  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6l7-3z" />
    <path d="M9.5 12l2 2 3.5-4" />
  </svg>
);

/* ============================================================================
   SUB-COMPONENTS
============================================================================ */

function OfficerCard({ officer, index }) {
  const [ref, onMouseMove] = useSpotlight();

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMouseMove}
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.65, delay: index * 0.12, ease: EASE }}
      className="lux-card group relative overflow-hidden rounded-2xl border border-[#0B1524]/10 bg-white p-8 md:p-10"
    >
      <div className="spotlight" />
      <span className="absolute left-0 top-0 h-[3px] w-full bg-gradient-to-r from-[#C9A227] via-[#E7C766]/70 to-transparent opacity-80" />

      <div className="relative">
        <div className="mb-6 flex items-start justify-between">
          <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-[#C9A227]/30 bg-[#C9A227]/[0.07] text-[#A8842C]">
            {officer.icon === 'landmark' ? <LandmarkIcon /> : <ShieldIcon />}
          </span>
          <span className="ghost-num font-display text-6xl font-light leading-none">{ROMAN[index]}</span>
        </div>

        <span className="text-[11px] font-semibold uppercase tracking-[0.35em] text-[#A8842C]">
          {officer.role}
        </span>
        <h3 className="font-display mt-2 text-3xl font-medium text-[#0B1524] md:text-4xl">
          {officer.name}
        </h3>
        <p className="mt-4 text-[15px] leading-relaxed text-neutral-600">{officer.desc}</p>

        <div className="mt-8 flex items-center gap-3">
          <span className="h-px flex-1 bg-[#0B1524]/10 transition-colors duration-500 group-hover:bg-[#C9A227]/40" />
          <span className="text-[10px] uppercase tracking-[0.3em] text-neutral-400">{officer.note}</span>
          <span className="h-1.5 w-1.5 rotate-45 bg-[#C9A227]" />
        </div>
      </div>
    </motion.div>
  );
}

/** Museum-style archival frame with gold corner ticks + plate caption */
function ArchiveFrame({ src, alt, plate, caption, delay = 0, className = '' }) {
  return (
    <motion.figure
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay, ease: EASE }}
      className={`lux-card group relative overflow-hidden rounded-2xl border border-[#0B1524]/10 bg-white p-3 md:p-4 ${className}`}
    >
      {/* Gold corner ticks */}
      <span className="pointer-events-none absolute left-2 top-2 h-4 w-4 border-l border-t border-[#C9A227]/0 transition-colors duration-500 group-hover:border-[#C9A227]/80" />
      <span className="pointer-events-none absolute right-2 top-2 h-4 w-4 border-r border-t border-[#C9A227]/0 transition-colors duration-500 group-hover:border-[#C9A227]/80" />
      <span className="pointer-events-none absolute bottom-2 left-2 h-4 w-4 border-b border-l border-[#C9A227]/0 transition-colors duration-500 group-hover:border-[#C9A227]/80" />
      <span className="pointer-events-none absolute bottom-2 right-2 h-4 w-4 border-b border-r border-[#C9A227]/0 transition-colors duration-500 group-hover:border-[#C9A227]/80" />

      <div className="overflow-hidden rounded-xl ring-1 ring-[#0B1524]/[0.06]">
        <img
          src={src}
          alt={alt}
          className="w-full transition-transform duration-[900ms] ease-out group-hover:scale-[1.045]"
        />
      </div>

      <figcaption className="flex items-center justify-between gap-4 px-3 pb-2 pt-4 md:px-4">
        <div className="flex items-center gap-3">
          <span className="text-[10px] font-semibold tracking-[0.35em] text-[#A8842C]">{plate}</span>
          <span className="h-px w-6 bg-[#C9A227]/50" />
          <span className="text-xs tracking-wide text-neutral-500">{caption}</span>
        </div>
        <span className="hidden h-1.5 w-1.5 shrink-0 rotate-45 bg-[#C9A227]/60 sm:block" />
      </figcaption>
    </motion.figure>
  );
}

/** Slow-rotating official seal with the CCDO logo at its heart */
function Seal() {
  return (
    <div className="relative flex h-36 w-36 items-center justify-center rounded-full bg-white shadow-[0_24px_50px_-24px_rgba(11,21,36,0.4)] ring-1 ring-[#0B1524]/10 md:h-40 md:w-40">
      {/* Rotating text ring */}
      <svg viewBox="0 0 100 100" className="animate-spin-slow absolute inset-0 h-full w-full">
        <defs>
          <path id="seal-circle" d="M 50,50 m -37,0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" fill="none" />
        </defs>
        <text fill="#A8842C" fontSize="7.2" fontWeight="600" letterSpacing="1.5">
          <textPath href="#seal-circle" textLength="230" lengthAdjust="spacingAndGlyphs">
            GOVERNING BOARD • CITY COLLEGE OF CDO • OFFICIAL •
          </textPath>
        </text>
      </svg>

      {/* Dashed gold inner ring */}
      <div className="absolute inset-[16%] rounded-full border border-dashed border-[#C9A227]/40" />

      {/* CCDO Logo */}
      <img
        src={cccoLogo}
        alt="City College of Cagayan de Oro"
        draggable="false"
        className="relative h-14 w-14 object-contain select-none md:h-16 md:w-16"
      />
    </div>
  );
}

/* ============================================================================
   PAGE
============================================================================ */

export default function GoverningBoard() {
  useEffect(() => {
    document.title = 'Governing Board - City College of Cagayan de Oro';
  }, []);

  return (
    <MainLayout maxWidth="full" containerClassName="px-0" mainClassName="py-0" className="overflow-hidden pb-0">

      {/* ==================================================================
          HERO BANNER  (unchanged)
      ================================================================== */}
      <div
        className="relative w-full bg-cover bg-center bg-no-repeat shadow-lg min-h-[350px] md:min-h-[450px] lg:min-h-[550px] flex items-center justify-center"
        style={{ backgroundImage: `url('${GoverningBoardImage3}')` }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <AnimatedBannerText title="Governing Board" description="The highest policy-making body of the City College of Cagayan de Oro." />
      </div>

      {/* ==================================================================
          INTRO — editorial statement with stats
      ================================================================== */}
      <section className="relative overflow-hidden bg-[#FAF8F3]">
        <div className="pointer-events-none absolute -top-48 left-1/2 h-[480px] w-[900px] -translate-x-1/2 rounded-full bg-[#C9A227]/[0.08] blur-3xl" />
        <div className="dot-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />

        <div className="relative mx-auto max-w-4xl px-6 pb-16 pt-20 text-center md:pt-24">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: EASE }}
            className="mb-7 flex items-center justify-center gap-4"
          >
            <span className="h-px w-10 bg-gradient-to-r from-transparent to-[#C9A227] md:w-16" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.4em] text-[#A8842C] md:text-xs">
              Institutional Governance
            </span>
            <span className="h-px w-10 bg-gradient-to-l from-transparent to-[#C9A227] md:w-16" />
          </motion.div>

          {/* Display heading */}
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
            className="font-display text-4xl font-light leading-[1.1] tracking-tight text-[#0B1524] md:text-6xl"
          >
            Stewarded with vision.
            <br />
            <span className="italic text-[#A8842C]">Governed with purpose.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
            className="mx-auto mt-6 max-w-2xl leading-relaxed text-neutral-600"
          >
            The Governing Board stands as the highest policy-making body of the City
            College of Cagayan de Oro — uniting the city government, the academe,
            industry, and the community in one shared stewardship of public education.
          </motion.p>

          {/* Stats divider */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.35 }}
            className="mt-12 flex flex-wrap items-center justify-center"
          >
            {STATS.map((s, i) => (
              <div key={s.label} className="flex items-center">
                <div className="px-5 text-center md:px-9">
                  <div className="font-display text-3xl text-[#A8842C] md:text-4xl">{s.num}</div>
                  <div className="mt-1.5 text-[10px] uppercase tracking-[0.3em] text-neutral-500">
                    {s.label}
                  </div>
                </div>
                {i < STATS.length - 1 && <span className="hidden h-10 w-px bg-neutral-900/10 sm:block" />}
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ==================================================================
          COMPOSITION — officers + members ledger
      ================================================================== */}
      <section className="relative bg-[#FAF8F3] pb-28 md:pb-36">
        <div className="mx-auto max-w-6xl px-6">

          {/* --- Presiding officers --- */}
          <div className="mb-2 flex items-center gap-5">
            <span className="text-[11px] font-semibold tracking-[0.35em] text-[#A8842C]">
              THE BOARD
            </span>
            <span className="h-px flex-1 bg-gradient-to-r from-[#C9A227]/50 to-transparent" />
            <span className="text-[11px] tracking-[0.3em] text-neutral-400">
              COMPOSITION
            </span>
          </div>
          <p className="font-display mb-10 text-lg italic text-neutral-500">
            The two officers at the helm of the institution&rsquo;s governance.
          </p>

          <div className="mb-20 grid grid-cols-1 gap-6 md:grid-cols-2">
            {officers.map((officer, i) => (
              <OfficerCard key={officer.role} officer={officer} index={i} />
            ))}
          </div>

          {/* --- Regular members ledger --- */}
          <div className="mx-auto max-w-5xl">
            <div className="mb-2 flex items-center gap-5">
              <span className="text-[11px] font-semibold tracking-[0.35em] text-[#A8842C]">
                REGULAR MEMBERS
              </span>
              <span className="h-px flex-1 bg-gradient-to-r from-[#C9A227]/50 to-transparent" />
            </div>
            <p className="font-display mb-8 text-lg italic text-neutral-500">
              Representing the academe, the student body, the alumni, and the community.
            </p>

            <div className="border-t border-[#0B1524]/10">
              {boardMembers.map((member, i) => (
                <motion.div
                  key={member.tag}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.55, delay: i * 0.05, ease: EASE }}
                  className="member-row group relative grid cursor-default grid-cols-[auto,1fr] items-start gap-x-6 border-b border-[#0B1524]/10 px-2 py-6 md:gap-x-10 md:px-6 md:py-7"
                >
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#C9A227]/[0.07] to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                  <span className="ghost-num font-display select-none pt-1 text-4xl font-light leading-none md:text-5xl">
                    {String(i + 1).padStart(2, '0')}
                  </span>

                  <div className="relative">
                    <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#A8842C]">
                      {member.tag}
                    </span>
                    <p className="mt-1 text-[15px] leading-relaxed text-neutral-700 md:text-base">
                      {member.text}
                    </p>
                  </div>

                  <span className="lux-line absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-[#C9A227] to-[#C9A227]/0" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================================
          FROM THE RECORDS — archival gallery with rotating seal
      ================================================================== */}
      <section className="relative bg-white pb-24 md:pb-32">
        <div className="dot-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />

        {/* Seal straddling the section boundary */}
        <div className="relative z-10 -mt-[76px] flex justify-center">
          <Seal />
        </div>

        <div className="relative mx-auto max-w-6xl px-6 pt-14">
          <div className="mb-2 flex items-center gap-5">
            <span className="text-[11px] font-semibold tracking-[0.35em] text-[#A8842C]">
              OFFICIAL RECORDS
            </span>
            <span className="h-px flex-1 bg-gradient-to-r from-[#C9A227]/50 to-transparent" />
            <span className="text-[11px] tracking-[0.3em] text-neutral-400">02 PLATES</span>
          </div>
          <p className="font-display mb-12 text-lg italic text-neutral-500">
            Glimpses from the sessions of the Governing Board.
          </p>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <ArchiveFrame
              src={GoverningBoardImage1}
              alt="Governing Board Meeting"
              plate="PLATE I"
              caption="Official Governing Board session"
              delay={0}
            />
            <ArchiveFrame
              src={GoverningBoardImage2}
              alt="Governing Board Members"
              plate="PLATE II"
              caption="Members of the Governing Board"
              delay={0.15}
              className="md:mt-14"
            />
          </div>
        </div>
      </section>

      {/* ==================================================================
          CLOSING STATEMENT BAND — dark, grainy, monumental serif
      ================================================================== */}
      <section className="relative overflow-hidden bg-[#0B1524] py-24 md:py-32">
        <div className="grain-overlay" />
        <div className="pointer-events-none absolute -top-32 left-1/2 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-[#C9A227]/[0.09] blur-3xl" />
        <span className="font-display pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 select-none text-[220px] leading-none text-white/[0.04]">
          &ldquo;
        </span>

        <div className="relative mx-auto max-w-4xl px-6 text-center">
          {/* Ornament */}
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
            An institution governed with vision is{' '}
            <span className="italic text-[#E7C766]">a community served with purpose.</span>
          </motion.blockquote>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.35 }}
            className="mt-10 flex flex-col items-center gap-3"
          >
            {/* Logo mini-disc — keeps any PNG background clean on dark navy */}
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/95 shadow-[0_12px_30px_-10px_rgba(0,0,0,0.5)] ring-1 ring-[#C9A227]/40">
              <img
                src={cccoLogo}
                alt=""
                draggable="false"
                className="h-8 w-8 object-contain select-none"
              />
            </div>
            <span className="text-[11px] font-semibold uppercase tracking-[0.4em] text-[#C9A227]">
              City College of Cagayan de Oro
            </span>
            <span className="text-[10px] uppercase tracking-[0.3em] text-white/35">
              Governing Board
            </span>
          </motion.div>
        </div>
      </section>

      {/* ==========================================================================
          PAGE-LEVEL STYLES — fonts, textures, micro-interactions
      ========================================================================== */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300..600;1,9..144,300..600&family=Inter:wght@300;400;500;600&display=swap');

        .font-display {
          font-family: 'Fraunces', 'Georgia', serif;
          font-optical-sizing: auto;
        }

        /* --- Rotating seal --- */
        @keyframes spin-slow { to { transform: rotate(360deg); } }
        .animate-spin-slow { animation: spin-slow 28s linear infinite; }

        /* --- Film grain --- */
        .grain-overlay {
          position: absolute; inset: 0; pointer-events: none; opacity: 0.06;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='160' height='160' filter='url(%23n)'/%3E%3C/svg%3E");
        }

        /* --- Dot grid texture --- */
        .dot-grid {
          background-image: radial-gradient(rgba(11, 21, 36, 0.06) 1px, transparent 1px);
          background-size: 26px 26px;
        }

        /* --- Ghost numerals --- */
        .ghost-num {
          -webkit-text-stroke: 1.5px rgba(11, 21, 36, 0.18);
          color: transparent;
          transition: -webkit-text-stroke-color 0.5s ease;
        }
        .member-row:hover .ghost-num,
        .lux-card:hover .ghost-num {
          -webkit-text-stroke-color: rgba(168, 132, 44, 0.9);
        }

        /* --- Drawing gold underline on ledger rows --- */
        .lux-line {
          width: 0;
          transition: width 0.6s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .member-row:hover .lux-line { width: 100%; }

        /* --- Premium cards: lift + gold border + spotlight --- */
        .lux-card {
          transition: transform 0.5s cubic-bezier(0.22, 1, 0.36, 1),
                      border-color 0.4s ease,
                      box-shadow 0.5s ease;
        }
        .lux-card:hover {
          transform: translateY(-5px);
          border-color: rgba(168, 132, 44, 0.45);
          box-shadow: 0 28px 56px -28px rgba(11, 21, 36, 0.25);
        }
        .spotlight {
          position: absolute; inset: 0; pointer-events: none; opacity: 0;
          transition: opacity 0.5s ease;
          background: radial-gradient(
            480px circle at var(--mx, 50%) var(--my, 50%),
            rgba(201, 162, 39, 0.10),
            transparent 45%
          );
        }
        .lux-card:hover .spotlight { opacity: 1; }
      `}</style>
    </MainLayout>
  );
}