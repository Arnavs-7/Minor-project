import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useAdmin } from "@/context/AdminContext";

const SalesChart = () => {
  const { stats } = useAdmin();
  const data = stats?.salesTrend ?? [];

  return (
    <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-heading font-semibold text-gray-900">
            Sales Trend
          </h3>
          <p className="text-sm text-gray-500 mt-1">Last 7 days</p>
        </div>
      </div>

      <div className="h-72">
        {data.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis
                dataKey="day"
                tick={{ fontSize: 12, fill: "#9ca3af" }}
                axisLine={{ stroke: "#e5e7eb" }}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 12, fill: "#9ca3af" }}
                axisLine={{ stroke: "#e5e7eb" }}
                tickLine={false}
                tickFormatter={(v) => `₹${v}`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#fff",
                  border: "1px solid #e5e7eb",
                  borderRadius: "0.75rem",
                  boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1)",
                  fontSize: "13px",
                }}
                formatter={(value: number) => [`₹${value.toLocaleString("en-IN")}`, "Sales"]}
              />
              <Line
                type="monotone"
                dataKey="sales"
                stroke="#b8956a"
                strokeWidth={3}
                dot={{ fill: "#b8956a", r: 5, strokeWidth: 2, stroke: "#fff" }}
                activeDot={{ r: 7, fill: "#b8956a", stroke: "#fff", strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-full flex items-center justify-center text-gray-400">
            No sales data available
          </div>
        )}
      </div>
    </div>
  );
};

export default SalesChart;
