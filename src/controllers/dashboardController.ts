// import { Request, Response } from 'express';

import prisma from "../config/prisma";

// import { db } from "../utils/db";

// export const getDashboard = async (req: Request, res: Response) => {
//   try {
//     // Example mock data — in real case, pull from DB
//     const stats = {
//       totalVisits: 1240,
//       activeProjects: 8,
//       notifications: 5,
//       tasks: 13,
//     };

//     const recentActivity = [
//       {
//         id: 1,
//         action: 'Logged in',
//         timestamp: new Date().toISOString(),
//       },
//       {
//         id: 2,
//         action: 'Updated profile',
//         timestamp: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
//       },
//       {
//         id: 3,
//         action: 'Viewed dashboard',
//         timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
//       },
//     ];

//     return res.status(200).json({ stats, recentActivity });
//   } catch (err: any) {
//     return res.status(500).json({ error: 'Failed to fetch dashboard data' });
//   }
// };


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
  