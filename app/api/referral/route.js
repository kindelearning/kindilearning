import fetch from "node-fetch";

export async function POST(request) {
  const { referrerName, referrerEmail, referredName, referredEmail } =
    await request.json();

  // Create unique referral code
  const referralCode = `${referrerEmail.split("@")[0]}-${Date.now()}`;

  /**@Secondary_Account */
  const GRAPHQL_API =
    "https://eu-west-2.cdn.hygraph.com/content/cm3861j030eio07ps0ruvea6s/master";
  const GRAPHQL_TOKEN =
    "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImdjbXMtbWFpbi1wcm9kdWN0aW9uIn0.eyJ2ZXJzaW9uIjozLCJpYXQiOjE3MzEwMzU5MjUsImF1ZCI6WyJodHRwczovL2FwaS1ldS13ZXN0LTIuaHlncmFwaC5jb20vdjIvY20zODYxajAzMGVpbzA3cHMwcnV2ZWE2cy9tYXN0ZXIiLCJtYW5hZ2VtZW50LW5leHQuZ3JhcGhjbXMuY29tIl0sImlzcyI6Imh0dHBzOi8vbWFuYWdlbWVudC1ldS13ZXN0LTIuaHlncmFwaC5jb20vIiwic3ViIjoiODAxNzM3YzYtYmQ5ZS00YmYxLWI0MTItOTE0MTRlNWRlZTliIiwianRpIjoiY20xZWhmM3c2MHJmbjA3cGlncHJqYnl4ciJ9.E6uT0-D7nQFs6qGarUJIU_LYcRvoesEMg4IFKA8orEmJdMnY5m7CIYb1_j0nyZOnhx8d6nJlOGMQ0bPPwUpJIDZgfB-jZSotKflxFtlUs_ad3XCc8QkQMl8wGS6zjCOAgHdZmTryd6Vl_JqTLfzW4qYCnqfg5cO4cZ9Dba_KZ1GhsBteXTqnJSkH2nF8hfSdnLaVvMfYONCizHTfpimGKQgcita7Hgkv7h1_PXfCA1Oa9ViT6Ht4cJCyHvUqI7RSiTZb-Yk5yiqVNfaJa_fXOYkvmt-0ioSjloFm-BZTU4o2CfjaBI3nzCx_zRizwi5vos-C6O0fCm_xcDkBQd5qPGiR8JA1Oj1znq17pVT-ujNPrtgenCX4vIaKqPZHT1ANxyVtxw1ZdXYrXHKxF7lxoedemq-jHzaJYiahGaNYXzF8_PpIRjm5LKiM29eL7z1zGVZI5PMnVp0j-Bvr9wxgE_V8ScOqsRjUJd_TgFhgCj8ffjitcpvlUJZn-nuOPaHbG2Vg_AVFkiNce9rFEp_MFLR6DP6Irh14WO5VuyxuJZbjQBm8hanUSy4xrzDgIFpJFDs532o_XMHfMDyn3-VxXQ-yg3gpjid77dkQefANgqCN7xwd06nshymB5DoKoZnUqHCUZNJdtNek1DMg8IvplMwqsfpjB-lNPpHUxE93mYI";

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
