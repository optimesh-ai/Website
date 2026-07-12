import type { Handler } from "@netlify/functions";
import { Resend } from "resend";

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

const headers = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

export const handler: Handler = async (event) => {
  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 204, headers, body: "" };
  }

  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: "Method not allowed" }),
    };
  }

  let email: unknown;
  try {
    const raw = event.isBase64Encoded
      ? Buffer.from(event.body ?? "", "base64").toString()
      : event.body ?? "";
    email = JSON.parse(raw).email;
  } catch {
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({ error: "Invalid request body" }),
    };
  }

  if (!email || typeof email !== "string") {
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({ error: "Email is required" }),
    };
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({ error: "Invalid email format" }),
    };
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("RESEND_API_KEY is not configured");
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: "Email service not configured" }),
    };
  }

  const resend = new Resend(apiKey);
  const from =
    process.env.EARLY_ACCESS_FROM ?? "Optimesh <noreply@optimesh.ai>";
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
      return {
        statusCode: 502,
        headers,
        body: JSON.stringify({ error: "Failed to send email" }),
      };
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ success: true }),
    };
  } catch (err) {
    console.error("Failed to send email:", err);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: "Failed to send email" }),
    };
  }
};
