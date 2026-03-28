import { Link } from "react-router-dom";
import { Instagram } from "lucide-react";
import { categoryDefs } from "@/data/products";

const INSTAGRAM_URL = "https://www.instagram.com/diy_by_nandini?igsh=MWwzeGtvemMxbWVldA==";

const Footer = () => {
  return (
    <footer className="bg-foreground text-white">
      <div className="container mx-auto px-6 lg:px-12 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Brand */}
          <div>
            <h3 className="font-heading text-2xl tracking-wide mb-4">
              <span className="text-primary">MS</span> DIY
            </h3>
            <p className="text-sm text-white/60 leading-relaxed font-light">
              Beautiful handmade crochet, fuzzywire, and craft creations — each piece lovingly crafted by hand.
            </p>
            <div className="flex gap-4 mt-6">
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/60 hover:text-primary transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={20} strokeWidth={1.5} />
              </a>
            </div>
          </div>

          {/* Shop categories */}
          <div>
            <h4 className="text-xs tracking-[0.2em] uppercase mb-4 font-semibold">Shop</h4>
            <div className="space-y-3">
              {categoryDefs.map((cat) => (
                <Link
                  key={cat.id}
                  to="/"
                  onClick={() => {
                    setTimeout(() => {
                      document.getElementById(cat.id)?.scrollIntoView({ behavior: "smooth" });
                    }, 100);
                  }}
                  className="block text-sm text-white/60 hover:text-primary transition-colors font-light"
                >
                  {cat.title}
                </Link>
              ))}
            </div>
          </div>

          {/* Help */}
          <div>
            <h4 className="text-xs tracking-[0.2em] uppercase mb-4 font-semibold">Help</h4>
            <div className="space-y-3">
              {[
                { name: "Shipping Policy", path: "/shipping-policy" }, 
                { name: "Refund Policy", path: "/refund-policy" }, 
                { name: "Care Instructions", path: "#" }, 
                { name: "FAQ", path: "#" }, 
                { name: "Contact Us", path: "/contact" }
              ].map((item) => (
                <Link key={item.name} to={item.path} className="block text-sm text-white/60 hover:text-primary transition-colors font-light">
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          {/* About */}
          <div>
            <h4 className="text-xs tracking-[0.2em] uppercase mb-4 font-semibold">About</h4>
            <div className="space-y-3">
              {["Our Story", "Craftsmanship", "Sustainability"].map((item) => (
                <Link key={item} to="#" className="block text-sm text-white/60 hover:text-primary transition-colors font-light">
                  {item}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-white/40 font-light">
            © 2026 MS DIY. All rights reserved.
          </p>
          <div className="flex gap-6">
            {[
              { name: "Privacy Policy", path: "#" }, 
              { name: "Terms of Service", path: "/terms" }
            ].map((item) => (
              <Link key={item.name} to={item.path} className="text-xs text-white/40 hover:text-primary transition-colors font-light">
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
