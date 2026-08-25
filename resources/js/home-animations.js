import gsap from 'gsap';

export function initLandingAnimations(slides = []) {
    let mounted = true;
    const slideData = slides;
    if (slideData.length === 0) return () => {};
    let order = slideData.map((_, index) => index);
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

    function setCardImage(index, isActive) {
        const card = document.querySelector(getCard(index));
        if (card) card.style.backgroundImage = `url(${isActive ? slideData[index].bannerImage : slideData[index].image})`;
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
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
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
        } else if (width < 900) {
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
        document.querySelector(`${detailsActive} .place-box .text`).textContent = slideData[order[0]].place;
        document.querySelector(`${detailsActive} .title-1`).textContent = slideData[order[0]].title;
        document.querySelector(`${detailsActive} .title-2`).textContent = slideData[order[0]].title2;
        document.querySelector(`${detailsActive} .desc`).innerHTML = formatDescription(slideData[order[0]].description);
        const initDiscoverBtn = document.querySelector(`${detailsActive} .discover`);
        if (initDiscoverBtn) {
            initDiscoverBtn.href = slideData[order[0]].link || '#';
        }

        gsap.set('#pagination', { y: 200, opacity: 0, zIndex: 60 });
        gsap.set('.cover', { x: 0 });

        gsap.set(getCard(active), {
            x: 0, y: 0,
            width: window.innerWidth, height: window.innerHeight,
        });
        setCardImage(active, true);
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
            setCardImage(i, false);
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

            document.querySelector(`${detailsActive} .place-box .text`).textContent = slideData[order[0]].place;
            document.querySelector(`${detailsActive} .title-1`).textContent = slideData[order[0]].title;
            document.querySelector(`${detailsActive} .title-2`).textContent = slideData[order[0]].title2;
            document.querySelector(`${detailsActive} .desc`).innerHTML = formatDescription(slideData[order[0]].description);

            const discoverButton = document.querySelector(`${detailsActive} .discover`);
            if (discoverButton) {
                discoverButton.href = slideData[order[0]].link || '#';
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

            setCardImage(active, true);

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
                    setCardImage(prv, false);
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
        const promises = slideData.flatMap(({ image, bannerImage }) => [image, bannerImage].map(loadImage));
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