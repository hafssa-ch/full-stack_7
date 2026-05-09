import Joi from 'joi';

export const createEmpruntSchema = Joi.object({
  livre: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
  utilisateur: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
  dateRetourPrevue: Joi.date().greater('now').required(),
  dateRetourEffective: Joi.date().allow(null)
});

export const updateEmpruntSchema = Joi.object({
  dateRetourEffective: Joi.date().allow(null),
  statut: Joi.string().valid('emprunte', 'rendu', 'en_retard')
});
