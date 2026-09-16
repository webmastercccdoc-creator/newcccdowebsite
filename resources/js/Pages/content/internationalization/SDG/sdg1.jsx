// sdg1.jsx
import sdg1Gif from '../../../../assets/images/sdg gif/1_SDG_MakeEveryDayCount_Gifs_GDU.gif';

export default function Sdg1({ onBack, color = '#E5243B' }) {
    return (
        <div>
            {/* Back button */}
            <button
                type="button"
                onClick={onBack}
                className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors mb-4"
            >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to all SDGs
            </button>

            {/* SDG badge */}
            <div className="mb-4">
                <span
                    className="inline-block w-fit rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white"
                    style={{ backgroundColor: color }}
                >
                    SDG 1
                </span>
            </div>

            {/* Title */}
            <h2
                className="text-2xl md:text-4xl font-extrabold leading-tight"
                style={{ color }}
            >
                No Poverty
            </h2>

            {/* Accent bar */}
            <div
                className="mt-3 h-1 w-20 rounded-full"
                style={{ backgroundColor: color }}
            />

            {/* Intro */}
            <p className="mt-5 text-sm md:text-base text-gray-700 leading-relaxed text-left">
                <span className="font-semibold" style={{ color }}>
                    Sustainable Development Goal 1
                </span>{' '}
                aims to end poverty in all its forms everywhere. It calls for ensuring that all
                people — especially the poorest and most vulnerable — have equal access to
                economic resources, basic services, and opportunities to build a better life.
            </p>

            {/* What CCCDO does */}
            <h3 className="mt-6 text-base md:text-lg font-bold text-gray-900 text-left">
                How City College of Cagayan de Oro Contributes
            </h3>

            <ul className="mt-3 space-y-2 text-sm md:text-base text-gray-700 leading-relaxed text-left list-disc list-inside">
                <li>
                    <span className="font-semibold text-gray-900">Accessible Higher Education</span> —
                    The college provides affordable tuition and free or subsidized education to
                    students from low-income families, helping break the cycle of poverty through
                    knowledge and skills.
                </li>
                <li>
                    <span className="font-semibold text-gray-900">Scholarship and Financial Assistance Programs</span> —
                    CCDO offers scholarships, grants, and financial aid to deserving students,
                    ensuring that financial hardship is never a barrier to quality education.
                </li>
                <li>
                    <span className="font-semibold text-gray-900">Community Extension Programs</span> —
                    Faculty and students conduct livelihood training, skills development workshops,
                    and outreach activities in partner barangays to help families generate income
                    and become self-sufficient.
                </li>
                <li>
                    <span className="font-semibold text-gray-900">Employment and Employability Support</span> —
                    Through industry linkages, internships, and job placement programs, the college
                    prepares graduates for decent work that uplifts their families and communities.
                </li>
                <li>
                    <span className="font-semibold text-gray-900">Research on Poverty Alleviation</span> —
                    CCDO faculty and students conduct research on poverty, social protection, and
                    inclusive development, generating insights that inform local policies and
                    community interventions.
                </li>
            </ul>

            {/* GIF below the content */}
            <div className="mt-6">
                <img
                    src={sdg1Gif}
                    alt="SDG 1 – Make Every Day Count"
                    className="w-full h-auto rounded-lg shadow-sm"
                />
            </div>

            {/* Impact highlight */}
            <div
                className="mt-6 rounded-lg p-4 border"
                style={{
                    backgroundColor: `${color}10`,
                    borderColor: `${color}40`,
                }}
            >
                <p className="text-xs md:text-sm text-gray-800 leading-relaxed text-left">
                    <span className="font-semibold" style={{ color }}>
                        City College of Cagayan de Oro
                    </span>{' '}
                    believes that education is one of the most powerful tools for eradicating
                    poverty. By opening doors to quality learning, empowering graduates with
                    skills, and serving underserved communities, CCDO contributes directly to
                    SDG 1 — creating lasting change one student, one family, and one community
                    at a time.
                </p>
            </div>

            {/* Quick facts */}
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="rounded-lg border border-gray-200 bg-white p-3 text-center">
                    <p className="text-lg md:text-xl font-extrabold" style={{ color }}>Free</p>
                    <p className="mt-1 text-[11px] md:text-xs font-medium text-gray-500 uppercase tracking-wide">
                        Tuition for Qualified Students
                    </p>
                </div>
                <div className="rounded-lg border border-gray-200 bg-white p-3 text-center">
                    <p className="text-lg md:text-xl font-extrabold" style={{ color }}>Scholarships</p>
                    <p className="mt-1 text-[11px] md:text-xs font-medium text-gray-500 uppercase tracking-wide">
                        & Financial Aid Available
                    </p>
                </div>
                <div className="rounded-lg border border-gray-200 bg-white p-3 text-center">
                    <p className="text-lg md:text-xl font-extrabold" style={{ color }}>Community</p>
                    <p className="mt-1 text-[11px] md:text-xs font-medium text-gray-500 uppercase tracking-wide">
                        Livelihood & Outreach Programs
                    </p>
                </div>
            </div>

            {/* Closing note */}
            <p className="mt-6 text-xs md:text-sm text-gray-500 italic text-center">
                End poverty in all its forms everywhere — SDG 1.
            </p>
        </div>
    );
}