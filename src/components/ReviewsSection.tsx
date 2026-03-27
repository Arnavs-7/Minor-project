import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { reviews } from "@/data/products";

const ReviewsSection = () => {
  return (
    <section className="py-20 lg:py-28">
      <div className="container mx-auto px-4 lg:px-12">
        <div className="text-center mb-12 lg:mb-16">
          <p className="text-xs tracking-[0.3em] uppercase text-primary font-semibold mb-3">Testimonials</p>
          <h2 className="font-heading text-3xl lg:text-4xl mb-3">What Our Customers Say</h2>
          <div className="craft-divider" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {reviews.map((review, i) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.6 }}
              className="bg-white border border-border rounded-2xl p-8 lg:p-10 shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <Quote size={24} className="text-primary mb-4" strokeWidth={1} />
              <p className="text-sm text-muted-foreground font-light leading-relaxed mb-6">
                "{review.text}"
              </p>
              <div className="flex items-center gap-1 mb-3">
                {Array.from({ length: 5 }).map((_, j) => (
                  <Star
                    key={j}
                    size={12}
                    className={j < review.rating ? "text-amber-400 fill-amber-400" : "text-border"}
                  />
                ))}
              </div>
              <p className="text-xs tracking-[0.1em] uppercase font-semibold">{review.name}</p>
              <p className="text-[10px] text-muted-foreground mt-1">{review.date}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;
