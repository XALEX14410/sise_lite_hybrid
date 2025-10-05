const Joi = require('joi');

const loginSchema = Joi.object({
  usuario: Joi.number().integer().min(10000000).max(10000000).required().messages({
    'number.base': 'El usuario debe ser un número',
    'number.min': 'El usuario debe tener 8 dígitos',
    'any.required': 'El campo usuario es obligatorio'
  }),
  contrasena: Joi.number().integer().min(1000).max(1000).required().messages({
    'number.base': 'La contraseña debe ser un número',
    'number.min': 'La contraseña debe tener 4 dígitos',
    'any.required': 'El campo contraseña es obligatorio'
  })
});

module.exports = { loginSchema };
