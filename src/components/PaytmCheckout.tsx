import { useState } from "react";
import { motion } from "framer-motion";
import { Loader2, Shield } from "lucide-react";
import { useStore } from "@/hooks/useStore";

declare global {
  interface Window {
    Paytm?: {
      CheckoutJS: {
        init: (config: Record<string, unknown>) => Promise<void>;
        invoke: () => void;
      };
    };
  }
}

interface PaytmCheckoutProps {
  amount: number;
  disabled?: boolean;
}

const PaytmCheckout = ({ amount, disabled }: PaytmCheckoutProps) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { cartItems } = useStore();

  const generateOrderId = () => {
    return `MSDIY_${Date.now()}_${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
  };

  const loadPaytmScript = (hostname: string, mid: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      // Remove existing script if any
      const existing = document.getElementById("paytm-js");
      if (existing) existing.remove();

      const script = document.createElement("script");
      script.id = "paytm-js";
      script.type = "application/javascript";
      script.src = `https://${hostname}/merchantpgpui/checkoutjs/merchants/${mid}.js`;
      script.crossOrigin = "anonymous";
      script.onload = () => resolve();
      script.onerror = () => reject(new Error("Failed to load Paytm Checkout script"));
      document.head.appendChild(script);
    });
  };

  const handlePayment = async () => {
    if (disabled || loading || cartItems.length === 0) return;

    setLoading(true);
    setError(null);

    const orderId = generateOrderId();
    const customerId = `CUST_${Date.now()}`;

    try {
      // Step 1: Call our backend to initiate the transaction
      const response = await fetch("/api/paytm/initiate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderId,
          amount: amount.toFixed(2),
          customerId,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.txnToken) {
        throw new Error(data.error || "Failed to initiate payment");
      }

      // Step 2: Load the Paytm JS Checkout script
      await loadPaytmScript(data.hostname, data.mid);

      // Step 3: Configure and invoke Paytm Checkout
      const config = {
        root: "",
        flow: "DEFAULT",
        data: {
          orderId: data.orderId,
          token: data.txnToken,
          tokenType: "TXN_TOKEN",
          amount: data.amount,
        },
        handler: {
          notifyMerchant: (eventName: string, data: unknown) => {
            console.log("Paytm event:", eventName, data);
            if (eventName === "APP_CLOSED") {
              setLoading(false);
            }
          },
        },
        merchant: {
          mid: data.mid,
          redirect: true,
        },
      };

      if (window.Paytm?.CheckoutJS) {
        await window.Paytm.CheckoutJS.init(config);
        window.Paytm.CheckoutJS.invoke();
      } else {
        throw new Error("Paytm Checkout failed to initialize");
      }
    } catch (err) {
      console.error("Payment error:", err);
      setError(err instanceof Error ? err.message : "Payment failed. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="space-y-3">
      <motion.button
        whileHover={{ scale: disabled || loading ? 1 : 1.01 }}
        whileTap={{ scale: disabled || loading ? 1 : 0.98 }}
        onClick={handlePayment}
        disabled={disabled || loading || cartItems.length === 0}
        id="paytm-checkout-button"
        className="craft-btn w-full justify-center mb-1 relative overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? (
          <span className="flex items-center gap-2">
            <Loader2 size={16} className="animate-spin" />
            Initiating Payment...
          </span>
        ) : (
          <span className="flex items-center gap-2">
            <Shield size={16} />
            Pay ₹{amount.toLocaleString()} with Paytm
          </span>
        )}
      </motion.button>

      {error && (
        <motion.p
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xs text-red-500 text-center"
        >
          {error}
        </motion.p>
      )}

      <div className="flex items-center justify-center gap-1.5 text-[10px] text-muted-foreground">
        <Shield size={10} />
        <span>Secured by Paytm Payment Gateway</span>
      </div>
    </div>
  );
};

export default PaytmCheckout;
