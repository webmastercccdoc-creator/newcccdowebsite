import { useState, useEffect } from 'react';
import AdminLayout from '../../../layouts/AdminLayout';
import axios from 'axios';
import { ConfirmModal } from '@/components/admin/Modal';
import AddEvent from './AddEvent';
import EditEvent from './EditEvent';
import ParticipantsModal from './ParticipantsModal';

export default function Events() {
    const [events, setEvents] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;

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

    // Complete event states
    const [showCompleteModal, setShowCompleteModal] = useState(false);
    const [eventToComplete, setEventToComplete] = useState(null);
    const [isCompleting, setIsCompleting] = useState(false);

    // Participants modal states
    const [showParticipantsModal, setShowParticipantsModal] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [participants, setParticipants] = useState([]);
    const [isLoadingParticipants, setIsLoadingParticipants] = useState(false);
    const [participantStats, setParticipantStats] = useState(null);

    // Permissions state
    const [userPermissions, setUserPermissions] = useState([]);

    useEffect(() => {
        document.title = "Events - City College of Cagayan de Oro";
        fetchEvents();
        fetchUserPermissions();
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
        const statusStyles = {
            'active': 'bg-emerald-100 text-emerald-700 border border-emerald-200',
            'upcoming': 'bg-blue-100 text-blue-700 border border-blue-200',
            'completed': 'bg-gray-100 text-gray-700 border border-gray-200',
            'cancelled': 'bg-red-100 text-red-700 border border-red-200'
        };
        return statusStyles[status] || 'bg-gray-100 text-gray-700 border border-gray-200';
    };

    const getStatusIcon = (status) => {
        const icons = {
            'active': (
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
            ),
            'upcoming': (
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-2a6 6 0 100-12 6 6 0 000 12zm-1-8a1 1 0 00-2 0v3a1 1 0 001 1h2a1 1 0 100-2h-1V8z" clipRule="evenodd" />
                </svg>
            ),
            'completed': (
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
            ),
            'cancelled': (
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l-1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
            )
        };
        return icons[status] || null;
    };

    const handleAddNew = () => {
        setEditingEvent(null);
        setShowAddModal(true);
    };

    const handleEdit = (event) => {
        setEditingEvent(event);
        setShowAddModal(false);
    };

    const handleDelete = (id) => {
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

    const handleComplete = (event) => {
        setEventToComplete(event);
        setShowCompleteModal(true);
    };

    const confirmComplete = async () => {
        if (!eventToComplete) return;

        setIsCompleting(true);
        try {
            const response = await axios.put(`/admin/events/${eventToComplete.id}/complete`);

            if (response.status === 200 && response.data?.success) {
                setEvents(prevEvents =>
                    prevEvents.map(event =>
                        event.id === eventToComplete.id
                            ? { ...event, status: 'completed' }
                            : event
                    )
                );
                setShowCompleteModal(false);
                setEventToComplete(null);
                alert(response.data?.message || 'Event marked as completed successfully.');
            }
        } catch (error) {
            console.error('Failed to complete event:', error);
            alert(error.response?.data?.message || 'Failed to mark event as completed');
        } finally {
            setIsCompleting(false);
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
            return {
                text: 'Cancel',
                icon: (
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                ),
                color: 'bg-orange-500 hover:bg-orange-600',
                modalMessage: 'This event will be cancelled and will no longer be visible on the website.'
            };
        } else if (status === 'cancelled') {
            return {
                text: 'Activate',
                icon: (
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                ),
                color: 'bg-emerald-600 hover:bg-emerald-700',
                modalMessage: 'This event will become visible on the website.'
            };
        }
        return null;
    };

    return (
        <AdminLayout title="Events Management">
            {/* Header with Create Event Button */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
                <div>
                    <p className="text-sm text-gray-600">
                        Manage all events
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                        Create, edit, and manage events
                    </p>
                </div>
                {hasPermission('events') && (
                    <button
                        onClick={handleAddNew}
                        className="mt-3 sm:mt-0 bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 shadow-md hover:shadow-lg"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        Create New Event
                    </button>
                )}
            </div>

            {/* Search and Filters */}
            <div className="bg-gray-100 border border-gray-200 shadow-sm p-4 mb-6">
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="md:w-80 relative flex-shrink-0">
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
                            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all outline-none text-sm bg-white"
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
                            className="px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all outline-none text-sm bg-white min-w-[130px]"
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
                                className="px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-200 rounded-lg transition-colors flex items-center gap-2 border border-gray-200 bg-white"
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
                    {filteredEvents.length === 0 ? (
                        <span>No events found matching your criteria</span>
                    ) : (
                        <span>
                            Found <span className="font-medium text-gray-800">{filteredEvents.length}</span> event{filteredEvents.length !== 1 ? 's' : ''}
                            {searchQuery && <span> matching "<span className="font-medium text-gray-800">{searchQuery}</span>"</span>}
                            {statusFilter !== 'all' && <span> with status <span className="font-medium text-gray-800">{statusFilter}</span></span>}
                        </span>
                    )}
                </div>
            </div>

            {/* Events Table */}
            <div className="bg-white border border-gray-200 shadow-lg overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="bg-gray-700 text-white">
                                <th className="text-left py-3 px-3 font-semibold text-xs uppercase tracking-wider border-r border-gray-600 w-[50px]">#</th>
                                <th className="text-left py-3 px-3 font-semibold text-xs uppercase tracking-wider border-r border-gray-600">Title</th>
                                <th className="text-left py-3 px-3 font-semibold text-xs uppercase tracking-wider border-r border-gray-600 w-[120px]">Location</th>
                                <th className="text-left py-3 px-3 font-semibold text-xs uppercase tracking-wider border-r border-gray-600 w-[110px]">Date</th>
                                <th className="text-left py-3 px-3 font-semibold text-xs uppercase tracking-wider border-r border-gray-600 w-[90px]">Time</th>
                                <th className="text-left py-3 px-3 font-semibold text-xs uppercase tracking-wider border-r border-gray-600 w-[100px]">Status</th>
                                <th className="text-center py-3 px-2 font-semibold text-xs uppercase tracking-wider w-[280px]">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {currentEvents.length > 0 ? (
                                currentEvents.map((event, index) => {
                                    const toggleInfo = getToggleButtonInfo(event.status);
                                    return (
                                        <tr 
                                            key={event.id} 
                                            className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-gray-200 transition-all duration-200`}
                                        >
                                            <td className="py-3 px-3 text-gray-500 text-xs font-medium border-r border-gray-200 text-center">
                                                {String(startIndex + index + 1).padStart(2, '0')}
                                            </td>
                                            <td className="py-3 px-3 border-r border-gray-200 max-w-[200px]">
                                                <div>
                                                    <span className="font-semibold text-gray-800 text-sm block truncate" title={event.title}>
                                                        {event.title}
                                                    </span>
                                                    <p className="text-xs text-gray-500 mt-0.5 truncate max-w-[180px]">
                                                        {getContentPreview(event.description)}
                                                    </p>
                                                </div>
                                            </td>
                                            <td className="py-3 px-3 text-gray-600 text-sm border-r border-gray-200 truncate max-w-[120px]">
                                                {event.location || '—'}
                                            </td>
                                            <td className="py-3 px-3 text-gray-600 text-sm border-r border-gray-200 whitespace-nowrap">
                                                {formatDate(event.date)}
                                            </td>
                                            <td className="py-3 px-3 text-gray-600 text-sm border-r border-gray-200 whitespace-nowrap">
                                                {event.time ? formatTime(event.time) : '—'}
                                            </td>
                                            <td className="py-3 px-3 border-r border-gray-200">
                                                <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium whitespace-nowrap ${getStatusBadge(event.status)}`}>
                                                    {getStatusIcon(event.status)}
                                                    {event.status}
                                                </span>
                                            </td>
                                            <td className="py-3 px-2">
                                                <div className="flex items-center justify-center gap-1 flex-nowrap">
                                                    {/* Participants Button */}
                                                    {hasPermission('events') && (
                                                        <button
                                                            onClick={() => handleViewParticipants(event)}
                                                            className="inline-flex items-center gap-0.5 px-2 py-1.5 text-xs font-medium text-white bg-cyan-600 hover:bg-cyan-700 rounded-lg transition-all shadow-sm hover:shadow whitespace-nowrap"
                                                            title="View and manage participants"
                                                        >
                                                            <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                                            </svg>
                                                            <span className="text-[10px]">Part.</span>
                                                        </button>
                                                    )}

                                                    {/* Complete Button */}
                                                    {hasPermission('events') && 
                                                     (event.status === 'active' || event.status === 'upcoming') && (
                                                        <button
                                                            onClick={() => handleComplete(event)}
                                                            className="inline-flex items-center gap-0.5 px-2 py-1.5 text-xs font-medium text-white bg-purple-600 hover:bg-purple-700 rounded-lg transition-all shadow-sm hover:shadow whitespace-nowrap"
                                                        >
                                                            <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                            </svg>
                                                            <span className="text-[10px]">Complete</span>
                                                        </button>
                                                    )}

                                                    {/* Toggle Status Button */}
                                                    {hasPermission('events') && 
                                                     toggleInfo && 
                                                     (event.status === 'active' || event.status === 'cancelled') && (
                                                        <button
                                                            onClick={() => handleToggleStatus(event)}
                                                            className={`inline-flex items-center gap-0.5 px-2 py-1.5 text-xs font-medium text-white rounded-lg transition-all shadow-sm hover:shadow whitespace-nowrap ${toggleInfo.color}`}
                                                        >
                                                            {toggleInfo.icon}
                                                            <span className="text-[10px]">{toggleInfo.text}</span>
                                                        </button>
                                                    )}

                                                    {/* Edit Button */}
                                                    {hasPermission('events') && (
                                                        <button
                                                            onClick={() => handleEdit(event)}
                                                            className="inline-flex items-center gap-0.5 px-2 py-1.5 text-xs font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-all shadow-sm hover:shadow whitespace-nowrap"
                                                        >
                                                            <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                            </svg>
                                                            <span className="text-[10px]">Edit</span>
                                                        </button>
                                                    )}

                                                    {/* Delete Button */}
                                                    {hasPermission('user_management') && (
                                                        <button
                                                            onClick={() => handleDelete(event.id)}
                                                            className="inline-flex items-center gap-0.5 px-2 py-1.5 text-xs font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition-all shadow-sm hover:shadow whitespace-nowrap"
                                                        >
                                                            <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                            </svg>
                                                            <span className="text-[10px]">Delete</span>
                                                        </button>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })
                            ) : (
                                <tr>
                                    <td colSpan="7" className="py-12 text-center bg-gray-50">
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
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-4 py-3 border-t border-gray-200 bg-gray-50">
                        <p className="text-sm text-gray-600">
                            Showing <span className="font-medium text-gray-800">{filteredEvents.length > 0 ? startIndex + 1 : 0}</span> to{' '}
                            <span className="font-medium text-gray-800">{Math.min(endIndex, filteredEvents.length)}</span> of{' '}
                            <span className="font-medium text-gray-800">{filteredEvents.length}</span> events
                        </p>
                        <div className="flex gap-1">
                            <button
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={currentPage === 1}
                                className="px-3 py-1.5 text-sm text-gray-600 border border-gray-300 rounded-lg hover:bg-white hover:border-gray-400 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1 bg-white"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                                Previous
                            </button>
                            
                            {getPageNumbers().map((page) => (
                                <button
                                    key={page}
                                    onClick={() => handlePageChange(page)}
                                    className={`px-3.5 py-1.5 text-sm rounded-lg transition-all ${
                                        currentPage === page
                                            ? 'bg-gray-700 text-white hover:bg-gray-800 shadow-sm'
                                            : 'text-gray-600 hover:bg-white border border-transparent hover:border-gray-300 bg-white'
                                    }`}
                                >
                                    {page}
                                </button>
                            ))}
                            
                            <button
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={currentPage === totalPages}
                                className="px-3 py-1.5 text-sm text-gray-600 border border-gray-300 rounded-lg hover:bg-white hover:border-gray-400 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1 bg-white"
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

            {/* Add Event Modal */}
            <AddEvent
                isOpen={showAddModal}
                onClose={() => {
                    setShowAddModal(false);
                    setEditingEvent(null);
                }}
                onCreated={handleEventCreated}
            />

            {/* Edit Event Modal */}
            <EditEvent
                isOpen={Boolean(editingEvent) && !showAddModal}
                onClose={() => setEditingEvent(null)}
                onUpdated={handleEventUpdated}
                eventId={editingEvent?.id}
            />

            {/* Status Toggle Confirmation Modal */}
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

            {/* Complete Confirmation Modal */}
            <ConfirmModal
                isOpen={showCompleteModal}
                onClose={() => {
                    setShowCompleteModal(false);
                    setEventToComplete(null);
                }}
                onConfirm={confirmComplete}
                title="Complete Event"
                message={`Are you sure you want to mark "${eventToComplete?.title}" as completed? This event will be moved to the completed status.`}
                confirmText="Complete"
                cancelText="Cancel"
                confirmColor="bg-purple-600 hover:bg-purple-700"
                loading={isCompleting}
            />

            {/* Delete Confirmation Modal */}
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

            {/* Participants Modal */}
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
            />
        </AdminLayout>
    );
}