import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Loader2, Shield, Lock } from "lucide-react";
import { useStore } from "@/hooks/useStore";
import { useSession } from "@/hooks/useAuth";

declare global {
  interface Window {
    Razorpay: any;
  }
}

interface RazorpayCheckoutProps {
  amount: number;
  disabled?: boolean;
}

const RazorpayCheckout = ({ amount, disabled }: RazorpayCheckoutProps) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { cartItems, clearCart } = useStore();
  const { status } = useSession();
  const navigate = useNavigate();

  const loadRazorpayScript = (): Promise<boolean> => {
    return new Promise((resolve) => {
      if (document.getElementById("razorpay-js")) {
        resolve(true);
        return;
      }
      const script = document.createElement("script");
      script.id = "razorpay-js";
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    // Authentication Guard
    if (status === "unauthenticated") {
      navigate("/login");
      return;
    }

    if (disabled || loading || cartItems.length === 0) return;

    setLoading(true);
    setError(null);

    try {
      const isLoaded = await loadRazorpayScript();
      if (!isLoaded) {
        throw new Error("Razorpay SDK failed to load. Are you online?");
      }

      // 1. Create Order on Backend
      const orderRes = await fetch("/api/payment/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: amount.toFixed(2), currency: "INR" }),
      });

      if (!orderRes.ok) throw new Error("Could not initialize order");
      const order = await orderRes.json();

      // 2. Configure Razorpay Options
      const options = {
        key: process.env.VITE_RAZORPAY_KEY_ID || "PLACEHOLDER_KEY_ID", 
        amount: order.amount,
        currency: order.currency,
        name: "MS DIY",
        description: "Handcrafted Jewelry & Crochet",
        order_id: order.id,
        handler: async function (response: any) {
          try {
            // 3. Verify Payment
            const verifyRes = await fetch("/api/payment/verify", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              }),
            });

            if (verifyRes.ok) {
              clearCart();
              navigate(`/payment-status?status=success&orderId=${response.razorpay_order_id}`);
            } else {
              navigate("/payment-status?status=failure");
            }
          } catch (err) {
            navigate("/payment-status?status=error");
          }
        },
        prefill: {
          name: "Guest", // Will hook into session data later
          email: "customer@msdiy.com",
          contact: "9999999999",
        },
        theme: {
          color: "#D4AF37", // Elegant Gold theme
        },
      };

      const razorpayInstance = new window.Razorpay(options);
      razorpayInstance.on("payment.failed", function (response: any) {
        setError(response.error.description || "Payment failed.");
      });
      razorpayInstance.open();

    } catch (err: any) {
      setError(err.message || "Payment initiation failed");
    } finally {
      setLoading(false);
    }
  };

  // Condition 1: User needs to log in
  if (status === "unauthenticated") {
    return (
      <button
        onClick={() => navigate("/login")}
        className="w-full bg-stone-900 text-white hover:bg-stone-800 transition-colors py-4 rounded-xl text-sm font-bold tracking-widest uppercase flex items-center justify-center gap-2"
      >
        <Lock size={16} />
        Login to Proceed
      </button>
    );
  }

  // Condition 2: Ready to Pay
  return (
    <div className="space-y-3">
      <motion.button
        whileHover={{ scale: disabled || loading ? 1 : 1.01 }}
        whileTap={{ scale: disabled || loading ? 1 : 0.98 }}
        onClick={handlePayment}
        disabled={disabled || loading || cartItems.length === 0}
        className="w-full bg-[#D4AF37] hover:bg-[#b5932a] text-white py-4 rounded-xl text-sm font-bold tracking-[0.15em] uppercase transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
      >
        {loading ? (
          <><Loader2 size={16} className="animate-spin" /> Preparing...</>
        ) : (
          <><Shield size={16} /> Pay ₹{amount.toLocaleString()}</>
        )}
      </motion.button>
      
      {error && (
        <p className="text-xs text-red-500 text-center">{error}</p>
      )}
    </div>
  );
};

export default RazorpayCheckout;
