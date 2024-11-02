// app/firebase/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBjI2HxUtlccYI0qMg3fGfCh7_cSAczvHk",
  authDomain: "kindi01.firebaseapp.com",
  projectId: "kindi01",
  storageBucket: "kindi01.firebasestorage.app",
  messagingSenderId: "318375177333",
  appId: "1:318375177333:web:17c107fcf5bc1522f2dc3c",
  measurementId: "G-53GKJZ9PPV",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
