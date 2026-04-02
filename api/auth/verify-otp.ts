import { neon } from "@neondatabase/serverless";

export const config = {
  runtime: "edge",
};

// Define admin emails here (could also be kept in the DB or env vars)
const ADMIN_EMAILS = ["gharewalnandini@gmail.com"];

export default async function handler(request: Request) {
  if (request.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), { status: 405 });
  }

  try {
    const { email, otp } = await request.json();

    if (!email || !otp) {
      return new Response(JSON.stringify({ error: "Email and OTP are required" }), { status: 400 });
    }

    const sql = neon(process.env.DATABASE_URL!);
    
    // 1. Verify OTP exists and matches
    const records = await sql`
      SELECT * FROM otps 
      WHERE email = ${email} AND otp = ${String(otp).trim()}
      ORDER BY created_at DESC LIMIT 1
    `;

    if (records.length === 0) {
      return new Response(JSON.stringify({ error: "Invalid OTP" }), { status: 401 });
    }

    const record = records[0];

    // 2. Check if expired
    const now = new Date();
    const expiresAt = new Date(record.expires_at);
    
    if (now > expiresAt) {
      // Clean up expired OTP
      await sql`DELETE FROM otps WHERE id = ${record.id}`;
      return new Response(JSON.stringify({ error: "OTP has expired" }), { status: 401 });
    }

    // 3. OTP is Valid - Delete it so it can't be reused
    await sql`DELETE FROM otps WHERE email = ${email}`;

    // 4. Determine Role & Ensure Customer Exists
    const role = ADMIN_EMAILS.includes(email.toLowerCase()) ? "admin" : "user";
    
    // Upsert customer into the customers table for record keeping
    const existingCustomers = await sql`SELECT id FROM customers WHERE email = ${email}`;
    if (existingCustomers.length === 0) {
      // Generate a temporary name or handle if needed
      await sql`
        INSERT INTO customers (name, phone, email, role) 
        VALUES ('New User', ${Math.random().toString().slice(2, 12)}, ${email}, ${role})
      `;
    } else {
      // Ensure the role matches just in case they were recently promoted
      await sql`UPDATE customers SET role = ${role} WHERE email = ${email}`;
    }

    return new Response(JSON.stringify({ 
      success: true, 
      user: { email, role } 
    }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error: any) {
    console.error("Failed to verify OTP:", error);
    return new Response(JSON.stringify({ error: "Failed to verify OTP" }), { status: 500 });
  }
}
