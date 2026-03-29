import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import heroImg from "@/assets/hero-collection.jpg"; // Re-using a nice image

const FlashSaleBanner = () => {
  return (
    <section className="container mx-auto px-6 lg:px-12 py-12 lg:py-16">
      <div className="relative w-full overflow-hidden bg-foreground text-background flex flex-col md:flex-row items-center min-h-[400px]">
        {/* Background Image Wrapper */}
        <div className="absolute inset-0 md:relative md:w-1/2 h-full opacity-40 md:opacity-100">
          <img 
            src={heroImg} 
            alt="Flash Sale Banner" 
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Content Wrapper */}
        <div className="relative z-10 w-full md:w-1/2 p-8 lg:p-16 flex flex-col justify-center items-center md:items-start text-center md:text-left h-full">
          <span className="text-xs tracking-[0.3em] uppercase text-champagne mb-4">Limited Time Offer</span>
          <h2 className="font-heading text-4xl lg:text-5xl mb-6">End of Season Sale</h2>
          <p className="font-light text-muted-foreground/80 mb-8 max-w-sm">
            Elevate your lifestyle with our premium handcrafted collection. Get up to 40% off on selected items.
          </p>
          <div className="flex items-center gap-4 mb-8">
            <div className="flex flex-col items-center p-3 border border-border/30 bg-background/5 backdrop-blur-sm">
              <span className="text-xl font-heading">02</span>
              <span className="text-[10px] tracking-[0.1em] uppercase text-champagne">Days</span>
            </div>
            <div className="flex flex-col items-center p-3 border border-border/30 bg-background/5 backdrop-blur-sm">
              <span className="text-xl font-heading">15</span>
              <span className="text-[10px] tracking-[0.1em] uppercase text-champagne">Hours</span>
            </div>
            <div className="flex flex-col items-center p-3 border border-border/30 bg-background/5 backdrop-blur-sm">
              <span className="text-xl font-heading">45</span>
              <span className="text-[10px] tracking-[0.1em] uppercase text-champagne">Mins</span>
            </div>
          </div>
          <Link to="/shop" className="bg-background text-foreground hover:bg-champagne hover:text-foreground transition-colors px-8 py-3 tracking-[0.15em] uppercase text-xs flex items-center gap-2 group">
            Shop the Sale
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FlashSaleBanner;
