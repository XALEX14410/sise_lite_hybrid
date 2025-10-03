const Joi = require('joi');

const carreraSchema = Joi.object({
  nombre_materia: Joi.string().min(3).max(100).required().messages({
    'string.base': 'La carrera debe ser un texto',
    'string.empty': 'El nombre de la carerra es obligatorio',
    'string.min': 'El nombre debe tener al menos 3 caracteres',
    'any.required': 'El nombre de la carrera es obligatorio'
  }),
  semestre: Joi.string().min(3).max(100).required().messages({
    'string.base': 'La carrera debe ser un texto',
    'string.empty': 'El nombre de la carerra es obligatorio',
    'string.min': 'El nombre debe tener al menos 3 caracteres',
    'any.required': 'El nombre de la carrera es obligatorio'
  }),
  descripcion: Joi.string().min(3).max(100).messages({
    'string.base': 'La descripción debe ser un texto',
    'string.min': 'La descripción debe tener al menos 3 caracteres',
  }),
  creditos: Joi.number().integer().min(1).max(10).required().messages({
      'number.base': 'Los créditos deben de ser un número',
      'number.min': 'Los créditos deben tener al menos 1 dígitos',
      'any.required': 'Los créditos son obligatorios'
    })
});

module.exports = {carreraSchema}