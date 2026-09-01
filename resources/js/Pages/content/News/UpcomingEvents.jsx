import { useState, useEffect } from "react";
import { Link } from "@inertiajs/react"; // Use Inertia's Link instead
import MainLayout from "../../../layouts/MainLayout";
import { motion, AnimatePresence } from "framer-motion";
import UpcomingEventsBanner from "../../../assets/banner/upcoming-events.jpg";
import AnimatedBannerText from "../../../components/content/AnimatedBannerText";
import axios from "axios";

// Helper function to fix broken images and use a clean placeholder
const normalizeImagePath = (value) => {
    if (!value)
        return "https://placehold.co/600x400/e5e7eb/a3a3a3?text=Image+Unavailable";
    if (/^https?:\/\//i.test(value) || value.startsWith("data:")) return value;
    return "/" + value.replace(/^\/+/, "");
};

// Format date helper
const formatDate = (dateString) => {
    if (!dateString) return "Date TBD";
    try {
        const date = new Date(dateString);
        if (isNaN(date.getTime())) return dateString;
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    } catch {
        return dateString;
    }
};

// Format time helper
const formatTime = (timeString) => {
    if (!timeString) return "Time TBD";
    try {
        if (timeString.includes(':')) {
            const [hours, minutes] = timeString.split(':');
            const hour = parseInt(hours);
            const ampm = hour >= 12 ? 'PM' : 'AM';
            const hour12 = hour % 12 || 12;
            return `${hour12}:${minutes} ${ampm}`;
        }
        return timeString;
    } catch {
        return timeString;
    }
};

export default function UpcomingEvents() {
    const [filter, setFilter] = useState("upcoming");
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch events from API
    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        setLoading(true);
        setError(null);
        try {
            // Fetch all events from the API
            const response = await axios.get('/api/events');
            console.log('API Response:', response.data);
            
            // Handle different response formats
            let eventsData = [];
            if (Array.isArray(response.data)) {
                eventsData = response.data;
            } else if (response.data?.data && Array.isArray(response.data.data)) {
                eventsData = response.data.data;
            } else {
                console.error('Unexpected API response format:', response.data);
                eventsData = [];
            }
            
            setEvents(eventsData);
        } catch (error) {
            console.error('Error fetching events:', error);
            setError('Failed to load events. Please try again later.');
            setEvents([]);
        } finally {
            setLoading(false);
        }
    };

    // Filter events based on status
    const filteredEvents = events.filter((event) => {
        // For "upcoming" tab: show ONLY upcoming events
        if (filter === "upcoming") {
            return event.status === "upcoming";
        }
        // For "past" tab: show completed events only
        if (filter === "past") {
            return event.status === "completed";
        }
        return true;
    });

    // Sort events by date (upcoming: ascending, past: descending)
    const sortedEvents = [...filteredEvents].sort((a, b) => {
        if (filter === "upcoming") {
            return new Date(a.date) - new Date(b.date);
        } else {
            return new Date(b.date) - new Date(a.date);
        }
    });

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
            transition: { type: "spring", stiffness: 100, damping: 12 },
        },
        exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2 } },
    };

    // Get the appropriate badge color and text based on status
    const getBadgeInfo = (status) => {
        switch (status) {
            case 'upcoming':
                return { color: 'bg-blue-600', text: 'Upcoming' };
            case 'active':
                return { color: 'bg-emerald-600', text: 'Active Now' };
            case 'completed':
                return { color: 'bg-gray-500', text: 'Completed' };
            case 'cancelled':
                return { color: 'bg-red-500', text: 'Cancelled' };
            default:
                return { color: 'bg-gray-500', text: status || 'Unknown' };
        }
    };

    // Get button info based on status
    const getButtonInfo = (status) => {
        switch (status) {
            case 'upcoming':
                return {
                    text: 'Register Now',
                    className: 'bg-[#0f5132] text-white hover:bg-[#0a3b24] hover:shadow-lg',
                    disabled: false,
                    link: true
                };
            case 'active':
                return {
                    text: 'Register',
                    className: 'bg-emerald-600 text-white hover:bg-emerald-700 hover:shadow-lg',
                    disabled: false,
                    link: true
                };
            case 'completed':
                return {
                    text: 'Event Ended',
                    className: 'bg-gray-100 text-gray-400 border border-gray-200 cursor-not-allowed',
                    disabled: true,
                    link: false
                };
            case 'cancelled':
                return {
                    text: 'Event Cancelled',
                    className: 'bg-gray-100 text-gray-400 border border-gray-200 cursor-not-allowed',
                    disabled: true,
                    link: false
                };
            default:
                return {
                    text: 'Register',
                    className: 'bg-[#0f5132] text-white hover:bg-[#0a3b24] hover:shadow-lg',
                    disabled: false,
                    link: true
                };
        }
    };

    return (
        <MainLayout
            maxWidth="full"
            containerClassName="px-0"
            mainClassName="py-0"
            className="overflow-hidden pb-0"
        >
            {/* Banner */}
            <div
                className="relative w-full bg-cover bg-center bg-no-repeat shadow-lg min-h-[350px] md:min-h-[450px] lg:min-h-[550px] flex items-center justify-center"
                style={{
                    backgroundImage: `url(${UpcomingEventsBanner})`,
                }}
            >
                <div className="absolute inset-0 bg-black/50"></div>
                <AnimatedBannerText
                    title="Upcoming Events"
                    description="Stay informed about the latest activities, assemblies, and academic schedules."
                />
            </div>

            {/* MAIN CONTENT AREA */}
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12 md:py-16">
                {/* Filter Tabs */}
                <div className="flex justify-start gap-4 mb-12">
                    <button
                        onClick={() => setFilter("upcoming")}
                        className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 ${
                            filter === "upcoming"
                                ? "bg-white text-[#0f5132] border-2 border-[#0f5132] shadow-md"
                                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                        }`}
                    >
                        Upcoming Events
                    </button>
                    <button
                        onClick={() => setFilter("past")}
                        className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 ${
                            filter === "past"
                                ? "bg-white text-[#0f5132] border-2 border-[#0f5132] shadow-md"
                                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                        }`}
                    >
                        Past Events
                    </button>
                </div>

                {/* Loading State */}
                {loading && (
                    <div className="flex justify-center items-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0f5132]"></div>
                        <span className="ml-3 text-gray-600">Loading events...</span>
                    </div>
                )}

                {/* Error State */}
                {error && (
                    <div className="text-center py-20 text-red-500">
                        <svg className="w-16 h-16 mx-auto text-red-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <p className="text-xl font-medium">{error}</p>
                        <button 
                            onClick={fetchEvents}
                            className="mt-4 px-6 py-2 bg-[#0f5132] text-white rounded-lg hover:bg-[#0a3b24] transition-colors"
                        >
                            Try Again
                        </button>
                    </div>
                )}

                {/* Event Cards Grid */}
                {!loading && !error && (
                    <>
                        {sortedEvents.length > 0 ? (
                            <motion.div
                                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                                variants={containerVariants}
                                initial="hidden"
                                animate="visible"
                                key={filter}
                            >
                                <AnimatePresence mode="wait">
                                    {sortedEvents.map((event) => {
                                        const imageSrc = normalizeImagePath(
                                            event.banner_image_url || event.image
                                        );
                                        const badgeInfo = getBadgeInfo(event.status);
                                        const buttonInfo = getButtonInfo(event.status);

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
                                                        alt={event.title || 'Event image'}
                                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                        onError={(e) => {
                                                            e.target.src = "https://placehold.co/600x400/e5e7eb/a3a3a3?text=Image+Unavailable";
                                                        }}
                                                    />
                                                    <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent pointer-events-none"></div>

                                                    {/* Status Badge */}
                                                    <div
                                                        className={`absolute top-4 right-4 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-white shadow-md border-2 border-white ${badgeInfo.color}`}
                                                    >
                                                        {badgeInfo.text}
                                                    </div>
                                                </div>

                                                {/* Card Content */}
                                                <div className="p-6 flex flex-col flex-1">
                                                    <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 leading-tight group-hover:text-[#0f5132] transition-colors">
                                                        {event.title || 'Untitled Event'}
                                                    </h3>

                                                    <p className="text-sm text-gray-600 leading-relaxed mb-4 line-clamp-3 flex-1">
                                                        {event.description || 'No description available.'}
                                                    </p>

                                                    {/* Date, Time, Location */}
                                                    <div className="space-y-2.5 mb-6 border-t border-gray-100 pt-4">
                                                        <div className="flex items-center gap-3 text-xs text-gray-500">
                                                            <svg
                                                                className="w-4 h-4 text-[#0f5132] flex-shrink-0"
                                                                fill="none"
                                                                stroke="currentColor"
                                                                viewBox="0 0 24 24"
                                                            >
                                                                <path
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    strokeWidth="2"
                                                                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                                                />
                                                            </svg>
                                                            <span className="truncate">
                                                                {formatDate(event.date)}
                                                            </span>
                                                        </div>
                                                        <div className="flex items-center gap-3 text-xs text-gray-500">
                                                            <svg
                                                                className="w-4 h-4 text-[#0f5132] flex-shrink-0"
                                                                fill="none"
                                                                stroke="currentColor"
                                                                viewBox="0 0 24 24"
                                                            >
                                                                <path
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    strokeWidth="2"
                                                                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                                                />
                                                            </svg>
                                                            <span className="truncate">
                                                                {formatTime(event.time)}
                                                            </span>
                                                        </div>
                                                        <div className="flex items-center gap-3 text-xs text-gray-500">
                                                            <svg
                                                                className="w-4 h-4 text-[#0f5132] flex-shrink-0"
                                                                fill="none"
                                                                stroke="currentColor"
                                                                viewBox="0 0 24 24"
                                                            >
                                                                <path
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    strokeWidth="2"
                                                                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                                                />
                                                                <path
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    strokeWidth="2"
                                                                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                                                />
                                                            </svg>
                                                            <span className="truncate">
                                                                {event.location || 'Location TBD'}
                                                            </span>
                                                        </div>
                                                        {/* Department (optional) */}
                                                        {event.department && (
                                                            <div className="flex items-center gap-3 text-xs text-gray-500">
                                                                <svg
                                                                    className="w-4 h-4 text-[#0f5132] flex-shrink-0"
                                                                    fill="none"
                                                                    stroke="currentColor"
                                                                    viewBox="0 0 24 24"
                                                                >
                                                                    <path
                                                                        strokeLinecap="round"
                                                                        strokeLinejoin="round"
                                                                        strokeWidth="2"
                                                                        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                                                                    />
                                                                </svg>
                                                                <span className="truncate">
                                                                    {event.department}
                                                                </span>
                                                            </div>
                                                        )}
                                                    </div>

                                                    {/* Action Button - Using Inertia Link */}
                                                    {buttonInfo.link ? (
                                                        <Link
                                                            href={`/events/${event.id}`}
                                                            className={`w-full py-3 text-sm font-bold rounded-xl transition-all duration-300 mt-auto text-center block ${buttonInfo.className}`}
                                                        >
                                                            {buttonInfo.text}
                                                        </Link>
                                                    ) : (
                                                        <button 
                                                            className={`w-full py-3 text-sm font-bold rounded-xl transition-all duration-300 mt-auto ${buttonInfo.className}`}
                                                            disabled={buttonInfo.disabled}
                                                        >
                                                            {buttonInfo.text}
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
                                <svg className="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                <p className="text-xl font-medium mb-2">
                                    No {filter} events found
                                </p>
                                <p className="text-base">
                                    {filter === 'upcoming' 
                                        ? 'Check back later for upcoming events.' 
                                        : 'No completed events to display.'}
                                </p>
                            </div>
                        )}
                    </>
                )}
            </div>
        </MainLayout>
    );
}