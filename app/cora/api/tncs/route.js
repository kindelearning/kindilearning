import { NextResponse } from "next/server";

const STRAPI_API_URL = "https://upbeat-life-04fe8098b1.strapiapp.com/api/tnc?populate=*"; // Your Strapi API URL

// Handle GET request to fetch Tnc content with populate
export async function GET(req) {
  try {
    const response = await fetch(`${STRAPI_API_URL}?populate=*`, {
      method: "GET",
    });
    const data = await response.json();

    if (!data.data) {
      return NextResponse.json({ error: "No data found" }, { status: 404 });
    }

    return NextResponse.json(data); // Send the data back to the frontend
  } catch (error) {
    console.error("Error fetching Tnc data:", error);
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 }
    );
  }
}

// Handle POST request to create new Tnc content
export async function POST(req) {
  const body = await req.json();

  try {
    const response = await fetch(`${STRAPI_API_URL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error("Error creating Tnc:", error);
    return NextResponse.json(
      { error: "Failed to create content" },
      { status: 500 }
    );
  }
}

// Handle PUT request to update Tnc content
export async function PUT(req, { params }) {
  const body = await req.json();
  const { id } = params;

  try {
    const response = await fetch(`${STRAPI_API_URL}/${id}?populate=*`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error updating Tnc:", error);
    return NextResponse.json(
      { error: "Failed to update content" },
      { status: 500 }
    );
  }
}
