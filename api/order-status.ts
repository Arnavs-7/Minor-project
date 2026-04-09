import type { VercelRequest, VercelResponse } from "@vercel/node";
import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL!);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const id = req.query.id as string;
  if (!id) {
    return res.status(400).json({ error: "Order ID or phone number is required" });
  }

  try {
    // Search by ID or phone
    const orders = await sql`
      SELECT id, customer_name, items, total, status, created_at 
      FROM orders 
      WHERE id::text = ${id} OR customer_phone = ${id}
      ORDER BY created_at DESC
    `;

    if (orders.length === 0) {
      return res.status(404).json({ error: "Order not found" });
    }

    // Map DB status to visual steps if needed
    const statusMap: Record<string, string> = {
      'Pending': 'Placed',
      'Paid': 'Placed',
      'Shipped': 'Shipped',
      'Delivered': 'Delivered',
      'Cancelled': 'Cancelled'
    };

    const order = orders[0];
    return res.status(200).json({
      order_id: order.id.toString(),
      status: statusMap[order.status] || order.status,
      items: order.items,
      total: parseFloat(order.total),
      created_at: order.created_at,
      // Mock tracking info for UI
      tracking_id: `TRK-${order.id}${Math.random().toString(36).substring(7).toUpperCase()}`,
      estimated_delivery: new Date(new Date(order.created_at).getTime() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString()
    });
  } catch (error) {
    console.error("Order status API error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
