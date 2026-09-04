/* =========================================================
   VOIDSPOKEN RESUME
   FULL JAVASCRIPT EXPERIENCE
   HTML CHANGES NOT REQUIRED
   ========================================================= */

(() => {
    "use strict";


    /* =========================================================
       CONFIGURATION
       ========================================================= */

    const CONFIG = {

        intro: {
            sound: "intro.mp3",
            volume: 0.35,
            duration: 4200
        },

        hover: {
            sound: "hover.mp3",
            volume: 0.08
        },

        effects: {
            rippleDuration: 700,
            vibrationDuration: 15,
            glitchInterval: 5000
        },

        selectors: {
            navLinks: "nav a",
            sections: "main section",
            articles: "article",
            images: "img"
        }

    };


    /* =========================================================
       GLOBAL STATE
       ========================================================= */

    let introPlaying = true;
    let introFinished = false;

    let mouseX = 0;
    let mouseY = 0;

    let glowX = 0;
    let glowY = 0;

    let animationFrame = null;

    let voidSequence = "";

    const VOID_CODE = "void";

    const prefersReducedMotion =
        window.matchMedia &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const isTouchDevice =
        "ontouchstart" in window ||
        navigator.maxTouchPoints > 0;


    /* =========================================================
       UTILITY
       ========================================================= */

    function safePlay(audio) {

        if (!audio) return;

        try {

            const promise = audio.play();

            if (promise !== undefined) {
                promise.catch(() => {
                    console.log(
                        "[VOIDSPOKEN] Audio playback blocked by browser."
                    );
                });
            }

        } catch (error) {

            console.log(
                "[VOIDSPOKEN] Audio unavailable."
            );

        }

    }


    function vibrate(duration = 15) {

        if ("vibrate" in navigator) {
            navigator.vibrate(duration);
        }

    }


    /* =========================================================
       AUDIO SYSTEM
       ========================================================= */

    const introSound = document.createElement("audio");

    introSound.src = CONFIG.intro.sound;
    introSound.preload = "auto";
    introSound.volume = CONFIG.intro.volume;
    introSound.setAttribute("playsinline", "");


    const hoverSound = document.createElement("audio");

    hoverSound.src = CONFIG.hover.sound;
    hoverSound.preload = "auto";
    hoverSound.volume = CONFIG.hover.volume;
    hoverSound.setAttribute("playsinline", "");


    document.body.appendChild(introSound);
    document.body.appendChild(hoverSound);


    /* =========================================================
       INTRO SCREEN
       ========================================================= */

    const intro = document.createElement("div");

    intro.id = "void-intro";

    intro.innerHTML = `
        <div class="void-intro-content">
            <div class="void-intro-title">
                VOIDSPOKEN
            </div>

            <div class="void-intro-subtitle">
                ENTER THE VOID
            </div>
        </div>
    `;


    Object.assign(intro.style, {

        position: "fixed",
        inset: "0",
        zIndex: "100000",

        display: "flex",
        alignItems: "center",
        justifyContent: "center",

        background: "#000",
        color: "#fff",

        overflow: "hidden",

        transition:
            "opacity 1.2s ease, visibility 1.2s ease"

    });


    document.body.appendChild(intro);


    /* =========================================================
       INTRO CONTENT
       ========================================================= */

    const introContent =
        intro.querySelector(".void-intro-content");


    if (introContent) {

        Object.assign(introContent.style, {

            textAlign: "center",
            position: "relative",
            zIndex: "2"

        });

    }


    const introTitle =
        intro.querySelector(".void-intro-title");


    if (introTitle) {

        Object.assign(introTitle.style, {

            fontSize:
                "clamp(2rem, 9vw, 7rem)",

            fontWeight: "900",

            letterSpacing:
                "0.15em",

            color: "#fff",

            textShadow:
                "0 0 10px rgba(255,0,40,.8), 0 0 40px rgba(255,0,40,.4)",

            animation:
                "voidIntroPulse 2s infinite alternate"

        });

    }


    const introSubtitle =
        intro.querySelector(".void-intro-subtitle");


    if (introSubtitle) {

        Object.assign(introSubtitle.style, {

            marginTop: "15px",

            fontSize:
                "clamp(.7rem, 2vw, 1rem)",

            letterSpacing:
                "0.5em",

            color:
                "rgba(255,255,255,.6)"

        });

    }


    /* =========================================================
       INTRO STYLE
       ========================================================= */

    const introStyle =
        document.createElement("style");


    introStyle.textContent = `

        @keyframes voidIntroPulse {

            from {
                opacity: .65;
                transform: scale(.98);
            }

            to {
                opacity: 1;
                transform: scale(1.02);
            }

        }


        #void-intro::before {

            content: "";

            position: absolute;

            inset: 0;

            background:
                radial-gradient(
                    circle at center,
                    rgba(255,0,40,.12),
                    transparent 55%
                );

            pointer-events: none;

        }


        #void-intro::after {

            content: "";

            position: absolute;

            inset: 0;

            background:
                repeating-linear-gradient(
                    0deg,
                    transparent 0px,
                    transparent 3px,
                    rgba(255,255,255,.015) 4px
                );

            pointer-events: none;

        }


        body.void-intro-active {
            overflow: hidden;
        }

    `;


    document.head.appendChild(introStyle);

    document.body.classList.add(
        "void-intro-active"
    );


    /* =========================================================
       INTRO FINISH
       ========================================================= */

    function finishIntro() {

        if (introFinished) return;

        introFinished = true;

        introPlaying = false;


        intro.style.opacity = "0";

        intro.style.visibility = "hidden";


        document.body.classList.remove(
            "void-intro-active"
        );


        setTimeout(() => {

            if (intro.parentNode) {
                intro.remove();
            }

        }, 1200);

    }


    /* =========================================================
       START INTRO
       ========================================================= */

    window.addEventListener("load", () => {

        safePlay(introSound);


        setTimeout(() => {

            finishIntro();

        }, CONFIG.intro.duration);

    });


    /* =========================================================
       INTRO AUDIO END
       ========================================================= */

    introSound.addEventListener(
        "ended",
        () => {

            introPlaying = false;

        }
    );


    /* =========================================================
       NAVIGATION
       ========================================================= */

    const navLinks = [
        ...document.querySelectorAll(
            CONFIG.selectors.navLinks
        )
    ];


    navLinks.forEach(link => {

        link.addEventListener(
            "click",
            event => {

                const target =
                    link.getAttribute("href");


                if (
                    !target ||
                    !target.startsWith("#")
                ) {
                    return;
                }


                const section =
                    document.querySelector(target);


                if (!section) return;


                event.preventDefault();


                section.scrollIntoView({

                    behavior:
                        prefersReducedMotion
                            ? "auto"
                            : "smooth",

                    block: "start"

                });


                if (!introPlaying) {

                    hoverSound.currentTime = 0;

                    safePlay(hoverSound);

                }


                vibrate(12);

            }
        );

    });


    /* =========================================================
       DESKTOP HOVER SOUND
       ========================================================= */

    navLinks.forEach(link => {

        link.addEventListener(
            "pointerenter",
            event => {

                if (introPlaying) return;


                if (
                    event.pointerType !== "mouse"
                ) {
                    return;
                }


                hoverSound.currentTime = 0;

                safePlay(hoverSound);

            }
        );

    });


    /* =========================================================
       MOBILE TOUCH SOUND
       ========================================================= */

    navLinks.forEach(link => {

        link.addEventListener(
            "pointerdown",
            event => {

                if (introPlaying) return;


                hoverSound.currentTime = 0;

                safePlay(hoverSound);


                if (
                    event.pointerType === "touch"
                ) {

                    vibrate(
                        CONFIG.effects.vibrationDuration
                    );

                }

            }
        );

    });


    /* =========================================================
       TOUCH RIPPLE
       ========================================================= */

    const rippleStyle =
        document.createElement("style");


    rippleStyle.textContent = `

        .void-touch-ripple {

            position: fixed;

            width: 20px;
            height: 20px;

            border:
                1px solid rgba(255,0,40,.8);

            border-radius: 50%;

            pointer-events: none;

            transform:
                translate(-50%, -50%);

            z-index: 99999;

            animation:
                voidRipple .7s ease-out forwards;

        }


        @keyframes voidRipple {

            0% {

                width: 20px;
                height: 20px;

                opacity: .9;

                box-shadow:
                    0 0 5px rgba(255,0,40,.7);

            }


            100% {

                width: 180px;
                height: 180px;

                opacity: 0;

                box-shadow:
                    0 0 50px rgba(255,0,40,0);

            }

        }

    `;


    document.head.appendChild(rippleStyle);


    document.addEventListener(
        "pointerdown",
        event => {

            if (introPlaying) return;


            const target =
                event.target;


            if (
                target.closest("input") ||
                target.closest("textarea") ||
                target.closest("select")
            ) {
                return;
            }


            const ripple =
                document.createElement("div");


            ripple.className =
                "void-touch-ripple";


            ripple.style.left =
                `${event.clientX}px`;


            ripple.style.top =
                `${event.clientY}px`;


            document.body.appendChild(
                ripple
            );


            setTimeout(() => {

                ripple.remove();

            }, CONFIG.effects.rippleDuration);

        }
    );


    /* =========================================================
       MOUSE VOID GLOW
       ========================================================= */

    if (
        !isTouchDevice &&
        !prefersReducedMotion
    ) {

        const glow =
            document.createElement("div");


        glow.id =
            "void-mouse-glow";


        Object.assign(glow.style, {

            position: "fixed",

            left: "0",
            top: "0",

            width: "300px",
            height: "300px",

            pointerEvents: "none",

            zIndex: "9998",

            borderRadius: "50%",

            background:
                "radial-gradient(circle, rgba(255,0,40,.12), transparent 65%)",

            transform:
                "translate(-50%, -50%)",

            willChange:
                "transform"

        });


        document.body.appendChild(glow);


        document.addEventListener(
            "pointermove",
            event => {

                if (
                    event.pointerType !== "mouse"
                ) {
                    return;
                }


                mouseX =
                    event.clientX;

                mouseY =
                    event.clientY;


                if (!animationFrame) {

                    animationFrame =
                        requestAnimationFrame(
                            updateGlow
                        );

                }

            }
        );


        function updateGlow() {

            glowX +=
                (mouseX - glowX) * 0.12;


            glowY +=
                (mouseY - glowY) * 0.12;


            glow.style.transform =
                `translate(
                    ${glowX - 150}px,
                    ${glowY - 150}px
                )`;


            animationFrame = null;

        }

    }


    /* =========================================================
       ACTIVE NAVIGATION
       ========================================================= */

    const sections = [
        ...document.querySelectorAll(
            CONFIG.selectors.sections
        )
    ];


    if (
        "IntersectionObserver"
        in window
    ) {

        const sectionObserver =
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

                                    const href =
                                        link.getAttribute(
                                            "href"
                                        );


                                    link.classList.toggle(
                                        "active",
                                        href ===
                                            `#${id}`
                                    );

                                }
                            );

                        }
                    );

                },
                {
                    rootMargin:
                        "-35% 0px -55% 0px",

                    threshold: 0
                }
            );


        sections.forEach(section => {

            sectionObserver.observe(
                section
            );

        });

    }


    /* =========================================================
       SCROLL REVEAL
       ========================================================= */

    const revealItems = [
        ...document.querySelectorAll(
            `
            ${CONFIG.selectors.sections},
            ${CONFIG.selectors.articles}
            `
        )
    ];


    if (!prefersReducedMotion) {

        revealItems.forEach(item => {

            item.style.opacity = "0";

            item.style.transform =
                "translateY(35px)";

            item.style.transition =
                "opacity .8s ease, transform .8s ease";

        });


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


                                entry.target.style.opacity =
                                    "1";


                                entry.target.style.transform =
                                    "translateY(0)";


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


            revealItems.forEach(item => {

                revealObserver.observe(item);

            });

        }

    }


    /* =========================================================
       PROJECT CARD SCAN
       ========================================================= */

    const projectCards =
        document.querySelectorAll(
            ".project-card, .project, .card"
        );


    const cardStyle =
        document.createElement("style");


    cardStyle.textContent = `

        .void-scan-card {

            position: relative;

            overflow: hidden;

        }


        .void-scan-card::after {

            content: "";

            position: absolute;

            top: 0;

            left: -120%;

            width: 40%;

            height: 100%;

            background:
                linear-gradient(
                    90deg,
                    transparent,
                    rgba(255,0,40,.18),
                    transparent
                );

            transform:
                skewX(-20deg);

            pointer-events: none;

        }


        .void-scan-card:hover::after {

            animation:
                voidCardScan .8s ease;

        }


        @keyframes voidCardScan {

            from {
                left: -120%;
            }

            to {
                left: 150%;
            }

        }

    `;


    document.head.appendChild(cardStyle);


    projectCards.forEach(card => {

        card.classList.add(
            "void-scan-card"
        );

    });


    /* =========================================================
       TITLE GLITCH
       ========================================================= */

    const mainTitle =
        document.querySelector("h1") ||
        document.querySelector(".hero h1") ||
        document.querySelector("header h1");


    const glitchStyle =
        document.createElement("style");


    glitchStyle.textContent = `

        .void-glitch {

            animation:
                voidGlitch .25s linear;

        }


        @keyframes voidGlitch {

            0% {

                transform: translate(0);

                text-shadow: none;

            }


            20% {

                transform:
                    translate(-3px, 2px);

                text-shadow:
                    3px 0 red,
                    -3px 0 cyan;

            }


            40% {

                transform:
                    translate(3px, -2px);

                text-shadow:
                    -3px 0 red,
                    3px 0 cyan;

            }


            60% {

                transform:
                    translate(-2px, 1px);

            }


            80% {

                transform:
                    translate(2px, -1px);

            }


            100% {

                transform: translate(0);

                text-shadow: none;

            }

        }

    `;


    document.head.appendChild(
        glitchStyle
    );


    if (
        mainTitle &&
        !prefersReducedMotion
    ) {

        setInterval(() => {

            mainTitle.classList.add(
                "void-glitch"
            );


            setTimeout(() => {

                mainTitle.classList.remove(
                    "void-glitch"
                );

            }, 250);

        }, CONFIG.effects.glitchInterval);

    }


    /* =========================================================
       SCROLL PROGRESS
       ========================================================= */

    const progressBar =
        document.createElement("div");


    progressBar.id =
        "void-scroll-progress";


    Object.assign(progressBar.style, {

        position: "fixed",

        top: "0",
        left: "0",

        width: "0%",

        height: "2px",

        background: "#ff0028",

        boxShadow:
            "0 0 10px rgba(255,0,40,.8)",

        zIndex: "99999",

        pointerEvents: "none",

        transition:
            "width .05s linear"

    });


    document.body.appendChild(
        progressBar
    );


    function updateScrollProgress() {

        const scrollTop =
            window.scrollY ||
            document.documentElement.scrollTop;


        const documentHeight =
            document.documentElement.scrollHeight -
            window.innerHeight;


        const percentage =
            documentHeight > 0
                ? (scrollTop / documentHeight) * 100
                : 0;


        progressBar.style.width =
            `${percentage}%`;

    }


    window.addEventListener(
        "scroll",
        updateScrollProgress,
        { passive: true }
    );


    /* =========================================================
       SCROLL DEPTH
       ========================================================= */

    window.addEventListener(
        "scroll",
        () => {

            if (prefersReducedMotion) {
                return;
            }


            const scroll =
                window.scrollY * 0.08;


            document.body.style.backgroundPosition =
                `center ${scroll}px`;

        },
        { passive: true }
    );


    /* =========================================================
       BACK TO TOP
       ========================================================= */

    const backTop =
        document.createElement("button");


    backTop.id =
        "void-back-top";


    backTop.textContent =
        "↑";


    backTop.setAttribute(
        "aria-label",
        "Back to top"
    );


    Object.assign(backTop.style, {

        position: "fixed",

        right: "20px",
        bottom: "20px",

        width: "42px",
        height: "42px",

        border:
            "1px solid rgba(255,0,40,.6)",

        borderRadius: "50%",

        background:
            "rgba(0,0,0,.8)",

        color: "#ff0028",

        fontSize: "20px",

        cursor: "pointer",

        zIndex: "9999",

        opacity: "0",

        visibility: "hidden",

        transition:
            "opacity .3s ease, visibility .3s ease"

    });


    document.body.appendChild(
        backTop
    );


    window.addEventListener(
        "scroll",
        () => {

            const visible =
                window.scrollY > 500;


            backTop.style.opacity =
                visible ? "1" : "0";


            backTop.style.visibility =
                visible
                    ? "visible"
                    : "hidden";

        },
        { passive: true }
    );


    backTop.addEventListener(
        "click",
        () => {

            window.scrollTo({

                top: 0,

                behavior:
                    prefersReducedMotion
                        ? "auto"
                        : "smooth"

            });


            if (!introPlaying) {

                hoverSound.currentTime = 0;

                safePlay(hoverSound);

            }


            vibrate(12);

        }
    );


    /* =========================================================
       KEYBOARD NAVIGATION
       ========================================================= */

    document.addEventListener(
        "keydown",
        event => {

            const activeElement =
                document.activeElement;


            const isTyping =
                activeElement &&
                (
                    activeElement.tagName ===
                        "INPUT" ||

                    activeElement.tagName ===
                        "TEXTAREA" ||

                    activeElement.tagName ===
                        "SELECT" ||

                    activeElement.isContentEditable
                );


            if (isTyping) return;


            if (event.key === "Home") {

                window.scrollTo({

                    top: 0,

                    behavior:
                        prefersReducedMotion
                            ? "auto"
                            : "smooth"

                });

            }


            if (event.key === "End") {

                window.scrollTo({

                    top:
                        document.documentElement
                            .scrollHeight,

                    behavior:
                        prefersReducedMotion
                            ? "auto"
                            : "smooth"

                });

            }

        }
    );


    /* =========================================================
       LAZY IMAGE LOADING
       ========================================================= */

    document
        .querySelectorAll(
            CONFIG.selectors.images
        )
        .forEach(img => {

            if (
                !img.hasAttribute(
                    "loading"
                )
            ) {

                img.setAttribute(
                    "loading",
                    "lazy"
                );

            }


            img.addEventListener(
                "error",
                () => {

                    img.classList.add(
                        "void-image-error"
                    );

                }
            );

        });


    /* =========================================================
       IMAGE ERROR STYLE
       ========================================================= */

    const imageStyle =
        document.createElement("style");


    imageStyle.textContent = `

        .void-image-error {

            opacity: .35;

            filter: grayscale(1);

        }

    `;


    document.head.appendChild(
        imageStyle
    );


    /* =========================================================
       VOID MODE
       TYPE: V O I D
       ========================================================= */

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


    /* =========================================================
       VOID MODE FUNCTION
       ========================================================= */

    function activateVoidMode() {

        document.body.classList.toggle(
            "void-mode"
        );


        const active =
            document.body.classList.contains(
                "void-mode"
            );


        if (active) {

            document.body.style.filter =
                "contrast(1.15) saturate(.75)";


            document.documentElement.style.setProperty(
                "--void-intensity",
                "1"
            );

        } else {

            document.body.style.filter =
                "";


            document.documentElement.style.setProperty(
                "--void-intensity",
                "0"
            );

        }


        vibrate(30);


        if (!introPlaying) {

            hoverSound.currentTime = 0;

            safePlay(hoverSound);

        }

    }


    /* =========================================================
       MOBILE LONG PRESS
       ========================================================= */

    let longPressTimer = null;


    if (isTouchDevice) {

        document.addEventListener(
            "pointerdown",
            () => {

                if (introPlaying) {
                    return;
                }


                longPressTimer =
                    setTimeout(() => {

                        activateVoidMode();

                    }, 1200);

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


    /* =========================================================
       MOBILE INTERACTION FEEDBACK
       ========================================================= */

    document.addEventListener(
        "pointerdown",
        event => {

            if (introPlaying) return;


            if (
                event.pointerType !==
                "touch"
            ) {
                return;
            }


            const interactive =
                event.target.closest(
                    "a, button, .card, .project, .project-card"
                );


            if (!interactive) {
                return;
            }


            vibrate(10);

        }
    );


    /* =========================================================
       SMOOTH ANCHOR LINKS
       ========================================================= */

    document
        .querySelectorAll(
            'a[href^="#"]'
        )
        .forEach(link => {

            link.addEventListener(
                "click",
                event => {

                    const id =
                        link.getAttribute(
                            "href"
                        );


                    if (
                        !id ||
                        id === "#"
                    ) {
                        return;
                    }


                    const target =
                        document.querySelector(
                            id
                        );


                    if (!target) {
                        return;
                    }


                    event.preventDefault();


                    target.scrollIntoView({

                        behavior:
                            prefersReducedMotion
                                ? "auto"
                                : "smooth"

                    });

                }
            );

        });


    /* =========================================================
       REDUCED MOTION
       ========================================================= */

    if (prefersReducedMotion) {

        document.documentElement.style
            .scrollBehavior = "auto";

    }


    /* =========================================================
       CONSOLE SIGNATURE
       ========================================================= */

    console.log(
        "%cVOIDSPOKEN",
        "font-size:28px;font-weight:bold;color:#ff0028;"
    );


    console.log(
        "%cReality is only one branch.",
        "font-size:14px;color:#888;"
    );


    console.log(
        "%cNavaneeth Krishnan M. K.",
        "font-size:12px;color:#aaa;"
    );


    console.log(
        "%c[ VOIDSPOKEN SYSTEM ONLINE ]",
        "color:#ff0028;font-weight:bold;"
    );


})();
