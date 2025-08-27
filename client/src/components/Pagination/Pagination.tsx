import type { PaginationInfo, RegionBreakdown } from "../../types/order";
import { formatCurrency } from "../../utils/formatters";

interface PaginationProps {
  pagination: PaginationInfo;
  regionBreakdown: RegionBreakdown[];
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  pagination,
  regionBreakdown,
  onPageChange,
}) => {
  return (
    <div className="bg-white px-4 py-3 border-t border-gray-200 sm:px-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <p className="text-sm text-gray-700">
            Showing{" "}
            <span className="font-medium">
              {(pagination.currentPage - 1) * 25 + 1}
            </span>{" "}
            to{" "}
            <span className="font-medium">
              {Math.min(pagination.currentPage * 25, pagination.totalOrders)}
            </span>{" "}
            of <span className="font-medium">{pagination.totalOrders}</span>{" "}
            results
          </p>
          <div className="flex items-center space-x-4">
            {regionBreakdown.map((region) => (
              <div key={region.region} className="flex items-center space-x-2">
                <span className="text-sm text-gray-500">{region.region}:</span>
                <span className="text-sm font-semibold text-green-600">
                  {formatCurrency(region.totalAmount, region.currency)} (
                  {region.totalOrders} ORDERS)
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => onPageChange(pagination.currentPage - 1)}
            disabled={!pagination.hasPrev}
            className="relative inline-flex items-center px-3 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          <div className="flex items-center space-x-1">
            {Array.from(
              { length: Math.min(5, pagination.totalPages) },
              (_, i) => {
                const pageNum = i + 1;
                const isActive = pageNum === pagination.currentPage;
                return (
                  <button
                    key={pageNum}
                    onClick={() => onPageChange(pageNum)}
                    className={`relative inline-flex items-center px-3 py-2 border text-sm font-medium rounded-md ${
                      isActive
                        ? "border-blue-500 bg-blue-50 text-blue-600"
                        : "border-gray-300 text-gray-700 bg-white hover:bg-gray-50"
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              }
            )}
          </div>
          <button
            onClick={() => onPageChange(pagination.currentPage + 1)}
            disabled={!pagination.hasNext}
            className="relative inline-flex items-center px-3 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};
