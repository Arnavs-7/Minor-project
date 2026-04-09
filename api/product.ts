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

  const id = req.query.id as string;
  if (!id) {
    return res.status(400).json({ error: "id query parameter is required" });
  }

  try {
    const products = await sql`
      SELECT 
        p.*, 
        COALESCE(AVG(r.rating), 0)::float as rating, 
        COUNT(r.id)::int as reviews_count
      FROM products p
      LEFT JOIN reviews r ON p.id::text = r.product_id
      WHERE p.id = ${id}
      GROUP BY p.id
    `;

    if (products.length === 0) {
      return res.status(404).json({ error: "Product not found" });
    }

    const p = products[0];
    const formattedProduct = {
      id: p.id.toString(),
      name: p.name,
      price: parseFloat(p.price),
      originalPrice: p.original_price ? parseFloat(p.original_price) : undefined,
      image: p.image_url,
      category: p.category,
      group: p.product_group,
      rating: Math.round(p.rating * 10) / 10 || 4.5,
      reviews: p.reviews_count || Math.floor(Math.random() * 50) + 10,
      badge: p.badge,
      description: p.description,
      material: p.material,
      stock: p.stock,
      sizes: ["One Size"], // Default for now
    };

    return res.status(200).json(formattedProduct);
  } catch (error) {
    console.error("Product API error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
