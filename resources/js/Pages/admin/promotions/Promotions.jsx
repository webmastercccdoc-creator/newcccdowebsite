import { useEffect, useState } from 'react';
import axios from 'axios';
import AdminLayout from '@/layouts/AdminLayout';
import AddPromotions from './AddPromotions';
import EditPromotions from './EditPromotions';

export default function Promotions() {
    const [promotions, setPromotions] = useState([]);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedPromotionId, setSelectedPromotionId] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;

    // Search and filter states
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('active');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        document.title = "Promotions - City College of Cagayan de Oro";
        fetchPromotions();
    }, []);

    const fetchPromotions = async () => {
        try {
            const response = await axios.get('/api/promotions');
            setPromotions(Array.isArray(response.data) ? response.data : []);
        } catch (error) {
            console.error('Error fetching promotions:', error);
            setPromotions([]);
        } finally {
            setLoading(false);
        }
    };

    const handlePromotionCreated = () => {
        setCurrentPage(1);
        fetchPromotions();
    };

    const handlePromotionUpdated = () => {
        setCurrentPage(1);
        fetchPromotions();
        setIsEditModalOpen(false);
        setSelectedPromotionId(null);
    };

    // Filter promotions based on search and filters
    const filteredPromotions = promotions.filter(promo => {
        // Search filter
        const matchesSearch = 
            promo.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            promo.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
            promo.date.includes(searchQuery);
        
        // Status filter
        let matchesStatus = true;
        if (statusFilter !== 'all') {
            matchesStatus = promo.status === statusFilter;
        }
        
        return matchesSearch && matchesStatus;
    });

    // Calculate pagination
    const totalPages = Math.ceil(filteredPromotions.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentPromotions = filteredPromotions.slice(startIndex, endIndex);

    const getStatusBadge = (status) => {
        const statusStyles = {
            'active': 'bg-emerald-100 text-emerald-700 border border-emerald-200',
            'inactive': 'bg-gray-100 text-gray-700 border border-gray-200',
            'expired': 'bg-red-100 text-red-700 border border-red-200'
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
            'inactive': (
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-2a6 6 0 100-12 6 6 0 000 12zm-1-8a1 1 0 00-2 0v3a1 1 0 001 1h2a1 1 0 100-2h-1V8z" clipRule="evenodd" />
                </svg>
            ),
            'expired': (
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
            )
        };
        return icons[status] || null;
    };

    const handleDelete = async (id) => {
        if (confirm('Are you sure you want to delete this promotion?')) {
            try {
                await axios.delete(`/admin/promotions/${id}`);
                fetchPromotions();
            } catch (error) {
                console.error('Failed to delete promotion:', error);
                alert('Failed to delete promotion');
            }
        }
    };

    const handleEdit = (promo) => {
        setSelectedPromotionId(promo.id);
        setIsEditModalOpen(true);
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

    if (loading) {
        return (
            <AdminLayout title="Promotions">
                <div className="bg-white p-8 text-center">
                    <div className="inline-block">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
                    </div>
                    <p className="mt-4 text-gray-600">Loading promotions...</p>
                </div>
            </AdminLayout>
        );
    }

    return (
        <AdminLayout title="Promotions">
            {/* Header with Add Promotion Button */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
                <div>
                    <p className="text-sm text-gray-600">
                        Manage all promotions
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                        Create, edit, and manage promotional content
                    </p>
                </div>
                <button
                    type="button"
                    onClick={() => setIsAddModalOpen(true)}
                    className="mt-3 sm:mt-0 bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 shadow-md hover:shadow-lg w-fit"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Create New Promotion
                </button>
            </div>

            {/* Search and Filters - Light Grey Background */}
            <div className="bg-gray-100 border border-gray-200 shadow-sm p-4 mb-6">
                <div className="flex flex-col md:flex-row gap-4">
                    {/* Search Input */}
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
                            placeholder="Search promotions by title or content..."
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

                    {/* Filters */}
                    <div className="flex-1 flex flex-wrap gap-4">
                        <select
                            value={statusFilter}
                            onChange={(e) => handleFilterChange(setStatusFilter, e.target.value)}
                            className="px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all outline-none text-sm bg-white min-w-[130px]"
                        >
                            <option value="all">All Status</option>
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                            <option value="expired">Expired</option>
                        </select>

                        {/* Clear Filters Button */}
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

                {/* Filter results info */}
                <div className="mt-3 text-sm text-gray-600">
                    {filteredPromotions.length === 0 ? (
                        <span>No promotions found matching your criteria</span>
                    ) : (
                        <span>
                            Found <span className="font-medium text-gray-800">{filteredPromotions.length}</span> promotion{filteredPromotions.length !== 1 ? 's' : ''}
                            {searchQuery && <span> matching "<span className="font-medium text-gray-800">{searchQuery}</span>"</span>}
                            {statusFilter !== 'all' && <span> with status <span className="font-medium text-gray-800">{statusFilter}</span></span>}
                        </span>
                    )}
                </div>
            </div>

            {/* Promotions Table */}
            <div className="bg-white border border-gray-200 shadow-lg overflow-hidden">
                <div className="overflow-hidden">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="bg-gray-700 text-white">
                                <th className="text-left py-4 px-4 font-semibold text-xs uppercase tracking-wider border-r border-gray-600">#</th>
                                <th className="text-left py-4 px-4 font-semibold text-xs uppercase tracking-wider border-r border-gray-600">Title & Content</th>
                                <th className="text-left py-4 px-4 font-semibold text-xs uppercase tracking-wider border-r border-gray-600">Status</th>
                                <th className="text-left py-4 px-4 font-semibold text-xs uppercase tracking-wider border-r border-gray-600">Start Date</th>
                                <th className="text-left py-4 px-4 font-semibold text-xs uppercase tracking-wider border-r border-gray-600">Expiry Date</th>
                                <th className="text-center py-4 px-4 font-semibold text-xs uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {currentPromotions.length > 0 ? (
                                currentPromotions.map((promo, index) => (
                                    <tr 
                                        key={promo.id} 
                                        className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-gray-300 transition-all duration-200 group`}
                                    >
                                        <td className="py-3 px-4 text-gray-500 text-xs font-medium border-r border-gray-200">
                                            {String(startIndex + index + 1).padStart(2, '0')}
                                        </td>
                                        <td className="py-3 px-4 border-r border-gray-200">
                                            <div>
                                                <span className="font-semibold text-gray-800 hover:text-emerald-600 transition-colors cursor-pointer">
                                                    {promo.title}
                                                </span>
                                                <p className="text-xs text-gray-500 mt-0.5 truncate max-w-xs">
                                                    {getContentPreview(promo.content)}
                                                </p>
                                            </div>
                                        </td>
                                        <td className="py-3 px-4 border-r border-gray-200">
                                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${getStatusBadge(promo.status)}`}>
                                                {getStatusIcon(promo.status)}
                                                {promo.status}
                                            </span>
                                        </td>
                                        <td className="py-3 px-4 text-gray-500 text-sm border-r border-gray-200">
                                            {promo.date}
                                        </td>
                                        <td className="py-3 px-4 text-gray-500 text-sm border-r border-gray-200">
                                            {promo.expire}
                                        </td>
                                        <td className="py-3 px-4">
                                            <div className="flex items-center justify-center gap-2">
                                                <button
                                                    onClick={() => handleEdit(promo)}
                                                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-amber-600 hover:bg-amber-700 rounded-lg transition-all shadow-sm hover:shadow"
                                                >
                                                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                    </svg>
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(promo.id)}
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
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="py-12 text-center bg-gray-50">
                                        <div className="flex flex-col items-center justify-center">
                                            <svg className="w-16 h-16 text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                                            </svg>
                                            <p className="text-gray-500 font-medium">No promotions found</p>
                                            <p className="text-gray-400 text-sm mt-1">
                                                {searchQuery || statusFilter !== 'all'
                                                    ? 'Try adjusting your search or filters'
                                                    : 'Click "Create New Promotion" to add one.'}
                                            </p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                {filteredPromotions.length > 0 && (
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-4 py-3 border-t border-gray-200 bg-gray-50">
                        <p className="text-sm text-gray-600">
                            Showing <span className="font-medium text-gray-800">{filteredPromotions.length > 0 ? startIndex + 1 : 0}</span> to{' '}
                            <span className="font-medium text-gray-800">{Math.min(endIndex, filteredPromotions.length)}</span> of{' '}
                            <span className="font-medium text-gray-800">{filteredPromotions.length}</span> promotions
                        </p>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={currentPage === 1}
                                className="px-3 py-1.5 text-xs font-medium text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                            >
                                Previous
                            </button>
                            {getPageNumbers().map(page => (
                                <button
                                    key={page}
                                    onClick={() => handlePageChange(page)}
                                    className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
                                        currentPage === page
                                            ? 'bg-emerald-600 text-white'
                                            : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-100'
                                    }`}
                                >
                                    {page}
                                </button>
                            ))}
                            <button
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={currentPage === totalPages}
                                className="px-3 py-1.5 text-xs font-medium text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                            >
                                Next
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Add Promotions Modal */}
            <AddPromotions
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
                onCreated={handlePromotionCreated}
            />

            {/* Edit Promotions Modal */}
            <EditPromotions
                isOpen={isEditModalOpen}
                onClose={() => {
                    setIsEditModalOpen(false);
                    setSelectedPromotionId(null);
                }}
                onUpdated={handlePromotionUpdated}
                promotionId={selectedPromotionId}
            />
        </AdminLayout>
    );
}