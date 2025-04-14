import { Router } from 'express';
import { me, update, list, updateRole, remove } from '../controllers/userController';
import { authenticate, authorize } from '../middlewares/authMiddleware';

const router = Router();

router.use(authenticate);

router.get('/me', me);
router.put('/me', update);

router.get('/', authorize(['admin']), list);
router.put('/:id/role', authorize(['admin']), updateRole);
router.delete('/:id', authorize(['admin']), remove);

export default router;
