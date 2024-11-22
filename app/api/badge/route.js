// app/api/badges/route.js
import { NextResponse } from "next/server";

// Define your Hygraph endpoint and token
const HYGRAPH_ENDPOINT =
  "https://ap-south-1.cdn.hygraph.com/content/cm1dom1hh03y107uwwxrutpmz/master";
const HYGRAPH_TOKEN =
  "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImdjbXMtbWFpbi1wcm9kdWN0aW9uIn0.eyJ2ZXJzaW9uIjozLCJpYXQiOjE3MjcwNjQxNzcsImF1ZCI6WyJodHRwczovL2FwaS1hcC1zb3V0aC0xLmh5Z3JhcGguY29tL3YyL2NtMWRvbTFoaDAzeTEwN3V3d3hydXRwbXovbWFzdGVyIiwibWFuYWdlbWVudC1uZXh0LmdyYXBoY21zLmNvbSJdLCJpc3MiOiJodHRwczovL21hbmFnZW1lbnQtYXAtc291dGgtMS5oeWdyYXBoLmNvbS8iLCJzdWIiOiI2Yzg4NjI5YS1jMmU5LTQyYjctYmJjOC04OTI2YmJlN2YyNDkiLCJqdGkiOiJjbTFlaGYzdzYwcmZuMDdwaWdwcmpieXhyIn0.YMoI_XTrCZI-C7v_FX-oKL5VVtx95tPmOFReCdUcP50nIpE3tTjUtYdApDqSRPegOQai6wbyT0H8UbTTUYsZUnBbvaMd-Io3ru3dqT1WdIJMhSx6007fl_aD6gQcxb-gHxODfz5LmJdwZbdaaNnyKIPVQsOEb-uVHiDJP3Zag2Ec2opK-SkPKKWq-gfDv5JIZxwE_8x7kwhCrfQxCZyUHvIHrJb9VBPrCIq1XE-suyA03bGfh8_5PuCfKCAof7TbH1dtvaKjUuYY1Gd54uRgp8ELZTf13i073I9ZFRUU3PVjUKEOUoCdzNLksKc-mc-MF8tgLxSQ946AfwleAVkFCXduIAO7ASaWU3coX7CsXmZLGRT_a82wOORD8zihfJa4LG8bB-FKm2LVIu_QfqIHJKq-ytuycpeKMV_MTvsbsWeikH0tGPQxvAA902mMrYJr9wohOw0gru7mg_U6tLOwG2smcwuXBPnpty0oGuGwXWt_D6ryLwdNubLJpIWV0dOWF8N5D6VubNytNZlIbyFQKnGcPDw6hGRLMw2B7-1V2RpR6F3RibLFJf9GekI60UYdsXthAFE6Xzrlw03Gv5BOKImBoDPyMr0DCzneyAj9KDq4cbNNcihbHl1iA6lUCTNY3vkCBXmyujXZEcLu_Q0gvrAW3OvZMHeHY__CtXN6JFA";

async function getBadgeIds() {
  const response = await fetch(HYGRAPH_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${HYGRAPH_TOKEN}`,
    },
    body: JSON.stringify({
      query: `
          query {
            badges {
              id
              name
            }
          }
        `,
    }),
  });

  const { data } = await response.json();
  const badges = data.badges;

  // Find the "Double Trouble" badge by name
  const activityBadge = badges.find((badge) => badge.name === "Double Trouble");

  if (!activityBadge) {
    console.error("Badge 'Double Trouble' not found.");
    return null;
  }

  return activityBadge.id; // Return the badge ID
}

// Fetch All Accounts and check each for activities
async function checkAndAssignBadgesToAllUsers() {
  const activityBadgeId = await getBadgeIds();

  if (!activityBadgeId) {
    return; // Badge not found, aborting
  }

  // Fetch all users (accounts) to check their activities
  const allUsersResponse = await fetch(HYGRAPH_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${HYGRAPH_TOKEN}`,
    },
    body: JSON.stringify({
      query: `
          query {
            accounts {
              id
              myActivity {
                id
              }
            }
          }
        `,
    }),
  });

  const { data } = await allUsersResponse.json();
  const users = data.accounts;

  // Process each user to check if they should get the badge
  for (const user of users) {
    const activityCount = user.myActivity.length;

    // If the user has more than 2 activities, assign the badge
    if (activityCount > 2) {
      await assignBadgeToAccount(user.id, activityBadgeId);
    } else {
      console.log(`User with ID ${user.id} does not have enough activities.`);
    }
  }
}

// Assign the "Double Trouble" badge to the account
async function assignBadgeToAccount(accountId, activityBadgeId) {
  const response = await fetch(HYGRAPH_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${HYGRAPH_TOKEN}`,
    },
    body: JSON.stringify({
      query: `
          mutation UpdateAccount($accountId: ID!, $badgeIds: [ID!]) {
            updateAccount(where: { id: $accountId }, data: {
              badge: { connect: $badgeIds }
            }) {
              id
              badge {
                id
                name
              }
            }
          }
        `,
      variables: { accountId, badgeIds: [activityBadgeId] },
    }),
  });

  const result = await response.json();
  if (result.data) {
    console.log(`Badge 'Double Trouble' assigned to account ID: ${accountId}`);
  } else {
    console.error("Failed to assign badge:", result.errors);
  }
}

// Trigger the batch process
checkAndAssignBadgesToAllUsers().then(() => {
  console.log("Badge assignment process completed.");
});
