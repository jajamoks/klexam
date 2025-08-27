export enum Region {
  APAC = "APAC",
  UK = "UK",
  US = "US",
}

export const getAllRegions = (): Region[] => Object.values(Region);

export interface Order {
  id: string;
  orderNumber: string;
  customerEmail: string;
  totalAmount: number;
  currency: "AUD" | "GBP" | "USD";
  orderStatus: "Open" | "Confirmed" | "Shipped" | "Complete" | "Cancelled";
  paymentStatus: "Pending" | "Paid" | "Failed" | "Refunded";
  shipmentStatus: "Pending" | "Ready" | "Shipped" | "Delivered";
  region: Region;
  store: string;
  country: string;
  createdAt: string;
  lastModifiedAt: string;
  numberOfItems: number;
}

export interface RegionBreakdown {
  region: string;
  totalOrders: number;
  totalAmount: number;
  currency: "AUD" | "GBP" | "USD";
}

export interface ApiResponse {
  orders: Order[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalOrders: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
  filters: {
    region: string;
    status: string;
    paymentStatus: string;
    shipmentStatus: string;
  };
  regionBreakdown: RegionBreakdown[];
}

export interface OrderQueryParams {
  region?: string;
  status?: string;
  paymentStatus?: string;
  shipmentStatus?: string;
  page?: string;
  limit?: string;
  search?: string;
  sortBy?: keyof Order | "totalAmount";
  sortOrder?: "asc" | "desc";
}
