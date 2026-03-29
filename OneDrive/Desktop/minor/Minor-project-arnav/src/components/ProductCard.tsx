import { Heart, ShoppingBag, Star } from "lucide-react";
import { Link } from "react-router-dom";
import type { Product } from "@/data/products";
import { useCart } from "@/context/CartContext";
import bowKeychain from "@/assets/bow-keychain.jpg";
import pastelTulips from "@/assets/pastel-tulips.jpg";
import lilyValleyHanging from "@/assets/lily-valley-hanging.jpg";
import jellyfishKeychains from "@/assets/jellyfish-keychains.jpg";
import lilyFlowers from "@/assets/lily-flowers.jpg";
import crochetTulips from "@/assets/crochet-tulips.jpg";
import pinkLilyBouquet from "@/assets/pink-lily-bouquet.jpg";
import lilyBouquetWrapped from "@/assets/lily-bouquet-wrapped.jpg";
import catBracelets from "@/assets/cat-bracelets.jpg";
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
  "craftsmanship": craftsmanship,
  "hero-collection": heroCollection,
};

export const getProductImage = (imageKey: string): string => {
  return imageMap[imageKey] || bowKeychain;
};

const ProductCard = ({ product }: { product: Product }) => {
  const { addToCart, toggleWishlist, isWishlisted } = useCart();
  const img = getProductImage(product.image);
  const wishlisted = isWishlisted(product.id);

  return (
    <div className="product-card group flex flex-col bg-background hover:shadow-xl hover:shadow-black/5 hover:-translate-y-1 transition-all duration-500 rounded-sm overflow-hidden border border-transparent hover:border-border/50">
      <Link to={`/product/${product.id}`} className="block relative">
        <div className="product-card-image aspect-[4/5] w-full bg-muted/30 relative overflow-hidden">
          <img
            src={img}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
            width={400}
            height={400}
          />
          {product.badge && (
            <span className="absolute top-3 left-3 bg-champagne text-foreground text-[10px] tracking-[0.15em] uppercase px-3 py-1">
              {product.badge}
            </span>
          )}
          <div className="absolute inset-x-0 bottom-3 px-3 flex justify-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0 z-10">
            <button
              onClick={(e) => {
                e.preventDefault();
                toggleWishlist(product.id);
              }}
              className={`w-10 h-10 backdrop-blur-sm flex items-center justify-center transition-colors shadow-sm ${
                wishlisted ? "bg-champagne text-foreground" : "bg-background/95 hover:bg-champagne hover:text-foreground"
              }`}
              aria-label="Toggle wishlist"
            >
              <Heart size={16} strokeWidth={1.5} fill={wishlisted ? "currentColor" : "none"} />
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                addToCart(product);
              }}
              className="flex-1 bg-background/95 backdrop-blur-sm shadow-sm flex items-center justify-center gap-2 text-[10px] tracking-[0.1em] uppercase hover:bg-champagne hover:text-foreground transition-colors"
              aria-label="Add to cart"
            >
              <ShoppingBag size={14} strokeWidth={1.5} />
              Add to Cart
            </button>
          </div>
        </div>
      </Link>

      <div className="p-4 space-y-2">
        <Link to={`/product/${product.id}`}>
          <h3 className="text-sm font-medium tracking-wide group-hover:text-champagne transition-colors line-clamp-1">
            {product.name}
          </h3>
        </Link>
        <div className="flex items-center gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              size={10}
              className={i < Math.floor(product.rating) ? "text-champagne fill-champagne" : "text-border"}
            />
          ))}
          <span className="text-[10px] text-muted-foreground ml-1">({product.reviews})</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm">₹{product.price.toLocaleString()}</span>
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
