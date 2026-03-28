import crypto from "crypto";
import { sql } from "../db.js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

  if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
    return res.status(400).json({ error: "Missing required Razorpay parameters" });
  }

  const secret = process.env.RAZORPAY_KEY_SECRET || "PLACEHOLDER_KEY_SECRET";

  try {
    const generated_signature = crypto
      .createHmac("sha256", secret)
      .update(razorpay_order_id + "|" + razorpay_payment_id)
      .digest("hex");

    if (generated_signature === razorpay_signature) {
      // Update the specific Neon database record by marking status as 'paid'
      await sql`
        UPDATE orders 
        SET status = 'paid'
        WHERE razorpay_order_id = ${razorpay_order_id}
      `;
      
      return res.status(200).json({ status: "success", message: "Razorpay signature verified" });
    } else {
      return res.status(400).json({ status: "failure", error: "Invalid Razorpay signature" });
    }
  } catch (error) {
    console.error("Signature verification error:", error);
    res.status(500).json({ error: "Server verification failed" });
  }
}
