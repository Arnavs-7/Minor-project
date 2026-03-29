import { useRef } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ProductCard from "./ProductCard";
import { newArrivals } from "@/data/products";

const NewArrivalsSection = () => {

  return (
    <section className="py-20 lg:py-28">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex items-end justify-center lg:justify-between mb-12 lg:mb-16 text-center lg:text-left">
          <div>
            <p className="text-xs tracking-[0.3em] uppercase text-champagne mb-3">Just In</p>
            <h2 className="font-heading text-3xl lg:text-4xl">New Arrivals</h2>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8">
          {newArrivals.slice(0, 8).map((product, i) => (
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
      </div>
    </section>
  );
};

export default NewArrivalsSection;
