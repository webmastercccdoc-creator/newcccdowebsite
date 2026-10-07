import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import MainLayout from "../../../layouts/MainLayout";
import guidanceBannerImg from '../../../assets/banner/guidance-banner.png';
import colarteImage from '../../../assets/images/colarte-image.png';
import faithImage from '../../../assets/images/faith-image.png';
import malalisImage from '../../../assets/images/malalis-image.png';
import harleyImage from '../../../assets/images/harley-image.png';
import sdg1 from '../../../assets/images/sdg1.png';
import sdg2 from '../../../assets/images/sdg2.jpg';
import sdg3 from '../../../assets/images/sdg3.png';
import sdg4 from '../../../assets/images/sdg4.png';
import sdg5 from '../../../assets/images/sdg5.jpg';
import sdg6 from '../../../assets/images/sdg6.png';
import sdg7 from '../../../assets/images/sdg7.png';
import sdg8 from '../../../assets/images/sdg8.png';
import sdg9 from '../../../assets/images/sdg9.png';
import sdg10 from '../../../assets/images/sdg10.png';
import sdg11 from '../../../assets/images/sdg11.png';
import sdg12 from '../../../assets/images/sdg12.jpg';
import sdg13 from '../../../assets/images/sdg13.png';
import sdg14 from '../../../assets/images/sdg14.png';
import sdg15 from '../../../assets/images/sdg15.png';
import sdg16 from '../../../assets/images/sdg16.png';
import sdg17 from '../../../assets/images/sdg17.png';

// ===================== Motion variants =====================
const contentVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.45 },
    },
};

const tabPanelVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
    },
    exit: {
        opacity: 0,
        y: -10,
        transition: { duration: 0.25, ease: [0.22, 1, 0.36, 1] },
    },
};

const subTabPanelVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
    },
    exit: {
        opacity: 0,
        y: -8,
        transition: { duration: 0.2, ease: [0.22, 1, 0.36, 1] },
    },
};

// ===================== Slideshow Data =====================
const SLIDES = [
    {
        id: "office-1",
        image: guidanceBannerImg,
        title: "A Welcoming Space for Every Student",
        description:
            "Our office provides a safe, confidential, and supportive environment where students can freely express their concerns and receive professional guidance.",
    },
    {
        id: "office-2",
        image: guidanceBannerImg,
        title: "Counseling & Consultation Rooms",
        description:
            "Private and comfortable counseling spaces designed to ensure confidentiality and foster meaningful conversations between students and counselors.",
    },
    {
        id: "office-3",
        image: guidanceBannerImg,
        title: "Assessment & Testing Area",
        description:
            "Equipped with standardized tools and materials for comprehensive psychological assessment and evaluation services.",
    },
    {
        id: "office-4",
        image: guidanceBannerImg,
        title: "Programs & Activities",
        description:
            "The office hosts seminars, workshops, and group dynamics activities that promote student wellness, personal growth, and career readiness.",
    },
];

const stripHtml = (html = "") => html.replace(/<[^>]*>/g, "").trim();

const normalizeImagePath = (value) => {
    if (!value) return "";
    if (/^https?:\/\//i.test(value) || value.startsWith("data:")) return value;
    return "/" + String(value).replace(/^\/+/, "");
};

const formatDate = (value) => {
    if (!value) return "Recently";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return value;
    return new Intl.DateTimeFormat("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
    }).format(date);
};

const sdgImages = {
    1: sdg1,
    2: sdg2,
    3: sdg3,
    4: sdg4,
    5: sdg5,
    6: sdg6,
    7: sdg7,
    8: sdg8,
    9: sdg9,
    10: sdg10,
    11: sdg11,
    12: sdg12,
    13: sdg13,
    14: sdg14,
    15: sdg15,
    16: sdg16,
    17: sdg17,
};

// ============ Under Development placeholder ============
const UnderDevelopment = () => (
    <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-[#157d3c] bg-[#f0f7f2] px-6 py-14 text-center">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#157d3c]">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#ffffff"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-8 w-8"
            >
                <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
            </svg>
        </div>

        <h4 className="mb-2 text-lg font-extrabold tracking-tight text-[#1a1a1a]">
            Under Development
        </h4>

        <p className="max-w-md text-sm leading-relaxed text-gray-600">
            This section is currently being prepared. Please check back soon
            for updated content and information.
        </p>

        <div className="mt-4 h-1 w-16 rounded-full bg-[#f5c518]" />
    </div>
);

// ============ Electronic Forms content (reusable) ============
const ElectronicFormsContent = (
    <>
        <p className="mb-4 text-justify leading-relaxed text-gray-700">
            The City College of Cagayan de Oro provides guidance and counseling
            support for students who need assistance with personal, academic,
            social, career, or mental health concerns. Students may access the
            appropriate form below for appointments, counseling, consultations,
            crisis support, or referrals. The Guidance, Counseling, and
            Assessment Office provides online forms for students to
            conveniently access our services. Please select the appropriate
            form below to proceed. All submissions are confidential and will be
            handled with strict adherence to data privacy regulations.
        </p>

        {/* Urgent support notice */}
        <div className="mb-6 rounded-xl border-l-4 border-[#f5c518] bg-[#fff9e6] p-5">
            <h4 className="mb-1.5 flex items-center gap-2 text-sm font-extrabold uppercase tracking-widest text-[#1a1a1a]">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#b8860b"
                    strokeWidth="2.25"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4 shrink-0"
                >
                    <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                    <path d="M12 9v4" />
                    <path d="M12 17h.01" />
                </svg>
                Need urgent support?
            </h4>
            <p className="text-sm leading-relaxed text-gray-700">
                Students experiencing an immediate crisis, serious emotional
                distress, or safety concern are encouraged to proceed directly
                to the Guidance and Counseling Office or seek assistance from
                the appropriate college personnel or emergency services. For
                non-urgent concerns, please use the Appointment Request Form or
                the appropriate intake form.
            </p>
        </div>

        <div className="flex flex-col gap-4">
            {[
                {
                    title: "CCAT Admission Form",
                    link: "https://docs.google.com/forms/d/1PvU3HKTnVRqIdB5CUNHBANHB4k9qnzVokld8o6mof8M/viewform?edit_requested=true",
                    description:
                        "For applicants who need to complete the required CCAT admission or assessment process. Eligible applicants may accomplish this form before proceeding with the scheduled assessment or admission-related guidance activity.",
                    where: "Guidance and Counseling Office / designated CCAT venue.",
                    schedule: "Based on the announced CCAT schedule.",
                    booking: "Complete and submit the online form.",
                    fee: "Free Access",
                },
                {
                    title: "Appointment Request Form",
                    link: "https://docs.google.com/forms/d/e/1FAIpQLSf5jxpis5cLCQzexIF0OOrEduZjdpKmxOGEkg9-bvjLJ2rhBg/viewform",
                    description:
                        "For currently enrolled students who wish to schedule a confidential consultation or counseling session for personal, academic, career, social, or other concerns.",
                    where: "Guidance and Counseling Office.",
                    schedule:
                        "Monday to Friday, 8:00 AM to 5:00 PM; subject to counselor availability.",
                    booking:
                        "Submit the Appointment Request Form and wait for confirmation of your schedule.",
                    fee: "Free Services for CCCDO students",
                },
                {
                    title: "Referral Form",
                    link: "https://docs.google.com/forms/d/e/1FAIpQLScQl87WDvcjxtTJf5ssLhptolfjCaaIrIsPBlmHB1FTd0-x_g/viewform",
                    description:
                        "For faculty members, staff, parents/guardians, or concerned members of the college community who wish to refer a student who may benefit from guidance, counseling, psychosocial support, or other appropriate services. Students may also be referred when concerns affect their well-being, safety, behavior, or academic functioning.",
                    where: "Guidance and Counseling Office / Online.",
                    schedule:
                        "Referrals are reviewed during office hours; urgent concerns are prioritized.",
                    booking:
                        "Submit the Referral Form with sufficient relevant information.",
                    fee: "Free Services for CCCDO students",
                },
                {
                    title: "Psychosocial and Mental Health Services Intake Form",
                    link: "https://docs.google.com/forms/d/e/1FAIpQLScKBi47fyzMKclLg4Y23469GwYSdnCIJKkOKuYqJd9OKeZcQA/viewform",
                    description:
                        "For students seeking psychosocial support or assistance with emotional, behavioral, mental health, adjustment, family, relationship, or crisis-related concerns. The form helps the counselor understand the student's needs before the initial session.",
                    where: "Guidance and Counseling Office or designated confidential counseling area.",
                    schedule:
                        "By appointment; urgent or crisis cases may be prioritized.",
                    booking:
                        "Complete the intake form and await instructions or appointment confirmation.",
                    fee: "Free Services for CCCDO students",
                },
                {
                    title: "Client-Counselor Feedback Form",
                    link: "https://docs.google.com/forms/d/e/1FAIpQLSeAg8TXIuWJh00KK8DePaH6M94DetGTkRJ1kUNKsTBdzvK0dQ/viewform",
                    description:
                        "For students or clients who have completed a counseling, consultation, psychosocial support, or guidance session. This confidential feedback form helps the Guidance and Counseling Office evaluate the quality, accessibility, and effectiveness of its services.",
                    where: null,
                    schedule: null,
                    when: "After receiving a guidance or counseling service.",
                    booking:
                        "Complete the online feedback form. No appointment is required.",
                    fee: "None for submitting feedback.",
                },
                {
                    title: "School Counseling Services Intake Form",
                    link: "https://docs.google.com/forms/d/1VNl6lLunD8jm5Sajx9WA1t4fC9nHxaYokVZFm7SpmGI/viewform?pli=1&pli=1&edit_requested=true",
                    description:
                        "For currently enrolled students accessing school counseling services for academic, personal, social, career, behavioral, or adjustment concerns. The information provided helps the counselor identify the student's needs and plan appropriate support or intervention.",
                    where: "Guidance and Counseling Office.",
                    schedule:
                        "During official counseling hours or by appointment.",
                    booking:
                        "Complete the intake form before or upon your scheduled counseling session.",
                    fee: "Free Services for CCCDO students",
                },
            ].map((form, index) => {
                const isHighlighted = index === 0;
                return (
                    <div
                        key={form.title}
                        className={`overflow-hidden rounded-xl border transition-all duration-200 ${
                            isHighlighted
                                ? "border-[#157d3c] bg-[#f0f7f2]"
                                : "border-gray-200 bg-white hover:border-[#157d3c] hover:shadow-md"
                        }`}
                    >
                        {/* Card header with number + title */}
                        <div className="flex items-center gap-3 border-b border-gray-200 bg-white px-5 py-4">
                            <span
                                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold ${
                                    isHighlighted
                                        ? "bg-[#157d3c] text-white"
                                        : "bg-[#f0f7f2] text-[#157d3c]"
                                }`}
                            >
                                {index + 1}
                            </span>
                            <h4 className="text-base font-bold tracking-tight text-[#1a1a1a]">
                                {form.title}
                            </h4>
                        </div>

                        {/* Description */}
                        <div className="px-5 py-4">
                            <p className="mb-4 text-justify text-sm leading-relaxed text-gray-700">
                                {form.description}
                            </p>

                            {/* Meta details */}
                            <div className="space-y-2 text-xs leading-relaxed text-gray-700">
                                {form.where && (
                                    <div className="flex gap-2">
                                        <span className="w-20 shrink-0 font-bold uppercase tracking-wider text-[#157d3c]">
                                            Where
                                        </span>
                                        <span className="text-gray-700">
                                            {form.where}
                                        </span>
                                    </div>
                                )}
                                {form.when && (
                                    <div className="flex gap-2">
                                        <span className="w-20 shrink-0 font-bold uppercase tracking-wider text-[#157d3c]">
                                            When
                                        </span>
                                        <span className="text-gray-700">
                                            {form.when}
                                        </span>
                                    </div>
                                )}
                                {form.schedule && (
                                    <div className="flex gap-2">
                                        <span className="w-20 shrink-0 font-bold uppercase tracking-wider text-[#157d3c]">
                                            Schedule
                                        </span>
                                        <span className="text-gray-700">
                                            {form.schedule}
                                        </span>
                                    </div>
                                )}
                                {form.booking && (
                                    <div className="flex gap-2">
                                        <span className="w-20 shrink-0 font-bold uppercase tracking-wider text-[#157d3c]">
                                            Booking
                                        </span>
                                        <span className="text-gray-700">
                                            {form.booking}
                                        </span>
                                    </div>
                                )}
                                {form.fee && (
                                    <div className="flex gap-2">
                                        <span className="w-20 shrink-0 font-bold uppercase tracking-wider text-[#157d3c]">
                                            Fee
                                        </span>
                                        <span className="text-gray-700">
                                            {form.fee}
                                        </span>
                                    </div>
                                )}
                            </div>

                            {/* Action button */}
                            <div className="mt-4">
                                <a
                                    href={form.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`group inline-flex items-center gap-2 rounded-full px-5 py-2 text-xs font-bold transition-colors duration-200 ${
                                        isHighlighted
                                            ? "bg-[#157d3c] text-white hover:bg-[#0f5c2c]"
                                            : "bg-[#157d3c] text-white hover:bg-[#0f5c2c]"
                                    }`}
                                >
                                    Open Form
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5"
                                    >
                                        <path d="M5 12h14" />
                                        <path d="m12 5 7 7-7 7" />
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    </>
);

// ===================== About Sub-Tabs Component =====================
function AboutSubTabs() {
    const ABOUT_SUBTABS = [
        { id: "vision", label: "Vision" },
        { id: "mission", label: "Mission" },
        { id: "goals", label: "Goals" },
        { id: "personnel", label: "Personnel" },
        { id: "service-hours", label: "Service Hours" },
    ];

    const [activeSubTab, setActiveSubTab] = useState(ABOUT_SUBTABS[0].id);

    const renderSubTabContent = () => {
        switch (activeSubTab) {
            case "vision":
                return (
                    <>
                        <h3 className="mb-3 text-lg font-extrabold text-[#1a1a1a] tracking-tight">
                            Guidance Vision
                        </h3>
                        <div className="w-12 h-1 bg-[#f5c518] rounded-full mb-5" />
                        <p className="text-justify leading-relaxed text-gray-700">
                            To develop a community of flexible, forward-thinking
                            people who are prepared to lead and innovate in a
                            dynamic global environment while providing college
                            education personalized support to foster well-being,
                            academic distinction, and essential life
                            competencies.
                        </p>
                    </>
                );

            case "mission":
                return (
                    <>
                        <h3 className="mb-3 text-lg font-extrabold text-[#1a1a1a] tracking-tight">
                            Guidance Mission
                        </h3>
                        <div className="w-12 h-1 bg-[#f5c518] rounded-full mb-5" />
                        <p className="text-justify leading-relaxed text-gray-700">
                            We are dedicated to meeting the needs of the youth
                            in Cagayan de Oro and indigenous communities by
                            honoring and integrating culture and heritage to
                            tackle societal issues and promote peace and human
                            rights education for positive transformations. We
                            are committed to guiding our students towards
                            academic achievement, personal growth, and
                            well-being by providing compassionate assistance,
                            tailored guidance, and empowering resources to
                            navigate challenges and make informed choices.
                        </p>
                    </>
                );

            case "goals":
                return (
                    <>
                        <h3 className="mb-3 text-lg font-extrabold text-[#1a1a1a] tracking-tight">
                            Goals
                        </h3>
                        <div className="w-12 h-1 bg-[#f5c518] rounded-full mb-5" />
                        <p className="mb-4 text-justify leading-relaxed text-gray-700">
                            The Guidance, Counseling and Assessment Services of
                            the City College of Cagayan de Oro aims to promote
                            the holistic development, mental health, well-being,
                            resilience, and academic success of students by
                            providing accessible, inclusive, ethical,
                            evidence-based, and responsive guidance, counseling,
                            assessment, psychosocial, and referral services.
                        </p>
                        <p className="text-justify leading-relaxed text-gray-700">
                            In collaboration with academic units, administrative
                            offices, families, community partners, and other
                            relevant stakeholders, the service seeks to create a
                            supportive college environment that empowers
                            students to understand themselves, make informed
                            decisions, cope effectively with personal and
                            academic challenges, develop healthy relationships,
                            and achieve their educational, career, and personal
                            goals.
                        </p>
                    </>
                );

            case "personnel":
                return (
                    <>
                        <h3 className="mb-3 text-lg font-extrabold text-[#1a1a1a] tracking-tight">
                            Personnel
                        </h3>
                        <div className="w-12 h-1 bg-[#f5c518] rounded-full mb-5" />

                        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                            {[
                            {
                                image: faithImage,
                                name: "Faith Quinal-Colarte, RGC",
                                roles: [
                                    "Coordinator, Student Welfare and Services",
                                    "Head of the Guidance, Counseling and Assessment Services",
                                    "Guidance Counselor",
                                ],
                            },
                            {
                                image: malalisImage,
                                name: "Jonathan Ace C. Malalis",
                                roles: ["Guidance Associate"],
                            },
                            {
                                image: harleyImage,
                                name: "Harley Q. Abejo",
                                roles: ["Admission Officer"],
                            },
                        ].map((person) => (
                            <div
                                key={person.name}
                                className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-[#157d3c] hover:shadow-lg"
                            >
                                <div className="relative h-48 w-full bg-[#f0f7f2]">
                                    <img
                                        src={person.image}
                                        alt={person.name}
                                        className="h-full w-full object-cover object-top"
                                    />
                                </div>
                                <div className="border-t-4 border-[#f5c518] px-4 py-4 text-center">
                                    <h4 className="text-sm font-extrabold tracking-tight text-[#1a1a1a] sm:text-base">
                                        {person.name}
                                    </h4>
                                    <ul className="mt-2 space-y-1">
                                        {person.roles.map((role) => (
                                            <li
                                                key={role}
                                                className="text-[11px] font-semibold leading-relaxed text-[#157d3c] sm:text-xs"
                                            >
                                                {role}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        ))}
                        </div>
                    </>
                );

            case "service-hours":
                return (
                    <>
                        <h3 className="mb-3 text-lg font-extrabold text-[#1a1a1a] tracking-tight">
                            Service Hours
                        </h3>
                        <div className="w-12 h-1 bg-[#f5c518] rounded-full mb-5" />
                        <p className="mb-5 text-justify leading-relaxed text-gray-700">
                            The Guidance, Counseling, and Assessment Office is
                            open during the following hours. Walk-in
                            consultations and appointments are both
                            accommodated.
                        </p>

                        <div className="overflow-hidden rounded-xl border border-gray-200">
                            <table className="w-full text-sm">
                                <thead className="bg-[#157d3c] text-white">
                                    <tr>
                                        <th className="px-4 py-3 text-left font-bold">
                                            Day
                                        </th>
                                        <th className="px-4 py-3 text-left font-bold">
                                            Hours
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 bg-white">
                                    <tr className="transition-colors hover:bg-[#f0f7f2]">
                                        <td className="px-4 py-3 font-semibold text-[#1a1a1a]">
                                            Monday to Friday
                                        </td>
                                        <td className="px-4 py-3 text-gray-700">
                                            8:00 AM – 5:00 PM
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div className="mt-5 rounded-xl border border-[#157d3c] bg-[#f0f7f2] p-5">
                            <p className="text-sm leading-relaxed text-gray-700">
                                <strong className="text-[#157d3c]">
                                    Note:
                                </strong>{" "}
                                Please bring a valid student ID for all
                                transactions. For urgent concerns outside
                                office hours, you may reach us via email at{" "}
                                <a
                                    href="mailto:citycollegeguidancecaservices@gmail.com"
                                    className="font-semibold text-[#157d3c] hover:underline break-all"
                                >
                                    citycollegeguidancecaservices@gmail.com
                                </a>
                                .
                            </p>
                        </div>
                    </>
                );

            default:
                return null;
        }
    };

    return (
        <div>
            {/* Sub-tab strip */}
            <div className="mb-6 flex flex-wrap items-center justify-center gap-2 border-b border-gray-200 pb-3">
                {ABOUT_SUBTABS.map((sub) => {
                    const isActive = activeSubTab === sub.id;
                    return (
                        <button
                            key={sub.id}
                            type="button"
                            onClick={() => setActiveSubTab(sub.id)}
                            className={`relative shrink-0 rounded-full px-4 py-2 text-xs font-bold tracking-wide transition-colors duration-200 focus:outline-none ${
                                isActive
                                    ? "bg-[#157d3c] text-white shadow-sm"
                                    : "bg-gray-100 text-gray-600 hover:bg-[#f5c518] hover:text-[#1a1a1a]"
                            }`}
                        >
                            {sub.label}
                        </button>
                    );
                })}
            </div>

            {/* Sub-tab content */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={activeSubTab}
                    variants={subTabPanelVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                >
                    {renderSubTabContent()}
                </motion.div>
            </AnimatePresence>
        </div>
    );
}

// ===================== Lower Tabs Data =====================
const TABS = [
    {
        id: "news",
        label: "News",
        shortLabel: "News",
        content: (
            <>
                <p className="mb-4 text-justify leading-relaxed text-gray-700">
                    Stay updated with the latest <strong>news, announcements, and events</strong> from
                    the Guidance, Counseling, and Assessment Office. This section
                    features important updates on counseling schedules, assessment
                    programs, career guidance activities, and other relevant
                    information for the student body.
                </p>

                <div className="space-y-6">
                    <div className="border-l-4 border-[#157d3c] pl-4 py-1">
                        <h4 className="font-bold text-[#1a1a1a] mb-1">
                            Guidance Office Hours for the New Semester
                        </h4>
                        <p className="text-sm text-gray-600 mb-1">
                            Posted: August 15, 2025
                        </p>
                        <p className="text-justify leading-relaxed text-gray-700 text-sm">
                            The Guidance Office will be open from 8:00 AM to 5:00 PM,
                            Monday through Friday. Walk-in consultations and
                            appointments are both accommodated. Please bring a
                            valid student ID for all transactions.
                        </p>
                    </div>

                    <div className="border-l-4 border-[#f5c518] pl-4 py-1">
                        <h4 className="font-bold text-[#1a1a1a] mb-1">
                            Career Guidance Week 2025
                        </h4>
                        <p className="text-sm text-gray-600 mb-1">
                            Posted: August 10, 2025
                        </p>
                        <p className="text-justify leading-relaxed text-gray-700 text-sm">
                            The Guidance Office is inviting all graduating students
                            to join the upcoming Career Guidance Week on August 25–29,
                            2025, at the University Auditorium. Registration is now
                            open at the Guidance Office.
                        </p>
                    </div>

                    <div className="border-l-4 border-[#157d3c] pl-4 py-1">
                        <h4 className="font-bold text-[#1a1a1a] mb-1">
                            Psychological Assessment Schedule
                        </h4>
                        <p className="text-sm text-gray-600 mb-1">
                            Posted: August 5, 2025
                        </p>
                        <p className="text-justify leading-relaxed text-gray-700 text-sm">
                            Freshmen and transferee students are required to
                            complete their psychological assessment. Schedules are
                            now available at the Guidance Office. For inquiries,
                            please email cccdo.osas@gmail.com.
                        </p>
                    </div>
                </div>
            </>
        ),
    },
    {
        id: "wecare",
        label: "WeCare Mental Health Program",
        shortLabel: "WeCare",
        content: (
            <>
                <p className="mb-6 text-justify leading-relaxed text-gray-700">
                    <strong>WeCare</strong> is the mental health and wellness
                    program of the Guidance, Counseling, and Assessment Office.
                    Through its flagship initiative,{" "}
                    <strong>We Care Wednesday</strong>, the office regularly
                    engages the college community in activities that promote
                    mental health awareness, self-care, and holistic well-being.
                </p>

                {/* ===== 2 Cards Grid ===== */}
                <div className="grid gap-5 sm:grid-cols-2">
                    {/* Card 1 — We Care Wednesday 2025 */}
                    <div className="group flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-[#157d3c] hover:shadow-lg">
                        <div className="relative flex h-36 items-center justify-center bg-[#f0f7f2] px-4 text-center">
                            <span className="absolute right-3 top-3 rounded-full bg-[#157d3c] px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white">
                                2025
                            </span>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="#157d3c"
                                strokeWidth="1.75"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="h-14 w-14"
                            >
                                <rect width="18" height="18" x="3" y="4" rx="2" />
                                <path d="M3 10h18" />
                                <path d="M8 2v4" />
                                <path d="M16 2v4" />
                            </svg>
                        </div>
                        <div className="border-t-4 border-[#f5c518] flex flex-1 flex-col px-5 py-5">
                            <h4 className="text-base font-bold text-[#1a1a1a]">
                                We Care Wednesday
                            </h4>
                            <p className="mt-1 text-xs font-semibold uppercase tracking-widest text-[#157d3c]">
                                2025 Edition
                            </p>
                            <p className="mt-1 text-[11px] font-medium italic text-gray-500">
                                "Mental Health and Suicide Prevention and Wellness Initiative"
                            </p>
                            <p className="mt-2 text-justify text-xs leading-relaxed text-gray-600">
                                A proactive campaign to address the mental health needs of our
                                students — raising awareness, providing tangible support,
                                reducing stigma, and empowering students to seek help. Together,
                                we can create a campus community where mental health is valued,
                                and every student feels supported.
                            </p>

                            <h5 className="mt-4 mb-2 text-[11px] font-extrabold uppercase tracking-widest text-[#157d3c]">
                                Highlights
                            </h5>
                            <ul className="space-y-1.5 text-xs leading-relaxed text-gray-700">
                                <li className="flex gap-2">
                                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#f5c518]" />
                                    <span>
                                        <strong>Pre-Campaign Awareness & Social Media Promotion</strong>
                                        {" – "}
                                        <a
                                            href="https://drive.google.com/file/d/1prXtAAkuVlMFW4sC7boZs_kbm3_b9HFV/view"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="font-semibold text-[#157d3c] hover:underline"
                                        >
                                            Talk.Share.Heal
                                        </a>
                                        {/* Publication materials with exact titles */}
                                        <span className="mt-1 flex flex-wrap gap-x-2 gap-y-1">
                                            <a
                                                href="https://drive.google.com/file/d/1-kcI9duFbUiOegeFcy-vvqco72GTV5dK/view"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="font-semibold text-[#157d3c] hover:underline"
                                            >
                                                Understanding Suicide Risk Factors and Warning Signs
                                            </a>
                                            <a
                                                href="https://drive.google.com/file/d/1lwoN6aYJIqSowPJGjAyvPRpcDyvtHaBl/view"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="font-semibold text-[#157d3c] hover:underline"
                                            >
                                                Coping Strategies for Stress and Building Resilience
                                            </a>
                                            <a
                                                href="https://drive.google.com/file/d/1j91CChO1DSXRSjthZIX061jNt2Y4_KF4/view"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="font-semibold text-[#157d3c] hover:underline"
                                            >
                                                How to Seek Help and Support on Campus and in the Community
                                            </a>
                                        </span>
                                    </span>
                                </li>
                                <li className="flex gap-2">
                                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#f5c518]" />
                                    <span>
                                        <strong>Primer Video</strong> – Suicide Awareness and
                                        Prevention Month Micro-series{" "}
                                        <a
                                            href="https://drive.google.com/file/d/15QDcD5GHAa8AIdbhkH2gCGuCUELqGYip/view"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="font-semibold text-[#157d3c] hover:underline"
                                        >
                                            (Watch here)
                                        </a>
                                    </span>
                                </li>
                                <li className="flex gap-2">
                                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#f5c518]" />
                                    <span>
                                        <strong>Series 1 Primer</strong> – Understanding Suicide
                                        Risk Factors and Warning Signs{" "}
                                        <a
                                            href="https://drive.google.com/file/d/1KU4b1FVZMgkdq-Z_68GWkc9X3iHlqXIv/view"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="font-semibold text-[#157d3c] hover:underline"
                                        >
                                            (Access)
                                        </a>
                                        <p className="mt-1 text-justify text-[11px] leading-relaxed text-gray-600">
                                            Learn about what suicide is, the risk factors, and warning signs that may put someone at risk. By knowing these, we can reach out, show care, and remind each other that help is always within reach.
                                        </p>
                                    </span>
                                </li>
                                <li className="flex gap-2">
                                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#f5c518]" />
                                    <span>
                                        <strong>Series 2 Primer</strong> – Coping Strategies for
                                        Stress and Building Resilience{" "}
                                        <a
                                            href="https://drive.google.com/file/d/1DY0pkkX-1l7Dz6w2KDWh70evID8v4yfz/view"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="font-semibold text-[#157d3c] hover:underline"
                                        >
                                            (Access)
                                        </a>
                                        <p className="mt-1 text-justify text-[11px] leading-relaxed text-gray-600">
                                            These are simple, everyday things you can actually use, like handling exam stress, bouncing back from challenges, or just keeping yourself grounded when life feels heavy.
                                        </p>
                                    </span>
                                </li>
                                <li className="flex gap-2">
                                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#f5c518]" />
                                    <span>
                                        <strong>Series 3 Primer</strong> – How to Seek Help and
                                        Support on Campus and in the Community{" "}
                                        <a
                                            href="https://drive.google.com/file/d/1bVOqy57mdzHw1e30b_e9QpjhqXsBIK8V/view"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="font-semibold text-[#157d3c] hover:underline"
                                        >
                                            (Access)
                                        </a>
                                        <p className="mt-1 text-justify text-[11px] leading-relaxed text-gray-600">
                                            Learn where to turn when things feel too heavy and how reaching out to the right people and resources can truly make a difference.
                                        </p>
                                    </span>
                                </li>
                            </ul>
                        </div>
                    </div>
                    {/* Card 2 — We Care Wednesday 2026 */}
                    <div className="group flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-[#157d3c] hover:shadow-lg">
                        <div className="relative flex h-36 items-center justify-center bg-[#f0f7f2] px-4 text-center">
                            <span className="absolute right-3 top-3 rounded-full bg-[#157d3c] px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white">
                                2026
                            </span>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="#157d3c"
                                strokeWidth="1.75"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="h-14 w-14"
                            >
                                <rect width="18" height="18" x="3" y="4" rx="2" />
                                <path d="M3 10h18" />
                                <path d="M8 2v4" />
                                <path d="M16 2v4" />
                                <path d="m9 16 2 2 4-4" />
                            </svg>
                        </div>
                        <div className="border-t-4 border-[#f5c518] flex flex-1 flex-col px-5 py-5">
                            <h4 className="text-base font-bold text-[#1a1a1a]">
                                We Care Wednesday
                            </h4>
                            <p className="mt-1 text-xs font-semibold uppercase tracking-widest text-[#157d3c]">
                                2026 Edition
                            </p>
                            <p className="mt-1 text-[11px] font-medium italic text-gray-500">
                                "Lived Experiences Heard: Real Voices, Real Change"
                            </p>
                            <p className="mt-2 text-justify text-xs leading-relaxed text-gray-600">
                                A Mental Health Awareness and Wellness Campaign in celebration of
                                World Mental Health Day 2026. The program promotes awareness,
                                emotional well-being, and a caring, inclusive, and help-seeking
                                culture among students through accessible mental health education
                                and student-centered wellness activities conducted every
                                Wednesday of October 2026.
                            </p>

                            <h5 className="mt-4 mb-2 text-[11px] font-extrabold uppercase tracking-widest text-[#157d3c]">
                                Weekly Schedule
                            </h5>
                            <ul className="space-y-2 text-xs leading-relaxed text-gray-700">
                                <li className="flex gap-2">
                                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#f5c518]" />
                                    <span>
                                        <strong>October 7, 2026</strong> – "WE CARE: Your Story,
                                        Your Voice, Your Mental Health Matters"
                                        {/* 2026 Edition resource link added below */}
                                        <span className="mt-0.5 block text-[11px] text-gray-500">
                                            Official launching of the WE CARE Wednesday campaign,
                                            introducing the program objectives, the 2026 World
                                            Mental Health Day theme, basic mental health concepts,
                                            stigma reduction, help-seeking, and available support
                                            services.{" "}
                                            <a
                                                href="https://drive.google.com/file/d/1-SvagXSaW6lbrGLc1CjSx63G4hkvOL5U/view?usp=drive_link"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="font-semibold text-[#157d3c] hover:underline"
                                            >
                                                (Access Resource)
                                            </a>
                                        </span>
                                    </span>
                                </li>
                                <li className="flex gap-2">
                                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#f5c518]" />
                                    <span>
                                        <strong>October 14, 2026</strong> – "Real Voices, Real
                                        Strength: Listening Without Judgment"
                                        <span className="mt-0.5 block text-[11px] text-gray-500">
                                            A short recorded video focusing on compassionate
                                            listening, emotional validation, breaking mental health
                                            stigma, supporting peers, and recognizing when someone
                                            may need additional assistance.
                                        </span>
                                    </span>
                                </li>
                                <li className="flex gap-2">
                                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#f5c518]" />
                                    <span>
                                        <strong>October 21, 2026</strong> – "From Being Heard to
                                        Being Helped: Building a Mentally Healthy College
                                        Community"
                                        <span className="mt-0.5 block text-[11px] text-gray-500">
                                            A brief interactive webinar discussing common student
                                            mental health challenges, healthy coping strategies,
                                            the importance of lived experiences, supportive
                                            communication, help-seeking, and appropriate referral.
                                        </span>
                                    </span>
                                </li>
                                <li className="flex gap-2">
                                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#f5c518]" />
                                    <span>
                                        <strong>October 28, 2026</strong> – "Real Voices, Real
                                        Change: WE CARE, We Listen, We Support"
                                        <span className="mt-0.5 block text-[11px] text-gray-500">
                                            Students, faculty, staff, student leaders, and support
                                            personnel may record brief messages promoting hope,
                                            belonging, empathy, self-care, and help-seeking.
                                            Selected clips will be compiled into the campaign
                                            culmination video.
                                        </span>
                                    </span>
                                </li>
                            </ul>

                            <p className="mt-4 text-[11px] italic text-gray-500">
                                Note: Resource links are yet to be finalized for launching and
                                will be updated soon.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Call to action */}
                <div className="mt-8 rounded-xl border border-[#157d3c] bg-[#f0f7f2] p-6">
                    <h4 className="mb-2 text-base font-bold text-[#1a1a1a]">
                        Need someone to talk to?
                    </h4>
                    <p className="text-sm leading-relaxed text-gray-700">
                        The WeCare Mental Health Program is here for you. Reach out
                        to the Guidance, Counseling, and Assessment Office at{" "}
                        <a
                            href="mailto:citycollegeguidancecaservices@gmail.com"
                            className="font-semibold text-[#157d3c] hover:underline break-all"
                        >
                            citycollegeguidancecaservices@gmail.com
                        </a>{" "}
                        or visit us at the Guidance Office. Your privacy and
                        well-being are our priority.
                    </p>
                </div>
            </>
        ),
    },
];

// ===================== Upper (Director) Tabs Data =====================
const DIRECTOR_TABS = [
    {
        id: "bionote",
        label: "Bionote",
        shortLabel: "Bionote",
        content: (
            <>
                <p className="mb-4 text-justify leading-relaxed text-gray-700">
                    <strong>Faith Quinal-Colarte</strong> is a Registered
                    Guidance Counselor with extensive experience in guidance and
                    counseling, psychological assessment, psychosocial support,
                    career development, and student services. She currently
                    serves at the City College of Cagayan de Oro and is pursuing
                    her Doctorate in Psychology at Ateneo de Davao University.
                    She earned her master&rsquo;s degree from Capitol University
                    and has devoted more than a decade to promoting the academic,
                    personal, social, and career development of learners and
                    young adults.
                </p>

                <p className="mb-4 text-justify leading-relaxed text-gray-700">
                    Her professional and research interests include mental health
                    and wellness, career assessment and development, personality
                    and vocational interests, stress and coping, life
                    satisfaction, student well-being, and holistic development.
                    She has helped develop and implement guidance programs,
                    psychological and career assessments, individual and group
                    counseling interventions, psychosocial support initiatives,
                    and research addressing concerns relevant to educational
                    settings.
                </p>

                <p className="mb-4 text-justify leading-relaxed text-gray-700">
                    Ms. Quinal-Colarte is affiliated with professional
                    organizations such as the Philippine Guidance and Counseling
                    Association, Inc. (PGCA), the Council of Student Affairs and
                    Services Practitioners&ndash;Region X (CSASP-X), and the
                    Philippine Mental Health Association (PMHA), where she has
                    also contributed as a remote psychosocial support volunteer.
                    She is likewise an accredited member of the Psychological
                    Resources Center.
                </p>

                <p className="text-justify leading-relaxed text-gray-700">
                    Committed to continuing professional development, she has
                    pursued advanced training in mental health, counseling
                    methodologies, human rights education, leadership, Eye
                    Movement Desensitization and Reprocessing (EMDR) techniques,
                    and compassion fatigue education and practice. Her
                    professional work is anchored in ethical practice, empathy,
                    evidence-informed intervention, and collaborative engagement.
                    As a practitioner and emerging scholar, she advocates for
                    accessible and responsive mental health and guidance services
                    that foster resilience, informed career decision-making,
                    academic success, and the holistic well-being of students and
                    communities.
                </p>
            </>
        ),
    },
    {
        id: "about",
        label: "About",
        shortLabel: "About",
        content: <AboutSubTabs />,
    },
    {
        id: "general-functions",
        label: "General Functions",
        shortLabel: "General Functions",
        content: (
            <>
                <p className="mb-6 text-justify leading-relaxed text-gray-700">
                    Guidance, Counseling and Assessment Services plays in the
                    overall development and success of our students. In
                    collaboration with other college departments, we lead the
                    development of mental health programs to support students'
                    and other stakeholders' mental health and wellbeing. Its
                    programs aim to assist students in achieving their full
                    potential, enhancing well-being, and improving academic,
                    career, personal, and interpersonal skills through tailored
                    support, resources, and interventions while promoting
                    inclusivity, diversity, and continuous improvement.
                </p>

                <h3 className="mb-3 text-lg font-extrabold text-[#1a1a1a] tracking-tight">
                    Guidance Services Offered
                </h3>
                <div className="w-12 h-1 bg-[#f5c518] rounded-full mb-6" />

                {/* Counseling */}
                <h4 className="mb-3 text-base font-bold text-[#157d3c]">
                    Counseling
                </h4>
                <ul className="mb-6 space-y-3 text-justify leading-relaxed text-gray-700">
                    <li className="flex gap-2">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#f5c518]" />
                        <span>
                            <strong>Individual Counseling</strong> – assist the
                            students through call-in, walk-in, and/or referral
                            type. Counselor can call-in identified students
                            during the initial intake interview and based on
                            results of psychological assessments conducted.
                            Interview of the student is conducted upon admission
                            until graduation to identify potential problems and
                            prevent them from becoming serious.
                        </span>
                    </li>
                    <li className="flex gap-2">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#f5c518]" />
                        <span>
                            <strong>Group Counseling</strong> – a group
                            intervention with the consent of the college dean to
                            meet the students in their classrooms for group
                            interpretation or psychological intervention. This
                            is a venue to provide information on health and
                            wellness and group discussion of identified shared
                            concerns.
                        </span>
                    </li>
                    <li className="flex gap-2">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#f5c518]" />
                        <span>
                            <strong>Career Counseling</strong> – a personalized
                            and multifaceted service focused on helping the
                            students explore their strengths, interests, and
                            values, aligning them with potential career paths.
                            The process involves self-assessment, career
                            exploration, educational and career planning, goal
                            setting, skills development, job search strategies,
                            and continuous guidance to empower students in
                            making informed decisions and successfully
                            navigating their career journeys.
                        </span>
                    </li>
                    <li className="flex gap-2">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#f5c518]" />
                        <span>
                            <strong>Tele-Counseling</strong> – a remote
                            counseling service using communication technologies
                            to enhance accessibility, maintaining
                            confidentiality, and providing a range of counseling
                            support integrating technology through online
                            platforms such as video conferencing, email
                            counseling, and telephonic counseling.
                        </span>
                    </li>
                    <li className="flex gap-2">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#f5c518]" />
                        <span>
                            <strong>Referral System</strong> – This is an
                            essential tool that systematically directs
                            individuals with specific needs beyond the scope of
                            the counseling center to external resources,
                            professional services. Referrals can also be made
                            for academic concerns, personal, financial, and
                            psycho-social concerns. This can include
                            teacher-referral, family member-referral, or
                            peer-referral.
                        </span>
                    </li>
                </ul>

                {/* Prevention and Wellness Services */}
                <h4 className="mb-3 text-base font-bold text-[#157d3c]">
                    Prevention And Wellness Services
                </h4>
                <ul className="mb-6 space-y-3 text-justify leading-relaxed text-gray-700">
                    <li className="flex gap-2">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#f5c518]" />
                        <span>
                            <strong>Seminars/Workshops/Symposia</strong> –
                            programs held for a variety of audiences including
                            staff, teachers, and student organizations which
                            covers leadership, teamwork, defining values,
                            personhood, life coaching, and enhancing
                            interpersonal connections among others.
                        </span>
                    </li>
                    <li className="flex gap-2">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#f5c518]" />
                        <span>
                            <strong>Group Dynamics</strong> – interactive and
                            structured exercises aimed at promoting positive
                            interactions, enhancing communications, and
                            fostering a sense of community. This activity
                            includes ice breakers, team-building exercises,
                            skill-building workshops, mindfulness techniques,
                            thematic discussions, expressive arts, conflict
                            resolution exercises, peer support circles, and
                            goal-setting sessions.
                        </span>
                    </li>
                    <li className="flex gap-2">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#f5c518]" />
                        <span>
                            <strong>Peer Mentor Program</strong> – This involves
                            pairing experienced mentors to provide academic and
                            personal support. This program aims to contribute to
                            students' overall well-being and positive
                            development.
                        </span>
                    </li>
                    <li className="flex gap-2">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#f5c518]" />
                        <span>
                            <strong>System Support</strong> – This covers
                            guidance staff professional development and
                            committee participation where it strongly encourages
                            guidance staff members to attend yearly seminars,
                            trainings, and workshops to further enhance their
                            expertise in the field of guidance and counseling as
                            well as participate in different committees
                            assigned by the administration as needed.
                        </span>
                    </li>
                    <li className="flex gap-2">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#f5c518]" />
                        <span>
                            <strong>Psychological First Aid/MHPSS</strong> –
                            This is a crucial tool for prevention and mental
                            wellness to provide immediate, compassionate support
                            to individuals in distress, including rapid
                            assessments, active listening, and practical
                            assistance. This incorporates psychoeducation,
                            crisis intervention, and referral to specialized
                            services with cultural sensitivity.
                        </span>
                    </li>
                </ul>

                {/* Assessment / Testing */}
                <h4 className="mb-3 text-base font-bold text-[#157d3c]">
                    Assessment/Testing Services
                </h4>
                <p className="mb-6 text-justify leading-relaxed text-gray-700">
                    Assessment/Testing Services within the Guidance Program
                    involve the use of various tools for assessment to gain a
                    comprehensive understanding of an individual's abilities,
                    interests, aptitudes, preferences, and characteristics.
                </p>

                {/* Information Services */}
                <h4 className="mb-3 text-base font-bold text-[#157d3c]">
                    Information Services
                </h4>
                <p className="mb-6 text-justify leading-relaxed text-gray-700">
                    Information services for students under the guidance program
                    involve the proactive gathering and dissemination of
                    relevant information to address their academic, social, and
                    personal needs.
                </p>

                {/* Placement and Follow-Up */}
                <h4 className="mb-3 text-base font-bold text-[#157d3c]">
                    Placement and Follow-Up
                </h4>
                <p className="mb-6 text-justify leading-relaxed text-gray-700">
                    With the use of this service, students can get help getting
                    into specific programs within the college. When a student
                    wants to switch to a different course, they are directed to
                    the Guidance center to speak with their assigned guidance
                    counselor.
                </p>

                {/* Research, Evaluation and Training */}
                <h4 className="mb-3 text-base font-bold text-[#157d3c]">
                    Research, Evaluation and Training
                </h4>
                <p className="mb-6 text-justify leading-relaxed text-gray-700">
                    The guidance services are systematically evaluated by this
                    service, which is to determine whether the program's aims
                    and objectives have been reached.
                </p>

                {/* Appointment Procedures */}
                <h4 className="mb-3 text-base font-bold text-[#157d3c]">
                    Appointment Procedures
                </h4>
                <p className="mb-6 text-justify leading-relaxed text-gray-700">
                    We understand how important it is for the student to access
                    the Guidance Appointment link. State the purpose of the
                    appointment, set the schedule and time according to the
                    student's availability. Please come at your specific time
                    for the appointment.
                </p>

                {/* Counseling Procedure */}
                <h4 className="mb-3 text-base font-bold text-[#157d3c]">
                    Counseling Procedure
                </h4>
                <ol className="mb-6 space-y-3 text-justify leading-relaxed text-gray-700 list-decimal list-inside">
                    <li>
                        Student identifies the need for counseling through
                        call-in, walk-in, or referral.
                    </li>
                    <li>
                        Based on the first intake interview, if necessary,
                        psychological assessment is conducted to gather more
                        information about the student's needs and challenges.
                        Counseling sessions will be scheduled with informed
                        consent from the student to prevent potential problems
                        from escalating and develop strategies for personal
                        growth and well-being.
                    </li>
                    <li>
                        If concerns require expert handling or specialized
                        professional assistance, the Guidance
                        Counselor/Associate may refer the student to
                        appropriate agencies. Continuous monitoring of the
                        student's progress through follow-up sessions to help
                        track the effectiveness of the intervention. Evaluation
                        of the counseling process is done before closing the
                        counseling session to assess effectiveness and make
                        adjustments of the student's concern.
                    </li>
                </ol>

                {/* Admissions */}
                <h4 className="mb-3 text-base font-bold text-[#157d3c]">
                    Admissions
                </h4>
                <p className="mb-4 text-justify leading-relaxed text-gray-700">
                    The City College of Cagayan de Oro's Admission Office,
                    guided by CHED Memorandum Order (CMO) No. 9, series of 2013
                    and CMO No. 8, series of 2021, and the College's mission,
                    vision, goals, and objectives, ensures an inclusive,
                    transparent, and equitable admission process. The office
                    reviews applications, conducts interviews, and assesses
                    standardized test scores while upholding the College's
                    commitment to efficiency, inclusivity, and accessibility.
                </p>
                <p className="mb-4 text-justify leading-relaxed text-gray-700">
                    Pursuant to its mandate, the Admission Office also works
                    hand-in-hand with the Academic cluster in providing and
                    disseminating information and materials about programs,
                    scholarships, and financial aid opportunities that all
                    qualified students can take advantage of to ensure
                    continuity of learning.
                </p>
                <p className="mb-6 text-justify leading-relaxed text-gray-700">
                    Lastly, it conducts information and orientation sessions for
                    prospective students, providing them with a comprehensive
                    understanding of the College's offerings, future careers,
                    and steadfast commitment to providing excellent education.
                </p>

                <h5 className="mb-3 text-sm font-bold uppercase tracking-widest text-[#0f5c2c]">
                    List of Service Offered
                </h5>
                <ul className="space-y-2 text-justify leading-relaxed text-gray-700">
                    <li className="flex gap-2">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#157d3c]" />
                        <span>Online Pre-registration</span>
                    </li>
                    <li className="flex gap-2">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#157d3c]" />
                        <span>Admission Orientation</span>
                    </li>
                    <li className="flex gap-2">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#157d3c]" />
                        <span>
                            Administration of City College Admission Test (CCAT)
                        </span>
                    </li>
                </ul>
            </>
        ),
    },
    {
        id: "electronic-forms",
        label: "Electronic Forms",
        shortLabel: "E-Forms",
        content: ElectronicFormsContent,
    },
];

// ============ Banner text ============
function AnimatedBannerText({ title, description }) {
    return (
        <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
            <motion.h1
                className="text-4xl md:text-6xl font-extrabold text-white drop-shadow-lg tracking-tight"
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
                {title}
            </motion.h1>
            <motion.p
                className="mt-4 text-white/90 text-sm md:text-lg leading-relaxed drop-shadow"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                    duration: 0.7,
                    ease: [0.22, 1, 0.36, 1],
                    delay: 0.15,
                }}
            >
                {description}
            </motion.p>
        </div>
    );
}

// ============ Office Slideshow ============
function OfficeSlideshow() {
    const [current, setCurrent] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    useEffect(() => {
        if (isPaused) return;
        const timer = setInterval(() => {
            setCurrent((prev) => (prev + 1) % SLIDES.length);
        }, 5000);
        return () => clearInterval(timer);
    }, [isPaused]);

    const goTo = (index) => setCurrent(index);
    const goPrev = () =>
        setCurrent((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
    const goNext = () => setCurrent((prev) => (prev + 1) % SLIDES.length);

    const slide = SLIDES[current];

    return (
        <motion.div
            className="mt-14 md:mt-20 bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-xl transition-shadow duration-300 overflow-hidden"
            variants={contentVariants}
            initial="hidden"
            animate="visible"
        >
            <div className="border-b border-gray-200 bg-[#f0f7f2] px-6 sm:px-8 md:px-10 lg:px-14 py-6 text-center">
                <h2 className="m-0 text-2xl md:text-3xl font-extrabold text-[#1a1a1a] tracking-tight">
                    Our{" "}
                    <span className="text-[#157d3c]">Office</span>
                </h2>
                <div className="w-16 h-1 bg-[#f5c518] rounded-full mt-3 mx-auto" />
                <p className="mt-3 text-sm md:text-base text-gray-600 max-w-2xl mx-auto">
                    Take a look inside the Guidance, Counseling, and Assessment Office
                    — a space built for student care, wellness, and growth.
                </p>
            </div>

            <div
                className="relative w-full overflow-hidden"
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
            >
                <div className="relative w-full aspect-[16/9] md:aspect-[21/9] bg-gray-100">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={slide.id}
                            className="absolute inset-0"
                            initial={{ opacity: 0, scale: 1.03 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 1.02 }}
                            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                        >
                            <img
                                src={slide.image}
                                alt={slide.title}
                                className="h-full w-full object-cover"
                                onError={(e) => {
                                    e.currentTarget.style.opacity = "0";
                                }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                        </motion.div>
                    </AnimatePresence>

                    <button
                        type="button"
                        onClick={goPrev}
                        aria-label="Previous slide"
                        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm transition-colors duration-200 hover:bg-[#157d3c] focus:outline-none"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-5 w-5"
                        >
                            <path d="m15 18-6-6 6-6" />
                        </svg>
                    </button>
                    <button
                        type="button"
                        onClick={goNext}
                        aria-label="Next slide"
                        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm transition-colors duration-200 hover:bg-[#157d3c] focus:outline-none"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-5 w-5"
                        >
                            <path d="m9 18 6-6-6-6" />
                        </svg>
                    </button>

                    <div className="absolute top-4 right-4 z-20 rounded-full bg-black/50 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
                        {current + 1} / {SLIDES.length}
                    </div>
                </div>

                <AnimatePresence mode="wait">
                    <motion.div
                        key={slide.id}
                        className="px-6 sm:px-8 md:px-10 lg:px-14 py-8 md:py-10 text-center md:text-left"
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <h3 className="m-0 mb-3 text-xl md:text-2xl font-extrabold text-[#1a1a1a] tracking-tight">
                            {slide.title}
                        </h3>
                        <div className="w-12 h-1 bg-[#f5c518] rounded-full mb-4 mx-auto md:mx-0" />
                        <p className="text-justify md:text-left leading-relaxed text-gray-700 max-w-3xl">
                            {slide.description}
                        </p>
                    </motion.div>
                </AnimatePresence>

                <div className="pb-6 flex items-center justify-center gap-2">
                    {SLIDES.map((s, i) => (
                        <button
                            key={s.id}
                            type="button"
                            onClick={() => goTo(i)}
                            aria-label={`Go to slide ${i + 1}`}
                            className={`h-2.5 rounded-full transition-all duration-300 focus:outline-none ${
                                i === current
                                    ? "w-8 bg-[#157d3c]"
                                    : "w-2.5 bg-gray-300 hover:bg-[#f5c518]"
                            }`}
                        />
                    ))}
                </div>
            </div>
        </motion.div>
    );
}

export default function GuidanceOffice() {
    const [activeTab, setActiveTab] = useState(TABS[0].id);
    const [activeDirectorTab, setActiveDirectorTab] = useState(DIRECTOR_TABS[0].id);
    const [guidanceNews, setGuidanceNews] = useState([]);
    const [isLoadingGuidanceNews, setIsLoadingGuidanceNews] = useState(true);

    const tabStripRef = useRef(null);

    useEffect(() => {
        document.title =
            "Guidance, Counseling, and Assessment Office - City College of Cagayan de Oro";
    }, []);

    useEffect(() => {
        let isMounted = true;

        fetch("/api/news?department=GUIDANCE")
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to fetch Guidance news");
                }

                return response.json();
            })
            .then((data) => {
                if (isMounted) {
                    setGuidanceNews(Array.isArray(data) ? data : []);
                }
            })
            .catch(() => {
                if (isMounted) {
                    setGuidanceNews([]);
                }
            })
            .finally(() => {
                if (isMounted) {
                    setIsLoadingGuidanceNews(false);
                }
            });

        return () => {
            isMounted = false;
        };
    }, []);

    useEffect(() => {
        const el = tabStripRef.current;
        if (!el) return;
        const activeEl = el.querySelector(`#tab-${activeTab}`);
        if (activeEl) {
            activeEl.scrollIntoView({
                behavior: "smooth",
                block: "nearest",
                inline: "center",
            });
        }
    }, [activeTab]);

    const activeTabData = TABS.find((t) => t.id === activeTab);
    const activeDirectorTabData = DIRECTOR_TABS.find((t) => t.id === activeDirectorTab);

    const renderNewsTabContent = () => {
        if (isLoadingGuidanceNews) {
            return (
                <div className="flex items-center justify-center rounded-xl border border-dashed border-gray-300 bg-gray-50 px-6 py-10 text-sm text-gray-600">
                    Loading news...
                </div>
            );
        }

        if (!guidanceNews.length) {
            return (
                <div className="rounded-xl border border-dashed border-gray-300 bg-gray-50 px-6 py-10 text-center text-sm text-gray-600">
                    No news articles are available at the moment.
                </div>
            );
        }

        return (
            <div className="space-y-6">
                {guidanceNews.map((article) => {
                    const excerpt = stripHtml(article.content || "");
                    const imageUrl = normalizeImagePath(article.image_path || article.image || article.image_url);
                    const sdgNumbers = Array.isArray(article.sdg_numbers)
                        ? article.sdg_numbers
                        : typeof article.sdg_numbers === "string" && article.sdg_numbers
                            ? article.sdg_numbers
                                .split(",")
                                .map((value) => Number(value.trim()))
                                .filter((value) => !Number.isNaN(value))
                            : [];

                    return (
                        <article
                            key={article.id}
                            className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-shadow duration-200 hover:shadow-md"
                        >
                            <div className="flex flex-col gap-4 p-4 md:flex-row md:items-center md:p-5">
                                {imageUrl && (
                                    <a href={`/news/${article.id}`} className="block w-full shrink-0 overflow-hidden rounded-xl md:w-52">
                                        <img
                                            src={imageUrl}
                                            alt={article.title || "News article"}
                                            className="h-32 w-full object-cover transition-transform duration-300 hover:scale-[1.02] md:h-28 md:w-52"
                                            onError={(e) => {
                                                e.currentTarget.style.display = "none";
                                            }}
                                        />
                                    </a>
                                )}

                                <div className="flex-1">
                                    <div className="mb-2 flex flex-wrap items-center justify-between gap-2 text-xs text-gray-500">
                                        <div className="flex flex-wrap items-center gap-2">
                                            <span className="rounded-full bg-[#e6f2ea] px-2.5 py-1 font-medium text-[#157d3c]">
                                                GUIDANCE
                                            </span>
                                            <span>{formatDate(article.date)}</span>
                                        </div>

                                        {sdgNumbers.length > 0 && (
                                            <div className="flex flex-wrap items-center gap-2">
                                                {sdgNumbers.slice(0, 2).map((sdgNumber) => (
                                                    <img
                                                        key={`${article.id}-sdg-${sdgNumber}`}
                                                        src={sdgImages[sdgNumber]}
                                                        alt={`Sustainable Development Goal ${sdgNumber}`}
                                                        title={`SDG ${sdgNumber}`}
                                                        className="h-9 w-9 rounded-md border border-gray-200 object-cover shadow-sm"
                                                    />
                                                ))}
                                            </div>
                                        )}
                                    </div>

                                    <h4 className="mb-2 text-lg font-bold text-[#1a1a1a]">
                                        {article.title}
                                    </h4>

                                    <p className="line-clamp-3 text-sm leading-relaxed text-gray-700">
                                        {excerpt.length > 180 ? `${excerpt.slice(0, 180)}...` : excerpt}
                                    </p>

                                    <div className="mt-3">
                                        <a
                                            href={`/news/${article.id}`}
                                            className="inline-flex items-center gap-2 text-sm font-semibold text-[#157d3c] transition-colors hover:text-[#0f5c2c]"
                                        >
                                            Read more
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                className="h-4 w-4"
                                            >
                                                <path d="M5 12h14" />
                                                <path d="m12 5 7 7-7 7" />
                                            </svg>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </article>
                    );
                })}
            </div>
        );
    };

    const tabContent = activeTab === "news" ? renderNewsTabContent() : activeTabData.content;

    return (
        <MainLayout
            maxWidth="full"
            containerClassName="px-0"
            mainClassName="py-0"
            className="overflow-hidden pb-0"
        >
            <style>{`
                .guidance-tab-strip::-webkit-scrollbar {
                    display: none;
                    width: 0;
                    height: 0;
                }
                .guidance-tab-strip {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}</style>

            {/* ==================== BANNER ==================== */}
            <div
                className="relative w-full bg-cover bg-center bg-no-repeat shadow-lg min-h-[350px] md:min-h-[450px] lg:min-h-[550px] flex items-center justify-center"
                style={{
                    backgroundImage: `url('${guidanceBannerImg}')`,
                }}
            >
                <div className="absolute inset-0 bg-black/50"></div>

                <AnimatedBannerText
                    title="Guidance, Counseling, and Assessment Office"
                    description="Supporting students' mental health, personal growth, and career development through comprehensive guidance and assessment services."
                />
            </div>

            {/* ==================== MAIN CONTENT ==================== */}
            <div className="mx-auto w-full max-w-[1600px] px-6 sm:px-10 lg:px-16 xl:px-20 py-14 md:py-20">
                <motion.div
                    className="bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-xl transition-shadow duration-300 overflow-hidden"
                    variants={contentVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <div className="flex flex-col md:flex-row gap-10 lg:gap-14 p-8 md:p-10 lg:p-14 items-start">
                        {/* ================= LEFT COLUMN ================= */}
                        <div className="w-full shrink-0 md:w-80 lg:w-96 mx-auto md:mx-0 flex flex-col gap-8">
                            <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
                                <div className="w-full aspect-[4/5] flex items-center justify-center bg-white p-2">
                                    <img
                                        src={colarteImage}
                                        alt="Faith Q. Colarte"
                                        className="h-full w-full object-contain"
                                        onError={(e) => {
                                            e.currentTarget.style.opacity = "0";
                                        }}
                                    />
                                </div>

                                <div className="border-t-4 border-[#f5c518] bg-white px-4 py-4 text-center">
                                    <p className="m-0 text-sm sm:text-base md:text-lg font-bold tracking-wide uppercase text-[#157d3c]">
                                        Faith Q. Colarte, RGC
                                    </p>
                                    <p className="mt-1 text-xs sm:text-sm md:text-base font-semibold text-[#1a1a1a] leading-tight">
                                        Guidance Counselor
                                    </p>
                                </div>
                            </div>

                            <div className="rounded-xl border border-[#157d3c] bg-[#157d3c] p-6 shadow-sm">
                                <div className="flex flex-col items-left text-left mb-5">
                                    <h3 className="m-0 text-lg font-extrabold text-white tracking-tight">
                                        Contact{" "}
                                        <span className="text-[#f5c518]">
                                            Us
                                        </span>
                                    </h3>
                                    <div className="w-12 h-1 bg-[#f5c518] rounded-full mt-2" />
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
                                            className="w-4 h-4 mt-0.5 shrink-0"
                                        >
                                            <path d="M3 21h18" />
                                            <path d="M5 21V7l7-4 7 4v14" />
                                            <path d="M9 9h.01" />
                                            <path d="M9 12h.01" />
                                            <path d="M9 15h.01" />
                                            <path d="M15 9h.01" />
                                            <path d="M15 12h.01" />
                                            <path d="M15 15h.01" />
                                        </svg>
                                        <span>
                                            <strong>Office:</strong> Guidance,
                                            Counseling, and Assessment Office,
                                            City College of Cagayan de Oro
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
                                            className="w-4 h-4 mt-0.5 shrink-0"
                                        >
                                            <rect
                                                width="20"
                                                height="16"
                                                x="2"
                                                y="4"
                                                rx="2"
                                            />
                                            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                                        </svg>
                                        <span>
                                            <strong>Email:</strong>{" "}
                                            citycollegeguidancecaservices@gmail.com
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
                                            className="w-4 h-4 mt-0.5 shrink-0"
                                        >
                                            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                                        </svg>
                                        <span>
                                            <strong>Phone:</strong> +63 927 777 2946
                                        </span>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* ================= RIGHT COLUMN ================= */}
                        <div className="flex-1 w-full">
                            {/* Upper Tab Switcher */}
                            <div className="-mx-8 md:-mx-10 lg:-mx-14 -mt-8 md:-mt-10 lg:-mt-14 mb-8 border-b border-gray-200 bg-[#f0f7f2]">
                                <div
                                    role="tablist"
                                    aria-label="Director information tabs"
                                    className="guidance-tab-strip flex w-full items-stretch overflow-x-auto"
                                >
                                    {DIRECTOR_TABS.map((tab) => {
                                        const isActive = activeDirectorTab === tab.id;
                                        return (
                                            <button
                                                key={tab.id}
                                                role="tab"
                                                id={`director-tab-${tab.id}`}
                                                aria-selected={isActive}
                                                aria-controls={`director-panel-${tab.id}`}
                                                onClick={() => setActiveDirectorTab(tab.id)}
                                                className={`relative flex-1 shrink-0 px-6 py-5 text-sm font-semibold tracking-wide whitespace-nowrap transition-colors duration-200 focus:outline-none ${
                                                    isActive
                                                        ? "text-white bg-[#157d3c]"
                                                        : "text-gray-600 bg-transparent hover:bg-[#f5c518] hover:text-[#1a1a1a]"
                                                }`}
                                            >
                                                <span className="hidden lg:inline">
                                                    {tab.label}
                                                </span>
                                                <span className="lg:hidden">
                                                    {tab.shortLabel}
                                                </span>

                                                {isActive && (
                                                    <motion.span
                                                        layoutId="activeDirectorTabIndicator"
                                                        className="absolute bottom-0 left-0 right-0 h-1 bg-[#f5c518] rounded-t-full"
                                                        transition={{
                                                            type: "spring",
                                                            stiffness: 380,
                                                            damping: 30,
                                                        }}
                                                    />
                                                )}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Tab Panel */}
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeDirectorTab}
                                    role="tabpanel"
                                    id={`director-panel-${activeDirectorTab}`}
                                    aria-labelledby={`director-tab-${activeDirectorTab}`}
                                    variants={tabPanelVariants}
                                    initial="hidden"
                                    animate="visible"
                                    exit="exit"
                                >
                                    <h2 className="m-0 mb-4 text-2xl md:text-3xl font-extrabold text-[#1a1a1a] tracking-tight text-center">
                                        {activeDirectorTab === "bionote" && (
                                            <>
                                                Bio{" "}
                                                <span className="text-[#157d3c]">
                                                    Note
                                                </span>
                                            </>
                                        )}
                                        {activeDirectorTab === "about" && (
                                            <>
                                                About{" "}
                                                <span className="text-[#157d3c]">
                                                    Us
                                                </span>
                                            </>
                                        )}
                                        {activeDirectorTab === "general-functions" && (
                                            <>
                                                General{" "}
                                                <span className="text-[#157d3c]">
                                                    Functions
                                                </span>
                                            </>
                                        )}
                                        {activeDirectorTab === "electronic-forms" && (
                                            <>
                                                Electronic{" "}
                                                <span className="text-[#157d3c]">
                                                    Forms
                                                </span>
                                            </>
                                        )}
                                    </h2>

                                    <div className="w-16 h-1 bg-[#f5c518] rounded-full mb-6 mx-auto" />

                                    {activeDirectorTabData.content}
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>
                </motion.div>

                {/* ==================== OFFICE SLIDESHOW ==================== */}
                <OfficeSlideshow />

                {/* ==================== LOWER TABS SECTION ==================== */}
                <motion.div
                    className="mt-14 md:mt-20 bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden"
                    variants={contentVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <div className="border-b border-gray-200 bg-[#f0f7f2]">
                        <div
                            ref={tabStripRef}
                            role="tablist"
                            aria-label="Guidance, Counseling, and Assessment Office divisions"
                            className="guidance-tab-strip flex w-full items-stretch overflow-x-auto"
                        >
                            {TABS.map((tab) => {
                                const isActive = activeTab === tab.id;
                                return (
                                    <button
                                        key={tab.id}
                                        role="tab"
                                        id={`tab-${tab.id}`}
                                        aria-selected={isActive}
                                        aria-controls={`panel-${tab.id}`}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`relative flex-1 shrink-0 px-6 py-5 text-sm font-semibold tracking-wide whitespace-nowrap transition-colors duration-200 focus:outline-none ${
                                            isActive
                                                ? "text-white bg-[#157d3c]"
                                                : "text-gray-600 bg-transparent hover:bg-[#f5c518] hover:text-[#1a1a1a]"
                                        }`}
                                    >
                                        <span className="hidden lg:inline">
                                            {tab.label}
                                        </span>
                                        <span className="lg:hidden">
                                            {tab.shortLabel}
                                        </span>

                                        {isActive && (
                                            <motion.span
                                                layoutId="activeTabIndicator"
                                                className="absolute bottom-0 left-0 right-0 h-1 bg-[#f5c518] rounded-t-full"
                                                transition={{
                                                    type: "spring",
                                                    stiffness: 380,
                                                    damping: 30,
                                                }}
                                            />
                                        )}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    <div className="p-8 md:p-10 lg:p-14 min-h-[260px]">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeTab}
                                role="tabpanel"
                                id={`panel-${activeTab}`}
                                aria-labelledby={`tab-${activeTab}`}
                                variants={tabPanelVariants}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                            >
                                <h3 className="m-0 mb-2 text-xl md:text-2xl font-extrabold text-[#1a1a1a] tracking-tight">
                                    {activeTabData.label}
                                </h3>
                                <div className="w-16 h-1 bg-[#f5c518] rounded-full mb-6" />
                                {tabContent}
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </motion.div>
            </div>
        </MainLayout>
    );
}