import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ProductCard from "./ProductCard";
import { Product } from "@/data/products";
import { Skeleton } from "./ui/skeleton";

const NewArrivalsSection = () => {
  const [items, setItems] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNewArrivals = async () => {
      try {
        const response = await fetch("/api/products?limit=8");
        if (!response.ok) throw new Error("Failed to fetch");
        const data = await response.json();
        setItems(data);
      } catch (error) {
        console.error("Error fetching new arrivals:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchNewArrivals();
  }, []);

  return (
    <section className="py-20 lg:py-28">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex items-end justify-center lg:justify-between mb-12 lg:mb-16 text-center lg:text-left">
          <div>
            <p className="text-xs tracking-[0.3em] uppercase text-champagne mb-3">Just In</p>
            <h2 className="font-heading text-3xl lg:text-4xl">New Arrivals</h2>
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="space-y-4">
                <Skeleton className="h-[300px] w-full" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8">
            {items.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default NewArrivalsSection;
