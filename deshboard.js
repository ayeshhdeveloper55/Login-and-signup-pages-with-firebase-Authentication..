






// --- Firebase Imports ---
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import { getFirestore, doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

// --- Firebase Configuration ---
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
const db = getFirestore(app);

const studentForm = document.getElementById("student-form");
const profileDiv = document.getElementById("profile");
const logoutBtn = document.getElementById("logoutBtn");


const fullName = document.getElementById("fullName");
const classTimings = document.getElementById("classTimings");
const campus = document.getElementById("campus");
const teacher = document.getElementById("teacher");
const course = document.getElementById("course");


onAuthStateChanged(auth, async (user) => {
  if (!user) {
   
    Swal.fire({
      icon: "warning",
      title: "Please Login First!",
      text: "Redirecting to login page...",
      timer: 2000,
      showConfirmButton: false,
    });
    setTimeout(() => {
      window.location.href = "index.html";
    }, 2000);
  } else {
  
    const docRef = doc(db, "students", user.uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      showProfile(docSnap.data());
    } else {
      studentForm.style.display = "block";
      profileDiv.style.display = "none";
    }
  }
});

studentForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const user = auth.currentUser;
  if (!user) return;

  const studentData = {
    fullName: fullName.value.trim(),
    classTimings: classTimings.value.trim(),
    campus: campus.value.trim(),
    teacher: teacher.value.trim(),
    course: course.value.trim(),
  };

  try {
    await setDoc(doc(db, "students", user.uid), studentData);
    Swal.fire("✅ Saved!", "Your data has been saved successfully.", "success");
    showProfile(studentData);
  } catch (error) {
    console.error("Error saving data:", error);
    Swal.fire("❌ Error", "Failed to save your data. Try again!", "error");
  }
});

function showProfile(data) {
  document.getElementById("pName").innerText = data.fullName;
  document.getElementById("pClass").innerText = data.classTimings;
  document.getElementById("pCampus").innerText = data.campus;
  document.getElementById("pTeacher").innerText = data.teacher;
  document.getElementById("pCourse").innerText = data.course;

  studentForm.style.display = "none";
  profileDiv.style.display = "block";
}

// --- Logout Button ---
logoutBtn.addEventListener("click", () => {
  signOut(auth)
    .then(() => {
      Swal.fire("👋 Logged Out!", "See you soon!", "info");
      setTimeout(() => {
        window.location.href = "index.html";
      }, 1500);
    })
    .catch((error) => {
      console.error("Logout Error:", error);
      Swal.fire("❌ Error", "Could not log out. Try again!", "error");
    });
});
