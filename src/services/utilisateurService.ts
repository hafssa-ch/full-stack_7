
import Utilisateur, { IUtilisateur } from '../models/Utilisateur';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';

export const register = async (userData: Partial<IUtilisateur>): Promise<IUtilisateur> => {
  const existing = await Utilisateur.findOne({ email: userData.email });
  if (existing) throw new Error('Email déjà utilisé');
  return await Utilisateur.create(userData);
};

export const login = async (email: string, password: string): Promise<{ token: string; user: IUtilisateur }> => {
  const user = await Utilisateur.findOne({ email }).select('+password');
  if (!user) throw new Error('Identifiants invalides');
  const isMatch = await user.comparePassword(password);
  if (!isMatch) throw new Error('Identifiants invalides');
  const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET as string, { expiresIn: '30d' });
  user.password = undefined as any;
  return { token, user };
};

export const getAllUsers = async (options: any = {}) => {
  const page = options.page || 1;
  const limit = options.limit || 10;
  const skip = (page - 1) * limit;
  const users = await Utilisateur.find({}).skip(skip).limit(limit).select('-password');
  const total = await Utilisateur.countDocuments();
  return { users, pagination: { page, limit, totalPages: Math.ceil(total / limit), totalItems: total } };
};

export const getUserById = async (id: string): Promise<IUtilisateur | null> => {
  if (!mongoose.Types.ObjectId.isValid(id)) return null;
  return await Utilisateur.findById(id).select('-password').lean() as unknown as IUtilisateur | null;
};

export const updateUser = async (id: string, data: Partial<IUtilisateur>): Promise<IUtilisateur | null> => {
  if (!mongoose.Types.ObjectId.isValid(id)) return null;
  if (data.password) {
    // Le hachage se fera via le pre-save
    const user = await Utilisateur.findById(id);
    if (user) user.password = data.password;
    await user?.save();
    delete data.password;
  }
  return await Utilisateur.findByIdAndUpdate(id, data, { new: true, runValidators: true })
    .select('-password')
    .lean() as unknown as IUtilisateur | null;
};

export const deleteUser = async (id: string): Promise<boolean> => {
  if (!mongoose.Types.ObjectId.isValid(id)) return false;
  const result = await Utilisateur.findByIdAndDelete(id);
  return result !== null;
};