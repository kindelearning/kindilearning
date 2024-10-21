// app/api/comments.js
import { NextResponse } from "next/server";

const HYGRAPH_ENDPOINT =
  "https://ap-south-1.cdn.hygraph.com/content/cm1dom1hh03y107uwwxrutpmz/master";
const HYGRAPH_TOKEN =
  "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImdjbXMtbWFpbi1wcm9kdWN0aW9uIn0.eyJ2ZXJzaW9uIjozLCJpYXQiOjE3MjcwNjQxNzcsImF1ZCI6WyJodHRwczovL2FwaS1hcC1zb3V0aC0xLmh5Z3JhcGguY29tL3YyL2NtMWRvbTFoaDAzeTEwN3V3d3hydXRwbXovbWFzdGVyIiwibWFuYWdlbWVudC1uZXh0LmdyYXBoY21zLmNvbSJdLCJpc3MiOiJodHRwczovL21hbmFnZW1lbnQtYXAtc291dGgtMS5oeWdyYXBoLmNvbS8iLCJzdWIiOiI2Yzg4NjI5YS1jMmU5LTQyYjctYmJjOC04OTI2YmJlN2YyNDkiLCJqdGkiOiJjbTFlaGYzdzYwcmZuMDdwaWdwcmpieXhyIn0.YMoI_XTrCZI-C7v_FX-oKL5VVtx95tPmOFReCdUcP50nIpE3tTjUtYdApDqSRPegOQai6wbyT0H8UbTTUYsZUnBbvaMd-Io3ru3dqT1WdIJMhSx6007fl_aD6gQcxb-gHxODfz5LmJdwZbdaaNnyKIPVQsOEb-uVHiDJP3Zag2Ec2opK-SkPKKWq-gfDv5JIZxwE_8x7kwhCrfQxCZyUHvIHrJb9VBPrCIq1XE-suyA03bGfh8_5PuCfKCAof7TbH1dtvaKjUuYY1Gd54uRgp8ELZTf13i073I9ZFRUU3PVjUKEOUoCdzNLksKc-mc-MF8tgLxSQ946AfwleAVkFCXduIAO7ASaWU3coX7CsXmZLGRT_a82wOORD8zihfJa4LG8bB-FKm2LVIu_QfqIHJKq-ytuycpeKMV_MTvsbsWeikH0tGPQxvAA902mMrYJr9wohOw0gru7mg_U6tLOwG2smcwuXBPnpty0oGuGwXWt_D6ryLwdNubLJpIWV0dOWF8N5D6VubNytNZlIbyFQKnGcPDw6hGRLMw2B7-1V2RpR6F3RibLFJf9GekI60UYdsXthAFE6Xzrlw03Gv5BOKImBoDPyMr0DCzneyAj9KDq4cbNNcihbHl1iA6lUCTNY3vkCBXmyujXZEcLu_Q0gvrAW3OvZMHeHY__CtXN6JFA";

export async function POST(req) {
  try {
    const { name, content, blogId } = await req.json();

    // Check if any of the required fields are empty
    if (!name || !content || !blogId) {
      return NextResponse.json(
        { success: false, message: "All fields are required." },
        { status: 400 }
      );
    }

    const createMutation = `
      mutation CreateComment($name: String!, $content: String!, $blogId: ID!) {
        createComment( 
          data: {
            name: $name
            content: $content
            blogs: { connect: { id: $blogId } }
          }
        ) {
          id
          name
          content
        }
      }
    `;

    const variables = {
      name,
      content,
      blogId,
    };

    // Execute the Create Mutation
    const createResponse = await fetch(HYGRAPH_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${HYGRAPH_TOKEN}`,
      },
      body: JSON.stringify({ query: createMutation, variables }),
    });

    const createJson = await createResponse.json();

    if (createJson.errors) {
      console.error("GraphQL Errors:", createJson.errors);
      return NextResponse.json(
        { message: "Error creating review", errors: createJson.errors },
        { status: 400 }
      );
    }

    // Now, publish the created review
    const commentId = createJson.data.createComment.id;
    const publishMutation = `
        mutation PublishComment($id: ID!) {
          publishComment(where: { id: $id }) {
            id
          }
        }
      `;

    const publishVariables = { id: commentId };

    const publishResponse = await fetch(HYGRAPH_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${HYGRAPH_TOKEN}`,
      },
      body: JSON.stringify({
        query: publishMutation,
        variables: publishVariables,
      }),
    });
    const publishJson = await publishResponse.json();
    if (publishJson.errors) {
      console.error("GraphQL Errors:", publishJson.errors);
      return NextResponse.json(
        { message: "Error publishing review", errors: publishJson.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { message: "Review created and published successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Internal server error:", error.message);
    return NextResponse.json(
      { message: "Internal Server Error", error: error.message },
      { status: 500 }
    );
  }
}
