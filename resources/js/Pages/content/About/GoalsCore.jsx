import { useEffect, useRef, useState } from 'react';
import MainLayout from '../../../layouts/MainLayout';
import { motion, AnimatePresence } from 'framer-motion';
import coreGoalsBanner from '../../../assets/banner/coregoals-banner.png';

/* ============================================================================
   CONSTANTS & DATA
============================================================================ */

const EASE = [0.22, 1, 0.36, 1];
const ROMAN = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'];

const schoolGoals = [
  {
    title: 'Academic Excellence & Innovation',
    text: 'Establish a culture of academic excellence and innovation by integrating cutting-edge technologies, including artificial intelligence, into the curriculum.',
  },
  {
    title: 'Inclusivity & Cultural Sensitivity',
    text: 'Foster inclusivity and cultural sensitivity to address the needs of both the local youth and indigenous communities.',
  },
  {
    title: 'Sustainable Development',
    text: 'Actively contribute to sustainable development goals and drive positive change within the local community.',
  },
  {
    title: 'Integrity & Ethical Conduct',
    text: "Uphold an environment of transparency, integrity, mutual respect, and ethical conduct in all aspects of the institution's operations.",
  },
  {
    title: 'Environmental Stewardship',
    text: 'Pursue environmental sustainability and responsible development.',
  },
];

const coreValues = [
  { title: 'Adaptability', text: 'We embrace change and possess the flexibility to navigate evolving landscapes, a changing society, and the diversity of people, for advancing quality learning and preparing students for the 21st century and upliftment of the community.' },
  { title: 'Innovation', text: 'We push boundaries and explore new ideas that will lead to new and innovative solutions to poverty, social inequality, unemployment, digital divide, and climate change.', featured: true },
  { title: 'Commitment', text: 'We commit to a shared vision of making a meaningful difference and contributing to the greater good by providing and maintaining a student-centered campus experience where everyone is respected and empowered.' },
  { title: 'Integrity', text: 'We uphold an environment of transparency, integrity, and ethical conduct in all aspects of curriculum, instruction, research, and community engagements.' },
  { title: 'Inclusivity', text: 'We celebrate diversity and promote inclusivity in all aspects of our institution. We value unique backgrounds, experiences, and perspectives of our students, faculty, and staff.' },
  { title: 'Spirituality', text: 'We deeply acknowledge the profound importance of spirituality and moral grounding in our institution. Guided by principles of faith, compassion, and justice.' },
  { title: 'Respect', text: 'We recognize and value the inherent dignity and worth of every individual. We are dedicated to treating everyone with respect, empathy, and understanding.' },
  { title: 'Excellence', text: 'We pursue continuous improvement and set high standards for ourselves, pushing beyond mediocrity to achieve exceptional results.', featured: true },
  { title: 'Collaboration', text: 'We cultivate an environment of mutual respect, where diverse perspectives are valued, and differing opinions are heard.' },
];

const TABS = [
  { id: 'goals', label: 'School Goals' },
  { id: 'values', label: 'Core Values' },
];

/* ============================================================================
   SUB-COMPONENTS
============================================================================ */

/** Value card with a cursor-following gold spotlight + lift + hairline reveal */
function ValueCard({ value, index }) {
  const ref = useRef(null);

  const handleMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${e.clientX - r.left}px`);
    el.style.setProperty('--my', `${e.clientY - r.top}px`);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay: (index % 3) * 0.08, ease: EASE }}
      className={`value-card group relative overflow-hidden rounded-2xl border border-[#0B1524]/10 bg-white p-7 md:p-8 ${
        value.featured ? 'md:col-span-2 bg-gradient-to-br from-[#C9A227]/[0.06] via-white to-white' : ''
      }`}
    >
      {/* Cursor spotlight */}
      <div className="spotlight" />

      {/* Gold hairline that draws itself on hover */}
      <span className="absolute top-0 left-0 h-px w-full origin-left scale-x-0 bg-gradient-to-r from-[#C9A227] via-[#C9A227]/60 to-transparent transition-transform duration-700 ease-out group-hover:scale-x-100" />

      <div className="relative">
        <div className="mb-5 flex items-center justify-between">
          <span className="text-[11px] font-semibold tracking-[0.3em] text-[#A8842C]">
            {ROMAN[index]}
          </span>
          <span className="h-px w-8 bg-neutral-900/10 transition-colors duration-500 group-hover:bg-[#C9A227]/70" />
        </div>

        <h3 className="font-display mb-3 text-2xl font-medium text-[#0B1524]">
          {value.title}
        </h3>
        <p className="text-sm leading-relaxed text-neutral-600">{value.text}</p>
      </div>
    </motion.div>
  );
}

/* ============================================================================
   PAGE
============================================================================ */

export default function GoalsCore() {
  const [activeTab, setActiveTab] = useState('goals');

  useEffect(() => {
    document.title = 'Core Goals - City College of Cagayan de Oro';
  }, []);

  const tabVariants = {
    hidden: { opacity: 0, y: 18 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: EASE } },
    exit: { opacity: 0, y: -12, transition: { duration: 0.22, ease: 'easeIn' } },
  };

  return (
    <MainLayout
      maxWidth="full"
      containerClassName="px-0"
      mainClassName="py-0"
      className="overflow-hidden p-0 m-0"
    >
      {/* ==================================================================
          HERO BANNER  (unchanged)
      ================================================================== */}
      <div
        className="relative flex min-h-[400px] w-full flex-shrink-0 items-center justify-center bg-cover bg-center bg-no-repeat md:min-h-[500px]"
        style={{ backgroundImage: `url(${coreGoalsBanner})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30"></div>
        <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-4 text-4xl font-light tracking-wide text-white drop-shadow-lg md:text-6xl"
          >
            Core Goals
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mx-auto max-w-2xl text-base font-light text-gray-200 md:text-lg"
          >
            Our strategic objectives and institutional targets for growth and excellence.
          </motion.p>
        </div>
      </div>

      {/* ==================================================================
          TABS + CONTENT
      ================================================================== */}
      <section className="relative bg-[#FAF8F3] pb-24 pt-16 md:pb-32 md:pt-20">
        {/* Ambient gold glow + dot grid texture */}
        <div className="pointer-events-none absolute -top-48 left-1/2 h-[480px] w-[900px] -translate-x-1/2 rounded-full bg-[#C9A227]/[0.08] blur-3xl" />
        <div className="dot-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />

        <div className="relative mx-auto max-w-6xl px-6">
          {/* Premium animated tab switcher */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: EASE }}
            className="mb-12 flex justify-center md:mb-16"
          >
            <div className="inline-flex items-center rounded-full border border-[#0B1524]/10 bg-white p-1.5 shadow-[0_8px_30px_-12px_rgba(11,21,36,0.15)]">
              {TABS.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className="relative rounded-full px-8 py-3 outline-none"
                >
                  {activeTab === tab.id && (
                    <motion.span
                      layoutId="tab-pill"
                      transition={{ type: 'spring', stiffness: 350, damping: 32 }}
                      className="absolute inset-0 rounded-full bg-[#0B1524] shadow-md"
                    />
                  )}
                  <span
                    className={`relative z-10 text-sm font-medium tracking-wide transition-colors duration-300 ${
                      activeTab === tab.id ? 'text-white' : 'text-neutral-500 hover:text-[#0B1524]'
                    }`}
                  >
                    {tab.label}
                  </span>
                </button>
              ))}
            </div>
          </motion.div>

          <AnimatePresence mode="wait">
            {/* ---------------------------------------------------------- */}
            {/* SCHOOL GOALS — editorial numbered ledger                     */}
            {/* ---------------------------------------------------------- */}
            {activeTab === 'goals' && (
              <motion.div key="goals" variants={tabVariants} initial="hidden" animate="visible" exit="exit">
                <div className="mx-auto max-w-5xl">
                  {/* Panel header */}
                  <div className="mb-2 flex items-center gap-5">
                    <span className="text-[11px] font-semibold tracking-[0.35em] text-[#A8842C]">
                      SCHOOL GOALS
                    </span>
                    <span className="h-px flex-1 bg-gradient-to-r from-[#C9A227]/50 to-transparent" />
                  </div>
                  <p className="font-display mb-8 text-lg italic text-neutral-500">
                    Five commitments that define our direction as an institution.
                  </p>

                  {/* Ledger rows */}
                  <div className="border-t border-[#0B1524]/10">
                    {schoolGoals.map((goal, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-60px' }}
                        transition={{ duration: 0.6, delay: i * 0.08, ease: EASE }}
                        className="goal-item group relative grid cursor-default grid-cols-[auto,1fr] items-start gap-x-6 border-b border-[#0B1524]/10 px-2 py-8 md:grid-cols-[110px,1fr,auto] md:gap-x-10 md:px-6 md:py-10"
                      >
                        {/* Hover wash */}
                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#C9A227]/[0.07] to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                        {/* Ghost outline number → fills gold on hover */}
                        <span className="goal-num font-display pt-1 text-5xl font-light leading-none select-none md:text-6xl">
                          {String(i + 1).padStart(2, '0')}
                        </span>

                        <div className="relative">
                          <h3 className="font-display mb-2 text-xl font-medium text-[#0B1524] md:text-2xl">
                            {goal.title}
                          </h3>
                          <p className="max-w-2xl text-[15px] leading-relaxed text-neutral-600">
                            {goal.text}
                          </p>
                        </div>

                        {/* Arrow chip */}
                        <span className="hidden h-11 w-11 items-center justify-center rounded-full border border-neutral-900/15 text-neutral-400 transition-all duration-500 group-hover:border-[#C9A227] group-hover:bg-[#C9A227]/10 group-hover:text-[#A8842C] md:flex">
                          <svg
                            className="h-4 w-4 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                          >
                            <path d="M7 17L17 7M17 7H8M17 7v9" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </span>

                        {/* Gold underline that draws on hover */}
                        <span className="goal-line absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-[#C9A227] to-[#C9A227]/0" />
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* ---------------------------------------------------------- */}
            {/* CORE VALUES — spotlight bento grid                           */}
            {/* ---------------------------------------------------------- */}
            {activeTab === 'values' && (
              <motion.div key="values" variants={tabVariants} initial="hidden" animate="visible" exit="exit">
                {/* Panel header */}
                <div className="mb-2 flex items-center gap-5">
                  <span className="text-[11px] font-semibold tracking-[0.35em] text-[#A8842C]">
                    CORE VALUES
                  </span>
                  <span className="h-px flex-1 bg-gradient-to-r from-[#C9A227]/50 to-transparent" />
                </div>
                <p className="font-display mb-10 text-lg italic text-neutral-500">
                  Nine principles that guide every decision, program, and relationship.
                </p>

                <div className="grid grid-cols-1 gap-5 md:grid-cols-3 md:grid-flow-row-dense">
                  {coreValues.map((value, i) => (
                    <ValueCard key={value.title} value={value} index={i} />
                  ))}

                  {/* Closing signature tile */}
                  <motion.div
                    initial={{ opacity: 0, y: 26 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: 0.6, delay: 0.15, ease: EASE }}
                    className="relative flex min-h-[220px] flex-col justify-between overflow-hidden rounded-2xl bg-[#0B1524] p-7 md:p-8"
                  >
                    <div className="grain-overlay" />
                    <div className="pointer-events-none absolute -bottom-16 -right-16 h-56 w-56 rounded-full bg-[#C9A227]/25 blur-3xl" />

                    <div className="relative">
                      <span className="text-[10px] font-semibold uppercase tracking-[0.35em] text-[#C9A227]">
                        City College
                      </span>
                      <p className="font-display mt-3 text-2xl leading-snug text-white md:text-[27px]">
                        Nine values.{' '}
                        <span className="italic text-[#E7C766]">One shared future.</span>
                      </p>
                    </div>

                    <div className="relative mt-6 flex items-center gap-3">
                      <span className="h-px flex-1 bg-white/10" />
                      <span className="h-1.5 w-1.5 rotate-45 bg-[#C9A227]" />
                      <span className="h-px flex-1 bg-white/10" />
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
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
            We are not merely building a college —{' '}
            <span className="italic text-[#E7C766]">
              we are shaping the future of a community,
            </span>{' '}
            one student at a time.
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
              Core Goals &middot; Core Values
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

        /* --- Goal ledger rows --- */
        .goal-num {
          -webkit-text-stroke: 1.5px rgba(11, 21, 36, 0.18);
          color: transparent;
          transition: -webkit-text-stroke-color 0.5s ease;
        }
        .goal-item:hover .goal-num {
          -webkit-text-stroke-color: rgba(168, 132, 44, 0.9);
        }
        .goal-line {
          width: 0;
          transition: width 0.6s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .goal-item:hover .goal-line { width: 100%; }

        /* --- Value cards: spotlight + lift --- */
        .spotlight {
          position: absolute; inset: 0; pointer-events: none; opacity: 0;
          transition: opacity 0.5s ease;
          background: radial-gradient(
            480px circle at var(--mx, 50%) var(--my, 50%),
            rgba(201, 162, 39, 0.10),
            transparent 45%
          );
        }
        .value-card {
          transition: transform 0.5s cubic-bezier(0.22, 1, 0.36, 1),
                      border-color 0.4s ease,
                      box-shadow 0.5s ease;
        }
        .value-card:hover {
          transform: translateY(-5px);
          border-color: rgba(168, 132, 44, 0.45);
          box-shadow: 0 28px 56px -28px rgba(11, 21, 36, 0.25);
        }
        .value-card:hover .spotlight { opacity: 1; }
      `}</style>
    </MainLayout>
  );
}