import { NextResponse } from "next/server";

/**
 * @Secondary_Account_Credentials
 */

const HYGRAPH_API_KEY =
  "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImdjbXMtbWFpbi1wcm9kdWN0aW9uIn0.eyJ2ZXJzaW9uIjozLCJpYXQiOjE3Mjg3ODc4MTIsImF1ZCI6WyJodHRwczovL2FwaS1hcC1zb3V0aC0xLmh5Z3JhcGguY29tL3YyL2NtMjZ6a3lnYjB2aDEwN280aGpqaTk0c2MvbWFzdGVyIiwibWFuYWdlbWVudC1uZXh0LmdyYXBoY21zLmNvbSJdLCJpc3MiOiJodHRwczovL21hbmFnZW1lbnQtYXAtc291dGgtMS5oeWdyYXBoLmNvbS8iLCJzdWIiOiI0MDhlNTBmNy0xZjQwLTQ3NmItOWUxYi1mNTA2NjhjZTc1ODkiLCJqdGkiOiJjbTFlaGYzdzYwcmZuMDdwaWdwcmpieXhyIn0.ET2Dl1Dy18PHzv4hKY2LonVh5_EgfrPSAkRF6Ry-mSZ1godAvtalBii-JqlCHcQKeA1ls6mnaG4u4BLU3wL5LplMhI4uAQ-Th3T6AcOh1CEruKLkLVJFSy6sgRcUa0i2Rr4bJejM1Bv_BTyDBDqoEvplZ0RLb3z8avJcDrRUBe-M1Fhj6u9ZikaN1BiBcnz6bS7UvecyC4Wr69ttYL8PDE6y83NzC7-UjzijPsvjx8ZET7TORrz3UH5_9WI0-AlkhMYg-_uu4YGJDsOP24gwKTDDmrmVeK0t6EoyYHsDM_76lkgm0Bf1rEjknDJLQLoiiJjS3SKXO4s7be09J_fdJPNnDiQ6sCJHXAtOIMN813P9bHoG4k-UXsBu01dau6viEz3dd0p6Q75AUmOJRAx-SnrLaNimAnSMtYGbbkmcPHqrXlVdHZg16MF82iLbDhtABM9ImIOqsw41xPaIWSDuiOy9ZxXaTraqX0SLtjxzOz7KSYo5HH4fxkY5d2jQxhLOIw2mwjg2QDPqyDSuoBUxyHhUFstUO_xtDGOlw7krza9ofvhkF4QV9a04rO5v_Xd0jK6wYcEkmaMeaINYpi1zqbUlpPczIYeY702QHQJuK_xt6rbDL37RacAoHuxE89D6NtEKFBozD9pGQj6pUVqjqcXN_DB-mFu43vKAxwK-nxo";
const HYGRAPH_API_ENDPOINT =
  "https://ap-south-1.cdn.hygraph.com/content/cm26zkygb0vh107o4hjji94sc/master";

  
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
