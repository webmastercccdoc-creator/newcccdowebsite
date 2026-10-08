import { useEffect, useState } from 'react';
import MainLayout from '../../../layouts/MainLayout';
import AnimatedBannerText from '../../../components/content/AnimatedBannerText';
import extensionBanner from '../../../assets/banner/extension-banner.png';
import outreachCover from '../../../assets/images/Outreach_1.png';
import extensionistDevelopment from '../../../assets/images/Outreach_3.png';
import approvedProjects from '../../../assets/images/Outreach_4.png';
import educationOutreach from '../../../assets/images/Outreach_5.png';
import mangroveRestoration from '../../../assets/images/Outreach_6.png';
import communityCleanup from '../../../assets/images/Outreach_7.png';
import campusCleanup from '../../../assets/images/Outreach_8.png';

const IMPACT_STORIES = [
    {
        image: extensionistDevelopment,
        imageAlt: 'Extensionists taking part in project planning and presentation',
        category: 'People and practice',
        title: 'Building capacity for community-centered work',
        description:
            'Planning, preparation, and project presentation help extensionists turn community priorities into well-designed, measurable initiatives.',
        metrics: [
            { value: '8', label: 'projects presented' },
            { value: '4.72', label: 'client satisfaction survey' },
            { value: '4.62', label: 'activity evaluation' },
        ],
    },
    {
        image: approvedProjects,
        imageAlt: 'Approved extension projects across City College programs',
        category: 'Programs and partnerships',
        title: 'A growing portfolio of approved projects',
        description:
            'College and program teams bring their expertise to community priorities, from communication and disaster preparedness to livelihood, learning, and youth development.',
        metrics: [],
    },
    {
        image: educationOutreach,
        imageAlt: 'Klarex na Edukasyon Extension Program community outreach',
        category: 'Education and access',
        title: 'Klarex na Edukasyon Extension Program',
        description:
            'The program connects communities with education-focused services through local partnerships and responsive outreach.',
        metrics: [
            { value: '1,528', label: 'clients served' },
            { value: '11', label: 'barangays served in Q1' },
            { value: '10', label: 'barangays served in Q2' },
        ],
    },
    {
        image: mangroveRestoration,
        imageAlt: 'Baybayani 5.0 volunteers planting and monitoring mangroves',
        category: 'Environmental stewardship',
        title: 'Baybayani 5.0: Mangrove planting and monitoring',
        description:
            'Volunteers joined a coastal restoration effort focused on planting mangroves and monitoring their growth over time.',
        metrics: [
            { value: '81', label: 'volunteers mobilized' },
            { value: '1.8k', label: 'mangrove seedlings planted' },
            { value: '197', label: 'mangrove plants monitored' },
        ],
    },
    {
        image: communityCleanup,
        imageAlt: 'Baybayani 6.0 Higala community clean-up volunteers',
        category: 'Community action',
        title: 'Baybayani 6.0: Higala clean-up activity',
        description:
            'A volunteer-led clean-up bringing community partners together to care for shared public spaces and promote responsible waste practices.',
        metrics: [
            { value: '200+', label: 'volunteers mobilized' },
            { value: '13', label: 'partners' },
            { value: '107.5 kg', label: 'waste collected' },
        ],
    },
    {
        image: campusCleanup,
        imageAlt: 'BrigadAnIhan campus clean-up volunteers',
        category: 'Campus and community',
        title: 'BrigadAnIhan: A campus clean-up initiative',
        description:
            'Campus and community volunteers came together for a shared clean-up, reinforcing care for the spaces where learning and community life meet.',
        metrics: [
            { value: '131', label: 'volunteers' },
            { value: '3 tons', label: 'trash collected' },
            { value: '4.2', label: 'evaluation rating' },
        ],
    },
];

function GoldRule({ className = '' }) {
    return (
        <div
            className={`flex items-center justify-center gap-3 ${className}`}
            aria-hidden="true"
        >
            <span className="h-px w-14 bg-gradient-to-r from-transparent to-[#C9A24B]/80" />
            <span className="h-1.5 w-1.5 rotate-45 bg-[#B08D3E]" />
            <span className="h-px w-14 bg-gradient-to-l from-transparent to-[#C9A24B]/80" />
        </div>
    );
}

export default function Outreach() {
    const [scrollProgress, setScrollProgress] = useState(0);

    useEffect(() => {
        document.title =
            'Outreach and Volunteerism - City College of Cagayan de Oro';

        const handleScroll = () => {
            const height =
                document.documentElement.scrollHeight - window.innerHeight;
            setScrollProgress(
                height > 0 ? (window.pageYOffset / height) * 100 : 0
            );
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <MainLayout
            maxWidth="full"
            containerClassName="px-0"
            mainClassName="py-0"
            className="overflow-hidden bg-[#F5F2EA] pb-0"
        >
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700&family=Inter:wght@300;400;500;600;700;800&display=swap');
                .outreach-serif { font-family: 'Fraunces', ui-serif, Georgia, serif; }
                .outreach-sans { font-family: 'Inter', ui-sans-serif, system-ui, sans-serif; }
                ::selection { background: #0B3B2C; color: #F3EBD3; }
            `}</style>

            <div className="fixed left-0 top-0 z-[1000] h-1 w-full bg-transparent">
                <div
                    className="h-full transition-[width] duration-100 ease-out"
                    style={{
                        width: `${scrollProgress}%`,
                        background: 'linear-gradient(90deg, #145A32, #D4AF37)',
                    }}
                />
            </div>

            {/* Keep the existing Outreach hero banner unchanged. */}
            <div
                className="relative flex min-h-[350px] w-full items-center justify-center bg-cover bg-center bg-no-repeat shadow-lg md:min-h-[450px] lg:min-h-[550px]"
                style={{ backgroundImage: `url('${extensionBanner}')` }}
            >
                <div className="absolute inset-0 bg-black/50" />
                <AnimatedBannerText
                    title="Outreach and Volunteerism"
                    description="Explore volunteer opportunities and meaningful outreach programs for the community."
                />
            </div>

            <main className="outreach-sans text-[#23352B]">
                <section className="mx-auto max-w-7xl px-4 pb-16 pt-16 sm:px-6 lg:px-8 lg:pb-24 lg:pt-24">
                    <div className="grid items-center gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:gap-16">
                        <div className="max-w-2xl">
                            <GoldRule className="justify-start" />
                            <p className="mt-6 text-[10px] font-bold uppercase tracking-[0.3em] text-[#8F6B1E] sm:text-xs">
                                Extension and Outreach Office
                            </p>
                            <h1 className="outreach-serif mt-4 text-4xl font-medium leading-[1.08] tracking-tight text-[#0B3B2C] sm:text-5xl lg:text-6xl">
                                Service that grows stronger
                                <span className="block italic text-[#8F6B1E]">
                                    together.
                                </span>
                            </h1>
                            <p className="mt-6 max-w-xl text-base leading-8 text-slate-600 sm:text-lg">
                                From education and volunteer action to coastal
                                care and campus initiatives, City College
                                outreach connects people, knowledge, and local
                                partnerships to make a lasting difference.
                            </p>
                            <a
                                href="#outreach-highlights"
                                className="mt-8 inline-flex items-center gap-3 border-b border-[#0B3B2C]/30 pb-2 text-xs font-bold uppercase tracking-[0.18em] text-[#0B3B2C] transition hover:border-[#B08D3E] hover:text-[#8F6B1E]"
                            >
                                Explore the impact
                                <span aria-hidden="true">↓</span>
                            </a>
                        </div>

                        <figure className="group relative mx-auto w-full max-w-2xl">
                            <div
                                aria-hidden="true"
                                className="absolute -inset-3 translate-x-2 translate-y-2 border border-[#B08D3E]/55 transition-transform duration-500 group-hover:translate-x-1 group-hover:translate-y-1"
                            />
                            <div className="relative overflow-hidden bg-[#0B3B2C] shadow-[0_28px_70px_-35px_rgba(11,59,44,0.7)]">
                                <img
                                    src={outreachCover}
                                    alt="Mid-Year Evaluation, Cum-Synergy Summit 2026"
                                    className="aspect-[16/9] w-full object-cover transition-transform duration-700 group-hover:scale-[1.025]"
                                />
                                <figcaption className="flex items-center justify-between gap-4 border-t border-white/15 bg-[#0B3B2C] px-5 py-4 text-[#F3EBD3] sm:px-7">
                                    <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#D9C68F]">
                                        Mid-Year Evaluation
                                    </span>
                                    <span className="outreach-serif text-sm italic text-white/90">
                                        Cum-Synergy Summit 2026
                                    </span>
                                </figcaption>
                            </div>
                        </figure>
                    </div>
                </section>

                <section className="border-y border-[#0B3B2C]/10 bg-white">
                    <div className="mx-auto grid max-w-7xl gap-0 px-4 py-12 sm:px-6 md:grid-cols-3 lg:px-8">
                        {[
                            {
                                value: '1,528',
                                label: 'clients served through education outreach',
                            },
                            {
                                value: '81',
                                label: 'volunteers mobilized for mangrove care',
                            },
                            {
                                value: '200+',
                                label: 'volunteers in community clean-up',
                            },
                        ].map((item, index) => (
                            <div
                                key={item.label}
                                className={`px-5 py-6 text-center md:py-2 ${
                                    index > 0
                                        ? 'border-t border-[#0B3B2C]/10 md:border-l md:border-t-0'
                                        : ''
                                }`}
                            >
                                <p className="outreach-serif text-4xl font-medium tracking-tight text-[#0B3B2C] sm:text-5xl">
                                    {item.value}
                                </p>
                                <p className="mx-auto mt-2 max-w-xs text-[10px] font-bold uppercase leading-5 tracking-[0.16em] text-[#8F6B1E]">
                                    {item.label}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>

                <section
                    id="outreach-highlights"
                    className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24"
                >
                    <div className="mb-10 grid gap-5 border-b border-[#0B3B2C]/15 pb-8 sm:mb-12 sm:pb-10 lg:grid-cols-[1fr_auto] lg:items-end">
                        <div>
                            <GoldRule className="justify-start" />
                            <p className="mt-5 text-[10px] font-bold uppercase tracking-[0.28em] text-[#8F6B1E]">
                                Highlights from the field
                            </p>
                            <h2 className="outreach-serif mt-3 max-w-2xl text-3xl font-medium leading-tight text-[#0B3B2C] sm:text-4xl lg:text-5xl">
                                Many hands. Shared progress.
                            </h2>
                        </div>
                        <p className="max-w-md text-sm leading-7 text-slate-600 lg:text-right">
                            A closer look at the people, partnerships, and
                            programs shaping community engagement across the
                            College.
                        </p>
                    </div>

                    <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
                        {IMPACT_STORIES.map((story, index) => (
                            <article
                                key={story.title}
                                className="group flex flex-col overflow-hidden border border-[#0B3B2C]/12 bg-[#FBF9F4] shadow-[0_8px_30px_-24px_rgba(11,59,44,0.5)] transition duration-300 hover:-translate-y-1 hover:border-[#B08D3E]/60 hover:shadow-[0_28px_55px_-32px_rgba(11,59,44,0.55)]"
                            >
                                <div className="relative overflow-hidden bg-white">
                                    <img
                                        src={story.image}
                                        alt={story.imageAlt}
                                        loading="lazy"
                                        className="aspect-[16/9] w-full object-cover transition-transform duration-700 group-hover:scale-[1.025]"
                                    />
                                    <span className="absolute left-4 top-4 border border-white/70 bg-[#0B3B2C]/90 px-3 py-2 text-[9px] font-bold uppercase tracking-[0.16em] text-[#F3EBD3] backdrop-blur-sm sm:left-5 sm:top-5">
                                        {story.category}
                                    </span>
                                    <span className="absolute bottom-4 right-4 outreach-serif text-3xl font-medium text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.55)]">
                                        {String(index + 1).padStart(2, '0')}
                                    </span>
                                </div>

                                <div className="flex flex-1 flex-col p-5 sm:p-7">
                                    <h3 className="outreach-serif text-2xl font-medium leading-snug text-[#0B3B2C] sm:text-[1.7rem]">
                                        {story.title}
                                    </h3>
                                    <p className="mt-3 text-sm leading-7 text-slate-600">
                                        {story.description}
                                    </p>

                                    {story.metrics.length > 0 && (
                                        <dl className="mt-6 grid grid-cols-3 border-y border-[#0B3B2C]/12 py-4">
                                            {story.metrics.map((metric) => (
                                                <div
                                                    key={metric.label}
                                                    className="px-2 first:pl-0 last:pr-0"
                                                >
                                                    <dt className="outreach-serif text-xl font-semibold leading-tight text-[#0B3B2C] sm:text-2xl">
                                                        {metric.value}
                                                    </dt>
                                                    <dd className="mt-1.5 text-[9px] font-semibold uppercase leading-4 tracking-[0.1em] text-[#8F6B1E] sm:text-[10px]">
                                                        {metric.label}
                                                    </dd>
                                                </div>
                                            ))}
                                        </dl>
                                    )}

                                    <div className="mt-auto flex items-center justify-between pt-5">
                                        <span className="text-[9px] font-bold uppercase tracking-[0.19em] text-slate-400">
                                            City College of Cagayan de Oro
                                        </span>
                                        <span
                                            aria-hidden="true"
                                            className="h-1.5 w-1.5 rotate-45 bg-[#B08D3E]"
                                        />
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                </section>
            </main>
        </MainLayout>
    );
}
