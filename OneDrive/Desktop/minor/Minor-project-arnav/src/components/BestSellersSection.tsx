import { motion } from "framer-motion";
import ProductCard from "./ProductCard";
import { bestSellers, products } from "@/data/products";

const BestSellersSection = () => {
  const items = bestSellers.length >= 8 ? bestSellers.slice(0, 8) : [...bestSellers, ...products.filter(p => !bestSellers.includes(p))].slice(0, 8);

  return (
    <section className="py-20 lg:py-28 bg-muted/30">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="text-center mb-12 lg:mb-16">
          <p className="text-xs tracking-[0.3em] uppercase text-champagne mb-3">Most Loved</p>
          <h2 className="font-heading text-3xl lg:text-4xl">Best Sellers</h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-8">
          {items.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.6 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BestSellersSection;
