import { useEffect, useRef, useState } from 'react';
import MainLayout from '../../../layouts/MainLayout';

// Re-added: the original animated banner text component
import AnimatedBannerText from '../../../components/content/AnimatedBannerText';

// 1. Import the local banner image
import mayorBanner from '../../../assets/banner/mayor-banner.png';

// 2. Import the official CDO logo
import cdoLogo from '../../../assets/logos/ccdoclogo.png';

// 3. Import the mayor's portrait
import mayorPhoto from '../../../assets/images/Mayor_Klarex_Uy.jpg';

/* ==================================================================== */
/*  DESIGN SYSTEM                                                        */
/*  Palette : Deep Pine Green #0C3B2E · Rich Yellow #E9BE2C ·            */
/*            Light Yellow #F7DE8B · Deep Yellow #B8912A · Ivory #F6F2E9 */
/*  Type    : Marcellus (display) · Cormorant Garamond (letter body)     */
/*            Great Vibes (signature)                                    */
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
            className={`${className} transition-all duration-[1100ms] ease-out will-change-transform ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
            style={{ transitionDelay: `${delay}ms` }}
        >
            {children}
        </div>
    );
}

/* ---------- Yellow ornament divider (line · diamond · line) ---------- */
function OrnamentDivider({ className = '' }) {
    return (
        <div className={`flex items-center justify-center gap-3 ${className}`}>
            <span className="h-px w-14 md:w-24 bg-gradient-to-r from-transparent to-[#D9AC2B]" />
            <span className="w-2 h-2 rotate-45 border border-[#D9AC2B] bg-[#D9AC2B]/30" />
            <span className="w-1.5 h-1.5 rotate-45 bg-[#D9AC2B]" />
            <span className="w-2 h-2 rotate-45 border border-[#D9AC2B] bg-[#D9AC2B]/30" />
            <span className="h-px w-14 md:w-24 bg-gradient-to-l from-transparent to-[#D9AC2B]" />
        </div>
    );
}

/* ---------- The letter (verbatim copy) ---------- */
const LETTER_TOP = [
    `I hope this message finds you well. It is with great pride and a sense of accomplishment that I announce the establishment of the City College of Cagayan de Oro, a monumental step forward in our collective pursuit of progress and development under the RISE CDO governance platform, specifically focusing on Safety, Security, & Human Development and Economic Recovery.`,
    `Our journey towards this significant milestone has been nothing short of remarkable, and I am thrilled to witness this vision become a reality. The City College stands as a testament to our unwavering commitment to the betterment of our beloved city and the future of our youth.`,
    `I would like to extend my heartfelt gratitude to the dedicated members of the Technical Working Group who have tirelessly worked on crafting the Institutional Development Plan (IDP) for the City College. Your dedication and expertise have been invaluable in shaping this institution, which will undoubtedly become a cornerstone of educational excellence in our region.`,
    `I would also like to express my wholehearted support for the City College's Institutional Development Plan (IDP) and its vision for the future. The IDP outlines a comprehensive roadmap for the college's growth and development, ensuring that it becomes a hub for knowledge, innovation, and human empowerment. I hope that the Governing Board will also lend their support to this crucial plan.`,
    `To the esteemed staff and faculty who will nurture the minds of our future leaders, I extend my warmest wishes and encouragement. Your commitment to delivering quality education will pave the way for countless success stories, and I have no doubt that you will rise to the occasion.`,
    `To our valued stakeholders, both within and beyond our city's borders, I invite you to join hands with us in this noble endeavor. Your support and collaboration are vital in creating a brighter future for our youth and our community.`,
    `I would also like to acknowledge our brothers and sisters of the Higaonon Indigenous Peoples of Nahilaran, whose partnership and collaboration have been instrumental in the establishment of the City College. This endeavor is a testament to our commitment to inclusivity and diversity, ensuring that opportunities for education are accessible to all.`,
];

const LETTER_BOTTOM = [
    `The establishment of the City College of Cagayan de Oro is a beacon of hope for our youth, offering them a chance to access quality education right here in our city. It represents the embodiment of our dreams for a safer, more secure, and more prosperous future.`,
    `Let us stand together in support of this endeavor, knowing that by investing in education, we are investing in the future of our city. With your unwavering support, I am confident that the City College will shine as a symbol of excellence and promise for generations to come. Thank you, Cagayan de Oro, for your trust and unwavering dedication to our shared vision of progress and prosperity.`,
];

/* ==================================================================== */
/*  PAGE                                                                 */
/* ==================================================================== */
export default function MayorMessage() {
    useEffect(() => {
        document.title = "Mayor's Message - City College of Cagayan de Oro";
    }, []);

    return (
        <MainLayout maxWidth="full" containerClassName="px-0" mainClassName="py-0" className="overflow-hidden pb-0">

            {/* Typography layer */}
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Great+Vibes&family=Marcellus&display=swap');

        .font-display   { font-family: 'Cormorant Garamond', Georgia, serif; }
        .font-title     { font-family: 'Marcellus', 'Times New Roman', serif; }
        .font-signature { font-family: 'Great Vibes', 'Brush Script MT', cursive; }

        .paper-bg {
          background-color: #F6F2E9;
          background-image: radial-gradient(rgba(12, 59, 46, 0.055) 1px, transparent 1.4px);
          background-size: 22px 22px;
        }

        .dropcap::first-letter {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-weight: 600;
          float: left;
          font-size: 3.4em;
          line-height: 0.8;
          padding: 0.08em 0.16em 0 0;
          color: #B8912A;
        }
      `}</style>

            {/* ============ HERO BANNER (original design) ============ */}
            <div
                className="relative w-full bg-cover bg-center bg-no-repeat shadow-lg min-h-[350px] md:min-h-[450px] lg:min-h-[550px] flex items-center justify-center"
                style={{
                    backgroundImage: `url(${mayorBanner})`
                }}
            >
                {/* Dark Overlay */}
                <div className="absolute inset-0 bg-black/50"></div>

                <AnimatedBannerText
                    title="Mayor's Message"
                    description="A warm welcome and vision for the future of Cagayan de Oro City"
                />
            </div>

            {/* ============ THE LETTER ============ */}
            <section className="paper-bg">
                <div className="max-w-5xl mx-auto px-5 sm:px-8 pb-16 md:pb-24">

                    {/* ---- Letterhead (medallion straddles the banner/ivory seam) ---- */}
                    <Reveal className="relative z-10 -mt-14 md:-mt-[4.5rem] text-center">
                        {/* Portrait medallion */}
                        <div className="relative w-28 h-28 md:w-36 md:h-36 mx-auto">
                            <div className="absolute inset-0 rounded-full border border-[#B8912A]" />
                            <div className="absolute inset-[7px] rounded-full border border-[#B8912A]/40" />
                            <div className="absolute inset-[14px] rounded-full overflow-hidden bg-[#0C3B2E] shadow-[0_10px_30px_-10px_rgba(12,59,46,0.6)]">
                                <img
                                    src={mayorPhoto}
                                    alt="Portrait of Hon. Rolando A. Uy, City Mayor of Cagayan de Oro"
                                    className="w-full h-full object-cover object-top"
                                />
                            </div>
                            <span className="absolute left-1/2 -top-[3.5px] -translate-x-1/2 w-2 h-2 rotate-45 bg-[#B8912A]" />
                            <span className="absolute left-1/2 -bottom-[3.5px] -translate-x-1/2 w-2 h-2 rotate-45 bg-[#B8912A]" />
                            <span className="absolute top-1/2 -left-[3.5px] -translate-y-1/2 w-2 h-2 rotate-45 bg-[#B8912A]" />
                            <span className="absolute top-1/2 -right-[3.5px] -translate-y-1/2 w-2 h-2 rotate-45 bg-[#B8912A]" />
                        </div>

                        <p className="mt-8 text-[10px] md:text-xs uppercase tracking-[0.5em] text-[#B8912A]">A Message from</p>
                        <h2 className="mt-4 font-title text-3xl md:text-5xl text-[#0C3B2E]">Hon. Rolando A. Uy</h2>
                        <OrnamentDivider className="mt-5" />
                        <p className="mt-5 text-xs md:text-sm uppercase tracking-[0.3em] text-gray-500">
                            City Mayor &middot; Cagayan de Oro City
                        </p>
                    </Reveal>

                    {/* ---- The letter paper (double-ruled, yellow-pinned card) ---- */}
                    <Reveal delay={150} className="mt-12 md:mt-16">
                        <div className="relative border border-[#D9AC2B]/60 p-2 md:p-2.5 bg-white/40 shadow-[0_40px_90px_-30px_rgba(12,59,46,0.35)]">
                            <span className="absolute -top-1 -left-1 w-2.5 h-2.5 rotate-45 bg-[#D9AC2B]" />
                            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rotate-45 bg-[#D9AC2B]" />
                            <span className="absolute -bottom-1 -left-1 w-2.5 h-2.5 rotate-45 bg-[#D9AC2B]" />
                            <span className="absolute -bottom-1 -right-1 w-2.5 h-2.5 rotate-45 bg-[#D9AC2B]" />

                            <div className="relative overflow-hidden bg-[#FDFCF7] px-6 py-12 sm:px-10 md:px-16 md:py-20">
                                {/* Inner hairline frame */}
                                <div className="absolute inset-3 md:inset-4 border border-[#0C3B2E]/[0.06] pointer-events-none" />
                                {/* Ghosted official seal watermark */}
                                <img
                                    src={cdoLogo}
                                    alt=""
                                    aria-hidden="true"
                                    className="absolute -bottom-14 -right-14 w-80 h-80 md:w-96 md:h-96 opacity-[0.05] pointer-events-none object-contain"
                                />

                                <div className="relative">
                                    <p className="text-center text-[10px] md:text-[11px] uppercase tracking-[0.35em] text-gray-400">
                                        Office of the City Mayor &middot; City Government of Cagayan de Oro
                                    </p>

                                    <p className="mt-10 md:mt-12 font-display italic text-2xl md:text-3xl text-[#0C3B2E]">
                                        My Fellow Kagay-anons,
                                    </p>

                                    <div className="mt-8 space-y-7">
                                        {LETTER_TOP.map((text, i) => (
                                            <p
                                                key={i}
                                                className={`${i === 0 ? 'dropcap ' : ''}font-display text-justify text-[1.12rem] md:text-[1.28rem] leading-[1.9] text-[#33312C]`}
                                            >
                                                {text}
                                            </p>
                                        ))}
                                    </div>

                                    {/* Pull quote */}
                                    <Reveal>
                                        <figure className="relative my-14 text-center px-2 sm:px-8">
                                            <span aria-hidden="true" className="pointer-events-none select-none absolute -top-12 left-1/2 -translate-x-1/2 font-display text-[7rem] leading-none text-[#D9AC2B]/30">
                                                &ldquo;
                                            </span>
                                            <blockquote className="relative font-display italic text-2xl md:text-[2.1rem] leading-snug text-[#0C3B2E]">
                                                The City College stands as a beacon of hope for our youth — a chance at quality education, right here at home.
                                            </blockquote>
                                            <figcaption className="mt-7 flex items-center justify-center gap-3">
                                                <span className="h-px w-12 bg-[#D9AC2B]/70" />
                                                <span className="w-1.5 h-1.5 rotate-45 bg-[#D9AC2B]" />
                                                <span className="h-px w-12 bg-[#D9AC2B]/70" />
                                            </figcaption>
                                        </figure>
                                    </Reveal>

                                    <div className="space-y-7">
                                        {LETTER_BOTTOM.map((text, i) => (
                                            <p key={i} className="font-display text-justify text-[1.12rem] md:text-[1.28rem] leading-[1.9] text-[#33312C]">
                                                {text}
                                            </p>
                                        ))}
                                    </div>

                                    {/* Motto plate */}
                                    <Reveal>
                                        <div className="relative mt-14 max-w-xl mx-auto text-center">
                                            <span className="absolute -top-1.5 -left-1.5 w-4 h-4 border-t-2 border-l-2 border-[#D9AC2B]" />
                                            <span className="absolute -top-1.5 -right-1.5 w-4 h-4 border-t-2 border-r-2 border-[#D9AC2B]" />
                                            <span className="absolute -bottom-1.5 -left-1.5 w-4 h-4 border-b-2 border-l-2 border-[#D9AC2B]" />
                                            <span className="absolute -bottom-1.5 -right-1.5 w-4 h-4 border-b-2 border-r-2 border-[#D9AC2B]" />
                                            <div className="bg-[#0C3B2E] px-8 py-6 md:py-7 shadow-[0_20px_40px_-15px_rgba(12,59,46,0.5)]">
                                                <p className="font-title text-lg md:text-2xl uppercase tracking-[0.2em] text-[#F7DE8B]">
                                                    Sa Pag-uswag, Kauban Ta Uy!
                                                </p>
                                            </div>
                                        </div>
                                    </Reveal>

                                    {/* Signature block */}
                                    <div className="mt-14 pt-10 border-t border-[#0C3B2E]/10 flex flex-col-reverse md:flex-row md:items-end md:justify-between gap-10">
                                        <div className="text-center md:text-left">
                                            <p className="font-signature text-5xl md:text-6xl text-[#0C3B2E] leading-tight">Rolando A. Uy</p>
                                            <div className="mt-3 h-px w-56 max-w-full mx-auto md:mx-0 bg-gradient-to-r from-[#D9AC2B] via-[#D9AC2B]/40 to-transparent" />
                                            <p className="mt-5 font-title text-base md:text-lg uppercase tracking-[0.18em] text-[#0C3B2E]">
                                                Hon. Rolando A. Uy
                                            </p>
                                            <p className="mt-1.5 text-xs md:text-sm uppercase tracking-[0.25em] text-gray-500">
                                                City Mayor, Cagayan de Oro City
                                            </p>
                                        </div>

                                        {/* Official CDO Seal */}
                                        <img
                                            src={cdoLogo}
                                            alt="Official Seal of the City Government of Cagayan de Oro"
                                            className="w-32 h-32 md:w-40 md:h-40 mx-auto md:mx-0 shrink-0 object-contain drop-shadow-lg"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Reveal>
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
                        Office of the City Mayor &middot; Cagayan de Oro City
                    </p>
                </div>
            </footer>
        </MainLayout>
    );
}