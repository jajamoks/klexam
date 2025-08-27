import { Search, Filter } from "lucide-react";
import type { FilterState } from "../../types/order";

interface SearchAndFiltersProps {
  search: string;
  filters: FilterState;
  showFilters: boolean;
  onSearchChange: (value: string) => void;
  onFilterChange: (filterType: keyof FilterState, value: string) => void;
  onToggleFilters: () => void;
}

export const SearchAndFilters: React.FC<SearchAndFiltersProps> = ({
  search,
  filters,
  showFilters,
  onSearchChange,
  onFilterChange,
  onToggleFilters,
}) => {
  return (
    <div className="mt-4">
      {/* Search and Filter Button Row */}
      <div className="flex items-center space-x-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search by order number or store name"
            className="w-96 pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
        <button
          onClick={onToggleFilters}
          className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
        >
          <Filter className="w-4 h-4 mr-2" />
          Filters
        </button>
      </div>

      {/* Filter Panel - Now appears below */}
      {showFilters && (
        <div className="mt-4 p-4 bg-gray-50 rounded-lg border">
          <div className="grid grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Region
              </label>
              <select
                value={filters.region}
                onChange={(e) => onFilterChange("region", e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="ALL">All Regions</option>
                <option value="APAC">APAC</option>
                <option value="UK">UK</option>
                <option value="US">US</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Order Status
              </label>
              <select
                value={filters.status}
                onChange={(e) => onFilterChange("status", e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="ALL">All Statuses</option>
                <option value="Open">Open</option>
                <option value="Confirmed">Confirmed</option>
                <option value="Shipped">Shipped</option>
                <option value="Complete">Complete</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Payment Status
              </label>
              <select
                value={filters.paymentStatus}
                onChange={(e) =>
                  onFilterChange("paymentStatus", e.target.value)
                }
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="ALL">All Payments</option>
                <option value="Pending">Pending</option>
                <option value="Paid">Paid</option>
                <option value="Failed">Failed</option>
                <option value="Refunded">Refunded</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Shipment Status
              </label>
              <select
                value={filters.shipmentStatus}
                onChange={(e) =>
                  onFilterChange("shipmentStatus", e.target.value)
                }
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="ALL">All Shipments</option>
                <option value="Pending">Pending</option>
                <option value="Ready">Ready</option>
                <option value="Shipped">Shipped</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}; 