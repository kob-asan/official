/* ==========================================================
   ANIMATION.JS
   Kob_asan Official Site
   ========================================================== */

const OBSERVER_OPTIONS = {
    root: null,
    rootMargin: "0px 0px -12% 0px",
    threshold: 0.1
};

let observer = null;

export function initAnimations() {

    observer = new IntersectionObserver(
        handleIntersect,
        OBSERVER_OPTIONS
    );

    refreshAnimations();

}

export function refreshAnimations() {

    if (!observer) return;

    const targets = document.querySelectorAll(
        ".fade-in:not(.show)"
    );

    targets.forEach(target => {

        observer.observe(target);

    });

}

function handleIntersect(entries) {

    entries.forEach(entry => {

        if (!entry.isIntersecting) return;

        entry.target.classList.add("show");

        observer.unobserve(entry.target);

    });

}