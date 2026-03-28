import { neon } from '@neondatabase/serverless';

// Utilizing the live Neon connection string provided.
const LIVE_URL = "postgresql://neondb_owner:npg_gvU0PODYar9G@ep-steep-haze-an9gwyvg-pooler.c-6.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require";

export const sql = neon(process.env.NEON_DATABASE_URL || LIVE_URL);

export default async function handler(req, res) {
  if (req.method !== 'POST' && req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    // Execute table creation for Users & Orders
    // TODO: Consider migrating to Drizzle or Prisma in the future for better schema management
    
    await sql`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        name VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;

    await sql`
      CREATE TABLE IF NOT EXISTS orders (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id),
        razorpay_order_id VARCHAR(255) UNIQUE NOT NULL,
        amount DECIMAL(10, 2) NOT NULL,
        status VARCHAR(50) DEFAULT 'created',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;

    return res.status(200).json({ success: true, message: 'Database tables initialized successfully on Neon Postgres' });
  } catch (error) {
    console.error("Database initialization error:", error);
    return res.status(500).json({ success: false, error: error.message });
  }
}
