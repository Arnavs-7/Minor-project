import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface FAQItem {
  question: string;
  answer: string;
}

const faqSections: { title: string; items: FAQItem[] }[] = [
  {
    title: "Orders & Shipping",
    items: [
      {
        question: "How long does delivery take?",
        answer:
          "Standard delivery takes 5–7 business days after processing. Processing for handmade items typically takes 3–5 days. Express shipping (2–3 days) is available at checkout.",
      },
      {
        question: "Do you offer free shipping?",
        answer:
          "Yes! We offer free standard shipping on all orders above ₹999. Orders below that are charged a flat ₹79 shipping fee.",
      },
      {
        question: "Can I track my order?",
        answer:
          "Absolutely! Once your order is dispatched, you'll receive a tracking link via email and SMS.",
      },
      {
        question: "Do you ship internationally?",
        answer:
          "Currently we ship within India only. International shipping is coming soon — stay tuned!",
      },
    ],
  },
  {
    title: "Products & Quality",
    items: [
      {
        question: "Are all products handmade?",
        answer:
          "Yes, every single product on Miss DIY is handcrafted by our artisans. That means each piece is unique and made with love.",
      },
      {
        question: "What materials do you use?",
        answer:
          "We use premium materials including 100% cotton yarn, acrylic yarn, pipe cleaners, glass beads, clay, and mirror pieces depending on the product category.",
      },
      {
        question: "Will the colours match the photos exactly?",
        answer:
          "We do our best to match colours, but slight variations may occur due to the handmade nature of our products and screen display differences.",
      },
    ],
  },
  {
    title: "Returns & Exchanges",
    items: [
      {
        question: "What is your return policy?",
        answer:
          "If you're not satisfied, contact us within 7 days of delivery for a hassle-free return or exchange.",
      },
      {
        question: "What if my item arrives damaged?",
        answer:
          "Please contact us within 48 hours with clear photos of the damage. We'll send a replacement or issue a full refund — no questions asked.",
      },
      {
        question: "Can I cancel my order?",
        answer:
          "Orders can be cancelled within 24 hours of placement. After that, crafting may have already begun and cancellation may not be possible.",
      },
    ],
  },
  {
    title: "Custom Orders",
    items: [
      {
        question: "Can I request a custom product?",
        answer:
          "Of course! We love creating bespoke pieces. Visit our Custom Orders page or contact us directly with your idea.",
      },
      {
        question: "How long do custom orders take?",
        answer:
          "Custom orders typically take 7–10 business days to craft, depending on complexity.",
      },
      {
        question: "Is there an extra charge for customisation?",
        answer:
          "Basic customisations (colour changes, text additions) are usually free. Complex or large custom pieces may have additional charges — we'll always quote before starting.",
      },
    ],
  },
];

const AccordionItem = ({ item }: { item: FAQItem }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-border">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-5 text-left gap-4 group"
      >
        <span className="text-sm font-medium group-hover:text-champagne transition-colors">
          {item.question}
        </span>
        <ChevronDown
          size={16}
          strokeWidth={1.5}
          className={`text-muted-foreground shrink-0 transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="text-sm text-muted-foreground font-light leading-relaxed pb-5">
              {item.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const FAQPage = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-20 lg:pt-24">
        {/* Hero */}
        <section className="bg-muted/30 py-12 lg:py-16">
          <div className="container mx-auto px-6 lg:px-12 text-center">
            <p className="text-xs tracking-[0.3em] uppercase text-champagne mb-3">
              Got Questions?
            </p>
            <h1 className="font-heading text-3xl lg:text-5xl mb-3">
              Frequently Asked Questions
            </h1>
            <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
              <Link to="/" className="hover:text-foreground transition-colors">
                Home
              </Link>
              <span>/</span>
              <span className="text-foreground">FAQ</span>
            </div>
          </div>
        </section>

        {/* FAQ sections */}
        <section className="container mx-auto px-6 lg:px-12 py-12 lg:py-20 max-w-3xl">
          {faqSections.map((section, i) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="mb-12 last:mb-0"
            >
              <h2 className="font-heading text-xl lg:text-2xl mb-6">
                {section.title}
              </h2>
              <div>
                {section.items.map((item) => (
                  <AccordionItem key={item.question} item={item} />
                ))}
              </div>
            </motion.div>
          ))}

          <div className="text-center mt-12 pt-8 border-t border-border">
            <p className="text-sm text-muted-foreground font-light mb-4">
              Didn't find what you're looking for?
            </p>
            <Link to="/contact" className="luxury-btn">
              Contact Us
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default FAQPage;
