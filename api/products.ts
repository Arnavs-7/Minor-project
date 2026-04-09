import type { VercelRequest, VercelResponse } from "@vercel/node";
import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL!);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const category = req.query.category as string;
    const limit = parseInt(req.query.limit as string) || 50;
    const isBestSeller = req.query.best_seller === "true";

    let query = `
      SELECT 
        p.*, 
        COALESCE(AVG(r.rating), 0)::float as rating, 
        COUNT(r.id)::int as reviews_count
      FROM products p
      LEFT JOIN reviews r ON p.id::text = r.product_id
    `;

    const params: any[] = [];
    const conditions: string[] = [];

    if (category) {
      conditions.push(`p.category = $${params.length + 1}`);
      params.push(category);
    }

    if (isBestSeller) {
      conditions.push(`p.badge = 'Best Seller'`);
    }

    if (conditions.length > 0) {
      query += ` WHERE ` + conditions.join(" AND ");
    }

    query += ` GROUP BY p.id ORDER BY p.created_at DESC LIMIT $${params.length + 1}`;
    params.push(limit);

    const products = await sql(query, params);

    // Map DB fields to Frontend fields if necessary
    const formattedProducts = products.map((p: any) => ({
      id: p.id.toString(),
      name: p.name,
      price: parseFloat(p.price),
      originalPrice: p.original_price ? parseFloat(p.original_price) : undefined,
      image: p.image_url,
      category: p.category,
      group: p.product_group,
      rating: Math.round(p.rating * 10) / 10 || 4.5, // Fallback if no reviews
      reviews: p.reviews_count || Math.floor(Math.random() * 50) + 10, // Fallback if no reviews
      badge: p.badge,
      description: p.description,
      material: p.material,
      stock: p.stock,
    }));

    return res.status(200).json(formattedProducts);
  } catch (error) {
    console.error("Products API error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
