import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import AdminLayout from '@/layouts/AdminLayout';
import AddArticles from './AddArticles';
import EditArticle from './EditArticle';
import ReviewArticle from './ReviewArticle';
import Modal, { ConfirmModal } from '@/components/admin/Modal';
import LoadingSpinner from '@/components/LoadingSpinner';

export default function Articles({ articles: initialArticles, departments = [] }) {
  const initialArticleList = Array.isArray(initialArticles) ? initialArticles : [];

  // State declarations
  const [articles, setArticles] = useState(initialArticleList);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Add permissions state
  const [userPermissions, setUserPermissions] = useState([]);
  const [loadingPermissions, setLoadingPermissions] = useState(true);

  // ✅ FIX #13: track fetch error separately from "no articles"
  const [articlesFetchError, setArticlesFetchError] = useState(false);

  // Search and filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('Approved');
  const [departmentFilter, setDepartmentFilter] = useState('All');

  // Modal states
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingArticle, setEditingArticle] = useState(null);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [articleToDelete, setArticleToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showArchiveModal, setShowArchiveModal] = useState(false);
  const [articleToArchive, setArticleToArchive] = useState(null);
  const [isArchiving, setIsArchiving] = useState(false);

  // Dropdown state
  const [openDropdownId, setOpenDropdownId] = useState(null);
  const dropdownRef = useRef(null);

  // Success / Error modal states
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [pendingSuccessAction, setPendingSuccessAction] = useState(null);

  // Fetch user permissions
  useEffect(() => {
    const fetchUserPermissions = async () => {
      try {
        const response = await axios.get('/user/permissions');
        if (response.data?.user?.permissions) {
          setUserPermissions(response.data.user.permissions);
        }
      } catch (error) {
        console.error('Failed to fetch user permissions:', error);
        setUserPermissions([]);
      } finally {
        setLoadingPermissions(false);
      }
    };

    fetchUserPermissions();
  }, []);

  // Fetch user articles
  useEffect(() => {
    let isMounted = true;

    const fetchUserArticles = async () => {
      try {
        const response = await axios.get('/user/articles');

        if (!isMounted) return;

        const userArticles = Array.isArray(response?.data?.articles) ? response.data.articles : [];
        setArticles(userArticles);
        setArticlesFetchError(false);
      } catch (error) {
        console.error('Failed to fetch user articles:', error);
        if (isMounted) {
          setArticlesFetchError(true);
          setArticles(prev => (prev.length > 0 ? prev : []));
        }
      }
    };

    fetchUserArticles();

    return () => {
      isMounted = false;
    };
  }, []);

  // Click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenDropdownId(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Permission check helper
  const hasPermission = (permission) => {
    return userPermissions.includes(permission);
  };

  const openSuccessModal = (message, onDismiss = null) => {
    setSuccessMessage(message);
    setPendingSuccessAction(onDismiss ? () => onDismiss : null);
    setShowSuccessModal(true);
  };

  const openErrorModal = (message) => {
    setErrorMessage(message);
    setShowErrorModal(true);
  };

  const closeSuccessModal = () => {
    setShowSuccessModal(false);
    setSuccessMessage('');
    if (pendingSuccessAction) {
      const action = pendingSuccessAction;
      setPendingSuccessAction(null);
      action();
    }
  };

  const getContentPreview = (content) => {
    if (typeof content !== 'string' || !content.trim()) return 'No content available';
    const plainText = content.replace(/<[^>]*>/g, '');
    const preview = plainText.substring(0, 100);
    return preview.length < plainText.length ? preview + '...' : preview;
  };

  // Filter articles
  const filteredArticles = articles.filter(article => {
    const normalizedSearchQuery = searchQuery.toLowerCase();
    const matchesSearch = [article.title, article.department, article.created_by]
      .some(value => String(value ?? '').toLowerCase().includes(normalizedSearchQuery));
    const matchesStatus = statusFilter === 'All' || article.status === statusFilter;
    const matchesDepartment = departmentFilter === 'All' || article.department === departmentFilter;
    return matchesSearch && matchesStatus && matchesDepartment;
  });

  // Pagination
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

  const handleView = async (article) => {
    if (String(article.status).toLowerCase() !== 'pending') {
      window.open(`/news/${article.id}`, '_blank', 'noopener,noreferrer');
      return;
    }

    try {
      const response = await axios.get(`/admin/articles/${article.id}`);
      const articleDetail = response?.data?.article || response?.data;

      if (!articleDetail) {
        openErrorModal('Failed to load article details.');
        return;
      }

      setSelectedArticle({
        ...article,
        ...articleDetail,
        sdg: articleDetail.sdg || [],
        images: articleDetail.images || [],
        imagePreviews: articleDetail.imagePreviews || articleDetail.images || [],
        department: articleDetail.department ?? article.department ?? '',
        content: articleDetail.content ?? article.content ?? '',
        date: articleDetail.date ?? article.date ?? '',
      });
      setShowReviewModal(true);
    } catch (error) {
      console.error('Failed to load pending article details:', error);
      openErrorModal(error.response?.data?.message || 'Failed to load article details. Please try again.');
    }
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
        openErrorModal('Failed to load article details');
        return;
      }

      setShowAddModal(false);
      setEditingArticle(article);
      setOpenDropdownId(null);
    } catch (error) {
      console.error('Failed to load article details:', error);
      openErrorModal('Failed to load article details. Please try again.');
    }
  };

  const handleDelete = (id) => {
    setArticleToDelete(id);
    setShowDeleteModal(true);
    setOpenDropdownId(null);
  };

  const handleArchive = (id) => {
    setArticleToArchive(id);
    setShowArchiveModal(true);
    setOpenDropdownId(null);
  };

  const confirmArchive = async () => {
    setIsArchiving(true);
    try {
      const response = await axios.put(`/admin/articles/${articleToArchive}/archive`, { status: 'pending' });

      if (response.status === 200 || response.data?.success) {
        setArticles(prevArticles =>
          prevArticles.map(article =>
            article.id === articleToArchive ? { ...article, status: 'Pending' } : article
          )
        );
        setShowArchiveModal(false);
        setArticleToArchive(null);
        openSuccessModal('Article moved back to pending status successfully. It will remain hidden from the website while it awaits approval.');
      }
    } catch (error) {
      console.error('Failed to archive article:', error);
      setShowArchiveModal(false);
      setArticleToArchive(null);
      openErrorModal(error.response?.data?.message || 'Failed to archive article. Please try again.');
    } finally {
      setIsArchiving(false);
    }
  };

  const confirmDelete = async () => {
    setIsDeleting(true);
    try {
      const response = await axios.delete(`/admin/articles/${articleToDelete}`);
      console.log('Delete response:', response);

      if (response.data?.success) {
        setArticles(prev => prev.filter(article => article.id !== articleToDelete));
        setShowDeleteModal(false);
        setArticleToDelete(null);
        openSuccessModal('Article deleted successfully. It has been removed from your articles list and is no longer available to view.');
      }
    } catch (error) {
      console.error('Failed to delete article:', error);
      console.error('Error response:', error.response?.data);
      console.error('Error status:', error.response?.status);
      setShowDeleteModal(false);
      setArticleToDelete(null);
      openErrorModal(error.response?.data?.message || 'Failed to delete article. Please try again.');
    } finally {
      setIsDeleting(false);
    }
  };

  const handleSaveArticle = (articleData) => {
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
      setArticles(prev => prev.map(a =>
        a.id === normalizedArticle.id ? normalizedArticle : a
      ));
    } else {
      if (normalizedArticle.id) {
        setArticles(prev => [normalizedArticle, ...prev]);
      } else {
        (async () => {
          try {
            const response = await axios.get('/user/articles');
            const userArticles = Array.isArray(response?.data?.articles) ? response.data.articles : [];
            setArticles(userArticles);
          } catch (err) {
            console.error('Failed to refresh articles after save:', err);
          }
        })();
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

  const uniqueDepartments = ['All', ...new Set(articles.map(a => a.department).filter(Boolean))];

  const permissionsReady = !loadingPermissions;
  const hasActiveFilters = searchQuery || statusFilter !== 'Approved' || departmentFilter !== 'All';

  return (
    <AdminLayout title="Articles">
      <div className="font-sans">
        {/* Header with Add Article Button */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
          <div>
            <p className="text-sm text-gray-600">
              Approved and pending articles from your department
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Showing approved and pending articles assigned to your department(s)
            </p>
          </div>

          {permissionsReady && hasPermission('articles') && (
            <button
              onClick={handleAddNew}
              className="mt-3 sm:mt-0 bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 shadow-sm"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Create New Article
            </button>
          )}
        </div>

        {/* Improved Search and Filters */}
        <div className="bg-white border border-gray-200 shadow-sm rounded-xl mb-6 overflow-hidden">
          <div className="p-4 flex flex-col md:flex-row gap-4 items-stretch md:items-center" autoComplete="off">
            
            {/* Search Input */}
            <div className="relative flex-1 w-full max-w-lg">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
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
                className="block w-full pl-10 pr-10 py-2.5 text-sm border border-gray-300 rounded-lg bg-gray-50 placeholder-gray-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all shadow-sm"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => handleFilterChange(setSearchQuery, '')}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>

            {/* Dropdown Filters */}
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <div className="relative min-w-[140px]">
                <select
                  value={statusFilter}
                  onChange={(e) => handleFilterChange(setStatusFilter, e.target.value)}
                  className="w-full appearance-none block pl-3 pr-10 py-2.5 text-sm border border-gray-300 rounded-lg bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all shadow-sm cursor-pointer"
                >
                  <option value="All">All Status</option>
                  <option value="Approved">Approved</option>
                  <option value="Pending">Pending</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>

              <div className="relative min-w-[190px]">
                <select
                  value={departmentFilter}
                  onChange={(e) => handleFilterChange(setDepartmentFilter, e.target.value)}
                  className="w-full appearance-none block pl-3 pr-10 py-2.5 text-sm border border-gray-300 rounded-lg bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all shadow-sm cursor-pointer"
                >
                  <option value="All">All Departments</option>
                  {uniqueDepartments.map(dept => (
                    <option key={dept} value={dept}>{dept}</option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>

              {/* Clear Filters Button */}
              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery('');
                    setStatusFilter('Approved');
                    setDepartmentFilter('All');
                    setCurrentPage(1);
                  }}
                  className="px-3 py-2.5 text-sm font-medium text-gray-600 hover:text-gray-900 bg-gray-50 hover:bg-gray-100 border border-gray-300 rounded-lg transition-colors flex items-center justify-center gap-2 shadow-sm whitespace-nowrap"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Filter Results Summary */}
          <div className="bg-gray-50 border-t border-gray-200 px-4 py-2.5 text-sm text-gray-600 flex items-center justify-between">
            {articlesFetchError ? (
              <span className="text-red-600 font-medium flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Failed to load articles. Please refresh the page.
              </span>
            ) : filteredArticles.length === 0 ? (
              <span>No articles found matching your criteria</span>
            ) : (
              <span>
                Found <span className="font-semibold text-gray-900">{filteredArticles.length}</span> article{filteredArticles.length !== 1 ? 's' : ''}
                {searchQuery && <span> matching "<span className="font-semibold text-gray-900">{searchQuery}</span>"</span>}
                {statusFilter !== 'Approved' && <span> with status <span className="font-semibold text-gray-900">{statusFilter}</span></span>}
                {departmentFilter !== 'All' && <span> in <span className="font-semibold text-gray-900">{departmentFilter}</span></span>}
              </span>
            )}
          </div>
        </div>

        {/* Articles Table */}
        <div className="bg-white border border-gray-200 shadow-sm rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm min-w-[900px] font-sans">
              <thead className="bg-gray-100 border-b border-gray-200 text-gray-700">
                <tr>
                  <th className="text-left py-3 px-4 font-semibold text-xs uppercase tracking-wider w-12">#</th>
                  <th className="text-left py-3 px-4 font-semibold text-xs uppercase tracking-wider">Title &amp; Content</th>
                  <th className="text-left py-3 px-4 font-semibold text-xs uppercase tracking-wider w-40">Department</th>
                  <th className="text-left py-3 px-4 font-semibold text-xs uppercase tracking-wider w-32">Status</th>
                  <th className="text-left py-3 px-4 font-semibold text-xs uppercase tracking-wider w-28">Date</th>
                  <th className="text-center py-3 px-4 font-semibold text-xs uppercase tracking-wider w-[200px]">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {currentArticles.length > 0 ? (
                  currentArticles.map((article, index) => (
                    <tr
                      key={article.id}
                      className={`transition-colors ${
                        index % 2 === 0
                          ? 'bg-white hover:bg-gray-50'
                          : 'bg-gray-50/60 hover:bg-gray-100/70'
                      }`}
                    >
                      <td className="py-3 px-4 text-gray-500 text-xs font-medium">
                        {String(startIndex + index + 1).padStart(2, '0')}
                      </td>

                      {/* Title & Content - Ensures Title is Fully Visible and Bold */}
                      <td className="py-3 px-4">
                        <div className="flex flex-col">
                          <span className="font-bold text-gray-900 whitespace-normal leading-tight">
                            {article.title}
                          </span>
                          <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                            {getContentPreview(article.content)}
                          </p>
                        </div>
                      </td>

                      <td className="py-3 px-4">
                        <span
                          className="inline-block max-w-full truncate px-2.5 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-700 border border-gray-200"
                          title={article.department}
                        >
                          {article.department}
                        </span>
                      </td>

                      <td className="py-3 px-4">
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium whitespace-nowrap ${getStatusBadge(
                            article.status
                          )}`}
                        >
                          {getStatusIcon(article.status)}
                          {article.status}
                        </span>
                      </td>

                      <td className="py-3 px-4 text-gray-500 text-sm whitespace-nowrap">
                        {article.date}
                      </td>

                      <td className="py-3 px-4">
                        <div className="flex items-center justify-center gap-2">
                          {permissionsReady ? (
                            <>
                              {/* View Button */}
                              {String(article.status).toLowerCase() !== 'pending' && (
                                <button
                                  type="button"
                                  onClick={() => handleView(article)}
                                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:text-gray-900 transition-colors shadow-sm"
                                >
                                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                  </svg>
                                  View
                                </button>
                              )}

                              {/* More Actions Dropdown */}
                              {(hasPermission('articles') || hasPermission('user_management')) && (
                                <div className="relative" ref={openDropdownId === article.id ? dropdownRef : null}>
                                  <button
                                    type="button"
                                    onClick={() => setOpenDropdownId(openDropdownId === article.id ? null : article.id)}
                                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:text-gray-900 transition-colors shadow-sm"
                                  >
                                    More
                                    <svg className="w-3.5 h-3.5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                  </button>

                                  {/* Dropdown Menu */}
                                  {openDropdownId === article.id && (
                                    <div className="absolute right-0 mt-1 w-36 bg-white border border-gray-200 rounded-lg shadow-lg z-50 py-1">
                                      {hasPermission('articles') && (
                                        <button
                                          type="button"
                                          onClick={() => handleEdit(article.id)}
                                          className="w-full text-left px-4 py-2 text-xs text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                                        >
                                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                          </svg>
                                          Edit
                                        </button>
                                      )}
                                      {String(article.status).toLowerCase() !== 'pending' && hasPermission('articles') && (
                                        <button
                                          type="button"
                                          onClick={() => handleArchive(article.id)}
                                          className="w-full text-left px-4 py-2 text-xs text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                                        >
                                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M7 8V6a1 1 0 011-1h8a1 1 0 011 1v2m-9 4h10l-1 8H7l-1-8z" />
                                          </svg>
                                          Archive
                                        </button>
                                      )}
                                      {hasPermission('user_management') && (
                                        <button
                                          type="button"
                                          onClick={() => handleDelete(article.id)}
                                          className="w-full text-left px-4 py-2 text-xs text-red-600 hover:bg-red-50 flex items-center gap-2"
                                        >
                                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                          </svg>
                                          Delete
                                        </button>
                                      )}
                                    </div>
                                  )}
                                </div>
                              )}
                            </>
                          ) : (
                            <span className="text-xs text-gray-400">Loading…</span>
                          )}
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
                        <p className="text-gray-500 font-medium">
                          {articlesFetchError ? 'Could not load articles' : 'No articles found'}
                        </p>
                        <p className="text-gray-400 text-sm mt-1">
                          {articlesFetchError
                            ? 'Please refresh the page to try again.'
                            : hasActiveFilters
                              ? 'Try adjusting your search or filters'
                              : 'Click "Create New Article" to create one.'}
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

      <ReviewArticle
        isOpen={showReviewModal}
        onClose={() => {
          setShowReviewModal(false);
          setSelectedArticle(null);
        }}
        article={selectedArticle}
        departments={departments}
      />

      {/* Archive Confirmation Modal */}
      <ConfirmModal
        isOpen={showArchiveModal}
        onClose={() => {
          setShowArchiveModal(false);
          setArticleToArchive(null);
        }}
        onConfirm={confirmArchive}
        title="Archive Article"
        message="Are you sure you want to archive this article? It will be moved back to pending status and will not be visible on the website until it is approved again."
        confirmText="Archive"
        cancelText="Cancel"
        confirmColor="bg-gray-600 hover:bg-gray-700"
        loading={isArchiving}
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

      {(isDeleting || isArchiving) && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="rounded-xl bg-white px-8 py-6 shadow-2xl">
            <LoadingSpinner
              size={48}
              color="text-emerald-600"
              text={isDeleting ? 'Deleting article...' : 'Archiving article...'}
            />
          </div>
        </div>
      )}

      <Modal
        isOpen={showSuccessModal}
        onClose={closeSuccessModal}
        title="Success"
        size="sm"
      >
        <div className="flex min-h-[180px] flex-col items-center px-2 py-4 text-center">
          <p className="mb-7 text-base leading-relaxed text-gray-600">{successMessage}</p>
          <div className="mt-auto flex w-full justify-center">
            <button
              type="button"
              onClick={closeSuccessModal}
              className="min-w-[76px] rounded-lg bg-gray-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-300"
            >
              OK
            </button>
          </div>
        </div>
      </Modal>

      {/* Error Modal */}
      <ErrorModal
        isOpen={showErrorModal}
        onClose={() => {
          setShowErrorModal(false);
          setErrorMessage('');
        }}
        title="Error"
        message={errorMessage}
      />
    </AdminLayout>
  );
}

// ============================================
// Error Modal component (no native alert)
// ============================================
function ErrorModal({ isOpen, onClose, title = 'Error', message = '' }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 font-sans">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-md p-6">
        <div className="flex flex-col items-center text-center">
          <div className="w-14 h-14 rounded-full bg-red-100 flex items-center justify-center mb-4">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
          <p className="text-sm text-gray-600 whitespace-pre-line mb-6">{message}</p>
          <button
            type="button"
            onClick={onClose}
            className="w-full px-5 py-2.5 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
}