import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { StoreProvider } from "@/hooks/useStore";
import Index from "./pages/Index.tsx";
import ProductPage from "./pages/ProductPage.tsx";
import CartPage from "./pages/CartPage.tsx";
import PaymentStatus from "./pages/PaymentStatus.tsx";
import ContactPage from "./pages/ContactPage.tsx";
import RefundPolicyPage from "./pages/RefundPolicyPage.tsx";
import ShippingPolicyPage from "./pages/ShippingPolicyPage.tsx";
import TermsPage from "./pages/TermsPage.tsx";
import AuthPage from "./pages/AuthPage.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <StoreProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/product/:id" element={<ProductPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/payment-status" element={<PaymentStatus />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/refund-policy" element={<RefundPolicyPage />} />
            <Route path="/shipping-policy" element={<ShippingPolicyPage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </StoreProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
