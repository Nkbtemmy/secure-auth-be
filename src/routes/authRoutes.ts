import { Router } from 'express';
import { 
    register, 
    login, 
    logout, 
    updatePassword, 
    resetPassword, 
    verifyToken, 
    refreshToken 
} from '../controllers/authController';

const router = Router();

router.post('/register', (req, res, next) => {
    register(req, res).catch(next);
});
router.post('/login', (req, res, next) => {
    login(req, res).catch(next);
});
router.post('/logout', (req, res, next) => {
    logout(req, res).catch(next);
});

router.get('/verify-token/:token', (req, res, next) => {
    verifyToken(req, res).catch(next);
});
router.get('/refresh-token/:token', (req, res, next) => {
    refreshToken(req, res).catch(next);
});
router.put('/reset-password', (req, res, next) => {
    resetPassword(req, res).catch(next);
});
router.put('/user/:id/password', (req, res, next) => {
    updatePassword(req, res).catch(next);
});

export default router;
