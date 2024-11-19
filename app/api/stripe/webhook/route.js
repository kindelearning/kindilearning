// app/api/webhooks/stripe/route.js (using App Router)

import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    // Assuming you need the raw body for signature verification (e.g., with Stripe)
    const body = await req.text(); // Use .text() for raw body, .json() if JSON parsing is required

    // You can perform your logic here (e.g., signature verification, processing events, etc.)
    // Example: Parse Stripe event (ensure you have the Stripe SDK installed)
    const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
    const sig = req.headers.get("stripe-signature");
    const event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_ENDPOINT_SECRET
    );

    // Handle the event
    switch (event.type) {
      case "checkout.session.completed":
        const session = event.data.object;
        console.log("Payment successful:", session);
        // Your custom handling logic
        break;
      // Handle other event types as needed
      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (err) {
    console.error("Error handling webhook:", err);
    return NextResponse.json({ error: "Webhook error" }, { status: 400 });
  }
}
