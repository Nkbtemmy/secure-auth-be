import { Router, RequestHandler } from 'express';
import {
    me,
    update,
    list,
    updateRole,
    deleteUser,
    getUser,
    getUserByEmail,
    updateUser,
    create,
} from '../controllers/userController';
import { authenticate, authorize } from '../middlewares/authMiddleware';

const router = Router();

// All routes require authentication
router.use(authenticate as RequestHandler);

// Routes for the current authenticated user
router.get('/me', (req, res, next) => {
    me(req, res).catch(next);
});
router.put('/me', (req, res, next) => {
    update(req, res).catch(next);
});

// Admin-only routes
router.post('/', authorize(["SUPER_ADMIN", "ADMIN"]) as RequestHandler, (req, res, next) => {
    create(req, res).catch(next);
});
router.get('/', authorize(["SUPER_ADMIN", "ADMIN"]) as RequestHandler, (req, res, next) => {
    list(req, res).catch(next);
});
router.get('/email/:email', authorize(["SUPER_ADMIN", "ADMIN"]) as RequestHandler, (req, res, next) => {
    getUserByEmail(req, res).catch(next);
});
router.get('/:id', authorize(["SUPER_ADMIN", "ADMIN"]) as RequestHandler, (req, res, next) => {
    getUser(req, res).catch(next);
});
router.put('/:id', authorize(["SUPER_ADMIN", "ADMIN"]) as RequestHandler, (req, res, next) => {
    updateUser(req, res).catch(next);
});
router.put('/:id/role', authorize(["SUPER_ADMIN", "ADMIN"]) as RequestHandler, (req, res, next) => {
    updateRole(req, res).catch(next);
});
router.delete('/:id', authorize(["SUPER_ADMIN", "ADMIN"]) as RequestHandler, (req, res, next) => {
    deleteUser(req, res).catch(next);
});

export default router;
