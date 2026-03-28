import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const ContactPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-24 pb-16 px-6 lg:px-12 container mx-auto">
        <h1 className="font-heading text-3xl mb-8">Contact Us</h1>
        <div className="bg-foreground/5 p-8 rounded-xl max-w-2xl text-sm font-light leading-relaxed">
          <p className="mb-6">Have questions? We'd love to hear from you.</p>
          
          <div className="space-y-4 mb-8">
            <p><strong>Email:</strong> <span className="text-muted-foreground">{/* TODO: PLACEHOLDER_TEXT - Update with real email */}PLACEHOLDER_TEXT</span></p>
            <p><strong>Phone:</strong> <span className="text-muted-foreground">{/* TODO: PLACEHOLDER_TEXT - Update with real phone */}PLACEHOLDER_TEXT</span></p>
            <p><strong>Address:</strong> <span className="text-muted-foreground">{/* TODO: PLACEHOLDER_TEXT - Update with real address */}PLACEHOLDER_TEXT</span></p>
          </div>

          {/* Placeholder Contact Form */}
          <form className="space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider mb-2">Name</label>
              <input type="text" className="w-full bg-white border border-border p-3 rounded" placeholder="Your Name" />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider mb-2">Email</label>
              <input type="email" className="w-full bg-white border border-border p-3 rounded" placeholder="Your Email" />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider mb-2">Message</label>
              <textarea className="w-full bg-white border border-border p-3 rounded h-32" placeholder="How can we help?"></textarea>
            </div>
            <button type="button" className="craft-btn mt-4">Send Message</button>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ContactPage;
