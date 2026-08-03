import gsap from 'gsap';

const data = [
    {
        place: 'Switzerland Alps',
        title: 'SAINT',
        title2: 'ANTONIEN',
        description:
            "Tucked away in the Switzerland Alps, Saint Antönien offers an idyllic retreat for those seeking tranquility and adventure alike. It's a hidden gem for backcountry skiing in winter and boasts lush trails for hiking and mountain biking during the warmer months.",
        image: '/storage/1.jpg',
    },
    {
        place: 'Japan Alps',
        title: 'NANGANO',
        title2: 'PREFECTURE',
        description:
            "Nagano Prefecture, set within the majestic Japan Alps, is a cultural treasure trove with its historic shrines and temples, particularly the famous Zenkō-ji. The region is also a hotspot for skiing and snowboarding, offering some of the country's best powder.",
        image: '/storage/2.jpg',
    },
    {
        place: 'Sahara Desert - Morocco',
        title: 'MARRAKECH',
        title2: 'MEROUGA',
        description:
            'The journey from the vibrant souks and palaces of Marrakech to the tranquil, starlit sands of Merzouga showcases the diverse splendor of Morocco. Camel treks and desert camps offer an unforgettable immersion into the nomadic way of life.',
        image: '/storage/3.jpg',
    },
    {
        place: 'Sierra Nevada - USA',
        title: 'YOSEMITE',
        title2: 'NATIONAL PARAK',
        description:
            'Yosemite National Park is a showcase of the American wilderness, revered for its towering granite monoliths, ancient giant sequoias, and thundering waterfalls. The park offers year-round recreational activities, from rock climbing to serene valley walks.',
        image: '/storage/1.jpg',
    },
    {
        place: 'Tarifa - Spain',
        title: 'LOS LANCES',
        title2: 'BEACH',
        description:
            "Los Lances Beach in Tarifa is a coastal paradise known for its consistent winds, making it a world-renowned spot for kitesurfing and windsurfing. The beach's long, sandy shores provide ample space for relaxation and sunbathing, with a vibrant atmosphere of beach bars and cafes.",
        image: '/storage/2.jpg',
    },
    {
        place: 'Cappadocia - Turkey',
        title: 'Göreme',
        title2: 'Valley',
        description:
            'Göreme Valley in Cappadocia is a historical marvel set against a unique geological backdrop, where centuries of wind and water have sculpted the landscape into whimsical formations. The valley is also famous for its open-air museums, underground cities, and the enchanting experience of hot air ballooning.',
        image: '/storage/3.jpg',
    },
];

export { data };

export function initLandingAnimations() {
    let mounted = true;
    let order = [0, 1, 2, 3, 4, 5];
    let detailsEven = true;
    let clickQueue = [];
    let isAnimating = false;
    let prevArrowEl = null;
    let nextArrowEl = null;
    let prevArrowHandler = null;
    let nextArrowHandler = null;
    // Auto-advance timing: clicking pagination resets this timer
    const AUTO_DELAY = 5000; // milliseconds
    let lastInteraction = Date.now();

    let offsetTop = 200;
    let offsetLeft = 700;
    // Reduced sizes so surrounding main content has more room
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

    function queueStep(direction) {
        if (!mounted) return;
        clickQueue.push(direction);
        // reset auto-advance timer when user interacts
        lastInteraction = Date.now();
        if (!isAnimating) {
            step(clickQueue.shift());
        }
    }

    function init() {
        const [active, ...rest] = order;
        const detailsActive = detailsEven
            ? '#details-even'
            : '#details-odd';
        const detailsInactive = detailsEven
            ? '#details-odd'
            : '#details-even';
        const { innerHeight: height, innerWidth: width } = window;
        offsetTop = height - 430;
        offsetLeft = width - 830;

        // Keep pagination centered via CSS; only set initial Y and opacity for entrance animation
        gsap.set('#pagination', {
            y: 200,
            opacity: 0,
            zIndex: 60,
        });
        gsap.set('nav', { y: -200, opacity: 0 });

        gsap.set(getCard(active), {
            x: 0,
            y: 0,
            width: window.innerWidth,
            height: window.innerHeight,
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
                setTimeout(() => {
                    if (mounted) loop();
                }, 500);
            },
        });
        rest.forEach((i, index) => {
            gsap.to(getCard(i), {
                x: offsetLeft + index * (cardWidth + gap),
                zIndex: 30,
                ease,
                delay: startDelay,
            });
            gsap.to(getCardContent(i), {
                x: offsetLeft + index * (cardWidth + gap),
                zIndex: 40,
                ease,
                delay: startDelay,
            });
        });
        gsap.to('#pagination', { y: 0, opacity: 1, ease, delay: startDelay });
        gsap.to('nav', { y: 0, opacity: 1, ease, delay: startDelay });
        gsap.to(detailsActive, { opacity: 1, x: 0, ease, delay: startDelay });

        prevArrowHandler = () => queueStep('prev');
        nextArrowHandler = () => queueStep('next');
        prevArrowEl = document.querySelector('.pagination .arrow-left');
        nextArrowEl = document.querySelector('.pagination .arrow-right');
        if (prevArrowEl) {
            prevArrowEl.addEventListener('click', prevArrowHandler);
        }
        if (nextArrowEl) {
            nextArrowEl.addEventListener('click', nextArrowHandler);
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

            const detailsActive = detailsEven
                ? '#details-even'
                : '#details-odd';
            const detailsInactive = detailsEven
                ? '#details-odd'
                : '#details-even';

            document.querySelector(
                `${detailsActive} .place-box .text`
            ).textContent = data[order[0]].place;
            document.querySelector(`${detailsActive} .title-1`).textContent =
                data[order[0]].title;
            document.querySelector(`${detailsActive} .title-2`).textContent =
                data[order[0]].title2;
            document.querySelector(`${detailsActive} .desc`).textContent =
                data[order[0]].description;

            gsap.set(detailsActive, { zIndex: 22 });
            gsap.to(detailsActive, { opacity: 1, delay: 0.4, ease });
            gsap.to(`${detailsActive} .text`, {
                y: 0,
                delay: 0.1,
                duration: 0.7,
                ease,
            });
            gsap.to(`${detailsActive} .title-1`, {
                y: 0,
                delay: 0.15,
                duration: 0.7,
                ease,
            });
            gsap.to(`${detailsActive} .title-2`, {
                y: 0,
                delay: 0.15,
                duration: 0.7,
                ease,
            });
            gsap.to(`${detailsActive} .desc`, {
                y: 0,
                delay: 0.3,
                duration: 0.4,
                ease,
            });
            gsap.to(`${detailsActive} .cta`, {
                y: 0,
                delay: 0.35,
                duration: 0.4,
                onComplete: resolve,
                ease,
            });
            gsap.set(detailsInactive, { zIndex: 12 });

            const [active, ...rest] = order;
            const prv = rest[rest.length - 1];

            gsap.set(getCard(prv), { zIndex: 10 });
            gsap.set(getCard(active), { zIndex: 20 });
            gsap.to(getCard(prv), { scale: 1.5, ease });

            gsap.to(getCardContent(active), {
                y: offsetTop + cardHeight - 10,
                opacity: 0,
                duration: 0.3,
                ease,
            });
            gsap.to(getSliderItem(active), { x: 0, ease });
            gsap.to(getSliderItem(prv), { x: -numberSize, ease });
            gsap.to('.progress-sub-foreground', {
                width: (PROGRESS_WIDTH * (1 / order.length)) * (active + 1),
                ease,
            });

            gsap.to(getCard(active), {
                x: 0,
                y: 0,
                ease,
                width: window.innerWidth,
                height: window.innerHeight,
                borderRadius: 0,
                onComplete: () => {
                    if (!mounted) return;

                    const xNew =
                        offsetLeft + (rest.length - 1) * (cardWidth + gap);
                    gsap.set(getCard(prv), {
                        x: xNew,
                        y: offsetTop,
                        width: cardWidth,
                        height: cardHeight,
                        zIndex: 30,
                        borderRadius: 10,
                        scale: 1,
                    });

                    gsap.set(getCardContent(prv), {
                        x: xNew,
                        y: offsetTop + cardHeight - 100,
                        opacity: 1,
                        zIndex: 40,
                    });
                    gsap.set(getSliderItem(prv), {
                        x: rest.length * numberSize,
                    });

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
                        x: xNew,
                        y: offsetTop,
                        width: cardWidth,
                        height: cardHeight,
                        ease,
                        delay: 0.1 * (index + 1),
                    });

                    gsap.to(getCardContent(i), {
                        x: xNew,
                        y: offsetTop + cardHeight - 100,
                        opacity: 1,
                        zIndex: 40,
                        ease,
                        delay: 0.1 * (index + 1),
                    });
                    gsap.to(getSliderItem(i), {
                        x: (index + 1) * numberSize,
                        ease,
                    });
                }
            });
        });
    }

    async function loop() {
        // wait so auto-advance respects user interaction
        const elapsed = Date.now() - lastInteraction;
        if (elapsed < AUTO_DELAY) {
            await new Promise((resolve) => setTimeout(resolve, AUTO_DELAY - elapsed));
        }
        if (!mounted) return;
        await animate('.indicator', 2, { x: 0 });
        if (!mounted) return;
        await animate('.indicator', 0.8, {
            x: window.innerWidth,
            delay: 0.3,
        });
        if (!mounted) return;
        gsap.set('.indicator', { x: -window.innerWidth });
        await step();
        if (mounted) loop();
    }

    function loadImage(src) {
        return new Promise((resolve, reject) => {
            let img = new Image();
            img.onload = () => resolve(img);
            img.onerror = reject;
            img.src = src;
        });
    }

    async function loadImages() {
        const promises = data.map(({ image }) => loadImage(image));
        return Promise.all(promises);
    }

    async function start() {
        try {
            await loadImages();
            if (mounted) init();
        } catch (error) {
            console.error('One or more images failed to load', error);
        }
    }

    start();

    return function cleanup() {
        mounted = false;
        gsap.killTweensOf(
            '.card, .card-content, .details, #pagination, nav, .indicator, .cover, .slide-numbers .item, .progress-sub-foreground'
        );
        if (prevArrowEl && prevArrowHandler) {
            prevArrowEl.removeEventListener('click', prevArrowHandler);
        }
        if (nextArrowEl && nextArrowHandler) {
            nextArrowEl.removeEventListener('click', nextArrowHandler);
        }
    };
}