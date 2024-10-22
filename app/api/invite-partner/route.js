import { NextResponse } from "next/server";
import { gql } from "graphql-request";
import { GraphQLClient } from "graphql-request";

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

const INVITE_PARTNER_MUTATION = gql`
  mutation InvitePartner($accountId: ID!, $partnerId: ID!) {
    updateAccount(
      where: { id: $accountId }
      data: { partners: { connect: { id: $partnerId } } }
    ) {
      id
      partners {
        id
      }
    }
  }
`;

const GET_ACCOUNT_BY_EMAIL = gql`
  query ($email: String!) {
    account(where: { email: $email }) {
      id
    }
  }
`;

export async function POST(req) {
  const { accountId, partnerEmail } = await req.json(); // Get data from the request body

  try {
    // Step 1: Get the partner's account ID by email
    const partnerResponse = await graphQLClient.request(GET_ACCOUNT_BY_EMAIL, {
      email: partnerEmail,
    });

    console.log("partnerResponse: " + partnerResponse);
    const partner = partnerResponse.account;
    console.log("Partner: " + partner);

    if (!partner) {
      return new Response(JSON.stringify({ message: "Partner not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    const partnerId = partner.id;
    console.log("Partner: " + partnerId);

    // Step 2: Update the account to include the partner
    const updateResponse = await graphQLClient.request(
      INVITE_PARTNER_MUTATION,
      {
        accountId,
        partnerId,
      }
    );
    console.log("updateResponse: " + updateResponse);

    return new Response(JSON.stringify(updateResponse), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error inviting partner:", error);
    return new Response(JSON.stringify({ message: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
