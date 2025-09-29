import express, { Request, Response, NextFunction, Application } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import journalRoutes from './routes/journal.js';

dotenv.config();

const app: Application = express();
const PORT: number = parseInt(process.env.PORT || '5000', 10);

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/auth', authRoutes);
app.use('/journal', journalRoutes);

// Health check endpoint
app.get('/health', (_req: Request, res: Response): void => {
  res.json({ message: 'AI Journal API is running' });
});

// Error handling middleware
app.use((err: Error, _req: Request, res: Response, _next: NextFunction): void => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// 404 handler
app.use('*', (_req: Request, res: Response): void => {
  res.status(404).json({ error: 'Route not found' });
});

app.listen(PORT, (): void => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;