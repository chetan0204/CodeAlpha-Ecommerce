// Firebase Imports
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";

import { getAuth } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

import { getFirestore } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyDlJCyCQw94i28VcpwHIDGNQ95QyecpTQc",
  authDomain: "ecommerce-2529c.firebaseapp.com",
  projectId: "ecommerce-2529c",
  storageBucket: "ecommerce-2529c.firebasestorage.app",
  messagingSenderId: "790277763189",
  appId: "1:790277763189:web:91663e65580eb15ce1483c",
  measurementId: "G-8JBHLBES62"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Services
export const auth = getAuth(app);

export const db = getFirestore(app);