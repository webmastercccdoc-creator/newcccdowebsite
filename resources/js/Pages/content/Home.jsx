import { useEffect } from 'react';
import MainLayout from '../../layouts/MainLayout';
import '../../../css/home.css';
import { initLandingAnimations, data } from '../../home-animations';

// Mock data for the News & Updates section
const newsData = [
    {
        date: "November 20, 2024",
        title: "Approved Extension Project: Project KAHANAS",
        excerpt: "The college proudly announces the approval of Project KAHANAS, an initiative aimed at empowering local communities through skills training and education.",
        image: "https://placehold.co/600x400/1e3a8a/ffffff?text=Project+KAHANAS"
    },
    {
        date: "November 15, 2024",
        title: "Office of the Curriculum and Instruction Kicks Off Five-Day Training",
        excerpt: "The OCI has officially started a comprehensive five-day training program for faculty members to enhance instructional methodologies.",
        image: "https://placehold.co/600x400/059669/ffffff?text=OCI+Training"
    },
    {
        date: "November 10, 2024",
        title: "General Parents-Teachers Assembly (GPTA) Successfully Held",
        excerpt: "CCCO held its annual GPTA meeting, fostering a strong partnership between parents and teachers to support student success.",
        image: "https://placehold.co/600x400/d97706/ffffff?text=GPTA+Assembly"
    },
    {
        date: "November 05, 2024",
        title: "New Faculty Appointments for the College of Education",
        excerpt: "We welcome the newly appointed faculty members to the College of Education who bring a wealth of experience and dedication.",
        image: "https://placehold.co/600x400/db2777/ffffff?text=Faculty+Appointments"
    },
    {
        date: "October 28, 2024",
        title: "CCCO Ranked in WURI 2024 for Future-Readiness",
        excerpt: "Recognized globally for innovative curricular approaches and cultural values that prepare students for future challenges.",
        image: "https://placehold.co/600x400/7c3aed/ffffff?text=WURI+2024"
    },
    {
        date: "October 20, 2024",
        title: "Student Achievers Recognized at Annual Awards Day",
        excerpt: "Outstanding students from various departments were honored for their academic excellence and extracurricular contributions.",
        image: "https://placehold.co/600x400/2563eb/ffffff?text=Awards+Day"
    }
];

export default function Home() {
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
                        {newsData.map((news, index) => (
                            <article
                                key={`news-${index}`}
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
                                        href="#"
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
                        ))}
                    </div>

                    <div className="news-view-all-wrapper">
                        <button className="news-view-all-btn">
                            View All News
                        </button>
                    </div>
                </div>
            </section>

            {/* --- QUICK LINKS / SYSTEMS SECTION --- */}
            <section className="quick-links-section">
                <div className="quick-links-container">
                    <div className="quick-links-header">
                        <h2 className="quick-links-title">Student & Faculty Systems</h2>
                        <p className="quick-links-subtitle">Quick access to essential CCCO platforms and resources.</p>
                    </div>

                    <div className="quick-links-grid">
                        {/* Attendium */}
                        <a href="https://attendium.citycollegecdo.edu.ph/" target="_blank" rel="noopener noreferrer" className="quick-link-card">
                            <div className="ql-icon-wrapper">
                                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h3 className="ql-title">Attendium</h3>
                            <p className="ql-desc">Track and manage student attendance efficiently.</p>
                        </a>

                        {/* AIMS */}
                        <a href="https://aims.citycollegecdo.edu.ph/" target="_blank" rel="noopener noreferrer" className="quick-link-card">
                            <div className="ql-icon-wrapper">
                                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                            </div>
                            <h3 className="ql-title">AIMS</h3>
                            <p className="ql-desc">Academic Information Management System for records and enrollment.</p>
                        </a>

                        {/* Courseware */}
                        <a href="https://courseware.citycollegecdo.edu.ph/" target="_blank" rel="noopener noreferrer" className="quick-link-card">
                            <div className="ql-icon-wrapper">
                                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                </svg>
                            </div>
                            <h3 className="ql-title">Courseware</h3>
                            <p className="ql-desc">Access online learning materials, assignments, and classes.</p>
                        </a>

                        {/* Smartchive */}
                        <a href="https://smartchive.citycollegecdo.edu.ph/" target="_blank" rel="noopener noreferrer" className="quick-link-card">
                            <div className="ql-icon-wrapper">
                                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                                </svg>
                            </div>
                            <h3 className="ql-title">Smartchive</h3>
                            <p className="ql-desc">Digital archive for institutional documents and records.</p>
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