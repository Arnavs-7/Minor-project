import { Link } from "react-router-dom";
import { Instagram } from "lucide-react";

const INSTAGRAM_URL = "https://www.instagram.com/diy_by_nandini?igsh=MWwzeGtvemMxbWVldA==";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-6 lg:px-12 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <h3 className="font-heading text-xl tracking-[0.1em] mb-4">Miss DIY</h3>
            <p className="text-sm text-primary-foreground/60 font-light leading-relaxed mb-6">
              Beautiful handmade creations crafted with love and care.
            </p>
            <div className="flex gap-4">
              <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="text-primary-foreground/60 hover:text-champagne transition-colors" aria-label="Instagram">
                <Instagram size={18} strokeWidth={1.5} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-xs tracking-[0.2em] uppercase mb-4">Shop</h4>
            <div className="space-y-3">
              {[
                { label: "Shop All", path: "/shop" },
                { label: "Keychains", path: "/keychains" },
                { label: "Crochet Flowers", path: "/crochet-flowers" },
                { label: "Bouquets", path: "/flower-bouquet" },
                { label: "Car Hangings", path: "/car-hangings" },
                { label: "Fuzzywire", path: "/fuzzywire-flowers" },
                { label: "Bracelets", path: "/bracelets" },
                { label: "Lippan Art", path: "/lippan-art" },
              ].map((item) => (
                <Link key={item.label} to={item.path} className="block text-sm text-primary-foreground/60 hover:text-champagne transition-colors font-light">
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-xs tracking-[0.2em] uppercase mb-4">Help</h4>
            <div className="space-y-3">
              {[
                { label: "Delivery & Returns", path: "/shipping-returns" },
                { label: "Care Instructions", path: "/care-instructions" },
                { label: "Custom Orders", path: "/custom-orders" },
                { label: "Track Order", path: "/track-order" },
                { label: "FAQ", path: "/faq" },
                { label: "Contact Us", path: "/contact" },
              ].map((item) => (
                <Link key={item.label} to={item.path} className="block text-sm text-primary-foreground/60 hover:text-champagne transition-colors font-light">
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-xs tracking-[0.2em] uppercase mb-4">About</h4>
            <div className="space-y-3">
              {["Our Story", "Craftsmanship", "Sustainability", "Press"].map((item) => (
                <a key={item} href="#" className="block text-sm text-primary-foreground/60 hover:text-champagne transition-colors font-light">
                  {item}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-primary-foreground/40">© 2026 Miss DIY. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="text-xs text-primary-foreground/40 hover:text-champagne transition-colors">Privacy Policy</a>
            <a href="#" className="text-xs text-primary-foreground/40 hover:text-champagne transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
