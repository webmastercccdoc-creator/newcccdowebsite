import { useEffect, useState } from 'react';
import MainLayout from '../../../layouts/MainLayout';
import sdg1 from '../../../assets/images/sdg1.png';
import sdg2 from '../../../assets/images/sdg2.jpg';
import sdg3 from '../../../assets/images/sdg3.png';
import sdg4 from '../../../assets/images/sdg4.png';
import sdg5 from '../../../assets/images/sdg5.jpg';
import sdg6 from '../../../assets/images/sdg6.png';
import sdg7 from '../../../assets/images/sdg7.png';
import sdg8 from '../../../assets/images/sdg8.png';
import sdg9 from '../../../assets/images/sdg9.png';
import sdg10 from '../../../assets/images/sdg10.png';
import sdg11 from '../../../assets/images/sdg11.png';
import sdg12 from '../../../assets/images/sdg12.jpg';
import sdg13 from '../../../assets/images/sdg13.png';
import sdg14 from '../../../assets/images/sdg14.png';
import sdg15 from '../../../assets/images/sdg15.png';
import sdg16 from '../../../assets/images/sdg16.png';
import sdg17 from '../../../assets/images/sdg17.png';

const sdgImages = {
    1: sdg1,
    2: sdg2,
    3: sdg3,
    4: sdg4,
    5: sdg5,
    6: sdg6,
    7: sdg7,
    8: sdg8,
    9: sdg9,
    10: sdg10,
    11: sdg11,
    12: sdg12,
    13: sdg13,
    14: sdg14,
    15: sdg15,
    16: sdg16,
    17: sdg17,
};

const normalizeImagePath = (value) => {
    if (!value) return 'https://placehold.co/1200x800/cccccc/ffffff?text=No+Image';
    if (/^https?:\/\//i.test(value) || value.startsWith('data:')) return value;

    // Ensure starts with /
    const normalized = value.startsWith('/') ? value : '/' + value;
    return normalized;
};

const getSdgNumbers = (article) => {
    const values = article?.sdg ?? article?.sdg_numbers ?? [];
    const entries = Array.isArray(values) ? values : String(values).split(',');

    return entries
        .map((value) => String(value).match(/\d+/)?.[0])
        .filter(Boolean)
        .slice(0, 3);
};

export default function ViewArticle({ article: initialArticle = null, articleImages: initialImages = [] }) {
    const [article, setArticle] = useState(initialArticle);
    const [articleImages, setArticleImages] = useState(initialImages);
    const sdgNumbers = getSdgNumbers(article);

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

        if (typeof document === 'undefined') {
            return htmlString;
        }

        const container = document.createElement('div');
        container.innerHTML = htmlString;

        // Normalize plain-text content that does not already contain paragraph elements.
        let paragraphs = Array.from(container.querySelectorAll('p'));
        if (!paragraphs.length) {
            const textContent = container.textContent?.replace(/\r\n/g, '\n').trim();
            if (textContent) {
                const paragraphBlocks = textContent
                    .split(/\n{2,}/)
                    .map((block) => block.trim())
                    .filter(Boolean);

                const blocks =
                    paragraphBlocks.length > 1
                        ? paragraphBlocks
                        : textContent
                            .split(/\n+/)
                            .map((block) => block.trim())
                            .filter(Boolean);

                if (blocks.length) {
                    container.innerHTML = blocks
                        .map((block) => `<p>${block.replace(/\n/g, '<br />')}</p>`)
                        .join('');
                    paragraphs = Array.from(container.querySelectorAll('p'));
                }
            }
        }

        const hasEmbeddedImages = /<img\s+/i.test(container.innerHTML);
        if (!images.length || hasEmbeddedImages) {
            return container.innerHTML;
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

    // Social media follow links - Only Facebook, Instagram, TikTok
    const socialLinks = {
        facebook: 'https://www.facebook.com/orocitycollegeofficial/',
        tiktok: 'https://www.tiktok.com/@orocitycollegeofficial'
    };

    // Share functions - Only Facebook
    const shareOnFacebook = () => {
        window.open(
            `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
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

                    {sdgNumbers.length > 0 && (
                        <div className="mb-5 flex flex-wrap justify-center gap-2" aria-label="Sustainable Development Goals">
                            {sdgNumbers.map((sdgNumber) => (
                                <img
                                    key={`hero-sdg-${sdgNumber}`}
                                    src={sdgImages[sdgNumber]}
                                    alt={`Sustainable Development Goal ${sdgNumber}`}
                                    title={`SDG ${sdgNumber}`}
                                    className="h-16 w-16 rounded-md object-cover shadow-sm sm:h-20 sm:w-20"
                                />
                            ))}
                        </div>
                    )}
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
                        <path d="M0 120L60 110C120 100 240 80 360 75C480 70 600 80 720 90C840 100 960 110 1080 105C1200 100 1320 80 1380 70L1440 60V120H0Z" fill="#ffffff" />
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
                            {/* Top row: Department (left) + SDG badges (right) */}
                            <div className="mb-4 flex items-start justify-between gap-4">
                                <p className="text-sm font-medium uppercase tracking-[0.2em] text-green-700">
                                    {article?.department || 'News'}
                                </p>

                                {sdgNumbers.length > 0 && (
                                    <div
                                        className="flex flex-wrap justify-end gap-2 shrink-0"
                                        aria-label="Sustainable Development Goals"
                                    >
                                        {sdgNumbers.map((sdgNumber) => (
                                            <img
                                                key={sdgNumber}
                                                src={sdgImages[sdgNumber]}
                                                alt={`Sustainable Development Goal ${sdgNumber}`}
                                                title={`SDG ${sdgNumber}`}
                                                className="h-12 w-12 rounded-md object-cover shadow-sm sm:h-14 sm:w-14"
                                            />
                                        ))}
                                    </div>
                                )}
                            </div>

                            <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
                                {article?.title}
                            </h2>

                            {/* =============================================
                                SHARE BUTTONS - Only Facebook
                                ============================================= */}
                            <div className="flex items-center gap-3 mb-6 pb-6 border-b border-gray-200">
                                <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">
                                    Share:
                                </span>

                                {/* Facebook Share - Only */}
                                <button
                                    onClick={shareOnFacebook}
                                    className="w-8 h-8 rounded-full bg-[#1877f2] text-white flex items-center justify-center hover:scale-110 transition-all duration-200 hover:shadow-md"
                                    aria-label="Share on Facebook"
                                >
                                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                    </svg>
                                </button>
                            </div>

                            <div
                                className="article-content prose prose-lg max-w-none text-gray-700"
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
                    FOLLOW US SECTION - Only Facebook, Instagram, TikTok
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
                                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
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
                                    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
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