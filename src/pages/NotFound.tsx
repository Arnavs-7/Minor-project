import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-20 lg:pt-24 flex items-center justify-center min-h-[70vh]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center px-6"
        >
          <p className="text-xs tracking-[0.3em] uppercase text-champagne mb-4">Error 404</p>
          <h1 className="font-heading text-5xl lg:text-7xl mb-4">Page Not Found</h1>
          <p className="text-muted-foreground font-light mb-8 max-w-md mx-auto">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link to="/" className="luxury-btn">
              Return Home
            </Link>
            <Link to="/shop" className="luxury-btn-outline">
              Browse Shop
            </Link>
          </div>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
};

export default NotFound;
