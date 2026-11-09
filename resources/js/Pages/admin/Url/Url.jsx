import { useState, useEffect, useMemo, useCallback } from 'react';
import { usePage } from '@inertiajs/react';
import axios from 'axios';
import AdminLayout from '../../../layouts/AdminLayout';
import Modal, { ConfirmModal } from '../../../components/admin/Modal';
import LoadingSpinner from '../../../components/LoadingSpinner';
import CreateShortenUrl from './CreateShortenUrl';
import EditShortenUrl from './EditShortenUrl';

// ─── Constants ───────────────────────────────────────────────────────────────
const STATUS = {
  APPROVED: 'approved',
  PENDING: 'pending',
  REJECTED: 'rejected',
};

const TABS = {
  ALL: 'all',
  PENDING: 'pending',
  REJECTED: 'rejected',
};

const PAGE_GROUP_SIZE = 5;
const COPIED_RESET_MS = 2000;

// ─── Helpers ─────────────────────────────────────────────────────────────────
function getFullShortUrl(shortCode, shortUrl) {
  if (shortUrl) return shortUrl;
  // SSR-safe: fall back to relative path if window is unavailable
  if (typeof window === 'undefined') return `/${shortCode}`;
  return `${window.location.origin}/${shortCode}`;
}

function copyText(text) {
  if (navigator.clipboard?.writeText) {
    return navigator.clipboard.writeText(text);
  }
  // Fallback for older browsers
  return new Promise((resolve, reject) => {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.setAttribute('readonly', '');
    textArea.style.position = 'fixed';
    textArea.style.opacity = '0';
    document.body.appendChild(textArea);
    textArea.select();
    try {
      if (!document.execCommand('copy')) {
        throw new Error('Copy command failed');
      }
      resolve();
    } catch (e) {
      reject(e);
    } finally {
      document.body.removeChild(textArea);
    }
  });
}

// ─── Component ───────────────────────────────────────────────────────────────
export default function Url() {
  const { auth } = usePage();
  const { user } = auth || {};

  // Data
  const [userPermissions, setUserPermissions] = useState([]);
  const [urls, setUrls] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Create success modal
  const [shortenedUrl, setShortenedUrl] = useState('');
  const [qrCode, setQrCode] = useState('');
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  // Copy feedback: keyed by "context::id" so each button has its own state
  //   e.g. "row::42", "modal::main", "qr::42"
  const [copiedKeys, setCopiedKeys] = useState({});

  // Generic action feedback
  const [actionSuccess, setActionSuccess] = useState(null);

  // QR preview modal
  const [selectedQrCode, setSelectedQrCode] = useState(null);

  // Confirmation modal
  const [confirmation, setConfirmation] = useState(null);
  const [isConfirmationLoading, setIsConfirmationLoading] = useState(false);

  // Create / Edit modals
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingUrl, setEditingUrl] = useState(null);
  const [isEditLoading, setIsEditLoading] = useState(false);

  // Bulk selection
  const [selectedPendingIds, setSelectedPendingIds] = useState([]);

  // Search / filter / pagination
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState(TABS.ALL);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(3);

  const canManageUrls = userPermissions.includes('user_management');

  // ─── Permissions ───────────────────────────────────────────────────────────
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const response = await axios.get('/user/permissions');
        if (!cancelled) {
          setUserPermissions(response.data?.user?.permissions || []);
        }
      } catch (err) {
        console.error('Failed to fetch user permissions:', err);
        if (!cancelled) setUserPermissions([]);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  // ─── Data fetching ─────────────────────────────────────────────────────────
  const fetchUrls = useCallback(async () => {
    setIsLoading(true);
    setError('');
    try {
      const response = await axios.get('/admin/shorten-url/list');
      const list = response.data.urls || [];
      setUrls(list);
      return list;
    } catch (err) {
      console.error('Failed to fetch URLs:', err);
      setError('Failed to load URLs. Please try again.');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUrls().catch(() => { /* error already surfaced */ });
  }, [fetchUrls]);

  // ─── Derived data ──────────────────────────────────────────────────────────
  const tabCounts = useMemo(() => {
    const counts = { all: 0, pending: 0, rejected: 0 };
    for (const url of urls) {
      const status = url.status || STATUS.APPROVED;
      if (status === STATUS.APPROVED) counts.all += 1;
      else if (status === STATUS.PENDING) counts.pending += 1;
      else if (status === STATUS.REJECTED) counts.rejected += 1;
    }
    return counts;
  }, [urls]);

  const filteredUrls = useMemo(() => {
    let filtered = urls;

    if (activeTab === TABS.PENDING) {
      filtered = filtered.filter((u) => u.status === STATUS.PENDING);
    } else if (activeTab === TABS.REJECTED) {
      filtered = filtered.filter((u) => u.status === STATUS.REJECTED);
    } else {
      // "All" tab = approved (or legacy null status)
      filtered = filtered.filter((u) => !u.status || u.status === STATUS.APPROVED);
    }

    const term = searchTerm.trim().toLowerCase();
    if (term) {
      filtered = filtered.filter((u) => {
        const full = getFullShortUrl(u.short_code, u.short_url).toLowerCase();
        return full.includes(term) || u.original_url.toLowerCase().includes(term);
      });
    }
    return filtered;
  }, [urls, activeTab, searchTerm]);

  // Reset pagination & selection when the filter changes
  useEffect(() => {
    setCurrentPage(1);
    setSelectedPendingIds([]);
  }, [activeTab, searchTerm]);

  const totalPages = Math.ceil(filteredUrls.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentUrls = useMemo(
    () => filteredUrls.slice(indexOfFirstItem, indexOfLastItem),
    [filteredUrls, indexOfFirstItem, indexOfLastItem],
  );

  const pendingFilteredIds = useMemo(
    () => filteredUrls
      .filter((u) => u.status === STATUS.PENDING)
      .map((u) => u.id),
    [filteredUrls],
  );

  const areAllPendingSelected = pendingFilteredIds.length > 0
    && pendingFilteredIds.every((id) => selectedPendingIds.includes(id));

  // ─── Copy ──────────────────────────────────────────────────────────────────
  const handleCopy = useCallback(async (text, key) => {
    try {
      await copyText(text);
      setCopiedKeys((prev) => ({ ...prev, [key]: true }));
      setTimeout(() => {
        setCopiedKeys((prev) => {
          const next = { ...prev };
          delete next[key];
          return next;
        });
      }, COPIED_RESET_MS);
    } catch (err) {
      console.error('Failed to copy:', err);
      alert('Failed to copy URL. Please try again.');
    }
  }, []);

  // ─── Pagination ────────────────────────────────────────────────────────────
  const visiblePageNumbers = useMemo(() => {
    const groupStart = Math.floor((currentPage - 1) / PAGE_GROUP_SIZE) * PAGE_GROUP_SIZE + 1;
    const groupEnd = Math.min(totalPages, groupStart + PAGE_GROUP_SIZE - 1);
    return Array.from({ length: groupEnd - groupStart + 1 }, (_, i) => groupStart + i);
  }, [currentPage, totalPages]);

  // ─── Search / tab handlers ─────────────────────────────────────────────────
  const handleSearchChange = (e) => setSearchTerm(e.target.value);
  const clearSearch = () => setSearchTerm('');
  const handleTabChange = (tab) => setActiveTab(tab);

  // ─── Selection ─────────────────────────────────────────────────────────────
  const handleTogglePendingSelection = (id) => {
    setSelectedPendingIds((ids) =>
      ids.includes(id) ? ids.filter((x) => x !== id) : [...ids, id],
    );
  };

  const handleToggleSelectAllPending = () => {
    setSelectedPendingIds((ids) =>
      areAllPendingSelected
        ? ids.filter((id) => !pendingFilteredIds.includes(id))
        : [...new Set([...ids, ...pendingFilteredIds])],
    );
  };

  // ─── Create / Edit ─────────────────────────────────────────────────────────
  const openCreateModal = () => setIsCreateModalOpen(true);
  const closeCreateModal = () => setIsCreateModalOpen(false);

  const handleCreateSuccess = ({ shortenedUrl: newShortenedUrl, qrCode: newQrCode }) => {
    setShortenedUrl(newShortenedUrl);
    setQrCode(newQrCode);
    setIsSuccessModalOpen(true);
    fetchUrls().catch((err) => {
      console.error('URL created, but the list could not be refreshed:', err);
    });
  };

  const handleCloseSuccessModal = () => {
    setIsSuccessModalOpen(false);
    setQrCode('');
  };

  const handleEdit = (url) => {
    setEditingUrl(url);
    setIsEditModalOpen(true);
  };

  const handleEditSave = async () => {
    setIsEditLoading(true);
    try {
      await fetchUrls();
      setIsEditModalOpen(false);
      setEditingUrl(null);
      setActionSuccess({
        title: 'URL updated successfully',
        message: 'Your changes to the shortened URL have been saved.',
      });
    } catch (err) {
      console.error('Error refreshing URLs:', err);
      alert('Failed to update URL.');
    } finally {
      setIsEditLoading(false);
    }
  };

  const handleEditClose = () => {
    setIsEditModalOpen(false);
    setEditingUrl(null);
  };

  // ─── QR code ───────────────────────────────────────────────────────────────
  const handleGenerateQrCode = (url) => {
    const fullShortUrl = getFullShortUrl(url.short_code, url.short_url);
    setSelectedQrCode({
      code: url.short_code,
      shortUrl: fullShortUrl,
      imageUrl: `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(fullShortUrl)}`,
    });
  };

  const downloadImage = (href, filename) => {
    const link = document.createElement('a');
    link.href = href;
    link.download = filename;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDownloadQrCode = () => {
    if (!qrCode) return;
    downloadImage(qrCode, `short-url-${shortenedUrl.split('/').pop() || 'qr-code'}.png`);
  };

  const handleDownloadSelectedQrCode = () => {
    if (!selectedQrCode) return;
    downloadImage(
      selectedQrCode.imageUrl,
      `short-url-${selectedQrCode.code || 'qr-code'}.png`,
    );
  };

  // ─── Action runners ────────────────────────────────────────────────────────
  // Single place that executes a confirmed action, handles loading, refresh,
  // and success/error messaging.
  const runConfirmedAction = async ({ request, success }) => {
    setIsConfirmationLoading(true);
    try {
      const result = await request();
      setConfirmation(null);
      await fetchUrls();
      if (success) setActionSuccess(success);
      return result;
    } catch (err) {
      console.error(err);
      setConfirmation(null);
      alert(err?.message || 'Action failed.');
      throw err;
    } finally {
      setIsConfirmationLoading(false);
    }
  };

  const handleDelete = (id) => setConfirmation({ type: 'delete', id });
  const handleApprove = (id) => setConfirmation({ type: 'approve', id });
  const handleReject = (id) => setConfirmation({ type: 'reject', id });

  const handleBulkStatus = (status) => {
    const ids = selectedPendingIds.filter((id) => pendingFilteredIds.includes(id));
    if (ids.length === 0) return;
    setConfirmation({
      type: status === STATUS.APPROVED ? 'bulkApprove' : 'bulkReject',
      ids,
    });
  };

  const executeSingleStatusUpdate = async (id, status) => {
    const response = await axios.put(`/admin/shorten-url/${id}/status`, { status });
    if (!response.data.success) {
      throw new Error(response.data.message || `Failed to update URL ${id}.`);
    }
    return id;
  };

  const executeBulkStatusUpdate = async () => {
    const status = confirmation.type === 'bulkApprove' ? STATUS.APPROVED : STATUS.REJECTED;
    const actionLabel = status === STATUS.APPROVED ? 'approved' : 'rejected';

    setIsConfirmationLoading(true);
    let successfulIds = [];
    let failedCount = 0;

    try {
      const results = await Promise.allSettled(
        confirmation.ids.map((id) => executeSingleStatusUpdate(id, status)),
      );
      successfulIds = results
        .filter((r) => r.status === 'fulfilled')
        .map((r) => r.value);
      failedCount = results.length - successfulIds.length;
    } catch (err) {
      // allSettled shouldn't throw, but keep a defensive fallback
      console.error(err);
    }

    setConfirmation(null);
    setSelectedPendingIds((ids) => ids.filter((id) => !successfulIds.includes(id)));
    setIsConfirmationLoading(false);

    try {
      await fetchUrls();
    } catch (err) {
      console.error('Bulk update completed, but refresh failed:', err);
      setActionSuccess({
        title: 'Unable to refresh URLs',
        message: 'The status updates may have completed, but the list could not be refreshed. Reload the page to verify.',
      });
      return;
    }

    setActionSuccess({
      title: failedCount === 0
        ? `${successfulIds.length} URLs ${actionLabel} successfully`
        : `Some URLs could not be ${actionLabel}`,
      message: failedCount === 0
        ? `All ${successfulIds.length} selected URLs were ${actionLabel}.`
        : `${successfulIds.length} URLs were ${actionLabel}, and ${failedCount} failed. Failed URLs remain selected so you can retry.`,
    });
  };

  // Config-driven confirmation modal props + handler
  const confirmationConfig = useMemo(() => {
    if (!confirmation) return null;
    const { type, id, ids } = confirmation;

    switch (type) {
      case 'approve':
        return {
          title: 'Approve URL?',
          message: 'Are you sure you want to approve this URL?',
          confirmText: 'Approve',
          confirmColor: 'bg-green-600 hover:bg-green-700',
          onConfirm: () => runConfirmedAction({
            request: () => executeSingleStatusUpdate(id, STATUS.APPROVED),
            success: { title: 'URL approved successfully', message: 'The shortened URL has been approved and is now active.' },
          }),
          loadingLabel: 'Approving URL...',
        };
      case 'reject':
        return {
          title: 'Reject URL?',
          message: 'Are you sure you want to reject this URL?',
          confirmText: 'Reject',
          confirmColor: 'bg-red-600 hover:bg-red-700',
          onConfirm: () => runConfirmedAction({
            request: () => executeSingleStatusUpdate(id, STATUS.REJECTED),
            success: { title: 'URL rejected', message: 'The shortened URL has been rejected.' },
          }),
          loadingLabel: 'Rejecting URL...',
        };
      case 'delete':
        return {
          title: 'Delete shortened URL?',
          message: 'This action cannot be undone.',
          confirmText: 'Delete',
          confirmColor: 'bg-red-600 hover:bg-red-700',
          onConfirm: () => runConfirmedAction({
            request: () => axios.delete(`/admin/shorten-url/${id}`),
            success: { title: 'URL deleted successfully', message: 'The shortened URL has been deleted.' },
          }),
          loadingLabel: 'Deleting URL...',
        };
      case 'bulkApprove':
        return {
          title: 'Approve selected URLs?',
          message: `Are you sure you want to approve ${ids.length} selected URLs?`,
          confirmText: 'Approve Selected',
          confirmColor: 'bg-green-600 hover:bg-green-700',
          onConfirm: executeBulkStatusUpdate,
          loadingLabel: `Approving ${ids.length} URLs...`,
        };
      case 'bulkReject':
        return {
          title: 'Reject selected URLs?',
          message: `Are you sure you want to reject ${ids.length} selected URLs?`,
          confirmText: 'Reject Selected',
          confirmColor: 'bg-red-600 hover:bg-red-700',
          onConfirm: executeBulkStatusUpdate,
          loadingLabel: `Rejecting ${ids.length} URLs...`,
        };
      default:
        return null;
    }
  }, [confirmation, selectedPendingIds, pendingFilteredIds]); // eslint-disable-line react-hooks/exhaustive-deps

  // ─── Render helpers ────────────────────────────────────────────────────────
  const getStatusBadge = (status) => {
    if (!status || status === STATUS.APPROVED) {
      return <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">Approved</span>;
    }
    if (status === STATUS.PENDING) {
      return <span className="px-2 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800">Pending</span>;
    }
    if (status === STATUS.REJECTED) {
      return <span className="px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-800">Rejected</span>;
    }
    return null;
  };

  const handleView = (url) => {
    window.open(getFullShortUrl(url.short_code, url.short_url), '_blank');
  };

  // ─── Render ────────────────────────────────────────────────────────────────
  return (
    <AdminLayout title="Shorten URL" activePage="shorten-url">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-gray-600">Create short, memorable links for your content</p>
            <p className="text-xs text-gray-500 mt-1">Manage and monitor all shortened URLs</p>
          </div>
          <button
            onClick={openCreateModal}
            className="mt-3 sm:mt-0 bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 shadow-md hover:shadow-lg w-fit"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Create New URL
          </button>
        </div>

        {/* Error banner */}
        {error && (
          <div role="alert" className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-800 flex items-center justify-between">
            <span>{error}</span>
            <button onClick={() => fetchUrls()} className="font-medium underline hover:no-underline">
              Retry
            </button>
          </div>
        )}

        {/* URL list card */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          {/* Tabs */}
          <div className="border-b border-gray-200 bg-gray-50 px-6 pt-4">
            <nav className="flex space-x-6" aria-label="Tabs">
              {[
                { key: TABS.ALL, label: 'All URLs', color: 'border-blue-600 text-blue-600' },
                { key: TABS.PENDING, label: 'Pending', color: 'border-yellow-500 text-yellow-600' },
                { key: TABS.REJECTED, label: 'Rejected', color: 'border-red-500 text-red-600' },
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => handleTabChange(tab.key)}
                  className={`py-3 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.key
                      ? tab.color
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.label}
                  <span className="ml-2 px-2 py-0.5 text-xs rounded-full text-gray-700">
                    {tabCounts[tab.key]}
                  </span>
                </button>
              ))}
            </nav>
          </div>

          {/* Search */}
          <div className="bg-gray-100 border-b border-gray-200 shadow-sm p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="md:w-80 relative flex-shrink-0">
                <svg
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  placeholder="Search URLs by short URL or original URL..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="w-full pl-10 pr-10 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none text-sm bg-white"
                />
                {searchTerm && (
                  <button
                    onClick={clearSearch}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    aria-label="Clear search"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>
            </div>

            <div className="mt-3 text-sm text-gray-600">
              {filteredUrls.length === 0 ? (
                <span>No URLs found matching your criteria</span>
              ) : (
                <span>
                  Found <span className="font-medium text-gray-800">{filteredUrls.length}</span> URL{filteredUrls.length !== 1 ? 's' : ''}
                  {searchTerm && <span> matching "<span className="font-medium text-gray-800">{searchTerm}</span>"</span>}
                </span>
              )}
            </div>
          </div>

          {/* Body */}
          {isLoading && urls.length === 0 ? (
            <div className="p-12 flex justify-center">
              <LoadingSpinner size={40} color="text-gray-700" text="Loading URLs..." />
            </div>
          ) : filteredUrls.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              <svg className="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              {searchTerm ? (
                <>
                  <p className="text-gray-500 font-medium">No results found for "{searchTerm}"</p>
                  <p className="text-gray-400 text-sm mt-1">Try adjusting your search</p>
                </>
              ) : (
                <>
                  <p className="text-gray-500 font-medium">No {activeTab !== TABS.ALL ? activeTab : 'approved'} URLs found</p>
                  <p className="text-gray-400 text-sm mt-1">
                    {activeTab === TABS.ALL && 'Create your first short URL using the form above'}
                    {activeTab === TABS.PENDING && 'There are no pending URLs awaiting approval'}
                    {activeTab === TABS.REJECTED && 'There are no rejected URLs'}
                  </p>
                </>
              )}
            </div>
          ) : (
            <>
              {/* Bulk action bar */}
              {canManageUrls && activeTab === TABS.PENDING && selectedPendingIds.length > 0 && (
                <div className="mb-6 flex flex-col gap-4 rounded-xl border border-gray-300 bg-gray-100 p-4 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-sm font-medium text-gray-800">
                    {selectedPendingIds.length} URL{selectedPendingIds.length !== 1 ? 's' : ''} selected
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => handleBulkStatus(STATUS.APPROVED)}
                      disabled={isConfirmationLoading}
                      className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-emerald-700 hover:shadow disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Approve Selected
                    </button>
                    <button
                      type="button"
                      onClick={() => handleBulkStatus(STATUS.REJECTED)}
                      disabled={isConfirmationLoading}
                      className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-red-700 hover:shadow disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      Reject Selected
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectedPendingIds([])}
                      disabled={isConfirmationLoading}
                      className="inline-flex items-center gap-2 rounded-lg bg-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-300 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      Clear Selection
                    </button>
                  </div>
                </div>
              )}

              {/* Table */}
              <div className="w-full overflow-x-auto">
                <table className="w-full min-w-[1200px] table-fixed">
                  <thead className="bg-gray-700 text-white">
                    <tr>
                      <th className="w-[7%] px-3 py-3 text-left text-xs font-medium uppercase tracking-wider border-r border-gray-500">
                        {canManageUrls && activeTab === TABS.PENDING ? (
                          <div className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              checked={areAllPendingSelected}
                              onChange={handleToggleSelectAllPending}
                              className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                              aria-label="Select all filtered pending URLs"
                            />
                            #
                          </div>
                        ) : '#'}
                      </th>
                      <th className="w-[10%] px-3 py-3 text-left text-xs font-medium uppercase tracking-wider border-r border-gray-500">Code</th>
                      <th className="w-[15%] px-3 py-3 text-left text-xs font-medium uppercase tracking-wider border-r border-gray-500">Short URL</th>
                      <th className="w-[26%] px-3 py-3 text-left text-xs font-medium uppercase tracking-wider border-r border-gray-500">Original URL</th>
                      <th className="w-[11%] px-3 py-3 text-left text-xs font-medium uppercase tracking-wider border-r border-gray-500">Status</th>
                      <th className="w-[34%] px-3 py-3 text-center text-xs font-medium uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {currentUrls.map((url, index) => {
                      const fullShortUrl = getFullShortUrl(url.short_code, url.short_url);
                      const status = url.status || STATUS.APPROVED;
                      const rowNumber = indexOfFirstItem + index + 1;
                      const copyKey = `row::${url.id}`;
                      const isCopied = !!copiedKeys[copyKey];

                      return (
                        <tr
                          key={url.id}
                          className={`transition-colors ${index % 2 === 0 ? 'bg-white hover:bg-gray-50' : 'bg-gray-50 hover:bg-gray-100'}`}
                        >
                          <td className="px-3 py-4 text-left text-sm font-medium text-gray-700">
                            <div className="flex items-center gap-2">
                              {canManageUrls && status === STATUS.PENDING && (
                                <input
                                  type="checkbox"
                                  checked={selectedPendingIds.includes(url.id)}
                                  onChange={() => handleTogglePendingSelection(url.id)}
                                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                  aria-label={`Select URL ${url.short_code}`}
                                />
                              )}
                              {rowNumber}
                            </div>
                          </td>
                          <td className="px-3 py-4 text-left text-sm text-gray-700">
                            <span className="block truncate" title={url.short_code || ''}>
                              {url.short_code || '-'}
                            </span>
                          </td>
                          <td className="px-3 py-4">
                            <div className="flex items-center gap-2">
                              <div className="flex-1 min-w-0">
                                <a
                                  href={fullShortUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-blue-600 hover:text-blue-800 hover:underline font-medium text-sm truncate block"
                                >
                                  {fullShortUrl}
                                </a>
                              </div>
                              <button
                                onClick={() => handleCopy(fullShortUrl, copyKey)}
                                className={`text-xs font-medium transition-colors flex-shrink-0 ${
                                  isCopied ? 'text-green-600' : 'text-gray-400 hover:text-gray-600'
                                }`}
                                aria-label={`Copy short URL ${url.short_code}`}
                                title="Copy"
                              >
                                {isCopied ? 'Copied!' : (
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                                  </svg>
                                )}
                              </button>
                            </div>
                          </td>
                          <td className="px-3 py-4 text-left text-sm text-gray-600">
                            <a
                              href={url.original_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="block truncate hover:text-blue-700 hover:underline"
                              title={url.original_url}
                            >
                              {url.original_url}
                            </a>
                          </td>
                          <td className="px-3 py-4 text-left">
                            {getStatusBadge(status)}
                          </td>
                          <td className="px-3 py-4 text-center">
                            <div className="flex flex-nowrap items-center justify-center gap-1 whitespace-nowrap">
                              {(status === STATUS.APPROVED || !status) && (
                                <button
                                  onClick={() => handleView(url)}
                                  className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors duration-200 whitespace-nowrap"
                                  title="View"
                                >
                                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                  </svg>
                                  View
                                </button>
                              )}

                              {canManageUrls && status === STATUS.PENDING && (
                                <>
                                  <button
                                    onClick={() => handleApprove(url.id)}
                                    className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-white bg-green-600 hover:bg-green-700 rounded-lg transition-colors duration-200 whitespace-nowrap"
                                    title="Approve"
                                  >
                                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    Approve
                                  </button>
                                  <button
                                    onClick={() => handleReject(url.id)}
                                    className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors duration-200 whitespace-nowrap"
                                    title="Reject"
                                  >
                                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                    Reject
                                  </button>
                                </>
                              )}

                              {canManageUrls && (status === STATUS.APPROVED || status === STATUS.REJECTED) && (
                                <button
                                  onClick={() => handleEdit(url)}
                                  className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-white bg-yellow-500 hover:bg-yellow-600 rounded-lg transition-colors duration-200 whitespace-nowrap"
                                  title="Edit"
                                >
                                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                  </svg>
                                  Edit
                                </button>
                              )}

                              <button
                                onClick={() => handleGenerateQrCode(url)}
                                className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-white bg-gray-600 hover:bg-gray-700 rounded-lg transition-colors duration-200 whitespace-nowrap"
                                title="Generate QR Code"
                              >
                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h3v3h-3zM20 14v2m-6 4h2m4-1v2m1-5v2" />
                                </svg>
                                QR Code
                              </button>

                              {canManageUrls && (
                                <button
                                  onClick={() => handleDelete(url.id)}
                                  className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors duration-200 whitespace-nowrap"
                                  title="Delete"
                                >
                                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                  </svg>
                                  Delete
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between bg-gray-50">
                  <div className="text-sm text-gray-700">
                    Showing <span className="font-medium">{indexOfFirstItem + 1}</span> to{' '}
                    <span className="font-medium">{Math.min(indexOfLastItem, filteredUrls.length)}</span>{' '}
                    of <span className="font-medium">{filteredUrls.length}</span> results
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                      className="px-3 py-1 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      Previous
                    </button>
                    <div className="flex gap-1">
                      {visiblePageNumbers.map((pageNum) => (
                        <button
                          key={pageNum}
                          onClick={() => setCurrentPage(pageNum)}
                          className={`px-3 py-1 text-sm font-medium rounded-lg transition-colors ${
                            currentPage === pageNum
                              ? 'bg-blue-600 text-white'
                              : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                          }`}
                        >
                          {pageNum}
                        </button>
                      ))}
                    </div>
                    <button
                      onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                      disabled={currentPage === totalPages}
                      className="px-3 py-1 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Create URL Modal */}
      <CreateShortenUrl
        isOpen={isCreateModalOpen}
        onClose={closeCreateModal}
        onSuccess={handleCreateSuccess}
      />

      {/* Edit URL Modal */}
      <EditShortenUrl
        isOpen={isEditModalOpen}
        onClose={handleEditClose}
        onSave={handleEditSave}
        url={editingUrl}
        isLoading={isEditLoading}
      />

      {/* Confirmation Modal (config-driven) */}
      <ConfirmModal
        isOpen={Boolean(confirmationConfig)}
        onClose={() => !isConfirmationLoading && setConfirmation(null)}
        onConfirm={confirmationConfig?.onConfirm}
        title={confirmationConfig?.title || ''}
        message={confirmationConfig?.message || ''}
        confirmText={confirmationConfig?.confirmText || 'Confirm'}
        confirmColor={confirmationConfig?.confirmColor || 'bg-red-600 hover:bg-red-700'}
        loading={isConfirmationLoading}
      />

      {/* URL created – success modal */}
      <Modal
        isOpen={isSuccessModalOpen}
        onClose={handleCloseSuccessModal}
        title="URL shortened successfully"
        size="md"
      >
        <div className="space-y-4">
          <p className="text-sm text-gray-600">
            Your shortened URL was generated successfully and is pending approval.
          </p>
          <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-3 text-sm text-yellow-800">
            You can copy the link and download the QR code now. The link will become active after approval.
          </div>
          {qrCode && (
            <div className="flex flex-col items-center gap-2">
              <img
                src={qrCode}
                alt="QR code for shortened URL"
                className="h-40 w-40 rounded-lg border border-gray-200 p-2"
              />
              <button
                type="button"
                onClick={handleDownloadQrCode}
                className="px-4 py-2 text-sm font-medium text-blue-700 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
              >
                Download QR Code
              </button>
            </div>
          )}
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="text"
              value={shortenedUrl}
              readOnly
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-sm text-gray-700"
            />
            <button
              type="button"
              onClick={() => handleCopy(shortenedUrl, 'modal::success')}
              className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors whitespace-nowrap"
            >
              {copiedKeys['modal::success'] ? 'Copied!' : 'Copy'}
            </button>
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={handleCloseSuccessModal}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Done
            </button>
          </div>
        </div>
      </Modal>

      {/* Generic action-success modal */}
      <Modal
        isOpen={Boolean(actionSuccess)}
        onClose={() => setActionSuccess(null)}
        title={actionSuccess?.title || 'Action completed'}
        size="sm"
      >
        <div className="space-y-5">
          <p className="text-sm text-gray-600">{actionSuccess?.message}</p>
          <div className="flex justify-center">
            <button
              type="button"
              onClick={() => setActionSuccess(null)}
              className="px-6 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              OK
            </button>
          </div>
        </div>
      </Modal>

      {/* QR preview modal */}
      <Modal
        isOpen={Boolean(selectedQrCode)}
        onClose={() => setSelectedQrCode(null)}
        title="Short URL QR Code"
        size="sm"
      >
        {selectedQrCode && (
          <div className="flex flex-col items-center gap-4">
            <p className="w-full truncate text-left text-sm text-gray-600" title={selectedQrCode.shortUrl}>
              {selectedQrCode.shortUrl}
            </p>
            <img
              src={selectedQrCode.imageUrl}
              alt={`QR code for ${selectedQrCode.shortUrl}`}
              className="h-64 w-64 rounded-lg border border-gray-200 p-2"
            />
            <div className="flex w-full justify-center gap-3">
              <button
                type="button"
                onClick={handleDownloadSelectedQrCode}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Download QR Code
              </button>
              <button
                type="button"
                onClick={() => setSelectedQrCode(null)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </Modal>

      {/* Full-screen loading overlay for confirmations */}
      {confirmationConfig && isConfirmationLoading && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="rounded-xl bg-white px-10 py-8 shadow-2xl">
            <LoadingSpinner
              size={48}
              color="text-gray-700"
              text={confirmationConfig.loadingLabel}
            />
          </div>
        </div>
      )}
    </AdminLayout>
  );
}