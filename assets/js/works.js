/* ==========================================================
   WORKS.JS
   Kob_asan Official Site
   ========================================================== */


import {
    fetchJSON
} from "./utils.js";


import {
    refreshAnimations
} from "./animation.js";



const WORKS_PATH = "works/index.json";





export async function initWorks() {


    const worksGrid =
        document.querySelector(".works-grid");



    if (!worksGrid) return;



    try {


        const works =
            await loadWorks();



        renderWorks(

            worksGrid,

            works

        );



    } catch(error) {


        console.error(error);



        showEmptyState(

            worksGrid

        );


    }


}







/* ==========================================================
   Load Works
========================================================== */


async function loadWorks(){


    const works =

        await fetchJSON(

            WORKS_PATH

        );



    return works.filter(

        work => work.published !== false

    );


}







/* ==========================================================
   Render
========================================================== */


function renderWorks(

    container,

    works

){


    container.innerHTML = "";



    works.forEach(work => {


        container.appendChild(

            createWorkCard(work)

        );


    });



    refreshAnimations();


}







/* ==========================================================
   Card
========================================================== */


function createWorkCard(work){


    const card =

        document.createElement("a");



    card.className =

        "work-card fade-in";



    card.href =

        work.path;



    card.innerHTML = `


        <div class="work-info">


            <span class="work-category">

                ${work.category}

            </span>



            <h2 class="work-title">

                ${work.title}

            </h2>



            <p class="work-description">

                ${work.description}

            </p>


        </div>



        <div class="work-link">

            →

        </div>


    `;



    return card;


}







/* ==========================================================
   Empty State
========================================================== */


function showEmptyState(container){


    container.innerHTML = `


        <div class="works-empty fade-in">


            <p>

                No works yet.

            </p>


        </div>


    `;



    refreshAnimations();


}