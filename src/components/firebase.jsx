// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB1eaHUGYjBes3n7779wNvQdau1DQrIg5s",
  authDomain: "desi-site.firebaseapp.com",
  projectId: "desi-site",
  storageBucket: "desi-site.firebasestorage.app",
  messagingSenderId: "94363459811",
  appId: "1:94363459811:web:9c3a5c7b24ab22b3aee5d6",
  measurementId: "G-6D13CD629D"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db, collection, addDoc };