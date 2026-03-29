import type { VercelRequest, VercelResponse } from "@vercel/node";
import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL!);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  try {
    // ── GET /api/reviews?product_id=<id> ──
    if (req.method === "GET") {
      const productId = req.query.productId || req.query.product_id;
      
      if (!productId || typeof productId !== "string") {
        return res.status(400).json({ error: "productId/product_id query parameter is required" });
      }

      const reviews = await sql`
        SELECT id, product_id, user_name, rating, comment, created_at
        FROM reviews
        WHERE product_id = ${productId}
        ORDER BY created_at DESC
        LIMIT 50
      `;

      return res.status(200).json(reviews);
    }

    // ── POST /api/reviews ──
    if (req.method === "POST") {
      const body = req.body || {};
      const productId = body.productId || body.product_id;
      const { user_name, rating, comment } = body;

      // Validation
      if (!productId || typeof productId !== "string") {
        return res.status(400).json({ error: "productId/product_id is required" });
      }
      if (!user_name || typeof user_name !== "string" || user_name.trim().length === 0) {
        return res.status(400).json({ error: "user_name is required" });
      }
      if (!rating || typeof rating !== "number" || rating < 1 || rating > 5) {
        return res.status(400).json({ error: "rating must be a number between 1 and 5" });
      }
      if (!comment || typeof comment !== "string" || comment.trim().length === 0) {
        return res.status(400).json({ error: "comment is required" });
      }

      const sanitizedName = user_name.trim().slice(0, 100);
      const sanitizedComment = comment.trim().slice(0, 1000);

      const result = await sql`
        INSERT INTO reviews (product_id, user_name, rating, comment)
        VALUES (${productId}, ${sanitizedName}, ${rating}, ${sanitizedComment})
        RETURNING id, product_id, user_name, rating, comment, created_at
      `;

      return res.status(201).json(result[0]);
    }

    return res.status(405).json({ error: "Method not allowed" });
  } catch (error) {
    console.error("Reviews API error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
