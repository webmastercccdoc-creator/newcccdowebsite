import React, { useState, useRef } from 'react';
import Swal from 'sweetalert2';
import MainLayout from '../../../layouts/MainLayout';

const UrlShortener = () => {
    const [longUrl, setLongUrl] = useState('');
    const [customPath, setCustomPath] = useState('');
    const [lookupUrl, setLookupUrl] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isLookupLoading, setIsLookupLoading] = useState(false);

    const successSound = useRef(null);
    const errorSound = useRef(null);

    const playSound = (isSuccess) => {
        try {
            const audio = isSuccess ? successSound.current : errorSound.current;
            if (audio) {
                audio.play().catch(err => console.log('Could not play sound:', err));
            }
        } catch (error) {
            console.log('Sound playback error:', error);
        }
    };

    const showUrlDetails = (data, isSuccess = true) => {
        if (isSuccess) {
            playSound(true);
        }

        Swal.fire({
            title: '🎉 URL Shortened!',
            html: `
                <style>
                    @keyframes fadeIn {
                        from { opacity: 0; transform: translateY(20px); }
                        to { opacity: 1; transform: translateY(0); }
                    }
                    @keyframes pulse {
                        0%, 100% { transform: scale(1); }
                        50% { transform: scale(1.05); }
                    }
                    .modal-animate {
                        animation: fadeIn 0.4s ease-out;
                    }
                    .qr-code {
                        animation: pulse 2s ease-in-out infinite;
                    }
                    .url-card {
                        transition: all 0.3s ease;
                        border: 2px solid #e5e7eb;
                    }
                    .url-card:hover {
                        border-color: #059669;
                        transform: translateY(-2px);
                        box-shadow: 0 4px 12px rgba(5, 150, 105, 0.15);
                    }
                    .btn-hover {
                        transition: all 0.3s ease;
                    }
                    .btn-hover:hover {
                        transform: scale(1.05);
                    }
                </style>

                <div class="modal-animate">
                    <div class="flex flex-col md:flex-row gap-6 p-2">
                        <!-- QR Code -->
                        <div class="flex-1 text-center">
                            <div class="bg-gray-50 rounded-xl p-4">
                                <img id="qr-code-img" src="${data.qr_code}" alt="QR Code" class="qr-code w-48 h-48 mx-auto object-contain" />
                                <button id="download-qr" class="btn-hover mt-3 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-lg transition duration-200 text-sm">
                                    <i class="fas fa-download mr-2"></i> Download QR
                                </button>
                            </div>
                        </div>

                        <!-- Details -->
                        <div class="flex-1 text-center md:text-left">
                            <div class="bg-green-50 rounded-xl p-4">
                                <p class="text-gray-700 font-medium mb-3">${data.message || 'Your shortened URL is ready!'}</p>
                                
                                <div class="url-card bg-white rounded-lg p-3">
                                    <label class="text-xs text-gray-500 font-medium uppercase tracking-wider">Short URL</label>
                                    <div class="flex items-center justify-between mt-1">
                                        <a id="short-url" href="${data.short_url}" target="_blank" class="text-green-700 hover:text-green-800 underline break-all font-medium text-sm">
                                            ${data.short_url.replace(/^https?:\/\//, '')}
                                        </a>
                                        <button id="copy-btn" class="btn-hover ml-2 text-green-600 hover:text-green-800 transition-colors p-1">
                                            <i class="fas fa-copy text-lg"></i>
                                        </button>
                                    </div>
                                </div>

                                <div class="mt-3 flex items-center justify-center md:justify-start gap-4 text-sm text-gray-600">
                                    <span><i class="fas fa-eye mr-1"></i> ${data.clicks || 0} clicks</span>
                                    <span><i class="far fa-clock mr-1"></i> ${new Date(data.created_at).toLocaleDateString()}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `,
            icon: 'success',
            showConfirmButton: false,
            showCloseButton: true,
            width: 600,
            padding: '1.5rem',
            customClass: {
                popup: 'rounded-2xl shadow-xl',
            },
            didOpen: () => {
                const copyBtn = document.getElementById('copy-btn');
                const shortUrlLink = document.getElementById('short-url');

                if (copyBtn && shortUrlLink) {
                    copyBtn.addEventListener('click', () => {
                        const linkText = shortUrlLink.href.replace(/^https?:\/\//, '');
                        navigator.clipboard.writeText(linkText).then(() => {
                            Swal.fire({
                                title: 'Copied!',
                                text: 'The link has been copied to your clipboard.',
                                icon: 'success',
                                confirmButtonColor: '#059669',
                                confirmButtonText: 'OK',
                                timer: 2000,
                                timerProgressBar: true
                            });
                        }).catch(() => {
                            const textArea = document.createElement('textarea');
                            textArea.value = linkText;
                            document.body.appendChild(textArea);
                            textArea.select();
                            document.execCommand('copy');
                            document.body.removeChild(textArea);
                            Swal.fire({
                                title: 'Copied!',
                                text: 'The link has been copied to your clipboard.',
                                icon: 'success',
                                confirmButtonColor: '#059669',
                                confirmButtonText: 'OK',
                                timer: 2000,
                                timerProgressBar: true
                            });
                        });
                    });
                }

                const downloadBtn = document.getElementById('download-qr');
                const qrImg = document.getElementById('qr-code-img');

                if (downloadBtn && qrImg) {
                    downloadBtn.addEventListener('click', () => {
                        fetch(qrImg.src)
                            .then(response => response.blob())
                            .then(blob => {
                                const url = URL.createObjectURL(blob);
                                const link = document.createElement('a');
                                link.href = url;
                                link.download = 'qr_code.png';
                                document.body.appendChild(link);
                                link.click();
                                document.body.removeChild(link);
                                URL.revokeObjectURL(url);
                            })
                            .catch(() => {
                                Swal.fire({
                                    title: 'Error!',
                                    text: 'Failed to download QR code.',
                                    icon: 'error',
                                    confirmButtonColor: '#dc3545',
                                    confirmButtonText: 'OK'
                                });
                            });
                    });
                }
            }
        });
    };

    const handleShorten = async (e) => {
        e.preventDefault();
        
        if (!longUrl.trim()) {
            Swal.fire({
                title: 'Oops!',
                text: 'Please enter a URL to shorten.',
                icon: 'warning',
                confirmButtonColor: '#2e7d32',
                confirmButtonText: 'OK'
            });
            return;
        }

        setIsLoading(true);

        try {
            const response = await fetch('/shorten-url', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.content || '',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    long_url: longUrl,
                    path: customPath
                })
            });

            const data = await response.json();

            if (response.ok && (data.status === 'success' || data.status === 'exists')) {
                showUrlDetails(data, true);
                setLongUrl('');
                setCustomPath('');
            } else if (data.status === 'duplicate' || data.status === 'Forbidden') {
                playSound(false);
                Swal.fire({
                    title: data.status === 'Forbidden' ? 'Access Denied!' : 'Path Taken!',
                    text: data.message || 'An error occurred.',
                    icon: 'error',
                    confirmButtonColor: '#dc3545',
                    confirmButtonText: 'OK'
                });
            } else if (data.errors) {
                playSound(false);
                const errorMessages = Object.values(data.errors).flat().join('\n');
                Swal.fire({
                    title: 'Validation Error!',
                    text: errorMessages || data.message,
                    icon: 'error',
                    confirmButtonColor: '#dc3545',
                    confirmButtonText: 'OK'
                });
            } else {
                playSound(false);
                Swal.fire({
                    title: 'Error!',
                    text: data.message || 'An error occurred. Please try again.',
                    icon: 'error',
                    confirmButtonColor: '#dc3545',
                    confirmButtonText: 'OK'
                });
            }
        } catch (error) {
            console.error('Error:', error);
            playSound(false);
            Swal.fire({
                title: 'Error!',
                text: 'An error occurred while shortening the URL. Please try again.',
                icon: 'error',
                confirmButtonColor: '#dc3545',
                confirmButtonText: 'OK'
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleLookup = async (e) => {
        e.preventDefault();
        
        if (!lookupUrl.trim()) {
            Swal.fire({
                title: 'Oops!',
                text: 'Please enter a URL to lookup.',
                icon: 'warning',
                confirmButtonColor: '#2e7d32',
                confirmButtonText: 'OK'
            });
            return;
        }

        setIsLookupLoading(true);

        try {
            const response = await fetch('/lookup-url', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.content || '',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    url: lookupUrl
                })
            });

            const data = await response.json();

            if (response.ok && data.status === 'success') {
                showUrlDetails(data, true);
                setLookupUrl('');
            } else if (data.status === 'not_found') {
                playSound(false);
                Swal.fire({
                    title: 'Not Found!',
                    text: data.message || 'No shortened URL found.',
                    icon: 'error',
                    confirmButtonColor: '#dc3545',
                    confirmButtonText: 'OK'
                });
            } else if (data.errors) {
                playSound(false);
                const errorMessages = Object.values(data.errors).flat().join('\n');
                Swal.fire({
                    title: 'Validation Error!',
                    text: errorMessages || data.message,
                    icon: 'error',
                    confirmButtonColor: '#dc3545',
                    confirmButtonText: 'OK'
                });
            } else {
                playSound(false);
                Swal.fire({
                    title: 'Error!',
                    text: data.message || 'An error occurred. Please try again.',
                    icon: 'error',
                    confirmButtonColor: '#dc3545',
                    confirmButtonText: 'OK'
                });
            }
        } catch (error) {
            console.error('Error:', error);
            playSound(false);
            Swal.fire({
                title: 'Error!',
                text: 'An error occurred while looking up the URL. Please try again.',
                icon: 'error',
                confirmButtonColor: '#dc3545',
                confirmButtonText: 'OK'
            });
        } finally {
            setIsLookupLoading(false);
        }
    };

    return (
        <MainLayout showTitle={false} maxWidth="full" containerClassName="px-0" mainClassName="py-6 md:py-8" className="bg-transparent">
            {/* Audio elements */}
            <audio ref={successSound} src="/dist/success.mp3" preload="auto" />
            <audio ref={errorSound} src="/dist/error.mp3" preload="auto" />

            <div className="max-w-5xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 
                        className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-800 mb-4"
                        style={{ fontFamily: '"Bricolage", "Inter", sans-serif', letterSpacing: '-0.03em' }}
                    >
                        <span className="text-[#059669]">URL</span> Shortener
                    </h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Transform long, complex URLs into clean, memorable <span className="text-[#059669] font-semibold">short links</span>. 
                        Perfect for sharing on social media, emails, and print materials.
                    </p>
                </div>

                {/* Main Card */}
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
                    {/* Header Section */}
                    <div className="bg-gradient-to-r from-green-700 to-green-600 px-6 py-4">
                        <h2 
                            className="text-white font-extrabold text-lg"
                            style={{ fontFamily: '"Bricolage", "Inter", sans-serif', letterSpacing: '-0.03em' }}
                        >
                            Create <span className="text-[#f0d78c]">Short</span> Link
                        </h2>
                    </div>

                    <div className="p-6 md:p-8">
                        {/* Shorten Form */}
                        <form onSubmit={handleShorten}>
                            <div className="mb-6">
                                <label htmlFor="long_url" className="block text-sm font-semibold text-gray-700 mb-2">
                                    Destination URL <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="url"
                                    id="long_url"
                                    value={longUrl}
                                    onChange={(e) => setLongUrl(e.target.value)}
                                    placeholder="https://example.com/your-very-long-url"
                                    className="w-full pl-4 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-200 text-gray-800"
                                    required
                                />
                            </div>

                            <div className="mb-6">
                                <label className="block text-sm font-semibold text-gray-700 mb-3">
                                    Customize Your <span className="text-[#059669]">Short</span> Link
                                </label>
                                <div className="flex flex-col md:flex-row gap-4">
                                    <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <div className="md:col-span-1">
                                            <div className="bg-gray-50 border-2 border-gray-200 rounded-lg px-4 py-3 text-gray-600 font-mono text-sm h-full flex items-center">
                                                citycollegecdo.edu.ph/
                                            </div>
                                        </div>
                                        <div className="md:col-span-2">
                                            <input
                                                type="text"
                                                id="path"
                                                value={customPath}
                                                onChange={(e) => setCustomPath(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))}
                                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-200 text-gray-800 font-mono"
                                                placeholder="your-custom-path (optional)"
                                            />
                                        </div>
                                    </div>
                                    <button
                                        type="submit"
                                        className="md:w-auto bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold py-3 px-8 rounded-lg transition duration-200 shadow-md hover:shadow-lg flex items-center justify-center gap-2 whitespace-nowrap"
                                        disabled={isLoading}
                                    >
                                        {isLoading ? (
                                            <>
                                                <svg className="w-5 h-5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
                                                </svg>
                                                Shortening...
                                            </>
                                        ) : (
                                            <>
                                                <span className="text-[#f0d78c]">Shorten</span> URL
                                            </>
                                        )}
                                    </button>
                                </div>
                                <p className="mt-2 text-xs text-gray-500">
                                    Custom path must contain only letters, numbers, and hyphens. Leave blank for auto-generated.
                                </p>
                            </div>
                        </form>
                    </div>
                </div>

                {/* Footer Info */}
                <div className="mt-8 text-center text-sm text-gray-500">
                    <p>
                        Your links are <span className="text-[#059669] font-semibold">secure</span> and <span className="text-[#059669] font-semibold">private</span>. No personal data is collected.
                    </p>
                </div>
            </div>
        </MainLayout>
    );
};

export default UrlShortener;