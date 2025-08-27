
import type { Order, OrderQueryParams } from '../types/order';
import { orderService } from './orderService';

class FilterService {
  filterAndPaginateOrders(queryParams: OrderQueryParams): {
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
    regionBreakdown: {
      region: string;
      totalOrders: number;
      totalAmount: number;
      currency: 'AUD' | 'GBP' | 'USD';
    }[];
  } {
    const { 
      region, 
      status, 
      paymentStatus,
      shipmentStatus,
      page = '1', 
      limit = '50',
      search = '',
      sortBy = 'createdAt',
      sortOrder = 'desc'
    } = queryParams;

    let filteredOrders = [...orderService.getAllOrders()];

    // Apply filters
    if (region && region !== 'ALL') {
      filteredOrders = filteredOrders.filter(order => order.region === region);
    }

    if (status && status !== 'ALL') {
      filteredOrders = filteredOrders.filter(order => order.orderStatus === status);
    }

    if (paymentStatus && paymentStatus !== 'ALL') {
      filteredOrders = filteredOrders.filter(order => order.paymentStatus === paymentStatus);
    }

    if (shipmentStatus && shipmentStatus !== 'ALL') {
      filteredOrders = filteredOrders.filter(order => order.shipmentStatus === shipmentStatus);
    }

    // Search functionality
    if (search) {
      const searchLower = search.toLowerCase();
      filteredOrders = filteredOrders.filter(order => 
        order.orderNumber.toLowerCase().includes(searchLower) ||
        order.store.toLowerCase().includes(searchLower)
      );
    }

    // Sorting
    filteredOrders.sort((a, b) => {
      let aVal: any = a[sortBy as keyof Order];
      let bVal: any = b[sortBy as keyof Order];
      
      if (sortBy === 'createdAt' || sortBy === 'lastModifiedAt') {
        aVal = new Date(aVal);
        bVal = new Date(bVal);
      } else if (sortBy === 'totalAmount') {
        aVal = a.totalAmount;
        bVal = b.totalAmount;
      }

      if (sortOrder === 'asc') {
        return aVal > bVal ? 1 : -1;
      } else {
        return aVal < bVal ? 1 : -1;
      }
    });

    // Pagination
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const startIndex = (pageNum - 1) * limitNum;
    const endIndex = startIndex + limitNum;
    const paginatedOrders = filteredOrders.slice(startIndex, endIndex);

    // Calculate regional breakdown for filtered orders
    const regionBreakdown = filteredOrders.reduce((acc, order) => {
      const existingRegion = acc.find(item => item.region === order.region);
      
      if (existingRegion) {
        existingRegion.totalOrders += 1;
        existingRegion.totalAmount += order.totalAmount;
      } else {
        acc.push({
          region: order.region,
          totalOrders: 1,
          totalAmount: order.totalAmount,
          currency: order.currency
        });
      }
      
      return acc;
    }, [] as {
      region: string;
      totalOrders: number;
      totalAmount: number;
      currency: 'AUD' | 'GBP' | 'USD';
    }[]);

    return {
      orders: paginatedOrders,
      pagination: {
        currentPage: pageNum,
        totalPages: Math.ceil(filteredOrders.length / limitNum),
        totalOrders: filteredOrders.length,
        hasNext: endIndex < filteredOrders.length,
        hasPrev: pageNum > 1
      },
      filters: {
        region: region || 'ALL',
        status: status || 'ALL',
        paymentStatus: paymentStatus || 'ALL',
        shipmentStatus: shipmentStatus || 'ALL'
      },
      regionBreakdown
    };
  }
}

export const filterService = new FilterService(); 