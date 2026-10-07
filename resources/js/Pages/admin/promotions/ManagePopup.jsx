import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import Modal from '@/components/admin/Modal';

export default function ManagePopup({ isOpen, onClose }) {
    const [isLoading, setIsLoading] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    // Popup form state
    const [enabled, setEnabled] = useState(true);
    const [title, setTitle] = useState('');
    const [caption, setCaption] = useState('');
    const [linkUrl, setLinkUrl] = useState('');
    const [existingImageUrl, setExistingImageUrl] = useState('');
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState('');
    const [removeImage, setRemoveImage] = useState(false);

    const fileInputRef = useRef(null);

    // Fetch popup settings when modal opens
    useEffect(() => {
        if (!isOpen) return;

        let isMounted = true;

        const fetchPopup = async () => {
            setIsLoading(true);
            setError('');
            try {
                const response = await axios.get('/admin/popup');
                if (!isMounted) return;

                const data = response.data || {};
                setEnabled(data.enabled ?? true);
                setTitle(data.title ?? '');
                setCaption(data.caption ?? '');
                setLinkUrl(data.link_url ?? '');
                setExistingImageUrl(data.image_url ?? '');
                setImageFile(null);
                setImagePreview('');
                setRemoveImage(false);
            } catch (err) {
                console.error('Failed to fetch popup settings:', err);
                if (isMounted) {
                    setError(
                        err.response?.data?.message ||
                            'Failed to load popup settings.'
                    );
                }
            } finally {
                if (isMounted) setIsLoading(false);
            }
        };

        fetchPopup();

        return () => {
            isMounted = false;
        };
    }, [isOpen]);

    // Reset state when modal closes
    useEffect(() => {
        if (isOpen) return;

        setError('');
        setSuccessMessage('');
        setImageFile(null);
        setImagePreview('');
        setRemoveImage(false);
        if (fileInputRef.current) fileInputRef.current.value = '';
    }, [isOpen]);

    // Handle image selection
    const handleImageChange = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const allowedTypes = [
            'image/png',
            'image/jpeg',
            'image/jpg',
            'image/webp',
            'image/avif',
        ];
        if (!allowedTypes.includes(file.type)) {
            setError('Please select a PNG, JPG, WEBP, or AVIF image.');
            return;
        }

        const maxSize = 5 * 1024 * 1024;
        if (file.size > maxSize) {
            setError('Image size must not exceed 5MB.');
            return;
        }

        setError('');
        setImageFile(file);
        setRemoveImage(false);

        const reader = new FileReader();
        reader.onload = (event) => {
            setImagePreview(event.target?.result || '');
        };
        reader.readAsDataURL(file);
    };

    // Remove selected/existing image
    const handleRemoveImage = () => {
        setImageFile(null);
        setImagePreview('');
        setExistingImageUrl('');
        setRemoveImage(true);
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    // Reset to defaults
    const handleReset = () => {
        setEnabled(true);
        setTitle('');
        setCaption('');
        setLinkUrl('');
        setImageFile(null);
        setImagePreview('');
        setRemoveImage(false);
        if (fileInputRef.current) fileInputRef.current.value = '';
        setError('');
    };

    // Submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSaving(true);
        setError('');
        setSuccessMessage('');

        try {
            const formData = new FormData();
            formData.append('enabled', enabled ? '1' : '0');
            formData.append('title', title || '');
            formData.append('caption', caption || '');
            formData.append('link_url', linkUrl || '');
            formData.append('remove_image', removeImage ? '1' : '0');

            if (imageFile) {
                formData.append('image', imageFile);
            }

            await axios.post('/admin/popup', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            setSuccessMessage('Popup settings saved successfully.');

            if (imageFile) {
                try {
                    const refreshed = await axios.get('/admin/popup');
                    setExistingImageUrl(refreshed.data?.image_url ?? '');
                } catch {
                    // silent
                }
                setImageFile(null);
                setImagePreview('');
            }

            setTimeout(() => {
                onClose?.();
            }, 900);
        } catch (err) {
            console.error('Failed to save popup settings:', err);
            const msg =
                err.response?.data?.message ||
                err.response?.data?.errors?.image?.[0] ||
                'Failed to save popup settings.';
            setError(msg);
        } finally {
            setIsSaving(false);
        }
    };

    const displayedImage = imagePreview || existingImageUrl;

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Announcement Settings"
            size="lg"
            preventClose={isSaving}
        >
            <form onSubmit={handleSubmit} className="flex flex-col">
                <div className="space-y-6">
                    {/* Alerts */}
                    {error && (
                        <div className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                            <svg
                                className="w-5 h-5 shrink-0 mt-0.5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                            <span>{error}</span>
                        </div>
                    )}
                    {successMessage && (
                        <div className="flex items-start gap-3 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                            <svg
                                className="w-5 h-5 shrink-0 mt-0.5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                            <span>{successMessage}</span>
                        </div>
                    )}

                    {isLoading ? (
                        <div className="flex items-center justify-center gap-3 py-12 text-sm text-gray-500">
                            <span className="h-4 w-4 animate-spin rounded-full border-2 border-amber-500 border-t-transparent" />
                            Loading popup settings...
                        </div>
                    ) : (
                        <>
                            {/* Enable toggle */}
                            <div className="flex items-center justify-between gap-4 rounded-xl border border-gray-200 bg-gray-50 px-4 py-3">
                                <div>
                                    <p className="text-sm font-semibold text-gray-800">
                                        Enable Popup
                                    </p>
                                    <p className="text-xs text-gray-500 mt-0.5">
                                        Show the popup on the homepage when visitors land
                                    </p>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => setEnabled((prev) => !prev)}
                                    className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors ${
                                        enabled ? 'bg-emerald-500' : 'bg-gray-300'
                                    }`}
                                    aria-pressed={enabled}
                                >
                                    <span
                                        className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform ${
                                            enabled ? 'translate-x-5' : 'translate-x-0.5'
                                        }`}
                                    />
                                </button>
                            </div>

                            {/* Title */}
                            <div>
                                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-gray-600">
                                    Popup Title
                                </label>
                                <input
                                    type="text"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    placeholder="e.g. Oro Dayaw Highlights"
                                    className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none transition focus:border-amber-500 focus:ring-2 focus:ring-amber-500/30"
                                />
                            </div>

                            {/* Caption */}
                            <div>
                                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-gray-600">
                                    Caption / Description
                                </label>
                                <textarea
                                    rows={3}
                                    value={caption}
                                    onChange={(e) => setCaption(e.target.value)}
                                    placeholder="Short description that will appear below the title..."
                                    className="w-full resize-none rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none transition focus:border-amber-500 focus:ring-2 focus:ring-amber-500/30"
                                />
                                <p className="mt-1 text-[11px] text-gray-400">
                                    Keep it short — around 1 to 2 sentences.
                                </p>
                            </div>

                            {/* Link URL */}
                            <div>
                                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-gray-600">
                                    Link URL (optional)
                                </label>
                                <input
                                    type="url"
                                    value={linkUrl}
                                    onChange={(e) => setLinkUrl(e.target.value)}
                                    placeholder="https://example.com/page"
                                    className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none transition focus:border-amber-500 focus:ring-2 focus:ring-amber-500/30"
                                />
                                <p className="mt-1 text-[11px] text-gray-400">
                                    Where the popup image links to when clicked.
                                </p>
                            </div>

                            {/* Image Upload */}
                            <div>
                                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-gray-600">
                                    Popup Image
                                </label>

                                <div className="flex flex-col gap-4 md:flex-row md:items-start">
                                    {/* Preview */}
                                    <div className="relative w-full md:w-56 shrink-0">
                                        <div className="flex aspect-[4/3] w-full items-center justify-center overflow-hidden rounded-xl border-2 border-dashed border-gray-300 bg-gray-50">
                                            {displayedImage ? (
                                                <img
                                                    src={displayedImage}
                                                    alt="Popup preview"
                                                    className="h-full w-full object-contain"
                                                    onError={(e) => {
                                                        e.currentTarget.style.display = 'none';
                                                    }}
                                                />
                                            ) : (
                                                <div className="flex flex-col items-center gap-1 text-gray-400">
                                                    <svg
                                                        className="w-8 h-8"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={1.5}
                                                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14M14 8h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                                        />
                                                    </svg>
                                                    <span className="text-[11px]">
                                                        No image
                                                    </span>
                                                </div>
                                            )}
                                        </div>

                                        {displayedImage && (
                                            <button
                                                type="button"
                                                onClick={handleRemoveImage}
                                                className="absolute -right-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full bg-red-600 text-white shadow-md transition hover:bg-red-700"
                                                aria-label="Remove image"
                                            >
                                                <svg
                                                    className="w-3.5 h-3.5"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2.5}
                                                        d="M6 18L18 6M6 6l12 12"
                                                    />
                                                </svg>
                                            </button>
                                        )}
                                    </div>

                                    {/* Upload controls */}
                                    <div className="flex-1">
                                        <input
                                            ref={fileInputRef}
                                            type="file"
                                            accept="image/png,image/jpeg,image/jpg,image/webp,image/avif"
                                            onChange={handleImageChange}
                                            className="hidden"
                                            id="popup-image-input"
                                        />
                                        <label
                                            htmlFor="popup-image-input"
                                            className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition hover:border-amber-500 hover:bg-amber-50"
                                        >
                                            <svg
                                                className="w-4 h-4"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                                                />
                                            </svg>
                                            {displayedImage
                                                ? 'Replace Image'
                                                : 'Upload Image'}
                                        </label>

                                        <p className="mt-2 text-[11px] leading-relaxed text-gray-400">
                                            PNG, JPG, WEBP, or AVIF. Max 5MB.
                                            <br />
                                            Recommended dimensions: 1200 × 800px or similar.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </div>

                {/* Footer Actions */}
                <div className="flex flex-col-reverse gap-3 border-t border-gray-200 bg-gray-50 -mx-6 -mb-6 px-6 py-4 mt-6 sm:flex-row sm:items-center sm:justify-between">
                    <button
                        type="button"
                        onClick={handleReset}
                        disabled={isSaving || isLoading}
                        className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100 disabled:opacity-50"
                    >
                        <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                            />
                        </svg>
                        Reset
                    </button>

                    <div className="flex items-center gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            disabled={isSaving}
                            className="inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100 disabled:opacity-50"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isSaving || isLoading}
                            className="inline-flex items-center justify-center gap-2 rounded-lg bg-amber-500 px-5 py-2 text-sm font-semibold text-white shadow-md transition hover:bg-amber-600 disabled:opacity-60"
                        >
                            {isSaving ? (
                                <>
                                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                                    Saving...
                                </>
                            ) : (
                                <>
                                    <svg
                                        className="w-4 h-4"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M5 13l4 4L19 7"
                                        />
                                    </svg>
                                    Save Settings
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </form>
        </Modal>
    );
}