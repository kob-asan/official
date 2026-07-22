/* ==========================================================
   BACKGROUND.JS
   Kob_asan Official Site
   ========================================================== */

const STAR_COUNT = 7;

export function initBackground() {

    createStars();

}

function createStars() {

    const stars = document.querySelector(".stars");

    if (!stars) return;

    stars.innerHTML = "";

    for (let i = 0; i < STAR_COUNT; i++) {

        const star = document.createElement("span");

        const size = random(2, 9);

        star.style.width = `${size}px`;
        star.style.height = `${size}px`;

        star.style.opacity = random(.35, .75);

        const colors = [
                "#8edcff",
                "#7fffd4",
                "#b8f5ff"
            ];

    const color = 
    colors[
        Math.floor(
            Math.random() * colors.length
        )
    ];

star.style.background = color;

star.style.boxShadow =
    `0 0 18px ${color}`;
    

        star.style.animationDelay = `${random(0, 10)}s`;

        star.style.animationDuration =
            `${random(4, 6)}s, ${random(25, 35)}s`;

        stars.appendChild(star);

    }

}

function random(min, max) {

    return Math.random() * (max - min) + min;

}