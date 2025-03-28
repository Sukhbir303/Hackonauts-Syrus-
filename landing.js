// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-auth.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_BUCKET.appspot.com",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// Email Signup Button
document.addEventListener("DOMContentLoaded", function () {
    const signupBtn = document.getElementById("signupBtn");

    signupBtn.addEventListener("click", function () {
        const emailInput = document.getElementById("emailInput").value;

        // Simple Email Validation
        if (emailInput.trim() === "" || !emailInput.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
            alert("Please enter a valid email address.");
        } else {
            alert("Thank you for signing up with your email!");
        }
    });

    // Google Sign-In
    const googleSignInBtn = document.getElementById("googleSignInBtn");
    googleSignInBtn.addEventListener("click", function () {
        signInWithPopup(auth, provider)
            .then((result) => {
                const user = result.user;
                console.log("User signed in:", user);
                updateUserInfo(user);
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    });

    // Google Sign-Out
    const googleSignOutBtn = document.getElementById("googleSignOutBtn");
    googleSignOutBtn.addEventListener("click", function () {
        signOut(auth).then(() => {
            console.log("User signed out");
            updateUserInfo(null);
        }).catch((error) => {
            console.error("Error:", error);
        });
    });

    // Listen for Authentication State Changes
    onAuthStateChanged(auth, (user) => {
        updateUserInfo(user);
    });
});

// Function to Update User Info in UI
function updateUserInfo(user) {
    const googleSignInBtn = document.getElementById("googleSignInBtn");
    const googleSignOutBtn = document.getElementById("googleSignOutBtn");
    const userInfo = document.getElementById("userInfo");
    const userPic = document.getElementById("userPic");
    const userName = document.getElementById("userName");

    if (user) {
        googleSignInBtn.style.display = "none";
        googleSignOutBtn.style.display = "block";
        userInfo.style.display = "block";
        userPic.src = user.photoURL;
        userName.textContent = `Welcome, ${user.displayName}`;
    } else {
        googleSignInBtn.style.display = "block";
        googleSignOutBtn.style.display = "none";
        userInfo.style.display = "none";
        userPic.src = "";
        userName.textContent = "";
    }
}
