import { useEffect, useState } from 'react';
import MainLayout from '../../../layouts/MainLayout';

const normalizeImagePath = (value) => {
    if (!value) return 'https://placehold.co/1200x800/cccccc/ffffff?text=No+Image';
    if (/^https?:\/\//i.test(value) || value.startsWith('data:')) return value;

    return '/' + value.replace(/^\/+/, '');
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
                        setArticle(data.article);
                        setArticleImages(data.images || []);
                    })
                    .catch(() => {
                        setArticle(null);
                        setArticleImages([]);
                    });
            }
        }
    }, [initialArticle]);

    // We still keep galleryImages for potential future use, but we are NOT displaying it.
    const galleryImages = (articleImages && articleImages.length > 0
        ? articleImages.map((image) => normalizeImagePath(image.image_path || image.image))
        : article && (article.image_path || article.image)
            ? [normalizeImagePath(article.image_path || article.image)]
            : []
    ).filter(Boolean);

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

        const paragraphs = Array.from(container.querySelectorAll('p'));
        if (!paragraphs.length) return htmlString;

        images.forEach((imageUrl, index) => {
            const targetParagraph = paragraphs[Math.min(index * 2, paragraphs.length - 1)];
            if (!targetParagraph) return;

            const figure = document.createElement('figure');
            figure.className = 'my-8 overflow-hidden rounded-xl border border-slate-200 bg-slate-50 shadow-sm';
            
            figure.innerHTML = `
                <img src="${imageUrl}" alt="Article image ${index + 1}" class="w-full h-auto object-contain max-h-[600px] mx-auto" />
                <figcaption class="px-4 py-3 text-sm text-slate-500">${article?.title || 'Article image'} ${index + 1}</figcaption>
            `;

            targetParagraph.insertAdjacentElement('afterend', figure);
        });

        return container.innerHTML;
    };

    const contentHtml = { __html: formatArticleContent(article?.content || 'This article is not available right now.', galleryImages) };

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
                            <h2 className="mb-6 text-3xl font-bold text-gray-900 md:text-4xl">
                                {article?.title}
                            </h2>
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
            </div>
        </MainLayout>
    );
}