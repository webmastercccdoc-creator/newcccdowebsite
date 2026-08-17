import { useState } from 'react';
import AdminLayout from '@/layouts/AdminLayout';
import AddUser from './AddUser';
import EditUser from './EditUser';
import ViewUser from './ViewUser';
import { ConfirmModal } from '@/components/admin/Modal';
import axios from 'axios';

export default function Users({ users = [] }) {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const [departmentFilter, setDepartmentFilter] = useState('All');
    const [statusFilter, setStatusFilter] = useState('All');
    const [roleFilter, setRoleFilter] = useState('All');
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showViewModal, setShowViewModal] = useState(false);
    const [editingUser, setEditingUser] = useState(null);
    const [viewingUser, setViewingUser] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [userToDelete, setUserToDelete] = useState(null);
    const [userList, setUserList] = useState(users);
    const [isLoading, setIsLoading] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const itemsPerPage = 8;

    // Get unique departments for filter
    const uniqueDepartments = ['All', ...new Set(userList.map(u => u.department).filter(Boolean))];
    
    // Get unique roles for filter
    const uniqueRoles = ['All', ...new Set(userList.map(u => u.role).filter(Boolean))];

    // Filter and sort users
    const filteredAndSortedUsers = [...userList]
        .filter(user => {
            const matchesSearch = user.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                  user.email?.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesDepartment = departmentFilter === 'All' || user.department === departmentFilter;
            const matchesStatus = statusFilter === 'All' || user.status === statusFilter;
            const matchesRole = roleFilter === 'All' || user.role === roleFilter;
            
            return matchesSearch && matchesDepartment && matchesStatus && matchesRole;
        })
        .sort((a, b) => {
            // Active users first
            if (a.status !== b.status) {
                return a.status === 'active' ? -1 : 1;
            }
            return (a.name || '').localeCompare(b.name || '');
        });

    const totalPages = Math.ceil(filteredAndSortedUsers.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentUsers = filteredAndSortedUsers.slice(startIndex, endIndex);

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

    // Handle adding a new user
    const handleAddUser = async (userData) => {
        setIsLoading(true);
        try {
            const response = await axios.post('/admin/users', userData);
            
            if (response.data.success) {
                const newUser = {
                    id: response.data.user.id,
                    name: response.data.user.name,
                    email: response.data.user.email,
                    status: response.data.user.status || 'active',
                    departments: response.data.user.departments || [],
                    permissions: response.data.user.permissions || [],
                    email_verified_at: response.data.user.email_verified_at || null,
                    created_at: new Date().toISOString(),
                    role: 'User',
                    department: response.data.user.departments?.[0] || 'N/A',
                };
                
                setUserList(prevUsers => [newUser, ...prevUsers]);
                setShowAddModal(false);
                alert('User added successfully!');
                return response.data;
            }
        } catch (error) {
            console.error('Failed to add user:', error);
            if (error.response?.data?.errors) {
                const errorMessages = Object.values(error.response.data.errors).flat().join('\n');
                alert('Validation errors:\n' + errorMessages);
            } else {
                alert(error.response?.data?.message || 'Failed to add user. Please try again.');
            }
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    // Handle view button click
    const handleView = (user) => {
        setViewingUser(user);
        setShowViewModal(true);
    };

    // Handle edit button click
    const handleEdit = (user) => {
        setEditingUser(user);
        setShowEditModal(true);
    };

    // Handle update user
    const handleUpdateUser = async (userData) => {
        setIsLoading(true);
        try {
            const response = await axios.put(`/admin/users/${userData.id}`, userData);
            
            if (response.data.success) {
                // Update the user in the list
                setUserList(prevUsers => 
                    prevUsers.map(user => 
                        user.id === userData.id 
                            ? {
                                ...user,
                                name: response.data.user.name,
                                email: response.data.user.email,
                                status: response.data.user.status,
                                departments: response.data.user.departments,
                                permissions: response.data.user.permissions,
                                department: response.data.user.departments?.[0] || 'N/A',
                              }
                            : user
                    )
                );
                setShowEditModal(false);
                setEditingUser(null);
                alert('User updated successfully!');
                return response.data;
            }
        } catch (error) {
            console.error('Failed to update user:', error);
            if (error.response?.data?.errors) {
                const errorMessages = Object.values(error.response.data.errors).flat().join('\n');
                alert('Validation errors:\n' + errorMessages);
            } else {
                alert(error.response?.data?.message || 'Failed to update user. Please try again.');
            }
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    // Handle delete user
    const handleDelete = (userId) => {
        const user = userList.find(u => u.id === userId);
        setUserToDelete(user);
        setShowDeleteModal(true);
    };

    const confirmDelete = async () => {
        if (!userToDelete) return;
        
        setIsDeleting(true);
        try {
            const response = await axios.delete(`/admin/users/${userToDelete.id}`);
            
            if (response.data.success) {
                setUserList(prevUsers => prevUsers.filter(user => user.id !== userToDelete.id));
                setShowDeleteModal(false);
                setUserToDelete(null);
                alert('User deleted successfully!');
            }
        } catch (error) {
            console.error('Failed to delete user:', error);
            alert(error.response?.data?.message || 'Failed to delete user. Please try again.');
        } finally {
            setIsDeleting(false);
        }
    };

    // Get permission badge color
    const getPermissionBadgeColor = (permission) => {
        const colors = {
            'approve_articles': 'bg-purple-100 text-purple-700 border-purple-200',
            'promotions': 'bg-blue-100 text-blue-700 border-blue-200',
            'user_management': 'bg-indigo-100 text-indigo-700 border-indigo-200',
            'events': 'bg-pink-100 text-pink-700 border-pink-200',
            'settings': 'bg-orange-100 text-orange-700 border-orange-200',
        };
        return colors[permission] || 'bg-gray-100 text-gray-700 border-gray-200';
    };

    const getPermissionDisplayName = (permission) => {
        const names = {
            'approve_articles': 'Approve Articles',
            'promotions': 'Promotions',
            'user_management': 'User Management',
            'events': 'Events',
            'settings': 'Settings',
        };
        return names[permission] || permission;
    };

    const renderPermissions = (permissions) => {
        if (!permissions || permissions.length === 0) {
            return <span className="text-xs text-gray-400">No permissions</span>;
        }
        return (
            <div className="flex flex-wrap gap-1">
                {permissions.map((permission, index) => (
                    <span
                        key={index}
                        className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${getPermissionBadgeColor(permission)}`}
                    >
                        {getPermissionDisplayName(permission)}
                    </span>
                ))}
            </div>
        );
    };

    return (
        <AdminLayout title="Users" activePage="/admin/usersmanagement">
            <div className="space-y-4">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-sm text-gray-600">Manage registered users in the system.</p>
                    <button
                        onClick={() => setShowAddModal(true)}
                        disabled={isLoading}
                        className="mt-3 sm:mt-0 inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        Create New User
                    </button>
                </div>

                {/* Search and Filters */}
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
                    <div className="flex flex-col md:flex-row gap-4">
                        {/* Search Input */}
                        <div className="md:w-80 relative flex-shrink-0">
                            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                            <input
                                type="text"
                                placeholder="Search users by name or email..."
                                value={searchQuery}
                                onChange={(e) => handleFilterChange(setSearchQuery, e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all outline-none text-sm"
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

                        {/* Filters */}
                        <div className="flex-1 flex flex-wrap gap-4">
                            <select
                                value={roleFilter}
                                onChange={(e) => handleFilterChange(setRoleFilter, e.target.value)}
                                className="px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all outline-none text-sm bg-white min-w-[140px]"
                            >
                                {uniqueRoles.map(role => (
                                    <option key={role} value={role}>Role: {role}</option>
                                ))}
                            </select>

                            <select
                                value={departmentFilter}
                                onChange={(e) => handleFilterChange(setDepartmentFilter, e.target.value)}
                                className="px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all outline-none text-sm bg-white min-w-[140px]"
                            >
                                {uniqueDepartments.map(dept => (
                                    <option key={dept} value={dept}>Department: {dept}</option>
                                ))}
                            </select>

                            <select
                                value={statusFilter}
                                onChange={(e) => handleFilterChange(setStatusFilter, e.target.value)}
                                className="px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all outline-none text-sm bg-white min-w-[140px]"
                            >
                                <option value="All">Status: All</option>
                                <option value="active">Status: Active</option>
                                <option value="inactive">Status: Inactive</option>
                            </select>

                            {(searchQuery || departmentFilter !== 'All' || statusFilter !== 'All' || roleFilter !== 'All') && (
                                <button
                                    onClick={() => {
                                        setSearchQuery('');
                                        setDepartmentFilter('All');
                                        setStatusFilter('All');
                                        setRoleFilter('All');
                                        setCurrentPage(1);
                                    }}
                                    className="px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors flex items-center gap-2 border border-gray-200"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                    </svg>
                                    Clear
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Filter results info */}
                    <div className="mt-3 text-sm text-gray-500">
                        {filteredAndSortedUsers.length === 0 ? (
                            <span>No users found matching your criteria</span>
                        ) : (
                            <span>
                                Found <span className="font-medium text-gray-700">{filteredAndSortedUsers.length}</span> user{filteredAndSortedUsers.length !== 1 ? 's' : ''}
                                {searchQuery && <span> matching "<span className="font-medium text-gray-700">{searchQuery}</span>"</span>}
                                {roleFilter !== 'All' && <span> with role <span className="font-medium text-gray-700">{roleFilter}</span></span>}
                                {departmentFilter !== 'All' && <span> in <span className="font-medium text-gray-700">{departmentFilter}</span></span>}
                                {statusFilter !== 'All' && <span> with status <span className="font-medium text-gray-700">{statusFilter}</span></span>}
                            </span>
                        )}
                    </div>
                </div>

                {/* Users Table */}
                <div className="bg-white rounded-xl border border-gray-200 shadow-lg overflow-hidden">
                    <div className="overflow-hidden">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="bg-gradient-to-r from-gray-700 to-gray-800 text-white">
                                    <th className="text-left py-3.5 px-4 font-semibold text-xs uppercase tracking-wider">#</th>
                                    <th className="text-left py-3.5 px-4 font-semibold text-xs uppercase tracking-wider">Name</th>
                                    <th className="text-left py-3.5 px-4 font-semibold text-xs uppercase tracking-wider">Email</th>
                                    <th className="text-left py-3.5 px-4 font-semibold text-xs uppercase tracking-wider">Department</th>
                                    <th className="text-left py-3.5 px-4 font-semibold text-xs uppercase tracking-wider">Access Control</th>
                                    <th className="text-left py-3.5 px-4 font-semibold text-xs uppercase tracking-wider">Status</th>
                                    <th className="text-center py-3.5 px-4 font-semibold text-xs uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {currentUsers.length > 0 ? (
                                    currentUsers.map((user, index) => {
                                        return (
                                            <tr 
                                                key={user.id || index} 
                                                className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-emerald-50 transition-all duration-200 group`}
                                            >
                                                <td className="py-3 px-4 text-gray-500 text-xs font-medium">
                                                    {String(startIndex + index + 1).padStart(2, '0')}
                                                </td>
                                                <td className="py-3 px-4">
                                                    <span className="font-semibold text-gray-800 hover:text-emerald-600 transition-colors">
                                                        {user.name || 'Unknown User'}
                                                    </span>
                                                </td>
                                                <td className="py-3 px-4 text-gray-600">{user.email || '-'}</td>
                                                <td className="py-3 px-4">
                                                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700 border border-gray-200">
                                                        {user.department || 'N/A'}
                                                    </span>
                                                </td>
                                                <td className="py-3 px-4">
                                                    {renderPermissions(user.permissions || [])}
                                                </td>
                                                <td className="py-3 px-4">
                                                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
                                                        user.status === 'active'
                                                            ? 'bg-emerald-100 text-emerald-700 border border-emerald-200'
                                                            : 'bg-gray-100 text-gray-700 border border-gray-200'
                                                    }`}>
                                                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                                            {user.status === 'active' ? (
                                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                                            ) : (
                                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l-1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                                            )}
                                                        </svg>
                                                        {user.status === 'active' ? 'Active' : 'Inactive'}
                                                    </span>
                                                </td>
                                                <td className="py-3 px-4">
                                                    <div className="flex items-center justify-center gap-2">
                                                        <button
                                                            onClick={() => handleView(user)}
                                                            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-all shadow-sm hover:shadow"
                                                        >
                                                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                            </svg>
                                                            View
                                                        </button>
                                                        <button
                                                            onClick={() => handleEdit(user)}
                                                            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-amber-600 hover:bg-amber-700 rounded-lg transition-all shadow-sm hover:shadow"
                                                        >
                                                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                            </svg>
                                                            Edit
                                                        </button>
                                                        <button
                                                            onClick={() => handleDelete(user.id)}
                                                            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition-all shadow-sm hover:shadow"
                                                        >
                                                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                            </svg>
                                                            Delete
                                                        </button>
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
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                                                </svg>
                                                <p className="text-gray-500 font-medium">No users found</p>
                                                <p className="text-gray-400 text-sm mt-1">
                                                    {searchQuery || departmentFilter !== 'All' || statusFilter !== 'All' || roleFilter !== 'All'
                                                        ? 'Try adjusting your search or filters'
                                                        : 'No users have been registered yet.'}
                                                </p>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    {filteredAndSortedUsers.length > 0 && (
                        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-4 py-3 border-t border-gray-200 bg-gray-50">
                            <p className="text-sm text-gray-600">
                                Showing <span className="font-medium text-gray-800">{filteredAndSortedUsers.length > 0 ? startIndex + 1 : 0}</span> to{' '}
                                <span className="font-medium text-gray-800">{Math.min(endIndex, filteredAndSortedUsers.length)}</span> of{' '}
                                <span className="font-medium text-gray-800">{filteredAndSortedUsers.length}</span> users
                            </p>
                            {filteredAndSortedUsers.length > itemsPerPage && (
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
                                                    ? 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-sm'
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
                            )}
                        </div>
                    )}
                </div>
            </div>

            {/* Add User Modal */}
            <AddUser
                isOpen={showAddModal}
                onClose={() => setShowAddModal(false)}
                onSave={handleAddUser}
            />

            {/* View User Modal */}
            <ViewUser
                isOpen={showViewModal}
                onClose={() => {
                    setShowViewModal(false);
                    setViewingUser(null);
                }}
                user={viewingUser}
            />

            {/* Edit User Modal */}
            <EditUser
                isOpen={showEditModal}
                onClose={() => {
                    setShowEditModal(false);
                    setEditingUser(null);
                }}
                onSave={handleUpdateUser}
                user={editingUser}
                departments={uniqueDepartments.filter(d => d !== 'All')}
            />

            {/* Delete Confirmation Modal */}
            <ConfirmModal
                isOpen={showDeleteModal}
                onClose={() => {
                    setShowDeleteModal(false);
                    setUserToDelete(null);
                }}
                onConfirm={confirmDelete}
                title="Delete User"
                message={`Are you sure you want to delete "${userToDelete?.name || 'this user'}"? This action cannot be undone.`}
                confirmText="Delete"
                cancelText="Cancel"
                confirmColor="bg-red-600 hover:bg-red-700"
                loading={isDeleting}
            />
        </AdminLayout>
    );
}