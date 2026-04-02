import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Palette, MessageSquare, Gift, Sparkles } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const steps = [
  {
    number: "01",
    icon: MessageSquare,
    title: "Tell Us Your Idea",
    description:
      "Send us a message describing what you have in mind — colour preferences, occasion, size, or any inspiration images.",
  },
  {
    number: "02",
    icon: Palette,
    title: "We Design Together",
    description:
      "We'll share a sketch or reference with you for approval. Revisions are welcome — we want it to be perfect!",
  },
  {
    number: "03",
    icon: Sparkles,
    title: "Crafting Begins",
    description:
      "Once approved, our artisan begins handcrafting your piece. Custom orders typically take 7–10 business days.",
  },
  {
    number: "04",
    icon: Gift,
    title: "Beautifully Delivered",
    description:
      "Your one-of-a-kind creation is carefully packaged and shipped to your doorstep with love.",
  },
];

const customTypes = [
  "Custom colour crochet bouquets",
  "Personalised keychains (initials, names, dates)",
  "Custom fuzzywire flower arrangements",
  "Lippan art in specific dimensions",
  "Bulk orders for weddings & events",
  "Corporate gifting hampers",
];

const CustomOrdersPage = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-20 lg:pt-24">
        {/* Hero */}
        <section className="bg-muted/30 py-12 lg:py-16">
          <div className="container mx-auto px-6 lg:px-12 text-center">
            <p className="text-xs tracking-[0.3em] uppercase text-champagne mb-3">
              Made Just For You
            </p>
            <h1 className="font-heading text-3xl lg:text-5xl mb-3">
              Custom Orders
            </h1>
            <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
              <Link to="/" className="hover:text-foreground transition-colors">
                Home
              </Link>
              <span>/</span>
              <span className="text-foreground">Custom Orders</span>
            </div>
          </div>
        </section>

        {/* Intro */}
        <section className="container mx-auto px-6 lg:px-12 py-12 lg:py-16 text-center max-w-2xl">
          <p className="text-muted-foreground font-light leading-relaxed">
            Can't find exactly what you're looking for? We love creating
            bespoke, one-of-a-kind pieces tailored to you. Whether it's a
            special occasion, a unique colour palette, or a personalised gift —
            we've got you covered.
          </p>
        </section>

        {/* Process Steps */}
        <section className="container mx-auto px-6 lg:px-12 pb-16 lg:pb-20">
          <h2 className="font-heading text-2xl lg:text-3xl text-center mb-12">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.12, duration: 0.5 }}
                className="text-center"
              >
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted/50 flex items-center justify-center">
                  <step.icon
                    size={24}
                    strokeWidth={1.2}
                    className="text-champagne"
                  />
                </div>
                <p className="text-[10px] tracking-[0.3em] uppercase text-champagne mb-2">
                  Step {step.number}
                </p>
                <h3 className="font-heading text-lg mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground font-light leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* What We Customise */}
        <section className="bg-muted/20 py-16 lg:py-20">
          <div className="container mx-auto px-6 lg:px-12 max-w-3xl">
            <h2 className="font-heading text-2xl lg:text-3xl text-center mb-10">
              What We Can Customise
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {customTypes.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -15 : 15 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + i * 0.08, duration: 0.4 }}
                  className="flex items-start gap-3 p-4 border border-border hover:border-champagne transition-colors"
                >
                  <Sparkles
                    size={14}
                    strokeWidth={1.5}
                    className="text-champagne mt-0.5 shrink-0"
                  />
                  <span className="text-sm font-light">{item}</span>
                </motion.div>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link to="/contact" className="luxury-btn">
                Start Your Custom Order
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default CustomOrdersPage;
