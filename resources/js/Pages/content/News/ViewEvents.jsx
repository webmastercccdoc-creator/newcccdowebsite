import { useState, useEffect } from "react";
import { Link, usePage } from "@inertiajs/react";
import MainLayout from "../../../layouts/MainLayout";
import axios from "axios";
import { motion } from "framer-motion";

export default function ViewEvents() {
    const { props } = usePage();
    const id = props.id;
    
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [registrationSuccess, setRegistrationSuccess] = useState(false);
    const [showShareTooltip, setShowShareTooltip] = useState(false);
    
    // Registration form state
    const [formData, setFormData] = useState({
        full_name: '',
        email: '',
        phone: '',
        department: '',
        course: '',
    });

    // Department options
    const departments = [
        { value: 'COE', label: 'College of Education (COE)' },
        { value: 'CAS', label: 'College of Arts and Sciences (CAS)' },
        { value: 'CBM', label: 'College of Business and Management (CBM)' },
        { value: 'TSTI', label: 'Technical Skills and Technology Institute (TSTI)' },
        { value: 'NONE', label: 'None / Not Applicable' },
    ];

    // Social media follow links
    const socialLinks = {
        facebook: 'https://facebook.com/yourpage',
        twitter: 'https://twitter.com/yourpage',
        linkedin: 'https://linkedin.com/company/yourpage',
        youtube: 'https://youtube.com/yourpage',
        instagram: 'https://instagram.com/yourpage',
        tiktok: 'https://tiktok.com/@yourpage'
    };

    // Fetch event details
    useEffect(() => {
        if (id) {
            fetchEvent();
        }
    }, [id]);

    const fetchEvent = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get(`/api/events/${id}`);
            console.log('Event Details:', response.data);
            setEvent(response.data);
        } catch (error) {
            console.error('Error fetching event:', error);
            setError('Failed to load event details. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleRegistration = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        const participantData = {
            name: formData.full_name,
            email: formData.email,
            phone: formData.phone,
            department: formData.department === 'NONE' ? '' : formData.department,
            course: formData.course,
            role: 'participant',
            status: 'registered'
        };
        
        try {
            const response = await axios.post(`/admin/events/${id}/participants`, participantData);
            if (response.status === 201 && response.data?.success) {
                setRegistrationSuccess(true);
                setFormData({
                    full_name: '',
                    email: '',
                    phone: '',
                    department: '',
                    course: '',
                });
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        } catch (error) {
            console.error('Error registering:', error);
            alert(error.response?.data?.message || 'Failed to register. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    // Share functions
    const shareOnFacebook = () => {
        const url = window.location.href;
        window.open(
            `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
            '_blank',
            'width=600,height=400'
        );
    };

    const shareOnTwitter = () => {
        const url = window.location.href;
        const text = `Check out this event: ${event?.title}`;
        window.open(
            `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
            '_blank',
            'width=600,height=400'
        );
    };

    const shareOnLinkedIn = () => {
        const url = window.location.href;
        window.open(
            `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
            '_blank',
            'width=600,height=400'
        );
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(window.location.href).then(() => {
            setShowShareTooltip(true);
            setTimeout(() => setShowShareTooltip(false), 2000);
        });
    };

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

    const normalizeImagePath = (value) => {
        if (!value)
            return "https://placehold.co/1200x600/e5e7eb/a3a3a3?text=No+Image+Available";
        if (/^https?:\/\//i.test(value) || value.startsWith("data:")) return value;
        return "/" + value.replace(/^\/+/, "");
    };

    // Helper function to format content with proper paragraph spacing
    const formatContent = (content) => {
        if (!content) return 'No description available.';
        
        // If content already has HTML tags, return as is
        if (/<[a-z][\s\S]*>/i.test(content)) {
            return content;
        }
        
        // Split by newlines and wrap each paragraph
        const paragraphs = content.split('\n').filter(p => p.trim());
        if (paragraphs.length > 1) {
            return paragraphs.map(p => `<p class="mb-4">${p.trim()}</p>`).join('');
        }
        
        return `<p>${content}</p>`;
    };

    if (loading) {
        return (
            <MainLayout>
                <div className="flex justify-center items-center min-h-[400px]">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0f5132]"></div>
                    <span className="ml-3 text-gray-600">Loading event details...</span>
                </div>
            </MainLayout>
        );
    }

    if (error || !event) {
        return (
            <MainLayout>
                <div className="max-w-4xl mx-auto px-4 py-16 text-center">
                    <svg className="w-20 h-20 mx-auto text-red-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Event Not Found</h2>
                    <p className="text-gray-600 mb-6">{error || 'The event you are looking for does not exist.'}</p>
                    <Link 
                        href="/events" 
                        className="inline-block px-6 py-3 bg-[#0f5132] text-white rounded-lg hover:bg-[#0a3b24] transition-colors"
                    >
                        Back to Events
                    </Link>
                </div>
            </MainLayout>
        );
    }

    const imageSrc = normalizeImagePath(event.banner_image_url);
    const canRegister = event.status === 'upcoming' || event.status === 'active';

    // Format the description with proper paragraph spacing
    const formattedDescription = formatContent(event.description);

    return (
        <MainLayout>
            {/* Back Button */}
            <div className="max-w-5xl mx-auto px-4 pt-6">
                <button
                    onClick={() => window.history.back()}
                    className="inline-flex items-center gap-2 text-sm font-medium text-[#0f5132] hover:text-green-800 transition-colors group"
                >
                    <svg 
                        className="w-4 h-4 transition-transform group-hover:-translate-x-1" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                    </svg>
                    Back to Events
                </button>
            </div>

            {/* Event Details */}
            <div className="max-w-5xl mx-auto px-4 py-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100"
                >
                    {/* Event Image */}
                    <div className="relative w-full h-[400px] md:h-[500px] overflow-hidden bg-gray-100">
                        <img
                            src={imageSrc}
                            alt={event.title || 'Event image'}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                                e.target.src = "https://placehold.co/1200x600/e5e7eb/a3a3a3?text=Image+Unavailable";
                            }}
                        />
                        <div className="absolute top-6 right-6">
                            <span className={`px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-wider text-white shadow-lg ${
                                event.status === 'upcoming' ? 'bg-blue-600' :
                                event.status === 'active' ? 'bg-emerald-600' :
                                event.status === 'completed' ? 'bg-gray-500' :
                                event.status === 'cancelled' ? 'bg-red-500' :
                                'bg-gray-500'
                            }`}>
                                {event.status || 'Unknown'}
                            </span>
                        </div>
                    </div>

                    {/* Event Content */}
                    <div className="p-6 md:p-8">
                        {/* Title */}
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            {event.title}
                        </h1>

                        {/* Share Buttons */}
                        <div className="flex items-center gap-3 mb-6 pb-6 border-b border-gray-200">
                            <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">
                                Share:
                            </span>
                            <button
                                onClick={shareOnFacebook}
                                className="w-8 h-8 rounded-full bg-[#1877f2] text-white flex items-center justify-center hover:scale-110 transition-all duration-200 hover:shadow-md"
                                aria-label="Share on Facebook"
                            >
                                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                                </svg>
                            </button>
                            <button
                                onClick={shareOnTwitter}
                                className="w-8 h-8 rounded-full bg-[#000000] text-white flex items-center justify-center hover:scale-110 transition-all duration-200 hover:shadow-md"
                                aria-label="Share on Twitter"
                            >
                                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                                </svg>
                            </button>
                            <button
                                onClick={shareOnLinkedIn}
                                className="w-8 h-8 rounded-full bg-[#0a66c2] text-white flex items-center justify-center hover:scale-110 transition-all duration-200 hover:shadow-md"
                                aria-label="Share on LinkedIn"
                            >
                                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                                </svg>
                            </button>
                            <div className="relative">
                                <button
                                    onClick={copyToClipboard}
                                    className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 text-gray-700 flex items-center justify-center hover:scale-110 transition-all duration-200 hover:shadow-md"
                                    aria-label="Copy link"
                                >
                                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                                    </svg>
                                </button>
                                {showShareTooltip && (
                                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded whitespace-nowrap">
                                        Link copied!
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Event Meta Info */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 p-4 bg-gray-50 rounded-xl">
                            <div className="flex items-center gap-3 text-sm text-gray-600">
                                <svg className="w-5 h-5 text-[#0f5132] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                <span><strong>Date:</strong> {formatDate(event.date)}</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm text-gray-600">
                                <svg className="w-5 h-5 text-[#0f5132] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span><strong>Time:</strong> {formatTime(event.time)}</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm text-gray-600">
                                <svg className="w-5 h-5 text-[#0f5132] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                <span><strong>Location:</strong> {event.location || 'Location TBD'}</span>
                            </div>
                            {event.department && (
                                <div className="flex items-center gap-3 text-sm text-gray-600">
                                    <svg className="w-5 h-5 text-[#0f5132] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                    </svg>
                                    <span><strong>Department:</strong> {event.department}</span>
                                </div>
                            )}
                        </div>

                        {/* Description - Fixed with proper spacing */}
                        <div className="prose prose-lg max-w-none mb-8">
                            <div 
                                dangerouslySetInnerHTML={{ 
                                    __html: formattedDescription
                                }} 
                                className="text-gray-700 leading-relaxed [&>p]:mb-4"
                            />
                        </div>

                        {/* Registration Form */}
                        {canRegister ? (
                            <div className="mt-8 border-t-2 border-gray-200 pt-8">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-1 h-8 bg-[#0f5132] rounded-full"></div>
                                    <h2 className="text-2xl font-bold text-gray-800">Register for this Event</h2>
                                </div>
                                
                                {registrationSuccess ? (
                                    <div className="bg-gradient-to-r from-emerald-50 to-emerald-100/50 border border-emerald-200 rounded-2xl p-8 text-center">
                                        <div className="w-20 h-20 mx-auto bg-emerald-500/10 rounded-full flex items-center justify-center mb-4">
                                            <svg className="w-10 h-10 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        </div>
                                        <h3 className="text-2xl font-bold text-emerald-800 mb-2">Registration Successful!</h3>
                                        <p className="text-emerald-700 max-w-md mx-auto">Thank you for registering for this event. We look forward to seeing you!</p>
                                        <button
                                            onClick={() => setRegistrationSuccess(false)}
                                            className="mt-6 px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-medium transition-all duration-200 shadow-md hover:shadow-lg"
                                        >
                                            Register Another Person
                                        </button>
                                    </div>
                                ) : (
                                    <form onSubmit={handleRegistration} className="space-y-5">
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                                                Full Name <span className="text-red-500">*</span>
                                            </label>
                                            <div className="relative">
                                                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                    </svg>
                                                </div>
                                                <input
                                                    type="text"
                                                    name="full_name"
                                                    required
                                                    value={formData.full_name}
                                                    onChange={handleInputChange}
                                                    className="w-full pl-10 pr-4 py-3.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0f5132] focus:border-transparent transition-all duration-200 bg-gray-50/50 hover:bg-white"
                                                    placeholder="Enter your full name"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                                                Email Address <span className="text-red-500">*</span>
                                            </label>
                                            <div className="relative">
                                                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                                    </svg>
                                                </div>
                                                <input
                                                    type="email"
                                                    name="email"
                                                    required
                                                    value={formData.email}
                                                    onChange={handleInputChange}
                                                    className="w-full pl-10 pr-4 py-3.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0f5132] focus:border-transparent transition-all duration-200 bg-gray-50/50 hover:bg-white"
                                                    placeholder="email@example.com"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                                                Phone Number
                                            </label>
                                            <div className="relative">
                                                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                                    </svg>
                                                </div>
                                                <input
                                                    type="tel"
                                                    name="phone"
                                                    value={formData.phone}
                                                    onChange={handleInputChange}
                                                    className="w-full pl-10 pr-4 py-3.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0f5132] focus:border-transparent transition-all duration-200 bg-gray-50/50 hover:bg-white"
                                                    placeholder="+63 912 345 6789"
                                                />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                                                    Department <span className="text-red-500">*</span>
                                                </label>
                                                <div className="relative">
                                                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                                        </svg>
                                                    </div>
                                                    <select
                                                        name="department"
                                                        required
                                                        value={formData.department}
                                                        onChange={handleInputChange}
                                                        className="w-full pl-10 pr-4 py-3.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0f5132] focus:border-transparent transition-all duration-200 bg-gray-50/50 hover:bg-white appearance-none"
                                                    >
                                                        <option value="">Select Department</option>
                                                        {departments.map((dept) => (
                                                            <option key={dept.value} value={dept.value}>
                                                                {dept.label}
                                                            </option>
                                                        ))}
                                                    </select>
                                                    <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                        </svg>
                                                    </div>
                                                </div>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                                                    Course/Program
                                                </label>
                                                <div className="relative">
                                                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                                        </svg>
                                                    </div>
                                                    <input
                                                        type="text"
                                                        name="course"
                                                        value={formData.course}
                                                        onChange={handleInputChange}
                                                        className="w-full pl-10 pr-4 py-3.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0f5132] focus:border-transparent transition-all duration-200 bg-gray-50/50 hover:bg-white"
                                                        placeholder="e.g., BSIT, BSA, BEEd"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="w-full md:w-auto px-10 py-3.5 bg-gradient-to-r from-[#0f5132] to-[#1a7a4a] text-white font-bold rounded-xl hover:from-[#0a3b24] hover:to-[#0f5132] transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 group"
                                        >
                                            {isSubmitting ? (
                                                <>
                                                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                    </svg>
                                                    Submitting...
                                                </>
                                            ) : (
                                                <>
                                                    Register Now
                                                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                                    </svg>
                                                </>
                                            )}
                                        </button>
                                    </form>
                                )}
                            </div>
                        ) : (
                            <div className="mt-8 border-t-2 border-gray-200 pt-8">
                                <div className="bg-gray-50 border border-gray-200 rounded-2xl p-8 text-center">
                                    <div className="w-20 h-20 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
                                        <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <h3 className="text-xl font-semibold text-gray-700 mb-2">Registration Closed</h3>
                                    <p className="text-gray-500 max-w-md mx-auto">
                                        {event.status === 'completed' 
                                            ? 'This event has already ended.' 
                                            : event.status === 'cancelled'
                                            ? 'This event has been cancelled.'
                                            : 'Registration is not available for this event.'}
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                </motion.div>

                {/* Follow Us Section */}
                <div className="mt-12 pt-8 border-t border-gray-200">
                    <div className="text-center">
                        <p className="text-sm font-medium text-gray-500 uppercase tracking-[0.15em] mb-4">
                            Follow Us
                        </p>
                        <div className="flex items-center justify-center gap-4 md:gap-6">
                            <a
                                href={socialLinks.facebook}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-11 h-11 rounded-full bg-[#1877f2] text-white flex items-center justify-center hover:scale-110 transition-transform duration-200 shadow-md hover:shadow-lg"
                                aria-label="Follow us on Facebook"
                            >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                                </svg>
                            </a>
                            <a
                                href={socialLinks.twitter}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-11 h-11 rounded-full bg-[#000000] text-white flex items-center justify-center hover:scale-110 transition-transform duration-200 shadow-md hover:shadow-lg"
                                aria-label="Follow us on Twitter"
                            >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                                </svg>
                            </a>
                            <a
                                href={socialLinks.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-11 h-11 rounded-full bg-[#0a66c2] text-white flex items-center justify-center hover:scale-110 transition-transform duration-200 shadow-md hover:shadow-lg"
                                aria-label="Follow us on LinkedIn"
                            >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                                </svg>
                            </a>
                            <a
                                href={socialLinks.youtube}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-11 h-11 rounded-full bg-[#ff0000] text-white flex items-center justify-center hover:scale-110 transition-transform duration-200 shadow-md hover:shadow-lg"
                                aria-label="Follow us on YouTube"
                            >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                                </svg>
                            </a>
                            <a
                                href={socialLinks.instagram}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-11 h-11 rounded-full bg-gradient-to-br from-[#f09433] via-[#e6683c] to-[#dc2743] text-white flex items-center justify-center hover:scale-110 transition-transform duration-200 shadow-md hover:shadow-lg"
                                aria-label="Follow us on Instagram"
                            >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
                                </svg>
                            </a>
                            <a
                                href={socialLinks.tiktok}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-11 h-11 rounded-full bg-[#000000] text-white flex items-center justify-center hover:scale-110 transition-transform duration-200 shadow-md hover:shadow-lg"
                                aria-label="Follow us on TikTok"
                            >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
                                </svg>
                            </a>
                        </div>
                        <p className="mt-3 text-xs text-gray-400">
                            Connect with us on social media
                        </p>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}