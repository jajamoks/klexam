import { useState, useEffect } from "react";
import type {
  Order,
  PaginationInfo,
  FilterState,
  SortConfig,
  ApiResponse,
  RegionBreakdown,
} from "../types/order";

interface UseOrdersReturn {
  orders: Order[];
  loading: boolean;
  isRefreshing: boolean;
  pagination: PaginationInfo;
  regionBreakdown: RegionBreakdown[];
  fetchOrders: (page?: number) => Promise<void>;
}

export const useOrders = (
  filters: FilterState,
  search: string,
  sorting: SortConfig
): UseOrdersReturn => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [pagination, setPagination] = useState<PaginationInfo>({
    currentPage: 1,
    totalPages: 1,
    totalOrders: 0,
    hasNext: false,
    hasPrev: false,
  });
  const [regionBreakdown, setRegionBreakdown] = useState<RegionBreakdown[]>([]);

  const fetchOrders = async (page: number = 1): Promise<void> => {
    setLoading(true);
    setIsRefreshing(true);
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: "25",
        search,
        sortBy: sorting.field,
        sortOrder: sorting.direction,
        ...filters,
      });

      console.log(params);

      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/orders?${params}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: ApiResponse = await response.json();

      setOrders(data.orders);
      setPagination(data.pagination);
      setRegionBreakdown(data.regionBreakdown);
    } catch (error) {
      console.error("Failed to fetch orders:", error);
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  useEffect(() => {
    fetchOrders();
  }, [filters, search, sorting]);

  return {
    orders,
    loading,
    isRefreshing,
    pagination,
    regionBreakdown,
    fetchOrders,
  };
};
