
import Joi from 'joi';

const genresValides = ['Roman', 'Science-Fiction', 'Fantastique', 'Policier', 'Biographie', 'Histoire', 'Philosophie', 'Poésie', 'Théâtre', 'Jeunesse', 'Autre'];

export const createLivreSchema = Joi.object({
  titre: Joi.string().trim().max(100).required(),
  auteur: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
  isbn: Joi.string().trim().required(),
  anneePublication: Joi.number().integer().min(1000).max(new Date().getFullYear()).required(),
  genre: Joi.array().items(Joi.string().valid(...genresValides)).min(1).required(),
  resume: Joi.string().trim().max(2000).allow('', null),
  disponible: Joi.boolean()
});

export const updateLivreSchema = createLivreSchema.fork(['titre', 'auteur', 'isbn', 'anneePublication', 'genre'], (schema) => schema.optional());