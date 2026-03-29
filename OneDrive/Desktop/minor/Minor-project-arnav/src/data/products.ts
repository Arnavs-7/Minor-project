export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  group: "Crochet" | "Fuzzywire" | "Other";
  rating: number;
  reviews: number;
  badge?: string;
  description?: string;
  material?: string;
  sizes?: string[];
}

export const products: Product[] = [
  // ── Crochet › Keychains ──
  {
    id: "1",
    name: "Red Bow Crochet Keychain",
    price: 299,
    originalPrice: 449,
    image: "bow-keychain",
    category: "Keychains",
    group: "Crochet",
    rating: 4.8,
    reviews: 124,
    badge: "Best Seller",
    description: "A charming handmade crochet bow keychain in vibrant red. Perfect as a gift or personal accessory.",
    material: "100% Cotton Yarn, Gold-tone Hardware",
    sizes: ["One Size"],
  },
  {
    id: "4",
    name: "Jellyfish Keychain Duo",
    price: 499,
    originalPrice: 699,
    image: "jellyfish-keychains",
    category: "Keychains",
    group: "Crochet",
    rating: 4.6,
    reviews: 45,
    badge: "New",
    description: "Adorable pair of amigurumi jellyfish keychains in baby blue and soft pink. Cute and collectible.",
    material: "Cotton Yarn, Ball Chain Hardware",
    sizes: ["Pair", "Single"],
  },
  {
    id: "10",
    name: "Rose Crochet Keychain",
    price: 349,
    image: "bow-keychain",
    category: "Keychains",
    group: "Crochet",
    rating: 4.8,
    reviews: 8,
    badge: "New",
    description: "A dainty crocheted rose keychain in soft pink.",
    material: "Cotton Yarn, Gold-tone Ring",
    sizes: ["One Size"],
  },

  // ── Crochet › Flowers ──
  {
    id: "2",
    name: "Pastel Tulip Set",
    price: 799,
    image: "pastel-tulips",
    category: "Crochet Flowers",
    group: "Crochet",
    rating: 4.9,
    reviews: 89,
    badge: "Best Seller",
    description: "A beautiful set of 3 pastel crochet tulips in yellow, pink, and blue. Everlasting flowers that never wilt.",
    material: "Soft Acrylic Yarn, Floral Wire Stems",
    sizes: ["3-Stem Set", "6-Stem Set"],
  },
  {
    id: "6",
    name: "Crochet Tulip Trio",
    price: 649,
    image: "crochet-tulips",
    category: "Crochet Flowers",
    group: "Crochet",
    rating: 4.5,
    reviews: 34,
    badge: "New",
    description: "Classic crochet tulips in red and pink shades with realistic green leaves and stems.",
    material: "100% Cotton Yarn, Floral Wire",
    sizes: ["3-Stem Set"],
  },

  // ── Crochet › Flower Bouquet ──
  {
    id: "8",
    name: "Wrapped Crochet Gift Bouquet",
    price: 1499,
    image: "lily-bouquet-wrapped",
    category: "Flower Bouquet",
    group: "Crochet",
    rating: 4.7,
    reviews: 78,
    badge: "New",
    description: "A beautifully wrapped gift bouquet featuring handcrafted crochet flowers with pink tissue paper and ribbon.",
    material: "Cotton Yarn, Gift Wrap, Ribbon",
    sizes: ["Standard", "Deluxe"],
  },

  // ── Crochet › Car Hangings ──
  {
    id: "3",
    name: "Lily of the Valley Car Hanging",
    price: 599,
    image: "lily-valley-hanging",
    category: "Car Hangings",
    group: "Crochet",
    rating: 4.7,
    reviews: 67,
    badge: "Best Seller",
    description: "Delicate crocheted lily of the valley flowers on a braided hanging cord. A beautiful car mirror accessory.",
    material: "Cotton Yarn, Beaded Accent",
    sizes: ["One Size"],
  },
  {
    id: "9",
    name: "Sunflower Car Hanging",
    price: 549,
    image: "lily-valley-hanging",
    category: "Car Hangings",
    group: "Crochet",
    rating: 4.6,
    reviews: 12,
    badge: "New",
    description: "A cheerful sunflower car hanging with braided cord.",
    material: "Cotton Yarn, Beaded Accent",
    sizes: ["One Size"],
  },

  // ── Fuzzywire › Flowers ──
  {
    id: "5",
    name: "Lily Flower Set (Mixed)",
    price: 899,
    image: "lily-flowers",
    category: "Fuzzywire Flowers",
    group: "Fuzzywire",
    rating: 4.8,
    reviews: 156,
    badge: "Best Seller",
    description: "A stunning mixed set of handcrafted fuzzywire lily flowers in pink and lavender.",
    material: "Pipe Cleaner, Velvet Yarn",
    sizes: ["3-Stem Set", "5-Stem Set"],
  },
  {
    id: "15",
    name: "Fuzzywire Rose Set",
    price: 749,
    image: "crochet-tulips",
    category: "Fuzzywire Flowers",
    group: "Fuzzywire",
    rating: 4.7,
    reviews: 42,
    description: "Beautiful handcrafted fuzzywire roses in soft pink and cream tones.",
    material: "Pipe Cleaner, Floral Tape",
    sizes: ["3-Stem Set"],
  },

  // ── Fuzzywire › Flower Bouquet ──
  {
    id: "7",
    name: "Pink Lily Bouquet",
    price: 1199,
    image: "pink-lily-bouquet",
    category: "Fuzzywire Bouquet",
    group: "Fuzzywire",
    rating: 4.9,
    reviews: 201,
    badge: "Best Seller",
    description: "A lush all-pink pipe cleaner lily bouquet. Gorgeous home décor that lasts forever.",
    material: "Pipe Cleaner, Velvet Yarn",
    sizes: ["5-Stem", "10-Stem"],
  },

  // ── Fuzzywire › Flower Pots ──
  {
    id: "16",
    name: "Mini Lavender Pot",
    price: 699,
    image: "pastel-tulips",
    category: "Flower Pots",
    group: "Fuzzywire",
    rating: 4.6,
    reviews: 28,
    badge: "New",
    description: "A charming miniature pot filled with fuzzywire lavender stems. Perfect desk décor.",
    material: "Pipe Cleaner, Ceramic Mini Pot",
    sizes: ["Small", "Medium"],
  },
  {
    id: "17",
    name: "Sunflower Desk Pot",
    price: 849,
    image: "lily-flowers",
    category: "Flower Pots",
    group: "Fuzzywire",
    rating: 4.8,
    reviews: 19,
    badge: "Best Seller",
    description: "Bright and cheerful fuzzywire sunflowers in a rustic terracotta pot.",
    material: "Pipe Cleaner, Terracotta Pot",
    sizes: ["One Size"],
  },

  // ── Other › Bracelets ──
  {
    id: "18",
    name: "Beaded Charm Bracelet",
    price: 399,
    originalPrice: 549,
    image: "cat-bracelets",
    category: "Bracelets",
    group: "Other",
    rating: 4.7,
    reviews: 65,
    badge: "Best Seller",
    description: "A delicate handmade beaded bracelet with charm accents. Adjustable for all wrist sizes.",
    material: "Glass Beads, Gold-tone Clasp",
    sizes: ["Adjustable"],
  },
  {
    id: "19",
    name: "Friendship Thread Bracelet",
    price: 249,
    image: "cat-bracelets",
    category: "Bracelets",
    group: "Other",
    rating: 4.5,
    reviews: 33,
    description: "Colorful woven friendship bracelet — perfect for gifting or stacking.",
    material: "Embroidery Thread",
    sizes: ["One Size"],
  },

  // ── Other › Phone Charms ──
  {
    id: "20",
    name: "Flower Phone Charm",
    price: 299,
    image: "bow-keychain",
    category: "Phone Charms",
    group: "Other",
    rating: 4.6,
    reviews: 47,
    badge: "New",
    description: "A cute crocheted flower charm that clips onto your phone case. Available in assorted colors.",
    material: "Cotton Yarn, Lobster Clasp",
    sizes: ["One Size"],
  },
  {
    id: "21",
    name: "Beaded Phone Strap",
    price: 349,
    image: "jellyfish-keychains",
    category: "Phone Charms",
    group: "Other",
    rating: 4.7,
    reviews: 22,
    description: "A trendy beaded phone strap in pastel colors. Keeps your phone secure and stylish.",
    material: "Glass Beads, Nylon Cord",
    sizes: ["One Size"],
  },

  // ── Other › Lippan Art ──
  {
    id: "22",
    name: "Lippan Art Mirror Frame",
    price: 1299,
    image: "craftsmanship",
    category: "Lippan Art",
    group: "Other",
    rating: 4.9,
    reviews: 38,
    badge: "Best Seller",
    description: "A stunning handcrafted Lippan art mirror frame with intricate mud-and-mirror work. Traditional Kutchi art meets modern décor.",
    material: "Clay, Mirror Pieces, MDF Board",
    sizes: ["8 inch", "12 inch"],
  },
  {
    id: "23",
    name: "Lippan Art Wall Plate",
    price: 899,
    image: "hero-collection",
    category: "Lippan Art",
    group: "Other",
    rating: 4.8,
    reviews: 15,
    badge: "New",
    description: "A decorative wall plate featuring traditional Lippan art patterns. Each piece is unique and handcrafted.",
    material: "Clay, Mirror Pieces, Wooden Plate",
    sizes: ["One Size"],
  },
];

export const bestSellers = products.filter(p => p.badge === "Best Seller");

export const newArrivals = products.filter(p => p.badge === "New");

/** All unique category names */
export const categories = [
  "Keychains",
  "Crochet Flowers",
  "Flower Bouquet",
  "Car Hangings",
  "Fuzzywire Flowers",
  "Fuzzywire Bouquet",
  "Flower Pots",
  "Bracelets",
  "Phone Charms",
  "Lippan Art",
] as const;

/** Category groups for display */
export const categoryGroups = [
  {
    label: "Crochet",
    categories: ["Keychains", "Crochet Flowers", "Flower Bouquet", "Car Hangings"],
  },
  {
    label: "Fuzzywire",
    categories: ["Fuzzywire Flowers", "Fuzzywire Bouquet", "Flower Pots"],
  },
  {
    label: "Other",
    categories: ["Bracelets", "Phone Charms", "Lippan Art"],
  },
];

/** Map category names to clean URL slugs */
export const categorySlugMap: Record<string, string> = {
  "Keychains": "keychains",
  "Crochet Flowers": "crochet-flowers",
  "Flower Bouquet": "flower-bouquet",
  "Car Hangings": "car-hangings",
  "Fuzzywire Flowers": "fuzzywire-flowers",
  "Fuzzywire Bouquet": "fuzzywire-bouquet",
  "Flower Pots": "flower-pots",
  "Bracelets": "bracelets",
  "Phone Charms": "phone-charms",
  "Lippan Art": "lippan-art",
};

/** Reverse map: slug → category name */
export const slugToCategoryMap: Record<string, string> = Object.fromEntries(
  Object.entries(categorySlugMap).map(([cat, slug]) => [slug, cat])
);

/** Get the clean URL path for a category */
export const getCategoryPath = (category: string): string => {
  const slug = categorySlugMap[category];
  return slug ? `/${slug}` : "/shop";
};

/** Get all products */
export const getAllProducts = (): Product[] => products;

/** Find a product by ID */
export const getProductById = (id: string): Product | undefined => {
  return products.find(p => p.id === id);
};

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
    text: "Beautiful packaging and fast delivery. The bouquet is delicate and looks so real — perfect for gifting.",
    date: "3 weeks ago",
  },
];
