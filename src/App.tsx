import { Suspense, lazy } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { CartProvider } from "@/context/CartContext";
import { AuthProvider } from "@/context/AuthContext";

/* ── Eager loads (critical path) ── */
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

/* ── Lazy loads (non-critical pages) ── */
const ShopPage = lazy(() => import("./pages/ShopPage"));
const ProductPage = lazy(() => import("./pages/ProductPage"));
const CartPage = lazy(() => import("./pages/CartPage"));
const WishlistPage = lazy(() => import("./pages/WishlistPage"));
const ShippingReturnsPage = lazy(() => import("./pages/ShippingReturnsPage"));
const CareInstructionsPage = lazy(() => import("./pages/CareInstructionsPage"));
const CustomOrdersPage = lazy(() => import("./pages/CustomOrdersPage"));
const FAQPage = lazy(() => import("./pages/FAQPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const AccountPage = lazy(() => import("./pages/AccountPage"));
const TrackOrderPage = lazy(() => import("./pages/TrackOrderPage"));

const queryClient = new QueryClient();

/* ── Loading Fallback ── */
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="text-center space-y-3">
      <div className="w-8 h-8 border border-champagne border-t-transparent rounded-full animate-spin mx-auto" />
      <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground">Loading</p>
    </div>
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <CartProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<Index />} />

              {/* Shop & Categories */}
              <Route path="/shop" element={<ShopPage />} />
              <Route path="/keychains" element={<ShopPage />} />
              <Route path="/crochet-flowers" element={<ShopPage />} />
              <Route path="/flower-bouquet" element={<ShopPage />} />
              <Route path="/car-hangings" element={<ShopPage />} />
              <Route path="/fuzzywire-flowers" element={<ShopPage />} />
              <Route path="/fuzzywire-bouquet" element={<ShopPage />} />
              <Route path="/flower-pots" element={<ShopPage />} />
              <Route path="/bracelets" element={<ShopPage />} />
              <Route path="/phone-charms" element={<ShopPage />} />
              <Route path="/lippan-art" element={<ShopPage />} />

              {/* Product Detail */}
              <Route path="/product/:id" element={<ProductPage />} />

              {/* Cart & Wishlist */}
              <Route path="/cart" element={<CartPage />} />
              <Route path="/wishlist" element={<WishlistPage />} />
              <Route path="/account" element={<AccountPage />} />

              {/* Info Pages */}
              <Route path="/shipping-returns" element={<ShippingReturnsPage />} />
              <Route path="/care-instructions" element={<CareInstructionsPage />} />
              <Route path="/custom-orders" element={<CustomOrdersPage />} />
              <Route path="/faq" element={<FAQPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/track-order" element={<TrackOrderPage />} />

              {/* 404 */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </TooltipProvider>
        </CartProvider>
      </AuthProvider>
    </QueryClientProvider>
);

export default App;
