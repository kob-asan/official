/* ==========================================================
   NAVIGATION.JS
   Kob_asan Official Site
   ========================================================== */

export function initNavigation() {

    const header = document.querySelector(".site-header");

    if (!header) return;

    updateHeader(header);

    window.addEventListener("scroll", () => {

        updateHeader(header);

    }, { passive: true });

}

function updateHeader(header) {

    if (window.scrollY > 20) {

        header.classList.add("scrolled");

    } else {

        header.classList.remove("scrolled");

    }

}