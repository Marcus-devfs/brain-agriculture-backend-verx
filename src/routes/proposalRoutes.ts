import { Router } from 'express';
import { CreditProposalController } from '../controllers/creditProposalController';

const router = Router();

router.get('/', (_, res: any) => res.json({ message: 'Hello World' }));
router.get('/proposals', CreditProposalController.getAll);
router.post('/proposal/create', CreditProposalController.create);
router.put('/proposal/update/:id', CreditProposalController.update);
router.delete('/proposal/delete/:id', CreditProposalController.remove);

export default router;
