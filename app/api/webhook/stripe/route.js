import Stripe from "stripe";
import { NextResponse } from "next/server";

const HYGRAPH_ENDPOINT =
  "https://ap-south-1.cdn.hygraph.com/content/cm1dom1hh03y107uwwxrutpmz/master";
const HYGRAPH_TOKEN =
  "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImdjbXMtbWFpbi1wcm9kdWN0aW9uIn0.eyJ2ZXJzaW9uIjozLCJpYXQiOjE3MjcwNjQxNzcsImF1ZCI6WyJodHRwczovL2FwaS1hcC1zb3V0aC0xLmh5Z3JhcGguY29tL3YyL2NtMWRvbTFoaDAzeTEwN3V3d3hydXRwbXovbWFzdGVyIiwibWFuYWdlbWVudC1uZXh0LmdyYXBoY21zLmNvbSJdLCJpc3MiOiJodHRwczovL21hbmFnZW1lbnQtYXAtc291dGgtMS5oeWdyYXBoLmNvbS8iLCJzdWIiOiI2Yzg4NjI5YS1jMmU5LTQyYjctYmJjOC04OTI2YmJlN2YyNDkiLCJqdGkiOiJjbTFlaGYzdzYwcmZuMDdwaWdwcmpieXhyIn0.YMoI_XTrCZI-C7v_FX-oKL5VVtx95tPmOFReCdUcP50nIpE3tTjUtYdApDqSRPegOQai6wbyT0H8UbTTUYsZUnBbvaMd-Io3ru3dqT1WdIJMhSx6007fl_aD6gQcxb-gHxODfz5LmJdwZbdaaNnyKIPVQsOEb-uVHiDJP3Zag2Ec2opK-SkPKKWq-gfDv5JIZxwE_8x7kwhCrfQxCZyUHvIHrJb9VBPrCIq1XE-suyA03bGfh8_5PuCfKCAof7TbH1dtvaKjUuYY1Gd54uRgp8ELZTf13i073I9ZFRUU3PVjUKEOUoCdzNLksKc-mc-MF8tgLxSQ946AfwleAVkFCXduIAO7ASaWU3coX7CsXmZLGRT_a82wOORD8zihfJa4LG8bB-FKm2LVIu_QfqIHJKq-ytuycpeKMV_MTvsbsWeikH0tGPQxvAA902mMrYJr9wohOw0gru7mg_U6tLOwG2smcwuXBPnpty0oGuGwXWt_D6ryLwdNubLJpIWV0dOWF8N5D6VubNytNZlIbyFQKnGcPDw6hGRLMw2B7-1V2RpR6F3RibLFJf9GekI60UYdsXthAFE6Xzrlw03Gv5BOKImBoDPyMr0DCzneyAj9KDq4cbNNcihbHl1iA6lUCTNY3vkCBXmyujXZEcLu_Q0gvrAW3OvZMHeHY__CtXN6JFA";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const runtime = "edge"; // Enables edge runtime

export async function POST(req) {
  const sig = req.headers.get("stripe-signature");
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event;

  try {
    const rawBody = await req.text(); // Read the raw body
    event = stripe.webhooks.constructEvent(rawBody, sig, webhookSecret);
  } catch (err) {
    console.error("⚠️ Webhook signature verification failed:", err.message);
    return NextResponse.json({ error: "Webhook Error" }, { status: 400 });
  }

  // Handle Stripe Event Types
  if (event.type === "checkout.session.completed") {
    const session = event.data.object; // Extract session data
    await saveOrderToHygraph(session); // Save to Hygraph
  }

  return NextResponse.json({ received: true });
}

async function saveOrderToHygraph(session) {
  const { id, customer_email, amount_total, payment_status, created } = session;

  const orderData = {
    sessionId: id,
    customerEmail: customer_email,
    amountTotal: amount_total / 100, // Convert from cents
    paymentStatus: payment_status,
    createdDate: new Date(created * 1000).toISOString(),
  };
  console.log("Constructed order data:", orderData); // Log the order data to verify it

  try {
    const response = await fetch(HYGRAPH_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${HYGRAPH_TOKEN}`,
      },
      body: JSON.stringify({
        query: `
            mutation CreateOrder($data: OrderCreateInput!) {
              createOrder(data: $data) {
                id
              }
            }
          `,
        variables: { data: orderData },
      }),
    });

    const result = await response.json();
    console.log("Order saved to Hygraph:", result);
  } catch (error) {
    console.error("Failed to save order to Hygraph:", error);
  }
}
