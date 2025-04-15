import { db } from '../utils/db';
import bcrypt from 'bcrypt';

export const getProfile = async (userId: number) => {
  return db.user.findUnique({
    where: { id: userId },
    include: { role: true },
  });
};

export const updateProfile = async (userId: number, data: any) => {
  return db.user.update({
    where: { id: userId },
    data,
  });
};

export const listUsers = async () => {
  return db.user.findMany({ include: { role: true } });
};

export const changeUserRole = async (userId: number, roleId: number) => {
  return db.user.update({
    where: { id: userId },
    data: { roleId },
  });
};
export const deleteUser = async (userId: number) => {
  return db.user.delete({
    where: { id: userId },
  });
};
export const getUserByEmail = async (email: string) => {
  return db.user.findUnique({
    where: { email },
    include: { role: true },
  });
}

export const getAllUsers = async () => {
  const users = await db.user.findMany({
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

export const updateUserRole = async (userId: string, roleName: string) => {
  const user = await db.user.findUnique({ where: { id: Number(userId) } });
  if (!user) throw new Error('User not found');

  const role = await db.role.findUnique({ where: { name: roleName } });
  if (!role) throw new Error('Role not found');

  await db.user.update({
      where: { id: Number(userId) },
      data: { roleId: role.id },
  });

  return { message: 'User role updated successfully' };
};

export const resetUserPassword = async (email: string, newPassword: string) => {
  const user = await db.user.findUnique({ where: { email } });
  if (!user) throw new Error('User not found');


  const hashedPassword = await bcrypt.hash(newPassword, 10);
  await db.user.update({
      where: { email },
      data: { password: hashedPassword },
  });

  return { message: 'Password reset successfully' };
};

export const getUserByRole = async (roleName: string) => {
  const role = await db.role.findUnique({ where: { name: roleName } });
  if (!role) throw new Error('Role not found');

  const users = await db.user.findMany({
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
  const user = await db.user.findUnique({ where: { id: Number(userId) } });
  if (!user) throw new Error('User not found');

  await db.user.update({
      where: { id: Number(userId) },
      data: { isActive: status },
  });

  return { message: `User status updated to ${status ? 'active' : 'inactive'}` };
};

export const getUserByName = async (name: string) => {
  const user = await db.user.findUnique({
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
  const user = await db.user.findUnique({ where: { id: Number(userId) } });
  if (!user) throw new Error('User not found');

  await db.user.update({
      where: { id: Number(userId) },
      data: { email },
  });

  return { message: 'Email updated successfully' };
};

export const getUserByPhone = async (phone: string) => {
  const user = await db.user.findUnique({
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
  const user = await db.user.findUnique({ where: { id: Number(userId) } });
  if (!user) throw new Error('User not found');

  await db.user.update({
      where: { id: Number(userId) },
      data: { phone },
  });

  return { message: 'Phone updated successfully' };
};

// Missing functions added below

export const updateUser = async (
userId: string, data: { name?: string; email?: string; phone?: string; }, email: any, password: any) => {
  const user = await db.user.findUnique({ where: { id: Number(userId) } });
  if (!user) throw new Error('User not found');

  const updatedUser = await db.user.update({
      where: { id: Number(userId) },
      data,
  });

  return {
      id: updatedUser.id,
      name: updatedUser.name,
      email: updatedUser.email,
  };
};