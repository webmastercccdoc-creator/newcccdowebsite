import { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from '../../../components/admin/Modal';

export default function CreateShortenUrl({ 
  isOpen, 
  onClose, 
  onSave, 
  onSuccess, 
  showAlert,
  url = null,
  isEditing = false,
  isLoading = false
}) {
  const [originalUrl, setOriginalUrl] = useState('');
  const [shortCode, setShortCode] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  // Populate form when editing
  useEffect(() => {
    if (isEditing && url) {
      setOriginalUrl(url.original_url || '');
      setShortCode(url.short_code || '');
    } else {
      resetForm();
    }
  }, [isEditing, url, isOpen]);

  const resetForm = () => {
    setOriginalUrl('');
    setShortCode('');
    setError('');
    setIsSubmitting(false);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (isEditing) {
      setIsSubmitting(true);
    } else {
      setIsSubmitting(true);
    }

    // Validate URL
    if (!originalUrl) {
      await showAlert('warning', 'URL required', 'Please enter a URL.');
      setIsSubmitting(false);
      return;
    }

    try {
      // Add http:// if no protocol is specified
      let urlToSubmit = originalUrl;
      if (!/^https?:\/\//i.test(urlToSubmit)) {
        urlToSubmit = 'https://' + urlToSubmit;
      }

      const payload = {
        original_url: urlToSubmit,
      };

      // Add custom short code if provided
      if (shortCode.trim()) {
        payload.path = shortCode.trim();
      }

      let response;

      if (isEditing && url) {
        // Update existing URL
        response = await axios.put(`/admin/shorten-url/${url.id}`, payload);
      } else {
        // Create new URL
        response = await axios.post('/admin/shorten-url', payload);
      }

      if (response.data.success) {
        if (isEditing) {
          // For edit mode, call onSave
          if (onSave) {
            onSave(response.data);
          }
          resetForm();
          onClose();
          await showAlert('success', 'URL updated', 'The URL was updated successfully.');
        } else {
          // For create mode
          const generatedUrl = response.data.shortened_url || response.data.short_url;
          if (!generatedUrl) {
            throw new Error('The server did not return a shortened URL.');
          }

          resetForm();
          onClose();
          
          // Call onSuccess with the generated URL and QR code
          if (onSuccess) {
            onSuccess({
              shortenedUrl: generatedUrl,
              qrCode: response.data.qr_code || ''
            });
          }
        }
      } else {
        await showAlert('error', isEditing ? 'Update failed' : 'Unable to shorten URL', response.data.message || (isEditing ? 'Failed to update URL.' : 'Failed to shorten URL.'));
      }
    } catch (error) {
      console.error(isEditing ? 'Error updating URL:' : 'Error shortening URL:', error);
      let errorMessage = isEditing ? 'Failed to update URL. Please try again.' : 'Failed to shorten URL. Please try again.';
      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.response?.data?.errors) {
        errorMessage = Object.values(error.response.data.errors).flat().join(', ');
      }
      setError(errorMessage);
      await showAlert('error', isEditing ? 'Update failed' : 'Unable to shorten URL', errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={isEditing ? "Edit Short URL" : "Create Short URL"}
      size="lg"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-4">
          {/* Original URL */}
          <div>
            <label htmlFor="modalOriginalUrl" className="block text-sm font-medium text-gray-700 mb-1">
              Original URL <span className="text-red-500">*</span>
            </label>
            <input
              type="url"
              id="modalOriginalUrl"
              value={originalUrl}
              onChange={(e) => setOriginalUrl(e.target.value)}
              placeholder="https://example.com/very-long-url"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-400 focus:border-gray-400 outline-none transition-colors"
              disabled={isSubmitting || isLoading}
              autoFocus
            />
          </div>

          {/* Custom Short Code */}
          <div>
            <label htmlFor="modalShortCode" className="block text-sm font-medium text-gray-700 mb-1">
              Custom Code <span className="text-xs font-normal text-gray-500">(Optional)</span>
            </label>
            <input
              type="text"
              id="modalShortCode"
              value={shortCode}
              onChange={(e) => setShortCode(e.target.value.replace(/[^a-zA-Z0-9_-]/g, ''))}
              placeholder="custom-code"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-400 focus:border-gray-400 outline-none transition-colors"
              disabled={isSubmitting || isLoading}
              maxLength={20}
            />
            <p className="mt-1 text-xs text-gray-500">
              Leave empty to generate a random code. Max 20 characters (letters, numbers, underscores, hyphens).
            </p>
          </div>

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
              {error}
            </div>
          )}
        </div>

        {/* Modal Actions */}
        <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
          <button
            type="button"
            onClick={handleClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-200"
            disabled={isSubmitting || isLoading}
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting || isLoading}
            className="px-6 py-2 bg-gray-700 text-white font-medium rounded-lg hover:bg-gray-800 focus:ring-4 focus:ring-gray-300 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow-md flex items-center gap-2"
          >
            {(isSubmitting || isLoading) ? (
              <>
                <svg className="inline animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {isEditing ? 'Updating...' : 'Shortening...'}
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                </svg>
                {isEditing ? 'Update URL' : 'Shorten URL'}
              </>
            )}
          </button>
        </div>
      </form>
    </Modal>
  );
}