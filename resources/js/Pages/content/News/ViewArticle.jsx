import { useEffect, useState } from 'react';
import MainLayout from '../../../layouts/MainLayout';

const normalizeImagePath = (value) => {
    if (!value) return 'https://placehold.co/1200x800/cccccc/ffffff?text=No+Image';
    if (/^https?:\/\//i.test(value) || value.startsWith('data:')) return value;

    // Ensure starts with /
    const normalized = value.startsWith('/') ? value : '/' + value;
    return normalized;
};

export default function ViewArticle({ article: initialArticle = null, articleImages: initialImages = [] }) {
    const [article, setArticle] = useState(initialArticle);
    const [articleImages, setArticleImages] = useState(initialImages);

    useEffect(() => {
        document.title = article?.title ? `${article.title} - City College of Cagayan de Oro` : 'View Article - City College of Cagayan de Oro';

        if (!initialArticle && window.location.pathname) {
            const match = window.location.pathname.match(/\/news\/(\d+)/);
            const articleId = match?.[1];

            if (articleId) {
                fetch(`/api/news/${articleId}`)
                    .then((res) => res.json())
                    .then((data) => {
                        console.log('Fetched article data:', data);
                        setArticle(data.article);
                        setArticleImages(data.images || []);
                    })
                    .catch((error) => {
                        console.error('Failed to fetch article:', error);
                        setArticle(null);
                        setArticleImages([]);
                    });
            }
        }
    }, [initialArticle]);

    // We still keep galleryImages for potential future use, but we are NOT displaying it.
    const galleryImages = (() => {
        if (articleImages && Array.isArray(articleImages) && articleImages.length > 0) {
            // Use images from the images array (primary source)
            return articleImages
                .map((image) => normalizeImagePath(image.image_path || image.image))
                .filter(Boolean);
        }
        
        // Fallback to article's single image if no images array
        if (article && (article.image_path || article.image)) {
            return [normalizeImagePath(article.image_path || article.image)];
        }
        
        return [];
    })();

    console.log('Gallery images:', galleryImages);
    console.log('Article images array:', articleImages);
    console.log('Article object:', article);

    // Newspaper-style inline layout: mix article images into the content flow between paragraphs.
    const formatArticleContent = (htmlString, images = []) => {
        if (!htmlString) return '';

        const hasEmbeddedImages = /<img\s+/i.test(htmlString);
        if (!images.length || hasEmbeddedImages) {
            return htmlString;
        }

        if (typeof document === 'undefined') {
            return htmlString;
        }

        const container = document.createElement('div');
        container.innerHTML = htmlString;

        // If content is plain text (no paragraphs), wrap it in paragraphs
        let paragraphs = Array.from(container.querySelectorAll('p'));
        if (!paragraphs.length) {
            // Content might be plain text without HTML tags
            const textContent = container.textContent;
            if (textContent) {
                container.innerHTML = '<p>' + textContent.split('\n\n').join('</p><p>') + '</p>';
                paragraphs = Array.from(container.querySelectorAll('p'));
            } else {
                return htmlString;
            }
        }

        console.log('Formatting article content with', images.length, 'images and', paragraphs.length, 'paragraphs');

        images.forEach((imageUrl, index) => {
            if (!imageUrl) return;
            
            const targetParagraph = paragraphs[Math.min(index * 2, paragraphs.length - 1)];
            if (!targetParagraph) return;

            const figure = document.createElement('figure');
            figure.className = 'my-8 overflow-hidden rounded-xl border border-slate-200 bg-slate-50 shadow-sm';
            
            figure.innerHTML = `
                <img src="${imageUrl}" alt="Article image ${index + 1}" class="w-full h-auto object-contain max-h-[600px] mx-auto" onerror="this.style.display='none'" />
                <figcaption class="px-4 py-3 text-sm text-slate-500">${article?.title || 'Article image'} ${index + 1}</figcaption>
            `;

            targetParagraph.insertAdjacentElement('afterend', figure);
        });

        return container.innerHTML;
    };

    const contentHtml = { __html: formatArticleContent(article?.content || 'This article is not available right now.', galleryImages) };

    // Get current URL for sharing
    const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
    const shareTitle = article?.title || 'City College of Cagayan de Oro';

    // Social media follow links
    const socialLinks = {
        facebook: 'https://facebook.com/yourpage',
        twitter: 'https://twitter.com/yourpage',
        linkedin: 'https://linkedin.com/company/yourpage',
        youtube: 'https://youtube.com/yourpage',
        instagram: 'https://instagram.com/yourpage',
        tiktok: 'https://tiktok.com/@yourpage'
    };

    // Share functions
    const shareOnFacebook = () => {
        window.open(
            `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
            '_blank',
            'width=600,height=400'
        );
    };

    const shareOnTwitter = () => {
        window.open(
            `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareTitle)}`,
            '_blank',
            'width=600,height=400'
        );
    };

    return (
        <MainLayout 
            maxWidth="full" 
            containerClassName="px-0" 
            mainClassName="py-0" 
            className="overflow-hidden pb-0"
        >
            {/* SOLID GREEN BACKGROUND WITH WHITE STRIPES */}
            <div 
                className="relative w-full py-16 md:py-24 lg:py-32 shadow-lg overflow-hidden"
                style={{
                    backgroundColor: '#0f5132',
                    backgroundImage: `repeating-linear-gradient(
                        45deg,
                        transparent,
                        transparent 35px,
                        rgba(255, 255, 255, 0.08) 35px,
                        rgba(255, 255, 255, 0.08) 36px
                    )`
                }}
            >
                {/* Subtle dark inner shadow to add depth at the top */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-transparent pointer-events-none"></div>
                
                <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
                    {/* Badge - White transparent style for solid green background */}
                    <p className="inline-block mb-4 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-white bg-white/10 backdrop-blur-sm rounded-full border border-white/20 shadow-sm">
                        {article?.department || 'News'}
                    </p>
                    
                    {/* Title - Pure white for maximum contrast */}
                    <h1 className="text-4xl font-bold tracking-tight text-white drop-shadow-md sm:text-5xl md:text-6xl lg:text-7xl">
                        {article?.title || 'Loading Article...'}
                    </h1>
                    
                    {/* Date - Soft white */}
                    {article?.date && (
                        <p className="mt-6 text-lg text-white/80 font-medium flex items-center justify-center gap-2">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            {new Date(article.date).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            })}
                        </p>
                    )}
                </div>
                
                {/* Clean white wave to blend smoothly into the white article body */}
                <div className="absolute bottom-0 left-0 right-0">
                    <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
                        <path d="M0 120L60 110C120 100 240 80 360 75C480 70 600 80 720 90C840 100 960 110 1080 105C1200 100 1320 80 1380 70L1440 60V120H0Z" fill="#ffffff"/>
                    </svg>
                </div>
            </div>

            {/* ARTICLE BODY */}
            <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12 md:py-16">
                
                {/* --- BACK BUTTON FLOATING OUTSIDE THE CARD (Top Left) --- */}
                <div className="flex justify-start mb-6">
                    <button
                        onClick={() => window.history.back()}
                        className="inline-flex items-center gap-2 text-sm font-medium text-[#0f5132] hover:text-green-800 transition-colors group"
                    >
                        <svg 
                            className="w-4 h-4 transition-transform group-hover:-translate-x-1" 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                        </svg>
                        Back to Latest News
                    </button>
                </div>

                {article ? (
                    <article className="bg-white rounded-none md:rounded-xl md:shadow-lg overflow-hidden">
                        <div className="px-4 sm:px-8 md:px-12 py-8 md:py-12">
                            <p className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-green-700">
                                {article?.department || 'News'}
                            </p>
                            
                            <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
                                {article?.title}
                            </h2>

                            {/* =============================================
                                SHARE BUTTONS - Below Title in Content Area
                                ============================================= */}
                            <div className="flex items-center gap-3 mb-6 pb-6 border-b border-gray-200">
                                <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">
                                    Share:
                                </span>
                                
                                {/* Facebook Share */}
                                <button
                                    onClick={shareOnFacebook}
                                    className="w-8 h-8 rounded-full bg-[#1877f2] text-white flex items-center justify-center hover:scale-110 transition-all duration-200 hover:shadow-md"
                                    aria-label="Share on Facebook"
                                >
                                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                                    </svg>
                                </button>

                                {/* Twitter / X Share */}
                                <button
                                    onClick={shareOnTwitter}
                                    className="w-8 h-8 rounded-full bg-[#000000] text-white flex items-center justify-center hover:scale-110 transition-all duration-200 hover:shadow-md"
                                    aria-label="Share on Twitter"
                                >
                                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                                    </svg>
                                </button>
                            </div>

                            <div
                                className="prose prose-lg max-w-none text-gray-700"
                                dangerouslySetInnerHTML={contentHtml}
                            />
                        </div>
                    </article>
                ) : (
                    <div className="rounded-xl bg-white p-8 text-center text-gray-600 shadow-lg border border-gray-100">
                        Article not found.
                    </div>
                )}

                {/* =============================================
                    FOLLOW US SECTION - Below Article
                    ============================================= */}
                <div className="mt-12 pt-8 border-t border-gray-200">
                    <div className="text-center">
                        <p className="text-sm font-medium text-gray-500 uppercase tracking-[0.15em] mb-4">
                            Follow Us
                        </p>
                        <div className="flex items-center justify-center gap-4 md:gap-6">
                            {/* Facebook */}
                            <a
                                href={socialLinks.facebook}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-11 h-11 rounded-full bg-[#1877f2] text-white flex items-center justify-center hover:scale-110 transition-transform duration-200 shadow-md hover:shadow-lg"
                                aria-label="Follow us on Facebook"
                            >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                                </svg>
                            </a>

                            {/* Twitter / X */}
                            <a
                                href={socialLinks.twitter}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-11 h-11 rounded-full bg-[#000000] text-white flex items-center justify-center hover:scale-110 transition-transform duration-200 shadow-md hover:shadow-lg"
                                aria-label="Follow us on Twitter"
                            >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                                </svg>
                            </a>

                            {/* LinkedIn */}
                            <a
                                href={socialLinks.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-11 h-11 rounded-full bg-[#0a66c2] text-white flex items-center justify-center hover:scale-110 transition-transform duration-200 shadow-md hover:shadow-lg"
                                aria-label="Follow us on LinkedIn"
                            >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                                </svg>
                            </a>

                            {/* YouTube */}
                            <a
                                href={socialLinks.youtube}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-11 h-11 rounded-full bg-[#ff0000] text-white flex items-center justify-center hover:scale-110 transition-transform duration-200 shadow-md hover:shadow-lg"
                                aria-label="Follow us on YouTube"
                            >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                                </svg>
                            </a>

                            {/* Instagram */}
                            <a
                                href={socialLinks.instagram}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-11 h-11 rounded-full bg-gradient-to-br from-[#f09433] via-[#e6683c] to-[#dc2743] text-white flex items-center justify-center hover:scale-110 transition-transform duration-200 shadow-md hover:shadow-lg"
                                aria-label="Follow us on Instagram"
                            >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
                                </svg>
                            </a>

                            {/* TikTok */}
                            <a
                                href={socialLinks.tiktok}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-11 h-11 rounded-full bg-[#000000] text-white flex items-center justify-center hover:scale-110 transition-transform duration-200 shadow-md hover:shadow-lg"
                                aria-label="Follow us on TikTok"
                            >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
                                </svg>
                            </a>
                        </div>
                        <p className="mt-3 text-xs text-gray-400">
                            Connect with us on social media
                        </p>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}