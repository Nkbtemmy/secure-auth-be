import { Request, Response } from 'express';
import { getProfile, updateProfile, listUsers, changeUserRole } from '../services/userService';
import { deleteUserService } from '../services/authService';

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
export const getUser = async (req: Request, res: Response) => {
  const userId = req.params.id;
  try {
      const user = await getUserByIdService(userId);
      return res.status(200).json(user);
  } catch (err: any) {
      return res.status(400).json({ error: err.message });
  }
};

export const getAllUsers = async (req: Request, res: Response) => {
  try {
      const users = await getAllUsersService();
      return res.status(200).json(users);
  } catch (err: any) {
      return res.status(400).json({ error: err.message });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  const userId = req.params.id;
  const { name, email, password } = req.body;
  try {
      const user = await updateUserService(userId, name, email, password);
      return res.status(200).json(user);
  } catch (err: any) {
      return res.status(400).json({ error: err.message });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  const userId = req.params.id;
  try {
      const user = await deleteUserService(userId);
      return res.status(200).json(user);
  } catch (err: any) {
      return res.status(400).json({ error: err.message });
  }
};


export const getUserByEmail = async (req: Request, res: Response) => {
  const email = req.params.email;
  try {
      const user = await getUserByIdService(email);
      return res.status(200).json(user);
  } catch (err: any) {
      return res.status(400).json({ error: err.message });
  }
};

function getUserByIdService(userId: string) {
  throw new Error('Function not implemented.');
}
function getAllUsersService() {
  throw new Error('Function not implemented.');
}

function updateUserService(userId: string, name: any, email: any, password: any) {
  throw new Error('Function not implemented.');
}

