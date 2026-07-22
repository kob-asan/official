/* ==========================================================
   POST.JS
   Kob_asan Official Site
   ========================================================== */

import {
    fetchJSON,
    formatDate,
    getQuery
} from "./utils.js";

import {
    refreshAnimations
} from "./animation.js";

const POSTS_DIRECTORY = "posts/";

export async function initPost() {

    const article = document.querySelector(".post");

    if (!article) return;

    const slug = getQuery("post");

    if (!slug) {

        window.location.href = "404.html";

        return;

    }

    try {

        const post = await fetchJSON(
            `${POSTS_DIRECTORY}${slug}.json`
        );

        renderPost(post);

    } catch (error) {

        console.error(error);

        window.location.href = "404.html";

    }

}

function renderPost(post) {

    document.title =
        `${post.title} | Kob_asan Official Site`;

    document.querySelector(".post-category").textContent =
        post.category;

    document.querySelector(".post-title").textContent =
        post.title;

    document.querySelector(".post-date").textContent =
        formatDate(post.date);

    const container =
        document.querySelector(".post-content");

    container.innerHTML = "";

    post.content.forEach(block => {

        container.appendChild(

            createBlock(block)

        );

    });

    refreshAnimations();

}

function createBlock(block) {

    switch (block.type) {

        case "tabs":

            return createTabs(block);

        case "paragraph":

            return createParagraph(block);

        case "heading":

            return createHeading(block);

        case "list":

            return createList(block);

        case "quote":

            return createQuote(block);

        case "code":

            return createCode(block);

        case "note":

            return createNote(block);

        case "image":

            return createImage(block);

        case "link":

            return createLink(block);

        case "divider":

            return document.createElement("hr");

        case "table":

            return createTable(block);

        case "youtube":

            return createYouTube(block);

        case "spotify":

            return createSpotify(block);

        case "alert":

            return createAlert(block);

        case "button":

            return createButton(block);

        case "details":

            return createDetails(block);

        case "download":

            return createDownload(block);

        case "gallery":

            return createGallery(block);

        case "timeline":

            return createTimeline(block);

        case "badges":

            return createBadges(block);

        case "terminal":

            return createTerminal(block);

        case "keyboard":

            return createKeyboard(block);

        case "browser":

            return createBrowser(block);
        
        case "next":

            return createNext(block);

        default:

            return document.createElement("div");

    }

}

function createTabs(block) {

    const wrapper = document.createElement("div");

    wrapper.className = "post-tabs fade-in";


    // =========================
    // ナビ
    // =========================

    const nav = document.createElement("div");

    nav.className = "post-tabs-nav";


    // =========================
    // コンテンツ
    // =========================

    const content = document.createElement("div");

    content.className = "post-tabs-content";



    // =========================
    // タブ作成
    // =========================

    block.tabs.forEach((tab, index) => {


        const button = document.createElement("button");

        button.className = "post-tab";

        button.textContent = tab.title;



        button.addEventListener("click", () => {

            activate(index);

        });


        nav.appendChild(button);


    });



    // =========================
    // タブ切替
    // =========================

    function activate(index) {


        // 全部OFF

        wrapper
            .querySelectorAll(".post-tab")
            .forEach(tab => {

                tab.classList.remove("active");

            });



        // 選択中ON

        nav.children[index]
            .classList.add("active");



        // 内容変更

        renderTab(
            block.tabs[index].content
        );

    }



    // =========================
    // 中身描画
    // =========================

    function renderTab(blocks) {


        content.innerHTML = "";


        blocks.forEach(item => {


            content.appendChild(

                createBlock(item)

            );


        });


        // 動的生成された要素にもアニメーション適用

        refreshAnimations();


    }



    // =========================
    // 初期表示
    // =========================

    activate(0);



    // =========================
    // DOM追加
    // =========================

    wrapper.appendChild(nav);

    wrapper.appendChild(content);



    return wrapper;

}

function createParagraph(block) {

    const p = document.createElement("p");

    p.className = "fade-in";

    p.textContent = block.text;

    return p;

}

function createHeading(block) {

    const level = Math.min(
        Math.max(block.level ?? 2, 2),
        3
    );

    const heading =
        document.createElement(`h${level}`);

    heading.className = "fade-in";

    heading.textContent = block.text;

    return heading;

}

function createQuote(block) {

    const quote =
        document.createElement("blockquote");

    quote.className = "fade-in";

    quote.textContent = block.text;

    return quote;

}

function createNote(block) {

    const note =
        document.createElement("div");

    note.className =
        "post-note fade-in";

    note.textContent =
        block.text;

    return note;

}

function createList(block) {

    const list =
        document.createElement("ul");

    list.className = "fade-in";

    block.items.forEach(item => {

        const li =
            document.createElement("li");

        li.textContent = item;

        list.appendChild(li);

    });

    return list;

}

function createCode(block) {

    const pre =
        document.createElement("pre");

    pre.className = "fade-in";

    const code =
        document.createElement("code");

    code.textContent =
        block.code;

    pre.appendChild(code);

    return pre;

}

function createImage(block) {

    const figure = document.createElement("figure");

    figure.className = "post-image fade-in";


    const image = document.createElement("img");

    image.src = block.src;

    image.alt = block.alt ?? "";

    image.loading = "lazy";


    figure.appendChild(image);


    if (block.caption) {

        const caption =
            document.createElement("figcaption");

        caption.textContent =
            block.caption;

        figure.appendChild(caption);

    }


    return figure;

}

function createLink(block) {

    const card = document.createElement("a");

    card.className = "post-link fade-in";

    card.href = block.url;

    card.target = "_blank";
    card.rel = "noopener noreferrer";

    card.innerHTML = `
        <span class="post-link-title">${block.title}</span>
        <span class="post-link-description">${block.description ?? ""}</span>
        <span class="post-link-url">${block.url}</span>
    `;

    return card;

}

function createTable(block) {

    const wrapper = document.createElement("div");

    wrapper.className = "post-table fade-in";

    const table = document.createElement("table");


    if (block.headers) {

        const thead = document.createElement("thead");

        const tr = document.createElement("tr");

        block.headers.forEach(header => {

            const th = document.createElement("th");

            th.textContent = header;

            tr.appendChild(th);

        });

        thead.appendChild(tr);

        table.appendChild(thead);

    }


    const tbody = document.createElement("tbody");

    block.rows.forEach(row => {

        const tr = document.createElement("tr");

        row.forEach(cell => {

            const td = document.createElement("td");

            td.textContent = cell;

            tr.appendChild(td);

        });

        tbody.appendChild(tr);

    });

    table.appendChild(tbody);

    wrapper.appendChild(table);

    return wrapper;

}

function createYouTube(block) {

    const wrapper = document.createElement("div");

    wrapper.className = "post-youtube fade-in";


    const iframe = document.createElement("iframe");

    iframe.src =
        `https://www.youtube.com/embed/${block.id}`;

    iframe.title =
        block.title ?? "YouTube video";

    iframe.loading = "lazy";

    iframe.allow =
        "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";

    iframe.allowFullscreen = true;


    wrapper.appendChild(iframe);

    return wrapper;

}

function createAlert(block) {

    const alert = document.createElement("div");

    alert.className =
        `post-alert post-alert-${block.style ?? "info"} fade-in`;

    alert.textContent =
        block.text;

    return alert;

}

function createButton(block) {

    const wrapper = document.createElement("div");

    wrapper.className = "post-button fade-in";

    const button = document.createElement("a");

    button.href = block.url;

    button.textContent = block.text;

    button.target = "_blank";

    button.rel = "noopener noreferrer";

    button.className = "button";

    wrapper.appendChild(button);

    return wrapper;

}

function createDetails(block) {

    const details = document.createElement("details");

    details.className = "post-details fade-in";


    const summary = document.createElement("summary");

    summary.textContent = block.summary;

    details.appendChild(summary);


    const wrapper = document.createElement("div");

    wrapper.className = "post-details-content";


    block.content.forEach(child => {

        wrapper.appendChild(

            createBlock(child)

        );

    });


    details.appendChild(wrapper);

    return details;

}

function createDownload(block) {

    const wrapper = document.createElement("div");

    wrapper.className = "post-download fade-in";

    const link = document.createElement("a");

    link.href = block.url;

    link.textContent = block.text;

    link.download = "";

    link.className = "post-download-button";

    wrapper.appendChild(link);

    return wrapper;

}

function createGallery(block) {

    const gallery = document.createElement("div");

    gallery.className = "post-gallery fade-in";

    block.images.forEach(item => {

        const image = document.createElement("img");

        image.src = item.src;

        image.alt = item.alt ?? "";

        image.loading = "lazy";

        gallery.appendChild(image);

    });

    return gallery;

}

function createTimeline(block) {

    const timeline = document.createElement("div");

    timeline.className = "post-timeline fade-in";

    block.items.forEach(item => {

        const entry = document.createElement("div");

        entry.className = "post-timeline-item";

        entry.innerHTML = `
            <div class="post-timeline-date">${item.date}</div>
            <div class="post-timeline-content">
                <h3>${item.title}</h3>
                <p>${item.text}</p>
            </div>
        `;

        timeline.appendChild(entry);

    });

    return timeline;

}

function createBadges(block) {

    const wrapper = document.createElement("div");

    wrapper.className = "post-badges fade-in";

    block.items.forEach(item => {

        const badge = document.createElement("span");

        badge.className = "post-badge";

        badge.textContent = item;

        wrapper.appendChild(badge);

    });

    return wrapper;

}

function createTerminal(block) {

    const terminal = document.createElement("div");

    terminal.className = "post-terminal fade-in";


    const header = document.createElement("div");

    header.className = "post-terminal-header";

    ["#ff5f57", "#febc2e", "#28c840"].forEach(color => {

        const dot = document.createElement("span");

        dot.style.background = color;

        header.appendChild(dot);

    });

    terminal.appendChild(header);


    const pre = document.createElement("pre");


    block.lines.forEach(line => {

        const div = document.createElement("div");

        div.className =
            line.trim().startsWith("$")
                ? "terminal-command"
                : "terminal-output";

        div.textContent = line;

        pre.appendChild(div);

    });


    terminal.appendChild(pre);

    return terminal;

}

function createKeyboard(block) {

    const wrapper = document.createElement("div");

    wrapper.className = "post-keyboard fade-in";

    block.keys.forEach((key, index) => {

        const kbd = document.createElement("kbd");

        kbd.className = "post-key";

        kbd.textContent = key;

        wrapper.appendChild(kbd);

        if (index < block.keys.length - 1) {

            const plus = document.createElement("span");

            plus.className = "post-key-plus";

            plus.textContent = "+";

            wrapper.appendChild(plus);

        }

    });

    return wrapper;

}

function createBrowser(block) {

    const browser = document.createElement("div");

    browser.className = "post-browser fade-in";


    const header = document.createElement("div");

    header.className = "post-browser-header";


    const dots = document.createElement("div");

    dots.className = "post-browser-dots";

    ["#ff5f57", "#febc2e", "#28c840"].forEach(color => {

        const dot = document.createElement("span");

        dot.style.background = color;

        dots.appendChild(dot);

    });
    
    const address = document.createElement("div");
    address.className = "post-browser-address";
    
    const title = document.createElement("div");
    title.className = "post-browser-title";
    title.textContent = block.title ?? "";
    
    address.appendChild(title);

    header.appendChild(dots);
    header.appendChild(address);


    const image = document.createElement("img");

    image.src = block.image;

    image.alt = block.title ?? "";

    image.loading = "lazy";


    browser.appendChild(header);

    browser.appendChild(image);

    return browser;

}

function createSpotify(block) {

    const wrapper = document.createElement("div");

    wrapper.className = "post-spotify fade-in";


    const iframe = document.createElement("iframe");

    iframe.src = block.url;

    iframe.loading = "lazy";

    iframe.allow =
        "autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture";

    wrapper.appendChild(iframe);

    return wrapper;

}

function createNext(block) {

    const section = document.createElement("section");

    section.className = "post-next fade-in";

    section.innerHTML = `
        <div class="post-next-label">
            NEXT LECTURE
        </div>

        <div class="post-next-course">
            ${block.course}
        </div>

        <div class="post-next-date">
            ${block.date}
        </div>

        <p class="post-next-description">
            ${block.description}
        </p>
    `;

    return section;

}