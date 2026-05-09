
import { Request, Response } from 'express';
import * as utilisateurService from '../services/utilisateurService';

export const register = async (req: Request, res: Response) => {
  try {
    const user = await utilisateurService.register(req.body);
    res.status(201).json({ success: true, data: user });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const { token, user } = await utilisateurService.login(email, password);
    res.status(200).json({ success: true, token, data: user });
  } catch (error: any) {
    res.status(401).json({ success: false, error: error.message });
  }
};

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const options = { page: parseInt(req.query.page as string) || 1, limit: parseInt(req.query.limit as string) || 10 };
    const result = await utilisateurService.getAllUsers(options);
    res.status(200).json({ success: true, data: result.users, pagination: result.pagination });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const user = await utilisateurService.getUserById(req.params.id);
    if (!user) return res.status(404).json({ success: false, error: 'Utilisateur non trouvé' });
    res.status(200).json({ success: true, data: user });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const user = await utilisateurService.updateUser(req.params.id, req.body);
    if (!user) return res.status(404).json({ success: false, error: 'Utilisateur non trouvé' });
    res.status(200).json({ success: true, data: user });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const deleted = await utilisateurService.deleteUser(req.params.id);
    if (!deleted) return res.status(404).json({ success: false, error: 'Utilisateur non trouvé' });
    res.status(204).json({ success: true, data: null });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};