import type { RequestHandler } from "express";
import { Resend } from "resend";

function escapeHtml(str: string): string {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

export const handleEarlyAccess: RequestHandler = async (req, res) => {
  // In Netlify's serverless environment, express.json() may not parse the body
  // (serverless-http can pass it as a raw string). Fall back to manual parsing.
  const body =
    typeof req.body === "string" ? JSON.parse(req.body) : (req.body ?? {});
  const email: unknown = body.email;

  if (!email || typeof email !== "string") {
    res.status(400).json({ error: "Email is required" });
    return;
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    res.status(400).json({ error: "Invalid email format" });
    return;
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("RESEND_API_KEY is not configured");
    res.status(500).json({ error: "Email service not configured" });
    return;
  }

  const resend = new Resend(apiKey);

  // Both default to optimesh.ai, but can be overridden via env without a code
  // change. The `from` address must be on a domain verified in Resend — the
  // sandbox sender (onboarding@resend.dev) can only deliver to your own
  // Resend account email, not to an arbitrary recipient.
  const from = process.env.EARLY_ACCESS_FROM ?? "Optimesh <noreply@optimesh.ai>";
  const to = process.env.EARLY_ACCESS_TO ?? "chandler@optimesh.ai";

  try {
    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: email,
      subject: "New Early Access Request",
      html: `
        <h2>New Early Access Request</h2>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p>This person submitted the early access form on optimesh.ai.</p>
      `,
    });

    if (error) {
      console.error("Resend rejected the email:", error);
      res.status(502).json({ error: "Failed to send email" });
      return;
    }

    res.status(200).json({ success: true });
  } catch (error) {
    console.error("Failed to send email:", error);
    res.status(500).json({ error: "Failed to send email" });
  }
};
