import { NextResponse } from "next/server";

const HYGRAPH_API_URL = process.env.HYGRAPH_MAIN_ENDPOINT; // Replace with your Hygraph API endpoint
const HYGRAPH_API_TOKEN = process.env.HYGRAPH_MAIN_TOKEN; // Store your API token securely

export async function POST(req) {
  const { userId, address, orderedProducts, paymentDetails } = await req.json();

  const query = `
    mutation UpdateAccount($id: ID!, $address: String!, $orderedProducts: JSON!, $paymentDetails: JSON!) {
      updateAccount(where: { id: $id }, data: { address: $address, orderedProducts: $orderedProducts, paymentDetails: $paymentDetails }) {
        id
        address
        orderedProducts
        paymentDetails
      }
    }
  `;

  const response = await fetch(HYGRAPH_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${HYGRAPH_API_TOKEN}`,
    },
    body: JSON.stringify({
      query,
      variables: { id: userId, address, orderedProducts, paymentDetails },
    }),
  });

  const result = await response.json();

  if (result.errors) {
    console.error("Error saving order:", result.errors);
    return NextResponse.json({ success: false, error: result.errors });
  }

  return NextResponse.json({
    success: true,
    account: result.data.updateAccount,
  });
}
