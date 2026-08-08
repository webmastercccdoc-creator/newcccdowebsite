import gsap from 'gsap';
import home1 from './assets/home/1.jpg';
import home2 from './assets/home/2.jpg';
import home3 from './assets/home/3.jpg';

const data = [
    {
        place: 'City College of Cagayan de Oro',
        title: 'WURI',
        title2: '2026',
        description:
            '• Ranked 55th worldwide for Culture/Values (B4)\n• Ranked 64th worldwide for Curricular Innovation for Future-Readiness (C3)\n\nThis recognition reflects our commitment to transformative education and future-ready programs that equip learners to thrive in a rapidly evolving world.',
        image: home1,
        link: 'https://www.facebook.com/orocitycollegeofficial/posts/pfbid02dD3mNSvPohtLGY8UAePoTgps7e5pG1zXkeQD1d6T9HLqWBXbzpP8k5VzAEpzU92Vl',
    },
    {
        place: 'City College of Cagayan de Oro',
        title: 'THE',
        title2: 'SUSTAINABILITY',
        description:
            '• Overall Global Rank: 801–1000 in THE Sustainability Impact Ratings 2026\n\n• SDG 1 – No Poverty: 101–200\n• SDG 4 – Quality Education: 401–600\n• SDG 5 – Gender Equality: 401–600\n• SDG 10 – Reduced Inequalities: 301–400\n\nA testament to CCCO\'s dedication to sustainable development and social responsibility.',
        image: home2,
        link: 'https://www.facebook.com/orocitycollegeofficial/posts/pfbid0cKcRYDLhyQzPSba8oeQ4zsnmEXfM89ZwkxP7z8nihQaZgfEDxxhN2JFFEkXVWhSJl',
    },
    {
        place: 'City College of Cagayan de Oro',
        title: 'ALS',
        title2: 'BRIDGING',
        description:
            '• CCCDO, DepEd CDO, and SMART PLDT developed contextualized Learning Activity Sheets for the ALS Weekend Bridging Academy\n\n• Materials authored by experienced ALS teachers and reviewed by CCCDO faculty experts\n\n• Supports college readiness by aligning ALS competencies with higher education expectations.',
        image: home3,
        link: 'https://www.facebook.com/orocitycollegeofficial/posts/pfbid029aVv6VwWumciiB3juVk5kRzZxbSgFudTUnthJvHm7tm3JhQaPCBk67AFi9YaV8hZl',
    },
    {
        place: 'City College of Cagayan de Oro',
        title: 'PROJECT',
        title2: 'KAHANAS',
        description:
            '• An approved extension project empowering local communities through skills training and education\n\n• Facilitates partnership between the college and grassroots organizations\n\n• Demonstrates CCCO\'s commitment to community engagement and public service.',
        image: home1,
        link: '#',
    },
    {
        place: 'City College of Cagayan de Oro',
        title: 'NEW FACULTY',
        title2: 'APPOINTMENTS',
        description:
            '• Welcoming newly appointed faculty members to the College of Education\n\n• Bringing a wealth of experience, research expertise, and dedication to mentorship\n\n• Strengthening CCCO\'s capacity to deliver quality instruction across all programs.',
        image: home2,
        link: '#',
    },
];

export { data };

export function initLandingAnimations() {
    let mounted = true;
    let order = [0, 1, 2, 3, 4];
    let detailsEven = true;
    let clickQueue = [];
    let isAnimating = false;
    let prevArrowEl = null;
    let nextArrowEl = null;
    let prevArrowHandler = null;
    let nextArrowHandler = null;

    const AUTO_DELAY = 5500;
    let lastInteraction = Date.now();
    let autoAdvanceTimer = null;
    let isHovering = false;

    let offsetTop = 200;
    let offsetLeft = 700;
    let cardWidth = 160;
    let cardHeight = 240;
    let gap = 32;
    let numberSize = 40;
    const PROGRESS_WIDTH = 380;
    const ease = 'sine.inOut';

    function getCard(index) {
        return `#card${index}`;
    }
    function getCardContent(index) {
        return `#card-content-${index}`;
    }
    function getSliderItem(index) {
        return `#slide-item-${index}`;
    }

    function animate(target, duration, properties) {
        return new Promise((resolve) => {
            gsap.to(target, {
                ...properties,
                duration: duration,
                onComplete: resolve,
            });
        });
    }

    function formatDescription(text) {
        return String(text || '')
            .split('\n')
            .map((line) => {
                const trimmed = line.trim();
                if (!trimmed) return '<div class="desc-line"></div>';
                const className = trimmed.startsWith('•') ? 'desc-line desc-bullet' : 'desc-line';
                return `<div class="${className}">${trimmed}</div>`;
            })
            .join('');
    }

    function queueStep(direction) {
        if (!mounted) return;
        clickQueue.push(direction);
        lastInteraction = Date.now();
        if (!isAnimating) {
            step(clickQueue.shift());
        }
    }

    function calcDimensions() {
        const { innerHeight: height, innerWidth: width } = window;
        offsetTop = Math.max(height - 430, 120);
        offsetLeft = Math.max(width - 830, width - width * 0.55);
        if (width < 768) {
            cardWidth = 100;
            cardHeight = 150;
            gap = 16;
        } else if (width < 1024) {
            cardWidth = 130;
            cardHeight = 195;
            gap = 24;
        } else {
            cardWidth = 160;
            cardHeight = 240;
            gap = 32;
        }
    }

    function init() {
        calcDimensions();
        const [active, ...rest] = order;
        const detailsActive = detailsEven ? '#details-even' : '#details-odd';
        const detailsInactive = detailsEven ? '#details-odd' : '#details-even';
        const { innerHeight: height, innerWidth: width } = window;

        // Set initial content for the active details panel
        document.querySelector(`${detailsActive} .place-box .text`).textContent = data[order[0]].place;
        document.querySelector(`${detailsActive} .title-1`).textContent = data[order[0]].title;
        document.querySelector(`${detailsActive} .title-2`).textContent = data[order[0]].title2;
        document.querySelector(`${detailsActive} .desc`).innerHTML = formatDescription(data[order[0]].description);
        const initDiscoverBtn = document.querySelector(`${detailsActive} .discover`);
        if (initDiscoverBtn) {
            initDiscoverBtn.href = data[order[0]].link || '#';
        }

        gsap.set('#pagination', { y: 200, opacity: 0, zIndex: 60 });
        gsap.set('.cover', { x: 0 });

        gsap.set(getCard(active), {
            x: 0, y: 0,
            width: window.innerWidth, height: window.innerHeight,
        });
        gsap.set(getCardContent(active), { x: 0, y: 0, opacity: 0 });
        gsap.set(detailsActive, { opacity: 0, zIndex: 22, x: -200 });
        gsap.set(detailsInactive, { opacity: 0, zIndex: 12 });
        gsap.set(`${detailsInactive} .text`, { y: 100 });
        gsap.set(`${detailsInactive} .title-1`, { y: 100 });
        gsap.set(`${detailsInactive} .title-2`, { y: 100 });
        gsap.set(`${detailsInactive} .desc`, { y: 50 });
        gsap.set(`${detailsInactive} .cta`, { y: 60 });

        gsap.set('.progress-sub-foreground', {
            width: (PROGRESS_WIDTH * (1 / order.length)) * (active + 1),
        });

        rest.forEach((i, index) => {
            gsap.set(getCard(i), {
                x: offsetLeft + 400 + index * (cardWidth + gap),
                y: offsetTop,
                width: cardWidth,
                height: cardHeight,
                zIndex: 30,
                borderRadius: 10,
            });
            gsap.set(getCardContent(i), {
                x: offsetLeft + 400 + index * (cardWidth + gap),
                zIndex: 40,
                y: offsetTop + cardHeight - 100,
                opacity: 1,
            });
            gsap.set(getSliderItem(i), { x: (index + 1) * numberSize });
        });

        gsap.set('.indicator', { x: -window.innerWidth });

        const startDelay = 0.6;

        gsap.to('.cover', {
            x: width + 400,
            delay: 0.5,
            ease,
            onComplete: () => {
                if (!mounted) return;
                setTimeout(() => { if (mounted) loop(); }, 500);
            },
        });

        rest.forEach((i, index) => {
            gsap.to(getCard(i), {
                x: offsetLeft + index * (cardWidth + gap),
                zIndex: 30, ease, delay: startDelay,
            });
            gsap.to(getCardContent(i), {
                x: offsetLeft + index * (cardWidth + gap),
                zIndex: 40, ease, delay: startDelay,
            });
        });

        gsap.to('#pagination', { y: 0, opacity: 1, ease, delay: startDelay });
        gsap.to(detailsActive, { opacity: 1, x: 0, ease, delay: startDelay });

        prevArrowHandler = () => queueStep('prev');
        nextArrowHandler = () => queueStep('next');
        prevArrowEl = document.querySelector('.pagination .arrow-left');
        nextArrowEl = document.querySelector('.pagination .arrow-right');
        if (prevArrowEl) prevArrowEl.addEventListener('click', prevArrowHandler);
        if (nextArrowEl) nextArrowEl.addEventListener('click', nextArrowHandler);

        // Pause auto-advance on hover
        const landingEl = document.querySelector('.landing-page');
        if (landingEl) {
            landingEl.addEventListener('mouseenter', () => { isHovering = true; });
            landingEl.addEventListener('mouseleave', () => { isHovering = false; lastInteraction = Date.now(); });
        }
    }

    function step(direction = 'next') {
        return new Promise((resolve) => {
            isAnimating = true;
            if (direction === 'prev') {
                order.unshift(order.pop());
            } else {
                order.push(order.shift());
            }
            detailsEven = !detailsEven;

            const detailsActive = detailsEven ? '#details-even' : '#details-odd';
            const detailsInactive = detailsEven ? '#details-odd' : '#details-even';

            document.querySelector(`${detailsActive} .place-box .text`).textContent = data[order[0]].place;
            document.querySelector(`${detailsActive} .title-1`).textContent = data[order[0]].title;
            document.querySelector(`${detailsActive} .title-2`).textContent = data[order[0]].title2;
            document.querySelector(`${detailsActive} .desc`).innerHTML = formatDescription(data[order[0]].description);

            const discoverButton = document.querySelector(`${detailsActive} .discover`);
            if (discoverButton) {
                discoverButton.href = data[order[0]].link || '#';
                discoverButton.target = '_blank';
                discoverButton.rel = 'noopener noreferrer';
            }

            gsap.set(detailsActive, { zIndex: 22 });
            gsap.to(detailsActive, { opacity: 1, delay: 0.4, ease });
            gsap.to(`${detailsActive} .text`, { y: 0, delay: 0.1, duration: 0.7, ease });
            gsap.to(`${detailsActive} .title-1`, { y: 0, delay: 0.15, duration: 0.7, ease });
            gsap.to(`${detailsActive} .title-2`, { y: 0, delay: 0.15, duration: 0.7, ease });
            gsap.to(`${detailsActive} .desc`, { y: 0, delay: 0.3, duration: 0.4, ease });
            gsap.to(`${detailsActive} .cta`, {
                y: 0, delay: 0.35, duration: 0.4, onComplete: resolve, ease,
            });
            gsap.set(detailsInactive, { zIndex: 12 });

            const [active, ...rest] = order;
            const prv = rest[rest.length - 1];

            gsap.set(getCard(prv), { zIndex: 10 });
            gsap.set(getCard(active), { zIndex: 20 });
            gsap.to(getCard(prv), { scale: 1.5, ease });

            gsap.to(getCardContent(active), {
                y: offsetTop + cardHeight - 10, opacity: 0, duration: 0.3, ease,
            });
            gsap.to(getSliderItem(active), { x: 0, ease });
            gsap.to(getSliderItem(prv), { x: -numberSize, ease });
            gsap.to('.progress-sub-foreground', {
                width: (PROGRESS_WIDTH * (1 / order.length)) * (active + 1), ease,
            });

            gsap.to(getCard(active), {
                x: 0, y: 0, ease,
                width: window.innerWidth, height: window.innerHeight, borderRadius: 0,
                onComplete: () => {
                    if (!mounted) return;
                    calcDimensions();
                    const xNew = offsetLeft + (rest.length - 1) * (cardWidth + gap);
                    gsap.set(getCard(prv), {
                        x: xNew, y: offsetTop,
                        width: cardWidth, height: cardHeight,
                        zIndex: 30, borderRadius: 10, scale: 1,
                    });
                    gsap.set(getCardContent(prv), {
                        x: xNew, y: offsetTop + cardHeight - 100, opacity: 1, zIndex: 40,
                    });
                    gsap.set(getSliderItem(prv), { x: rest.length * numberSize });

                    gsap.set(detailsInactive, { opacity: 0 });
                    gsap.set(`${detailsInactive} .text`, { y: 100 });
                    gsap.set(`${detailsInactive} .title-1`, { y: 100 });
                    gsap.set(`${detailsInactive} .title-2`, { y: 100 });
                    gsap.set(`${detailsInactive} .desc`, { y: 50 });
                    gsap.set(`${detailsInactive} .cta`, { y: 60 });
                    isAnimating = false;
                    if (clickQueue.length > 0) {
                        step(clickQueue.shift());
                    }
                },
            });

            rest.forEach((i, index) => {
                if (i !== prv) {
                    const xNew = offsetLeft + index * (cardWidth + gap);
                    gsap.set(getCard(i), { zIndex: 30 });
                    gsap.to(getCard(i), {
                        x: xNew, y: offsetTop,
                        width: cardWidth, height: cardHeight,
                        ease, delay: 0.1 * (index + 1),
                    });
                    gsap.to(getCardContent(i), {
                        x: xNew, y: offsetTop + cardHeight - 100,
                        opacity: 1, zIndex: 40, ease, delay: 0.1 * (index + 1),
                    });
                    gsap.to(getSliderItem(i), { x: (index + 1) * numberSize, ease });
                }
            });
        });
    }

    async function loop() {
        while (isHovering && mounted) {
            await new Promise((r) => setTimeout(r, 200));
        }
        if (!mounted) return;

        const elapsed = Date.now() - lastInteraction;
        if (elapsed < AUTO_DELAY) {
            await new Promise((r) => setTimeout(r, AUTO_DELAY - elapsed));
        }
        if (!mounted) return;

        await animate('.indicator', 2, { x: 0 });
        if (!mounted) return;
        await animate('.indicator', 0.8, { x: window.innerWidth, delay: 0.3 });
        if (!mounted) return;
        gsap.set('.indicator', { x: -window.innerWidth });
        await step();
        if (mounted) loop();
    }

    function loadImage(src) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => resolve(img);
            img.onerror = reject;
            img.src = src;
        });
    }

    async function loadImages() {
        const promises = data.map(({ image }) => loadImage(image));
        return Promise.all(promises);
    }

    // ── Scroll-reveal for sections below the carousel ──
    function initScrollReveal() {
        const revealElements = document.querySelectorAll('.reveal-on-scroll');
        if (!revealElements.length) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('revealed');
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
        );

        revealElements.forEach((el) => observer.observe(el));
    }

    // ── Animate stat counters ──
    function initCountUp() {
        const counters = document.querySelectorAll('.stat-number[data-target]');
        if (!counters.length) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const el = entry.target;
                        const target = parseInt(el.getAttribute('data-target'), 10);
                        const suffix = el.getAttribute('data-suffix') || '';
                        const prefix = el.getAttribute('data-prefix') || '';
                        const duration = 1800;
                        const startTime = performance.now();

                        function tick(now) {
                            const elapsed = now - startTime;
                            const progress = Math.min(elapsed / duration, 1);
                            // ease-out cubic
                            const eased = 1 - Math.pow(1 - progress, 3);
                            const current = Math.round(eased * target);
                            el.textContent = prefix + current.toLocaleString() + suffix;
                            if (progress < 1) requestAnimationFrame(tick);
                        }
                        requestAnimationFrame(tick);
                        observer.unobserve(el);
                    }
                });
            },
            { threshold: 0.5 }
        );

        counters.forEach((c) => observer.observe(c));
    }

    async function start() {
        try {
            await loadImages();
            if (mounted) {
                init();
                // Slight delay so DOM is painted
                setTimeout(() => {
                    if (mounted) {
                        initScrollReveal();
                        initCountUp();
                    }
                }, 100);
            }
        } catch (error) {
            console.error('One or more images failed to load', error);
            if (mounted) init();
        }
    }

    start();

    return function cleanup() {
        mounted = false;
        gsap.killTweensOf(
            '.card, .card-content, .details, #pagination, .indicator, .cover, .slide-numbers .item, .progress-sub-foreground'
        );
        if (prevArrowEl && prevArrowHandler) {
            prevArrowEl.removeEventListener('click', prevArrowHandler);
        }
        if (nextArrowEl && nextArrowHandler) {
            nextArrowEl.removeEventListener('click', nextArrowHandler);
        }
    };
}