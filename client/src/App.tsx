import { useState } from "react";
import type { Order, FilterState, SortConfig } from "./types/order";
import { useOrders } from "./hooks/useOrders";

import { Header } from "./components/Header/Header";

import { SearchAndFilters } from "./components/SearchAndFilters/SearchAndFilters";
import { OrdersTable } from "./components/Table/OrdersTable";
import { Pagination } from "./components/Pagination/Pagination";

const KingLivingOrdersTable: React.FC = () => {
  const [filters, setFilters] = useState<FilterState>({
    region: "ALL",
    status: "ALL",
    paymentStatus: "ALL",
    shipmentStatus: "ALL",
  });

  const [search, setSearch] = useState<string>("");
  const [sorting, setSorting] = useState<SortConfig>({
    field: "createdAt",
    direction: "desc",
  });

  const [showFilters, setShowFilters] = useState<boolean>(false);

  const { orders, loading, isRefreshing, pagination, regionBreakdown, fetchOrders } = useOrders(
    filters,
    search,
    sorting
  );

  // Event handlers
  const handleSort = (field: keyof Order | "totalAmount"): void => {
    setSorting((prev) => ({
      field,
      direction:
        prev.field === field && prev.direction === "asc" ? "desc" : "asc",
    }));
  };



  const handleFilterChange = (
    filterType: keyof FilterState,
    value: string
  ): void => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: value,
    }));
  };

  const handlePageChange = (page: number): void => {
    fetchOrders(page);
  };

  const handleRefresh = (): void => {
    fetchOrders(pagination.currentPage);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <Header
        isRefreshing={isRefreshing}
        onRefresh={handleRefresh}
      />





      {/* Search and Filters */}
      <div className="px-6">
        <SearchAndFilters
          search={search}
          filters={filters}
          showFilters={showFilters}
          onSearchChange={setSearch}
          onFilterChange={handleFilterChange}
          onToggleFilters={() => setShowFilters(!showFilters)}
        />
      </div>

      {/* Table */}
      <div className="px-6">
        <OrdersTable
          orders={orders}
          loading={loading}
          sorting={sorting}
          onSort={handleSort}
        />
      </div>

      {/* Pagination */}
      {!loading && orders.length > 0 && (
        <Pagination 
          pagination={pagination} 
          regionBreakdown={regionBreakdown}
          onPageChange={handlePageChange} 
        />
      )}
    </div>
  );
};

export default KingLivingOrdersTable;
