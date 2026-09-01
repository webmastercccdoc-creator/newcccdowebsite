import { useState, useEffect } from 'react';
import Modal from '@/components/admin/Modal';
import { ConfirmModal } from '@/components/admin/Modal';
import axios from 'axios';

export default function ParticipantsModal({
    isOpen,
    onClose,
    event,
    participants = [],
    stats,
    isLoading,
    onAddParticipant,
    onRemoveParticipant,
    onUpdateStatus,
    onExport,
    hasPermission,
    eventId
}) {
    const [newParticipant, setNewParticipant] = useState({
        name: '',
        email: '',
        department: '',
        course: '',
        role: 'participant',
        status: 'registered',
        phone: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showRemoveConfirm, setShowRemoveConfirm] = useState(false);
    const [participantToRemove, setParticipantToRemove] = useState(null);
    const [editingParticipantId, setEditingParticipantId] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    // Department options
    const departments = [
        { value: 'COE', label: 'College of Education (COE)' },
        { value: 'CAS', label: 'College of Arts and Sciences (CAS)' },
        { value: 'CBM', label: 'College of Business and Management (CBM)' },
        { value: 'TSTI', label: 'Technical Skills and Technology Institute (TSTI)' },
        { value: 'NONE', label: 'None / Not Applicable' },
    ];

    // Reset form when modal closes
    useEffect(() => {
        if (!isOpen) {
            resetForm();
        }
    }, [isOpen]);

    const resetForm = () => {
        setNewParticipant({
            name: '',
            email: '',
            department: '',
            course: '',
            role: 'participant',
            status: 'registered',
            phone: '',
        });
        setIsEditing(false);
        setEditingParticipantId(null);
    };

    // Handle clicking on a participant row to edit
    const handleEditParticipant = (participant) => {
        setNewParticipant({
            name: participant.name || '',
            email: participant.email || '',
            department: participant.department || '',
            course: participant.course || '',
            role: participant.role || 'participant',
            status: participant.status || 'registered',
            phone: participant.phone || '',
        });
        setEditingParticipantId(participant.id);
        setIsEditing(true);
        // Scroll to form
        document.querySelector('.participant-form')?.scrollIntoView({ behavior: 'smooth' });
    };

    // Handle form submission (add or update)
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        const participantData = {
            name: newParticipant.name,
            email: newParticipant.email,
            department: newParticipant.department === 'NONE' ? '' : newParticipant.department,
            course: newParticipant.course,
            role: newParticipant.role,
            status: newParticipant.status,
            phone: newParticipant.phone,
        };

        try {
            let success;
            if (isEditing && editingParticipantId) {
                // Update existing participant
                const response = await axios.put(
                    `/admin/events/${eventId}/participants/${editingParticipantId}`,
                    participantData
                );
                success = response.status === 200 && response.data?.success;
                if (success) {
                    alert('Participant updated successfully.');
                    if (onAddParticipant) {
                        await onAddParticipant(participantData, true);
                    }
                }
            } else {
                success = await onAddParticipant(participantData);
            }

            if (success) {
                resetForm();
            }
        } catch (error) {
            console.error('Error saving participant:', error);
            alert(error.response?.data?.message || 'Failed to save participant');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleRemoveClick = (participant) => {
        setParticipantToRemove(participant);
        setShowRemoveConfirm(true);
    };

    const confirmRemove = async () => {
        if (participantToRemove) {
            await onRemoveParticipant(participantToRemove.id);
            setShowRemoveConfirm(false);
            setParticipantToRemove(null);
            if (editingParticipantId === participantToRemove.id) {
                resetForm();
            }
        }
    };

    const handleCancelEdit = () => {
        resetForm();
    };

    const getStatusBadge = (status) => {
        const styles = {
            'registered': 'bg-yellow-100 text-yellow-700 border border-yellow-200',
            'confirmed': 'bg-green-100 text-green-700 border border-green-200',
            'attended': 'bg-blue-100 text-blue-700 border border-blue-200',
            'no_show': 'bg-red-100 text-red-700 border border-red-200'
        };
        return styles[status] || 'bg-gray-100 text-gray-700 border border-gray-200';
    };

    const getRoleBadge = (role) => {
        const styles = {
            'participant': 'bg-gray-100 text-gray-700 border border-gray-200',
            'speaker': 'bg-purple-100 text-purple-700 border border-purple-200',
            'organizer': 'bg-orange-100 text-orange-700 border border-orange-200',
            'attendee': 'bg-blue-100 text-blue-700 border border-blue-200'
        };
        return styles[role] || 'bg-gray-100 text-gray-700 border border-gray-200';
    };

    // Ensure participants is always an array
    const participantsList = Array.isArray(participants) ? participants : [];

    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose} size="full">
                <div className="p-6">
                    {/* Header */}
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <h2 className="text-2xl font-semibold text-gray-800">
                                Participants - {event?.title || 'Event'}
                            </h2>
                            {stats && (
                                <div className="flex gap-4 mt-1 text-sm text-gray-600 flex-wrap">
                                    <span>Total: <strong className="text-gray-800">{stats.total || 0}</strong></span>
                                    <span>Registered: <strong className="text-yellow-600">{stats.registered || 0}</strong></span>
                                    <span>Confirmed: <strong className="text-green-600">{stats.confirmed || 0}</strong></span>
                                    <span>Attended: <strong className="text-blue-600">{stats.attended || 0}</strong></span>
                                    <span>No Show: <strong className="text-red-600">{stats.no_show || 0}</strong></span>
                                </div>
                            )}
                        </div>
                        <div className="flex gap-2 flex-shrink-0 ml-4">
                            {hasPermission && onExport && (
                                <button
                                    onClick={onExport}
                                    className="bg-green-600 hover:bg-green-700 text-white px-3 py-1.5 rounded-lg text-sm font-medium transition-colors flex items-center gap-1"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                    </svg>
                                    Export
                                </button>
                            )}
                            <button
                                onClick={onClose}
                                className="text-gray-400 hover:text-gray-600"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    {/* Add/Edit Participant Form - Always Visible */}
                    {hasPermission && (
                        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-4 participant-form">
                            <div className="flex justify-between items-center mb-3">
                                <h3 className="text-sm font-medium text-gray-700">
                                    {isEditing ? 'Edit Participant' : 'Add New Participant'}
                                </h3>
                                {isEditing && (
                                    <button
                                        type="button"
                                        onClick={handleCancelEdit}
                                        className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
                                    >
                                        Cancel Edit
                                    </button>
                                )}
                            </div>
                            <form onSubmit={handleSubmit}>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                                    <div>
                                        <label className="block text-xs font-medium text-gray-700 mb-1">Name *</label>
                                        <input
                                            type="text"
                                            required
                                            value={newParticipant.name}
                                            onChange={(e) => setNewParticipant({...newParticipant, name: e.target.value})}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm"
                                            placeholder="Full name"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium text-gray-700 mb-1">Email</label>
                                        <input
                                            type="email"
                                            value={newParticipant.email}
                                            onChange={(e) => setNewParticipant({...newParticipant, email: e.target.value})}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm"
                                            placeholder="email@example.com"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium text-gray-700 mb-1">Phone</label>
                                        <input
                                            type="text"
                                            value={newParticipant.phone}
                                            onChange={(e) => setNewParticipant({...newParticipant, phone: e.target.value})}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm"
                                            placeholder="Phone number"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium text-gray-700 mb-1">Department</label>
                                        <select
                                            value={newParticipant.department}
                                            onChange={(e) => setNewParticipant({...newParticipant, department: e.target.value})}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm appearance-none bg-white"
                                        >
                                            <option value="">Select Department</option>
                                            {departments.map((dept) => (
                                                <option key={dept.value} value={dept.value}>
                                                    {dept.label}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium text-gray-700 mb-1">Course/Program</label>
                                        <input
                                            type="text"
                                            value={newParticipant.course}
                                            onChange={(e) => setNewParticipant({...newParticipant, course: e.target.value})}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm"
                                            placeholder="e.g., BSIT, BSA, BEEd"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium text-gray-700 mb-1">Role</label>
                                        <select
                                            value={newParticipant.role}
                                            onChange={(e) => setNewParticipant({...newParticipant, role: e.target.value})}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm"
                                        >
                                            <option value="participant">Participant</option>
                                            <option value="speaker">Speaker</option>
                                            <option value="organizer">Organizer</option>
                                            <option value="attendee">Attendee</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium text-gray-700 mb-1">Status</label>
                                        <select
                                            value={newParticipant.status}
                                            onChange={(e) => setNewParticipant({...newParticipant, status: e.target.value})}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm"
                                        >
                                            <option value="registered">Registered</option>
                                            <option value="confirmed">Confirmed</option>
                                            <option value="attended">Attended</option>
                                            <option value="no_show">No Show</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="mt-3 flex gap-2 justify-end">
                                    <button
                                        type="submit"
                                        disabled={isSubmitting || !newParticipant.name.trim()}
                                        className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors disabled:opacity-50 flex items-center gap-2 text-white ${
                                            isEditing 
                                                ? 'bg-blue-600 hover:bg-blue-700' 
                                                : 'bg-emerald-600 hover:bg-emerald-700'
                                        }`}
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                {isEditing ? 'Updating...' : 'Adding...'}
                                            </>
                                        ) : (
                                            <>
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isEditing ? "M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" : "M12 4v16m8-8H4"} />
                                                </svg>
                                                {isEditing ? 'Update Participant' : 'Add Participant'}
                                            </>
                                        )}
                                    </button>
                                </div>
                            </form>
                        </div>
                    )}

                    {/* Participants List */}
                    {isLoading ? (
                        <div className="flex justify-center py-8">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
                        </div>
                    ) : participantsList.length === 0 ? (
                        <div className="text-center py-8 text-gray-500">
                            <svg className="w-12 h-12 mx-auto text-gray-300 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                            <p>No participants yet</p>
                            <p className="text-sm text-gray-400">Add participants using the form above</p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto max-h-[400px] overflow-y-auto border border-gray-200 rounded-lg">
                            <table className="w-full text-sm">
                                <thead className="sticky top-0 bg-gray-50 border-b border-gray-200">
                                    <tr>
                                        <th className="text-left py-3 px-4 text-xs font-medium text-gray-600 uppercase tracking-wider">#</th>
                                        <th className="text-left py-3 px-4 text-xs font-medium text-gray-600 uppercase tracking-wider">Name</th>
                                        <th className="text-left py-3 px-4 text-xs font-medium text-gray-600 uppercase tracking-wider">Email</th>
                                        <th className="text-left py-3 px-4 text-xs font-medium text-gray-600 uppercase tracking-wider">Department</th>
                                        <th className="text-left py-3 px-4 text-xs font-medium text-gray-600 uppercase tracking-wider">Course</th>
                                        <th className="text-left py-3 px-4 text-xs font-medium text-gray-600 uppercase tracking-wider">Phone</th>
                                        <th className="text-left py-3 px-4 text-xs font-medium text-gray-600 uppercase tracking-wider">Role</th>
                                        <th className="text-left py-3 px-4 text-xs font-medium text-gray-600 uppercase tracking-wider">Status</th>
                                        <th className="text-center py-3 px-4 text-xs font-medium text-gray-600 uppercase tracking-wider">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 bg-white">
                                    {participantsList.map((participant, index) => (
                                        <tr 
                                            key={participant.id || index} 
                                            className={`hover:bg-gray-50 transition-colors cursor-pointer ${editingParticipantId === participant.id ? 'bg-blue-50' : ''}`}
                                            onClick={() => handleEditParticipant(participant)}
                                        >
                                            <td className="py-3 px-4 text-gray-500 text-xs">{index + 1}</td>
                                            <td className="py-3 px-4 text-gray-800 font-medium">{participant.name || 'Unknown'}</td>
                                            <td className="py-3 px-4 text-gray-600">{participant.email || '—'}</td>
                                            <td className="py-3 px-4 text-gray-600">{participant.department || '—'}</td>
                                            <td className="py-3 px-4 text-gray-600">{participant.course || '—'}</td>
                                            <td className="py-3 px-4 text-gray-600">{participant.phone || '—'}</td>
                                            <td className="py-3 px-4">
                                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRoleBadge(participant.role)}`}>
                                                    {participant.role || 'participant'}
                                                </span>
                                            </td>
                                            <td className="py-3 px-4">
                                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadge(participant.status)}`}>
                                                    {participant.status || 'registered'}
                                                </span>
                                            </td>
                                            <td className="py-3 px-4" onClick={(e) => e.stopPropagation()}>
                                                <div className="flex items-center justify-center gap-2">
                                                    {hasPermission && (
                                                        <>
                                                            <select
                                                                value={participant.status || 'registered'}
                                                                onChange={(e) => onUpdateStatus(participant.id, e.target.value)}
                                                                className="text-xs border border-gray-300 rounded-lg px-2 py-1 focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white"
                                                            >
                                                                <option value="registered">Registered</option>
                                                                <option value="confirmed">Confirmed</option>
                                                                <option value="attended">Attended</option>
                                                                <option value="no_show">No Show</option>
                                                            </select>
                                                            <button
                                                                onClick={() => handleRemoveClick(participant)}
                                                                className="text-red-500 hover:text-red-700 transition-colors p-1"
                                                                title="Remove participant"
                                                            >
                                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                                </svg>
                                                            </button>
                                                        </>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}

                    {/* Footer */}
                    <div className="mt-4 pt-4 border-t border-gray-200 flex justify-between items-center">
                        <span className="text-sm text-gray-600">
                            Total: <span className="font-medium text-gray-800">{participantsList.length}</span> participant{participantsList.length !== 1 ? 's' : ''}
                        </span>
                        <button
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg text-sm font-medium transition-colors"
                        >
                            Close
                        </button>
                    </div>
                </div>
            </Modal>

            {/* Remove Confirmation Modal */}
            <ConfirmModal
                isOpen={showRemoveConfirm}
                onClose={() => {
                    setShowRemoveConfirm(false);
                    setParticipantToRemove(null);
                }}
                onConfirm={confirmRemove}
                title="Remove Participant"
                message={`Are you sure you want to remove "${participantToRemove?.name}" from this event?`}
                confirmText="Remove"
                cancelText="Cancel"
                confirmColor="bg-red-600 hover:bg-red-700"
                loading={isSubmitting}
            />
        </>
    );
}