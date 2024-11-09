import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2022-11-15",
});

export async function POST(req) {
  const sig = req.headers.get("stripe-signature");
  const body = await req.text();

  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET; // Your webhook secret from Stripe

  try {
    // Verify the webhook signature to make sure it came from Stripe
    const event = stripe.webhooks.constructEvent(body, sig, endpointSecret);

    // Handle the event
    switch (event.type) {
      case "payment_intent.amount_capturable_updated":
        const amountCapturableUpdated = event.data.object;
        console.log(
          "Payment Intent Amount Capturable Updated:",
          amountCapturableUpdated
        );
        break;

      case "payment_intent.canceled":
        const paymentIntentCanceled = event.data.object;
        console.log("Payment Intent Canceled:", paymentIntentCanceled);
        break;

      case "payment_intent.created":
        const paymentIntentCreated = event.data.object;
        console.log("Payment Intent Created:", paymentIntentCreated);
        break;

      case "payment_intent.partially_funded":
        const paymentIntentPartiallyFunded = event.data.object;
        console.log(
          "Payment Intent Partially Funded:",
          paymentIntentPartiallyFunded
        );
        break;

      case "payment_intent.payment_failed":
        const paymentIntentFailed = event.data.object;
        console.log("Payment Intent Failed:", paymentIntentFailed);
        break;

      case "payment_intent.processing":
        const paymentIntentProcessing = event.data.object;
        console.log("Payment Intent Processing:", paymentIntentProcessing);
        break;

      case "payment_intent.requires_action":
        const paymentIntentRequiresAction = event.data.object;
        console.log(
          "Payment Intent Requires Action:",
          paymentIntentRequiresAction
        );
        break;

      case "payment_intent.succeeded":
        const paymentIntentSucceeded = event.data.object;
        console.log("Payment Intent Succeeded:", paymentIntentSucceeded);
        break;

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    // Return a 200 response to Stripe to acknowledge receipt of the event
    return new NextResponse("Webhook received", { status: 200 });
  } catch (err) {
    console.error(`Webhook Error: ${err.message}`);
    return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 });
  }
}
