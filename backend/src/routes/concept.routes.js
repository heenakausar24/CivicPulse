import { Router } from 'express';
import * as conceptController from '../controllers/concept.controller.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router({ mergeParams: true });
router.use(requireAuth);

router.get('/', conceptController.getConceptGraph);
router.post('/nodes', conceptController.createConceptNode);
router.put('/nodes/:nodeId', conceptController.updateConceptNode);
router.delete('/nodes/:nodeId', conceptController.deleteConceptNode);

router.post('/edges', conceptController.createEdge);
router.delete('/edges/:edgeId', conceptController.deleteEdge);

export default router;
