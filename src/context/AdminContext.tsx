import React, { createContext, useContext, useState, useCallback, useEffect } from "react";
import { toast } from "sonner";

import { useAuth } from "./AuthContext";

/* ── Types ── */
export interface AdminProduct {
  id: number;
  name: string;
  category: string;
  price: number;
  original_price: number | null;
  stock: number;
  image_url: string;
  badge: string | null;
  description: string;
  material: string;
  product_group: string;
  created_at: string;
  updated_at: string;
}

export interface AdminOrder {
  id: number;
  customer_name: string;
  customer_phone: string;
  items: { name: string; qty: number; price: number }[];
  total: number;
  status: "Pending" | "Shipped" | "Delivered" | "Cancelled";
  created_at: string;
  updated_at: string;
}

export interface AdminStats {
  totalSales: number;
  totalOrders: number;
  newCustomers: number;
  lowStockAlerts: number;
  salesTrend: { day: string; date: string; sales: number; orders: number }[];
}

interface AdminContextValue {
  products: AdminProduct[];
  orders: AdminOrder[];
  stats: AdminStats | null;
  loading: boolean;
  fetchProducts: (search?: string) => Promise<void>;
  fetchOrders: () => Promise<void>;
  fetchStats: () => Promise<void>;
  addProduct: (p: Partial<AdminProduct>) => Promise<void>;
  updateProduct: (p: Partial<AdminProduct>) => Promise<void>;
  deleteProduct: (id: number) => Promise<void>;
  updateOrderStatus: (id: number, status: string) => Promise<void>;
}

const AdminContext = createContext<AdminContextValue | undefined>(undefined);

const API_BASE = import.meta.env.DEV ? "http://localhost:5173" : "";

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<AdminProduct[]>([]);
  const [orders, setOrders] = useState<AdminOrder[]>([]);
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [loading, setLoading] = useState(false);

  const getHeaders = useCallback(() => ({
    "Content-Type": "application/json",
    "x-admin-email": user?.email || "",
  }), [user?.email]);

  const fetchProducts = useCallback(async (search = "") => {
    setLoading(true);
    try {
      const url = `/api/admin/products${search ? `?search=${encodeURIComponent(search)}` : ""}`;
      const res = await fetch(url, { headers: getHeaders() });
      if (!res.ok) throw new Error("Failed to fetch products");
      setProducts(await res.json());
    } catch (e) {
      console.error(e);
      toast.error("Failed to load products");
    } finally {
      setLoading(false);
    }
  }, [getHeaders]);

  const fetchOrders = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/orders", { headers: getHeaders() });
      if (!res.ok) throw new Error("Failed to fetch orders");
      setOrders(await res.json());
    } catch (e) {
      console.error(e);
      toast.error("Failed to load orders");
    } finally {
      setLoading(false);
    }
  }, [getHeaders]);

  const fetchStats = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/stats", { headers: getHeaders() });
      if (!res.ok) throw new Error("Failed to fetch stats");
      setStats(await res.json());
    } catch (e) {
      console.error(e);
      toast.error("Failed to load dashboard stats");
    }
  }, [getHeaders]);

  const addProduct = useCallback(async (p: Partial<AdminProduct>) => {
    try {
      const res = await fetch("/api/admin/products", {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify(p),
      });
      if (!res.ok) throw new Error("Failed to add product");
      toast.success("Product added successfully!");
      await fetchProducts();
      await fetchStats();
    } catch (e) {
      console.error(e);
      toast.error("Failed to add product");
    }
  }, [getHeaders, fetchProducts, fetchStats]);

  const updateProduct = useCallback(async (p: Partial<AdminProduct>) => {
    try {
      const res = await fetch("/api/admin/products", {
        method: "PUT",
        headers: getHeaders(),
        body: JSON.stringify(p),
      });
      if (!res.ok) throw new Error("Failed to update product");
      toast.success("Product updated successfully!");
      await fetchProducts();
      await fetchStats();
    } catch (e) {
      console.error(e);
      toast.error("Failed to update product");
    }
  }, [getHeaders, fetchProducts, fetchStats]);

  const deleteProduct = useCallback(async (id: number) => {
    try {
      const res = await fetch(`/api/admin/products?id=${id}`, { 
        method: "DELETE",
        headers: getHeaders()
      });
      if (!res.ok) throw new Error("Failed to delete product");
      toast.success("Product deleted successfully!");
      await fetchProducts();
      await fetchStats();
    } catch (e) {
      console.error(e);
      toast.error("Failed to delete product");
    }
  }, [getHeaders, fetchProducts, fetchStats]);

  const updateOrderStatus = useCallback(async (id: number, status: string) => {
    try {
      const res = await fetch("/api/admin/orders", {
        method: "PUT",
        headers: getHeaders(),
        body: JSON.stringify({ id, status }),
      });
      if (!res.ok) throw new Error("Failed to update order");
      toast.success(`Order #${id} status updated to ${status}`);
      await fetchOrders();
      await fetchStats();
    } catch (e) {
      console.error(e);
      toast.error("Failed to update order status");
    }
  }, [getHeaders, fetchOrders, fetchStats]);

  // Initial fetch
  useEffect(() => {
    fetchProducts();
    fetchOrders();
    fetchStats();
  }, [fetchProducts, fetchOrders, fetchStats]);

  return (
    <AdminContext.Provider
      value={{
        products, orders, stats, loading,
        fetchProducts, fetchOrders, fetchStats,
        addProduct, updateProduct, deleteProduct, updateOrderStatus,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = (): AdminContextValue => {
  const ctx = useContext(AdminContext);
  if (!ctx) throw new Error("useAdmin must be used within AdminProvider");
  return ctx;
};
