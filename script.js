/* =========================================================
   VOIDSPOKEN
   FRESH JAVASCRIPT
   ========================================================= */


/* =========================================================
   BASIC
   ========================================================= */

const body = document.body;


/* =========================================================
   BACKGROUND MUSIC
   intro.mp3
   Starts ONLY after first user interaction
   ========================================================= */

const introAudio =
    document.getElementById("intro-audio");


introAudio.volume = 0.35;

let musicStarted = false;


function startMusic() {

    if (musicStarted) {
        return;
    }


    const playPromise =
        introAudio.play();


    if (playPromise !== undefined) {

        playPromise
            .then(() => {

                musicStarted = true;

                console.log(
                    "VOIDSPOKEN: intro.mp3 PLAYING"
                );

            })
            .catch(error => {

                console.error(
                    "VOIDSPOKEN: MUSIC ERROR",
                    error
                );

            });

    }

}


/*
   First tap/click anywhere.

   This listener is attached directly to
   document so it works even if the user
   taps empty space.
*/

document.addEventListener(
    "pointerdown",
    startMusic,
    {
        once: true
    }
);


/* =========================================================
   HOVER SOUND
   hover.mp3
   ========================================================= */

const hoverSounds = [];

const HOVER_COUNT = 5;


for (
    let i = 0;
    i < HOVER_COUNT;
    i++
) {

    const audio =
        new Audio("./hover.mp3");

    audio.preload = "auto";
    audio.volume = 0.35;

    hoverSounds.push(audio);

}


let hoverIndex = 0;


function playHoverSound() {

    const audio =
        hoverSounds[hoverIndex];


    hoverIndex =
        (hoverIndex + 1) %
        hoverSounds.length;


    audio.currentTime = 0;


    const promise =
        audio.play();


    if (promise !== undefined) {

        promise.catch(() => {});

    }

}


/* =========================================================
   INTERACTIVE ELEMENTS
   ========================================================= */

const interactiveElements =
    document.querySelectorAll(
        "a, button, .card, .skill, .project"
    );


interactiveElements.forEach(
    element => {


        /* Desktop */

        element.addEventListener(
            "pointerenter",
            event => {

                if (
                    event.pointerType ===
                    "mouse"
                ) {

                    playHoverSound();

                }

            }
        );


        /* Mobile */

        element.addEventListener(
            "pointerdown",
            event => {

                if (
                    event.pointerType !==
                    "mouse"
                ) {

                    playHoverSound();

                }

            }
        );

    }
);


/* =========================================================
   RIPPLE EFFECT
   ========================================================= */

document.addEventListener(
    "pointerdown",
    event => {

        const ripple =
            document.createElement("div");


        ripple.className =
            "void-ripple";


        ripple.style.left =
            event.clientX + "px";


        ripple.style.top =
            event.clientY + "px";


        body.appendChild(ripple);


        setTimeout(
            () => {

                ripple.remove();

            },
            800
        );

    }
);


/* =========================================================
   INTRO ANIMATION
   ========================================================= */

const intro =
    document.getElementById(
        "void-intro"
    );


setTimeout(
    () => {

        intro.classList.add(
            "void-intro-out"
        );

    },
    3000
);


setTimeout(
    () => {

        intro.remove();

    },
    4800
);


/* =========================================================
   SECTION REVEAL
   ========================================================= */

const sections =
    document.querySelectorAll(
        "main section"
    );


const observer =
    new IntersectionObserver(
        entries => {

            entries.forEach(
                entry => {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target.classList.add(
                            "visible"
                        );

                    }

                }
            );

        },
        {
            threshold: 0.15
        }
    );


sections.forEach(
    section => {

        observer.observe(
            section
        );

    }
);


/* =========================================================
   SMOOTH NAVIGATION
   ========================================================= */

const navLinks =
    document.querySelectorAll(
        "nav a"
    );


navLinks.forEach(
    link => {

        link.addEventListener(
            "click",
            event => {

                const targetID =
                    link.getAttribute(
                        "href"
                    );


                const target =
                    document.querySelector(
                        targetID
                    );


                if (!target) {
                    return;
                }


                event.preventDefault();


                target.scrollIntoView({
                    behavior: "smooth"
                });


                playHoverSound();

            }
        );

    }
);


/* =========================================================
   ACTIVE NAVIGATION
   ========================================================= */

const navSections =
    document.querySelectorAll(
        "header#home, main section"
    );


const navObserver =
    new IntersectionObserver(
        entries => {

            entries.forEach(
                entry => {

                    if (
                        entry.isIntersecting
                    ) {

                        const id =
                            entry.target.id;


                        navLinks.forEach(
                            link => {

                                link.classList.toggle(
                                    "active",
                                    link.getAttribute(
                                        "href"
                                    ) ===
                                    "#" + id
                                );

                            }
                        );

                    }

                }
            );

        },
        {
            threshold: 0.45
        }
    );


navSections.forEach(
    section => {

        navObserver.observe(
            section
        );

    }
);


/* =========================================================
   CARD TILT
   ========================================================= */

const cards =
    document.querySelectorAll(
        ".card, .skill, .project"
    );


cards.forEach(
    card => {


        card.addEventListener(
            "pointermove",
            event => {

                if (
                    event.pointerType !==
                    "mouse"
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


                const centerX =
                    rect.width / 2;


                const centerY =
                    rect.height / 2;


                const rotateX =
                    ((y - centerY) /
                    centerY) * -4;


                const rotateY =
                    ((x - centerX) /
                    centerX) * 4;


                card.style.transform =
                    `perspective(700px)
                     rotateX(${rotateX}deg)
                     rotateY(${rotateY}deg)
                     translateY(-4px)`;

            }
        );


        card.addEventListener(
            "pointerleave",
            () => {

                card.style.transform =
                    "";

            }
        );

    }
);


/* =========================================================
   VOID MODE
   Type VOID on keyboard
   ========================================================= */

let typed =
    "";


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


        typed =
            typed.slice(-4);


        if (
            typed === "VOID"
        ) {

            body.classList.add(
                "void-mode"
            );


            createExplosion(
                window.innerWidth / 2,
                window.innerHeight / 2
            );


            playHoverSound();


            setTimeout(
                () => {

                    body.classList.remove(
                        "void-mode"
                    );

                },
                8000
            );


            typed = "";

        }

    }
);


/* =========================================================
   MOBILE VOID MODE
   Hold screen for 1.2 seconds
   ========================================================= */

let holdTimer =
    null;


document.addEventListener(
    "pointerdown",
    event => {

        if (
            event.pointerType ===
            "mouse"
        ) {
            return;
        }


        holdTimer =
            setTimeout(
                () => {

                    body.classList.add(
                        "void-mode"
                    );


                    createExplosion(
                        event.clientX,
                        event.clientY
                    );


                    playHoverSound();


                    setTimeout(
                        () => {

                            body.classList.remove(
                                "void-mode"
                            );

                        },
                        8000
                    );

                },
                1200
            );

    }
);


document.addEventListener(
    "pointerup",
    () => {

        clearTimeout(
            holdTimer
        );

    }
);


document.addEventListener(
    "pointercancel",
    () => {

        clearTimeout(
            holdTimer
        );

    }
);


/* =========================================================
   EXPLOSION
   ========================================================= */

function createExplosion(
    x,
    y
) {

    const explosion =
        document.createElement("div");


    explosion.className =
        "void-explosion";


    explosion.style.left =
        x + "px";


    explosion.style.top =
        y + "px";


    body.appendChild(
        explosion
    );


    setTimeout(
        () => {

            explosion.remove();

        },
        1000
    );

}


/* =========================================================
   RANDOM GLITCH
   ========================================================= */

setInterval(
    () => {

        if (
            Math.random() <
            0.25
        ) {

            const glitch =
                document.createElement("div");


            glitch.className =
                "void-glitch";


            body.appendChild(
                glitch
            );


            setTimeout(
                () => {

                    glitch.remove();

                },
                450
            );

        }

    },
    5000
);


/* =========================================================
   SCROLL PROGRESS
   ========================================================= */

const progress =
    document.createElement("div");


progress.id =
    "void-progress";


body.appendChild(
    progress
);


function updateProgress() {

    const maxScroll =
        document.documentElement.scrollHeight -
        window.innerHeight;


    const percentage =
        maxScroll > 0
            ? (
                window.scrollY /
                maxScroll
            ) * 100
            : 0;


    progress.style.width =
        percentage + "%";

}


window.addEventListener(
    "scroll",
    updateProgress,
    {
        passive: true
    }
);


updateProgress();


/* =========================================================
   CONSOLE
   ========================================================= */

console.log(
    "%cVOIDSPOKEN",
    "color:#ff2222;font-size:24px;font-weight:bold;"
);

console.log(
    "%cReality is only the surface.",
    "color:#888;font-size:13px;"
);

console.log(
    "%cThe Void is listening.",
    "color:#aa0000;font-size:12px;"
);
