import { RequestHandler, Router } from 'express';
import { getDashboard } from '../controllers/dashboardController';
import { authenticate, authorize } from '../middlewares/authMiddleware';

const router = Router();
router.use(authenticate as RequestHandler, authorize(["SUPER_ADMIN", "ADMIN", "USERclear"]) as RequestHandler);
router.get('/',(req, res, next) => {
    getDashboard(req, res).catch(next);
});
export default router;
