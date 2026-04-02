import type { VercelRequest, VercelResponse } from "@vercel/node";
import crypto from "crypto";
import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL!);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { 
      razorpay_order_id, 
      razorpay_payment_id, 
      razorpay_signature,
      amount,
      items,
      customer_name = "Guest Customer",
      customer_phone = ""
    } = req.body;

    const secret = process.env.RAZORPAY_KEY_SECRET!;
    const generated_signature = crypto
      .createHmac("sha256", secret)
      .update(razorpay_order_id + "|" + razorpay_payment_id)
      .digest("hex");

    if (generated_signature === razorpay_signature) {
      // Payment is verified
      
      // Save order to Neon Database
      await sql`
        INSERT INTO orders (customer_name, customer_phone, items, total, status)
        VALUES (${customer_name}, ${customer_phone}, ${JSON.stringify(items)}, ${amount}, 'Paid')
      `;

      return res.status(200).json({ success: true, message: "Payment verified and order saved" });
    } else {
      return res.status(400).json({ success: false, error: "Invalid signature" });
    }
  } catch (error: any) {
    console.error("Razorpay verification error:", error);
    return res.status(500).json({ error: "Internal server error", details: error.message });
  }
}
