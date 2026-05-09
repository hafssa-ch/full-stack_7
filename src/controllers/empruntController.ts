
import { Request, Response } from 'express';
import * as empruntService from '../services/empruntService';

export const createEmprunt = async (req: Request, res: Response) => {
  try {
    const emprunt = await empruntService.createEmprunt(req.body);
    res.status(201).json({ success: true, data: emprunt });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
};

export const getAllEmprunts = async (req: Request, res: Response) => {
  try {
    const options = {
      page: parseInt(req.query.page as string) || 1,
      limit: parseInt(req.query.limit as string) || 10,
      utilisateur: req.query.utilisateur as string,
      statut: req.query.statut as string
    };
    const result = await empruntService.getAllEmprunts(options);
    res.status(200).json({ success: true, data: result.emprunts, pagination: result.pagination });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const getEmpruntById = async (req: Request, res: Response) => {
  try {
    const emprunt = await empruntService.getEmpruntById(req.params.id);
    if (!emprunt) return res.status(404).json({ success: false, error: 'Emprunt non trouvé' });
    res.status(200).json({ success: true, data: emprunt });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const returnEmprunt = async (req: Request, res: Response) => {
  try {
    const emprunt = await empruntService.returnEmprunt(req.params.id);
    if (!emprunt) return res.status(404).json({ success: false, error: 'Emprunt non trouvé' });
    res.status(200).json({ success: true, data: emprunt });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
};