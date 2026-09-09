import { useState, useEffect } from 'react';
import AdminLayout from '../../layouts/AdminLayout';
import axios from 'axios';

export default function Events() {
    const [events, setEvents] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        date: '',
        location: ''
    });

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        try {
            // TODO: Replace with actual API endpoint
            setEvents([]);
        } catch (error) {
            console.error('Failed to fetch events:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // TODO: Replace with actual API endpoint
            setShowForm(false);
            setFormData({ title: '', description: '', date: '', location: '' });
            fetchEvents();
        } catch (error) {
            console.error('Failed to create event:', error);
        }
    };

    return (
        <AdminLayout title="Events Management">
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold text-gray-800">Events</h2>
                    <button
                        onClick={() => setShowForm(!showForm)}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        {showForm ? 'Cancel' : 'Add Event'}
                    </button>
                </div>

                {showForm && (
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Title
                                </label>
                                <input
                                    type="text"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Description
                                </label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    rows="4"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Date
                                    </label>
                                    <input
                                        type="date"
                                        name="date"
                                        value={formData.date}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Location
                                    </label>
                                    <input
                                        type="text"
                                        name="location"
                                        value={formData.location}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                            </div>
                            <button
                                type="submit"
                                className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                            >
                                Create Event
                            </button>
                        </form>
                    </div>
                )}

                {isLoading ? (
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <div className="animate-pulse space-y-4">
                            {[...Array(3)].map((_, i) => (
                                <div key={i} className="h-20 bg-gray-200 rounded"></div>
                            ))}
                        </div>
                    </div>
                ) : events.length === 0 ? (
                    <div className="bg-white rounded-lg shadow-md p-6 text-center text-gray-500">
                        <p>No events yet. Create one to get started!</p>
                    </div>
                ) : (
                    <div className="bg-white rounded-lg shadow-md overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50 border-b border-gray-200">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Title</th>
                                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Date</th>
                                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Location</th>
                                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {events.map((event) => (
                                        <tr key={event.id} className="border-b border-gray-200 hover:bg-gray-50">
                                            <td className="px-6 py-4 text-sm text-gray-800">{event.title}</td>
                                            <td className="px-6 py-4 text-sm text-gray-600">{event.date}</td>
                                            <td className="px-6 py-4 text-sm text-gray-600">{event.location}</td>
                                            <td className="px-6 py-4 text-sm space-x-2">
                                                <button className="text-blue-600 hover:text-blue-800">Edit</button>
                                                <button className="text-red-600 hover:text-red-800">Delete</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}
