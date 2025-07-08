import { Router } from 'express';
import { generateVideo } from '../controllers/video-controller';

const router = Router();

router.post('/generate-video', generateVideo);

export default router; 