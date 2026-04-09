import type { VercelRequest, VercelResponse } from "@vercel/node";
import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL!);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, PUT, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();

  try {
    // Basic Admin protection
    const adminEmail = req.headers["x-admin-email"] as string;
    if (!adminEmail || adminEmail !== "gharewalnandini@gmail.com") {
      return res.status(403).json({ error: "Unauthorized access" });
    }

    // ── GET /api/admin/orders ──
    if (req.method === "GET") {
      const orders = await sql`SELECT * FROM orders ORDER BY created_at DESC`;
      return res.status(200).json(orders);
    }

    // ── PUT /api/admin/orders (update status) ──
    if (req.method === "PUT") {
      const { id, status } = req.body || {};
      if (!id || !status) return res.status(400).json({ error: "id and status are required" });
      const valid = ["Pending", "Shipped", "Delivered", "Cancelled"];
      if (!valid.includes(status)) return res.status(400).json({ error: `status must be one of: ${valid.join(", ")}` });

      const result = await sql`
        UPDATE orders SET status = ${status}, updated_at = NOW()
        WHERE id = ${id}
        RETURNING *
      `;
      if (result.length === 0) return res.status(404).json({ error: "Order not found" });
      return res.status(200).json(result[0]);
    }

    return res.status(405).json({ error: "Method not allowed" });
  } catch (error) {
    console.error("Admin orders API error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
