import fetch from "node-fetch";

export async function POST(request) {
  const { referrerName, referrerEmail, referredName, referredEmail } =
    await request.json();

  // Create unique referral code
  const referralCode = `${referrerEmail.split("@")[0]}-${Date.now()}`;

  /**@Secondary_Account */
  const GRAPHQL_API =
    "https://eu-west-2.cdn.hygraph.com/content/cm3mpit1n15c107mlcvd29nt4/master";
  const GRAPHQL_TOKEN =
    "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImdjbXMtbWFpbi1wcm9kdWN0aW9uIn0.eyJ2ZXJzaW9uIjozLCJpYXQiOjE3MzE5MTUxMDIsImF1ZCI6WyJodHRwczovL2FwaS1ldS13ZXN0LTIuaHlncmFwaC5jb20vdjIvY20zbXBpdDFuMTVjMTA3bWxjdmQyOW50NC9tYXN0ZXIiLCJtYW5hZ2VtZW50LW5leHQuZ3JhcGhjbXMuY29tIl0sImlzcyI6Imh0dHBzOi8vbWFuYWdlbWVudC1ldS13ZXN0LTIuaHlncmFwaC5jb20vIiwic3ViIjoiYjgxZjY3MmQtNWQ0Ni00NTMwLWE2ZDktM2FjYmU0NzNlOGYyIiwianRpIjoiY20xZWhmM3c2MHJmbjA3cGlncHJqYnl4ciJ9.rGvbZHXOfpsZW2cxpNUdQNpUdg6b7yBehvDmWeK19Fh_F5QGqEN0JlaZ23L1GX4T21IqF8L39zwfpxWrFwpR04GPUUuvWqeX1W6X9IpXsJkCq9Z8uwX78AEaIseNkBGy3N-3bXa36Jkc2YvCBa4WHBb3LJs4TJ2DGipc-pkC6uvK68uKrx9uzqAYD5KbIEVhilCLQYC-ziLQJK9X9lwto9ieQg7gng-2dUGbl34ERijIT-oZNxCgEnjz3H5taYjbGzhh2H5lY4-JL9CQxfKn4fF0AqO-kbrq2NPKde0dbb1WFL_HYsWDoDuF1oZ6zCJOrUwEw1I0Ez3vuQNDTGI0Vc2vT0N-wQHgiBVvGySauDse48QgcfQxpou19xO2banGbOsVQRY0xJJiyjodykaBA5Y97VM07nlOQS-kwzklpLRDqItXqM-yso2Rv4AhcFBeXnDTMCt56i15zQK94vCLHhveGKGeUSP0zNkdJQxKn7nQ8PjLiKwSdZhvkVU0WTdiA2dAUnjLs8lzZojlKi79GN1ncCW7Qe_xixLL8FwEwoTWgaK7Mqr1Oq6hKjqvc2ksK86z9iPTBAulsk9XmT7euMTOGLjlkW0BoDrGOM7bW04Ls5Dmo-Zz2UP42NYG4_gOkvNN2CgtjshHnzFpd6TyiDPLKx9y8QQTSFJ21TRstPg";

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
