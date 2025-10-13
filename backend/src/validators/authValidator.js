const Joi = require('joi');

const loginSchema = Joi.object({
  usuario: Joi.number()
    .integer()
    .required()
    .custom((value, helpers) => {
      if (value.toString().length !== 8) {
        return helpers.error('number.length');
      }
      return value;
    })
    .messages({
      'number.base': 'El usuario debe ser un número',
      'number.length': 'El usuario debe tener exactamente 8 dígitos',
      'any.required': 'El campo usuario es obligatorio'
    }),

  contrasena: Joi.number()
    .integer()
    .required()
    .custom((value, helpers) => {
      if (value.toString().length !== 4) {
        return helpers.error('number.length');
      }
      return value;
    })
    .messages({
      'number.base': 'La contraseña debe ser un número',
      'number.length': 'La contraseña debe tener exactamente 4 dígitos',
      'any.required': 'El campo contraseña es obligatorio'
    })
});
module.exports = { loginSchema };
