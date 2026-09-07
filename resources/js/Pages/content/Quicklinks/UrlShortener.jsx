import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
                                <p class="text-gray-700 font-medium mb-3">Your shortened URL was generated successfully.</p>
                                <div class="rounded-lg border border-yellow-200 bg-yellow-50 p-3 mb-3 text-sm text-yellow-800">
                                    Status: Pending approval. You can copy the link and download the QR code now. The link will become active after approval.
                                </div>
                                
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
                        const linkText = shortUrlLink.href;
                        const showCopied = () => {
                            Swal.fire({
                                title: 'Copied!',
                                text: 'The link has been copied to your clipboard.',
                                icon: 'success',
                                confirmButtonColor: '#059669',
                                confirmButtonText: 'OK',
                                timer: 2000,
                                timerProgressBar: true
                            });
                        };

                        const fallbackCopy = () => {
                            const textArea = document.createElement('textarea');
                            textArea.value = linkText;
                            textArea.setAttribute('readonly', '');
                            textArea.style.position = 'fixed';
                            textArea.style.opacity = '0';
                            document.body.appendChild(textArea);
                            textArea.select();
                            try {
                                if (!document.execCommand('copy')) {
                                    throw new Error('Copy command failed');
                                }
                                showCopied();
                            } catch (error) {
                                Swal.fire({
                                    title: 'Copy failed',
                                    text: 'Please copy the link manually.',
                                    icon: 'error',
                                    confirmButtonColor: '#dc3545',
                                    confirmButtonText: 'OK'
                                });
                            } finally {
                                document.body.removeChild(textArea);
                            }
                        };

                        if (navigator.clipboard?.writeText) {
                            navigator.clipboard.writeText(linkText).then(showCopied).catch(fallbackCopy);
                        } else {
                            fallbackCopy();
                        }
                    });
                }

                const downloadBtn = document.getElementById('download-qr');
                const qrImg = document.getElementById('qr-code-img');

                if (downloadBtn && qrImg) {
                    downloadBtn.addEventListener('click', () => {
                        fetch(qrImg.src)
                            .then(response => {
                                if (!response.ok) {
                                    throw new Error('QR code download failed');
                                }
                                return response.blob();
                            })
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

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                duration: 0.6,
                ease: "easeOut",
                staggerChildren: 0.15
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                ease: "easeOut"
            }
        }
    };

    const formVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                duration: 0.5,
                ease: "easeOut"
            }
        }
    };

    const titleVariants = {
        hidden: { opacity: 0, y: -20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: "easeOut"
            }
        }
    };

    const buttonVariants = {
        idle: { scale: 1 },
        hover: { 
            scale: 1.05,
            transition: {
                duration: 0.2,
                ease: "easeInOut"
            }
        },
        tap: { 
            scale: 0.95,
            transition: {
                duration: 0.1,
                ease: "easeInOut"
            }
        }
    };

    const inputVariants = {
        focus: {
            scale: 1.02,
            boxShadow: "0 0 0 3px rgba(5, 150, 105, 0.2)",
            transition: {
                duration: 0.2,
                ease: "easeInOut"
            }
        },
        blur: {
            scale: 1,
            boxShadow: "0 0 0 0 rgba(5, 150, 105, 0)",
            transition: {
                duration: 0.2,
                ease: "easeInOut"
            }
        }
    };

    const pathContainerVariants = {
        hidden: { opacity: 0, height: 0 },
        visible: {
            opacity: 1,
            height: "auto",
            transition: {
                duration: 0.4,
                ease: "easeOut"
            }
        }
    };

    const loadingSpinnerVariants = {
        animate: {
            rotate: 360,
            transition: {
                duration: 1,
                repeat: Infinity,
                ease: "linear"
            }
        }
    };

    return (
        <MainLayout showTitle={false} maxWidth="full" containerClassName="px-0" mainClassName="py-6 md:py-8" className="bg-transparent">
            {/* Audio elements */}
            <audio ref={successSound} src="/dist/success.mp3" preload="auto" />
            <audio ref={errorSound} src="/dist/error.mp3" preload="auto" />

            <motion.div 
                className="max-w-5xl mx-auto"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {/* Header with Bigger Title and Green Words - Like LatestNews */}
                <motion.div 
                    className="text-center mb-12"
                    variants={itemVariants}
                >
                    <motion.h1 
                        className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-gray-800 mb-4"
                        style={{ fontFamily: '"Bricolage Grotesque", sans-serif' }}
                        variants={titleVariants}
                    >
                        <motion.span 
                            className="text-[#059669]"
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.2 }}
                        >
                            URL
                        </motion.span>{' '}
                        <motion.span 
                            className="text-[#059669]"
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.2 }}
                        >
                            Shortener
                        </motion.span>
                    </motion.h1>
                    
                    <motion.p 
                        className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed"
                        variants={titleVariants}
                        transition={{ delay: 0.1 }}
                    >
                        Transform long, complex URLs into clean, memorable{' '}
                        <motion.span 
                            className="text-[#059669] font-semibold"
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.2 }}
                        >
                            short links
                        </motion.span>. 
                        Perfect for sharing on social media, emails, and print materials.
                    </motion.p>
                    
                    <motion.div 
                        className="w-24 h-1 bg-gradient-to-r from-[#059669] to-[#047857] rounded-full mx-auto mt-4"
                        initial={{ width: 0 }}
                        animate={{ width: 96 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                    />
                </motion.div>

                {/* Main Card */}
                <motion.div 
                    className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100"
                    variants={itemVariants}
                    whileHover={{ 
                        boxShadow: "0 20px 60px rgba(5, 150, 105, 0.15)",
                        transition: { duration: 0.3 }
                    }}
                >
                    {/* Header Section */}
                    <motion.div 
                        className="bg-gradient-to-r from-[#059669] to-[#047857] px-6 py-4"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: 0.3 }}
                    >
                        <motion.h2 
                            className="text-white font-extrabold text-xl md:text-2xl"
                            style={{ fontFamily: '"Bricolage Grotesque", sans-serif' }}
                            whileHover={{ scale: 1.02 }}
                            transition={{ duration: 0.2 }}
                        >
                            Create{' '}
                            <motion.span 
                                className="text-[#f0d78c]"
                                whileHover={{ 
                                    rotate: [0, -5, 5, -3, 3, 0],
                                    transition: { duration: 0.5 }
                                }}
                            >
                                Short
                            </motion.span>{' '}
                            Link
                        </motion.h2>
                    </motion.div>

                    <motion.div 
                        className="p-6 md:p-8"
                        variants={formVariants}
                    >
                        {/* Shorten Form */}
                        <form onSubmit={handleShorten}>
                            <motion.div 
                                className="mb-6"
                                variants={itemVariants}
                            >
                                <label htmlFor="long_url" className="block text-sm font-semibold text-gray-700 mb-2">
                                    Destination URL <span className="text-red-500">*</span>
                                </label>
                                <motion.input
                                    type="url"
                                    id="long_url"
                                    value={longUrl}
                                    onChange={(e) => setLongUrl(e.target.value)}
                                    placeholder="https://example.com/your-very-long-url"
                                    className="w-full pl-4 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#059669] focus:border-transparent transition duration-200 text-gray-800"
                                    required
                                    whileFocus="focus"
                                    variants={inputVariants}
                                    initial="blur"
                                />
                            </motion.div>

                            <motion.div 
                                className="mb-6"
                                variants={itemVariants}
                            >
                                <label className="block text-sm font-semibold text-gray-700 mb-3">
                                    Customize Your{' '}
                                    <motion.span 
                                        className="text-[#059669]"
                                        whileHover={{ 
                                            scale: 1.05,
                                            color: "#047857"
                                        }}
                                    >
                                        Short
                                    </motion.span>{' '}
                                    Link
                                </label>
                                <motion.div 
                                    className="flex flex-col md:flex-row gap-4"
                                    variants={pathContainerVariants}
                                >
                                    <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <motion.div 
                                            className="md:col-span-1"
                                            whileHover={{ scale: 1.02 }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            <div className="bg-gray-50 border-2 border-gray-200 rounded-lg px-4 py-3 text-gray-600 font-mono text-sm h-full flex items-center">
                                                citycollegecdo.edu.ph/
                                            </div>
                                        </motion.div>
                                        <motion.div 
                                            className="md:col-span-2"
                                            whileHover={{ scale: 1.01 }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            <motion.input
                                                type="text"
                                                id="path"
                                                value={customPath}
                                                onChange={(e) => setCustomPath(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))}
                                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#059669] focus:border-transparent transition duration-200 text-gray-800 font-mono"
                                                placeholder="your-custom-path (optional)"
                                                whileFocus="focus"
                                                variants={inputVariants}
                                                initial="blur"
                                            />
                                        </motion.div>
                                    </div>
                                    <motion.button
                                        type="submit"
                                        className="md:w-auto bg-gradient-to-r from-[#059669] to-[#047857] hover:from-[#047857] hover:to-[#065f46] text-white font-semibold py-3 px-8 rounded-lg transition duration-200 shadow-md hover:shadow-lg flex items-center justify-center gap-2 whitespace-nowrap"
                                        disabled={isLoading}
                                        variants={buttonVariants}
                                        initial="idle"
                                        whileHover="hover"
                                        whileTap="tap"
                                    >
                                        {isLoading ? (
                                            <>
                                                <motion.svg 
                                                    className="w-5 h-5" 
                                                    fill="none" 
                                                    stroke="currentColor" 
                                                    viewBox="0 0 24 24"
                                                    variants={loadingSpinnerVariants}
                                                    animate="animate"
                                                >
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
                                                </motion.svg>
                                                Shortening...
                                            </>
                                        ) : (
                                            <>
                                                <motion.span 
                                                    className="text-[#f0d78c]"
                                                    whileHover={{ 
                                                        scale: 1.1,
                                                        transition: { duration: 0.2 }
                                                    }}
                                                >
                                                    Shorten
                                                </motion.span>{' '}
                                                URL
                                            </>
                                        )}
                                    </motion.button>
                                </motion.div>
                                <motion.p 
                                    className="mt-2 text-xs text-gray-500"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.5 }}
                                >
                                    Custom path must contain only letters, numbers, and hyphens. Leave blank for auto-generated.
                                </motion.p>
                            </motion.div>
                        </form>
                    </motion.div>
                </motion.div>

                {/* Footer Info */}
                <motion.div 
                    className="mt-8 text-center text-sm text-gray-500"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                >
                    <p>
                        Your links are{' '}
                        <motion.span 
                            className="text-[#059669] font-semibold"
                            whileHover={{ 
                                scale: 1.05,
                                color: "#047857"
                            }}
                        >
                            secure
                        </motion.span>{' '}
                        and{' '}
                        <motion.span 
                            className="text-[#059669] font-semibold"
                            whileHover={{ 
                                scale: 1.05,
                                color: "#047857"
                            }}
                        >
                            private
                        </motion.span>. No personal data is collected.
                    </p>
                </motion.div>

                {/* Success Animation Overlay */}
                <AnimatePresence>
                    {isLoading && (
                        <motion.div
                            className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <motion.div
                                className="bg-white rounded-2xl p-8 shadow-2xl flex flex-col items-center"
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.8, opacity: 0 }}
                                transition={{ duration: 0.4, ease: "easeOut" }}
                            >
                                <motion.div
                                    className="w-16 h-16 border-4 border-[#059669] border-t-transparent rounded-full"
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                />
                                <p className="mt-4 text-gray-700 font-semibold">Shortening your URL...</p>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Floating Quick Action Button */}
                <motion.div
                    className="fixed bottom-8 right-8 z-40"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ 
                        delay: 1.5,
                        duration: 0.5,
                        ease: "easeOut",
                        type: "spring",
                        stiffness: 200
                    }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                >
                    <motion.button
                        onClick={() => {
                            document.getElementById('long_url')?.focus();
                        }}
                        className="flex items-center justify-center w-14 h-14 bg-gradient-to-r from-[#059669] to-[#047857] text-white rounded-full shadow-2xl hover:shadow-green-500/30 transition-all duration-200"
                        animate={{
                            boxShadow: [
                                "0 0 0 0 rgba(5, 150, 105, 0.4)",
                                "0 0 0 20px rgba(5, 150, 105, 0)",
                                "0 0 0 0 rgba(5, 150, 105, 0.4)"
                            ]
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                        </svg>
                    </motion.button>
                </motion.div>
            </motion.div>
        </MainLayout>
    );
};

export default UrlShortener;