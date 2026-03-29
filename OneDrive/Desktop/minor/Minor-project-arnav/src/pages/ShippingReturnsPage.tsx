import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Package, RotateCcw, Clock, Shield } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const policies = [
  {
    icon: Package,
    title: "Free Shipping",
    description:
      "Enjoy free standard shipping on all orders above ₹999. Orders below ₹999 incur a flat ₹79 shipping fee.",
  },
  {
    icon: Clock,
    title: "Processing Time",
    description:
      "Since all our products are handmade with love, please allow 7-10 days for delivery. You'll receive a tracking link once your order ships.",
  },
  {
    icon: RotateCcw,
    title: "Easy Returns",
    description:
      "Not happy with your purchase? Contact us within 7 days of delivery. We'll arrange a hassle-free return or exchange at no extra cost.",
  },
  {
    icon: Shield,
    title: "Quality Guarantee",
    description:
      "Every piece is quality-checked before dispatch. If you receive a damaged item, share a photo within 48 hours and we'll ship a replacement immediately.",
  },
];

const faqs = [
  {
    q: "How long does delivery take?",
    a: "Standard delivery takes 7-10 days. Express delivery (available at checkout) takes 3-5 business days.",
  },
  {
    q: "Can I track my order?",
    a: "Yes! Once shipped, you'll receive an email/SMS with a tracking link.",
  },
  {
    q: "What if my item arrives damaged?",
    a: "Contact us within 48 hours with photos. We'll replace or refund the item at no extra cost.",
  },
  {
    q: "Do you ship internationally?",
    a: "Currently we ship within India only. International shipping is coming soon!",
  },
];

const ShippingReturnsPage = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-20 lg:pt-24">
        {/* Hero */}
        <section className="bg-muted/30 py-12 lg:py-16">
          <div className="container mx-auto px-6 lg:px-12 text-center">
            <p className="text-xs tracking-[0.3em] uppercase text-champagne mb-3">
              Policies
            </p>
            <h1 className="font-heading text-3xl lg:text-5xl mb-3">
              Shipping &amp; Returns
            </h1>
            <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
              <Link to="/" className="hover:text-foreground transition-colors">
                Home
              </Link>
              <span>/</span>
              <span className="text-foreground">Shipping &amp; Returns</span>
            </div>
          </div>
        </section>

        {/* Policy Cards */}
        <section className="container mx-auto px-6 lg:px-12 py-16 lg:py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {policies.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="border border-border p-8 hover:border-champagne transition-colors duration-300"
              >
                <item.icon
                  size={28}
                  strokeWidth={1.2}
                  className="text-champagne mb-4"
                />
                <h3 className="font-heading text-lg mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground font-light leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Shipping FAQ */}
        <section className="bg-muted/20 py-16 lg:py-20">
          <div className="container mx-auto px-6 lg:px-12 max-w-3xl">
            <h2 className="font-heading text-2xl lg:text-3xl text-center mb-10">
              Common Questions
            </h2>
            <div className="space-y-6">
              {faqs.map((faq, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + i * 0.08, duration: 0.4 }}
                  className="border-b border-border pb-6"
                >
                  <h4 className="text-sm font-medium mb-2">{faq.q}</h4>
                  <p className="text-sm text-muted-foreground font-light">
                    {faq.a}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ShippingReturnsPage;
