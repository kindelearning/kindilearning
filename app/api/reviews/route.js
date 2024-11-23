import { NextResponse } from "next/server";

/**
 * @Secondary_Account_Credentials
 */

const HYGRAPH_API_KEY =
  "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImdjbXMtbWFpbi1wcm9kdWN0aW9uIn0.eyJ2ZXJzaW9uIjozLCJpYXQiOjE3MzIzNTkyNDEsImF1ZCI6WyJodHRwczovL2FwaS1hcC1zb3V0aC0xLmh5Z3JhcGguY29tL3YyL2NtM3UxeTVkbTA5MmMwN21sZ21sYjhuOXQvbWFzdGVyIiwibWFuYWdlbWVudC1uZXh0LmdyYXBoY21zLmNvbSJdLCJpc3MiOiJodHRwczovL21hbmFnZW1lbnQtYXAtc291dGgtMS5oeWdyYXBoLmNvbS8iLCJzdWIiOiJmN2Q2NzA1Yi04Y2M4LTQwYjUtOWY2MS03ZDU0ZjQ1MWIxMzciLCJqdGkiOiJjbTFlaGYzdzYwcmZuMDdwaWdwcmpieXhyIn0.n70t4ah5KJq3rYenisa0DCMmUao6qE1VLqsah4jpQmICQ_ad4A2fuZqikMz488vJD0q1KFPz04SuDhDOTmANdIAR9ZGZxllolWcm1wL-sXC_4v6VHKfkC6HkVhyApIAKlX5rrcSsjuDhmqfRjYdkwDmZTJtYqiPLr1n7JGPIULxzz-3AbD5RhJj7uR8cFFtMD0AkjWz0IhuyldpKZQwChYCfkSjUo8omdH6M9wMQmoZY7WUxoN3hAHoRAXPFPl8DFowWsroMOmfUSGyiR073VdXwCdIuL3CzxmJp-WB0RfrThe0EKSu44NDwRydoXEQdvxeZveSzeJwUuTcomvbwqYAxIcAKO2jFOvKYRd74HUqGRWgdcQ-_oCcLjQ5KL8SKEJWHUOndF8R-1gJhVsj1zyMAoS9-HY8idUhUmT7nt9hS3Uz2mWUbJqehhNWQB8fPMfUCXgYcNVNlOcRZyunxCZ06ngYX3xezTUXwH9bdjFigJtbRi9KEr7tNOVqTWrYuUvDcsAZp8AhSwj4GmVlO30cWhzu5wHJi0EAsEUoNL8uxZnaW2ANtOFsym51-2gqQw3wMmPcL6Jc4c2h5QqX8yBMPVSD7P3I1_PV0YTFDjuSieJL7kKrstMCcbF1A57x0M4XsY6_w8h3iuzUTCziDEzMpW5V3pg7VBnGK_9f3nhc";
const HYGRAPH_API_ENDPOINT =
  "https://ap-south-1.cdn.hygraph.com/content/cm3u1y5dm092c07mlgmlb8n9t/master";

  
export async function POST(req) {
  try {
    const body = await req.json();
    const { name, email, content, rating } = body;

    if (!name || !email || !content || !rating) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    // First mutation to create review
    const createMutation = `
        mutation CreateReview($name: String!, $email: String!, $content: String!, $rating: Int!) {
          createReview(data: { name: $name, email: $email, content: $content, rating: $rating }) {
            id
          }
        }
      `;

    const variables = { name, email, content, rating: parseInt(rating, 10) };

    // Execute the Create Mutation
    const createResponse = await fetch(HYGRAPH_API_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${HYGRAPH_API_KEY}`,
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
    const reviewId = createJson.data.createReview.id;
    const publishMutation = `
        mutation PublishReview($id: ID!) {
          publishReview(where: { id: $id }) {
            id
          }
        }
      `;

    const publishVariables = { id: reviewId };

    const publishResponse = await fetch(HYGRAPH_API_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${HYGRAPH_API_KEY}`,
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
