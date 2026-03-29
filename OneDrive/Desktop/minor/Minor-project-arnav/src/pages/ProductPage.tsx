import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Heart, ShoppingBag, Star, Minus, Plus, ChevronRight, Zap } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard, { getProductImage } from "@/components/ProductCard";
import { getAllProducts, getProductById, getCategoryPath } from "@/data/products";
import CustomerReviews from "@/components/CustomerReviews";

const ProductPage = () => {
  const { id } = useParams();
  const allProducts = getAllProducts();
  const product = getProductById(id || "") || allProducts[0];
  const [qty, setQty] = useState(1);
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || "");
  const { addToCart, toggleWishlist, isWishlisted } = useCart();
  const navigate = useNavigate();
  
  const wishlisted = isWishlisted(product.id);

  const img = getProductImage(product.image);
  const related = allProducts.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-20 lg:pt-24">
        <div className="container mx-auto px-6 lg:px-12 py-4">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
            <ChevronRight size={12} />
            <Link to={getCategoryPath(product.category)} className="hover:text-foreground transition-colors">{product.category}</Link>
            <ChevronRight size={12} />
            <span className="text-foreground">{product.name}</span>
          </div>
        </div>

        <div className="container mx-auto px-6 lg:px-12 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="w-full max-w-lg mx-auto lg:max-w-none overflow-hidden bg-muted group cursor-zoom-in"
            >
              <div className="relative w-full aspect-[3/4]">
                <img
                  src={img}
                  alt={product.name}
                  className="absolute inset-0 w-full h-full object-contain transition-transform duration-700 group-hover:scale-110"
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-col justify-center"
            >
              {product.badge && (
                <span className="text-xs tracking-[0.2em] uppercase text-champagne mb-2">{product.badge}</span>
              )}
              <h1 className="font-heading text-3xl lg:text-4xl mb-4">{product.name}</h1>

              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={14} className={i < Math.floor(product.rating) ? "text-champagne fill-champagne" : "text-border"} />
                  ))}
                </div>
                <span className="text-xs text-muted-foreground">({product.reviews} reviews)</span>
              </div>

              <div className="flex items-center gap-3 mb-6">
                <span className="text-2xl font-light">₹{product.price.toLocaleString()}</span>
                {product.originalPrice && (
                  <span className="text-sm text-muted-foreground line-through">₹{product.originalPrice.toLocaleString()}</span>
                )}
              </div>

              <p className="text-sm text-muted-foreground font-light leading-relaxed mb-8">
                {product.description}
              </p>

              <div className="mb-6">
                <p className="text-xs tracking-[0.15em] uppercase mb-2">Material</p>
                <p className="text-sm text-muted-foreground font-light">{product.material}</p>
              </div>

              {product.sizes && product.sizes.length > 1 && (
                <div className="mb-8">
                  <p className="text-xs tracking-[0.15em] uppercase mb-3">Size</p>
                  <div className="flex gap-2 flex-wrap">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`px-4 py-2 text-xs border transition-colors ${
                          selectedSize === size
                            ? "border-foreground bg-foreground text-background"
                            : "border-border hover:border-foreground"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="mb-8">
                <p className="text-xs tracking-[0.15em] uppercase mb-3">Quantity</p>
                <div className="flex items-center border border-border w-fit">
                  <button onClick={() => setQty(Math.max(1, qty - 1))} className="w-10 h-10 flex items-center justify-center hover:bg-muted transition-colors">
                    <Minus size={14} strokeWidth={1.5} />
                  </button>
                  <span className="w-12 h-10 flex items-center justify-center text-sm border-x border-border">{qty}</span>
                  <button onClick={() => setQty(qty + 1)} className="w-10 h-10 flex items-center justify-center hover:bg-muted transition-colors">
                    <Plus size={14} strokeWidth={1.5} />
                  </button>
                </div>
              </div>

              <div className="flex gap-3 mb-3">
                <button 
                  onClick={() => addToCart(product, qty)}
                  className="luxury-btn flex-1 flex items-center justify-center gap-2"
                >
                  <ShoppingBag size={16} strokeWidth={1.5} />
                  Add to Cart
                </button>
                <button
                  onClick={() => toggleWishlist(product.id)}
                  className={`w-12 h-12 border flex items-center justify-center transition-colors ${wishlisted ? "border-champagne text-champagne bg-champagne/10" : "border-border hover:border-champagne hover:text-champagne"}`}
                  aria-label="Add to wishlist"
                >
                  <Heart size={16} strokeWidth={1.5} fill={wishlisted ? "currentColor" : "none"} />
                </button>
              </div>
              <button 
                onClick={() => {
                  addToCart(product, qty);
                  navigate("/cart");
                }}
                className="w-full bg-foreground text-background hover:bg-champagne py-3.5 tracking-[0.15em] uppercase text-xs flex justify-center items-center gap-2 transition-colors duration-300"
              >
                <Zap size={16} fill="currentColor" />
                Buy Now
              </button>

              <div className="mt-8 pt-8 border-t border-border grid grid-cols-3 gap-4 text-center">
                {[
                  { label: "Handmade", sub: "With Love" },
                  { label: "Expected delivery", sub: "7-10 days" },
                  { label: "Easy Returns", sub: "7-day policy" },
                ].map((badge) => (
                  <div key={badge.label}>
                    <p className="text-xs tracking-[0.1em]">{badge.label}</p>
                    <p className="text-[10px] text-muted-foreground mt-0.5">{badge.sub}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Customer Reviews Section — Live from Neon DB */}
        <CustomerReviews productId={product.id} />

        {related.length > 0 && (
          <section className="py-16 lg:py-20">
            <div className="container mx-auto px-6 lg:px-12">
              <h2 className="font-heading text-2xl lg:text-3xl text-center mb-10">You May Also Like</h2>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8">
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
