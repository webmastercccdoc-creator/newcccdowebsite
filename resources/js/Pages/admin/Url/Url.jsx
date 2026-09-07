import { useState, useEffect } from 'react';
import { usePage } from '@inertiajs/react';
import axios from 'axios';
import AdminLayout from '../../../layouts/AdminLayout';
import Modal, { ConfirmModal } from '../../../components/admin/Modal';

export default function Url() {
  const { auth } = usePage();
  const { user } = auth || {};

  const [originalUrl, setOriginalUrl] = useState('');
  const [shortCode, setShortCode] = useState('');
  const [shortenedUrl, setShortenedUrl] = useState('');
  const [qrCode, setQrCode] = useState('');
  const [urls, setUrls] = useState([]);
  const [filteredUrls, setFilteredUrls] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [copySuccess, setCopySuccess] = useState('');
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [alertModal, setAlertModal] = useState(null);
  const [confirmation, setConfirmation] = useState(null);
  const [isConfirmationLoading, setIsConfirmationLoading] = useState(false);
  
  // Search and Filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [activeTab, setActiveTab] = useState('all'); // 'all', 'pending', 'rejected'
  
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(3);

  // Edit states
  const [editingId, setEditingId] = useState(null);
  const [editOriginalUrl, setEditOriginalUrl] = useState('');

  // Tab counts
  const [tabCounts, setTabCounts] = useState({
    all: 0,
    pending: 0,
    rejected: 0
  });

  const showAlert = (icon, title, text) => {
    setAlertModal({ icon, title, text });
  };

  // Fetch all shortened URLs
  useEffect(() => {
    fetchUrls();
  }, []);

  // Filter URLs when search term, filter type, or active tab changes
  useEffect(() => {
    filterUrls();
  }, [searchTerm, filterType, urls, activeTab]);

  const fetchUrls = async () => {
    try {
      const response = await axios.get('/admin/shorten-url/list');
      if (response.data.urls) {
        setUrls(response.data.urls);
        setFilteredUrls(response.data.urls);
        updateTabCounts(response.data.urls);
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
      all: urlList.filter(url => url.status === 'approved' || !url.status).length,
      pending: urlList.filter(url => url.status === 'pending').length,
      rejected: urlList.filter(url => url.status === 'rejected').length
    };
    setTabCounts(counts);
  };

  const filterUrls = () => {
    let filtered = [...urls];

    // First filter by active tab
    if (activeTab === 'pending') {
      filtered = filtered.filter(url => url.status === 'pending');
    } else if (activeTab === 'rejected') {
      filtered = filtered.filter(url => url.status === 'rejected');
    } else if (activeTab === 'all') {
      // Show only approved URLs in the "All" tab
      filtered = filtered.filter(url => url.status === 'approved' || !url.status);
    }

    // Then filter by search term
    if (searchTerm.trim() !== '') {
      const term = searchTerm.toLowerCase().trim();
      filtered = filtered.filter((url) => {
        const fullShortUrl = getFullShortUrl(url.short_code, url.short_url);
        const originalUrlLower = url.original_url.toLowerCase();
        const shortUrlLower = fullShortUrl.toLowerCase();

        if (filterType === 'short_url') {
          return shortUrlLower.includes(term);
        } else if (filterType === 'original_url') {
          return originalUrlLower.includes(term);
        } else {
          return shortUrlLower.includes(term) || originalUrlLower.includes(term);
        }
      });
    }

    setFilteredUrls(filtered);
    setCurrentPage(1);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (e) => {
    setFilterType(e.target.value);
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setCurrentPage(1);
  };

  const clearSearch = () => {
    setSearchTerm('');
    setFilterType('all');
  };

  // Pagination calculations
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentUrls = filteredUrls.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredUrls.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setShortenedUrl('');
    setIsLoading(true);

    // Validate URL
    if (!originalUrl) {
      await showAlert('warning', 'URL required', 'Please enter a URL.');
      setIsLoading(false);
      return;
    }

    try {
      // Add http:// if no protocol is specified
      let urlToShorten = originalUrl;
      if (!/^https?:\/\//i.test(urlToShorten)) {
        urlToShorten = 'https://' + urlToShorten;
      }

      const payload = {
        original_url: urlToShorten,
      };

      // Add custom short code if provided
      if (shortCode.trim()) {
        payload.path = shortCode.trim();
      }

      const response = await axios.post('/admin/shorten-url', payload);

      if (response.data.success) {
        const generatedUrl = response.data.shortened_url || response.data.short_url;
        if (!generatedUrl) {
          throw new Error('The server did not return a shortened URL.');
        }

        setShortenedUrl(generatedUrl);
        setQrCode(response.data.qr_code || '');
        setOriginalUrl('');
        setShortCode('');
        setIsSuccessModalOpen(true);

        // Refresh the table without replacing a successful create with a refresh error.
        fetchUrls().catch((refreshError) => {
          console.error('URL created, but the list could not be refreshed:', refreshError);
        });
      } else {
        await showAlert('error', 'Unable to shorten URL', response.data.message || 'Failed to shorten URL.');
      }
    } catch (error) {
      console.error('Error shortening URL:', error);
      let errorMessage = 'Failed to shorten URL. Please try again.';
      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.response?.data?.errors) {
        errorMessage = Object.values(error.response.data.errors).flat().join(', ');
      }
      await showAlert('error', 'Unable to shorten URL', errorMessage);
    } finally {
      setIsLoading(false);
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
        showAlert('error', 'Copy failed', 'Failed to copy URL.');
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

  const handleDelete = async (id) => {
    setConfirmation({ type: 'delete', id });
  };

  const confirmDelete = async () => {
    setIsConfirmationLoading(true);

    try {
      await axios.delete(`/admin/shorten-url/${confirmation.id}`);
      setConfirmation(null);
      fetchUrls();
      await showAlert('success', 'URL deleted', 'The shortened URL was deleted successfully.');
    } catch (error) {
      console.error('Failed to delete URL:', error);
      await showAlert('error', 'Delete failed', 'Failed to delete URL.');
    } finally {
      setIsConfirmationLoading(false);
    }
  };

  const handleEdit = (url) => {
    setEditingId(url.id);
    setEditOriginalUrl(url.original_url);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditOriginalUrl('');
    setError('');
  };

  const handleUpdateUrl = async (id) => {
    if (!editOriginalUrl) {
      await showAlert('warning', 'URL required', 'Please enter a URL.');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      let urlToUpdate = editOriginalUrl;
      if (!/^https?:\/\//i.test(urlToUpdate)) {
        urlToUpdate = 'https://' + urlToUpdate;
      }

      const response = await axios.put(`/admin/shorten-url/${id}`, {
        original_url: urlToUpdate,
      });

      if (response.data.success) {
        fetchUrls();
        handleCancelEdit();
        await showAlert('success', 'URL updated', 'The URL was updated successfully.');
      } else {
        await showAlert('error', 'Update failed', response.data.message || 'Failed to update URL.');
      }
    } catch (error) {
      console.error('Error updating URL:', error);
      await showAlert('error', 'Update failed', error.response?.data?.message || 'Failed to update URL. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleApprove = async (id) => {
    setConfirmation({ type: 'approve', id });
  };

  const confirmApprove = async () => {
    setIsConfirmationLoading(true);

    try {
      const response = await axios.put(`/admin/shorten-url/${confirmation.id}/status`, { status: 'approved' });
      if (response.data.success) {
        setConfirmation(null);
        fetchUrls();
        await showAlert('success', 'URL approved', 'The URL has been approved successfully.');
      }
    } catch (error) {
      console.error('Failed to approve URL:', error);
      await showAlert('error', 'Approval failed', 'Failed to approve URL.');
    } finally {
      setIsConfirmationLoading(false);
    }
  };

  const handleReject = async (id) => {
    setConfirmation({ type: 'reject', id });
  };

  const confirmReject = async () => {
    setIsConfirmationLoading(true);

    try {
      const response = await axios.put(`/admin/shorten-url/${confirmation.id}/status`, { status: 'rejected' });
      if (response.data.success) {
        setConfirmation(null);
        fetchUrls();
        await showAlert('success', 'URL rejected', 'The URL has been rejected.');
      }
    } catch (error) {
      console.error('Failed to reject URL:', error);
      await showAlert('error', 'Rejection failed', 'Failed to reject URL.');
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
      return <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">Approved</span>;
    } else if (status === 'pending') {
      return <span className="px-2 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800">Pending</span>;
    } else if (status === 'rejected') {
      return <span className="px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-800">Rejected</span>;
    }
    return null;
  };

  return (
    <AdminLayout title="Shorten URL" activePage="shorten-url">
      <div className="space-y-6">
        <p className="text-gray-600">Create short, memorable links for your content</p>

        {/* Create Short URL Form - Horizontal */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Create Short URL</h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col lg:flex-row gap-3">
              {/* Original URL */}
              <div className="flex-1">
                <label htmlFor="originalUrl" className="block text-sm font-medium text-gray-700 mb-1">
                  Original URL <span className="text-red-500">*</span>
                </label>
                <input
                  type="url"
                  id="originalUrl"
                  value={originalUrl}
                  onChange={(e) => setOriginalUrl(e.target.value)}
                  placeholder="https://example.com/very-long-url"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors"
                  disabled={isLoading}
                />
              </div>

              {/* Custom Short Code */}
              <div className="lg:w-64">
                <label htmlFor="shortCode" className="block text-sm font-medium text-gray-700 mb-1">
                  Custom Code <span className="text-xs font-normal text-gray-500">(Optional)</span>
                </label>
                <input
                  type="text"
                  id="shortCode"
                  value={shortCode}
                  onChange={(e) => setShortCode(e.target.value.replace(/[^a-zA-Z0-9_-]/g, ''))}
                  placeholder="custom-code"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors"
                  disabled={isLoading}
                  maxLength={20}
                />
              </div>

              {/* Submit Button */}
              <div className="lg:w-auto flex items-end">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full lg:w-auto px-8 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
                >
                  {isLoading ? 'Shortening...' : 'Shorten URL'}
                </button>
              </div>
            </div>

            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                {error}
              </div>
            )}

          </form>
        </div>

        {/* URL List with Tabs, Search and Filter */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          {/* Tabs */}
          <div className="border-b border-gray-200 bg-gray-50 px-6 pt-4">
            <nav className="flex space-x-6" aria-label="Tabs">
              <button
                onClick={() => handleTabChange('all')}
                className={`py-3 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === 'all'
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                All URLs
                <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-gray-200 text-gray-700">
                  {tabCounts.all}
                </span>
              </button>
              <button
                onClick={() => handleTabChange('pending')}
                className={`py-3 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === 'pending'
                    ? 'border-yellow-500 text-yellow-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Pending
                <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-yellow-100 text-yellow-700">
                  {tabCounts.pending}
                </span>
              </button>
              <button
                onClick={() => handleTabChange('rejected')}
                className={`py-3 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === 'rejected'
                    ? 'border-red-500 text-red-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Rejected
                <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-red-100 text-red-700">
                  {tabCounts.rejected}
                </span>
              </button>
            </nav>
          </div>

          <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <h2 className="text-lg font-semibold text-gray-800">
                {activeTab === 'all' && 'Approved URLs'}
                {activeTab === 'pending' && 'Pending URLs'}
                {activeTab === 'rejected' && 'Rejected URLs'}
              </h2>
              <span className="text-sm text-gray-500">
                Showing: {filteredUrls.length} URL{filteredUrls.length !== 1 ? 's' : ''}
              </span>
            </div>
            
            {/* Search and Filter Bar */}
            <div className="mt-4 flex flex-col sm:flex-row gap-3">
              <div className="flex-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={handleSearchChange}
                  placeholder="Search URLs..."
                  className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors"
                />
                {searchTerm && (
                  <button
                    onClick={clearSearch}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                  >
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>
              
              <div className="flex gap-2">
                <select
                  value={filterType}
                  onChange={handleFilterChange}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors bg-white min-w-[140px]"
                >
                  <option value="all">All Fields</option>
                  <option value="short_url">Short URL</option>
                  <option value="original_url">Original URL</option>
                </select>
                
                {searchTerm && (
                  <button
                    onClick={clearSearch}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-200 whitespace-nowrap"
                  >
                    Clear Filters
                  </button>
                )}
              </div>
            </div>
          </div>

          {filteredUrls.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              <svg className="w-12 h-12 mx-auto text-gray-400 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              {searchTerm ? (
                <>
                  <p>No results found for "{searchTerm}"</p>
                  <p className="text-sm mt-1">Try adjusting your search or filter</p>
                </>
              ) : (
                <>
                  <p>No {activeTab !== 'all' ? activeTab : 'approved'} URLs found</p>
                  <p className="text-sm mt-1">
                    {activeTab === 'all' && 'Create your first short URL using the form above'}
                    {activeTab === 'pending' && 'There are no pending URLs awaiting approval'}
                    {activeTab === 'rejected' && 'There are no rejected URLs'}
                  </p>
                </>
              )}
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Short URL</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Original URL</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {currentUrls.map((url) => {
                      const fullShortUrl = getFullShortUrl(url.short_code, url.short_url);
                      const isCurrentlyEditing = editingId === url.id;
                      const status = url.status || 'approved';
                      
                      return (
                        <tr key={url.id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              <a
                                href={fullShortUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:text-blue-800 hover:underline font-medium text-sm"
                              >
                                {fullShortUrl}
                              </a>
                              <button
                                onClick={() => handleCopy(fullShortUrl)}
                                className="text-gray-400 hover:text-gray-600 transition-colors"
                                title="Copy"
                              >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                                </svg>
                              </button>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            {isCurrentlyEditing ? (
                              <div className="flex items-center gap-2">
                                <input
                                  type="url"
                                  value={editOriginalUrl}
                                  onChange={(e) => setEditOriginalUrl(e.target.value)}
                                  className="flex-1 px-3 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm"
                                  placeholder="Enter new URL"
                                  disabled={isLoading}
                                  autoFocus
                                />
                                <button
                                  onClick={() => handleUpdateUrl(url.id)}
                                  disabled={isLoading}
                                  className="px-3 py-1 text-xs font-medium text-white bg-green-600 hover:bg-green-700 rounded-lg transition-colors duration-200 disabled:opacity-50"
                                >
                                  {isLoading ? 'Saving...' : 'Save'}
                                </button>
                                <button
                                  onClick={handleCancelEdit}
                                  disabled={isLoading}
                                  className="px-3 py-1 text-xs font-medium text-gray-700 bg-gray-200 hover:bg-gray-300 rounded-lg transition-colors duration-200"
                                >
                                  Cancel
                                </button>
                              </div>
                            ) : (
                              <div className="max-w-xs truncate text-sm text-gray-600" title={url.original_url}>
                                {url.original_url}
                              </div>
                            )}
                          </td>
                          <td className="px-6 py-4">
                            {getStatusBadge(status)}
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center justify-end gap-1.5 flex-nowrap">
                              {!isCurrentlyEditing && (
                                <>
                                  {/* View button removed for all tabs */}
                                  
                                  {status === 'pending' && (
                                    <>
                                      <button
                                        onClick={() => handleApprove(url.id)}
                                        className="px-2.5 py-1.5 text-xs font-medium text-white bg-green-600 hover:bg-green-700 rounded-lg transition-colors duration-200 whitespace-nowrap"
                                        title="Approve"
                                      >
                                        Approve
                                      </button>
                                      <button
                                        onClick={() => handleReject(url.id)}
                                        className="px-2.5 py-1.5 text-xs font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors duration-200 whitespace-nowrap"
                                        title="Reject"
                                      >
                                        Reject
                                      </button>
                                    </>
                                  )}
                                  
                                  {(status === 'approved' || status === 'rejected') && (
                                    <button
                                      onClick={() => handleEdit(url)}
                                      className="px-2.5 py-1.5 text-xs font-medium text-white bg-yellow-500 hover:bg-yellow-600 rounded-lg transition-colors duration-200 whitespace-nowrap"
                                      title="Edit"
                                    >
                                      Edit
                                    </button>
                                  )}
                                </>
                              )}
                              <button
                                onClick={() => handleDelete(url.id)}
                                className="px-2.5 py-1.5 text-xs font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors duration-200 whitespace-nowrap"
                                title="Delete"
                              >
                                Delete
                              </button>
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
                    <span className="font-medium">
                      {Math.min(indexOfLastItem, filteredUrls.length)}
                    </span>{' '}
                    of <span className="font-medium">{filteredUrls.length}</span> results
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handlePrevPage}
                      disabled={currentPage === 1}
                      className="px-3 py-1 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      Previous
                    </button>
                    <div className="flex gap-1">
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                        <button
                          key={pageNum}
                          onClick={() => handlePageChange(pageNum)}
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
                      onClick={handleNextPage}
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

      <ConfirmModal
        isOpen={Boolean(confirmation)}
        onClose={() => setConfirmation(null)}
        onConfirm={
          confirmation?.type === 'approve'
            ? confirmApprove
            : confirmation?.type === 'reject'
              ? confirmReject
              : confirmDelete
        }
        title={
          confirmation?.type === 'approve'
            ? 'Approve URL?'
            : confirmation?.type === 'reject'
              ? 'Reject URL?'
              : 'Delete shortened URL?'
        }
        message={
          confirmation?.type === 'approve'
            ? 'Are you sure you want to approve this URL?'
            : confirmation?.type === 'reject'
              ? 'Are you sure you want to reject this URL?'
              : 'This action cannot be undone.'
        }
        confirmText={
          confirmation?.type === 'approve'
            ? 'Approve'
            : confirmation?.type === 'reject'
              ? 'Reject'
              : 'Delete'
        }
        confirmColor={
          confirmation?.type === 'approve'
            ? 'bg-green-600 hover:bg-green-700'
            : 'bg-red-600 hover:bg-red-700'
        }
        loading={isConfirmationLoading}
      />

      <Modal
        isOpen={Boolean(alertModal)}
        onClose={() => setAlertModal(null)}
        title={alertModal?.title || ''}
        size="sm"
      >
        <div className="space-y-5 text-center">
          <div className={`mx-auto flex h-16 w-16 items-center justify-center rounded-full border-4 ${
            alertModal?.icon === 'error'
              ? 'border-red-200 text-red-500'
              : alertModal?.icon === 'success'
                ? 'border-green-200 text-green-500'
                : 'border-orange-200 text-orange-400'
          }`}>
            <span className="text-4xl font-semibold leading-none">
              {alertModal?.icon === 'error' ? '×' : alertModal?.icon === 'success' ? '✓' : '!'}
            </span>
          </div>
          <p className="text-gray-600">{alertModal?.text}</p>
          <div className="flex justify-center">
            <button
              type="button"
              onClick={() => setAlertModal(null)}
              className="px-5 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
            >
              OK
            </button>
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={isSuccessModalOpen}
        onClose={() => {
          setIsSuccessModalOpen(false);
          setCopySuccess('');
          setQrCode('');
        }}
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
              onClick={() => {
                setIsSuccessModalOpen(false);
                setCopySuccess('');
                setQrCode('');
              }}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Done
            </button>
          </div>
        </div>
      </Modal>
    </AdminLayout>
  );
}