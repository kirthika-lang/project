// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

// 🔥 PASTE YOUR CONFIG HERE
const firebaseConfig = {
  apiKey: "AIzaSyCnzBlK2ovlhurojTKhPwk_LJD0U4GXl9A",
  authDomain: "tracker-85a04.firebaseapp.com",
  projectId: "tracker-85a04",
  storageBucket: "tracker-85a04.firebasestorage.app",
  messagingSenderId: "978546160725",
  appId: "1:978546160725:web:0fb58317147fd840c610dc",
  measurementId: "G-ZNE32ZNGMT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export services
export const db = getFirestore(app);
export const auth = getAuth(app);