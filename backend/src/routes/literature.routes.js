import { Router } from 'express';
import * as literatureController from '../controllers/literature.controller.js';
import { requireAuth } from '../middleware/auth.js';
import { uploadSingleFile } from '../middleware/upload.js';

const router = Router({ mergeParams: true });

router.use(requireAuth);

router.post('/', uploadSingleFile, literatureController.uploadReference);
router.get('/', literatureController.listReferences);

export default router;
