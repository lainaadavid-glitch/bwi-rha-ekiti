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

    supabaseClient = window.supabase.createClient(
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
   WARD OFFICES
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
   LG OFFICES
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
        .map(word => word.charAt(0))
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

    element.textContent = message;

    element.className =
        "form-message " + type;
}


/* =========================================================
   DOM
========================================================= */

const wardsGrid =
    document.getElementById("wardsGrid");

const wardDisplay =
    document.getElementById("wardDisplay");

const wardSelect =
    document.getElementById("ward");

const registrationForm =
    document.getElementById("registrationForm");

const formMessage =
    document.getElementById("formMessage");

const menuButton =
    document.getElementById("menuButton") ||
    document.getElementById("menuBtn");

const mobileNav =
    document.getElementById("mobileNav") ||
    document.getElementById("navMenu");

const currentYear =
    document.getElementById("currentYear");


/* =========================================================
   MOBILE MENU
========================================================= */

if (menuButton && mobileNav) {

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
   CURRENT YEAR
========================================================= */

if (currentYear) {

    currentYear.textContent =
        new Date().getFullYear();

}


/* =========================================================
   CREATE ACCOUNT / SIGNUP
========================================================= */

const signupForm =
    document.getElementById("signupForm");

if (signupForm) {

    signupForm.addEventListener(
        "submit",
        handleSignup
    );

}


async function handleSignup(event) {

    event.preventDefault();

    const emailInput =
        document.getElementById("signupEmail");

    const passwordInput =
        document.getElementById("signupPassword");

    const password2Input =
        document.getElementById("signupPassword2");

    const message =
        document.getElementById("signupMessage");

    const button =
        document.getElementById("signupButton");


    const email =
        emailInput
            ? emailInput.value.trim()
            : "";

    const password =
        passwordInput
            ? passwordInput.value
            : "";

    const password2 =
        password2Input
            ? password2Input.value
            : "";


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

        button.disabled = true;

        button.textContent =
            "Creating Account...";

    }


    try {

        const {
            data,
            error
        } =
            await supabaseClient.auth.signUp({

                email: email,

                password: password

            });


        if (error) {

            throw error;

        }


        /*
           If email confirmation is disabled,
           Supabase returns a logged-in user.
        */

        if (data.session) {

            showMessage(
                message,
                "Account created successfully. Redirecting to login...",
                "success"
            );

            setTimeout(
                () => {

                    window.location.href =
                        "member-login.html";

                },
                1000
            );

        } else {

            showMessage(
                message,
                "Account created. Please check your email if confirmation is required, then login.",
                "success"
            );

        }


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

            button.disabled = false;

            button.textContent =
                "Create Account";

        }

    }

}


/* =========================================================
   MEMBER LOGIN
========================================================= */

const loginForm =
    document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener(
        "submit",
        handleLogin
    );

}


async function handleLogin(event) {

    event.preventDefault();


    const emailInput =
        document.getElementById("loginEmail");

    const passwordInput =
        document.getElementById("loginPassword");

    const message =
        document.getElementById("loginMessage");

    const button =
        document.getElementById("loginBtn");


    const email =
        emailInput
            ? emailInput.value.trim()
            : "";

    const password =
        passwordInput
            ? passwordInput.value
            : "";


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

        button.disabled = true;

        button.textContent =
            "Logging in...";

    }


    try {

        const {
            data,
            error
        } =
            await supabaseClient.auth.signInWithPassword({

                email: email,

                password: password

            });


        if (error) {

            throw error;

        }


        if (!data.user) {

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
           IMPORTANT:
           The logged-in user is now stored
           in the Supabase session.

           Registration will use this user's
           auth ID.
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

            button.disabled = false;

            button.textContent =
                "Login";

        }

    }

}


/* =========================================================
   CHECK LOGIN BEFORE REGISTRATION
========================================================= */

async function checkRegistrationLogin() {

    if (!registrationForm) {
        return;
    }

    if (!supabaseClient) {
        return;
    }


    const {
        data,
        error
    } =
        await supabaseClient.auth.getUser();


    if (
        error ||
        !data ||
        !data.user
    ) {

        const message =
            document.getElementById(
                "formMessage"
            );

        showMessage(
            message,
            "Please login before completing your registration.",
            "error"
        );


        setTimeout(
            () => {

                window.location.href =
                    "member-login.html";

            },
            1500
        );

    }

}


/* =========================================================
   REGISTRATION
========================================================= */

if (registrationForm) {

    registrationForm.addEventListener(
        "submit",
        submitRegistration
    );

    checkRegistrationLogin();

}


async function submitRegistration(event) {

    event.preventDefault();


    if (!supabaseClient) {

        showMessage(
            formMessage,
            "Supabase is not available.",
            "error"
        );

        return;
    }


    /*
       GET THE CURRENT LOGGED-IN USER
    */

    const {
        data: userData,
        error: userError
    } =
        await supabaseClient.auth.getUser();


    if (
        userError ||
        !userData ||
        !userData.user
    ) {

        showMessage(
            formMessage,
            "You must login before submitting your registration.",
            "error"
        );

        setTimeout(
            () => {

                window.location.href =
                    "member-login.html";

            },
            1200
        );

        return;
    }


    const user =
        userData.user;


    const submitButton =
        registrationForm.querySelector(
            "button[type='submit']"
        );


    function getValue(id) {

        const element =
            document.getElementById(id);

        return element
            ? element.value.trim()
            : "";

    }


    const fullName =
        getValue("fullName");

    const phone =
        getValue("phone");

    const gender =
        getValue("gender");

    const address =
        getValue("address");

    const ward =
        getValue("ward");

    const bankName =
        getValue("bankName");

    const accountNumber =
        getValue("accountNumber");


    /*
       VALIDATION
    */

    if (
        !fullName ||
        !phone ||
        !address ||
        !ward ||
        !bankName ||
        !accountNumber
    ) {

        showMessage(
            formMessage,
            "Please complete all required fields.",
            "error"
        );

        return;
    }


    if (
        !/^\d{10}$/.test(
            accountNumber
        )
    ) {

        showMessage(
            formMessage,
            "Account number must contain exactly 10 digits.",
            "error"
        );

        return;
    }


    if (submitButton) {

        submitButton.disabled =
            true;

        submitButton.textContent =
            "Submitting...";

    }


    try {

        /*
           CHECK IF THIS ACCOUNT ALREADY
           HAS A REGISTRATION
        */

        const {
            data: existingMember,
            error: existingError
        } =
            await supabaseClient
                .from("members")
                .select("id,status")
                .eq(
                    "auth_user_id",
                    user.id
                )
                .maybeSingle();


        if (
            existingError &&
            existingError.code !== "PGRST116"
        ) {

            throw existingError;

        }


        if (existingMember) {

            showMessage(
                formMessage,
                "You have already submitted a registration. Status: " +
                existingMember.status,
                "error"
            );

            return;
        }


        /*
           INSERT MEMBER

           THIS IS THE IMPORTANT FIX.

           Both auth_user_id and user_id
           are set to the logged-in
           Supabase account ID.

           This satisfies your RLS policy.
        */

        const {
            error
        } =
            await supabaseClient
                .from("members")
                .insert({

                    full_name:
                        fullName,

                    phone:
                        phone,

                    email:
                        user.email,

                    gender:
                        gender || null,

                    address:
                        address,

                    ward_id:
                        Number(ward),

                    bank_name:
                        bankName,

                    account_number:
                        accountNumber,

                    status:
                        "pending",

                    auth_user_id:
                        user.id,

                    user_id:
                        user.id

                });


        if (error) {

            throw error;

        }


        showMessage(
            formMessage,
            "Registration submitted successfully! Your application is now waiting for admin approval.",
            "success"
        );


        registrationForm.reset();


        /*
           Keep the user on the page so they
           can see the success message.
        */


    } catch (error) {

        console.error(
            "REGISTRATION ERROR:",
            error
        );


        let errorMessage =
            error.message ||
            "Unknown registration error.";


        /*
           Give a clearer RLS message.
        */

        if (
            errorMessage
                .toLowerCase()
                .includes("row-level security")
        ) {

            errorMessage =
                "Registration was blocked by Supabase security. Please logout and login again.";

        }


        showMessage(
            formMessage,
            "Registration failed: " +
            errorMessage,
            "error"
        );


    } finally {

        if (submitButton) {

            submitButton.disabled =
                false;

            submitButton.textContent =
                "Submit Registration";

        }

    }

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
                () => {

                    showWard(
                        ward.number
                    );

                }
            );


            wardsGrid.appendChild(
                button
            );

        }
    );

}


/* =========================================================
   CREATE WARD OPTIONS
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
   SHOW WARD
========================================================= */

async function showWard(
    wardNumber
) {

    const ward =
        wards.find(
            item =>
                item.number ===
                Number(wardNumber)
        );


    if (
        !ward ||
        !wardDisplay
    ) {

        return;

    }


    document
        .querySelectorAll(
            ".ward-button"
        )
        .forEach(
            button => {

                button.classList.remove(
                    "active"
                );

            }
        );


    const activeButton =
        document.querySelector(
            `.ward-button[data-ward="${ward.number}"]`
        );


    if (activeButton) {

        activeButton.classList.add(
            "active"
        );

    }


    wardDisplay.innerHTML = `

        <div class="loading">

            Loading Ward ${ward.number}...

        </div>

    `;


    if (!supabaseClient) {

        wardDisplay.innerHTML = `

            <div class="empty-state error">

                Supabase is not available.

            </div>

        `;

        return;

    }


    try {

        const {
            data: members,
            error
        } =
            await supabaseClient
                .from("members")
                .select(`
                    id,
                    full_name,
                    phone,
                    exco_position
                `)
                .eq(
                    "ward_id",
                    ward.number
                )
                .eq(
                    "status",
                    "approved"
                )
                .order(
                    "full_name",
                    {
                        ascending: true
                    }
                );


        if (error) {

            throw error;

        }


        const approvedMembers =
            members || [];


        const officesHTML =
            wardOffices
                .map(
                    position => {

                        const holder =
                            approvedMembers.find(
                                member =>
                                    member.exco_position ===
                                    position
                            );


                        return `

                            <div class="registration-item">

                                <strong>
                                    ${escapeHTML(
                                        position
                                    )}
                                </strong>

                                <p>
                                    ${
                                        holder
                                            ?
                                        escapeHTML(
                                            holder.full_name
                                        )
                                            :
                                        "Not yet assigned"
                                    }
                                </p>

                            </div>

                        `;

                    }
                )
                .join("");


        let membersHTML = "";


        if (
            approvedMembers.length === 0
        ) {

            membersHTML = `

                <div class="empty-state">

                    No approved members yet.

                </div>

            `;

        } else {

            membersHTML =
                approvedMembers
                    .map(
                        member => `

                            <div class="registration-item">

                                <h3>
                                    ${escapeHTML(
                                        member.full_name
                                    )}
                                </h3>

                                <p>
                                    ${escapeHTML(
                                        member.phone
                                    )}
                                </p>

                                ${
                                    member.exco_position
                                        ?
                                    `
                                    <strong>
                                        ${escapeHTML(
                                            member.exco_position
                                        )}
                                    </strong>
                                    `
                                        :
                                    ""
                                }

                            </div>

                        `
                    )
                    .join("");

        }


        wardDisplay.innerHTML = `

            <div class="panel">

                <h2>
                    Ward ${ward.number}
                    — ${escapeHTML(
                        ward.name
                    )}
                </h2>

                <p>
                    ${escapeHTML(
                        ward.area
                    )}
                </p>

                <h3>
                    Ward Executive Offices
                </h3>

                ${officesHTML}

                <h3>
                    Approved Members
                    (${approvedMembers.length})
                </h3>

                ${membersHTML}

            </div>

        `;


    } catch (error) {

        console.error(
            "WARD ERROR:",
            error
        );


        wardDisplay.innerHTML = `

            <div class="empty-state error">

                <strong>
                    Unable to load members.
                </strong>

                <p>
                    ${escapeHTML(
                        error.message
                    )}
                </p>

            </div>

        `;

    }

}


/* =========================================================
   START WEBSITE
========================================================= */

createWardButtons();

createWardOptions();


console.log(
    "BWI-RHA Ado LG website loaded successfully."
);
