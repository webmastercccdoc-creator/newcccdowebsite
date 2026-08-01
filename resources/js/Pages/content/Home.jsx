import { useEffect } from 'react';
import MainLayout from '../../layouts/MainLayout';
import '../../../css/home.css';
import { initLandingAnimations, data } from '../../home-animations';

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
                        <div className="text">Switzerland Alps</div>
                    </div>
                    <div className="title-box-1">
                        <div className="title-1">SAINT</div>
                    </div>
                    <div className="title-box-2">
                        <div className="title-2">ANTONIEN</div>
                    </div>
                    <div className="desc">
                        Tucked away in the Switzerland Alps, Saint Antönien
                        offers an idyllic retreat for those seeking tranquility
                        and adventure alike. It's a hidden gem for backcountry
                        skiing in winter and boasts lush trails for hiking and
                        mountain biking during the warmer months.
                    </div>
                    <div className="cta">
                        <button className="bookmark">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M6.32 2.577a49.255 49.255 0 0111.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 01-1.085.67L12 18.089l-7.165 3.583A.75.75 0 013.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </button>
                        <button className="discover">Discover Location</button>
                    </div>
                </div>

                <div className="details" id="details-odd">
                    <div className="place-box">
                        <div className="text">Switzerland Alps</div>
                    </div>
                    <div className="title-box-1">
                        <div className="title-1">SAINT </div>
                    </div>
                    <div className="title-box-2">
                        <div className="title-2">ANTONIEN</div>
                    </div>
                    <div className="desc">
                        Tucked away in the Switzerland Alps, Saint Antönien
                        offers an idyllic retreat for those seeking tranquility
                        and adventure alike. It's a hidden gem for backcountry
                        skiing in winter and boasts lush trails for hiking and
                        mountain biking during the warmer months.
                    </div>
                    <div className="cta">
                        <button className="bookmark">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M6.32 2.577a49.255 49.255 0 0111.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 01-1.085.67L12 18.089l-7.165 3.583A.75.75 0 013.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </button>
                        <button className="discover">Discover Location</button>
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
                    <div className="slide-numbers" id="slide-numbers">
                        {data.map((_, index) => (
                            <div
                                key={`slide-${index}`}
                                className="item"
                                id={`slide-item-${index}`}
                            >
                                {index + 1}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="cover"></div>
            </div>
        </MainLayout>
    );
}