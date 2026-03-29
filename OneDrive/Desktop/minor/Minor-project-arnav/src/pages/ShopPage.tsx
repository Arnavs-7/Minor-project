import { useMemo } from "react";
import { useLocation, Link } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { getAllProducts, categories, slugToCategoryMap, getCategoryPath, categoryGroups } from "@/data/products";

const ShopPage = () => {
  const location = useLocation();

  // Determine active category from pathname
  const activeCategory = useMemo(() => {
    const slug = location.pathname.replace(/^\//, "");
    if (slug && slug !== "shop" && slugToCategoryMap[slug]) {
      return slugToCategoryMap[slug];
    }
    return null;
  }, [location.pathname]);

  const allProducts = useMemo(() => getAllProducts(), []);

  const filtered = useMemo(() => {
    if (!activeCategory) return allProducts;
    return allProducts.filter((p) => p.category === activeCategory);
  }, [activeCategory, allProducts]);

  const pageTitle = activeCategory || "All Products";

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-20 lg:pt-24">
        {/* Hero Banner */}
        <section className="bg-muted/30 py-12 lg:py-16">
          <div className="container mx-auto px-6 lg:px-12 text-center">
            <p className="text-xs tracking-[0.3em] uppercase text-champagne mb-3">Miss DIY</p>
            <h1 className="font-heading text-3xl lg:text-5xl mb-3">{pageTitle}</h1>
            <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
              <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
              <span>/</span>
              <span className="text-foreground">{pageTitle}</span>
            </div>
          </div>
        </section>

        {/* Category Filters */}
        <section className="py-8">
          <div className="container mx-auto px-6 lg:px-12">
            <div className="flex flex-wrap justify-center gap-2 mb-2">
              <Link
                to="/shop"
                className={`px-4 py-2 text-[11px] tracking-[0.15em] uppercase border transition-colors ${
                  !activeCategory ? "bg-foreground text-background border-foreground" : "border-border hover:border-foreground"
                }`}
              >
                All
              </Link>
              {categories.map((cat) => (
                <Link
                  key={cat}
                  to={getCategoryPath(cat)}
                  className={`px-4 py-2 text-[11px] tracking-[0.15em] uppercase border transition-colors ${
                    activeCategory === cat ? "bg-foreground text-background border-foreground" : "border-border hover:border-foreground"
                  }`}
                >
                  {cat}
                </Link>
              ))}
            </div>
            
            {/* Group labels */}
            {!activeCategory && (
              <div className="flex flex-wrap justify-center gap-4 mt-4 text-[10px] text-muted-foreground tracking-[0.2em] uppercase">
                {categoryGroups.map((g) => (
                  <span key={g.label} className="px-3 py-1 bg-muted/50 rounded-sm">{g.label}</span>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Product Count */}
        <div className="container mx-auto px-6 lg:px-12 mb-6">
          <p className="text-xs text-muted-foreground">{filtered.length} products</p>
        </div>

        {/* Product Grid */}
        <section className="container mx-auto px-6 lg:px-12 pb-20">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8">
            {filtered.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05, duration: 0.4 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-20">
              <p className="text-muted-foreground font-light">No products found in this category.</p>
              <Link to="/shop" className="luxury-btn-outline mt-6 inline-block">
                View All Products
              </Link>
            </div>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ShopPage;
