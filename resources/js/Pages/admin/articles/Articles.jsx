import { useState, useEffect } from 'react';
import axios from 'axios';
import AdminLayout from '@/layouts/AdminLayout';
import AddArticles from './AddArticles';
import EditArticle from './EditArticle';
import { ConfirmModal } from '@/components/admin/Modal';

export default function Articles({ articles: initialArticles, departments = [] }) {
  const initialArticleList = Array.isArray(initialArticles) ? initialArticles : [];

  // Use articles from controller or empty array as fallback
  const [articles, setArticles] = useState(initialArticleList);
  const [currentPage, setCurrentPage] = useState(1);
  
  // ✅ CHANGED: Show only 5 items per page
  const itemsPerPage = 5;

  // Search and filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('Approved');
  const [departmentFilter, setDepartmentFilter] = useState('All');

  // Modal states
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingArticle, setEditingArticle] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [articleToDelete, setArticleToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const fetchUserArticles = async () => {
      try {
        const response = await axios.get('/user/articles');

        if (!isMounted) return;

        const userArticles = Array.isArray(response?.data?.articles) ? response.data.articles : [];
        setArticles(userArticles);
      } catch (error) {
        console.error('Failed to fetch user articles:', error);
        if (isMounted) {
          setArticles([]);
        }
      }
    };

    fetchUserArticles();

    return () => {
      isMounted = false;
    };
  }, []);

  // Filter articles based on search and filters
  const filteredArticles = articles.filter(article => {
    // Search filter
    const normalizedSearchQuery = searchQuery.toLowerCase();
    const matchesSearch = [article.title, article.department, article.created_by]
      .some(value => String(value ?? '').toLowerCase().includes(normalizedSearchQuery));
    
    // Status filter
    const matchesStatus = statusFilter === 'All' || article.status === statusFilter;
    
    // Department filter
    const matchesDepartment = departmentFilter === 'All' || article.department === departmentFilter;
    
    return matchesSearch && matchesStatus && matchesDepartment;
  });

  // Calculate pagination
  const totalPages = Math.ceil(filteredArticles.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentArticles = filteredArticles.slice(startIndex, endIndex);

  const getStatusBadge = (status) => {
    const statusStyles = {
      'Approved': 'bg-emerald-100 text-emerald-700 border border-emerald-200',
      'Pending': 'bg-amber-100 text-amber-700 border border-amber-200',
      'Rejected': 'bg-red-100 text-red-700 border border-red-200',
      'Archived': 'bg-gray-100 text-gray-700 border border-gray-200'
    };
    return statusStyles[status] || 'bg-gray-100 text-gray-700 border border-gray-200';
  };

  const getStatusIcon = (status) => {
    const icons = {
      'Approved': (
        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
      ),
      'Pending': (
        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-2a6 6 0 100-12 6 6 0 000 12zm-1-8a1 1 0 00-2 0v3a1 1 0 001 1h2a1 1 0 100-2h-1V8z" clipRule="evenodd" />
        </svg>
      ),
      'Rejected': (
        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l-1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
        </svg>
      ),
      'Archived': (
        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
        </svg>
      )
    };
    return icons[status] || null;
  };

  const handleView = (id) => {
    window.open(`/news/${id}`, '_blank', 'noopener,noreferrer');
  };

  const handleAddNew = () => {
    setEditingArticle(null);
    setShowAddModal(true);
  };

  const handleEdit = async (id) => {
    try {
      const response = await axios.get(`/admin/articles/${id}`);
      const article = response?.data?.article || response?.data;

      if (!article) {
        console.error('No article data received');
        alert('Failed to load article details');
        return;
      }

      setShowAddModal(false);
      setEditingArticle(article);
    } catch (error) {
      console.error('Failed to load article details:', error);
      alert('Failed to load article details. Please try again.');
    }
  };

  const handleDelete = (id) => {
    setArticleToDelete(id);
    setShowDeleteModal(true);
  };

  const handleArchive = async (id) => {
    try {
      const response = await axios.put(`/admin/articles/${id}/archive`, { status: 'pending' });

      if (response.status === 200 || response.data?.success) {
        setArticles(prevArticles =>
          prevArticles.map(article =>
            article.id === id ? { ...article, status: 'Pending' } : article
          )
        );
        alert('Article moved back to pending status.');
      }
    } catch (error) {
      console.error('Failed to archive article:', error);
      alert(error.response?.data?.message || 'Failed to archive article. Please try again.');
    }
  };

  const confirmDelete = async () => {
    setIsDeleting(true);
    try {
      const response = await axios.delete(`/admin/articles/${articleToDelete}`);
      console.log('Delete response:', response);
      
      if (response.data?.success) {
        setArticles(articles.filter(article => article.id !== articleToDelete));
        setShowDeleteModal(false);
        alert('Article deleted successfully.');
      }
    } catch (error) {
      console.error('Failed to delete article:', error);
      console.error('Error response:', error.response?.data);
      console.error('Error status:', error.response?.status);
      alert(error.response?.data?.message || 'Failed to delete article. Please try again.');
    } finally {
      setIsDeleting(false);
      setArticleToDelete(null);
    }
  };

  const handleSaveArticle = (articleData) => {
    // Normalize status based on backend values
    let normalizedStatus = articleData.status;
    if (normalizedStatus === 'pending' || normalizedStatus === 'Draft') {
      normalizedStatus = 'Pending';
    } else if (normalizedStatus === 'approved') {
      normalizedStatus = 'Approved';
    } else if (normalizedStatus === 'rejected') {
      normalizedStatus = 'Rejected';
    } else if (normalizedStatus === 'archived') {
      normalizedStatus = 'Archived';
    }

    // Format date if needed
    let formattedDate = articleData.date;
    if (formattedDate && formattedDate instanceof Date) {
      formattedDate = formattedDate.toISOString().split('T')[0];
    }

    const normalizedArticle = {
      id: articleData.id || editingArticle?.id,
      title: articleData.title || '',
      department: articleData.department || '',
      status: normalizedStatus,
      date: formattedDate || new Date().toISOString().split('T')[0],
      created_by: articleData.created_by || editingArticle?.created_by || 'System',
      image: articleData.image || null,
      imagePreviews: articleData.imagePreviews || []
    };

    if (editingArticle) {
      // Update existing article
      setArticles(articles.map(a => 
        a.id === normalizedArticle.id ? normalizedArticle : a
      ));
    } else {
      // Add new article - ensure it has an ID from the backend response
      if (normalizedArticle.id) {
        setArticles([normalizedArticle, ...articles]);
      }
    }
    setShowAddModal(false);
    setEditingArticle(null);
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Reset to page 1 when filters change
  const handleFilterChange = (setter, value) => {
    setter(value);
    setCurrentPage(1);
  };

  // Generate page numbers
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

  // Get unique departments for filter
  const uniqueDepartments = ['All', ...new Set(articles.map(a => a.department).filter(Boolean))];

  // Helper function to get short content preview
  const getContentPreview = (content) => {
    if (!content) return 'No content available';
    // Strip HTML tags if any
    const plainText = content.replace(/<[^>]*>/g, '');
    // Get first 100 characters
    const preview = plainText.substring(0, 100);
    return preview.length < plainText.length ? preview + '...' : preview;
  };

  return (
    <AdminLayout title="Articles">
      {/* Header with Add Article Button */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <div>
          <p className="text-sm text-gray-600">
            Approved articles from your department
          </p>
          <p className="text-xs text-gray-500 mt-1">
            Showing only approved articles assigned to your department(s)
          </p>
        </div>
        <button 
          onClick={handleAddNew}
          className="mt-3 sm:mt-0 bg-gray-600 hover:bg-gray-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 shadow-md hover:shadow-lg"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Create New Article
        </button>
      </div>

      {/* Search and Filters - Light Grey Background */}
      <div className="bg-gray-100 border border-gray-200 shadow-sm p-4 mb-6">
        <div
          className="flex flex-col md:flex-row gap-4"
          autoComplete="off"
        >
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
              placeholder="Search articles by title, department, or author..."
              value={searchQuery}
              onChange={(e) => handleFilterChange(setSearchQuery, e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  e.stopPropagation();
                }
              }}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all outline-none text-sm bg-white"
            />
            {searchQuery && (
              <button
                type="button"
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
              <option value="Approved">Approved</option>
              <option value="Archived">Archived</option>
            </select>

            {/* Department Filter */}
            <select
              value={departmentFilter}
              onChange={(e) => handleFilterChange(setDepartmentFilter, e.target.value)}
              className="px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all outline-none text-sm bg-white min-w-[130px]"
            >
              {uniqueDepartments.map(dept => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>

            {/* Clear Filters Button */}
            {(searchQuery || statusFilter !== 'Approved' || departmentFilter !== 'All') && (
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setStatusFilter('Approved');
                  setDepartmentFilter('All');
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
          {filteredArticles.length === 0 ? (
            <span>No articles found matching your criteria</span>
          ) : (
            <span>
              Found <span className="font-medium text-gray-800">{filteredArticles.length}</span> article{filteredArticles.length !== 1 ? 's' : ''}
              {searchQuery && <span> matching "<span className="font-medium text-gray-800">{searchQuery}</span>"</span>}
              {statusFilter !== 'Approved' && <span> with status <span className="font-medium text-gray-800">{statusFilter}</span></span>}
              {departmentFilter !== 'All' && <span> in <span className="font-medium text-gray-800">{departmentFilter}</span></span>}
            </span>
          )}
        </div>
      </div>

      {/* Articles Table */}
      <div className="bg-white border border-gray-200 shadow-lg overflow-hidden">
        <div className="overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-700 text-white">
                <th className="text-left py-4 px-4 font-semibold text-xs uppercase tracking-wider border-r border-gray-600">#</th>
                <th className="text-left py-4 px-4 font-semibold text-xs uppercase tracking-wider border-r border-gray-600">Title & Content</th>
                <th className="text-left py-4 px-4 font-semibold text-xs uppercase tracking-wider border-r border-gray-600">Department</th>
                <th className="text-left py-4 px-4 font-semibold text-xs uppercase tracking-wider border-r border-gray-600">Status</th>
                <th className="text-left py-4 px-4 font-semibold text-xs uppercase tracking-wider border-r border-gray-600">Date</th>
                <th className="text-center py-4 px-4 font-semibold text-xs uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {currentArticles.length > 0 ? (
                currentArticles.map((article, index) => (
                  <tr 
                    key={article.id} 
                    className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}
                  >
                    <td className="py-3 px-4 text-gray-500 text-xs font-medium border-r border-gray-200">
                      {String(startIndex + index + 1).padStart(2, '0')}
                    </td>
                    <td className="py-3 px-4 border-r border-gray-200 max-w-[260px]">
                      <div className="flex flex-col min-w-0 w-full">
                        <span
                          className="font-semibold text-gray-800 truncate w-full"
                          title={article.title}
                        >
                          {article.title}
                        </span>
                        <p
                          className="text-xs text-gray-500 mt-0.5 truncate w-full"
                          title={getContentPreview(article.content)}
                        >
                          {getContentPreview(article.content)}
                        </p>
                      </div>
                    </td>
                    <td className="py-3 px-4 border-r border-gray-200">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700 border border-gray-200">
                        {article.department}
                      </span>
                    </td>
                    <td className="py-3 px-4 border-r border-gray-200">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${getStatusBadge(article.status)}`}>
                        {getStatusIcon(article.status)}
                        {article.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-gray-500 text-sm border-r border-gray-200">
                      {article.date}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          type="button"
                          onClick={() => handleView(article.id)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-all shadow-sm hover:shadow"
                        >
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                          View
                        </button>
                        <button
                          type="button"
                          onClick={() => handleEdit(article.id)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-amber-600 hover:bg-amber-700 rounded-lg transition-all shadow-sm hover:shadow"
                        >
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                          Edit
                        </button>
                        <button
                          type="button"
                          onClick={() => handleArchive(article.id)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-gray-600 hover:bg-gray-700 rounded-lg transition-all shadow-sm hover:shadow"
                        >
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M7 8V6a1 1 0 011-1h8a1 1 0 011 1v2m-9 4h10l-1 8H7l-1-8z" />
                          </svg>
                          Archive
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(article.id)}
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
                      <p className="text-gray-500 font-medium">No articles found</p>
                      <p className="text-gray-400 text-sm mt-1">
                        {searchQuery || statusFilter !== 'All' || departmentFilter !== 'All'
                          ? 'Try adjusting your search or filters'
                          : 'Click "Add New Article" to create one.'}
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {filteredArticles.length > 0 && (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-4 py-3 border-t border-gray-200 bg-gray-50">
            <p className="text-sm text-gray-600">
              Showing <span className="font-medium text-gray-800">{filteredArticles.length > 0 ? startIndex + 1 : 0}</span> to{' '}
              <span className="font-medium text-gray-800">{Math.min(endIndex, filteredArticles.length)}</span> of{' '}
              <span className="font-medium text-gray-800">{filteredArticles.length}</span> articles
            </p>
            {filteredArticles.length > itemsPerPage && (
              <div className="flex gap-1">
                <button
                  type="button"
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
                    type="button"
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
                  type="button"
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

      {/* Add/Edit Article Modal */}
      <AddArticles
        isOpen={showAddModal}
        onClose={() => {
          setShowAddModal(false);
          setEditingArticle(null);
        }}
        onSave={handleSaveArticle}
        article={null}
        isEditing={false}
        departments={departments}
      />

      <EditArticle
        isOpen={Boolean(editingArticle) && !showAddModal}
        onClose={() => setEditingArticle(null)}
        onSave={handleSaveArticle}
        article={editingArticle}
        departments={departments}
      />

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
          setArticleToDelete(null);
        }}
        onConfirm={confirmDelete}
        title="Delete Article"
        message="Are you sure you want to delete this article? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        confirmColor="bg-red-600 hover:bg-red-700"
        loading={isDeleting}
      />
    </AdminLayout>
  );
}