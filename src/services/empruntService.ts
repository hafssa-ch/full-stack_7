import Emprunt, { IEmprunt } from '../models/Emprunt';
import Livre from '../models/Livre';
import mongoose from 'mongoose';

export const createEmprunt = async (empruntData: Partial<IEmprunt>): Promise<IEmprunt> => {
  const livre = await Livre.findById(empruntData.livre);
  if (!livre) throw new Error('Livre non trouvé');
  if (!livre.disponible) throw new Error('Livre déjà emprunté');
  const emprunt = await Emprunt.create(empruntData);
  livre.disponible = false;
  await livre.save();
  return emprunt;
};

export const getAllEmprunts = async (options: any = {}) => {
  const page = options.page || 1;
  const limit = options.limit || 10;
  const skip = (page - 1) * limit;
  const filter: any = {};
  if (options.utilisateur) filter.utilisateur = options.utilisateur;
  if (options.statut) filter.statut = options.statut;
  const emprunts = await Emprunt.find(filter).skip(skip).limit(limit).populate('livre utilisateur');
  const total = await Emprunt.countDocuments(filter);
  return { emprunts, pagination: { page, limit, totalPages: Math.ceil(total / limit), totalItems: total } };
};

export const getEmpruntById = async (id: string): Promise<IEmprunt | null> => {
  if (!mongoose.Types.ObjectId.isValid(id)) return null;
  return await Emprunt.findById(id).populate('livre utilisateur');
};

export const returnEmprunt = async (id: string): Promise<IEmprunt | null> => {
  if (!mongoose.Types.ObjectId.isValid(id)) return null;
  const emprunt = await Emprunt.findById(id);
  if (!emprunt) return null;
  if (emprunt.statut === 'rendu') throw new Error('Ce livre a déjà été rendu');
  emprunt.dateRetourEffective = new Date();
  emprunt.statut = 'rendu';
  await emprunt.save();
  await Livre.findByIdAndUpdate(emprunt.livre, { disponible: true });
  return emprunt;
};
