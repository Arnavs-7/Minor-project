const { neon } = require("@neondatabase/serverless");
const { readFileSync } = require("fs");
const { resolve } = require("path");

// Read DATABASE_URL from .env.example file (as requested)
const envPath = resolve(__dirname, "..", ".env.example");
const envContent = readFileSync(envPath, "utf-8");
const match = envContent.match(/DATABASE_URL="([^"]+)"/);
if (!match) {
  console.error("DATABASE_URL not found in .env.example");
  process.exit(1);
}
const DATABASE_URL = match[1].replace(/&channel_binding=require/, "");

async function main() {
  const sql = neon(DATABASE_URL);

  // ── Products Table ──
  console.log("Creating products table...");
  await sql`
    CREATE TABLE IF NOT EXISTS products (
      id          SERIAL PRIMARY KEY,
      name        VARCHAR(200) NOT NULL,
      category    VARCHAR(100) NOT NULL,
      price       NUMERIC(10,2) NOT NULL,
      original_price NUMERIC(10,2),
      stock       INTEGER NOT NULL DEFAULT 0,
      image_url   TEXT NOT NULL DEFAULT '',
      badge       VARCHAR(50),
      description TEXT,
      material    VARCHAR(200),
      product_group VARCHAR(50) NOT NULL DEFAULT 'Other',
      created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `;

  // ── Customers Table ──
  console.log("Creating customers table...");
  await sql`
    CREATE TABLE IF NOT EXISTS customers (
      id          SERIAL PRIMARY KEY,
      name        VARCHAR(100) NOT NULL,
      phone       VARCHAR(20) NOT NULL UNIQUE,
      email       VARCHAR(200),
      role        VARCHAR(20) NOT NULL DEFAULT 'user',
      created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `;

  // ── Orders Table ──
  console.log("Creating orders table...");
  await sql`
    CREATE TABLE IF NOT EXISTS orders (
      id            SERIAL PRIMARY KEY,
      customer_name VARCHAR(100) NOT NULL,
      customer_phone VARCHAR(20),
      customer_email VARCHAR(200),
      items         JSONB NOT NULL DEFAULT '[]',
      total         NUMERIC(10,2) NOT NULL DEFAULT 0,
      status        VARCHAR(20) NOT NULL DEFAULT 'Pending',
      razorpay_order_id VARCHAR(100),
      created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `;

  // ── Indexes ──
  console.log("Creating indexes...");
  await sql`CREATE INDEX IF NOT EXISTS idx_products_category ON products(category)`;
  await sql`CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status)`;
  await sql`CREATE INDEX IF NOT EXISTS idx_orders_created ON orders(created_at)`;
  await sql`CREATE INDEX IF NOT EXISTS idx_customers_phone ON customers(phone)`;

  // ── OTPs Table ──
  console.log("Creating otps table...");
  await sql`
    CREATE TABLE IF NOT EXISTS otps (
      id          SERIAL PRIMARY KEY,
      email       VARCHAR(255) NOT NULL,
      otp         VARCHAR(6) NOT NULL,
      expires_at  TIMESTAMPTZ NOT NULL,
      created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `;
  await sql`CREATE INDEX IF NOT EXISTS idx_otps_email ON otps(email)`;

  // ── Seed Products (only if empty) ──
  const existingProducts = await sql`SELECT COUNT(*) as count FROM products`;
  if (parseInt(existingProducts[0].count) === 0) {
    console.log("Seeding products...");
    const products = [
      { name: "Red Bow Crochet Keychain", category: "Keychains", price: 299, original_price: 449, stock: 25, image_url: "bow-keychain", badge: "Best Seller", description: "A charming handmade crochet bow keychain in vibrant red.", material: "100% Cotton Yarn, Gold-tone Hardware", product_group: "Crochet" },
      { name: "Jellyfish Keychain Duo", category: "Keychains", price: 499, original_price: 699, stock: 18, image_url: "jellyfish-keychains", badge: "New", description: "Adorable pair of amigurumi jellyfish keychains.", material: "Cotton Yarn, Ball Chain Hardware", product_group: "Crochet" },
      { name: "Rose Crochet Keychain", category: "Keychains", price: 349, original_price: null, stock: 30, image_url: "bow-keychain", badge: "New", description: "A dainty crocheted rose keychain in soft pink.", material: "Cotton Yarn, Gold-tone Ring", product_group: "Crochet" },
      { name: "Pastel Tulip Set", category: "Crochet Flowers", price: 799, original_price: null, stock: 12, image_url: "pastel-tulips", badge: "Best Seller", description: "A beautiful set of 3 pastel crochet tulips.", material: "Soft Acrylic Yarn, Floral Wire Stems", product_group: "Crochet" },
      { name: "Crochet Tulip Trio", category: "Crochet Flowers", price: 649, original_price: null, stock: 8, image_url: "crochet-tulips", badge: "New", description: "Classic crochet tulips in red and pink shades.", material: "100% Cotton Yarn, Floral Wire", product_group: "Crochet" },
      { name: "Wrapped Crochet Gift Bouquet", category: "Flower Bouquet", price: 1499, original_price: null, stock: 5, image_url: "lily-bouquet-wrapped", badge: "New", description: "A beautifully wrapped gift bouquet.", material: "Cotton Yarn, Gift Wrap, Ribbon", product_group: "Crochet" },
      { name: "Lily of the Valley Car Hanging", category: "Car Hangings", price: 599, original_price: null, stock: 20, image_url: "lily-valley-hanging", badge: "Best Seller", description: "Delicate crocheted lily of the valley flowers.", material: "Cotton Yarn, Beaded Accent", product_group: "Crochet" },
      { name: "Sunflower Car Hanging", category: "Car Hangings", price: 549, original_price: null, stock: 15, image_url: "lily-valley-hanging", badge: "New", description: "A cheerful sunflower car hanging.", material: "Cotton Yarn, Beaded Accent", product_group: "Crochet" },
      { name: "Lily Flower Set (Mixed)", category: "Fuzzywire Flowers", price: 899, original_price: null, stock: 3, image_url: "lily-flowers", badge: "Best Seller", description: "A stunning mixed set of handcrafted fuzzywire lily flowers.", material: "Pipe Cleaner, Velvet Yarn", product_group: "Fuzzywire" },
      { name: "Fuzzywire Rose Set", category: "Fuzzywire Flowers", price: 749, original_price: null, stock: 22, image_url: "crochet-tulips", badge: null, description: "Beautiful handcrafted fuzzywire roses.", material: "Pipe Cleaner, Floral Tape", product_group: "Fuzzywire" },
      { name: "Pink Lily Bouquet", category: "Fuzzywire Bouquet", price: 1199, original_price: null, stock: 7, image_url: "pink-lily-bouquet", badge: "Best Seller", description: "A lush all-pink pipe cleaner lily bouquet.", material: "Pipe Cleaner, Velvet Yarn", product_group: "Fuzzywire" },
      { name: "Mini Lavender Pot", category: "Flower Pots", price: 699, original_price: null, stock: 2, image_url: "pastel-tulips", badge: "New", description: "A charming miniature pot with fuzzywire lavender.", material: "Pipe Cleaner, Ceramic Mini Pot", product_group: "Fuzzywire" },
      { name: "Sunflower Desk Pot", category: "Flower Pots", price: 849, original_price: null, stock: 14, image_url: "lily-flowers", badge: "Best Seller", description: "Bright fuzzywire sunflowers in a rustic pot.", material: "Pipe Cleaner, Terracotta Pot", product_group: "Fuzzywire" },
      { name: "Beaded Charm Bracelet", category: "Bracelets", price: 399, original_price: 549, stock: 35, image_url: "cat-bracelets", badge: "Best Seller", description: "Delicate handmade beaded bracelet with charm accents.", material: "Glass Beads, Gold-tone Clasp", product_group: "Other" },
      { name: "Friendship Thread Bracelet", category: "Bracelets", price: 249, original_price: null, stock: 40, image_url: "cat-bracelets", badge: null, description: "Colorful woven friendship bracelet.", material: "Embroidery Thread", product_group: "Other" },
      { name: "Flower Phone Charm", category: "Phone Charms", price: 299, original_price: null, stock: 28, image_url: "bow-keychain", badge: "New", description: "A cute crocheted flower charm for phones.", material: "Cotton Yarn, Lobster Clasp", product_group: "Other" },
      { name: "Beaded Phone Strap", category: "Phone Charms", price: 349, original_price: null, stock: 19, image_url: "jellyfish-keychains", badge: null, description: "A trendy beaded phone strap in pastel colors.", material: "Glass Beads, Nylon Cord", product_group: "Other" },
      { name: "Lippan Art Mirror Frame", category: "Lippan Art", price: 1299, original_price: null, stock: 4, image_url: "craftsmanship", badge: "Best Seller", description: "Stunning handcrafted Lippan art mirror frame.", material: "Clay, Mirror Pieces, MDF Board", product_group: "Other" },
      { name: "Lippan Art Wall Plate", category: "Lippan Art", price: 899, original_price: null, stock: 6, image_url: "hero-collection", badge: "New", description: "Decorative wall plate with traditional Lippan art.", material: "Clay, Mirror Pieces, Wooden Plate", product_group: "Other" },
    ];

    for (const p of products) {
      await sql`
        INSERT INTO products (name, category, price, original_price, stock, image_url, badge, description, material, product_group)
        VALUES (${p.name}, ${p.category}, ${p.price}, ${p.original_price}, ${p.stock}, ${p.image_url}, ${p.badge}, ${p.description}, ${p.material}, ${p.product_group})
      `;
    }
    console.log(`  Seeded ${products.length} products`);
  } else {
    console.log(`  Products table already has ${existingProducts[0].count} rows, skipping seed.`);
  }

  // ── Seed Customers (only if empty) ──
  const existingCustomers = await sql`SELECT COUNT(*) as count FROM customers`;
  if (parseInt(existingCustomers[0].count) === 0) {
    console.log("Seeding customers...");
    const customers = [
      { name: "Admin", phone: "9999999999", email: "gharewalnandini@gmail.com", role: "admin" },
      { name: "Priya Sharma", phone: "9876543210", email: "priya@example.com", role: "user" },
      { name: "Ananya Mehta", phone: "9876543211", email: "ananya@example.com", role: "user" },
      { name: "Riya Kapoor", phone: "9876543212", email: "riya@example.com", role: "user" },
      { name: "Sneha Patel", phone: "9876543213", email: "sneha@example.com", role: "user" },
      { name: "Kavya Singh", phone: "9876543214", email: "kavya@example.com", role: "user" },
      { name: "Ishita Reddy", phone: "9876543215", email: "ishita@example.com", role: "user" },
      { name: "Meera Das", phone: "9876543216", email: "meera@example.com", role: "user" },
    ];
    for (const c of customers) {
      await sql`
        INSERT INTO customers (name, phone, email, role)
        VALUES (${c.name}, ${c.phone}, ${c.email}, ${c.role})
      `;
    }
    console.log(`  Seeded ${customers.length} customers`);
  } else {
    console.log(`  Customers table already has ${existingCustomers[0].count} rows, skipping seed.`);
  }

  // ── Seed Orders (only if empty) ──
  const existingOrders = await sql`SELECT COUNT(*) as count FROM orders`;
  if (parseInt(existingOrders[0].count) === 0) {
    console.log("Seeding orders...");
    const statuses = ["Pending", "Shipped", "Delivered", "Cancelled"];
    const customerNames = ["Priya Sharma", "Ananya Mehta", "Riya Kapoor", "Sneha Patel", "Kavya Singh", "Ishita Reddy", "Meera Das"];
    const sampleItems = [
      [{ name: "Red Bow Crochet Keychain", qty: 2, price: 299 }],
      [{ name: "Pastel Tulip Set", qty: 1, price: 799 }, { name: "Beaded Charm Bracelet", qty: 1, price: 399 }],
      [{ name: "Pink Lily Bouquet", qty: 1, price: 1199 }],
      [{ name: "Lippan Art Mirror Frame", qty: 1, price: 1299 }],
      [{ name: "Flower Phone Charm", qty: 3, price: 299 }],
      [{ name: "Wrapped Crochet Gift Bouquet", qty: 1, price: 1499 }, { name: "Rose Crochet Keychain", qty: 2, price: 349 }],
      [{ name: "Lily Flower Set (Mixed)", qty: 1, price: 899 }],
      [{ name: "Sunflower Desk Pot", qty: 2, price: 849 }],
      [{ name: "Beaded Phone Strap", qty: 1, price: 349 }, { name: "Friendship Thread Bracelet", qty: 2, price: 249 }],
      [{ name: "Jellyfish Keychain Duo", qty: 1, price: 499 }],
      [{ name: "Mini Lavender Pot", qty: 1, price: 699 }],
      [{ name: "Crochet Tulip Trio", qty: 2, price: 649 }],
    ];

    for (let i = 0; i < 12; i++) {
      const items = sampleItems[i];
      const total = items.reduce((sum, item) => sum + item.price * item.qty, 0);
      const status = statuses[i % statuses.length];
      const customerName = customerNames[i % customerNames.length];
      // Spread orders over the last 7 days
      const daysAgo = Math.floor(i * 7 / 12);
      const date = new Date();
      date.setDate(date.getDate() - daysAgo);
      
      await sql`
        INSERT INTO orders (customer_name, customer_phone, customer_email, items, total, status, created_at)
        VALUES (${customerName}, ${"98765432" + (10 + (i % 7))}, ${"user" + i + "@example.com"}, ${JSON.stringify(items)}, ${total}, ${status}, ${date.toISOString()})
      `;
    }
    console.log("  Seeded 12 orders");
  } else {
    console.log(`  Orders table already has ${existingOrders[0].count} rows, skipping seed.`);
  }

  // ── Verify ──
  console.log("\n── Verification ──");
  const pCount = await sql`SELECT COUNT(*) as count FROM products`;
  const cCount = await sql`SELECT COUNT(*) as count FROM customers`;
  const oCount = await sql`SELECT COUNT(*) as count FROM orders`;
  console.log(`Products: ${pCount[0].count}`);
  console.log(`Customers: ${cCount[0].count}`);
  console.log(`Orders: ${oCount[0].count}`);
  console.log("\n✅ Admin database setup complete!");
}

main().catch((err) => {
  console.error("Error:", err.message || err);
  process.exit(1);
});
