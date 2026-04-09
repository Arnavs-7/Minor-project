import { useAdmin } from "@/context/AdminContext";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

const OrdersTable = () => {
  const { orders, loading, updateOrderStatus } = useAdmin();

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Pending": return "bg-amber-100 text-amber-800 hover:bg-amber-100";
      case "Shipped": return "bg-blue-100 text-blue-800 hover:bg-blue-100";
      case "Delivered": return "bg-emerald-100 text-emerald-800 hover:bg-emerald-100";
      case "Cancelled": return "bg-red-100 text-red-800 hover:bg-red-100";
      default: return "bg-gray-100 text-gray-800 hover:bg-gray-100";
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-gray-100">
        <h2 className="text-xl font-heading font-semibold">Recent Orders</h2>
        <p className="text-sm text-gray-500 mt-1">Manage incoming orders and update their status</p>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <Table>
          <TableHeader className="bg-gray-50/50">
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Total</TableHead>
              <TableHead className="text-center">Status</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow><TableCell colSpan={6} className="text-center py-10">Loading...</TableCell></TableRow>
            ) : orders.length === 0 ? (
              <TableRow><TableCell colSpan={6} className="text-center py-10">No orders found</TableCell></TableRow>
            ) : (
              orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">#{order.id.toString().padStart(4, "0")}</TableCell>
                  <TableCell>
                    <p className="font-medium">{order.customer_name}</p>
                    <p className="text-sm text-gray-500">{order.customer_phone}</p>
                  </TableCell>
                  <TableCell className="text-gray-500">
                    {new Date(order.created_at).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-right font-medium">₹{order.total}</TableCell>
                  <TableCell className="text-center">
                    <Badge className={getStatusColor(order.status)} variant="secondary">
                      {order.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Select
                      defaultValue={order.status}
                      onValueChange={(val) => updateOrderStatus(order.id, val)}
                    >
                      <SelectTrigger className="w-[120px] h-8 text-xs ml-auto">
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Pending">Pending</SelectItem>
                        <SelectItem value="Shipped">Shipped</SelectItem>
                        <SelectItem value="Delivered">Delivered</SelectItem>
                        <SelectItem value="Cancelled">Cancelled</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default OrdersTable;
