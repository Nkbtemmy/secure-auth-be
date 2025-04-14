import { Request, Response } from 'express';
import { getProfile, updateProfile, listUsers, changeUserRole, deleteUser } from '../services/userService';

export const me = async (req: Request, res: Response) => {
  try {
    const user = await getProfile((req as any).user.id);
    res.json(user);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const update = async (req: Request, res: Response) => {
  try {
    const user = await updateProfile((req as any).user.id, req.body);
    res.json(user);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const list = async (_: Request, res: Response) => {
  try {
    const users = await listUsers();
    res.json(users);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const updateRole = async (req: Request, res: Response) => {
  try {
    const user = await changeUserRole(Number(req.params.id), req.body.roleId);
    res.json(user);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};
export const remove = async (req: Request, res: Response) => {
  try {
    const user = await deleteUser(Number(req.params.id));
    res.json(user);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};