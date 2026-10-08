import { useEffect, useMemo, useState } from 'react';
import MainLayout from '../../../layouts/MainLayout';
import AnimatedBannerText from '../../../components/content/AnimatedBannerText';
import extensionBanner from '../../../assets/banner/extension-banner.png';

const projects = [
    {
        office: 'Technical Skills and Technology Institute',
        title: 'Project KAHANAS',
        leader: 'Mr. Karl Hein M. Pios',
        coLeader: 'Mr. Mark Adrian S. Baa',
        members: [
            'Ms. Gemma E. Gonzales',
            'Ms. Marivic I. Martinez',
            'Ms. Rutchie E. Montano',
        ],
    },
    {
        office: 'College of Arts and Sciences',
        title: 'Project COMM READY: A Needs-Based GE-BAComm Extension Program on Professional Communication for Senior High School Learners',
        leader: 'Mr. Mark P. Janubas',
        members: ['Ms. Ma. Katerina F. Janubas'],
    },
    {
        office: 'Social Work Program',
        title: 'TalentRail Academy: A Reintegration Program in Cagayan de Oro',
        leader: 'Ms. Sheena Marie P. Abad',
        coLeader: 'Ms. Jan Trisha L. Sabaiton',
        members: ['Ms. Herna Francis Mae B. Tano', 'Dr. Donna Grace I. Cotejo'],
    },
    {
        office: 'National Service Training Program',
        title: 'Project L.I.G.T.A.S (Lihok, Ihap, Giya, Tuk, Alerto, Sigurado): The National Service Reserve Corps (NSRC) Community Resilience and Disaster Preparedness Program',
        leader: 'Ms. Candice May B. Gamayon',
        coLeader: 'Ms. Angelou V. Pepino',
        members: [],
    },
    {
        office: 'PATHFIT Office',
        title: 'S.U.G.A.K.O.D - Strengthening Unity & Growth Among Kids through Outreach in Dance and Sports',
        leader: 'Mr. Paolo Matutinao',
        members: ['Ms. Shaena Dance Ucat', 'Mr. Erlouise Vargas'],
    },
    {
        office: 'College of Business & Management',
        title: 'ASENSO sa AGUSAN: Empowering Fisherfolk Wives Through Fish-Based Enterprise Development',
        leader: 'Ms. Jessa S. Cortez',
        members: [
            'Ms. Catherine Uayan',
            'Ms. Herna Francis Mae B. Tano',
            'Dr. Rowena Orbeta',
            'Mr. Joseph Barillo',
            'Dr. Mary Joy Teodosio',
        ],
    },
    {
        office: 'College of Education',
        title: 'Project Solaris',
        leader: 'Dr. Liza L. Chua',
        members: [
            'Ms. Mary Vil Acenas',
            'Aiza Mae D. Cahansa',
            'Psyche Cambo',
            'Charlito M. Castrodes',
            'Charlie H. Cosmiano',
            'Charlie Job Sumili',
            'Jason Herrera',
        ],
    },
    {
        office: 'Research, Innovation & Technology Transfer (RITTS)',
        title: 'Project Mentor 2.0',
        leader: 'Dr. Joel Potane',
        coLeader: 'Prof. Mark P. Janubas',
        members: [
            'Mr. Earl Louise Vargas',
            'Dr. Mary Joy Teodosio',
            'Dr. Psyche Cambo',
            'Dr. Jean T. Loquillano',
            'Mr. Ryan Sarip',
            'Mr. Jason Herrera',
        ],
    },
    {
        office: 'Alternative Learning System',
        title: 'ALS Weekend Bridging Academy',
        leader: 'Dr. Ray Butch Mahinay',
        members: [
            'Dr. Jean T. Loquillano',
            'Mr. Eldin Camposo',
            'Mr. Jonathan Madronero',
            'Mr. Mark Janubas',
            'Dr. Joel D. Potane',
            'Ms. Ma. Katarina Janubas',
            'Dr. Faith Colarte',
            'Mr. Howard Christian O. Aranar',
        ],
    },
    {
        office: 'Extension and Social Development Services',
        title: 'PROJECT RIGHT 2.0 (Raising Information and Generating Human Rights Training)',
        leader: 'Dr. Jean T. Loquillano',
        members: [
            'Dr. Joel D. Potane',
            'Mr. Jason R. Basiculan',
            'Mr. James D. Manas',
        ],
    },
];

function Ornament({ line = 'w-14', className = '' }) {
    return (
        <div
            className={`flex items-center justify-center gap-3 ${className}`}
            aria-hidden="true"
        >
            <span
                className={`h-px ${line} bg-gradient-to-r from-transparent to-[#C9A24B]/80`}
            />
            <span className="h-1.5 w-1.5 rotate-45 bg-[#B08D3E]" />
            <span
                className={`h-px ${line} bg-gradient-to-l from-transparent to-[#C9A24B]/80`}
            />
        </div>
    );
}

export default function CommunityExtension() {
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        document.title =
            'Community Extension Programs - City College of Cagayan de Oro';
    }, []);

    const filteredProjects = useMemo(() => {
        const query = searchTerm.trim().toLowerCase();
        if (!query) return projects;

        return projects.filter((project) =>
            [
                project.office,
                project.title,
                project.leader,
                project.coLeader,
                ...project.members,
            ]
                .filter(Boolean)
                .some((value) => value.toLowerCase().includes(query))
        );
    }, [searchTerm]);

    return (
        <MainLayout
            maxWidth="full"
            containerClassName="px-0"
            mainClassName="py-0"
            className="overflow-hidden bg-[#F5F2EA] pb-0"
        >
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700&family=Inter:wght@300;400;500;600;700;800&display=swap');
                .community-serif { font-family: 'Fraunces', ui-serif, Georgia, serif; }
                .community-sans { font-family: 'Inter', ui-sans-serif, system-ui, sans-serif; }
                ::selection { background: #0B3B2C; color: #F3EBD3; }
            `}</style>

            {/* Hero banner — untouched */}
            <section
                className="relative flex min-h-[350px] w-full items-center justify-center bg-cover bg-center bg-no-repeat shadow-lg md:min-h-[450px] lg:min-h-[550px]"
                style={{ backgroundImage: `url('${extensionBanner}')` }}
                aria-label="Community Extension Programs"
            >
                <div className="absolute inset-0 bg-black/50" />
                <AnimatedBannerText
                    title="Community Extension Programs"
                    description="Working together with our communities through learning, service, and sustainable development."
                />
            </section>

            {/* Formal masthead */}
            <section className="community-sans mx-auto max-w-7xl px-4 pt-16 sm:px-6 lg:px-8 lg:pt-24">
                <div className="mx-auto max-w-3xl text-center">
                    <Ornament />
                    <p className="mt-5 text-[11px] font-bold uppercase tracking-[0.3em] text-[#8F6B1E]">
                        City College of Cagayan de Oro
                    </p>
                    <h2 className="community-serif mt-4 text-4xl font-semibold leading-tight tracking-tight text-[#0B3B2C] sm:text-5xl">
                        Serving communities, creating impact
                    </h2>
                    <p className="community-serif mx-auto mt-5 max-w-xl text-lg italic leading-8 text-slate-600">
                        A registry of the extension projects led by our colleges,
                        programs, and offices in partnership with the communities
                        we serve.
                    </p>
                    <Ornament className="mt-7" />
                </div>
            </section>

            {/* Registry */}
            <section className="community-sans mx-auto max-w-7xl px-4 pb-20 pt-14 sm:px-6 lg:px-8 lg:pb-24 lg:pt-20">
                <div className="flex flex-col gap-8 border-b border-[#0B3B2C]/10 pb-8 lg:flex-row lg:items-end lg:justify-between">
                    <div>
                        <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#8F6B1E]">
                            Official Directory
                        </p>
                        <h3 className="community-serif mt-2 text-3xl font-semibold tracking-tight text-[#0B3B2C]">
                            Extension Project Registry
                        </h3>
                    </div>

                    <label className="relative block w-full lg:w-80">
                        <span className="sr-only">
                            Search projects, offices, or team members
                        </span>
                        <svg
                            aria-hidden="true"
                            className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <circle cx="11" cy="11" r="7" strokeWidth="1.8" />
                            <path d="m16 16 4 4" strokeLinecap="round" strokeWidth="1.8" />
                        </svg>
                        <input
                            type="search"
                            value={searchTerm}
                            onChange={(event) => setSearchTerm(event.target.value)}
                            placeholder="Search titles, offices, or people"
                            className="w-full rounded-sm border border-slate-300 bg-white py-3 pl-11 pr-4 text-sm text-slate-800 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-[#0B3B2C] focus:ring-2 focus:ring-[#0B3B2C]/15"
                        />
                    </label>
                </div>

                {filteredProjects.length > 0 ? (
                    <div className="mt-10 grid gap-7 md:grid-cols-2 xl:grid-cols-3">
                        {filteredProjects.map((project) => (
                            <article
                                key={project.title}
                                className="group relative flex h-full flex-col rounded-sm border border-[#0B3B2C]/15 bg-gradient-to-b from-white to-[#FBF7EE] p-7 shadow-[0_1px_3px_rgba(15,42,29,0.08)] transition-all duration-300 hover:-translate-y-1 hover:border-[#0B3B2C]/30 hover:shadow-[0_24px_48px_-24px_rgba(11,59,44,0.4)]"
                            >
                                {/* Inner gold certificate frame */}
                                <span
                                    aria-hidden="true"
                                    className="pointer-events-none absolute inset-2 rounded-sm border border-[#C9A24B]/40 transition-colors duration-300 group-hover:border-[#C9A24B]/75"
                                />

                                <div className="flex items-center gap-4 border-b border-[#0B3B2C]/10 pb-5">
                                    {/* Seal */}
                                    <div className="relative flex h-12 w-12 shrink-0 items-center justify-center">
                                        <span
                                            aria-hidden="true"
                                            className="absolute inset-0 rounded-full border border-[#B08D3E]"
                                        />
                                        <span
                                            aria-hidden="true"
                                            className="absolute inset-[3px] rounded-full border border-[#B08D3E]/45"
                                        />
                                        <span className="community-serif text-sm font-semibold text-[#0B3B2C]">
                                            {String(
                                                projects.indexOf(project) + 1
                                            ).padStart(2, '0')}
                                        </span>
                                    </div>
                                    <div className="min-w-0">
                                        <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#8F6B1E]">
                                            Extension Undertaking
                                        </p>
                                        <p className="mt-1 text-xs font-medium leading-snug text-slate-500">
                                            {project.office}
                                        </p>
                                    </div>
                                </div>

                                <h3 className="community-serif mt-5 text-xl font-semibold leading-snug text-[#0B3B2C]">
                                    {project.title}
                                </h3>

                                <Ornament line="flex-1" className="my-6" />

                                <div className="mb-6 space-y-5">
                                    <div>
                                        <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-slate-500">
                                            Project Leader
                                        </p>
                                        <p className="community-serif mt-1 text-[15px] font-semibold text-slate-900">
                                            {project.leader}
                                        </p>
                                    </div>

                                    {project.coLeader && (
                                        <div>
                                            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-slate-500">
                                                Co-Project Leader
                                            </p>
                                            <p className="community-serif mt-1 text-[15px] font-semibold text-slate-900">
                                                {project.coLeader}
                                            </p>
                                        </div>
                                    )}

                                    {project.members.length > 0 && (
                                        <div>
                                            <div className="flex items-center justify-between">
                                                <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-slate-500">
                                                    Members
                                                </p>
                                                <p className="text-[10px] font-bold tabular-nums tracking-[0.18em] text-[#B08D3E]">
                                                    {String(
                                                        project.members.length
                                                    ).padStart(2, '0')}
                                                </p>
                                            </div>
                                            <ul className="mt-2">
                                                {project.members.map(
                                                    (member, index) => (
                                                        <li
                                                            key={member}
                                                            className="flex items-baseline gap-3 border-t border-[#0B3B2C]/10 py-2 first:border-t-0"
                                                        >
                                                            <span className="w-6 shrink-0 text-right text-[10px] font-bold tabular-nums text-[#B08D3E]">
                                                                {String(
                                                                    index + 1
                                                                ).padStart(2, '0')}
                                                            </span>
                                                            <span className="text-sm leading-6 text-slate-700">
                                                                {member}
                                                            </span>
                                                        </li>
                                                    )
                                                )}
                                            </ul>
                                        </div>
                                    )}
                                </div>

                                <div className="mt-auto">
                                    <div className="flex items-center justify-between border-t border-[#0B3B2C]/10 pt-4">
                                        <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-400">
                                            Community Extension Programs
                                        </p>
                                        <span
                                            aria-hidden="true"
                                            className="h-1 w-1 rotate-45 bg-[#B08D3E]/70"
                                        />
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                ) : (
                    <div className="relative mt-12 rounded-sm border border-[#0B3B2C]/15 bg-gradient-to-b from-white to-[#FBF7EE] px-6 py-20 text-center">
                        <span
                            aria-hidden="true"
                            className="pointer-events-none absolute inset-2 rounded-sm border border-[#C9A24B]/40"
                        />
                        <Ornament />
                        <h4 className="community-serif mt-6 text-2xl font-semibold text-[#0B3B2C]">
                            No matching records found
                        </h4>
                        <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-slate-600">
                            Please refine your search to continue browsing the
                            registry.
                        </p>
                        <button
                            type="button"
                            onClick={() => setSearchTerm('')}
                            className="mt-7 inline-flex items-center rounded-sm border border-[#0B3B2C] bg-[#0B3B2C] px-6 py-2.5 text-xs font-bold uppercase tracking-[0.18em] text-[#F3EBD3] transition hover:bg-[#12503E]"
                        >
                            Clear Search
                        </button>
                    </div>
                )}
            </section>
        </MainLayout>
    );
}