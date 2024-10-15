import { CREATE_ACCOUNT } from "@/lib/hygraph";
import { gql, GraphQLClient } from "graphql-request";

const HYGRAPH_ENDPOINT =
  "https://ap-south-1.cdn.hygraph.com/content/cm1dom1hh03y107uwwxrutpmz/master";
const HYGRAPH_TOKEN =
  "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImdjbXMtbWFpbi1wcm9kdWN0aW9uIn0.eyJ2ZXJzaW9uIjozLCJpYXQiOjE3MjcwNjQxNzcsImF1ZCI6WyJodHRwczovL2FwaS1hcC1zb3V0aC0xLmh5Z3JhcGguY29tL3YyL2NtMWRvbTFoaDAzeTEwN3V3d3hydXRwbXovbWFzdGVyIiwibWFuYWdlbWVudC1uZXh0LmdyYXBoY21zLmNvbSJdLCJpc3MiOiJodHRwczovL21hbmFnZW1lbnQtYXAtc291dGgtMS5oeWdyYXBoLmNvbS8iLCJzdWIiOiI2Yzg4NjI5YS1jMmU5LTQyYjctYmJjOC04OTI2YmJlN2YyNDkiLCJqdGkiOiJjbTFlaGYzdzYwcmZuMDdwaWdwcmpieXhyIn0.YMoI_XTrCZI-C7v_FX-oKL5VVtx95tPmOFReCdUcP50nIpE3tTjUtYdApDqSRPegOQai6wbyT0H8UbTTUYsZUnBbvaMd-Io3ru3dqT1WdIJMhSx6007fl_aD6gQcxb-gHxODfz5LmJdwZbdaaNnyKIPVQsOEb-uVHiDJP3Zag2Ec2opK-SkPKKWq-gfDv5JIZxwE_8x7kwhCrfQxCZyUHvIHrJb9VBPrCIq1XE-suyA03bGfh8_5PuCfKCAof7TbH1dtvaKjUuYY1Gd54uRgp8ELZTf13i073I9ZFRUU3PVjUKEOUoCdzNLksKc-mc-MF8tgLxSQ946AfwleAVkFCXduIAO7ASaWU3coX7CsXmZLGRT_a82wOORD8zihfJa4LG8bB-FKm2LVIu_QfqIHJKq-ytuycpeKMV_MTvsbsWeikH0tGPQxvAA902mMrYJr9wohOw0gru7mg_U6tLOwG2smcwuXBPnpty0oGuGwXWt_D6ryLwdNubLJpIWV0dOWF8N5D6VubNytNZlIbyFQKnGcPDw6hGRLMw2B7-1V2RpR6F3RibLFJf9GekI60UYdsXthAFE6Xzrlw03Gv5BOKImBoDPyMr0DCzneyAj9KDq4cbNNcihbHl1iA6lUCTNY3vkCBXmyujXZEcLu_Q0gvrAW3OvZMHeHY__CtXN6JFA";

const client = new GraphQLClient(HYGRAPH_ENDPOINT, {
  headers: {
    Authorization: `Bearer ${HYGRAPH_TOKEN}`,
  },
});

// const createAndPublishUser = async (userData) => {
//   const mutation = `
//     mutation CreateAndPublishUser($name: String!, $email: String!, $password: String!) {
//       createUser(data: { name: $name, email: $email, password: $password }) {
//         id
//         name
//         email
//       }
//       publishUser(where: { email: $email }, to: PUBLISHED) {
//         id
//         name
//         email
//       }
//     }
//   `;
const createAndPublishUser = async (userData) => {
  const mutation = `
    mutation CreateAndPublishUser($name: String!, $email: String!, $password: String!) {
      createAccount(data: { name: $name, email: $email, password: $password }) {
        id
        name
        email
      }
      publishAccount(where: { email: $email }, to: PUBLISHED) {
        id
        name
        email
      }
    }
  `;

  const response = await fetch(HYGRAPH_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${HYGRAPH_TOKEN}`,
    },
    body: JSON.stringify({
      query: mutation,
      variables: {
        name: userData.name,
        email: userData.email,
        password: userData.password,
      },
    }),
  });

  // return await response.json();
  const result = await response.json();
  return result;
};

const CREATE_USER = gql`
  mutation CreateAccount(
    $email: String!
    $username: String!
    $password: String!
  ) {
    createAccount(
      data: { email: $email, username: $username, password: $password }
    ) {
      id
    }
  }
`;

// export async function POST(req) {
//   const { email, username, password } = await req.json();

//   try {
//     await client.request(CREATE_USER, { email, username, password });
//     return new Response(JSON.stringify({ success: true }), { status: 200 });
//   } catch (error) {
//     console.error("Signup Error:", error);
//     return new Response(JSON.stringify({ success: false }), { status: 500 });
//   }
// }

export async function POST(req) {
  const { name, email, password } = await req.json();

  try {
    const result = await createAndPublishUser({ name, email, password });

    if (result.errors) {
      return NextResponse.json(
        { error: result.errors[0].message },
        { status: 400 }
      );
    }

    return NextResponse.json({
      message: "User registered successfully!",
      user: result.data.createUser,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "User registration failed." },
      { status: 500 }
    );
  }
}
