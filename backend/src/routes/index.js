import { Router } from 'express';
import authRoutes from './auth.routes.js';

const router = Router();

// Mounting routers
router.use('/auth', authRoutes);

// Health check route
router.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'CivicPulse API is running healthy.',
    timestamp: new Date().toISOString(),
  });
});

export default router;
