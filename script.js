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
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
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
    );

const mobileNav =
    document.getElementById(
        "mobileNav"
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
                        ward.name
                    )}
                </span>

                <small>
                    ${escapeHTML(
                        ward.area
                    )}
                </small>

            `;

            button.addEventListener(
                "click",
                () =>
                    showWard(
                        ward.number
                    )
            );

            wardsGrid.appendChild(
                button
            );

        }
    );
}


/* =========================================================
   CREATE WARD SELECT
========================================================= */

function createWardOptions() {

    if (!wardSelect) {
        return;
    }

    wardSelect.innerHTML = `

        <option value="">
            Select your ward
        </option>

    `;

    wards.forEach(
        ward => {

            const option =
                document.createElement(
                    "option"
                );

            option.value =
                ward.number;

            option.textContent =
                `Ward ${ward.number} — ${ward.name} — ${ward.area}`;

            wardSelect.appendChild(
                option
            );

        }
    );
}


/* =========================================================
   MEMBER SIGNUP
========================================================= */

const signupForm =
    document.getElementById(
        "signupForm"
    );

if (signupForm) {

    signupForm.addEventListener(
        "submit",
        handleSignup
    );
}


async function handleSignup(event) {

    event.preventDefault();

    const email =
        document
            .getElementById(
                "signupEmail"
            )
            ?.value
            .trim();

    const password =
        document
            .getElementById(
                "signupPassword"
            )
            ?.value;

    const password2 =
        document
            .getElementById(
                "signupPassword2"
            )
            ?.value;

    const message =
        document.getElementById(
            "signupMessage"
        );

    const button =
        document.getElementById(
            "signupButton"
        );


    if (!supabaseClient) {

        showMessage(
            message,
            "Supabase is not available.",
            "error"
        );

        return;
    }


    if (!email || !password || !password2) {

        showMessage(
            message,
            "Please complete all fields.",
            "error"
        );

        return;
    }


    if (password.length < 6) {

        showMessage(
            message,
            "Password must contain at least 6 characters.",
            "error"
        );

        return;
    }


    if (password !== password2) {

        showMessage(
            message,
            "Passwords do not match.",
            "error"
        );

        return;
    }


    if (button) {

        button.disabled =
            true;

        button.textContent =
            "Creating Account...";

    }


    try {

        const {
            data,
            error
        } =
            await supabaseClient.auth.signUp({

                email:
                    email,

                password:
                    password

            });


        if (error) {
            throw error;
        }


        if (
            data &&
            data.session
        ) {

            showMessage(
                message,
                "Account created successfully. Redirecting to login...",
                "success"
            );

        } else {

            showMessage(
                message,
                "Account created. Check your email for confirmation, then login.",
                "success"
            );

        }


        setTimeout(
            () => {

                window.location.href =
                    "member-login.html";

            },
            1500
        );


    } catch (error) {

        console.error(
            "SIGNUP ERROR:",
            error
        );

        showMessage(
            message,
            "Account creation failed: " +
            error.message,
            "error"
        );

    } finally {

        if (button) {

            button.disabled =
                false;

            button.textContent =
                "Create Account";

        }

    }
}


/* =========================================================
   MEMBER LOGIN
========================================================= */

const loginForm =
    document.getElementById(
        "loginForm"
    );

if (loginForm) {

    loginForm.addEventListener(
        "submit",
        handleLogin
    );
}


async function handleLogin(event) {

    event.preventDefault();


    const email =
        document
            .getElementById(
                "loginEmail"
            )
            ?.value
            .trim();

    const password =
        document
            .getElementById(
                "loginPassword"
            )
            ?.value;

    const message =
        document.getElementById(
            "loginMessage"
        );

    const button =
        document.getElementById(
            "loginBtn"
        );


    if (!supabaseClient) {

        showMessage(
            message,
            "Supabase is not available.",
            "error"
        );

        return;
    }


    if (!email || !password) {

        showMessage(
            message,
            "Please enter your email and password.",
            "error"
        );

        return;
    }


    if (button) {

        button.disabled =
            true;

        button.textContent =
            "Logging in...";

    }


    try {

        const {
            data,
            error
        } =
            await supabaseClient.auth.signInWithPassword({

                email:
                    email,

                password:
                    password

            });


        if (error) {
            throw error;
        }


        if (
            !data ||
            !data.user
        ) {

            throw new Error(
                "Login was unsuccessful."
            );

        }


        showMessage(
            message,
            "Login successful. Opening registration...",
            "success"
        );


        /*
         * IMPORTANT:
         * Successful login goes directly
         * to the registration page.
         */

        setTimeout(
            () => {

                window.location.href =
                    "register.html";

            },
            700
        );


    } catch (error) {

        console.error(
            "LOGIN ERROR:",
            error
        );

        showMessage(
            message,
            "Login failed: " +
            error.message,
            "error"
        );

    } finally {

        if (button) {

            button.disabled =
                false;

            button.textContent =
                "Login";

        }

    }
}


/* =========================================================
   CHECK LOGGED-IN USER
========================================================= */

async function getCurrentUser() {

    if (!supabaseClient) {
        return null;
    }

    try {

        const {
            data,
            error
        } =
            await supabaseClient.auth.getUser();

        if (error) {
            return null;
        }

        return data?.user || null;

    } catch (
