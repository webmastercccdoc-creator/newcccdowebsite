import { useEffect, useState, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MainLayout from '../../../layouts/MainLayout';

// --- Banner / imagery ---
import acadHero from '../../../assets/banner/ovpacads-banner.png';
import casBanner from '../../../assets/banner/cas-banner.png';
import cbmBanner from '../../../assets/banner/cbm-banner.png';
import coeBanner from '../../../assets/banner/coe-banner.png';
import tstiBanner from '../../../assets/banner/tsti-banner.png';
import acad_bg from '../../../assets/images/prog_bg.png';

// --- Program head / dean photos ---
import drDonnaCotejoPhoto from '../../../assets/images/DR_DONNA_COTEJO.png';
import deanOrbetaPhoto from '../../../assets/images/Dr_Rowena_Orbeta.jpg';
import deanChuaPhoto from '../../../assets/images/Dr_Liza_Chua.png';
import karlPiosPhoto from '../../../assets/images/TSTI Trainers/karl-image.png';
import carpentryNc2Image from '../../../assets/TSTI/qualification images/carpnc2-image.jpg';
import eimNc2Image from '../../../assets/TSTI/qualification images/eimnc2-image.jpg';
import housekeepingNc2Image from '../../../assets/TSTI/qualification images/hsknc2-image.jpg';
import smawNc1Image from '../../../assets/TSTI/qualification images/smawnc1-image.jpg';
import smawNc2Image from '../../../assets/TSTI/qualification images/smawnc2-image.jpg';
import barangayHealthNc2Image from '../../../assets/TSTI/qualification images/bhsnc2-image.jpg';
import plumbingNc2Image from '../../../assets/TSTI/qualification images/plmbngnc2-image.jpg';

// --- Background tokens (matches the program pages) ---
const PANEL = '#F3EFE4';
const HAIRLINE = '#D8D2C4';

// --- Premium sub-components (shared style with program pages) ---
const MaskedText = ({ text, className = '' }) => (
    <span className={`relative inline-block overflow-hidden ${className}`}>
        <motion.span
            initial={{ y: '110%' }}
            whileInView={{ y: '0%' }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.9, ease: [0.33, 1, 0.68, 1] }}
            className="inline-block"
        >
            {text}
        </motion.span>
    </span>
);

const Kicker = ({ children, textClass = 'text-emerald-600', ruleClass = 'bg-emerald-600', align = 'left' }) => (
    <div className={`flex items-center gap-3 mb-3 ${align === 'center' ? 'justify-center' : ''}`}>
        <span className={`w-8 h-px ${ruleClass}`} />
        <span className={`text-[13px] italic font-serif ${textClass}`}>{children}</span>
        {align === 'center' && <span className={`w-8 h-px ${ruleClass}`} />}
    </div>
);

// --- Program data ----------------------------------------------------------
const PROGRAMS = [
    {
        id: 'cas',
        code: 'CAS',
        name: 'College of Arts and Sciences',
        banner: casBanner,
        route: '/programs/college-of-arts-and-sciences',
        accent: 'emerald',
        accentHex: '#047857',
        leader: {
            name: 'Dr. Donna Grace I. Cotejo',
            role: 'Dean, College of Arts and Sciences',
            photo: drDonnaCotejoPhoto,
        },
        offerings: [
            {
                name: 'Bachelor of Arts in Communication',
                description: "An outcomes-based undergraduate program that develops students' knowledge and skills in communication theory and practice across media, culture, organization, and community contexts.",
            },
            {
                name: 'Bachelor of Science in Social Work',
                description: 'A professional undergraduate program that prepares students to promote well-being, justice, and community development through ethical, people-centered social work practice.',
            },
        ],
        departments: ['BACOMM', 'BSSW', 'GEN ED', 'P.E.', 'NSTP'],
        focus: ['Communication Theory', 'Media Production', 'Community Development', 'Social Welfare'],
        stats: { programs: 2, departments: 5, faculty: 35 },
    },
    {
        id: 'cbm',
        code: 'CBM',
        name: 'College of Business and Management',
        banner: cbmBanner,
        route: '/programs/college-of-business-and-management',
        accent: 'amber',
        accentHex: '#B45309',
        leader: {
            name: 'Dr. Rowena R. Orbeta',
            role: 'Dean, College of Business Management',
            photo: deanOrbetaPhoto,
        },
        offerings: [
            {
                name: 'Bachelor of Science in Entrepreneurship',
                description: 'Designed to develop innovative, opportunity-driven individuals capable of creating, managing, and growing sustainable business ventures. Emphasizes entrepreneurial mindset development, business planning, marketing, financial management, innovation, and strategic decision-making.',
            },
            {
                name: 'Bachelor of Science in Office Administration',
                description: 'A four-year degree program that develops highly competent administrative professionals equipped with strong organizational, communication, and managerial skills. Focuses on office management, records management, business correspondence, information technology, customer relations, and workplace ethics.',
            },
        ],
        departments: ['BSE', 'BSOA'],
        focus: ['Business Planning', 'Financial Management', 'Office Management', 'Innovation'],
        stats: { programs: 2, departments: 2, faculty: 6 },
    },
    {
        id: 'coe',
        code: 'COE',
        name: 'College of Education',
        banner: coeBanner,
        route: '/programs/college-of-education',
        accent: 'blue',
        accentHex: '#1D4ED8',
        leader: {
            name: 'Dr. Liza L. Chua',
            role: 'Dean, College of Education',
            photo: deanChuaPhoto,
        },
        offerings: [
            {
                name: 'Bachelor of Technical-Vocational Teacher Education',
                description: 'Prepares future teachers and trainers for vocational and technical education through a balanced foundation in teaching theory, technology, and practical industry experience. Graduates are equipped to teach TLE in Grades 9-10, the TVL track in senior high school, TVET, and related higher education programs.',
            },
            {
                name: 'Bachelor of Technology and Livelihood Education',
                description: 'Develops competent teachers for Technology and Livelihood Education through integrated theoretical and practical training. The program prepares graduates to teach TLE in Grades 4-8 and support learners in building useful technology, livelihood, and entrepreneurial skills.',
            },
        ],
        departments: ['BTVTED', 'BTLED', 'Professional Education', 'General Education', 'PATHFIT'],
        focus: ['TLE & TVL Instruction', 'TVET', 'Practical Training', 'Pedagogy'],
        stats: { programs: 2, departments: 5, faculty: 30 },
    },
    {
        id: 'tsti',
        code: 'TSTI',
        name: 'Technical Skills & Technology Institute',
        banner: tstiBanner,
        route: '/programs/technical-skill-technology',
        accent: 'emerald',
        accentHex: '#047857',
        leader: {
            name: 'Karl Hein M. Pios, LPT',
            role: 'Vocational School Administrator',
            photo: karlPiosPhoto,
        },
        offerings: [
            {
                name: 'Electrical Installation & Maintenance (EIM) NC II',
                sector: 'Electrical and Electronics',
                image: eimNc2Image,
                description: 'The Electrical Installation and Maintenance NC II Qualification consists of competencies that a person must achieve to install and maintain electrical wiring, lighting, and related equipment and systems where the voltage does not exceed 600 volts in residential houses and buildings.',
                legalBasis: 'Technical Education and Skills Development Act of 1994 (Republic Act No. 7796). Section 22, “Establishment and Administration of the National Trade Skills Standards,” mandates TESDA to establish national occupational skill standards and develop and implement a certification and accreditation program for trade testing.',
                qualificationScope: 'This qualification is packaged from the competency map of the Electrical and Electronics sector (Annex A).',
                competencyGroups: [
                    {
                        title: 'Basic Competencies',
                        units: [
                            ['500311105', 'Participate in workplace communication'],
                            ['500311106', 'Work in a team environment'],
                            ['500311107', 'Practice career professionalism'],
                            ['500311108', 'Practice occupational health and safety procedures'],
                        ],
                    },
                    {
                        title: 'Common Competencies',
                        units: [
                            ['ELC311205', 'Use hand tools'],
                            ['ELC311201', 'Perform mensuration and calculation'],
                            ['ELC311202', 'Prepare and interpret technical drawing'],
                            ['ELC311204', 'Apply quality standards'],
                            ['ELC311206', 'Terminate and connect electrical wiring and electronic circuits'],
                        ],
                    },
                    {
                        title: 'Core Competencies',
                        units: [
                            ['ELC741301', 'Perform roughing-in activities, wiring and cabling works for single-phase distribution, power, lighting and auxiliary systems'],
                            ['ELC741302', 'Install electrical protective devices for distribution, power, lighting, auxiliary, lightning protection and grounding systems'],
                            ['ELC741303', 'Install wiring devices of floor and wall mounted outlets, lighting fixtures/switches, and auxiliary outlets'],
                        ],
                    },
                ],
                employmentOutcomes: [
                    'Building-Wiring Electrician',
                    'Residential/Commercial-Wiring Electrician',
                    'Maintenance Electrician',
                ],
            },
            {
                name: 'Shielded Metal Arc Welding (SMAW) NC I',
                sector: 'Manufacturing, Metals and Engineering',
                image: smawNc1Image,
                description: 'The Welding NC I (SMAW) Qualification consists of competencies that a person must achieve to weld carbon steel plate components as specified by layout, blueprints, diagrams, work orders, welding procedures, or oral instructions using SMAW welding equipment.',
                legalBasis: 'Technical Education and Skills Development Act of 1994 (Republic Act No. 7796). Section 22, “Establishment and Administration of the National Trade Skills Standards,” mandates TESDA to establish national occupational skill standards and develop and implement a certification and accreditation program for trade testing.',
                qualificationScope: 'This qualification conforms with AWS D1.1 Structural Welding Code; ASME IX Boiler and Pressure Vessel Code; API 1104 Code for Gas and Oil Pipeline Facilities; and ISO 9606-1 Qualification of Welders for Steel.',
                competencyGroups: [
                    {
                        title: 'Basic Competencies',
                        units: [
                            ['500311101', 'Apply safety practices'],
                            ['500311102', 'Interpret drawings and sketches'],
                            ['500311103', 'Perform industry calculations'],
                            ['500311104', 'Contribute to quality system'],
                        ],
                    },
                    {
                        title: 'Common Competencies',
                        units: [
                            ['MEE721201', 'Apply safety practices'],
                            ['MEE721202', 'Interpret drawings and sketches'],
                            ['MEE721203', 'Perform industry calculations'],
                            ['MEE721204', 'Contribute to quality system'],
                            ['MEE721205', 'Use hand tools'],
                            ['MEE721206', 'Prepare weld materials'],
                            ['MEE721207', 'Set up welding equipment'],
                            ['MEE721208', 'Fit up weld materials'],
                            ['MEE721209', 'Repair welds'],
                        ],
                    },
                    {
                        title: 'Core Competencies',
                        units: [
                            ['MEE721301', 'Weld carbon steel plates using SMAW'],
                        ],
                    },
                ],
                employmentOutcomes: ['Plate Welder (SMAW)'],
            },
            {
                name: 'Shielded Metal Arc Welding (SMAW) NC II',
                sector: 'Manufacturing, Metals and Engineering',
                image: smawNc2Image,
                description: 'The Shielded Metal Arc Welding (SMAW) NC II Qualification consists of competencies that a person must achieve to weld carbon steel plate and pipe components as specified by layout, blueprints, diagrams, work orders, welding procedures, or oral instructions using shielded metal arc welding equipment.',
                legalBasis: 'Technical Education and Skills Development Act of 1994 (Republic Act No. 7796). Section 22, “Establishment and Administration of the National Trade Skills Standards,” mandates TESDA to establish national occupational skill standards and develop and implement a certification and accreditation program for trade testing.',
                qualificationScope: 'This qualification conforms with American Welding Society (AWS) D1.1 Structural Welding Code; American Society of Mechanical Engineers (ASME) IX Boiler and Pressure Vessel Code; American Petroleum Institute (API) 1104 Code for Gas and Oil Pipeline Facilities; and International Standards Organization (ISO) 9606-1 Qualification of Welders for Steel.',
                competencyGroups: [
                    {
                        title: 'Basic Competencies',
                        units: [
                            ['500311105', 'Participate in workplace communication'],
                            ['500311106', 'Work in a team environment'],
                            ['500311107', 'Practice career professionalism'],
                            ['500311108', 'Practice occupational health and safety procedures'],
                        ],
                    },
                    {
                        title: 'Common Competencies',
                        units: [
                            ['MEE722201', 'Apply safety practices'],
                            ['MEE721202', 'Interpret drawings and sketches'],
                            ['MEE721203', 'Perform industry calculations'],
                            ['MEE721204', 'Contribute to quality system'],
                            ['MEE721205', 'Use hand tools'],
                            ['MEE721206', 'Prepare weld materials'],
                            ['MEE721207', 'Set up welding equipment'],
                            ['MEE721208', 'Fit up weld materials'],
                            ['MEE721209', 'Repair welds'],
                        ],
                    },
                    {
                        title: 'Core Competencies',
                        units: [
                            ['MEE721306', 'Weld carbon steel plates and pipes using SMAW'],
                        ],
                    },
                ],
                employmentOutcomes: ['SMAW Welder'],
            },
            {
                name: 'Carpentry NC II',
                sector: 'Construction',
                image: carpentryNc2Image,
                description: 'The Carpentry NC II Qualification consists of competencies in rough and finishing carpentry that a person must achieve in the fabrication and installation of wooden materials and basic roof assembly.',
                legalBasis: 'Technical Education and Skills Development Act of 1994 (Republic Act No. 7796). Section 22, “Establishment and Administration of the National Trade Skills Standards,” mandates TESDA to establish national occupational skill standards and develop and implement a certification and accreditation program for trade testing.',
                qualificationScope: 'This qualification is packaged from the competency map of the Construction – Civil Works sub-sector (Annex A).',
                competencyGroups: [
                    {
                        title: 'Basic Competencies',
                        units: [
                            ['400311210', 'Participate in workplace communication'],
                            ['400311211', 'Work in a team environment'],
                            ['400311212', 'Solve/address general workplace problems'],
                            ['400311213', 'Develop career and life decisions'],
                            ['400311214', 'Contribute to workplace innovation'],
                            ['400311215', 'Present relevant information'],
                            ['400311216', 'Practice occupational safety and health policies and procedures'],
                            ['400311217', 'Exercise efficient and effective sustainable practices in the workplace'],
                            ['400311218', 'Practice entrepreneurial skills in the workplace'],
                        ],
                    },
                    {
                        title: 'Common Competencies',
                        units: [
                            ['CON931201', 'Prepare construction materials and tools'],
                            ['CON311201', 'Observe procedures, specifications and manuals of instruction'],
                            ['CON311203', 'Perform mensurations and calculations'],
                            ['CON311204', 'Maintain tools and equipment'],
                        ],
                    },
                    {
                        title: 'Core Competencies',
                        units: [
                            ['CON711301', 'Layout reference lines'],
                            ['CON711302', 'Fabricate, install and remove wooden formworks'],
                            ['CON711303', 'Install wooden door jamb, window frame and panels'],
                            ['CON711304', 'Install ceiling and wall frames and panels'],
                            ['CON711305', 'Fabricate and install wooden stairs'],
                            ['CON711306', 'Install wooden floor supports and panels'],
                            ['CON711307', 'Fabricate and install roofing system'],
                            ['CON711308', 'Fabricate and install wooden cabinet'],
                        ],
                    },
                ],
                employmentOutcomes: ['Rough Carpenter', 'Finishing Carpenter'],
            },
            {
                name: 'Plumbing NC II',
                sector: 'Construction',
                image: plumbingNc2Image,
                description: 'The Plumbing NC II Qualification consists of competencies that a person must achieve in installing multiple units of plumbing systems with multi-point hot- and cold-water lines for medium-rise buildings. It also includes plumbing repair and maintenance work.',
                legalBasis: 'Technical Education and Skills Development Act of 1994 (Republic Act No. 7796). Section 22, “Establishment and Administration of the National Trade Skills Standards,” mandates TESDA to establish national occupational skill standards and develop and implement a certification and accreditation program for trade testing.',
                qualificationScope: 'This qualification is packaged from the competency map of the Construction – Civil Works sub-sector (Annex A).',
                competencyGroups: [
                    {
                        title: 'Basic Competencies',
                        units: [
                            ['500311105', 'Participate in workplace communication'],
                            ['500311106', 'Work in a team environment'],
                            ['500311107', 'Practice career professionalism'],
                            ['500311108', 'Practice occupational health and safety procedures'],
                        ],
                    },
                    {
                        title: 'Common Competencies',
                        units: [
                            ['CON931201', 'Prepare construction materials and tools'],
                            ['CON311201', 'Observe procedures, specifications and manuals of instruction'],
                            ['CON311203', 'Perform mensurations and calculations'],
                            ['CON311204', 'Maintain tools and equipment'],
                        ],
                    },
                    {
                        title: 'Core Competencies',
                        units: [
                            ['CON712348', 'Prepare estimation of materials for multiple plumbing units'],
                            ['CON712349', 'Perform multiple plumbing units installation and assemblies'],
                            ['CON712350', 'Conduct pipe leak testing'],
                            ['CON712351', 'Perform plumbing repair and maintenance work'],
                        ],
                    },
                ],
                employmentOutcomes: ['Plumber II'],
            },
            {
                name: 'Construction Painting NC II',
                description: 'Trains learners in surface preparation, paint mixing, and the application of decorative and protective coatings on interior and exterior building surfaces. It covers the proper use of brushes, rollers, and spray equipment, along with safety and quality standards for construction painting works.',
            },
            {
                name: 'Housekeeping NC II',
                image: housekeepingNc2Image,
                description: 'The Housekeeping NC II Qualification consists of competencies that a person must achieve to prepare guest rooms, clean public areas and equipment, provide housekeeping services, provide valet services, handle intoxicated guests, and launder linen and guest clothes in a range of accommodation services.',
                legalBasis: 'Technical Education and Skills Development Act of 1994 (Republic Act No. 7796). Section 22, “Establishment and Administration of the National Trade Skills Standards,” mandates TESDA to establish national occupational skill standards and develop and implement a certification and accreditation program for trade testing.',
                qualificationScope: 'This qualification is packaged from the competency map of the Tourism Sector (Hotel and Restaurant) (Annex A).',
                competencyGroups: [
                    {
                        title: 'Basic Competencies',
                        units: [
                            ['500311105', 'Participate in workplace communication'],
                            ['500311106', 'Work in a team environment'],
                            ['500311107', 'Practice career professionalism'],
                            ['500311108', 'Practice occupational health and safety procedures'],
                        ],
                    },
                    {
                        title: 'Common Competencies',
                        units: [
                            ['TRS311201', 'Develop and update industry knowledge'],
                            ['TRS311202', 'Observe workplace hygiene procedures'],
                            ['TRS311203', 'Perform computer operations'],
                            ['TRS311204', 'Perform workplace and safety practices'],
                            ['TRS311205', 'Provide effective customer service'],
                        ],
                    },
                    {
                        title: 'Core Competencies',
                        units: [
                            ['TRS5123111', 'Provide housekeeping services to guests'],
                            ['TRS5123112', 'Clean and prepare rooms for incoming guests'],
                            ['TRS5123113', 'Provide valet/butler service'],
                            ['TRS5123114', 'Laundry linen and guest clothes'],
                            ['TRS5123115', 'Clean public areas, facilities and equipment'],
                            ['TRS5123122', 'Deal with/handle intoxicated guests'],
                        ],
                    },
                ],
                employmentOutcomes: [
                    'Junior Cleaner',
                    'Assistant Cleaner',
                    'Assistant Public Area Cleaner',
                    'Cleaner',
                    'Public Area Cleaner',
                    'Room/Cabin Attendant/Room Maid',
                    'Laundry Attendant',
                    'Housekeeping Attendant',
                    'Butler',
                ],
            },
            {
                name: 'Barangay Health Services NC II',
                sector: 'Health Care',
                image: barangayHealthNc2Image,
                description: 'The Barangay Health Services NC II qualification prepares learners to support household health and well-being, share health information, maintain health-station supplies and records, and monitor the health status of households in their service area.',
                institutionalContext: 'In 2018, under the administration of then Mayor Oscar S. Moreno, the Cagayan de Oro Technical Vocational Institute (CDO-TVI) was established by virtue of City Ordinance 13473-2018, with Councilor Suzette Magtajas-Daba as the principal author. The institute is owned and operated by the Local Government of Cagayan de Oro and offers TESDA-accredited programs, with a focus on construction and tourism. Its mission was to provide free center-based and community-based technical skills training, prioritizing out-of-school youth and low-income families. CDO-TVI is located in Barangay Agusan, District 2, Cagayan de Oro City.',
                competencyGroups: [
                    {
                        title: 'Basic Competencies',
                        units: [
                            ['400311210', 'Participate in workplace communication'],
                            ['400311211', 'Work in a team environment'],
                            ['400311212', 'Solve/address general workplace problems'],
                            ['400311213', 'Develop career and life decisions'],
                            ['400311214', 'Contribute to workplace innovation'],
                            ['400311215', 'Present relevant information'],
                            ['400311216', 'Practice occupational safety and health policies and procedures'],
                            ['400311217', 'Exercise efficient and effective sustainable practices in the workplace'],
                            ['400311218', 'Practice entrepreneurial skills in the workplace'],
                        ],
                    },
                    {
                        title: 'Common Competencies',
                        units: [
                            ['HHC323201', 'Implement and monitor infection control policies and procedures'],
                            ['HHC323202', 'Respond effectively to difficult/challenging behavior'],
                            ['HHC323203', 'Apply basic first aid'],
                            ['HHC323204', 'Maintain high standard of patient/client services'],
                        ],
                    },
                    {
                        title: 'Core Competencies',
                        units: [
                            ['HHC532301', 'Assist the household to identify health problems to promote health and well-being'],
                            ['HHC532302', 'Share knowledge and skills among members to provide information, education and communication (IEC) and/or household teaching in disease prevention and control'],
                            ['HHC532303', 'Ensure safekeeping of equipment, medical supplies, materials, and health records in health station'],
                            ['HHC532304', 'Monitor health status of household members under his/her area of service coverage'],
                            ['HHC532305', 'Maintain updated list/records of health activities'],
                        ],
                    },
                ],
                employmentOutcomes: ['Barangay Health Worker'],
            },
            {
                name: 'Events Management Services NC III',
                description: "Equips learners with the competencies to plan, organize, and coordinate events such as conferences, weddings, corporate gatherings, and community activities. It covers client relations, budgeting, logistics, supplier coordination, and on-site event execution following TESDA's Events Management Services NC III standards.",
            },
            {
                name: 'Bookkeeping NC III',
                description: "Equips learners with the knowledge and skills to record financial transactions, prepare reports, and maintain books of accounts for small businesses, following the Philippine Financial Reporting Standards (PFRS) for micro and small enterprises. Graduates are prepared for TESDA's Bookkeeping NC III assessment.",
            },
            {
                name: "Trainer's Methodology Level I",
                description: "Equips aspiring and practicing TVET trainers with the competencies to plan and prepare training sessions, facilitate learning, maintain training facilities, and assess learner progress. It is a prerequisite qualification for nationally certified TVET trainers under TESDA's Philippine TVET Trainers Qualifications Framework.",
            },
        ],
        departments: ['Construction', 'Tourism', 'Health Care', 'Trainer’s Methodology'],
        focus: ['Electrical Wiring', 'Arc Welding', 'Guest Room Prep', 'TVET Standards'],
        stats: { programs: 10, departments: 7, faculty: 20 },
    },
];

const FILTERS = [
    { id: 'all', label: 'All Programs' },
    { id: 'degree', label: 'Degree Programs', match: (p) => p.id !== 'tsti' },
    { id: 'tvet', label: 'TVET / Certificate', match: (p) => p.id === 'tsti' },
];

// --- Program card ----------------------------------------------------------
const ProgramCard = ({ program, idx, onViewDetails }) => (
    <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ delay: idx * 0.08, duration: 0.55, ease: [0.33, 1, 0.68, 1] }}
        className="group relative flex h-full min-h-[540px] flex-col overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
    >
        {/* Accent bar */}
        <div className="h-[4px] w-full" style={{ background: program.accentHex }} />

        {/* Banner strip */}
        <div className="relative h-56 w-full overflow-hidden bg-slate-200">
            <img
                src={program.banner}
                alt={program.name}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <span
                className="absolute left-5 top-5 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-[0.16em] text-white shadow-md"
                style={{ background: program.accentHex }}
            >
                {program.code}
            </span>
            <h3 className="absolute bottom-5 left-5 right-5 text-white vp-serif font-bold text-xl md:text-2xl leading-tight drop-shadow-md">
                {program.name}
            </h3>
        </div>

        {/* Body */}
        <div className="flex flex-1 flex-col p-6 md:p-7">
            <div className="flex-1">
                <p className="text-[10px] uppercase tracking-[0.14em] text-slate-400 font-bold mb-2">
                    Programs Offered ({program.offerings.length})
                </p>
                <ul className="space-y-2">
                    {program.offerings.slice(0, 2).map((offering) => (
                        <li
                            key={offering.name}
                            className="border-l-2 py-1 pl-4 text-base font-semibold leading-snug text-slate-800 line-clamp-2"
                            style={{ borderColor: `${program.accentHex}80` }}
                        >
                            {offering.name}
                        </li>
                    ))}
                </ul>
                {program.offerings.length > 2 && (
                    <p className="mt-2 text-xs font-medium text-slate-500">
                        +{program.offerings.length - 2} more programs
                    </p>
                )}
            </div>

            {/* Leader */}
            <div className="mt-5 min-h-[72px] border-t border-slate-100 pt-5 flex items-center gap-4">
                <div className="w-10 h-10 rounded-full overflow-hidden bg-slate-100 ring-2 ring-white shadow-sm flex-shrink-0">
                    <img
                        src={program.leader.photo}
                        alt={program.leader.name}
                        loading="lazy"
                        className="w-full h-full object-cover object-top"
                    />
                </div>
                <div className="min-w-0">
                    <p className="text-xs font-bold text-slate-800 line-clamp-1">{program.leader.name}</p>
                    <p className="text-[10px] uppercase tracking-wider text-slate-400 line-clamp-2">
                        {program.leader.role}
                    </p>
                </div>
            </div>

            <button
                type="button"
                onClick={() => onViewDetails(program)}
                className="mt-4 w-full rounded-xl border px-4 py-3 text-sm font-semibold transition-colors hover:bg-slate-50"
                style={{ color: program.accentHex, borderColor: `${program.accentHex}55` }}
            >
                View all details
            </button>

            {/* CTA */}
            <a
                href={program.route}
                className="mt-3 inline-flex w-full items-center justify-between gap-2 rounded-xl px-5 py-3.5 text-sm font-bold text-white shadow-sm transition-all duration-300 hover:brightness-110"
                style={{ background: program.accentHex }}
            >
                Explore {program.code}
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
            </a>
        </div>
    </motion.div>
);

// --- Main component --------------------------------------------------------
export default function AcademicPrograms() {
    const [imageError, setImageError] = useState(false);
    const [activeFilter, setActiveFilter] = useState('all');
    const [selectedProgram, setSelectedProgram] = useState(null);
    const [expandedOffering, setExpandedOffering] = useState(null);
    const heroRef = useRef(null);

    useEffect(() => {
        document.title = 'Academic Programs - City College of Cagayan de Oro';
    }, []);

    useEffect(() => {
        if (!selectedProgram) return undefined;

        const handleKeyDown = (event) => {
            if (event.key === 'Escape') setSelectedProgram(null);
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [selectedProgram]);

    const filteredPrograms = useMemo(() => {
        const filter = FILTERS.find((f) => f.id === activeFilter);
        if (!filter || !filter.match) return PROGRAMS;
        return PROGRAMS.filter(filter.match);
    }, [activeFilter]);

    return (
        <MainLayout
            maxWidth="full"
            containerClassName="px-0"
            mainClassName="py-0"
            className="overflow-x-hidden pb-0 bg-slate-50"
        >
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&family=Inter:wght@400;500;600;700;800&display=swap');
                body { font-family: 'Inter', ui-sans-serif, system-ui, sans-serif; background-color: #F8FAFC; }
                .vp-serif { font-family: 'Fraunces', ui-serif, Georgia, serif; }
            `}</style>

            {/* === HERO === */}
            <div
                ref={heroRef}
                className="relative w-full bg-cover bg-center bg-no-repeat shadow-lg min-h-[380px] md:min-h-[480px] lg:min-h-[560px] flex items-center justify-center"
                style={{
                    backgroundImage: imageError ? 'none' : `url(${acadHero})`,
                    backgroundColor: imageError ? '#0f172a' : 'transparent',
                    backgroundPosition: 'center 30%',
                    backgroundSize: 'cover',
                }}
            >
                {imageError && <div className="absolute inset-0 bg-gradient-to-r from-slate-900 to-emerald-900" />}
                <div className="absolute inset-0 bg-black/55" />

                <motion.div
                    className="relative z-10 mx-auto max-w-5xl px-6 text-center"
                    initial="hidden"
                    animate="visible"
                    variants={{ visible: { transition: { staggerChildren: 0.2 } } }}
                >
                    <motion.span
                        variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                        className="inline-block text-[11px] font-bold uppercase tracking-[0.24em] text-amber-300 mb-4"
                    >
                        Academics
                    </motion.span>
                    <motion.h1
                        variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}
                        className="text-4xl font-bold tracking-tight text-white drop-shadow-md sm:text-5xl md:text-6xl vp-serif"
                    >
                        Our Academic Programs
                    </motion.h1>
                    <motion.p
                        variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}
                        className="mx-auto mt-4 max-w-2xl text-base md:text-lg text-white/90 drop-shadow-md"
                    >
                        Four colleges. Endless possibilities. Discover the degree programs and technical-vocational
                        qualifications that will shape your future at the City College of Cagayan de Oro.
                    </motion.p>
                </motion.div>
            </div>

            {/* === PROGRAM DIRECTORY === */}
            <section className="relative py-20 md:py-28">
                <div className="mx-auto max-w-6xl px-6">
                    <div className="text-center mb-10">
                        <Kicker textClass="text-amber-600" ruleClass="bg-amber-500" align="center">
                            Explore
                        </Kicker>
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mt-1 vp-serif">
                            <MaskedText text="Colleges & Institutes" />
                        </h2>
                        <p className="mx-auto mt-3 max-w-2xl text-sm md:text-base text-slate-500 leading-relaxed">
                            Each college and institute offers distinct programs designed to prepare students for
                            meaningful careers, community engagement, and lifelong learning.
                        </p>
                    </div>

                    {/* Filter pills */}
                    <div className="flex flex-wrap items-center justify-center gap-2.5 mb-10 md:mb-14">
                        {FILTERS.map((filter) => {
                            const isActive = activeFilter === filter.id;
                            return (
                                <button
                                    key={filter.id}
                                    onClick={() => setActiveFilter(filter.id)}
                                    aria-pressed={isActive}
                                    className={`px-5 py-2.5 rounded-full text-[12px] font-bold uppercase tracking-[0.12em] border transition-all duration-300 ${
                                        isActive
                                            ? 'bg-emerald-700 text-white border-amber-400 shadow-md shadow-emerald-900/10'
                                            : 'bg-white text-slate-500 border-slate-200 hover:border-emerald-300 hover:text-emerald-700'
                                    }`}
                                >
                                    {filter.label}
                                </button>
                            );
                        })}
                    </div>

                    {/* Cards */}
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeFilter}
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -16 }}
                            transition={{ duration: 0.35, ease: 'easeOut' }}
                            className="grid auto-rows-fr grid-cols-1 gap-7 sm:grid-cols-2"
                        >
                            {filteredPrograms.map((program, idx) => (
                                <ProgramCard
                                    key={program.id}
                                    program={program}
                                    idx={idx}
                                    onViewDetails={setSelectedProgram}
                                />
                            ))}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </section>

            <AnimatePresence>
                {selectedProgram && (
                    <motion.div
                        className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/65 p-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onMouseDown={(event) => {
                            if (event.target === event.currentTarget) {
                                setSelectedProgram(null);
                            }
                        }}
                    >
                        <motion.section
                            role="dialog"
                            aria-modal="true"
                            aria-labelledby="program-details-title"
                            className="relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl md:p-8"
                            initial={{ y: 20, scale: 0.98 }}
                            animate={{ y: 0, scale: 1 }}
                            exit={{ y: 12, scale: 0.98 }}
                        >
                            <button
                                type="button"
                                onClick={() => setSelectedProgram(null)}
                                aria-label="Close program details"
                                className="absolute right-4 top-4 rounded-full p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-900"
                            >
                                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>

                            <p
                                className="text-xs font-bold uppercase tracking-[0.16em]"
                                style={{ color: selectedProgram.accentHex }}
                            >
                                {selectedProgram.code}
                            </p>
                            <h2
                                id="program-details-title"
                                className="mt-2 pr-8 text-2xl font-bold text-slate-900 vp-serif md:text-3xl"
                            >
                                {selectedProgram.name}
                            </h2>

                            <div className="mt-7">
                                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500">
                                    All Programs Offered
                                </h3>
                                <div className="mt-3 space-y-4">
                                    {selectedProgram.offerings.map((offering) => (
                                        <article key={offering.name} className="overflow-hidden rounded-xl border border-slate-200">
                                            <button
                                                type="button"
                                                aria-expanded={expandedOffering === offering.name}
                                                onClick={() => setExpandedOffering(
                                                    expandedOffering === offering.name ? null : offering.name
                                                )}
                                                className="flex w-full items-center justify-between gap-4 p-4 text-left transition-colors hover:bg-slate-50"
                                            >
                                                <span>
                                                    <span className="block font-bold text-slate-900">{offering.name}</span>
                                                    {offering.sector && (
                                                        <span className="mt-1 block text-xs font-semibold uppercase tracking-wide text-emerald-700">
                                                            {offering.sector} Sector
                                                        </span>
                                                    )}
                                                </span>
                                                <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-600">
                                                    <svg
                                                        className={`h-4 w-4 transition-transform ${expandedOffering === offering.name ? 'rotate-180' : ''}`}
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 9-7 7-7-7" />
                                                    </svg>
                                                </span>
                                            </button>
                                            {expandedOffering === offering.name && (
                                                <div className="border-t border-slate-200 p-4">
                                                    <div className={offering.image ? 'grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(240px,0.8fr)]' : ''}>
                                                        <div>
                                                            <p className="text-sm leading-relaxed text-slate-600">
                                                                {offering.description}
                                                            </p>
                                                            {offering.legalBasis && (
                                                                <div className="mt-5">
                                                                    <h5 className="text-sm font-bold text-slate-800">Legal Basis</h5>
                                                                    <p className="mt-1 text-sm leading-relaxed text-slate-600">
                                                                        {offering.legalBasis}
                                                                    </p>
                                                                </div>
                                                            )}
                                                            {offering.qualificationScope && (
                                                                <div className="mt-4">
                                                                    <h5 className="text-sm font-bold text-slate-800">Qualification Scope</h5>
                                                                    <p className="mt-1 text-sm leading-relaxed text-slate-600">
                                                                        {offering.qualificationScope}
                                                                    </p>
                                                                </div>
                                                            )}
                                                            {offering.institutionalContext && (
                                                                <div className="mt-5 rounded-lg border border-slate-200 bg-white p-4">
                                                                    <h5 className="text-sm font-bold text-slate-800">
                                                                        Institutional Background
                                                                    </h5>
                                                                    <p className="mt-1 text-sm leading-relaxed text-slate-600">
                                                                        {offering.institutionalContext}
                                                                    </p>
                                                                </div>
                                                            )}
                                                        </div>
                                                        {offering.image && (
                                                            <img
                                                                src={offering.image}
                                                                alt={`${offering.name} qualification information`}
                                                                loading="lazy"
                                                                className="h-auto w-full self-start rounded-lg border border-slate-200 object-contain"
                                                            />
                                                        )}
                                                    </div>
                                                    {offering.competencyGroups?.map((group) => (
                                                        <div key={group.title} className="mt-5">
                                                            <h5 className="text-sm font-bold text-slate-800">{group.title}</h5>
                                                            <ul className="mt-2 space-y-2">
                                                                {group.units.map(([code, unit]) => (
                                                                    <li
                                                                        key={code}
                                                                        className="grid gap-1 text-sm leading-relaxed text-slate-600 sm:grid-cols-[7rem_1fr]"
                                                                    >
                                                                        <span className="font-mono text-xs font-semibold text-slate-500">{code}</span>
                                                                        <span>{unit}</span>
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        </div>
                                                    ))}
                                                    {offering.employmentOutcomes && (
                                                        <div className="mt-5">
                                                            <h5 className="text-sm font-bold text-slate-800">
                                                                A person who achieves this qualification is competent to be:
                                                            </h5>
                                                            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-600">
                                                                {offering.employmentOutcomes.map((outcome) => (
                                                                    <li key={outcome}>{outcome}</li>
                                                                ))}
                                                            </ul>
                                                        </div>
                                                    )}
                                                </div>
                                            )}
                                        </article>
                                    ))}
                                </div>
                            </div>

                            <div className="mt-6 grid gap-6 sm:grid-cols-2">
                                <div>
                                    <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500">
                                        Departments and Sectors
                                    </h3>
                                    <ul className="mt-3 flex flex-wrap gap-2">
                                        {selectedProgram.departments.map((department) => (
                                            <li
                                                key={department}
                                                className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-700"
                                            >
                                                {department}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div>
                                    <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500">
                                        Areas of Focus
                                    </h3>
                                    <ul className="mt-3 flex flex-wrap gap-2">
                                        {selectedProgram.focus.map((area) => (
                                            <li
                                                key={area}
                                                className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-700"
                                            >
                                                {area}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            <div className="mt-6 border-t border-slate-200 pt-4">
                                <p className="font-semibold text-slate-900">{selectedProgram.leader.name}</p>
                                <p className="mt-1 text-xs uppercase tracking-wide text-slate-500">
                                    {selectedProgram.leader.role}
                                </p>
                            </div>
                        </motion.section>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* === LEADERSHIP SHOWCASE === */}
            <section
                className="relative py-20 md:py-28 overflow-hidden"
                style={{ backgroundColor: PANEL, borderTop: `1px solid ${HAIRLINE}`, borderBottom: `1px solid ${HAIRLINE}` }}
            >
                <div
                    className="absolute inset-0 opacity-40 pointer-events-none"
                    style={{
                        backgroundImage: `radial-gradient(${HAIRLINE} 1px, transparent 1px)`,
                        backgroundSize: '28px 28px',
                    }}
                />
                <div className="relative max-w-7xl mx-auto px-6">
                    <div className="text-center mb-12">
                        <Kicker textClass="text-blue-600" ruleClass="bg-blue-600" align="center">
                            Leadership
                        </Kicker>
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mt-1 vp-serif">
                            <MaskedText text="Meet the Deans & Administrators" />
                        </h2>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
                        {PROGRAMS.map((program, idx) => (
                            <motion.div
                                key={program.id}
                                initial={{ opacity: 0, y: 24 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.2 }}
                                transition={{ delay: idx * 0.08, duration: 0.55 }}
                                className="group flex flex-col items-center"
                            >
                                <div className="relative w-full max-w-[180px]">
                                    <div className="relative z-10 rounded-xl p-1.5 bg-white border border-slate-100 shadow-md transition-all duration-500 group-hover:shadow-xl">
                                        <div className="overflow-hidden rounded-lg w-full aspect-[4/5] bg-slate-100">
                                            <img
                                                src={program.leader.photo}
                                                alt={program.leader.name}
                                                loading="lazy"
                                                className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                                            />
                                        </div>
                                    </div>
                                    <div
                                        className="absolute inset-0 z-0 rounded-xl translate-x-1.5 translate-y-1.5 border-2"
                                        style={{ borderColor: `${program.accentHex}80` }}
                                    />
                                </div>
                                <h3 className="mt-5 text-sm md:text-base vp-serif font-bold text-slate-800 text-center leading-tight">
                                    {program.leader.name}
                                </h3>
                                <p
                                    className="mt-1 text-[10px] md:text-[11px] font-bold uppercase tracking-[0.12em] text-center"
                                    style={{ color: program.accentHex }}
                                >
                                    {program.leader.role}
                                </p>
                                <span className="mt-3 h-px w-10 bg-slate-300" />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* === CURRICULUM SNAPSHOT / QUICK LINKS === */}
            <section
                className="relative py-20 md:py-28 overflow-hidden bg-cover bg-no-repeat"
                style={{
                    backgroundImage: `url(${acad_bg})`,
                    backgroundColor: PANEL,
                    backgroundPosition: 'center top',
                    backgroundSize: '100% auto',
                    backgroundRepeat: 'no-repeat',
                }}
            >
                <div className="relative max-w-6xl mx-auto px-6 z-10">
                    <div className="text-center mb-12">
                        <Kicker textClass="text-amber-600" ruleClass="bg-amber-500" align="center">
                            Quick Reference
                        </Kicker>
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mt-1 vp-serif drop-shadow-[0_2px_5px_rgba(255,255,255,0.8)]">
                            <MaskedText text="Programs at a Glance" />
                        </h2>
                    </div>

                    <div className="grid gap-4">
                        {PROGRAMS.map((program, idx) => (
                            <motion.div
                                key={program.id}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, amount: 0.3 }}
                                transition={{ delay: idx * 0.08, duration: 0.5 }}
                                className="bg-white/90 backdrop-blur-sm rounded-2xl border border-white/60 shadow-lg overflow-hidden"
                            >
                                <div className="grid md:grid-cols-12 items-center">
                                    <div className="md:col-span-3 p-5 md:p-6 flex items-center gap-3">
                                        <span
                                            className="w-1.5 h-12 rounded-full flex-shrink-0"
                                            style={{ background: program.accentHex }}
                                        />
                                        <div>
                                            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">
                                                {program.code}
                                            </p>
                                            <p className="text-sm md:text-base font-bold vp-serif text-slate-800 leading-tight">
                                                {program.name}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="md:col-span-7 px-5 md:px-0 py-3 md:py-6">
                                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                            {program.focus.map((f) => (
                                                <span
                                                    key={f}
                                                    className="text-[11px] font-medium text-slate-600 bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-center"
                                                >
                                                    {f}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="md:col-span-2 p-5 md:p-6 flex md:justify-end">
                                        <a
                                            href={program.route}
                                            className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.12em] transition-colors"
                                            style={{ color: program.accentHex }}
                                        >
                                            View Programs
                                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                            </svg>
                                        </a>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* === CTA === */}
            <section className="relative py-20 md:py-24 bg-emerald-800 text-white overflow-hidden">
                <div
                    className="absolute inset-0 opacity-[0.05] pointer-events-none"
                    style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '24px 24px' }}
                />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] bg-amber-400/10 rounded-full blur-[120px]" />

                <div className="relative max-w-3xl mx-auto px-6 text-center">
                    <Kicker textClass="text-amber-300" ruleClass="bg-amber-300" align="center">
                        Ready to Begin?
                    </Kicker>
                    <h2 className="text-3xl md:text-4xl font-bold vp-serif mb-4">
                        Find the program that fits your future.
                    </h2>
                    <p className="text-white/85 leading-relaxed mb-8">
                        Whether you're drawn to the arts, driven by business, passionate about teaching, or ready to
                        master a technical skill — there's a path for you at CCCDO.
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-3">
                        <a
                            href="/apply"
                            className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-amber-400 text-slate-900 font-bold hover:bg-amber-300 transition-colors duration-300 shadow-lg shadow-amber-500/30"
                        >
                            Apply for Admission
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                        </a>
                        <a
                            href="/contact-us"
                            className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-white/10 border border-white/30 text-white font-semibold hover:bg-white/20 transition-colors duration-300 backdrop-blur-sm"
                        >
                            Contact Us
                        </a>
                    </div>
                </div>
            </section>
        </MainLayout>
    );
}