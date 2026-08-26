import { useState, useEffect } from 'react';
import axios from 'axios';
import AddPromotions from './AddPromotions';

export default function EditPromotions({
  isOpen,
  onClose,
  onUpdated,
  promotionId = null,
}) {
  const [promotion, setPromotion] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch promotion data when modal opens with an ID
  useEffect(() => {
    if (isOpen && promotionId) {
      fetchPromotionData(promotionId);
    } else if (isOpen && !promotionId) {
      // If no promotion ID is provided, close the modal
      onClose();
    }
  }, [isOpen, promotionId]);

  const fetchPromotionData = async (id) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`/api/promotions/${id}`);
      setPromotion(response.data);
    } catch (error) {
      console.error('Error fetching promotion:', error);
      setError('Failed to load promotion data. Please try again.');
      // Close modal after a delay if there's an error
      setTimeout(() => {
        onClose();
      }, 2000);
    } finally {
      setLoading(false);
    }
  };

  // Prepare promotion data for the AddPromotions component
  const promotionData = promotion ? {
    id: promotion.id,
    title: promotion.title || '',
    content: promotion.content || '',
    date: promotion.date || '',
    expire: promotion.expire || '',
    status: promotion.status || 'active',
    image: promotion.image || null,
    image_alt_text: promotion.image_alt_text || '',
    banner_image_url: promotion.banner_image_url || promotion.image_url || null,
  } : null;

  // Create a wrapped onUpdated that handles the update
  const handleUpdate = async (formData) => {
    // Add the promotion ID to the form data
    const updateData = {
      ...formData,
      id: promotion?.id,
    };
    
    // Call the original onUpdated with the update data
    return await onUpdated(updateData);
  };

  // Show loading state
  if (loading) {
    return (
      <AddPromotions
        isOpen={isOpen}
        onClose={onClose}
        onCreated={() => {}}
        isEditing={true}
        promotion={null}
        isLoading={true}
      />
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full mx-4">
          <div className="text-center">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
              <svg className="h-6 w-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Error Loading Promotion</h3>
            <p className="text-sm text-gray-500 mb-4">{error}</p>
            <button
              onClick={onClose}
              className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <AddPromotions
      isOpen={isOpen}
      onClose={onClose}
      onCreated={handleUpdate}
      isEditing={true}
      promotion={promotionData}
    />
  );
}