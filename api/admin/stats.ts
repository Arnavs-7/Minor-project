import type { VercelRequest, VercelResponse } from "@vercel/node";
import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL!);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();

  if (req.method !== "GET") return res.status(405).json({ error: "Method not allowed" });

  try {
    // Basic Admin protection
    const adminEmail = req.headers["x-admin-email"] as string;
    if (!adminEmail || adminEmail !== "gharewalnandini@gmail.com") {
      return res.status(403).json({ error: "Unauthorized access" });
    }

    // Total sales (only Delivered + Shipped orders)
    const salesResult = await sql`
      SELECT COALESCE(SUM(total), 0) as total_sales FROM orders
      WHERE status IN ('Delivered', 'Shipped')
    `;

    // Total orders
    const ordersResult = await sql`SELECT COUNT(*) as total_orders FROM orders`;

    // New customers (last 30 days)
    const customersResult = await sql`
      SELECT COUNT(*) as new_customers FROM customers
      WHERE created_at >= NOW() - INTERVAL '30 days' AND role = 'user'
    `;

    // Low stock alerts (stock < 5)
    const lowStockResult = await sql`
      SELECT COUNT(*) as low_stock FROM products WHERE stock < 5
    `;

    // 7-day sales trend
    const trendResult = await sql`
      SELECT
        DATE(created_at) as date,
        COALESCE(SUM(total), 0) as sales,
        COUNT(*) as order_count
      FROM orders
      WHERE created_at >= NOW() - INTERVAL '7 days'
        AND status != 'Cancelled'
      GROUP BY DATE(created_at)
      ORDER BY DATE(created_at) ASC
    `;

    // Fill in missing days with 0
    const trend = [];
    const today = new Date();
    for (let i = 6; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().split("T")[0];
      const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
      const existing = trendResult.find(
        (r: { date: string }) => r.date === dateStr
      );
      trend.push({
        day: dayNames[d.getDay()],
        date: dateStr,
        sales: existing ? parseFloat(String(existing.sales)) : 0,
        orders: existing ? parseInt(String(existing.order_count)) : 0,
      });
    }

    return res.status(200).json({
      totalSales: parseFloat(String(salesResult[0].total_sales)),
      totalOrders: parseInt(String(ordersResult[0].total_orders)),
      newCustomers: parseInt(String(customersResult[0].new_customers)),
      lowStockAlerts: parseInt(String(lowStockResult[0].low_stock)),
      salesTrend: trend,
    });
  } catch (error) {
    console.error("Admin stats API error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
