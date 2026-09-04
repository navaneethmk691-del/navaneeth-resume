document.addEventListener("DOMContentLoaded", () => {

    /* =========================================================
       VOID SPOKEN
       Main Interactive System
       ========================================================= */

    const body = document.body;
    const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    const isTouchDevice =
        window.matchMedia("(pointer: coarse)").matches ||
        "ontouchstart" in window;

    /* =========================================================
       AUDIO
       ========================================================= */

    const INTRO_AUDIO_SRC = "./intro.mp3";
    const HOVER_AUDIO_SRC = "./hover.mp3";

    let introAudio = document.getElementById("intro-audio");
    let hoverAudio = document.getElementById("hover-audio");

    if (!introAudio) {
        introAudio = document.createElement("audio");
        introAudio.id = "intro-audio";
        document.body.appendChild(introAudio);
    }

    if (!hoverAudio) {
        hoverAudio = document.createElement("audio");
        hoverAudio.id = "hover-audio";
        document.body.appendChild(hoverAudio);
    }

    introAudio.src = INTRO_AUDIO_SRC;
    hoverAudio.src = HOVER_AUDIO_SRC;

    introAudio.preload = "auto";
    hoverAudio.preload = "auto";

    introAudio.load();
    hoverAudio.load();

    let introFinished = false;
    let introClosed = false;

    /* =========================================================
       INTRO
       ========================================================= */

    const intro = document.createElement("div");
    intro.id = "void-intro";

    intro.innerHTML = `
        <div class="void-intro-grid"></div>

        <div class="void-intro-content">

            <div class="void-energy-ring"></div>
            <div class="void-energy-ring ring-two"></div>
            <div class="void-energy-ring ring-three"></div>

            <div class="void-intro-symbol">
                ∅
            </div>

            <div class="void-intro-title">
                VOIDSPOKEN
            </div>

            <div class="void-intro-subtitle">
                ENTER THE VOID
            </div>

            <div class="void-intro-status">
                INITIALIZING REALITY...
            </div>

        </div>
    `;

    body.prepend(intro);

    /* =========================================================
       PARTICLES
       ========================================================= */

    function createParticles() {

        if (document.getElementById("void-particles")) return;

        const container = document.createElement("div");
        container.id = "void-particles";

        const particleCount = isTouchDevice ? 35 : 70;

        for (let i = 0; i < particleCount; i++) {

            const particle = document.createElement("span");

            particle.className = "void-particle";

            particle.style.left =
                Math.random() * 100 + "%";

            particle.style.top =
                Math.random() * 100 + "%";

            particle.style.animationDelay =
                Math.random() * 8 + "s";

            particle.style.animationDuration =
                5 + Math.random() * 8 + "s";

            const size = 1 + Math.random() * 3;

            particle.style.width = size + "px";
            particle.style.height = size + "px";

            container.appendChild(particle);
        }

        body.appendChild(container);
    }

    createParticles();


    /* =========================================================
       SAHASRARA CHAKRA
       Appears AFTER intro closes
       ========================================================= */

    function createChakra() {

        if (document.getElementById("void-chakra")) return;

        const chakra = document.createElement("div");

        chakra.id = "void-chakra";

        chakra.innerHTML = `
            <div class="void-chakra-aura"></div>

            <div class="void-chakra-ring"></div>

            <div
                class="void-chakra-petals"
                id="chakra-outer">
            </div>

            <div
                class="void-chakra-inner"
                id="chakra-inner">
            </div>

            <div class="void-chakra-center"></div>
        `;

        body.appendChild(chakra);

        const outer =
            chakra.querySelector("#chakra-outer");

        const inner =
            chakra.querySelector("#chakra-inner");


        /* Outer petals */

        for (let i = 0; i < 32; i++) {

            const petal =
                document.createElement("div");

            petal.className =
                "void-chakra-petal";

            const angle =
                i * (360 / 32);

            petal.style.transform =
                `translate(-50%, -100%) rotate(${angle}deg)`;

            outer.appendChild(petal);
        }


        /* Inner petals */

        for (let i = 0; i < 16; i++) {

            const petal =
                document.createElement("div");

            petal.className =
                "void-chakra-petal";

            const angle =
                i * (360 / 16) + 11.25;

            petal.style.transform =
                `translate(-50%, -100%) rotate(${angle}deg)`;

            inner.appendChild(petal);
        }
    }

    createChakra();


    /* =========================================================
       CLOSE INTRO
       ========================================================= */

    function closeIntro() {

        if (introClosed) return;

        introClosed = true;
        introFinished = true;

        intro.classList.add("void-intro-out");

        const chakra =
            document.getElementById("void-chakra");

        /*
         * Chakra appears shortly after the intro begins
         * disappearing, creating a cinematic transition.
         */

        if (chakra) {

            setTimeout(() => {
                chakra.classList.add("active");
            }, 900);
        }

        setTimeout(() => {

            if (intro && intro.parentNode) {
                intro.remove();
            }

        }, 1800);
    }


    /* =========================================================
       INTRO AUDIO
       30 SECOND INTRO
       ========================================================= */

    introAudio.addEventListener(
        "ended",
        () => {
            closeIntro();
        },
        { once: true }
    );


    /*
     * Try to start the 30-second intro automatically.
     */

    const introPlayPromise =
        introAudio.play();

    if (introPlayPromise !== undefined) {

        introPlayPromise.catch(() => {

            /*
             * Browser autoplay restriction.
             * We don't leave the user trapped in the intro.
             */

            setTimeout(() => {
                closeIntro();
            }, 2500);
        });
    }


    /*
     * Safety fallback.
     *
     * If the audio is exactly 30 seconds but the browser
     * fails to fire "ended", close after 30.5 seconds.
     */

    setTimeout(() => {

        if (!introFinished) {
            closeIntro();
        }

    }, 30500);


    /* =========================================================
       HOVER / TOUCH SOUND SYSTEM
       Prevents sound from cutting itself off
       ========================================================= */

    const hoverSounds = [];

    for (let i = 0; i < 4; i++) {

        const sound =
            new Audio(HOVER_AUDIO_SRC);

        sound.preload = "auto";
        sound.volume = 0.35;

        hoverSounds.push(sound);
    }

    let soundIndex = 0;

    function playHoverSound() {

        if (!introFinished) return;

        const sound =
            hoverSounds[soundIndex];

        soundIndex =
            (soundIndex + 1) % hoverSounds.length;

        try {

            sound.pause();
            sound.currentTime = 0;

            const promise =
                sound.play();

            if (promise) {
                promise.catch(() => {});
            }

        } catch (error) {}
    }


    /* =========================================================
       INTERACTIVE ELEMENTS
       ========================================================= */

    const interactiveElements =
        document.querySelectorAll(
            "a, button, .card, .skill-card, " +
            ".project-card, .interest-card, " +
            "nav li, img"
        );


    /*
     * Desktop hover
     */

    if (!isTouchDevice) {

        interactiveElements.forEach(element => {

            element.addEventListener(
                "pointerenter",
                () => {
                    playHoverSound();
                }
            );

        });
    }


    /*
     * Mobile touch
     */

    interactiveElements.forEach(element => {

        element.addEventListener(
            "pointerdown",
            () => {

                if (isTouchDevice) {
                    playHoverSound();
                }

            },
            { passive: true }
        );

    });


    /* =========================================================
       RIPPLE EFFECT
       ========================================================= */

    function createRipple(x, y) {

        if (reducedMotion) return;

        const ripple =
            document.createElement("div");

        ripple.className =
            "void-ripple";

        ripple.style.left =
            x + "px";

        ripple.style.top =
            y + "px";

        body.appendChild(ripple);

        setTimeout(() => {

            if (ripple.parentNode) {
                ripple.remove();
            }

        }, 900);
    }


    document.addEventListener(
        "pointerdown",
        event => {

            createRipple(
                event.clientX,
                event.clientY
            );

        },
        { passive: true }
    );


    /* =========================================================
       SLASH EFFECT
       ========================================================= */

    function createSlash() {

        if (reducedMotion) return;

        const slash =
            document.createElement("div");

        slash.className =
            "void-slash";

        body.appendChild(slash);

        setTimeout(() => {

            if (slash.parentNode) {
                slash.remove();
            }

        }, 700);
    }


    /* =========================================================
       GLITCH EFFECT
       ========================================================= */

    function createGlitch() {

        if (reducedMotion) return;

        body.classList.add("void-glitch");

        setTimeout(() => {

            body.classList.remove("void-glitch");

        }, 500);
    }


    /* =========================================================
       EXPLOSION EFFECT
       ========================================================= */

    function createExplosion(x, y) {

        if (reducedMotion) return;

        const explosion =
            document.createElement("div");

        explosion.className =
            "void-explosion";

        explosion.style.left =
            x + "px";

        explosion.style.top =
            y + "px";

        body.appendChild(explosion);

        setTimeout(() => {

            if (explosion.parentNode) {
                explosion.remove();
            }

        }, 1000);
    }


    /* =========================================================
       SECTION REVEAL
       ========================================================= */

    const sections =
        document.querySelectorAll(
            "main section"
        );

    if ("IntersectionObserver" in window) {

        const observer =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

                        if (entry.isIntersecting) {

                            entry.target.classList.add(
                                "visible"
                            );

                        }

                    });

                },
                {
                    threshold: 0.12
                }
            );

        sections.forEach(section => {
            observer.observe(section);
        });

    } else {

        sections.forEach(section => {
            section.classList.add("visible");
        });
    }


    /* =========================================================
       NAVIGATION
       ========================================================= */

    const navLinks =
        document.querySelectorAll(
            'nav a[href^="#"]'
        );

    navLinks.forEach(link => {

        link.addEventListener(
            "click",
            event => {

                const targetID =
                    link.getAttribute("href");

                const target =
                    document.querySelector(targetID);

                if (!target) return;

                event.preventDefault();

                target.scrollIntoView({
                    behavior: reducedMotion
                        ? "auto"
                        : "smooth",
                    block: "start"
                });

            }
        );

    });


    /* =========================================================
       ACTIVE NAVIGATION
       ========================================================= */

    if ("IntersectionObserver" in window) {

        const navObserver =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

                        if (!entry.isIntersecting)
                            return;

                        const id =
                            entry.target.id;

                        navLinks.forEach(link => {

                            link.classList.toggle(
                                "active",
                                link.getAttribute("href") ===
                                "#" + id
                            );

                        });

                    });

                },
                {
                    threshold: 0.45
                }
            );

        sections.forEach(section => {

            if (section.id) {
                navObserver.observe(section);
            }

        });
    }


    /* =========================================================
       CARD TILT
       ========================================================= */

    if (!isTouchDevice && !reducedMotion) {

        const cards =
            document.querySelectorAll(
                ".card, .skill-card, " +
                ".project-card, .interest-card"
            );

        cards.forEach(card => {

            card.addEventListener(
                "pointermove",
                event => {

                    const rect =
                        card.getBoundingClientRect();

                    const x =
                        event.clientX - rect.left;

                    const y =
                        event.clientY - rect.top;

                    const rotateY =
                        ((x / rect.width) - 0.5) * 8;

                    const rotateX =
                        ((y / rect.height) - 0.5) * -8;

                    card.style.transform =
                        `perspective(800px)
                         rotateX(${rotateX}deg)
                         rotateY(${rotateY}deg)
                         translateY(-4px)`;

                }
            );


            card.addEventListener(
                "pointerleave",
                () => {

                    card.style.transform = "";

                }
            );

        });
    }


    /* =========================================================
       SCROLL PROGRESS
       ========================================================= */

    let progress =
        document.getElementById(
            "void-progress"
        );

    if (!progress) {

        progress =
            document.createElement("div");

        progress.id =
            "void-progress";

        body.appendChild(progress);
    }


    function updateProgress() {

        const scrollTop =
            window.scrollY;

        const scrollHeight =
            document.documentElement.scrollHeight -
            window.innerHeight;

        const percentage =
            scrollHeight > 0
                ? (scrollTop / scrollHeight) * 100
                : 0;

        progress.style.width =
            percentage + "%";
    }


    window.addEventListener(
        "scroll",
        updateProgress,
        { passive: true }
    );

    updateProgress();


    /* =========================================================
       BACK TO TOP
       ========================================================= */

    let topButton =
        document.getElementById(
            "void-top"
        );

    if (!topButton) {

        topButton =
            document.createElement("button");

        topButton.id =
            "void-top";

        topButton.setAttribute(
            "aria-label",
            "Back to top"
        );

        topButton.innerHTML =
            "↑";

        body.appendChild(topButton);
    }


    topButton.addEventListener(
        "click",
        () => {

            window.scrollTo({
                top: 0,
                behavior: reducedMotion
                    ? "auto"
                    : "smooth"
            });

        }
    );


    window.addEventListener(
        "scroll",
        () => {

            if (window.scrollY > 500) {

                topButton.classList.add(
                    "visible"
                );

            } else {

                topButton.classList.remove(
                    "visible"
                );

            }

        },
        { passive: true }
    );


    /* =========================================================
       CUSTOM VOID CURSOR
       ========================================================= */

    if (!isTouchDevice && !reducedMotion) {

        const cursor =
            document.createElement("div");

        cursor.className =
            "void-cursor";

        cursor.innerHTML =
            `<div class="void-cursor-core"></div>`;

        body.appendChild(cursor);

        let cursorX = 0;
        let cursorY = 0;

        let targetX = 0;
        let targetY = 0;

        document.addEventListener(
            "pointermove",
            event => {

                targetX =
                    event.clientX;

                targetY =
                    event.clientY;

            },
            { passive: true }
        );


        function animateCursor() {

            cursorX +=
                (targetX - cursorX) * 0.18;

            cursorY +=
                (targetY - cursorY) * 0.18;

            cursor.style.transform =
                `translate3d(
                    ${cursorX}px,
                    ${cursorY}px,
                    0
                )`;

            requestAnimationFrame(
                animateCursor
            );
        }

        animateCursor();


        interactiveElements.forEach(element => {

            element.addEventListener(
                "pointerenter",
                () => {

                    cursor.classList.add(
                        "active"
                    );

                }
            );

            element.addEventListener(
                "pointerleave",
                () => {

                    cursor.classList.remove(
                        "active"
                    );

                }
            );

        });
    }


    /* =========================================================
       PARALLAX
       ========================================================= */

    let mouseX = 0;
    let mouseY = 0;

    if (!isTouchDevice && !reducedMotion) {

        document.addEventListener(
            "pointermove",
            event => {

                mouseX =
                    (event.clientX /
                        window.innerWidth) -
                    0.5;

                mouseY =
                    (event.clientY /
                        window.innerHeight) -
                    0.5;

                body.style.setProperty(
                    "--void-mouse-x",
                    mouseX
                );

                body.style.setProperty(
                    "--void-mouse-y",
                    mouseY
                );

            },
            { passive: true }
        );
    }


    /* =========================================================
       VOID MODE
       ========================================================= */

    let voidMode =
        false;


    function toggleVoidMode() {

        voidMode =
            !voidMode;

        body.classList.toggle(
            "void-mode",
            voidMode
        );

        createGlitch();
        createSlash();

        const x =
            window.innerWidth / 2;

        const y =
            window.innerHeight / 2;

        createExplosion(x, y);


        /*
         * Extra chakra intensity during Void Mode
         */

        const chakra =
            document.getElementById(
                "void-chakra"
            );

        if (chakra) {

            chakra.classList.toggle(
                "void-mode-chakra",
                voidMode
            );
        }
    }


    /* =========================================================
       DESKTOP: TYPE "VOID"
       ========================================================= */

    let typedKeys = "";
    let keyTimer = null;

    document.addEventListener(
        "keydown",
        event => {

            if (isTouchDevice) return;

            if (event.key.length !== 1)
                return;

            typedKeys +=
                event.key.toUpperCase();

            typedKeys =
                typedKeys.slice(-4);

            clearTimeout(keyTimer);

            keyTimer =
                setTimeout(() => {
                    typedKeys = "";
                }, 1500);


            if (typedKeys === "VOID") {

                typedKeys = "";

                toggleVoidMode();
            }

        }
    );


    /* =========================================================
       MOBILE: LONG PRESS
       ========================================================= */

    let longPressTimer = null;

    document.addEventListener(
        "pointerdown",
        event => {

            if (!isTouchDevice) return;

            longPressTimer =
                setTimeout(() => {

                    toggleVoidMode();

                    createExplosion(
                        event.clientX,
                        event.clientY
                    );

                }, 1200);

        },
        { passive: true }
    );


    document.addEventListener(
        "pointerup",
        () => {

            clearTimeout(
                longPressTimer
            );

        },
        { passive: true }
    );


    document.addEventListener(
        "pointercancel",
        () => {

            clearTimeout(
                longPressTimer
            );

        },
        { passive: true }
    );


    /* =========================================================
       IMAGE INTERACTION
       ========================================================= */

    const images =
        document.querySelectorAll(
            "img"
        );

    images.forEach(image => {

        image.addEventListener(
            "click",
            event => {

                createRipple(
                    event.clientX,
                    event.clientY
                );

            }
        );

    });


    /* =========================================================
       INITIAL SECTION VISIBILITY
       ========================================================= */

    sections.forEach(
        (section, index) => {

            if (index === 0) {
                section.classList.add(
                    "visible"
                );
            }

        }
    );


    /* =========================================================
       CORE SKILLS ID COMPATIBILITY
       ========================================================= */

    const coreSkills =
        document.getElementById(
            "core-skills"
        ) ||
        document.getElementById(
            "coreskills"
        );

    if (coreSkills) {

        coreSkills.classList.add(
            "void-core-skills"
        );
    }


    /* =========================================================
       RESIZE
       ========================================================= */

    window.addEventListener(
        "resize",
        () => {

            updateProgress();

        },
        { passive: true }
    );


    /* =========================================================
       VOID SIGNATURE
       ========================================================= */

    console.log(
        "%c VOIDSPOKEN ",
        "color:#ff2020;" +
        "background:#050000;" +
        "font-size:20px;" +
        "font-weight:bold;" +
        "padding:8px;"
    );

    console.log(
        "%c Reality is only the surface. ",
        "color:#b00000;" +
        "font-size:14px;"
    );

});
