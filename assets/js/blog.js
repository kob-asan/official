/* ==========================================================
   BLOG.JS
   Kob_asan Official Site
   ========================================================== */

import {
    fetchJSON,
    formatDate
} from "./utils.js";

import {
    refreshAnimations
} from "./animation.js";


const POSTS_PATH = "posts/index.json";

const POSTS_PER_PAGE = 10;



export async function initBlog() {


    const featuredGrid =
        document.querySelector(".featured-grid");


    const blogGrid =
        document.querySelector(".blog-grid");


    const pagination =
        document.querySelector(".pagination");

    const searchInput =
    document.querySelector("#blog-search");



    if (!featuredGrid && !blogGrid) return;



    try {


        const posts = await loadPosts();

        let filteredPosts = posts;

if(searchInput){

    const keyword =
        new URLSearchParams(location.search)
            .get("search") || "";

    searchInput.value = keyword;

    filteredPosts = filterPosts(posts, keyword);

    searchInput.addEventListener("input", () => {

        const value = searchInput.value.trim();

        const params = new URLSearchParams(location.search);

        if(value){

            params.set("search", value);

            params.delete("page");

        }else{

            params.delete("search");

        }

        history.replaceState(
            null,
            "",
            `${location.pathname}?${params}`
        );

        renderBlogPosts(
            blogGrid,
            filterPosts(posts, value),
            1
        );

        if(pagination){

            renderPagination(
                pagination,
                filterPosts(posts, value).length,
                1
            );

        }

    });

}



        // Home

        if (featuredGrid) {


            renderFeaturedPosts(

                featuredGrid,

                posts.slice(0,3)

            );


        }



        // Blog

        if (blogGrid) {


            const page =
                getCurrentPage();



            renderBlogPosts(

                blogGrid,

                filteredPosts,

                page

            );



            if (pagination) {


                renderPagination(

                    pagination,

                    filteredPosts.length,

                    page

                );


            }


        }



    } catch(error) {


        console.error(error);



        showEmptyState(

            featuredGrid || blogGrid

        );


    }


}



/* ==========================================================
   Load Posts
========================================================== */


async function loadPosts(){


    const posts =
        await fetchJSON(POSTS_PATH);



    return posts

        .filter(post => post.published)

        .sort(

            (a,b)=>

            new Date(b.date)
            -
            new Date(a.date)

        );


}





/* ==========================================================
   Home Featured
========================================================== */


function renderFeaturedPosts(

    container,

    posts

){


    container.innerHTML="";



    posts.forEach(post=>{


        container.appendChild(

            createFeaturedCard(post)

        );


    });



    refreshAnimations();


}






function createFeaturedCard(post){


    const card =
        document.createElement("a");



    card.className =
        "featured-card fade-in";



    card.href =
        `post.html?post=${post.slug}`;



    card.innerHTML = `

        <div>


            <p class="featured-card-date">

                ${formatDate(post.date)}

            </p>



            <h3 class="featured-card-title">

                ${post.title}

            </h3>



            <p class="featured-card-description">

                ${post.description}

            </p>


        </div>



        <div class="featured-card-footer">


            <span class="category">

                ${post.category}

            </span>



            <span class="featured-read">

                Read More →

            </span>


        </div>

    `;



    return card;


}






/* ==========================================================
   Blog List
========================================================== */


function renderBlogPosts(

    container,

    posts,

    page

){


    container.innerHTML="";



    const start =

        (page - 1)

        *

        POSTS_PER_PAGE;



    const pagePosts =

        posts.slice(

            start,

            start + POSTS_PER_PAGE

        );




    pagePosts.forEach(post=>{


        container.appendChild(

            createBlogCard(post)

        );


    });



    refreshAnimations();


}







function createBlogCard(post){


    const card =
        document.createElement("a");



    card.className =
        "blog-card fade-in";



    card.href =
        `post.html?post=${post.slug}`;



    card.innerHTML = `

        <div>


            <p class="blog-card-date">

                ${formatDate(post.date)}

            </p>



            <h2 class="blog-card-title">

                ${post.title}

            </h2>



            <p class="blog-card-description">

                ${post.description}

            </p>


        </div>



        <div class="blog-card-footer">


            <span class="category">

                ${post.category}

            </span>


        </div>

    `;



    return card;


}






/* ==========================================================
   Pagination
========================================================== */


function renderPagination(

    container,

    total,

    current

){


    container.innerHTML="";



    const pages =

        Math.ceil(

            total / POSTS_PER_PAGE

        );



    if(pages <= 1) return;





    for(

        let i = 1;

        i <= pages;

        i++

    ){


        const link =
            document.createElement("a");



        link.href =
            `?page=${i}`;



        link.textContent =
            i;



        if(i === current){


            link.classList.add(
                "active"
            );


        }



        container.appendChild(link);


    }





    if(current < pages){


        const next =
            document.createElement("a");


        next.href =
            `?page=${current+1}`;


        next.textContent =
            "→";


        container.appendChild(next);


    }



}






/* ==========================================================
   Helpers
========================================================== */


function getCurrentPage(){


    const params =
        new URLSearchParams(

            window.location.search

        );



    const page =
        Number(

            params.get("page")

        );



    return page > 0 ? page : 1;


}





function showEmptyState(container){


    if(!container) return;



    container.innerHTML = `

        <div class="empty-state fade-in">


            <p class="empty-state-title">

                No posts yet.

            </p>


            <p class="empty-state-description">

                New articles will appear here soon.

            </p>


        </div>

    `;



    refreshAnimations();


}

function filterPosts(posts, keyword){

    if(!keyword) return posts;

    keyword = keyword.toLowerCase();

    return posts.filter(post =>

        post.title.toLowerCase().includes(keyword) ||

        post.description.toLowerCase().includes(keyword) ||

        post.category.toLowerCase().includes(keyword)

    );

}