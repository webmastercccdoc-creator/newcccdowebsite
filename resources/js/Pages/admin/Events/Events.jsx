import { useState, useEffect, useRef } from 'react';
import AdminLayout from '../../../layouts/AdminLayout';
import axios from 'axios';
import { ConfirmModal } from '@/components/admin/Modal';
import AddEvent from './AddEvent';
import EditEvent from './EditEvent';
import ParticipantsModal from './ParticipantsModal';

export default function Events() {
    const [events, setEvents] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5; // Changed to match the 5 items per page in the image

    // Search and filter states
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');

    // Modal states
    const [showAddModal, setShowAddModal] = useState(false);
    const [editingEvent, setEditingEvent] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [eventToDelete, setEventToDelete] = useState(null);
    const [isDeleting, setIsDeleting] = useState(false);

    // Status toggle states
    const [showStatusModal, setShowStatusModal] = useState(false);
    const [eventToToggle, setEventToToggle] = useState(null);
    const [isToggling, setIsToggling] = useState(false);

    // Participants modal states
    const [showParticipantsModal, setShowParticipantsModal] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [participants, setParticipants] = useState([]);
    const [isLoadingParticipants, setIsLoadingParticipants] = useState(false);
    const [participantStats, setParticipantStats] = useState(null);

    // Permissions state
    const [userPermissions, setUserPermissions] = useState([]);

    // Dropdown state
    const [openDropdownId, setOpenDropdownId] = useState(null);

    useEffect(() => {
        document.title = "Events - City College of Cagayan de Oro";
        fetchEvents();
        fetchUserPermissions();

        // Close dropdown when clicking outside
        const handleClickOutside = () => setOpenDropdownId(null);
        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, []);

    const fetchUserPermissions = async () => {
        try {
            const response = await axios.get('/user/permissions');
            if (response.data?.user?.permissions) {
                setUserPermissions(response.data.user.permissions);
            }
        } catch (error) {
            console.error('Failed to fetch user permissions:', error);
            setUserPermissions([]);
        }
    };

    const fetchEvents = async () => {
        try {
            const response = await axios.get('/api/events');
            setEvents(Array.isArray(response.data) ? response.data : []);
        } catch (error) {
            console.error('Error fetching events:', error);
            setEvents([]);
        }
    };

    // Fetch participants for an event
    const fetchParticipants = async (eventId) => {
        setIsLoadingParticipants(true);
        try {
            const response = await axios.get(`/admin/events/${eventId}/participants`);
            setParticipants(response.data?.data || []);
        } catch (error) {
            console.error('Error fetching participants:', error);
            alert(error.response?.data?.message || 'Failed to fetch participants');
            setParticipants([]);
        } finally {
            setIsLoadingParticipants(false);
        }
    };

    // Fetch participant statistics
    const fetchParticipantStats = async (eventId) => {
        try {
            const response = await axios.get(`/admin/events/${eventId}/participants/stats`);
            if (response.data?.success) {
                setParticipantStats(response.data.data);
            }
        } catch (error) {
            console.error('Error fetching participant stats:', error);
            setParticipantStats(null);
        }
    };

    // Handle opening participants modal
    const handleViewParticipants = async (event) => {
        setOpenDropdownId(null);
        setSelectedEvent(event);
        await Promise.all([
            fetchParticipants(event.id),
            fetchParticipantStats(event.id)
        ]);
        setShowParticipantsModal(true);
    };

    // Handle adding a participant
    const handleAddParticipant = async (participantData) => {
        try {
            const response = await axios.post(`/admin/events/${selectedEvent.id}/participants`, participantData);
            if (response.status === 201 || response.data?.success) {
                await Promise.all([
                    fetchParticipants(selectedEvent.id),
                    fetchParticipantStats(selectedEvent.id)
                ]);
                alert('Participant added successfully.');
                return true;
            }
        } catch (error) {
            console.error('Error adding participant:', error);
            alert(error.response?.data?.message || 'Failed to add participant');
            return false;
        }
    };

    // Handle removing a participant
    const handleRemoveParticipant = async (participantId) => {
        if (!confirm('Are you sure you want to remove this participant?')) return;

        try {
            const response = await axios.delete(`/admin/events/${selectedEvent.id}/participants/${participantId}`);
            if (response.status === 200 || response.data?.success) {
                await Promise.all([
                    fetchParticipants(selectedEvent.id),
                    fetchParticipantStats(selectedEvent.id)
                ]);
                alert('Participant removed successfully.');
                return true;
            }
        } catch (error) {
            console.error('Error removing participant:', error);
            alert(error.response?.data?.message || 'Failed to remove participant');
            return false;
        }
    };

    // Handle updating participant status
    const handleUpdateParticipantStatus = async (participantId, status) => {
        try {
            const response = await axios.put(`/admin/events/${selectedEvent.id}/participants/${participantId}/status`, {
                status: status
            });
            if (response.status === 200 || response.data?.success) {
                await Promise.all([
                    fetchParticipants(selectedEvent.id),
                    fetchParticipantStats(selectedEvent.id)
                ]);
                alert('Participant status updated successfully.');
                return true;
            }
        } catch (error) {
            console.error('Error updating participant:', error);
            alert(error.response?.data?.message || 'Failed to update participant status');
            return false;
        }
    };

    // Handle export participants
    const handleExportParticipants = async () => {
        try {
            window.open(`/admin/events/${selectedEvent.id}/participants/export`, '_blank');
        } catch (error) {
            console.error('Error exporting participants:', error);
            alert('Failed to export participants');
        }
    };

    // Permission check helper
    const hasPermission = (permission) => {
        return userPermissions.includes(permission);
    };

    // Filter events based on search and filters
    const filteredEvents = events.filter(event => {
        const matchesSearch = 
            event.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            event.location?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            event.department?.toLowerCase().includes(searchQuery.toLowerCase());
        
        const matchesStatus = statusFilter === 'all' || event.status === statusFilter;
        
        return matchesSearch && matchesStatus;
    });

    // Calculate pagination
    const totalPages = Math.ceil(filteredEvents.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentEvents = filteredEvents.slice(startIndex, endIndex);

    const getStatusBadge = (status) => {
        if (status === 'active') {
            return (
                <span className="inline-flex items-center gap-1.5 rounded-md bg-[#e6f4ea] px-3 py-1 text-xs font-medium text-[#1e8e3e]">
                    <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Active
                </span>
            );
        } else if (status === 'upcoming') {
            return (
                <span className="inline-flex items-center gap-1.5 rounded-md bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
                    <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                    </svg>
                    Upcoming
                </span>
            );
        } else if (status === 'cancelled') {
            return (
                <span className="inline-flex items-center gap-1.5 rounded-md bg-red-50 px-3 py-1 text-xs font-medium text-red-700">
                    <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                    Cancelled
                </span>
            );
        } else {
            return (
                <span className="inline-flex items-center gap-1.5 rounded-md bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700">
                    {status || 'Unknown'}
                </span>
            );
        }
    };

    const handleAddNew = () => {
        setEditingEvent(null);
        setShowAddModal(true);
    };

    const handleEdit = (event) => {
        setOpenDropdownId(null);
        setEditingEvent(event);
        setShowAddModal(false);
    };

    const handleDelete = (id) => {
        setOpenDropdownId(null);
        setEventToDelete(id);
        setShowDeleteModal(true);
    };

    const confirmDelete = async () => {
        if (!eventToDelete) return;

        setIsDeleting(true);
        try {
            await axios.delete(`/admin/events/${eventToDelete}`);
            setShowDeleteModal(false);
            setEventToDelete(null);
            fetchEvents();
            alert('Event deleted successfully.');
        } catch (error) {
            console.error('Failed to delete event:', error);
            alert(error.response?.data?.message || 'Failed to delete event');
        } finally {
            setIsDeleting(false);
        }
    };

    const handleToggleStatus = (event) => {
        setOpenDropdownId(null);
        setEventToToggle(event);
        setShowStatusModal(true);
    };

    const confirmToggleStatus = async () => {
        if (!eventToToggle) return;

        setIsToggling(true);
        try {
            const newStatus = eventToToggle.status === 'active' ? 'cancelled' : 'active';
            const response = await axios.put(`/admin/events/${eventToToggle.id}/status`, {
                status: newStatus
            });

            if (response.status === 200 || response.data?.success) {
                setEvents(prevEvents =>
                    prevEvents.map(event =>
                        event.id === eventToToggle.id
                            ? { ...event, status: response.data.event?.status || newStatus }
                            : event
                    )
                );
                setShowStatusModal(false);
                setEventToToggle(null);
                alert(response.data?.message || `Event ${newStatus === 'active' ? 'activated' : 'cancelled'} successfully.`);
            }
        } catch (error) {
            console.error('Failed to toggle event status:', error);
            alert(error.response?.data?.message || 'Failed to update event status');
        } finally {
            setIsToggling(false);
        }
    };

    const handleEventCreated = () => {
        setCurrentPage(1);
        fetchEvents();
    };

    const handleEventUpdated = () => {
        setCurrentPage(1);
        fetchEvents();
        setEditingEvent(null);
    };

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const handleFilterChange = (setter, value) => {
        setter(value);
        setCurrentPage(1);
    };

    const getPageNumbers = () => {
        const pages = [];
        const maxVisible = 5;
        let start = Math.max(1, currentPage - 2);
        let end = Math.min(totalPages, start + maxVisible - 1);
        
        if (end - start < maxVisible - 1) {
            start = Math.max(1, end - maxVisible + 1);
        }
        
        for (let i = start; i <= end; i++) {
            pages.push(i);
        }
        return pages;
    };

    const getContentPreview = (content) => {
        if (!content) return 'No content available';
        const plainText = content.replace(/<[^>]*>/g, '');
        const preview = plainText.substring(0, 100);
        return preview.length < plainText.length ? preview + '...' : preview;
    };

    const formatDate = (dateString) => {
        if (!dateString) return '';
        try {
            const date = new Date(dateString);
            if (isNaN(date.getTime())) return dateString;
            return date.toISOString().split('T')[0];
        } catch {
            return dateString;
        }
    };

    const formatTime = (timeString) => {
        if (!timeString) return '';
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

    const getToggleButtonInfo = (status) => {
        if (status === 'active') {
            return { text: 'Cancel Event', icon: <svg className="w-4 h-4 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg> };
        } else if (status === 'cancelled') {
            return { text: 'Activate Event', icon: <svg className="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg> };
        }
        return null;
    };

    return (
        <AdminLayout title="Events Management">
            <div className="space-y-6">
                
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <p className="text-sm text-gray-600">Manage all events</p>
                        <p className="text-xs text-gray-500 mt-1">Create, edit, and manage events</p>
                    </div>
                    {hasPermission('events') && (
                        <button
                            onClick={handleAddNew}
                            className="mt-3 sm:mt-0 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 shadow-sm w-fit"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                            Create New Event
                        </button>
                    )}
                </div>

                {/* Main Container */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    
                    {/* Search & Filter */}
                    <div className="border-b border-gray-200 p-4">
                        <div className="flex flex-col md:flex-row gap-4">
                            <div className="md:w-96 relative flex-shrink-0">
                                <svg 
                                    className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
                                    fill="none" 
                                    stroke="currentColor" 
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                                <input
                                    type="text"
                                    placeholder="Search events by title, location, or department..."
                                    value={searchQuery}
                                    onChange={(e) => handleFilterChange(setSearchQuery, e.target.value)}
                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none text-sm bg-white"
                                />
                                {searchQuery && (
                                    <button
                                        onClick={() => handleFilterChange(setSearchQuery, '')}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                )}
                            </div>

                            <div className="flex-1 flex flex-wrap gap-4">
                                <select
                                    value={statusFilter}
                                    onChange={(e) => handleFilterChange(setStatusFilter, e.target.value)}
                                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none text-sm bg-white min-w-[130px]"
                                >
                                    <option value="all">All Status</option>
                                    <option value="active">Active</option>
                                    <option value="upcoming">Upcoming</option>
                                    <option value="completed">Completed</option>
                                    <option value="cancelled">Cancelled</option>
                                </select>

                                {(searchQuery || statusFilter !== 'all') && (
                                    <button
                                        onClick={() => {
                                            setSearchQuery('');
                                            setStatusFilter('all');
                                            setCurrentPage(1);
                                        }}
                                        className="px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors flex items-center gap-2 border border-gray-300 bg-white"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                        </svg>
                                        Clear
                                    </button>
                                )}
                            </div>
                        </div>
                        <div className="mt-3 text-sm text-gray-600">
                            Found <span className="font-medium text-gray-800">{filteredEvents.length}</span> event{filteredEvents.length !== 1 ? 's' : ''}
                            {searchQuery && <span> matching "<span className="font-medium text-gray-800">{searchQuery}</span>"</span>}
                            {statusFilter !== 'all' && <span> with status <span className="font-medium text-gray-800">{statusFilter}</span></span>}
                        </div>
                    </div>

                    {/* Table */}
                    <div className="w-full overflow-visible">
                        <table className="w-full text-left border-collapse table-fixed">
                            <thead className="bg-[#f8f9fa] border-b border-gray-200">
                                <tr>
                                    <th className="w-[6%] px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">#</th>
                                    <th className="w-[34%] px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Title & Content</th>
                                    <th className="w-[15%] px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Location / Dept</th>
                                    <th className="w-[12%] px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Date</th>
                                    <th className="w-[13%] px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                                    <th className="w-[20%] px-6 py-4 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {currentEvents.length > 0 ? (
                                    currentEvents.map((event, index) => {
                                        const toggleInfo = getToggleButtonInfo(event.status);
                                        const rowNumber = startIndex + index + 1;

                                        return (
                                            <tr 
                                                key={event.id} 
                                                className="transition-colors hover:bg-gray-50 bg-white"
                                            >
                                                <td className="px-6 py-4 text-sm font-medium text-gray-500">
                                                    {String(rowNumber).padStart(2, '0')}
                                                </td>
                                                
                                                <td className="px-6 py-4">
                                                    <div className="flex flex-col gap-1">
                                                        <span className="font-semibold text-gray-900 text-sm break-words" title={event.title}>
                                                            {event.title}
                                                        </span>
                                                        <p className="text-xs text-gray-500 line-clamp-2">
                                                            {getContentPreview(event.description)}
                                                        </p>
                                                    </div>
                                                </td>

                                                <td className="px-6 py-4">
                                                    <div className="flex flex-col gap-0.5 text-sm text-gray-600">
                                                        <span className="font-medium">{event.location || '—'}</span>
                                                        <span className="text-xs text-gray-400">{event.department || 'N/A'}</span>
                                                    </div>
                                                </td>

                                                <td className="px-6 py-4">
                                                    <div className="flex flex-col gap-0.5 text-sm text-gray-600">
                                                        <span className="whitespace-nowrap">{formatDate(event.date)}</span>
                                                        <span className="text-xs text-gray-500 whitespace-nowrap">{event.time ? formatTime(event.time) : ''}</span>
                                                    </div>
                                                </td>

                                                <td className="px-6 py-4">
                                                    {getStatusBadge(event.status)}
                                                </td>

                                                <td className="px-6 py-4 text-center">
                                                    <div className="flex items-center justify-center gap-2">
                                                        {/* View Button (Opens Participants) */}
                                                        {hasPermission('events') && (
                                                            <button
                                                                onClick={() => handleViewParticipants(event)}
                                                                className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50 hover:text-gray-900"
                                                            >
                                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                                </svg>
                                                                View
                                                            </button>
                                                        )}

                                                        {/* More Dropdown */}
                                                        <div className="relative">
                                                            <button
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    setOpenDropdownId(openDropdownId === event.id ? null : event.id);
                                                                }}
                                                                className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50 hover:text-gray-900"
                                                            >
                                                                More
                                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                                </svg>
                                                            </button>

                                                            {/* Dropdown Menu */}
                                                            {openDropdownId === event.id && (
                                                                <div 
                                                                    className="absolute right-0 mt-1 w-48 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 z-50 focus:outline-none"
                                                                    onClick={(e) => e.stopPropagation()}
                                                                >
                                                                    <div className="py-1" role="menu">
                                                                        
                                                                        {/* Edit */}
                                                                        {hasPermission('events') && (
                                                                            <button
                                                                                onClick={() => handleEdit(event)}
                                                                                className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                                                role="menuitem"
                                                                            >
                                                                                <svg className="mr-3 h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                                                </svg>
                                                                                Edit Event
                                                                            </button>
                                                                        )}

                                                                        {/* Toggle Status */}
                                                                        {hasPermission('events') && toggleInfo && (event.status === 'active' || event.status === 'cancelled') && (
                                                                            <button
                                                                                onClick={() => handleToggleStatus(event)}
                                                                                className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                                                role="menuitem"
                                                                            >
                                                                                <div className="mr-3">
                                                                                    {toggleInfo.icon}
                                                                                </div>
                                                                                {toggleInfo.text}
                                                                            </button>
                                                                        )}

                                                                        {/* Delete */}
                                                                        {hasPermission('user_management') && (
                                                                            <>
                                                                                <div className="border-t border-gray-100 my-1"></div>
                                                                                <button
                                                                                    onClick={() => handleDelete(event.id)}
                                                                                    className="flex w-full items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                                                                                    role="menuitem"
                                                                                >
                                                                                    <svg className="mr-3 h-4 w-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                                                    </svg>
                                                                                    Delete Event
                                                                                </button>
                                                                            </>
                                                                        )}
                                                                    </div>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })
                                ) : (
                                    <tr>
                                        <td colSpan="6" className="py-12 text-center bg-white">
                                            <div className="flex flex-col items-center justify-center">
                                                <svg className="w-16 h-16 text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                </svg>
                                                <p className="text-gray-500 font-medium">No events found</p>
                                                <p className="text-gray-400 text-sm mt-1">
                                                    {searchQuery || statusFilter !== 'all'
                                                        ? 'Try adjusting your search or filters'
                                                        : 'No events available.'}
                                                </p>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    {filteredEvents.length > 0 && (
                        <div className="px-6 py-4 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between bg-white gap-4 rounded-b-xl">
                            <div className="text-sm text-gray-500">
                                Showing <span className="font-medium text-gray-900">{filteredEvents.length > 0 ? startIndex + 1 : 0}</span> to{' '}
                                <span className="font-medium text-gray-900">{Math.min(endIndex, filteredEvents.length)}</span> of{' '}
                                <span className="font-medium text-gray-900">{filteredEvents.length}</span> events
                            </div>
                            
                            <div className="flex items-center gap-1">
                                <button
                                    onClick={() => handlePageChange(currentPage - 1)}
                                    disabled={currentPage === 1}
                                    className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                    </svg>
                                    Previous
                                </button>
                                
                                <div className="flex gap-1 mx-2">
                                    {getPageNumbers().map((page) => (
                                        <button
                                            key={page}
                                            onClick={() => handlePageChange(page)}
                                            className={`w-9 h-9 flex items-center justify-center text-sm font-medium rounded-lg transition-colors ${
                                                currentPage === page
                                                    ? 'bg-[#2c3e50] text-white border border-[#2c3e50]'
                                                    : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                                            }`}
                                        >
                                            {page}
                                        </button>
                                    ))}
                                </div>

                                <button
                                    onClick={() => handlePageChange(currentPage + 1)}
                                    disabled={currentPage === totalPages}
                                    className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                >
                                    Next
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Modals */}
            <AddEvent
                isOpen={showAddModal}
                onClose={() => {
                    setShowAddModal(false);
                    setEditingEvent(null);
                }}
                onCreated={handleEventCreated}
            />

            <EditEvent
                isOpen={Boolean(editingEvent) && !showAddModal}
                onClose={() => setEditingEvent(null)}
                onUpdated={handleEventUpdated}
                eventId={editingEvent?.id}
            />

            <ConfirmModal
                isOpen={showStatusModal}
                onClose={() => {
                    setShowStatusModal(false);
                    setEventToToggle(null);
                }}
                onConfirm={confirmToggleStatus}
                title={eventToToggle?.status === 'active' ? "Cancel Event" : "Activate Event"}
                message={
                    eventToToggle?.status === 'active'
                        ? `Are you sure you want to cancel "${eventToToggle?.title}"? This event will no longer be visible on the website.`
                        : `Are you sure you want to activate "${eventToToggle?.title}"? This event will become visible on the website.`
                }
                confirmText={eventToToggle?.status === 'active' ? "Cancel" : "Activate"}
                cancelText="Cancel"
                confirmColor={eventToToggle?.status === 'active' ? "bg-orange-500 hover:bg-orange-600" : "bg-emerald-600 hover:bg-emerald-700"}
                loading={isToggling}
            />

            <ConfirmModal
                isOpen={showDeleteModal}
                onClose={() => {
                    setShowDeleteModal(false);
                    setEventToDelete(null);
                }}
                onConfirm={confirmDelete}
                title="Delete Event"
                message="Are you sure you want to delete this event? This action cannot be undone."
                confirmText="Delete"
                cancelText="Cancel"
                confirmColor="bg-red-600 hover:bg-red-700"
                loading={isDeleting}
            />

            <ParticipantsModal
                isOpen={showParticipantsModal}
                onClose={() => {
                    setShowParticipantsModal(false);
                    setSelectedEvent(null);
                    setParticipants([]);
                    setParticipantStats(null);
                }}
                event={selectedEvent}
                participants={participants}
                stats={participantStats}
                isLoading={isLoadingParticipants}
                onAddParticipant={handleAddParticipant}
                onRemoveParticipant={handleRemoveParticipant}
                onUpdateStatus={handleUpdateParticipantStatus}
                onExport={handleExportParticipants}
                hasPermission={hasPermission('events')}
                eventId={selectedEvent?.id}
            />
        </AdminLayout>
    );
}