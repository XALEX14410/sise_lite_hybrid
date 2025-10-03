const Joi = require('joi');

const grupoSchema = Joi.object({
  preido: Joi.string().min(3).max(100).required().messages({
    'string.base': 'El periodo debe ser un texto',
    'string.empty': 'El periodo es obligatorio',
    'string.min': 'El nombre debe tener al menos 3 caracteres',
    'any.required': 'El periodo es obligatorio'
  }),
  clave_grupo: Joi.string().min(3).max(100).required().messages({
    'string.base': 'La clave de grupo debe ser un texto',
    'string.empty': 'La clave de grupo es obligatoria',
    'string.min': 'La clave debe tener al menos 3 caracteres',
    'any.required': 'La clave de grupo es obligatoria'
  }),
  cupo: Joi.number().integer().min(1).max(10).required().messages({
      'number.base': 'El cupo debe de ser un número',
      'number.min': 'El cupo debe tener al menos 1 dígitos',
      'any.required': 'El cupo es obligatorio'
    }),
  idMateria: Joi.number().integer().required().messages({
        'number.base': 'El id de la materia debe ser un número',
        'any.required': 'El id de la materia es obligatorio'
    }),
  idDocente: Joi.number().integer().required().messages({
        'number.base': 'El id del docente debe ser un número',
        'any.required': 'El id del docente es obligatorio'
    }),  
});

module.exports = {grupoSchema}