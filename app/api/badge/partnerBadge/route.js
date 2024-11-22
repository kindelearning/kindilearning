import { NextResponse } from "next/server";

const GRAPHQL_API_URL =
  "https://ap-south-1.cdn.hygraph.com/content/cm1dom1hh03y107uwwxrutpmz/master";
const GRAPHQL_API_KEY =
  "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImdjbXMtbWFpbi1wcm9kdWN0aW9uIn0.eyJ2ZXJzaW9uIjozLCJpYXQiOjE3MjcwNjQxNzcsImF1ZCI6WyJodHRwczovL2FwaS1hcC1zb3V0aC0xLmh5Z3JhcGguY29tL3YyL2NtMWRvbTFoaDAzeTEwN3V3d3hydXRwbXovbWFzdGVyIiwibWFuYWdlbWVudC1uZXh0LmdyYXBoY21zLmNvbSJdLCJpc3MiOiJodHRwczovL21hbmFnZW1lbnQtYXAtc291dGgtMS5oeWdyYXBoLmNvbS8iLCJzdWIiOiI2Yzg4NjI5YS1jMmU5LTQyYjctYmJjOC04OTI2YmJlN2YyNDkiLCJqdGkiOiJjbTFlaGYzdzYwcmZuMDdwaWdwcmpieXhyIn0.YMoI_XTrCZI-C7v_FX-oKL5VVtx95tPmOFReCdUcP50nIpE3tTjUtYdApDqSRPegOQai6wbyT0H8UbTTUYsZUnBbvaMd-Io3ru3dqT1WdIJMhSx6007fl_aD6gQcxb-gHxODfz5LmJdwZbdaaNnyKIPVQsOEb-uVHiDJP3Zag2Ec2opK-SkPKKWq-gfDv5JIZxwE_8x7kwhCrfQxCZyUHvIHrJb9VBPrCIq1XE-suyA03bGfh8_5PuCfKCAof7TbH1dtvaKjUuYY1Gd54uRgp8ELZTf13i073I9ZFRUU3PVjUKEOUoCdzNLksKc-mc-MF8tgLxSQ946AfwleAVkFCXduIAO7ASaWU3coX7CsXmZLGRT_a82wOORD8zihfJa4LG8bB-FKm2LVIu_QfqIHJKq-ytuycpeKMV_MTvsbsWeikH0tGPQxvAA902mMrYJr9wohOw0gru7mg_U6tLOwG2smcwuXBPnpty0oGuGwXWt_D6ryLwdNubLJpIWV0dOWF8N5D6VubNytNZlIbyFQKnGcPDw6hGRLMw2B7-1V2RpR6F3RibLFJf9GekI60UYdsXthAFE6Xzrlw03Gv5BOKImBoDPyMr0DCzneyAj9KDq4cbNNcihbHl1iA6lUCTNY3vkCBXmyujXZEcLu_Q0gvrAW3OvZMHeHY__CtXN6JFA";

export async function POST(req) {
  try {
    // Step 1: Query accounts with at least one partner
    const accountsQuery = `
          query {
            accounts(where: { partner_some: {} }) {
              id
              name
              partner {
                id
              }
            }
          }
        `;

    const accountsResponse = await fetch(GRAPHQL_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${GRAPHQL_API_KEY}`,
      },
      body: JSON.stringify({ query: accountsQuery }),
    });

    const accountsData = await accountsResponse.json();
    console.log("Accounts Response:", accountsData);

    if (!accountsData || accountsData.errors) {
      return new Response(
        JSON.stringify({ error: "Failed to fetch accounts data" }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    const accounts = accountsData.data?.accounts;

    // Step 2: Badge assignment logic for users with different partner counts
    const results = [];
    const partnerBadgeIds = {
      1: "cm2lp2d6z026l07pqqmmbps1q", // Replace with actual badge ID for 2 milestones
      2: "cm2lp3nzs02cg07pnqofwvo9b", // Replace with actual badge ID for 4 milestones
      3: "cm2lp81fg02kx07pqparyl3f2", // Replace with actual badge ID for 6 milestones
      4: "cm2loo6q701jt07pnntig1vuz", // Replace with actual badge ID for 8 milestones
      5: "cm2logmfm017y07pqofdz42kt", // Replace with actual badge ID for 10 milestones
    };

    for (const account of accounts) {
      const partnerCount = account.partner.length; // Correct field for partner count

      let badgeIdToAssign = null;

      // Determine the badge to assign based on partner count
      if (partnerCount >= 5) {
        badgeIdToAssign = partnerBadgeIds[5];
      } else if (partnerCount >= 4) {
        badgeIdToAssign = partnerBadgeIds[4];
      } else if (partnerCount >= 3) {
        badgeIdToAssign = partnerBadgeIds[3];
      } else if (partnerCount >= 2) {
        badgeIdToAssign = partnerBadgeIds[2];
      } else if (partnerCount >= 1) {
        badgeIdToAssign = partnerBadgeIds[1];
      }

      if (badgeIdToAssign) {
        // Mutation to assign the badge
        const assignBadgeMutation = `
              mutation {
                updateAccount(
                  where: { id: "${account.id}" }
                  data: { badge: { connect: { where: { id: "${badgeIdToAssign}" } } } }
                ) {
                  id
                  name
                  badge {
                    id
                    name
                  }
                }
              }
            `;

        const assignBadgeResponse = await fetch(GRAPHQL_API_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${GRAPHQL_API_KEY}`,
          },
          body: JSON.stringify({ query: assignBadgeMutation }),
        });

        const assignBadgeData = await assignBadgeResponse.json();
        console.log("Assign Badge Response:", assignBadgeData);

        if (assignBadgeData.errors) {
          results.push({
            accountId: account.id,
            status: "Failed",
            errors: assignBadgeData.errors,
          });
        } else {
          results.push({
            accountId: account.id,
            status: "Success",
          });
        }
      }
    }

    // Step 3: Return results
    return new NextResponse(JSON.stringify({ results }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error in badge assignment:", error);
    return new NextResponse(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
