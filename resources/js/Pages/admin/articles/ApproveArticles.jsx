// ApproveArticles.jsx
import { useState } from 'react';
import axios from 'axios';
import AdminLayout from '@/layouts/AdminLayout';
import { ConfirmModal } from '@/components/admin/Modal';
import ReviewArticle from './ReviewArticle';

export default function ApproveArticles({ articles: initialArticles = [], departments = [] }) {
  // Use articles from controller or empty array as fallback
  const normalizeStatus = (status) => {
    const raw = String(status ?? '').trim();
    const value = raw.toLowerCase();

    if (value === 'approved' || value === 'published') return 'Published';
    if (value === 'pending' || value === 'draft') return 'Pending';
    if (value === 'rejected') return 'Rejected';
    if (value === 'archived') return 'Archived';
    if (!raw) return 'Pending';

    return raw.charAt(0).toUpperCase() + raw.slice(1).toLowerCase();
  };

  const [articles, setArticles] = useState((initialArticles || []).map(article => ({
    ...article,
    status: normalizeStatus(article.status),
  })));
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedIds, setSelectedIds] = useState(new Set());
  const [activeTab, setActiveTab] = useState('pending'); // 'pending' or 'rejected'
  const itemsPerPage = 8;

  // Modal states
  const [showApproveModal, setShowApproveModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  // Filter articles based on active tab
  const pendingArticles = articles.filter(article => normalizeStatus(article.status) === 'Pending');
  const rejectedArticles = articles.filter(article => normalizeStatus(article.status) === 'Rejected');

  // Get current articles based on active tab
  const displayArticles = activeTab === 'pending' ? pendingArticles : rejectedArticles;
  
  // Calculate pagination
  const totalPages = Math.ceil(displayArticles.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentArticles = displayArticles.slice(startIndex, endIndex);

  const getStatusBadge = (status) => {
    const normalizedStatus = normalizeStatus(status);
    const statusStyles = {
      'Published': 'bg-emerald-100 text-emerald-700 border border-emerald-200',
      'Pending': 'bg-amber-100 text-amber-700 border border-amber-200',
      'Rejected': 'bg-red-100 text-red-700 border border-red-200',
      'Archived': 'bg-gray-100 text-gray-700 border border-gray-200'
    };
    return statusStyles[normalizedStatus] || 'bg-gray-100 text-gray-700 border border-gray-200';
  };

  const getStatusIcon = (status) => {
    const normalizedStatus = normalizeStatus(status);
    const icons = {
      'Published': (
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

  const handleView = async (article) => {
    try {
      const response = await axios.get(`/admin/articles/${article.id}`);
      const articleDetail = response?.data?.article || article;

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
      setShowViewModal(true);
    } catch (error) {
      console.error('Failed to load article details:', error);
      setSelectedArticle(article);
      setShowViewModal(true);
    }
  };

  const handleApprove = (article) => {
    setSelectedArticle(article);
    setShowApproveModal(true);
  };

  const handleReject = (article) => {
    setSelectedArticle(article);
    setShowRejectModal(true);
  };

  const toggleSelectArticle = (articleId) => {
    const newSelected = new Set(selectedIds);
    if (newSelected.has(articleId)) {
      newSelected.delete(articleId);
    } else {
      newSelected.add(articleId);
    }
    setSelectedIds(newSelected);
  };

  const toggleSelectAll = () => {
    const visibleArticles = activeTab === 'pending' ? pendingArticles : rejectedArticles;

    if (selectedIds.size === visibleArticles.length && visibleArticles.length > 0) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(visibleArticles.map(a => a.id)));
    }
  };

  const bulkApprove = async () => {
    if (selectedIds.size === 0) {
      alert('Please select articles to approve');
      return;
    }

    setIsProcessing(true);
    try {
      const promises = Array.from(selectedIds).map(id =>
        axios.put(`/admin/articles/${id}/approve`, { status: 'approved' })
      );
      
      await Promise.all(promises);

      setArticles(articles.map(a => 
        selectedIds.has(a.id) 
          ? { ...a, status: 'Published' } 
          : a
      ));
      setSelectedIds(new Set());
      console.log(`${selectedIds.size} articles approved successfully`);
    } catch (error) {
      console.error('Failed to approve articles:', error);
      alert('Failed to approve some articles. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const bulkReject = async () => {
    if (selectedIds.size === 0) {
      alert('Please select articles to reject');
      return;
    }

    setIsProcessing(true);
    try {
      const promises = Array.from(selectedIds).map(id =>
        axios.put(`/admin/articles/${id}/reject`, { status: 'rejected' })
      );
      
      await Promise.all(promises);

      setArticles(articles.map(a => 
        selectedIds.has(a.id) 
          ? { ...a, status: 'Rejected' } 
          : a
      ));
      setSelectedIds(new Set());
      console.log(`${selectedIds.size} articles rejected successfully`);
    } catch (error) {
      console.error('Failed to reject articles:', error);
      alert('Failed to reject some articles. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const confirmApprove = async () => {
    setIsProcessing(true);
    try {
      const response = await axios.put(
        `/admin/articles/${selectedArticle.id}/approve`,
        { status: 'approved' }
      );

      if (response.status === 200 || response.data.success) {
        setArticles(articles.map(a => 
          a.id === selectedArticle.id 
            ? { ...a, status: 'Published' } 
            : a
        ));
        console.log('Article approved successfully');
      }
    } catch (error) {
      console.error('Failed to approve article:', error);
      alert('Failed to approve article. Please try again.');
    } finally {
      setShowApproveModal(false);
      setIsProcessing(false);
      setSelectedArticle(null);
    }
  };

  const confirmReject = async () => {
    setIsProcessing(true);
    try {
      const response = await axios.put(
        `/admin/articles/${selectedArticle.id}/reject`,
        { status: 'rejected' }
      );

      if (response.status === 200 || response.data.success) {
        setArticles(articles.map(a => 
          a.id === selectedArticle.id 
            ? { ...a, status: 'Rejected' } 
            : a
        ));
        console.log('Article rejected successfully');
      }
    } catch (error) {
      console.error('Failed to reject article:', error);
      alert('Failed to reject article. Please try again.');
    } finally {
      setShowRejectModal(false);
      setIsProcessing(false);
      setSelectedArticle(null);
    }
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
    <AdminLayout title="Approve Articles" activePage="approve-articles">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <p className="text-sm text-gray-600">
          Review and manage article submissions
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="mb-6 border-b border-gray-200">
        <div className="flex gap-8">
          <button
            onClick={() => {
              setActiveTab('pending');
              setCurrentPage(1);
              setSelectedIds(new Set());
            }}
            className={`px-4 py-3 font-medium text-sm border-b-2 transition-all ${
              activeTab === 'pending'
                ? 'border-gray-700 text-gray-700'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Pending ({pendingArticles.length})
            </div>
          </button>
          <button
            onClick={() => {
              setActiveTab('rejected');
              setCurrentPage(1);
              setSelectedIds(new Set());
            }}
            className={`px-4 py-3 font-medium text-sm border-b-2 transition-all ${
              activeTab === 'rejected'
                ? 'border-gray-700 text-gray-700'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              Rejected ({rejectedArticles.length})
            </div>
          </button>
        </div>
      </div>

      {/* Bulk Actions - Outside the table, between tabs and table */}
      {selectedIds.size > 0 && (
        <div className="mb-6 p-4 bg-gray-100 border border-gray-300 rounded-xl flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-gray-800">
              {selectedIds.size} article{selectedIds.size !== 1 ? 's' : ''} selected
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {activeTab === 'pending' ? (
              <>
                <button
                  onClick={bulkApprove}
                  disabled={isProcessing}
                  className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Approve Selected
                </button>
                <button
                  onClick={bulkReject}
                  disabled={isProcessing}
                  className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  Reject Selected
                </button>
              </>
            ) : (
              <button
                onClick={bulkApprove}
                disabled={isProcessing}
                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Restore Selected
              </button>
            )}
            <button
              onClick={() => setSelectedIds(new Set())}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 hover:bg-gray-300 rounded-lg transition-colors"
            >
              Clear Selection
            </button>
          </div>
        </div>
      )}

      {/* Articles Table */}
      <div className="bg-white border border-gray-200 shadow-lg overflow-hidden">
        <div className="overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-700 text-white">
                <th className="text-left py-4 px-4 font-semibold text-xs uppercase tracking-wider">
                  <input 
                    type="checkbox"
                    checked={selectedIds.size === displayArticles.length && displayArticles.length > 0}
                    onChange={toggleSelectAll}
                    className="w-4 h-4 rounded cursor-pointer bg-white/20 border-white/30 checked:bg-gray-600"
                  />
                </th>
                <th className="text-left py-4 px-4 font-semibold text-xs uppercase tracking-wider">#</th>
                <th className="text-left py-4 px-4 font-semibold text-xs uppercase tracking-wider">Title & Content</th>
                <th className="text-left py-4 px-4 font-semibold text-xs uppercase tracking-wider">Department</th>
                <th className="text-left py-4 px-4 font-semibold text-xs uppercase tracking-wider">Status</th>
                <th className="text-left py-4 px-4 font-semibold text-xs uppercase tracking-wider">Date</th>
                <th className="text-center py-4 px-4 font-semibold text-xs uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {currentArticles.length > 0 ? (
                currentArticles.map((article, index) => (
                  <tr 
                    key={article.id} 
                    className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-gray-300 transition-all duration-200 group`}
                  >
                    <td className="py-3 px-4">
                      <input 
                        type="checkbox"
                        checked={selectedIds.has(article.id)}
                        onChange={() => toggleSelectArticle(article.id)}
                        className="w-4 h-4 rounded cursor-pointer"
                      />
                    </td>
                    <td className="py-3 px-4 text-gray-500 text-xs font-medium">
                      {String(startIndex + index + 1).padStart(2, '0')}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        {article.image ? (
                          <img 
                            src={article.image} 
                            alt={article.title}
                            className="w-12 h-12 rounded-lg object-cover flex-shrink-0 border border-gray-200"
                            onError={(e) => {
                              e.target.style.display = 'none';
                              e.target.nextElementSibling.style.display = 'flex';
                            }}
                          />
                        ) : null}
                        <div 
                          className={`${article.image ? 'hidden' : 'w-12 h-12 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-lg flex items-center justify-center text-white text-xs font-bold flex-shrink-0'}`}
                        >
                          {article.title.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <span className="font-semibold text-gray-800 hover:text-emerald-600 transition-colors cursor-pointer">
                            {article.title}
                          </span>
                          <p className="text-xs text-gray-500 mt-0.5 truncate max-w-xs">
                            {getContentPreview(article.content)}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700 border border-gray-200">
                        {article.department}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${getStatusBadge(article.status)}`}>
                        {getStatusIcon(article.status)}
                        {article.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-gray-500 text-sm">
                      {article.date}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => handleView(article)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-all shadow-sm hover:shadow"
                        >
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                          Review
                        </button>
                        {activeTab === 'pending' ? (
                          <>
                            <button
                              onClick={() => handleApprove(article)}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-all shadow-sm hover:shadow"
                            >
                              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                              Approve
                            </button>
                            <button
                              onClick={() => handleReject(article)}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition-all shadow-sm hover:shadow"
                            >
                              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                              </svg>
                              Reject
                            </button>
                          </>
                        ) : (
                          <button
                            onClick={() => handleApprove(article)}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-all shadow-sm hover:shadow"
                          >
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            Restore
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="py-12 text-center bg-gray-50">
                    <div className="flex flex-col items-center justify-center">
                      <svg className="w-16 h-16 text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <p className="text-gray-500 font-medium">
                        {activeTab === 'pending' ? 'No pending articles' : 'No rejected articles'}
                      </p>
                      <p className="text-gray-400 text-sm mt-1">
                        {activeTab === 'pending' ? 'All articles have been reviewed.' : 'No articles have been rejected.'}
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {displayArticles.length > 0 && (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-4 py-3 border-t border-gray-200 bg-gray-50">
            <p className="text-sm text-gray-600">
              Showing <span className="font-medium text-gray-800">{displayArticles.length > 0 ? startIndex + 1 : 0}</span> to{' '}
              <span className="font-medium text-gray-800">{Math.min(endIndex, displayArticles.length)}</span> of{' '}
              <span className="font-medium text-gray-800">{displayArticles.length}</span> {activeTab === 'pending' ? 'pending' : 'rejected'} articles
            </p>
            {displayArticles.length > itemsPerPage && (
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
            )}
          </div>
        )}
      </div>

      <ReviewArticle
        isOpen={showViewModal}
        onClose={() => {
          setShowViewModal(false);
          setSelectedArticle(null);
        }}
        article={selectedArticle}
        departments={departments}
        onApprove={() => {
          setShowViewModal(false);
          setShowApproveModal(true);
        }}
        onReject={() => {
          setShowViewModal(false);
          setShowRejectModal(true);
        }}
      />

      {/* Approve Confirmation Modal */}
      <ConfirmModal
        isOpen={showApproveModal}
        onClose={() => {
          setShowApproveModal(false);
          setSelectedArticle(null);
        }}
        onConfirm={confirmApprove}
        title="Approve Article"
        message={`Are you sure you want to approve "${selectedArticle?.title}"? This article will be published immediately.`}
        confirmText="Approve"
        cancelText="Cancel"
        confirmColor="bg-emerald-600 hover:bg-emerald-700"
        loading={isProcessing}
      />

      {/* Reject Confirmation Modal */}
      <ConfirmModal
        isOpen={showRejectModal}
        onClose={() => {
          setShowRejectModal(false);
          setSelectedArticle(null);
        }}
        onConfirm={confirmReject}
        title="Reject Article"
        message={`Are you sure you want to reject "${selectedArticle?.title}"? This action can be undone by editing the article.`}
        confirmText="Reject"
        cancelText="Cancel"
        confirmColor="bg-red-600 hover:bg-red-700"
        loading={isProcessing}
      />
    </AdminLayout>
  );
}