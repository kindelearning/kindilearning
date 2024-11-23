import { NextResponse } from "next/server";

/**
 * @Secondary_Account_Credentials
 */

const HYGRAPH_API_KEY =
  "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImdjbXMtbWFpbi1wcm9kdWN0aW9uIn0.eyJ2ZXJzaW9uIjozLCJpYXQiOjE3MzE5MTUxMDIsImF1ZCI6WyJodHRwczovL2FwaS1ldS13ZXN0LTIuaHlncmFwaC5jb20vdjIvY20zbXBpdDFuMTVjMTA3bWxjdmQyOW50NC9tYXN0ZXIiLCJtYW5hZ2VtZW50LW5leHQuZ3JhcGhjbXMuY29tIl0sImlzcyI6Imh0dHBzOi8vbWFuYWdlbWVudC1ldS13ZXN0LTIuaHlncmFwaC5jb20vIiwic3ViIjoiYjgxZjY3MmQtNWQ0Ni00NTMwLWE2ZDktM2FjYmU0NzNlOGYyIiwianRpIjoiY20xZWhmM3c2MHJmbjA3cGlncHJqYnl4ciJ9.rGvbZHXOfpsZW2cxpNUdQNpUdg6b7yBehvDmWeK19Fh_F5QGqEN0JlaZ23L1GX4T21IqF8L39zwfpxWrFwpR04GPUUuvWqeX1W6X9IpXsJkCq9Z8uwX78AEaIseNkBGy3N-3bXa36Jkc2YvCBa4WHBb3LJs4TJ2DGipc-pkC6uvK68uKrx9uzqAYD5KbIEVhilCLQYC-ziLQJK9X9lwto9ieQg7gng-2dUGbl34ERijIT-oZNxCgEnjz3H5taYjbGzhh2H5lY4-JL9CQxfKn4fF0AqO-kbrq2NPKde0dbb1WFL_HYsWDoDuF1oZ6zCJOrUwEw1I0Ez3vuQNDTGI0Vc2vT0N-wQHgiBVvGySauDse48QgcfQxpou19xO2banGbOsVQRY0xJJiyjodykaBA5Y97VM07nlOQS-kwzklpLRDqItXqM-yso2Rv4AhcFBeXnDTMCt56i15zQK94vCLHhveGKGeUSP0zNkdJQxKn7nQ8PjLiKwSdZhvkVU0WTdiA2dAUnjLs8lzZojlKi79GN1ncCW7Qe_xixLL8FwEwoTWgaK7Mqr1Oq6hKjqvc2ksK86z9iPTBAulsk9XmT7euMTOGLjlkW0BoDrGOM7bW04Ls5Dmo-Zz2UP42NYG4_gOkvNN2CgtjshHnzFpd6TyiDPLKx9y8QQTSFJ21TRstPg";
const HYGRAPH_API_ENDPOINT =
  "https://eu-west-2.cdn.hygraph.com/content/cm3mpit1n15c107mlcvd29nt4/master";

  
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
