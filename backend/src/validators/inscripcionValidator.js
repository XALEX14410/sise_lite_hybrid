const Joi = require('joi');

const inscripcionSchema = Joi.object({
  idAlumno: Joi.number()
    .integer()
    .positive()
    .required()
    .messages({
      'number.base': 'El idAlumno debe ser un número entero.',
      'number.integer': 'El idAlumno debe ser un número entero.',
      'number.positive': 'El idAlumno debe ser un número positivo.',
      'any.required': 'El campo idAlumno es obligatorio.'
    }),

  idGrupo: Joi.number()
    .integer()
    .positive()
    .required()
    .messages({
      'number.base': 'El idGrupo debe ser un número entero.',
      'number.integer': 'El idGrupo debe ser un número entero.',
      'number.positive': 'El idGrupo debe ser un número positivo.',
      'any.required': 'El campo idGrupo es obligatorio.'
    })
});

module.exports = inscripcionSchema;
