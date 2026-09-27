/* ============================================================
   BIRTHDAY WORLD
============================================================ */


/* ============================================================
   ASSET CONFIG
============================================================ */

const ASSETS = {

    bunny: {

        idle: {

            directory:
                "assets/bunny/idle/",

            prefix:
                "Bunny1_Idle_",

            start:
                0,

            end:
                9,

            extension:
                ".png",

            pad:
                3

        },


        run: {

            directory:
                "assets/bunny/run/",

            prefix:
                "Bunny1_Run_",

            start:
                0,

            end:
                7,

            extension:
                ".png",

            pad:
                3

        }

    },


    teddy: {

        idle: {

            directory:
                "assets/teddy/idle/",

            prefix:
                "FA_TEDDY_Idle_Blink_",

            start:
                0,

            end:
                11,

            extension:
                ".png",

            pad:
                3

        },


        run: {

            directory:
                "assets/teddy/run/",

            prefix:
                "",

            start:
                1,

            end:
                10,

            extension:
                ".png",

            pad:
                0

        }

    }

};


/* ============================================================
   FRAME BUILDING (Includes both padded & raw filename checks)
============================================================ */

function buildFramePaths(
    config
) {

    const paths = [];


    for (
        let i = config.start;
        i <= config.end;
        i++
    ) {

        let filename;


        if (
            config.prefix
        ) {

            const numStr =
                config.pad && config.pad > 0
                    ? String(i).padStart(config.pad, "0")
                    : String(i);

            filename =
                `${config.prefix}${numStr}${config.extension}`;

        } else {

            filename =
                `${i}${config.extension}`;

        }


        paths.push(
            config.directory +
            filename
        );

    }


    return paths;

}

/* ============================================================
   AUTOMATIC BACKGROUND MUSIC
============================================================ */
const bgMusic = document.getElementById("bgMusic");

function startAudio() {
    if (!bgMusic) return;
    bgMusic.volume = 0.55;
    bgMusic.play().catch(() => {});
}

// Attempt immediate playback on load
window.addEventListener("load", startAudio);

// Browser safety: if autoplay is blocked, start on the very first touch/click anywhere
["click", "touchstart", "pointerdown"].forEach(eventType => {
    document.addEventListener(eventType, startAudio, { once: true });
});

const FRAME_PATHS = {

    bunny: {

        idle: [
            ...buildFramePaths(ASSETS.bunny.idle),
        ],

        run: [
            ...buildFramePaths(ASSETS.bunny.run),
            ...buildFramePaths({ ...ASSETS.bunny.run, pad: 0 })
        ]

    },


    teddy: {
    idle: buildFramePaths(ASSETS.teddy.idle),
    run: [
        ...buildFramePaths(ASSETS.teddy.run),
        // fallback in case files are named Teddy_Run_1.png or 01.png:
        ...buildFramePaths({ directory: "assets/teddy/run/", prefix: "Teddy_Run_", start: 1, end: 10, extension: ".png" }),
        ...buildFramePaths({ directory: "assets/teddy/run/", prefix: "", start: 1, end: 10, extension: ".png" })
    ]
}

};


/* ============================================================
   DECOR
   ------------------------------------------------------------
   Cute cozy illustrated art cards for the room wall.
============================================================ */

const DECOR = [

    {
        id:
            "art-1",

        emoji:
            "🌿",

        title:
            "sweet sprout",

        sub:
            "grow together",

        x:
            34,

        y:
            13,

        rotation:
            -4,

        width:
            84,

        className:
            "decor-art-item"

    },


    {
        id:
            "art-2",

        emoji:
            "☕",

        title:
            "warm coffee",

        sub:
            "morning vibes",

        x:
            48,

        y:
            16,

        rotation:
            3,

        width:
            82,

        className:
            "decor-art-item"

    },


    {
        id:
            "art-3",

        emoji:
            "✨",

        title:
            "stargazing",

        sub:
            "make a wish",

        x:
            63,

        y:
            14,

        rotation:
            -3,

        width:
            82,

        className:
            "decor-art-item"

    },


    {
        id:
            "art-4",

        emoji:
            "🐱",

        title:
            "soft kitten",

        sub:
            "warm naps",

        x:
            78,

        y:
            22,

        rotation:
            5,

        width:
            86,

        className:
            "decor-art-item"

    }

];


/* ============================================================
   PERSONAL MEMORIES PHOTOS (Placed in the Memories modal)
============================================================ */

const MEMORIES = [

    {
        id:
            "mem-1",

        image:
            "assets/decor/1.jpeg",

        title:
            "that one evening",

        date:
            "always smiling ♡"

    },


    {
        id:
            "mem-2",

        image:
            "assets/decor/2.jpeg",

        title:
            "kamarpaglu boyfriend",

        date:
            "favorite moments ♡"

    },


    {
        id:
            "mem-3",

        image:
            "assets/decor/3.jpeg",

        title:
            "just us",

        date:
            "pure happiness ♡"

    },


    {
        id:
            "mem-4",

        image:
            "assets/decor/4.jpeg",

        title:
            "kamarpaglu boyfriend part 2",

        date:
            "to many more ♡"

    }

];


/* ============================================================
   DECOR RENDERER
============================================================ */

function renderDecor() {

    const container =
        document.getElementById(
            "worldDecor"
        );


    if (
        !container
    ) {

        return;

    }


    container.innerHTML =
        "";


    DECOR.forEach(
        decor => {

            const wrapper =
                document.createElement(
                    "div"
                );


            wrapper.className =
                `world-decor-item ${
                    decor.className || ""
                }`;


            wrapper.dataset.decorId =
                decor.id;


            wrapper.style.left =
                `${decor.x}%`;


            wrapper.style.top =
                `${decor.y}%`;


            wrapper.style.width =
                `${decor.width}px`;


            wrapper.style.transform =
                `rotate(${decor.rotation}deg)`;


            wrapper.innerHTML = `

                <div class="decor-card-art">

                    <span class="decor-art-emoji">${decor.emoji}</span>

                    <span class="decor-art-label">${decor.title}</span>

                    <span class="decor-art-sub">${decor.sub}</span>

                </div>

            `;


            container.appendChild(
                wrapper
            );

        }
    );

}


/* ============================================================
   MEMORIES RENDERER & LIGHTBOX
============================================================ */

function renderMemoriesGallery() {

    const gallery =
        document.getElementById(
            "memoryGallery"
        );


    if (
        !gallery
    ) {

        return;

    }


    gallery.innerHTML =
        "";


    MEMORIES.forEach(
        item => {

            const polaroid =
                document.createElement(
                    "button"
                );


            polaroid.type =
                "button";


            polaroid.className =
                "memory-polaroid";


            polaroid.innerHTML = `

                <div class="polaroid-photo-frame">

                    <img
                        src="${item.image}"
                        alt="${item.title}"
                        draggable="false"
                    >

                </div>

                <div class="polaroid-text">

                    <strong>${item.title}</strong>

                    <span>${item.date}</span>

                </div>

            `;


            polaroid.addEventListener(
                "click",
                () => {

                    openLightbox(
                        item.image,
                        `${item.title} — ${item.date}`
                    );

                }
            );


            gallery.appendChild(
                polaroid
            );

        }
    );

}


function openLightbox(
    src,
    caption
) {

    const lightbox =
        document.getElementById(
            "memoryLightbox"
        );

    const img =
        document.getElementById(
            "lightboxImage"
        );

    const cap =
        document.getElementById(
            "lightboxCaption"
        );


    if (
        !lightbox ||
        !img
    ) {

        return;

    }


    img.src =
        src;

    if (
        cap
    ) {

        cap.textContent =
            caption;

    }


    lightbox.classList.remove(
        "hidden"
    );

}


function closeLightbox() {

    const lightbox =
        document.getElementById(
            "memoryLightbox"
        );


    if (
        lightbox
    ) {

        lightbox.classList.add(
            "hidden"
        );

    }

}


/* ============================================================
   IMAGE PRELOADER
============================================================ */

class ImagePreloader {

    constructor() {

        this.cache =
            new Map();

    }


    load(
        path
    ) {

        if (
            this.cache.has(path)
        ) {

            return Promise.resolve(
                this.cache.get(path)
            );

        }


        return new Promise(
            resolve => {

                const image =
                    new Image();


                image.onload =
                    () => {

                        this.cache.set(
                            path,
                            image
                        );


                        resolve(
                            image
                        );

                    };


                image.onerror =
                    () => {

                        this.cache.set(
                            path,
                            null
                        );


                        resolve(
                            null
                        );

                    };


                image.src =
                    path;

            }
        );

    }


    async loadMany(
        paths
    ) {

        const results =
            await Promise.all(
                paths.map(
                    path =>
                        this.load(path)
                )
            );


        return results.filter(
            Boolean
        );

    }

}


const preloader =
    new ImagePreloader();


/* ============================================================
   SPRITE ANIMATOR
============================================================ */

class SpriteAnimator {

    constructor(
        image,
        defaultFPS = 9
    ) {

        this.image =
            image;

        this.defaultFPS =
            defaultFPS;

        this.animations =
            new Map();

        this.currentAnimation =
            null;

        this.currentFrame =
            0;

        this.fps =
            defaultFPS;

        this.loop =
            true;

        this.running =
            false;

        this.raf =
            null;

        this.lastFrameTime =
            0;

        this.token =
            0;

    }


    addAnimation(
        name,
        frames
    ) {

        const validFrames =
            frames.filter(
                Boolean
            );


        if (
            validFrames.length
        ) {

            this.animations.set(
                name,
                validFrames
            );

        }

    }


    play(
        name,
        options = {}
    ) {

        let frames =
            this.animations.get(
                name
            );


        if (
            !frames ||
            !frames.length
        ) {

            if (
                name === "run" &&
                this.animations.has("idle")
            ) {

                name = "idle";

                frames =
                    this.animations.get(
                        "idle"
                    );

            } else {

                return;

            }

        }


        this.stop();


        this.currentAnimation =
            name;


        this.currentFrame =
            0;


        this.fps =
            options.fps ??
            this.defaultFPS;


        this.loop =
            options.loop ??
            true;


        this.running =
            true;


        this.lastFrameTime =
            performance.now();


        this.token++;


        this.displayFrame();


        const token =
            this.token;


        const tick =
            timestamp => {

                if (
                    !this.running ||
                    token !==
                    this.token
                ) {

                    return;

                }


                const interval =
                    1000 /
                    this.fps;


                if (
                    timestamp -
                    this.lastFrameTime >=
                    interval
                ) {

                    this.lastFrameTime =
                        timestamp;


                    this.currentFrame++;


                    if (
                        this.currentFrame >=
                        frames.length
                    ) {

                        if (
                            !this.loop
                        ) {

                            this.currentFrame =
                                frames.length - 1;


                            this.displayFrame();


                            this.stop();


                            return;

                        }


                        this.currentFrame =
                            0;

                    }


                    this.displayFrame();

                }


                this.raf =
                    requestAnimationFrame(
                        tick
                    );

            };


        this.raf =
            requestAnimationFrame(
                tick
            );

    }


    displayFrame() {

        const frames =
            this.animations.get(
                this.currentAnimation
            );


        if (
            !frames ||
            !frames[
                this.currentFrame
            ]
        ) {

            return;

        }


        if (
            this.image.src !==
            frames[this.currentFrame].src
        ) {

            this.image.src =
                frames[
                    this.currentFrame
                ].src;

        }

    }


    stop() {

        this.running =
            false;


        if (
            this.raf
        ) {

            cancelAnimationFrame(
                this.raf
            );


            this.raf =
                null;

        }

    }

}


/* ============================================================
   CHARACTER
============================================================ */

class Character {

    constructor(
        element,
        image,
        paths
    ) {

        this.element =
            element;

        this.image =
            image;

        this.paths =
            paths;

        this.animator =
            new SpriteAnimator(
                image
            );

        this.position =
            0;

        this.direction =
            "left";

    }


    async load() {

        for (
            const animationName
            of Object.keys(
                this.paths
            )
        ) {

            const images =
                await preloader.loadMany(
                    this.paths[
                        animationName
                    ]
                );


            this.animator.addAnimation(
                animationName,
                images
            );

        }


        const idleFrames =
            this.animator.animations.get(
                "idle"
            );


        if (
            idleFrames &&
            idleFrames.length > 0
        ) {

            this.image.src =
                idleFrames[0].src;

        }

    }


    faceLeft() {

        this.direction =
            "left";


        this.element.classList.remove(
            "facing-right"
        );


        this.element.classList.add(
            "facing-left"
        );

    }


    faceRight() {

        this.direction =
            "right";


        this.element.classList.remove(
            "facing-left"
        );


        this.element.classList.add(
            "facing-right"
        );

    }


    idle() {

        this.element.classList.remove(
            "character-running"
        );


        this.element.classList.add(
            "character-idle"
        );


        this.animator.play(
            "idle",
            {
                fps:
                    8,

                loop:
                    true
            }
        );

    }


    run() {

        this.element.classList.remove(
            "character-idle"
        );


        this.element.classList.add(
            "character-running"
        );


        this.animator.play(
            "run",
            {
                fps:
                    11,

                loop:
                    true
            }
        );

    }


    setPosition(
        percentage
    ) {

        this.position =
            percentage;


        this.element.style.transition =
            "none";


        this.element.style.left =
            `${percentage}%`;

    }


    async moveTo(
        target,
        duration = 900
    ) {

        if (
            target >
            this.position
        ) {

            this.faceRight();

        } else if (
            target <
            this.position
        ) {

            this.faceLeft();

        }


        this.run();


        void this.element.offsetWidth;


        this.element.style.transition =
            `left ${duration}ms cubic-bezier(.25,.46,.45,.94)`;


        this.element.style.left =
            `${target}%`;


        await wait(
            duration
        );


        this.position =
            target;


        this.element.style.transition =
            "none";


        this.idle();

    }

}


/* ============================================================
   UTILITY
============================================================ */

function wait(
    milliseconds
) {

    return new Promise(
        resolve =>
            setTimeout(
                resolve,
                milliseconds
            )
    );

}


/* ============================================================
   SCENES
============================================================ */

const scenes = {

    intro:
        document.getElementById(
            "introScene"
        ),

    website:
        document.getElementById(
            "websiteScene"
        ),

    world:
        document.getElementById(
            "worldScene"
        ),

    memories:
        document.getElementById(
            "memoriesScene"
        ),

    letter:
        document.getElementById(
            "letterScene"
        ),

    gifts:
        document.getElementById(
            "giftScene"
        ),

    guess:
        document.getElementById(
            "guessScene"
        ),

    final:
        document.getElementById(
            "finalScene"
        )

};


let currentScene =
    "intro";


function showScene(
    name
) {

    Object.values(
        scenes
    ).forEach(
        scene => {

            scene.classList.remove(
                "active"
            );

        }
    );


    scenes[name].classList.add(
        "active"
    );


    currentScene =
        name;

}


/* ============================================================
   BEHAVIOR TOKENS
============================================================ */

const behaviorTokens =
    new Map();


function newBehaviorToken(
    name
) {

    const token =
        Symbol(name);


    behaviorTokens.set(
        name,
        token
    );


    return token;

}


function behaviorIsCurrent(
    name,
    token
) {

    return (
        behaviorTokens.get(
            name
        ) ===
        token
    );

}


/* ============================================================
   INTRO LIFE
============================================================ */

async function runIntroBehavior() {

    const token =
        newBehaviorToken(
            "intro"
        );


    const bunny =
        characters.introBunny;


    const teddy =
        characters.introTeddy;


    bunny.setPosition(
        9
    );


    teddy.setPosition(
        76
    );


    bunny.faceRight();
    teddy.faceLeft();


    bunny.idle();
    teddy.idle();


    await wait(
        500
    );


    if (
        !behaviorIsCurrent(
            "intro",
            token
        )
    ) {
        return;
    }


    await bunny.moveTo(
        27,
        1200
    );


    if (
        !behaviorIsCurrent(
            "intro",
            token
        )
    ) {
        return;
    }


    await wait(
        250
    );


    await teddy.moveTo(
        62,
        1000
    );


    if (
        !behaviorIsCurrent(
            "intro",
            token
        )
    ) {
        return;
    }


    await wait(
        250
    );


    await bunny.moveTo(
        39,
        750
    );


    if (
        !behaviorIsCurrent(
            "intro",
            token
        )
    ) {
        return;
    }


    await wait(
        250
    );


    await teddy.moveTo(
        53,
        650
    );


    bunny.faceRight();
    bunny.idle();


    teddy.faceLeft();
    teddy.idle();

}


/* ============================================================
   WEBSITE LIFE
============================================================ */

async function runWebsiteBehavior() {

    const bunny =
        characters.websiteBunny;


    const teddy =
        characters.websiteTeddy;


    bunny.setPosition(
        22
    );


    teddy.setPosition(
        72
    );


    bunny.faceRight();
    teddy.faceLeft();


    bunny.run();


    await wait(
        700
    );


    bunny.idle();


    await wait(
        350
    );


    teddy.run();


    await wait(
        700
    );


    teddy.idle();

}


/* ============================================================
   MAIN WORLD LIFE
============================================================ */

async function runWorldLife() {

    const token =
        newBehaviorToken(
            "world"
        );


    const bunny =
        characters.worldBunny;


    const teddy =
        characters.worldTeddy;


    bunny.setPosition(
        18
    );


    teddy.setPosition(
        70
    );


    bunny.faceRight();
    teddy.faceLeft();


    bunny.idle();
    teddy.idle();


    await wait(
        900
    );


    if (
        !behaviorIsCurrent(
            "world",
            token
        )
    ) {
        return;
    }


    await bunny.moveTo(
        29,
        850
    );


    await wait(
        600
    );


    if (
        !behaviorIsCurrent(
            "world",
            token
        )
    ) {
        return;
    }


    await teddy.moveTo(
        59,
        850
    );


    await wait(
        1100
    );


    if (
        !behaviorIsCurrent(
            "world",
            token
        )
    ) {
        return;
    }


    await bunny.moveTo(
        34,
        650
    );


    await wait(
        900
    );


    if (
        !behaviorIsCurrent(
            "world",
            token
        )
    ) {
        return;
    }


    await teddy.moveTo(
        66,
        750
    );


    await wait(
        1200
    );


    if (
        !behaviorIsCurrent(
            "world",
            token
        )
    ) {
        return;
    }


    await bunny.moveTo(
        22,
        850
    );


    await wait(
        700
    );


    await teddy.moveTo(
        72,
        700
    );


    setTimeout(
        () => {

            if (
                currentScene ===
                "world" &&
                behaviorIsCurrent("world", token)
            ) {

                runWorldLife();

            }

        },
        1800
    );

}


/* ============================================================
   GIFT WORLD LIFE
============================================================ */

async function runGiftLife() {

    const token =
        newBehaviorToken(
            "gifts"
        );


    const bunny =
        characters.giftBunny;


    const teddy =
        characters.giftTeddy;


    bunny.setPosition(
        7
    );


    teddy.setPosition(
        72
    );


    bunny.faceRight();
    teddy.faceLeft();


    bunny.idle();
    teddy.idle();


    await wait(
        550
    );


    if (
        !behaviorIsCurrent(
            "gifts",
            token
        )
    ) {
        return;
    }


    await bunny.moveTo(
        22,
        850
    );


    await wait(
        400
    );


    await teddy.moveTo(
        60,
        800
    );


    await wait(
        900
    );


    await bunny.moveTo(
        29,
        600
    );


    setTimeout(
        () => {

            if (
                currentScene ===
                "gifts" &&
                behaviorIsCurrent("gifts", token)
            ) {

                runGiftLife();

            }

        },
        2200
    );

}


/* ============================================================
   GUESS LIFE
============================================================ */

async function runGuessBehavior() {

    const bunny =
        characters.guessBunny;


    const teddy =
        characters.guessTeddy;


    bunny.faceRight();
    teddy.faceLeft();


    bunny.idle();
    teddy.idle();


    await wait(
        250
    );


    bunny.run();


    await wait(
        430
    );


    bunny.idle();


    await wait(
        250
    );


    teddy.run();


    await wait(
        430
    );


    teddy.idle();

}


/* ============================================================
   FINAL LIFE
============================================================ */

async function runFinalBehavior() {

    const bunny =
        characters.finalBunny;


    const teddy =
        characters.finalTeddy;


    bunny.setPosition(
        10
    );


    teddy.setPosition(
        78
    );


    bunny.faceRight();
    teddy.faceLeft();


    bunny.run();
    teddy.run();


    await wait(
        1000
    );


    bunny.setPosition(
        30
    );


    teddy.setPosition(
        59
    );


    bunny.idle();
    teddy.idle();

}


/* ============================================================
   GIFTS
============================================================ */

const gifts = [

    {
        id:
            1,

        name:
            "Website",

        answers:
            [],

        icon:
            "♡",

        website:
            true

    },


    {
        id:
            2,

        name:
            "Cake",

        answers:
            [
                "cake"
            ],

        icon:
            "🎂"

    },


    {
        id:
            3,

        name:
            "Bouquet",

        answers:
            [
                "bouquet",
                "flower",
                "flowers",
                "flower bouquet"
            ],

        icon:
            "💐"

    },


    {
        id:
            4,

        name:
            "Album",

        answers:
            [
                "album",
                "photo album",
                "picture album"
            ],

        icon:
            "📖"

    },


    {
        id:
            5,

        name:
            "Labubu keychain",

        answers:
            [
                "labubu keychain",
                "labubu",
                "keychain"
            ],

        icon:
            "🧸"

    },


    {
        id:
            6,

        name:
            "Chain",

        answers:
            [
                "chain",
                "necklace"
            ],

        icon:
            "⛓"

    },


    {
        id:
            7,

        name:
            "Jean chain",

        answers:
            [
                "jean chain",
                "jeans chain",
                "pant chain",
                "pants chain"
            ],

        icon:
            "⛓"

    },


    {
        id:
            8,

        name:
            "Aditya Bhalla",

        answers:
            [
                "Aditya Bhalla",
                "Aditya",
                "me",
                "you",
                "yourself",
                "boyfriend"
            ],

        icon:
            "♡"

    },


    {
        id:
            9,

        name:
            "Teddy",

        answers:
            [
                "teddy bear",
                "teddy",
                "bear"
            ],

        icon:
            "🧸"

    },


    {
        id:
            10,

        name:
            "Ittar",

        answers:
            [
                "ittar",
                "attar",
                "perfume",
                "fragrance"
            ],

        icon:
            "♡"

    },


    {
        id:
            11,

        name:
            "Chocolates",

        answers:
            [
                "chocolates",
                "chocolate"
            ],

        icon:
            "🍫"

    },


    {
        id:
            12,

        name:
            "5 foot 9 scroll",

        answers:
            [
                "five foot nine scroll",
                "five nine scroll",
                "five nine",
                "scroll",
                "5 9 scroll"
            ],

        icon:
            "📜"

    },


    {
        id:
            13,

        name:
            "Ramen",

        answers:
            [
                "ramen",
                "noodles"
            ],

        icon:
            "🍜"

    },


    {
        id:
            14,

        name:
            "Dress",

        answers:
            [
                "dress",
                "clothes",
                "clothing"
            ],

        icon:
            "👗"

    },


    {
        id:
            15,

        name:
            "Origami parrots",

        answers:
            [
                "origami parrots",
                "paper parrots",
                "origami",
                "parrots",
                "paper birds",
                "birds"
            ],

        icon:
            "🦜"

    },


    {
        id:
            16,

        name:
            "Portable fan",

        answers:
            [
                "portable fan",
                "mini fan",
                "hand fan",
                "fan"
            ],

        icon:
            "♡"

    },


    {
        id:
            17,

        name:
            "Navel piercing clip-on",

        answers:
            [
                "navel piercing",
                "belly piercing",
                "clip on piercing",
                "clip on",
                "piercing",
                "belly clip"
            ],

        icon:
            "♡"

    },


    {
        id:
            18,

        name:
            "Night light",

        answers:
            [
                "night light",
                "night lamp",
                "lamp",
                "light"
            ],

        icon:
            "✦"

    },


    {
        id:
            19,

        name:
            "Ring",

        answers:
            [],

        secret:
            true,

        icon:
            "?"

    }

];


/* ============================================================
   GAME STATE
============================================================ */

const revealedGifts =
    new Set([
        1
    ]);


const slots =
    new Array(
        19
    ).fill(
        null
    );


slots[0] =
    gifts[0];


let selectedSlot =
    null;


/* ============================================================
   NORMALIZATION
============================================================ */

function normalize(
    value
) {

    return String(
        value
    )
        .toLowerCase()
        .replace(
            /[^a-z0-9\s']/g,
            " "
        )
        .replace(
            /\s+/g,
            " "
        )
        .trim();

}


/* ============================================================
   GLOBAL GIFT MATCHING
============================================================ */

function findMatchingGift(
    rawGuess
) {

    const guess =
        normalize(
            rawGuess
        );


    if (
        !guess
    ) {

        return null;

    }


    const answerEntries = [];


    for (
        const gift of gifts
    ) {

        if (
            gift.website ||
            gift.secret ||
            revealedGifts.has(
                gift.id
            )
        ) {

            continue;

        }


        for (
            const answer of gift.answers
        ) {

            answerEntries.push(
                {
                    gift,
                    answer:
                        normalize(
                            answer
                        )
                }
            );

        }

    }


    answerEntries.sort(
        (
            a,
            b
        ) =>
            b.answer.length -
            a.answer.length
    );


    const exact =
        answerEntries.find(
            entry =>
                guess ===
                entry.answer
        );


    if (
        exact
    ) {

        return exact.gift;

    }


    for (
        const entry of answerEntries
    ) {

        if (
            entry.answer.length < 3
        ) {

            continue;

        }


        if (
            guess.includes(
                entry.answer
            )
        ) {

            return entry.gift;

        }

    }


    return null;

}


/* ============================================================
   GIFT COUNT
============================================================ */

function updateGiftCount() {

    document.getElementById(
        "giftFoundCount"
    ).textContent =
        String(
            revealedGifts.size
        ).padStart(
            2,
            "0"
        );

}


/* ============================================================
   RENDER GIFT ROOM
============================================================ */

function renderGiftWorld() {

    const container =
        document.getElementById(
            "giftObjects"
        );


    container.innerHTML =
        "";


    const colors = [

        "#efa1a6",
        "#a5dce9",
        "#f4d276",
        "#d6b9e7",
        "#efc19f"

    ];


    for (
        let index = 0;
        index < 19;
        index++
    ) {

        const slotNumber =
            index + 1;


        const slotGift =
            slots[index];


        const button =
            document.createElement(
                "button"
            );


        button.type =
            "button";


        button.className =
            "gift-choice";


        const color =
            colors[
                index %
                colors.length
            ];


        if (
            slotGift
        ) {

            button.classList.add(
                "revealed"
            );


            button.innerHTML = `

                <div
                    class="gift-shape"
                    style="background:${color}"
                ></div>

                <div
                    class="gift-lid"
                ></div>

                <div
                    class="gift-ribbon"
                ></div>

                <div
                    class="gift-revealed-content"
                >

                    <span
                        class="gift-revealed-icon"
                    >
                        ${slotGift.icon}
                    </span>

                    <span
                        class="gift-revealed-name"
                    >
                        ${slotGift.name}
                    </span>

                </div>


                <span
                    class="gift-number"
                >
                    ${String(
                        slotNumber
                    ).padStart(
                        2,
                        "0"
                    )}
                </span>


                <span
                    class="gift-revealed-check"
                >
                    ✓
                </span>

            `;


            if (
                slotGift.website
            ) {

                button.addEventListener(
                    "click",
                    () => {

                        showScene(
                            "website"
                        );

                        runWebsiteBehavior();

                    }
                );

            }


        } else {

            button.innerHTML = `

                <div
                    class="gift-shape"
                    style="background:${color}"
                ></div>

                <div
                    class="gift-lid"
                ></div>

                <div
                    class="gift-ribbon"
                ></div>

                <span
                    class="gift-number"
                >
                    ${String(
                        slotNumber
                    ).padStart(
                        2,
                        "0"
                    )}
                </span>

            `;


            button.addEventListener(
                "click",
                () => {

                    openMysterySlot(
                        slotNumber
                    );

                }
            );

        }


        container.appendChild(
            button
        );

    }


    updateGiftCount();

}


/* ============================================================
   OPEN MYSTERY SLOT
============================================================ */

function openMysterySlot(
    slotNumber
) {

    selectedSlot =
        slotNumber;


    document.getElementById(
        "guessSlotText"
    ).textContent =
        `MYSTERY BOX ${
            String(
                slotNumber
            ).padStart(
                2,
                "0"
            )
        }`;


    document.getElementById(
        "guessInput"
    ).value =
        "";


    document.getElementById(
        "guessResult"
    ).textContent =
        "";


    document.getElementById(
        "guessResult"
    ).className =
        "guess-result";


    document.getElementById(
        "nextButton"
    ).classList.add(
        "hidden"
    );


    document.getElementById(
        "nextButton"
    ).textContent =
        "back to gifts →";


    resetGuessPresent();


    showScene(
        "guess"
    );


    runGuessBehavior();

}


/* ============================================================
   RESET GUESS PRESENT
============================================================ */

function resetGuessPresent() {

    document.getElementById(
        "guessPresent"
    ).innerHTML = `

        <div class="big-gift-body"></div>

        <div class="big-gift-lid"></div>

        <div class="big-gift-ribbon"></div>

        <div class="big-gift-bow"></div>

    `;

}


/* ============================================================
   REVEAL PRESENT
============================================================ */

function revealPresent(
    gift
) {

    const present =
        document.getElementById(
            "guessPresent"
        );


    present.animate(
        [
            {
                transform:
                    "scale(1)"
            },

            {
                transform:
                    "scale(1.08) rotate(-4deg)"
            },

            {
                transform:
                    "scale(.92) rotate(4deg)"
            },

            {
                transform:
                    "scale(.72)"
            }

        ],
        {
            duration:
                460,

            easing:
                "ease-out"
        }
    );


    setTimeout(
        () => {

            present.innerHTML = `

                <div
                    style="
                        width:100%;
                        height:100%;
                        display:grid;
                        place-items:center;
                        text-align:center;
                    "
                >

                    <div>

                        <div
                            style="
                                font-size:68px;
                                line-height:1;
                            "
                        >
                            ${gift.icon}
                        </div>

                        <div
                            style="
                                margin-top:8px;
                                color:#60443a;
                                font-size:12px;
                                font-weight:900;
                            "
                        >
                            ${gift.name}
                        </div>

                    </div>

                </div>

            `;

        },
        280
    );

}


/* ============================================================
   CORRECT GUESS
============================================================ */

function handleCorrectGuess(
    gift
) {

    if (
        selectedSlot ===
        null
    ) {

        return;

    }


    if (
        revealedGifts.has(
            gift.id
        )
    ) {

        showWrong();

        return;

    }


    revealedGifts.add(
        gift.id
    );


    slots[
        selectedSlot - 1
    ] =
        gift;


    const result =
        document.getElementById(
            "guessResult"
        );


    result.className =
        "guess-result correct";


    result.textContent =
        `YOU FOUND ${gift.name.toUpperCase()} ♡`;


    revealPresent(
        gift
    );


    renderGiftWorld();


    document.getElementById(
        "nextButton"
    ).classList.remove(
        "hidden"
    );


    if (
        revealedGifts.size >=
        18
    ) {

        document.getElementById(
            "nextButton"
        ).textContent =
            "finish ♡";

    }

}


/* ============================================================
   WRONG
============================================================ */

function showWrong() {

    const result =
        document.getElementById(
            "guessResult"
        );


    result.className =
        "guess-result wrong";


    result.textContent =
        "❌ Nope. Try again!";


    const present =
        document.getElementById(
            "guessPresent"
        );


    present.animate(
        [
            {
                transform:
                    "translateX(0)"
            },

            {
                transform:
                    "translateX(-9px)"
            },

            {
                transform:
                    "translateX(9px)"
            },

            {
                transform:
                    "translateX(-5px)"
            },

            {
                transform:
                    "translateX(5px)"
            },

            {
                transform:
                    "translateX(0)"
            }

        ],
        {
            duration:
                400,

            easing:
                "ease-out"
        }
    );

}


/* ============================================================
   PROCESS GUESS
============================================================ */

function processGuess(
    rawGuess
) {

    const guess =
        normalize(
            rawGuess
        );


    if (
        !guess
    ) {

        return;

    }


    const gift =
        findMatchingGift(
            guess
        );


    if (
        gift
    ) {

        handleCorrectGuess(
            gift
        );

        return;

    }


    showWrong();

}


/* ============================================================
   SPEECH RECOGNITION
============================================================ */

const SpeechRecognitionAPI =
    window.SpeechRecognition ||
    window.webkitSpeechRecognition;


let recognition =
    null;


let isListening =
    false;


const speakButton =
    document.getElementById(
        "speakButton"
    );


const speakText =
    document.getElementById(
        "speakText"
    );


const heardText =
    document.getElementById(
        "heardText"
    );


if (
    SpeechRecognitionAPI
) {

    recognition =
        new SpeechRecognitionAPI();


    recognition.lang =
        "en-IN";


    recognition.continuous =
        false;


    recognition.interimResults =
        true;


    recognition.maxAlternatives =
        5;


    recognition.onstart =
        () => {

            isListening =
                true;


            speakButton.classList.add(
                "listening"
            );


            speakText.textContent =
                "listening...";


            heardText.textContent =
                "I'm listening 👀";

        };


    recognition.onresult =
        event => {

            let transcript =
                "";


            let finalResult =
                false;


            for (
                let i =
                    event.resultIndex;

                i <
                    event.results.length;

                i++
            ) {

                transcript +=
                    event.results[i][0]
                        .transcript;


                if (
                    event.results[i].isFinal
                ) {

                    finalResult =
                        true;

                }

            }


            transcript =
                transcript.trim();


            if (
                transcript
            ) {

                heardText.textContent =
                    `I heard: "${transcript}"`;

            }


            if (
                finalResult &&
                transcript
            ) {

                document.getElementById(
                    "guessInput"
                ).value =
                    transcript;


                setTimeout(
                    () => {

                        processGuess(
                            transcript
                        );

                    },
                    160
                );

            }

        };


    recognition.onerror =
        event => {

            isListening =
                false;


            speakButton.classList.remove(
                "listening"
            );


            speakText.textContent =
                "say your guess";


            const messages = {

                "network":
                    "Chrome's speech service isn't responding. Type the guess instead.",

                "not-allowed":
                    "Microphone permission was denied.",

                "no-speech":
                    "I didn't hear anything. Try again.",

                "audio-capture":
                    "No microphone could be accessed.",

                "service-not-allowed":
                    "Chrome blocked speech recognition.",

                "aborted":
                    "Voice input stopped."

            };


            heardText.textContent =
                messages[
                    event.error
                ] ||
                `Voice input failed (${event.error}).`;

        };


    recognition.onend =
        () => {

            isListening =
                false;


            speakButton.classList.remove(
                "listening"
            );


            speakText.textContent =
                "say your guess";

        };

} else {

    speakButton.disabled =
        true;


    speakText.textContent =
        "voice unavailable";


    heardText.textContent =
        "Voice recognition isn't supported here. You can type your guess.";

}


/* ============================================================
   SPEECH BUTTON
============================================================ */

speakButton.addEventListener(
    "click",
    () => {

        if (
            !recognition
        ) {

            return;

        }


        if (
            isListening
        ) {

            recognition.stop();

            return;

        }


        try {

            recognition.start();

        } catch (
            error
        ) {

            console.warn(
                "Speech start error:",
                error
            );

        }

    }
);


/* ============================================================
   TEXT INPUT
============================================================ */

document.getElementById(
    "guessButton"
).addEventListener(
    "click",
    () => {

        processGuess(
            document.getElementById(
                "guessInput"
            ).value
        );

    }
);


document.getElementById(
    "guessInput"
).addEventListener(
    "keydown",
    event => {

        if (
            event.key ===
            "Enter"
        ) {

            processGuess(
                event.target.value
            );

        }

    }
);


/* ============================================================
   INTRO → WEBSITE
============================================================ */

document.getElementById(
    "firstGiftButton"
).addEventListener(
    "click",
    async () => {

        const button =
            document.getElementById(
                "firstGiftButton"
            );


        button.animate(
            [
                {
                    transform:
                        "translateY(0)"
                },

                {
                    transform:
                        "translateY(-7px) rotate(-3deg)"
                },

                {
                    transform:
                        "translateY(0) rotate(3deg)"
                },

                {
                    transform:
                        "translateY(0)"
                }

            ],
            {
                duration:
                    420
            }
        );


        await wait(
            250
        );


        showScene(
            "website"
        );


        runWebsiteBehavior();

    }
);


/* ============================================================
   INTRO HINT
============================================================ */

document.getElementById(
    "introHint"
).addEventListener(
    "click",
    () => {

        document
            .getElementById(
                "firstGiftButton"
            )
            .animate(
                [
                    {
                        transform:
                            "translateY(0)"
                    },

                    {
                        transform:
                            "translateY(-8px)"
                    },

                    {
                        transform:
                            "translateY(0)"
                    }

                ],
                {
                    duration:
                        450
                }
            );

    }
);


/* ============================================================
   WEBSITE → WORLD
============================================================ */

document.getElementById(
    "enterWorldButton"
).addEventListener(
    "click",
    () => {

        showScene(
            "world"
        );


        renderDecor();


        runWorldLife();

    }
);


/* ============================================================
   WORLD BUTTONS
============================================================ */

document.getElementById(
    "mainPresentButton"
).addEventListener(
    "click",
    () => {

        showScene(
            "gifts"
        );


        renderGiftWorld();


        runGiftLife();

    }
);


document.getElementById(
    "backToWorldButton"
).addEventListener(
    "click",
    () => {

        showScene(
            "world"
        );


        runWorldLife();

    }
);


document.getElementById(
    "memoriesButton"
).addEventListener(
    "click",
    () => {

        renderMemoriesGallery();


        showScene(
            "memories"
        );

    }
);


document.getElementById(
    "letterButton"
).addEventListener(
    "click",
    () => {

        showScene(
            "letter"
        );

    }
);


/* ============================================================
   MODAL CLOSE
============================================================ */

document.querySelectorAll(
    "[data-close]"
).forEach(
    button => {

        button.addEventListener(
            "click",
            () => {

                showScene(
                    "world"
                );


                runWorldLife();

            }
        );

    }
);


/* ============================================================
   LETTER BACK
============================================================ */

document.getElementById(
    "letterBackButton"
).addEventListener(
    "click",
    () => {

        showScene(
            "world"
        );


        runWorldLife();

    }
);


/* ============================================================
   CLOSE GUESS
============================================================ */

document.getElementById(
    "closeGuessButton"
).addEventListener(
    "click",
    () => {

        showScene(
            "gifts"
        );


        renderGiftWorld();


        runGiftLife();

    }
);


/* ============================================================
   NEXT
============================================================ */

document.getElementById(
    "nextButton"
).addEventListener(
    "click",
    () => {

        showScene(
            "gifts"
        );


        renderGiftWorld();


        runGiftLife();

    }
);


/* ============================================================
   LIGHTBOX CLOSE
============================================================ */

const closeLightboxBtn =
    document.getElementById(
        "closeLightboxButton"
    );


if (
    closeLightboxBtn
) {

    closeLightboxBtn.addEventListener(
        "click",
        closeLightbox
    );

}


/* ============================================================
   GIVE UP
============================================================ */

function giveUp() {

    showScene(
        "final"
    );


    runFinalBehavior();

}


document.getElementById(
    "giveUpButton"
).addEventListener(
    "click",
    giveUp
);


document.getElementById(
    "giftGiveUpButton"
).addEventListener(
    "click",
    giveUp
);


const finalBackBtn =
    document.getElementById(
        "finalBackToWorldButton"
    );


if (
    finalBackBtn
) {

    finalBackBtn.addEventListener(
        "click",
        () => {

            showScene(
                "world"
            );

            runWorldLife();

        }
    );

}


/* ============================================================
   IMAGE DRAG PREVENTION
============================================================ */

document.querySelectorAll(
    "img"
).forEach(
    image => {

        image.addEventListener(
            "dragstart",
            event => {

                event.preventDefault();

            }
        );

    }
);


/* ============================================================
   CHARACTER REFERENCES
============================================================ */

const characters = {

    introBunny:
        new Character(

            document.getElementById(
                "introBunny"
            ),

            document.getElementById(
                "introBunnySprite"
            ),

            FRAME_PATHS.bunny

        ),


    introTeddy:
        new Character(

            document.getElementById(
                "introTeddy"
            ),

            document.getElementById(
                "introTeddySprite"
            ),

            FRAME_PATHS.teddy

        ),


    websiteBunny:
        new Character(

            document.getElementById(
                "websiteBunny"
            ),

            document.getElementById(
                "websiteBunnySprite"
            ),

            FRAME_PATHS.bunny

        ),


    websiteTeddy:
        new Character(

            document.getElementById(
                "websiteTeddy"
            ),

            document.getElementById(
                "websiteTeddySprite"
            ),

            FRAME_PATHS.teddy

        ),


    worldBunny:
        new Character(

            document.getElementById(
                "worldBunny"
            ),

            document.getElementById(
                "worldBunnySprite"
            ),

            FRAME_PATHS.bunny

        ),


    worldTeddy:
        new Character(

            document.getElementById(
                "worldTeddy"
            ),

            document.getElementById(
                "worldTeddySprite"
            ),

            FRAME_PATHS.teddy

        ),


    giftBunny:
        new Character(

            document.getElementById(
                "giftBunny"
            ),

            document.getElementById(
                "giftBunnySprite"
            ),

            FRAME_PATHS.bunny

        ),


    giftTeddy:
        new Character(

            document.getElementById(
                "giftTeddy"
            ),

            document.getElementById(
                "giftTeddySprite"
            ),

            FRAME_PATHS.teddy

        ),


    guessBunny:
        new Character(

            document.getElementById(
                "guessBunny"
            ),

            document.getElementById(
                "guessBunnySprite"
            ),

            FRAME_PATHS.bunny

        ),


    guessTeddy:
        new Character(

            document.getElementById(
                "guessTeddy"
            ),

            document.getElementById(
                "guessTeddySprite"
            ),

            FRAME_PATHS.teddy

        ),


    finalBunny:
        new Character(

            document.getElementById(
                "finalBunny"
            ),

            document.getElementById(
                "finalBunnySprite"
            ),

            FRAME_PATHS.bunny

        ),


    finalTeddy:
        new Character(

            document.getElementById(
                "finalTeddy"
            ),

            document.getElementById(
                "finalTeddySprite"
            ),

            FRAME_PATHS.teddy

        )

};


/* ============================================================
   INITIALIZE
============================================================ */

async function initialize() {

    await Promise.all([

        characters.introBunny.load(),
        characters.introTeddy.load(),

        characters.websiteBunny.load(),
        characters.websiteTeddy.load(),

        characters.worldBunny.load(),
        characters.worldTeddy.load(),

        characters.giftBunny.load(),
        characters.giftTeddy.load(),

        characters.guessBunny.load(),
        characters.guessTeddy.load(),

        characters.finalBunny.load(),
        characters.finalTeddy.load()

    ]);


    /* -----------------------------------------
       INITIAL POSITIONS
    ------------------------------------------ */

    characters.introBunny.setPosition(
        9
    );


    characters.introTeddy.setPosition(
        76
    );


    characters.websiteBunny.setPosition(
        22
    );


    characters.websiteTeddy.setPosition(
        72
    );


    characters.worldBunny.setPosition(
        18
    );


    characters.worldTeddy.setPosition(
        70
    );


    characters.giftBunny.setPosition(
        7
    );


    characters.giftTeddy.setPosition(
        72
    );


    characters.finalBunny.setPosition(
        10
    );


    characters.finalTeddy.setPosition(
        78
    );


    /* -----------------------------------------
       DIRECTIONS
    ------------------------------------------ */

    characters.introBunny.faceRight();
    characters.introTeddy.faceLeft();

    characters.websiteBunny.faceRight();
    characters.websiteTeddy.faceLeft();

    characters.worldBunny.faceRight();
    characters.worldTeddy.faceLeft();

    characters.giftBunny.faceRight();
    characters.giftTeddy.faceLeft();

    characters.guessBunny.faceRight();
    characters.guessTeddy.faceLeft();

    characters.finalBunny.faceRight();
    characters.finalTeddy.faceLeft();


    /* -----------------------------------------
       INITIAL IDLE
    ------------------------------------------ */

    characters.introBunny.idle();
    characters.introTeddy.idle();

    characters.websiteBunny.idle();
    characters.websiteTeddy.idle();

    characters.worldBunny.idle();
    characters.worldTeddy.idle();

    characters.giftBunny.idle();
    characters.giftTeddy.idle();

    characters.guessBunny.idle();
    characters.guessTeddy.idle();

    characters.finalBunny.idle();
    characters.finalTeddy.idle();


    /* -----------------------------------------
       DECOR
    ------------------------------------------ */

    renderDecor();


    /* -----------------------------------------
       GIFTS
    ------------------------------------------ */

    renderGiftWorld();


    /* -----------------------------------------
       START
    ------------------------------------------ */

    runIntroBehavior();

}


initialize();