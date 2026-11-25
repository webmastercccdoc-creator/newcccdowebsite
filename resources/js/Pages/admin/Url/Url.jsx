  import { useState, useEffect } from 'react';
  import axios from 'axios';
  import AdminLayout from '../../../layouts/AdminLayout';
  import Modal, { ConfirmModal } from '../../../components/admin/Modal';
  import LoadingSpinner from '../../../components/LoadingSpinner';
  import CreateShortenUrl from './CreateShortenUrl';
  import EditShortenUrl from './EditShortenUrl';

  export default function Url() {
    const [departmentOptions, setDepartmentOptions] = useState([]);

    const getUrlDepartment = (url) => (
      url?.department
      || url?.user_department
      || 'No department'
    );

    const [userPermissions, setUserPermissions] = useState([]);
    const [shortenedUrl, setShortenedUrl] = useState('');
    const [qrCode, setQrCode] = useState('');
    const [urls, setUrls] = useState([]);
    const [filteredUrls, setFilteredUrls] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [copySuccess, setCopySuccess] = useState('');
    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
    const [actionSuccess, setActionSuccess] = useState(null);
    const [selectedQrCode, setSelectedQrCode] = useState(null);
    const [confirmation, setConfirmation] = useState(null);
    const [isConfirmationLoading, setIsConfirmationLoading] = useState(false);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [selectedPendingIds, setSelectedPendingIds] = useState([]);
    const [openDropdownId, setOpenDropdownId] = useState(null);
    
    // Search and Filter states
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedDepartment, setSelectedDepartment] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('');
    const [activeTab, setActiveTab] = useState('all'); // 'all', 'pending', 'rejected'
    
    // Pagination states
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);
    const pageGroupSize = 5;

    // Close dropdown when clicking outside
    useEffect(() => {
      const handleClickOutside = () => setOpenDropdownId(null);
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }, []);

    useEffect(() => {
      const fetchUserPermissions = async () => {
        try {
          const response = await axios.get('/user/permissions');
          setUserPermissions(response.data?.user?.permissions || []);
        } catch (error) {
          console.error('Failed to fetch user permissions:', error);
          setUserPermissions([]);
        }
      };

      fetchUserPermissions();
    }, []);

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
            .map((department) => typeof department === 'string'
              ? { id: department, name: department, slug: department }
              : {
                  id: department.id || department.slug || department.name,
                  name: department.name || department.label,
                  slug: department.slug || department.name,
                })
            .filter((department) => department.name);

          setDepartmentOptions(normalizedDepartments);
        } catch (error) {
          console.error('Failed to fetch user departments for URL filters:', error);
          setDepartmentOptions([]);
        }
      };

      fetchUserDepartments();
    }, []);

    const canManageUrls = userPermissions.includes('user_management');

    // Edit states
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editingUrl, setEditingUrl] = useState(null);
    const [isEditLoading, setIsEditLoading] = useState(false);

    // Tab counts
    const [tabCounts, setTabCounts] = useState({
      all: 0,
      pending: 0,
      rejected: 0
    });

    useEffect(() => {
      fetchUrls();
    }, []);

    useEffect(() => {
      filterUrls();
    }, [searchTerm, urls, activeTab, selectedDepartment, selectedStatus]);

    const fetchUrls = async () => {
      try {
        const response = await axios.get('/admin/shorten-url/list');
        if (response.data.urls) {
          const departmentUrls = response.data.urls.map((url) => ({
            ...url,
            department: typeof url.department === 'string' && url.department.trim()
              ? url.department
              : 'No department',
          }));
          setUrls(departmentUrls);
          setFilteredUrls(departmentUrls);
          updateTabCounts(departmentUrls);
          setCurrentPage(1);
        }
        return response.data.urls || [];
      } catch (error) {
        console.error('Failed to fetch URLs:', error);
        throw error;
      }
    };

    const updateTabCounts = (urlList) => {
      const counts = {
        all: urlList.length,
        pending: urlList.filter(url => url.status === 'pending').length,
        rejected: urlList.filter(url => url.status === 'rejected').length
      };
      setTabCounts(counts);
    };

    const filterUrls = () => {
      let filtered = [...urls];

      if (selectedDepartment) {
        const selected = departmentOptions.find(
          (department) => department.name === selectedDepartment
        );
        const departmentValues = [selected?.name, selected?.slug]
          .filter(Boolean)
          .map((value) => value.toLowerCase().replace(/[^a-z0-9]/g, ''));

        filtered = filtered.filter((url) => {
          const urlDepartment = getUrlDepartment(url).toLowerCase().replace(/[^a-z0-9]/g, '');
          return departmentValues.includes(urlDepartment);
        });
      }

      if (selectedStatus) {
        filtered = filtered.filter((url) => (url.status || 'approved') === selectedStatus);
      }

      if (!selectedStatus) {
        if (activeTab === 'pending') {
          filtered = filtered.filter(url => url.status === 'pending');
        } else if (activeTab === 'rejected') {
          filtered = filtered.filter(url => url.status === 'rejected');
        }
      }

      if (searchTerm.trim() !== '') {
        const term = searchTerm.trim().toLowerCase();
        filtered = filtered.filter((url) => {
          const fullShortUrl = getFullShortUrl(url.short_code, url.short_url);
          const originalUrlLower = url.original_url.toLowerCase();
          const shortUrlLower = fullShortUrl.toLowerCase();
          const departmentLower = getUrlDepartment(url).toLowerCase();

          return shortUrlLower.includes(term) || originalUrlLower.includes(term) || departmentLower.includes(term);
        });
      }

      setFilteredUrls(filtered);
      setCurrentPage(1);
    };

    const handleSearchChange = (e) => {
      setSearchTerm(e.target.value);
      setSelectedPendingIds([]);
    };

    const handleTabChange = (tab) => {
      setActiveTab(tab);
      setSelectedStatus('');
      setCurrentPage(1);
      setSelectedPendingIds([]);
    };

    const clearSearch = () => {
      setSearchTerm('');
      setCurrentPage(1);
      setSelectedPendingIds([]);
    };

    // Pagination calculations
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentUrls = filteredUrls.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredUrls.length / itemsPerPage);

    const handlePageChange = (pageNumber) => {
      setCurrentPage(pageNumber);
    };

    const getVisiblePageNumbers = () => {
      const groupStart = Math.floor((currentPage - 1) / pageGroupSize) * pageGroupSize + 1;
      const groupEnd = Math.min(totalPages, groupStart + pageGroupSize - 1);

      return Array.from({ length: groupEnd - groupStart + 1 }, (_, index) => groupStart + index);
    };

    const handlePrevPage = () => {
      if (currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
    };

    const handleNextPage = () => {
      if (currentPage < totalPages) {
        setCurrentPage(currentPage + 1);
      }
    };

    const handleCopy = async (url) => {
      try {
        if (navigator.clipboard?.writeText) {
          await navigator.clipboard.writeText(url);
        } else {
          throw new Error('Clipboard API unavailable');
        }

        setCopySuccess('Copied!');
        setTimeout(() => setCopySuccess(''), 2000);
      } catch (err) {
        console.error('Failed to copy:', err);
        const textArea = document.createElement('textarea');
        textArea.value = url;
        textArea.setAttribute('readonly', '');
        textArea.style.position = 'fixed';
        textArea.style.opacity = '0';
        document.body.appendChild(textArea);
        textArea.select();
        try {
          if (!document.execCommand('copy')) {
            throw new Error('Copy command failed');
          }
          setCopySuccess('Copied!');
          setTimeout(() => setCopySuccess(''), 2000);
        } catch (e) {
          alert('Failed to copy URL. Please try again.');
        } finally {
          document.body.removeChild(textArea);
        }
      }
    };

    const handleDownloadQrCode = () => {
      if (!qrCode) return;

      const link = document.createElement('a');
      link.href = qrCode;
      link.download = `short-url-${shortenedUrl.split('/').pop() || 'qr-code'}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    };

    const handleGenerateQrCode = (url) => {
      const fullShortUrl = getFullShortUrl(url.short_code, url.short_url);
      setSelectedQrCode({
        code: url.short_code,
        shortUrl: fullShortUrl,
        imageUrl: `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(fullShortUrl)}`
      });
      setOpenDropdownId(null);
    };

    const handleDownloadSelectedQrCode = () => {
      if (!selectedQrCode) return;

      const link = document.createElement('a');
      link.href = selectedQrCode.imageUrl;
      link.download = `short-url-${selectedQrCode.code || 'qr-code'}.png`;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    };

    const handleDelete = async (id) => {
      setConfirmation({ type: 'delete', id });
      setOpenDropdownId(null);
    };

    const confirmDelete = async () => {
      setIsConfirmationLoading(true);
      try {
        await axios.delete(`/admin/shorten-url/${confirmation.id}`);
        setConfirmation(null);
        await fetchUrls();
        setActionSuccess({
          title: 'URL deleted successfully',
          message: 'The shortened URL has been deleted.'
        });
      } catch (error) {
        console.error('Failed to delete URL:', error);
        alert('Failed to delete URL.');
      } finally {
        setIsConfirmationLoading(false);
      }
    };

    const handleEdit = (url) => {
      setEditingUrl(url);
      setIsEditModalOpen(true);
      setOpenDropdownId(null);
    };

    const handleEditSave = async (updatedData) => {
      setIsEditLoading(true);
      try {
        await fetchUrls();
        setIsEditModalOpen(false);
        setEditingUrl(null);
        setActionSuccess({
          title: 'URL updated successfully',
          message: 'Your changes to the shortened URL have been saved.'
        });
      } catch (error) {
        console.error('Error refreshing URLs:', error);
        alert('Failed to update URL.');
      } finally {
        setIsEditLoading(false);
      }
    };

    const handleEditClose = () => {
      setIsEditModalOpen(false);
      setEditingUrl(null);
    };

    const handleApprove = async (id) => {
      setConfirmation({ type: 'approve', id });
      setOpenDropdownId(null);
    };

    const confirmApprove = async () => {
      setIsConfirmationLoading(true);
      try {
        const response = await axios.put(`/admin/shorten-url/${confirmation.id}/status`, { status: 'approved' });
        if (response.data.success) {
          setConfirmation(null);
          await fetchUrls();
          setActionSuccess({
            title: 'URL approved successfully',
            message: 'The shortened URL has been approved and is now active.'
          });
        }
      } catch (error) {
        console.error('Failed to approve URL:', error);
        alert('Failed to approve URL.');
      } finally {
        setIsConfirmationLoading(false);
      }
    };

    const handleReject = async (id) => {
      setConfirmation({ type: 'reject', id });
      setOpenDropdownId(null);
    };

    const pendingFilteredIds = filteredUrls
      .filter((url) => url.status === 'pending')
      .map((url) => url.id);
    const areAllPendingSelected = pendingFilteredIds.length > 0
      && pendingFilteredIds.every((id) => selectedPendingIds.includes(id));

    const handleTogglePendingSelection = (id) => {
      setSelectedPendingIds((selectedIds) => (
        selectedIds.includes(id)
          ? selectedIds.filter((selectedId) => selectedId !== id)
          : [...selectedIds, id]
      ));
    };

    const handleToggleSelectAllPending = () => {
      setSelectedPendingIds((selectedIds) => (
        areAllPendingSelected
          ? selectedIds.filter((id) => !pendingFilteredIds.includes(id))
          : [...new Set([...selectedIds, ...pendingFilteredIds])]
      ));
    };

    const handleBulkStatus = (status) => {
      const ids = selectedPendingIds.filter((id) => pendingFilteredIds.includes(id));
      if (ids.length > 0) {
        setConfirmation({ type: status === 'approved' ? 'bulkApprove' : 'bulkReject', ids });
      }
    };

    const confirmBulkStatus = async () => {
      const status = confirmation.type === 'bulkApprove' ? 'approved' : 'rejected';
      const actionLabel = status === 'approved' ? 'approved' : 'rejected';
      setIsConfirmationLoading(true);

      try {
        const results = await Promise.allSettled(
          confirmation.ids.map(async (id) => {
            const response = await axios.put(`/admin/shorten-url/${id}/status`, { status });
            if (!response.data.success) {
              throw new Error(response.data.message || `Failed to ${actionLabel} URL ${id}.`);
            }
            return id;
          })
        );
        const successfulIds = results
          .filter((result) => result.status === 'fulfilled')
          .map((result) => result.value);
        const failedCount = results.length - successfulIds.length;

        setConfirmation(null);
        setSelectedPendingIds((selectedIds) => selectedIds.filter((id) => !successfulIds.includes(id)));
        await fetchUrls();

        setActionSuccess({
          title: failedCount === 0
            ? `${successfulIds.length} URLs ${actionLabel} successfully`
            : `Some URLs could not be ${actionLabel}`,
          message: failedCount === 0
            ? `All ${successfulIds.length} selected URLs were ${actionLabel}.`
            : `${successfulIds.length} URLs were ${actionLabel}, and ${failedCount} failed. Failed URLs remain selected so you can retry.`
        });
      } catch (error) {
        console.error(`Failed to ${actionLabel} selected URLs:`, error);
        setConfirmation(null);
        setActionSuccess({
          title: 'Unable to refresh URLs',
          message: 'The status updates may have completed, but the list could not be refreshed. Reload the page to verify their status.'
        });
      } finally {
        setIsConfirmationLoading(false);
      }
    };

    const confirmReject = async () => {
      setIsConfirmationLoading(true);
      try {
        const response = await axios.put(`/admin/shorten-url/${confirmation.id}/status`, { status: 'rejected' });
        if (response.data.success) {
          setConfirmation(null);
          await fetchUrls();
          setActionSuccess({
            title: 'URL rejected',
            message: 'The shortened URL has been rejected.'
          });
        }
      } catch (error) {
        console.error('Failed to reject URL:', error);
        alert('Failed to reject URL.');
      } finally {
        setIsConfirmationLoading(false);
      }
    };

    const handleView = (url) => {
      const fullShortUrl = getFullShortUrl(url.short_code, url.short_url);
      window.open(fullShortUrl, '_blank');
    };

    const getFullShortUrl = (shortCode, shortUrl) => {
      return shortUrl || `${window.location.origin}/${shortCode}`;
    };

    const getStatusBadge = (status) => {
      if (!status || status === 'approved') {
        return (
          <span className="inline-flex items-center gap-1.5 rounded-md bg-[#e6f4ea] px-3 py-1 text-xs font-medium text-[#1e8e3e]">
            <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Approved
          </span>
        );
      } else if (status === 'pending') {
        return (
          <span className="inline-flex items-center gap-1.5 rounded-md bg-yellow-50 px-3 py-1 text-xs font-medium text-yellow-700">
            <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
            </svg>
            Pending
          </span>
        );
      } else if (status === 'rejected') {
        return (
          <span className="inline-flex items-center gap-1.5 rounded-md bg-red-50 px-3 py-1 text-xs font-medium text-red-700">
            <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            Rejected
          </span>
        );
      }
      return null;
    };

    const openCreateModal = () => {
      setIsCreateModalOpen(true);
    };

    const closeCreateModal = () => {
      setIsCreateModalOpen(false);
    };

    const handleCreateSuccess = ({ shortenedUrl: newShortenedUrl, qrCode: newQrCode }) => {
      setShortenedUrl(newShortenedUrl);
      setQrCode(newQrCode);
      setIsSuccessModalOpen(true);
      
      fetchUrls().catch((refreshError) => {
        console.error('URL created, but the list could not be refreshed:', refreshError);
      });
    };

    const handleCloseSuccessModal = () => {
      setIsSuccessModalOpen(false);
      setCopySuccess('');
      setQrCode('');
    };

    return (
      <AdminLayout title="Shorten URL" activePage="shorten-url">
        <div className="space-y-6">
          {/* Header action */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-600">Create short, memorable links for your content</p>
              <p className="text-xs text-gray-500 mt-1">Manage and monitor all shortened URLs</p>
            </div>
            <button
              onClick={openCreateModal}
              className="mt-3 sm:mt-0 bg-gray-700 hover:bg-gray-800 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 shadow-sm w-fit"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Create New URL
            </button>
          </div>

          {/* URL List with Tabs, Search and Filter */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            
            {/* Tabs */}
            <div className="border-b border-gray-200 px-6">
              <nav className="flex space-x-8" aria-label="Tabs">
                <button
                  onClick={() => handleTabChange('all')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === 'all'
                      ? 'border-blue-600 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  All URLs
                  <span className={`ml-2 px-2.5 py-0.5 text-xs rounded-full ${activeTab === 'all' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600'}`}>
                    {tabCounts.all}
                  </span>
                </button>
                <button
                  onClick={() => handleTabChange('pending')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === 'pending'
                      ? 'border-yellow-500 text-yellow-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Pending
                  <span className={`ml-2 px-2.5 py-0.5 text-xs rounded-full ${activeTab === 'pending' ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-100 text-gray-600'}`}>
                    {tabCounts.pending}
                  </span>
                </button>
                <button
                  onClick={() => handleTabChange('rejected')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === 'rejected'
                      ? 'border-red-500 text-red-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Rejected
                  <span className={`ml-2 px-2.5 py-0.5 text-xs rounded-full ${activeTab === 'rejected' ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-600'}`}>
                    {tabCounts.rejected}
                  </span>
                </button>
              </nav>
            </div>

            {/* Search and filters */}
            <div className="border-b border-gray-200 p-4">
              <div className="grid grid-cols-1 gap-3 md:grid-cols-[minmax(16rem,1fr)_minmax(12rem,0.65fr)_minmax(10rem,0.5fr)_auto] md:items-end">
                <div className="relative w-full">
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
                    placeholder="Search URLs by short URL, original URL, or department..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg hover:border-green-500 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all outline-none text-sm bg-white"
                  />
                  {searchTerm && (
                    <button
                      onClick={clearSearch}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  )}
                </div>
                <label className="text-sm font-medium text-gray-700">
                  Department
                  <select
                    value={selectedDepartment}
                    onChange={(event) => setSelectedDepartment(event.target.value)}
                    className="mt-1 block w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm outline-none transition-colors hover:border-green-500 focus:border-green-500 focus:ring-2 focus:ring-green-500"
                  >
                    <option value="">All departments</option>
                    {departmentOptions.map((department) => (
                      <option key={department.slug || department.name} value={department.name}>
                        {department.name}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="text-sm font-medium text-gray-700">
                  Status  
                  <select
                    value={selectedStatus}
                    onChange={(event) => setSelectedStatus(event.target.value)}
                    className="mt-1 block w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm outline-none transition-colors hover:border-green-500 focus:border-green-500 focus:ring-2 focus:ring-green-500"
                  >
                    <option value="">All statuses</option>
                    <option value="approved">Approved</option>
                    <option value="pending">Pending</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </label>
                {(selectedDepartment || selectedStatus) && (
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedDepartment('');
                      setSelectedStatus('');
                    }}
                    className="justify-self-start py-2 text-sm font-medium text-green-700 hover:text-green-800"
                  >
                    Clear
                  </button>
                )}
              </div>
            </div>

            {filteredUrls.length === 0 ? (
              <div className="p-12 text-center text-gray-500">
                <svg className="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                {searchTerm ? (
                  <>
                    <p className="text-gray-500 font-medium">No results found for "{searchTerm}"</p>
                    <p className="text-gray-400 text-sm mt-1">Try adjusting your search</p>
                  </>
                ) : (
                  <>
                    <p className="text-gray-500 font-medium">No {activeTab !== 'all' ? activeTab : 'approved'} URLs found</p>
                    <p className="text-gray-400 text-sm mt-1">
                      {activeTab === 'all' && 'Create your first short URL using the form above'}
                      {activeTab === 'pending' && 'There are no pending URLs awaiting approval'}
                      {activeTab === 'rejected' && 'There are no rejected URLs'}
                    </p>
                  </>
                )}
              </div>
            ) : (
              <>
                {canManageUrls && activeTab === 'pending' && selectedPendingIds.length > 0 && (
                  <div className="m-4 flex flex-col gap-4 rounded-xl border border-gray-200 bg-gray-50 p-4 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-sm font-medium text-gray-800">
                      {selectedPendingIds.length} URL{selectedPendingIds.length !== 1 ? 's' : ''} selected
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() => handleBulkStatus('approved')}
                        disabled={isConfirmationLoading}
                        className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-emerald-700 disabled:opacity-50"
                      >
                        Approve Selected
                      </button>
                      <button
                        type="button"
                        onClick={() => handleBulkStatus('rejected')}
                        disabled={isConfirmationLoading}
                        className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-red-700 disabled:opacity-50"
                      >
                        Reject Selected
                      </button>
                      <button
                        type="button"
                        onClick={() => setSelectedPendingIds([])}
                        disabled={isConfirmationLoading}
                        className="inline-flex items-center gap-2 rounded-lg bg-white border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 disabled:opacity-50"
                      >
                        Clear
                      </button>
                    </div>
                  </div>
                )}
                
                <div className="w-full overflow-visible">
                  <table className="w-full min-w-[1100px] text-left border-collapse">
                    <thead className="bg-[#f8f9fa] border-b border-gray-200">
                      <tr>
                        <th className="w-[4%] px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                          {canManageUrls && activeTab === 'pending' ? (
                            <div className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                checked={areAllPendingSelected}
                                onChange={handleToggleSelectAllPending}
                                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                              />
                              #
                            </div>
                          ) : '#'}
                        </th>
                        <th className="w-[18%] px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Short URL & Code</th>
                        <th className="w-[25%] px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Original URL</th>
                        <th className="w-[12%] px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Department</th>
                        <th className="w-[8%] px-6 py-4 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider">Clicks</th>
                        <th className="w-[10%] px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="w-[23%] px-6 py-4 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {currentUrls.map((url, index) => {
                        const fullShortUrl = getFullShortUrl(url.short_code, url.short_url);
                        const status = url.status || 'approved';
                        const rowNumber = indexOfFirstItem + index + 1;
                        
                        return (
                          <tr 
                            key={url.id} 
                            className="transition-colors hover:bg-gray-50 bg-white"
                          >
                            <td className="px-6 py-4 text-sm font-medium text-gray-500">
                              <div className="flex items-center gap-3">
                                {canManageUrls && status === 'pending' && (
                                  <input
                                    type="checkbox"
                                    checked={selectedPendingIds.includes(url.id)}
                                    onChange={() => handleTogglePendingSelection(url.id)}
                                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                  />
                                )}
                                {String(rowNumber).padStart(2, '0')}
                              </div>
                            </td>
                            
                            <td className="px-6 py-4">
                              <div className="flex flex-col gap-1">
                                <div className="flex items-start gap-2">
                                  <a
                                    href={fullShortUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="font-semibold text-black hover:text-gray-900 hover:underline break-all"
                                  >
                                    {fullShortUrl}
                                  </a>
                                  <button
                                    onClick={() => handleCopy(fullShortUrl)}
                                    className="mt-0.5 text-gray-400 hover:text-gray-600 transition-colors flex-shrink-0"
                                    title="Copy"
                                  >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                                    </svg>
                                  </button>
                                </div>
                                <span className="text-xs text-gray-500 break-all">{url.short_code || '-'}</span>
                              </div>
                            </td>

                            <td className="px-6 py-4">
                              <a
                                href={url.original_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block text-sm text-gray-600 hover:text-blue-700 hover:underline line-clamp-2 break-all"
                                title={url.original_url}
                              >
                                {url.original_url}
                              </a>
                            </td>

                            <td className="px-6 py-4">
                              <span
                                className="block text-sm text-gray-700 line-clamp-2 break-words"
                                title={getUrlDepartment(url)}
                              >
                                {getUrlDepartment(url)}
                              </span>
                            </td>

                            <td className="px-6 py-4 text-center text-sm font-medium text-gray-700">
                              {Number(url.clicks || 0).toLocaleString()}
                            </td>

                            <td className="px-6 py-4">
                              {getStatusBadge(status)}
                            </td>

                            <td className="px-6 py-4 text-center">
                              <div className="flex items-center justify-center gap-2">
                                
                                {/* ===== PENDING TAB: Approve / Reject / More ===== */}
                                {canManageUrls && status === 'pending' ? (
                                  <>
                                    {/* Approve Button */}
                                    <button
                                      onClick={() => handleApprove(url.id)}
                                      className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm font-medium text-emerald-700 shadow-sm transition-colors hover:bg-emerald-100"
                                    >
                                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                      </svg>
                                      Approve
                                    </button>

                                    {/* Reject Button */}
                                    <button
                                      onClick={() => handleReject(url.id)}
                                      className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm font-medium text-red-700 shadow-sm transition-colors hover:bg-red-100"
                                    >
                                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                      </svg>
                                      Reject
                                    </button>

                                    {/* More Dropdown — QR Code & Delete only */}
                                    <div className="relative">
                                      <button
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          setOpenDropdownId(openDropdownId === url.id ? null : url.id);
                                        }}
                                        className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50 hover:text-gray-900"
                                      >
                                        More
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                      </button>

                                      {openDropdownId === url.id && (
                                        <div 
                                          className="absolute right-0 mt-1 w-44 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 z-50 focus:outline-none"
                                          onClick={(e) => e.stopPropagation()}
                                        >
                                          <div className="py-1" role="menu">
                                            {/* QR Code */}
                                            <button
                                              onClick={() => handleGenerateQrCode(url)}
                                              className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                              role="menuitem"
                                            >
                                              <svg className="mr-3 h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm14 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                                              </svg>
                                              QR Code
                                            </button>

                                            {/* Delete */}
                                            <div className="border-t border-gray-100 my-1"></div>
                                            <button
                                              onClick={() => handleDelete(url.id)}
                                              className="flex w-full items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                                              role="menuitem"
                                            >
                                              <svg className="mr-3 h-4 w-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                              </svg>
                                              Delete URL
                                            </button>
                                          </div>
                                        </div>
                                      )}
                                    </div>
                                  </>
                                ) : (
                                  <>
                                    {/* ===== ALL / REJECTED TABS: View + More ===== */}
                                    {(status === 'approved' || !status) && (
                                      <button
                                        onClick={() => handleView(url)}
                                        className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50 hover:text-gray-900"
                                      >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                        </svg>
                                        View
                                      </button>
                                    )}
                                    
                                    <div className="relative">
                                      <button
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          setOpenDropdownId(openDropdownId === url.id ? null : url.id);
                                        }}
                                        className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50 hover:text-gray-900"
                                      >
                                        More
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                      </button>

                                      {openDropdownId === url.id && (
                                        <div 
                                          className="absolute right-0 mt-1 w-44 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 z-50 focus:outline-none"
                                          onClick={(e) => e.stopPropagation()}
                                        >
                                          <div className="py-1" role="menu">
                                            {/* Edit */}
                                            {(status === 'approved' || status === 'rejected') && (
                                              <button
                                                onClick={() => handleEdit(url)}
                                                className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                role="menuitem"
                                              >
                                                <svg className="mr-3 h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                </svg>
                                                Edit URL
                                              </button>
                                            )}

                                            {/* QR Code */}
                                            <button
                                              onClick={() => handleGenerateQrCode(url)}
                                              className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                              role="menuitem"
                                            >
                                              <svg className="mr-3 h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm14 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                                              </svg>
                                              QR Code
                                            </button>

                                            {/* Delete */}
                                            {canManageUrls && (
                                              <>
                                                <div className="border-t border-gray-100 my-1"></div>
                                                <button
                                                  onClick={() => handleDelete(url.id)}
                                                  className="flex w-full items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                                                  role="menuitem"
                                                >
                                                  <svg className="mr-3 h-4 w-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                  </svg>
                                                  Delete URL
                                                </button>
                                              </>
                                            )}
                                          </div>
                                        </div>
                                      )}
                                    </div>
                                  </>
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
                  <div className="px-6 py-4 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between bg-white gap-4 rounded-b-xl">
                    <div className="text-sm text-gray-500">
                      Showing <span className="font-medium text-gray-900">{indexOfFirstItem + 1}</span> to{' '}
                      <span className="font-medium text-gray-900">
                        {Math.min(indexOfLastItem, filteredUrls.length)}
                      </span>{' '}
                      of <span className="font-medium text-gray-900">{filteredUrls.length}</span> URLs
                    </div>
                    
                    <div className="flex items-center gap-1">
                      <button
                        onClick={handlePrevPage}
                        disabled={currentPage === 1}
                        className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        Previous
                      </button>
                      
                      <div className="flex gap-1 mx-2">
                        {getVisiblePageNumbers().map((pageNum) => (
                          <button
                            key={pageNum}
                            onClick={() => handlePageChange(pageNum)}
                            className={`w-9 h-9 flex items-center justify-center text-sm font-medium rounded-lg transition-colors ${
                              currentPage === pageNum
                                ? 'bg-[#2c3e50] text-white border border-[#2c3e50]'
                                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                            }`}
                          >
                            {pageNum}
                          </button>
                        ))}
                      </div>

                      <button
                        onClick={handleNextPage}
                        disabled={currentPage === totalPages}
                        className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        Next
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
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

        <ConfirmModal
          isOpen={Boolean(confirmation)}
          onClose={() => setConfirmation(null)}
          onConfirm={
            confirmation?.type === 'approve'
              ? confirmApprove
              : confirmation?.type === 'reject'
                ? confirmReject
                : confirmation?.type === 'bulkApprove' || confirmation?.type === 'bulkReject'
                  ? confirmBulkStatus
                  : confirmDelete
          }
          title={
            confirmation?.type === 'approve'
              ? 'Approve URL?'
              : confirmation?.type === 'reject'
                ? 'Reject URL?'
                : confirmation?.type === 'bulkApprove'
                  ? 'Approve selected URLs?'
                  : confirmation?.type === 'bulkReject'
                    ? 'Reject selected URLs?'
                    : 'Delete shortened URL?'
          }
          message={
            confirmation?.type === 'approve'
              ? 'Are you sure you want to approve this URL?'
              : confirmation?.type === 'reject'
                ? 'Are you sure you want to reject this URL?'
                : confirmation?.type === 'bulkApprove'
                  ? `Are you sure you want to approve ${confirmation.ids.length} selected URLs?`
                  : confirmation?.type === 'bulkReject'
                    ? `Are you sure you want to reject ${confirmation.ids.length} selected URLs?`
                    : 'This action cannot be undone.'
          }
          confirmText={
            confirmation?.type === 'approve'
              ? 'Approve'
              : confirmation?.type === 'reject'
                ? 'Reject'
                : confirmation?.type === 'bulkApprove'
                  ? 'Approve Selected'
                  : confirmation?.type === 'bulkReject'
                    ? 'Reject Selected'
                    : 'Delete'
          }
          confirmColor={
            confirmation?.type === 'approve' || confirmation?.type === 'bulkApprove'
              ? 'bg-green-600 hover:bg-green-700'
              : 'bg-red-600 hover:bg-red-700'
          }
          loading={isConfirmationLoading}
        />

        {/* Success Modal for URL creation */}
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
                onClick={() => handleCopy(shortenedUrl)}
                className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors whitespace-nowrap"
              >
                {copySuccess || 'Copy'}
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

        {confirmation && isConfirmationLoading && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 backdrop-blur-sm">
            <div className="rounded-xl bg-white px-10 py-8 shadow-2xl">
              <LoadingSpinner
                size={48}
                color="text-gray-700"
                text={
                  confirmation.type === 'approve'
                    ? 'Approving URL...'
                    : confirmation.type === 'reject'
                      ? 'Rejecting URL...'
                      : 'Deleting URL...'
                }
              />
            </div>
          </div>
        )}
      </AdminLayout>
    );
  }