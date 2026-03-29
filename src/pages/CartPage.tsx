import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Minus, Plus, X, ShoppingBag, Tag, CheckCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useCart } from "@/context/CartContext";
import { getProductImage } from "@/components/ProductCard";
import { toast } from "sonner";

/* ── Coupon codes ── */
const VALID_COUPONS: Record<string, { discount: number; label: string }> = {
  MISSDIY10: { discount: 0.1, label: "10% Off — MISSDIY10" },
  WELCOME20: { discount: 0.2, label: "20% Off — WELCOME20" },
};

const CartPage = () => {
  const { cart, updateQty, removeFromCart, cartTotal } = useCart();

  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<{
    code: string;
    discount: number;
    label: string;
  } | null>(null);
  const [couponError, setCouponError] = useState("");

  const subtotal = cartTotal;
  const shipping = subtotal > 500 ? 0 : 49;
  const discountAmount = appliedCoupon
    ? Math.round(subtotal * appliedCoupon.discount)
    : 0;
  const total = subtotal - discountAmount + shipping;

  const handleApplyCoupon = () => {
    const code = couponCode.trim().toUpperCase();
    if (!code) {
      setCouponError("Please enter a coupon code");
      return;
    }
    const coupon = VALID_COUPONS[code];
    if (coupon) {
      setAppliedCoupon({ code, ...coupon });
      setCouponError("");
      toast.success(`Coupon applied! ${coupon.label}`);
    } else {
      setAppliedCoupon(null);
      setCouponError("Invalid coupon code");
      toast.error("Invalid coupon code");
    }
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setCouponCode("");
    setCouponError("");
    toast("Coupon removed");
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-20 lg:pt-24">
        <div className="container mx-auto px-6 lg:px-12 py-12">
          <h1 className="font-heading text-3xl lg:text-4xl mb-2">Shopping Bag</h1>
          <p className="text-sm text-muted-foreground font-light mb-10">
            {cart.length} {cart.length === 1 ? "item" : "items"}
          </p>

          {cart.length === 0 ? (
            <div className="text-center py-20">
              <ShoppingBag size={48} className="mx-auto text-muted-foreground mb-4" strokeWidth={1} />
              <p className="text-muted-foreground font-light mb-6">Your bag is empty</p>
              <Link to="/" className="luxury-btn">Continue Shopping</Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2 space-y-6">
                {cart.map((item) => {
                  const img = getProductImage(item.product.image);
                  return (
                    <motion.div
                      key={item.product.id}
                      layout
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex gap-4 lg:gap-6 pb-6 border-b border-border"
                    >
                      <Link to={`/product/${item.product.id}`} className="w-24 h-32 lg:w-32 lg:h-40 flex-shrink-0 overflow-hidden bg-muted">
                        <img src={img} alt={item.product.name} className="w-full h-full object-cover" loading="lazy" />
                      </Link>
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-start">
                            <Link to={`/product/${item.product.id}`} className="text-sm hover:text-champagne transition-colors">
                              {item.product.name}
                            </Link>
                            <button onClick={() => removeFromCart(item.product.id)} className="text-muted-foreground hover:text-foreground transition-colors" aria-label="Remove">
                              <X size={16} strokeWidth={1.5} />
                            </button>
                          </div>
                          <p className="text-xs text-muted-foreground mt-1 font-light">{item.product.category}</p>
                        </div>
                        <div className="flex items-center justify-between mt-4">
                          <div className="flex items-center border border-border">
                            <button onClick={() => updateQty(item.product.id, item.qty - 1)} className="w-8 h-8 flex items-center justify-center hover:bg-muted transition-colors">
                              <Minus size={12} strokeWidth={1.5} />
                            </button>
                            <span className="w-8 h-8 flex items-center justify-center text-xs border-x border-border">{item.qty}</span>
                            <button onClick={() => updateQty(item.product.id, item.qty + 1)} className="w-8 h-8 flex items-center justify-center hover:bg-muted transition-colors">
                              <Plus size={12} strokeWidth={1.5} />
                            </button>
                          </div>
                          <span className="text-sm">₹{(item.product.price * item.qty).toLocaleString()}</span>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              <div className="lg:col-span-1">
                <div className="border border-border p-6 lg:p-8 sticky top-24">
                  <h2 className="text-xs tracking-[0.2em] uppercase mb-6">Order Summary</h2>
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between text-sm font-light">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span>₹{subtotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm font-light">
                      <span className="text-muted-foreground">Shipping</span>
                      <span>{shipping === 0 ? "Free" : `₹${shipping}`}</span>
                    </div>
                    {appliedCoupon && (
                      <div className="flex justify-between text-sm font-light text-green-600">
                        <span className="flex items-center gap-1">
                          <Tag size={12} />
                          Discount ({appliedCoupon.code})
                        </span>
                        <span>-₹{discountAmount.toLocaleString()}</span>
                      </div>
                    )}
                  </div>

                  {/* Coupon code input */}
                  <div className="mb-6 border-b border-border pb-6">
                    <p className="text-xs tracking-[0.1em] uppercase mb-3 text-muted-foreground">Discount Code</p>
                    {appliedCoupon ? (
                      <div className="flex items-center justify-between bg-green-50 border border-green-200 px-3 py-2 rounded-sm">
                        <span className="flex items-center gap-2 text-xs text-green-700">
                          <CheckCircle size={14} />
                          {appliedCoupon.label}
                        </span>
                        <button
                          onClick={handleRemoveCoupon}
                          className="text-xs text-red-500 hover:text-red-700 uppercase tracking-[0.1em] transition-colors"
                        >
                          Remove
                        </button>
                      </div>
                    ) : (
                      <>
                        <div className="flex items-center gap-2">
                          <input
                            type="text"
                            value={couponCode}
                            onChange={(e) => {
                              setCouponCode(e.target.value);
                              setCouponError("");
                            }}
                            onKeyDown={(e) => e.key === "Enter" && handleApplyCoupon()}
                            placeholder="e.g. MISSDIY10"
                            className="w-full bg-transparent border border-border px-3 py-2 text-xs outline-none focus:border-foreground transition-colors placeholder:text-muted-foreground/50"
                          />
                          <button
                            onClick={handleApplyCoupon}
                            className="bg-foreground text-background px-4 py-2 text-xs tracking-[0.1em] uppercase hover:bg-champagne hover:text-foreground transition-colors whitespace-nowrap"
                          >
                            Apply
                          </button>
                        </div>
                        {couponError && (
                          <p className="text-xs text-red-500 mt-2">{couponError}</p>
                        )}
                      </>
                    )}
                  </div>

                  <div className="mb-6 bg-muted/20 p-4 border border-border/50 text-center">
                    <p className="text-xs tracking-[0.1em] uppercase mb-1">Estimated Delivery</p>
                    <p className="text-sm font-light text-muted-foreground">Expected delivery: 7-10 days</p>
                  </div>
                  <div className="border-t border-border pt-4 mb-8">
                    <div className="flex justify-between">
                      <span className="text-sm">Total</span>
                      <span className="text-lg">₹{total.toLocaleString()}</span>
                    </div>
                  </div>
                  <button className="luxury-btn w-full justify-center mb-3">
                    Proceed to Checkout
                  </button>
                  <Link to="/" className="block text-center text-xs text-muted-foreground hover:text-foreground transition-colors tracking-[0.1em] uppercase">
                    Continue Shopping
                  </Link>

                  <div className="mt-8 pt-6 border-t border-border">
                    <p className="text-[10px] text-muted-foreground text-center mb-3">Secure Payment Options</p>
                    <div className="flex justify-center gap-4 text-[10px] text-muted-foreground tracking-[0.1em] uppercase">
                      <span>UPI</span>
                      <span>Cards</span>
                      <span>Wallets</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CartPage;
