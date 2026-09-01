import { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from '@/components/admin/Modal';

const initialForm = {
    title: '',
    description: '',
    location: '',
    date: '',
    time: '',
    status: 'active',
    department: '',
    image: null,
    image_alt_text: '',
};

// Image validation constants
const IMAGE_CONSTRAINTS = {
    maxWidth: 2560,
    minWidth: 1200,
    maxHeight: 1440,
    minHeight: 600,
    maxFileSize: 5 * 1024 * 1024, // 5MB
    allowedTypes: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
    recommendedAspectRatio: 16 / 9,
    minAspectRatio: 2 / 1,
};

export default function AddEvent({
    isOpen,
    onClose,
    onCreated,
    isEditing = false,
    event = null,
}) {
    const [form, setForm] = useState(initialForm);
    const [errors, setErrors] = useState({});
    const [submitError, setSubmitError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [previewImage, setPreviewImage] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const [imageValidation, setImageValidation] = useState(null);

    useEffect(() => {
        if (!isEditing || !event) {
            if (!isOpen) return;
            setForm(initialForm);
            setPreviewImage(null);
            setImageFile(null);
            setImageValidation(null);
            return;
        }

        setForm({
            title: event.title || '',
            description: event.description || '',
            location: event.location || '',
            date: event.date || '',
            time: event.time || '',
            status: event.status || 'active',
            department: event.department || '',
            image: null,
            image_alt_text: event.image_alt_text || '',
        });
        setPreviewImage(event.banner_image_url || null);
        setImageFile(null);
        setImageValidation(null);
    }, [isEditing, event, isOpen]);

    const updateField = (field, value) => {
        setForm((current) => ({ ...current, [field]: value }));
        setErrors((current) => ({ ...current, [field]: undefined }));
        setSubmitError('');
    };

    const clearForm = () => {
        setForm(initialForm);
        setErrors({});
        setSubmitError('');
        setPreviewImage(null);
        setImageFile(null);
        setImageValidation(null);
        const fileInput = document.getElementById('image-upload');
        if (fileInput) {
            fileInput.value = '';
        }
    };

    const validateImageResolution = (file) => {
        return new Promise((resolve) => {
            const img = new Image();
            const objectUrl = URL.createObjectURL(file);
            
            img.onload = () => {
                const { width, height } = img;
                const aspectRatio = width / height;
                const aspectRatioStr = aspectRatio.toFixed(2);
                
                const validation = {
                    isValid: true,
                    errors: [],
                    warnings: [],
                    dimensions: { width, height },
                    aspectRatio: aspectRatioStr,
                };

                if (width < IMAGE_CONSTRAINTS.minWidth) {
                    validation.isValid = false;
                    validation.errors.push(
                        `Image width (${width}px) is below the minimum required width of ${IMAGE_CONSTRAINTS.minWidth}px.`
                    );
                }

                if (height < IMAGE_CONSTRAINTS.minHeight) {
                    validation.isValid = false;
                    validation.errors.push(
                        `Image height (${height}px) is below the minimum required height of ${IMAGE_CONSTRAINTS.minHeight}px.`
                    );
                }

                if (width > IMAGE_CONSTRAINTS.maxWidth) {
                    validation.warnings.push(
                        `Image width (${width}px) exceeds recommended maximum of ${IMAGE_CONSTRAINTS.maxWidth}px.`
                    );
                }

                if (height > IMAGE_CONSTRAINTS.maxHeight) {
                    validation.warnings.push(
                        `Image height (${height}px) exceeds recommended maximum of ${IMAGE_CONSTRAINTS.maxHeight}px.`
                    );
                }

                const minRatio = IMAGE_CONSTRAINTS.minAspectRatio;
                const recommendedRatio = IMAGE_CONSTRAINTS.recommendedAspectRatio;
                
                if (aspectRatio < minRatio) {
                    validation.isValid = false;
                    validation.errors.push(
                        `Image is too tall (${aspectRatioStr}:1). Recommended aspect ratio is ${recommendedRatio}:1 or wider (minimum ${minRatio}:1).`
                    );
                }

                if (aspectRatio < recommendedRatio) {
                    validation.warnings.push(
                        `For best display, we recommend an aspect ratio of ${recommendedRatio}:1 or wider (current: ${aspectRatioStr}:1).`
                    );
                }

                if (file.size > IMAGE_CONSTRAINTS.maxFileSize) {
                    validation.isValid = false;
                    validation.errors.push(
                        `File size (${(file.size / (1024 * 1024)).toFixed(1)}MB) exceeds maximum of ${IMAGE_CONSTRAINTS.maxFileSize / (1024 * 1024)}MB.`
                    );
                }

                setImageValidation(validation);
                URL.revokeObjectURL(objectUrl);
                resolve(validation);
            };

            img.onerror = () => {
                setImageValidation({
                    isValid: false,
                    errors: ['Failed to load image. Please try a different file.'],
                    warnings: [],
                    dimensions: null,
                    aspectRatio: null,
                });
                URL.revokeObjectURL(objectUrl);
                resolve(null);
            };

            img.src = objectUrl;
        });
    };

    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const basicErrors = [];
        if (!IMAGE_CONSTRAINTS.allowedTypes.includes(file.type)) {
            basicErrors.push('Please upload a valid image file (JPEG, PNG, GIF, or WEBP)');
        }

        if (file.size > IMAGE_CONSTRAINTS.maxFileSize) {
            basicErrors.push(`Image size must be less than ${IMAGE_CONSTRAINTS.maxFileSize / (1024 * 1024)}MB`);
        }

        if (basicErrors.length > 0) {
            setErrors((current) => ({
                ...current,
                image: basicErrors
            }));
            setImageFile(null);
            setPreviewImage(null);
            setImageValidation(null);
            const fileInput = document.getElementById('image-upload');
            if (fileInput) {
                fileInput.value = '';
            }
            return;
        }

        const validation = await validateImageResolution(file);
        
        if (!validation || !validation.isValid) {
            const errorMessages = validation?.errors || ['Invalid image'];
            setErrors((current) => ({
                ...current,
                image: errorMessages
            }));
            setImageFile(null);
            setPreviewImage(null);
            const fileInput = document.getElementById('image-upload');
            if (fileInput) {
                fileInput.value = '';
            }
            return;
        }

        setImageFile(file);
        setForm((current) => ({ ...current, image: file }));
        
        const reader = new FileReader();
        reader.onloadend = () => {
            setPreviewImage(reader.result);
        };
        reader.readAsDataURL(file);
        
        setErrors((current) => ({ ...current, image: undefined }));
    };

    const removeImage = () => {
        setPreviewImage(null);
        setImageFile(null);
        setImageValidation(null);
        setForm((current) => ({ ...current, image: null }));
        const fileInput = document.getElementById('image-upload');
        if (fileInput) {
            fileInput.value = '';
        }
    };

    const handleClose = () => {
        if (isSubmitting) return;
        setForm(initialForm);
        setErrors({});
        setSubmitError('');
        setPreviewImage(null);
        setImageFile(null);
        setImageValidation(null);
        onClose();
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsSubmitting(true);
        setErrors({});
        setSubmitError('');

        const validationErrors = {};
        if (!form.title.trim()) validationErrors.title = ['Title is required'];
        if (!form.description.trim()) validationErrors.description = ['Description is required'];
        if (!form.date.trim()) validationErrors.date = ['Date is required'];

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            setIsSubmitting(false);
            return;
        }

        try {
            const formData = new FormData();
            formData.append('title', form.title);
            formData.append('description', form.description);
            if (form.location) formData.append('location', form.location);
            if (form.date) formData.append('date', form.date);
            if (form.time) formData.append('time', form.time);
            formData.append('status', form.status);
            if (form.department) formData.append('department', form.department);
            formData.append('image_alt_text', form.image_alt_text || form.title);
            
            if (imageFile) {
                formData.append('banner_image', imageFile);
            }

            const endpoint = isEditing
                ? `/admin/events/${event.id}`
                : '/admin/events';
            if (isEditing) formData.append('_method', 'PUT');

            const response = await axios.post(endpoint, formData);

            setForm(initialForm);
            setPreviewImage(null);
            setImageFile(null);
            setImageValidation(null);
            if (onCreated) {
                onCreated(response.data.event);
            }
            onClose();
        } catch (error) {
            if (error.response?.status === 422) {
                setErrors(error.response.data.errors || {});
            } else {
                setSubmitError(error.response?.data?.message || `Failed to ${isEditing ? 'update' : 'create'} event. Please try again.`);
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    const statusOptions = [
        { value: 'active', label: 'Active' },
        { value: 'upcoming', label: 'Upcoming' },
        { value: 'completed', label: 'Completed' },
        { value: 'cancelled', label: 'Cancelled' },
    ];

    const renderImageValidationInfo = () => {
        if (!imageValidation) return null;
        
        return (
            <div className="mt-2 space-y-1">
                {imageValidation.dimensions && (
                    <p className="text-xs text-gray-500">
                        Dimensions: {imageValidation.dimensions.width} × {imageValidation.dimensions.height}px 
                        (Aspect Ratio: {imageValidation.aspectRatio}:1)
                        {imageValidation.aspectRatio >= IMAGE_CONSTRAINTS.recommendedAspectRatio.toFixed(2) ? (
                            <span className="ml-2 text-emerald-600">✓ Optimal</span>
                        ) : imageValidation.aspectRatio >= IMAGE_CONSTRAINTS.minAspectRatio ? (
                            <span className="ml-2 text-yellow-600">⚠ Acceptable</span>
                        ) : (
                            <span className="ml-2 text-red-600">✗ Too tall</span>
                        )}
                    </p>
                )}
                {imageValidation.warnings.length > 0 && (
                    <div className="text-xs text-yellow-600">
                        {imageValidation.warnings.map((warning, idx) => (
                            <p key={idx}>⚠ {warning}</p>
                        ))}
                    </div>
                )}
                <p className="text-xs text-red-600 font-medium">
                    ⚠ Requirements: Minimum {IMAGE_CONSTRAINTS.minWidth}×{IMAGE_CONSTRAINTS.minHeight}px, 
                    16:9 aspect ratio recommended, max {IMAGE_CONSTRAINTS.maxFileSize / (1024 * 1024)}MB
                </p>
            </div>
        );
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={handleClose}
            title={isEditing ? "Edit Event" : "Create New Event"}
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
                    <label htmlFor="event-title" className="mb-1 block text-sm font-medium text-gray-700">
                        Title <span className="text-red-500">*</span>
                    </label>
                    <input
                        id="event-title"
                        type="text"
                        value={form.title}
                        onChange={(event) => updateField('title', event.target.value)}
                        className={`w-full rounded-lg border ${errors.title ? 'border-red-500' : 'border-gray-300'} px-3 py-2 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500`}
                        required
                        placeholder="Enter event title"
                    />
                    {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title[0]}</p>}
                </div>

                {/* Description */}
                <div>
                    <label htmlFor="event-description" className="mb-1 block text-sm font-medium text-gray-700">
                        Description <span className="text-red-500">*</span>
                    </label>
                    <textarea
                        id="event-description"
                        rows="4"
                        value={form.description}
                        onChange={(event) => updateField('description', event.target.value)}
                        className={`w-full rounded-lg border ${errors.description ? 'border-red-500' : 'border-gray-300'} px-3 py-2 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500`}
                        required
                        placeholder="Enter event description"
                    />
                    {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description[0]}</p>}
                </div>

                {/* Location */}
                <div>
                    <label htmlFor="event-location" className="mb-1 block text-sm font-medium text-gray-700">
                        Location
                    </label>
                    <input
                        id="event-location"
                        type="text"
                        value={form.location}
                        onChange={(event) => updateField('location', event.target.value)}
                        className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        placeholder="Enter event location"
                    />
                </div>

                {/* Date and Time */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                        <label htmlFor="event-date" className="mb-1 block text-sm font-medium text-gray-700">
                            Date <span className="text-red-500">*</span>
                        </label>
                        <input
                            id="event-date"
                            type="date"
                            value={form.date}
                            onChange={(event) => updateField('date', event.target.value)}
                            className={`w-full rounded-lg border ${errors.date ? 'border-red-500' : 'border-gray-300'} px-3 py-2 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500`}
                            required
                        />
                        {errors.date && <p className="mt-1 text-sm text-red-600">{errors.date[0]}</p>}
                    </div>
                    <div>
                        <label htmlFor="event-time" className="mb-1 block text-sm font-medium text-gray-700">
                            Time
                        </label>
                        <input
                            id="event-time"
                            type="time"
                            value={form.time}
                            onChange={(event) => updateField('time', event.target.value)}
                            className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        />
                    </div>
                </div>

                {/* Image Upload */}
                <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                        Banner Image <span className="text-gray-400 text-xs">(Optional but recommended)</span>
                    </label>
                    <div className="flex items-center justify-center w-full">
                        {previewImage ? (
                            <div className="relative w-full">
                                <img 
                                    src={previewImage} 
                                    alt="Preview" 
                                    className="w-full h-48 object-cover rounded-lg border border-gray-200"
                                />
                                <button
                                    type="button"
                                    onClick={removeImage}
                                    className="absolute top-2 right-2 p-1.5 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        ) : (
                            <label htmlFor="image-upload" className="flex flex-col items-center justify-center w-full h-40 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-all duration-200">
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                    <svg className="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                    <p className="mb-2 text-sm text-gray-500">
                                        <span className="font-semibold">Click to upload</span> or drag and drop
                                    </p>
                                    <p className="text-xs text-red-600 font-medium">
                                        ⚠ Required: {IMAGE_CONSTRAINTS.minWidth}×{IMAGE_CONSTRAINTS.minHeight}px min, 16:9 ratio, {IMAGE_CONSTRAINTS.maxFileSize / (1024 * 1024)}MB max
                                    </p>
                                </div>
                                <input
                                    id="image-upload"
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="hidden"
                                />
                            </label>
                        )}
                    </div>
                    {errors.image && (
                        <div className="mt-1">
                            {Array.isArray(errors.image) ? (
                                errors.image.map((error, idx) => (
                                    <p key={idx} className="text-sm text-red-600">{error}</p>
                                ))
                            ) : (
                                <p className="text-sm text-red-600">{errors.image}</p>
                            )}
                        </div>
                    )}
                    {renderImageValidationInfo()}
                    
                    {previewImage && (
                        <div className="mt-2">
                            <label htmlFor="image-alt-text" className="mb-1 block text-sm font-medium text-gray-700">
                                Image Alt Text
                            </label>
                            <input
                                id="image-alt-text"
                                type="text"
                                value={form.image_alt_text}
                                onChange={(event) => updateField('image_alt_text', event.target.value)}
                                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                placeholder="Describe the image for accessibility"
                            />
                            <p className="mt-1 text-xs text-gray-400">
                                This text helps visually impaired users understand the image and improves SEO.
                            </p>
                        </div>
                    )}
                </div>

                {/* Status */}
                <div>
                    <label htmlFor="event-status" className="mb-1 block text-sm font-medium text-gray-700">
                        Status
                    </label>
                    <select
                        id="event-status"
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
                </div>

                {/* Buttons */}
                <div className="flex gap-3 border-t border-gray-200 pt-4">
                    <button
                        type="button"
                        onClick={clearForm}
                        disabled={isSubmitting}
                        className="flex-1 rounded-lg bg-gray-600 px-4 py-2 text-sm font-medium text-white hover:bg-gray-700 transition-colors disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        Clear
                    </button>
                    <button
                        type="button"
                        onClick={handleClose}
                        disabled={isSubmitting}
                        className="flex-1 rounded-lg bg-gray-600 px-4 py-2 text-sm font-medium text-white hover:bg-gray-700 transition-colors disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="flex-1 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700 transition-colors disabled:cursor-not-allowed disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                        {isSubmitting ? (
                            <>
                                <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                {isEditing ? 'Updating...' : 'Creating...'}
                            </>
                        ) : (
                            isEditing ? 'Update Event' : 'Create Event'
                        )}
                    </button>
                </div>
            </form>
        </Modal>
    );
}