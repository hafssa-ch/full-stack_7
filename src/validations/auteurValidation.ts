
import Joi from 'joi';

export const createAuteurSchema = Joi.object({
  nom: Joi.string().trim().max(50).required(),
  prenom: Joi.string().trim().max(50).required(),
  dateNaissance: Joi.date().iso().required(),
  biographie: Joi.string().trim().max(1000).allow('', null)
});

export const updateAuteurSchema = createAuteurSchema.fork(['nom', 'prenom', 'dateNaissance'], (schema) => schema.optional());