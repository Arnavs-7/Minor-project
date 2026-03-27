import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Minus, Plus, X, ShoppingBag, ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useStore } from "@/hooks/useStore";
import { getProductImage } from "@/components/ProductCard";

const CartPage = () => {
  const { cartItems, updateQty, removeFromCart } = useStore();

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);
  const shipping = subtotal > 500 ? 0 : 49;
  const total = subtotal + shipping;

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-20 lg:pt-24">
        <div className="container mx-auto px-4 lg:px-12 py-12">
          <div className="flex items-center gap-3 mb-2">
            <Link to="/" className="text-muted-foreground hover:text-primary transition-colors">
              <ArrowLeft size={18} />
            </Link>
            <h1 className="font-heading text-3xl lg:text-4xl">Shopping Bag</h1>
          </div>
          <p className="text-sm text-muted-foreground font-light mb-10 ml-8">{cartItems.length} item{cartItems.length !== 1 ? "s" : ""}</p>

          {cartItems.length === 0 ? (
            <div className="text-center py-20">
              <ShoppingBag size={48} className="mx-auto text-muted-foreground mb-4" strokeWidth={1} />
              <p className="text-muted-foreground font-light mb-6">Your bag is empty</p>
              <Link to="/" className="craft-btn">Continue Shopping</Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2 space-y-6">
                {cartItems.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex gap-4 lg:gap-6 pb-6 border-b border-border rounded-xl"
                  >
                    <Link to={`/product/${item.id}`} className="w-24 h-24 lg:w-28 lg:h-28 flex-shrink-0 overflow-hidden rounded-xl bg-muted">
                      <img src={getProductImage(item.image)} alt={item.name} className="w-full h-full object-cover" loading="lazy" />
                    </Link>
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start">
                          <Link to={`/product/${item.id}`} className="text-sm font-semibold hover:text-primary transition-colors">
                            {item.name}
                          </Link>
                          <button onClick={() => removeFromCart(item.id)} className="text-muted-foreground hover:text-destructive transition-colors p-1" aria-label="Remove">
                            <X size={16} strokeWidth={1.5} />
                          </button>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1 font-light">{item.subcategory}</p>
                      </div>
                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center border border-border rounded-lg overflow-hidden">
                          <button onClick={() => updateQty(item.id, -1)} className="w-8 h-8 flex items-center justify-center hover:bg-muted transition-colors">
                            <Minus size={12} strokeWidth={1.5} />
                          </button>
                          <span className="w-8 h-8 flex items-center justify-center text-xs border-x border-border font-semibold">{item.qty}</span>
                          <button onClick={() => updateQty(item.id, 1)} className="w-8 h-8 flex items-center justify-center hover:bg-muted transition-colors">
                            <Plus size={12} strokeWidth={1.5} />
                          </button>
                        </div>
                        <span className="text-sm font-bold">₹{(item.price * item.qty).toLocaleString()}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="lg:col-span-1">
                <div className="border border-border rounded-2xl p-6 lg:p-8 sticky top-24 bg-white shadow-sm">
                  <h2 className="text-xs tracking-[0.2em] uppercase mb-6 font-semibold">Order Summary</h2>
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between text-sm font-light">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span>₹{subtotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm font-light">
                      <span className="text-muted-foreground">Shipping</span>
                      <span>{shipping === 0 ? "Free" : `₹${shipping}`}</span>
                    </div>
                  </div>
                  <div className="border-t border-border pt-4 mb-8">
                    <div className="flex justify-between">
                      <span className="text-sm font-semibold">Total</span>
                      <span className="text-lg font-bold">₹{total.toLocaleString()}</span>
                    </div>
                  </div>
                  <button className="craft-btn w-full justify-center mb-3">
                    Proceed to Checkout
                  </button>
                  <Link to="/" className="block text-center text-xs text-muted-foreground hover:text-primary transition-colors tracking-[0.1em] uppercase font-medium">
                    Continue Shopping
                  </Link>

                  <div className="mt-8 pt-6 border-t border-border">
                    <p className="text-[10px] text-muted-foreground text-center mb-3">Secure Payment Options</p>
                    <div className="flex justify-center gap-4 text-[10px] text-muted-foreground tracking-[0.1em] uppercase font-medium">
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
