const Joi = require('joi');

const horarioSchema = Joi.object({
  dia_semana: Joi.string()
    .valid('Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo')
    .required()
    .messages({
      'string.base': 'El día de la semana debe ser texto.',
      'any.only': 'El día de la semana no es válido. Usa: Lunes, Martes, Miércoles, Jueves, Viernes, Sábado o Domingo.',
      'any.required': 'El campo dia_semana es obligatorio.'
    }),

  hora: Joi.string()
    .pattern(/^([01]\d|2[0-3]):([0-5]\d)$/)
    .required()
    .messages({
      'string.base': 'La hora debe ser texto.',
      'string.pattern.base': 'El formato de la hora debe ser HH:MM (24h).',
      'any.required': 'El campo hora es obligatorio.'
    }),

  aula: Joi.string()
    .alphanum()
    .min(1)
    .max(20)
    .required()
    .messages({
      'string.base': 'El aula debe ser texto alfanumérico.',
      'string.empty': 'El aula es obligatoria.',
      'string.min': 'El aula debe tener al menos 1 carácter.',
      'string.max': 'El aula no puede tener más de 20 caracteres.',
      'any.required': 'El campo aula es obligatorio.'
    }),

  idGrupo: Joi.number()
    .integer()
    .positive()
    .required()
    .messages({
      'number.base': 'El idGrupo debe ser un número entero.',
      'number.integer': 'El idGrupo debe ser un número entero.',
      'number.positive': 'El idGrupo debe ser positivo.',
      'any.required': 'El campo idGrupo es obligatorio.'
    })
});

module.exports = horarioSchema;
