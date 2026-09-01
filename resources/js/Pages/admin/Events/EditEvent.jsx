import { useState, useEffect } from 'react';
import axios from 'axios';
import AddEvent from './AddEvent';

export default function EditEvent({
    isOpen,
    onClose,
    onUpdated,
    eventId = null,
}) {
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [updateError, setUpdateError] = useState(null);

    useEffect(() => {
        if (isOpen && eventId) {
            fetchEventData(eventId);
        } else if (isOpen && !eventId) {
            onClose();
        }
    }, [isOpen, eventId]);

    const fetchEventData = async (id) => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get(`/api/events/${id}`);
            const data = response.data;
            
            console.log('Fetched event data:', data);
            
            // Format dates for the form - using 'date' and 'time' fields
            const formattedData = {
                id: data.id,
                title: data.title || '',
                description: data.description || '',
                location: data.location || '',
                date: data.date ? formatDateForInput(data.date) : '',
                time: data.time || '',
                status: data.status || 'active',
                department: data.department || '',
                image_alt_text: data.image_alt_text || '',
                banner_image_url: data.banner_image_url || null,
                // Keep the original data for reference
                _original: data
            };
            
            setEvent(formattedData);
        } catch (error) {
            console.error('Error fetching event:', error);
            setError('Failed to load event data. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const formatDateForInput = (dateString) => {
        if (!dateString) return '';
        try {
            const date = new Date(dateString);
            if (isNaN(date.getTime())) return dateString;
            return date.toISOString().split('T')[0];
        } catch {
            return dateString;
        }
    };

    // Prepare event data for the AddEvent component
    const eventData = event ? {
        id: event.id,
        title: event.title || '',
        description: event.description || '',
        location: event.location || '',
        date: event.date || '',
        time: event.time || '',
        status: event.status || 'active',
        department: event.department || '',
        image_alt_text: event.image_alt_text || '',
        banner_image_url: event.banner_image_url || null,
    } : null;

    // Handle the update - this will be called by AddEvent's onCreated
    const handleUpdate = async (formData) => {
        setUpdateError(null);
        
        // Create FormData for file upload if there's a banner image
        const isMultipart = formData.banner_image instanceof File;
        let updateData;
        let headers = {};

        if (isMultipart) {
            const formDataObj = new FormData();
            formDataObj.append('title', formData.title || '');
            formDataObj.append('description', formData.description || '');
            formDataObj.append('location', formData.location || '');
            formDataObj.append('date', formData.date || '');
            formDataObj.append('time', formData.time || '');
            formDataObj.append('status', formData.status || 'active');
            formDataObj.append('department', formData.department || '');
            formDataObj.append('image_alt_text', formData.image_alt_text || '');
            formDataObj.append('banner_image', formData.banner_image);
            formDataObj.append('_method', 'PUT');
            
            updateData = formDataObj;
            headers = {
                'Content-Type': 'multipart/form-data',
            };
        } else {
            updateData = {
                title: formData.title || '',
                description: formData.description || '',
                location: formData.location || '',
                date: formData.date || '',
                time: formData.time || '',
                status: formData.status || 'active',
                department: formData.department || '',
                image_alt_text: formData.image_alt_text || '',
            };
            
            // If removing banner image
            if (formData.remove_banner_image) {
                updateData.remove_banner_image = true;
            }
        }

        try {
            let response;
            if (isMultipart) {
                response = await axios.post(`/admin/events/${event.id}`, updateData, {
                    headers: headers,
                });
            } else {
                response = await axios.put(`/admin/events/${event.id}`, updateData, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
            }
            
            if (response.status === 200) {
                // Call the parent's onUpdated callback
                if (onUpdated) {
                    await onUpdated(response.data);
                }
                onClose();
                return true;
            }
        } catch (error) {
            console.error('Error updating event:', error);
            const errorMessage = error.response?.data?.message || error.response?.data?.error || 'Failed to update event';
            setUpdateError(errorMessage);
            alert(errorMessage);
            return false;
        }
    };

    // Show loading state
    if (loading) {
        return (
            <AddEvent
                isOpen={isOpen}
                onClose={onClose}
                onCreated={() => {}}
                isEditing={true}
                event={null}
                isLoading={true}
            />
        );
    }

    // Show error state
    if (error || updateError) {
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center">
                <div className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full mx-4">
                    <div className="text-center">
                        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
                            <svg className="h-6 w-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">
                            {updateError ? 'Failed to Update Event' : 'Error Loading Event'}
                        </h3>
                        <p className="text-sm text-gray-500 mb-4">{updateError || error}</p>
                        <button
                            onClick={onClose}
                            className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
                        >
                            Close
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <AddEvent
            isOpen={isOpen}
            onClose={onClose}
            onCreated={handleUpdate}
            isEditing={true}
            event={eventData}
        />
    );
}