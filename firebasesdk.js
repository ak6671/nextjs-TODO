// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBOpczZihWowORWdDq9BheiB3Zql0z_ASk",
  authDomain: "todo-acc05.firebaseapp.com",
  projectId: "todo-acc05",
  storageBucket: "todo-acc05.appspot.com",
  messagingSenderId: "305150329938",
  appId: "1:305150329938:web:a5f1887452b1ffe19acb8b",
  measurementId: "G-HJNZ8CNLLN",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
