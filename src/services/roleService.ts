import prisma from '../config/prisma';

export const getAllRoles = async () => {
  return prisma.role.findMany({ orderBy: { name: 'asc' } });
};

export const getRoleById = async (id: number) => {
  return prisma.role.findUnique({ where: { id } });
};

export const createRole = async (name: string) => {
  return prisma.role.create({ data: { name } });
};

export const updateRole = async (id: number, name: string) => {
  return prisma.role.update({
    where: { id },
    data: { name },
  });
};

export const deleteRole = async (id: number) => {
  return prisma.role.delete({ where: { id } });
};
