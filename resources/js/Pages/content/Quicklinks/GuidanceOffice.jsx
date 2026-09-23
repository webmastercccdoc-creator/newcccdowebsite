import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import MainLayout from "../../../layouts/MainLayout";
import guidanceBannerImg from '../../../assets/banner/ovpacads-banner.png';
import colarteImage from '../../../assets/images/colarte-image.png';
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
        id: "electronic-forms",
        label: "Electronic Forms",
        shortLabel: "E-Forms",
        content: (
            <>
                <p className="mb-6 text-justify leading-relaxed text-gray-700">
                    The Guidance, Counseling, and Assessment Office provides
                    online forms for students to conveniently access our
                    services. Please select the appropriate form below to
                    proceed. All submissions are confidential and will be
                    handled with strict adherence to data privacy regulations.
                </p>

                <div className="flex flex-col gap-3">
                    {[
                        {
                            title: "CCAT Admission Form",
                            link: "https://docs.google.com/forms/d/e/1FAIpQLSdN5frmvaS_-cUYmraeucqoM2gIS7XeJafOyp_xwG7sYHsW4Q/closedform",
                        },
                        {
                            title: "Appointment Request Form",
                            link: "https://docs.google.com/forms/d/e/1FAIpQLSf5jxpis5cLCQzexIF0OOrEduZjdpKmxOGEkg9-bvjLJ2rhBg/viewform",
                        },
                        {
                            title: "Referral Form",
                            link: "https://docs.google.com/forms/d/e/1FAIpQLScQl87WDvcjxtTJf5ssLhptolfjCaaIrIsPBlmHB1FTd0-x_g/viewform",
                        },
                        {
                            title: "Psychosocial and Mental Health Services Intake Form",
                            link: "https://docs.google.com/forms/d/e/1FAIpQLScKBi47fyzMKclLg4Y23469GwYSdnCIJKkOKuYqJd9OKeZcQA/viewform",
                        },
                        {
                            title: "Client Counselor Feedback",
                            link: "https://docs.google.com/forms/d/e/1FAIpQLSeAg8TXIuWJh00KK8DePaH6M94DetGTkRJ1kUNKsTBdzvK0dQ/viewform",
                        },
                        {
                            title: "School Counseling Services Intake Form",
                            link: "https://docs.google.com/forms/d/1VNl6lLunD8jm5Sajx9WA1t4fC9nHxaYokVZFm7SpmGI/viewform?pli=1&pli=1&edit_requested=true",
                        },
                    ].map((form, index) => {
                        const isHighlighted = index === 0;
                        return (
                            <a
                                key={form.title}
                                href={form.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`group flex items-center justify-between rounded-lg border px-5 py-4 transition-all duration-200 ${
                                    isHighlighted
                                        ? "border-[#157d3c] bg-[#f0f7f2] hover:bg-[#e6f2ea]"
                                        : "border-gray-200 bg-gray-50 hover:border-[#157d3c] hover:bg-[#f0f7f2]"
                                }`}
                            >
                                <div className="flex items-center gap-3">
                                    <span
                                        className={`text-base font-bold ${
                                            isHighlighted
                                                ? "text-[#157d3c]"
                                                : "text-[#1a1a1a]"
                                        }`}
                                    >
                                        {index + 1}
                                    </span>
                                    <span
                                        className={`text-base font-bold tracking-tight ${
                                            isHighlighted
                                                ? "text-[#157d3c]"
                                                : "text-[#1a1a1a] group-hover:text-[#157d3c]"
                                        }`}
                                    >
                                        {form.title}
                                    </span>
                                </div>

                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className={`h-4 w-4 shrink-0 transition-transform duration-200 group-hover:translate-x-0.5 ${
                                        isHighlighted
                                            ? "text-[#157d3c]"
                                            : "text-gray-400 group-hover:text-[#157d3c]"
                                    }`}
                                >
                                    <path d="M5 12h14" />
                                    <path d="m12 5 7 7-7 7" />
                                </svg>
                            </a>
                        );
                    })}
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
                    <strong>Faith Q. Colarte</strong>, a highly qualified
                    guidance counselor, serves the City College of Cagayan de
                    Oro. With a Master's degree from Capitol University and
                    currently pursuing a Doctorate from Ateneo de Davao
                    University, she has dedicated over a decade to helping
                    students navigate academic and personal challenges.
                </p>
                <p className="mb-4 text-justify leading-relaxed text-gray-700">
                    Throughout her career, she has championed initiatives
                    focused on student mental health, personal growth, and
                    holistic well-being. She has led numerous programs that
                    empower students to achieve personal growth and academic
                    success — aligning with the institution's commitment to
                    producing globally competitive and socially responsible
                    graduates.
                </p>
                <p className="text-justify leading-relaxed text-gray-700">
                    Her vision for the Guidance Office centers on creating a
                    supportive and inclusive environment where every student
                    has access to the counseling, assessment, and guidance
                    services they need to thrive.
                </p>
            </>
        ),
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
            {/* Section heading */}
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
                {/* Slides */}
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

                    {/* Prev / Next buttons */}
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

                    {/* Counter */}
                    <div className="absolute top-4 right-4 z-20 rounded-full bg-black/50 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
                        {current + 1} / {SLIDES.length}
                    </div>
                </div>

                {/* Text content below the image */}
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

                {/* Dots */}
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
    const [osasNews, setOsasNews] = useState([]);
    const [isLoadingOsasNews, setIsLoadingOsasNews] = useState(true);

    const tabStripRef = useRef(null);

    useEffect(() => {
        document.title =
            "Guidance, Counseling, and Assessment Office - City College of Cagayan de Oro";
    }, []);

    useEffect(() => {
        let isMounted = true;

        fetch("/api/news?department=OSAS")
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to fetch OSAS news");
                }

                return response.json();
            })
            .then((data) => {
                if (isMounted) {
                    setOsasNews(Array.isArray(data) ? data : []);
                }
            })
            .catch(() => {
                if (isMounted) {
                    setOsasNews([]);
                }
            })
            .finally(() => {
                if (isMounted) {
                    setIsLoadingOsasNews(false);
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
        if (isLoadingOsasNews) {
            return (
                <div className="flex items-center justify-center rounded-xl border border-dashed border-gray-300 bg-gray-50 px-6 py-10 text-sm text-gray-600">
                    Loading news...
                </div>
            );
        }

        if (!osasNews.length) {
            return (
                <div className="rounded-xl border border-dashed border-gray-300 bg-gray-50 px-6 py-10 text-center text-sm text-gray-600">
                    No news articles are available at the moment.
                </div>
            );
        }

        return (
            <div className="space-y-6">
                {osasNews.map((article) => {
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
                                                GCAO
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
                        {/* ================= LEFT COLUMN: Image + Contact Us ================= */}
                        <div className="w-full shrink-0 md:w-80 lg:w-96 mx-auto md:mx-0 flex flex-col gap-8">
                            {/* Director Image */}
                            <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
                                {/* Image */}
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

                                {/* Name + Position panel */}
                                <div className="border-t-4 border-[#f5c518] bg-white px-4 py-4 text-center">
                                    <p className="m-0 text-sm sm:text-base md:text-lg font-bold tracking-wide uppercase text-[#157d3c]">
                                        Faith Q. Colarte, RGC
                                    </p>
                                    <p className="mt-1 text-xs sm:text-sm md:text-base font-semibold text-[#1a1a1a] leading-tight">
                                        Guidance Counselor
                                    </p>
                                </div>
                            </div>

                            {/* ===== Contact Us — below the director image ===== */}
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

                        {/* ================= RIGHT COLUMN: Tabs on top, then Content ================= */}
                        <div className="flex-1 w-full">
                            {/* ===== Upper Tab Switcher — at the top of the content area ===== */}
                            <div className="-mx-8 md:-mx-10 lg:-mx-14 -mt-8 md:-mt-10 lg:-mt-14 mb-8 border-b border-gray-200 bg-[#f0f7f2]">
                                <div
                                    role="tablist"
                                    aria-label="Director information tabs"
                                    className="flex w-full items-stretch overflow-x-auto"
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

                            {/* ===== Tab Panel ===== */}
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
                                        {activeDirectorTab === "bionote" ? (
                                            <>
                                                Bio{" "}
                                                <span className="text-[#157d3c]">
                                                    Note
                                                </span>
                                            </>
                                        ) : (
                                            <>
                                                General{" "}
                                                <span className="text-[#157d3c]">
                                                    Functions
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
                    {/* Tab Header Bar */}
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

                    {/* Tab Panel */}
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