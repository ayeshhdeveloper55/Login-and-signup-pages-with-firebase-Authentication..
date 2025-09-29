// Firebase import
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } 
from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";

// Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyBP78LBWjNb4Z6uC5M46Zva8n6wDQlM8jE",
  authDomain: "student-portal-4b338.firebaseapp.com",
  projectId: "student-portal-4b338",
  storageBucket: "student-portal-4b338.appspot.com",
  messagingSenderId: "1025622751551",
  appId: "1:1025622751551:web:4062ae240b66458fe07b8a",
  measurementId: "G-BSBGFYTYYH"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const signupForm = document.getElementById("signup-form");
const loginForm = document.getElementById("login-form");
const showLogin = document.getElementById("show-login");
const showSignup = document.getElementById("show-signup");

showLogin.addEventListener("click", (e) => {
  e.preventDefault();
  signupForm.style.display = "none";
  loginForm.style.display = "block";
});
showSignup.addEventListener("click", (e) => {
  e.preventDefault();
  loginForm.style.display = "none";
  signupForm.style.display = "block";
});

// Signup page
signupForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = document.getElementById("signup-email").value;
  const password = document.getElementById("signup-password").value;

  createUserWithEmailAndPassword(auth, email, password)
    .then(() => {
      Swal.fire("✅ Signup Successful!", "Now you can login.", "success");
      signupForm.reset();
    })
    .catch((err) => Swal.fire("❌ Error", err.message, "error"));
});

// Login page
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;

  signInWithEmailAndPassword(auth, email, password)
    .then(() => {
      Swal.fire({
        title: "🎉 Welcome!",
        text: "Login successful",
        icon: "success",
        timer: 2000,
        showConfirmButton: false
      });
      setTimeout(() => {
        window.location.href = "./dashboard.html"; // ✅ fixed
      }, 2000);
    })
    .catch((err) => Swal.fire("❌ Error", err.message, "error"));
});

