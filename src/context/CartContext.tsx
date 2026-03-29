import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react";
import type { Product } from "@/data/products";
import { toast } from "sonner";

/* ── Types ── */
export interface CartItem {
  product: Product;
  qty: number;
}

interface CartContextValue {
  cart: CartItem[];
  addToCart: (product: Product, qty?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQty: (productId: string, qty: number) => void;
  clearCart: () => void;
  cartCount: number;
  cartTotal: number;
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isWishlisted: (productId: string) => boolean;
  wishlistCount: number;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

/* ── Helpers ── */
const loadJSON = <T,>(key: string, fallback: T): T => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
};

/* ── Provider ── */
export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>(() => loadJSON("ms-diy-cart", []));
  const [wishlist, setWishlist] = useState<string[]>(() => loadJSON("ms-diy-wishlist", []));

  // Persist cart
  useEffect(() => {
    localStorage.setItem("ms-diy-cart", JSON.stringify(cart));
  }, [cart]);

  // Persist wishlist
  useEffect(() => {
    localStorage.setItem("ms-diy-wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  const addToCart = useCallback((product: Product, qty = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id ? { ...item, qty: item.qty + qty } : item
        );
      }
      return [...prev, { product, qty }];
    });
    toast.success(`${product.name} added to cart`);
  }, []);

  const removeFromCart = useCallback((productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  }, []);

  const updateQty = useCallback((productId: string, qty: number) => {
    if (qty < 1) return;
    setCart((prev) =>
      prev.map((item) => (item.product.id === productId ? { ...item, qty } : item))
    );
  }, []);

  const clearCart = useCallback(() => setCart([]), []);

  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);
  const cartTotal = cart.reduce((sum, item) => sum + item.product.price * item.qty, 0);

  const toggleWishlist = useCallback((productId: string) => {
    setWishlist((prev) => {
      const next = prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId];
      const added = !prev.includes(productId);
      toast(added ? "Added to wishlist" : "Removed from wishlist", {
        icon: added ? "♥" : "♡",
      });
      return next;
    });
  }, []);

  const isWishlisted = useCallback(
    (productId: string) => wishlist.includes(productId),
    [wishlist]
  );

  const wishlistCount = wishlist.length;

  return (
    <CartContext.Provider
      value={{
        cart, addToCart, removeFromCart, updateQty, clearCart,
        cartCount, cartTotal,
        wishlist, toggleWishlist, isWishlisted, wishlistCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextValue => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
};
