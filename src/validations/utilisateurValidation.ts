
import Joi from 'joi';

export const registerSchema = Joi.object({
  nom: Joi.string().trim().max(50).required(),
  prenom: Joi.string().trim().max(50).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  role: Joi.string().valid('utilisateur', 'bibliothecaire', 'admin')
});

export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
});

export const updateUserSchema = Joi.object({
  nom: Joi.string().trim().max(50),
  prenom: Joi.string().trim().max(50),
  email: Joi.string().email(),
  password: Joi.string().min(6),
  role: Joi.string().valid('utilisateur', 'bibliothecaire', 'admin')
});