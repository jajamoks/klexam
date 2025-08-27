export enum Region {
  APAC = "APAC",
  UK = "UK",
  US = "US",
}

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

export interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  totalOrders: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export interface FilterState {
  region: string;
  status: string;
  paymentStatus: string;
  shipmentStatus: string;
}



export interface RegionBreakdown {
  region: string;
  totalOrders: number;
  totalAmount: number;
  currency: "AUD" | "GBP" | "USD";
}

export interface ApiResponse {
  orders: Order[];
  pagination: PaginationInfo;
  filters: FilterState;
  regionBreakdown: RegionBreakdown[];
}

export interface SortConfig {
  field: keyof Order | "totalAmount";
  direction: "asc" | "desc";
}

export type StatusType =
  | Order["orderStatus"]
  | Order["paymentStatus"]
  | Order["shipmentStatus"]; 