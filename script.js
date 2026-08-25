<!DOCTYPE html>
<html lang="en">
<head>

    <meta charset="UTF-8">

    <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0"
    >

    <title>
        Login | BWI-RHA EKITI STATE CHAPTER
    </title>

    <link rel="stylesheet" href="style.css">

</head>

<body>

<header class="site-header">

    <div class="header-container">

        <a href="index.html" class="logo-area">

            <img
                src="logo.jpeg"
                alt="BWI-RHA Logo"
                class="site-logo"
            >

            <div class="logo-text">

                <h1>
                    BWI-RHA EKITI STATE CHAPTER
                </h1>

                <p>
                    ADO LG
                </p>

            </div>

        </a>


        <button
            class="menu-btn"
            id="menuBtn"
            type="button"
            aria-label="Open menu"
        >
            ☰
        </button>


        <nav
            class="main-nav"
            id="navMenu"
        >

            <a href="index.html">
                Home
            </a>

            <a href="wards.html">
                Wards
            </a>

            <a
                href="member-login.html"
                class="active"
            >
                Login
            </a>

            <a href="member-signup.html">
                Create Account
            </a>

            <a href="admin.html">
                Admin
            </a>

        </nav>

    </div>

</header>


<main class="auth-page">

    <div class="auth-card">

        <div class="auth-logo">

            <img
                src="logo.jpeg"
                alt="BWI-RHA Logo"
            >

        </div>


        <h2>
            Member Login
        </h2>


        <p class="auth-subtitle">
            Login to continue your BWI-RHA registration.
        </p>


        <form id="loginForm">

            <div class="form-group">

                <label for="loginEmail">
                    Email Address
                </label>

                <input
                    type="email"
                    id="loginEmail"
                    name="email"
                    required
                    autocomplete="email"
                    placeholder="Enter your email"
                >

            </div>


            <div class="form-group">

                <label for="loginPassword">
                    Password
                </label>

                <input
                    type="password"
                    id="loginPassword"
                    name="password"
                    required
                    autocomplete="current-password"
                    placeholder="Enter your password"
                >

            </div>


            <button
                type="submit"
                class="btn primary full-width"
                id="loginBtn"
            >
                Login
            </button>


            <div
                id="loginMessage"
                class="form-message"
                role="alert"
                aria-live="polite"
            ></div>

        </form>


        <div class="auth-footer">

            <p>
                Don't have an account?

                <a href="member-signup.html">
                    Create an account
                </a>

            </p>


            <p>
                After login, you will continue to
                the membership registration page.
            </p>

        </div>

    </div>

</main>


<footer class="site-footer">

    <div class="container">

        <p>
            BWI-RHA EKITI STATE CHAPTER
        </p>

        <p>
            ADO LG
        </p>

        <p>
            Green Economy E-Mobility Program
        </p>

    </div>

</footer>


<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>

<script src="script.js"></script>

</body>
</html>
