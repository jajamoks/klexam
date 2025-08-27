import express from 'express';
import cors from 'cors';
import orderRoutes from './routes/orderRoutes';

import { orderService } from './services/orderService';

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize data
orderService.initializeData();

// Routes
app.use('/api/orders', orderRoutes);


// Error handling middleware
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Start server
app.listen(PORT, () => {
  console.log(`King Living Orders API running on http://localhost:${PORT}`);

});

export default app; 