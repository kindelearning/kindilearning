import fetch from "node-fetch";

export async function POST(request) {
  const { referrerName, referrerEmail, referredName, referredEmail } =
    await request.json();

  // Create unique referral code
  const referralCode = `${referrerEmail.split("@")[0]}-${Date.now()}`;

  /**@Secondary_Account */
  const GRAPHQL_API =
    "https://ap-south-1.cdn.hygraph.com/content/cm26zkygb0vh107o4hjji94sc/master";
  const GRAPHQL_TOKEN =
    "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImdjbXMtbWFpbi1wcm9kdWN0aW9uIn0.eyJ2ZXJzaW9uIjozLCJpYXQiOjE3Mjg3ODc4MTIsImF1ZCI6WyJodHRwczovL2FwaS1hcC1zb3V0aC0xLmh5Z3JhcGguY29tL3YyL2NtMjZ6a3lnYjB2aDEwN280aGpqaTk0c2MvbWFzdGVyIiwibWFuYWdlbWVudC1uZXh0LmdyYXBoY21zLmNvbSJdLCJpc3MiOiJodHRwczovL21hbmFnZW1lbnQtYXAtc291dGgtMS5oeWdyYXBoLmNvbS8iLCJzdWIiOiI0MDhlNTBmNy0xZjQwLTQ3NmItOWUxYi1mNTA2NjhjZTc1ODkiLCJqdGkiOiJjbTFlaGYzdzYwcmZuMDdwaWdwcmpieXhyIn0.ET2Dl1Dy18PHzv4hKY2LonVh5_EgfrPSAkRF6Ry-mSZ1godAvtalBii-JqlCHcQKeA1ls6mnaG4u4BLU3wL5LplMhI4uAQ-Th3T6AcOh1CEruKLkLVJFSy6sgRcUa0i2Rr4bJejM1Bv_BTyDBDqoEvplZ0RLb3z8avJcDrRUBe-M1Fhj6u9ZikaN1BiBcnz6bS7UvecyC4Wr69ttYL8PDE6y83NzC7-UjzijPsvjx8ZET7TORrz3UH5_9WI0-AlkhMYg-_uu4YGJDsOP24gwKTDDmrmVeK0t6EoyYHsDM_76lkgm0Bf1rEjknDJLQLoiiJjS3SKXO4s7be09J_fdJPNnDiQ6sCJHXAtOIMN813P9bHoG4k-UXsBu01dau6viEz3dd0p6Q75AUmOJRAx-SnrLaNimAnSMtYGbbkmcPHqrXlVdHZg16MF82iLbDhtABM9ImIOqsw41xPaIWSDuiOy9ZxXaTraqX0SLtjxzOz7KSYo5HH4fxkY5d2jQxhLOIw2mwjg2QDPqyDSuoBUxyHhUFstUO_xtDGOlw7krza9ofvhkF4QV9a04rO5v_Xd0jK6wYcEkmaMeaINYpi1zqbUlpPczIYeY702QHQJuK_xt6rbDL37RacAoHuxE89D6NtEKFBozD9pGQj6pUVqjqcXN_DB-mFu43vKAxwK-nxo";

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
