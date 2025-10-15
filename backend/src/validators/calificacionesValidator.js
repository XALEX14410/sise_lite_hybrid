const Joi = require('joi');

const calificacionSchema = Joi.object({
  idInscripción: Joi.number().integer().positive().required().messages({
    'any.required': 'El campo idInscripción es obligatorio.',
    'number.base': 'El campo idInscripción debe ser un número.',
    'number.positive': 'El campo idInscripción debe ser positivo.'
  }),

  valor: Joi.number().min(0).max(100).required().messages({
    'any.required': 'El campo valor es obligatorio.',
    'number.base': 'El campo valor debe ser un número.',
    'number.min': 'El valor mínimo permitido es 0.',
    'number.max': 'El valor máximo permitido es 100.'
  }),

  observaciones: Joi.string().max(255).allow(null, '').messages({
    'string.base': 'El campo observaciones debe ser texto.',
    'string.max': 'El campo observaciones no puede tener más de 255 caracteres.'
  })
});

module.exports = calificacionSchema;
