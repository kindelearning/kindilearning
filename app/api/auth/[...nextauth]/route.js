
/**
 * @Old_wroking_Code with minor error in terminal
 */

// import NextAuth from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";

// const HYGRAPH_ENDPOINT =
//   "https://ap-south-1.cdn.hygraph.com/content/cm1dom1hh03y107uwwxrutpmz/master";
// const HYGRAPH_TOKEN =
//   "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImdjbXMtbWFpbi1wcm9kdWN0aW9uIn0.eyJ2ZXJzaW9uIjozLCJpYXQiOjE3MjcwNjQxNzcsImF1ZCI6WyJodHRwczovL2FwaS1hcC1zb3V0aC0xLmh5Z3JhcGguY29tL3YyL2NtMWRvbTFoaDAzeTEwN3V3d3hydXRwbXovbWFzdGVyIiwibWFuYWdlbWVudC1uZXh0LmdyYXBoY21zLmNvbSJdLCJpc3MiOiJodHRwczovL21hbmFnZW1lbnQtYXAtc291dGgtMS5oeWdyYXBoLmNvbS8iLCJzdWIiOiI2Yzg4NjI5YS1jMmU5LTQyYjctYmJjOC04OTI2YmJlN2YyNDkiLCJqdGkiOiJjbTFlaGYzdzYwcmZuMDdwaWdwcmpieXhyIn0.YMoI_XTrCZI-C7v_FX-oKL5VVtx95tPmOFReCdUcP50nIpE3tTjUtYdApDqSRPegOQai6wbyT0H8UbTTUYsZUnBbvaMd-Io3ru3dqT1WdIJMhSx6007fl_aD6gQcxb-gHxODfz5LmJdwZbdaaNnyKIPVQsOEb-uVHiDJP3Zag2Ec2opK-SkPKKWq-gfDv5JIZxwE_8x7kwhCrfQxCZyUHvIHrJb9VBPrCIq1XE-suyA03bGfh8_5PuCfKCAof7TbH1dtvaKjUuYY1Gd54uRgp8ELZTf13i073I9ZFRUU3PVjUKEOUoCdzNLksKc-mc-MF8tgLxSQ946AfwleAVkFCXduIAO7ASaWU3coX7CsXmZLGRT_a82wOORD8zihfJa4LG8bB-FKm2LVIu_QfqIHJKq-ytuycpeKMV_MTvsbsWeikH0tGPQxvAA902mMrYJr9wohOw0gru7mg_U6tLOwG2smcwuXBPnpty0oGuGwXWt_D6ryLwdNubLJpIWV0dOWF8N5D6VubNytNZlIbyFQKnGcPDw6hGRLMw2B7-1V2RpR6F3RibLFJf9GekI60UYdsXthAFE6Xzrlw03Gv5BOKImBoDPyMr0DCzneyAj9KDq4cbNNcihbHl1iA6lUCTNY3vkCBXmyujXZEcLu_Q0gvrAW3OvZMHeHY__CtXN6JFA";

// export default NextAuth({
//   providers: [
//     CredentialsProvider({
//       name: "Credentials",
//       credentials: {
//         email: { label: "Email", type: "email" },
//         password: { label: "Password", type: "password" },
//         name: { label: "Name", type: "text" }, // New field
//         username: { label: "Username", type: "text" }, // New field
//         profilePic: { label: "Profile Pic", type: "text" }, // New field (URL or asset ID)
//       },
//       async authorize(credentials) {
//         // Fetch user data from Hygraph
//         const res = await fetch(`${HYGRAPH_ENDPOINT}`, {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${HYGRAPH_TOKEN}`, // Authorization header for security
//           },
//           body: JSON.stringify({
//             query: `
//                 mutation {
//                   signup(
//                     email: "${credentials.email}",
//                     password: "${credentials.password}",
//                     name: "${credentials.name}",
//                     username: "${credentials.username}",
//                     profilePic: "${credentials.profilePic}" // Include profile picture URL or asset ID
//                   ) {
//                     id
//                     email
//                     name
//                     username
//                     profilePic
//                   }
//                 }
//               `,
//           }),
//         });

//         const user = await res.json();

//         // Check if the user is authenticated
//         if (user && user.data.signup) {
//           return {
//             id: user.data.signup.id,
//             email: user.data.signup.email,
//             name: user.data.signup.name,
//             username: user.data.signup.username,
//             profilePic: user.data.signup.profilePic,
//           }; // Return user data
//         } else {
//           return null; // Return null if authentication fails
//         }
//       },
//     }),
//   ],

//   // Callbacks
//   callbacks: {
//     async jwt({ token, user }) {
//       // Add user data to the token here if needed
//       if (user) {
//         token.id = user.id; // Assuming your user has an `id` field
//         token.name = user.name; // Add name to token
//         token.username = user.username; // Add username to token
//         token.profilePic = user.profilePic; // Add profile pic URL to token
//       }
//       return token;
//     },

//     async session({ session, token }) {
//       // Pass user info to the session
//       if (token) {
//         session.user.id = token.id; // Adding user ID to the session
//         session.user.name = token.name; // Adding name to the session
//         session.user.username = token.username; // Adding username to the session
//         session.user.profilePic = token.profilePic; // Adding profile pic to the session
//       }
//       return session;
//     },
//   },

//   // Options
//   session: {
//     strategy: "jwt", // Use JWT for session management
//   },
// });

/**
 * @New_Code for Resolving the error
 */
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const HYGRAPH_ENDPOINT =
  "https://ap-south-1.cdn.hygraph.com/content/cm1dom1hh03y107uwwxrutpmz/master";
const HYGRAPH_TOKEN =
  "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImdjbXMtbWFpbi1wcm9kdWN0aW9uIn0.eyJ2ZXJzaW9uIjozLCJpYXQiOjE3MjcwNjQxNzcsImF1ZCI6WyJodHRwczovL2FwaS1hcC1zb3V0aC0xLmh5Z3JhcGguY29tL3YyL2NtMWRvbTFoaDAzeTEwN3V3d3hydXRwbXovbWFzdGVyIiwibWFuYWdlbWVudC1uZXh0LmdyYXBoY21zLmNvbSJdLCJpc3MiOiJodHRwczovL21hbmFnZW1lbnQtYXAtc291dGgtMS5oeWdyYXBoLmNvbS8iLCJzdWIiOiI2Yzg4NjI5YS1jMmU5LTQyYjctYmJjOC04OTI2YmJlN2YyNDkiLCJqdGkiOiJjbTFlaGYzdzYwcmZuMDdwaWdwcmpieXhyIn0.YMoI_XTrCZI-C7v_FX-oKL5VVtx95tPmOFReCdUcP50nIpE3tTjUtYdApDqSRPegOQai6wbyT0H8UbTTUYsZUnBbvaMd-Io3ru3dqT1WdIJMhSx6007fl_aD6gQcxb-gHxODfz5LmJdwZbdaaNnyKIPVQsOEb-uVHiDJP3Zag2Ec2opK-SkPKKWq-gfDv5JIZxwE_8x7kwhCrfQxCZyUHvIHrJb9VBPrCIq1XE-suyA03bGfh8_5PuCfKCAof7TbH1dtvaKjUuYY1Gd54uRgp8ELZTf13i073I9ZFRUU3PVjUKEOUoCdzNLksKc-mc-MF8tgLxSQ946AfwleAVkFCXduIAO7ASaWU3coX7CsXmZLGRT_a82wOORD8zihfJa4LG8bB-FKm2LVIu_QfqIHJKq-ytuycpeKMV_MTvsbsWeikH0tGPQxvAA902mMrYJr9wohOw0gru7mg_U6tLOwG2smcwuXBPnpty0oGuGwXWt_D6ryLwdNubLJpIWV0dOWF8N5D6VubNytNZlIbyFQKnGcPDw6hGRLMw2B7-1V2RpR6F3RibLFJf9GekI60UYdsXthAFE6Xzrlw03Gv5BOKImBoDPyMr0DCzneyAj9KDq4cbNNcihbHl1iA6lUCTNY3vkCBXmyujXZEcLu_Q0gvrAW3OvZMHeHY__CtXN6JFA";

const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        name: { label: "Name", type: "text" }, // New field
        username: { label: "Username", type: "text" }, // New field
        profilePic: { label: "Profile Pic", type: "text" }, // New field (URL or asset ID)
      },
      //   async authorize(credentials) {
      authorize: async (credentials) => {
        // Fetch user data from Hygraph
        const res = await fetch(`${HYGRAPH_ENDPOINT}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${HYGRAPH_TOKEN}`, // Authorization header for security
          },
          body: JSON.stringify({
            query: `
                mutation {
                  signup(
                    email: "${credentials.email}",
                    password: "${credentials.password}",
                    name: "${credentials.name}",
                    username: "${credentials.username}",
                    profilePic: "${credentials.profilePic}" // Include profile picture URL or asset ID
                  ) {
                    id
                    email
                    name
                    username
                    profilePic
                  }
                }
              `,
          }),
        });

        const user = await res.json();

        // Check if the user is authenticated
        if (user && user.data.signup) {
          return {
            id: user.data.signup.id,
            email: user.data.signup.email,
            name: user.data.signup.name,
            username: user.data.signup.username,
            profilePic: user.data.signup.profilePic,
          }; // Return user data
        } else {
          return null; // Return null if authentication fails
        }
      },
    }),
  ],

  // Callbacks
  callbacks: {
    async jwt({ token, user }) {
      // Add user data to the token here if needed
      if (user) {
        token.id = user.id; // Assuming your user has an `id` field
        token.name = user.name; // Add name to token
        token.username = user.username; // Add username to token
        token.profilePic = user.profilePic; // Add profile pic URL to token
      }
      return token;
    },

    async session({ session, token }) {
      // Pass user info to the session
      if (token) {
        session.user.id = token.id; // Adding user ID to the session
        session.user.name = token.name; // Adding name to the session
        session.user.username = token.username; // Adding username to the session
        session.user.profilePic = token.profilePic; // Adding profile pic to the session
      }
      return session;
    },
  },

  // Options
  session: {
    strategy: "jwt", // Use JWT for session management
  },
};


const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };

