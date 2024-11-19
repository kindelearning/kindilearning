import fetch from "node-fetch";

export async function POST(request) {
  const { email, firstName, lastName, phone } = await request.json();
  const API_KEY = process.env.MAILCHIMP_API_KEY;
  const AUDIENCE_ID = process.env.MAILCHIMP_AUDIENCE_ID;
  const SERVER_PREFIX = process.env.MAILCHIMP_SERVER_PREFIX;

  if (!email || !firstName || !lastName) {
    return new Response(JSON.stringify({ error: "All fields are required" }), {
      status: 400,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  const url = `https://${SERVER_PREFIX}.api.mailchimp.com/3.0/lists/${AUDIENCE_ID}/members`;

  const data = {
    email_address: email,
    status: "subscribed",
    merge_fields: {
      FNAME: firstName,
      LNAME: lastName,
      PHONE: phone,
    },
  };

  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `apikey ${API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (response.status >= 400) {
    return new Response(JSON.stringify({ error: "Failed to subscribe" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  return new Response(JSON.stringify({ success: true }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
