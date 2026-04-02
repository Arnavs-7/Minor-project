import React, { createContext, useContext, useEffect, useState } from "react";
import { toast } from "sonner";

interface User {
  email: string;
  name?: string;
  role: "user" | "admin";
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (email: string) => Promise<void>;
  verifyOtp: (otp: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [pendingEmail, setPendingEmail] = useState<string | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("auth_user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error("Failed to parse user session");
      }
    }
  }, []);

  const login = async (email: string) => {
    setPendingEmail(email);
    try {
      const res = await fetch("/api/auth/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to send OTP");
      
      toast.success("OTP sent to your email!");
    } catch (e: any) {
      console.error(e);
      toast.error(e.message || "Failed to send OTP.");
      throw e; // rethrow so UI can handle loading state correctly
    }
  };

  const verifyOtp = async (otp: string): Promise<boolean> => {
    if (!pendingEmail) {
      toast.error("Session expired, please request a new OTP.");
      return false;
    }

    try {
      const res = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: pendingEmail, otp: String(otp).trim() }),
      });
      
      const data = await res.json();
      
      if (res.ok && data.success) {
        const newUser: User = {
          email: pendingEmail,
          name: data.user.role === "admin" ? "Admin" : "User",
          role: data.user.role,
        };
        setUser(newUser);
        localStorage.setItem("auth_user", JSON.stringify(newUser));
        setPendingEmail(null);
        
        if (newUser.role === "admin") {
          toast.success("Welcome back, Admin!");
        } else {
          toast.success("Login successful!");
        }
        return true;
      } else {
        toast.error(data.error || "Invalid OTP. Please try again.");
        return false;
      }
    } catch (e: any) {
      console.error(e);
      toast.error("Network error. Please try again.");
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("auth_user");
    toast.info("You have been logged out.");
  };

  const value = {
    user,
    isAuthenticated: !!user,
    isAdmin: user?.role === "admin",
    login,
    verifyOtp,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
