import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Heart, ShoppingBag, Menu, X, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useStore } from "@/hooks/useStore";
import { useSession, signOut } from "@/hooks/useAuth";
import { categoryDefs } from "@/data/products";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { cartCount, wishlistItems } = useStore();
  const { status, data } = useSession();
  const navigate = useNavigate();

  const handleCategoryClick = (categoryId: string) => {
    setMobileOpen(false);
    // If we're on the homepage, scroll to section; otherwise navigate then scroll
    const el = document.getElementById(categoryId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/");
      setTimeout(() => {
        document.getElementById(categoryId)?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b border-border/50">
      <nav className="container mx-auto px-4 lg:px-12">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden text-foreground p-2 rounded-lg hover:bg-muted transition-colors"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={22} strokeWidth={1.5} /> : <Menu size={22} strokeWidth={1.5} />}
          </button>

          {/* Logo */}
          <Link to="/" className="font-heading text-2xl lg:text-3xl tracking-wide text-foreground">
            <span className="text-primary">MS</span> DIY
          </Link>

          {/* Desktop category nav */}
          <div className="hidden lg:flex items-center gap-6">
            {categoryDefs.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleCategoryClick(cat.id)}
                className="text-xs tracking-[0.15em] uppercase text-muted-foreground hover:text-primary font-medium transition-colors duration-300"
              >
                {cat.title.replace(" Products", "")}
              </button>
            ))}
          </div>

          {/* Right icons */}
          <div className="flex items-center gap-3 lg:gap-5">
            <Link
              to="/"
              className="text-foreground hover:text-primary transition-colors relative"
              aria-label="Wishlist"
              onClick={(e) => {
                e.preventDefault();
                // Wishlist items are shown on homepage; you could make a separate page
              }}
            >
              <Heart size={20} strokeWidth={1.5} />
              {wishlistItems.length > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-primary text-primary-foreground text-[9px] font-bold rounded-full flex items-center justify-center">
                  {wishlistItems.length}
                </span>
              )}
            </Link>
            {status === "authenticated" ? (
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-stone-500 hidden md:inline">
                  {data?.user?.name || "User"}
                </span>
                <button onClick={() => signOut()} className="text-foreground hover:text-red-500 transition-colors cursor-pointer flex items-center gap-1 group" aria-label="Sign Out">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/></svg>
                  <span className="text-[10px] font-bold uppercase tracking-widest hidden md:inline group-hover:text-red-500">Logout</span>
                </button>
              </div>
            ) : (
              <Link to="/login" className="text-foreground hover:text-[#D4AF37] transition-colors cursor-pointer flex items-center gap-1.5" aria-label="Login">
                <User size={18} strokeWidth={1.5} />
                <span className="text-xs font-bold uppercase tracking-wider hidden md:inline">Login</span>
              </Link>
            )}
            <Link to="/cart" className="text-foreground hover:text-primary transition-colors relative" aria-label="Cart">
              <ShoppingBag size={20} strokeWidth={1.5} />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-primary text-primary-foreground text-[9px] font-bold rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-background/95 backdrop-blur-md border-b border-border/50 overflow-hidden"
          >
            <div className="px-6 py-5 space-y-3">
              {categoryDefs.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryClick(cat.id)}
                  className="block w-full text-left text-sm tracking-[0.1em] uppercase text-muted-foreground hover:text-primary font-medium transition-colors py-1"
                >
                  {cat.title.replace(" Products", "")}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
