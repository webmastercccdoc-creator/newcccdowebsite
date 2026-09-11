import { useEffect } from 'react';
import { motion } from 'framer-motion';
import MainLayout from '../../../layouts/MainLayout';

// Import the local images
import cityhallBg from '../../../assets/banner/coregoals-banner.png';
import spanishImg from '../../../assets/images/spanish.jpg';
import riverImg from '../../../assets/images/river.jpg';
import cathedralImg from '../../../assets/images/cathedral.jpg';
import defenseImg from '../../../assets/images/defense.jpg';
import misamisImg from '../../../assets/images/misamis.jpg';
import revoltImg from '../../../assets/images/revolt.jpg';
import americanImg from '../../../assets/images/american.jpg';
import charterImg from '../../../assets/images/charter.jpg';
import archbishopImg from '../../../assets/images/archbishop.jpg';

/* ==========================================================
   "HERITAGE MAGAZINE" — editorial long-form redesign
   No sticky elements. No auto-scroll. No scroll fighting.
========================================================== */

const ROMAN = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX'];

const chapters = [
    {
        id: 'spanish-arrival',
        year: '1622',
        era: 'The Spanish Era',
        caption: 'Recollect missionaries reach Himologan',
        title: 'Spanish Arrival',
        subtitle: 'The Arrival of the Recollect Missionaries',
        image: spanishImg,
        content: `In 1622, two Augustinian Recollect missionaries first came to Huluga, then called Himologan. Here they met a mixed stock of Bukidnons and Visayas who lived in a settlement perched on a cliff, overlooking a river. The men had massive tattoos, like those of the Visayan pintados, and the women wore intricate jewelry, some made of gold.

The priests were Fray Juan de San Nicolas and Fray Francisco de la Madre de Dios. According to their journals, the natives were polytheistic animists, not Muslims. But they paid tributes to Sultan Kudarat through his emissaries.`
    },
    {
        id: 'etymology',
        year: '1500s',
        era: 'Origins of a Name',
        caption: 'The Cagayan River — kagay, “place with a river”',
        title: 'Etymology',
        subtitle: 'The Origin of the Name “Cagayan”',
        image: riverImg,
        content: `Spanish documents in 1500s already referred to the area around Himologan as Cagayan. On January 25, 1571, the Spanish government granted this area, including what is now Northern Mindanao, as an encomienda to Juan Griego. There is also a Cagayan in Luzon and another in Sulu.

According to Father Miguel Bernad, S.J. of Xavier University, "cagayan" comes from the Malayo-Polynesian word ag, which means "water". Ag is present in words like agus, agusan, and kagay. Agus means "flowing water", and agusan "place of flowing water". Kagay means "river" and kagayan is "place with a river".

According to Dr. Lawrence A Reid, Professor Emeritus, "cagayan" comes from an ancient Philippine word *kaRayan, which means "river".`
    },
    {
        id: 'conversion',
        year: '1626',
        era: 'The Spanish Era',
        caption: 'Gaston Park & San Agustin Cathedral today',
        title: 'Conversion to Christianity',
        subtitle: 'Fray Agustin de San Pedro & Datu Salangsang',
        image: cathedralImg,
        content: `In 1626, a 26-year old Augustinian Recollect friar arrived in Cagayan. His name was Fray Agustin de San Pedro, a Portuguese. Before his priesthood, he studied mathematics, architecture, gunnery, and military strategy at the University of Salamanca.

Fray Agustin persuaded the leader of Himologan, Datu Salangsang, to transfer his settlement down river, to the area of today's Gaston Park and San Agustin Cathedral. Here, Fray Agustin built a church of native materials. Inside, he baptized Datu Salangsang and his wife, and later his people.`
    },
    {
        id: 'fortification',
        year: '1626–1875',
        era: 'Defense of the Town',
        caption: 'Fuerza Real de San Jose, rebuilt in stone, 1730',
        title: 'Fortification of Cagayan',
        subtitle: 'The Fuerza Real de San Jose',
        image: defenseImg,
        content: `In response to the conversion, Sultan Kudarat sent a fleet of warriors to drive away the Spanish missionaries and to regain the lost tributes. Kudarat's attacks prompted Fray Agustin to build a wooden fortress and watchtower in Cagayan to protect Salangsang's people. He called the fortress Fuerza Real de San Jose, and it occupied an area now filled with Gaston Park and San Agustin Cathedral. Fray Agustin's defense of Cagayan earned him the title "El Padre Capitan".

The fortress was rebuilt with stones in 1730. But Lt. Col. Jose Carvallo, the Spanish politico-military governor of Misamis, demolished it in 1875 and used the stones to pave the streets of the town.`
    },
    {
        id: 'cagayan-misamis',
        year: '1818–1872',
        era: 'The District Capital',
        caption: 'Casa Real de Cagayan, 1831 — now the City Hall',
        title: 'Cagayan de Misamis',
        subtitle: 'Capital of the Segundo Distrito de Misamis',
        image: misamisImg,
        content: `In 1818, the Manila Spanish divided Mindanao into politico-military districts, one of which was the Segundo Distrito de Misamis, the largest district in Mindanao. This area was composed of today's Misamis Oriental, Misamis Occidental, Camiguin, Bukidnon, Lanao, Zamboanga del Norte, and the northern part of Cotabato.

On February 27, 1872, the Spanish Governor General Carlos Maria de la Torre issued a decree declaring Cagayan the permanent capital of Segundo Distrito de Misamis. All Spanish politico-military governors of Misamis lived at the Casa Real de Cagayan, built in 1831, the site of today's city hall of Cagayan de Oro. During this era, the name of the town was "Cagayan de Misamis".`
    },
    {
        id: 'katipunan',
        year: '1896–1897',
        era: 'The Revolution',
        caption: 'The Katipunan uprising of September 1896',
        title: 'The Katipunan Revolt',
        subtitle: 'The Only Katipunan-led Revolt in Mindanao',
        image: revoltImg,
        content: `The Katipunan Revolt broke out in Luzon in late August 1896. A month later, on September 29, 1896, a group of Filipinos in Iligan — who had been deported from Luzon to undergo military discipline — received instructions from the Manila Katipunan, and consequently mutinied against the Spanish soldiers. They raided the Spanish armory, then ransacked all convents and homes of Spanish peninsulares from Iligan to Cagayan de Misamis.

They proceeded to Bukidnon, where they forged an alliance with a band of natives. Then they attacked Balingasag, and raided the outpost of Gingoog on January 1897. Anger intensified when the rebels learned of Dr. Jose P. Rizal's execution. But they were subdued when the Spanish government recalled and used a gunboat from the Tercio Distrito de Surigao.

The uprising in Cagayan de Misamis is the only known Katipunan-led revolt in the whole of Mindanao.`
    },
    {
        id: 'american',
        year: '1900',
        era: 'The American Period',
        caption: 'The Battle of Makahambus Hill, June 4, 1900',
        title: 'American Occupation',
        subtitle: 'The Battle of Makahambus Hill',
        image: americanImg,
        content: `On March 31, 1900, the Americans invaded Cagayan de Misamis by first bombing the flag fluttering at Macabalan wharf. Filipino resistance fighters had already organized before the attack, but retaliated only on April 7, 1900, led by Gen. Nicolas Capistrano. The fighting erupted in the town center. This was followed by the Battle of Agusan Hill, led by Capt. Vicente Roa Y Racines, who was killed with his men.

On June 4, 1900, however, for the first time in the entire Philippine-American War, the Americans lost to the Filipino revolutionaries in the Battle of Makahambus Hill. Col. Apolinar Velez led the Filipino troop to victory.

The Americans won the war eventually, however. And under foreign rule, Cagayan de Misamis became the center of commerce, migration, and education in Northern Mindanao.`
    },
    {
        id: 'japanese-charter',
        year: '1942–1950',
        era: 'War & the Charter',
        caption: 'The signing of the City Charter, June 15, 1950',
        title: 'City Charter',
        subtitle: 'Cagayan de Oro Becomes a City',
        image: charterImg,
        content: `On May 1, 1942, the Japanese Kawamura Detachment sailed from Iloilo to Cagayan de Misamis, and implemented the "scorched earth policy". They burned most of the town, but used the major buildings as headquarters. Guerrillas fought back, but failed to cause major damage. On October 10, 1944, American planes bombarded Cagayan de Misamis to drive out the Japanese, eventually liberating the place on May 10, 1945.

Starting 1946, Misamis Congressman Pedro S. Baculio lobbied in the Philippine Congress so that Cagayan de Misamis, which was reeling from the ashes of war, would be declared a city. On December 17, 1949, the new Congressman Emmanuel Pelaez introduced House Bill No. 54, entitled "An Act Creating the City of Cagayan de Oro". President Elpidio Quirino signed the city charter at 11:30 am, June 15, 1950.

Pelaez appended "de Oro" to "Cagayan" in recognition of gold mining in the hinterland barrios known to Spanish explorers in 1500s. The first appointed mayor of Cagayan de Oro was Max Y. Suniel, followed by Justiniano R. Borja in 1954.`
    },
    {
        id: 'archdiocese',
        year: '1951–Present',
        era: 'The Modern City',
        caption: 'The first Catholic archbishopric in Mindanao',
        title: 'Archdiocese & The Present',
        subtitle: 'From Xavier University to Today',
        image: archbishopImg,
        content: `On June 29, 1951, Pope Pius XII created the first Catholic archbishopric in Mindanao, when he elevated the Diocese of Cagayan into an archdiocese. Santiago T. G. Hayes, S.J. was the first archbishop. Hayes founded Ateneo de Cagayan on June 7, 1933. The school was renamed Xavier University on March 22, 1958. It was the first Mindanao university.

During the regime of the dictator Ferdinand E. Marcos, Cagayan de Oro earned the reputation as the center of political opposition in the Philippines. Independent-minded politicians in Cagayan de Oro helped restore democracy at EDSA in 1986.

Today, Cagayan de Oro is the burgeoning center of commerce, education, and government administration in Northern Mindanao. It is a major city. Rich in heritage, it shares with the historical highlights of the Republic of the Philippines.`
    }
];

const stats = [
    { value: '1622', label: 'First Recollect Mission' },
    { value: '1872', label: 'Capital of Misamis' },
    { value: '1900', label: 'Makahambus Victory' },
    { value: '1950', label: 'City Charter Signed' }
];

const milestones = [
    { year: '1571', label: 'Encomienda of Cagayan granted to Juan Griego' },
    { year: '1622', label: 'Mission established at Himologan' },
    { year: '1872', label: 'Declared capital of Segundo Distrito de Misamis' },
    { year: '1896', label: 'Mindanao’s only Katipunan-led revolt' },
    { year: '1900', label: 'First Filipino victory of the Phil–Am War' },
    { year: '1950', label: 'Charter signed — “de Oro” appended' }
];

/* ---------- Small shared pieces ---------- */

function Reveal({ children, delay = 0, className = '' }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '0px 0px -60px 0px' }}
            transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

function Eyebrow({ children, className = '' }) {
    return (
        <div className={`flex items-center justify-center gap-4 text-[11px] font-bold uppercase tracking-[0.35em] text-emerald-600 ${className}`}>
            <span className="h-px w-10 bg-emerald-500/30" />
            {children}
            <span className="h-px w-10 bg-emerald-500/30" />
        </div>
    );
}

/** Splits a chapter's content into paragraphs; first one gets a drop cap */
function ArticleBody({ content }) {
    const paragraphs = content.split('\n\n');
    return (
        <div className="space-y-5">
            {paragraphs.map((p, i) => (
                <p key={i} className={`text-[15px] leading-[1.9] text-slate-600 md:text-base ${i === 0 ? 'dropcap' : ''}`}>
                    {p}
                </p>
            ))}
        </div>
    );
}

/* ---------- Table of contents row ---------- */
function TocRow({ chapter, index, onClick }) {
    return (
        <button
            onClick={onClick}
            className="group flex w-full items-baseline rounded-lg px-4 py-3.5 text-left transition-colors duration-200 hover:bg-white hover:shadow-sm"
        >
            <span className="w-9 shrink-0 font-serif-display text-sm font-semibold italic text-emerald-600">
                {ROMAN[index]}.
            </span>
            <span className="shrink-0 text-[15px] font-semibold text-slate-800 transition-colors group-hover:text-emerald-700">
                {chapter.title}
            </span>
            <span aria-hidden="true" className="mx-3 mb-1 flex-1 border-b border-dotted border-slate-300 transition-colors group-hover:border-emerald-300" />
            <span className="shrink-0 font-serif-display text-sm text-slate-400 transition-colors group-hover:text-emerald-600">
                {chapter.year}
            </span>
        </button>
    );
}

/* ---------- Chapter spread ---------- */
function ChapterSpread({ chapter, index }) {
    const flip = index % 2 === 1;
    return (
        <article
            id={`chapter-${chapter.id}`}
            className={`scroll-mt-8 border-t border-slate-100 ${index % 2 === 1 ? 'bg-slate-50/70' : 'bg-white'}`}
        >
            <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-16 sm:px-8 md:py-24 lg:grid-cols-12 lg:gap-16">
                {/* Text column */}
                <div className={`relative lg:col-span-7 ${flip ? 'lg:order-2' : ''}`}>
                    <span
                        aria-hidden="true"
                        className="pointer-events-none absolute -top-12 select-none font-serif-display text-[7rem] font-bold leading-none text-slate-900/[0.045] md:-top-16 md:text-[10rem]"
                    >
                        {ROMAN[index]}
                    </span>

                    <Reveal className="relative">
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[10px] font-bold uppercase tracking-[0.28em] text-emerald-600 md:text-[11px]">
                            <span>Chapter {ROMAN[index]}</span>
                            <span aria-hidden="true" className="h-1 w-1 rotate-45 bg-emerald-400" />
                            <span>{chapter.year}</span>
                            <span aria-hidden="true" className="h-1 w-1 rotate-45 bg-emerald-400" />
                            <span className="text-slate-400">{chapter.era}</span>
                        </div>

                        <h3 className="mt-5 font-serif-display text-3xl font-bold leading-tight text-slate-900 md:text-[2.6rem]">
                            {chapter.title}
                        </h3>
                        <p className="mt-2 font-serif-display text-lg italic text-slate-500">{chapter.subtitle}</p>

                        <div className="mt-6 h-px w-16 bg-emerald-500" />

                        <div className="mt-6">
                            <ArticleBody content={chapter.content} />
                        </div>
                    </Reveal>
                </div>

                {/* Image column — static, framed, hover-zoom only */}
                <Reveal className={`lg:col-span-5 ${flip ? 'lg:order-1' : ''}`} delay={0.12}>
                    <figure className="group relative">
                        <div
                            aria-hidden="true"
                            className="absolute inset-0 translate-x-3 translate-y-3 rounded-2xl border border-emerald-500/25 transition-transform duration-500 group-hover:translate-x-4 group-hover:translate-y-4"
                        />
                        <div className="relative overflow-hidden rounded-2xl shadow-xl shadow-slate-900/10 ring-1 ring-slate-900/5">
                            <img
                                src={chapter.image}
                                alt={chapter.title}
                                loading="lazy"
                                className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/45 via-transparent to-transparent" />
                            <figcaption className="absolute inset-x-0 bottom-0 flex items-center gap-2.5 p-5">
                                <span className="h-1.5 w-1.5 shrink-0 rotate-45 bg-emerald-400" />
                                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/90 md:text-[11px]">
                                    {chapter.caption}
                                </span>
                            </figcaption>
                        </div>
                    </figure>
                </Reveal>
            </div>
        </article>
    );
}

/* ========================================================== */

export default function CagayanDeOroCity() {
    useEffect(() => {
        document.title = 'Cagayan de Oro City - City College of Cagayan de Oro';

        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,700;0,800;1,500;1,600&family=Source+Sans+3:wght@300;400;600;700&display=swap';
        document.head.appendChild(link);
        return () => document.head.removeChild(link);
    }, []);

    // The ONLY scroll on this page — user clicks. Nothing automatic.
    const scrollToChapter = (id) => {
        const el = document.getElementById(`chapter-${id}`);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    return (
        <MainLayout
            title="Cagayan de Oro City"
            showTitle={false}
            maxWidth="full"
            containerClassName="px-0"
            mainClassName="py-0"
            className="overflow-hidden pb-0 bg-white"
        >
            <style>{`
                .font-serif-display { font-family: 'Playfair Display', Georgia, serif; }
                body { font-family: 'Source Sans 3', ui-sans-serif, system-ui, -apple-system, sans-serif; }
                ::selection { background: rgba(16, 185, 129, 0.22); }
                .dropcap::first-letter {
                    font-family: 'Playfair Display', Georgia, serif;
                    float: left;
                    font-size: 3.4em;
                    line-height: 0.82;
                    font-weight: 700;
                    padding-right: 0.12em;
                    padding-top: 0.05em;
                    color: #059669;
                }
            `}</style>

            {/* ======================================================
                TOP HERO BANNER  (UNTOUCHED)
            ====================================================== */}
            <div
                className="relative w-full bg-cover bg-center bg-no-repeat min-h-[400px] md:min-h-[500px] lg:min-h-[600px] flex items-center justify-center"
                style={{
                    backgroundImage: `url(${cityhallBg})`
                }}
            >
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/30"></div>

                <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white drop-shadow-xl mb-3"
                    >
                        Cagayan de Oro City
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="mx-auto max-w-2xl text-lg md:text-xl text-blue-100 font-light drop-shadow"
                    >
                        The City of Golden Friendship
                    </motion.p>
                </div>
            </div>

            {/* ======================================================
                PART 1 — OPENING MANIFESTO
            ====================================================== */}
            <section className="bg-white py-16 md:py-24">
                <div className="mx-auto max-w-3xl px-5 text-center sm:px-8">
                    <Reveal>
                        <Eyebrow>A Heritage Feature</Eyebrow>
                        <h2 className="font-serif-display mt-6 text-4xl font-bold leading-[1.15] text-slate-900 md:text-[3.4rem]">
                            The Story of the{' '}
                            <span className="italic text-amber-600">Golden</span>{' '}
                            <span className="italic text-emerald-600">City</span>
                        </h2>
                    </Reveal>
                    <Reveal delay={0.12}>
                        <p className="mx-auto mt-6 max-w-xl text-base font-light leading-relaxed text-slate-500 md:text-lg">
                            Four centuries of recorded history — from a river settlement of tattooed warriors to the
                            capital of Misamis, and finally to the chartered City of Golden Friendship — told in nine
                            illustrated chapters.
                        </p>
                    </Reveal>
                </div>

                <Reveal delay={0.2} className="mx-auto mt-14 max-w-5xl px-5 sm:px-8">
                    <div className="grid grid-cols-2 rounded-2xl border border-slate-200 bg-slate-50 shadow-sm md:grid-cols-4 md:divide-x md:divide-slate-200">
                        {stats.map((s) => (
                            <div key={s.label} className="border-slate-200 px-6 py-7 max-md:[&:nth-child(-n+2)]:border-b max-md:odd:border-r">
                                <p className="font-serif-display text-3xl font-bold text-emerald-600 md:text-4xl">{s.value}</p>
                                <p className="mt-2 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 md:text-[11px]">
                                    {s.label}
                                </p>
                            </div>
                        ))}
                    </div>
                </Reveal>
            </section>

            {/* ======================================================
                PART 2 — TABLE OF CONTENTS
            ====================================================== */}
            <section className="border-y border-slate-200 bg-slate-50 py-14 md:py-18">
                <div className="mx-auto max-w-4xl px-5 sm:px-8">
                    <Reveal>
                        <div className="flex items-end justify-between gap-4">
                            <h3 className="font-serif-display text-2xl font-bold text-slate-900 md:text-3xl">Contents</h3>
                            <p className="pb-1 text-[10px] font-bold uppercase tracking-[0.28em] text-slate-400">
                                Nine Chapters · Select to Jump
                            </p>
                        </div>
                        <div className="mt-3 h-px w-full bg-gradient-to-r from-emerald-500 via-emerald-200 to-transparent" />
                    </Reveal>

                    <Reveal delay={0.1}>
                        <div className="mt-6 grid gap-1 md:grid-cols-2 md:gap-x-10">
                            {chapters.map((c, i) => (
                                <TocRow key={c.id} chapter={c} index={i} onClick={() => scrollToChapter(c.id)} />
                            ))}
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* ======================================================
                PART 3 — THE NINE CHAPTERS (alternating spreads)
            ====================================================== */}
            <div>
                {chapters.map((chapter, index) => (
                    <ChapterSpread key={chapter.id} chapter={chapter} index={index} />
                ))}
            </div>

            {/* ======================================================
                PART 4 — FULL-BLEED QUOTE BAND (static)
            ====================================================== */}
            <section className="relative overflow-hidden">
                <img src={riverImg} alt="The Cagayan River" className="absolute inset-0 h-full w-full object-cover" />
                <div className="absolute inset-0 bg-slate-900/75" />
                <div className="relative mx-auto max-w-3xl px-6 py-24 text-center md:py-32">
                    <Reveal>
                        <span className="mx-auto block h-2 w-2 rotate-45 bg-emerald-400" aria-hidden="true" />
                        <blockquote className="font-serif-display mt-8 text-2xl font-semibold italic leading-snug text-white md:text-[2.1rem]">
                            “Kagay — the place with a river. Four centuries of history flow through one waterway, and
                            one city carries the{' '}
                            <span className="text-amber-300">gold of its past</span> into its future.”
                        </blockquote>
                        <p className="mt-8 text-[10px] font-bold uppercase tracking-[0.4em] text-emerald-300">
                            The Heritage of Cagayan de Oro
                        </p>
                    </Reveal>
                </div>
            </section>

            {/* ======================================================
                PART 5 — MILESTONES STRIP
            ====================================================== */}
            <section className="bg-white py-16 md:py-24">
                <div className="mx-auto max-w-6xl px-5 sm:px-8">
                    <div className="mx-auto max-w-2xl text-center">
                        <Reveal>
                            <Eyebrow>The Saga in Six Dates</Eyebrow>
                            <h3 className="font-serif-display mt-5 text-3xl font-bold text-slate-900 md:text-4xl">
                                Milestones
                            </h3>
                        </Reveal>
                    </div>

                    <div className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-slate-200 bg-slate-200 sm:grid-cols-3 lg:grid-cols-6">
                        {milestones.map((m, i) => (
                            <Reveal key={m.year} delay={0.05 * i} className="h-full">
                                <div className="group flex h-full flex-col bg-white p-6 transition-colors duration-300 hover:bg-slate-50">
                                    <p className="font-serif-display text-2xl font-bold text-slate-900 transition-colors group-hover:text-emerald-600">
                                        {m.year}
                                    </p>
                                    <div className="mt-2 mb-3 h-px w-8 bg-emerald-500/50 transition-all duration-300 group-hover:w-12 group-hover:bg-emerald-500" />
                                    <p className="text-xs leading-relaxed text-slate-500">{m.label}</p>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* ======================================================
                PART 6 — CLOSING
            ====================================================== */}
            <section className="relative overflow-hidden bg-slate-900">
                <div className="pointer-events-none absolute -top-28 left-1/2 h-64 w-[680px] -translate-x-1/2 rounded-full bg-emerald-500/15 blur-[110px]" />

                <div className="relative mx-auto max-w-3xl px-5 py-20 text-center sm:px-8 md:py-28">
                    <Reveal>
                        <div className="flex items-center justify-center gap-3" aria-hidden="true">
                            <span className="h-px w-12 bg-emerald-400/50" />
                            <span className="h-2 w-2 rotate-45 bg-emerald-400" />
                            <span className="h-px w-12 bg-emerald-400/50" />
                        </div>
                        <blockquote className="font-serif-display mt-8 text-2xl font-semibold italic leading-snug text-white md:text-[2rem]">
                            “Rich in heritage, Cagayan de Oro shares in the historical highlights of the Republic of
                            the Philippines.”
                        </blockquote>
                        <p className="mt-8 text-[10px] font-bold uppercase tracking-[0.4em] text-emerald-400">
                            End of the Chronicle
                        </p>

                        <div className="mx-auto mt-10 h-px w-24 bg-white/10" />

                        <p className="mt-8 text-sm font-light text-slate-400">
                            Local Heritage Series · Presented by the{' '}
                            <span className="font-semibold text-slate-200">City College of Cagayan de Oro</span>
                        </p>

                        <button
                            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                            className="mt-10 inline-flex items-center gap-3 rounded-full border border-emerald-400/40 bg-emerald-500/10 px-8 py-3 text-[11px] font-bold uppercase tracking-[0.3em] text-emerald-300 transition hover:border-emerald-300 hover:bg-emerald-500/20 hover:text-white"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-3.5 w-3.5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 10.5L12 3m0 0l7.5 7.5M12 3v18" />
                            </svg>
                            Back to Top
                        </button>
                    </Reveal>
                </div>
            </section>
        </MainLayout>
    );
}