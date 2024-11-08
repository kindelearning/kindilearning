// // app/api/sendWelcomeEmail/route.js
// import { NextResponse } from "next/server";
// import fetch from "node-fetch";

// export async function POST(req) {
//   const { email, name } = await req.json();

//   if (!email || !name) {
//     return NextResponse.json(
//       { error: "Email and name are required." },
//       { status: 400 }
//     );
//   }

//   const BREVO_API_KEY = process.env.BREVO_API_KEY;

//   const response = await fetch("https://api.brevo.com/v3/smtp/email", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       "api-key": BREVO_API_KEY,
//     },
//     body: JSON.stringify({
//       sender: { name: "Kindi Learning", email: "hello@dravyafolio.me" }, // Update sender details
//       to: [{ email, name }],
//       subject: "Welcome to Our Platform!",
//       htmlContent: `<p>Hi ${name},</p><p>Thank you for creating an account with us!</p>`,
//     }),
//   });

//   if (!response.ok) {
//     const errorData = await response.json();
//     return NextResponse.json(
//       { error: errorData.message || "Failed to send email" },
//       { status: response.status }
//     );
//   }

//   return NextResponse.json({ success: true });
// }

// pages/api/sendWelcomeEmail.js
import { NextApiRequest, NextApiResponse } from "next";
import crypto from "crypto";
import nodemailer from "nodemailer";

const WEBHOOK_SECRET_KEY = process.env.WEBHOOK_SECRET_KEY;

async function sendWelcomeEmail(email) {
  // Create reusable transporter object using SMTP transport
  let transporter = nodemailer.createTransport({
    service: "gmail", // You can use any email service like Gmail or SendGrid
    auth: {
      user: "your-email@gmail.com", // Your email address
      pass: "your-email-password", // Your email password or an app password (for Gmail)
    },
  });

  const mailOptions = {
    from: "your-email@gmail.com", // Sender address
    to: email, // Recipient email
    subject: "Welcome to Our Platform!",
    text: "Thank you for signing up. We are excited to have you on board!",
    html: "<p>Thank you for signing up. We are excited to have you on board!</p>",
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Welcome email sent to:", email);
  } catch (error) {
    console.error("Error sending email:", error);
  }
}

export default async function handler(req, res) {
  if (req.method === "POST") {
    // Get the signature from the headers and the payload
    const signature = req.headers["x-hygraph-signature"]; // Hygraph sends the signature in this header
    const payload = JSON.stringify(req.body); // Raw payload

    // Create the hash from the payload and secret key
    const hash = crypto
      .createHmac("sha256", WEBHOOK_SECRET_KEY)
      .update(payload)
      .digest("hex");

    // Compare the generated hash with the signature sent by Hygraph
    if (hash === signature) {
      console.log("Webhook verified successfully!");

      // Extract user data from the webhook payload
      const user = req.body.data; // Adjust this based on Hygraph's webhook payload format

      // Call the function to send a welcome email
      await sendWelcomeEmail(user.email);

      res.status(200).json({ message: "Welcome email sent!" });
    } else {
      console.log("Invalid webhook signature");
      res.status(400).json({ error: "Invalid signature" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
