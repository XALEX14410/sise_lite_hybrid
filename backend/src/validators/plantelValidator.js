const Joi = require('joi');

// Schema para creación (POST)
const createPlantelSchema = Joi.object({
  nombre_plantel: Joi.string().trim().min(3).max(100).required().messages({
    'string.base': 'El nombre del plantel debe ser una cadena de texto',
    'string.empty': 'El nombre del plantel no puede estar vacío',
    'string.min': 'El nombre del plantel debe tener al menos 3 caracteres',
    'string.max': 'El nombre del plantel debe tener máximo 100 caracteres',
    'any.required': 'El nombre del plantel es obligatorio'
  }),
  idEstado: Joi.number().integer().positive().required(),
  idMunicipio: Joi.number().integer().positive().required()
});

// Schema para actualización (PUT)
// Campos opcionales pero si están deben ser válidos
const updatePlantelSchema = Joi.object({
  nombre_plantel: Joi.string().trim().min(3).max(100).optional(),
  idEstado: Joi.number().integer().positive().optional(),
  idMunicipio: Joi.number().integer().positive().optional()
}).min(1).messages({
  'object.min': 'Se debe enviar al menos un campo para actualizar'
});

module.exports = {
  createPlantelSchema,
  updatePlantelSchema
};
