import { useState } from 'react';
import MainLayout from '../../../layouts/MainLayout';
import { motion, AnimatePresence } from 'framer-motion';

// Helper function to fix broken images and use a clean placeholder
const normalizeImagePath = (value) => {
    if (!value) return 'https://placehold.co/600x400/e5e7eb/a3a3a3?text=Image+Unavailable';
    if (/^https?:\/\//i.test(value) || value.startsWith('data:')) return value;
    return '/' + value.replace(/^\/+/, '');
};

// Sample Data
const eventsData = [
    {
        id: 1,
        title: "General Parents' Assembly SY 2026-2027",
        description: 'Empowering Families, Enriching Futures. Join us for the annual general assembly to discuss the upcoming school year.',
        date: 'July 20, 2026',
        time: '9:00 AM - 12:00 PM',
        location: 'CCCO Main Auditorium',
        status: 'upcoming',
        image: null
    },
    {
        id: 2,
        title: 'WURI World University Rankings Forum',
        description: "Celebrating CCCO's global ranking of 55th for Culture/Values and 64th for Curricular Innovation.",
        date: 'August 5, 2026',
        time: '1:00 PM - 4:00 PM',
        location: 'Online via Zoom',
        status: 'upcoming',
        image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=600&auto=format&fit=crop'
    },
    {
        id: 3,
        title: 'ALS Bridging Academy Orientation',
        description: 'Contextualized Learning Activity Sheets orientation for the ALS Weekend Bridging Academy.',
        date: 'August 15, 2026',
        time: '8:00 AM - 10:00 AM',
        location: 'CCCO Extension Office',
        status: 'upcoming',
        image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=600&auto=format&fit=crop'
    },
    {
        id: 4,
        title: 'University Research Colloquium 2026',
        description: 'Presentation of research outputs by faculty and students aligned with the General Education Curriculum.',
        date: 'June 12, 2026',
        time: '9:00 AM - 5:00 PM',
        location: 'CCCO Research Center',
        status: 'past',
        image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=600&auto=format&fit=crop'
    }
];

export default function UpcomingEvents() {
    const [filter, setFilter] = useState('upcoming');

    const filteredEvents = eventsData.filter((event) => event.status === filter);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { type: 'spring', stiffness: 100, damping: 12 },
        },
        exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2 } },
    };

    return (
        <MainLayout
            maxWidth="full"
            containerClassName="px-0"
            mainClassName="py-0"
            className="overflow-hidden pb-0"
        >
            {/* Banner from LatestNews */}
            <div 
                className="relative w-full bg-cover bg-center bg-no-repeat shadow-lg min-h-[350px] md:min-h-[450px] lg:min-h-[550px] flex items-center justify-center"
                style={{
                    backgroundImage: `url('https://images.unsplash.com/photo-1523050854058-8df90110c7f1?q=80&w=1200&auto=format&fit=crop')`
                }}
            >
                <div className="absolute inset-0 bg-black/50"></div>
                <div className="relative z-10 mx-auto max-w-7xl px-6 text-center">
                    <h1 className="text-4xl font-bold tracking-tight text-white drop-shadow-md sm:text-5xl md:text-6xl">
                        Upcoming Events
                    </h1>
                    <p className="mx-auto mt-4 max-w-3xl text-lg text-white/90 drop-shadow-md">
                        Stay informed about the latest activities, assemblies, and academic schedules.
                    </p>
                </div>
            </div>

            {/* MAIN CONTENT AREA */}
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12 md:py-16">
                
                {/* --- IMPROVED: FILTER TABS --- */}
                {/* 1. Added 'justify-start' to align them to the left */}
                {/* 2. Changed colors so text is ALWAYS visible */}
                <div className="flex justify-start gap-4 mb-12">
                    <button
                        onClick={() => setFilter('upcoming')}
                        className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 ${
                            filter === 'upcoming'
                                ? 'bg-white text-[#0f5132] border-2 border-[#0f5132] shadow-md'
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                    >
                        Upcoming Events
                    </button>
                    <button
                        onClick={() => setFilter('past')}
                        className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 ${
                            filter === 'past'
                                ? 'bg-white text-[#0f5132] border-2 border-[#0f5132] shadow-md'
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                    >
                        Past Events
                    </button>
                </div>

                {/* EVENT CARDS GRID */}
                {filteredEvents.length > 0 ? (
                    <motion.div
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        key={filter}
                    >
                        <AnimatePresence mode="wait">
                            {filteredEvents.map((event) => {
                                const imageSrc = normalizeImagePath(event.image);

                                return (
                                    <motion.div
                                        key={event.id}
                                        variants={itemVariants}
                                        initial="hidden"
                                        animate="visible"
                                        exit="exit"
                                        layout
                                        className="group bg-white rounded-2xl shadow-sm border border-gray-100 hover:border-[#0f5132] hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col h-full"
                                    >
                                        {/* Image Container */}
                                        <div className="relative h-56 w-full overflow-hidden bg-gray-100">
                                            <img
                                                src={imageSrc}
                                                alt={event.title}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent pointer-events-none"></div>

                                            {/* Sleek Badge */}
                                            <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-white shadow-md border-2 border-white ${
                                                event.status === 'upcoming' ? 'bg-emerald-600' : 'bg-gray-500'
                                            }`}>
                                                {event.status === 'upcoming' ? 'Upcoming' : 'Past'}
                                            </div>
                                        </div>

                                        {/* Card Content */}
                                        <div className="p-6 flex flex-col flex-1">
                                            <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 leading-tight group-hover:text-[#0f5132] transition-colors">
                                                {event.title}
                                            </h3>
                                            
                                            <p className="text-sm text-gray-600 leading-relaxed mb-4 line-clamp-2 flex-1">
                                                {event.description}
                                            </p>

                                            {/* Date, Time, Location */}
                                            <div className="space-y-2.5 mb-6 border-t border-gray-100 pt-4">
                                                <div className="flex items-center gap-3 text-xs text-gray-500">
                                                    <svg className="w-4 h-4 text-[#0f5132] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                    </svg>
                                                    <span className="truncate">{event.date}</span>
                                                </div>
                                                <div className="flex items-center gap-3 text-xs text-gray-500">
                                                    <svg className="w-4 h-4 text-[#0f5132] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                    </svg>
                                                    <span className="truncate">{event.time}</span>
                                                </div>
                                                <div className="flex items-center gap-3 text-xs text-gray-500">
                                                    <svg className="w-4 h-4 text-[#0f5132] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                    </svg>
                                                    <span className="truncate">{event.location}</span>
                                                </div>
                                            </div>

                                            {/* Action Button */}
                                            {event.status === 'upcoming' ? (
                                                <button className="w-full py-3 bg-[#0f5132] text-white text-sm font-bold rounded-xl hover:bg-[#0a3b24] hover:shadow-lg transition-all duration-300 mt-auto">
                                                    Register Now
                                                </button>
                                            ) : (
                                                <button className="w-full py-3 bg-gray-100 text-gray-400 text-sm font-bold rounded-xl cursor-not-allowed mt-auto border border-gray-200">
                                                    Event Ended
                                                </button>
                                            )}
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </AnimatePresence>
                    </motion.div>
                ) : (
                    <div className="text-center py-20 text-gray-500">
                        <p className="text-xl font-medium mb-2">No {filter} events found</p>
                        <p className="text-base">Check back later for updates.</p>
                    </div>
                )}
            </div>
        </MainLayout>
    );
}