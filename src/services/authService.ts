import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { db } from '../utils/db';
import { generateToken } from '../utils/jwt';
import { resetUserPassword } from './userService';

export const registerUser = async (name: string, email: string, password: string) => {
    const existingUser = await db.user.findUnique({ where: { email } });
    if (existingUser) throw new Error('Email already registered');

    const role = await db.role.findUnique({ where: { name: 'USER' } });
    if (!role) throw new Error('Role not found');

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await db.user.create({
        data: {
            name,
            email,
            password: hashedPassword,
            roleId: role.id,
        },
    });

    return {
        id: user.id,
        email: user.email,
        role: role.name,
        token: generateToken({ id: user.id, role: role.name }),
    };
};

export const loginUser = async (email: string, password: string) => {
    const user = await db.user.findUnique({ where: { email }, include: { role: true } });
    if (!user) throw new Error('Invalid credentials');

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) throw new Error('Invalid credentials');
    const { password: _, ...userWithoutPassword } = user;
    return {
        user: userWithoutPassword,
        token: generateToken({ id: user.id, role: user.role.name }),
    };
};

export const getUserProfile = async (userId: string) => {
    const user = await db.user.findUnique({
        where: { id: Number(userId) },
        include: { role: true },
    });
    if (!user) throw new Error('User not found');

    return {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role.name,
    };
};

export const updateUserProfile = async (userId: string, name: string, email: string) => {
    const user = await db.user.findUnique({ where: { id: Number(userId) } });
    if (!user) throw new Error('User not found');

    const updatedUser = await db.user.update({
        where: { id: Number(userId) },
        data: { name, email },
    });

    return {
        id: updatedUser.id,
        name: updatedUser.name,
        email: updatedUser.email,
    };
};

export const changeUserPassword = async (userId: string, oldPassword: string, newPassword: string) => {
    const user = await db.user.findUnique({ where: { id: Number(userId) } });
    if (!user) throw new Error('User not found');

    const valid = await bcrypt.compare(oldPassword, user.password);
    if (!valid) throw new Error('Invalid credentials');

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await db.user.update({
        where: { id: Number(userId) },
        data: { password: hashedPassword },
    });

    return { message: 'Password updated successfully' };
};

export const deleteUserService = async (userId: string) => {
    const user = await db.user.findUnique({ where: { id: Number(userId) } });
    if (!user) throw new Error('User not found');

    await db.user.delete({ where: { id: Number(userId) } });

    return { message: 'User deleted successfully' };
};

// Alias updatePassword to changeUserPassword
export const updatePassword = changeUserPassword;

// Alias resetPassword to resetUserPassword
export const resetPassword = resetUserPassword;

export const verifyToken = (token: string) => {
    try {
        const secret = process.env.JWT_SECRET as string;
        return jwt.verify(token, secret);
    } catch (err) {
        throw new Error('Invalid token');
    }
};

export const refreshToken = (oldToken: string) => {
    const payload = verifyToken(oldToken) as { id: string; role: string; [key: string]: any };
    // Optionally remove token-specific fields like iat and exp
    const { iat, exp, ...data } = payload;
    return generateToken(data);
};