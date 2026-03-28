import { useState, SyntheticEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { signIn } from "@/hooks/useAuth";
import { AlertCircle } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: SyntheticEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (result?.error) {
        setError("Invalid email or password");
      } else {
        // Success routing
        navigate("/");
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-stone-50">
      <Navbar />
      <main className="flex-1 pt-32 pb-16 px-6 flex items-center justify-center">
        <div className="w-full max-w-md bg-white p-10 py-12 rounded-3xl shadow-sm border border-stone-200/60">
          
          <div className="text-center mb-10">
            <h1 className="font-heading text-3xl text-stone-800 tracking-wide mb-2">Welcome Back</h1>
            <p className="text-stone-500 font-light text-sm">Sign in to continue exploring our handcrafted collections.</p>
          </div>

          {error && (
            <div className="mb-6 p-3 bg-red-50 text-red-600 rounded-lg flex items-center gap-2 text-sm font-medium border border-red-100">
              <AlertCircle size={16} />
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-xs font-medium uppercase tracking-[0.1em] text-stone-500 mb-2">Email Address</label>
              <input
                type="email"
                required
                disabled={loading}
                className="w-full bg-stone-50 border border-stone-200 p-3.5 rounded-xl text-sm focus:ring-1 focus:ring-[#D4AF37] focus:border-[#D4AF37] transition-all outline-none"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-xs font-medium uppercase tracking-[0.1em] text-stone-500">Password</label>
                <Link to="#" className="text-[10px] text-stone-400 hover:text-[#D4AF37] transition-colors uppercase tracking-wider font-medium">Forgot?</Link>
              </div>
              <input
                type="password"
                required
                disabled={loading}
                className="w-full bg-stone-50 border border-stone-200 p-3.5 rounded-xl text-sm focus:ring-1 focus:ring-[#D4AF37] focus:border-[#D4AF37] transition-all outline-none"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#D4AF37] hover:bg-[#b5932a] text-white py-4 rounded-xl text-sm font-bold uppercase tracking-[0.15em] transition-colors disabled:opacity-50"
            >
              {loading ? "Signing In..." : "Sign In"}
            </button>
          </form>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-stone-200"></span>
            </div>
            <div className="relative flex justify-center text-xs uppercase tracking-wider font-semibold">
              <span className="bg-white px-4 text-stone-400">Or continue with</span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => signIn("google")}
            className="w-full bg-white border border-stone-200 hover:bg-stone-50 text-stone-600 py-3.5 rounded-xl text-sm font-medium transition-colors flex items-center justify-center gap-3"
          >
            <svg viewBox="0 0 24 24" className="w-5 h-5" aria-hidden="true">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Sign in with Google
          </button>

          <p className="text-center text-sm font-light text-stone-500 mt-10">
            Don't have an account?{" "}
            <Link to="/signup" className="font-semibold text-stone-800 hover:text-[#D4AF37] transition-colors">
              Create one
            </Link>
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
