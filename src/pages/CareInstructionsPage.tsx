import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Droplets, Sun, Wind, Heart } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const careCategories = [
  {
    title: "Crochet Products",
    icon: Heart,
    tips: [
      "Gently spot clean with a damp cloth if needed.",
      "Avoid soaking in water — handmade yarn can lose its shape.",
      "Store in a cool, dry place away from direct sunlight.",
      "If the item loses shape, gently steam or reshape by hand.",
      "Keep away from pets — they love chewing yarn!",
    ],
  },
  {
    title: "Fuzzywire / Pipe Cleaner Products",
    icon: Wind,
    tips: [
      "Dust gently with a soft brush or dry cloth.",
      "Do not wash or submerge in water — pipe cleaners may rust.",
      "Avoid bending petals back and forth excessively.",
      "Store upright in a vase or holder to maintain shape.",
      "Keep away from humid environments.",
    ],
  },
  {
    title: "Beaded & Thread Accessories",
    icon: Droplets,
    tips: [
      "Avoid contact with perfumes, lotions, and water.",
      "Store flat or hanging to prevent tangling.",
      "Clean gently with a dry soft cloth.",
      "Remove before exercising or sleeping.",
    ],
  },
  {
    title: "Lippan Art",
    icon: Sun,
    tips: [
      "Wipe surface gently with a dry microfiber cloth.",
      "Do not use water or liquid cleaners on the mirror/clay work.",
      "Hang securely using the provided hook or adhesive.",
      "Avoid hanging in direct sunlight for extended periods.",
      "Handle with care — clay pieces can chip if dropped.",
    ],
  },
];

const CareInstructionsPage = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-20 lg:pt-24">
        {/* Hero */}
        <section className="bg-muted/30 py-12 lg:py-16">
          <div className="container mx-auto px-6 lg:px-12 text-center">
            <p className="text-xs tracking-[0.3em] uppercase text-champagne mb-3">
              Keep It Beautiful
            </p>
            <h1 className="font-heading text-3xl lg:text-5xl mb-3">
              Care Instructions
            </h1>
            <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
              <Link to="/" className="hover:text-foreground transition-colors">
                Home
              </Link>
              <span>/</span>
              <span className="text-foreground">Care Instructions</span>
            </div>
          </div>
        </section>

        {/* Intro */}
        <section className="container mx-auto px-6 lg:px-12 py-12 lg:py-16 text-center max-w-2xl">
          <p className="text-muted-foreground font-light leading-relaxed">
            Every Miss DIY piece is handcrafted with love. A little care goes a
            long way in keeping your items looking fresh and beautiful for years
            to come. Below are care guidelines for each product category.
          </p>
        </section>

        {/* Care Cards */}
        <section className="container mx-auto px-6 lg:px-12 pb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {careCategories.map((cat, i) => (
              <motion.div
                key={cat.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="border border-border p-8 hover:border-champagne transition-colors duration-300"
              >
                <div className="flex items-center gap-3 mb-5">
                  <cat.icon
                    size={24}
                    strokeWidth={1.2}
                    className="text-champagne"
                  />
                  <h3 className="font-heading text-lg">{cat.title}</h3>
                </div>
                <ul className="space-y-3">
                  {cat.tips.map((tip, j) => (
                    <li
                      key={j}
                      className="flex items-start gap-2 text-sm text-muted-foreground font-light"
                    >
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-champagne shrink-0" />
                      {tip}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default CareInstructionsPage;
