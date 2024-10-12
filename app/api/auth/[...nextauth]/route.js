import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { GraphQLClient } from "graphql-request";

const HYGRAPH_ENDPOINT =
  "https://ap-south-1.cdn.hygraph.com/content/cm1dom1hh03y107uwwxrutpmz/master";
const HYGRAPH_TOKEN =
  "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImdjbXMtbWFpbi1wcm9kdWN0aW9uIn0.eyJ2ZXJzaW9uIjozLCJpYXQiOjE3MjcwNjQxNzcsImF1ZCI6WyJodHRwczovL2FwaS1hcC1zb3V0aC0xLmh5Z3JhcGguY29tL3YyL2NtMWRvbTFoaDAzeTEwN3V3d3hydXRwbXovbWFzdGVyIiwibWFuYWdlbWVudC1uZXh0LmdyYXBoY21zLmNvbSJdLCJpc3MiOiJodHRwczovL21hbmFnZW1lbnQtYXAtc291dGgtMS5oeWdyYXBoLmNvbS8iLCJzdWIiOiI2Yzg4NjI5YS1jMmU5LTQyYjctYmJjOC04OTI2YmJlN2YyNDkiLCJqdGkiOiJjbTFlaGYzdzYwcmZuMDdwaWdwcmpieXhyIn0.YMoI_XTrCZI-C7v_FX-oKL5VVtx95tPmOFReCdUcP50nIpE3tTjUtYdApDqSRPegOQai6wbyT0H8UbTTUYsZUnBbvaMd-Io3ru3dqT1WdIJMhSx6007fl_aD6gQcxb-gHxODfz5LmJdwZbdaaNnyKIPVQsOEb-uVHiDJP3Zag2Ec2opK-SkPKKWq-gfDv5JIZxwE_8x7kwhCrfQxCZyUHvIHrJb9VBPrCIq1XE-suyA03bGfh8_5PuCfKCAof7TbH1dtvaKjUuYY1Gd54uRgp8ELZTf13i073I9ZFRUU3PVjUKEOUoCdzNLksKc-mc-MF8tgLxSQ946AfwleAVkFCXduIAO7ASaWU3coX7CsXmZLGRT_a82wOORD8zihfJa4LG8bB-FKm2LVIu_QfqIHJKq-ytuycpeKMV_MTvsbsWeikH0tGPQxvAA902mMrYJr9wohOw0gru7mg_U6tLOwG2smcwuXBPnpty0oGuGwXWt_D6ryLwdNubLJpIWV0dOWF8N5D6VubNytNZlIbyFQKnGcPDw6hGRLMw2B7-1V2RpR6F3RibLFJf9GekI60UYdsXthAFE6Xzrlw03Gv5BOKImBoDPyMr0DCzneyAj9KDq4cbNNcihbHl1iA6lUCTNY3vkCBXmyujXZEcLu_Q0gvrAW3OvZMHeHY__CtXN6JFA";

console.log("NEXTAUTH_SECRET:", process.env.NEXTAUTH_SECRET);

const endpoint = HYGRAPH_ENDPOINT; // Your Hygraph endpoint
const graphQLClient = new GraphQLClient(endpoint, {
  headers: {
    authorization: `Bearer ${HYGRAPH_TOKEN}`, // Replace with your token
  },
});

// export const authOptions = {
//   providers: [
//     CredentialsProvider({
//       name: "Credentials",
//       credentials: {
//         email: { label: "Email", type: "email" },
//         password: { label: "Password", type: "password" },
//       },
//       async authorize(credentials) {
//         // GraphQL query to check the user
//         const query = gql`
//           query GetUser($email: String!) {
//             user(where: { email: $email }) {
//               id
//               email
//               name
//               password
//             }
//           }
//         `;

//         const variables = { email: credentials.email };

//         try {
//           const { user } = await hygraphClient.request(query, variables);

//           if (!user || user.password !== credentials.password) {
//             throw new Error("Invalid email or password");
//           }

//           return user;
//         } catch (error) {
//           console.error("Authorization error:", error);
//           return null;
//         }
//       },
//     }),
//   ],
//   secret: process.env.NEXTAUTH_SECRET,
//   session: {
//     strategy: "jwt",
//   },
//   callbacks: {
//     async jwt({ token, user }) {
//       if (user) {
//         token.id = user.id;
//         token.email = user.email;
//       }
//       return token;
//     },
//     async session({ session, token }) {
//       if (token) {
//         session.id = token.id;
//         session.email = token.email;
//       }
//       return session;
//     },
//   },
// };

// const handler = NextAuth(authOptions);
// export { handler as GET, handler as POST };

const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { email, password } = credentials;

        if (!email || !password) {
          throw new Error("Email and password are required");
        }

        // Query to find user by email
        const query = gql`
          query GetUser($email: String!) {
            account(where: { email: $email }) {
              id
              email
              password
            }
          }
        `;

        try {
          const data = await graphQLClient.request(query, { email });
          const user = data.account;

          // If no user found
          if (!user) {
            throw new Error("Invalid email or password");
          }

          // Check the password (implement your password validation logic)
          // Make sure to compare hashed passwords if applicable
          if (user.password !== password) {
            throw new Error("Invalid email or password");
          }

          return { id: user.id, email: user.email };
        } catch (error) {
          console.error("Error during authorization:", error);
          throw new Error("Login failed. Please try again.");
        }
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin", // Your sign-in page URL
    error: "/api/auth/error", // Redirect here on error
  },
  session: {
    jwt: true,
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

// Named exports for the HTTP methods
export async function GET(req) {
  return await NextAuth(req);
}

export async function POST(req) {
  return await NextAuth(req);
}
