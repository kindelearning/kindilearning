// lib/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBjI2HxUtlccYI0qMg3fGfCh7_cSAczvHk",
  authDomain: "kindi01.firebaseapp.com",
  projectId: "kindi01",
  storageBucket: "kindi01.appspot.com",
  messagingSenderId: "318375177333",
  appId: "1:318375177333:web:17c107fcf5bc1522f2dc3c",
  measurementId: "G-53GKJZ9PPV",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
