import { Heart, ShoppingBag, Star } from "lucide-react";
import { Link } from "react-router-dom";
import type { Product } from "@/data/products";
import { useStore } from "@/hooks/useStore";
import { toast } from "sonner";

/* ── Image imports ─────────────────────────────────────── */
import bowKeychain from "@/assets/bow-keychain.jpg";
import pastelTulips from "@/assets/pastel-tulips.jpg";
import lilyValleyHanging from "@/assets/lily-valley-hanging.jpg";
import jellyfishKeychains from "@/assets/jellyfish-keychains.jpg";
import lilyFlowers from "@/assets/lily-flowers.jpg";
import crochetTulips from "@/assets/crochet-tulips.jpg";
import pinkLilyBouquet from "@/assets/pink-lily-bouquet.jpg";
import lilyBouquetWrapped from "@/assets/lily-bouquet-wrapped.jpg";
import catBracelets from "@/assets/cat-bracelets.jpg";
import catEarrings from "@/assets/cat-earrings.jpg";
import catNecklaces from "@/assets/cat-necklaces.jpg";
import catRings from "@/assets/cat-rings.jpg";
import craftsmanship from "@/assets/craftsmanship.jpg";
import heroCollection from "@/assets/hero-collection.jpg";

const imageMap: Record<string, string> = {
  "bow-keychain": bowKeychain,
  "pastel-tulips": pastelTulips,
  "lily-valley-hanging": lilyValleyHanging,
  "jellyfish-keychains": jellyfishKeychains,
  "lily-flowers": lilyFlowers,
  "crochet-tulips": crochetTulips,
  "pink-lily-bouquet": pinkLilyBouquet,
  "lily-bouquet-wrapped": lilyBouquetWrapped,
  "cat-bracelets": catBracelets,
  "cat-earrings": catEarrings,
  "cat-necklaces": catNecklaces,
  "cat-rings": catRings,
  "craftsmanship": craftsmanship,
  "hero-collection": heroCollection,
};

export const getProductImage = (imageKey: string): string => {
  return imageMap[imageKey] || bowKeychain;
};

const ProductCard = ({ product }: { product: Product }) => {
  const { addToCart, toggleWishlist, isWishlisted } = useStore();
  const img = getProductImage(product.image);
  const wishlisted = isWishlisted(product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    toast.success(`${product.name} added to cart!`, {
      duration: 2000,
      style: { background: "hsl(28, 50%, 97%)", border: "1px solid hsl(340, 45%, 65%)", color: "hsl(0, 0%, 15%)" },
    });
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
    toast(wishlisted ? "Removed from wishlist" : "Added to wishlist ♥", {
      duration: 1500,
      style: { background: "hsl(28, 50%, 97%)", border: "1px solid hsl(340, 45%, 65%)", color: "hsl(0, 0%, 15%)" },
    });
  };

  return (
    <div className="product-card group" id={`product-${product.id}`}>
      <Link to={`/product/${product.id}`}>
        {/* 1:1 square image */}
        <div className="product-card-image aspect-square relative">
          <img
            src={img}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
            width={400}
            height={400}
          />
          {product.badge && (
            <span className="absolute top-3 left-3 bg-primary text-primary-foreground text-[10px] tracking-[0.12em] uppercase px-3 py-1 rounded-full font-semibold shadow-sm">
              {product.badge}
            </span>
          )}
          {/* Hover overlay with actions */}
          <div className="absolute inset-0 bg-noir/0 group-hover:bg-noir/10 transition-colors duration-300" />
          <div className="absolute bottom-3 left-3 right-3 flex justify-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
            <button
              onClick={handleToggleWishlist}
              className="w-10 h-10 bg-white/90 backdrop-blur-sm flex items-center justify-center rounded-full hover:bg-primary hover:text-white transition-colors shadow-md"
              aria-label="Toggle wishlist"
            >
              <Heart size={16} strokeWidth={1.5} fill={wishlisted ? "currentColor" : "none"} className={wishlisted ? "text-primary" : ""} />
            </button>
            <button
              onClick={handleAddToCart}
              className="w-10 h-10 bg-white/90 backdrop-blur-sm flex items-center justify-center rounded-full hover:bg-primary hover:text-white transition-colors shadow-md"
              aria-label="Add to cart"
            >
              <ShoppingBag size={16} strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </Link>

      <div className="p-4 space-y-2">
        <Link to={`/product/${product.id}`}>
          <h3 className="text-sm font-semibold tracking-wide hover:text-primary transition-colors line-clamp-1">
            {product.name}
          </h3>
        </Link>
        <p className="text-[11px] text-muted-foreground font-medium uppercase tracking-wider">{product.subcategory}</p>
        <div className="flex items-center gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              size={11}
              className={i < Math.floor(product.rating) ? "text-amber-400 fill-amber-400" : "text-border"}
            />
          ))}
          <span className="text-[10px] text-muted-foreground ml-1">({product.reviews})</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-base font-bold text-foreground">₹{product.price.toLocaleString()}</span>
          {product.originalPrice && (
            <span className="text-xs text-muted-foreground line-through">
              ₹{product.originalPrice.toLocaleString()}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
