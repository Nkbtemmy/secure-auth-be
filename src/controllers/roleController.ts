import { Request, Response, NextFunction } from 'express';
import {
    getAllRoles,
    getRoleById,
    createRole,
    updateRole,
    deleteRole,
} from '../services/roleService';

export const listRoles = async (_: Request, res: Response, next: NextFunction) => {
    try {
        const roles = await getAllRoles();
        res.json(roles);
    } catch (err: unknown) {
        next(err);
    }
};

export const getRole = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const roleId = Number(req.params.id);
        if (isNaN(roleId)) {
            return res.status(400).json({ error: 'Invalid role ID' });
        }
        const role = await getRoleById(roleId);
        if (!role) return res.status(404).json({ error: 'Role not found' });
        res.json(role);
    } catch (err: unknown) {
        next(err);
    }
};

export const create = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!req.body.name) {
            return res.status(400).json({ error: 'Role name is required' });
        }
        const role = await createRole(req.body.name);
        res.status(201).json(role);
    } catch (err: unknown) {
        next(err);
    }
};

export const update = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const roleId = Number(req.params.id);
        if (isNaN(roleId)) {
            return res.status(400).json({ error: 'Invalid role ID' });
        }
        if (!req.body.name) {
            return res.status(400).json({ error: 'Role name is required' });
        }
        const role = await updateRole(roleId, req.body.name);
        res.json(role);
    } catch (err: unknown) {
        next(err);
    }
};

export const remove = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const roleId = Number(req.params.id);
        if (isNaN(roleId)) {
            return res.status(400).json({ error: 'Invalid role ID' });
        }
        await deleteRole(roleId);
        res.json({ message: 'Role deleted successfully' });
    } catch (err: unknown) {
        next(err);
    }
};
