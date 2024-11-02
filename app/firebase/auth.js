import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword, // Import the signIn function here
} from "firebase/auth";
import { GraphQLClient } from "graphql-request";
import app from "./firebaseConfig";
const auth = getAuth(app); // Use the initialized app here

const HYGRAPH_MAIN_ENDPOINT =
  "https://ap-south-1.cdn.hygraph.com/content/cm1dom1hh03y107uwwxrutpmz/master";
const HYGRAPH_MAIN_TOKEN =
  "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImdjbXMtbWFpbi1wcm9kdWN0aW9uIn0.eyJ2ZXJzaW9uIjozLCJpYXQiOjE3MjcwNjQxNzcsImF1ZCI6WyJodHRwczovL2FwaS1hcC1zb3V0aC0xLmh5Z3JhcGguY29tL3YyL2NtMWRvbTFoaDAzeTEwN3V3d3hydXRwbXovbWFzdGVyIiwibWFuYWdlbWVudC1uZXh0LmdyYXBoY21zLmNvbSJdLCJpc3MiOiJodHRwczovL21hbmFnZW1lbnQtYXAtc291dGgtMS5oeWdyYXBoLmNvbS8iLCJzdWIiOiI2Yzg4NjI5YS1jMmU5LTQyYjctYmJjOC04OTI2YmJlN2YyNDkiLCJqdGkiOiJjbTFlaGYzdzYwcmZuMDdwaWdwcmpieXhyIn0.YMoI_XTrCZI-C7v_FX-oKL5VVtx95tPmOFReCdUcP50nIpE3tTjUtYdApDqSRPegOQai6wbyT0H8UbTTUYsZUnBbvaMd-Io3ru3dqT1WdIJMhSx6007fl_aD6gQcxb-gHxODfz5LmJdwZbdaaNnyKIPVQsOEb-uVHiDJP3Zag2Ec2opK-SkPKKWq-gfDv5JIZxwE_8x7kwhCrfQxCZyUHvIHrJb9VBPrCIq1XE-suyA03bGfh8_5PuCfKCAof7TbH1dtvaKjUuYY1Gd54uRgp8ELZTf13i073I9ZFRUU3PVjUKEOUoCdzNLksKc-mc-MF8tgLxSQ946AfwleAVkFCXduIAO7ASaWU3coX7CsXmZLGRT_a82wOORD8zihfJa4LG8bB-FKm2LVIu_QfqIHJKq-ytuycpeKMV_MTvsbsWeikH0tGPQxvAA902mMrYJr9wohOw0gru7mg_U6tLOwG2smcwuXBPnpty0oGuGwXWt_D6ryLwdNubLJpIWV0dOWF8N5D6VubNytNZlIbyFQKnGcPDw6hGRLMw2B7-1V2RpR6F3RibLFJf9GekI60UYdsXthAFE6Xzrlw03Gv5BOKImBoDPyMr0DCzneyAj9KDq4cbNNcihbHl1iA6lUCTNY3vkCBXmyujXZEcLu_Q0gvrAW3OvZMHeHY__CtXN6JFA";

const hygraphClient = new GraphQLClient(HYGRAPH_MAIN_ENDPOINT, {
  headers: {
    Authorization: `Bearer ${HYGRAPH_MAIN_TOKEN}`,
  },
});

// GraphQL mutation to create a new user in Hygraph
const CREATE_ACCOUNT_MUTATION = `
  mutation CreateUser($email: String!, $name: String!, $password: String!) {
    createAccount(data: { 
      email: $email, 
      name: $name, 
      password: $password 
    }) {
      id
    }
  }
`;

// Function to sign up with email and password
export const signUpWithEmail = async (email, password, name) => {
  try {
    // Step 1: Create user in Firebase
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    // Step 2: Prepare data for Hygraph
    const variables = {
      email: userCredential.user.email,
      name: name || userCredential.user.displayName || "Kindi User",
      password: password, // Use the same password used for Firebase
    };

    // Step 3: Create user in Hygraph
    const response = await hygraphClient.request(
      CREATE_ACCOUNT_MUTATION,
      variables
    );

    console.log("User created in Hygraph:", response);
    return { success: true };
  } catch (error) {
    console.error("Error during email signup:", error);
    if (error.response) {
      console.error("GraphQL Error Response:", error.response.errors);
    }
    return {
      success: false,
      message: error.message || "An unknown error occurred",
    };
  }
};

// Function to sign up with Google
export const signUpWithGoogle = async () => {
  const provider = new GoogleAuthProvider();

  try {
    // Step 1: Sign in with Google
    const userCredential = await signInWithPopup(auth, provider);
    const user = userCredential.user;

    // Step 2: Prepare data for Hygraph
    const variables = {
      email: user.email,
      name: user.displayName || "Kindi User",
      password: "GoogleSignIn", // Use a placeholder as you can't retrieve Google password
    };

    // Step 3: Create user in Hygraph
    const response = await hygraphClient.request(
      CREATE_ACCOUNT_MUTATION,
      variables
    );

    console.log("User created in Hygraph:", response);
    return { success: true };
  } catch (error) {
    console.error("Error during Google signup:", error);
    if (error.response) {
      console.error("GraphQL Error Response:", error.response.errors);
    }
    return {
      success: false,
      message: error.message || "An unknown error occurred",
    };
  }
};

// Function to Login with Email and Password
export const loginWithEmail = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    ); // Correct usage
    return { success: true, user: userCredential.user };
  } catch (error) {
    console.error("Error during login:", error);
    return { success: false, message: error.message };
  }
};
