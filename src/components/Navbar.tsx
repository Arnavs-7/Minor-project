import { useState } from "react";
import { NavLink } from "./NavLink";
import { Link, useNavigate } from "react-router-dom";
import { Heart, ShoppingBag, Menu, X, User, Home, Search, Truck } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import SearchPanel from "./SearchPanel";
import TopAnnouncementBar from "./TopAnnouncementBar";
import { AuthModal } from "./auth/AuthModal";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const { cartCount, wishlistCount } = useCart();
  const { isAuthenticated, isAdmin } = useAuth();
  const navigate = useNavigate();

  const navLinks = [
    { label: "Shop All", href: "/shop" },
    { label: "Keychains", href: "/keychains" },
    { label: "Flowers", href: "/crochet-flowers" },
    { label: "Bouquets", href: "/flower-bouquet" },
    { label: "Car Hangings", href: "/car-hangings" },
    { label: "Bracelets", href: "/bracelets" },
    { label: "Lippan Art", href: "/lippan-art" },
  ];

  const handleUserClick = () => {
    if (isAuthenticated) {
      if (isAdmin) {
        navigate("/admin");
      } else {
        navigate("/account");
      }
    } else {
      setAuthModalOpen(true);
    }
  };

  return (
    <>
      <TopAnnouncementBar />
      <header className="sticky top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border shadow-sm transition-all">
        <nav className="container mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between h-16 lg:h-20">
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden text-foreground"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={20} strokeWidth={1.5} /> : <Menu size={20} strokeWidth={1.5} />}
            </button>

            <Link to="/" className="font-heading text-2xl lg:text-3xl font-bold tracking-[0.15em] hover:opacity-80 transition-opacity uppercase text-foreground">
              Miss DIY
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-6">
              {navLinks.map((link) => (
                <NavLink
                  key={link.label}
                  to={link.href}
                  className="text-xs tracking-[0.15em] uppercase text-muted-foreground hover:text-foreground transition-all duration-300"
                  activeClassName="text-foreground underline underline-offset-4 decoration-champagne font-medium"
                >
                  {link.label}
                </NavLink>
              ))}
            </div>

            {/* Desktop Icons */}
            <div className="hidden lg:flex items-center gap-5">
              <SearchPanel />
              
              {/* Conditional Admin Button */}
              {isAdmin && (
                <Link 
                  to="/admin" 
                  className="bg-noir text-white text-[10px] uppercase tracking-widest px-3 py-1.5 rounded-sm hover:bg-champagne hover:text-noir transition-all"
                >
                  Admin
                </Link>
              )}
              <Link to="/track-order" className="text-foreground hover:text-champagne transition-colors" aria-label="Track Order">
                <Truck size={18} strokeWidth={1.5} />
              </Link>
              <button onClick={handleUserClick} className="text-foreground hover:text-champagne transition-colors" aria-label="Account">
                <User size={18} strokeWidth={1.5} />
              </button>
              <Link to="/wishlist" className="text-foreground hover:text-champagne transition-colors relative" aria-label="Wishlist">
                <Heart size={18} strokeWidth={1.5} />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1.5 -right-2 w-4 h-4 bg-red-400 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </Link>
              <Link to="/cart" className="text-foreground hover:text-champagne transition-colors relative" aria-label="Cart">
                <ShoppingBag size={18} strokeWidth={1.5} />
                {cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-2 w-4 h-4 bg-foreground text-background text-[9px] font-bold rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </nav>

        {/* Mobile Slide-down Menu (optional backup) */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-background border-b border-border overflow-hidden"
            >
              <div className="px-6 py-4 space-y-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.label}
                    to={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="block text-xs tracking-[0.2em] uppercase text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Mobile Bottom Navigation Bar styled like Palmonas */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-t border-border pb-safe">
        <div className="flex justify-around items-center h-16">
          <Link to="/" className="flex flex-col items-center gap-1 text-muted-foreground hover:text-foreground">
            <Home size={20} strokeWidth={1.5} />
            <span className="text-[9px] tracking-[0.1em] uppercase">Home</span>
          </Link>
          <div className="flex flex-col items-center gap-1 text-muted-foreground hover:text-foreground">
            <SearchPanel iconOnly size={20} />
            <span className="text-[9px] tracking-[0.1em] uppercase">Search</span>
          </div>
          <Link to="/wishlist" className="relative flex flex-col items-center gap-1 text-muted-foreground hover:text-foreground">
            <Heart size={20} strokeWidth={1.5} />
            <span className="text-[9px] tracking-[0.1em] uppercase">Wishlist</span>
            {wishlistCount > 0 && (
              <span className="absolute -top-1 right-2 w-3.5 h-3.5 bg-red-400 text-white text-[8px] font-bold rounded-full flex items-center justify-center">
                {wishlistCount}
              </span>
            )}
          </Link>
          <Link to="/cart" className="relative flex flex-col items-center gap-1 text-muted-foreground hover:text-foreground">
            <ShoppingBag size={20} strokeWidth={1.5} />
            <span className="text-[9px] tracking-[0.1em] uppercase">Cart</span>
            {cartCount > 0 && (
              <span className="absolute -top-1 right-3 w-3.5 h-3.5 bg-foreground text-background text-[8px] font-bold rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>
          <button onClick={handleUserClick} className="flex flex-col items-center gap-1 text-muted-foreground hover:text-foreground">
            <User size={20} strokeWidth={1.5} />
            <span className="text-[9px] tracking-[0.1em] uppercase">Account</span>
          </button>
        </div>
      </div>

      <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} />
    </>
  );
};

export default Navbar;
