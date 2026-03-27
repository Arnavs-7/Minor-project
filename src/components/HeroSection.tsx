import { motion } from "framer-motion";
import heroImage from "@/assets/pink-lily-bouquet.jpg";

const HeroSection = () => {
  const scrollToProducts = () => {
    document.getElementById("crochet")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative h-screen min-h-[600px] flex items-center overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Handmade crochet flowers and crafts by MS DIY"
          className="w-full h-full object-cover"
          width={1920}
          height={1080}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-noir/60 via-noir/40 to-noir/20" />
      </div>

      <div className="relative z-10 container mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="max-w-xl"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="inline-block mb-5"
          >
            <span className="bg-white/15 backdrop-blur-sm border border-white/20 text-white text-xs tracking-[0.25em] uppercase px-5 py-2 rounded-full font-medium">
              ✨ Handmade with Love
            </span>
          </motion.div>

          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl text-white leading-tight mb-6">
            Beautiful Handcrafted{" "}
            <span className="text-rose-300">Creations</span>
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-white/80 text-sm md:text-base font-light leading-relaxed mb-8 max-w-md"
          >
            Discover unique crochet flowers, fuzzywire art, bracelets, phone charms & more — each piece lovingly handmade by MS DIY.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="flex gap-4 flex-wrap"
          >
            <button
              onClick={scrollToProducts}
              className="craft-btn bg-white text-noir hover:bg-primary hover:text-white"
            >
              Shop Collection
            </button>
            <a href="#instagram" className="craft-btn-outline border-white/40 text-white hover:bg-white hover:text-noir">
              Follow Us
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Decorative scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center pt-2"
        >
          <div className="w-1 h-2 bg-white/60 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
