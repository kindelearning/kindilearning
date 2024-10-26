// lib/auth.js
import { auth } from "./firebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  sendEmailVerification,
} from "firebase/auth";

const provider = new GoogleAuthProvider();

export const signUpWithEmail = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    // Send email verification
    await sendEmailVerification(user);
    console.log("Verification email sent to:", user.email);

    return user; // Return user object if needed
  } catch (error) {
    console.error("Error signing up:", error.message);
    throw error; // Rethrow error for further handling
  }
};


export const signInWithEmail = async (email, password) => {
  return await signInWithEmailAndPassword(auth, email, password);
};

export const signInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    console.log("User signed in: ", user);
    // Check if the user's email is verified
    if (!user.emailVerified) {
      await sendEmailVerification(user);
      console.log("Verification email sent to:", user.email);
    }

    return user;
  } catch (error) {
    console.error("Google Sign-In error:", error);
    throw error;
  }
};
