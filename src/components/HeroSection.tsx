import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import heroHighRes1 from "@/assets/hero-highres-1.jpg";
import heroHighRes2 from "@/assets/hero-highres-2.jpg";
import heroHighRes3 from "@/assets/hero-highres-3.jpg";

const slides = [
  {
    image: heroHighRes1,
    subtitle: "Handmade with Love",
    title: "Beautiful Handcrafted Creations by Miss DIY",
    description:
      "Discover crochet flowers, fuzzywire art, bracelets, lippan art, and more — each piece lovingly crafted by hand.",
    cta: "Shop Collection",
    ctaLink: "/shop",
  },
  {
    image: heroHighRes3,
    subtitle: "New Arrivals",
    title: "Explore Our Latest Handmade Collection",
    description:
      "Fresh designs just dropped — keychains, bouquets, car hangings, and more. Find your next favourite piece.",
    cta: "View New Arrivals",
    ctaLink: "/shop",
  },
  {
    image: heroHighRes2,
    subtitle: "Artisan Quality",
    title: "Every Piece Tells a Story",
    description:
      "From lippan art to fuzzywire flowers — each creation is a unique work of art made with premium materials.",
    cta: "Discover Categories",
    ctaLink: "/shop",
  },
];

const AUTOPLAY_INTERVAL = 4000;

const HeroSection = () => {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  const goTo = useCallback(
    (index: number) => {
      setDirection(index > current ? 1 : -1);
      setCurrent(index);
    },
    [current]
  );

  const next = useCallback(() => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % slides.length);
  }, []);

  const prev = useCallback(() => {
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  }, []);

  // Auto-play
  useEffect(() => {
    const timer = setInterval(next, AUTOPLAY_INTERVAL);
    return () => clearInterval(timer);
  }, [next]);

  const slide = slides[current];

  const variants = {
    enter: (dir: number) => ({ x: dir > 0 ? "100%" : "-100%", opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? "-100%" : "100%", opacity: 0 }),
  };

  return (
    <section className="relative h-screen min-h-[600px] flex items-center overflow-hidden">
      {/* Background image carousel */}
      <AnimatePresence initial={false} custom={direction} mode="popLayout">
        <motion.div
          key={current}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
          className="absolute inset-0"
        >
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover object-center"
            width={1920}
            height={1080}
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-noir/70 via-noir/40 to-transparent" />
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className="relative container mx-auto px-6 lg:px-12 z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="max-w-lg"
          >
            <p className="text-xs tracking-[0.3em] uppercase text-champagne mb-4">
              {slide.subtitle}
            </p>
            <h1 className="font-heading text-4xl lg:text-6xl text-ivory mb-6 leading-tight">
              {slide.title}
            </h1>
            <p className="text-ivory/70 text-sm font-light leading-relaxed mb-8 max-w-md">
              {slide.description}
            </p>
            <div className="flex gap-4 flex-wrap">
              <Link
                to={slide.ctaLink}
                className="luxury-btn bg-ivory text-noir hover:bg-champagne"
              >
                {slide.cta}
              </Link>
              <a
                href="#categories"
                className="luxury-btn-outline text-ivory border-ivory/40 hover:border-ivory"
              >
                Explore Categories
              </a>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation arrows */}
      <button
        onClick={prev}
        className="absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center bg-ivory/10 backdrop-blur-sm border border-ivory/20 text-ivory hover:bg-ivory/20 transition-colors rounded-full"
        aria-label="Previous slide"
      >
        <ChevronLeft size={20} strokeWidth={1.5} />
      </button>
      <button
        onClick={next}
        className="absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center bg-ivory/10 backdrop-blur-sm border border-ivory/20 text-ivory hover:bg-ivory/20 transition-colors rounded-full"
        aria-label="Next slide"
      >
        <ChevronRight size={20} strokeWidth={1.5} />
      </button>

      {/* Dot indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex gap-3">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`h-1.5 rounded-full transition-all duration-500 ${
              i === current
                ? "w-8 bg-champagne"
                : "w-4 bg-ivory/40 hover:bg-ivory/60"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSection;
