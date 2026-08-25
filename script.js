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

    console.log("Supabase initialized.");

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
   DOM ELEMENTS
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
        function () {

            mobileNav.classList.toggle(
                "active"
            );

        }
    );


    mobileNav
        .querySelectorAll("a")
        .forEach(
            function (link) {

                link.addEventListener(
                    "click",
                    function () {

                        mobileNav.classList.remove(
                            "active"
                        );

                    }
                );

            }
        );

}


/* =========================================================
   CURRENT YEAR
========================================================= */

if (currentYear) {

    currentYear.textContent =
        new Date().getFullYear();

}


/* =========================================================
   CREATE ACCOUNT
   member-signup.html
========================================================= */

const signupForm =
    document.getElementById(
        "signupForm"
    );


if (signupForm) {

    signupForm.addEventListener(
        "submit",
        async function (event) {

            event.preventDefault();


            const emailInput =
                document.getElementById(
                    "signupEmail"
                );

            const passwordInput =
                document.getElementById(
                    "signupPassword"
                );

            const password2Input =
                document.getElementById(
                    "signupPassword2"
                );

            const message =
                document.getElementById(
                    "signupMessage"
                );

            const button =
                document.getElementById(
                    "signupButton"
                );


            const email =
                emailInput.value.trim();

            const password =
                passwordInput.value;

            const password2 =
                password2Input.value;


            if (!supabaseClient) {

                showMessage(
                    message,
                    "Supabase is not available. Please refresh the page.",
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


            button.disabled =
                true;

            button.textContent =
                "Creating Account...";


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


                console.log(
                    "Signup result:",
                    data
                );


                /*
                   If email confirmation is enabled,
                   Supabase will not return a session.
                */

                if (
                    data &&
                    data.user &&
                    !data.session
                ) {

                    showMessage(
                        message,
                        "Account created. Please check your email and confirm your account before logging in.",
                        "success"
                    );

                } else {

                    showMessage(
                        message,
                        "Account created successfully. Opening login...",
                        "success"
                    );


                    setTimeout(
                        function () {

                            window.location.href =
                                "member-login.html";

                        },
                        1200
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

                button.disabled =
                    false;

                button.textContent =
                    "Create Account";

            }

        }
    );

}


/* =========================================================
   MEMBER LOGIN
   member-login.html

   LOGIN → REGISTER
========================================================= */

const loginForm =
    document.getElementById(
        "loginForm"
    );


if (loginForm) {

    loginForm.addEventListener(
        "submit",
        async function (event) {

            /*
               VERY IMPORTANT:
               Prevent the browser from submitting
               the form normally.
            */

            event.preventDefault();

            event.stopPropagation();


            console.log(
                "LOGIN FORM SUBMITTED"
            );


            const emailInput =
                document.getElementById(
                    "loginEmail"
                );

            const passwordInput =
                document.getElementById(
                    "loginPassword"
                );

            const loginButton =
                document.getElementById(
                    "loginBtn"
                );

            const loginMessage =
                document.getElementById(
                    "loginMessage"
                );


            const email =
                emailInput.value.trim();

            const password =
                passwordInput.value;


            if (!email || !password) {

                showMessage(
                    loginMessage,
                    "Please enter your email and password.",
                    "error"
                );

                return;
            }


            if (!supabaseClient) {

                showMessage(
                    loginMessage,
                    "Supabase is not loaded. Please refresh the page.",
                    "error"
                );

                return;
            }


            loginButton.disabled =
                true;

            loginButton.textContent =
                "Logging in...";


            showMessage(
                loginMessage,
                "Checking your account...",
                "info"
            );


            try {

                console.log(
                    "Calling Supabase login..."
                );


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


                console.log(
                    "Login response:",
                    data,
                    error
                );


                if (error) {
                    throw error;
                }


                if (
                    !data ||
                    !data.user
                ) {

                    throw new Error(
                        "Login succeeded but no user session was returned."
                    );

                }


                showMessage(
                    loginMessage,
                    "Login successful! Opening registration...",
                    "success"
                );


                console.log(
                    "Redirecting to register.html"
                );


                /*
                   THIS IS THE IMPORTANT PART.
                   Successful login goes to
                   register.html.
                */

                setTimeout(
                    function () {

                        window.location.replace(
                            "register.html"
                        );

                    },
                    700
                );


            } catch (error) {

                console.error(
                    "LOGIN ERROR:",
                    error
                );


                showMessage(
                    loginMessage,
                    "Login failed: " +
                    error.message,
                    "error"
                );


                loginButton.disabled =
                    false;

                loginButton.textContent =
                    "Login";

            }

        }
    );

}


/* =========================================================
   CREATE WARD BUTTONS
========================================================= */

function createWardButtons() {

    if (!wardsGrid) {
        return;
    }


    wardsGrid.innerHTML =
        "";


    wards.forEach(
        function (ward) {

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
                function () {

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
   CREATE WARD SELECT OPTIONS
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
        function (ward) {

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
   REGISTRATION
   register.html
========================================================= */

if (registrationForm) {

    registrationForm.addEventListener(
        "submit",
        submitRegistration
    );

}


async function submitRegistration(
    event
) {

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
       Make sure the person is logged in.
    */

    const {
        data: {
            user
        }
    } =
        await supabaseClient.auth.getUser();


    if (!user) {

        showMessage(
            formMessage,
            "You must login before completing registration.",
            "error"
        );


        setTimeout(
            function () {

                window.location.href =
                    "member-login.html";

            },
            1200
        );


        return;
    }


    const submitButton =
        registrationForm.querySelector(
            "button[type='submit']"
        );


    function getValue(id) {

        const element =
            document.getElementById(id);


        if (!element) {
            return "";
        }


        return element.value.trim();

    }


    const fullName =
        getValue("fullName");

    const phone =
        getValue("phone");

    const email =
        getValue("email") ||
        user.email ||
        "";

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
           Check if this email already
           has a registration.
        */

        const {
            data: existingMember,
            error: existingError
        } =
            await supabaseClient
                .from("members")
                .select(
                    "id,status"
                )
                .eq(
                    "email",
                    email
                )
                .maybeSingle();


        if (existingError) {
            throw existingError;
        }


        if (existingMember) {

            showMessage(
                formMessage,
                "A registration already exists for this account.",
                "error"
            );

            return;
        }


        /*
           Insert registration.
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
                        email,

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
                        "pending"

                });


        if (error) {
            throw error;
        }


        showMessage(
            formMessage,
            "Registration submitted successfully. Your application is awaiting admin approval.",
            "success"
        );


        registrationForm.reset();


    } catch (error) {

        console.error(
            "REGISTRATION ERROR:",
            error
        );


        showMessage(
            formMessage,
            "Registration failed: " +
            error.message,
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
   SHOW WARD
========================================================= */

async function showWard(
    wardNumber
) {

    const ward =
        wards.find(
            function (item) {

                return (
                    item.number ===
                    Number(wardNumber)
                );

            }
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
            function (button) {

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

            Loading Ward
            ${ward.number}...

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
                .in(
                    "status",
                    [
                        "approved",
                        "accepted"
                    ]
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
                    function (position) {

                        const holder =
                            approvedMembers.find(
                                function (member) {

                                    return (
                                        member.exco_position ===
                                        position
                                    );

                                }
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


        let membersHTML =
            "";


        if (
            approvedMembers.length ===
            0
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
                        function (member) {

                            return `

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

                            `;

                        }
                    )
                    .join("");

        }


        wardDisplay.innerHTML = `

            <div class="panel">

                <h2>

                    Ward ${ward.number}
                    —
                    ${escapeHTML(
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
