/* ==========================================
   Kob_asan Works #001
   Digital Rain
========================================== */



"use strict";



/* ==========================================
   Canvas
========================================== */

const canvas =
    document.getElementById(
        "rainCanvas"
    );

const ctx =
    canvas.getContext(
        "2d"
    );



let width = 0;
let height = 0;

let columns = 0;

let drops = [];

let animationId = null;

let paused = false;



/* ==========================================
   Configuration
========================================== */

const CONFIG = {

    fontSize: 20,

    fadeAlpha: 0.08,

    speedMin: 0.8,

    speedMax: 1.8,

    glow: 18,

    density: 1,

    mouseRadius: 140,

    rippleSpeed: 5,

    rippleLife: 80

};



/* ==========================================
   Character Set
========================================== */

const CHARACTERS = (

    "0123456789" +

    "ABCDEFGHIJKLMNOPQRSTUVWXYZ" +

    "abcdefghijklmnopqrstuvwxyz" +

    "αβγδεζηθικλμνξοπρστυφχψω" +

    "Σ∫∞π√≈≠±×÷<>"

).split("");



/* ==========================================
   Colors
========================================== */

const COLORS = [

    "#6ee7ff",

    "#41ffd9",

    "#6da8ff",

    "#8df7ff",

    "#ffffff"

];



/* ==========================================
   Ripple
========================================== */

const ripples = [];



/* ==========================================
   Mouse
========================================== */

const mouse = {

    x: -9999,

    y: -9999

};



/* ==========================================
   Utility
========================================== */

function random(min, max){

    return Math.random()

        *

        (max - min)

        +

        min;

}



function randomItem(array){

    return array[

        Math.floor(

            Math.random()

            *

            array.length

        )

    ];

}



/* ==========================================
   Resize
========================================== */

function resizeCanvas(){


    const ratio =
        window.devicePixelRatio || 1;


    width =
        window.innerWidth;

    height =
        window.innerHeight;



    canvas.width =
        width * ratio;

    canvas.height =
        height * ratio;



    canvas.style.width =
        width + "px";

    canvas.style.height =
        height + "px";



    ctx.setTransform(

        ratio,

        0,

        0,

        ratio,

        0,

        0

    );



    columns =

        Math.floor(

            width /

            CONFIG.fontSize

        );



    createDrops();

}



/* ==========================================
   Rain Drop
========================================== */

class RainDrop{


    constructor(column){

        this.column = column;

        this.reset();

    }



    reset(){

        this.y =

            random(

                -height,

                0

            );



        this.speed =

            random(

                CONFIG.speedMin,

                CONFIG.speedMax

            );



        this.color =

            randomItem(

                COLORS

            );



        this.character =

            randomItem(

                CHARACTERS

            );

    }



    update(){

        this.y +=

            this.speed *

            CONFIG.fontSize;



        if(

            Math.random()

            >

            0.95

        ){

            this.character =

                randomItem(

                    CHARACTERS

                );

        }



        if(

            this.y >

            height +

            CONFIG.fontSize

        ){

            this.reset();

        }

    }

}
/* ==========================================
   Create Drops
========================================== */

function createDrops(){

    drops = [];

    for(

        let i = 0;
        i < columns * CONFIG.density;
        i++

    ){

        drops.push(

            new RainDrop(i)

        );

    }

}





/* ==========================================
   Ripple Drawing
========================================== */

function drawRipples(){


    for(

        let i = ripples.length - 1;
        i >= 0;
        i--

    ){


        const ripple =
            ripples[i];



        ripple.radius +=
            CONFIG.rippleSpeed;


        ripple.life--;



        const alpha =
            ripple.life /
            CONFIG.rippleLife;



        ctx.beginPath();

        ctx.arc(

            ripple.x,

            ripple.y,

            ripple.radius,

            0,

            Math.PI * 2

        );



        ctx.strokeStyle =

            `rgba(120,220,255,${alpha * .5})`;


        ctx.lineWidth = 2;


        ctx.stroke();




        if(

            ripple.life <= 0

        ){

            ripples.splice(
                i,
                1
            );

        }


    }

}






/* ==========================================
   Rain Drawing
========================================== */

function drawRain(){



    ctx.fillStyle =

        `rgba(
            5,
            8,
            20,
            ${CONFIG.fadeAlpha}
        )`;


    ctx.fillRect(

        0,

        0,

        width,

        height

    );



    ctx.font =

        `${CONFIG.fontSize}px monospace`;



    drops.forEach(

        drop=>{



            const x =

                drop.column *

                CONFIG.fontSize;



            const y =

                drop.y;





            let alpha = .8;



            const distance =

                Math.hypot(

                    mouse.x - x,

                    mouse.y - y

                );



            if(

                distance

                <

                CONFIG.mouseRadius

            ){

                alpha = 1;

            }







            ctx.shadowBlur =

                CONFIG.glow;



            ctx.shadowColor =

                drop.color;



            ctx.fillStyle =

                drop.color.replace(

                    ")",

                    ""

                );



            ctx.fillStyle =

                drop.color;



            ctx.globalAlpha =

                alpha;



            ctx.fillText(

                drop.character,

                x,

                y

            );



            ctx.globalAlpha = 1;



            drop.update();



        }

    );



    ctx.shadowBlur = 0;

}
/* ==========================================
   Mouse Events
========================================== */

window.addEventListener(
    "mousemove",
    event => {

        mouse.x = event.clientX;
        mouse.y = event.clientY;

    }
);



window.addEventListener(
    "mouseleave",
    () => {

        mouse.x = -9999;
        mouse.y = -9999;

    }
);





/* ==========================================
   Ripple Event
========================================== */

window.addEventListener(
    "click",
    event => {

        ripples.push({

            x: event.clientX,

            y: event.clientY,

            radius: 0,

            life: CONFIG.rippleLife

        });

    }
);





/* ==========================================
   Keyboard
========================================== */

window.addEventListener(
    "keydown",
    event => {

        switch(event.key.toLowerCase()){

            case " ":

                event.preventDefault();

                paused = !paused;

                break;



            case "r":

                createDrops();

                ripples.length = 0;

                break;

        }

    }
);





/* ==========================================
   Animation
========================================== */

function animate(){


    if(!paused){

        drawRain();

        drawRipples();

    }


    animationId = requestAnimationFrame(
        animate
    );

}





/* ==========================================
   Resize
========================================== */

window.addEventListener(
    "resize",
    resizeCanvas
);





/* ==========================================
   Start
========================================== */

resizeCanvas();

animate();