import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBjI2HxUtlccYI0qMg3fGfCh7_cSAczvHk",
  authDomain: "kindi01.firebaseapp.com",
  projectId: "kindi01",
  storageBucket: "kindi01.firebasestorage.app",
  messagingSenderId: "318375177333",
  appId: "1:318375177333:web:17c107fcf5bc1522f2dc3c",
  measurementId: "G-53GKJZ9PPV",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp;

// import firebase from "firebase/app";
// import "firebase/auth"; // Import the authentication module

// // Your Firebase config
// const firebaseConfig = {
//   apiKey: "AIzaSyBjI2HxUtlccYI0qMg3fGfCh7_cSAczvHk",
//   authDomain: "kindi01.firebaseapp.com",
//   projectId: "kindi01",
//   storageBucket: "kindi01.firebasestorage.app",
//   messagingSenderId: "318375177333",
//   appId: "1:318375177333:web:17c107fcf5bc1522f2dc3c",
//   measurementId: "G-53GKJZ9PPV",
// };

// // Initialize Firebase
// if (!firebase.apps.length) {
//   firebase.initializeApp(firebaseConfig);
// } else {
//   firebase.app(); // if already initialized
// }

// export default firebase;
