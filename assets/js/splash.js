/* ==========================================================
   SPLASH.JS
   Kob_asan Official Site
========================================================== */


const KEY =
"kobasan_first_visit";



document.addEventListener(
"DOMContentLoaded",
()=>{


const splash =
document.querySelector(
"#splash"
);



if(!splash) return;



const first =
!localStorage.getItem(KEY);



localStorage.setItem(
KEY,
"true"
);



const duration =
first ? 1600 : 1000;



setTimeout(
()=>{


splash.classList.add(
"hide"
);



setTimeout(
()=>{


splash.remove();


},
600
);



},
duration
);



}
);