import { auth, db } from "./firebase.js";
import { showToast } from "./toast.js";
import {
  createUserWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

import {
  doc,
  setDoc
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const registerForm = document.getElementById("registerForm");

if(registerForm){

  registerForm.addEventListener("submit", async (e) => {

    e.preventDefault();

    const name = document.getElementById("name").value;

    const email = document.getElementById("email").value;

    const password = document.getElementById("password").value;

    try{

      // Create User
      const userCredential =
        await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

      const user = userCredential.user;

      // Save User Data
      await setDoc(doc(db, "users", user.uid), {
        name,
        email,
        createdAt: new Date()
      });

      showToast("Registration Successful");

      window.location.href = "login.html";

    }
    catch(error){

      showToast(error.message, "error");

    }

  });

}
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";


// LOGIN
const loginForm = document.getElementById("loginForm");

if(loginForm){

  loginForm.addEventListener("submit", async (e) => {

    e.preventDefault();

    const email =
      document.getElementById("loginEmail").value;

    const password =
      document.getElementById("loginPassword").value;

    try{

      await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      showToast("Login Successful");

      window.location.href = "index.html";

    }
    catch(error){

      showToast(error.message, "error");

    }

  });

}
// AUTH STATE
// AUTH STATE
const navUser =
  document.getElementById("navUser");

onAuthStateChanged(auth, (user) => {

  // Current Page
  const currentPage =
    window.location.pathname;

  // Protected Pages
  const protectedPages = [
    "/index.html",
    "/cart.html",
    "/orders.html",
    "/product.html"
  ];

  // If user NOT logged in
  if(!user){

    // Redirect protected pages
    if(
      protectedPages.some(page =>
        currentPage.includes(page)
      )
    ){

      window.location.href =
        "login.html";

    }

    // Navbar Login Link
    if(navUser){

      navUser.innerHTML = `
        <a href="login.html">
          Login
        </a>
      `;

    }

  }
  else{

    // Navbar Logout Button
    if(navUser){

      navUser.innerHTML = `

        <button id="logoutBtn">
          Logout
        </button>

      `;

      const logoutBtn =
        document.getElementById("logoutBtn");

      logoutBtn.addEventListener("click",
      async () => {

        await signOut(auth);

        showToast("Logged Out");

        window.location.href =
          "login.html";

      });

    }

  }

});