const Joi = require('joi');

const cargaAcademicaSchema = Joi.object({
  idMateria: Joi.number().integer().positive().required().messages({
    'any.required': 'El campo idMateria es obligatorio.',
    'number.base': 'El campo idMateria debe ser un número.',
    'number.positive': 'El campo idMateria debe ser positivo.'
  }),

  SC: Joi.number().integer().min(0).allow(null).messages({
    'number.base': 'El campo SC debe ser numérico.'
  }),

  AS: Joi.number().integer().min(0).allow(null).messages({
    'number.base': 'El campo AS debe ser numérico.'
  }),

  EGC: Joi.number().integer().min(0).allow(null).messages({
    'number.base': 'El campo EGC debe ser numérico.'
  }),

  creditos: Joi.number().integer().min(0).allow(null).messages({
    'number.base': 'El campo creditos debe ser numérico.'
  }),

  RC: Joi.number().integer().min(0).allow(null).messages({
    'number.base': 'El campo RC debe ser numérico.'
  }),

  Grupo: Joi.string().max(255).allow(null, '').messages({
    'string.base': 'El campo Grupo debe ser texto.',
    'string.max': 'El campo Grupo no puede tener más de 255 caracteres.'
  })
});

module.exports = cargaAcademicaSchema;
