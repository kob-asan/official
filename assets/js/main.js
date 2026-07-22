/* ==========================================================
   MAIN.JS
   Kob_asan Official Site
   ========================================================== */

import { initNavigation } from "./navigation.js";
import { initBackground } from "./background.js";
import { initAnimations } from "./animation.js";
import { initBlog } from "./blog.js";
import { initPost } from "./post.js";
import { initWorks } from "./works.js";
import { initBaseball } from "./baseball.js";

document.addEventListener("DOMContentLoaded", () => {

    initializeSite();

});

function initializeSite() {

    updateCopyrightYear();

    setActiveNavigation();

    initNavigation();

    initBackground();

    initAnimations();

}

function updateCopyrightYear() {

    const year = document.getElementById("copyright-year");

    if (!year) return;

    year.textContent = new Date().getFullYear();

}

function setActiveNavigation() {

    const currentPage = window.location.pathname.split("/").pop() || "index.html";

    const links = document.querySelectorAll(".site-nav a, .footer-nav a");

    links.forEach(link => {

        const href = link.getAttribute("href");

        if (!href) return;

        if (href === currentPage) {

            link.classList.add("active");

        }

    });

}

initBlog();

initPost();

initWorks();

initBaseball();