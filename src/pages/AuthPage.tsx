import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-32 pb-16 px-6 lg:px-12 flex items-center justify-center">
        <div className="w-full max-w-md bg-white p-8 rounded-2xl border border-border">
          <h1 className="font-heading text-2xl mb-6 text-center">
            {isLogin ? "Welcome Back" : "Create Account"}
          </h1>
          
          <form className="space-y-4">
            {!isLogin && (
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider mb-2">Name</label>
                <input type="text" className="w-full bg-foreground/5 border-none p-3 rounded" placeholder="Your Name" />
              </div>
            )}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider mb-2">Email</label>
              <input type="email" className="w-full bg-foreground/5 border-none p-3 rounded" placeholder="your@email.com" />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider mb-2">Password</label>
              <input type="password" className="w-full bg-foreground/5 border-none p-3 rounded" placeholder="••••••••" />
            </div>
            
            <button type="button" className="craft-btn w-full mt-6 justify-center">
              {isLogin ? "Sign In" : "Sign Up"}
            </button>
          </form>

          <div className="mt-6 border-t border-border pt-6 text-center">
            <p className="text-sm text-muted-foreground">
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <button 
                onClick={() => setIsLogin(!isLogin)} 
                className="text-foreground font-semibold hover:text-primary transition-colors"
              >
                {isLogin ? "Sign Up" : "Sign In"}
              </button>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AuthPage;
