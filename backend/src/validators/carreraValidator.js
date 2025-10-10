const Joi = require('joi');

const carreraSchema = Joi.object({
  carrera: Joi.string().min(3).max(100).required().messages({
    'string.base': 'El nombre de la carrera debe ser un texto.',
    'string.empty': 'El nombre de la carrera es obligatorio.',
    'string.min': 'El nombre de la carrera debe tener al menos 3 caracteres.',
    'string.max': 'El nombre de la carrera no puede superar los 100 caracteres.',
    'any.required': 'El campo carrera es obligatorio.'
  }),

  duracion_semestres: Joi.number().integer().min(1).max(20).required().messages({
    'number.base': 'La duración debe ser un número entero.',
    'number.min': 'La duración mínima es de 1 semestre.',
    'number.max': 'La duración máxima es de 20 semestres.',
    'any.required': 'El campo duracion_semestres es obligatorio.'
  }),

  descripcion: Joi.string().max(255).allow('', null).messages({
    'string.base': 'La descripción debe ser texto.',
    'string.max': 'La descripción no puede superar los 255 caracteres.'
  }),

  idPlantel: Joi.number().integer().positive().required().messages({
    'number.base': 'El idPlantel debe ser un número entero.',
    'number.positive': 'El idPlantel debe ser un número positivo.',
    'any.required': 'El campo idPlantel es obligatorio.'
  })
});

module.exports = carreraSchema;
