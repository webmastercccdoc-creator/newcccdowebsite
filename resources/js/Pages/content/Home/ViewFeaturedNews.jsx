import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
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
    1: sdg1, 2: sdg2, 3: sdg3, 4: sdg4, 5: sdg5, 6: sdg6, 7: sdg7,
    8: sdg8, 9: sdg9, 10: sdg10, 11: sdg11, 12: sdg12, 13: sdg13,
    14: sdg14, 15: sdg15, 16: sdg16, 17: sdg17,
};

const normalizeImagePath = (value) => {
    if (!value) return null;
    if (/^https?:\/\//i.test(value) || value.startsWith('data:')) return value;
    return value.startsWith('/') ? value : '/' + value;
};

const getSdgNumbers = (article) => {
    const values = article?.sdg ?? article?.sdg_numbers ?? [];
    const entries = Array.isArray(values) ? values : String(values).split(',');
    return entries
        .map((value) => String(value).match(/\d+/)?.[0])
        .filter(Boolean)
        .slice(0, 3);
};

const formatDate = (value) => {
    if (!value) return '';
    const d = new Date(value);
    if (isNaN(d.getTime())) return value;
    return d.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
};

// ============================================
// ANIMATION VARIANTS
// ============================================
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.12,
            delayChildren: 0.15,
        },
    },
};

const fadeUpVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: 'easeOut' },
    },
};

const fadeDownVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.55, ease: 'easeOut' },
    },
};

const scaleInVariants = {
    hidden: { opacity: 0, scale: 0.85 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: { duration: 0.45, ease: 'easeOut' },
    },
};

const articleBodyVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.7, ease: 'easeOut', delay: 0.2 },
    },
};

export default function ViewFeaturedNews({ article: initialArticle = null }) {
    const [article] = useState(initialArticle);
    const sdgNumbers = getSdgNumbers(article);

    useEffect(() => {
        document.title = article?.title
            ? `${article.title} - City College of Cagayan de Oro`
            : 'Featured News - City College of Cagayan de Oro';
    }, [article]);

    // Hero background image only
    const heroImage = normalizeImagePath(
        article?.banner_image_url ||
        article?.image_path ||
        article?.carousel_image_url
    );

    // Build the HTML content — NO inline image injection
    const formatArticleContent = (htmlString) => {
        if (!htmlString) return '';
        if (typeof document === 'undefined') return htmlString;

        const container = document.createElement('div');
        container.innerHTML = htmlString;

        let paragraphs = Array.from(container.querySelectorAll('p'));
        if (!paragraphs.length) {
            const textContent = container.textContent?.replace(/\r\n/g, '\n').trim();
            if (textContent) {
                const paragraphBlocks = textContent
                    .split(/\n{2,}/)
                    .map((b) => b.trim())
                    .filter(Boolean);

                const blocks = paragraphBlocks.length > 1
                    ? paragraphBlocks
                    : textContent.split(/\n+/).map((b) => b.trim()).filter(Boolean);

                if (blocks.length) {
                    container.innerHTML = blocks
                        .map((block) => `<p>${block.replace(/\n/g, '<br />')}</p>`)
                        .join('');
                }
            }
        }

        return container.innerHTML;
    };

    const contentHtml = {
        __html: formatArticleContent(
            article?.content || 'This featured article is not available right now.'
        ),
    };

    const shareUrl = typeof window !== 'undefined' ? window.location.href : '';

    const shareOnFacebook = () => {
        window.open(
            `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
            '_blank',
            'width=600,height=400'
        );
    };

    const socialLinks = {
        facebook: 'https://www.facebook.com/cccdofficialhttps://www.facebook.com/orocitycollegeofficial/',
        tiktok: 'https://www.tiktok.com/@orocitycollegeofficial',
    };

    return (
        <MainLayout
            maxWidth="full"
            containerClassName="px-0"
            mainClassName="py-0"
            className="overflow-hidden pb-0"
        >
            {/* =====================================================
                HERO — image background + green tint + editorial title
                ===================================================== */}
            <motion.div
                className="relative w-full bg-cover bg-center shadow-2xl overflow-hidden bg-[#0f5132]"
                style={{
                    backgroundColor: '#0f5132',
                    backgroundImage: heroImage
                        ? `linear-gradient(180deg, rgba(0,0,0,0.55) 0%, rgba(15,81,50,0.75) 55%, rgba(15,81,50,0.95) 100%), url(${heroImage})`
                        : `linear-gradient(180deg, #0b3d24 0%, #0f5132 100%)`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
            >
                {/* Gold top accent — animates in from left */}
                <motion.div
                    className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500 z-20"
                    initial={{ scaleX: 0, originX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.9, ease: 'easeOut', delay: 0.2 }}
                />

                <motion.div
                    className="relative z-10 mx-auto max-w-4xl px-6 pt-24 pb-32 sm:pt-32 sm:pb-40 md:pt-40 md:pb-48 text-center"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {/* Eyebrow badge */}
                    <motion.p
                        variants={fadeDownVariants}
                        className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.25em] text-yellow-300 bg-black/40 backdrop-blur-md rounded-full border border-yellow-400/40 shadow-lg"
                    >
                        <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-pulse" />
                        Featured · {article?.department || 'News'}
                    </motion.p>

                    {/* SDG badges */}
                    {sdgNumbers.length > 0 && (
                        <motion.div
                            variants={fadeDownVariants}
                            className="mb-6 flex flex-wrap justify-center gap-3"
                            aria-label="Sustainable Development Goals"
                        >
                            {sdgNumbers.map((sdgNumber, i) => (
                                <motion.img
                                    key={`hero-sdg-${sdgNumber}`}
                                    src={sdgImages[sdgNumber]}
                                    alt={`Sustainable Development Goal ${sdgNumber}`}
                                    title={`SDG ${sdgNumber}`}
                                    className="h-16 w-16 rounded-lg object-cover shadow-xl ring-2 ring-white/30 sm:h-20 sm:w-20"
                                    variants={scaleInVariants}
                                    whileHover={{ scale: 1.08, rotate: 2 }}
                                    transition={{ type: 'spring', stiffness: 300 }}
                                />
                            ))}
                        </motion.div>
                    )}

                    {/* Title */}
                    <motion.h1
                        variants={fadeUpVariants}
                        className="text-4xl font-bold tracking-tight text-white drop-shadow-2xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight"
                    >
                        {article?.title || 'Loading Featured Article...'}
                    </motion.h1>

                    {/* Divider with animated dots */}
                    <motion.div
                        variants={fadeUpVariants}
                        className="mt-8 mb-6 flex items-center justify-center gap-3"
                    >
                        <motion.span
                            className="h-px w-12 bg-yellow-400/60"
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{ duration: 0.6, delay: 0.6 }}
                            style={{ originX: 1 }}
                        />
                        <motion.span
                            className="w-2 h-2 rounded-full bg-yellow-400"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 0.4, delay: 0.8, type: 'spring' }}
                        />
                        <motion.span
                            className="h-px w-12 bg-yellow-400/60"
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{ duration: 0.6, delay: 0.6 }}
                            style={{ originX: 0 }}
                        />
                    </motion.div>

                    {/* Date */}
                    {article?.date && (
                        <motion.p
                            variants={fadeUpVariants}
                            className="text-sm uppercase tracking-[0.2em] text-white/85 font-medium"
                        >
                            {formatDate(article.date)}
                        </motion.p>
                    )}
                </motion.div>

                {/* Wave divider */}
                <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
                    <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
                        <path
                            d="M0 120L60 110C120 100 240 80 360 75C480 70 600 80 720 90C840 100 960 110 1080 105C1200 100 1320 80 1380 70L1440 60V120H0Z"
                            fill="#ffffff"
                        />
                    </svg>
                </div>
            </motion.div>

            {/* =====================================================
                ARTICLE BODY
                ===================================================== */}
            <motion.div
                className="mx-auto max-w-3xl px-6 pt-12 pb-20 md:pt-16 md:pb-24"
                variants={articleBodyVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
            >
                {/* Back button */}
                <motion.div
                    className="mb-10"
                    variants={fadeUpVariants}
                >
                    <button
                        onClick={() => window.history.back()}
                        className="inline-flex items-center gap-2 text-sm font-medium text-[#0f5132] hover:text-yellow-600 transition-colors group"
                    >
                        <svg
                            className="w-4 h-4 transition-transform group-hover:-translate-x-1"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                        </svg>
                        Back to Home
                    </button>
                </motion.div>

                {article ? (
                    <>
                        {/* Meta bar */}
                        <motion.div
                            variants={fadeUpVariants}
                            className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-10 border-b border-gray-200"
                        >
                            <div className="flex flex-wrap items-center gap-3 text-sm">
                                <span className="inline-block px-3 py-1 rounded-full bg-[#0f5132] text-white text-[11px] font-semibold uppercase tracking-[0.18em]">
                                    {article?.department || 'News'}
                                </span>
                                {article?.date && (
                                    <span className="text-gray-500 text-xs uppercase tracking-[0.15em]">
                                        {formatDate(article.date)}
                                    </span>
                                )}
                            </div>

                            <div className="flex items-center gap-2">
                                <span className="text-[11px] font-medium text-gray-400 uppercase tracking-wider mr-1">
                                    Share
                                </span>
                                <motion.button
                                    onClick={shareOnFacebook}
                                    className="w-8 h-8 rounded-full bg-[#1877f2] text-white flex items-center justify-center hover:shadow-md"
                                    whileHover={{ scale: 1.15 }}
                                    whileTap={{ scale: 0.92 }}
                                    transition={{ type: 'spring', stiffness: 400 }}
                                    aria-label="Share on Facebook"
                                >
                                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                    </svg>
                                </motion.button>
                            </div>
                        </motion.div>

                        {/* Lead paragraph */}
                        <motion.p
                            variants={fadeUpVariants}
                            className="text-xl md:text-2xl text-gray-800 leading-relaxed font-light italic mb-8 border-l-4 border-yellow-400 pl-6"
                        >
                            {article?.department
                                ? `An update from the ${article.department} —`
                                : 'Featured story —'}{' '}
                            {article?.title}
                        </motion.p>

                        {/* Content */}
                        <motion.div
                            variants={fadeUpVariants}
                            className="featured-prose prose prose-lg md:prose-xl max-w-none text-gray-700
                                       prose-headings:font-bold prose-headings:text-[#0f5132]
                                       prose-p:leading-relaxed prose-p:mb-6
                                       prose-a:text-[#0f5132] prose-a:no-underline hover:prose-a:underline
                                       prose-strong:text-gray-900
                                       prose-blockquote:border-l-4 prose-blockquote:border-yellow-400
                                       prose-blockquote:bg-yellow-50 prose-blockquote:py-2 prose-blockquote:px-6 prose-blockquote:italic"
                            dangerouslySetInnerHTML={contentHtml}
                        />

                        {/* End-of-article divider */}
                        <motion.div
                            variants={fadeUpVariants}
                            className="mt-14 flex items-center justify-center gap-3"
                        >
                            <span className="h-px w-16 bg-gray-300" />
                            <span className="w-2 h-2 rounded-full bg-yellow-400" />
                            <span className="h-px w-16 bg-gray-300" />
                        </motion.div>

                        <motion.p
                            variants={fadeUpVariants}
                            className="text-center text-xs uppercase tracking-[0.2em] text-gray-400 mt-4"
                        >
                            End of Featured Story
                        </motion.p>
                    </>
                ) : (
                    <motion.div
                        variants={fadeUpVariants}
                        className="rounded-2xl bg-white p-10 text-center text-gray-600 shadow-lg border border-gray-100"
                    >
                        Featured article not found.
                    </motion.div>
                )}

                {/* FOLLOW US */}
                <motion.div
                    variants={fadeUpVariants}
                    className="mt-16 pt-10 border-t border-gray-200"
                >
                    <div className="text-center">
                        <p className="text-xs font-semibold text-gray-500 uppercase tracking-[0.25em] mb-5">
                            Follow Us
                        </p>
                        <div className="flex items-center justify-center gap-4 md:gap-6">
                            <motion.a
                                href={socialLinks.facebook}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-12 h-12 rounded-full bg-[#1877f2] text-white flex items-center justify-center shadow-md"
                                whileHover={{ scale: 1.12, y: -3 }}
                                whileTap={{ scale: 0.92 }}
                                transition={{ type: 'spring', stiffness: 350 }}
                                aria-label="Follow us on Facebook"
                            >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                </svg>
                            </motion.a>
                            <motion.a
                                href={socialLinks.tiktok}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center shadow-md"
                                whileHover={{ scale: 1.12, y: -3 }}
                                whileTap={{ scale: 0.92 }}
                                transition={{ type: 'spring', stiffness: 350 }}
                                aria-label="Follow us on TikTok"
                            >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
                                </svg>
                            </motion.a>
                        </div>
                        <p className="mt-4 text-xs text-gray-400">
                            Connect with us on social media
                        </p>
                    </div>
                </motion.div>
            </motion.div>
        </MainLayout>
    );
}