import { useEffect } from 'react';
import MainLayout from '../../layouts/MainLayout';
import '../../../css/home.css';
import { initLandingAnimations, data } from '../../home-animations';

const normalizeImagePath = (value) => {
    if (!value) return 'https://placehold.co/600x400/1e3a8a/ffffff?text=No+Image';
    if (/^https?:\/\//i.test(value) || value.startsWith('data:')) return value;

    return '/' + value.replace(/^\/+/, '');
};

const SDG_COLORS = {
    1: { bg: '#E5243B', text: '#FFFFFF', border: '#C81F35' },
    2: { bg: '#DDA63A', text: '#111827', border: '#C5942A' },
    3: { bg: '#4C9F38', text: '#FFFFFF', border: '#3D8A30' },
    4: { bg: '#C5192D', text: '#FFFFFF', border: '#A91427' },
    5: { bg: '#FF3A21', text: '#FFFFFF', border: '#DB2D19' },
    6: { bg: '#26BDE2', text: '#0F172A', border: '#1AA4C8' },
    7: { bg: '#FCC30B', text: '#111827', border: '#E6B108' },
    8: { bg: '#A21942', text: '#FFFFFF', border: '#861635' },
    9: { bg: '#FD6925', text: '#FFFFFF', border: '#E55B1D' },
    10: { bg: '#DD1367', text: '#FFFFFF', border: '#C21058' },
    11: { bg: '#FD9D24', text: '#111827', border: '#E78E1D' },
    12: { bg: '#BF8B2E', text: '#FFFFFF', border: '#A77725' },
    13: { bg: '#3F7E44', text: '#FFFFFF', border: '#2F6536' },
    14: { bg: '#0A97D9', text: '#FFFFFF', border: '#087EB9' },
    15: { bg: '#56C02B', text: '#111827', border: '#47A323' },
    16: { bg: '#00689D', text: '#FFFFFF', border: '#00557E' },
    17: { bg: '#19486A', text: '#FFFFFF', border: '#123A53' },
};

export default function Home({ newsArticles = [] }) {
    const articles = newsArticles.map((article) => ({
        id: article.id,
        date: article.date || article.created_at || '',
        title: article.title || 'News item',
        excerpt: article.content || '',
        image: normalizeImagePath(article.image_path || article.image),
        alt: article.article_alt_text || article.alt_text || article.title || 'News image',
        link: `/news/${article.id}`,
        sdgNumbers: typeof article.sdg_numbers === 'string' && article.sdg_numbers
            ? article.sdg_numbers.split(',').map((value) => Number(value.trim())).filter((value) => !Number.isNaN(value))
            : Array.isArray(article.sdg_numbers)
                ? article.sdg_numbers
                : [],
    }));

    useEffect(() => {
        const cleanup = initLandingAnimations();
        return cleanup;
    }, []);

    return (
        <MainLayout title="Home" showTitle={false} maxWidth="full" containerClassName="px-0" mainClassName="py-0" className="overflow-hidden pb-0">
            <div className="landing-page w-full">
                <div className="indicator"></div>

                <div id="demo">
                    {data.map((item, index) => (
                        <div
                            key={`card-${index}`}
                            className="card"
                            id={`card${index}`}
                            style={{
                                backgroundImage: `url(${item.image})`,
                            }}
                        />
                    ))}
                    {data.map((item, index) => (
                        <div
                            key={`content-${index}`}
                            className="card-content"
                            id={`card-content-${index}`}
                        >
                            <div className="content-start"></div>
                            <div className="content-place">{item.place}</div>
                            <div className="content-title-1">{item.title}</div>
                            <div className="content-title-2">{item.title2}</div>
                        </div>
                    ))}
                </div>

                <div className="details" id="details-even">
                    <div className="place-box">
                        <div className="text">City College of Cagayan de Oro</div>
                    </div>
                    <div className="title-box-1">
                        <div className="title-1">WURI</div>
                    </div>
                    <div className="title-box-2">
                        <div className="title-2">2026</div>
                    </div>
                    <div className="desc">
                        <div className="desc-line desc-bullet">• Ranked 55th worldwide for Culture/Values (B4)</div>
                        <div className="desc-line desc-bullet">• Ranked 64th worldwide for Curricular Innovation for Future-Readiness (C3)</div>
                        <div className="desc-line">This recognition reflects our commitment to transformative education and future-ready programs.</div>
                    </div>
                    <div className="cta">
                        <a className="discover" href={data[0].link || '#'} target="_blank" rel="noopener noreferrer">View Post</a>
                    </div>
                </div>

                <div className="details" id="details-odd">
                    <div className="place-box">
                        <div className="text">City College of Cagayan de Oro</div>
                    </div>
                    <div className="title-box-1">
                        <div className="title-1">WURI</div>
                    </div>
                    <div className="title-box-2">
                        <div className="title-2">2026</div>
                    </div>
                    <div className="desc">
                        <div className="desc-line desc-bullet">• Ranked 55th worldwide for Culture/Values (B4)</div>
                        <div className="desc-line desc-bullet">• Ranked 64th worldwide for Curricular Innovation for Future-Readiness (C3)</div>
                        <div className="desc-line">This recognition reflects our commitment to transformative education and future-ready programs.</div>
                    </div>
                    <div className="cta">
                        <a className="discover" href={data[0].link || '#'} target="_blank" rel="noopener noreferrer">View Post</a>
                    </div>
                </div>

                <div className="pagination" id="pagination">
                    <div className="arrow arrow-left">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M15.75 19.5L8.25 12l7.5-7.5"
                            />
                        </svg>
                    </div>
                    <div className="arrow arrow-right">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M8.25 4.5l7.5 7.5-7.5 7.5"
                            />
                        </svg>
                    </div>
                    <div className="progress-sub-container">
                        <div className="progress-sub-background">
                            <div className="progress-sub-foreground"></div>
                        </div>
                    </div>
                </div>

                <div className="cover"></div>
            </div>

            {/* --- LATEST NEWS & UPDATES SECTION --- */}
            <section className="news-section">
                <div className="news-container">
                    <div className="news-header">
                        <h2 className="news-title">
                            Latest News & Updates
                        </h2>
                        <div className="news-title-underline"></div>
                    </div>

                    <div className="news-grid">
                        {articles.length > 0 ? (
                            articles.map((news, index) => (
                                <article
                                    key={`news-${news.id || index}`}
                                    className="news-card"
                                >
                                    <div className="news-card-image-wrapper">
                                        <img
                                            src={news.image}
                                            alt={news.title}
                                            className="news-card-image"
                                        />
                                    </div>

                                    <div className="news-card-content">
                                        <div className="mb-3 flex flex-wrap gap-2">
                                            {news.sdgNumbers.length > 0 ? (
                                                news.sdgNumbers.map((sdgNumber) => {
                                                    const palette = SDG_COLORS[sdgNumber] || { bg: '#E5E7EB', text: '#111827', border: '#D1D5DB' };

                                                    return (
                                                        <span
                                                            key={`${news.id}-sdg-${sdgNumber}`}
                                                            className="inline-flex items-center rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.08em] border"
                                                            style={{
                                                                backgroundColor: palette.bg,
                                                                color: palette.text,
                                                                borderColor: palette.border,
                                                            }}
                                                        >
                                                            SDG {sdgNumber}
                                                        </span>
                                                    );
                                                })
                                            ) : (
                                                <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.08em] text-gray-500 border border-gray-200">
                                                    No SDG
                                                </span>
                                            )}
                                        </div>

                                        <p className="news-date">
                                            {news.date}
                                        </p>
                                        <h3 className="news-card-title">
                                            {news.title}
                                        </h3>
                                        <div
                                            className="news-excerpt"
                                            dangerouslySetInnerHTML={{ __html: news.excerpt.replace(/<p[^>]*>|<\/p>/gi, '') }}
                                        />
                                        <a
                                            href={news.link || '#'}
                                            className="news-read-more"
                                        >
                                            Read More
                                            <svg
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                            </svg>
                                        </a>
                                    </div>
                                </article>
                            ))
                        ) : (
                            <div className="news-empty-message">
                                No news articles are available at this time.
                            </div>
                        )}
                    </div>

                    <div className="news-view-all-wrapper">
                        <a href="/news/latest" className="news-view-all-btn">
                            View All News
                        </a>
                    </div>
                </div>
            </section>

        </MainLayout>
    );
}