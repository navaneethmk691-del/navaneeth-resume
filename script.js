/* =========================================================
   VOIDSPOKEN
   GSAP + THREE.JS + WEBGL + ANIME EFFECT SYSTEM
========================================================= */


/* =========================================================
   BASIC SETUP
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const intro = document.getElementById("void-intro");
    const body = document.body;

    /* =====================================================
       INTRO
    ===================================================== */

    if (intro) {

        setTimeout(() => {

            intro.classList.add("void-intro-out");

            if (window.gsap) {
                gsap.to(intro, {
                    opacity: 0,
                    duration: 0.8,
                    ease: "power2.inOut"
                });
            }

        }, 1500);


        setTimeout(() => {

            intro.remove();

        }, 2500);

    }


    /* =====================================================
       GSAP
    ===================================================== */

    if (window.gsap) {

        gsap.registerPlugin(ScrollTrigger);


        /* HERO ANIMATION */

        const heroTimeline = gsap.timeline({
            defaults: {
                ease: "power3.out"
            }
        });

        heroTimeline
            .from(".hero-overline", {
                opacity: 0,
                y: 30,
                duration: 0.8
            })
            .from(".hero h1", {
                opacity: 0,
                y: 60,
                skewY: 5,
                duration: 1.2
            }, "-=0.4")
            .from(".hero-role", {
                opacity: 0,
                y: 30,
                duration: 0.8
            }, "-=0.6")
            .from(".hero-location, .hero-brand", {
                opacity: 0,
                y: 20,
                duration: 0.6
            }, "-=0.4")
            .from(".hero-actions", {
                opacity: 0,
                y: 25,
                duration: 0.8
            }, "-=0.3");


        /* SECTION REVEALS */

        gsap.utils.toArray(".content-section").forEach(section => {

            const elements = section.querySelectorAll(
                ".section-heading, .text-card, .info-card, .knowledge-card, .timeline-card, .project-card, .activity-card, .language-card, .goal-list div, .future-card, .achievement-list div, .hobby-grid article"
            );

            gsap.from(elements, {
                scrollTrigger: {
                    trigger: section,
                    start: "top 82%",
                    once: true
                },

                opacity: 0,
                y: 35,
                duration: 0.7,
                stagger: 0.06,
                ease: "power3.out"
            });

        });


        /* VSECR */

        gsap.from(".vsecr-cube", {

            scrollTrigger: {
                trigger: "#vsecr",
                start: "top 70%"
            },

            scale: 0,
            rotation: 180,
            opacity: 0,

            duration: 1.5,

            ease: "back.out(1.7)"
        });


        gsap.from(".vsecr-content", {

            scrollTrigger: {
                trigger: "#vsecr",
                start: "top 70%"
            },

            opacity: 0,
            y: 50,

            duration: 1,

            delay: 0.2,

            ease: "power3.out"
        });


        /* VISION */

        gsap.from(".vision-content", {

            scrollTrigger: {
                trigger: ".vision-section",
                start: "top 70%"
            },

            opacity: 0,
            scale: 0.94,
            duration: 1.2,
            ease: "power3.out"
        });

    }


    /* =====================================================
       NAVIGATION
    ===================================================== */

    const menuToggle = document.getElementById("menu-toggle");
    const nav = document.getElementById("main-nav");

    if (menuToggle && nav) {

        menuToggle.addEventListener("click", () => {

            menuToggle.classList.toggle("active");
            nav.classList.toggle("open");

        });


        nav.querySelectorAll("a").forEach(link => {

            link.addEventListener("click", () => {

                menuToggle.classList.remove("active");
                nav.classList.remove("open");

            });

        });

    }


    /* =====================================================
       SMOOTH NAVIGATION
    ===================================================== */

    document.querySelectorAll('a[href^="#"]').forEach(link => {

        link.addEventListener("click", event => {

            const targetID = link.getAttribute("href");

            if (!targetID || targetID === "#") {
                return;
            }

            const target = document.querySelector(targetID);

            if (!target) {
                return;
            }

            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        });

    });


    /* =====================================================
       ACTIVE NAVIGATION
    ===================================================== */

    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll("#main-nav a");

    const sectionObserver = new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    navLinks.forEach(link => {
                        link.classList.remove("active");
                    });

                    const active = document.querySelector(
                        `#main-nav a[href="#${entry.target.id}"]`
                    );

                    if (active) {
                        active.classList.add("active");
                    }

                }

            });

        },

        {
            rootMargin: "-35% 0px -55% 0px"
        }
    );

    sections.forEach(section => {
        sectionObserver.observe(section);
    });


    /* =====================================================
       SCROLL PROGRESS
    ===================================================== */

    const progress = document.getElementById("scroll-progress");

    window.addEventListener("scroll", () => {

        const scrollTop = window.scrollY;

        const height =
            document.documentElement.scrollHeight -
            window.innerHeight;

        const percentage =
            height > 0
                ? (scrollTop / height) * 100
                : 0;

        progress.style.width = `${percentage}%`;

    });


    /* =====================================================
       BACK TO TOP
    ===================================================== */

    const backTop = document.getElementById("back-top");

    window.addEventListener("scroll", () => {

        if (window.scrollY > 700) {
            backTop.classList.add("visible");
        } else {
            backTop.classList.remove("visible");
        }

    });

    backTop.addEventListener("click", () => {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });


    /* =====================================================
       HOVER SOUND
       hover.mp3 must be beside index.html
    ===================================================== */

    const hoverSoundPath = "./hover.mp3";

    function playHoverSound() {

        try {

            const audio = new Audio(hoverSoundPath);

            audio.volume = 0.35;

            audio.currentTime = 0;

            audio.play().catch(() => {});

        } catch (error) {}

    }


    const interactiveElements = document.querySelectorAll(
        "a, button, .info-card, .knowledge-card, .project-card, .activity-card, .language-card, .hobby-grid article, .goal-list div, .achievement-list div, .tag-cloud span, .mini-tags span, .skill-cloud span"
    );


    interactiveElements.forEach(element => {

        element.addEventListener("pointerenter", playHoverSound);

    });


    /* =====================================================
       TOUCH RIPPLE
    ===================================================== */

    document.addEventListener("pointerdown", event => {

        createRipple(
            event.clientX,
            event.clientY
        );

        createImpact(
            event.clientX,
            event.clientY
        );

    });


    function createRipple(x, y) {

        const ripple = document.createElement("div");

        ripple.style.position = "fixed";
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;

        ripple.style.width = "20px";
        ripple.style.height = "20px";

        ripple.style.border =
            "1px solid rgba(255,0,0,0.8)";

        ripple.style.borderRadius = "50%";

        ripple.style.transform =
            "translate(-50%, -50%)";

        ripple.style.pointerEvents = "none";

        ripple.style.zIndex = "999";

        document
            .getElementById("touch-ripple-layer")
            .appendChild(ripple);


        if (window.gsap) {

            gsap.to(ripple, {

                width: 180,
                height: 180,
                opacity: 0,

                duration: 0.7,

                ease: "power2.out",

                onComplete: () => ripple.remove()

            });

        } else {

            setTimeout(() => ripple.remove(), 700);

        }

    }


    /* =====================================================
       IMPACT EFFECT
    ===================================================== */

    function createImpact(x, y) {

        const layer =
            document.getElementById("impact-layer");

        if (!layer) return;


        const shockwave =
            document.createElement("div");

        shockwave.className =
            "anime-shockwave";

        shockwave.style.left = `${x}px`;
        shockwave.style.top = `${y}px`;

        layer.appendChild(shockwave);


        if (window.gsap) {

            gsap.fromTo(
                shockwave,

                {
                    scale: 0.2,
                    opacity: 0.9
                },

                {
                    scale: 8,
                    opacity: 0,
                    duration: 0.55,
                    ease: "power2.out",

                    onComplete: () =>
                        shockwave.remove()
                }
            );

        }


        /* Sparks */

        for (let i = 0; i < 8; i++) {

            createSpark(x, y);

        }

    }


    function createSpark(x, y) {

        const spark =
            document.createElement("div");

        spark.className =
            "anime-spark";

        spark.style.left = `${x}px`;
        spark.style.top = `${y}px`;

        document
            .getElementById("battle-particles")
            .appendChild(spark);


        const angle =
            Math.random() * Math.PI * 2;

        const distance =
            30 + Math.random() * 100;

        const targetX =
            Math.cos(angle) * distance;

        const targetY =
            Math.sin(angle) * distance;


        if (window.gsap) {

            gsap.to(spark, {

                x: targetX,
                y: targetY,

                opacity: 0,

                duration:
                    0.25 + Math.random() * 0.4,

                ease: "power2.out",

                onComplete: () =>
                    spark.remove()

            });

        }

    }


    /* =====================================================
       DOUBLE TAP = ENERGY SLASH
    ===================================================== */

    let lastTap = 0;

    document.addEventListener("pointerdown", event => {

        const now = Date.now();

        if (now - lastTap < 300) {

            createSlash(
                event.clientX,
                event.clientY
            );

        }

        lastTap = now;

    });


    function createSlash(x, y) {

        const slash =
            document.createElement("div");

        slash.className =
            "anime-slash";

        slash.style.left = `${x - 90}px`;
        slash.style.top = `${y}px`;

        slash.style.transform =
            "rotate(-25deg) scaleX(0)";

        document
            .getElementById("slash-layer")
            .appendChild(slash);


        if (window.gsap) {

            gsap.to(slash, {

                scaleX: 1.4,
                opacity: 1,

                duration: 0.12,

                ease: "power4.out",

                onComplete: () => {

                    gsap.to(slash, {

                        scaleX: 1.8,
                        opacity: 0,

                        duration: 0.25,

                        onComplete: () =>
                            slash.remove()

                    });

                }

            });

        }

    }


    /* =====================================================
       RANDOM ANIME ATTACKS
    ===================================================== */

    function randomAttack() {

        const width = window.innerWidth;
        const height = window.innerHeight;

        const x =
            Math.random() * width;

        const y =
            Math.random() * height;

        createSlash(x, y);

        if (Math.random() > 0.35) {

            createImpact(x, y);

        }

    }


    setInterval(() => {

        if (
            document.hidden ||
            document.body.classList.contains("low-performance")
        ) {
            return;
        }

        randomAttack();

    }, 4500);


    /* =====================================================
       CARD TILT
    ===================================================== */

    const tiltCards = document.querySelectorAll(
        ".info-card, .knowledge-card, .project-card, .activity-card, .language-card"
    );


    tiltCards.forEach(card => {

        card.addEventListener("pointermove", event => {

            if (window.innerWidth < 800) {
                return;
            }

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


            if (window.gsap) {

                gsap.to(card, {

                    rotateX,
                    rotateY,

                    transformPerspective: 700,

                    duration: 0.3,

                    ease: "power2.out"

                });

            }

        });


        card.addEventListener("pointerleave", () => {

            if (window.gsap) {

                gsap.to(card, {

                    rotateX: 0,
                    rotateY: 0,

                    duration: 0.5,

                    ease: "power3.out"

                });

            }

        });

    });


    /* =====================================================
       PARALLAX
    ===================================================== */

    if (window.gsap && window.innerWidth > 700) {

        gsap.to(".hero-grid", {

            yPercent: 20,

            ease: "none",

            scrollTrigger: {

                trigger: ".hero",

                start: "top top",
                end: "bottom top",

                scrub: true

            }

        });


        gsap.to(".vision-background-text", {

            xPercent: 10,

            ease: "none",

            scrollTrigger: {

                trigger: ".vision-section",

                start: "top bottom",
                end: "bottom top",

                scrub: true

            }

        });

    }


    /* =====================================================
       VOID MODE
    ===================================================== */

    const voidButton =
        document.getElementById("void-mode-button");

    let voidMode = false;


    function toggleVoidMode() {

        voidMode = !voidMode;

        body.classList.toggle(
            "void-mode",
            voidMode
        );


        if (window.gsap) {

            if (voidMode) {

                gsap.to("#battle-aura", {
                    opacity: 2,
                    duration: 0.5
                });

                gsap.to("#energy-core", {
                    scale: 1.8,
                    opacity: 1,
                    duration: 0.8,
                    ease: "power2.out"
                });

                gsap.to("body", {
                    backgroundColor: "#000000",
                    duration: 0.5
                });

            } else {

                gsap.to("#energy-core", {
                    scale: 1,
                    opacity: 0.5,
                    duration: 0.8
                });

            }

        }

    }


    if (voidButton) {

        voidButton.addEventListener(
            "click",
            toggleVoidMode
        );

    }


    /* =====================================================
       DESKTOP KEYBOARD VOID
    ===================================================== */

    let typed = "";

    document.addEventListener("keydown", event => {

        if (event.key.length !== 1) {
            return;
        }

        typed += event.key.toUpperCase();

        if (typed.length > 4) {
            typed = typed.slice(-4);
        }

        if (typed === "VOID") {

            toggleVoidMode();

            typed = "";

            for (let i = 0; i < 3; i++) {

                setTimeout(
                    randomAttack,
                    i * 180
                );

            }

        }

    });


    /* =====================================================
       MOBILE LONG PRESS VOID
    ===================================================== */

    let pressTimer = null;

    document.addEventListener(
        "pointerdown",
        event => {

            if (window.innerWidth > 800) {
                return;
            }

            pressTimer = setTimeout(() => {

                toggleVoidMode();

                for (let i = 0; i < 3; i++) {

                    setTimeout(
                        randomAttack,
                        i * 150
                    );

                }

            }, 1200);

        }
    );


    document.addEventListener(
        "pointerup",
        () => {

            clearTimeout(pressTimer);

        }
    );


    document.addEventListener(
        "pointercancel",
        () => {

            clearTimeout(pressTimer);

        }
    );


    /* =====================================================
       THREE.JS WEBGL
    ===================================================== */

    initThree();


});


/* =========================================================
   THREE.JS VOID WORLD
========================================================= */

function initThree() {

    if (!window.THREE) {
        console.warn("Three.js unavailable.");
        return;
    }


    const canvas =
        document.getElementById("void-canvas");


    if (!canvas) return;


    const scene =
        new THREE.Scene();


    scene.fog =
        new THREE.FogExp2(
            0x000000,
            0.0018
        );


    const camera =
        new THREE.PerspectiveCamera(
            60,
            window.innerWidth / window.innerHeight,
            0.1,
            2000
        );


    camera.position.z = 550;


    const renderer =
        new THREE.WebGLRenderer({

            canvas,
            alpha: true,
            antialias: true,
            powerPreference: "high-performance"

        });


    renderer.setPixelRatio(
        Math.min(
            window.devicePixelRatio,
            1.8
        )
    );


    renderer.setSize(
        window.innerWidth,
        window.innerHeight
    );


    /* =====================================================
       PARTICLES
    ===================================================== */

    const particleCount =
        window.innerWidth < 600
            ? 700
            : 1500;


    const positions =
        new Float32Array(
            particleCount * 3
        );


    const velocities =
        new Float32Array(
            particleCount * 3
        );


    for (
        let i = 0;
        i < particleCount;
        i++
    ) {

        const index = i * 3;

        positions[index] =
            (Math.random() - 0.5) * 1200;

        positions[index + 1] =
            (Math.random() - 0.5) * 900;

        positions[index + 2] =
            (Math.random() - 0.5) * 1200;


        velocities[index] =
            (Math.random() - 0.5) * 0.15;

        velocities[index + 1] =
            Math.random() * 0.15;

        velocities[index + 2] =
            (Math.random() - 0.5) * 0.15;

    }


    const geometry =
        new THREE.BufferGeometry();


    geometry.setAttribute(
        "position",
        new THREE.BufferAttribute(
            positions,
            3
        )
    );


    const material =
        new THREE.PointsMaterial({

            color: 0xff1111,

            size:
                window.innerWidth < 600
                    ? 1.8
                    : 2.2,

            transparent: true,

            opacity: 0.55,

            blending:
                THREE.AdditiveBlending,

            depthWrite: false

        });


    const particles =
        new THREE.Points(
            geometry,
            material
        );


    scene.add(particles);


    /* =====================================================
       ENERGY RINGS
    ===================================================== */

    const rings = [];


    for (let i = 0; i < 5; i++) {

        const ringGeometry =
            new THREE.TorusGeometry(
                80 + i * 45,
                0.7,
                8,
                100
            );


        const ringMaterial =
            new THREE.MeshBasicMaterial({

                color: 0x550000,

                transparent: true,

                opacity: 0.22,

                wireframe: true

            });


        const ring =
            new THREE.Mesh(
                ringGeometry,
                ringMaterial
            );


        ring.rotation.x =
            Math.random() * Math.PI;

        ring.rotation.y =
            Math.random() * Math.PI;

        scene.add(ring);

        rings.push(ring);

    }


    /* =====================================================
       CENTRAL VOID CORE
    ===================================================== */

    const coreGeometry =
        new THREE.IcosahedronGeometry(
            55,
            2
        );


    const coreMaterial =
        new THREE.MeshBasicMaterial({

            color: 0x440000,

            wireframe: true,

            transparent: true,

            opacity: 0.25

        });


    const core =
        new THREE.Mesh(
            coreGeometry,
            coreMaterial
        );


    scene.add(core);


    /* =====================================================
       MOUSE / TOUCH PARALLAX
    ===================================================== */

    let targetX = 0;
    let targetY = 0;

    let currentX = 0;
    let currentY = 0;


    window.addEventListener(
        "pointermove",
        event => {

            targetX =
                (event.clientX /
                    window.innerWidth -
                    0.5) * 2;

            targetY =
                (event.clientY /
                    window.innerHeight -
                    0.5) * 2;

        }
    );


    /* =====================================================
       ANIMATION LOOP
    ===================================================== */

    const clock =
        new THREE.Clock();


    function animate() {

        requestAnimationFrame(
            animate
        );


        const time =
            clock.getElapsedTime();


        /* PARTICLES */

        particles.rotation.y =
            time * 0.015;

        particles.rotation.x =
            Math.sin(time * 0.1) * 0.04;


        const position =
            geometry.attributes.position.array;


        for (
            let i = 0;
            i < particleCount;
            i++
        ) {

            const index = i * 3;

            position[index] +=
                velocities[index];

            position[index + 1] +=
                velocities[index + 1];

            position[index + 2] +=
                velocities[index + 2];


            if (
                Math.abs(position[index]) >
                650
            ) {
                position[index] *= -0.95;
            }


            if (
                position[index + 1] >
                500
            ) {
                position[index + 1] = -500;
            }

        }


        geometry.attributes.position.needsUpdate =
            true;


        /* RINGS */

        rings.forEach(
            (ring, index) => {

                ring.rotation.x +=
                    0.0005 * (index + 1);

                ring.rotation.y +=
                    0.0008 * (index + 1);

                ring.rotation.z =
                    Math.sin(
                        time * 0.2 +
                        index
                    ) * 0.2;

            }
        );


        /* CORE */

        core.rotation.x += 0.002;
        core.rotation.y += 0.003;

        const pulse =
            1 +
            Math.sin(time * 1.4) * 0.08;

        core.scale.setScalar(
            pulse
        );


        /* CAMERA */

        currentX +=
            (targetX - currentX) *
            0.025;

        currentY +=
            (targetY - currentY) *
            0.025;


        camera.position.x =
            currentX * 35;

        camera.position.y =
            -currentY * 25;

        camera.lookAt(
            scene.position
        );


        renderer.render(
            scene,
            camera
        );

    }


    animate();


    /* =====================================================
       RESIZE
    ===================================================== */

    window.addEventListener(
        "resize",
        () => {

            camera.aspect =
                window.innerWidth /
                window.innerHeight;

            camera.updateProjectionMatrix();


            renderer.setSize(
                window.innerWidth,
                window.innerHeight
            );

            renderer.setPixelRatio(
                Math.min(
                    window.devicePixelRatio,
                    1.8
                )
            );

        }
    );

}
