import { IndianRupee, ShoppingCart, Users, AlertTriangle } from "lucide-react";
import { useAdmin } from "@/context/AdminContext";

const MetricCards = () => {
  const { stats } = useAdmin();

  const metrics = [
    {
      label: "Total Sales",
      value: stats ? `₹${stats.totalSales.toLocaleString("en-IN")}` : "—",
      icon: IndianRupee,
      gradient: "from-emerald-500 to-teal-600",
      bg: "bg-emerald-50",
      iconColor: "text-emerald-600",
    },
    {
      label: "Total Orders",
      value: stats ? stats.totalOrders.toString() : "—",
      icon: ShoppingCart,
      gradient: "from-blue-500 to-indigo-600",
      bg: "bg-blue-50",
      iconColor: "text-blue-600",
    },
    {
      label: "New Customers",
      value: stats ? stats.newCustomers.toString() : "—",
      icon: Users,
      gradient: "from-violet-500 to-purple-600",
      bg: "bg-violet-50",
      iconColor: "text-violet-600",
    },
    {
      label: "Low Stock Alerts",
      value: stats ? stats.lowStockAlerts.toString() : "—",
      icon: AlertTriangle,
      gradient: "from-orange-500 to-red-500",
      bg: "bg-orange-50",
      iconColor: "text-orange-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
      {metrics.map((m) => (
        <div
          key={m.label}
          className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm hover:shadow-md transition-shadow duration-300"
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-500 font-medium">{m.label}</p>
              <p className="text-3xl font-heading font-bold mt-2 text-gray-900">
                {m.value}
              </p>
            </div>
            <div className={`w-12 h-12 rounded-xl ${m.bg} flex items-center justify-center`}>
              <m.icon className={`w-6 h-6 ${m.iconColor}`} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MetricCards;
