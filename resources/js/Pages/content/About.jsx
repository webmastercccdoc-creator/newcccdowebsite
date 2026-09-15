import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import MainLayout from "../../layouts/MainLayout";
import aboutUsImage from "../../assets/home/about_us.jpg";

const pathways = [
    {
        number: "01",
        label: "Our direction",
        title: "Mission & Vision",
        description:
            "See the purpose and long-term aspiration guiding the City College community.",
        href: "/about/mission-vision",
    },
    {
        number: "02",
        label: "Our foundation",
        title: "Goals & Core Values",
        description:
            "Explore the commitments and values that shape how we teach, serve, and grow.",
        href: "/about/goals-core-values",
    },
    {
        number: "03",
        label: "Our leadership",
        title: "Governing Board",
        description:
            "Meet the policy-making body supporting the institution’s direction and progress.",
        href: "/about/governing-board",
    },
];

const facts = [
    { value: "CCCDO", label: "City College of Cagayan de Oro" },
    { value: "2033", label: "Our vision horizon" },
    { value: "Kauban", label: "A community that moves together" },
];

function Reveal({ children, delay = 0, className = "" }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.18 }}
            transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

export default function About() {
    const [expanded, setExpanded] = useState(false);

    useEffect(() => {
        document.title = "About Us - City College of Cagayan de Oro";
    }, []);

    return (
        <MainLayout
            maxWidth="full"
            containerClassName="px-0"
            mainClassName="py-0"
            className="overflow-hidden pb-0"
        >
            <style>{`
                .about-display { font-family: 'Bricolage Grotesque', sans-serif; }
                .about-serif { font-family: Georgia, 'Times New Roman', serif; }
                .about-hero-accent { color: #0f8a50 !important; }
                .about-hero-accent-serif { color: #0f8a50 !important; }
                .about-grid { background-image: linear-gradient(rgba(15, 81, 50, 0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(15, 81, 50, 0.06) 1px, transparent 1px); background-size: 34px 34px; }
                .about-diagonal { background-image: linear-gradient(135deg, rgba(15, 81, 50, 0.06) 0%, rgba(15, 81, 50, 0.06) 1px, transparent 1px, transparent 50%, rgba(15, 81, 50, 0.06) 50%, rgba(15, 81, 50, 0.06) 51%, transparent 51%, transparent 100%); background-size: 28px 28px; }
            `}</style>

            <section className="relative overflow-hidden bg-[#f7faf6] about-grid">
                <div className="absolute inset-0 bg-gradient-to-br from-white/90 via-white/55 to-transparent" />
                <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 py-14 sm:px-8 md:py-20 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20 lg:px-12 lg:py-24">
                    <Reveal className="relative z-10">
                        <p className="mb-5 flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.35em] text-[#0f5132]">
                            <span className="h-px w-10 bg-[#d6a928]" />
                            City College of CDO
                        </p>
                        <h1 className="about-display max-w-xl text-5xl font-extrabold leading-[0.98] tracking-tight text-[#183329] sm:text-6xl lg:text-7xl">
                            A place to{" "}
                            <span className="about-hero-accent">learn,</span>{" "}
                            <span className="about-serif about-hero-accent-serif font-normal italic">
                                belong,
                            </span>{" "}
                            and lead.
                        </h1>
                        <p className="mt-7 max-w-lg text-base leading-8 text-slate-600 md:text-lg">
                            The City College of Cagayan de Oro is a community
                            built around accessible, relevant, and
                            transformative education for the people of Cagayan
                            de Oro.
                        </p>
                        <a
                            href="#story"
                            className="mt-8 inline-flex items-center gap-3 border-b-2 border-[#d6a928] pb-2 text-sm font-bold text-[#0f5132] transition-colors hover:text-[#bd8e1d]"
                        >
                            Discover our story
                            <span aria-hidden="true" className="text-lg">
                                ↓
                            </span>
                        </a>
                    </Reveal>

                    <Reveal delay={0.12} className="relative">
                        <div className="absolute -inset-3 border border-[#d6a928]/50 sm:-inset-5" />
                        <div className="relative aspect-[4/3] overflow-hidden bg-[#0f5132] shadow-[0_28px_70px_-28px_rgba(15,81,50,0.6)]">
                            <img
                                src={aboutUsImage}
                                alt="Entrance of the City College of Cagayan de Oro"
                                className="h-full w-full object-cover transition-transform duration-700 hover:scale-[1.03]"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#102c22]/45 via-transparent to-transparent" />
                            <p className="absolute bottom-4 left-5 text-[10px] font-bold uppercase tracking-[0.3em] text-white/90 sm:bottom-6 sm:left-7">
                                Our home in Cagayan de Oro
                            </p>
                        </div>
                        <div className="absolute -bottom-7 -left-3 hidden bg-[#0f5132] px-6 py-4 text-white shadow-xl sm:block md:-left-8">
                            <p className="about-display text-2xl font-bold">
                                Kauban ta
                            </p>
                            <p className="mt-1 text-[10px] uppercase tracking-[0.22em] text-[#f5d878]">
                                Together, we move forward
                            </p>
                        </div>
                    </Reveal>
                </div>
            </section>

            <section
                id="story"
                className="relative overflow-hidden bg-[#f7faf6] about-diagonal"
            >
                <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 sm:px-8 md:py-24 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20 lg:px-12">
                    <Reveal>
                        <p className="text-[18px] font-bold uppercase tracking-[0.35em] text-[#bd8e1d]">
                            About the
                        </p>
                        <h2 className="about-display mt-4 text-3xl font-extrabold leading-[1.04] text-[#183329] md:text-5xl">
                            City College of
                            <br />
                            Cagayan De Oro
                        </h2>
                    </Reveal>

                    <Reveal delay={0.1}>
                        <div className="space-y-5 text-[15px] leading-8 text-slate-600 md:text-base lg:pt-2">
                            <p>
                                We believe quality education should be close to
                                home and connected to the needs of the community
                                it serves. At CCCDO, students are prepared to
                                think critically, act with integrity, and
                                contribute meaningfully in a changing world.
                            </p>

                            <p>
                                Our campus brings together learners, educators,
                                and partners who share a commitment to
                                innovation, inclusivity, sustainable
                                development, and service. Every Kauban has a
                                part in building a more capable and
                                compassionate Cagayan de Oro.
                            </p>

                            {expanded && (
                                <>
                                    <p>
                                        The City College of Cagayan de Oro
                                        (CCCdO) is a locally funded public
                                        higher education and
                                        technical-vocational institution
                                        established by the Local Government Unit
                                        of Cagayan de Oro City in 2023 by virtue
                                        of City Ordinance No. 14564. Located in
                                        Jose Rizal St., Zone 2, Barangay Agusan,
                                        Cagayan de Oro City, the institution was
                                        established to advance the city&apos;s
                                        commitment to providing accessible,
                                        inclusive, quality, and relevant
                                        education to its people and surrounding
                                        communities.
                                    </p>
                                    <p>
                                        The institution traces its roots to the
                                        Cagayan de Oro Technical Vocational
                                        Institute (CDO-TVI), established in 2018
                                        through City Ordinance No. 13473-2018
                                        during the administration of then Mayor
                                        Oscar S. Moreno, with Councilor Suzette
                                        Magtajas-Daba as principal author.
                                        Originally established as a
                                        city-operated technical-vocational
                                        institution, CDO-TVI provided free,
                                        TESDA-accredited training programs
                                        designed to respond to the workforce
                                        needs of a rapidly developing Cagayan de
                                        Oro.
                                    </p>
                                    <p>
                                        From its beginnings, CDO-TVI was
                                        anchored on the principle that technical
                                        and skills-based education should be
                                        accessible to communities, particularly
                                        to out-of-school youth and individuals
                                        who may face barriers to formal
                                        education and employment. In 2021, it
                                        expanded its training offerings through
                                        Barangay Health Services NC II, in
                                        partnership with the City Health Office,
                                        to help equip and strengthen barangay
                                        health workers.
                                    </p>
                                    <p>
                                        In 2023, the vision of establishing a
                                        city college moved forward with the
                                        approval of the ordinance creating
                                        CCCdO. The measure expanded the mandate
                                        of CDO-TVI into a higher education
                                        institution capable of offering
                                        technical-vocational, diploma, and
                                        bachelor&apos;s degree programs under
                                        the oversight of TESDA and CHED. This
                                        direction reflects the
                                        institution&apos;s 2033 vision of
                                        nurturing and producing global citizens
                                        supported by cutting-edge technologies
                                        for innovation and excellence.
                                    </p>
                                    <p>
                                        Guided by this vision, CCCdO&apos;s
                                        mission centers on transformative and
                                        inclusive learning, supported by
                                        cutting-edge technologies, data-driven
                                        approaches, research, innovation, and
                                        community engagement. The institution
                                        also recognizes its responsibility to
                                        contribute to the United Nations
                                        Sustainable Development Goals and to
                                        serve diverse communities, including
                                        Indigenous Peoples communities, across
                                        Cagayan de Oro.
                                    </p>
                                </>
                            )}

                            <button
                                type="button"
                                onClick={() => setExpanded((prev) => !prev)}
                                className="mt-2 inline-flex items-center gap-3 border-b-2 border-[#d6a928] pb-2 text-sm font-bold text-[#0f5132] transition-colors hover:text-[#bd8e1d]"
                            >
                                {expanded ? "See less" : "See more"}
                                <span
                                    aria-hidden="true"
                                    className={`text-lg transition-transform duration-300 ${expanded ? "rotate-180" : "rotate-0"}`}
                                >
                                    ↓
                                </span>
                            </button>
                        </div>
                    </Reveal>
                </div>
            </section>

            <section className="border-y border-[#dce8df] bg-[#f3f8f4]">
                <div className="mx-auto grid max-w-7xl grid-cols-1 divide-y divide-[#cbded1] px-5 py-2 sm:grid-cols-3 sm:divide-x sm:divide-y-0 sm:px-8 lg:px-12">
                    {facts.map((fact, index) => (
                        <Reveal
                            key={fact.label}
                            delay={index * 0.08}
                            className="px-5 py-7 sm:px-8 md:py-9"
                        >
                            <p className="about-display text-2xl font-extrabold text-[#0f5132] md:text-3xl">
                                {fact.value}
                            </p>
                            <p className="mt-2 max-w-[220px] text-xs uppercase leading-5 tracking-[0.16em] text-slate-500">
                                {fact.label}
                            </p>
                        </Reveal>
                    ))}
                </div>
            </section>

            <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 md:py-24 lg:px-12">
                <Reveal className="mb-9 flex flex-col justify-between gap-4 md:flex-row md:items-end">
                    <div>
                        <p className="text-[11px] font-bold uppercase tracking-[0.35em] text-[#bd8e1d]">
                            Take a closer look
                        </p>
                        <h2 className="about-display mt-3 text-3xl font-extrabold text-[#183329] md:text-4xl">
                            The parts that make us whole.
                        </h2>
                    </div>
                    <p className="max-w-sm text-sm leading-6 text-slate-500">
                        Find the people, principles, and story behind the City
                        College community.
                    </p>
                </Reveal>
                <div className="grid gap-5 md:grid-cols-3">
                    {pathways.map((pathway, index) => (
                        <Reveal key={pathway.title} delay={index * 0.08}>
                            <a
                                href={pathway.href}
                                className="group block h-full border border-slate-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#0f8a50]/40 hover:shadow-[0_18px_40px_-24px_rgba(15,81,50,0.55)] md:p-7"
                            >
                                <div className="flex items-center justify-between">
                                    <span className="text-xs font-bold tracking-[0.25em] text-[#bd8e1d]">
                                        {pathway.number}
                                    </span>
                                    <span className="text-xl text-[#0f5132] transition-transform duration-300 group-hover:translate-x-1">
                                        ↗
                                    </span>
                                </div>
                                <p className="mt-10 text-[10px] font-bold uppercase tracking-[0.28em] text-slate-400">
                                    {pathway.label}
                                </p>
                                <h3 className="about-display mt-2 text-xl font-bold text-[#183329]">
                                    {pathway.title}
                                </h3>
                                <p className="mt-3 text-sm leading-6 text-slate-600">
                                    {pathway.description}
                                </p>
                            </a>
                        </Reveal>
                    ))}
                </div>
            </section>
        </MainLayout>
    );
}
