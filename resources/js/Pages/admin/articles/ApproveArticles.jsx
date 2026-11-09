// ApproveArticles.jsx
import { useState, useEffect } from 'react';
import axios from 'axios';
import AdminLayout from '@/layouts/AdminLayout';
import Modal, { ConfirmModal } from '@/components/admin/Modal';
import ReviewArticle from './ReviewArticle';
import LoadingSpinner from '@/components/LoadingSpinner';

// ─────────────────────────────────────────────────────────────
// CONFIG: change this to true if "Restore" should publish
// immediately instead of sending the article back to Pending.
// ─────────────────────────────────────────────────────────────
const RESTORE_PUBLISHES_IMMEDIATELY = false;

// Strip HTML to readable plain text (shared logic with AddArticles)
function htmlToText(html = '') {
  if (!html) return '';
  if (typeof window === 'undefined' || typeof DOMParser === 'undefined') {
    return String(html).replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ').trim();
  }
  const doc = new DOMParser().parseFromString(String(html), 'text/html');
  doc.querySelectorAll('br').forEach(el => el.replaceWith('\n'));
  doc.querySelectorAll('a').forEach(anchor => {
    const href = anchor.getAttribute('href');
    if (!href) return;
    const label = anchor.textContent.trim();
    anchor.replaceWith(label && label !== href ? `[${label}](${href})` : href);
  });
  return doc.body.textContent.replace(/\u00a0/g, ' ').replace(/\n{3,}/g, '\n\n').trim();
}

// Limit a title to a maximum number of words, appending "..." if truncated
function limitWords(text = '', maxWords = 7) {
  if (!text) return '';
  const words = String(text).trim().split(/\s+/);
  if (words.length <= maxWords) return words.join(' ');
  return words.slice(0, maxWords).join(' ') + '...';
}

export default function ApproveArticles({ articles: initialArticles = [], departments = [] }) {
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
  const [activeTab, setActiveTab] = useState('pending');
  const itemsPerPage = 8;

  // Modal states
  const [showApproveModal, setShowApproveModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [showRestoreModal, setShowRestoreModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [successModal, setSuccessModal] = useState(null);

  // Processing states
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingMessage, setProcessingMessage] = useState('');
  const [viewLoadingId, setViewLoadingId] = useState(null);
  const [deleteLoadingId, setDeleteLoadingId] = useState(null);

  // Inline banner (replaces alert())
  const [banner, setBanner] = useState(null); // { type, message }

  // ── Sync when parent passes new articles ───────────────────
  useEffect(() => {
    setArticles((initialArticles || []).map(article => ({
      ...article,
      status: normalizeStatus(article.status),
    })));
  }, [initialArticles]);

  // ── Derived lists ──────────────────────────────────────────
  const pendingArticles = articles.filter(a => normalizeStatus(a.status) === 'Pending');
  const rejectedArticles = articles.filter(a => normalizeStatus(a.status) === 'Rejected');
  const displayArticles = activeTab === 'pending' ? pendingArticles : rejectedArticles;

  const totalPages = Math.ceil(displayArticles.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentArticles = displayArticles.slice(startIndex, endIndex);

  // ── Clamp current page when list shrinks ───────────────────
  useEffect(() => {
    if (totalPages > 0 && currentPage > totalPages) {
      setCurrentPage(totalPages);
    } else if (totalPages === 0 && currentPage !== 1) {
      setCurrentPage(1);
    }
  }, [totalPages, currentPage]);

  // ── Badge / icon helpers ───────────────────────────────────
  const getStatusBadge = (status) => {
    const normalizedStatus = normalizeStatus(status);
    const statusStyles = {
      'Published': 'bg-emerald-100 text-emerald-700 border border-emerald-200',
      'Pending': 'bg-amber-100 text-amber-700 border border-amber-200',
      'Rejected': 'bg-red-100 text-red-700 border border-red-200',
      'Archived': 'bg-gray-100 text-gray-700 border border-gray-200',
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
      ),
    };
    return icons[normalizedStatus] || null;
  };

  // ── View ───────────────────────────────────────────────────
  const handleView = async (article) => {
    setViewLoadingId(article.id);
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
    } finally {
      setViewLoadingId(null);
    }
  };

  // ── Per-row action openers ─────────────────────────────────
  const handleApprove = (article) => {
    setSelectedArticle(article);
    setShowApproveModal(true);
  };

  const handleReject = (article) => {
    setSelectedArticle(article);
    setShowRejectModal(true);
  };

  const handleRestore = (article) => {
    setSelectedArticle(article);
    setShowRestoreModal(true);
  };

  const handleDelete = (article) => {
    setSelectedArticle(article);
    setShowDeleteModal(true);
  };

  // ── Selection ──────────────────────────────────────────────
  const toggleSelectArticle = (articleId) => {
    setSelectedIds(prev => {
      const next = new Set(prev);
      if (next.has(articleId)) next.delete(articleId);
      else next.add(articleId);
      return next;
    });
  };

  const allOnPageSelected =
    currentArticles.length > 0 && currentArticles.every(a => selectedIds.has(a.id));
  const someOnPageSelected =
    currentArticles.some(a => selectedIds.has(a.id)) && !allOnPageSelected;

  const toggleSelectAll = () => {
    setSelectedIds(prev => {
      const next = new Set(prev);
      if (allOnPageSelected) {
        currentArticles.forEach(a => next.delete(a.id));
      } else {
        currentArticles.forEach(a => next.add(a.id));
      }
      return next;
    });
  };

  // ── Shared bulk runner (allSettled + summary banner) ───────
  const runBulk = async ({ endpoint, payloadStatus, nextStatus, verb }) => {
    const ids = Array.from(selectedIds);
    if (ids.length === 0) {
      setBanner({ type: 'warning', message: 'Please select articles first.' });
      return;
    }

    setIsProcessing(true);
    setProcessingMessage(`${verb.charAt(0).toUpperCase()}${verb.slice(1)} articles...`);
    setBanner(null);

    try {
      const results = await Promise.allSettled(
        ids.map(id => axios.put(`/admin/articles/${id}/${endpoint}`, { status: payloadStatus }))
      );

      const succeededIds = new Set();
      results.forEach((result, i) => {
        const ok = result.status === 'fulfilled' && result.value?.data?.success !== false;
        if (ok) succeededIds.add(ids[i]);
      });

      if (succeededIds.size > 0) {
        setArticles(prev =>
          prev.map(a => (succeededIds.has(a.id) ? { ...a, status: nextStatus } : a))
        );
      }

      const failed = ids.length - succeededIds.size;
      if (failed === 0) {
        const actionTitle = verb === 'approved'
          ? 'Articles approved successfully'
          : verb === 'rejected'
            ? 'Articles rejected successfully'
            : 'Articles restored successfully';
        setSuccessModal({
          title: actionTitle,
          message: `${succeededIds.size} article${succeededIds.size !== 1 ? 's' : ''} ${verb} successfully.`,
        });
      } else if (succeededIds.size === 0) {
        setBanner({
          type: 'error',
          message: `Failed to ${verb} ${failed} article${failed !== 1 ? 's' : ''}. Please try again.`,
        });
      } else {
        setBanner({
          type: 'warning',
          message: `${succeededIds.size} ${verb}, ${failed} failed. Please retry the failed one${failed !== 1 ? 's' : ''}.`,
        });
      }

      setSelectedIds(new Set());
    } catch (error) {
      console.error(`Bulk ${verb} failed:`, error);
      setBanner({ type: 'error', message: `Failed to ${verb} articles. Please try again.` });
    } finally {
      setIsProcessing(false);
      setProcessingMessage('');
    }
  };

  const bulkApprove = () => runBulk({
    endpoint: 'approve',
    payloadStatus: 'approved',
    nextStatus: 'Published',
    verb: 'approved',
  });

  const bulkReject = () => runBulk({
    endpoint: 'reject',
    payloadStatus: 'rejected',
    nextStatus: 'Rejected',
    verb: 'rejected',
  });

  const bulkRestore = () => runBulk(
    RESTORE_PUBLISHES_IMMEDIATELY
      ? { endpoint: 'approve', payloadStatus: 'approved', nextStatus: 'Published', verb: 'restored' }
      // Changed 'restore' to 'approve' here to fix the 404 error
      : { endpoint: 'approve', payloadStatus: 'pending', nextStatus: 'Pending', verb: 'restored' }
  );

  // ── Single-article confirm handlers ────────────────────────
  // Keep the modal open on failure so the user can retry.
  const confirmApprove = async () => {
    if (!selectedArticle) return;
    setIsProcessing(true);
    setProcessingMessage('Approving article...');
    setBanner(null);
    try {
      const response = await axios.put(
        `/admin/articles/${selectedArticle.id}/approve`,
        { status: 'approved' }
      );
      if (response.data?.success === false) {
        throw new Error(response.data?.message || 'Approval failed');
      }
      setArticles(prev =>
        prev.map(a => (a.id === selectedArticle.id ? { ...a, status: 'Published' } : a))
      );
      setSuccessModal({
        title: 'Article approved successfully',
        message: 'The article has been approved and is now published.'
      });
      setShowApproveModal(false);
      setSelectedArticle(null);
    } catch (error) {
      console.error('Failed to approve article:', error);
      setBanner({
        type: 'error',
        message: error.response?.data?.message || 'Failed to approve article. Please try again.',
      });
    } finally {
      setIsProcessing(false);
      setProcessingMessage('');
    }
  };

  const confirmReject = async () => {
    if (!selectedArticle) return;
    setIsProcessing(true);
    setProcessingMessage('Rejecting article...');
    setBanner(null);
    try {
      const response = await axios.put(
        `/admin/articles/${selectedArticle.id}/reject`,
        { status: 'rejected' }
      );
      if (response.data?.success === false) {
        throw new Error(response.data?.message || 'Rejection failed');
      }
      setArticles(prev =>
        prev.map(a => (a.id === selectedArticle.id ? { ...a, status: 'Rejected' } : a))
      );
      setSuccessModal({
        title: 'Article rejected successfully',
        message: 'The article has been rejected.'
      });
      setShowRejectModal(false);
      setSelectedArticle(null);
    } catch (error) {
      console.error('Failed to reject article:', error);
      setBanner({
        type: 'error',
        message: error.response?.data?.message || 'Failed to reject article. Please try again.',
      });
    } finally {
      setIsProcessing(false);
      setProcessingMessage('');
    }
  };

  const confirmRestore = async () => {
    if (!selectedArticle) return;
    setIsProcessing(true);
    setProcessingMessage('Restoring article...');
    setBanner(null);
    try {
      // Changed 'restore' to 'approve' here to fix the 404 error
      const endpoint = RESTORE_PUBLISHES_IMMEDIATELY ? 'approve' : 'approve';
      const payloadStatus = RESTORE_PUBLISHES_IMMEDIATELY ? 'approved' : 'pending';
      const nextStatus = RESTORE_PUBLISHES_IMMEDIATELY ? 'Published' : 'Pending';

      const response = await axios.put(
        `/admin/articles/${selectedArticle.id}/${endpoint}`,
        { status: payloadStatus }
      );
      if (response.data?.success === false) {
        throw new Error(response.data?.message || 'Restore failed');
      }
      setArticles(prev =>
        prev.map(a => (a.id === selectedArticle.id ? { ...a, status: nextStatus } : a))
      );
      setSuccessModal({
        title: 'Article restored successfully',
        message: RESTORE_PUBLISHES_IMMEDIATELY
          ? 'The article has been restored and published.'
          : 'The article has been restored to Pending for re-review.'
      });
      setShowRestoreModal(false);
      setSelectedArticle(null);
    } catch (error) {
      console.error('Failed to restore article:', error);
      setBanner({
        type: 'error',
        message: error.response?.data?.message || 'Failed to restore article. Please try again.',
      });
    } finally {
      setIsProcessing(false);
      setProcessingMessage('');
    }
  };

  const confirmDelete = async () => {
    if (!selectedArticle) return;
    setIsProcessing(true);
    setDeleteLoadingId(selectedArticle.id);
    setProcessingMessage('Deleting article...');
    setBanner(null);
    try {
      const response = await axios.delete(`/admin/articles/${selectedArticle.id}`);
      if (response.data?.success === false) {
        throw new Error(response.data?.message || 'Delete failed');
      }
      // Remove from local state and clear any selection
      setArticles(prev => prev.filter(a => a.id !== selectedArticle.id));
      setSelectedIds(prev => {
        const next = new Set(prev);
        next.delete(selectedArticle.id);
        return next;
      });
      setSuccessModal({
        title: 'Article deleted successfully',
        message: `"${selectedArticle.title}" has been permanently deleted.`,
      });
      setShowDeleteModal(false);
      setSelectedArticle(null);
    } catch (error) {
      console.error('Failed to delete article:', error);
      setBanner({
        type: 'error',
        message: error.response?.data?.message || 'Failed to delete article. Please try again.',
      });
    } finally {
      setIsProcessing(false);
      setDeleteLoadingId(null);
      setProcessingMessage('');
    }
  };

  // ── Pagination helpers ─────────────────────────────────────
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    let start = Math.max(1, currentPage - 2);
    const end = Math.min(totalPages, start + maxVisible - 1);
    if (end - start < maxVisible - 1) {
      start = Math.max(1, end - maxVisible + 1);
    }
    for (let i = start; i <= end; i++) pages.push(i);
    return pages;
  };

  const getContentPreview = (content) => {
    if (!content) return 'No content available';
    const plainText = htmlToText(content);
    if (!plainText) return 'No content available';
    const preview = plainText.substring(0, 100);
    return preview.length < plainText.length ? preview + '...' : preview;
  };

  const bannerStyles = {
    success: 'bg-emerald-50 border-emerald-200 text-emerald-800',
    error: 'bg-red-50 border-red-200 text-red-800',
    warning: 'bg-amber-50 border-amber-200 text-amber-800',
  };

  // ── Render ─────────────────────────────────────────────────
  return (
    <AdminLayout title="Approve Articles" activePage="approve-articles">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <p className="text-sm text-gray-600">
          Review and manage article submissions
        </p>
      </div>

      {/* Inline banner */}
      {banner && (
        <div className={`mb-4 flex items-start justify-between gap-4 border rounded-lg px-4 py-3 text-sm ${bannerStyles[banner.type] || bannerStyles.error}`}>
          <span>{banner.message}</span>
          <button
            type="button"
            onClick={() => setBanner(null)}
            className="text-xs font-medium underline hover:no-underline"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Tab Navigation */}
      <div className="mb-6 border-b border-gray-200">
        <div className="flex gap-8">
          <button
            onClick={() => {
              setActiveTab('pending');
              setCurrentPage(1);
              setSelectedIds(new Set());
              setBanner(null);
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
              setBanner(null);
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

      {/* Bulk Actions */}
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
                  {isProcessing ? (
                    <>
                      <LoadingSpinner size={16} color="text-white" />
                      Approving...
                    </>
                  ) : (
                    <>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Approve Selected
                    </>
                  )}
                </button>
                <button
                  onClick={bulkReject}
                  disabled={isProcessing}
                  className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow"
                >
                  {isProcessing ? (
                    <>
                      <LoadingSpinner size={16} color="text-white" />
                      Rejecting...
                    </>
                  ) : (
                    <>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      Reject Selected
                    </>
                  )}
                </button>
              </>
            ) : (
              <button
                onClick={bulkRestore}
                disabled={isProcessing}
                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow"
              >
                {isProcessing ? (
                  <>
                    <LoadingSpinner size={16} color="text-white" />
                    Restoring...
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                    </svg>
                    Restore Selected
                  </>
                )}
              </button>
            )}
            <button
              onClick={() => setSelectedIds(new Set())}
              disabled={isProcessing}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 hover:bg-gray-300 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
              <tr className="bg-gray-700 text-white divide-x divide-white/25">
                <th className="text-left py-4 px-4 font-semibold text-xs uppercase tracking-wider">
                  <input
                    type="checkbox"
                    checked={allOnPageSelected}
                    ref={el => {
                      if (el) el.indeterminate = someOnPageSelected;
                    }}
                    onChange={toggleSelectAll}
                    className="w-4 h-4 rounded cursor-pointer bg-white/20 border-white/30 checked:bg-gray-600"
                  />
                </th>
                <th className="text-left py-4 px-4 font-semibold text-xs uppercase tracking-wider">#</th>
                <th className="text-left py-4 px-4 font-semibold text-xs uppercase tracking-wider">Title &amp; Content</th>
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
                    className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-gray-100 transition-all duration-200 group`}
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
                      <div>
                        <button
                          type="button"
                          onClick={() => handleView(article)}
                          className="font-semibold text-gray-800 hover:text-emerald-600 transition-colors text-left"
                        >
                          {limitWords(article.title, 7)}
                        </button>
                        <p className="text-xs text-gray-500 mt-0.5 truncate max-w-xs">
                          {getContentPreview(article.content)}
                        </p>
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
                      <div className="flex items-center justify-center gap-2 flex-wrap">
                        <button
                          onClick={() => handleView(article)}
                          disabled={viewLoadingId === article.id}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-all shadow-sm hover:shadow disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {viewLoadingId === article.id ? (
                            <LoadingSpinner size={14} color="text-white" />
                          ) : (
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                          )}
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
                            onClick={() => handleRestore(article)}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-all shadow-sm hover:shadow"
                          >
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                            </svg>
                            Restore
                          </button>
                        )}
                        {/* Delete button — available in both tabs */}
                        <button
                          onClick={() => handleDelete(article)}
                          disabled={deleteLoadingId === article.id}
                          title="Delete article"
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-gray-700 hover:bg-gray-800 rounded-lg transition-all shadow-sm hover:shadow disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {deleteLoadingId === article.id ? (
                            <LoadingSpinner size={14} color="text-white" />
                          ) : (
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          )}
                          Delete
                        </button>
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
              Showing <span className="font-medium text-gray-800">{startIndex + 1}</span> to{' '}
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
        onApprove={(articleFromReview) => {
          const target = articleFromReview || selectedArticle;
          setShowViewModal(false);
          if (target) {
            setSelectedArticle(target);
            setShowApproveModal(true);
          }
        }}
        onReject={(articleFromReview) => {
          const target = articleFromReview || selectedArticle;
          setShowViewModal(false);
          if (target) {
            setSelectedArticle(target);
            setShowRejectModal(true);
          }
        }}
      />

      {/* Approve Confirmation Modal */}
      <ConfirmModal
        isOpen={showApproveModal}
        onClose={() => {
          if (isProcessing) return;
          setShowApproveModal(false);
          setSelectedArticle(null);
        }}
        onConfirm={confirmApprove}
        title="Approve Article"
        message={`Are you sure you want to approve "${selectedArticle?.title ?? ''}"? This article will be published immediately.`}
        confirmText={
          isProcessing ? (
            <span className="flex items-center gap-2">
              <LoadingSpinner size={16} color="text-white" />
              Approving...
            </span>
          ) : "Approve"
        }
        cancelText="Cancel"
        confirmColor="bg-emerald-600 hover:bg-emerald-700"
        loading={isProcessing}
      />

      {/* Reject Confirmation Modal */}
      <ConfirmModal
        isOpen={showRejectModal}
        onClose={() => {
          if (isProcessing) return;
          setShowRejectModal(false);
          setSelectedArticle(null);
        }}
        onConfirm={confirmReject}
        title="Reject Article"
        message={`Are you sure you want to reject "${selectedArticle?.title ?? ''}"? This action can be undone by restoring the article.`}
        confirmText={
          isProcessing ? (
            <span className="flex items-center gap-2">
              <LoadingSpinner size={16} color="text-white" />
              Rejecting...
            </span>
          ) : "Reject"
        }
        cancelText="Cancel"
        confirmColor="bg-red-600 hover:bg-red-700"
        loading={isProcessing}
      />

      {/* Restore Confirmation Modal */}
      <ConfirmModal
        isOpen={showRestoreModal}
        onClose={() => {
          if (isProcessing) return;
          setShowRestoreModal(false);
          setSelectedArticle(null);
        }}
        onConfirm={confirmRestore}
        title="Restore Article"
        message={
          RESTORE_PUBLISHES_IMMEDIATELY
            ? `Are you sure you want to restore and publish "${selectedArticle?.title ?? ''}"? It will be published immediately.`
            : `Are you sure you want to restore "${selectedArticle?.title ?? ''}"? It will be moved back to Pending for re-review.`
        }
        confirmText={
          isProcessing ? (
            <span className="flex items-center gap-2">
              <LoadingSpinner size={16} color="text-white" />
              Restoring...
            </span>
          ) : "Restore"
        }
        cancelText="Cancel"
        confirmColor="bg-blue-600 hover:bg-blue-700"
        loading={isProcessing}
      />

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={showDeleteModal}
        onClose={() => {
          if (isProcessing) return;
          setShowDeleteModal(false);
          setSelectedArticle(null);
        }}
        onConfirm={confirmDelete}
        title="Delete Article"
        message={`Are you sure you want to permanently delete "${selectedArticle?.title ?? ''}"? This action cannot be undone.`}
        confirmText={
          isProcessing ? (
            <span className="flex items-center gap-2">
              <LoadingSpinner size={16} color="text-white" />
              Deleting...
            </span>
          ) : "Delete"
        }
        cancelText="Cancel"
        confirmColor="bg-red-600 hover:bg-red-700"
        loading={isProcessing}
      />

      <Modal
        isOpen={Boolean(successModal)}
        onClose={() => setSuccessModal(null)}
        title={successModal?.title || 'Action completed'}
        size="sm"
      >
        <div className="space-y-5">
          <p className="text-sm text-gray-600">{successModal?.message}</p>
          <div className="flex justify-center">
            <button
              type="button"
              onClick={() => setSuccessModal(null)}
              className="rounded-lg bg-gray-200 px-6 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-300"
            >
              OK
            </button>
          </div>
        </div>
      </Modal>

      {isProcessing && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="rounded-xl bg-white px-10 py-8 shadow-2xl">
            <LoadingSpinner
              size={52}
              color="text-emerald-600"
              text={processingMessage || 'Processing article...'}
            />
          </div>
        </div>
      )}
    </AdminLayout>
  );
}