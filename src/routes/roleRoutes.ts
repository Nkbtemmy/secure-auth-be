import { Router, RequestHandler } from 'express';
import {
  getRole,
  create,
  update,
  remove,
  listRoles,
} from '../controllers/roleController';
import { authenticate, authorize, isAdmin } from '../middlewares/authMiddleware';

const router = Router();

router.use(authenticate as RequestHandler, authorize(["SUPER_ADMIN", "ADMIN"]) as RequestHandler);

router.post('/', (req, res, next) => {
    create(req, res, next).catch(next);
});
router.get('/', (req, res, next) => {
    listRoles(req, res, next).catch(next);
});
router.get('/:id', (req, res, next) => {
    getRole(req, res, next).catch(next);
});
router.put('/:id', (req, res, next) => {
    update(req, res, next).catch(next);
});
router.delete('/:id', (req, res, next) => {
    remove(req, res, next).catch(next);
});

export default router;
