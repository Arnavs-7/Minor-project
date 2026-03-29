import { neon } from '@neondatabase/serverless';

export default async function handler(req: any, res: any) {
  const sql = neon(process.env.DATABASE_URL!);

  // Handle GET requests (Fetching reviews for a product)
  if (req.method === 'GET') {
    const { productId } = req.query;
    if (!productId) {
      return res.status(400).json({ error: 'Product ID is required' });
    }

    try {
      const result = await sql`
        SELECT * FROM reviews 
        WHERE product_id = ${productId} 
        ORDER BY created_at DESC
      `;
      return res.status(200).json(result);
    } catch (error) {
      console.error('Error fetching reviews:', error);
      return res.status(500).json({ error: 'Failed to fetch reviews' });
    }
  }

  // Handle POST requests (Submitting a new review)
  if (req.method === 'POST') {
    const { productId, userName, rating, comment } = req.body;

    if (!productId || !userName || !rating) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
      const result = await sql`
        INSERT INTO reviews (product_id, user_name, rating, comment)
        VALUES (${productId}, ${userName}, ${rating}, ${comment})
        RETURNING *
      `;
      return res.status(201).json(result[0]);
    } catch (error) {
      console.error('Error creating review:', error);
      return res.status(500).json({ error: 'Failed to submit review' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
