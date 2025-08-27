import type { StatusType } from "../types/order";

// Status color mapping utility
export const getStatusColor = (status: StatusType): string => {
  const colors: Record<string, string> = {
    Open: "bg-blue-100 text-blue-800",
    Confirmed: "bg-yellow-100 text-yellow-800",
    Shipped: "bg-purple-100 text-purple-800",
    Complete: "bg-green-100 text-green-800",
    Cancelled: "bg-red-100 text-red-800",
    Pending: "bg-gray-100 text-gray-800",
    Paid: "bg-green-100 text-green-800",
    Failed: "bg-red-100 text-red-800",
    Refunded: "bg-orange-100 text-orange-800",
    Ready: "bg-blue-100 text-blue-800",
    Delivered: "bg-green-100 text-green-800",
  };
  return colors[status] || "bg-gray-100 text-gray-800";
}; 