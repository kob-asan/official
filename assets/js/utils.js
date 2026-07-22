export async function fetchJSON(path) {

    const response = await fetch(path);

    if (!response.ok) {

        throw new Error(`Failed to load ${path}`);

    }

    return response.json();

}


export function formatDate(date) {

    return new Intl.DateTimeFormat(

        "en",

        {

            day: "2-digit",

            month: "short",

            year: "numeric"

        }

    ).format(new Date(date));

}


/* ==========================================================
   URL Query
========================================================== */

export function getQuery(key) {

    const params = new URLSearchParams(
        window.location.search
    );

    return params.get(key);

}