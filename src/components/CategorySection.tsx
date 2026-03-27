import { motion } from "framer-motion";
import ProductCard from "./ProductCard";
import { products, categoryDefs } from "@/data/products";

const CategorySection = () => {
  return (
    <section className="py-12 lg:py-20">
      <div className="container mx-auto px-4 lg:px-12">
        {/* Section header */}
        <div className="text-center mb-12 lg:mb-16">
          <p className="text-xs tracking-[0.3em] uppercase text-primary font-semibold mb-3">Explore</p>
          <h2 className="font-heading text-3xl lg:text-4xl mb-3">Our Collections</h2>
          <div className="craft-divider" />
        </div>

        {/* Render each category */}
        <div className="space-y-20 lg:space-y-28">
          {categoryDefs.map((cat) => {
            const catProducts = products.filter((p) => p.category === cat.id);
            if (catProducts.length === 0) return null;

            // Group by subcategory
            const subcategories = [...new Set(catProducts.map((p) => p.subcategory))];

            return (
              <div key={cat.id} id={cat.id} className="scroll-mt-24">
                {/* Category header */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="mb-10 lg:mb-14"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-0.5 bg-primary rounded-full" />
                    <p className="text-xs tracking-[0.25em] uppercase text-primary font-semibold">{cat.subtitle}</p>
                  </div>
                  <h3 className="font-heading text-2xl lg:text-3xl">{cat.title}</h3>
                </motion.div>

                {/* Subcategory groups */}
                {subcategories.map((sub) => {
                  const subProducts = catProducts.filter((p) => p.subcategory === sub);
                  return (
                    <div key={sub} className="mb-12 last:mb-0">
                      {subcategories.length > 1 && (
                        <h4 className="text-sm font-semibold uppercase tracking-[0.15em] text-muted-foreground mb-6">{sub}</h4>
                      )}
                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
                        {subProducts.map((product, i) => (
                          <motion.div
                            key={product.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.08, duration: 0.5 }}
                          >
                            <ProductCard product={product} />
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
