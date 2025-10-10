const Joi = require('joi');

const grupoSchema = Joi.object({
  periodo: Joi.string()
    .pattern(/^[0-9]{4}-(A|B)$/)
    .required()
    .messages({
      'string.base': 'El periodo debe ser texto.',
      'string.empty': 'El periodo es obligatorio.',
      'string.pattern.base': 'El formato del periodo no es válido. Ejemplo: 2025-A o 2025-B.',
      'any.required': 'El campo periodo es obligatorio.'
    }),

  clave_grupo: Joi.string()
    .alphanum()
    .min(2)
    .max(10)
    .required()
    .messages({
      'string.base': 'La clave del grupo debe ser texto alfanumérico.',
      'string.empty': 'La clave del grupo es obligatoria.',
      'string.min': 'La clave del grupo debe tener al menos 2 caracteres.',
      'string.max': 'La clave del grupo no puede tener más de 10 caracteres.',
      'any.required': 'El campo clave_grupo es obligatorio.'
    }),

  cupo: Joi.number()
    .integer()
    .min(1)
    .max(100)
    .required()
    .messages({
      'number.base': 'El cupo debe ser un número.',
      'number.integer': 'El cupo debe ser un número entero.',
      'number.min': 'El cupo debe ser al menos 1.',
      'number.max': 'El cupo no puede exceder los 100 alumnos.',
      'any.required': 'El campo cupo es obligatorio.'
    }),

  idMateria: Joi.number()
    .integer()
    .positive()
    .required()
    .messages({
      'number.base': 'El idMateria debe ser un número entero.',
      'number.positive': 'El idMateria debe ser positivo.',
      'any.required': 'El campo idMateria es obligatorio.'
    }),

  idDocente: Joi.number()
    .integer()
    .positive()
    .required()
    .messages({
      'number.base': 'El idDocente debe ser un número entero.',
      'number.positive': 'El idDocente debe ser positivo.',
      'any.required': 'El campo idDocente es obligatorio.'
    })
});

module.exports = grupoSchema;