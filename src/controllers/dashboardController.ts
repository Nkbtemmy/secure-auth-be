import { Request, Response } from 'express';

import prisma from "../config/prisma";

export const getDashboard = async (req: Request, res: Response) => {
    try {
      const userId = (req as any).user.id;
  
      const totalVisits = await prisma.userActivity.count({
        where: { userId, action: 'Logged in' },
      });
      const totalUsers = await prisma.user.count({});
      const totalroles = await prisma.role.count({});
  
      const recentActivity = await prisma.userActivity.findMany({
        where: { userId },
        orderBy: { timestamp: 'desc' },
        take: 5,
      });
  
      const stats = {
        totalVisits,
        systemUsers: totalUsers,
        systemRoles: totalroles,
        tasks: 0,
      };
  
      return res.status(200).json({ stats, recentActivity });
    } catch (err: any) {
      return res.status(500).json({ error: 'Failed to fetch dashboard data' });
    }
  };
  