import { ChevronDown, ChevronUp } from "lucide-react";
import type { Order, SortConfig } from "../../types/order";

interface TableHeaderProps {
  sorting: SortConfig;
  onSort: (field: keyof Order | "totalAmount") => void;
}

export const TableHeader: React.FC<TableHeaderProps> = ({
  sorting,
  onSort,
}) => {
  // Render sort icon
  const SortIcon: React.FC<{ field: keyof Order | "totalAmount" }> = ({
    field,
  }) => {
    if (sorting.field !== field) {
      return <ChevronDown className="w-4 h-4 text-gray-400" />;
    }
    return sorting.direction === "asc" ? (
      <ChevronUp className="w-4 h-4 text-gray-600" />
    ) : (
      <ChevronDown className="w-4 h-4 text-gray-600" />
    );
  };

  return (
    <thead className="bg-gray-50">
      <tr>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Store
        </th>
        <th
          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
          onClick={() => onSort("orderNumber")}
        >
          <div className="flex items-center">
            Order number
            <SortIcon field="orderNumber" />
          </div>
        </th>
        <th
          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
          onClick={() => onSort("totalAmount")}
        >
          <div className="flex items-center">
            Total Amount
            <SortIcon field="totalAmount" />
          </div>
        </th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          No. of items
        </th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Order status
        </th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Payment status
        </th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Shipment status
        </th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Email (order)
        </th>
        <th
          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
          onClick={() => onSort("createdAt")}
        >
          <div className="flex items-center">
            Date created
            <SortIcon field="createdAt" />
          </div>
        </th>
        <th
          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
          onClick={() => onSort("lastModifiedAt")}
        >
          <div className="flex items-center">
            Date modified
            <SortIcon field="lastModifiedAt" />
          </div>
        </th>
      </tr>
    </thead>
  );
}; 