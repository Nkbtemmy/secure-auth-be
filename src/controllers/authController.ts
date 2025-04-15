import { Request, Response } from 'express';
import {
    registerUser,
    loginUser,
    updatePassword as updatePasswordService,
    resetPassword as resetPasswordService,
    verifyToken as verifyTokenService,
    refreshToken as refreshTokenService,
} from '../services/authService';

export const register = async (req: Request, res: Response) => {
    const { name, email, password } = req.body;

    try {
        const user = await registerUser(name, email, password);
        return res.status(201).json(user);
    } catch (err: any) {
        return res.status(400).json({ error: err.message });
    }
};

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
        const user = await loginUser(email, password);
        return res.status(200).json(user);
    } catch (err: any) {
        return res.status(400).json({ error: err.message });
    }
};

export const logout = async (req: Request, res: Response) => {
    // Implement logout logic here if needed.
    return res.status(200).json({ message: 'Logged out successfully' });
};

export const updatePassword = async (req: Request, res: Response) => {
    const userId = req.params.id;
    const { oldPassword, newPassword } = req.body;
    try {
        const user = await updatePasswordService(userId, oldPassword, newPassword);
        return res.status(200).json(user);
    } catch (err: any) {
        return res.status(400).json({ error: err.message });
    }
};

export const resetPassword = async (req: Request, res: Response) => {
    const { email, newPassword } = req.body;
    try {
        const user = await resetPasswordService(email, newPassword);
        return res.status(200).json(user);
    } catch (err: any) {
        return res.status(400).json({ error: err.message });
    }
};

export const verifyToken = async (req: Request, res: Response) => {
    const token = req.params.token;
    try {
        const user = await verifyTokenService(token);
        return res.status(200).json(user);
    } catch (err: any) {
        return res.status(400).json({ error: err.message });
    }
};

export const refreshToken = async (req: Request, res: Response) => {
    const token = req.params.token;
    try {
        const user = await refreshTokenService(token);
        return res.status(200).json(user);
    } catch (err: any) {
        return res.status(400).json({ error: err.message });
    }
};
