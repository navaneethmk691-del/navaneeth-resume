/* =========================================================
   VOIDSPOKEN — VOID REALM
   FULL SCRIPT
   ========================================================= */

const body = document.body;


/* =========================================================
   AUDIO
   intro.mp3 and hover.mp3 are beside index.html
   ========================================================= */

const BACKGROUND_AUDIO_SRC = "./intro.mp3";
const HOVER_AUDIO_SRC = "./hover.mp3";


/* =========================================================
   BACKGROUND MUSIC
   NO AUTOPLAY
   Starts after first user interaction
   ========================================================= */

const backgroundAudio = document.createElement("audio");

backgroundAudio.src = BACKGROUND_AUDIO_SRC;
backgroundAudio.loop = true;
backgroundAudio.preload = "auto";
backgroundAudio.volume = 0.35;
backgroundAudio.setAttribute("playsinline", "");

body.appendChild(backgroundAudio);

let musicStarted = false;


function startBackgroundMusic() {

    if (musicStarted) {
        return;
    }

    backgroundAudio.play()
        .then(() => {

            musicStarted = true;

            console.log(
                "VOIDSPOKEN: intro.mp3 started"
            );

        })
        .catch(error => {

            console.error(
                "VOIDSPOKEN: intro.mp3 failed",
                error
            );

        });

}


/*
   Any first touch/click starts the music.
*/

document.addEventListener(
    "pointerdown",
    startBackgroundMusic,
    {
        once: true
    }
);


/* =========================================================
   HOVER / TOUCH SOUND
   ========================================================= */

const hoverSounds = [];

for (let i = 0; i < 6; i++) {

    const sound = new Audio(HOVER_AUDIO_SRC);

    sound.preload = "auto";
    sound.volume = 0.35;
    sound.setAttribute("playsinline", "");

    hoverSounds.push(sound);

}


let hoverIndex = 0;


function playHoverSound() {

    const sound =
        hoverSounds[hoverIndex];

    hoverIndex =
        (hoverIndex + 1) %
        hoverSounds.length;

    try {

        sound.currentTime = 0;

        const promise =
            sound.play();

        if (promise) {
            promise.catch(() => {});
        }

    } catch (error) {}

}


/* =========================================================
   VOID INTRO
   ========================================================= */

const intro =
    document.createElement("div");

intro.id =
    "void-intro";

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
   VOID CHAKRA
   ========================================================= */

function createChakra() {

    if (
        document.getElementById("void-chakra")
    ) {
        return;
    }


    const chakra =
        document.createElement("div");

    chakra.id =
        "void-chakra";


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


    for (let i = 0; i < 32; i++) {

        const petal =
            document.createElement("div");

        petal.className =
            "void-chakra-petal";

        const angle =
            i * (360 / 32);

        petal.style.transform =
            `translate(-50%, -100%)
             rotate(${angle}deg)`;

        outer.appendChild(petal);

    }


    for (let i = 0; i < 16; i++) {

        const petal =
            document.createElement("div");

        petal.className =
            "void-chakra-petal";

        const angle =
            i * (360 / 16) + 11.25;

        petal.style.transform =
            `translate(-50%, -100%)
             rotate(${angle}deg)`;

        inner.appendChild(petal);

    }

}


createChakra();


/* =========================================================
   CLOSE INTRO
   ========================================================= */

function closeIntro() {

    intro.classList.add(
        "void-intro-out"
    );


    const chakra =
        document.getElementById(
            "void-chakra"
        );


    if (chakra) {

        setTimeout(() => {

            chakra.classList.add(
                "active"
            );

        }, 900);

    }


    setTimeout(() => {

        if (
            intro &&
            intro.parentNode
        ) {

            intro.remove();

        }

    }, 1800);

}


setTimeout(
    closeIntro,
    3500
);


/* =========================================================
   PARTICLES
   ========================================================= */

const particleContainer =
    document.createElement("div");

particleContainer.id =
    "void-particles";

body.appendChild(
    particleContainer
);


function createParticle() {

    const particle =
        document.createElement("span");

    particle.className =
        "void-particle";


    const size =
        Math.random() * 3 + 1;

    const left =
        Math.random() * 100;

    const duration =
        Math.random() * 8 + 6;

    const delay =
        Math.random() * 6;


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


    particleContainer.appendChild(
        particle
    );


    setTimeout(() => {

        if (
            particle.parentNode
        ) {

            particle.remove();

        }

    }, (duration + delay) * 1000);

}


for (let i = 0; i < 60; i++) {

    createParticle();

}


setInterval(() => {

    createParticle();

}, 350);


/* =========================================================
   INTERACTIVE SOUNDS
   ========================================================= */

const soundTargets =
    document.querySelectorAll(
        "a, button, .card, .skill, .project, nav li, img, input, textarea"
    );


soundTargets.forEach(element => {

    element.addEventListener(
        "pointerenter",
        event => {

            if (
                event.pointerType === "mouse"
            ) {

                playHoverSound();

            }

        }
    );


    element.addEventListener(
        "pointerdown",
        event => {

            if (
                event.pointerType !== "mouse"
            ) {

                playHoverSound();

            }

        }
    );

});


/* =========================================================
   RIPPLE
   ========================================================= */

function createRipple(x, y) {

    const ripple =
        document.createElement("div");

    ripple.className =
        "void-ripple";

    ripple.style.left =
        `${x}px`;

    ripple.style.top =
        `${y}px`;

    body.appendChild(ripple);


    setTimeout(() => {

        if (
            ripple.parentNode
        ) {

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
    {
        passive: true
    }
);


/* =========================================================
   SLASH
   ========================================================= */

function createSlash(x, y) {

    const slash =
        document.createElement("div");

    slash.className =
        "void-slash";


    slash.style.left =
        `${x}px`;

    slash.style.top =
        `${y}px`;


    const rotation =
        Math.random() * 90 - 45;


    slash.style.transform =
        `translate(-50%, -50%)
         rotate(${rotation}deg)`;


    body.appendChild(slash);


    setTimeout(() => {

        if (
            slash.parentNode
        ) {

            slash.remove();

        }

    }, 700);

}


document.addEventListener(
    "dblclick",
    event => {

        createSlash(
            event.clientX,
            event.clientY
        );

    }
);


/* =========================================================
   GLITCH
   ========================================================= */

function createGlitch() {

    const glitch =
        document.createElement("div");

    glitch.className =
        "void-glitch";

    body.appendChild(glitch);


    setTimeout(() => {

        if (
            glitch.parentNode
        ) {

            glitch.remove();

        }

    }, 450);

}


setInterval(() => {

    if (
        Math.random() < 0.25
    ) {

        createGlitch();

    }

}, 5000);


/* =========================================================
   EXPLOSION
   ========================================================= */

function createExplosion(x, y) {

    const explosion =
        document.createElement("div");

    explosion.className =
        "void-explosion";


    explosion.style.left =
        `${x}px`;

    explosion.style.top =
        `${y}px`;


    body.appendChild(explosion);


    setTimeout(() => {

        if (
            explosion.parentNode
        ) {

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


const revealObserver =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (
                    entry.isIntersecting
                ) {

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

    revealObserver.observe(section);

});


/* =========================================================
   NAVIGATION
   ========================================================= */

const navLinks =
    document.querySelectorAll(
        "nav a[href^='#']"
    );


navLinks.forEach(link => {

    link.addEventListener(
        "click",
        event => {

            const targetId =
                link.getAttribute("href");


            const target =
                document.querySelector(
                    targetId
                );


            if (!target) {
                return;
            }


            event.preventDefault();


            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });


            playHoverSound();

        }
    );

});


/* =========================================================
   ACTIVE NAVIGATION
   ========================================================= */

const navSections =
    document.querySelectorAll(
        "main section, header#home"
    );


const navObserver =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (
                    entry.isIntersecting
                ) {

                    const id =
                        entry.target.id;


                    navLinks.forEach(link => {

                        link.classList.toggle(
                            "active",
                            link.getAttribute("href") ===
                            `#${id}`
                        );

                    });

                }

            });

        },
        {
            threshold: 0.45
        }
    );


navSections.forEach(section => {

    navObserver.observe(section);

});


/* =========================================================
   CARD TILT
   ========================================================= */

const tiltElements =
    document.querySelectorAll(
        ".card, .project, .skill"
    );


tiltElements.forEach(element => {

    element.addEventListener(
        "pointermove",
        event => {

            if (
                event.pointerType !== "mouse"
            ) {
                return;
            }


            const rect =
                element.getBoundingClientRect();


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
                centerY) * -5;

            const rotateY =
                ((x - centerX) /
                centerX) * 5;


            element.style.transform =
                `perspective(700px)
                 rotateX(${rotateX}deg)
                 rotateY(${rotateY}deg)
                 translateY(-4px)`;

        }
    );


    element.addEventListener(
        "pointerleave",
        () => {

            element.style.transform =
                "";

        }
    );

});


/* =========================================================
   SCROLL PROGRESS
   ========================================================= */

const progress =
    document.createElement("div");

progress.id =
    "void-progress";

body.appendChild(progress);


function updateProgress() {

    const scrollTop =
        window.scrollY;


    const documentHeight =
        document.documentElement.scrollHeight -
        window.innerHeight;


    const percentage =
        documentHeight > 0
            ? (scrollTop / documentHeight) * 100
            : 0;


    progress.style.width =
        `${percentage}%`;

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


topButton.addEventListener(
    "click",
    () => {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

        playHoverSound();

    }
);


window.addEventListener(
    "scroll",
    () => {

        if (
            window.scrollY > 500
        ) {

            topButton.classList.add(
                "show"
            );

        } else {

            topButton.classList.remove(
                "show"
            );

        }

    },
    {
        passive: true
    }
);


/* =========================================================
   CUSTOM VOID CURSOR
   ========================================================= */

const cursor =
    document.createElement("div");

cursor.className =
    "void-cursor";


cursor.innerHTML = `
    <div class="void-cursor-core"></div>
`;


body.appendChild(cursor);


document.addEventListener(
    "pointermove",
    event => {

        if (
            event.pointerType !== "mouse"
        ) {
            return;
        }


        cursor.style.left =
            `${event.clientX}px`;

        cursor.style.top =
            `${event.clientY}px`;

    },
    {
        passive: true
    }
);


/* =========================================================
   CURSOR CLICK
   ========================================================= */

document.addEventListener(
    "pointerdown",
    event => {

        if (
            event.pointerType === "mouse"
        ) {

            cursor.classList.add(
                "active"
            );


            setTimeout(() => {

                cursor.classList.remove(
                    "active"
                );

            }, 300);

        }

    }
);


/* =========================================================
   PARALLAX
   ========================================================= */

const parallaxElements =
    document.querySelectorAll(
        "[data-parallax]"
    );


window.addEventListener(
    "scroll",
    () => {

        const scroll =
            window.scrollY;


        parallaxElements.forEach(element => {

            const speed =
                parseFloat(
                    element.dataset.parallax
                ) || 0.15;


            element.style.transform =
                `translateY(${scroll * speed}px)`;

        });

    },
    {
        passive: true
    }
);


/* =========================================================
   VOID MODE
   Desktop: type VOID
   Mobile: hold for 1.2 seconds
   ========================================================= */

let typedKeys = "";

let voidMode =
    false;


function activateVoidMode() {

    if (voidMode) {
        return;
    }


    voidMode = true;


    body.classList.add(
        "void-mode"
    );


    createExplosion(
        window.innerWidth / 2,
        window.innerHeight / 2
    );


    playHoverSound();


    setTimeout(() => {

        voidMode = false;

        body.classList.remove(
            "void-mode"
        );

    }, 8000);

}


/* =========================================================
   DESKTOP VOID MODE
   ========================================================= */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key.length !== 1
        ) {
            return;
        }


        typedKeys +=
            event.key.toUpperCase();


        if (
            typedKeys.length > 4
        ) {

            typedKeys =
                typedKeys.slice(-4);

        }


        if (
            typedKeys === "VOID"
        ) {

            activateVoidMode();

            typedKeys = "";

        }

    }
);


/* =========================================================
   MOBILE LONG PRESS
   ========================================================= */

let longPressTimer =
    null;


document.addEventListener(
    "pointerdown",
    event => {

        if (
            event.pointerType === "mouse"
        ) {
            return;
        }


        longPressTimer =
            setTimeout(() => {

                activateVoidMode();

            }, 1200);

    },
    {
        passive: true
    }
);


document.addEventListener(
    "pointerup",
    () => {

        clearTimeout(
            longPressTimer
        );

    },
    {
        passive: true
    }
);


document.addEventListener(
    "pointercancel",
    () => {

        clearTimeout(
            longPressTimer
        );

    },
    {
        passive: true
    }
);


/* =========================================================
   IMAGE IMPACT
   ========================================================= */

const images =
    document.querySelectorAll("img");


images.forEach(image => {

    image.addEventListener(
        "pointerdown",
        event => {

            createExplosion(
                event.clientX,
                event.clientY
            );

        }
    );

});


/* =========================================================
   CORE SKILLS
   ========================================================= */

const coreSkills =
    document.querySelector(
        "#core-skills, #coreskills"
    );


if (coreSkills) {

    const skillItems =
        coreSkills.querySelectorAll(
            ".skill, .card"
        );


    skillItems.forEach(item => {

        item.addEventListener(
            "pointerenter",
            event => {

                if (
                    event.pointerType === "mouse"
                ) {

                    playHoverSound();

                }

            }
        );

    });

}


/* =========================================================
   RESIZE
   ========================================================= */

window.addEventListener(
    "resize",
    () => {

        updateProgress();

    }
);


/* =========================================================
   REDUCED MOTION
   ========================================================= */

if (
    window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches
) {

    document.documentElement.classList.add(
        "reduced-motion"
    );

}


/* =========================================================
   VOIDSPOKEN CONSOLE
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
