import { NextResponse } from "next/server";

/**
 * @Secondary_Account_Credentials
 */

const HYGRAPH_API_KEY =
  "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImdjbXMtbWFpbi1wcm9kdWN0aW9uIn0.eyJ2ZXJzaW9uIjozLCJpYXQiOjE3MzEwMzU5MjUsImF1ZCI6WyJodHRwczovL2FwaS1ldS13ZXN0LTIuaHlncmFwaC5jb20vdjIvY20zODYxajAzMGVpbzA3cHMwcnV2ZWE2cy9tYXN0ZXIiLCJtYW5hZ2VtZW50LW5leHQuZ3JhcGhjbXMuY29tIl0sImlzcyI6Imh0dHBzOi8vbWFuYWdlbWVudC1ldS13ZXN0LTIuaHlncmFwaC5jb20vIiwic3ViIjoiODAxNzM3YzYtYmQ5ZS00YmYxLWI0MTItOTE0MTRlNWRlZTliIiwianRpIjoiY20xZWhmM3c2MHJmbjA3cGlncHJqYnl4ciJ9.E6uT0-D7nQFs6qGarUJIU_LYcRvoesEMg4IFKA8orEmJdMnY5m7CIYb1_j0nyZOnhx8d6nJlOGMQ0bPPwUpJIDZgfB-jZSotKflxFtlUs_ad3XCc8QkQMl8wGS6zjCOAgHdZmTryd6Vl_JqTLfzW4qYCnqfg5cO4cZ9Dba_KZ1GhsBteXTqnJSkH2nF8hfSdnLaVvMfYONCizHTfpimGKQgcita7Hgkv7h1_PXfCA1Oa9ViT6Ht4cJCyHvUqI7RSiTZb-Yk5yiqVNfaJa_fXOYkvmt-0ioSjloFm-BZTU4o2CfjaBI3nzCx_zRizwi5vos-C6O0fCm_xcDkBQd5qPGiR8JA1Oj1znq17pVT-ujNPrtgenCX4vIaKqPZHT1ANxyVtxw1ZdXYrXHKxF7lxoedemq-jHzaJYiahGaNYXzF8_PpIRjm5LKiM29eL7z1zGVZI5PMnVp0j-Bvr9wxgE_V8ScOqsRjUJd_TgFhgCj8ffjitcpvlUJZn-nuOPaHbG2Vg_AVFkiNce9rFEp_MFLR6DP6Irh14WO5VuyxuJZbjQBm8hanUSy4xrzDgIFpJFDs532o_XMHfMDyn3-VxXQ-yg3gpjid77dkQefANgqCN7xwd06nshymB5DoKoZnUqHCUZNJdtNek1DMg8IvplMwqsfpjB-lNPpHUxE93mYI";
const HYGRAPH_API_ENDPOINT =
  "https://eu-west-2.cdn.hygraph.com/content/cm3861j030eio07ps0ruvea6s/master";

  
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
