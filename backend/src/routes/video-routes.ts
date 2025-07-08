import { Router } from 'express';
import { generateVideo, getUserVideos, getVideo, deleteVideo } from '../controllers/video-controller';
import { authenticateToken } from '../middleware/auth';

const router = Router();

// Protected routes - require authentication
router.use(authenticateToken);

router.post('/generate-video', generateVideo);
router.get('/videos', getUserVideos);
router.get('/videos/:id', getVideo);
router.delete('/videos/:id', deleteVideo);

export default router; 