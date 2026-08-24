import { useState } from 'react';
import axios from 'axios';
import Modal from '@/components/admin/Modal';

const initialForm = {
    title: '',
    content: '',
    date: '',
    expire: '',
    status: 'active',
    banner_image: null,
    carousel_image: null,
};

export default function AddPromotions({ isOpen, onClose, onCreated }) {
    const [form, setForm] = useState(initialForm);
    const [errors, setErrors] = useState({});
    const [submitError, setSubmitError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [bannerPreview, setBannerPreview] = useState(null);
    const [carouselPreview, setCarouselPreview] = useState(null);
    const [bannerFile, setBannerFile] = useState(null);
    const [carouselFile, setCarouselFile] = useState(null);

    const updateField = (field, value) => {
        setForm((current) => ({ ...current, [field]: value }));
        setErrors((current) => ({ ...current, [field]: undefined }));
        setSubmitError('');
    };

    const handleBannerImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Validate file type
            const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
            if (!validTypes.includes(file.type)) {
                setErrors((current) => ({
                    ...current,
                    banner_image: 'Please upload a valid image file (JPEG, PNG, or WEBP)'
                }));
                return;
            }

            // Validate file size (max 5MB)
            if (file.size > 5 * 1024 * 1024) {
                setErrors((current) => ({
                    ...current,
                    banner_image: 'Image size must be less than 5MB'
                }));
                return;
            }

            setBannerFile(file);
            setForm((current) => ({ ...current, banner_image: file }));
            
            const reader = new FileReader();
            reader.onloadend = () => {
                setBannerPreview(reader.result);
            };
            reader.readAsDataURL(file);
            
            // Clear image errors
            setErrors((current) => ({ ...current, banner_image: undefined }));
        }
    };

    const handleCarouselImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Validate file type
            const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
            if (!validTypes.includes(file.type)) {
                setErrors((current) => ({
                    ...current,
                    carousel_image: 'Please upload a valid image file (JPEG, PNG, or WEBP)'
                }));
                return;
            }

            // Validate file size (max 5MB)
            if (file.size > 5 * 1024 * 1024) {
                setErrors((current) => ({
                    ...current,
                    carousel_image: 'Image size must be less than 5MB'
                }));
                return;
            }

            setCarouselFile(file);
            setForm((current) => ({ ...current, carousel_image: file }));
            
            const reader = new FileReader();
            reader.onloadend = () => {
                setCarouselPreview(reader.result);
            };
            reader.readAsDataURL(file);
            
            // Clear image errors
            setErrors((current) => ({ ...current, carousel_image: undefined }));
        }
    };

    const removeBannerImage = () => {
        setBannerPreview(null);
        setBannerFile(null);
        setForm((current) => ({ ...current, banner_image: null }));
        const fileInput = document.getElementById('banner-image-upload');
        if (fileInput) {
            fileInput.value = '';
        }
    };

    const removeCarouselImage = () => {
        setCarouselPreview(null);
        setCarouselFile(null);
        setForm((current) => ({ ...current, carousel_image: null }));
        const fileInput = document.getElementById('carousel-image-upload');
        if (fileInput) {
            fileInput.value = '';
        }
    };

    const handleClose = () => {
        if (isSubmitting) return;
        setForm(initialForm);
        setErrors({});
        setSubmitError('');
        setBannerPreview(null);
        setCarouselPreview(null);
        setBannerFile(null);
        setCarouselFile(null);
        onClose();
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsSubmitting(true);
        setErrors({});
        setSubmitError('');

        const validationErrors = {};
        if (!form.title.trim()) validationErrors.title = ['Title is required'];
        if (!form.content.trim()) validationErrors.content = ['Content is required'];
        if (form.date && form.expire && form.expire < form.date) {
            validationErrors.expire = ['The expiry date must be after the start date.'];
        }

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            setIsSubmitting(false);
            return;
        }

        try {
            // Create FormData for file upload
            const formData = new FormData();
            formData.append('title', form.title);
            formData.append('content', form.content);
            
            if (form.date) formData.append('date', form.date);
            if (form.expire) formData.append('expire', form.expire);
            formData.append('status', form.status);
            
            if (bannerFile) {
                formData.append('banner_image', bannerFile);
            }
            
            if (carouselFile) {
                formData.append('carousel_image', carouselFile);
            }

            const response = await axios.post('/admin/promotions', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            setForm(initialForm);
            setBannerPreview(null);
            setCarouselPreview(null);
            setBannerFile(null);
            setCarouselFile(null);
            if (onCreated) {
                onCreated(response.data.promotion);
            }
            onClose();
        } catch (error) {
            if (error.response?.status === 422) {
                setErrors(error.response.data.errors || {});
            } else {
                setSubmitError(error.response?.data?.message || 'Failed to create promotion. Please try again.');
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    // Get status options
    const statusOptions = [
        { value: 'active', label: 'Active' },
        { value: 'inactive', label: 'Inactive' },
        { value: 'expired', label: 'Expired' },
    ];

    return (
        <Modal
            isOpen={isOpen}
            onClose={handleClose}
            title="Create New Promotion"
            size="lg"
            closeOnOverlayClick={!isSubmitting}
        >
            <form onSubmit={handleSubmit} className="space-y-4">
                {submitError && (
                    <div className="rounded-lg bg-red-50 p-3 text-sm text-red-700 border border-red-200">
                        {submitError}
                    </div>
                )}

                {/* Title */}
                <div>
                    <label htmlFor="promotion-title" className="mb-1 block text-sm font-medium text-gray-700">
                        Title <span className="text-red-500">*</span>
                    </label>
                    <input
                        id="promotion-title"
                        type="text"
                        value={form.title}
                        onChange={(event) => updateField('title', event.target.value)}
                        className={`w-full rounded-lg border ${errors.title ? 'border-red-500' : 'border-gray-300'} px-3 py-2 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500`}
                        required
                        placeholder="Enter promotion title"
                    />
                    {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title[0]}</p>}
                </div>

                {/* Content */}
                <div>
                    <label htmlFor="promotion-content" className="mb-1 block text-sm font-medium text-gray-700">
                        Content <span className="text-red-500">*</span>
                    </label>
                    <textarea
                        id="promotion-content"
                        rows="4"
                        value={form.content}
                        onChange={(event) => updateField('content', event.target.value)}
                        className={`w-full rounded-lg border ${errors.content ? 'border-red-500' : 'border-gray-300'} px-3 py-2 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500`}
                        required
                        placeholder="Enter promotion content"
                    />
                    {errors.content && <p className="mt-1 text-sm text-red-600">{errors.content[0]}</p>}
                </div>

                {/* Banner Image Upload */}
                <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                        Banner Image <span className="text-gray-400 text-xs">(Optional)</span>
                    </label>
                    
                    {/* Banner Image Guidelines */}
                    <div className="mb-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                        <h4 className="text-xs font-semibold text-blue-800 uppercase tracking-wider mb-1">
                            <svg className="inline-block w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Banner Image Guidelines
                        </h4>
                        <ul className="text-xs text-blue-700 space-y-0.5">
                            <li>• <strong>Recommended:</strong> 1920 × 1080 px</li>
                            <li>• <strong>Minimum:</strong> 1280 × 720 px</li>
                            <li>• <strong>Ratio:</strong> 16:9 landscape</li>
                            <li>• <strong>Keep important text/logos near the center</strong></li>
                            <li>• <strong>Maximum file size:</strong> 5 MB</li>
                            <li>• <strong>Formats:</strong> JPEG, PNG, WEBP</li>
                        </ul>
                    </div>

                    <div className="flex items-center justify-center w-full">
                        {bannerPreview ? (
                            <div className="relative w-full">
                                <img 
                                    src={bannerPreview} 
                                    alt="Banner Preview" 
                                    className="w-full h-48 object-cover rounded-lg border border-gray-200"
                                />
                                <button
                                    type="button"
                                    onClick={removeBannerImage}
                                    className="absolute top-2 right-2 p-1.5 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        ) : (
                            <label htmlFor="banner-image-upload" className="flex flex-col items-center justify-center w-full h-40 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-all duration-200">
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                    <svg className="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                    <p className="mb-2 text-sm text-gray-500">
                                        <span className="font-semibold">Upload Banner Image</span>
                                    </p>
                                    <p className="text-xs text-gray-500">JPEG, PNG, WEBP (Max 5MB)</p>
                                </div>
                                <input
                                    id="banner-image-upload"
                                    type="file"
                                    accept="image/*"
                                    onChange={handleBannerImageChange}
                                    className="hidden"
                                />
                            </label>
                        )}
                    </div>
                    {errors.banner_image && <p className="mt-1 text-sm text-red-600">{errors.banner_image[0]}</p>}
                </div>

                {/* Carousel Image Upload */}
                <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                        Carousel Card Image <span className="text-gray-400 text-xs">(Optional)</span>
                    </label>
                    
                    {/* Carousel Image Guidelines */}
                    <div className="mb-3 p-3 bg-purple-50 rounded-lg border border-purple-200">
                        <h4 className="text-xs font-semibold text-purple-800 uppercase tracking-wider mb-1">
                            <svg className="inline-block w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5" />
                            </svg>
                            Carousel Card Image Guidelines
                        </h4>
                        <ul className="text-xs text-purple-700 space-y-0.5">
                            <li>• <strong>Recommended:</strong> 800 × 1200 px</li>
                            <li>• <strong>Minimum:</strong> 600 × 900 px</li>
                            <li>• <strong>Ratio:</strong> 2:3 portrait</li>
                            <li>• <strong>Keep important text/logos inside the center area</strong></li>
                            <li>• <strong>Maximum file size:</strong> 5 MB</li>
                            <li>• <strong>Formats:</strong> JPEG, PNG, WEBP</li>
                        </ul>
                    </div>

                    <div className="flex items-center justify-center w-full">
                        {carouselPreview ? (
                            <div className="relative w-full">
                                <img 
                                    src={carouselPreview} 
                                    alt="Carousel Preview" 
                                    className="w-full h-48 object-cover rounded-lg border border-gray-200"
                                />
                                <button
                                    type="button"
                                    onClick={removeCarouselImage}
                                    className="absolute top-2 right-2 p-1.5 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        ) : (
                            <label htmlFor="carousel-image-upload" className="flex flex-col items-center justify-center w-full h-40 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-all duration-200">
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                    <svg className="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                    <p className="mb-2 text-sm text-gray-500">
                                        <span className="font-semibold">Upload Carousel Image</span>
                                    </p>
                                    <p className="text-xs text-gray-500">JPEG, PNG, WEBP (Max 5MB)</p>
                                </div>
                                <input
                                    id="carousel-image-upload"
                                    type="file"
                                    accept="image/*"
                                    onChange={handleCarouselImageChange}
                                    className="hidden"
                                />
                            </label>
                        )}
                    </div>
                    {errors.carousel_image && <p className="mt-1 text-sm text-red-600">{errors.carousel_image[0]}</p>}
                </div>

                {/* Date Range */}
                <div>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div>
                            <label htmlFor="promotion-date" className="mb-1 block text-sm font-medium text-gray-700">
                                Start Date <span className="text-gray-400 text-xs">(Optional)</span>
                            </label>
                            <input
                                id="promotion-date"
                                type="date"
                                value={form.date}
                                onChange={(event) => updateField('date', event.target.value)}
                                className={`w-full rounded-lg border ${errors.date ? 'border-red-500' : 'border-gray-300'} px-3 py-2 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500`}
                            />
                            {errors.date && <p className="mt-1 text-sm text-red-600">{errors.date[0]}</p>}
                        </div>
                        <div>
                            <label htmlFor="promotion-expire" className="mb-1 block text-sm font-medium text-gray-700">
                                Expiry Date <span className="text-gray-400 text-xs">(Optional)</span>
                            </label>
                            <input
                                id="promotion-expire"
                                type="date"
                                value={form.expire}
                                onChange={(event) => updateField('expire', event.target.value)}
                                className={`w-full rounded-lg border ${errors.expire ? 'border-red-500' : 'border-gray-300'} px-3 py-2 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500`}
                            />
                            {errors.expire && <p className="mt-1 text-sm text-red-600">{errors.expire[0]}</p>}
                        </div>
                    </div>
                    <p className="mt-2 text-sm text-gray-500 italic">
                        <svg className="inline-block w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Leave both dates blank to keep this promotion active indefinitely.
                    </p>
                </div>

                {/* Status */}
                <div>
                    <label htmlFor="promotion-status" className="mb-1 block text-sm font-medium text-gray-700">
                        Status
                    </label>
                    <select
                        id="promotion-status"
                        value={form.status}
                        onChange={(event) => updateField('status', event.target.value)}
                        className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    >
                        {statusOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                    {errors.status && <p className="mt-1 text-sm text-red-600">{errors.status[0]}</p>}
                </div>

                {/* Buttons */}
                <div className="flex justify-end gap-3 border-t border-gray-200 pt-4">
                    <button
                        type="button"
                        onClick={handleClose}
                        disabled={isSubmitting}
                        className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="rounded-lg bg-emerald-600 px-6 py-2 text-sm font-medium text-white hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50 flex items-center gap-2"
                    >
                        {isSubmitting ? (
                            <>
                                <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Creating...
                            </>
                        ) : (
                            'Create Promotion'
                        )}
                    </button>
                </div>
            </form>
        </Modal>
    );
}