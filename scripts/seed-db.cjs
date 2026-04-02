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

const products = [
  {
    name: "Red Bow Crochet Keychain",
    price: 299,
    original_price: 449,
    image_url: "bow-keychain",
    category: "Keychains",
    product_group: "Crochet",
    badge: "Best Seller",
    description: "A charming handmade crochet bow keychain in vibrant red. Perfect as a gift or personal accessory.",
    material: "100% Cotton Yarn, Gold-tone Hardware",
    stock: 50
  },
  {
    name: "Jellyfish Keychain Duo",
    price: 499,
    original_price: 699,
    image_url: "jellyfish-keychains",
    category: "Keychains",
    product_group: "Crochet",
    badge: "New",
    description: "Adorable pair of amigurumi jellyfish keychains in baby blue and soft pink. Cute and collectible.",
    material: "Cotton Yarn, Ball Chain Hardware",
    stock: 30
  },
  {
    name: "Rose Crochet Keychain",
    price: 349,
    image_url: "bow-keychain",
    category: "Keychains",
    product_group: "Crochet",
    badge: "New",
    description: "A dainty crocheted rose keychain in soft pink.",
    material: "Cotton Yarn, Gold-tone Ring",
    stock: 40
  },
  {
    name: "Pastel Tulip Set",
    price: 799,
    image_url: "pastel-tulips",
    category: "Crochet Flowers",
    product_group: "Crochet",
    badge: "Best Seller",
    description: "A beautiful set of 3 pastel crochet tulips in yellow, pink, and blue. Everlasting flowers that never wilt.",
    material: "Soft Acrylic Yarn, Floral Wire Stems",
    stock: 20
  },
  {
    name: "Crochet Tulip Trio",
    price: 649,
    image_url: "crochet-tulips",
    category: "Crochet Flowers",
    product_group: "Crochet",
    badge: "New",
    description: "Classic crochet tulips in red and pink shades with realistic green leaves and stems.",
    material: "100% Cotton Yarn, Floral Wire",
    stock: 25
  },
  {
    name: "Wrapped Crochet Gift Bouquet",
    price: 1499,
    image_url: "lily-bouquet-wrapped",
    category: "Flower Bouquet",
    product_group: "Crochet",
    badge: "New",
    description: "A beautifully wrapped gift bouquet featuring handcrafted crochet flowers with pink tissue paper and ribbon.",
    material: "Cotton Yarn, Gift Wrap, Ribbon",
    stock: 15
  },
  {
    name: "Lily of the Valley Car Hanging",
    price: 599,
    image_url: "lily-valley-hanging",
    category: "Car Hangings",
    product_group: "Crochet",
    badge: "Best Seller",
    description: "Delicate crocheted lily of the valley flowers on a braided hanging cord. A beautiful car mirror accessory.",
    material: "Cotton Yarn, Beaded Accent",
    stock: 35
  },
  {
    name: "Sunflower Car Hanging",
    price: 549,
    image_url: "lily-valley-hanging",
    category: "Car Hangings",
    product_group: "Crochet",
    badge: "New",
    description: "A cheerful sunflower car hanging with braided cord.",
    material: "Cotton Yarn, Beaded Accent",
    stock: 25
  },
  {
    name: "Lily Flower Set (Mixed)",
    price: 899,
    image_url: "lily-flowers",
    category: "Fuzzywire Flowers",
    product_group: "Fuzzywire",
    badge: "Best Seller",
    description: "A stunning mixed set of handcrafted fuzzywire lily flowers in pink and lavender.",
    material: "Pipe Cleaner, Velvet Yarn",
    stock: 10
  },
  {
    name: "Fuzzywire Rose Set",
    price: 749,
    image_url: "crochet-tulips",
    category: "Fuzzywire Flowers",
    product_group: "Fuzzywire",
    badge: null,
    description: "Beautiful handcrafted fuzzywire roses in soft pink and cream tones.",
    material: "Pipe Cleaner, Floral Tape",
    stock: 15
  },
  {
    name: "Pink Lily Bouquet",
    price: 1199,
    image_url: "pink-lily-bouquet",
    category: "Fuzzywire Bouquet",
    product_group: "Fuzzywire",
    badge: "Best Seller",
    description: "A lush all-pink pipe cleaner lily bouquet. Gorgeous home décor that lasts forever.",
    material: "Pipe Cleaner, Velvet Yarn",
    stock: 8
  },
  {
    name: "Mini Lavender Pot",
    price: 699,
    image_url: "pastel-tulips",
    category: "Flower Pots",
    product_group: "Fuzzywire",
    badge: "New",
    description: "A charming miniature pot filled with fuzzywire lavender stems. Perfect desk décor.",
    material: "Pipe Cleaner, Ceramic Mini Pot",
    stock: 12
  },
  {
    name: "Sunflower Desk Pot",
    price: 849,
    image_url: "lily-flowers",
    category: "Flower Pots",
    product_group: "Fuzzywire",
    badge: "Best Seller",
    description: "Bright and cheerful fuzzywire sunflowers in a rustic terracotta pot.",
    material: "Pipe Cleaner, Terracotta Pot",
    stock: 10
  },
  {
    name: "Beaded Charm Bracelet",
    price: 399,
    original_price: 549,
    image_url: "cat-bracelets",
    category: "Bracelets",
    product_group: "Other",
    badge: "Best Seller",
    description: "A delicate handmade beaded bracelet with charm accents. Adjustable for all wrist sizes.",
    material: "Glass Beads, Gold-tone Clasp",
    stock: 100
  },
  {
    name: "Friendship Thread Bracelet",
    price: 249,
    image_url: "cat-bracelets",
    category: "Bracelets",
    product_group: "Other",
    badge: null,
    description: "Colorful woven friendship bracelet — perfect for gifting or stacking.",
    material: "Embroidery Thread",
    stock: 150
  },
  {
    name: "Flower Phone Charm",
    price: 299,
    image_url: "bow-keychain",
    category: "Phone Charms",
    product_group: "Other",
    badge: "New",
    description: "A cute crocheted flower charm that clips onto your phone case. Available in assorted colors.",
    material: "Cotton Yarn, Lobster Clasp",
    stock: 60
  },
  {
    name: "Beaded Phone Strap",
    price: 349,
    image_url: "jellyfish-keychains",
    category: "Phone Charms",
    product_group: "Other",
    badge: null,
    description: "A trendy beaded phone strap in pastel colors. Keeps your phone secure and stylish.",
    material: "Glass Beads, Nylon Cord",
    stock: 45
  },
  {
    name: "Lippan Art Mirror Frame",
    price: 1299,
    image_url: "craftsmanship",
    category: "Lippan Art",
    product_group: "Other",
    badge: "Best Seller",
    description: "A stunning handcrafted Lippan art mirror frame with intricate mud-and-mirror work. Traditional Kutchi art meets modern décor.",
    material: "Clay, Mirror Pieces, MDF Board",
    stock: 5
  },
  {
    name: "Lippan Art Wall Plate",
    price: 899,
    image_url: "hero-collection",
    category: "Lippan Art",
    product_group: "Other",
    badge: "New",
    description: "A decorative wall plate featuring traditional Lippan art patterns. Each piece is unique and handcrafted.",
    material: "Clay, Mirror Pieces, Wooden Plate",
    stock: 10
  }
];

async function seed() {
  const sql = neon(DATABASE_URL);
  console.log("Seeding database with products...");

  try {
    for (const p of products) {
      await sql`
        INSERT INTO products (
          name, category, price, original_price, stock, image_url, badge, description, material, product_group
        ) VALUES (
          ${p.name}, ${p.category}, ${p.price}, ${p.original_price || null}, ${p.stock}, ${p.image_url}, ${p.badge || null}, ${p.description || ""}, ${p.material || ""}, ${p.product_group}
        )
      `;
      console.log(`Inserted: ${p.name}`);
    }
    console.log("\nDatabase seeded successfully!");
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
}

seed();
