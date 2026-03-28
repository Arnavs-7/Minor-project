import Razorpay from "razorpay";
import { sql } from "../db.js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { amount, currency = "INR", receipt } = req.body;

  if (!amount) {
    return res.status(400).json({ error: "Amount is required" });
  }

  try {
    const instance = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID || "PLACEHOLDER_KEY_ID",
      key_secret: process.env.RAZORPAY_KEY_SECRET || "PLACEHOLDER_KEY_SECRET",
    });

    const options = {
      // Razorpay calculates amount in paise (multiply by 100)
      amount: parseInt(amount, 10) * 100,  
      currency,
      receipt: receipt || `receipt_${Date.now()}`,
    };

    const order = await instance.orders.create(options);

    // Insert a record into Neon `orders` table capturing order.id and 'created' status
    // Tracking the exact amount in INR (divide by 100 back to normal decimal)
    await sql`
      INSERT INTO orders (razorpay_order_id, amount, status) 
      VALUES (${order.id}, ${options.amount / 100.0}, 'created')
    `;

    res.status(200).json(order);
  } catch (error) {
    console.error("Razorpay order creation error:", error);
    res.status(500).json({ error: "Failed to create order" });
  }
}
