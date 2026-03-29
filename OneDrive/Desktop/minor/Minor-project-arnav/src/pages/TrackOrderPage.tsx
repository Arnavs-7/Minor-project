import { useState, FormEvent, useEffect } from "react";
import { Search, Package, Pickaxe, Truck, CheckCircle, PackageOpen } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Mock API Call simulating /api/order/:id
export interface OrderDetails {
  order_id: string;
  status: "Placed" | "Shipped" | "Out for Delivery" | "Delivered";
  tracking_id: string;
  estimated_delivery: string;
}

const fetchOrderDetails = async (id: string): Promise<OrderDetails> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const normalizedId = id.toUpperCase().trim();
      
      if (!normalizedId) {
        reject(new Error("Please enter an Order ID."));
        return;
      }

      if (normalizedId === "ORD-ERROR") {
        reject(new Error("Unable to locate order. Please check the ID and try again."));
        return;
      }

      // Generate a deterministic mock status based on the ID's length to make it variable
      const statuses: OrderDetails["status"][] = ["Placed", "Shipped", "Out for Delivery", "Delivered"];
      const charCodeSum = normalizedId.split("").reduce((sum, char) => sum + char.charCodeAt(0), 0);
      const statusIndex = charCodeSum % statuses.length;

      resolve({
        order_id: normalizedId,
        status: statuses[statusIndex],
        tracking_id: `TRK-${Math.random().toString(36).substring(2, 10).toUpperCase()}`,
        estimated_delivery: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' }),
      });
    }, 1500); // 1.5s simulated network delay
  });
};

const STEPS = [
  { id: "Placed", label: "Order Placed", icon: Package },
  { id: "Shipped", label: "Shipped", icon: PackageOpen },
  { id: "Out for Delivery", label: "Out for Delivery", icon: Truck },
  { id: "Delivered", label: "Delivered", icon: CheckCircle },
];

const TrackOrderPage = () => {
  const [orderId, setOrderId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [order, setOrder] = useState<OrderDetails | null>(null);

  // Set page title
  useEffect(() => {
    document.title = "Track Order | Miss DIY";
  }, []);

  const handleSearch = async (e: FormEvent) => {
    e.preventDefault();
    if (!orderId.trim()) return;

    setLoading(true);
    setError(null);
    setOrder(null);

    try {
      const data = await fetchOrderDetails(orderId);
      setOrder(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch order details.");
    } finally {
      setLoading(false);
    }
  };

  const currentStepIndex = order ? STEPS.findIndex(s => s.id === order.status) : -1;

  return (
    <div className="min-h-screen bg-muted/10 flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-24 lg:pt-32 pb-20">
        <div className="container mx-auto px-6 lg:px-12 max-w-4xl">
          
          <div className="text-center mb-12">
            <h1 className="font-heading text-3xl lg:text-4xl text-foreground mb-4">Track Your Order</h1>
            <p className="text-muted-foreground font-light max-w-lg mx-auto">
              Enter your Order ID below to receive real-time updates on your beautiful handmade creations.
            </p>
          </div>

          <div className="bg-background border border-border p-8 lg:p-12 shadow-sm relative overflow-hidden">
            {/* Search Input UI */}
            <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto mb-10">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} strokeWidth={1.5} />
                <input
                  type="text"
                  placeholder="e.g. ORD-12345"
                  value={orderId}
                  onChange={(e) => setOrderId(e.target.value)}
                  className="w-full bg-transparent border border-border pl-12 pr-4 py-3 text-sm font-light outline-none focus:border-foreground transition-colors placeholder:text-muted-foreground/50"
                  required
                />
              </div>
              <button 
                type="submit" 
                disabled={loading || !orderId.trim()}
                className="bg-foreground text-background px-8 py-3 tracking-[0.1em] uppercase text-xs font-bold hover:bg-champagne hover:text-foreground transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
              >
                {loading ? "Searching..." : "Track"}
              </button>
            </form>

            <AnimatePresence mode="wait">
              {/* Error State */}
              {error && (
                <motion.div 
                  key="error"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="bg-red-50/50 border border-red-100 p-6 text-center"
                >
                  <p className="text-red-400 font-light text-sm">{error}</p>
                </motion.div>
              )}

              {/* Success Result Container */}
              {order && !loading && !error && (
                <motion.div 
                  key="result"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="w-full"
                >
                  {/* Summary Card */}
                  <div className="bg-muted/30 p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border border-border/50 mb-12">
                    <div>
                      <p className="text-xs tracking-[0.1em] uppercase text-muted-foreground mb-1">Order Number</p>
                      <p className="font-heading text-xl">{order.order_id}</p>
                    </div>
                    <div>
                      <p className="text-xs tracking-[0.1em] uppercase text-muted-foreground mb-1">Tracking ID</p>
                      <p className="font-light">{order.tracking_id}</p>
                    </div>
                    <div>
                      <p className="text-xs tracking-[0.1em] uppercase text-muted-foreground mb-1">Est. Delivery</p>
                      <p className="font-light text-foreground">{order.estimated_delivery}</p>
                    </div>
                  </div>

                  {/* Visual Timeline Stepper */}
                  <div className="relative max-w-3xl mx-auto px-4 sm:px-0">
                    {/* Background Line */}
                    <div className="absolute top-6 left-8 right-8 h-px bg-border -z-10 hidden sm:block"></div>
                    
                    {/* Active Progress Line */}
                    <div className="absolute top-6 left-8 h-px bg-champagne -z-10 hidden sm:block transition-all duration-1000 ease-in-out" 
                         style={{ width: `calc(${(currentStepIndex / (STEPS.length - 1)) * 100}% - ${currentStepIndex === 0 ? '0px' : '2rem'})` }} 
                    />

                    <div className="flex flex-col sm:flex-row justify-between gap-8 sm:gap-4 relative">
                      {STEPS.map((step, index) => {
                        const isCompleted = index <= currentStepIndex;
                        const isActive = index === currentStepIndex;
                        const Icon = step.icon;

                        return (
                          <div key={step.id} className="flex sm:flex-col items-center gap-4 sm:gap-3 z-10 sm:w-1/4">
                            {/* Step Indicator (Circle + Icon) */}
                            <motion.div 
                              initial={{ scale: 0.8, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              transition={{ delay: index * 0.15 + 0.3 }}
                              className={`w-12 h-12 flex items-center justify-center shrink-0 border-2 transition-colors duration-500 bg-background ${
                                isCompleted 
                                  ? "border-champagne text-champagne" 
                                  : "border-border text-muted-foreground/40"
                              } ${isActive ? "shadow-md shadow-champagne/10" : ""}`}
                            >
                              <Icon size={20} strokeWidth={isActive ? 2 : 1.5} />
                            </motion.div>
                            
                            {/* Connection line for mobile */}
                            {index !== STEPS.length - 1 && (
                              <div className={`sm:hidden absolute left-6 w-px h-12 top-10 -z-10 transition-colors duration-1000 ${
                                index < currentStepIndex ? "bg-champagne" : "bg-border"
                              }`} style={{ transform: "translateY(12px)" }} />
                            )}

                            {/* Step Label */}
                            <motion.div 
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: index * 0.15 + 0.4 }}
                              className="sm:text-center"
                            >
                              <p className={`text-xs uppercase tracking-[0.1em] transition-colors duration-500 font-medium ${
                                isActive ? "text-foreground" : isCompleted ? "text-foreground/80" : "text-muted-foreground/60"
                              }`}>
                                {step.label}
                              </p>
                              {isActive && index === STEPS.length - 1 && (
                                <p className="text-[10px] text-green-600 mt-1 uppercase tracking-wider font-bold">Successfully Delivered</p>
                              )}
                            </motion.div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Success Bonus Banner */}
                  {order.status === "Delivered" && (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 1, type: "spring" }}
                      className="mt-16 bg-gradient-to-r from-champagne/20 via-transparent to-transparent p-6 border-l-4 border-champagne"
                    >
                      <h4 className="font-heading text-lg mb-2">Thank you for shopping with Miss DIY!</h4>
                      <p className="text-sm font-light text-muted-foreground">Your beautiful handmade creation has been delivered successfully. We hope you love it. If you need 
                        any assistance, our Support team is heavily invested in your satisfaction.</p>
                    </motion.div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default TrackOrderPage;
