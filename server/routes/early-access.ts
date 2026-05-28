import type { RequestHandler } from "express";
import { Resend } from "resend";

export const handleEarlyAccess: RequestHandler = async (req, res) => {
  const { email } = req.body;

  if (!email || typeof email !== "string") {
    res.status(400).json({ error: "Email is required" });
    return;
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("RESEND_API_KEY is not configured");
    res.status(500).json({ error: "Email service not configured" });
    return;
  }

  const resend = new Resend(apiKey);

  try {
    await resend.emails.send({
      from: "Optimesh Early Access <onboarding@resend.dev>",
      to: "contact@optimesh.ai",
      subject: "New Early Access Request",
      html: `
        <h2>New Early Access Request</h2>
        <p><strong>Email:</strong> ${email}</p>
        <p>This person submitted the early access form on optimesh.ai.</p>
      `,
    });

    res.status(200).json({ success: true });
  } catch (error) {
    console.error("Failed to send email:", error);
    res.status(500).json({ error: "Failed to send email" });
  }
};
