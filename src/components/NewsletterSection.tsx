import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const NewsletterSection = () => {
  const [email, setEmail] = useState("");

  return (
    <section className="py-20 lg:py-28 bg-primary text-primary-foreground">
      <div className="container mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-xl mx-auto text-center"
        >
          <p className="text-xs tracking-[0.3em] uppercase text-champagne mb-3">Stay Connected</p>
          <h2 className="font-heading text-3xl lg:text-4xl mb-4">Get Exclusive Offers & Updates</h2>
          <p className="text-sm text-primary-foreground/60 font-light mb-8">
            Be the first to know about new handmade creations, special offers, and DIY inspiration.
          </p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              setEmail("");
            }}
            className="flex gap-0"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex-1 bg-transparent border border-primary-foreground/20 px-5 py-3 text-sm font-light placeholder:text-primary-foreground/30 focus:outline-none focus:border-champagne transition-colors"
              required
            />
            <button
              type="submit"
              className="bg-champagne text-noir px-6 py-3 flex items-center gap-2 text-xs tracking-[0.15em] uppercase hover:bg-champagne/80 transition-colors"
            >
              Subscribe
              <ArrowRight size={14} strokeWidth={1.5} />
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default NewsletterSection;
