import { useState, useEffect } from 'react';
import AdminLayout from '../../layouts/AdminLayout';
import axios from 'axios';

export default function Events() {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [openDropdownId, setOpenDropdownId] = useState(null);
  const [confirmation, setConfirmation] = useState(null);
  const [departmentOptions, setDepartmentOptions] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    location: '',
    department: '',
  });

  useEffect(() => {
    fetchEvents();
  }, []);

  // Fetch departments for the form select (same endpoint/pattern as Url.jsx)
  useEffect(() => {
    const fetchUserDepartments = async () => {
      try {
        const response = await axios.get('/user/departments');
        const departments = Array.isArray(response.data?.departments)
          ? response.data.departments
          : (response.data?.department_names || []).map((name, index) => ({
              id: response.data.department_slugs?.[index] || name,
              name,
              slug: response.data.department_slugs?.[index] || name,
            }));

        const normalizedDepartments = departments
          .map((department) =>
            typeof department === 'string'
              ? { id: department, name: department, slug: department }
              : {
                  id: department.id || department.slug || department.name,
                  name: department.name || department.label,
                  slug: department.slug || department.name,
                }
          )
          .filter((department) => department.name);

        setDepartmentOptions(normalizedDepartments);
      } catch (error) {
        console.error('Failed to fetch user departments for event form:', error);
        setDepartmentOptions([]);
      }
    };

    fetchUserDepartments();
  }, []);

  // Close dropdown when clicking outside (same pattern as Url.jsx)
  useEffect(() => {
    const handleClickOutside = () => setOpenDropdownId(null);
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
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
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // TODO: Replace with actual API endpoint
      // formData.department will contain the selected department name
      setShowForm(false);
      setFormData({ title: '', description: '', date: '', location: '', department: '' });
      fetchEvents();
    } catch (error) {
      console.error('Failed to create event:', error);
    }
  };

  return (
    <AdminLayout title="Events Management">
      <div className="space-y-6">
        {/* Header action */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-gray-600">Manage and monitor all events</p>
            <p className="text-xs text-gray-500 mt-1">Create, edit, and remove events</p>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="mt-3 sm:mt-0 bg-gray-700 hover:bg-gray-800 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 shadow-sm w-fit"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            {showForm ? 'Cancel' : 'Add Event'}
          </button>
        </div>

        {/* Inline create form (styled to match cards) */}
        {showForm && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg hover:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all text-sm bg-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows="4"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg hover:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all text-sm bg-white"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg hover:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all text-sm bg-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg hover:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all text-sm bg-white"
                  />
                </div>
              </div>

              {/* Department select — matches Url.jsx filter style */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                <select
                  name="department"
                  value={formData.department}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg hover:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all text-sm bg-white"
                >
                  <option value="">Select a department</option>
                  {departmentOptions.map((department) => (
                    <option key={department.slug || department.name} value={department.name}>
                      {department.name}
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
              >
                Create Event
              </button>
            </form>
          </div>
        )}

        {/* Events table — styled to match Url.jsx */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          {isLoading ? (
            <div className="p-6">
              <div className="animate-pulse space-y-4">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="h-20 bg-gray-200 rounded"></div>
                ))}
              </div>
            </div>
          ) : events.length === 0 ? (
            <div className="p-12 text-center text-gray-500">
              <svg
                className="w-16 h-16 mx-auto text-gray-300 mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <p className="text-gray-500 font-medium">No events yet</p>
              <p className="text-gray-400 text-sm mt-1">Create one to get started!</p>
            </div>
          ) : (
            <>
              <div className="w-full overflow-visible">
                <table className="w-full min-w-[900px] text-left border-collapse">
                  <thead className="bg-[#f8f9fa] border-b border-gray-200">
                    <tr>
                      <th className="w-[4%] px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">#</th>
                      <th className="w-[28%] px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Title</th>
                      <th className="w-[16%] px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Date</th>
                      <th className="w-[16%] px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Location</th>
                      <th className="w-[16%] px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Department</th>
                      <th className="w-[20%] px-6 py-4 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {events.map((event, index) => (
                      <tr key={event.id} className="transition-colors hover:bg-gray-50 bg-white">
                        <td className="px-6 py-4 text-sm font-medium text-gray-500">
                          {String(index + 1).padStart(2, '0')}
                        </td>
                        <td className="px-6 py-4">
                          <span className="block text-sm font-semibold text-black break-words" title={event.title}>
                            {event.title}
                          </span>
                          {event.description && (
                            <span className="block text-xs text-gray-500 line-clamp-2 break-words mt-1">
                              {event.description}
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">{event.date}</td>
                        <td className="px-6 py-4">
                          <span className="block text-sm text-gray-700 line-clamp-2 break-words" title={event.location}>
                            {event.location || '-'}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className="block text-sm text-gray-700 line-clamp-2 break-words"
                            title={event.department || event.user_department || 'No department'}
                          >
                            {event.department || event.user_department || 'No department'}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <div className="flex items-center justify-center gap-2">
                            {/* View — same style as Url.jsx "View" button */}
                            <button
                              onClick={() => {/* TODO: view event */}}
                              className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50 hover:text-gray-900"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                              </svg>
                              View
                            </button>

                            {/* More dropdown — same style as Url.jsx */}
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

                              {openDropdownId === event.id && (
                                <div
                                  className="absolute right-0 mt-1 w-44 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 z-50 focus:outline-none"
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  <div className="py-1" role="menu">
                                    <button
                                      onClick={() => {
                                        /* TODO: edit event */
                                        setOpenDropdownId(null);
                                      }}
                                      className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                      role="menuitem"
                                    >
                                      <svg className="mr-3 h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                      </svg>
                                      Edit Event
                                    </button>

                                    <div className="border-t border-gray-100 my-1"></div>
                                    <button
                                      onClick={() => {
                                        /* TODO: delete event */
                                        setOpenDropdownId(null);
                                      }}
                                      className="flex w-full items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                                      role="menuitem"
                                    >
                                      <svg className="mr-3 h-4 w-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                      </svg>
                                      Delete Event
                                    </button>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}