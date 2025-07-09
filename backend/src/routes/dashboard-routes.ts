import { Router } from 'express';
import { getDashboardStats, getRecentProjects } from '../controllers/dashboard-controller';
import { authenticateToken } from '../middleware/auth';

const router = Router();

router.get('/stats', authenticateToken, getDashboardStats);
router.get('/projects', authenticateToken, getRecentProjects);

export default router; 