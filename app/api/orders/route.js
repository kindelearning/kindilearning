import { NextResponse } from "next/server";

export async function GET(req) {
  const { order_id } = req.query; // Capture order_id from query params

  try {
    // Fetch order from your database (replace with your actual database query)
    const order = await getOrderById(order_id);

    if (!order) {
      return new NextResponse(JSON.stringify({ error: "Order not found" }), {
        status: 404,
      });
    }

    return new NextResponse(JSON.stringify(order), { status: 200 });
  } catch (error) {
    console.error("Error fetching order:", error);
    return new NextResponse(
      JSON.stringify({ error: "Internal server error" }),
      {
        status: 500,
      }
    );
  }
}
