import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MainLayout from "../../../layouts/MainLayout";
import bannerImg from "../../../assets/banner/health-banner.png";
import sabasalesImage from "../../../assets/images/sabasales-image.png";
import vuelvanImage from "../../../assets/images/Vuelvan-image.png";
import sagunImage from "../../../assets/images/Sagun-image.png";
import alzateImage from "../../../assets/images/Alzate-image.png";
import balbontinImage from "../../../assets/images/Balbontin-image.png";

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

// ===================== Banner slideshow =====================
const SLIDES = [
    {
        id: "hso-1",
        image: bannerImg,
        title: "Your Health, Our Priority",
        description:
            "The Health Services Office provides accessible, compassionate, and confidential healthcare to students and staff of the City College of Cagayan de Oro.",
    },
    {
        id: "hso-2",
        image: bannerImg,
        title: "Medical Consultation & First Aid",
        description:
            "Walk-in consultations, basic first aid, and health assessments are available during office hours to address immediate health needs.",
    },
    {
        id: "hso-3",
        image: bannerImg,
        title: "Wellness & Preventive Programs",
        description:
            "We promote preventive care through health screenings, immunization drives, wellness campaigns, and health education activities.",
    },
    {
        id: "hso-4",
        image: bannerImg,
        title: "Confidential & Inclusive Care",
        description:
            "Every consultation is handled with strict confidentiality and respect for the dignity of every student and employee.",
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

// ===================== About sub-tabs =====================
const ABOUT_SUBTABS = [
    { id: "about-us", label: "About Us" },
    { id: "personnel", label: "Personnel" },
    { id: "service-hours", label: "Service Hours" },
];

function AboutSubTabs() {
    const [activeSubTab, setActiveSubTab] = useState(ABOUT_SUBTABS[0].id);

    useEffect(() => {
        const updateSubTabFromHash = () => {
            const hash = window.location.hash.slice(1);
            const subTabId = hash.startsWith("about-") ? hash.slice(6) : "";
            if (ABOUT_SUBTABS.some((subTab) => subTab.id === subTabId)) {
                setActiveSubTab(subTabId);
            }
        };

        updateSubTabFromHash();
        window.addEventListener("hashchange", updateSubTabFromHash);

        return () => {
            window.removeEventListener("hashchange", updateSubTabFromHash);
        };
    }, []);

    const renderSubTabContent = () => {
        switch (activeSubTab) {
            case "about-us":
                return (
                    <>
                        <h3 className="mb-3 text-lg font-extrabold text-[#1a1a1a] tracking-tight">
                            About the Health Services Office
                        </h3>
                        <div className="w-12 h-1 bg-[#f5c518] rounded-full mb-5" />

                        <p className="mb-4 text-justify leading-relaxed text-gray-700">
                            The <strong>Health Services Office</strong> of the
                            City College of Cagayan de Oro (CCCDO) is dedicated
                            to safeguarding and promoting the physical, mental,
                            and holistic well-being of the entire school
                            community. We believe that optimal health is
                            foundational to academic success and student
                            excellence. Our facility serves as the primary
                            campus hub for immediate medical response, routine
                            outpatient care, and preventative wellness
                            education.
                        </p>

                        <p className="mb-4 text-justify leading-relaxed text-gray-700">
                            Through our strategic institutional partnership
                            with{" "}
                            <strong>Local Government Unit Health
                            Institutions</strong>, we bridge local government
                            medical resources directly to our campus. This
                            collaboration ensures that all CCCDO students,
                            teaching faculty, and non-teaching personnel have
                            structured access to professional medical and
                            dental deployments, health screenings, and primary
                            care benefit programs. Whether managing day-to-day
                            clinic check-ups or leading hands-on emergency
                            preparedness drills, our goal is to foster a safe,
                            healthy, and resilient campus environment.
                        </p>

                        <div className="mt-6 rounded-xl border-l-4 border-[#157d3c] bg-[#f0f7f2] p-5">
                            <h4 className="mb-1.5 flex items-center gap-2 text-sm font-extrabold uppercase tracking-widest text-[#1a1a1a]">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="#157d3c"
                                    strokeWidth="2.25"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="h-4 w-4 shrink-0"
                                >
                                    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                                </svg>
                                Institutional Partnership
                            </h4>
                            <p className="text-sm leading-relaxed text-gray-700">
                                In partnership with{" "}
                                <strong>Local Government Unit Health
                                Institutions</strong>, the Health Services
                                Office connects city medical and dental
                                resources directly to CCCDO — ensuring
                                structured access to professional healthcare
                                for students, faculty, and staff.
                            </p>
                        </div>
                    </>
                );

            case "personnel":
                return (
                    <>
                        <h3 className="mb-3 text-lg font-extrabold text-[#1a1a1a] tracking-tight">
                            Personnel
                        </h3>
                        <div className="w-12 h-1 bg-[#f5c518] rounded-full mb-5" />

                        {/* ===== Internal Personnel ===== */}
                        <h4 className="mb-3 text-sm font-extrabold uppercase tracking-widest text-[#157d3c]">
                            Internal Personnel
                        </h4>
                        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                            {[
                                {
                                    image: sabasalesImage,
                                    name: "Capalaran L. Sabasales, RN",
                                    roles: [
                                        "Head, Health Services",
                                        "In-charge, Students with Special Needs",
                                        "College Nurse",
                                    ],
                                },
                                {
                                    image: vuelvanImage,
                                    name: "Glen E. Vuelvan, RN, MN",
                                    roles: ["College Nurse"],
                                },
                                {
                                    image: sagunImage,
                                    name: "Ma. Jennifer E. Sagun",
                                    roles: ["Clinic Nursing Aide"],
                                },
                            ].map((person) => (
                                <div
                                    key={person.name}
                                    className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-[#157d3c] hover:shadow-lg"
                                >
                                    <div className="relative h-48 w-full bg-[#f0f7f2] flex items-center justify-center p-2">
                                        <img
                                            src={person.image}
                                            alt={person.name}
                                            className="h-full w-full object-contain"
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

                        {/* ===== External Personnel ===== */}
                        <h4 className="mb-3 text-sm font-extrabold uppercase tracking-widest text-[#157d3c]">
                            External Personnel
                        </h4>
                        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                            {[
                                {
                                    image: alzateImage,
                                    name: "Dr. Jemimah Keziah Morales-Alzate",
                                    roles: ["School Physician"],
                                },
                                {
                                    image: balbontinImage,
                                    name: "Dr. Riyadh Balbontin",
                                    roles: ["School Dentist"],
                                },
                            ].map((person) => (
                                <div
                                    key={person.name}
                                    className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-[#157d3c] hover:shadow-lg"
                                >
                                    <div className="relative h-48 w-full bg-[#f0f7f2] flex items-center justify-center p-2">
                                        <img
                                            src={person.image}
                                            alt={person.name}
                                            className="h-full w-full object-contain"
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

                        <div className="mt-6 rounded-xl border border-[#157d3c] bg-[#f0f7f2] p-5">
                            <p className="text-sm leading-relaxed text-gray-700">
                                <strong className="text-[#157d3c]">Note:</strong>{" "}
                                External personnel (School Physician and School
                                Dentist) are deployed through our institutional
                                partnership with Local Government Unit Health
                                Institutions.
                            </p>
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
                            The Health Services Office is open during the
                            following hours. Walk-in consultations and
                            emergency first aid are accommodated.
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
                                Please bring a valid student or employee ID
                                for all transactions. For urgent health
                                concerns outside office hours, please contact
                                campus security or proceed to the nearest
                                hospital emergency room.
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
            <div className="mb-6 flex flex-wrap items-center justify-center gap-2 border-b border-gray-200 pb-3">
                {ABOUT_SUBTABS.map((sub) => {
                    const isActive = activeSubTab === sub.id;
                    return (
                        <button
                            key={sub.id}
                            type="button"
                            onClick={() => {
                                window.location.hash = `about-${sub.id}`;
                            }}
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

// ===================== Under Development placeholder =====================
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

// ===================== Upper (Head) tabs =====================
const DIRECTOR_TABS = [
    {
        id: "bionote",
        label: "Bionote",
        shortLabel: "Bionote",
        content: (
            <>
                <p className="mb-4 text-justify leading-relaxed text-gray-700">
                    <strong>Mrs. Capalaran L. Sabasales, RN</strong>, is the
                    Head of the Health Services Office of the City College of
                    Cagayan de Oro and In-charge of the Students with Special
                    Needs. She brings over 16 years of dedicated nursing
                    practice, notably serving as the ICU and Pediatric ICU
                    Head Nurse in a tertiary training hospital from 2016 to
                    2021.
                </p>

                <p className="mb-4 text-justify leading-relaxed text-gray-700">
                    She holds Basic Occupational Safety and Health (BOSH)
                    training and is certified in Advanced Cardiac Life Support
                    (ACLS), Pediatric Advanced Life Support (PALS), and
                    Intravenous Therapy. Mrs. Sabasales earned her Bachelor of
                    Science in Nursing from Xavier University – Ateneo de
                    Cagayan and is currently pursuing her Master of Arts in
                    Nursing, majoring in Nursing Administration Services at
                    Liceo de Cagayan University.
                </p>

                <p className="text-justify leading-relaxed text-gray-700">
                    Her practice is grounded in patient safety, compassionate
                    care, and evidence-informed clinical practice. As Head of
                    the Health Services Office, she leads the delivery of
                    accessible primary healthcare, emergency response, and
                    wellness programs for students and employees, while
                    ensuring inclusive support for students with special
                    needs.
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
        id: "services",
        label: "Services",
        shortLabel: "Services",
        content: (
            <>
                <p className="mb-6 text-justify leading-relaxed text-gray-700">
                    The Health Services Office delivers a coordinated set of
                    primary care, emergency response, and preventive wellness
                    services to the CCCDO community — supported by our
                    institutional partnership with Local Government Unit
                    Health Institutions.
                </p>

                <h3 className="mb-3 text-lg font-extrabold text-[#1a1a1a] tracking-tight">
                    Our Core Services
                </h3>
                <div className="w-12 h-1 bg-[#f5c518] rounded-full mb-6" />

                <div className="space-y-5">
                    {[
                        {
                            title: "Primary Medical & Dental Care",
                            body: "Annual health clearances, routine clinical check-ups, and dental consultations powered by partnered physicians and dentists.",
                        },
                        {
                            title: "Emergency Preparedness & First Aid Response",
                            body: "Immediate stabilization and life-saving intervention (including Hands-Only CPR) during campus emergencies, managed by trained first responders.",
                        },
                        {
                            title: "Essential Medicine & Pharmacy Allocation",
                            body: "Distribution of basic over-the-counter medications in coordination with city-wide public health programs.",
                        },
                        {
                            title: "Advanced Medical Referral Pathways",
                            body: "Seamless escalation of care to secondary and tertiary public healthcare facilities for students requiring specialized diagnostic services.",
                        },
                        {
                            title: "Holistic Wellness & Preventive Health Advocacy",
                            body: "Conducting targeted seminars, reproductive health workshops, and school-based health campaigns.",
                        },
                    ].map((service, index) => (
                        <div
                            key={service.title}
                            className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all duration-200 hover:border-[#157d3c] hover:shadow-md"
                        >
                            <div className="flex items-center gap-3 border-b border-gray-200 bg-[#f0f7f2] px-5 py-3">
                                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#157d3c] text-sm font-bold text-white">
                                    {index + 1}
                                </span>
                                <h4 className="text-base font-bold tracking-tight text-[#1a1a1a]">
                                    {service.title}
                                </h4>
                            </div>
                            <div className="px-5 py-4">
                                <p className="text-justify text-sm leading-relaxed text-gray-700">
                                    {service.body}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                <h4 className="mt-8 mb-3 text-base font-bold text-[#157d3c]">
                    Services for Students with Special Needs
                </h4>
                <p className="mb-6 text-justify leading-relaxed text-gray-700">
                    Under the direct supervision of the Head of Health
                    Services, the office provides coordinated health support
                    for students with special needs, including assistance in
                    health monitoring, coordination with academic units, and
                    referral to appropriate specialists and partner agencies
                    when necessary.
                </p>

                <h4 className="mb-3 text-base font-bold text-[#157d3c]">
                    Consultation Procedure
                </h4>
                <ol className="mb-6 space-y-3 text-justify leading-relaxed text-gray-700 list-decimal list-inside">
                    <li>
                        Proceed to the Health Services Office and present a
                        valid student or employee ID.
                    </li>
                    <li>
                        Accomplish the health intake form and briefly describe
                        your concern to the duty health personnel.
                    </li>
                    <li>
                        Undergo assessment or consultation. Basic first aid,
                        vital signs monitoring, and medical advice will be
                        provided as appropriate.
                    </li>
                    <li>
                        If needed, receive a referral or follow-up schedule.
                        Emergency cases will be endorsed to the nearest
                        hospital with proper documentation.
                    </li>
                </ol>
            </>
        ),
    },
    {
        id: "electronic-forms",
        label: "Electronic Forms",
        shortLabel: "E-Forms",
        content: (
            <>
                <p className="mb-4 text-justify leading-relaxed text-gray-700">
                    The Health Services Office provides online forms so students
                    and employees can conveniently access clinic services.
                    Please select the appropriate form below. All submissions
                    are confidential and will be handled with strict adherence
                    to data privacy regulations.
                </p>

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
                        Health Emergency?
                    </h4>
                    <p className="text-sm leading-relaxed text-gray-700">
                        For medical emergencies, proceed immediately to the
                        Health Services Office or contact campus security. Do
                        not delay care. Online forms are for non-urgent
                        requests only.
                    </p>
                </div>

                <div className="flex flex-col gap-4">
                    {[
                        {
                            title: "Online Consultation / Client Referral to the School Clinic Form",
                            link: "https://docs.google.com/forms/d/e/1FAIpQLScPCIYHqqgFI4NIXOfYGEi9c2ZKdFewDvDu947qRSOTQYlG7A/viewform",
                            description:
                                "For students and employees who wish to request an online consultation or refer a client to the School Clinic for non-urgent health concerns.",
                            where: "Health Services Office / Online.",
                            schedule:
                                "Monday to Friday, 8:00 AM to 5:00 PM; subject to health personnel availability.",
                            booking:
                                "Submit the form and wait for confirmation or instructions from the clinic.",
                            fee: "Free for CCCDO students and employees",
                        },
                        {
                            title: "Health Services Feedback Form",
                            link: "https://docs.google.com/forms/d/e/1FAIpQLSch_AIoCNrG1Z5axnPkkSuJr4gha34LWN6uTe01H4uUdSF7EQ/viewform",
                            description:
                                "To be accomplished every after semester. Your feedback helps the Health Services Office evaluate and improve the quality, accessibility, and effectiveness of its services.",
                            where: "Online.",
                            schedule: "Every after semester.",
                            booking:
                                "Complete the online feedback form. No appointment is required.",
                            fee: "None for submitting feedback.",
                        },
                        {
                            title: "Student Health Record for New Enrollees/Transferees",
                            link: "https://docs.google.com/forms/d/e/1FAIpQLSdt62eOrFrPdqh9ft6PPJvkG3DbpSH_VF47RuSzDuZaVy04zw/viewform",
                            description:
                                "Required for all new enrollees and transferees to establish their baseline health record with the Health Services Office.",
                            where: "Health Services Office / Online.",
                            schedule:
                                "Upon enrollment or as advised by the Admissions/Health Office.",
                            booking:
                                "Accomplish and submit the form as part of your enrollment requirements.",
                            fee: "Free for CCCDO students",
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

                                <div className="px-5 py-4">
                                    <p className="mb-4 text-justify text-sm leading-relaxed text-gray-700">
                                        {form.description}
                                    </p>

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

                                    <div className="mt-4">
                                        <a
                                            href={form.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="group inline-flex items-center gap-2 rounded-full bg-[#157d3c] px-5 py-2 text-xs font-bold text-white transition-colors duration-200 hover:bg-[#0f5c2c]"
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
        ),
    },
    {
        id: "service-utilization-dashboard",
        label: "Health Services Dashboard",
        shortLabel: "Dashboard",
        content: (
            <>
                <p className="mb-6 text-justify leading-relaxed text-gray-700">
                    The <strong>Health Services Dashboard</strong> provides a
                    clear and accessible overview of how the Health Services
                    Office serves the CCCDO community. This dashboard promotes
                    accountability and openness by presenting key metrics on
                    clinic visits, programs, and student and employee
                    engagement.
                </p>

                {/* ===== Health Services Dashboard Table ===== */}
                <div className="mb-8 w-full min-w-0 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
                    <div className="border-b border-gray-200 bg-[#f0f7f2] px-5 py-4 text-center">
                        <h3 className="text-sm font-extrabold uppercase tracking-widest text-[#157d3c]">
                            Health Services Dashboard
                        </h3>
                    </div>

                    <div className="w-full min-w-0 overflow-x-auto">
                        <table className="w-full min-w-[600px] text-sm">
                            <thead className="bg-[#157d3c] text-white">
                                <tr>
                                    <th className="px-4 py-3 text-left font-bold">
                                        Health Services
                                    </th>
                                    <th className="px-4 py-3 text-center font-bold w-24">
                                        2024
                                    </th>
                                    <th className="px-4 py-3 text-center font-bold w-24">
                                        2025
                                    </th>
                                    <th className="px-4 py-3 text-center font-bold w-24">
                                        2026
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 bg-white">
                                {[
                                    { label: "Medical and Dental Consultations/Clinic Visits", y2024: "237", y2025: "3,306", y2026: "—" },
                                    { label: "Referrals to Other Health Institutions", y2024: "10", y2025: "65", y2026: "—" },
                                    { label: "Request for Medical Certification", y2024: "8", y2025: "19", y2026: "—" },
                                    { label: "Online Consultations", y2024: "0", y2025: "0", y2026: "—" },
                                    { label: "Persons with Disabilities Identification and Management", y2024: "10", y2025: "15", y2026: "—" },
                                    { label: "Lactation Support and Mother-Baby Friendly Spaces", y2024: "0", y2025: "5", y2026: "—" },
                                ].map((service) => (
                                    <tr
                                        key={service.label}
                                        className="transition-colors hover:bg-[#f0f7f2]"
                                    >
                                        <td className="px-4 py-3 font-semibold text-[#1a1a1a]">
                                            {service.label}
                                        </td>
                                        <td className="px-4 py-3 text-center text-gray-700">
                                            {service.y2024}
                                        </td>
                                        <td className="px-4 py-3 text-center text-gray-700">
                                            {service.y2025}
                                        </td>
                                        <td className="px-4 py-3 text-center text-gray-400">
                                            {service.y2026}
                                        </td>
                                    </tr>
                                ))}
                                {/* Total row */}
                                <tr className="bg-[#f0f7f2] font-extrabold">
                                    <td className="px-4 py-3 text-[#157d3c]">
                                        Total Services Availed
                                    </td>
                                    <td className="px-4 py-3 text-center text-[#157d3c]">
                                        265
                                    </td>
                                    <td className="px-4 py-3 text-center text-[#157d3c]">
                                        3,410
                                    </td>
                                    <td className="px-4 py-3 text-center text-[#157d3c]">
                                        —
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                {/* ===== Data Privacy & Confidentiality Statement ===== */}
                <div className="mt-6 rounded-xl border border-[#157d3c] bg-[#f0f7f2] p-5">
                    <h4 className="mb-2 flex items-center gap-2 text-sm font-extrabold uppercase tracking-widest text-[#1a1a1a]">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="#157d3c"
                            strokeWidth="2.25"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-4 w-4 shrink-0"
                        >
                            <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                        </svg>
                        Data Privacy and Confidentiality Statement
                    </h4>
                    <p className="text-sm leading-relaxed text-gray-700">
                        In compliance with data protection principles, all individual
                        case disclosures and personal identifiers remain strictly
                        confidential. Only broad, summarized statistics are shared or
                        published.
                    </p>
                </div>
            </>
        ),
    },
];

// ===================== Lower tabs =====================
const TABS = [
    {
        id: "news",
        label: "News",
        shortLabel: "News",
        content: (
            <p className="mb-4 text-justify leading-relaxed text-gray-700">
                Stay updated with the latest <strong>news, announcements, and health advisories</strong>{" "}
                from the Health Services Office. This section features
                important updates on clinic schedules, wellness programs,
                immunization drives, and health reminders for the college
                community.
            </p>
        ),
    },
    {
        id: "wellness",
        label: "Wellness Program",
        shortLabel: "Wellness",
        content: <UnderDevelopment />,
    },
];

// ===================== Banner text =====================
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

// ===================== Slideshow =====================
function HealthSlideshow() {
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
                    <span className="text-[#157d3c]">Clinic</span>
                </h2>
                <div className="w-16 h-1 bg-[#f5c518] rounded-full mt-3 mx-auto" />
                <p className="mt-3 text-sm md:text-base text-gray-600 max-w-2xl mx-auto">
                    Take a look inside the Health Services Office — a safe,
                    welcoming space for your health and well-being.
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

// ===================== Page =====================
export default function HealthServiceOffice() {
    const [activeTab, setActiveTab] = useState(TABS[0].id);
    const [activeDirectorTab, setActiveDirectorTab] = useState(DIRECTOR_TABS[0].id);
    const [healthNews, setHealthNews] = useState([]);
    const [isLoadingHealthNews, setIsLoadingHealthNews] = useState(true);
    const [healthNewsError, setHealthNewsError] = useState(false);

    const tabStripRef = useRef(null);

    useEffect(() => {
        document.title =
            "Health Services Office - City College of Cagayan de Oro";
    }, []);

    useEffect(() => {
        let isMounted = true;

        fetch("/api/news?department=HEALTH")
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to fetch Health Services news");
                }

                return response.json();
            })
            .then((data) => {
                if (isMounted) {
                    setHealthNews(Array.isArray(data) ? data : []);
                }
            })
            .catch((error) => {
                console.error("Failed to fetch Health Services news:", error);
                if (isMounted) {
                    setHealthNewsError(true);
                }
            })
            .finally(() => {
                if (isMounted) {
                    setIsLoadingHealthNews(false);
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

    useEffect(() => {
        let scrollTimeout;

        const goToHash = () => {
            const hash = window.location.hash.slice(1);
            const directorTab = DIRECTOR_TABS.find((tab) => tab.id === hash);
            const lowerTab = TABS.find((tab) => tab.id === hash);
            const aboutSubTabId = hash.startsWith("about-") ? hash.slice(6) : "";
            const isAboutSubTab = ABOUT_SUBTABS.some(
                (subTab) => subTab.id === aboutSubTabId
            );
            let panelId;

            if (directorTab) {
                setActiveDirectorTab(directorTab.id);
                panelId = `director-panel-${directorTab.id}`;
            } else if (lowerTab) {
                setActiveTab(lowerTab.id);
                panelId = `panel-${lowerTab.id}`;
            } else if (isAboutSubTab) {
                setActiveDirectorTab("about");
                panelId = "director-panel-about";
            } else {
                return;
            }

            window.clearTimeout(scrollTimeout);
            scrollTimeout = window.setTimeout(() => {
                document.getElementById(panelId)?.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                });
            }, 400);
        };

        goToHash();
        window.addEventListener("hashchange", goToHash);

        return () => {
            window.clearTimeout(scrollTimeout);
            window.removeEventListener("hashchange", goToHash);
        };
    }, []);

    const activeTabData = TABS.find((t) => t.id === activeTab) ?? TABS[0];
    const activeDirectorTabData =
        DIRECTOR_TABS.find((t) => t.id === activeDirectorTab) ?? DIRECTOR_TABS[0];

    const renderNewsTabContent = () => {
        if (isLoadingHealthNews) {
            return (
                <div className="flex items-center justify-center rounded-xl border border-dashed border-gray-300 bg-gray-50 px-6 py-10 text-sm text-gray-600">
                    Loading news...
                </div>
            );
        }

        if (healthNewsError) {
            return (
                <div className="rounded-xl border border-red-200 bg-red-50 px-6 py-10 text-center text-sm text-red-700">
                    Health Services news could not be loaded. Please try again later.
                </div>
            );
        }

        if (!healthNews.length) {
            return (
                <div className="rounded-xl border border-dashed border-gray-300 bg-gray-50 px-6 py-10 text-center text-sm text-gray-600">
                    No Health Services news articles are available at the moment.
                </div>
            );
        }

        return (
            <div className="space-y-6">
                {healthNews.map((article) => {
                    const excerpt = stripHtml(article.content || "");
                    const imageUrl = normalizeImagePath(
                        article.image_path || article.image || article.image_url
                    );

                    return (
                        <article
                            key={article.id}
                            className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-shadow duration-200 hover:shadow-md"
                        >
                            <div className="flex flex-col gap-4 p-4 md:flex-row md:items-center md:p-5">
                                {imageUrl && (
                                    <a
                                        href={`/news/${article.id}`}
                                        className="block w-full shrink-0 overflow-hidden rounded-xl md:w-52"
                                    >
                                        <img
                                            src={imageUrl}
                                            alt={article.title || "Health Services news article"}
                                            className="h-32 w-full object-cover transition-transform duration-300 hover:scale-[1.02] md:h-28 md:w-52"
                                            onError={(event) => {
                                                event.currentTarget.style.display = "none";
                                            }}
                                        />
                                    </a>
                                )}

                                <div className="flex-1">
                                    <div className="mb-2 flex flex-wrap items-center gap-2 text-xs text-gray-500">
                                        <span className="rounded-full bg-[#e6f2ea] px-2.5 py-1 font-medium text-[#157d3c]">
                                            HEALTH SERVICES
                                        </span>
                                        <span>{formatDate(article.date)}</span>
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

    const tabContent =
        activeTab === "news" ? (
            <>
                {activeTabData.content}
                {renderNewsTabContent()}
            </>
        ) : (
            activeTabData.content
        );

    return (
        <MainLayout
            maxWidth="full"
            containerClassName="px-0"
            mainClassName="py-0"
            className="overflow-hidden pb-0"
        >
            <style>{`
                .health-tab-strip::-webkit-scrollbar {
                    display: none;
                    width: 0;
                    height: 0;
                }
                .health-tab-strip {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}</style>

            {/* ==================== BANNER ==================== */}
            <div
                className="relative w-full bg-cover bg-center bg-no-repeat shadow-lg min-h-[350px] md:min-h-[450px] lg:min-h-[550px] flex items-center justify-center"
                style={{
                    backgroundImage: `url('${bannerImg}')`,
                }}
            >
                <div className="absolute inset-0 bg-black/50"></div>

                <AnimatedBannerText
                    title="Health Services Office"
                    description="Primary healthcare, medical consultations, and wellness programs for students and staff of the City College of Cagayan de Oro."
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
                                {/* FIXED MAIN HEAD IMAGE */}
                                <div className="w-full aspect-[4/5] flex items-center justify-center bg-[#f0f7f2] p-2">
                                    <img
                                        src={sabasalesImage}
                                        alt="Capalaran L. Sabasales"
                                        className="h-full w-full object-contain"
                                    />
                                </div>

                                <div className="border-t-4 border-[#f5c518] bg-white px-4 py-4 text-center">
                                    <p className="m-0 text-sm sm:text-base md:text-lg font-bold tracking-wide uppercase text-[#157d3c]">
                                        Capalaran L. Sabasales, RN
                                    </p>
                                    <p className="mt-1 text-xs sm:text-sm md:text-base font-semibold text-[#1a1a1a] leading-tight">
                                        Head, Health Services
                                    </p>
                                    <p className="mt-0.5 text-[11px] sm:text-xs font-medium text-gray-600 leading-tight">
                                        In-charge, Students with Special Needs
                                    </p>
                                    <p className="mt-0.5 text-[11px] sm:text-xs font-medium text-gray-600 leading-tight">
                                        College Nurse
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
                                            <strong>Office:</strong>  Ground floor, Executive Building, City College of Cagayan de Oro, Zone 2, Agusan, Cagayan de Oro City
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
                                            clinic.cdocitycollege@gmail.com
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
                                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                                </svg>
                                <span>
                                    <strong>Facebook:</strong>{" "}
                                    <a
                                        href="https://www.facebook.com/OSAScccdo"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="break-all underline decoration-[#f5c518] underline-offset-2 transition-colors hover:text-[#f5c518]"
                                    >
                                        https://www.facebook.com/OSAScccdo
                                    </a>
                                </span>
                            </li>
                                </ul>
                            </div>
                        </div>

                        {/* ================= RIGHT COLUMN ================= */}
                        <div className="min-w-0 w-full flex-1">
                            {/* Upper Tab Switcher */}
                            <div className="-mx-8 md:-mx-10 lg:-mx-14 -mt-8 md:-mt-10 lg:-mt-14 mb-8 border-b border-gray-200 bg-[#f0f7f2]">
                                <div
                                    role="tablist"
                                    aria-label="Health Services Office information tabs"
                                    className="health-tab-strip flex w-full items-stretch overflow-x-auto"
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
                                                onClick={() => {
                                                    window.location.hash = tab.id;
                                                }}
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
                                        {activeDirectorTab === "services" && (
                                            <>
                                                Our{" "}
                                                <span className="text-[#157d3c]">
                                                    Services
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
                                        {activeDirectorTab === "service-utilization-dashboard" && (
                                            <>
                                                Health Services{" "}
                                                <span className="text-[#157d3c]">
                                                    Dashboard
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

                {/* ==================== SLIDESHOW ==================== */}
                <HealthSlideshow />

                {/* ==================== LOWER TABS ==================== */}
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
                            aria-label="Health Services Office divisions"
                            className="health-tab-strip flex w-full items-stretch overflow-x-auto"
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
                                        onClick={() => {
                                            window.location.hash = tab.id;
                                        }}
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