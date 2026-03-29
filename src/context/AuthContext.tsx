import React, { createContext, useContext, useEffect, useState } from "react";
import { toast } from "sonner";

interface User {
  phone: string;
  name?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (phone: string) => Promise<void>;
  verifyOtp: (otp: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [pendingPhone, setPendingPhone] = useState<string | null>(null);

  useEffect(() => {
    // Check local storage for session
    const storedUser = localStorage.getItem("auth_user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error("Failed to parse user session");
      }
    }
  }, []);

  const login = async (phone: string) => {
    // In a real app, send OTP via API here.
    setPendingPhone(phone);
    // Mocking an API call delay
    await new Promise((resolve) => setTimeout(resolve, 800));
    toast.success("OTP sent to your phone!");
  };

  const verifyOtp = async (otp: string): Promise<boolean> => {
    await new Promise((resolve) => setTimeout(resolve, 800));
    if (otp === "123456" || otp.length === 6) { 
      const newUser = { phone: pendingPhone || "Unknown User" };
      setUser(newUser);
      localStorage.setItem("auth_user", JSON.stringify(newUser));
      setPendingPhone(null);
      toast.success("Login successful!");
      return true;
    } else {
      toast.error("Invalid OTP. Try 123456.");
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
