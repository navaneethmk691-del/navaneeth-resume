/* =========================================================
   VOIDSPOKEN
   ANIME / VOID INTERACTION SYSTEM
   HTML CHANGES NOT REQUIRED
   ========================================================= */

(() => {
    "use strict";

    /* =====================================================
       CONFIG
       ===================================================== */

    const CONFIG = {
        introSound: "intro.mp3",
        hoverSound: "hover.mp3",

        introVolume: 0.35,
        hoverVolume: 0.08,

        introDuration: 4200,

        rippleDuration: 700,
        glitchInterval: 5000,

        particleCount: 45,

        enableHaptics: true
    };


    /* =====================================================
       STATE
       ===================================================== */

    let introPlaying = true;
    let introFinished = false;

    let mouseX = 0;
    let mouseY = 0;

    let targetX = 0;
    let targetY = 0;

    let voidSequence = "";
    let longPressTimer = null;

    const VOID_CODE = "void";

    const reducedMotion =
        window.matchMedia &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const touchDevice =
        "ontouchstart" in window ||
        navigator.maxTouchPoints > 0;


    /* =====================================================
       HELPERS
       ===================================================== */

    function playSound(audio) {
        if (!audio) return;

        try {
            audio.currentTime = 0;

            const promise = audio.play();

            if (promise) {
                promise.catch(() => {});
            }
        } catch (error) {}
    }


    function vibrate(amount = 15) {
        if (
            CONFIG.enableHaptics &&
            navigator.vibrate
        ) {
            navigator.vibrate(amount);
        }
    }


    /* =====================================================
       AUDIO
       ===================================================== */

    const introSound =
        document.createElement("audio");

    introSound.src =
        CONFIG.introSound;

    introSound.preload = "auto";
    introSound.volume =
        CONFIG.introVolume;

    introSound.setAttribute(
        "playsinline",
        ""
    );


    const hoverSound =
        document.createElement("audio");

    hoverSound.src =
        CONFIG.hoverSound;

    hoverSound.preload = "auto";
    hoverSound.volume =
        CONFIG.hoverVolume;

    hoverSound.setAttribute(
        "playsinline",
        ""
    );


    document.body.appendChild(
        introSound
    );

    document.body.appendChild(
        hoverSound
    );


    /* =====================================================
       INTRO
       ===================================================== */

    const intro =
        document.createElement("div");

    intro.id =
        "void-intro";


    intro.innerHTML = `
        <div class="void-intro-grid"></div>

        <div class="void-energy-ring ring-one"></div>
        <div class="void-energy-ring ring-two"></div>
        <div class="void-energy-ring ring-three"></div>

        <div class="void-intro-content">

            <div class="void-intro-symbol">
                ◈
            </div>

            <div class="void-intro-title">
                VOIDSPOKEN
            </div>

            <div class="void-intro-subtitle">
                ENTER THE VOID
            </div>

            <div class="void-intro-status">
                SYSTEM INITIALIZING...
            </div>

        </div>
    `;


    document.body.appendChild(
        intro
    );

    document.body.classList.add(
        "void-intro-active"
    );


    /* =====================================================
       INTRO AUDIO
       ===================================================== */

    function finishIntro() {

        if (introFinished) return;

        introFinished = true;
        introPlaying = false;

        intro.classList.add(
            "void-intro-out"
        );

        document.body.classList.remove(
            "void-intro-active"
        );


        setTimeout(() => {

            intro.remove();

        }, 1400);
    }


    window.addEventListener(
        "load",
        () => {

            playSound(
                introSound
            );

            setTimeout(
                finishIntro,
                CONFIG.introDuration
            );

        }
    );


    introSound.addEventListener(
        "ended",
        () => {
            introPlaying = false;
        }
    );


    /* =====================================================
       NAVIGATION
       ===================================================== */

    const navLinks =
        [...document.querySelectorAll(
            "nav a"
        )];


    navLinks.forEach(link => {

        link.addEventListener(
            "pointerenter",
            event => {

                if (introPlaying) return;

                if (
                    event.pointerType ===
                    "mouse"
                ) {
                    playSound(
                        hoverSound
                    );
                }

            }
        );


        link.addEventListener(
            "pointerdown",
            event => {

                if (introPlaying) return;

                playSound(
                    hoverSound
                );

                if (
                    event.pointerType ===
                    "touch"
                ) {
                    vibrate(15);
                }

            }
        );


        link.addEventListener(
            "click",
            event => {

                const href =
                    link.getAttribute(
                        "href"
                    );


                if (
                    !href ||
                    !href.startsWith("#") ||
                    href === "#"
                ) {
                    return;
                }


                const target =
                    document.querySelector(
                        href
                    );


                if (!target) return;


                event.preventDefault();


                createSlashEffect();


                target.scrollIntoView({
                    behavior:
                        reducedMotion
                            ? "auto"
                            : "smooth"
                });

            }
        );

    });


    /* =====================================================
       TOUCH RIPPLE
       ===================================================== */

    document.addEventListener(
        "pointerdown",
        event => {

            if (introPlaying) return;

            if (
                event.target.closest(
                    "input, textarea, select"
                )
            ) {
                return;
            }


            createRipple(
                event.clientX,
                event.clientY
            );

        }
    );


    function createRipple(x, y) {

        const ripple =
            document.createElement(
                "div"
            );


        ripple.className =
            "void-ripple";


        ripple.style.left =
            `${x}px`;

        ripple.style.top =
            `${y}px`;


        document.body.appendChild(
            ripple
        );


        setTimeout(() => {

            ripple.remove();

        }, CONFIG.rippleDuration);

    }


    /* =====================================================
       SLASH TRANSITION
       ===================================================== */

    function createSlashEffect() {

        if (reducedMotion) return;


        const slash =
            document.createElement(
                "div"
            );


        slash.className =
            "void-slash";


        document.body.appendChild(
            slash
        );


        setTimeout(() => {

            slash.remove();

        }, 650);

    }


    /* =====================================================
       MOUSE ENERGY CURSOR
       ===================================================== */

    if (
        !touchDevice &&
        !reducedMotion
    ) {

        const cursor =
            document.createElement(
                "div"
            );

        cursor.className =
            "void-cursor";


        const cursorCore =
            document.createElement(
                "div"
            );

        cursorCore.className =
            "void-cursor-core";


        document.body.appendChild(
            cursor
        );

        document.body.appendChild(
            cursorCore
        );


        document.addEventListener(
            "pointermove",
            event => {

                if (
                    event.pointerType !==
                    "mouse"
                ) {
                    return;
                }


                mouseX =
                    event.clientX;

                mouseY =
                    event.clientY;

            }
        );


        function animateCursor() {

            targetX +=
                (mouseX - targetX) *
                0.18;

            targetY +=
                (mouseY - targetY) *
                0.18;


            cursor.style.transform =
                `translate(
                    ${targetX}px,
                    ${targetY}px
                )`;


            cursorCore.style.transform =
                `translate(
                    ${mouseX}px,
                    ${mouseY}px
                )`;


            requestAnimationFrame(
                animateCursor
            );

        }


        animateCursor();

    }


    /* =====================================================
       PARTICLE SYSTEM
       ===================================================== */

    if (!reducedMotion) {

        const particleContainer =
            document.createElement(
                "div"
            );


        particleContainer.id =
            "void-particles";


        document.body.appendChild(
            particleContainer
        );


        for (
            let i = 0;
            i < CONFIG.particleCount;
            i++
        ) {

            createParticle(
                particleContainer
            );

        }

    }


    function createParticle(
        container
    ) {

        const particle =
            document.createElement(
                "span"
            );


        particle.className =
            "void-particle";


        const size =
            Math.random() * 3 + 1;

        const left =
            Math.random() * 100;

        const duration =
            Math.random() * 8 + 5;

        const delay =
            Math.random() * 8;


        particle.style.width =
            `${size}px`;

        particle.style.height =
            `${size}px`;

        particle.style.left =
            `${left}%`;

        particle.style.animationDuration =
            `${duration}s`;

        particle.style.animationDelay =
            `${delay}s`;


        container.appendChild(
            particle
        );

    }


    /* =====================================================
       SCROLL REVEAL
       ===================================================== */

    const revealElements =
        document.querySelectorAll(
            "main section, article, .card, .project, .project-card"
        );


    if (!reducedMotion) {

        revealElements.forEach(
            element => {

                element.classList.add(
                    "void-reveal"
                );

            }
        );


        if (
            "IntersectionObserver"
            in window
        ) {

            const revealObserver =
                new IntersectionObserver(
                    entries => {

                        entries.forEach(
                            entry => {

                                if (
                                    !entry.isIntersecting
                                ) {
                                    return;
                                }


                                entry.target.classList.add(
                                    "void-visible"
                                );


                                revealObserver.unobserve(
                                    entry.target
                                );

                            }
                        );

                    },
                    {
                        threshold: 0.12
                    }
                );


            revealElements.forEach(
                element => {

                    revealObserver.observe(
                        element
                    );

                }
            );

        }

    }


    /* =====================================================
       CARD TILT
       ===================================================== */

    if (
        !touchDevice &&
        !reducedMotion
    ) {

        const cards =
            document.querySelectorAll(
                ".card, .project, .project-card"
            );


        cards.forEach(card => {

            card.addEventListener(
                "pointermove",
                event => {

                    const rect =
                        card.getBoundingClientRect();


                    const x =
                        event.clientX -
                        rect.left;


                    const y =
                        event.clientY -
                        rect.top;


                    const rotateY =
                        ((x / rect.width) - 0.5) *
                        8;


                    const rotateX =
                        ((y / rect.height) - 0.5) *
                        -8;


                    card.style.transform =
                        `
                        perspective(700px)
                        rotateX(${rotateX}deg)
                        rotateY(${rotateY}deg)
                        translateY(-4px)
                        `;

                }
            );


            card.addEventListener(
                "pointerleave",
                () => {

                    card.style.transform =
                        "";

                }
            );

        });

    }


    /* =====================================================
       TITLE GLITCH
       ===================================================== */

    const title =
        document.querySelector(
            "h1"
        );


    if (
        title &&
        !reducedMotion
    ) {

        setInterval(
            () => {

                title.classList.add(
                    "void-glitch"
                );


                setTimeout(
                    () => {

                        title.classList.remove(
                            "void-glitch"
                        );

                    },
                    300
                );

            },
            CONFIG.glitchInterval
        );

    }


    /* =====================================================
       ACTIVE NAVIGATION
       ===================================================== */

    const sections =
        document.querySelectorAll(
            "main section"
        );


    if (
        "IntersectionObserver"
        in window
    ) {

        const navigationObserver =
            new IntersectionObserver(
                entries => {

                    entries.forEach(
                        entry => {

                            if (
                                !entry.isIntersecting
                            ) {
                                return;
                            }


                            const id =
                                entry.target.id;


                            navLinks.forEach(
                                link => {

                                    link.classList.toggle(
                                        "active",
                                        link.getAttribute(
                                            "href"
                                        ) ===
                                        `#${id}`
                                    );

                                }
                            );

                        }
                    );

                },
                {
                    rootMargin:
                        "-40% 0px -50% 0px"
                }
            );


        sections.forEach(
            section => {

                navigationObserver.observe(
                    section
                );

            }
        );

    }


    /* =====================================================
       SCROLL PROGRESS
       ===================================================== */

    const progress =
        document.createElement(
            "div"
        );


    progress.id =
        "void-progress";


    document.body.appendChild(
        progress
    );


    function updateProgress() {

        const scroll =
            window.scrollY;


        const height =
            document.documentElement
                .scrollHeight -
            window.innerHeight;


        const percent =
            height > 0
                ? (scroll / height) * 100
                : 0;


        progress.style.width =
            `${percent}%`;

    }


    window.addEventListener(
        "scroll",
        updateProgress,
        { passive: true }
    );


    /* =====================================================
       BACK TO TOP
       ===================================================== */

    const topButton =
        document.createElement(
            "button"
        );


    topButton.id =
        "void-top";


    topButton.innerHTML =
        "↑";


    topButton.setAttribute(
        "aria-label",
        "Back to top"
    );


    document.body.appendChild(
        topButton
    );


    window.addEventListener(
        "scroll",
        () => {

            topButton.classList.toggle(
                "visible",
                window.scrollY > 500
            );

        },
        { passive: true }
    );


    topButton.addEventListener(
        "click",
        () => {

            window.scrollTo({
                top: 0,
                behavior:
                    reducedMotion
                        ? "auto"
                        : "smooth"
            });


            playSound(
                hoverSound
            );

            vibrate(12);

        }
    );


    /* =====================================================
       VOID MODE
       ===================================================== */

    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key.length !== 1
            ) {
                return;
            }


            voidSequence +=
                event.key.toLowerCase();


            if (
                voidSequence.length >
                VOID_CODE.length
            ) {

                voidSequence =
                    voidSequence.slice(
                        -VOID_CODE.length
                    );

            }


            if (
                voidSequence ===
                VOID_CODE
            ) {

                activateVoidMode();

                voidSequence = "";

            }

        }
    );


    function activateVoidMode() {

        const active =
            document.body.classList.toggle(
                "void-mode"
            );


        if (active) {

            createVoidExplosion();

            vibrate(40);

            playSound(
                hoverSound
            );

        } else {

            vibrate(20);

        }

    }


    /* =====================================================
       MOBILE LONG PRESS
       ===================================================== */

    if (touchDevice) {

        document.addEventListener(
            "pointerdown",
            () => {

                if (introPlaying) return;


                longPressTimer =
                    setTimeout(
                        () => {

                            activateVoidMode();

                        },
                        1200
                    );

            }
        );


        document.addEventListener(
            "pointerup",
            () => {

                clearTimeout(
                    longPressTimer
                );

            }
        );


        document.addEventListener(
            "pointercancel",
            () => {

                clearTimeout(
                    longPressTimer
                );

            }
        );

    }


    /* =====================================================
       VOID EXPLOSION
       ===================================================== */

    function createVoidExplosion() {

        if (reducedMotion) return;


        const explosion =
            document.createElement(
                "div"
            );


        explosion.className =
            "void-explosion";


        document.body.appendChild(
            explosion
        );


        setTimeout(
            () => {

                explosion.remove();

            },
            1200
        );

    }


    /* =====================================================
       KEYBOARD SHORTCUTS
       ===================================================== */

    document.addEventListener(
        "keydown",
        event => {

            const active =
                document.activeElement;


            if (
                active &&
                (
                    active.tagName === "INPUT" ||
                    active.tagName === "TEXTAREA" ||
                    active.tagName === "SELECT" ||
                    active.isContentEditable
                )
            ) {
                return;
            }


            if (
                event.key === "Home"
            ) {

                window.scrollTo({
                    top: 0,
                    behavior:
                        reducedMotion
                            ? "auto"
                            : "smooth"
                });

            }


            if (
                event.key === "End"
            ) {

                window.scrollTo({
                    top:
                        document.documentElement
                            .scrollHeight,
                    behavior:
                        reducedMotion
                            ? "auto"
                            : "smooth"
                });

            }

        }
    );


    /* =====================================================
       LAZY IMAGES
       ===================================================== */

    document
        .querySelectorAll("img")
        .forEach(img => {

            if (
                !img.hasAttribute(
                    "loading"
                )
            ) {

                img.loading =
                    "lazy";

            }

        });


    /* =====================================================
       CONSOLE
       ===================================================== */

    console.log(
        "%cVOIDSPOKEN",
        "font-size:30px;font-weight:bold;color:#ff003c;"
    );

    console.log(
        "%cTHE VOID IS WATCHING.",
        "font-size:14px;color:#888;"
    );

    console.log(
        "%c[ SYSTEM ONLINE ]",
        "font-size:12px;color:#ff003c;"
    );

})();
