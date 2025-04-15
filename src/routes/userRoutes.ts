import { Router, RequestHandler } from 'express';
import {
    me,
    update,
    list,
    updateRole,
    remove,
    getUser,
    getAllUsers,
    updateUser,
    deleteUser,
} from '../controllers/userController';
import { authenticate, authorize } from '../middlewares/authMiddleware';
import { getUserByEmail, updateUserRole } from '../services/userService';

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
router.get('/', authorize(['admin']) as RequestHandler, (req, res, next) => {
    list(req, res).catch(next);
});
router.put('/:id/role', authorize(['admin']) as RequestHandler, (req, res, next) => {
    updateRole(req, res).catch(next);
});
router.delete('/:id', authorize(['admin']) as RequestHandler, (req, res, next) => {
    remove(req, res).catch(next);
});
router.get('/user/:id', (req, res, next) => {
    getUser(req, res).catch(next);
});
router.get('/users', (req, res, next) => {
    getAllUsers(req, res).catch(next);
});

router.put('/user/:id', (req, res, next) => {
    updateUser(req, res).catch(next);
});
router.delete('/user/:id', (req, res, next) => {
    deleteUser(req, res).catch(next);
});

router.put('/user/:id/role', (req, res, next) => {
    updateUserRole(req, res).catch(next);
});
router.get('/user/email/:email', (req, res, next) => {
    getUserByEmail(req, res).catch(next);
});



export default router;
