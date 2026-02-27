// 🔥 Import Firebase Config
import { auth } from "./firebase-config.js";

// 🔥 Import Auth Functions
import { 
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";


// ✅ If user already logged in → go to dashboard
onAuthStateChanged(auth, (user) => {
    if (user) {
        window.location.href = "dashboard.html";
    }
});


// ✅ Register Function
window.registerUser = async function () {

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if (!email || !password) {
        alert("Please enter email and password");
        return;
    }

    try {
        await createUserWithEmailAndPassword(auth, email, password);
        alert("Registration Successful 🎉");
        window.location.href = "dashboard.html";
    } 
    catch (error) {
        alert(error.message);
    }
};


// ✅ Login Function
window.loginUser = async function () {

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if (!email || !password) {
        alert("Please enter email and password");
        return;
    }

    try {
        await signInWithEmailAndPassword(auth, email, password);
        alert("Login Successful 🚀");
        window.location.href = "dashboard.html";
    } 
    catch (error) {
        alert("Invalid Email or Password");
    }
};