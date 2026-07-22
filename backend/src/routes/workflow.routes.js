import { Router } from 'express';
import * as workflowController from '../controllers/workflow.controller.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router({ mergeParams: true });
router.use(requireAuth);

router.get('/', workflowController.listWorkflowCards);
router.post('/', workflowController.createWorkflowCard);
router.put('/:cardId', workflowController.updateWorkflowCard);
router.delete('/:cardId', workflowController.deleteWorkflowCard);

export default router;
