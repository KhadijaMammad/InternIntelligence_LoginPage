// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDcf1nL49N9cwE1_MoiivtOLauqHO7jH-0",
  authDomain: "login-page-f414e.firebaseapp.com",
  projectId: "login-page-f414e",
  storageBucket: "login-page-f414e.firebasestorage.app",
  messagingSenderId: "329940021572",
  appId: "1:329940021572:web:3e3a795796b2420b92e711",
  measurementId: "G-FNE0VJM8FX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export {auth}