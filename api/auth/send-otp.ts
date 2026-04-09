import { neon } from "@neondatabase/serverless";
import { Resend } from "resend";

export const config = {
  runtime: "edge",
};

export default async function handler(request: Request) {
  if (request.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), { status: 405 });
  }

  try {
    const { email } = await request.json();

    if (!email || !email.includes("@")) {
      return new Response(JSON.stringify({ error: "Invalid email address" }), { status: 400 });
    }

    const sql = neon(process.env.DATABASE_URL!);
    
    // Generate a cryptographically secure 6-digit numeric OTP
    const otp = crypto.getRandomValues(new Uint32Array(1))[0].toString().slice(-6).padStart(6, '0');
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes from now

    // 1. Invalidate any existing OTPs for this email to prevent spam/confusion
    await sql`DELETE FROM otps WHERE email = ${email}`;

    // 2. Insert new OTP
    await sql`
      INSERT INTO otps (email, otp, expires_at)
      VALUES (${email}, ${otp}, ${expiresAt.toISOString()})
    `;

    // 3. Output to console if in development mode
    if (process.env.NODE_ENV === "development") {
      console.log(`\n\n=== DEVELOPMENT OTP ===\nEmail: ${email}\nOTP: ${otp}\n=======================\n\n`);
    }

    // 4. Send email using Resend
    if (process.env.RESEND_API_KEY) {
      const resend = new Resend(process.env.RESEND_API_KEY);
      await resend.emails.send({
        from: "Miss DIY <onboarding@resend.dev>", // Replace with verified domain in production if needed
        to: email,
        subject: "Your Miss DIY Login Code",
        html: `
          <div style="font-family: sans-serif; padding: 20px; color: #1a1a1a;">
            <h2 style="color: #b8956a;">Miss DIY Authentication</h2>
            <p>Your one-time login code is:</p>
            <h1 style="letter-spacing: 4px; font-size: 32px; background: #f9f9f9; padding: 10px; display: inline-block; border-radius: 4px;">${otp}</h1>
            <p>This code will expire in 5 minutes.</p>
            <p style="color: #666; font-size: 12px; margin-top: 40px;">If you didn't request this code, you can safely ignore this email.</p>
          </div>
        `
      });
      console.log(`[AUTH] Emailed OTP to ${email}`);
    } else if (process.env.NODE_ENV !== "development") {
      console.warn("No RESEND_API_KEY found. Email dispatch failed.");
    }

    return new Response(JSON.stringify({ success: true, message: "OTP sent" }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error: any) {
    console.error("Failed to send OTP:", error);
    return new Response(JSON.stringify({ error: "Failed to send OTP" }), { status: 500 });
  }
}
