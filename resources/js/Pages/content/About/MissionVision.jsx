import { useEffect, useRef, useState } from 'react';
import MainLayout from '../../../layouts/MainLayout';

import AnimatedBannerText from '../../../components/content/AnimatedBannerText';

// 1. Import the local banner image
import missionVisionBanner from '../../../assets/banner/missionvision-banner.png';

// 2. Import the official CDO logo (joins the two plaques)
import ccdoLogo from '../../../assets/logos/ccdologo.png';

/* ==================================================================== */
/*  DESIGN SYSTEM — same as Mayor's Message                              */
/*  Palette : Deep Pine Green #0C3B2E · Rich Yellow #E9BE2C ·            */
/*            Light Yellow #F7DE8B · Deep Yellow #B8912A · Ivory #F6F2E9 */
/*  Type    : Marcellus (display) · Cormorant Garamond (statement body)  */
/* ==================================================================== */

/* ---------- Scroll-reveal wrapper (fade + rise on enter) ---------- */
function Reveal({ children, delay = 0, className = '' }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(node);
        }
      },
      { threshold: 0.12 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`${className} transition-all duration-[1100ms] ease-out will-change-transform ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

/* ---------- Yellow ornament divider (line · diamond · line) ---------- */
function OrnamentDivider({ align = 'center', className = '' }) {
  const justify =
    align === 'left' ? 'justify-start' : align === 'right' ? 'justify-end' : 'justify-center';

  return (
    <div className={`flex items-center gap-3 ${justify} ${className}`}>
      <span className="h-px w-14 md:w-24 bg-gradient-to-r from-transparent to-[#D9AC2B]" />
      <span className="w-2 h-2 rotate-45 border border-[#D9AC2B] bg-[#D9AC2B]/30" />
      <span className="w-1.5 h-1.5 rotate-45 bg-[#D9AC2B]" />
      <span className="w-2 h-2 rotate-45 border border-[#D9AC2B] bg-[#D9AC2B]/30" />
      <span className="h-px w-14 md:w-24 bg-gradient-to-l from-transparent to-[#D9AC2B]" />
    </div>
  );
}

/* ---------- Official seal medallion (joins the two plaques) ---------- */
function SealMedallion({ className = '' }) {
  return (
    <div className={`rounded-full bg-white p-2.5 shadow-[0_18px_45px_-15px_rgba(12,59,46,0.55)] ${className}`}>
      <img
        src={ccdoLogo}
        alt="Official Seal of the City Government of Cagayan de Oro"
        className="w-full h-full rounded-full object-contain"
      />
    </div>
  );
}

/* ==================================================================== */
/*  PAGE                                                                 */
/* ==================================================================== */
export default function MissionVision() {
  useEffect(() => {
    document.title = 'Mission & Vision - City College of Cagayan de Oro';
  }, []);

  return (
    <MainLayout maxWidth="full" containerClassName="px-0" mainClassName="py-0" className="overflow-hidden pb-0">

      {/* Typography layer */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Marcellus&display=swap');

        .font-display { font-family: 'Cormorant Garamond', Georgia, serif; }
        .font-title   { font-family: 'Marcellus', 'Times New Roman', serif; }

        .paper-bg {
          background-color: #F6F2E9;
          background-image: radial-gradient(rgba(12, 59, 46, 0.055) 1px, transparent 1.4px);
          background-size: 22px 22px;
        }
      `}</style>

      {/* ============ HERO BANNER (original design) ============ */}
      <div
        className="relative w-full bg-cover bg-center bg-no-repeat shadow-lg min-h-[350px] md:min-h-[450px] lg:min-h-[550px] flex items-center justify-center"
        style={{
          backgroundImage: `url(${missionVisionBanner})`
        }}
      >
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/50"></div>

        <AnimatedBannerText
          title="Mission & Vision"
          description="Our purpose, guiding principles, and long-term aspirations for the City College of Cagayan de Oro."
        />
      </div>

      {/* ============ THE DIPTYCH — MISSION & VISION ============ */}
      <section className="paper-bg">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-16 md:py-24">

          <div className="relative grid grid-cols-1 lg:grid-cols-2 lg:gap-0 gap-8">

            {/* Desktop-only seam line + seal medallion straddling both plaques */}
            <span className="hidden lg:block absolute left-1/2 top-14 bottom-14 w-px -translate-x-1/2 z-10 bg-gradient-to-b from-transparent via-[#D9AC2B]/60 to-transparent" />
            <div className="hidden lg:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
              <SealMedallion className="w-32 h-32 xl:w-36 xl:h-36" />
            </div>

            {/* ---------- LEFT PLAQUE: MISSION (deep green) ---------- */}
            <Reveal className="h-full">
              <div className="relative h-full overflow-hidden rounded-3xl bg-[#0C3B2E] shadow-[0_40px_90px_-30px_rgba(12,59,46,0.55)] transition-shadow duration-500 hover:shadow-[0_50px_110px_-30px_rgba(12,59,46,0.65)] min-h-[480px] md:min-h-[560px]">
                {/* Corner brackets */}
                <span className="absolute top-3 left-3 w-5 h-5 border-t-2 border-l-2 border-[#E9BE2C]/70 pointer-events-none" />
                <span className="absolute top-3 right-3 w-5 h-5 border-t-2 border-r-2 border-[#E9BE2C]/70 pointer-events-none" />
                <span className="absolute bottom-3 left-3 w-5 h-5 border-b-2 border-l-2 border-[#E9BE2C]/70 pointer-events-none" />
                <span className="absolute bottom-3 right-3 w-5 h-5 border-b-2 border-r-2 border-[#E9BE2C]/70 pointer-events-none" />

                {/* Decorative glows */}
                <div className="absolute -top-24 -right-24 w-72 h-72 bg-white/10 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-[#E9BE2C]/10 rounded-full blur-3xl pointer-events-none" />

                {/* Ghost numeral */}
                <span aria-hidden="true" className="pointer-events-none select-none absolute -top-10 right-2 font-title text-[9rem] md:text-[13rem] leading-none text-white/[0.06]">
                  I
                </span>

                {/* Inner-side clearance (lg:pr) keeps text clear of the center seal */}
                <div className="relative z-10 h-full flex flex-col justify-center p-8 md:p-14 lg:p-16 lg:pr-[8.5rem]">
                  <p className="text-[10px] md:text-xs uppercase tracking-[0.45em] text-[#E9BE2C]/90">
                    What We Do
                  </p>
                  <h2 className="mt-4 font-title text-4xl md:text-5xl lg:text-6xl text-[#F7F3E8]">
                    Our Mission
                  </h2>
                  <OrnamentDivider align="left" className="mt-6" />

                  <p className="mt-8 font-display text-xl md:text-2xl lg:text-[1.7rem] leading-relaxed text-white/95">
                    <span aria-hidden="true" className="font-display text-6xl leading-none text-[#F7DE8B] align-[-0.35rem] mr-2">&ldquo;</span>
                    To provide transformative and inclusive learning driven by cutting-edge technologies,
                    including artificial intelligence, that equip the institution and community to create
                    innovative, relevant, and data-driven solutions for local and global impact.
                    <span aria-hidden="true" className="font-display text-6xl leading-none text-[#F7DE8B] align-[-0.35rem] ml-2">&rdquo;</span>
                  </p>
                </div>
              </div>
            </Reveal>

            {/* Mobile-only seal medallion between the stacked plaques */}
            <div className="lg:hidden relative z-10 -my-7 flex justify-center">
              <SealMedallion className="w-24 h-24 md:w-28 md:h-28" />
            </div>

            {/* ---------- RIGHT PLAQUE: VISION (ivory) ---------- */}
            <Reveal delay={150} className="h-full">
              <div className="relative h-full overflow-hidden rounded-3xl bg-white ring-1 ring-[#D9AC2B]/40 shadow-[0_40px_90px_-30px_rgba(12,59,46,0.3)] transition-shadow duration-500 hover:shadow-[0_50px_110px_-30px_rgba(12,59,46,0.4)] min-h-[480px] md:min-h-[560px]">
                {/* Corner brackets */}
                <span className="absolute top-3 left-3 w-5 h-5 border-t-2 border-l-2 border-[#B8912A]/70 pointer-events-none" />
                <span className="absolute top-3 right-3 w-5 h-5 border-t-2 border-r-2 border-[#B8912A]/70 pointer-events-none" />
                <span className="absolute bottom-3 left-3 w-5 h-5 border-b-2 border-l-2 border-[#B8912A]/70 pointer-events-none" />
                <span className="absolute bottom-3 right-3 w-5 h-5 border-b-2 border-r-2 border-[#B8912A]/70 pointer-events-none" />

                {/* Decorative glows */}
                <div className="absolute -top-24 -left-24 w-72 h-72 bg-[#E9BE2C]/15 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-[#0C3B2E]/5 rounded-full blur-3xl pointer-events-none" />

                {/* Ghost numeral */}
                <span aria-hidden="true" className="pointer-events-none select-none absolute -top-10 left-2 font-title text-[9rem] md:text-[13rem] leading-none text-[#0C3B2E]/[0.05]">
                  II
                </span>

                {/* Inner-side clearance (lg:pl) keeps text clear of the center seal */}
                <div className="relative z-10 h-full flex flex-col justify-center p-8 md:p-14 lg:p-16 lg:pl-[8.5rem] lg:text-right">
                  <p className="text-[10px] md:text-xs uppercase tracking-[0.45em] text-[#B8912A]">
                    Where We're Going
                  </p>
                  <h2 className="mt-4 font-title text-4xl md:text-5xl lg:text-6xl text-[#0C3B2E]">
                    Our Vision
                  </h2>
                  <OrnamentDivider align="right" className="mt-6" />

                  <p className="mt-8 font-display text-xl md:text-2xl lg:text-[1.7rem] leading-relaxed text-[#33312C]">
                    <span aria-hidden="true" className="font-display text-6xl leading-none text-[#B8912A] align-[-0.35rem] mr-2">&ldquo;</span>
                    A City College that nurtures and produces global citizens supported by cutting-edge
                    technologies for innovation and excellence by 2033.
                    <span aria-hidden="true" className="font-display text-6xl leading-none text-[#B8912A] align-[-0.35rem] ml-2">&rdquo;</span>
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ============ CLOSING BAND ============ */}
      <footer className="bg-[#0C3B2E] border-t border-[#E9BE2C]/30">
        <div className="max-w-6xl mx-auto px-6 py-14 text-center">
          <OrnamentDivider />
          <p className="mt-7 font-title text-sm md:text-base uppercase tracking-[0.3em] text-[#F7F3E8]">
            City College of Cagayan de Oro
          </p>
          <p className="mt-3 text-[10px] md:text-xs uppercase tracking-[0.35em] text-[#E9BE2C]/80">
            Mission &amp; Vision &middot; Cagayan de Oro City
          </p>
        </div>
      </footer>
    </MainLayout>
  );
}