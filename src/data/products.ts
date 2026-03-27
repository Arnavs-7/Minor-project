export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  subcategory: string;
  rating: number;
  reviews: number;
  badge?: string;
  description?: string;
  material?: string;
  sizes?: string[];
}

/* ── Category definitions ────────────────────────────── */
export interface CategoryDef {
  id: string;
  title: string;
  subtitle: string;
}

export const categoryDefs: CategoryDef[] = [
  { id: "crochet", title: "Crochet Products", subtitle: "Handmade with yarn & love" },
  { id: "fuzzywire", title: "Fuzzywire Products", subtitle: "Crafted with pipe cleaners" },
  { id: "bracelets", title: "Bracelets", subtitle: "Handwoven & beaded" },
  { id: "phone-charms", title: "Phone Charms", subtitle: "Cute accessories for your phone" },
  { id: "lippan-art", title: "Lippan Art", subtitle: "Traditional mirror-work art" },
];

/* ── All products ────────────────────────────────────── */
export const products: Product[] = [
  /* ─── CROCHET › Keychains ─────── */
  {
    id: "c1",
    name: "Red Bow Crochet Keychain",
    price: 299,
    originalPrice: 449,
    image: "bow-keychain",
    category: "crochet",
    subcategory: "Keychains",
    rating: 4.8,
    reviews: 124,
    badge: "Best Seller",
    description: "A charming handmade crochet bow keychain in vibrant red. Perfect as a gift or personal accessory.",
    material: "100% Cotton Yarn, Gold-tone Hardware",
    sizes: ["One Size"],
  },
  {
    id: "c2",
    name: "Jellyfish Keychain Duo",
    price: 499,
    originalPrice: 699,
    image: "jellyfish-keychains",
    category: "crochet",
    subcategory: "Keychains",
    rating: 4.6,
    reviews: 45,
    badge: "New",
    description: "Adorable pair of amigurumi jellyfish keychains in baby blue and soft pink.",
    material: "Cotton Yarn, Ball Chain Hardware",
    sizes: ["Pair", "Single"],
  },
  {
    id: "c3",
    name: "Rose Crochet Keychain",
    price: 349,
    image: "bow-keychain",
    category: "crochet",
    subcategory: "Keychains",
    rating: 4.8,
    reviews: 38,
    description: "A dainty crocheted rose keychain in soft pink.",
    material: "Cotton Yarn, Gold-tone Ring",
    sizes: ["One Size"],
  },

  /* ─── CROCHET › Flowers ─────── */
  {
    id: "c4",
    name: "Pastel Tulip Set",
    price: 799,
    image: "pastel-tulips",
    category: "crochet",
    subcategory: "Flowers",
    rating: 4.9,
    reviews: 89,
    badge: "Best Seller",
    description: "A beautiful set of 3 pastel crochet tulips in yellow, pink, and blue.",
    material: "Soft Acrylic Yarn, Floral Wire Stems",
    sizes: ["3-Stem Set", "6-Stem Set"],
  },
  {
    id: "c5",
    name: "Crochet Tulip Trio",
    price: 649,
    image: "crochet-tulips",
    category: "crochet",
    subcategory: "Flowers",
    rating: 4.5,
    reviews: 34,
    badge: "New",
    description: "Classic crochet tulips in red and pink shades with realistic green leaves and stems.",
    material: "100% Cotton Yarn, Floral Wire",
    sizes: ["3-Stem Set"],
  },

  /* ─── CROCHET › Flower Bouquet ─────── */
  {
    id: "c6",
    name: "Pink Lily Bouquet",
    price: 1199,
    image: "pink-lily-bouquet",
    category: "crochet",
    subcategory: "Flower Bouquet",
    rating: 4.9,
    reviews: 201,
    badge: "Best Seller",
    description: "A lush all-pink crochet lily bouquet. Gorgeous home décor that lasts forever.",
    material: "Cotton Yarn, Floral Wire",
    sizes: ["5-Stem", "10-Stem"],
  },
  {
    id: "c7",
    name: "Wrapped Lily Gift Bouquet",
    price: 1499,
    image: "lily-bouquet-wrapped",
    category: "crochet",
    subcategory: "Flower Bouquet",
    rating: 4.7,
    reviews: 78,
    badge: "New",
    description: "A beautifully wrapped gift bouquet featuring handcrafted lilies with pink tissue paper and ribbon.",
    material: "Cotton Yarn, Gift Wrap, Ribbon",
    sizes: ["Standard", "Deluxe"],
  },

  /* ─── CROCHET › Car Hangings ─────── */
  {
    id: "c8",
    name: "Lily of the Valley Car Hanging",
    price: 599,
    image: "lily-valley-hanging",
    category: "crochet",
    subcategory: "Car Hangings",
    rating: 4.7,
    reviews: 67,
    description: "Delicate crocheted lily of the valley flowers on a braided hanging cord.",
    material: "Cotton Yarn, Beaded Accent",
    sizes: ["One Size"],
  },
  {
    id: "c9",
    name: "Sunflower Car Hanging",
    price: 549,
    image: "lily-valley-hanging",
    category: "crochet",
    subcategory: "Car Hangings",
    rating: 4.6,
    reviews: 22,
    badge: "New",
    description: "A cheerful sunflower car hanging with braided cord.",
    material: "Cotton Yarn, Beaded Accent",
    sizes: ["One Size"],
  },

  /* ─── FUZZYWIRE › Flowers ─────── */
  {
    id: "f1",
    name: "Fuzzywire Rose Bundle",
    price: 699,
    image: "lily-flowers",
    category: "fuzzywire",
    subcategory: "Flowers",
    rating: 4.8,
    reviews: 56,
    badge: "Best Seller",
    description: "Stunning pipe cleaner roses in pink and lavender. Everlasting blooms.",
    material: "Pipe Cleaner, Velvet Yarn",
    sizes: ["3-Stem Set", "5-Stem Set"],
  },
  {
    id: "f2",
    name: "Fuzzywire Daisy Set",
    price: 599,
    image: "pastel-tulips",
    category: "fuzzywire",
    subcategory: "Flowers",
    rating: 4.7,
    reviews: 31,
    description: "Cheerful daisies crafted from fuzzywire in white and yellow.",
    material: "Pipe Cleaner, Floral Tape",
    sizes: ["3-Stem Set"],
  },

  /* ─── FUZZYWIRE › Flower Bouquet ─────── */
  {
    id: "f3",
    name: "Fuzzywire Lily Bouquet",
    price: 1099,
    image: "pink-lily-bouquet",
    category: "fuzzywire",
    subcategory: "Flower Bouquet",
    rating: 4.9,
    reviews: 92,
    badge: "Best Seller",
    description: "A gorgeous mixed fuzzywire lily bouquet in pastel shades.",
    material: "Pipe Cleaner, Velvet Yarn",
    sizes: ["5-Stem", "10-Stem"],
  },
  {
    id: "f4",
    name: "Fuzzywire Gift Bouquet",
    price: 1399,
    image: "lily-bouquet-wrapped",
    category: "fuzzywire",
    subcategory: "Flower Bouquet",
    rating: 4.8,
    reviews: 44,
    badge: "New",
    description: "Beautifully wrapped fuzzywire bouquet perfect for gifting.",
    material: "Pipe Cleaner, Gift Wrap, Ribbon",
    sizes: ["Standard", "Deluxe"],
  },

  /* ─── FUZZYWIRE › Flower Pots ─────── */
  {
    id: "f5",
    name: "Mini Fuzzywire Flower Pot",
    price: 799,
    image: "crochet-tulips",
    category: "fuzzywire",
    subcategory: "Flower Pots",
    rating: 4.6,
    reviews: 28,
    description: "A charming miniature flower pot with assorted fuzzywire flowers.",
    material: "Pipe Cleaner, Mini Ceramic Pot",
    sizes: ["Small", "Medium"],
  },
  {
    id: "f6",
    name: "Lavender Fuzzywire Pot",
    price: 899,
    image: "lily-flowers",
    category: "fuzzywire",
    subcategory: "Flower Pots",
    rating: 4.7,
    reviews: 19,
    badge: "New",
    description: "Delicate lavender stalks in a rustic pot, crafted from pipe cleaners.",
    material: "Pipe Cleaner, Terracotta Pot",
    sizes: ["One Size"],
  },

  /* ─── BRACELETS ─────── */
  {
    id: "b1",
    name: "Pastel Bead Bracelet",
    price: 299,
    image: "cat-bracelets",
    category: "bracelets",
    subcategory: "Bracelets",
    rating: 4.7,
    reviews: 63,
    badge: "Best Seller",
    description: "Handwoven bracelet with pastel-colored beads. Adjustable size.",
    material: "Glass Beads, Waxed Cord",
    sizes: ["Adjustable"],
  },
  {
    id: "b2",
    name: "Friendship Bracelet Set",
    price: 399,
    originalPrice: 549,
    image: "cat-bracelets",
    category: "bracelets",
    subcategory: "Bracelets",
    rating: 4.8,
    reviews: 47,
    description: "Set of 3 colorful friendship bracelets — perfect for sharing.",
    material: "Embroidery Thread, Charm Beads",
    sizes: ["Set of 3"],
  },
  {
    id: "b3",
    name: "Crystal Thread Bracelet",
    price: 449,
    image: "cat-rings",
    category: "bracelets",
    subcategory: "Bracelets",
    rating: 4.9,
    reviews: 35,
    badge: "New",
    description: "Elegant bracelet with tiny crystal beads woven on gold thread.",
    material: "Crystal Beads, Gold Thread",
    sizes: ["Adjustable"],
  },

  /* ─── PHONE CHARMS ─────── */
  {
    id: "p1",
    name: "Crochet Bear Phone Charm",
    price: 349,
    image: "jellyfish-keychains",
    category: "phone-charms",
    subcategory: "Phone Charms",
    rating: 4.8,
    reviews: 52,
    badge: "Best Seller",
    description: "An adorable mini crochet bear charm with a phone strap loop.",
    material: "Cotton Yarn, Phone Strap",
    sizes: ["One Size"],
  },
  {
    id: "p2",
    name: "Beaded Daisy Phone Charm",
    price: 279,
    image: "cat-earrings",
    category: "phone-charms",
    subcategory: "Phone Charms",
    rating: 4.6,
    reviews: 29,
    description: "A sweet beaded daisy charm on a braided cord phone strap.",
    material: "Glass Beads, Nylon Cord",
    sizes: ["One Size"],
  },
  {
    id: "p3",
    name: "Star & Moon Phone Charm",
    price: 329,
    image: "cat-necklaces",
    category: "phone-charms",
    subcategory: "Phone Charms",
    rating: 4.7,
    reviews: 18,
    badge: "New",
    description: "Celestial-themed phone charm with tiny star and moon beads.",
    material: "Metal Charms, Beaded Strap",
    sizes: ["One Size"],
  },

  /* ─── LIPPAN ART ─────── */
  {
    id: "l1",
    name: "Traditional Lippan Art Frame",
    price: 999,
    image: "craftsmanship",
    category: "lippan-art",
    subcategory: "Lippan Art",
    rating: 4.9,
    reviews: 72,
    badge: "Best Seller",
    description: "Authentic Kutchi lippan art with mirror work on a wooden frame.",
    material: "Clay, Mirrors, Wooden Frame",
    sizes: ["8x8 inch", "12x12 inch"],
  },
  {
    id: "l2",
    name: "Modern Lippan Art Panel",
    price: 1299,
    image: "hero-collection",
    category: "lippan-art",
    subcategory: "Lippan Art",
    rating: 4.8,
    reviews: 41,
    badge: "New",
    description: "Contemporary twist on lippan art with geometric patterns and colored mirrors.",
    material: "Clay, Colored Mirrors, MDF Board",
    sizes: ["10x10 inch", "14x14 inch"],
  },
  {
    id: "l3",
    name: "Mini Lippan Art Coasters",
    price: 599,
    image: "craftsmanship",
    category: "lippan-art",
    subcategory: "Lippan Art",
    rating: 4.7,
    reviews: 33,
    description: "Set of 4 lippan art coasters with intricate mirror-work designs.",
    material: "Clay, Mirrors, Cork Base",
    sizes: ["Set of 4"],
  },
];

export const allProducts = products;

export const bestSellers = products.filter((p) => p.badge === "Best Seller");

export const newArrivals = products.filter((p) => p.badge === "New");

export const reviews = [
  {
    id: 1,
    name: "Priya S.",
    rating: 5,
    text: "Absolutely adorable! The crochet flowers look even more beautiful in person. Will definitely be ordering more pieces.",
    date: "2 weeks ago",
  },
  {
    id: 2,
    name: "Ananya M.",
    rating: 5,
    text: "The keychain quality is amazing — so cute and sturdy! Perfect gift for friends. The craftsmanship is lovely.",
    date: "1 month ago",
  },
  {
    id: 3,
    name: "Riya K.",
    rating: 4,
    text: "Beautiful packaging and fast delivery. The lippan art coasters are stunning — great for gifting!",
    date: "3 weeks ago",
  },
];
