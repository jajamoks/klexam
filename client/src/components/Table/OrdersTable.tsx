import { RefreshCw } from "lucide-react";
import type { Order, SortConfig } from "../../types/order";
import { TableHeader } from "./TableHeader";
import { OrderRow } from "./OrderRow";

interface OrdersTableProps {
  orders: Order[];
  loading: boolean;
  sorting: SortConfig;
  onSort: (field: keyof Order | "totalAmount") => void;
}

export const OrdersTable: React.FC<OrdersTableProps> = ({
  orders,
  loading,
  sorting,
  onSort,
}) => {
  return (
    <div className="bg-white shadow rounded-lg overflow-hidden flex-1">
      <div className="overflow-x-auto overflow-y-auto" style={{ height: 'calc(100vh - 400px)' }}>
        <table className="min-w-full divide-y divide-gray-200">
          <TableHeader
            sorting={sorting}
            onSort={onSort}
          />
          <tbody className="bg-white divide-y divide-gray-200">
            {loading ? (
              <tr>
                <td colSpan={12} className="px-6 py-12 text-center">
                  <div className="flex items-center justify-center">
                    <RefreshCw className="animate-spin h-6 w-6 text-gray-400 mr-3" />
                    <span className="text-gray-500">Loading orders...</span>
                  </div>
                </td>
              </tr>
            ) : orders.length === 0 ? (
              <tr>
                <td colSpan={12} className="px-6 py-12 text-center text-gray-500">
                  No orders found matching your criteria
                </td>
              </tr>
            ) : (
              orders.map((order) => (
                <OrderRow
                  key={order.id}
                  order={order}
                />
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}; 