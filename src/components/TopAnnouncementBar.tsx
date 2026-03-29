import { useState } from "react";
import { X, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const TopAnnouncementBar = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="bg-foreground text-background relative z-[60] flex items-center justify-center px-4 py-2">
      <Link 
        to="/shop" 
        className="flex items-center gap-2 text-[10px] sm:text-xs tracking-[0.15em] hover:opacity-80 transition-opacity uppercase text-center"
      >
        <Sparkles size={12} className="text-champagne flex-shrink-0 hidden sm:block" />
        <span>✨ Flat 20% OFF on all products | Use code: <strong>WELCOME20</strong></span>
        <Sparkles size={12} className="text-champagne flex-shrink-0 hidden sm:block" />
      </Link>
      
      <button 
        onClick={() => setIsVisible(false)}
        className="absolute right-2 sm:right-4 p-1 opacity-60 hover:opacity-100 transition-opacity"
        aria-label="Close announcement"
      >
        <X size={14} />
      </button>
    </div>
  );
};

export default TopAnnouncementBar;
