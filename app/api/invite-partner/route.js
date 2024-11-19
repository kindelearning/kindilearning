import { gql, GraphQLClient } from "graphql-request";
import { getServerSession } from "next-auth";

/**
 * @Main_Account
 * @Parent_Child_Account_relation
 */
const HYGRAPH_ENDPOINT =
  "https://ap-south-1.cdn.hygraph.com/content/cm1dom1hh03y107uwwxrutpmz/master";
const HYGRAPH_TOKEN =
  "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImdjbXMtbWFpbi1wcm9kdWN0aW9uIn0.eyJ2ZXJzaW9uIjozLCJpYXQiOjE3MjcwNjQxNzcsImF1ZCI6WyJodHRwczovL2FwaS1hcC1zb3V0aC0xLmh5Z3JhcGguY29tL3YyL2NtMWRvbTFoaDAzeTEwN3V3d3hydXRwbXovbWFzdGVyIiwibWFuYWdlbWVudC1uZXh0LmdyYXBoY21zLmNvbSJdLCJpc3MiOiJodHRwczovL21hbmFnZW1lbnQtYXAtc291dGgtMS5oeWdyYXBoLmNvbS8iLCJzdWIiOiI2Yzg4NjI5YS1jMmU5LTQyYjctYmJjOC04OTI2YmJlN2YyNDkiLCJqdGkiOiJjbTFlaGYzdzYwcmZuMDdwaWdwcmpieXhyIn0.YMoI_XTrCZI-C7v_FX-oKL5VVtx95tPmOFReCdUcP50nIpE3tTjUtYdApDqSRPegOQai6wbyT0H8UbTTUYsZUnBbvaMd-Io3ru3dqT1WdIJMhSx6007fl_aD6gQcxb-gHxODfz5LmJdwZbdaaNnyKIPVQsOEb-uVHiDJP3Zag2Ec2opK-SkPKKWq-gfDv5JIZxwE_8x7kwhCrfQxCZyUHvIHrJb9VBPrCIq1XE-suyA03bGfh8_5PuCfKCAof7TbH1dtvaKjUuYY1Gd54uRgp8ELZTf13i073I9ZFRUU3PVjUKEOUoCdzNLksKc-mc-MF8tgLxSQ946AfwleAVkFCXduIAO7ASaWU3coX7CsXmZLGRT_a82wOORD8zihfJa4LG8bB-FKm2LVIu_QfqIHJKq-ytuycpeKMV_MTvsbsWeikH0tGPQxvAA902mMrYJr9wohOw0gru7mg_U6tLOwG2smcwuXBPnpty0oGuGwXWt_D6ryLwdNubLJpIWV0dOWF8N5D6VubNytNZlIbyFQKnGcPDw6hGRLMw2B7-1V2RpR6F3RibLFJf9GekI60UYdsXthAFE6Xzrlw03Gv5BOKImBoDPyMr0DCzneyAj9KDq4cbNNcihbHl1iA6lUCTNY3vkCBXmyujXZEcLu_Q0gvrAW3OvZMHeHY__CtXN6JFA";

const graphQLClient = new GraphQLClient(HYGRAPH_ENDPOINT, {
  headers: {
    Authorization: `Bearer ${HYGRAPH_TOKEN}`,
  },
});


export async function getUserByEmail(email) {
  const query = gql`
    query ($email: String!) {
      account(where: { email: $email }) {
        id
        email
        username
        partners {
          id
        }
      }
    }
  `;

  const data = await graphQLClient.request(query, { email });
  return data.account;
}

// Function to update user's partners
export async function updateUserPartners(userId, partnerId) {
  const mutation = gql`
      mutation($userId: ID!, $partnerId: ID!) {
          updateAccount(
              where: { id: $userId }
              data: {
                  partners: {
                      connect: { id: $partnerId } // Connect to partner
                  }
              }
          ) {
              id
              partners {
                  id
              }
          }
      }
  `;

  await graphQLClient.request(mutation, { userId, partnerId });
}

export async function POST(req) {
  const session = await getServerSession(req); // Get session information

  // Check if the user is authenticated
  if (!session) {
    return new Response(JSON.stringify({ message: "Unauthorized" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  const { email } = await req.json();

  // Check if the user with the given email exists
  const partnerUser = await getUserByEmail(email);
  console.log("partner", partnerUser);
  if (!partnerUser) {
    return new Response(JSON.stringify({ message: "User not found" }), {
      status: 404,
      headers: { "Content-Type": "application/json" },
    });
  }

  // Add partner for both users
  try {
    await updateUserPartners(session.user.id, partnerUser.id);
    await updateUserPartners(partnerUser.id, session.user.id);

    return new Response(
      JSON.stringify({ message: "Partner added successfully" }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error adding partner:", error);
    return new Response(JSON.stringify({ message: "Error adding partner" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
