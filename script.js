/* =========================================================
   VOIDSPOKEN // VOID REALM ENGINE
   Interactive effects, audio, particles, navigation,
   animations, Void Mode and mobile interactions.
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
    "use strict";

    /* -----------------------------------------------------
       BASIC SETUP
    ----------------------------------------------------- */

    const body = document.body;
    const introAudio = document.getElementById("intro-audio");
    const hoverAudio = document.getElementById("hover-audio");

    const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    const touchDevice =
        window.matchMedia("(pointer: coarse)").matches ||
        "ontouchstart" in window;

    let introPlaying = true;
    let voidMode = false;
    let lastPointerDown = 0;
    let longPressTimer = null;

    /* -----------------------------------------------------
       UTILITY
    ----------------------------------------------------- */

    function vibrate(pattern = 20) {
        if ("vibrate" in navigator) {
            try {
                navigator.vibrate(pattern);
            } catch (_) {}
        }
    }

    function createElement(tag, className, parent = document.body) {
        const element = document.createElement(tag);

        if (className) {
            element.className = className;
        }

        parent.appendChild(element);
        return element;
    }

    /* -----------------------------------------------------
       INTRO SCREEN
    ----------------------------------------------------- */

    function createIntro() {
        if (document.getElementById("void-intro")) return;

        const intro = createElement("div", "", document.body);
        intro.id = "void-intro";

        intro.innerHTML = `
            <div class="void-intro-grid"></div>

            <div class="void-energy-ring"></div>
            <div class="void-energy-ring ring-two"></div>
            <div class="void-energy-ring ring-three"></div>

            <div class="void-intro-content">
                <div class="void-intro-symbol">◈</div>

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

        return intro;
    }

    const intro = createIntro();

    function closeIntro() {
        if (!intro || intro.classList.contains("void-intro-out")) {
            return;
        }

        introPlaying = false;

        const status = intro.querySelector(".void-intro-status");

        if (status) {
            status.textContent = "REALITY SYNCHRONIZED";
        }

        setTimeout(() => {
            intro.classList.add("void-intro-out");
        }, reducedMotion ? 100 : 450);

        setTimeout(() => {
            intro.remove();
        }, reducedMotion ? 200 : 1800);
    }

    /* -----------------------------------------------------
       INTRO AUDIO
    ----------------------------------------------------- */

    if (introAudio) {
        introAudio.volume = 0.8;

        introAudio.addEventListener("ended", () => {
            closeIntro();
        });

        introAudio.addEventListener("error", () => {
            // If the browser cannot load the audio,
            // the website still needs to function.
            setTimeout(closeIntro, 1200);
        });

        /*
         * Browsers frequently block autoplay.
         * Humanity invented autoplay and then invented
         * browsers to stop it. Beautiful system.
         */
        const startIntroAudio = () => {
            const promise = introAudio.play();

            if (promise && typeof promise.catch === "function") {
                promise.catch(() => {
                    setTimeout(closeIntro, 1800);
                });
            }
        };

        startIntroAudio();

        // Fallback so a missing/blocked audio file
        // never traps the visitor on the intro.
        setTimeout(() => {
            if (introPlaying) {
                closeIntro();
            }
        }, 7000);
    } else {
        setTimeout(closeIntro, 1500);
    }

    /* -----------------------------------------------------
       HOVER / TOUCH SOUND
    ----------------------------------------------------- */

    const soundElements = document.querySelectorAll(
        "a, button, article, li, th, .interactive, [data-sound]"
    );

    const soundPool = [];

    if (hoverAudio) {
        for (let i = 0; i < 4; i++) {
            const audio = new Audio(hoverAudio.src);
            audio.preload = "auto";
            audio.volume = 0.35;
            soundPool.push(audio);
        }
    }

    let soundIndex = 0;

    function playHoverSound() {
        if (introPlaying || !soundPool.length) return;

        const audio = soundPool[soundIndex];

        soundIndex = (soundIndex + 1) % soundPool.length;

        try {
            audio.currentTime = 0;
            audio.play().catch(() => {});
        } catch (_) {}
    }

    soundElements.forEach((element) => {
        /*
         * Desktop:
         * pointerenter fires when the pointer enters.
         */
        element.addEventListener("pointerenter", (event) => {
            if (event.pointerType === "mouse") {
                playHoverSound();
            }
        });

        /*
         * Mobile:
         * pointerdown replaces hover.
         */
        element.addEventListener("pointerdown", (event) => {
            if (event.pointerType === "touch") {
                const now = Date.now();

                // Prevent accidental double sound events.
                if (now - lastPointerDown > 100) {
                    playHoverSound();
                }

                lastPointerDown = now;
            }
        });
    });

    /* -----------------------------------------------------
       PARTICLE SYSTEM
    ----------------------------------------------------- */

    function createParticles() {
        if (document.getElementById("void-particles")) return;

        const container = createElement("div", "", document.body);
        container.id = "void-particles";

        const amount = reducedMotion
            ? 8
            : window.innerWidth < 700
                ? 18
                : 35;

        for (let i = 0; i < amount; i++) {
            const particle = document.createElement("span");

            particle.className = "void-particle";

            const size = Math.random() * 3 + 1;
            const left = Math.random() * 100;
            const duration = Math.random() * 12 + 8;
            const delay = Math.random() * 10;

            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.left = `${left}%`;
            particle.style.animationDuration = `${duration}s`;
            particle.style.animationDelay = `-${delay}s`;

            container.appendChild(particle);
        }
    }

    createParticles();

    /* -----------------------------------------------------
       CUSTOM CURSOR
    ----------------------------------------------------- */

    function createCursor() {
        if (touchDevice || reducedMotion) return;
        if (document.querySelector(".void-cursor")) return;

        const cursor = createElement("div", "void-cursor");
        const core = createElement("div", "void-cursor-core");

        let mouseX = -50;
        let mouseY = -50;

        let cursorX = mouseX;
        let cursorY = mouseY;

        document.addEventListener("pointermove", (event) => {
            if (event.pointerType !== "mouse") return;

            mouseX = event.clientX;
            mouseY = event.clientY;
        });

        function animateCursor() {
            cursorX += (mouseX - cursorX) * 0.15;
            cursorY += (mouseY - cursorY) * 0.15;

            cursor.style.left = `${cursorX - 12}px`;
            cursor.style.top = `${cursorY - 12}px`;

            core.style.left = `${mouseX - 3}px`;
            core.style.top = `${mouseY - 3}px`;

            requestAnimationFrame(animateCursor);
        }

        animateCursor();
    }

    createCursor();

    /* -----------------------------------------------------
       RIPPLE EFFECT
    ----------------------------------------------------- */

    function createRipple(x, y) {
        if (reducedMotion) return;

        const ripple = createElement("span", "void-ripple");

        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;

        setTimeout(() => {
            ripple.remove();
        }, 800);
    }

    document.addEventListener("pointerdown", (event) => {
        if (event.pointerType === "mouse" || event.pointerType === "touch") {
            createRipple(event.clientX, event.clientY);
        }
    });

    /* -----------------------------------------------------
       SLASH EFFECT
    ----------------------------------------------------- */

    function createSlash() {
        if (reducedMotion) return;

        const slash = createElement("div", "void-slash");

        setTimeout(() => {
            slash.remove();
        }, 750);
    }

    /* -----------------------------------------------------
       GLITCH EFFECT
    ----------------------------------------------------- */

    function glitch(element = body) {
        if (reducedMotion) return;

        element.classList.remove("void-glitch");

        // Force browser to acknowledge the removal
        void element.offsetWidth;

        element.classList.add("void-glitch");

        setTimeout(() => {
            element.classList.remove("void-glitch");
        }, 350);
    }

    /* -----------------------------------------------------
       EXPLOSION EFFECT
    ----------------------------------------------------- */

    function createExplosion() {
        if (reducedMotion) return;

        const explosion = createElement("div", "void-explosion");

        setTimeout(() => {
            explosion.remove();
        }, 1200);
    }

    /* -----------------------------------------------------
       SECTION REVEAL
    ----------------------------------------------------- */

    const sections = document.querySelectorAll("main section");

    if ("IntersectionObserver" in window) {
        const sectionObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("visible");
                    }
                });
            },
            {
                threshold: 0.12
            }
        );

        sections.forEach((section) => {
            sectionObserver.observe(section);
        });
    } else {
        sections.forEach((section) => {
            section.classList.add("visible");
        });
    }

    /* -----------------------------------------------------
       NAVIGATION
    ----------------------------------------------------- */

    const navLinks = document.querySelectorAll(
        "nav a[href^='#']"
    );

    const sectionMap = new Map();

    navLinks.forEach((link) => {
        const id = link.getAttribute("href");

        if (!id || id === "#") return;

        const section = document.querySelector(id);

        if (section) {
            sectionMap.set(section, link);
        }

        link.addEventListener("click", (event) => {
            const target = document.querySelector(id);

            if (!target) return;

            event.preventDefault();

            createSlash();
            playHoverSound();

            target.scrollIntoView({
                behavior: reducedMotion ? "auto" : "smooth",
                block: "start"
            });

            navLinks.forEach((item) => {
                item.classList.remove("active");
            });

            link.classList.add("active");
        });
    });

    /* -----------------------------------------------------
       ACTIVE NAV SECTION
    ----------------------------------------------------- */

    if ("IntersectionObserver" in window) {
        const navObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) return;

                    const link = sectionMap.get(entry.target);

                    if (!link) return;

                    navLinks.forEach((item) => {
                        item.classList.remove("active");
                    });

                    link.classList.add("active");
                });
            },
            {
                threshold: 0.25,
                rootMargin: "-20% 0px -60% 0px"
            }
        );

        sectionMap.forEach((_, section) => {
            navObserver.observe(section);
        });
    }

    /* -----------------------------------------------------
       CARD TILT
    ----------------------------------------------------- */

    const cards = document.querySelectorAll(
        "article, #skills li, #interests li, #coreskills li, #core-skills li, #hobbies li"
    );

    if (!touchDevice && !reducedMotion) {
        cards.forEach((card) => {
            card.addEventListener("pointermove", (event) => {
                if (event.pointerType !== "mouse") return;

                const rect = card.getBoundingClientRect();

                const x =
                    (event.clientX - rect.left) / rect.width;

                const y =
                    (event.clientY - rect.top) / rect.height;

                const rotateX = (0.5 - y) * 5;
                const rotateY = (x - 0.5) * 5;

                card.style.transform = `
                    translateY(-6px)
                    perspective(700px)
                    rotateX(${rotateX}deg)
                    rotateY(${rotateY}deg)
                `;
            });

            card.addEventListener("pointerleave", () => {
                card.style.transform = "";
            });
        });
    }

    /* -----------------------------------------------------
       SCROLL PROGRESS
    ----------------------------------------------------- */

    const progress = createElement("div", "", document.body);
    progress.id = "void-progress";

    function updateProgress() {
        const scrollTop =
            window.scrollY ||
            document.documentElement.scrollTop;

        const height =
            document.documentElement.scrollHeight -
            window.innerHeight;

        const percentage =
            height > 0
                ? (scrollTop / height) * 100
                : 0;

        progress.style.width = `${percentage}%`;
    }

    window.addEventListener(
        "scroll",
        updateProgress,
        { passive: true }
    );

    updateProgress();

    /* -----------------------------------------------------
       BACK TO TOP
    ----------------------------------------------------- */

    const topButton = createElement("button", "", document.body);

    topButton.id = "void-top";
    topButton.type = "button";
    topButton.setAttribute(
        "aria-label",
        "Return to top"
    );
    topButton.innerHTML = "↑";

    function updateTopButton() {
        if (window.scrollY > window.innerHeight * 0.5) {
            topButton.classList.add("visible");
        } else {
            topButton.classList.remove("visible");
        }
    }

    window.addEventListener(
        "scroll",
        updateTopButton,
        { passive: true }
    );

    topButton.addEventListener("click", () => {
        createSlash();
        playHoverSound();

        window.scrollTo({
            top: 0,
            behavior: reducedMotion ? "auto" : "smooth"
        });
    });

    updateTopButton();

    /* -----------------------------------------------------
       PARALLAX EFFECT
    ----------------------------------------------------- */

    if (!touchDevice && !reducedMotion) {
        let targetX = 0;
        let targetY = 0;

        let currentX = 0;
        let currentY = 0;

        document.addEventListener("pointermove", (event) => {
            if (event.pointerType !== "mouse") return;

            targetX =
                (event.clientX / window.innerWidth - 0.5) * 2;

            targetY =
                (event.clientY / window.innerHeight - 0.5) * 2;
        });

        function parallax() {
            currentX += (targetX - currentX) * 0.03;
            currentY += (targetY - currentY) * 0.03;

            document.documentElement.style.setProperty(
                "--mouse-x",
                currentX.toFixed(3)
            );

            document.documentElement.style.setProperty(
                "--mouse-y",
                currentY.toFixed(3)
            );

            requestAnimationFrame(parallax);
        }

        parallax();
    }

    /* -----------------------------------------------------
       VOID MODE
    ----------------------------------------------------- */

    function toggleVoidMode(force = null) {
        if (force === null) {
            voidMode = !voidMode;
        } else {
            voidMode = force;
        }

        body.classList.toggle(
            "void-mode",
            voidMode
        );

        createSlash();
        createExplosion();
        glitch(body);

        vibrate(
            voidMode
                ? [30, 40, 80]
                : [20, 30, 20]
        );

        if (voidMode) {
            document.title =
                "VOIDSPOKEN // VOID MODE";

            setTimeout(() => {
                document.title =
                    "VOIDSPOKEN";
            }, 2500);
        } else {
            document.title =
                "VOIDSPOKEN";
        }
    }

    /* -----------------------------------------------------
       DESKTOP: TYPE "VOID"
    ----------------------------------------------------- */

    let typedKeys = "";
    let keyResetTimer = null;

    document.addEventListener("keydown", (event) => {
        if (event.ctrlKey || event.altKey || event.metaKey) {
            return;
        }

        const key = event.key.toUpperCase();

        if (key.length !== 1) return;

        typedKeys += key;

        if (typedKeys.length > 4) {
            typedKeys = typedKeys.slice(-4);
        }

        clearTimeout(keyResetTimer);

        keyResetTimer = setTimeout(() => {
            typedKeys = "";
        }, 1800);

        if (typedKeys === "VOID") {
            toggleVoidMode();

            typedKeys = "";

            clearTimeout(keyResetTimer);
        }
    });

    /* -----------------------------------------------------
       MOBILE: LONG PRESS
    ----------------------------------------------------- */

    function startLongPress(event) {
        if (!touchDevice) return;

        clearTimeout(longPressTimer);

        longPressTimer = setTimeout(() => {
            toggleVoidMode();

            vibrate([40, 50, 100]);
        }, 1200);
    }

    function cancelLongPress() {
        clearTimeout(longPressTimer);
    }

    document.addEventListener(
        "pointerdown",
        startLongPress
    );

    document.addEventListener(
        "pointerup",
        cancelLongPress
    );

    document.addEventListener(
        "pointercancel",
        cancelLongPress
    );

    document.addEventListener(
        "pointermove",
        cancelLongPress
    );

    /* -----------------------------------------------------
       VOID MODE: EXTRA IMPACT ON CLICK
    ----------------------------------------------------- */

    document.addEventListener("pointerdown", (event) => {
        if (!voidMode) return;

        if (
            event.target.closest(
                "a, button, article, li, th, td"
            )
        ) {
            createRipple(
                event.clientX,
                event.clientY
            );

            glitch(
                event.target.closest(
                    "article, li, button, a"
                ) || body
            );
        }
    });

    /* -----------------------------------------------------
       IMAGE INTERACTION
    ----------------------------------------------------- */

    document.querySelectorAll("img").forEach((image) => {
        image.addEventListener("pointerenter", () => {
            playHoverSound();
        });

        image.addEventListener("click", (event) => {
            createRipple(
                event.clientX,
                event.clientY
            );

            if (voidMode) {
                glitch(image);
            }
        });
    });

    /* -----------------------------------------------------
       INITIAL VISUAL STATE
    ----------------------------------------------------- */

    /*
     * Reveal anything already visible on the screen.
     */
    sections.forEach((section) => {
        const rect = section.getBoundingClientRect();

        if (rect.top < window.innerHeight * 0.9) {
            section.classList.add("visible");
        }
    });

    /* -----------------------------------------------------
       CLEANUP / RESIZE
    ----------------------------------------------------- */

    window.addEventListener("resize", () => {
        // Recreate particles only if the device category
        // changes dramatically after rotation.
        updateProgress();
        updateTopButton();
    });

    /* -----------------------------------------------------
       CONSOLE SIGNATURE
    ----------------------------------------------------- */

    console.log(
        "%c VOIDSPOKEN ",
        "background:#080000;color:#ff1738;font-weight:bold;padding:8px 14px;"
    );

    console.log(
        "%c The Void has been initialized.",
        "color:#c40020;"
    );
});
