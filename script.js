/* =========================================================
   VOIDSPOKEN
   ANIME BATTLE ENGINE
   ========================================================= */


/* =========================================================
   BASIC
   ========================================================= */

const body =
    document.body;


/* =========================================================
   HOVER SOUND ONLY
   ========================================================= */

const hoverSounds = [];

const HOVER_COUNT = 6;


for (
    let i = 0;
    i < HOVER_COUNT;
    i++
) {

    const sound =
        new Audio("./hover.mp3");

    sound.preload =
        "auto";

    sound.volume =
        0.35;

    hoverSounds.push(
        sound
    );

}


let hoverIndex = 0;


function playHoverSound() {

    const sound =
        hoverSounds[hoverIndex];


    hoverIndex =
        (hoverIndex + 1) %
        hoverSounds.length;


    try {

        sound.currentTime =
            0;

        const promise =
            sound.play();

        if (promise) {

            promise.catch(
                () => {}
            );

        }

    } catch (error) {}

}


/* =========================================================
   INTRO
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

        if (intro) {

            intro.remove();

        }

    },
    4800
);


/* =========================================================
   INTERACTIVE ELEMENTS
   ========================================================= */

const interactive =
    document.querySelectorAll(
        "a, button, .card, .skill, .project"
    );


interactive.forEach(
    element => {


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
   ANIME BATTLE SYSTEM
   ========================================================= */

const battle =
    document.getElementById(
        "anime-battle"
    );


const speedLines =
    document.getElementById(
        "speed-lines"
    );


const battleParticles =
    document.getElementById(
        "battle-particles"
    );


const slashLayer =
    document.getElementById(
        "slash-layer"
    );


const impactLayer =
    document.getElementById(
        "impact-layer"
    );


const energyLayer =
    document.getElementById(
        "energy-layer"
    );


/* =========================================================
   RANDOM POSITION
   ========================================================= */

function randomPosition() {

    return {

        x:
            Math.random() *
            window.innerWidth,

        y:
            Math.random() *
            window.innerHeight

    };

}


/* =========================================================
   ENERGY PARTICLES
   ========================================================= */

function createBattleParticle() {

    const particle =
        document.createElement(
            "span"
        );


    particle.className =
        "battle-particle";


    const position =
        randomPosition();


    particle.style.left =
        position.x + "px";


    particle.style.top =
        position.y + "px";


    particle.style.animationDuration =
        (
            Math.random() * 2 +
            1
        ) + "s";


    particle.style.animationDelay =
        (
            Math.random() * 2
        ) + "s";


    battleParticles.appendChild(
        particle
    );


    setTimeout(
        () => {

            particle.remove();

        },
        4000
    );

}


for (
    let i = 0;
    i < 80;
    i++
) {

    createBattleParticle();

}


setInterval(
    () => {

        createBattleParticle();

    },
    180
);


/* =========================================================
   SPEED LINE
   ========================================================= */

function createSpeedLine() {

    const line =
        document.createElement(
            "span"
        );


    line.className =
        "anime-speed-line";


    line.style.top =
        Math.random() *
        100 +
        "%";


    line.style.left =
        (
            Math.random() *
            120
        ) -
        20 +
        "%";


    line.style.animationDuration =
        (
            Math.random() *
            0.7 +
            0.35
        ) +
        "s";


    speedLines.appendChild(
        line
    );


    setTimeout(
        () => {

            line.remove();

        },
        1500
    );

}


setInterval(
    () => {

        if (
            Math.random() <
            0.7
        ) {

            createSpeedLine();

        }

    },
    140
);


/* =========================================================
   ENERGY WAVE
   ========================================================= */

function createEnergyWave(
    x,
    y
) {

    const wave =
        document.createElement(
            "div"
        );


    wave.className =
        "anime-energy-wave";


    wave.style.left =
        x + "px";


    wave.style.top =
        y + "px";


    energyLayer.appendChild(
        wave
    );


    setTimeout(
        () => {

            wave.remove();

        },
        1000
    );

}


/* =========================================================
   SLASH ATTACK
   ========================================================= */

function createAnimeSlash() {

    const slash =
        document.createElement(
            "div"
        );


    slash.className =
        "anime-slash";


    const fromLeft =
        Math.random() <
        0.5;


    slash.style.top =
        (
            Math.random() *
            90 +
            5
        ) +
        "%";


    if (fromLeft) {

        slash.style.left =
            "-20%";

        slash.classList.add(
            "slash-left"
        );

    } else {

        slash.style.left =
            "120%";

        slash.classList.add(
            "slash-right"
        );

    }


    slashLayer.appendChild(
        slash
    );


    setTimeout(
        () => {

            slash.remove();

        },
        900
    );

}


/* =========================================================
   IMPACT FLASH
   ========================================================= */

function createImpact(
    x,
    y
) {

    const impact =
        document.createElement(
            "div"
        );


    impact.className =
        "anime-impact";


    impact.style.left =
        x + "px";


    impact.style.top =
        y + "px";


    impactLayer.appendChild(
        impact
    );


    setTimeout(
        () => {

            impact.remove();

        },
        800
    );

}


/* =========================================================
   BIG ATTACK
   ========================================================= */

function animeAttack() {

    const x =
        Math.random() *
        window.innerWidth;


    const y =
        Math.random() *
        window.innerHeight;


    createImpact(
        x,
        y
    );


    createEnergyWave(
        x,
        y
    );


    createAnimeSlash();


    setTimeout(
        () => {

            createAnimeSlash();

        },
        120
    );


    setTimeout(
        () => {

            createEnergyWave(
                Math.random() *
                window.innerWidth,

                Math.random() *
                window.innerHeight
            );

        },
        200
    );

}


/* =========================================================
   RANDOM FIGHT SEQUENCE
   ========================================================= */

setInterval(
    () => {

        if (
            Math.random() <
            0.55
        ) {

            animeAttack();

        }

    },
    2400
);


/* =========================================================
   USER TAP = IMPACT
   ========================================================= */

document.addEventListener(
    "pointerdown",
    event => {

        createImpact(
            event.clientX,
            event.clientY
        );


        createEnergyWave(
            event.clientX,
            event.clientY
        );

    }
);


/* =========================================================
   DOUBLE TAP = SLASH
   ========================================================= */

document.addEventListener(
    "dblclick",
    event => {

        createAnimeSlash();


        createImpact(
            event.clientX,
            event.clientY
        );

    }
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
            threshold: 0.12
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


                createImpact(
                    window.innerWidth / 2,
                    window.innerHeight / 2
                );

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


                const rotateX =
                    (
                        (y -
                        rect.height / 2) /
                        (rect.height / 2)
                    ) *
                    -4;


                const rotateY =
                    (
                        (x -
                        rect.width / 2) /
                        (rect.width / 2)
                    ) *
                    4;


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
   SCROLL PROGRESS
   ========================================================= */

const progress =
    document.createElement(
        "div"
    );


progress.id =
    "void-progress";


body.appendChild(
    progress
);


function updateProgress() {

    const max =
        document.documentElement
            .scrollHeight -
        window.innerHeight;


    const percentage =
        max > 0
            ? (
                window.scrollY /
                max
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
   BACK TO TOP
   ========================================================= */

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


body.appendChild(
    topButton
);


topButton.addEventListener(
    "click",
    () => {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });


        playHoverSound();


        createImpact(
            window.innerWidth / 2,
            window.innerHeight / 2
        );

    }
);


window.addEventListener(
    "scroll",
    () => {

        topButton.classList.toggle(
            "show",
            window.scrollY > 500
        );

    },
    {
        passive: true
    }
);


/* =========================================================
   VOID MODE
   Type VOID
   ========================================================= */

let typed =
    "";


document.addEventListener(
    "keydown",
    event => {

        if (
            event.key.length !==
            1
        ) {
            return;
        }


        typed +=
            event.key.toUpperCase();


        typed =
            typed.slice(-4);


        if (
            typed ===
            "VOID"
        ) {

            body.classList.add(
                "void-mode"
            );


            for (
                let i = 0;
                i < 5;
                i++
            ) {

                setTimeout(
                    () => {

                        animeAttack();

                    },
                    i * 180
                );

            }


            setTimeout(
                () => {

                    body.classList.remove(
                        "void-mode"
                    );

                },
                8000
            );


            typed =
                "";

        }

    }
);


/* =========================================================
   MOBILE LONG PRESS
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


                    for (
                        let i = 0;
                        i < 6;
                        i++
                    ) {

                        setTimeout(
                            () => {

                                animeAttack();

                            },
                            i * 160
                        );

                    }


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
   CONSOLE
   ========================================================= */

console.log(
    "%cVOIDSPOKEN",
    "color:#ff2222;font-size:24px;font-weight:bold;"
);

console.log(
    "%cANIME BATTLE SYSTEM ONLINE",
    "color:#ff4444;font-size:12px;"
);

console.log(
    "%cReality is only the surface.",
    "color:#888;font-size:13px;"
);
