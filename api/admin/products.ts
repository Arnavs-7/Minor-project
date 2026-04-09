import type { VercelRequest, VercelResponse } from "@vercel/node";
import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL!);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();

  try {
    // Basic Admin protection
    const adminEmail = req.headers["x-admin-email"] as string;
    if (!adminEmail || adminEmail !== "gharewalnandini@gmail.com") {
      return res.status(403).json({ error: "Unauthorized access" });
    }

    // ── GET /api/admin/products?search=... ──
    if (req.method === "GET") {
      const search = (req.query.search as string) || "";
      let products;
      if (search) {
        products = await sql`
          SELECT * FROM products
          WHERE LOWER(name) LIKE ${"%" + search.toLowerCase() + "%"}
             OR LOWER(category) LIKE ${"%" + search.toLowerCase() + "%"}
          ORDER BY id DESC
        `;
      } else {
        products = await sql`SELECT * FROM products ORDER BY id DESC`;
      }
      return res.status(200).json(products);
    }

    // ── POST /api/admin/products ──
    if (req.method === "POST") {
      const { name, category, price, original_price, stock, image_url, badge, description, material, product_group } = req.body || {};
      if (!name || !category || price == null || stock == null) {
        return res.status(400).json({ error: "name, category, price, stock are required" });
      }
      const result = await sql`
        INSERT INTO products (name, category, price, original_price, stock, image_url, badge, description, material, product_group)
        VALUES (${name}, ${category}, ${price}, ${original_price || null}, ${stock}, ${image_url || ""}, ${badge || null}, ${description || ""}, ${material || ""}, ${product_group || "Other"})
        RETURNING *
      `;
      return res.status(201).json(result[0]);
    }

    // ── PUT /api/admin/products ──
    if (req.method === "PUT") {
      const { id, name, category, price, original_price, stock, image_url, badge, description, material, product_group } = req.body || {};
      if (!id) return res.status(400).json({ error: "id is required" });
      const result = await sql`
        UPDATE products SET
          name = ${name}, category = ${category}, price = ${price},
          original_price = ${original_price || null}, stock = ${stock},
          image_url = ${image_url || ""}, badge = ${badge || null},
          description = ${description || ""}, material = ${material || ""},
          product_group = ${product_group || "Other"}, updated_at = NOW()
        WHERE id = ${id}
        RETURNING *
      `;
      if (result.length === 0) return res.status(404).json({ error: "Product not found" });
      return res.status(200).json(result[0]);
    }

    // ── DELETE /api/admin/products?id=... ──
    if (req.method === "DELETE") {
      const id = req.query.id;
      if (!id) return res.status(400).json({ error: "id query param is required" });
      await sql`DELETE FROM products WHERE id = ${id}`;
      return res.status(200).json({ success: true });
    }

    return res.status(405).json({ error: "Method not allowed" });
  } catch (error) {
    console.error("Admin products API error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
