import { useState, useEffect } from 'react';
import { usePage } from '@inertiajs/react';
import axios from 'axios';
import AdminLayout from '../../../layouts/AdminLayout';
import Modal, { ConfirmModal } from '../../../components/admin/Modal';
import CreateShortenUrl from './CreateShortenUrl';
import EditShortenUrl from './EditShortenUrl';

export default function Url() {
  const { auth } = usePage();
  const { user } = auth || {};

  const [shortenedUrl, setShortenedUrl] = useState('');
  const [qrCode, setQrCode] = useState('');
  const [urls, setUrls] = useState([]);
  const [filteredUrls, setFilteredUrls] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [copySuccess, setCopySuccess] = useState('');
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [confirmation, setConfirmation] = useState(null);
  const [isConfirmationLoading, setIsConfirmationLoading] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  
  // Search and Filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [activeTab, setActiveTab] = useState('all'); // 'all', 'pending', 'rejected'
  
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(3);

  // Edit states - Updated for Modal
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingUrl, setEditingUrl] = useState(null);
  const [isEditLoading, setIsEditLoading] = useState(false);

  // Tab counts
  const [tabCounts, setTabCounts] = useState({
    all: 0,
    pending: 0,
    rejected: 0
  });

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
    setCurrentPage(1);
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

  const handleDelete = async (id) => {
    setConfirmation({ type: 'delete', id });
  };

  const confirmDelete = async () => {
    setIsConfirmationLoading(true);

    try {
      await axios.delete(`/admin/shorten-url/${confirmation.id}`);
      setConfirmation(null);
      await fetchUrls();
      alert('The shortened URL was deleted successfully.');
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
  };

  const handleEditSave = async (updatedData) => {
    setIsEditLoading(true);
    try {
      // The update is already handled in the EditShortenUrl component
      // Just refresh the list
      await fetchUrls();
      setIsEditModalOpen(false);
      setEditingUrl(null);
      alert('The URL was updated successfully.');
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
  };

  const confirmApprove = async () => {
    setIsConfirmationLoading(true);

    try {
      const response = await axios.put(`/admin/shorten-url/${confirmation.id}/status`, { status: 'approved' });
      if (response.data.success) {
        setConfirmation(null);
        await fetchUrls();
        alert('The URL has been approved successfully.');
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
  };

  const confirmReject = async () => {
    setIsConfirmationLoading(true);

    try {
      const response = await axios.put(`/admin/shorten-url/${confirmation.id}/status`, { status: 'rejected' });
      if (response.data.success) {
        setConfirmation(null);
        await fetchUrls();
        alert('The URL has been rejected.');
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
      return <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">Approved</span>;
    } else if (status === 'pending') {
      return <span className="px-2 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800">Pending</span>;
    } else if (status === 'rejected') {
      return <span className="px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-800">Rejected</span>;
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
    
    // Refresh the URL list
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
            className="mt-3 sm:mt-0 bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 shadow-md hover:shadow-lg w-fit"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Create New URL
          </button>
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
                <span className="ml-2 px-2 py-0.5 text-xs rounded-full text-gray-700">
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
                <span className="ml-2 px-2 py-0.5 text-xs rounded-full text-yellow-700">
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
                <span className="ml-2 px-2 py-0.5 text-xs rounded-full text-red-700">
                  {tabCounts.rejected}
                </span>
              </button>
            </nav>
          </div>

          {/* Search and Filters */}
          <div className="bg-gray-100 border-b border-gray-200 shadow-sm p-4">
            <div className="flex flex-col md:flex-row gap-4">
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
                  placeholder="Search URLs by short URL or original URL..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none text-sm bg-white"
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

              <div className="flex-1 flex flex-wrap gap-4">
                <select
                  value={filterType}
                  onChange={handleFilterChange}
                  className="px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none text-sm bg-white min-w-[130px]"
                >
                  <option value="all">All Fields</option>
                  <option value="short_url">Short URL</option>
                  <option value="original_url">Original URL</option>
                </select>

                {(searchTerm || filterType !== 'all') && (
                  <button
                    onClick={clearSearch}
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

            <div className="mt-3 text-sm text-gray-600">
              {filteredUrls.length === 0 ? (
                <span>No URLs found matching your criteria</span>
              ) : (
                <span>
                  Found <span className="font-medium text-gray-800">{filteredUrls.length}</span> URL{filteredUrls.length !== 1 ? 's' : ''}
                  {searchTerm && <span> matching "<span className="font-medium text-gray-800">{searchTerm}</span>"</span>}
                  {filterType !== 'all' && <span> in <span className="font-medium text-gray-800">{filterType.replace('_', ' ')}</span></span>}
                </span>
              )}
            </div>
          </div>

          {filteredUrls.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              <svg className="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              {searchTerm ? (
                <>
                  <p className="text-gray-500 font-medium">No results found for "{searchTerm}"</p>
                  <p className="text-gray-400 text-sm mt-1">Try adjusting your search or filter</p>
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
              <div className="w-full overflow-hidden">
                <table className="w-full table-fixed">
                  <thead className="bg-gray-700 text-white">
                    <tr>
                      <th className="w-[25%] px-6 py-3 text-center text-xs font-medium uppercase tracking-wider">Short URL</th>
                      <th className="w-[40%] px-6 py-3 text-center text-xs font-medium uppercase tracking-wider">Original URL</th>
                      <th className="w-[10%] px-6 py-3 text-center text-xs font-medium uppercase tracking-wider">Status</th>
                      <th className="w-[25%] px-6 py-3 text-center text-xs font-medium uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {currentUrls.map((url) => {
                      const fullShortUrl = getFullShortUrl(url.short_code, url.short_url);
                      const status = url.status || 'approved';
                      
                      return (
                        <tr key={url.id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4">
                            <div className="flex items-center justify-center gap-2">
                              <div className="flex-1 min-w-0">
                                <a
                                  href={fullShortUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-blue-600 hover:text-blue-800 hover:underline font-medium text-sm truncate block text-center"
                                >
                                  {fullShortUrl}
                                </a>
                              </div>
                              <button
                                onClick={() => handleCopy(fullShortUrl)}
                                className="text-gray-400 hover:text-gray-600 transition-colors flex-shrink-0"
                                title="Copy"
                              >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                                </svg>
                              </button>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="truncate text-sm text-gray-600 text-center">
                              {url.original_url}
                            </div>
                          </td>
                          <td className="px-6 py-4 text-center">
                            {getStatusBadge(status)}
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center justify-center gap-1.5 flex-wrap">
                              {/* View Button - Only show for approved URLs */}
                              {(status === 'approved' || !status) && (
                                <button
                                  onClick={() => handleView(url)}
                                  className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors duration-200 whitespace-nowrap"
                                  title="View"
                                >
                                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                  </svg>
                                  View
                                </button>
                              )}
                              
                              {status === 'pending' && (
                                <>
                                  <button
                                    onClick={() => handleApprove(url.id)}
                                    className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-white bg-green-600 hover:bg-green-700 rounded-lg transition-colors duration-200 whitespace-nowrap"
                                    title="Approve"
                                  >
                                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    Approve
                                  </button>
                                  <button
                                    onClick={() => handleReject(url.id)}
                                    className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors duration-200 whitespace-nowrap"
                                    title="Reject"
                                  >
                                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                    Reject
                                  </button>
                                </>
                              )}
                              
                              {(status === 'approved' || status === 'rejected') && (
                                <button
                                  onClick={() => handleEdit(url)}
                                  className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-white bg-yellow-500 hover:bg-yellow-600 rounded-lg transition-colors duration-200 whitespace-nowrap"
                                  title="Edit"
                                >
                                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                  </svg>
                                  Edit
                                </button>
                              )}
                              
                              <button
                                onClick={() => handleDelete(url.id)}
                                className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors duration-200 whitespace-nowrap"
                                title="Delete"
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
    </AdminLayout>
  );
}