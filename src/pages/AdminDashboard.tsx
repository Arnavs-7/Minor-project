import { useState } from "react";
import AdminSidebar from "@/components/admin/AdminSidebar";
import MetricCards from "@/components/admin/MetricCards";
import SalesChart from "@/components/admin/SalesChart";
import InventoryTable from "@/components/admin/InventoryTable";
import OrdersTable from "@/components/admin/OrdersTable";
import { AdminProvider } from "@/context/AdminContext";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <AdminProvider>
      <div className="min-h-screen bg-gray-50 flex">
        {/* Sidebar */}
        <div className="hidden lg:block">
          <AdminSidebar activeTab={activeTab} onTabChange={setActiveTab} />
        </div>

        {/* Main Content */}
        <main className="flex-1 overflow-auto">
          {/* Top Header Mobile */}
          <div className="lg:hidden p-4 bg-noir text-white flex justify-between items-center">
            <h1 className="font-heading font-semibold tracking-wide">MS DIY Admin</h1>
            {/* Simple mobile menu toggle could go here */}
            <select 
              value={activeTab} 
              onChange={(e) => setActiveTab(e.target.value)}
              className="bg-white/10 text-white text-sm rounded border-none p-2"
            >
              <option value="dashboard" className="text-black">Dashboard</option>
              <option value="inventory" className="text-black">Inventory</option>
              <option value="orders" className="text-black">Orders</option>
            </select>
          </div>

          <div className="p-6 lg:p-10 max-w-[1600px] mx-auto space-y-8 animate-in fade-in duration-500">
            {/* Header */}
            <div>
              <h1 className="text-3xl font-heading font-bold text-gray-900 capitalize">
                {activeTab} Overview
              </h1>
              <p className="text-gray-500 mt-2">
                Manage your store's data, inventory, and recent orders.
              </p>
            </div>

            {/* Views */}
            {activeTab === "dashboard" && (
              <div className="space-y-8">
                <MetricCards />
                <SalesChart />
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                  {/* Sneak peek of tables on dashboard */}
                  <div className="opacity-80 scale-[0.98] pointer-events-none origin-top-left">
                    <OrdersTable />
                  </div>
                </div>
              </div>
            )}

            {activeTab === "inventory" && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 mt-2">
                <InventoryTable />
              </div>
            )}

            {activeTab === "orders" && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 mt-2">
                <OrdersTable />
              </div>
            )}
          </div>
        </main>
      </div>
    </AdminProvider>
  );
};

export default AdminDashboard;
