import { motion } from 'framer-motion';
import MainLayout from '../../../layouts/MainLayout';
import AnimatedBannerText from '../../../components/content/AnimatedBannerText';
import researchBannerImg from '../../../assets/banner/coregoals-banner.png';
import joelPotanePhoto from '../../../assets/images/JOEL_POTANE.png';

export default function ResearchInnovationTechnologyTransfer() {
    return (
        <MainLayout
            maxWidth="full"
            containerClassName="px-0"
            mainClassName="py-0"
            className="overflow-hidden pb-0"
        >
            <div
                className="relative flex min-h-[350px] w-full items-center justify-center bg-cover bg-center bg-no-repeat shadow-lg md:min-h-[450px] lg:min-h-[550px]"
                style={{ backgroundImage: `url('${researchBannerImg}')` }}
            >
                <div className="absolute inset-0 bg-black/50" />
                <AnimatedBannerText
                    title="Research, Innovation, and Technology Transfer Services"
                    description="Supporting research coordination, innovation, and technology transfer at City College of Cagayan de Oro."
                />
            </div>

            <div className="mx-auto w-full max-w-[1600px] px-6 py-14 sm:px-10 md:py-20 lg:px-16 xl:px-20">
                <motion.div
                    className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-shadow duration-300 hover:shadow-xl"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
                >
                    <div className="flex flex-col items-start gap-10 p-8 md:flex-row md:p-10 lg:gap-14 lg:p-14">
                        <div className="mx-auto flex w-full shrink-0 flex-col gap-8 md:mx-0 md:w-80 lg:w-96">
                            <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
                                <div className="flex aspect-[4/5] w-full items-center justify-center bg-white p-2">
                                    <img
                                        src={joelPotanePhoto}
                                        alt="Dr. Joel D. Potane"
                                        className="h-full w-full object-contain"
                                    />
                                </div>
                                <div className="border-t-4 border-[#f5c518] bg-white px-4 py-4 text-center">
                                    <p className="m-0 text-sm font-bold uppercase tracking-wide text-[#157d3c] sm:text-base md:text-lg">
                                        Dr. Joel D. Potane
                                    </p>
                                    <p className="mt-1 text-xs font-semibold leading-tight text-[#1a1a1a] sm:text-sm md:text-base">
                                        Director of Research, Innovation, and Technology Transfer Services
                                    </p>
                                    <div className="mt-3 flex justify-center gap-3">
                                        <a
                                            href="https://orcid.org/0000-0003-0210-8149"
                                            target="_blank"
                                            rel="noreferrer"
                                            aria-label="ORCID profile"
                                            title="ORCID"
                                            className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-[#a6ce39] transition-transform hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#157d3c]"
                                        >
                                            <span className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-white text-[11px] font-bold tracking-tight text-white">
                                                iD
                                            </span>
                                        </a>
                                        <a
                                            href="https://scholar.google.com/citations?user=nJqgrxAAAAAJ&hl=en&oi=ao"
                                            target="_blank"
                                            rel="noreferrer"
                                            aria-label="Google Scholar profile"
                                            title="Google Scholar"
                                            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-gray-200 bg-white transition-transform hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#157d3c]"
                                        >
                                            <svg viewBox="0 0 32 32" className="h-7 w-7" aria-hidden="true">
                                                <path fill="#4285f4" d="M3 12.2 16 5l13 7.2-13 7.2L3 12.2Z" />
                                                <path fill="#1a73e8" d="M8 15v6.2c0 3.2 3.6 5.8 8 5.8s8-2.6 8-5.8V15l-8 4.4L8 15Z" />
                                                <path fill="#fbbc04" d="M28 13v8h2v-9.1l-2 .1Z" />
                                            </svg>
                                        </a>
                                        <a
                                            href="https://adscientificindex.com/scientist/joel-d-potane/4976407/"
                                            target="_blank"
                                            rel="noreferrer"
                                            aria-label="AD Scientific Index profile"
                                            title="AD Scientific Index"
                                            className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-[#157d3c] text-sm font-extrabold tracking-tight text-white transition-transform hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#157d3c]"
                                        >
                                            AD
                                        </a>
                                    </div>
                                </div>
                            </div>

                            <div className="rounded-xl border border-[#157d3c] bg-[#157d3c] p-6 shadow-sm">
                                <div className="mb-5 flex flex-col items-start text-left">
                                    <h3 className="m-0 text-lg font-extrabold tracking-tight text-white">
                                        Contact <span className="text-[#f5c518]">Us</span>
                                    </h3>
                                    <div className="mt-2 h-1 w-12 rounded-full bg-[#f5c518]" />
                                </div>

                                <ul className="space-y-3.5 text-sm text-white">
                                    <li className="flex items-start gap-2.5">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="#f5c518"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            className="mt-0.5 h-4 w-4 shrink-0"
                                            aria-hidden="true"
                                        >
                                            <rect width="20" height="16" x="2" y="4" rx="2" />
                                            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                                        </svg>
                                        <span>
                                            <strong>Email: </strong>
                                            <a
                                                href="mailto:cccdoofficeofresearch@gmail.com"
                                                className="break-all underline decoration-white/60 underline-offset-2 hover:text-[#f5c518]"
                                            >
                                                cccdoofficeofresearch@gmail.com
                                            </a>
                                        </span>
                                    </li>
                                    <li className="flex items-start gap-2.5">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="#f5c518"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            className="mt-0.5 h-4 w-4 shrink-0"
                                            aria-hidden="true"
                                        >
                                            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                                        </svg>
                                        <span>
                                            <strong>Messenger: </strong>
                                            <a
                                                href="https://m.me/519668507885653"
                                                target="_blank"
                                                rel="noreferrer"
                                                className="underline decoration-white/60 underline-offset-2 hover:text-[#f5c518]"
                                            >
                                                Research, Innovation &amp; Technology Transfer - City College CDO
                                            </a>
                                        </span>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className="min-w-0 w-full flex-1">
                            <div className="-mx-8 -mt-8 mb-8 border-b border-gray-200 bg-[#f0f7f2] md:-mx-10 md:-mt-10 lg:-mx-14 lg:-mt-14">
                                <div className="flex w-full items-stretch">
                                    <div className="relative flex-1 bg-[#157d3c] px-6 py-5 text-center text-sm font-semibold tracking-wide text-white">
                                        Bionote
                                        <span className="absolute bottom-0 left-0 right-0 h-1 bg-[#f5c518]" />
                                    </div>
                                </div>
                            </div>
                            <section aria-labelledby="director-profile-title">
                                <h2 id="director-profile-title" className="m-0 mb-4 text-center text-2xl font-extrabold tracking-tight text-[#1a1a1a] md:text-3xl">
                                    Bio <span className="text-[#157d3c]">Note</span>
                                </h2>
                                <div className="mx-auto mb-6 h-1 w-16 rounded-full bg-[#f5c518]" />
                                <div className="mx-auto max-w-3xl">
                                            <p className="mb-4 text-justify leading-relaxed text-gray-700">
                                                <strong className="text-[#1a1a1a]">Dr. Joel D. Potane</strong> is
                                                the Director of Research, Innovation, and Technology Transfer
                                                Services (RITTS) at the City College of Cagayan de Oro. He
                                                began his career as a science teacher and mentor in science
                                                investigatory projects before joining the Department of
                                                Education, where he served as a Senior Education Program
                                                Specialist for Research and Division Science Coordinator,
                                                spearheading research capacity-building programs and science
                                                education initiatives.
                                            </p>
                                            <p className="mb-4 text-justify leading-relaxed text-gray-700">
                                                He is an Associate Member of the National Research Council of
                                                the Philippines (NRCP), a Japan International Cooperation
                                                Agency (JICA) Fellow, a Fellow of the Royal Institute of
                                                Educators, Singapore, and Vice President for Division Affairs
                                                of the Academic Doctors&apos; Circle, Inc. His international
                                                engagements include JICA programs on disaster science,
                                                education, and the Sustainable Development Goals in Japan and
                                                the 2025 CommTECH Camp Insight at Institut Teknologi Sepuluh
                                                Nopember (ITS), Indonesia, where his international team
                                                received the Best Idea Award.
                                            </p>
                                            <p className="mb-4 text-justify leading-relaxed text-gray-700">
                                                An active researcher and academic leader, Dr. Potane has
                                                presented research in Japan, Thailand, Indonesia, Malaysia,
                                                and the Philippines, published in peer-reviewed and indexed
                                                journals, and served as a journal reviewer and editorial
                                                board member. He currently co-leads a nationwide Teacher
                                                Education Council (TEC)-funded research project on mentorship
                                                among pre-service teachers involving teacher education
                                                institutions across the Philippines.
                                            </p>
                                            <p className="text-justify leading-relaxed text-gray-700">
                                                His research teams have earned several distinctions,
                                                including four First Place Best Paper Awards in 2025 at
                                                national and international conferences and a 2026 Best Paper
                                                Award for research on climate change courseware. He is also a
                                                passer of the Career Executive Service (CES) Written
                                                Examination and the Licensure Examination for Teachers (LET).
                                                His work centers on research, science education, innovation,
                                                technology, sustainability, and research capacity building.
                                            </p>
                                </div>
                            </section>
                        </div>
                    </div>
                </motion.div>

            </div>
        </MainLayout>
    );
}
