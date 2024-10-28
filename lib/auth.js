// lib/auth.js
import { auth } from "./firebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  sendEmailVerification,
} from "firebase/auth";
import { createUserInHygraph } from "./hygraph";

const provider = new GoogleAuthProvider();

export const signUpWithEmail = async (email, password, name, username) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    // Prepare data to send to Hygraph
    const userData = {
      name,
      email: user.email,
      password, // Make sure to hash the password if needed
      username,
      profilePicture: null, // Can be updated if available
      isVerified: user.emailVerified,
      dateOfBirth: "2000-01-01", // Placeholder date, adjust based on user input
      attendingNursery: false, // Adjust based on user input if necessary
    };

    // Send user data to Hygraph
    await createUserInHygraph(userData);

    // Send email verification
    await sendEmailVerification(user);
    console.log("Verification email sent to:", user.email);

    return user; // Return user object if needed
  } catch (error) {
    console.error("Error signing up:", error.message);
    throw new Error(error.message);
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
