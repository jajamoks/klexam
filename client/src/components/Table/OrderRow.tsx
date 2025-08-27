import { MoreHorizontal } from "lucide-react";
import type { Order } from "../../types/order";
import { formatCurrency, formatDate } from "../../utils/formatters";
import { getStatusColor } from "../../utils/statusColors";

interface OrderRowProps {
  order: Order;
}

export const OrderRow: React.FC<OrderRowProps> = ({
  order,
}) => {
  return (
    <tr className="hover:bg-gray-50">
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm font-medium text-gray-900">
          {order.store}
        </div>
        <div className="text-sm text-gray-500">{order.region}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm font-medium text-blue-600 hover:text-blue-800 cursor-pointer">
          {order.orderNumber}
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm font-medium text-gray-900">
          {formatCurrency(order.totalAmount, order.currency)}
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        {order.numberOfItems}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span
          className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(
            order.orderStatus
          )}`}
        >
          {order.orderStatus}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span
          className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(
            order.paymentStatus
          )}`}
        >
          {order.paymentStatus}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span
          className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(
            order.shipmentStatus
          )}`}
        >
          {order.shipmentStatus}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {order.customerEmail}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        {formatDate(order.createdAt)}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        {formatDate(order.lastModifiedAt)}
      </td>
    </tr>
  );
}; 