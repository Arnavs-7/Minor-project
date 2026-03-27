import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react";
import type { Product } from "@/data/products";

/* ── Types ─────────────────────────────────────────────── */
export interface CartItem extends Product {
  qty: number;
}

interface StoreContextValue {
  /* cart */
  cartItems: CartItem[];
  cartCount: number;
  addToCart: (product: Product, qty?: number) => void;
  removeFromCart: (id: string) => void;
  updateQty: (id: string, delta: number) => void;
  clearCart: () => void;
  /* wishlist */
  wishlistItems: Product[];
  toggleWishlist: (product: Product) => void;
  isWishlisted: (id: string) => boolean;
}

const StoreContext = createContext<StoreContextValue | null>(null);

/* ── Helpers ───────────────────────────────────────────── */
function loadJSON<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

/* ── Provider ──────────────────────────────────────────── */
export function StoreProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => loadJSON("ms-diy-cart", []));
  const [wishlistItems, setWishlistItems] = useState<Product[]>(() => loadJSON("ms-diy-wishlist", []));

  // Persist to localStorage
  useEffect(() => { localStorage.setItem("ms-diy-cart", JSON.stringify(cartItems)); }, [cartItems]);
  useEffect(() => { localStorage.setItem("ms-diy-wishlist", JSON.stringify(wishlistItems)); }, [wishlistItems]);

  const cartCount = cartItems.reduce((sum, i) => sum + i.qty, 0);

  const addToCart = useCallback((product: Product, qty = 1) => {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      if (existing) {
        return prev.map((i) => (i.id === product.id ? { ...i, qty: i.qty + qty } : i));
      }
      return [...prev, { ...product, qty }];
    });
  }, []);

  const removeFromCart = useCallback((id: string) => {
    setCartItems((prev) => prev.filter((i) => i.id !== id));
  }, []);

  const updateQty = useCallback((id: string, delta: number) => {
    setCartItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, qty: Math.max(1, i.qty + delta) } : i))
    );
  }, []);

  const clearCart = useCallback(() => setCartItems([]), []);

  const toggleWishlist = useCallback((product: Product) => {
    setWishlistItems((prev) => {
      const exists = prev.find((i) => i.id === product.id);
      if (exists) return prev.filter((i) => i.id !== product.id);
      return [...prev, product];
    });
  }, []);

  const isWishlisted = useCallback(
    (id: string) => wishlistItems.some((i) => i.id === id),
    [wishlistItems]
  );

  return (
    <StoreContext.Provider
      value={{ cartItems, cartCount, addToCart, removeFromCart, updateQty, clearCart, wishlistItems, toggleWishlist, isWishlisted }}
    >
      {children}
    </StoreContext.Provider>
  );
}

/* ── Hook ──────────────────────────────────────────────── */
export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used within StoreProvider");
  return ctx;
}
