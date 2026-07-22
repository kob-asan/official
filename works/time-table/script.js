/* ==========================================================
   TIME TABLE
   ========================================================== */

const STORAGE_KEY = "kobasan-timetable";

const inputs = document.querySelectorAll(".timetable input");

const resetButton = document.getElementById("resetButton");

/* ==========================================================
   LOAD
   ========================================================== */

function loadTimetable() {

    const data = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");

    inputs.forEach(input => {

        input.value = data[input.dataset.key] || "";

    });

}

/* ==========================================================
   SAVE
   ========================================================== */

function saveTimetable() {

    const data = {};

    inputs.forEach(input => {

        if (input.value.trim() !== "") {

            data[input.dataset.key] = input.value.trim();

        }

    });

    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));

}

/* ==========================================================
   TODAY
   ========================================================== */

function highlightToday() {

    const today = new Date().getDay();

    const dayMap = {

        1: 1, // Mon
        2: 2, // Tue
        3: 3, // Wed
        4: 4, // Thu
        5: 5, // Fri
        6: 6  // Sat

    };

    if (!dayMap[today]) return;

    const header = document.querySelector(
        `.timetable thead th[data-day="${dayMap[today]}"]`
    );

    if (header) {

        header.classList.add("today");

    }

}

/* ==========================================================
   RESET
   ========================================================== */

function resetTimetable() {

    if (!confirm("時間割をリセットしますか？")) {

        return;

    }

    localStorage.removeItem(STORAGE_KEY);

    inputs.forEach(input => {

        input.value = "";

    });

}

/* ==========================================================
   EVENTS
   ========================================================== */

inputs.forEach(input => {

    input.addEventListener("input", saveTimetable);

});

resetButton.addEventListener("click", resetTimetable);

/* ==========================================================
   INIT
   ========================================================== */

loadTimetable();

highlightToday();