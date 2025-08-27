import type { Order } from '../types/order';
import { Region } from '../types/order';
import { faker } from '@faker-js/faker';

class OrderService {
  private orders: Order[] = [];

  generateMockOrders(region: Region, count: number = 50): Order[] {
    const orders: Order[] = [];
    
    const regionConfig = {
      [Region.APAC]: { 
        currency: 'AUD' as const, 
        stores: ['King Living Sydney', 'King Living Melbourne', 'King Living Brisbane', 'King Living Perth'],
        countries: ['Australia', 'New Zealand', 'Singapore', 'Japan'],
        priceMultiplier: 1.0
      },
      [Region.UK]: { 
        currency: 'GBP' as const, 
        stores: ['King Living London', 'King Living Manchester', 'King Living Birmingham'],
        countries: ['United Kingdom', 'Ireland'],
        priceMultiplier: 0.6
      },
      [Region.US]: { 
        currency: 'USD' as const, 
        stores: ['King Living NYC', 'King Living LA', 'King Living Chicago', 'King Living Miami'],
        countries: ['United States', 'Canada'],
        priceMultiplier: 0.8
      }
    };

    const config = regionConfig[region];
    const orderStatuses: Order['orderStatus'][] = ['Open', 'Confirmed', 'Shipped', 'Complete', 'Cancelled'];
    const paymentStatuses: Order['paymentStatus'][] = ['Pending', 'Paid', 'Failed', 'Refunded'];
    const shipmentStatuses: Order['shipmentStatus'][] = ['Pending', 'Ready', 'Shipped', 'Delivered'];

    for (let i = 0; i < count; i++) {
      const orderDate = faker.date.recent({ days: 30 });
      const modifiedDate = faker.date.between({ 
        from: orderDate, 
        to: new Date() 
      });
      
      const basePrice = faker.number.float({ 
        min: 100, 
        max: 800, 
        fractionDigits: 2 
      });
      const quantity = faker.number.int({ min: 1, max: 3 });
      const totalPrice = (basePrice * quantity * config.priceMultiplier);
      
      orders.push({
        id: faker.string.alphanumeric(10).toUpperCase(),
        orderNumber: this.generateOrderNumber(region),
        customerEmail: faker.internet.email(),
        totalAmount: totalPrice,
        currency: config.currency,
        orderStatus: faker.helpers.arrayElement(orderStatuses),
        paymentStatus: faker.helpers.arrayElement(paymentStatuses),
        shipmentStatus: faker.helpers.arrayElement(shipmentStatuses),
        region: region,
        store: faker.helpers.arrayElement(config.stores),
        country: faker.helpers.arrayElement(config.countries),
        createdAt: orderDate.toISOString(),
        lastModifiedAt: modifiedDate.toISOString(),
        numberOfItems: quantity
      });
    }

    return orders.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  private generateOrderNumber(region: Region): string {
    const prefixes: Record<Region, string> = { [Region.APAC]: 'KLAP', [Region.UK]: 'KLUK', [Region.US]: 'KLUS' };
    return `${prefixes[region]}${String(Math.floor(Math.random() * 900000) + 100000).padStart(9, '0')}`;
  }

  initializeData(): void {
    this.orders = [
      ...this.generateMockOrders(Region.APAC, 3500),
      ...this.generateMockOrders(Region.UK, 2800),
      ...this.generateMockOrders(Region.US, 3600)
    ];
  }

  getAllOrders(): Order[] {
    return [...this.orders];
  }

  getOrdersCount(): number {
    return this.orders.length;
  }
}

export const orderService = new OrderService(); 