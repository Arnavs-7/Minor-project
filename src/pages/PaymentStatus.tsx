import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle, XCircle, Clock, ArrowLeft, ShoppingBag } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useStore } from "@/hooks/useStore";

const PaymentStatus = () => {
  const [searchParams] = useSearchParams();
  const { clearCart } = useStore();
  const [cleared, setCleared] = useState(false);

  const status = searchParams.get("status") || "error";
  const message = decodeURIComponent(searchParams.get("message") || "");
  const orderId = searchParams.get("orderId") || "";
  const txnId = searchParams.get("txnId") || "";
  const amount = searchParams.get("amount") || "";

  // Clear cart on successful payment (only once)
  useEffect(() => {
    if (status === "success" && !cleared) {
      clearCart();
      setCleared(true);
    }
  }, [status, cleared, clearCart]);

  const statusConfig = {
    success: {
      icon: CheckCircle,
      color: "text-emerald-500",
      bg: "bg-emerald-50",
      border: "border-emerald-200",
      title: "Payment Successful! 🎉",
      subtitle: "Your order has been placed successfully.",
    },
    failure: {
      icon: XCircle,
      color: "text-red-500",
      bg: "bg-red-50",
      border: "border-red-200",
      title: "Payment Failed",
      subtitle: "Your payment could not be processed.",
    },
    pending: {
      icon: Clock,
      color: "text-amber-500",
      bg: "bg-amber-50",
      border: "border-amber-200",
      title: "Payment Pending",
      subtitle: "Your payment is being processed. Please wait.",
    },
    error: {
      icon: XCircle,
      color: "text-red-500",
      bg: "bg-red-50",
      border: "border-red-200",
      title: "Something Went Wrong",
      subtitle: "An error occurred while processing your payment.",
    },
  };

  const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.error;
  const Icon = config.icon;

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-20 lg:pt-24">
        <div className="container mx-auto px-4 lg:px-12 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-lg mx-auto text-center"
          >
            {/* Status Icon */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", duration: 0.6, delay: 0.2 }}
              className={`w-20 h-20 rounded-full ${config.bg} ${config.border} border-2 flex items-center justify-center mx-auto mb-6`}
            >
              <Icon size={40} className={config.color} strokeWidth={1.5} />
            </motion.div>

            {/* Title */}
            <h1 className="font-heading text-2xl lg:text-3xl mb-2">{config.title}</h1>
            <p className="text-sm text-muted-foreground font-light mb-8">{config.subtitle}</p>

            {/* Order Details */}
            {orderId && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className={`${config.bg} ${config.border} border rounded-2xl p-6 mb-8 text-left`}
              >
                <h2 className="text-xs tracking-[0.2em] uppercase mb-4 font-semibold text-center">
                  Order Details
                </h2>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground font-light">Order ID</span>
                    <span className="font-mono text-xs">{orderId}</span>
                  </div>
                  {txnId && (
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground font-light">Transaction ID</span>
                      <span className="font-mono text-xs">{txnId}</span>
                    </div>
                  )}
                  {amount && (
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground font-light">Amount</span>
                      <span className="font-semibold">₹{parseFloat(amount).toLocaleString()}</span>
                    </div>
                  )}
                  {message && (
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground font-light">Status</span>
                      <span className="font-medium capitalize">{message}</span>
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                to="/"
                className="craft-btn justify-center inline-flex items-center gap-2"
              >
                <ShoppingBag size={16} />
                Continue Shopping
              </Link>
              {status !== "success" && (
                <Link
                  to="/cart"
                  className="inline-flex items-center gap-2 justify-center px-6 py-3 rounded-xl border border-border text-sm font-medium hover:bg-muted transition-colors"
                >
                  <ArrowLeft size={16} />
                  Back to Cart
                </Link>
              )}
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PaymentStatus;
