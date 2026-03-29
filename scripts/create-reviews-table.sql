-- Create reviews table for Neon Postgres
CREATE TABLE IF NOT EXISTS reviews (
  id          SERIAL PRIMARY KEY,
  product_id  TEXT NOT NULL,
  user_name   VARCHAR(100) NOT NULL,
  rating      INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment     TEXT NOT NULL,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Index for fast lookups by product
CREATE INDEX IF NOT EXISTS idx_reviews_product_id ON reviews(product_id);
