// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDfD_vVvuRWRtNT5PrLjlPstFK0Hzdlv6k",
  authDomain: "tedd-844bf.firebaseapp.com",
  projectId: "tedd-844bf",
  storageBucket: "tedd-844bf.appspot.com",
  messagingSenderId: "64861423680",
  appId: "1:64861423680:web:d87ccd4c5a2bcb086837a5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Firestore and Storage instances
export const db = getFirestore(app);
export const storage = getStorage(app);
