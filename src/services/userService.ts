import prisma from '../config/prisma';

export const getProfile = async (userId: number) => {
  return prisma.user.findUnique({
    where: { id: userId },
    include: { role: true },
  });
};

export const updateProfile = async (userId: number, data: any) => {
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
}