import { useState } from 'react';
import axios from 'axios';
import AdminLayout from '@/layouts/AdminLayout';
import AddArticles from './AddArticles';
import { ConfirmModal } from '@/components/admin/Modal';

export default function Articles({ articles: initialArticles, departments = [] }) {
  // Use articles from controller or empty array as fallback
  const [articles, setArticles] = useState(initialArticles || []);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Modal states
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingArticle, setEditingArticle] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [articleToDelete, setArticleToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Calculate pagination
  const totalPages = Math.ceil(articles.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentArticles = articles.slice(startIndex, endIndex);

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
        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-2a6 6 0 100-12 6 6 0 000 12zm-1-8a1 1 0 00-2 0v3a1 1 0 001 1h2a1 1 0 100-2h-1V8z" clipRule="evenodd" />
        </svg>
      ),
      'Rejected': (
        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
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
    console.log('View article:', id);
  };

  const handleAddNew = () => {
    setEditingArticle(null);
    setShowAddModal(true);
  };

  const handleEdit = async (id) => {
    try {
      const response = await axios.get(`/admin/articles/${id}`);
      const article = response?.data?.article || null;

      if (!article) {
        return;
      }

      setEditingArticle(article);
      setShowAddModal(true);
    } catch (error) {
      console.error('Failed to load article details:', error);
    }
  };

  const handleDelete = (id) => {
    setArticleToDelete(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    setIsDeleting(true);
    // Simulate API call - replace with actual API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setArticles(articles.filter(article => article.id !== articleToDelete));
    setShowDeleteModal(false);
    setIsDeleting(false);
    setArticleToDelete(null);
  };

  const handleSaveArticle = (articleData) => {
    // Normalize status based on backend values
    let normalizedStatus = articleData.status;
    if (normalizedStatus === 'pending') {
      normalizedStatus = 'Pending';
    } else if (normalizedStatus === 'approved') {
      normalizedStatus = 'Approved';
    } else if (normalizedStatus === 'rejected') {
      normalizedStatus = 'Rejected';
    }

    // Format date if needed
    let formattedDate = articleData.date;
    if (formattedDate && formattedDate instanceof Date) {
      formattedDate = formattedDate.toISOString().split('T')[0];
    }

    const normalizedArticle = {
      id: articleData.id || editingArticle?.id,
      title: articleData.title,
      department: articleData.department,
      status: normalizedStatus,
      date: formattedDate,
      created_by: articleData.created_by || editingArticle?.created_by || ''
    };

    if (editingArticle) {
      // Update existing article
      setArticles(articles.map(a => 
        a.id === normalizedArticle.id ? normalizedArticle : a
      ));
    } else {
      // Add new article
      setArticles([normalizedArticle, ...articles]);
    }
    setShowAddModal(false);
    setEditingArticle(null);
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
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

  const stats = [
    {
      label: 'Total Articles',
      value: articles.length,
      bg: 'bg-gray-600',
      hoverBg: 'hover:bg-gray-700',
      textColor: 'text-white',
      icon: (
        <svg className="w-6 h-6 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
        </svg>
      )
    },
    {
      label: 'Approved',
      value: articles.filter(a => a.status === 'Approved').length,
      bg: 'bg-emerald-600',
      hoverBg: 'hover:bg-emerald-700',
      textColor: 'text-white',
      icon: (
        <svg className="w-6 h-6 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      label: 'Pending',
      value: articles.filter(a => a.status === 'Pending').length,
      bg: 'bg-amber-600',
      hoverBg: 'hover:bg-amber-700',
      textColor: 'text-white',
      icon: (
        <svg className="w-6 h-6 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      label: 'Rejected',
      value: articles.filter(a => a.status === 'Rejected').length,
      bg: 'bg-red-600',
      hoverBg: 'hover:bg-red-700',
      textColor: 'text-white',
      icon: (
        <svg className="w-6 h-6 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    }
  ];

  return (
    <AdminLayout title="Articles">
      {/* Header with Add Article Button */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <p className="text-sm text-gray-600">
          Manage all articles in the system
        </p>
        <button 
          onClick={handleAddNew}
          className="mt-3 sm:mt-0 bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 shadow-sm"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add New Article
        </button>
      </div>

      {/* Stats Cards with Hover Effects */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map((stat, index) => (
          <div 
            key={index}
            className={`${stat.bg} ${stat.hoverBg} rounded-xl p-5 shadow-sm transition-all duration-300 cursor-pointer transform hover:scale-105 hover:shadow-lg group`}
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-medium text-white/80 uppercase tracking-wider">
                  {stat.label}
                </p>
                <p className={`text-2xl font-bold ${stat.textColor} mt-1 group-hover:scale-110 transition-transform duration-300`}>
                  {stat.value}
                </p>
              </div>
              <div className="opacity-60 group-hover:opacity-100 transition-opacity duration-300">
                {stat.icon}
              </div>
            </div>
            {/* Progress bar indicator */}
            <div className="mt-3 h-1 w-full bg-white/20 rounded-full overflow-hidden">
              <div 
                className="h-full bg-white/60 rounded-full transition-all duration-500 group-hover:bg-white"
                style={{ 
                  width: `${articles.length > 0 ? (stat.value / articles.length) * 100 : 0}%` 
                }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Articles Table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-600 text-xs uppercase tracking-wider">#</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-600 text-xs uppercase tracking-wider">Title</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-600 text-xs uppercase tracking-wider">Department</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-600 text-xs uppercase tracking-wider">Status</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-600 text-xs uppercase tracking-wider">Date</th>
                <th className="text-center py-3 px-4 font-semibold text-gray-600 text-xs uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {currentArticles.length > 0 ? (
                currentArticles.map((article, index) => (
                  <tr key={article.id} className="hover:bg-gray-50 transition-colors duration-150">
                    <td className="py-3 px-4 text-gray-500 text-xs font-medium">
                      {String(startIndex + index + 1).padStart(2, '0')}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center text-gray-500 text-xs font-medium flex-shrink-0">
                          {article.title.charAt(0)}
                        </div>
                        <span className="font-medium text-gray-800 hover:text-blue-600 transition-colors cursor-pointer">
                          {article.title}
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-gray-600 text-xs bg-gray-100 px-2 py-1 rounded-full">
                        {article.department}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${getStatusBadge(article.status)}`}>
                        {getStatusIcon(article.status)}
                        {article.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-gray-500 text-sm">{article.date}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => handleView(article.id)}
                          className="inline-flex items-center gap-1 px-3 py-1 text-xs font-medium text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
                        >
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                          View
                        </button>
                        <button
                          onClick={() => handleEdit(article.id)}
                          className="inline-flex items-center gap-1 px-3 py-1 text-xs font-medium text-amber-700 bg-amber-50 hover:bg-amber-100 rounded-lg transition-colors"
                        >
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(article.id)}
                          className="inline-flex items-center gap-1 px-3 py-1 text-xs font-medium text-red-700 bg-red-50 hover:bg-red-100 rounded-lg transition-colors"
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
                  <td colSpan="6" className="py-12 text-center">
                    <div className="flex flex-col items-center justify-center">
                      <svg className="w-16 h-16 text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                      </svg>
                      <p className="text-gray-500 font-medium">No articles found</p>
                      <p className="text-gray-400 text-sm mt-1">Click "Add New Article" to create one.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {articles.length > itemsPerPage && (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-4 py-3 border-t border-gray-200 bg-gray-50">
            <p className="text-sm text-gray-600">
              Showing <span className="font-medium">{startIndex + 1}</span> to{' '}
              <span className="font-medium">{Math.min(endIndex, articles.length)}</span> of{' '}
              <span className="font-medium">{articles.length}</span> articles
            </p>
            <div className="flex gap-1">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-1.5 text-sm text-gray-600 border border-gray-200 rounded-lg hover:bg-white hover:border-gray-300 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"
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
                      ? 'bg-gray-800 text-white hover:bg-gray-700 shadow-sm'
                      : 'text-gray-600 hover:bg-white border border-transparent hover:border-gray-200'
                  }`}
                >
                  {page}
                </button>
              ))}
              
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-3 py-1.5 text-sm text-gray-600 border border-gray-200 rounded-lg hover:bg-white hover:border-gray-300 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"
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

      {/* Add/Edit Article Modal */}
      <AddArticles
        isOpen={showAddModal}
        onClose={() => {
          setShowAddModal(false);
          setEditingArticle(null);
        }}
        onSave={handleSaveArticle}
        article={editingArticle}
        isEditing={!!editingArticle}
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