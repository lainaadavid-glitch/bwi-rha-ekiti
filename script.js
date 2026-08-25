/* =========================================================
   BWI-RHA EKITI STATE CHAPTER
   ADO LOCAL GOVERNMENT
   SUPABASE WEBSITE SYSTEM
========================================================= */


/* =========================================================
   SUPABASE
========================================================= */

const SUPABASE_URL =
    "https://xfjrmgendmmpnumsbjte.supabase.co";

const SUPABASE_KEY =
    "sb_publishable_qBhmzkK4DDeZk1_pheHgRA_rNKHDKS7";

let supabaseClient = null;

if (
    window.supabase &&
    typeof window.supabase.createClient === "function"
) {

    supabaseClient =
        window.supabase.createClient(
            SUPABASE_URL,
            SUPABASE_KEY
        );

} else {

    console.error(
        "Supabase library was not loaded."
    );

}


/* =========================================================
   WARDS
========================================================= */

const wards = [

    {
        number: 1,
        name: "Ado A",
        area: "Idofin"
    },

    {
        number: 2,
        name: "Ado B",
        area: "Inisa"
    },

    {
        number: 3,
        name: "Ado C",
        area: "Idolofin"
    },

    {
        number: 4,
        name: "Ado D",
        area: "Ijigbo"
    },

    {
        number: 5,
        name: "Ado E",
        area: "Ijoka / Orereowu"
    },

    {
        number: 6,
        name: "Ado F",
        area: "Okeyinmi"
    },

    {
        number: 7,
        name: "Ado G",
        area: "Oke Ila"
    },

    {
        number: 8,
        name: "Ado H",
        area: "Ereguru"
    },

    {
        number: 9,
        name: "Ado I",
        area: "Dallimore"
    },

    {
        number: 10,
        name: "Ado J",
        area: "Okesa"
    },

    {
        number: 11,
        name: "Ado K",
        area: "Irona"
    },

    {
        number: 12,
        name: "Ado L",
        area: "Igbehin"
    },

    {
        number: 13,
        name: "Ado M",
        area: "Farm Settlement"
    }

];


/* =========================================================
   WARD EXCO POSITIONS
========================================================= */

const wardOffices = [

    "Ward Coordinator",

    "Deputy Ward Coordinator",

    "Secretary",

    "Mobilization Officer",

    "Women Empowerment Officer",

    "Media/Publicity Officer",

    "Welfare Officer",

    "Polling Unit Officer"

];


/* =========================================================
   LG EXCO
========================================================= */

const lgOffices = [

    "LG Coordinator",

    "Deputy LG Coordinator"

];


/* =========================================================
   HELPERS
========================================================= */

function escapeHTML(value) {

    return String(value ?? "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

}


function getInitials(name) {

    if (!name) {
        return "?";
    }

    return name
        .trim()
        .split(/\s+/)
        .slice(0, 2)
        .map(
            word =>
                word.charAt(0)
        )
        .join("")
        .toUpperCase();

}


function showMessage(
    element,
    message,
    type = "info"
) {

    if (!element) {
        return;
    }

    element.textContent =
        message;

    element.className =
        "form-message " + type;

}


/* =========================================================
   DOM
========================================================= */

const wardsGrid =
    document.getElementById(
        "wardsGrid"
    );

const wardDisplay =
    document.getElementById(
        "wardDisplay"
    );

const wardSelect =
    document.getElementById(
        "ward"
    );

const registrationForm =
    document.getElementById(
        "registrationForm"
    );

const formMessage =
    document.getElementById(
        "formMessage"
    );

const menuButton =
    document.getElementById(
        "menuButton"
    ) ||
    document.getElementById(
        "menuBtn"
    );

const mobileNav =
    document.getElementById(
        "mobileNav"
    ) ||
    document.getElementById(
        "navMenu"
    );

const currentYear =
    document.getElementById(
        "currentYear"
    );


/* =========================================================
   MOBILE MENU
========================================================= */

if (
    menuButton &&
    mobileNav
) {

    menuButton.addEventListener(
        "click",
        () => {

            mobileNav.classList.toggle(
                "active"
            );

        }
    );


    mobileNav
        .querySelectorAll("a")
        .forEach(link => {

            link.addEventListener(
                "click",
                () => {

                    mobileNav.classList.remove(
                        "active"
                    );

                }
            );

        });

}


/* =========================================================
   YEAR
========================================================= */

if (currentYear) {

    currentYear.textContent =
        new Date().getFullYear();

}


/* =========================================================
   CREATE WARD BUTTONS
========================================================= */

function createWardButtons() {

    if (!wardsGrid) {
        return;
    }

    wardsGrid.innerHTML = "";

    wards.forEach(
        ward => {

            const button =
                document.createElement(
                    "button"
                );

            button.type =
                "button";

            button.className =
                "ward-button";

            button.dataset.ward =
                ward.number;

            button.innerHTML = `

                <strong>
                    Ward ${ward.number}
                </strong>

                <span>
                    ${escapeHTML(
                       
