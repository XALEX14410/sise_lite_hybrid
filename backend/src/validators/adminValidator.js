const Joi = require('joi');

const adminSchema = Joi.object({
  nombre: Joi.string().min(2).max(100).required(),
  apellido_paterno: Joi.string().min(2).max(100).required(),
  apellido_materno: Joi.string().allow(null, '').optional(),
  fecha_de_nacimiento: Joi.date().iso().required(),
  sexo: Joi.string().valid('M', 'F').required(),
  curp: Joi.string().length(18).required(),
  idEstado: Joi.number().integer().required(),
  idMunicipio: Joi.number().integer().required(),
  usuario: Joi.number()
      .integer().required().custom((value, helpers) => {
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
  
    contrasena: Joi.number().integer().required().custom((value, helpers) => {
        if (value.toString().length !== 4) {
          return helpers.error('number.length');
        }
        return value;
      })
      .messages({
        'number.base': 'La contraseña debe ser un número',
        'number.length': 'La contraseña debe tener exactamente 4 dígitos',
        'any.required': 'El campo contraseña es obligatorio'
      }),
  correo_electronico: Joi.string().email().required(),
});

module.exports = adminSchema;
