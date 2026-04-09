import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Instagram, Send } from "lucide-react";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const INSTAGRAM_URL =
  "https://www.instagram.com/diy_by_nandini?igsh=MWwzeGtvemMxbWVldA==";

const ContactPage = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email.includes("@") || form.message.length < 20) {
      toast.error("Please fill all fields correctly. Message must be at least 20 chars.");
      return;
    }
    setSubmitting(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Failed to send message");
      toast.success("Message sent! We'll get back to you shortly.");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      toast.error("Failed to send message. Please try again later.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-20 lg:pt-24">
        {/* Hero */}
        <section className="bg-muted/30 py-12 lg:py-16">
          <div className="container mx-auto px-6 lg:px-12 text-center">
            <p className="text-xs tracking-[0.3em] uppercase text-champagne mb-3">
              Get In Touch
            </p>
            <h1 className="font-heading text-3xl lg:text-5xl mb-3">
              Contact Us
            </h1>
            <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
              <Link to="/" className="hover:text-foreground transition-colors">
                Home
              </Link>
              <span>/</span>
              <span className="text-foreground">Contact</span>
            </div>
          </div>
        </section>

        <section className="container mx-auto px-6 lg:px-12 py-12 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-2 space-y-8"
            >
              <div>
                <h2 className="font-heading text-xl lg:text-2xl mb-4">
                  We'd Love to Hear From You
                </h2>
                <p className="text-sm text-muted-foreground font-light leading-relaxed">
                  Have a question, feedback, or want to place a custom order?
                  Drop us a message and we'll respond within 24 hours.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-muted/50 flex items-center justify-center shrink-0">
                    <Mail size={16} strokeWidth={1.5} className="text-champagne" />
                  </div>
                  <div>
                    <p className="text-xs tracking-[0.15em] uppercase text-muted-foreground mb-1">
                      Email
                    </p>
                    <a
                      href="mailto:gharewalnandini@gmail.com"
                      className="text-sm hover:text-champagne transition-colors"
                    >
                      gharewalnandini@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-muted/50 flex items-center justify-center shrink-0">
                    <Phone size={16} strokeWidth={1.5} className="text-champagne" />
                  </div>
                  <div>
                    <p className="text-xs tracking-[0.15em] uppercase text-muted-foreground mb-1">
                      Phone
                    </p>
                    <a
                      href="tel:+918878298511"
                      className="text-sm hover:text-champagne transition-colors"
                    >
                      +91 8878298511
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-muted/50 flex items-center justify-center shrink-0">
                    <Instagram
                      size={16}
                      strokeWidth={1.5}
                      className="text-champagne"
                    />
                  </div>
                  <div>
                    <p className="text-xs tracking-[0.15em] uppercase text-muted-foreground mb-1">
                      Instagram
                    </p>
                    <a
                      href={INSTAGRAM_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm hover:text-champagne transition-colors"
                    >
                      @diy_by_nandini
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-muted/50 flex items-center justify-center shrink-0">
                    <MapPin
                      size={16}
                      strokeWidth={1.5}
                      className="text-champagne"
                    />
                  </div>
                  <div>
                    <p className="text-xs tracking-[0.15em] uppercase text-muted-foreground mb-1">
                      Located In
                    </p>
                    <address className="text-sm not-italic font-light leading-relaxed">
                      14 Pancham Ki Fail,<br />
                      Indore, Madhya Pradesh - 452003
                    </address>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="lg:col-span-3"
            >
              <form
                onSubmit={handleSubmit}
                className="border border-border p-8 lg:p-10 space-y-6"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="block text-xs tracking-[0.15em] uppercase text-muted-foreground mb-2"
                    >
                      Name
                    </label>
                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      required
                      value={form.name}
                      onChange={handleChange}
                      className="w-full border border-border bg-transparent px-4 py-3 text-sm font-light focus:border-champagne focus:outline-none transition-colors"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="contact-email"
                      className="block text-xs tracking-[0.15em] uppercase text-muted-foreground mb-2"
                    >
                      Email
                    </label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      required
                      value={form.email}
                      onChange={handleChange}
                      className="w-full border border-border bg-transparent px-4 py-3 text-sm font-light focus:border-champagne focus:outline-none transition-colors"
                      placeholder="you@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="contact-subject"
                    className="block text-xs tracking-[0.15em] uppercase text-muted-foreground mb-2"
                  >
                    Subject
                  </label>
                  <select
                    id="contact-subject"
                    name="subject"
                    required
                    value={form.subject}
                    onChange={handleChange}
                    className="w-full border border-border bg-transparent px-4 py-3 text-sm font-light focus:border-champagne focus:outline-none transition-colors"
                  >
                    <option value="" disabled>
                      Select a topic
                    </option>
                    <option value="general">General Enquiry</option>
                    <option value="custom">Custom Order</option>
                    <option value="order">Order Issue</option>
                    <option value="feedback">Feedback</option>
                    <option value="collaboration">Collaboration</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="contact-message"
                    className="block text-xs tracking-[0.15em] uppercase text-muted-foreground mb-2"
                  >
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    required
                    rows={5}
                    value={form.message}
                    onChange={handleChange}
                    className="w-full border border-border bg-transparent px-4 py-3 text-sm font-light focus:border-champagne focus:outline-none transition-colors resize-none"
                    placeholder="Tell us what's on your mind..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="luxury-btn w-full sm:w-auto flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submitting ? (
                    "Sending..."
                  ) : (
                    <>
                      <Send size={14} strokeWidth={1.5} />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ContactPage;
