import prisma from '../config/prisma';
import bcrypt from 'bcryptjs';

export const createUser = async (data: { name: string; email: string; password: string; roleId: number }) => {
  const hashedPassword = await bcrypt.hash(data.password, 10);
  return prisma.user.create({
    data: {
      ...data,
      password: hashedPassword,
    },
  });
};

export const getProfile = async (userId: number) => {
  return prisma.user.findUnique({
    where: { id: userId },
    include: { role: true },
  });
};

export const updateProfile = async (userId: number, data: { name?: string; email?: string }) => {
  return prisma.user.update({
    where: { id: userId },
    data,
  });
};

export const listUsers = async () => {
  return prisma.user.findMany({ include: { role: true } });
};

export const changeUserRole = async (userId: number, roleId: number) => {
  return prisma.user.update({
    where: { id: userId },
    data: { roleId },
  });
};

export const deleteUser = async (userId: number) => {
  return prisma.user.delete({
    where: { id: userId },
  });
};

export const getUserByEmail = async (email: string) => {
  return prisma.user.findUnique({
    where: { email },
    include: { role: true },
  });
};

export const getAllUsers = async () => {
  const users = await prisma.user.findMany({
    include: { role: true },
  });
  return users.map(user => ({
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role.name,
  }));
};

export const getUserById = async (userId: string) => {
  const user = await prisma.user.findUnique({
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

export const updateUserRole = async (userId: string, roleName: string) => {
  const user = await prisma.user.findUnique({ where: { id: Number(userId) } });
  if (!user) throw new Error('User not found');

  const role = await prisma.role.findUnique({ where: { name: roleName } });
  if (!role) throw new Error('Role not found');

  await prisma.user.update({
    where: { id: Number(userId) },
    data: { roleId: role.id },
  });

  return { message: 'User role updated successfully' };
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

  return users.map(user => ({
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role.name,
  }));
};

export const updateUserEmail = async (userId: string, email: string) => {
  const user = await prisma.user.findUnique({ where: { id: Number(userId) } });
  if (!user) throw new Error('User not found');

  await prisma.user.update({
    where: { id: Number(userId) },
    data: { email },
  });

  return { message: 'Email updated successfully' };
};
