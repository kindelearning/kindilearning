// app/api/sendWelcomeEmail/route.js
import { NextResponse } from "next/server";
import fetch from "node-fetch";

export async function POST(req) {
  const { email, name } = await req.json();

  if (!email || !name) {
    return NextResponse.json(
      { error: "Email and name are required." },
      { status: 400 }
    );
  }

  const BREVO_API_KEY = process.env.BREVO_API_KEY;

  const response = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "api-key": BREVO_API_KEY,
    },
    body: JSON.stringify({
      sender: { name: "Kindi Learning", email: "hello@dravyafolio.me" }, // Update sender details
      to: [{ email, name }],
      subject: "Welcome to Our Platform!",
      htmlContent: `<p>Hi ${name},</p><p>Thank you for creating an account with us!</p>`,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    return NextResponse.json(
      { error: errorData.message || "Failed to send email" },
      { status: response.status }
    );
  }

  return NextResponse.json({ success: true });
}
