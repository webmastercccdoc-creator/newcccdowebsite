import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MainLayout from '../../../layouts/MainLayout';

const orgs = [
    { icon: 'fa-users', title: 'Student Government', desc: 'The elected student council that represents the student body, plans campus-wide initiatives, and voices student concerns to administration.' },
    { icon: 'fa-masks-theater', title: 'Arts & Culture Club', desc: 'Theater, dance, and visual arts groups that stage recitals and represent the college in regional festivals.' },
    { icon: 'fa-microscope', title: 'Academic Societies', desc: 'Program-based organizations for majors like IT, Education, and Business, running seminars and skills workshops.' },
    { icon: 'fa-hands-helping', title: 'Community Outreach', desc: 'Volunteer-driven group organizing tree planting, feeding programs, and disaster response with nearby barangays.' },
    { icon: 'fa-futbol', title: 'Sports Club', desc: 'Varsity and intramural teams across basketball, volleyball, and athletics, training year-round for regional meets.' },
    { icon: 'fa-music', title: 'Chorale & Band', desc: 'The official college choir and pep band, performing at ceremonies, foundation day, and public events.' },
];

const facilities = [
    { icon: 'fa-book', title: 'Library & Learning Commons', desc: 'Quiet study floors, group discussion rooms, and a growing digital collection open to all students.' },
    { icon: 'fa-flask', title: 'Science & Computer Labs', desc: 'Hands-on laboratories for the sciences and IT programs, equipped for coursework and student research.' },
    { icon: 'fa-utensils', title: 'Canteen & Food Court', desc: 'Affordable meals and snacks between classes, with covered seating for group study or downtime.' },
    { icon: 'fa-house-medical', title: 'Clinic & Wellness Room', desc: 'On-campus first aid, basic checkups, and a quiet space to rest during the school day.' },
    { icon: 'fa-basketball', title: 'Gymnasium & Grounds', desc: 'Covered court and open grounds for PE classes, intramurals, and student org events.' },
    { icon: 'fa-wifi', title: 'Campus Wi-Fi Zones', desc: 'Free internet access in the library, covered court, and common areas for coursework and research.' },
];

const events = [
    { month: 'JUN', title: 'Freshmen Orientation', desc: 'Welcome week for incoming students — campus tours, org fairs, and an introduction to student services.' },
    { month: 'AUG', title: 'Foundation Day', desc: 'The college\u2019s anniversary celebration, with a program, exhibits, and performances from student organizations.' },
    { month: 'OCT', title: 'Intramurals', desc: 'A week of inter-department sports competitions culminating in a friendly overall championship.' },
    { month: 'FEB', title: 'Academic & Cultural Fair', desc: 'Program showcases, research poster sessions, and cultural performances open to the public.' },
];

const services = [
    { icon: 'fa-user-graduate', title: 'Guidance & Counseling', desc: 'Academic advising, career guidance, and confidential counseling for personal concerns.' },
    { icon: 'fa-hand-holding-dollar', title: 'Scholarships & Financial Aid', desc: 'Information and application support for institutional, government, and partner scholarships.' },
    { icon: 'fa-briefcase', title: 'Career & Placement Office', desc: 'Job fairs, resume workshops, and employer partnerships for graduating students and alumni.' },
    { icon: 'fa-universal-access', title: 'Student Accessibility Support', desc: 'Coordination and accommodations for students with disabilities across classes and facilities.' },
];

const CampusLife = () => {
    const [activeEvent, setActiveEvent] = useState(null);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.6, ease: 'easeOut', staggerChildren: 0.12 } },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 24 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
    };

    const titleVariants = {
        hidden: { opacity: 0, y: -20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
    };

    const cardHover = {
        rest: { y: 0, boxShadow: '0 1px 2px rgba(0,0,0,0.04)' },
        hover: { y: -4, boxShadow: '0 12px 30px rgba(5,150,105,0.15)', transition: { duration: 0.25, ease: 'easeOut' } },
    };

    return (
        <MainLayout showTitle={false} maxWidth="full" containerClassName="px-0" mainClassName="py-6 md:py-8" className="bg-transparent">
            <motion.div className="max-w-6xl mx-auto" variants={containerVariants} initial="hidden" animate="visible">

                {/* Hero */}
                <motion.div className="text-center mb-14 px-4" variants={itemVariants}>
                    <motion.h1
                        className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-gray-800 mb-4"
                        style={{ fontFamily: '"Bricolage Grotesque", sans-serif' }}
                        variants={titleVariants}
                    >
                        Campus <span className="text-[#059669]">Life</span>
                    </motion.h1>
                    <motion.p
                        className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed"
                        variants={titleVariants}
                        transition={{ delay: 0.1 }}
                    >
                        More than classrooms — organizations, facilities, and events that make up
                        everyday life at City College of CDO.
                    </motion.p>
                    <motion.div
                        className="w-24 h-1 bg-gradient-to-r from-[#059669] to-[#047857] rounded-full mx-auto mt-4"
                        initial={{ width: 0 }}
                        animate={{ width: 96 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                    />
                </motion.div>

                {/* Student Organizations */}
                <motion.section className="mb-16 px-4" variants={itemVariants}>
                    <SectionHeader title="Student Organizations" subtitle="Groups students join to lead, compete, create, and give back." />
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        {orgs.map((org) => (
                            <motion.div
                                key={org.title}
                                className="bg-white rounded-2xl border border-gray-100 p-6"
                                variants={cardHover}
                                initial="rest"
                                whileHover="hover"
                            >
                                <div className="w-11 h-11 rounded-lg bg-[#ecfdf5] flex items-center justify-center mb-4">
                                    <i className={`fas ${org.icon} text-[#059669] text-lg`} />
                                </div>
                                <h3 className="font-bold text-gray-800 mb-1.5" style={{ fontFamily: '"Bricolage Grotesque", sans-serif' }}>
                                    {org.title}
                                </h3>
                                <p className="text-sm text-gray-600 leading-relaxed">{org.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </motion.section>

                {/* Facilities */}
                <motion.section className="mb-16 px-4" variants={itemVariants}>
                    <SectionHeader title="Facilities & Amenities" subtitle="Spaces students use every day, on and off the classroom." />
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        {facilities.map((f) => (
                            <motion.div
                                key={f.title}
                                className="bg-gray-50 rounded-2xl p-6 border border-transparent"
                                variants={cardHover}
                                initial="rest"
                                whileHover="hover"
                            >
                                <div className="w-11 h-11 rounded-lg bg-white shadow-sm flex items-center justify-center mb-4">
                                    <i className={`fas ${f.icon} text-[#059669] text-lg`} />
                                </div>
                                <h3 className="font-bold text-gray-800 mb-1.5" style={{ fontFamily: '"Bricolage Grotesque", sans-serif' }}>
                                    {f.title}
                                </h3>
                                <p className="text-sm text-gray-600 leading-relaxed">{f.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </motion.section>

                {/* Events */}
                <motion.section className="mb-16 px-4" variants={itemVariants}>
                    <SectionHeader title="Events & Activities" subtitle="Recurring dates on the student calendar." />
                    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
                        {events.map((ev, i) => (
                            <motion.button
                                key={ev.title}
                                onClick={() => setActiveEvent(activeEvent === ev.title ? null : ev.title)}
                                className={`w-full text-left flex items-start gap-5 p-5 md:p-6 ${i !== events.length - 1 ? 'border-b border-gray-100' : ''} hover:bg-[#f7fdfb] transition-colors duration-200`}
                            >
                                <div className="shrink-0 w-14 h-14 rounded-xl bg-gradient-to-br from-[#059669] to-[#047857] text-white flex items-center justify-center font-bold text-sm" style={{ fontFamily: '"Bricolage Grotesque", sans-serif' }}>
                                    {ev.month}
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-bold text-gray-800" style={{ fontFamily: '"Bricolage Grotesque", sans-serif' }}>
                                        {ev.title}
                                    </h3>
                                    <AnimatePresence>
                                        {activeEvent === ev.title && (
                                            <motion.p
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: 'auto' }}
                                                exit={{ opacity: 0, height: 0 }}
                                                transition={{ duration: 0.25 }}
                                                className="text-sm text-gray-600 leading-relaxed mt-1.5 overflow-hidden"
                                            >
                                                {ev.desc}
                                            </motion.p>
                                        )}
                                    </AnimatePresence>
                                </div>
                                <i className={`fas fa-chevron-down text-gray-400 mt-1.5 transition-transform duration-200 ${activeEvent === ev.title ? 'rotate-180' : ''}`} />
                            </motion.button>
                        ))}
                    </div>
                </motion.section>

                {/* Support Services */}
                <motion.section className="mb-16 px-4" variants={itemVariants}>
                    <SectionHeader title="Student Support Services" subtitle="Offices that help students beyond the syllabus." />
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        {services.map((s) => (
                            <motion.div
                                key={s.title}
                                className="flex gap-4 bg-white rounded-2xl border border-gray-100 p-6"
                                variants={cardHover}
                                initial="rest"
                                whileHover="hover"
                            >
                                <div className="shrink-0 w-11 h-11 rounded-lg bg-[#ecfdf5] flex items-center justify-center">
                                    <i className={`fas ${s.icon} text-[#059669] text-lg`} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-800 mb-1" style={{ fontFamily: '"Bricolage Grotesque", sans-serif' }}>
                                        {s.title}
                                    </h3>
                                    <p className="text-sm text-gray-600 leading-relaxed">{s.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.section>

                {/* Footer note */}
                <motion.div className="text-center text-sm text-gray-500 px-4" variants={itemVariants}>
                    <p>
                        Want to join an organization or learn more about a service?{' '}
                        <span className="text-[#059669] font-semibold">Visit the Student Affairs office</span> or your department chair.
                    </p>
                </motion.div>
            </motion.div>
        </MainLayout>
    );
};

const SectionHeader = ({ title, subtitle }) => (
    <div className="mb-6">
        <h2 className="text-2xl md:text-3xl font-extrabold text-gray-800" style={{ fontFamily: '"Bricolage Grotesque", sans-serif' }}>
            {title}
        </h2>
        <p className="text-gray-500 mt-1">{subtitle}</p>
    </div>
);

export default CampusLife;
