/* =========================================================
   VOIDSPOKEN
   GSAP + THREE.JS + WEBGL + FANTASY BATTLE SYSTEM
========================================================= */


/* =========================================================
   GLOBAL BATTLE STATE
========================================================= */

let voidBattleSystem = null;


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

            if (intro) {
                intro.remove();
            }

        }, 2500);

    }


    /* =====================================================
       GSAP
    ===================================================== */

    if (
        window.gsap &&
        window.ScrollTrigger
    ) {

        gsap.registerPlugin(ScrollTrigger);


        /* =================================================
           HERO ANIMATION
        ================================================= */

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


            .from(
                ".hero-location, .hero-brand",
                {

                    opacity: 0,

                    y: 20,

                    duration: 0.6

                },
                "-=0.4"
            )


            .from(".hero-actions", {

                opacity: 0,

                y: 25,

                duration: 0.8

            }, "-=0.3");


        /* =================================================
           SECTION REVEALS
        ================================================= */

        gsap.utils
            .toArray(".content-section")
            .forEach(section => {

                const elements =
                    section.querySelectorAll(
                        ".section-heading, .text-card, .info-card, .knowledge-card, .timeline-card, .project-card, .activity-card, .language-card, .goal-list div, .future-card, .achievement-list div, .hobby-grid article"
                    );


                if (!elements.length) {
                    return;
                }


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


        /* =================================================
           VSECR
        ================================================= */

        if (document.querySelector(".vsecr-cube")) {

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

        }


        if (document.querySelector(".vsecr-content")) {

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

        }


        /* =================================================
           VISION
        ================================================= */

        if (document.querySelector(".vision-content")) {

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

    }


    /* =====================================================
       NAVIGATION
    ===================================================== */

    const menuToggle =
        document.getElementById("menu-toggle");

    const nav =
        document.getElementById("main-nav");


    if (menuToggle && nav) {

        menuToggle.addEventListener(
            "click",
            () => {

                menuToggle.classList.toggle("active");

                nav.classList.toggle("open");

            }
        );


        nav.querySelectorAll("a")
            .forEach(link => {

                link.addEventListener(
                    "click",
                    () => {

                        menuToggle.classList.remove(
                            "active"
                        );

                        nav.classList.remove(
                            "open"
                        );

                    }
                );

            });

    }


    /* =====================================================
       SMOOTH NAVIGATION
    ===================================================== */

    document
        .querySelectorAll('a[href^="#"]')
        .forEach(link => {

            link.addEventListener(
                "click",
                event => {

                    const targetID =
                        link.getAttribute("href");


                    if (
                        !targetID ||
                        targetID === "#"
                    ) {
                        return;
                    }


                    const target =
                        document.querySelector(
                            targetID
                        );


                    if (!target) {
                        return;
                    }


                    event.preventDefault();


                    target.scrollIntoView({

                        behavior: "smooth",

                        block: "start"

                    });

                }
            );

        });


    /* =====================================================
       ACTIVE NAVIGATION
    ===================================================== */

    const sections =
        document.querySelectorAll(
            "section[id]"
        );

    const navLinks =
        document.querySelectorAll(
            "#main-nav a"
        );


    if (
        sections.length &&
        navLinks.length &&
        "IntersectionObserver" in window
    ) {

        const sectionObserver =
            new IntersectionObserver(

                entries => {

                    entries.forEach(entry => {

                        if (
                            entry.isIntersecting
                        ) {

                            navLinks.forEach(
                                link => {

                                    link.classList.remove(
                                        "active"
                                    );

                                }
                            );


                            const active =
                                document.querySelector(
                                    `#main-nav a[href="#${entry.target.id}"]`
                                );


                            if (active) {

                                active.classList.add(
                                    "active"
                                );

                            }

                        }

                    });

                },

                {

                    rootMargin:
                        "-35% 0px -55% 0px"

                }

            );


        sections.forEach(section => {

            sectionObserver.observe(
                section
            );

        });

    }


    /* =====================================================
       SCROLL PROGRESS
    ===================================================== */

    const progress =
        document.getElementById(
            "scroll-progress"
        );


    window.addEventListener(
        "scroll",
        () => {

            if (!progress) {
                return;
            }


            const scrollTop =
                window.scrollY;


            const height =
                document.documentElement
                    .scrollHeight -
                window.innerHeight;


            const percentage =
                height > 0
                    ? (scrollTop / height) * 100
                    : 0;


            progress.style.width =
                `${percentage}%`;

        },
        { passive: true }
    );


    /* =====================================================
       BACK TO TOP
    ===================================================== */

    const backTop =
        document.getElementById(
            "back-top"
        );


    if (backTop) {

        window.addEventListener(
            "scroll",
            () => {

                if (window.scrollY > 700) {

                    backTop.classList.add(
                        "visible"
                    );

                } else {

                    backTop.classList.remove(
                        "visible"
                    );

                }

            },
            { passive: true }
        );


        backTop.addEventListener(
            "click",
            () => {

                window.scrollTo({

                    top: 0,

                    behavior: "smooth"

                });

            }
        );

    }


    /* =====================================================
       HOVER SOUND
       hover.mp3 beside index.html
    ===================================================== */

    const hoverSoundPath =
        "./hover.mp3";


    function playHoverSound() {

        try {

            const audio =
                new Audio(
                    hoverSoundPath
                );


            audio.volume = 0.35;

            audio.currentTime = 0;

            audio.play().catch(
                () => {}
            );

        } catch (error) {}

    }


    const interactiveElements =
        document.querySelectorAll(

            "a, button, .info-card, .knowledge-card, .project-card, .activity-card, .language-card, .hobby-grid article, .goal-list div, .achievement-list div, .tag-cloud span, .mini-tags span, .skill-cloud span"

        );


    interactiveElements.forEach(
        element => {

            element.addEventListener(
                "pointerenter",
                playHoverSound
            );

        }
    );


    /* =====================================================
       TOUCH RIPPLE
    ===================================================== */

    document.addEventListener(
        "pointerdown",
        event => {

            createRipple(
                event.clientX,
                event.clientY
            );


            createImpact(
                event.clientX,
                event.clientY
            );

        }
    );


    function createRipple(x, y) {

        const layer =
            document.getElementById(
                "touch-ripple-layer"
            );


        if (!layer) {
            return;
        }


        const ripple =
            document.createElement(
                "div"
            );


        ripple.style.position =
            "fixed";

        ripple.style.left =
            `${x}px`;

        ripple.style.top =
            `${y}px`;

        ripple.style.width =
            "20px";

        ripple.style.height =
            "20px";

        ripple.style.border =
            "1px solid rgba(255,0,0,0.8)";

        ripple.style.borderRadius =
            "50%";

        ripple.style.transform =
            "translate(-50%, -50%)";

        ripple.style.pointerEvents =
            "none";

        ripple.style.zIndex =
            "999";


        layer.appendChild(
            ripple
        );


        if (window.gsap) {

            gsap.to(ripple, {

                width: 180,

                height: 180,

                opacity: 0,

                duration: 0.7,

                ease: "power2.out",

                onComplete: () =>
                    ripple.remove()

            });

        } else {

            setTimeout(
                () => ripple.remove(),
                700
            );

        }

    }


    /* =====================================================
       IMPACT EFFECT
    ===================================================== */

    function createImpact(x, y) {

        const layer =
            document.getElementById(
                "impact-layer"
            );


        if (!layer) {
            return;
        }


        const shockwave =
            document.createElement(
                "div"
            );


        shockwave.className =
            "anime-shockwave";


        shockwave.style.left =
            `${x}px`;

        shockwave.style.top =
            `${y}px`;


        layer.appendChild(
            shockwave
        );


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


        for (
            let i = 0;
            i < 8;
            i++
        ) {

            createSpark(x, y);

        }

    }


    function createSpark(x, y) {

        const layer =
            document.getElementById(
                "battle-particles"
            );


        if (!layer) {
            return;
        }


        const spark =
            document.createElement(
                "div"
            );


        spark.className =
            "anime-spark";


        spark.style.left =
            `${x}px`;

        spark.style.top =
            `${y}px`;


        layer.appendChild(
            spark
        );


        const angle =
            Math.random() *
            Math.PI *
            2;


        const distance =
            30 +
            Math.random() *
            100;


        const targetX =
            Math.cos(angle) *
            distance;


        const targetY =
            Math.sin(angle) *
            distance;


        if (window.gsap) {

            gsap.to(spark, {

                x: targetX,

                y: targetY,

                opacity: 0,

                duration:
                    0.25 +
                    Math.random() *
                    0.4,

                ease: "power2.out",

                onComplete: () =>
                    spark.remove()

            });

        } else {

            spark.remove();

        }

    }


    /* =====================================================
       DOUBLE TAP = ENERGY SLASH
    ===================================================== */

    let lastTap = 0;


    document.addEventListener(
        "pointerdown",
        event => {

            const now =
                Date.now();


            if (
                now - lastTap <
                300
            ) {

                createSlash(
                    event.clientX,
                    event.clientY
                );

            }


            lastTap = now;

        }
    );


    function createSlash(x, y) {

        const layer =
            document.getElementById(
                "slash-layer"
            );


        if (!layer) {
            return;
        }


        const slash =
            document.createElement(
                "div"
            );


        slash.className =
            "anime-slash";


        slash.style.left =
            `${x - 90}px`;

        slash.style.top =
            `${y}px`;


        slash.style.transform =
            "rotate(-25deg) scaleX(0)";


        layer.appendChild(
            slash
        );


        if (window.gsap) {

            gsap.to(slash, {

                scaleX: 1.4,

                opacity: 1,

                duration: 0.12,

                ease: "power4.out",

                onComplete: () => {

                    gsap.to(
                        slash,
                        {

                            scaleX: 1.8,

                            opacity: 0,

                            duration: 0.25,

                            onComplete: () =>
                                slash.remove()

                        }
                    );

                }

            });

        }

    }


    /* =====================================================
       RANDOM BACKGROUND ANIME ATTACK
    ===================================================== */

    function randomAttack() {

        const width =
            window.innerWidth;

        const height =
            window.innerHeight;


        const x =
            Math.random() *
            width;


        const y =
            Math.random() *
            height;


        createSlash(
            x,
            y
        );


        if (
            Math.random() >
            0.35
        ) {

            createImpact(
                x,
                y
            );

        }

    }


    setInterval(
        () => {

            if (
                document.hidden ||
                document.body.classList.contains(
                    "low-performance"
                )
            ) {

                return;

            }


            randomAttack();

        },
        4500
    );


    /* =====================================================
       CARD TILT
    ===================================================== */

    const tiltCards =
        document.querySelectorAll(

            ".info-card, .knowledge-card, .project-card, .activity-card, .language-card"

        );


    tiltCards.forEach(card => {

        card.addEventListener(
            "pointermove",
            event => {

                if (
                    window.innerWidth <
                    800
                ) {
                    return;
                }


                const rect =
                    card.getBoundingClientRect();


                const x =
                    event.clientX -
                    rect.left;


                const y =
                    event.clientY -
                    rect.top;


                const rotateY =
                    ((x / rect.width) -
                        0.5) *
                    8;


                const rotateX =
                    ((y / rect.height) -
                        0.5) *
                    -8;


                if (window.gsap) {

                    gsap.to(card, {

                        rotateX,

                        rotateY,

                        transformPerspective:
                            700,

                        duration: 0.3,

                        ease:
                            "power2.out"

                    });

                }

            }
        );


        card.addEventListener(
            "pointerleave",
            () => {

                if (window.gsap) {

                    gsap.to(card, {

                        rotateX: 0,

                        rotateY: 0,

                        duration: 0.5,

                        ease:
                            "power3.out"

                    });

                }

            }
        );

    });


    /* =====================================================
       PARALLAX
    ===================================================== */

    if (
        window.gsap &&
        window.ScrollTrigger &&
        window.innerWidth > 700
    ) {

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


        if (
            document.querySelector(
                ".vision-background-text"
            )
        ) {

            gsap.to(
                ".vision-background-text",
                {

                    xPercent: 10,

                    ease: "none",

                    scrollTrigger: {

                        trigger:
                            ".vision-section",

                        start:
                            "top bottom",

                        end:
                            "bottom top",

                        scrub: true

                    }

                }
            );

        }

    }


    /* =====================================================
       VOID MODE
    ===================================================== */

    const voidButton =
        document.getElementById(
            "void-mode-button"
        );


    let voidMode = false;


    function toggleVoidMode() {

        voidMode =
            !voidMode;


        body.classList.toggle(
            "void-mode",
            voidMode
        );


        if (voidBattleSystem) {

            voidBattleSystem.setVoidMode(
                voidMode
            );

        }


        if (window.gsap) {

            if (voidMode) {

                gsap.to(
                    "#battle-aura",
                    {

                        opacity: 2,

                        duration: 0.5

                    }
                );


                gsap.to(
                    "#energy-core",
                    {

                        scale: 1.8,

                        opacity: 1,

                        duration: 0.8,

                        ease:
                            "power2.out"

                    }
                );


                gsap.to(
                    "body",
                    {

                        backgroundColor:
                            "#000000",

                        duration: 0.5

                    }
                );

            } else {

                gsap.to(
                    "#energy-core",
                    {

                        scale: 1,

                        opacity: 0.5,

                        duration: 0.8

                    }
                );

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
       KEYBOARD VOID
    ===================================================== */

    let typed = "";


    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key.length !== 1
            ) {
                return;
            }


            typed +=
                event.key.toUpperCase();


            if (
                typed.length >
                4
            ) {

                typed =
                    typed.slice(-4);

            }


            if (
                typed === "VOID"
            ) {

                toggleVoidMode();


                typed = "";


                for (
                    let i = 0;
                    i < 3;
                    i++
                ) {

                    setTimeout(
                        randomAttack,
                        i * 180
                    );

                }

            }

        }
    );


    /* =====================================================
       MOBILE LONG PRESS VOID
    ===================================================== */

    let pressTimer = null;


    document.addEventListener(
        "pointerdown",
        () => {

            if (
                window.innerWidth >
                800
            ) {
                return;
            }


            pressTimer =
                setTimeout(
                    () => {

                        toggleVoidMode();


                        for (
                            let i = 0;
                            i < 3;
                            i++
                        ) {

                            setTimeout(
                                randomAttack,
                                i * 150
                            );

                        }

                    },
                    1200
                );

        }
    );


    document.addEventListener(
        "pointerup",
        () => {

            clearTimeout(
                pressTimer
            );

        }
    );


    document.addEventListener(
        "pointercancel",
        () => {

            clearTimeout(
                pressTimer
            );

        }
    );


    /* =====================================================
       THREE.JS VOID WORLD
    ===================================================== */

    initThree();


    /* =====================================================
       VOIDSPOKEN FANTASY BATTLE
    ===================================================== */

    voidBattleSystem =
        initVoidspokenBattle();

});


/* =========================================================
   THREE.JS VOID WORLD
========================================================= */

function initThree() {

    if (!window.THREE) {

        console.warn(
            "Three.js unavailable."
        );

        return;

    }


    const canvas =
        document.getElementById(
            "void-canvas"
        );


    if (!canvas) {
        return;
    }


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

            window.innerWidth /
                window.innerHeight,

            0.1,

            2000

        );


    camera.position.z =
        550;


    const renderer =
        new THREE.WebGLRenderer({

            canvas,

            alpha: true,

            antialias: true,

            powerPreference:
                "high-performance"

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

        const index =
            i * 3;


        positions[index] =
            (Math.random() - 0.5) *
            1200;


        positions[index + 1] =
            (Math.random() - 0.5) *
            900;


        positions[index + 2] =
            (Math.random() - 0.5) *
            1200;


        velocities[index] =
            (Math.random() - 0.5) *
            0.15;


        velocities[index + 1] =
            Math.random() *
            0.15;


        velocities[index + 2] =
            (Math.random() - 0.5) *
            0.15;

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


    scene.add(
        particles
    );


    /* =====================================================
       ENERGY RINGS
    ===================================================== */

    const rings = [];


    for (
        let i = 0;
        i < 5;
        i++
    ) {

        const ringGeometry =
            new THREE.TorusGeometry(

                80 +
                    i * 45,

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
            Math.random() *
            Math.PI;


        ring.rotation.y =
            Math.random() *
            Math.PI;


        scene.add(
            ring
        );


        rings.push(
            ring
        );

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


    scene.add(
        core
    );


    /* =====================================================
       MOUSE PARALLAX
    ===================================================== */

    let targetX = 0;
    let targetY = 0;

    let currentX = 0;
    let currentY = 0;


    window.addEventListener(
        "pointermove",
        event => {

            targetX =
                (
                    event.clientX /
                    window.innerWidth -
                    0.5
                ) * 2;


            targetY =
                (
                    event.clientY /
                    window.innerHeight -
                    0.5
                ) * 2;

        }
    );


    /* =====================================================
       ANIMATION
    ===================================================== */

    const clock =
        new THREE.Clock();


    function animate() {

        requestAnimationFrame(
            animate
        );


        const time =
            clock.getElapsedTime();


        particles.rotation.y =
            time * 0.015;


        particles.rotation.x =
            Math.sin(
                time * 0.1
            ) * 0.04;


        const position =
            geometry
                .attributes
                .position
                .array;


        for (
            let i = 0;
            i < particleCount;
            i++
        ) {

            const index =
                i * 3;


            position[index] +=
                velocities[index];


            position[index + 1] +=
                velocities[index + 1];


            position[index + 2] +=
                velocities[index + 2];


            if (
                Math.abs(
                    position[index]
                ) > 650
            ) {

                position[index] *=
                    -0.95;

            }


            if (
                position[index + 1] >
                500
            ) {

                position[index + 1] =
                    -500;

            }

        }


        geometry
            .attributes
            .position
            .needsUpdate = true;


        rings.forEach(
            (ring, index) => {

                ring.rotation.x +=
                    0.0005 *
                    (index + 1);


                ring.rotation.y +=
                    0.0008 *
                    (index + 1);


                ring.rotation.z =
                    Math.sin(
                        time * 0.2 +
                        index
                    ) * 0.2;

            }
        );


        core.rotation.x +=
            0.002;


        core.rotation.y +=
            0.003;


        const pulse =
            1 +
            Math.sin(
                time * 1.4
            ) * 0.08;


        core.scale.setScalar(
            pulse
        );


        currentX +=
            (
                targetX -
                currentX
            ) * 0.025;


        currentY +=
            (
                targetY -
                currentY
            ) * 0.025;


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


/* =========================================================
   VOIDSPOKEN FANTASY STICK-MAN BATTLE
========================================================= */

function initVoidspokenBattle() {

    const canvas =
        document.getElementById(
            "void-battle"
        );


    if (!canvas) {

        console.warn(
            "void-battle canvas not found."
        );

        return null;

    }


    const ctx =
        canvas.getContext(
            "2d"
        );


    if (!ctx) {
        return null;
    }


    let width =
        window.innerWidth;


    let height =
        window.innerHeight;


    let dpr =
        Math.min(
            window.devicePixelRatio || 1,
            2
        );


    let voidMode =
        document.body.classList.contains(
            "void-mode"
        );


    let paused =
        document.hidden;


    let lastTime =
        performance.now();


    let phase =
        "idle";


    let phaseTime =
        0;


    let nextAction =
        2.5 +
        Math.random() *
        2.5;


    let shake =
        0;


    let flash =
        0;


    let battleCount =
        0;


    /* =====================================================
       CHARACTERS
    ===================================================== */

    const hero = {

        x: 0,

        y: 0,

        side: "hero",

        facing: 1,

        vx: 0,

        vy: 0,

        scale: 1,

        energy: 1,

        sword: false,

        pose: 0,

        afterimages: [],

        attack: 0,

        hit: 0,

        airborne: false

    };


    const nullEnemy = {

        x: 0,

        y: 0,

        side: "enemy",

        facing: -1,

        vx: 0,

        vy: 0,

        scale: 1,

        energy: 1,

        sword: false,

        pose: 0,

        afterimages: [],

        attack: 0,

        hit: 0,

        airborne: false

    };


    /* =====================================================
       PARTICLE SYSTEM
    ===================================================== */

    const particles = [];

    const slashTrails = [];

    const shockwaves = [];


    /* =====================================================
       RESIZE
    ===================================================== */

    function resize() {

        width =
            window.innerWidth;


        height =
            window.innerHeight;


        dpr =
            Math.min(
                window.devicePixelRatio || 1,
                2
            );


        canvas.width =
            width * dpr;


        canvas.height =
            height * dpr;


        canvas.style.width =
            `${width}px`;


        canvas.style.height =
            `${height}px`;


        ctx.setTransform(
            dpr,
            0,
            0,
            dpr,
            0,
            0
        );


        positionCharacters();

    }


    function positionCharacters() {

        const mobile =
            width < 700;


        const edge =
            mobile
                ? Math.min(
                    58,
                    width * 0.14
                )
                : Math.min(
                    115,
                    width * 0.12
                );


        hero.x =
            edge;


        nullEnemy.x =
            width - edge;


        const ground =
            height *
            (
                mobile
                    ? 0.76
                    : 0.78
            );


        hero.y =
            ground;


        nullEnemy.y =
            ground;

    }


    resize();


    window.addEventListener(
        "resize",
        resize
    );


    /* =====================================================
       VOID MODE
    ===================================================== */

    function setVoidMode(value) {

        voidMode =
            Boolean(value);


        if (voidMode) {

            hero.energy =
                1.8;

            nullEnemy.energy =
                1.7;

        } else {

            hero.energy =
                1;

            nullEnemy.energy =
                1;

        }

    }


    /* =====================================================
       RANDOM UTILITY
    ===================================================== */

    function random(min, max) {

        return (
            min +
            Math.random() *
            (max - min)
        );

    }


    /* =====================================================
       PARTICLE
    ===================================================== */

    function spawnParticle(
        x,
        y,
        options = {}
    ) {

        const angle =
            options.angle !== undefined
                ? options.angle
                : random(
                    0,
                    Math.PI * 2
                );


        const speed =
            options.speed !== undefined
                ? options.speed
                : random(
                    60,
                    220
                );


        particles.push({

            x,

            y,

            vx:
                Math.cos(angle) *
                speed,

            vy:
                Math.sin(angle) *
                speed,

            life:
                options.life ||
                random(
                    0.25,
                    0.7
                ),

            maxLife:
                options.life ||
                random(
                    0.25,
                    0.7
                ),

            size:
                options.size ||
                random(
                    1,
                    3
                ),

            gravity:
                options.gravity ||
                0,

            type:
                options.type ||
                "spark"

        });

    }


    function burst(
        x,
        y,
        count = 14,
        power = 180
    ) {

        for (
            let i = 0;
            i < count;
            i++
        ) {

            spawnParticle(
                x,
                y,
                {

                    speed:
                        random(
                            power * 0.35,
                            power
                        ),

                    size:
                        random(
                            1,
                            3.5
                        ),

                    life:
                        random(
                            0.25,
                            0.65
                        )

                }
            );

        }

    }


    /* =====================================================
       SHOCKWAVE
    ===================================================== */

    function createShockwave(
        x,
        y,
        size = 70
    ) {

        shockwaves.push({

            x,

            y,

            radius: 10,

            size,

            life: 0.45,

            maxLife: 0.45

        });

    }


    /* =====================================================
       ENERGY SLASH
    ===================================================== */

    function createEnergySlash(
        x,
        y,
        direction = 1,
        power = 1
    ) {

        slashTrails.push({

            x,

            y,

            direction,

            length:
                random(
                    90,
                    170
                ) * power,

            height:
                random(
                    14,
                    25
                ) * power,

            rotation:
                random(
                    -0.6,
                    0.6
                ),

            life:
                0.28,

            maxLife:
                0.28

        });


        burst(
            x,
            y,
            voidMode ? 18 : 10,
            voidMode ? 300 : 210
        );

    }


    /* =====================================================
       AFTERIMAGE
    ===================================================== */

    function createAfterimage(
        fighter
    ) {

        fighter.afterimages.push({

            x: fighter.x,

            y: fighter.y,

            facing:
                fighter.facing,

            life:
                0.32,

            maxLife:
                0.32

        });


        if (
            fighter.afterimages.length >
            5
        ) {

            fighter.afterimages.shift();

        }

    }


    /* =====================================================
       IMPACT
    ===================================================== */

    function impact(
        x,
        y,
        strength = 1
    ) {

        shake =
            Math.max(
                shake,
                7 * strength
            );


        flash =
            Math.max(
                flash,
                0.18 * strength
            );


        burst(
            x,
            y,
            Math.floor(
                14 * strength
            ),
            280 * strength
        );


        createShockwave(
            x,
            y,
            70 * strength
        );

    }


    /* =====================================================
       DRAW GLOW CIRCLE
    ===================================================== */

    function drawGlow(
        x,
        y,
        radius,
        alpha
    ) {

        const gradient =
            ctx.createRadialGradient(

                x,
                y,
                0,

                x,
                y,
                radius

            );


        gradient.addColorStop(
            0,
            `rgba(255,20,20,${alpha})`
        );


        gradient.addColorStop(
            0.35,
            `rgba(180,0,0,${alpha * 0.45})`
        );


        gradient.addColorStop(
            1,
            "rgba(0,0,0,0)"
        );


        ctx.fillStyle =
            gradient;


        ctx.beginPath();

        ctx.arc(
            x,
            y,
            radius,
            0,
            Math.PI * 2
        );

        ctx.fill();

    }


    /* =====================================================
       DRAW AURA
    ===================================================== */

    function drawAura(
        fighter,
        time
    ) {

        const pulse =
            1 +
            Math.sin(
                time * 7 +
                fighter.x * 0.01
            ) *
            0.08;


        const radius =
            (
                38 +
                Math.sin(
                    time * 5
                ) *
                7
            ) *
            pulse *
            fighter.energy;


        ctx.save();


        ctx.globalCompositeOperation =
            "lighter";


        drawGlow(
            fighter.x,
            fighter.y - 55,
            radius * 1.5,
            voidMode
                ? 0.18
                : 0.10
        );


        ctx.strokeStyle =
            voidMode
                ? "rgba(255,30,30,0.5)"
                : "rgba(220,0,0,0.3)";


        ctx.lineWidth =
            2;


        ctx.beginPath();


        for (
            let i = 0;
            i < 18;
            i++
        ) {

            const angle =
                (
                    i / 18
                ) *
                Math.PI *
                2 +
                time *
                (
                    i % 2
                        ? -0.7
                        : 0.7
                );


            const inner =
                radius * 0.7;


            const outer =
                radius *
                random(
                    1.0,
                    1.45
                );


            const x1 =
                fighter.x +
                Math.cos(angle) *
                inner;


            const y1 =
                fighter.y -
                55 +
                Math.sin(angle) *
                inner;


            const x2 =
                fighter.x +
                Math.cos(angle) *
                outer;


            const y2 =
                fighter.y -
                55 +
                Math.sin(angle) *
                outer;


            ctx.moveTo(
                x1,
                y1
            );


            ctx.lineTo(
                x2,
                y2
            );

        }


        ctx.stroke();


        ctx.restore();

    }


    /* =====================================================
       DRAW STICK FIGURE
    ===================================================== */

    function drawFighter(
        fighter,
        time,
        ghost = false
    ) {

        const s =
            width < 700
                ? 0.72
                : 1;


        const x =
            fighter.x;


        const y =
            fighter.y;


        const facing =
            fighter.facing;


        const breathing =
            Math.sin(
                time * 3 +
                fighter.x
            ) *
            2;


        const attack =
            fighter.attack;


        const hit =
            fighter.hit;


        const airborne =
            fighter.airborne;


        ctx.save();


        ctx.translate(
            x,
            y +
            (airborne
                ? -45
                : 0)
        );


        ctx.scale(
            facing * s,
            s
        );


        if (ghost) {

            ctx.globalAlpha =
                0.12;

        }


        ctx.lineCap =
            "round";

        ctx.lineJoin =
            "round";


        const lineWidth =
            ghost
                ? 3
                : 4;


        /* AURA */

        if (!ghost) {

            drawAura(
                {
                    x: 0,
                    y: 55,
                    energy:
                        fighter.energy
                },
                time
            );

        }


        /* HEAD */

        ctx.strokeStyle =
            "#080808";


        ctx.fillStyle =
            "#050505";


        ctx.lineWidth =
            lineWidth;


        ctx.beginPath();

        ctx.arc(
            0,
            -72 +
                breathing,
            15,
            0,
            Math.PI * 2
        );

        ctx.fill();

        ctx.stroke();


        /* EYES */

        ctx.fillStyle =
            "#ff2020";


        ctx.shadowColor =
            "#ff0000";


        ctx.shadowBlur =
            ghost
                ? 4
                : 12;


        ctx.beginPath();

        ctx.arc(
            -5,
            -73 +
                breathing,
            2.3,
            0,
            Math.PI * 2
        );

        ctx.fill();


        ctx.beginPath();

        ctx.arc(
            5,
            -73 +
                breathing,
            2.3,
            0,
            Math.PI * 2
        );

        ctx.fill();


        ctx.shadowBlur =
            0;


        /* BODY */

        ctx.strokeStyle =
            ghost
                ? "rgba(255,40,40,0.5)"
                : "#080808";


        ctx.beginPath();

        ctx.moveTo(
            0,
            -57
        );


        ctx.lineTo(
            0,
            8
        );


        ctx.stroke();


        /* CLOAK / ENERGY TRAIL */

        if (!ghost) {

            ctx.strokeStyle =
                "rgba(150,0,0,0.45)";


            ctx.lineWidth =
                3;


            ctx.beginPath();

            ctx.moveTo(
                0,
                -45
            );


            ctx.quadraticCurveTo(
                -22 -
                    Math.sin(time * 4) *
                    5,
                -10,
                -30 -
                    Math.sin(time * 3) *
                    10,
                28
            );


            ctx.stroke();

        }


        /* ARM POSITION */

        let frontArmX =
            32;


        let frontArmY =
            -8;


        let backArmX =
            -25;


        let backArmY =
            5;


        if (
            attack > 0
        ) {

            frontArmX =
                48 +
                attack * 18;


            frontArmY =
                -30 -
                attack * 12;

        }


        if (
            hit > 0
        ) {

            frontArmX =
                25;


            frontArmY =
                -30;

        }


        /* FRONT ARM */

        ctx.beginPath();

        ctx.moveTo(
            0,
            -42
        );


        ctx.lineTo(
            frontArmX,
            frontArmY
        );


        ctx.stroke();


        /* BACK ARM */

        ctx.beginPath();

        ctx.moveTo(
            0,
            -40
        );


        ctx.lineTo(
            backArmX,
            backArmY
        );


        ctx.stroke();


        /* LEGS */

        const walk =
            Math.sin(
                time * 8 +
                fighter.x * 0.01
            ) *
            7;


        ctx.beginPath();

        ctx.moveTo(
            0,
            8
        );


        ctx.lineTo(
            -22 +
                walk,
            52
        );


        ctx.stroke();


        ctx.beginPath();

        ctx.moveTo(
            0,
            8
        );


        ctx.lineTo(
            22 -
                walk,
            52
        );


        ctx.stroke();


        /* SWORD */

        if (
            fighter.sword ||
            attack > 0
        ) {

            ctx.save();


            let swordAngle =
                -0.8;


            if (
                attack > 0.2
            ) {

                swordAngle =
                    -0.8 +
                    attack *
                    2.3;

            }


            ctx.translate(
                frontArmX,
                frontArmY
            );


            ctx.rotate(
                swordAngle
            );


            /* BLADE AURA */

            ctx.strokeStyle =
                "rgba(255,0,0,0.2)";


            ctx.lineWidth =
                8;


            ctx.beginPath();

            ctx.moveTo(
                0,
                0
            );

            ctx.lineTo(
                0,
                -75
            );

            ctx.stroke();


            /* BLADE */

            ctx.strokeStyle =
                "#ff2929";


            ctx.lineWidth =
                3;


            ctx.shadowColor =
                "#ff0000";


            ctx.shadowBlur =
                ghost
                    ? 3
                    : 10;


            ctx.beginPath();

            ctx.moveTo(
                0,
                0
            );

            ctx.lineTo(
                0,
                -75
            );

            ctx.stroke();


            ctx.shadowBlur =
                0;


            /* HANDLE */

            ctx.strokeStyle =
                "#120000";


            ctx.lineWidth =
                5;


            ctx.beginPath();

            ctx.moveTo(
                -7,
                0
            );

            ctx.lineTo(
                7,
                0
            );

            ctx.stroke();


            ctx.restore();

        }


        ctx.restore();

    }


    /* =====================================================
       DRAW AFTERIMAGES
    ===================================================== */

    function drawAfterimages(
        fighter,
        time
    ) {

        fighter.afterimages.forEach(
            ghost => {

                ctx.save();


                ctx.globalAlpha =
                    ghost.life /
                    ghost.maxLife *
                    0.35;


                ctx.translate(
                    ghost.x,
                    ghost.y
                );


                ctx.strokeStyle =
                    "rgba(255,20,20,0.45)";


                ctx.lineWidth =
                    3;


                ctx.beginPath();

                ctx.arc(
                    0,
                    -72,
                    14,
                    0,
                    Math.PI * 2
                );

                ctx.stroke();


                ctx.beginPath();

                ctx.moveTo(
                    0,
                    -57
                );

                ctx.lineTo(
                    0,
                    8
                );

                ctx.moveTo(
                    0,
                    -42
                );

                ctx.lineTo(
                    28,
                    -8
                );

                ctx.moveTo(
                    0,
                    -40
                );

                ctx.lineTo(
                    -22,
                    5
                );

                ctx.moveTo(
                    0,
                    8
                );

                ctx.lineTo(
                    -20,
                    52
                );

                ctx.moveTo(
                    0,
                    8
                );

                ctx.lineTo(
                    20,
                    52
                );

                ctx.stroke();


                ctx.restore();

            }
        );

    }


    /* =====================================================
       DRAW ENERGY SLASH
    ===================================================== */

    function drawSlash(
        slash
    ) {

        const progress =
            1 -
            slash.life /
            slash.maxLife;


        const alpha =
            1 -
            progress;


        ctx.save();


        ctx.translate(
            slash.x,
            slash.y
        );


        ctx.rotate(
            slash.rotation
        );


        ctx.scale(
            slash.direction,
            1
        );


        ctx.globalAlpha =
            alpha;


        ctx.shadowColor =
            "#ff0000";


        ctx.shadowBlur =
            18;


        const gradient =
            ctx.createLinearGradient(
                -slash.length / 2,
                0,
                slash.length / 2,
                0
            );


        gradient.addColorStop(
            0,
            "rgba(255,0,0,0)"
        );


        gradient.addColorStop(
            0.5,
            "rgba(255,30,30,1)"
        );


        gradient.addColorStop(
            1,
            "rgba(255,0,0,0)"
        );


        ctx.strokeStyle =
            gradient;


        ctx.lineWidth =
            slash.height;


        ctx.beginPath();


        ctx.moveTo(
            -slash.length / 2,
            0
        );


        ctx.quadraticCurveTo(
            0,
            -slash.height * 2,
            slash.length / 2,
            0
        );


        ctx.stroke();


        ctx.restore();

    }


    /* =====================================================
       DRAW SHOCKWAVES
    ===================================================== */

    function drawShockwave(
        wave
    ) {

        const progress =
            1 -
            wave.life /
            wave.maxLife;


        const radius =
            wave.radius +
            wave.size *
            progress;


        ctx.save();


        ctx.globalAlpha =
            1 -
            progress;


        ctx.strokeStyle =
            "rgba(255,30,30,0.8)";


        ctx.lineWidth =
            2;


        ctx.shadowColor =
            "#ff0000";


        ctx.shadowBlur =
            10;


        ctx.beginPath();

        ctx.arc(
            wave.x,
            wave.y,
            radius,
            0,
            Math.PI * 2
        );

        ctx.stroke();


        ctx.restore();

    }


    /* =====================================================
       DRAW PARTICLES
    ===================================================== */

    function drawParticles() {

        particles.forEach(
            particle => {

                const alpha =
                    particle.life /
                    particle.maxLife;


                ctx.save();


                ctx.globalAlpha =
                    alpha;


                ctx.fillStyle =
                    "#ff2525";


                ctx.shadowColor =
                    "#ff0000";


                ctx.shadowBlur =
                    8;


                ctx.beginPath();

                ctx.arc(
                    particle.x,
                    particle.y,
                    particle.size,
                    0,
                    Math.PI * 2
                );

                ctx.fill();


                ctx.restore();

            }
        );

    }


    /* =====================================================
       CLASH
    ===================================================== */

    function swordClash() {

        const x =
            (
                hero.x +
                nullEnemy.x
            ) / 2;


        const y =
            Math.min(
                hero.y,
                nullEnemy.y
            ) -
            58;


        hero.attack =
            1;


        nullEnemy.attack =
            1;


        impact(
            x,
            y,
            voidMode
                ? 1.5
                : 1
        );


        createEnergySlash(
            x,
            y,
            1,
            voidMode
                ? 1.5
                : 1
        );


        createEnergySlash(
            x,
            y,
            -1,
            voidMode
                ? 1.5
                : 1
        );


        hero.vx =
            -120;


        nullEnemy.vx =
            120;


        hero.hit =
            0.4;


        nullEnemy.hit =
            0.4;

    }


    /* =====================================================
       HERO DASH
    ===================================================== */

    function heroDash() {

        hero.sword =
            true;


        hero.attack =
            0;


        hero.vx =
            voidMode
                ? 650
                : 480;


        createAfterimage(
            hero
        );


        createEnergySlash(
            hero.x,
            hero.y - 45,
            1,
            voidMode
                ? 1.4
                : 1
        );

    }


    /* =====================================================
       ENEMY DASH
    ===================================================== */

    function enemyDash() {

        nullEnemy.sword =
            true;


        nullEnemy.attack =
            0;


        nullEnemy.vx =
            voidMode
                ? -650
                : -480;


        createAfterimage(
            nullEnemy
        );


        createEnergySlash(
            nullEnemy.x,
            nullEnemy.y - 45,
            -1,
            voidMode
                ? 1.4
                : 1
        );

    }


    /* =====================================================
       JUMP ATTACK
    ===================================================== */

    function jumpAttack(
        fighter,
        direction
    ) {

        fighter.airborne =
            true;


        fighter.vy =
            -480;


        fighter.vx =
            direction *
            (
                voidMode
                    ? 300
                    : 220
            );


        fighter.sword =
            true;


        createAfterimage(
            fighter
        );

    }


    /* =====================================================
       TELEPORT
    ===================================================== */

    function teleportAttack(
        fighter,
        target
    ) {

        const oldX =
            fighter.x;


        fighter.x =
            target.x +
            (
                target.side === "hero"
                    ? -55
                    : 55
            );


        fighter.y =
            target.y;


        fighter.facing =
            fighter.x <
            target.x
                ? 1
                : -1;


        createAfterimage(
            fighter
        );


        burst(
            oldX,
            fighter.y - 50,
            10,
            180
        );


        burst(
            fighter.x,
            fighter.y - 50,
            16,
            260
        );


        fighter.attack =
            1;

    }


    /* =====================================================
       START BATTLE ACTION
    ===================================================== */

    function startAction() {

        const distance =
            Math.abs(
                hero.x -
                nullEnemy.x
            );


        const choice =
            Math.random();


        if (
            distance >
            width * 0.5
        ) {

            phase =
                "dash";

            phaseTime =
                0;

            heroDash();

            setTimeout(
                () => {

                    if (!paused) {

                        phase =
                            "clash";

                        swordClash();

                    }

                },
                voidMode
                    ? 500
                    : 700
            );


            return;

        }


        if (
            choice <
            0.20
        ) {

            phase =
                "clash";

            phaseTime =
                0;

            swordClash();

        }

        else if (
            choice <
            0.40
        ) {

            phase =
                "hero-slash";

            phaseTime =
                0;

            hero.attack =
                1;

            createEnergySlash(
                hero.x,
                hero.y - 55,
                1,
                voidMode
                    ? 1.4
                    : 1
            );

        }

        else if (
            choice <
            0.60
        ) {

            phase =
                "enemy-slash";

            phaseTime =
                0;

            nullEnemy.attack =
                1;

            createEnergySlash(
                nullEnemy.x,
                nullEnemy.y - 55,
                -1,
                voidMode
                    ? 1.4
                    : 1
            );

        }

        else if (
            choice <
            0.78
        ) {

            phase =
                "jump";

            phaseTime =
                0;

            jumpAttack(
                hero,
                1
            );

        }

        else {

            phase =
                "teleport";

            phaseTime =
                0;

            teleportAttack(
                nullEnemy,
                hero
            );

        }

    }


    /* =====================================================
       UPDATE FIGHTER
    ===================================================== */

    function updateFighter(
        fighter,
        dt
    ) {

        fighter.x +=
            fighter.vx *
            dt;


        fighter.vy +=
            1100 *
            dt;


        if (
            fighter.airborne
        ) {

            fighter.y +=
                fighter.vy *
                dt;

        }


        fighter.vx *=
            Math.pow(
                0.001,
                dt
            );


        fighter.attack =
            Math.max(
                0,
                fighter.attack -
                    dt *
                    2.2
            );


        fighter.hit =
            Math.max(
                0,
                fighter.hit -
                    dt *
                    2
            );


        if (
            fighter.airborne &&
            fighter.y >=
                height * 0.78
        ) {

            fighter.y =
                height * 0.78;


            fighter.vy =
                0;


            fighter.airborne =
                false;


            createShockwave(
                fighter.x,
                fighter.y,
                45
            );

        }


        if (
            !fighter.airborne
        ) {

            fighter.y =
                height *
                (
                    width < 700
                        ? 0.76
                        : 0.78
                );

        }


        const margin =
            width < 700
                ? 40
                : 75;


        if (
            fighter.x <
            margin
        ) {

            fighter.x =
                margin;

            fighter.vx =
                Math.abs(
                    fighter.vx
                ) * 0.2;

        }


        if (
            fighter.x >
            width -
            margin
        ) {

            fighter.x =
                width -
                margin;

            fighter.vx =
                -Math.abs(
                    fighter.vx
                ) * 0.2;

        }


        if (
            Math.abs(
                fighter.vx
            ) > 220
        ) {

            if (
                Math.random() <
                dt * 14
            ) {

                createAfterimage(
                    fighter
                );

            }

        }

    }


    /* =====================================================
       UPDATE PARTICLES
    ===================================================== */

    function updateParticles(dt) {

        for (
            let i =
                particles.length - 1;
            i >= 0;
            i--
        ) {

            const p =
                particles[i];


            p.x +=
                p.vx *
                dt;


            p.y +=
                p.vy *
                dt;


            p.vy +=
                p.gravity *
                dt;


            p.vx *=
                0.985;


            p.vy *=
                0.985;


            p.life -=
                dt;


            if (
                p.life <= 0
            ) {

                particles.splice(
                    i,
                    1
                );

            }

        }

    }


    /* =====================================================
       UPDATE SLASHES
    ===================================================== */

    function updateSlashes(dt) {

        for (
            let i =
                slashTrails.length - 1;
            i >= 0;
            i--
        ) {

            slashTrails[i].life -=
                dt;


            if (
                slashTrails[i].life <=
                0
            ) {

                slashTrails.splice(
                    i,
                    1
                );

            }

        }

    }


    /* =====================================================
       UPDATE SHOCKWAVES
    ===================================================== */

    function updateShockwaves(dt) {

        for (
            let i =
                shockwaves.length - 1;
            i >= 0;
            i--
        ) {

            shockwaves[i].life -=
                dt;


            if (
                shockwaves[i].life <=
                0
            ) {

                shockwaves.splice(
                    i,
                    1
                );

            }

        }

    }


    /* =====================================================
       UPDATE AFTERIMAGES
    ===================================================== */

    function updateAfterimages(
        fighter,
        dt
    ) {

        for (
            let i =
                fighter.afterimages.length - 1;
            i >= 0;
            i--
        ) {

            fighter.afterimages[i].life -=
                dt;


            if (
                fighter.afterimages[i].life <=
                0
            ) {

                fighter.afterimages.splice(
                    i,
                    1
                );

            }

        }

    }


    /* =====================================================
       UPDATE BATTLE
    ===================================================== */

    function updateBattle(dt) {

        if (paused) {
            return;
        }


        phaseTime +=
            dt;


        shake *=
            Math.pow(
                0.01,
                dt
            );


        flash =
            Math.max(
                0,
                flash -
                    dt
            );


        updateFighter(
            hero,
            dt
        );


        updateFighter(
            nullEnemy,
            dt
        );


        updateParticles(
            dt
        );


        updateSlashes(
            dt
        );


        updateShockwaves(
            dt
        );


        updateAfterimages(
            hero,
            dt
        );


        updateAfterimages(
            nullEnemy,
            dt
        );


        /* ================================================
           FACING
        ================================================= */

        if (
            phase !==
            "teleport"
        ) {

            hero.facing =
                hero.x <
                nullEnemy.x
                    ? 1
                    : -1;


            nullEnemy.facing =
                nullEnemy.x <
                hero.x
                    ? 1
                    : -1;

        }


        /* ================================================
           COMBAT PHASES
        ================================================= */

        if (
            phase ===
            "dash"
        ) {

            if (
                phaseTime >
                (
                    voidMode
                        ? 0.65
                        : 0.9
                )
            ) {

                swordClash();

                phase =
                    "clash";

                phaseTime =
                    0;

            }

        }


        else if (
            phase ===
            "hero-slash"
        ) {

            if (
                phaseTime >
                0.25
            ) {

                nullEnemy.hit =
                    0.7;


                nullEnemy.vx =
                    260;


                impact(
                    nullEnemy.x,
                    nullEnemy.y - 55,
                    0.7
                );


                phase =
                    "recovery";

                phaseTime =
                    0;

            }

        }


        else if (
            phase ===
            "enemy-slash"
        ) {

            if (
                phaseTime >
                0.25
            ) {

                hero.hit =
                    0.7;


                hero.vx =
                    -260;


                impact(
                    hero.x,
                    hero.y - 55,
                    0.7
                );


                phase =
                    "recovery";

                phaseTime =
                    0;

            }

        }


        else if (
            phase ===
            "clash"
        ) {

            if (
                phaseTime >
                0.45
            ) {

                hero.vx =
                    -200;


                nullEnemy.vx =
                    200;


                hero.attack =
                    0;


                nullEnemy.attack =
                    0;


                phase =
                    "recovery";

                phaseTime =
                    0;

            }

        }


        else if (
            phase ===
            "jump"
        ) {

            if (
                !hero.airborne &&
                phaseTime >
                0.5
            ) {

                phase =
                    "recovery";

                phaseTime =
                    0;

            }

        }


        else if (
            phase ===
            "teleport"
        ) {

            if (
                phaseTime >
                0.4
            ) {

                impact(
                    hero.x,
                    hero.y - 55,
                    0.9
                );


                hero.hit =
                    0.7;


                hero.vx =
                    -300;


                phase =
                    "recovery";

                phaseTime =
                    0;

            }

        }


        else if (
            phase ===
            "recovery"
        ) {

            if (
                phaseTime >
                (
                    voidMode
                        ? 0.7
                        : 1.1
                )
            ) {

                phase =
                    "idle";

                phaseTime =
                    0;

                battleCount++;

            }

        }


        else if (
            phase ===
            "idle"
        ) {

            if (
                phaseTime >
                nextAction
            ) {

                phaseTime =
                    0;


                nextAction =
                    voidMode
                        ? random(
                            1.2,
                            2.4
                        )
                        : random(
                            2.5,
                            4.5
                        );


                startAction();

            }

        }

    }


    /* =====================================================
       DRAW BATTLE
    ===================================================== */

    function drawBattle(time) {

        ctx.clearRect(
            0,
            0,
            width,
            height
        );


        ctx.save();


        /* SCREEN SHAKE */

        if (
            shake >
            0.5
        ) {

            ctx.translate(

                random(
                    -shake,
                    shake
                ),

                random(
                    -shake,
                    shake
                )

            );

        }


        /* ================================================
           EDGE AURAS
        ================================================= */

        const heroGlowX =
            Math.max(
                30,
                hero.x
            );


        const enemyGlowX =
            Math.min(
                width - 30,
                nullEnemy.x
            );


        drawGlow(
            heroGlowX,
            hero.y - 60,
            voidMode
                ? 130
                : 95,
            voidMode
                ? 0.12
                : 0.06
        );


        drawGlow(
            enemyGlowX,
            nullEnemy.y - 60,
            voidMode
                ? 130
                : 95,
            voidMode
                ? 0.12
                : 0.06
        );


        /* ================================================
           GROUND ENERGY
        ================================================= */

        ctx.strokeStyle =
            "rgba(120,0,0,0.16)";


        ctx.lineWidth =
            1;


        ctx.beginPath();


        ctx.moveTo(
            0,
            height * 0.82
        );


        ctx.lineTo(
            width,
            height * 0.82
        );


        ctx.stroke();


        /* ================================================
           AFTERIMAGES
        ================================================= */

        drawAfterimages(
            hero,
            time
        );


        drawAfterimages(
            nullEnemy,
            time
        );


        /* ================================================
           SHOCKWAVES
        ================================================= */

        shockwaves.forEach(
            drawShockwave
        );


        /* ================================================
           SLASHES
        ================================================= */

        slashTrails.forEach(
            drawSlash
        );


        /* ================================================
           PARTICLES
        ================================================= */

        drawParticles();


        /* ================================================
           FIGHTERS
        ================================================= */

        drawFighter(
            hero,
            time
        );


        drawFighter(
            nullEnemy,
            time
        );


        /* ================================================
           VOID CORE BETWEEN THEM
        ================================================= */

        const distance =
            Math.abs(
                hero.x -
                nullEnemy.x
            );


        if (
            distance <
            width * 0.35
        ) {

            const centerX =
                (
                    hero.x +
                    nullEnemy.x
                ) / 2;


            const centerY =
                hero.y -
                65;


            drawGlow(
                centerX,
                centerY,
                voidMode
                    ? 75
                    : 40,
                voidMode
                    ? 0.10
                    : 0.04
            );

        }


        ctx.restore();


        /* ================================================
           FLASH
        ================================================= */

        if (
            flash >
            0
        ) {

            ctx.fillStyle =
                `rgba(255,255,255,${flash})`;


            ctx.fillRect(
                0,
                0,
                width,
                height
            );

        }

    }


    /* =====================================================
       MAIN LOOP
    ===================================================== */

    function animate(
        now
    ) {

        requestAnimationFrame(
            animate
        );


        let dt =
            (
                now -
                lastTime
            ) /
            1000;


        lastTime =
            now;


        dt =
            Math.min(
                dt,
                0.033
            );


        if (
            !document.hidden
        ) {

            paused =
                false;

        } else {

            paused =
                true;

        }


        const time =
            now / 1000;


        updateBattle(
            dt
        );


        drawBattle(
            time
        );

    }


    document.addEventListener(
        "visibilitychange",
        () => {

            paused =
                document.hidden;

            lastTime =
                performance.now();

        }
    );


    requestAnimationFrame(
        animate
    );


    /* =====================================================
       PUBLIC API
    ===================================================== */

    return {

        setVoidMode,

        triggerAttack:
            startAction

    };

}
