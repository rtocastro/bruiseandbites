import { getFirestore } from "firebase/firestore";


// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDgTRFosJF4k9yH9HbFEONlUn0O5o1rfEA",
  authDomain: "pbs-brews-bites.firebaseapp.com",
  projectId: "pbs-brews-bites",
  storageBucket: "pbs-brews-bites.firebasestorage.app",
  messagingSenderId: "1077786196803",
  appId: "1:1077786196803:web:e8ba83823b89bb39164df6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);