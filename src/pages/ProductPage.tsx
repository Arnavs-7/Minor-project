import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Heart, ShoppingBag, Star, Minus, Plus, ChevronRight } from "lucide-react";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard, { getProductImage } from "@/components/ProductCard";
import { products } from "@/data/products";
import { useStore } from "@/hooks/useStore";

const ProductPage = () => {
  const { id } = useParams();
  const product = products.find((p) => p.id === id) || products[0];
  const [qty, setQty] = useState(1);
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || "");
  const { addToCart, toggleWishlist, isWishlisted } = useStore();

  const wishlisted = isWishlisted(product.id);
  const img = getProductImage(product.image);
  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);

  const handleAddToCart = () => {
    addToCart(product, qty);
    toast.success(`${product.name} added to cart!`, {
      duration: 2000,
      style: { background: "hsl(28, 50%, 97%)", border: "1px solid hsl(340, 45%, 65%)", color: "hsl(0, 0%, 15%)" },
    });
  };

  const handleToggleWishlist = () => {
    toggleWishlist(product);
    toast(wishlisted ? "Removed from wishlist" : "Added to wishlist ♥", {
      duration: 1500,
      style: { background: "hsl(28, 50%, 97%)", border: "1px solid hsl(340, 45%, 65%)", color: "hsl(0, 0%, 15%)" },
    });
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-20 lg:pt-24">
        <div className="container mx-auto px-4 lg:px-12 py-4">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Link to="/" className="hover:text-primary transition-colors">Home</Link>
            <ChevronRight size={12} />
            <span className="hover:text-primary transition-colors">{product.subcategory}</span>
            <ChevronRight size={12} />
            <span className="text-foreground font-medium">{product.name}</span>
          </div>
        </div>

        <div className="container mx-auto px-4 lg:px-12 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="aspect-square overflow-hidden bg-muted group cursor-zoom-in rounded-3xl shadow-lg"
            >
              <img
                src={img}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-125"
                width={800}
                height={800}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-col justify-center"
            >
              {product.badge && (
                <span className="inline-block w-fit text-xs tracking-[0.15em] uppercase bg-primary/10 text-primary px-4 py-1 rounded-full font-semibold mb-3">
                  {product.badge}
                </span>
              )}
              <h1 className="font-heading text-3xl lg:text-4xl mb-4">{product.name}</h1>

              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={14} className={i < Math.floor(product.rating) ? "text-amber-400 fill-amber-400" : "text-border"} />
                  ))}
                </div>
                <span className="text-xs text-muted-foreground">({product.reviews} reviews)</span>
              </div>

              <div className="flex items-center gap-3 mb-6">
                <span className="text-2xl font-bold">₹{product.price.toLocaleString()}</span>
                {product.originalPrice && (
                  <span className="text-sm text-muted-foreground line-through">₹{product.originalPrice.toLocaleString()}</span>
                )}
              </div>

              <p className="text-sm text-muted-foreground font-light leading-relaxed mb-8">
                {product.description}
              </p>

              <div className="mb-6">
                <p className="text-xs tracking-[0.15em] uppercase mb-2 font-semibold">Material</p>
                <p className="text-sm text-muted-foreground font-light">{product.material}</p>
              </div>

              {product.sizes && product.sizes.length > 1 && (
                <div className="mb-8">
                  <p className="text-xs tracking-[0.15em] uppercase mb-3 font-semibold">Size</p>
                  <div className="flex gap-2 flex-wrap">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`px-4 py-2 text-xs rounded-full border-2 transition-all font-medium ${
                          selectedSize === size
                            ? "border-primary bg-primary text-white"
                            : "border-border hover:border-primary"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="mb-8">
                <p className="text-xs tracking-[0.15em] uppercase mb-3 font-semibold">Quantity</p>
                <div className="flex items-center border border-border rounded-full w-fit overflow-hidden">
                  <button onClick={() => setQty(Math.max(1, qty - 1))} className="w-10 h-10 flex items-center justify-center hover:bg-muted transition-colors">
                    <Minus size={14} strokeWidth={1.5} />
                  </button>
                  <span className="w-12 h-10 flex items-center justify-center text-sm border-x border-border font-semibold">{qty}</span>
                  <button onClick={() => setQty(qty + 1)} className="w-10 h-10 flex items-center justify-center hover:bg-muted transition-colors">
                    <Plus size={14} strokeWidth={1.5} />
                  </button>
                </div>
              </div>

              <div className="flex gap-3">
                <button onClick={handleAddToCart} className="craft-btn flex-1 flex items-center justify-center gap-2">
                  <ShoppingBag size={16} strokeWidth={1.5} />
                  Add to Cart
                </button>
                <button
                  onClick={handleToggleWishlist}
                  className={`w-12 h-12 border-2 rounded-full flex items-center justify-center transition-all ${
                    wishlisted
                      ? "border-primary text-primary bg-primary/10"
                      : "border-border hover:border-primary hover:text-primary"
                  }`}
                  aria-label="Toggle wishlist"
                >
                  <Heart size={16} strokeWidth={1.5} fill={wishlisted ? "currentColor" : "none"} />
                </button>
              </div>

              <div className="mt-8 pt-8 border-t border-border grid grid-cols-3 gap-4 text-center">
                {[
                  { label: "Handmade", sub: "With Love" },
                  { label: "Free Shipping", sub: "Orders over ₹500" },
                  { label: "Easy Returns", sub: "7-day policy" },
                ].map((badge) => (
                  <div key={badge.label} className="bg-muted/50 rounded-xl py-3 px-2">
                    <p className="text-xs tracking-[0.1em] font-semibold">{badge.label}</p>
                    <p className="text-[10px] text-muted-foreground mt-0.5">{badge.sub}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {related.length > 0 && (
          <section className="py-16 lg:py-20 bg-craft-warm/20">
            <div className="container mx-auto px-4 lg:px-12">
              <h2 className="font-heading text-2xl lg:text-3xl text-center mb-10">You May Also Like</h2>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
                {related.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default ProductPage;
