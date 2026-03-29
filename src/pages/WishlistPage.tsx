import { useMemo } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, ShoppingBag, Trash2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useCart } from "@/context/CartContext";
import { getAllProducts } from "@/data/products";
import { getProductImage } from "@/components/ProductCard";
import { toast } from "sonner";

const WishlistPage = () => {
  const { wishlist, toggleWishlist, addToCart } = useCart();
  const allProducts = useMemo(() => getAllProducts(), []);

  const wishlistProducts = useMemo(
    () => allProducts.filter((p) => wishlist.includes(p.id)),
    [allProducts, wishlist]
  );

  const handleAddAllToCart = () => {
    wishlistProducts.forEach((p) => addToCart(p, 1));
    toast.success("All wishlist items added to cart!");
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-20 lg:pt-24">
        {/* Hero Banner */}
        <section className="bg-muted/30 py-12 lg:py-16">
          <div className="container mx-auto px-6 lg:px-12 text-center">
            <p className="text-xs tracking-[0.3em] uppercase text-champagne mb-3">
              Your Collection
            </p>
            <h1 className="font-heading text-3xl lg:text-5xl mb-3">Wishlist</h1>
            <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
              <Link to="/" className="hover:text-foreground transition-colors">
                Home
              </Link>
              <span>/</span>
              <span className="text-foreground">Wishlist</span>
            </div>
          </div>
        </section>

        <section className="container mx-auto px-6 lg:px-12 py-12 lg:py-16">
          <AnimatePresence mode="wait">
            {wishlistProducts.length === 0 ? (
              /* ── Empty State ── */
              <motion.div
                key="empty"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="text-center py-16"
              >
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-muted/50 flex items-center justify-center">
                  <Heart size={32} strokeWidth={1} className="text-muted-foreground" />
                </div>
                <h2 className="font-heading text-2xl lg:text-3xl mb-3">
                  Your wishlist is empty
                </h2>
                <p className="text-muted-foreground font-light mb-8 max-w-md mx-auto">
                  Browse our collection and tap the heart icon to save pieces you love.
                </p>
                <Link to="/shop" className="luxury-btn">
                  Explore Collection
                </Link>
              </motion.div>
            ) : (
              /* ── Wishlist Grid ── */
              <motion.div
                key="grid"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {/* Top bar */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
                  <p className="text-sm text-muted-foreground">
                    {wishlistProducts.length}{" "}
                    {wishlistProducts.length === 1 ? "item" : "items"} saved
                  </p>
                  <button
                    onClick={handleAddAllToCart}
                    className="luxury-btn text-xs flex items-center gap-2"
                  >
                    <ShoppingBag size={14} strokeWidth={1.5} />
                    Add All to Cart
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
                  <AnimatePresence>
                    {wishlistProducts.map((product, i) => {
                      const img = getProductImage(product.image);
                      return (
                        <motion.div
                          key={product.id}
                          layout
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.9 }}
                          transition={{ delay: i * 0.05, duration: 0.4 }}
                          className="group"
                        >
                          <div className="relative">
                            <Link to={`/product/${product.id}`}>
                              <div className="product-card-image aspect-square relative mb-4">
                                <img
                                  src={img}
                                  alt={product.name}
                                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                  loading="lazy"
                                  width={400}
                                  height={400}
                                />
                                {product.badge && (
                                  <span className="absolute top-3 left-3 bg-champagne text-foreground text-[10px] tracking-[0.15em] uppercase px-3 py-1">
                                    {product.badge}
                                  </span>
                                )}
                              </div>
                            </Link>

                            {/* Quick actions overlay */}
                            <div className="absolute bottom-4 left-0 right-0 px-3 flex justify-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                              <button
                                onClick={() => addToCart(product)}
                                className="flex items-center gap-1.5 px-4 py-2 bg-background/95 backdrop-blur-sm text-[10px] tracking-[0.1em] uppercase hover:bg-champagne transition-colors"
                              >
                                <ShoppingBag size={12} strokeWidth={1.5} />
                                Add to Cart
                              </button>
                              <button
                                onClick={() => toggleWishlist(product.id)}
                                className="w-9 h-9 bg-background/95 backdrop-blur-sm flex items-center justify-center hover:bg-red-50 hover:text-red-400 transition-colors"
                                aria-label="Remove from wishlist"
                              >
                                <Trash2 size={14} strokeWidth={1.5} />
                              </button>
                            </div>
                          </div>

                          <div className="space-y-1.5">
                            <Link to={`/product/${product.id}`}>
                              <h3 className="text-sm font-light tracking-wide hover:text-champagne transition-colors">
                                {product.name}
                              </h3>
                            </Link>
                            <div className="flex items-center gap-2">
                              <span className="text-sm">
                                ₹{product.price.toLocaleString()}
                              </span>
                              {product.originalPrice && (
                                <span className="text-xs text-muted-foreground line-through">
                                  ₹{product.originalPrice.toLocaleString()}
                                </span>
                              )}
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </AnimatePresence>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default WishlistPage;
