
import Livre, { ILivre } from '../models/Livre';
import mongoose from 'mongoose';

interface QueryOptions {
  page?: number; limit?: number; sort?: string; titre?: string; auteur?: string; genre?: string;
}

export const createLivre = async (livreData: Partial<ILivre>): Promise<ILivre> => {
  return await Livre.create(livreData);
};

export const getAllLivres = async (options: QueryOptions = {}) => {
  const page = options.page || 1;
  const limit = options.limit || 10;
  const skip = (page - 1) * limit;
  const filter: any = {};
  if (options.titre) filter.titre = { $regex: options.titre, $options: 'i' };
  if (options.auteur && mongoose.Types.ObjectId.isValid(options.auteur)) filter.auteur = options.auteur;
  if (options.genre) filter.genre = options.genre;
  let sort = {};
  if (options.sort) {
    const sortField = options.sort.startsWith('-') ? options.sort.substring(1) : options.sort;
    const sortOrder = options.sort.startsWith('-') ? -1 : 1;
    sort = { [sortField]: sortOrder };
  } else sort = { createdAt: -1 };
  const livres = await Livre.find(filter).sort(sort).skip(skip).limit(limit).populate('auteur');
  const total = await Livre.countDocuments(filter);
  return { livres, pagination: { page, limit, totalPages: Math.ceil(total / limit), totalItems: total } };
};

export const getLivreById = async (id: string): Promise<ILivre | null> => {
  if (!mongoose.Types.ObjectId.isValid(id)) return null;
  return await Livre.findById(id).populate('auteur');
};

export const updateLivre = async (id: string, livreData: Partial<ILivre>): Promise<ILivre | null> => {
  if (!mongoose.Types.ObjectId.isValid(id)) return null;
  return await Livre.findByIdAndUpdate(id, livreData, { new: true, runValidators: true });
};

export const deleteLivre = async (id: string): Promise<boolean> => {
  if (!mongoose.Types.ObjectId.isValid(id)) return false;
  const result = await Livre.findByIdAndDelete(id);
  return result !== null;
};