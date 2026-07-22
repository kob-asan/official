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

        case "definition":

            return createDefinition(block);

        case "word":

            return createWord(block);

        case "example":

            return createExample(block);

        case "question":

            return createQuestion(block);

        case "terminal-interactive":

            return createInteractiveTerminal(block);

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

function createDefinition(block) {

    const definition =
        document.createElement("div");

    definition.className =
        "post-definition fade-in";


    const term =
        document.createElement("strong");

    term.className =
        "post-definition-term";

    term.textContent =
        block.term;


    const text =
        document.createElement("span");

    text.className =
        "post-definition-text";

    text.textContent =
        block.text;


    definition.appendChild(term);

    definition.appendChild(text);


    return definition;

}

function createWord(block) {

    const wrapper =
        document.createElement("div");

    wrapper.className =
        "post-word fade-in";


    block.items.forEach(item => {

        const row =
            document.createElement("div");

        row.className =
            "post-word-row";


        const partOfSpeech =
            document.createElement("span");

        partOfSpeech.className =
            "post-word-part";

        partOfSpeech.textContent =
            item.partOfSpeech;


        const term =
            document.createElement("span");

        term.className =
            "post-word-term";

        term.textContent =
            item.word;


        const meaning =
            document.createElement("span");

        meaning.className =
            "post-word-meaning";

        meaning.textContent =
            item.meaning;


        row.appendChild(partOfSpeech);

        row.appendChild(term);

        row.appendChild(meaning);


        wrapper.appendChild(row);

    });


    return wrapper;

}

function createExample(block) {

    const example =
        document.createElement("div");

    example.className =
        "post-example fade-in";


    const title =
        document.createElement("div");

    title.className =
        "post-example-title";

    title.textContent =
        block.title ?? "例題";


    const question =
        document.createElement("div");

    question.className =
        "post-example-question";

    question.textContent =
        block.question;


    const answer =
        document.createElement("div");

    answer.className =
        "post-example-answer";

    answer.textContent =
        block.answer;


    const explanation =
        document.createElement("div");

    explanation.className =
        "post-example-explanation";

    explanation.textContent =
        block.explanation;


    example.appendChild(title);

    example.appendChild(question);

    example.appendChild(answer);

    example.appendChild(explanation);


    return example;

}

function createQuestion(block) {

    const question =
        document.createElement("div");

    question.className =
        "post-question fade-in";


    const title =
        document.createElement("div");

    title.className =
        "post-question-title";

    title.textContent =
        block.number ?? "CHECK";


    const text =
        document.createElement("div");

    text.className =
        "post-question-text";

    text.textContent =
        block.question;


    const button =
        document.createElement("button");

    button.className =
        "post-question-button";

    button.type =
        "button";

    button.textContent =
        "答えを見る";


    const answer =
        document.createElement("div");

    answer.className =
        "post-question-answer";


    const answerText =
        document.createElement("div");

    answerText.className =
        "post-question-answer-text";

    answerText.textContent =
        block.answer;


    const explanation =
        document.createElement("div");

    explanation.className =
        "post-question-explanation";

    explanation.textContent =
        block.explanation ?? "";


    answer.appendChild(answerText);


    if (block.explanation) {

        answer.appendChild(explanation);

    }


    button.addEventListener("click", () => {

        const isOpen =
            answer.classList.contains("active");


        answer.classList.toggle(
            "active",
            !isOpen
        );


        button.textContent =
            isOpen
                ? "答えを見る"
                : "答えを隠す";

    });


    question.appendChild(title);

    question.appendChild(text);

    question.appendChild(button);

    question.appendChild(answer);


    return question;

}

function createInteractiveTerminal(block) {

    const terminal =
        document.createElement("div");

    terminal.className =
        "post-terminal post-terminal-interactive fade-in";


    const header =
        document.createElement("div");

    header.className =
        "post-terminal-header";


    ["#ff5f57", "#febc2e", "#28c840"].forEach(color => {

        const dot =
            document.createElement("span");

        dot.style.background =
            color;

        header.appendChild(dot);

    });


    terminal.appendChild(header);


    const output =
        document.createElement("div");

    output.className =
        "post-terminal-interactive-output";

    terminal.appendChild(output);


    const inputLine =
        document.createElement("div");

    inputLine.className =
        "post-terminal-interactive-input";


    const prompt =
        document.createElement("span");

    prompt.className =
        "terminal-interactive-prompt";

    prompt.textContent =
        block.prompt ?? "$";


    const input =
        document.createElement("input");

    input.type =
        "text";

    input.autocomplete =
        "off";

    input.autocapitalize =
        "off";

    input.spellcheck =
        false;


    inputLine.appendChild(prompt);

    inputLine.appendChild(input);

    terminal.appendChild(inputLine);


    const history = [];

    let historyIndex = -1;


    function execute(command) {

        const value =
            command.trim().toLowerCase();


        if (!value) return;


        history.push(value);

        historyIndex =
            history.length;


        const commandLine =
            document.createElement("div");

        commandLine.className =
            "terminal-command";

        commandLine.textContent =
            `${block.prompt ?? "$"} ${value}`;

        output.appendChild(
            commandLine
        );


        if (value === "clear") {

            output.innerHTML = "";

            return;

        }

        if (value === "clock") {
            
            createClockModal();
            
            return;
        
        }

        if (value === "weather") {
            
            createWeatherModal();
            
            return;
        }
       
        if (value === "timer") {
           
            createTimerModal();
           
            return;
           
        }

        if (value === "matrix") {
           
            createMatrixEffect();
           
            return;
        
        }

        const result =
            document.createElement("div");

        result.className =
            "terminal-output";


        if (
            Object.prototype.hasOwnProperty.call(
                block.commands,
                value
            )
        ) {

            result.textContent =
                block.commands[value];

        } else {

            result.textContent =
                `command not found: ${value}`;

        }


        output.appendChild(
            result
        );


        terminal.scrollTop =
            terminal.scrollHeight;

    }


    input.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Enter"
            ) {

                execute(
                    input.value
                );

                input.value = "";

                return;

            }


            if (
                event.key === "ArrowUp"
            ) {

                if (
                    history.length === 0
                ) return;


                historyIndex =
                    Math.max(
                        0,
                        historyIndex - 1
                    );


                input.value =
                    history[
                        historyIndex
                    ];

            }


            if (
                event.key === "ArrowDown"
            ) {

                if (
                    history.length === 0
                ) return;


                historyIndex =
                    Math.min(
                        history.length,
                        historyIndex + 1
                    );


                input.value =
                    historyIndex <
                    history.length
                        ? history[
                            historyIndex
                        ]
                        : "";

            }

        }
    );


    terminal.addEventListener(
        "click",
        () => {

            input.focus();

        }
    );


    return terminal;

}

function createClockModal() {

    const existing =
        document.querySelector(
            ".post-clock-modal"
        );

    if (existing) {

        existing.remove();

        return;

    }


    const modal =
        document.createElement("div");

    modal.className =
        "post-clock-modal";


    const backdrop =
        document.createElement("div");

    backdrop.className =
        "post-clock-backdrop";


    const card =
        document.createElement("div");

    card.className =
        "post-clock-card";


    const close =
        document.createElement("button");

    close.className =
        "post-clock-close";

    close.textContent =
        "×";


    const label =
        document.createElement("div");

    label.className =
        "post-clock-label";

    label.textContent =
        "CURRENT TIME";


    const time =
        document.createElement("div");

    time.className =
        "post-clock-time";


    const date =
        document.createElement("div");

    date.className =
        "post-clock-date";


    card.appendChild(close);

    card.appendChild(label);

    card.appendChild(time);

    card.appendChild(date);


    modal.appendChild(backdrop);

    modal.appendChild(card);


    document.body.appendChild(
        modal
    );


    function updateClock() {

        const now =
            new Date();


        time.textContent =
            now.toLocaleTimeString(
                "ja-JP",
                {
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                    hour12: false
                }
            );


        date.textContent =
            now.toLocaleDateString(
                "ja-JP",
                {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    weekday: "long"
                }
            );

    }


    updateClock();


    const interval =
        setInterval(
            updateClock,
            1000
        );


    function closeModal() {

        clearInterval(
            interval
        );

        modal.remove();

    }


    close.addEventListener(
        "click",
        closeModal
    );


    backdrop.addEventListener(
        "click",
        closeModal
    );


    document.addEventListener(
        "keydown",
        function handleKey(event) {

            if (
                event.key === "Escape"
            ) {

                closeModal();

                document.removeEventListener(
                    "keydown",
                    handleKey
                );

            }

        }
    );

}

async function createWeatherModal() {

    const existing =
        document.querySelector(
            ".post-weather-modal"
        );

    if (existing) {

        existing.remove();

        return;

    }


    const modal =
        document.createElement("div");

    modal.className =
        "post-weather-modal";


    const backdrop =
        document.createElement("div");

    backdrop.className =
        "post-weather-backdrop";


    const card =
        document.createElement("div");

    card.className =
        "post-weather-card";


    const close =
        document.createElement("button");

    close.className =
        "post-weather-close";

    close.textContent =
        "×";


    const location =
        document.createElement("div");

    location.className =
        "post-weather-location";

    location.textContent =
        "TOKYO";


    const icon =
        document.createElement("div");

    icon.className =
        "post-weather-icon";


    const temperature =
        document.createElement("div");

    temperature.className =
        "post-weather-temperature";


    const condition =
        document.createElement("div");

    condition.className =
        "post-weather-condition";


    const details =
        document.createElement("div");

    details.className =
        "post-weather-details";


    const updated =
        document.createElement("div");

    updated.className =
        "post-weather-updated";


    card.appendChild(close);

    card.appendChild(location);

    card.appendChild(icon);

    card.appendChild(temperature);

    card.appendChild(condition);

    card.appendChild(details);

    card.appendChild(updated);


    modal.appendChild(backdrop);

    modal.appendChild(card);


    document.body.appendChild(
        modal
    );


    function weatherInfo(code) {

        if (code === 0) {

            return {
                icon: "☀",
                text: "CLEAR SKY"
            };

        }

        if (
            code === 1 ||
            code === 2
        ) {

            return {
                icon: "◐",
                text: "PARTLY CLOUDY"
            };

        }

        if (code === 3) {

            return {
                icon: "☁",
                text: "OVERCAST"
            };

        }

        if (
            code >= 45 &&
            code <= 48
        ) {

            return {
                icon: "≋",
                text: "FOGGY"
            };

        }

        if (
            code >= 51 &&
            code <= 67
        ) {

            return {
                icon: "雨",
                text: "RAIN"
            };

        }

        if (
            code >= 71 &&
            code <= 77
        ) {

            return {
                icon: "❄",
                text: "SNOW"
            };

        }

        if (
            code >= 80 &&
            code <= 82
        ) {

            return {
                icon: "雨",
                text: "SHOWERS"
            };

        }

        if (
            code >= 95
        ) {

            return {
                icon: "⚡",
                text: "THUNDERSTORM"
            };

        }

        return {
            icon: "—",
            text: "UNKNOWN"
        };

    }


    try {

        const response =
            await fetch(
                "https://api.open-meteo.com/v1/forecast" +
                "?latitude=35.6895" +
                "&longitude=139.6917" +
                "&current=" +
                "temperature_2m," +
                "apparent_temperature," +
                "relative_humidity_2m," +
                "weather_code," +
                "wind_speed_10m" +
                "&timezone=Asia%2FTokyo"
            );


        if (!response.ok) {

            throw new Error(
                "Weather API Error"
            );

        }


        const data =
            await response.json();


        const current =
            data.current;


        const weather =
            weatherInfo(
                current.weather_code
            );


        icon.textContent =
            weather.icon;


        temperature.textContent =
            `${Math.round(
                current.temperature_2m
            )}°`;


        condition.textContent =
            weather.text;


        details.innerHTML = `
            <span>
                FEELS LIKE
                ${Math.round(
                    current.apparent_temperature
                )}°
            </span>

            <span>
                WIND
                ${Math.round(
                    current.wind_speed_10m
                )} km/h
            </span>

            <span>
                HUMIDITY
                ${Math.round(
                    current.relative_humidity_2m
                )}%
            </span>
        `;


        updated.textContent =
            `UPDATED ${new Date(
                current.time
            ).toLocaleTimeString(
                "en-US",
                {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: false
                }
            )}`;

    } catch (error) {

        console.error(error);

        icon.textContent =
            "—";

        condition.textContent =
            "UNAVAILABLE";

        updated.textContent =
            "WEATHER DATA UNAVAILABLE";

    }


    function closeModal() {

        modal.remove();

    }


    close.addEventListener(
        "click",
        closeModal
    );


    backdrop.addEventListener(
        "click",
        closeModal
    );


    document.addEventListener(
        "keydown",
        function handleKey(event) {

            if (
                event.key === "Escape"
            ) {

                closeModal();

                document.removeEventListener(
                    "keydown",
                    handleKey
                );

            }

        }
    );

}


function createTimerModal() {

    const existing =
        document.querySelector(
            ".post-timer-modal"
        );

    if (existing) {

        existing.remove();

        return;

    }


    const modal =
        document.createElement("div");

    modal.className =
        "post-timer-modal";


    const backdrop =
        document.createElement("div");

    backdrop.className =
        "post-timer-backdrop";


    const card =
        document.createElement("div");

    card.className =
        "post-timer-card";


    const close =
        document.createElement("button");

    close.className =
        "post-timer-close";

    close.type =
        "button";

    close.textContent =
        "×";


    const label =
        document.createElement("div");

    label.className =
        "post-timer-label";

    label.textContent =
        "TIMER";


    const display =
        document.createElement("div");

    display.className =
        "post-timer-display";


    const minutes =
        document.createElement("input");

    minutes.type =
        "number";

    minutes.min =
        "0";

    minutes.max =
        "999";

    minutes.value =
        "00";

    minutes.inputMode =
        "numeric";

    minutes.setAttribute(
        "aria-label",
        "Minutes"
    );


    const colon =
        document.createElement("span");

    colon.className =
        "post-timer-colon";

    colon.textContent =
        ":";


    const seconds =
        document.createElement("input");

    seconds.type =
        "number";

    seconds.min =
        "0";

    seconds.max =
        "59";

    seconds.value =
        "00";

    seconds.inputMode =
        "numeric";

    seconds.setAttribute(
        "aria-label",
        "Seconds"
    );


    display.appendChild(
        minutes
    );

    display.appendChild(
        colon
    );

    display.appendChild(
        seconds
    );


    const controls =
        document.createElement("div");

    controls.className =
        "post-timer-controls";


    const start =
        document.createElement("button");

    start.type =
        "button";

    start.className =
        "post-timer-start";

    start.textContent =
        "START";


    const pause =
        document.createElement("button");

    pause.type =
        "button";

    pause.className =
        "post-timer-pause";

    pause.textContent =
        "PAUSE";


    const reset =
        document.createElement("button");

    reset.type =
        "button";

    reset.className =
        "post-timer-reset";

    reset.textContent =
        "RESET";


    controls.appendChild(
        start
    );

    controls.appendChild(
        pause
    );

    controls.appendChild(
        reset
    );


    const status =
        document.createElement("div");

    status.className =
        "post-timer-status";


    card.appendChild(
        close
    );

    card.appendChild(
        label
    );

    card.appendChild(
        display
    );

    card.appendChild(
        controls
    );

    card.appendChild(
        status
    );


    modal.appendChild(
        backdrop
    );

    modal.appendChild(
        card
    );


    document.body.appendChild(
        modal
    );


    let remaining =
        0;

    let interval =
        null;

    let running =
        false;


    function getInputTime() {

        const min =
            Math.max(
                0,
                parseInt(
                    minutes.value,
                    10
                ) || 0
            );


        const sec =
            Math.min(
                59,
                Math.max(
                    0,
                    parseInt(
                        seconds.value,
                        10
                    ) || 0
                )
            );


        return (
            min * 60
            + sec
        );

    }


    function updateDisplay() {

        const min =
            Math.floor(
                remaining / 60
            );

        const sec =
            remaining % 60;


        minutes.value =
            String(min)
                .padStart(
                    2,
                    "0"
                );


        seconds.value =
            String(sec)
                .padStart(
                    2,
                    "0"
                );

    }


    function normalizeInput(
        input,
        max
    ) {

        let value =
            parseInt(
                input.value,
                10
            );


        if (
            Number.isNaN(value)
        ) {

            value = 0;

        }


        value =
            Math.max(
                0,
                value
            );


        if (
            max !== null
        ) {

            value =
                Math.min(
                    max,
                    value
                );

        }


        input.value =
            String(value)
                .padStart(
                    2,
                    "0"
                );

    }


    function startTimer() {

        if (running) return;


        if (
            remaining <= 0
        ) {

            remaining =
                getInputTime();

        }


        if (
            remaining <= 0
        ) {

            status.textContent =
                "SET TIME";

            minutes.focus();

            return;

        }


        running =
            true;


        status.textContent =
            "RUNNING";


        minutes.disabled =
            true;

        seconds.disabled =
            true;


        interval =
            setInterval(
                () => {

                    remaining--;

                    updateDisplay();


                    if (
                        remaining <= 0
                    ) {

                        clearInterval(
                            interval
                        );

                        interval =
                            null;

                        running =
                            false;


                        minutes.disabled =
                            false;

                        seconds.disabled =
                            false;


                        status.textContent =
                            "TIME'S UP";

                    }

                },
                1000
            );

    }


    function pauseTimer() {

        if (!running) return;


        clearInterval(
            interval
        );

        interval =
            null;

        running =
            false;


        minutes.disabled =
            false;

        seconds.disabled =
            false;


        status.textContent =
            "PAUSED";

    }


    function resetTimer() {

        clearInterval(
            interval
        );

        interval =
            null;

        running =
            false;

        remaining =
            0;


        minutes.disabled =
            false;

        seconds.disabled =
            false;


        minutes.value =
            "00";

        seconds.value =
            "00";


        status.textContent =
            "";

    }


    start.addEventListener(
        "click",
        startTimer
    );


    pause.addEventListener(
        "click",
        pauseTimer
    );


    reset.addEventListener(
        "click",
        resetTimer
    );


    minutes.addEventListener(
        "change",
        () => {

            if (!running) {

                normalizeInput(
                    minutes,
                    null
                );

                remaining =
                    getInputTime();

            }

        }
    );


    seconds.addEventListener(
        "change",
        () => {

            if (!running) {

                normalizeInput(
                    seconds,
                    59
                );

                remaining =
                    getInputTime();

            }

        }
    );


    minutes.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Enter"
            ) {

                startTimer();

            }

        }
    );


    seconds.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Enter"
            ) {

                startTimer();

            }

        }
    );


    function closeModal() {

        clearInterval(
            interval
        );

        interval =
            null;

        modal.remove();

    }


    close.addEventListener(
        "click",
        closeModal
    );


    backdrop.addEventListener(
        "click",
        closeModal
    );


    function handleKeydown(
        event
    ) {

        if (
            event.key === "Escape"
        ) {

            closeModal();

            document.removeEventListener(
                "keydown",
                handleKeydown
            );

        }

    }


    document.addEventListener(
        "keydown",
        handleKeydown
    );


    minutes.focus();

}


function createMatrixEffect() {

    const existing =
        document.querySelector(
            ".post-matrix-effect"
        );

    if (existing) {

        existing.remove();

        return;

    }


    const canvas =
        document.createElement("canvas");

    canvas.className =
        "post-matrix-effect";


    document.body.appendChild(
        canvas
    );


    const ctx =
        canvas.getContext("2d");


    let width =
        canvas.width =
        window.innerWidth;

    let height =
        canvas.height =
        window.innerHeight;


    const fontSize = 16;

    const columns =
        Math.floor(
            width / fontSize
        );


    const drops =
        Array(columns)
            .fill(1);


    const characters =
        "アカサタナハマヤラワ0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";


    function resize() {

        width =
            canvas.width =
            window.innerWidth;

        height =
            canvas.height =
            window.innerHeight;

    }


    window.addEventListener(
        "resize",
        resize
    );


    function draw() {

        ctx.fillStyle =
            "rgba(0, 0, 0, 0.08)";

        ctx.fillRect(
            0,
            0,
            width,
            height
        );


        ctx.fillStyle =
            "#8AFF5C";

        ctx.font =
            `${fontSize}px "JetBrains Mono", monospace`;


        for (
            let i = 0;
            i < drops.length;
            i++
        ) {

            const char =
                characters[
                    Math.floor(
                        Math.random()
                        * characters.length
                    )
                ];


            const x =
                i * fontSize;

            const y =
                drops[i]
                * fontSize;


            ctx.fillText(
                char,
                x,
                y
            );


            if (
                y > height
                &&
                Math.random() > 0.975
            ) {

                drops[i] = 0;

            }


            drops[i]++;

        }

    }


    const animation =
        setInterval(
            draw,
            45
        );


    setTimeout(
        () => {

            canvas.classList.add(
                "post-matrix-fade"
            );


            setTimeout(
                () => {

                    clearInterval(
                        animation
                    );

                    window.removeEventListener(
                        "resize",
                        resize
                    );

                    canvas.remove();

                },
                1000
            );

        },
        6000
    );

}
