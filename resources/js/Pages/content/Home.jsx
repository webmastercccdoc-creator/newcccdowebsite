import { useEffect } from 'react';
import MainLayout from '../../layouts/MainLayout';
import '../../../css/home.css';
import { initLandingAnimations, data } from '../../home-animations';

const normalizeImagePath = (value) => {
    if (!value) return 'https://placehold.co/600x400/1e3a8a/ffffff?text=No+Image';
    if (/^https?:\/\//i.test(value) || value.startsWith('data:')) return value;

    return '/' + value.replace(/^\/+/, '');
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
                                        <p className="news-date">
                                            {news.date}
                                        </p>
                                        <h3 className="news-card-title">
                                            {news.title}
                                        </h3>
                                        <p className="news-excerpt">
                                            {news.excerpt}
                                        </p>
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

            {/* --- VISIT OUR CAMPUS SECTION --- */}
            <section className="visit-campus-section">
                <div className="visit-campus-container">
                    <div className="visit-campus-header">
                        <h2 className="visit-campus-title">Visit Our Campus</h2>
                        <div className="visit-campus-underline"></div>
                    </div>

                    <div className="visit-campus-grid">
                        {/* Map Embed */}
                        <div className="map-embed-wrapper">
                            <iframe
                                src="https://www.google.com/maps?q=City+College+of+Cagayan+de+Oro&output=embed"
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title="CCCO Location Map"
                            ></iframe>
                        </div>

                        {/* Contact Info */}
                        <div className="campus-info-wrapper">
                            <div className="contact-list">
                                <div className="contact-item">
                                    <div className="contact-icon">
                                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                    </div>
                                    <div className="contact-text">
                                        <h4>Address</h4>
                                        <p>Vamenta Boulevard, Carmen, Cagayan de Oro City, Misamis Oriental, Philippines</p>
                                    </div>
                                </div>

                                <div className="contact-item">
                                    <div className="contact-icon">
                                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                        </svg>
                                    </div>
                                    <div className="contact-text">
                                        <h4>Contact Numbers</h4>
                                        <p>(088) 857 1234<br />(088) 857 5678</p>
                                    </div>
                                </div>

                                <div className="contact-item">
                                    <div className="contact-icon">
                                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <div className="contact-text">
                                        <h4>Office Hours</h4>
                                        <p>Monday - Friday: 8:00 AM - 5:00 PM<br />Saturday: 8:00 AM - 12:00 PM</p>
                                    </div>
                                </div>
                            </div>

                            <a
                                href="https://www.google.com/maps/dir/?api=1&destination=City+College+of+Cagayan+de+Oro"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="get-directions-btn"
                            >
                                Get Directions
                                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>
            </section>

        </MainLayout>
    );
}