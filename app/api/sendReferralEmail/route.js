import MailchimpTransactional from "@mailchimp/mailchimp_transactional";

const mailchimpTransactional = MailchimpTransactional(
  process.env.MAILCHIMP_TRANSACTIONAL_API_KEY
);

export async function handler(req, res) {
  if (req.method === "POST") {
    const { toEmail, subject, message } = req.body;

    // Email message structure
    const emailMessage = {
      from_email: "hello@dravyafolio.me", // Your verified sending email
      subject: subject || "Test Email from Mandrill",
      text: message || "This is a test email sent using Mandrill!",
      to: [
        {
          email: toEmail,
          type: "to",
        },
      ],
    };

    try {
      const response = await mailchimpTransactional.messages.send({
        message: emailMessage,
      });
      return res.status(200).json(response);
    } catch (error) {
      console.error("Error sending email:", error);
      return res.status(500).json({ error: "Failed to send email" });
    }
  } else {
    return res.status(405).json({ error: "Method not allowed" });
  }
}
