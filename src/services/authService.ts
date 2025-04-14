import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import prisma from '../config/prisma';
import { generateToken } from '../utils/jwt';

export const registerUser = async (name: string, email: string, password: string) => {
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) throw new Error('Email already registered');

    const role = await prisma.role.findUnique({ where: { name: 'user' } });
    if (!role) throw new Error('Role not found');

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
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
    const user = await prisma.user.findUnique({ where: { email }, include: { role: true } });
    if (!user) throw new Error('Invalid credentials');

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) throw new Error('Invalid credentials');

    return {
        id: user.id,
        email: user.email,
        role: user.role.name,
        token: generateToken({ id: user.id, role: user.role.name }),
    };
};

export const getUserProfile = async (userId: string) => {
    const user = await prisma.user.findUnique({
        where: { id: userId },
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
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new Error('User not found');

    const updatedUser = await prisma.user.update({
        where: { id: userId },
        data: { name, email },
    });

    return {
        id: updatedUser.id,
        name: updatedUser.name,
        email: updatedUser.email,
    };
};

export const changeUserPassword = async (userId: string, oldPassword: string, newPassword: string) => {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new Error('User not found');

    const valid = await bcrypt.compare(oldPassword, user.password);
    if (!valid) throw new Error('Invalid credentials');

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await prisma.user.update({
        where: { id: userId },
        data: { password: hashedPassword },
    });

    return { message: 'Password updated successfully' };
};

export const deleteUser = async (userId: string) => {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new Error('User not found');

    await prisma.user.delete({ where: { id: userId } });

    return { message: 'User deleted successfully' };
};

export const getAllUsers = async () => {
    const users = await prisma.user.findMany({
        include: { role: true },
    });

    return users.map((user: { id: any; name: string; email: string; role: { name: string } }) => ({
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role.name,
    }));
};

export const getUserById = async (userId: string) => {
    const user = await prisma.user.findUnique({
        where: { id: userId },
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

export const updateUserRole = async (userId: string, roleName: string) => {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new Error('User not found');

    const role = await prisma.role.findUnique({ where: { name: roleName } });
    if (!role) throw new Error('Role not found');

    await prisma.user.update({
        where: { id: userId },
        data: { roleId: role.id },
    });

    return { message: 'User role updated successfully' };
};

export const getUserByEmail = async (email: string) => {
    const user = await prisma.user.findUnique({
        where: { email },
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

export const resetUserPassword = async (email: string, newPassword: string) => {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) throw new Error('User not found');

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await prisma.user.update({
        where: { email },
        data: { password: hashedPassword },
    });

    return { message: 'Password reset successfully' };
};

export const getUserByRole = async (roleName: string) => {
    const role = await prisma.role.findUnique({ where: { name: roleName } });
    if (!role) throw new Error('Role not found');

    const users = await prisma.user.findMany({
        where: { roleId: role.id },
        include: { role: true },
    });

    return users.map((user: { id: any; name: any; email: any; role: { name: any } }) => ({
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role.name,
    }));
};

export const updateUserStatus = async (userId: string, status: boolean) => {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new Error('User not found');

    await prisma.user.update({
        where: { id: userId },
        data: { isActive: status },
    });

    return { message: `User status updated to ${status ? 'active' : 'inactive'}` };
};

export const getUserByName = async (name: string) => {
    const user = await prisma.user.findUnique({
        where: { name },
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

export const updateUserEmail = async (userId: string, email: string) => {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new Error('User not found');

    await prisma.user.update({
        where: { id: userId },
        data: { email },
    });

    return { message: 'Email updated successfully' };
};

export const getUserByPhone = async (phone: string) => {
    const user = await prisma.user.findUnique({
        where: { phone },
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

export const updateUserPhone = async (userId: string, phone: string) => {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new Error('User not found');

    await prisma.user.update({
        where: { id: userId },
        data: { phone },
    });

    return { message: 'Phone updated successfully' };
};

// Missing functions added below

export const updateUser = async (
userId: string, data: { name?: string; email?: string; phone?: string; }, email: any, password: any) => {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new Error('User not found');

    const updatedUser = await prisma.user.update({
        where: { id: userId },
        data,
    });

    return {
        id: updatedUser.id,
        name: updatedUser.name,
        email: updatedUser.email,
        phone: updatedUser.phone,
    };
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