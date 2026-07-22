/* ==========================================================
   BASEBALL.JS
   Kob_asan Official Site
   ========================================================== */


import {
    fetchJSON
} from "./utils.js";


import {
    refreshAnimations
} from "./animation.js";



const BASEBALL_PATH = "index.json";





export async function initBaseball() {


    const baseballGrid =
        document.querySelector(".baseball-grid");



    if (!baseballGrid) return;



    try {


        const baseball =

            await loadBaseball();



        renderBaseball(

            baseballGrid,

            baseball

        );



    } catch(error) {


        console.error(error);



        showEmptyState(

            baseballGrid

        );


    }


}







/* ==========================================================
   Load Baseball
========================================================== */


async function loadBaseball(){


    const baseball =

        await fetchJSON(

            BASEBALL_PATH

        );



    return baseball.filter(

        item => item.published !== false

    );


}







/* ==========================================================
   Render
========================================================== */


function renderBaseball(

    container,

    baseball

){


    container.innerHTML = "";



    baseball.forEach(item => {


        container.appendChild(

            createBaseballCard(item)

        );


    });



    refreshAnimations();


}







/* ==========================================================
   Card
========================================================== */


function createBaseballCard(item){


    const card =

        document.createElement("a");



    card.className =

        "baseball-card fade-in";



    card.href =

        item.path;



    card.innerHTML = `


        <div class="baseball-info">


            <span class="baseball-category">

                ${item.category}

            </span>



            <h2 class="baseball-title">

                ${item.title}

            </h2>



            <p class="baseball-description">

                ${item.description}

            </p>


        </div>



        <div class="baseball-link">

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


        <div class="baseball-empty fade-in">


            <p>

                No baseball data yet.

            </p>


        </div>


    `;



    refreshAnimations();


}