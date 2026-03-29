const { neon } = require("@neondatabase/serverless");

// Remove channel_binding parameter which isn't supported by the serverless driver
const DATABASE_URL = "postgresql://neondb_owner:npg_gvU0PODYar9G@ep-steep-haze-an9gwyvg-pooler.c-6.us-east-1.aws.neon.tech/neondb?sslmode=require";

async function main() {
  const sql = neon(DATABASE_URL);

  console.log("Creating reviews table...");
  await sql`
    CREATE TABLE IF NOT EXISTS reviews (
      id          SERIAL PRIMARY KEY,
      product_id  TEXT NOT NULL,
      user_name   VARCHAR(100) NOT NULL,
      rating      INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
      comment     TEXT NOT NULL,
      created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `;

  console.log("Creating index...");
  await sql`CREATE INDEX IF NOT EXISTS idx_reviews_product_id ON reviews(product_id)`;

  console.log("Verifying table...");
  const result = await sql`SELECT column_name, data_type FROM information_schema.columns WHERE table_name = 'reviews' ORDER BY ordinal_position`;
  console.log("Table columns:", JSON.stringify(result, null, 2));

  console.log("\nReviews table created successfully!");
}

main().catch((err) => {
  console.error("Error:", err.message || err);
  process.exit(1);
});
