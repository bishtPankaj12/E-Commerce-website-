// <--SignUp page script-->

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("registerForm").addEventListener("submit", function (e) {
        e.preventDefault(); // Prevent default form submission

        let fullName = document.getElementById("regName").value.trim();
        let email = document.getElementById("regEmail").value.trim();
        let password = document.getElementById("regPassword").value.trim();
        let confirmPassword = document.getElementById("regConfirmPassword").value.trim();

        // Check if fields are empty
        if (!fullName || !email || !password || !confirmPassword) {
            alert("All fields are required.");
            return;
        }

        // Validate email format
        let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            alert("Please enter a valid email address.");
            return;
        }

        // Validate password length
        if (password.length < 6) {
            alert("Password must be at least 6 characters long.");
            return;
        }

        // Check if passwords match
        if (password !== confirmPassword) {
            alert("Passwords do not match.");
            return;
        }

        // Check if the user already exists
        if (localStorage.getItem(email)) {
            alert("An account with this email already exists. Please log in.");
            return;
        }

        // Save user data in localStorage
        let userData = {
            fullName: fullName,
            email: email,
            password: password, // Ideally, hash passwords for better security
        };
        localStorage.setItem(email, JSON.stringify(userData));

        alert("Registration successful! Redirecting to login page...");
        window.location.href = "/Pages/login.html"; // Redirect to login page
    });
});

// Login Form Submission

document.getElementById("loginForm").addEventListener("submit", function (e) {
    e.preventDefault(); // Prevent page reload

    let email = document.getElementById("email").value.trim();
    let password = document.getElementById("password").value.trim();

    // Retrieve user data from localStorage
    let userData = JSON.parse(localStorage.getItem(email));

    // Check if user exists and password matches
    if (userData && userData.password === password) {
        localStorage.setItem("isLoggedIn", "true"); // Mark user as logged in
        alert("Login successful!");
        window.location.href = "../index.html"; // Redirect to home page
    } else {
        alert("Invalid email or password. Please try again.");
    }
});


// Function to toggle password visibility(eye button)

function togglePassword(fieldId, button) {
    let passwordField = document.getElementById(fieldId);
    let icon = button.querySelector("i");

    if (passwordField.type === "password") {
        passwordField.type = "text";
        icon.classList.remove("fa-eye-slash");
        icon.classList.add("fa-eye-slash");
    } else {
        passwordField.type = "password";
        icon.classList.remove("fa-eye-slash");
        icon.classList.add("fa-eye");
    }
}

// toggle login button

// document.addEventListener("DOMContentLoaded", function () {
//     let authLink = document.getElementById("auth-link");

//     function updateAuthButton() {
//         if (localStorage.getItem("isLoggedIn")) {
//             // If user is logged in, show Logout button
//             authLink.textContent = "Logout";
//             authLink.href = "#"; // Prevent navigation
//             authLink.classList.replace("btn-outline-primary", "btn-outline-danger");

//             authLink.addEventListener("click", function (event) {
//                 event.preventDefault();
//                 localStorage.removeItem("isLoggedIn"); // Remove login status
//                 alert("You have been logged out!");
//                 window.location.reload(); // Refresh the page to update UI
//             });
//         } else {
//             // If user is logged out, show Login button
//             authLink.textContent = "Login";
//             authLink.href = "login.html";
//             authLink.classList.replace("btn-outline-danger", "btn-outline-primary");
//         }
//     }

//     updateAuthButton();
// });


