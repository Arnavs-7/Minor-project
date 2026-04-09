import type { VercelRequest, VercelResponse } from "@vercel/node";
import { Resend } from "resend";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { name, email, subject, message } = req.body;

  if (!name || !email || !message || message.length < 20) {
    return res.status(400).json({ error: "Validation failed" });
  }

  try {
    if (process.env.RESEND_API_KEY) {
      const resend = new Resend(process.env.RESEND_API_KEY);
      await resend.emails.send({
        from: "Miss DIY <onboarding@resend.dev>",
        to: "gharewalnandini@gmail.com",
        subject: `Contact Form: ${subject || "No Subject"}`,
        html: `
          <h3>New Contact Form Submission</h3>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <p><strong>Message:</strong></p>
          <p>${message}</p>
        `
      });
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Contact API error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
