import { useState, useRef, useEffect, useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Search, X, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { getAllProducts, type Product } from "@/data/products";
import { getProductImage } from "@/components/ProductCard";

const SearchPanel = ({ iconOnly = false, size = 18 }: { iconOnly?: boolean; size?: number }) => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const allProducts = useMemo(() => getAllProducts(), []);

  const results = useMemo(() => {
    if (query.trim().length < 2) return [];
    const q = query.toLowerCase();
    return allProducts.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.group.toLowerCase().includes(q) ||
        (p.description && p.description.toLowerCase().includes(q)) ||
        (p.material && p.material.toLowerCase().includes(q))
    );
  }, [query, allProducts]);

  // Focus input when panel opens
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setQuery("");
    }
  }, [open]);

  // Close on click outside
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    if (open) document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    if (open) document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open]);

  const goToProduct = useCallback(
    (product: Product) => {
      setOpen(false);
      navigate(`/product/${product.id}`);
    },
    [navigate]
  );

  const goToShop = useCallback(() => {
    setOpen(false);
    navigate("/shop");
  }, [navigate]);

  return (
    <div className="relative" ref={panelRef}>
      {/* Search Toggle Button */}
      <button
        onClick={() => setOpen(!open)}
        className="text-foreground hover:text-champagne transition-colors"
        aria-label="Search products"
      >
        <Search size={size} strokeWidth={1.5} />
      </button>

      {/* Dropdown Search Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.97 }}
            transition={{ duration: 0.2 }}
            className={`absolute right-0 bottom-full mb-4 sm:top-10 sm:bottom-auto w-[90vw] sm:w-[420px] bg-background border border-border shadow-xl z-50 ${iconOnly ? "fixed left-[5vw] right-[5vw] bottom-20" : ""}`}
          >
            {/* Input */}
            <div className="flex items-center border-b border-border px-4">
              <Search size={16} strokeWidth={1.5} className="text-muted-foreground shrink-0" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search products, categories..."
                className="flex-1 bg-transparent px-3 py-4 text-sm font-light outline-none placeholder:text-muted-foreground/60"
              />
              {query && (
                <button
                  onClick={() => setQuery("")}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="Clear search"
                >
                  <X size={14} strokeWidth={1.5} />
                </button>
              )}
            </div>

            {/* Results */}
            <div className="max-h-[60vh] overflow-y-auto">
              {query.trim().length < 2 ? (
                <div className="px-4 py-8 text-center">
                  <p className="text-xs text-muted-foreground font-light">
                    Type at least 2 characters to search
                  </p>
                  {/* Quick links */}
                  <div className="mt-4 flex flex-wrap justify-center gap-2">
                    {["Keychains", "Bouquets", "Crochet", "Lippan Art"].map(
                      (tag) => (
                        <button
                          key={tag}
                          onClick={() => setQuery(tag)}
                          className="text-[10px] tracking-[0.1em] uppercase px-3 py-1.5 border border-border hover:border-champagne hover:text-champagne transition-colors"
                        >
                          {tag}
                        </button>
                      )
                    )}
                  </div>
                </div>
              ) : results.length === 0 ? (
                <div className="px-4 py-10 text-center">
                  <p className="text-sm text-muted-foreground font-light mb-2">
                    No results for "{query}"
                  </p>
                  <p className="text-xs text-muted-foreground/60">
                    Try different keywords or{" "}
                    <button
                      onClick={goToShop}
                      className="text-champagne hover:underline"
                    >
                      browse all products
                    </button>
                  </p>
                </div>
              ) : (
                <>
                  <p className="px-4 pt-3 pb-1 text-[10px] tracking-[0.15em] uppercase text-muted-foreground">
                    {results.length} result{results.length !== 1 ? "s" : ""}
                  </p>
                  {results.slice(0, 8).map((product) => {
                    const img = getProductImage(product.image);
                    return (
                      <button
                        key={product.id}
                        onClick={() => goToProduct(product)}
                        className="w-full flex items-center gap-4 px-4 py-3 hover:bg-muted/40 transition-colors text-left"
                      >
                        <img
                          src={img}
                          alt={product.name}
                          className="w-12 h-12 object-cover bg-muted shrink-0"
                          width={48}
                          height={48}
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm truncate">{product.name}</p>
                          <p className="text-[10px] text-muted-foreground tracking-wider uppercase">
                            {product.category}
                          </p>
                        </div>
                        <span className="text-sm shrink-0">
                          ₹{product.price.toLocaleString()}
                        </span>
                      </button>
                    );
                  })}
                  {results.length > 8 && (
                    <button
                      onClick={goToShop}
                      className="w-full flex items-center justify-center gap-2 px-4 py-3 text-xs tracking-[0.1em] uppercase text-champagne hover:bg-muted/30 transition-colors border-t border-border"
                    >
                      View all {results.length} results
                      <ArrowRight size={12} strokeWidth={1.5} />
                    </button>
                  )}
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SearchPanel;
