import { buffer } from "micro";
import { NextResponse } from "next/server";
import Stripe from "stripe";

export const config = {
  api: {
    bodyParser: false, // Disables default body parsing to correctly process Stripe events
  },
};

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  const sig = req.headers["stripe-signature"];
  const buf = await buffer(req);

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      buf,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;

    // Extract necessary data
    const orderData = {
      sessionId: session.id,
      customerEmail: session.customer_email,
      amountTotal: session.amount_total,
      paymentStatus: session.payment_status,
      createdDate: new Date(session.created * 1000).toISOString(),
    };

    // Call a function to save this data to Hygraph
    await saveOrderToHygraph(orderData);
  }

  return new NextResponse("Received", { status: 200 });
}
