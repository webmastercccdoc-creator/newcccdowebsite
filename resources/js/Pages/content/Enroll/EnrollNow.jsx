import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MainLayout from '../../../layouts/MainLayout';
import AnimatedBannerText from '../../../components/content/AnimatedBannerText';
import tstiLogo from '../../../assets/logos/tsti-logo.png';
import cbmLogo from '../../../assets/logos/cbm-logo.png';
import casLogo from '../../../assets/logos/cas-logo.png';
import coeLogo from '../../../assets/logos/coe-logo.png';
import enrollBanner from '../../../assets/banner/News Banner.png';

// Import the PDF forms
// Note: If your bundler throws an error due to spaces/parentheses in the filename, 
// you may need to rename the files to remove spaces (e.g., COL-FO-2024-002-REGISTRATION-FORM.pdf)
import registrationFormPdf from '../../../assets/Downloadable Fiile/Registration Form/COL-FO-2024-002-REGISTRATION-FORM-SEPTEMBER-2026 (1).pdf';
import socioEconomicPdf from '../../../assets/Downloadable Fiile/Registration Form/COL-FO-2024-026-ENROLLMENT-ANNEX (1) (1).pdf';

const HASH_TO_SECTION = {
    '1': 'requirements',
    '2': 'policies',
    '3': 'resolution',
    '4': 'process',
    '5': 'report',
};

const SECTION_TO_HASH = Object.fromEntries(
    Object.entries(HASH_TO_SECTION).map(([hash, sectionId]) => [sectionId, hash])
);

export default function EnrollNow() {
    const [activeTab, setActiveTab] = useState('hei');
    const [openSection, setOpenSection] = useState('requirements');
    
    // State for the nested accordions
    const [openPolicy, setOpenPolicy] = useState(null); 
    const [openProcessTab, setOpenProcessTab] = useState(null); 
    const [openForm, setOpenForm] = useState(null); 

    useEffect(() => {
        document.title = "Enroll Now - City College of Cagayan de Oro";

        const resetCards = () => {
            const cards = document.querySelectorAll('.card-content');
            cards.forEach(card => {
                card.classList.remove('zoom-in');
                card.style.pointerEvents = '';
            });
        };

        resetCards();

        const handlePageShow = (event) => {
            if (event.persisted) {
                resetCards();
            }
        };

        window.addEventListener('pageshow', handlePageShow);

        return () => {
            window.removeEventListener('pageshow', handlePageShow);
        };
    }, []);

    useEffect(() => {
        let scrollTimeout;

        const goToHash = () => {
            const sectionId = HASH_TO_SECTION[window.location.hash.slice(1)];
            if (!sectionId) return;

            setActiveTab('hei');
            setOpenSection(sectionId);

            window.clearTimeout(scrollTimeout);
            scrollTimeout = window.setTimeout(() => {
                document.getElementById(`section-${sectionId}`)?.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start',
                });
            }, 400);
        };

        goToHash();
        window.addEventListener('hashchange', goToHash);

        return () => {
            window.clearTimeout(scrollTimeout);
            window.removeEventListener('hashchange', goToHash);
        };
    }, []);

    // Animation variants
    const fadeInUp = {
        hidden: { opacity: 0, y: 60 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: "easeOut" }
        }
    };

    const fadeInScale = {
        hidden: { opacity: 0, scale: 0.9 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: { duration: 0.5, ease: "easeOut" }
        }
    };

    const handleHEIClick = (e) => {
        e.preventDefault();
        const card = e.currentTarget.querySelector('.card-content');
        if (card) {
            card.classList.add('zoom-in');
            card.style.pointerEvents = 'none';
        }

        setTimeout(() => {
            window.open('https://docs.google.com/forms/d/1PvU3HKTnVRqIdB5CUNHBANHB4k9qnzVokld8o6mof8M/viewform?edit_requested=true', '_blank');
            setTimeout(() => {
                if (card) {
                    card.classList.remove('zoom-in');
                    card.style.pointerEvents = '';
                }
            }, 300);
        }, 800);
    };

    const handleTSTIClick = (e) => {
        e.preventDefault();
        const card = e.currentTarget.querySelector('.card-content');
        if (card) {
            card.classList.add('zoom-in');
            card.style.pointerEvents = 'none';
        }

        setTimeout(() => {
            window.open('https://docs.google.com/forms/d/e/1FAIpQLSecF1XomDxZbi0IRvkD10ooljU0h9VSgTh2jWw6N-IyP6vP2Q/viewform', '_blank');
            setTimeout(() => {
                if (card) {
                    card.classList.remove('zoom-in');
                    card.style.pointerEvents = '';
                }
            }, 300);
        }, 800);
    };

    // Data for Admission Policies per Program
    const programPolicies = [
        {
            id: 'btvted',
            title: 'Bachelor in Technical–Vocational Teacher Education Major in Electrical Technology',
            criteria: [
                { label: "Educational Background", details: "High school diploma or equivalent (Grade 12) • ALS Graduate not later than 2019 completers" },
                { label: "Minimum GWA Requirement", details: "GPA is 85% and higher • Any SHS Track" },
                { label: "Entrance Examination", details: "Pass the college entrance examination with a minimum score of 85% or its equivalent" },
                { label: "Extra-curricular Involvement", details: "Active participation in extra-curricular activities (optional, but favorable)" },
                { label: "Interview", details: "Successful completion of an interview with the BTVTed Program head and the dean of the College of Education" },
                { label: "Scholarship Opportunities", details: "Information about available scholarships and financial aid options should be provided to applicants. • Eg. Application requirements to apply city scholarship at City Scholarship Office" },
                { label: "Special Requirements", details: "Submission of relevant certifications or achievements in technical skills (optional, but favorable)" }
            ]
        },
        {
            id: 'bacomm',
            title: 'Bachelor of Arts in Communications Major in New Media',
            criteria: [
                { label: "Educational Background", details: "High school diploma or equivalent (Grade 12) • ALS Graduate not later than 2019 completers" },
                { label: "Minimum GPA Requirement", details: "GPA is 80% and lower • Any SHS Track" },
                { label: "Entrance Examination", details: "Pass the college entrance examination" },
                { label: "Extra-curricular Involvement", details: "Active participation in extra-curricular activities (optional, but favorable)" },
                { label: "Interview", details: "Successful completion of an interview with the BA COMM program head and the dean College of Arts and Sciences." },
                { label: "Scholarship Opportunities", details: "Information about available scholarships and financial aid options should be provided to applicants. • Eg. Application requirements to apply city scholarship at City Scholarship Office" },
                { label: "Special Requirements", details: "Portfolio of works for students with relevant experience (optional)" }
            ]
        },
        {
            id: 'btled',
            title: 'Bachelor in Technology Education Major in Industrial Arts',
            criteria: [
                { label: "Educational Background", details: "High school diploma or equivalent (Grade 12) • ALS Graduate not later than 2019 completers" },
                { label: "Minimum GPA Requirement", details: "GPA is 85% and higher • Any SHS Track" },
                { label: "Entrance Examination", details: "Pass the college entrance examination with a minimum score of 80% or its equivalent" },
                { label: "Extra-curricular Involvement", details: "Active participation in extra-curricular activities (optional, but favorable)" },
                { label: "Interview", details: "Successful completion of an interview with the BTLed program head and the dean of the College of Education." },
                { label: "Scholarship Opportunities", details: "Information about available scholarships and financial aid options should be provided to applicants. • Eg. Application requirements to apply city scholarship at City Scholarship Office" },
                { label: "Special Requirements", details: "Submission of relevant certifications or achievements in technical skills (optional, but favorable)" }
            ]
        }
    ];

    // Data for Enrollment Process
    const newStudentSteps = [
        { step: 1, title: "Admission Office", description: "Initial screening and submission of requirements." },
        { step: 2, title: "College Dean", description: "Interview and approval of the program dean." },
        { step: 3, title: "TIDMAC", description: "Testing and assessment." },
        { step: 4, title: "Finance Office", description: "Payment of fees and assessment." },
        { step: 5, title: "Guidance Office", description: "Counseling and student orientation." },
        { step: 6, title: "School Clinic", description: "Medical and health check." },
        { step: 7, title: "Registrar's Office", description: "Official enrollment and subject loading." },
        { step: 8, title: "Congratulations!", description: "You are officially enrolled!", isFinal: true }
    ];

    const oldStudentSteps = [
        { step: 1, title: "College Dean", description: "Approval of the program dean." },
        { step: 2, title: "TIDMAC", description: "Testing and assessment." },
        { step: 3, title: "Finance Office", description: "Payment of fees and assessment." },
        { step: 4, title: "Guidance Office", description: "Counseling and student orientation." },
        { step: 5, title: "School Clinic", description: "Medical and health check." },
        { step: 6, title: "Registrar's Office", description: "Official enrollment and subject loading." },
        { step: 7, title: "Congratulations!", description: "You are officially enrolled!", isFinal: true }
    ];

    // Helper component to render a timeline
    const ProcessTimeline = ({ steps }) => (
        <div className="relative border-l-2 border-gray-200 ml-3 space-y-6 pb-2 mt-4">
            {steps.map((item, index) => (
                <div key={index} className="relative pl-6">
                    {/* Timeline Dot */}
                    <div className={`absolute -left-[17px] top-1.5 flex items-center justify-center w-8 h-8 rounded-full border-4 border-white shadow-sm ${
                        item.isFinal ? 'bg-[#059669] text-white' : 'bg-gray-200 text-gray-600'
                    }`}>
                        {item.isFinal ? (
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                        ) : (
                            <span className="text-xs font-bold">{item.step}</span>
                        )}
                    </div>
                    <div>
                        <h6 className={`text-sm font-semibold ${item.isFinal ? 'text-[#059669]' : 'text-gray-900'}`}>
                            {item.title}
                        </h6>
                        <p className="text-xs text-gray-500 mt-1">{item.description}</p>
                    </div>
                </div>
            ))}
        </div>
    );

    // HEI expandable sections configuration
    const heiSections = [
        {
            id: 'requirements',
            title: 'Admission Requirements',
            description: 'Documents and qualifications needed to apply.',
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
            ),
            content: (
                <div className="rounded-lg bg-gray-50 border border-gray-100 p-5 text-left">
                    <p className="text-sm text-gray-600 mb-4">
                        Please prepare the following documents for submission to the Admissions Office:
                    </p>
                    <ul className="grid sm:grid-cols-2 gap-x-4 gap-y-3">
                        {[
                            "Form 138 / Transcript of Records",
                            "Certificate Good Moral Character / Honorable Dismissal",
                            "High School Diploma",
                            "PSA Birth Certificate",
                            "Barangay Clearance",
                            "2 pcs 1x1 Picture",
                            "2 pcs 2x2 Picture"
                        ].map((req, i) => (
                            <li key={i} className="flex items-start">
                                <svg className="w-5 h-5 text-[#059669] mr-2.5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                </svg>
                                <span className="text-sm text-gray-700">{req}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            )
        },
        {
            id: 'policies',
            title: 'Admission Policies per Program',
            description: 'Program-specific admission rules and criteria.',
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
            ),
            content: (
                <div className="rounded-lg bg-gray-50 border border-gray-100 p-5">
                    <p className="text-sm text-gray-600 mb-4">
                        Select a program below to view its specific admission criteria and details.
                    </p>
                    <div className="space-y-3">
                        {programPolicies.map((prog) => {
                            const isProgOpen = openPolicy === prog.id;
                            return (
                                <div key={prog.id} className="border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm">
                                    <button
                                        onClick={() => setOpenPolicy(isProgOpen ? null : prog.id)}
                                        className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-gray-50 transition-colors"
                                    >
                                        <span className="font-semibold text-gray-800 text-sm pr-4">{prog.title}</span>
                                        <svg
                                            className={`w-4 h-4 text-gray-500 transition-transform duration-200 flex-shrink-0 ${isProgOpen ? 'rotate-180' : ''}`}
                                            fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </button>
                                    
                                    <AnimatePresence>
                                        {isProgOpen && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: 'auto', opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.3 }}
                                                className="overflow-hidden bg-gray-50"
                                            >
                                                <div className="px-4 py-4 border-t border-gray-200">
                                                    <div className="space-y-3">
                                                        {prog.criteria.map((crit, idx) => (
                                                            <div key={idx} className="flex flex-col sm:flex-row sm:gap-2 text-sm">
                                                                <strong className="text-gray-700 min-w-[160px] sm:w-1/3 flex-shrink-0">{crit.label}:</strong>
                                                                <span className="text-gray-600 mt-1 sm:mt-0 leading-relaxed whitespace-pre-line">{crit.details}</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )
        },
        {
            id: 'resolution',
            title: 'Board Resolution',
            description: 'Official board resolutions governing admissions.',
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
            ),
            content: (
                <div className="rounded-lg bg-gray-50 border border-gray-100 p-5 text-center">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gray-200 text-gray-500 mb-3">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <p className="text-sm font-semibold text-gray-800">Content Coming Soon</p>
                    <p className="text-xs text-gray-500 mt-1 max-w-md mx-auto">
                        This section is being prepared. Please check back later for updated information on Board Resolution.
                    </p>
                </div>
            )
        },
        {
            id: 'process',
            title: 'Enrollment Process',
            description: 'Step-by-step guide to completing your enrollment.',
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" />
                </svg>
            ),
            content: (
                <div className="rounded-lg bg-gray-50 border border-gray-100 p-5">
                    <p className="text-sm text-gray-600 mb-4">
                        Select your student status below to view the required enrollment steps.
                    </p>
                    <div className="space-y-3 mb-6">
                        {/* New Students Tab */}
                        <div className="border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm">
                            <button
                                onClick={() => setOpenProcessTab(openProcessTab === 'new' ? null : 'new')}
                                className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-gray-50 transition-colors"
                            >
                                <span className="font-semibold text-gray-800 text-sm pr-4">For New Students & Transferees</span>
                                <svg
                                    className={`w-4 h-4 text-gray-500 transition-transform duration-200 flex-shrink-0 ${openProcessTab === 'new' ? 'rotate-180' : ''}`}
                                    fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>
                            
                            <AnimatePresence>
                                {openProcessTab === 'new' && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="overflow-hidden bg-gray-50"
                                    >
                                        <div className="px-4 py-4 border-t border-gray-200">
                                            <ProcessTimeline steps={newStudentSteps} />
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Old Students Tab */}
                        <div className="border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm">
                            <button
                                onClick={() => setOpenProcessTab(openProcessTab === 'old' ? null : 'old')}
                                className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-gray-50 transition-colors"
                            >
                                <span className="font-semibold text-gray-800 text-sm pr-4">For Old Students</span>
                                <svg
                                    className={`w-4 h-4 text-gray-500 transition-transform duration-200 flex-shrink-0 ${openProcessTab === 'old' ? 'rotate-180' : ''}`}
                                    fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>
                            
                            <AnimatePresence>
                                {openProcessTab === 'old' && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="overflow-hidden bg-gray-50"
                                    >
                                        <div className="px-4 py-4 border-t border-gray-200">
                                            <ProcessTimeline steps={oldStudentSteps} />
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>

                    <p className="text-sm text-gray-600 mb-4 border-t border-gray-200 pt-6">
                        Download and fill out the required forms:
                    </p>
                    <div className="space-y-3">
                        {/* Socio-Economic Information Form Tab */}
                        <div className="border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm">
                            <button
                                onClick={() => setOpenForm(openForm === 'socio-economic' ? null : 'socio-economic')}
                                className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-gray-50 transition-colors"
                            >
                                <span className="font-semibold text-gray-800 text-sm pr-4">Socio-Economic Information Form</span>
                                <svg
                                    className={`w-4 h-4 text-gray-500 transition-transform duration-200 flex-shrink-0 ${openForm === 'socio-economic' ? 'rotate-180' : ''}`}
                                    fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>
                            
                            <AnimatePresence>
                                {openForm === 'socio-economic' && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="overflow-hidden bg-gray-50"
                                    >
                                        <div className="px-4 py-5 border-t border-gray-200 text-center">
                                            <p className="text-sm text-gray-600 mb-3">
                                                Please download and print this form to fill it out.
                                            </p>
                                            <a 
                                                href={socioEconomicPdf} 
                                                target="_blank" 
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center px-4 py-2 bg-[#059669] text-white text-sm font-semibold rounded-lg hover:bg-[#047857] transition-colors shadow-sm"
                                            >
                                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                                </svg>
                                                Download Form (PDF)
                                            </a>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Registration Form Tab */}
                        <div className="border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm">
                            <button
                                onClick={() => setOpenForm(openForm === 'registration' ? null : 'registration')}
                                className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-gray-50 transition-colors"
                            >
                                <span className="font-semibold text-gray-800 text-sm pr-4">Registration Form</span>
                                <svg
                                    className={`w-4 h-4 text-gray-500 transition-transform duration-200 flex-shrink-0 ${openForm === 'registration' ? 'rotate-180' : ''}`}
                                    fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>
                            
                            <AnimatePresence>
                                {openForm === 'registration' && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="overflow-hidden bg-gray-50"
                                    >
                                        <div className="px-4 py-5 border-t border-gray-200 text-center">
                                            <p className="text-sm text-gray-600 mb-3">
                                                Please download and print this form to fill it out.
                                            </p>
                                            <a 
                                                href={registrationFormPdf} 
                                                target="_blank" 
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center px-4 py-2 bg-[#059669] text-white text-sm font-semibold rounded-lg hover:bg-[#047857] transition-colors shadow-sm"
                                            >
                                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                                </svg>
                                                Download Form (PDF)
                                            </a>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            )
        },
        {
            id: 'report',
            title: 'Enrollment Report',
            description: 'Enrollment statistics and reports.',
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
            ),
            content: (
                <div className="rounded-lg bg-gray-50 border border-gray-100 p-5">
                    <div className="overflow-x-auto rounded-lg border border-gray-200">
                        <table className="w-full text-sm text-left">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-200">
                                <tr>
                                    <th scope="col" className="px-4 py-3 sm:px-6">School Year</th>
                                    <th scope="col" className="px-4 py-3 text-center">1st</th>
                                    <th scope="col" className="px-4 py-3 text-center">2nd</th>
                                    <th scope="col" className="px-4 py-3 text-center">3rd</th>
                                    <th scope="col" className="px-4 py-3 text-center">4th</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="bg-white border-b border-gray-200 hover:bg-gray-50">
                                    <th scope="row" className="px-4 py-4 sm:px-6 font-medium text-gray-900 whitespace-nowrap">
                                        SY 2024 - 2025
                                    </th>
                                    <td className="px-4 py-4 text-center font-semibold text-gray-800">370</td>
                                    <td className="px-4 py-4 text-center text-gray-500">N/A</td>
                                    <td className="px-4 py-4 text-center text-gray-500">N/A</td>
                                    <td className="px-4 py-4 text-center text-gray-500">N/A</td>
                                </tr>
                                <tr className="bg-white border-b border-gray-200 hover:bg-gray-50">
                                    <th scope="row" className="px-4 py-4 sm:px-6 font-medium text-gray-900 whitespace-nowrap">
                                        SY 2025 - 2026
                                    </th>
                                    <td className="px-4 py-4 text-center font-semibold text-gray-800">395</td>
                                    <td className="px-4 py-4 text-center font-semibold text-gray-800">233</td>
                                    <td className="px-4 py-4 text-center text-gray-500">N/A</td>
                                    <td className="px-4 py-4 text-center text-gray-500">N/A</td>
                                </tr>
                                <tr className="bg-white hover:bg-gray-50">
                                    <th scope="row" className="px-4 py-4 sm:px-6 font-medium text-gray-900 whitespace-nowrap">
                                        SY 2026 - 2027
                                    </th>
                                    <td className="px-4 py-4 text-center font-semibold text-gray-800">335</td>
                                    <td className="px-4 py-4 text-center font-semibold text-gray-800">279</td>
                                    <td className="px-4 py-4 text-center font-semibold text-gray-800">176</td>
                                    <td className="px-4 py-4 text-center text-gray-500">N/A</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            )
        }
    ];

    const tabs = [
        { id: 'hei', label: 'HEI - Higher Education Institution', color: '#059669' },
        { id: 'tsti', label: 'Technical Skills & Technology Institute', color: '#1a365d' }
    ];

    return (
        <MainLayout
            maxWidth="full"
            containerClassName="px-0"
            mainClassName="py-0"
            className="overflow-hidden pb-0"
        >
            {/* Hero Banner */}
            <div
                className="relative w-full bg-cover bg-center bg-no-repeat shadow-lg min-h-[300px] md:min-h-[400px] lg:min-h-[450px] flex items-center justify-center"
                style={{ backgroundImage: `url('${enrollBanner}')` }}
            >
                <div className="absolute inset-0 bg-black/50"></div>
                <div className="relative z-10 w-full max-w-6xl mx-auto px-6 sm:px-8 lg:px-10 text-center">
                    <AnimatedBannerText
                        title="Enroll Now"
                        description="Start Your Journey at City College of Cagayan de Oro"
                    />
                </div>
            </div>

            {/* Main Content - Cards Section */}
            <div className="w-full bg-white py-16 md:py-20 lg:py-24">
                <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-10">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                        variants={fadeInUp}
                        className="text-center mb-12"
                    >
                        <h2
                            className="text-2xl sm:text-[2.5rem] md:text-[3.25rem] lg:text-[3.75rem] font-extrabold leading-[1.15] sm:leading-[1.2] lg:leading-[60px] tracking-[-0.03em] text-[#262525]"
                            style={{ fontFamily: '"Bricolage", "Inter", sans-serif' }}
                        >
                            Choose Your <span className="text-[#059669]">Path</span>
                        </h2>
                        <div className="w-20 h-1 bg-gradient-to-r from-[#d4a843] to-[#f0d78c] rounded-full mx-auto mt-4"></div>
                        <p className="text-lg text-gray-600 mt-4 max-w-2xl mx-auto">
                            Select the program that fits your goals and start your journey toward a brighter future.
                        </p>
                    </motion.div>

                    {/* Two Cards Grid */}
                    <div className="grid md:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto">

                        {/* HEI Card */}
                        <motion.div
                            onClick={handleHEIClick}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.3 }}
                            variants={fadeInScale}
                            whileHover={{ y: -12, scale: 1.02 }}
                            transition={{ duration: 0.3, ease: "easeOut" }}
                            className="group block cursor-pointer relative"
                            role="button"
                            tabIndex={0}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                    handleHEIClick(e);
                                }
                            }}
                        >
                            <div className="card-content h-full bg-white rounded-2xl shadow-xl overflow-visible border-2 border-transparent hover:border-[#059669] transition-all duration-300 flex flex-col relative">
                                <div className="absolute -top-[45px] left-1/2 transform -translate-x-1/2 z-10 flex items-center justify-center gap-4">
                                    <div className="w-[90px] h-[90px] rounded-full bg-white shadow-lg border-2 border-[#059669] p-1.5 flex items-center justify-center overflow-visible">
                                        <img src={cbmLogo} alt="CBM Logo" className="w-full h-full object-contain" />
                                    </div>
                                    <div className="w-[90px] h-[90px] rounded-full bg-white shadow-lg border-2 border-[#059669] p-1.5 flex items-center justify-center overflow-visible">
                                        <img src={casLogo} alt="CAS Logo" className="w-full h-full object-contain" />
                                    </div>
                                    <div className="w-[90px] h-[90px] rounded-full bg-white shadow-lg border-2 border-[#059669] p-1.5 flex items-center justify-center overflow-visible">
                                        <img src={coeLogo} alt="COE Logo" className="w-full h-full object-contain" />
                                    </div>
                                </div>

                                <div className="bg-gradient-to-br from-[#059669] to-[#047857] px-6 pt-14 pb-8 text-center h-[150px] flex flex-col items-center justify-center flex-shrink-0">
                                    <h3 className="text-2xl md:text-3xl font-bold text-white" style={{ fontFamily: '"Bricolage", "Inter", sans-serif' }}>
                                        College Programs
                                    </h3>
                                    <p className="text-emerald-100 text-sm mt-1">HEI - Higher Education Institution</p>
                                </div>

                                <div className="p-6 flex-1 flex flex-col">
                                    <p className="text-gray-600 text-sm mb-4 flex-shrink-0">
                                        Earn a bachelor's degree through free quality education at City College of Cagayan de Oro (CCCDO). Our college programs are designed to prepare students for professional careers and lifelong learning.
                                    </p>

                                    <div className="space-y-2 mb-4 flex-1">
                                        {["6 Bachelor's Degree Programs", "Free Tuition Fee under CHED's Free Higher Education Law", "Open to SHS Graduates, ALS Completers, & Transferees", "CHED Accredited & Government Recognized Programs"].map((item, i) => (
                                            <div key={i} className="flex items-start text-sm text-gray-700">
                                                <svg className="w-4 h-4 text-[#059669] mr-2 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                                </svg>
                                                <span>{item}</span>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="border-t border-gray-100 pt-4 mb-4 flex-shrink-0">
                                        <p className="text-xs text-gray-500 italic">
                                            <strong>Programs offered:</strong> Teacher Education, Communication, Social Work, Office Administration, and Entrepreneurship
                                        </p>
                                    </div>

                                    <div className="flex items-center justify-between pt-2 border-t border-gray-100 flex-shrink-0">
                                        <span className="text-sm font-medium text-[#059669] group-hover:text-[#047857] transition-colors">
                                            Learn More &amp; Apply
                                        </span>
                                        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-[#059669] text-white group-hover:bg-[#047857] transition-colors group-hover:translate-x-1 transition-transform duration-300">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                            </svg>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* TSTI Card */}
                        <motion.div
                            onClick={handleTSTIClick}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.3 }}
                            variants={fadeInScale}
                            whileHover={{ y: -12, scale: 1.02 }}
                            transition={{ duration: 0.3, ease: "easeOut" }}
                            className="group block cursor-pointer relative"
                            role="button"
                            tabIndex={0}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                    handleTSTIClick(e);
                                }
                            }}
                        >
                            <div className="card-content h-full bg-white rounded-2xl shadow-xl overflow-visible border-2 border-transparent hover:border-[#1a365d] transition-all duration-300 flex flex-col relative">
                                <div className="absolute -top-[45px] left-1/2 transform -translate-x-1/2 z-10">
                                    <div className="w-[90px] h-[90px] rounded-full bg-white shadow-lg border-2 border-[#1a365d] p-1.5 flex items-center justify-center overflow-visible">
                                        <img src={tstiLogo} alt="TSTI Logo" className="w-full h-full object-contain" />
                                    </div>
                                </div>

                                <div className="bg-gradient-to-br from-[#1a365d] to-[#2b6cb0] px-6 pt-14 pb-8 text-center h-[150px] flex flex-col items-center justify-center flex-shrink-0">
                                    <h3 className="text-2xl md:text-3xl font-bold text-white" style={{ fontFamily: '"Bricolage", "Inter", sans-serif' }}>
                                        TSTI
                                    </h3>
                                    <p className="text-blue-200 text-sm mt-1">Technical Skills &amp; Technology Institute</p>
                                </div>

                                <div className="p-6 flex-1 flex flex-col">
                                    <p className="text-gray-600 text-sm mb-4 flex-shrink-0">
                                        Gain industry-ready technical skills through our TESDA-accredited programs. The Technical Skills &amp; Technology Institute offers hands-on training designed for immediate employment and entrepreneurship opportunities.
                                    </p>

                                    <div className="space-y-2 mb-4 flex-1">
                                        {["8 TESDA-Accredited Technical Programs", "Hands-on Practical Skills Training", "Employment & Entrepreneurship Ready", "Open to SHS Graduates, ALS Completers, & Professionals"].map((item, i) => (
                                            <div key={i} className="flex items-start text-sm text-gray-700">
                                                <svg className="w-4 h-4 text-[#1a365d] mr-2 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                                </svg>
                                                <span>{item}</span>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="border-t border-gray-100 pt-4 mb-4 flex-shrink-0">
                                        <p className="text-xs text-gray-500 italic">
                                            <strong>Programs offered:</strong> Electrical Installation And Maintenance, Shielded Metal Arc Welding, Bookkeeping, Barangay Health Services, Housekeeping, Carpentry and Plumbing
                                        </p>
                                    </div>

                                    <div className="flex items-center justify-between pt-2 border-t border-gray-100 flex-shrink-0">
                                        <span className="text-sm font-medium text-[#1a365d] group-hover:text-[#2b6cb0] transition-colors">
                                            Register Now
                                        </span>
                                        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-[#1a365d] text-white group-hover:bg-[#2b6cb0] transition-colors group-hover:translate-x-1 transition-transform duration-300">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                            </svg>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* ===== TABS SECTION ===== */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.15 }}
                        variants={fadeInUp}
                        className="mt-20 max-w-5xl mx-auto"
                    >
                        <div className="text-center mb-8">
                            <h3
                                className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#262525]"
                                style={{ fontFamily: '"Bricolage", "Inter", sans-serif' }}
                            >
                                Admission <span className="text-[#059669]">&amp; Enrollment</span>
                            </h3>
                            <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
                                Select an institution to view requirements, guidelines, and the step-by-step enrollment process.
                            </p>
                        </div>

                        {/* Tab Buttons */}
                        <div className="flex justify-center mb-8 px-2">
                            <div className="inline-flex flex-col sm:flex-row bg-gray-100 rounded-2xl sm:rounded-full p-1.5 shadow-inner w-full sm:w-auto">
                                {tabs.map((tab) => (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`relative flex items-center justify-center px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl sm:rounded-full text-xs sm:text-sm md:text-base font-semibold transition-all duration-300 ${
                                            activeTab === tab.id
                                                ? 'text-white shadow-md'
                                                : 'text-gray-600 hover:text-gray-900'
                                        }`}
                                        style={{
                                            backgroundColor: activeTab === tab.id ? tab.color : 'transparent'
                                        }}
                                    >
                                        <span className="text-center">{tab.label}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Tab Content */}
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeTab}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.3, ease: "easeOut" }}
                                className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden"
                            >
                                {/* Tab Header */}
                                <div
                                    className="px-6 sm:px-8 py-5 flex items-center justify-between flex-wrap gap-3"
                                    style={{
                                        background: activeTab === 'hei'
                                            ? 'linear-gradient(135deg, #059669 0%, #047857 100%)'
                                            : 'linear-gradient(135deg, #1a365d 0%, #2b6cb0 100%)'
                                    }}
                                >
                                    <div className="flex items-center gap-3">
                                        <div>
                                            <h4 className="text-lg sm:text-xl font-bold text-white">
                                                {activeTab === 'hei' ? 'Higher Education Institution' : 'Technical Skills & Technology Institute'}
                                            </h4>
                                            <p className="text-xs sm:text-sm text-white/80">
                                                {activeTab === 'hei'
                                                    ? 'Admission details & enrollment information'
                                                    : 'TESDA-accredited technical programs'}
                                            </p>
                                        </div>
                                    </div>
                                    {activeTab === 'hei' && (
                                        <span className="text-xs font-semibold text-white bg-white/20 px-3 py-1 rounded-full">
                                            CHED Accredited
                                        </span>
                                    )}
                                </div>

                                {/* ===== HEI CONTENT: Expandable Sections ===== */}
                                {activeTab === 'hei' && (
                                    <div className="p-4 sm:p-6 space-y-3">
                                        {heiSections.map((section, index) => {
                                            const isOpen = openSection === section.id;
                                            return (
                                                <motion.div
                                                    key={section.id}
                                                    id={`section-${section.id}`}
                                                    initial={{ opacity: 0, y: 15 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ duration: 0.3, delay: index * 0.05 }}
                                                    className={`scroll-mt-32 rounded-xl border transition-colors duration-200 ${
                                                        isOpen 
                                                            ? 'border-gray-200 bg-white shadow-sm' 
                                                            : 'border-gray-200 bg-white hover:bg-gray-50'
                                                    }`}
                                                >
                                                    {/* Section Header (clickable) */}
                                                    <button
                                                        onClick={() => {
                                                            const nextSection = isOpen ? null : section.id;
                                                            setOpenSection(nextSection);
                                                            window.history.replaceState(
                                                                window.history.state,
                                                                '',
                                                                `${window.location.pathname}${window.location.search}${nextSection ? `#${SECTION_TO_HASH[nextSection]}` : ''}`
                                                            );
                                                        }}
                                                        className="w-full flex items-center justify-between gap-3 px-4 sm:px-5 py-4 text-left"
                                                        aria-expanded={isOpen}
                                                    >
                                                        <div className="flex items-center gap-3 min-w-0">
                                                            <span
                                                                className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                                                                    isOpen ? 'bg-gray-200 text-gray-700' : 'bg-gray-100 text-gray-500'
                                                                }`}
                                                            >
                                                                {section.icon}
                                                            </span>
                                                            <div className="min-w-0">
                                                                <h5 className="font-semibold text-gray-900 text-sm sm:text-base">
                                                                    {section.title}
                                                                </h5>
                                                                <p className="text-xs text-gray-500 mt-0.5 truncate">
                                                                    {section.description}
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <svg
                                                            className={`flex-shrink-0 w-5 h-5 text-gray-400 transition-transform duration-300 ${
                                                                isOpen ? 'rotate-180 text-gray-700' : ''
                                                            }`}
                                                            fill="none"
                                                            stroke="currentColor"
                                                            viewBox="0 0 24 24"
                                                        >
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                                        </svg>
                                                    </button>

                                                    {/* Section Body */}
                                                    <AnimatePresence initial={false}>
                                                        {isOpen && (
                                                            <motion.div
                                                                key={`${section.id}-body`}
                                                                initial={{ height: 0, opacity: 0 }}
                                                                animate={{ height: 'auto', opacity: 1 }}
                                                                exit={{ height: 0, opacity: 0 }}
                                                                transition={{ duration: 0.3, ease: 'easeInOut' }}
                                                                className="overflow-hidden"
                                                            >
                                                                <div className="px-4 sm:px-5 pb-5 pt-1">
                                                                    {section.content}
                                                                </div>
                                                            </motion.div>
                                                        )}
                                                    </AnimatePresence>
                                                </motion.div>
                                            );
                                        })}
                                    </div>
                                )}

                                {/* ===== TSTI CONTENT: Under Construction ===== */}
                                {activeTab === 'tsti' && (
                                    <div className="p-8 sm:p-12 flex flex-col items-center justify-center text-center min-h-[320px]">
                                        <motion.div
                                            initial={{ scale: 0.8, opacity: 0 }}
                                            animate={{ scale: 1, opacity: 1 }}
                                            transition={{ duration: 0.4, ease: 'easeOut' }}
                                            className="w-20 h-20 rounded-full bg-blue-50 flex items-center justify-center mb-5"
                                        >
                                            <svg className="w-10 h-10 text-[#1a365d]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                            </svg>
                                        </motion.div>
                                        <h4 className="text-xl sm:text-2xl font-bold text-[#1a365d] mb-2">
                                            Under Construction
                                        </h4>
                                        <p className="text-sm text-gray-600 max-w-md leading-relaxed">
                                            We're currently preparing the TSTI program details, admission requirements, and enrollment information.
                                            <br className="hidden sm:block" />
                                            Please check back soon or contact the Admissions Office for immediate assistance.
                                        </p>
                                        <div className="flex flex-wrap justify-center gap-2 mt-5">
                                            <span className="inline-flex items-center px-3 py-1 bg-blue-50 text-[#1a365d] rounded-full text-xs font-medium">
                                                <span className="w-2 h-2 bg-[#1a365d] rounded-full mr-2 animate-pulse"></span>
                                                Content in progress
                                            </span>
                                            <span className="inline-flex items-center px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium">
                                                TESDA-Accredited Programs
                                            </span>
                                        </div>
                                    </div>
                                )}

                                {/* Tab Footer */}
                                <div className="px-6 sm:px-8 py-4 bg-gray-50 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-3">
                                    <p className="text-xs text-gray-500 text-center sm:text-left">
                                        {activeTab === 'hei'
                                            ? 'Free tuition under CHED\'s Free Higher Education Law. Open to SHS graduates, ALS completers, and transferees.'
                                            : 'TESDA-accredited programs. Details are currently being updated.'}
                                    </p>
                                    <button
                                        onClick={
                                            activeTab === 'hei'
                                                ? () => window.open('https://docs.google.com/forms/d/1PvU3HKTnVRqIdB5CUNHBANHB4k9qnzVokld8o6mof8M/viewform?edit_requested=true', '_blank')
                                                : () => window.open('https://docs.google.com/forms/d/e/1FAIpQLSecF1XomDxZbi0IRvkD10ooljU0h9VSgTh2jWw6N-IyP6vP2Q/viewform', '_blank')
                                        }
                                        className="flex-shrink-0 text-sm font-semibold text-white px-5 py-2.5 rounded-full transition-all duration-300 hover:shadow-lg hover:scale-105"
                                        style={{ backgroundColor: activeTab === 'hei' ? '#059669' : '#1a365d' }}
                                    >
                                        {activeTab === 'hei' ? 'Apply Now' : 'Register Now'}
                                    </button>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </motion.div>

                    {/* Additional Info Section */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                        variants={fadeInUp}
                        className="mt-16 text-center max-w-3xl mx-auto"
                    >
                        <div className="bg-gray-50 rounded-2xl p-8 shadow-sm">
                            <h3
                                className="text-xl sm:text-2xl md:text-3xl font-bold text-[#262525] mb-3"
                                style={{ fontFamily: '"Bricolage", "Inter", sans-serif' }}
                            >
                                Need Help Choosing?
                            </h3>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                Both programs offer quality education and pathways to success.
                                <br />
                                <strong>Choose HEI</strong> if you want to earn a bachelor's degree and pursue a professional career.
                                <br />
                                <strong>Choose TSTI</strong> if you want to gain practical technical skills for immediate employment or start your own business.
                            </p>
                            <p className="text-gray-600 text-sm mt-3">
                                You can also visit our <a href="#" className="text-[#059669] font-semibold hover:underline">Admissions Office</a> for personalized guidance.
                            </p>
                            <div className="flex flex-wrap justify-center gap-4 mt-4">
                                <span className="inline-flex items-center px-3 py-1 bg-gray-100 text-[#1a365d] rounded-full text-xs font-medium">
                                    <span className="w-2 h-2 bg-[#059669] rounded-full mr-2"></span>
                                    HEI - College Programs
                                </span>
                                <span className="inline-flex items-center px-3 py-1 bg-gray-100 text-[#1a365d] rounded-full text-xs font-medium">
                                    <span className="w-2 h-2 bg-[#1a365d] rounded-full mr-2"></span>
                                    TSTI - Technical Skills Institute
                                </span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* CSS for zoom-in animation */}
            <style jsx>{`
                .card-content {
                    transition: transform 0.7s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.7s cubic-bezier(0.4, 0, 0.2, 1);
                    will-change: transform, opacity;
                }
                .card-content.zoom-in {
                    transform: scale(1.15);
                    opacity: 0;
                    pointer-events: none;
                }
            `}</style>
        </MainLayout>
    );
}