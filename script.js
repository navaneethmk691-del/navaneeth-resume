/* =========================================================
   VOIDSPOKEN RESUME
   JAVASCRIPT EXPERIENCE
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       INTRO SCREEN
       ===================================================== */

    const intro = document.createElement("div");

    intro.id = "void-intro";

    intro.innerHTML = `
        <div id="void-intro-title">VOIDSPOKEN</div>

        <div id="void-intro-subtitle">
            ENTER THE VOID
        </div>
    `;

    document.body.prepend(intro);


    /* =====================================================
       INTRO SOUND
       ===================================================== */

    const introSound = document.createElement("audio");

    introSound.id = "introSound";
    introSound.src = "intro.mp3";
    introSound.preload = "auto";
    introSound.volume = 0.35;

    document.body.appendChild(introSound);


    /* =====================================================
       ENTER THE VOID
       ===================================================== */

    const enterVoid =
        document.querySelector("#void-intro-subtitle");

    let introStarted = false;


    function startIntro(event) {

        event.preventDefault();
        event.stopPropagation();

        if (introStarted) return;

        introStarted = true;


        /* PLAY INTRO SOUND */

        introSound.currentTime = 0;

        introSound.play()
            .then(() => {
                console.log("VOIDSPOKEN intro sound started.");
            })
            .catch(error => {
                console.log("Audio playback failed:", error);
            });


        /* HIDE INTRO */

        intro.classList.add("hide");


        setTimeout(() => {

            if (intro && intro.parentNode) {
                intro.remove();
            }

        }, 1400);

    }


    /* =====================================================
       ENTER THE VOID CLICK
       ===================================================== */

    enterVoid.addEventListener(
        "click",
        startIntro
    );


    /* =====================================================
       ENTER THE VOID TOUCH
       ===================================================== */

    enterVoid.addEventListener(
        "touchend",
        startIntro,
        {
            passive: false
        }
    );


    /* =====================================================
       SMOOTH NAVIGATION
       ===================================================== */

    const navigationLinks =
        document.querySelectorAll("nav a");

    navigationLinks.forEach(link => {

        link.addEventListener("click", event => {

            const targetID =
                link.getAttribute("href");

            if (
                !targetID ||
                !targetID.startsWith("#")
            ) {
                return;
            }

            const target =
                document.querySelector(targetID);

            if (!target) return;

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

    const sections =
        document.querySelectorAll("main section");

    const navLinks =
        document.querySelectorAll("nav a");


    const navigationObserver =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (!entry.isIntersecting) {
                        return;
                    }

                    const sectionID =
                        entry.target.id;

                    navLinks.forEach(link => {

                        link.classList.remove("active");

                        if (
                            link.getAttribute("href") ===
                            `#${sectionID}`
                        ) {
                            link.classList.add("active");
                        }

                    });

                });

            },
            {
                threshold: 0.25
            }
        );


    sections.forEach(section => {
        navigationObserver.observe(section);
    });


    /* =====================================================
       SCROLL REVEAL
       ===================================================== */

    const revealObserver =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("visible");

                        revealObserver.unobserve(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold: 0.12
            }
        );


    sections.forEach(section => {
        revealObserver.observe(section);
    });


    /* =====================================================
       ARTICLE REVEAL
       ===================================================== */

    const articles =
        document.querySelectorAll("article");


    articles.forEach((article, index) => {

        article.style.opacity = "0";

        article.style.transform =
            "translateY(25px)";

        article.style.transition =
            `opacity 0.7s ease ${index * 0.08}s,
             transform 0.7s ease ${index * 0.08}s`;

    });


    const articleObserver =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.style.opacity = "1";

                        entry.target.style.transform =
                            "translateY(0)";

                        articleObserver.unobserve(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold: 0.15
            }
        );


    articles.forEach(article => {
        articleObserver.observe(article);
    });


    /* =====================================================
       MOUSE GLOW
       ===================================================== */

    const glow =
        document.createElement("div");

    glow.id = "mouse-glow";

    glow.style.position = "fixed";
    glow.style.width = "280px";
    glow.style.height = "280px";
    glow.style.borderRadius = "50%";
    glow.style.pointerEvents = "none";
    glow.style.zIndex = "0";

    glow.style.background =
        "radial-gradient(circle, rgba(180,0,30,0.08), transparent 70%)";

    glow.style.transform =
        "translate(-50%, -50%)";

    glow.style.filter =
        "blur(20px)";

    document.body.appendChild(glow);


    document.addEventListener(
        "mousemove",
        event => {

            glow.style.left =
                `${event.clientX}px`;

            glow.style.top =
                `${event.clientY}px`;

        }
    );


    /* =====================================================
       LINK GLOW SOUND
       ===================================================== */

    const hoverSound =
        document.createElement("audio");

    hoverSound.src = "hover.mp3";
    hoverSound.preload = "auto";
    hoverSound.volume = 0.08;

    document.body.appendChild(hoverSound);


    navLinks.forEach(link => {

        link.addEventListener(
            "mouseenter",
            () => {

                hoverSound.currentTime = 0;

                hoverSound.play().catch(() => {});

            }
        );

    });


    /* =====================================================
       TITLE GLITCH
       ===================================================== */

    const mainTitle =
        document.querySelector("header h1");


    if (mainTitle) {

        setInterval(() => {

            mainTitle.style.textShadow = `
                ${Math.random() * 3}px 0
                rgba(255, 0, 40, 0.8),

                ${Math.random() * -3}px 0
                rgba(255, 255, 255, 0.25),

                0 0 25px
                rgba(180, 0, 30, 0.5)
            `;

            setTimeout(() => {

                mainTitle.style.textShadow = "";

            }, 100);

        }, 5000);

    }


    /* =====================================================
       SCROLL DEPTH EFFECT
       ===================================================== */

    let ticking = false;

    window.addEventListener(
        "scroll",
        () => {

            if (!ticking) {

                window.requestAnimationFrame(() => {

                    const scroll =
                        window.scrollY;

                    document.body.style.backgroundPosition =
                        `center ${scroll * 0.03}px`;

                    ticking = false;

                });

                ticking = true;

            }

        }
    );


    /* =====================================================
       KEYBOARD NAVIGATION
       ===================================================== */

    document.addEventListener(
        "keydown",
        event => {

            if (event.key === "Home") {

                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });

            }

            if (event.key === "End") {

                window.scrollTo({
                    top: document.body.scrollHeight,
                    behavior: "smooth"
                });

            }

        }
    );


    /* =====================================================
       CONSOLE SIGNATURE
       ===================================================== */

    console.log(`

╔══════════════════════════════════════╗
║              VOIDSPOKEN              ║
║                                      ║
║       ENTER THE VOID. THINK.         ║
║                                      ║
║       Navaneeth Krishnan M. K.       ║
╚══════════════════════════════════════╝

    `);

});
