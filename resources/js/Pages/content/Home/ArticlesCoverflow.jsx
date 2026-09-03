import { useState, useEffect, useCallback, useRef, CSSProperties } from 'react';

const PERSPECTIVE = 1800;
const SCALE_STEP = 0.06;
const MAX_VISIBLE = 12;
const DEPTH = 80;

// SDG Colors mapping
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

function cssTransition(duration = 0.6, ease = 'cubic-bezier(0.22, 1, 0.36, 1)') {
    return { dur: duration, ease };
}

const stripHtmlAndTruncate = (html, maxLength = 80) => {
    if (!html) return '';
    const text = html.replace(/<[^>]*>/g, '');
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
};

export default function ArticlesCoverflow({ 
    articles = [],
    cardWidth = 260,
    cardHeight = 360,
    radius = 10,
    tilt = 0,
    sideTilt = 0,
    gap = 0,
    opacity = 20,
    autoplay = true,
    showTitle = true,
    titleColor = '#ffffff',
    style
}) {
    const isStatic = false;
    const list = articles && articles.length ? articles : [];
    const n = list.length;

    const loop = true;
    const [active, setActive] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    useEffect(() => {
        setActive((a) => Math.max(0, Math.min(n - 1, a)));
    }, [n]);

    const moveDur = 0.6;
    const lockRef = useRef(false);
    
    const lock = useCallback(() => {
        lockRef.current = true;
        window.setTimeout(() => {
            lockRef.current = false;
        }, Math.max(50, moveDur * 1000));
    }, [moveDur]);

    const step = useCallback((dir) => {
        if (lockRef.current) return;
        lock();
        setActive((a) => (((a + dir) % n) + n) % n);
    }, [n, lock]);

    const handleCardClick = useCallback(
        (i) => {
            if (isStatic || autoplay || lockRef.current) return;
            lock();
            setActive((a) => (i === a ? (a + 1) % n : i));
        },
        [isStatic, autoplay, n, lock]
    );

    // Autoplay
    useEffect(() => {
        if (isStatic || !autoplay || isPaused || n < 2) return;
        const ms = 1500;
        const dir = 1;
        const id = window.setInterval(() => step(dir), ms);
        return () => window.clearInterval(id);
    }, [isStatic, autoplay, isPaused, n, step]);

    const onKeyDown = useCallback(
        (e) => {
            if (e.key === 'ArrowRight') {
                e.preventDefault();
                step(1);
            } else if (e.key === 'ArrowLeft') {
                e.preventDefault();
                step(-1);
            }
        },
        [step]
    );

    const { dur, ease } = cssTransition(0.6);
    const transitionCss = `transform ${dur}s ${ease}, opacity ${dur}s ${ease}`;

    const effectiveRadius = (Math.max(0, Math.min(20, radius)) / 20) * (Math.min(cardWidth, cardHeight) / 2);
    const dim = 1 - Math.max(0, Math.min(100, opacity)) / 100;

    const rootStyle = {
        ...(style || {}),
        position: 'relative',
        width: '100%',
        height: '100%',
        minHeight: 450,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        perspective: `${PERSPECTIVE}px`,
        overflow: 'visible',
        outline: 'none',
        background: 'transparent',
        borderRadius: 0,
        padding: '10px 0',
    };

    if (n === 0) {
        return <div style={rootStyle}>No articles available</div>;
    }

    return (
        <div
            style={rootStyle}
            tabIndex={0}
            role="group"
            aria-roledescription="carousel"
            onKeyDown={onKeyDown}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
            <div
                style={{
                    position: 'relative',
                    width: cardWidth,
                    height: cardHeight,
                    transformStyle: 'preserve-3d',
                    background: 'transparent',
                    borderRadius: 0,
                }}
            >
                {list.map((article, i) => {
                    let rel = i - active;
                    if (loop) {
                        if (rel > n / 2) rel -= n;
                        if (rel < -n / 2) rel += n;
                    }
                    const ax = Math.abs(rel);
                    const visible = ax <= MAX_VISIBLE;
                    const isActive = rel === 0;
                    
                    // Scale: cards get smaller as they go further
                    const sc = Math.max(0.5, 1 - ax * SCALE_STEP);
                    
                    // Dynamic overlap for 12 cards
                    const maxVisible = Math.min(n, MAX_VISIBLE);
                    const overlapPercentage = 0.52; // 52% overlap for tighter spacing
                    const overlapOffset = cardWidth * overlapPercentage;
                    
                    // Reduce overlap for cards further away
                    const distanceFactor = Math.max(0.7, 1 - (ax / maxVisible) * 0.3);
                    const tx = rel * overlapOffset * distanceFactor;
                    
                    // Depth: cards go further back as they move away
                    const tz = -ax * DEPTH;
                    
                    // No rotation - straight cards
                    const ry = 0;
                    const rz = 0;
                    
                    const src = article.image || article.image_path || '';

                    const cardStyle = {
                        position: 'absolute',
                        left: '50%',
                        top: '50%',
                        width: cardWidth,
                        height: cardHeight,
                        borderRadius: effectiveRadius,
                        overflow: 'hidden',
                        transformStyle: 'preserve-3d',
                        transformOrigin: 'center center',
                        transform: `translate(-50%, -50%) translateX(${tx}px) translateZ(${tz}px) rotateY(${ry}deg) rotateZ(${rz}deg) scale(${sc})`,
                        transition: transitionCss,
                        opacity: visible ? 1 : 0,
                        cursor: autoplay || isActive ? 'default' : 'pointer',
                        pointerEvents: visible && !isStatic && !autoplay ? 'auto' : 'none',
                        backgroundColor: '#ffffff',
                        boxShadow: isActive 
                            ? '0 20px 60px rgba(0, 0, 0, 0.3)' 
                            : '0 8px 20px rgba(0, 0, 0, 0.1)',
                        zIndex: isActive ? 100 : (visible ? 100 - ax * 7 : 0),
                        border: isActive ? '3px solid rgba(212, 175, 55, 0.6)' : '1px solid rgba(0,0,0,0.05)',
                    };

                    return (
                        <div
                            key={article.id || i}
                            style={cardStyle}
                            onClick={() => handleCardClick(i)}
                            aria-label={article.title}
                            aria-hidden={!visible}
                        >
                            {/* Article Image */}
                            {src ? (
                                <div
                                    style={{
                                        position: 'absolute',
                                        inset: '0 0 auto 0',
                                        height: '65%',
                                        overflow: 'hidden',
                                        backgroundColor: '#0f172a',
                                    }}
                                >
                                    <img
                                        src={src}
                                        alt={article.alt || article.title || 'Article'}
                                        draggable={false}
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'cover',
                                            display: 'block',
                                            userSelect: 'none',
                                        }}
                                    />
                                </div>
                            ) : null}

                            {/* Gradient Overlay */}
                            <div
                                style={{
                                    position: 'absolute',
                                    inset: 0,
                                    background: 'linear-gradient(180deg, rgba(0,0,0,0.08) 0%, rgba(0,0,0,0.18) 30%, rgba(0,0,0,0.78) 100%)',
                                    pointerEvents: 'none',
                                }}
                            />

                            {/* Article Content */}
                            <div
                                style={{
                                    position: 'absolute',
                                    inset: 0,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'space-between',
                                    padding: '12px',
                                    paddingTop: src ? '10px' : '12px',
                                    pointerEvents: 'auto',
                                }}
                            >
                                {/* Top: SDG Badges */}
                                {article.sdgNumbers && article.sdgNumbers.length > 0 && (
                                    <div
                                        style={{
                                            display: 'flex',
                                            flexWrap: 'wrap',
                                            gap: '4px',
                                        }}
                                    >
                                        {article.sdgNumbers.slice(0, 2).map((sdg) => {
                                            const color = SDG_COLORS[sdg] || { bg: '#e2e8f0', text: '#0f172a', border: '#cbd5e1' };
                                            return (
                                                <span
                                                    key={`sdg-${article.id}-${sdg}`}
                                                    style={{
                                                        borderRadius: '3px',
                                                        padding: '2px 6px',
                                                        fontSize: '7px',
                                                        fontWeight: '700',
                                                        textTransform: 'uppercase',
                                                        letterSpacing: '0.12em',
                                                        backgroundColor: color.bg,
                                                        color: color.text,
                                                        border: `1px solid ${color.border}`,
                                                    }}
                                                >
                                                    SDG {sdg}
                                                </span>
                                            );
                                        })}
                                    </div>
                                )}

                                {/* Middle: Title, Excerpt, and Button */}
                                <div
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: '4px',
                                    }}
                                >
                                    {/* Title */}
                                    <div
                                        style={{
                                            color: titleColor,
                                            fontSize: isActive ? '15px' : '13px',
                                            fontWeight: '700',
                                            lineHeight: '1.2',
                                            display: '-webkit-box',
                                            WebkitLineClamp: isActive ? 2 : 1,
                                            WebkitBoxOrient: 'vertical',
                                            overflow: 'hidden',
                                            textShadow: '0 2px 10px rgba(0,0,0,0.4)',
                                        }}
                                    >
                                        {article.title}
                                    </div>

                                    {/* Excerpt - only show on active or closer cards */}
                                    {ax <= 1 && (
                                        <div
                                            style={{
                                                color: 'rgba(255, 255, 255, 0.85)',
                                                fontSize: '9px',
                                                fontWeight: '400',
                                                lineHeight: '1.3',
                                                display: '-webkit-box',
                                                WebkitLineClamp: 2,
                                                WebkitBoxOrient: 'vertical',
                                                overflow: 'hidden',
                                                textShadow: '0 1px 4px rgba(0,0,0,0.3)',
                                            }}
                                        >
                                            {stripHtmlAndTruncate(article.excerpt || article.content, 70)}
                                        </div>
                                    )}

                                    <div
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'space-between',
                                            gap: '4px',
                                            marginTop: '2px',
                                        }}
                                    >
                                        <div
                                            style={{
                                                display: 'inline-flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                background: 'rgba(15, 23, 42, 0.45)',
                                                border: '1px solid rgba(255, 255, 255, 0.18)',
                                                borderRadius: '999px',
                                                color: '#f8fafc',
                                                padding: '3px 6px',
                                                fontSize: '7px',
                                                fontWeight: '700',
                                                letterSpacing: '0.08em',
                                                textTransform: 'uppercase',
                                                lineHeight: 1.2,
                                                whiteSpace: 'nowrap',
                                            }}
                                        >
                                            {article.department || article.category || 'News'}
                                        </div>

                                        {isActive && (
                                            <a
                                                href={article.link || `/news/${article.id}`}
                                                style={{
                                                    display: 'inline-flex',
                                                    alignItems: 'center',
                                                    gap: '4px',
                                                    backgroundColor: '#059669',
                                                    color: '#ffffff',
                                                    padding: '4px 8px',
                                                    borderRadius: '3px',
                                                    fontSize: '9px',
                                                    fontWeight: '600',
                                                    textDecoration: 'none',
                                                    transition: 'all 0.3s ease',
                                                    border: 'none',
                                                    cursor: 'pointer',
                                                    pointerEvents: 'auto',
                                                    width: 'fit-content',
                                                }}
                                                onMouseOver={(e) => {
                                                    e.target.style.backgroundColor = '#047857';
                                                    e.target.style.transform = 'translateY(-1px)';
                                                }}
                                                onMouseOut={(e) => {
                                                    e.target.style.backgroundColor = '#059669';
                                                    e.target.style.transform = 'translateY(0)';
                                                }}
                                            >
                                                Read
                                                <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                    <path d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                                </svg>
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Dim Overlay for Inactive Cards */}
                            <div
                                style={{
                                    position: 'absolute',
                                    inset: 0,
                                    background: '#000000',
                                    opacity: isActive ? 0 : dim * (1 - ax * 0.02),
                                    transition: `opacity ${dur}s ${ease}`,
                                    pointerEvents: 'none',
                                }}
                            />
                        </div>
                    );
                })}
            </div>

            {/* Navigation Controls - Left and Right Sides */}
            <button
                onClick={() => step(-1)}
                style={{
                    position: 'absolute',
                    left: '5px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    backgroundColor: 'rgba(0, 0, 0, 0.6)',
                    border: '2px solid rgba(212, 175, 55, 0.8)',
                    borderRadius: '9999px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.3s ease',
                    fontSize: '18px',
                    fontWeight: '600',
                    color: '#ffffff',
                    zIndex: 200,
                    width: '40px',
                    height: '40px',
                    padding: 0,
                    backdropFilter: 'blur(4px)',
                }}
                onMouseOver={(e) => {
                    e.target.style.backgroundColor = 'rgba(212, 175, 55, 0.3)';
                    e.target.style.borderColor = '#d4af37';
                    e.target.style.transform = 'translateY(-50%) scale(1.1)';
                }}
                onMouseOut={(e) => {
                    e.target.style.backgroundColor = 'rgba(0, 0, 0, 0.6)';
                    e.target.style.borderColor = 'rgba(212, 175, 55, 0.8)';
                    e.target.style.transform = 'translateY(-50%) scale(1)';
                }}
                aria-label="Previous article"
            >
                ←
            </button>
                
            <button
                onClick={() => step(1)}
                style={{
                    position: 'absolute',
                    right: '5px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    backgroundColor: 'rgba(0, 0, 0, 0.6)',
                    border: '2px solid rgba(212, 175, 55, 0.8)',
                    borderRadius: '9999px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.3s ease',
                    fontSize: '18px',
                    fontWeight: '600',
                    color: '#ffffff',
                    zIndex: 200,
                    width: '40px',
                    height: '40px',
                    padding: 0,
                    backdropFilter: 'blur(4px)',
                }}
                onMouseOver={(e) => {
                    e.target.style.backgroundColor = 'rgba(212, 175, 55, 0.3)';
                    e.target.style.borderColor = '#d4af37';
                    e.target.style.transform = 'translateY(-50%) scale(1.1)';
                }}
                onMouseOut={(e) => {
                    e.target.style.backgroundColor = 'rgba(0, 0, 0, 0.6)';
                    e.target.style.borderColor = 'rgba(212, 175, 55, 0.8)';
                    e.target.style.transform = 'translateY(-50%) scale(1)';
                }}
                aria-label="Next article"
            >
                →
            </button>

            {/* Dot Indicators */}
            {n > 1 && (
                <div
                    style={{
                        position: 'absolute',
                        bottom: '5px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        display: 'flex',
                        gap: '6px',
                        zIndex: 200,
                        flexWrap: 'wrap',
                        justifyContent: 'center',
                        maxWidth: '80%',
                    }}
                >
                    {list.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => {
                                const diff = i - active;
                                if (diff > 0) step(1);
                                else if (diff < 0) step(-1);
                            }}
                            style={{
                                width: i === active ? '20px' : '6px',
                                height: '6px',
                                borderRadius: '3px',
                                border: 'none',
                                backgroundColor: i === active ? '#d4af37' : 'rgba(255, 255, 255, 0.4)',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease',
                                padding: 0,
                            }}
                            aria-label={`Go to article ${i + 1}`}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}