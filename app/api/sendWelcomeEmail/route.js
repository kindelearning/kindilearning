// // app/api/sendWelcomeEmail/route.js
import { NextResponse } from "next/server";
// import fetch from "node-fetch";
export async function POST(req) {
    try {
      // Extract data from the request payload
      const { email, name } = await req.json();
  
      if (!email) {
        return new Response(JSON.stringify({ error: 'Email is required' }), { status: 400 });
      }
  
      // Send an email using Brevo
      const response = await fetch('https://api.brevo.com/v3/smtp/email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'api-key': process.env.BREVO_API_KEY, // Use an environment variable for security
        },
        body: JSON.stringify({
          sender: { name: 'Your Company Name', email: 'hello@dravyafolio.me' },
          to: [{ email, name }],
          subject: 'Welcome to [Your Platform]',
          htmlContent: '<p>Welcome, {{params.name}}! Thank you for signing up.</p>',
          params: { name }, // Personalize the email with the user's name if available
        }),
      });
  
      if (!response.ok) {
        console.error('Failed to send email:', await response.text());
        return new Response(JSON.stringify({ error: 'Failed to send email' }), { status: 500 });
      }
  
      return new Response(JSON.stringify({ message: 'Welcome email sent successfully' }), { status: 200 });
    } catch (error) {
      console.error('Error handling request:', error);
      return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
    }
  }
