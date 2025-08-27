import type { Request, Response } from 'express';
import type { OrderQueryParams } from '../types/order';
import { filterService } from '../services/filterService';

class OrderController {
  async getOrders(req: Request<{}, {}, {}, OrderQueryParams>, res: Response) {
    try {
      const result = filterService.filterAndPaginateOrders(req.query);
      res.json(result);
    } catch (error) {
      console.error('Error in getOrders:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}

export const orderController = new OrderController(); 