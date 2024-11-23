import fetch from "node-fetch";

export async function POST(request) {
  const { referrerName, referrerEmail, referredName, referredEmail } =
    await request.json();

  // Create unique referral code
  const referralCode = `${referrerEmail.split("@")[0]}-${Date.now()}`;

  /**@Secondary_Account */
  const GRAPHQL_API =
    "https://ap-south-1.cdn.hygraph.com/content/cm3u1y5dm092c07mlgmlb8n9t/master";
  const GRAPHQL_TOKEN =
    "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImdjbXMtbWFpbi1wcm9kdWN0aW9uIn0.eyJ2ZXJzaW9uIjozLCJpYXQiOjE3MzIzNTkyNDEsImF1ZCI6WyJodHRwczovL2FwaS1hcC1zb3V0aC0xLmh5Z3JhcGguY29tL3YyL2NtM3UxeTVkbTA5MmMwN21sZ21sYjhuOXQvbWFzdGVyIiwibWFuYWdlbWVudC1uZXh0LmdyYXBoY21zLmNvbSJdLCJpc3MiOiJodHRwczovL21hbmFnZW1lbnQtYXAtc291dGgtMS5oeWdyYXBoLmNvbS8iLCJzdWIiOiJmN2Q2NzA1Yi04Y2M4LTQwYjUtOWY2MS03ZDU0ZjQ1MWIxMzciLCJqdGkiOiJjbTFlaGYzdzYwcmZuMDdwaWdwcmpieXhyIn0.n70t4ah5KJq3rYenisa0DCMmUao6qE1VLqsah4jpQmICQ_ad4A2fuZqikMz488vJD0q1KFPz04SuDhDOTmANdIAR9ZGZxllolWcm1wL-sXC_4v6VHKfkC6HkVhyApIAKlX5rrcSsjuDhmqfRjYdkwDmZTJtYqiPLr1n7JGPIULxzz-3AbD5RhJj7uR8cFFtMD0AkjWz0IhuyldpKZQwChYCfkSjUo8omdH6M9wMQmoZY7WUxoN3hAHoRAXPFPl8DFowWsroMOmfUSGyiR073VdXwCdIuL3CzxmJp-WB0RfrThe0EKSu44NDwRydoXEQdvxeZveSzeJwUuTcomvbwqYAxIcAKO2jFOvKYRd74HUqGRWgdcQ-_oCcLjQ5KL8SKEJWHUOndF8R-1gJhVsj1zyMAoS9-HY8idUhUmT7nt9hS3Uz2mWUbJqehhNWQB8fPMfUCXgYcNVNlOcRZyunxCZ06ngYX3xezTUXwH9bdjFigJtbRi9KEr7tNOVqTWrYuUvDcsAZp8AhSwj4GmVlO30cWhzu5wHJi0EAsEUoNL8uxZnaW2ANtOFsym51-2gqQw3wMmPcL6Jc4c2h5QqX8yBMPVSD7P3I1_PV0YTFDjuSieJL7kKrstMCcbF1A57x0M4XsY6_w8h3iuzUTCziDEzMpW5V3pg7VBnGK_9f3nhc";

  // Updated GraphQL mutation without referralStatus
  const createReferralMutation = `
  mutation CreateReferral {
    createReferral(data: {
      referrerName: "${referrerName}",
      referrerEmail: "${referrerEmail}",
      referredName: "${referredName}",
      referredEmail: "${referredEmail}",
      referralCode: "${referralCode}",
      referralDate: "${new Date().toISOString()}"
    }) {
      id
    }
  }
`;


  try {
    // Create referral in Hygraph
    const hygraphResponse = await fetch(GRAPHQL_API, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${GRAPHQL_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query: createReferralMutation }),
    });

    const hygraphData = await hygraphResponse.json();
    if (hygraphData.errors) {
      console.error("Hygraph Error:", hygraphData.errors);
      throw new Error("Failed to create referral");
    }

    // Send Email via Mailchimp Transactional Email (Mandrill)
    const MAILCHIMP_TRANSACTIONAL_API_KEY =
      process.env.MAILCHIMP_TRANSACTIONAL_API_KEY;
    const mailchimpResponse = await fetch(
      "https://mandrillapp.com/api/1.0/messages/send.json",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          key: MAILCHIMP_TRANSACTIONAL_API_KEY,
          message: {
            from_email: "your-email@example.com",
            to: [
              {
                email: referredEmail,
                type: "to",
              },
            ],
            subject: `You've been referred by ${referrerName}!`,
            text: `Hi ${referredName},\n\n${referrerName} has referred you! Use the referral code ${referralCode} when signing up to get started.\n\nThank you!`,
          },
        }),
      }
    );

    const mailchimpData = await mailchimpResponse.json();
    if (
      mailchimpData[0].status === "rejected" ||
      mailchimpData[0].status === "invalid"
    ) {
      console.error("Mailchimp Error:", mailchimpData);
      throw new Error("Failed to send email");
    }

    return new Response(
      JSON.stringify({ success: true, message: "Thank you for referring!" }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

// Helper function to send referral email
// async function sendReferralEmail(
//   referrerName,
//   referrerEmail,
//   referredName,
//   referredEmail,
//   referralCode
// ) {
//   const API_KEY = process.env.MAILCHIMP_API_KEY;
//   const SERVER_PREFIX = process.env.MAILCHIMP_SERVER_PREFIX;

//   const url = `https://${SERVER_PREFIX}.api.mailchimp.com/3.0/messages/send`;

//   const data = {
//     message: {
//       from_email: referrerEmail,
//       subject: `Your Friend ${referrerName} Referred You!`,
//       to: [
//         {
//           email: referredEmail,
//           type: "to",
//         },
//       ],
//       html: `<p>Hi ${referredName},</p>
//              <p>Your friend ${referrerName} referred you! Use the referral code <b>${referralCode}</b> to sign up and get exclusive offers.</p>`,
//     },
//   };

//   return fetch(url, {
//     method: "POST",
//     headers: {
//       Authorization: `apikey ${API_KEY}`,
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(data),
//   });
// }
