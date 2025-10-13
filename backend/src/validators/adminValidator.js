const Joi = require('joi');

const adminSchema = Joi.object({
  nombre: Joi.string()
    .min(2)
    .max(100)
    .required()
    .messages({
      'string.base': 'El nombre debe ser texto',
      'string.empty': 'El nombre no puede estar vacío',
      'string.min': 'El nombre debe tener al menos 2 caracteres',
      'string.max': 'El nombre no puede tener más de 100 caracteres',
      'any.required': 'El nombre es obligatorio'
    }),

  apellido_paterno: Joi.string()
    .min(2)
    .max(100)
    .required()
    .messages({
      'string.base': 'El apellido paterno debe ser texto',
      'string.empty': 'El apellido paterno no puede estar vacío',
      'string.min': 'El apellido paterno debe tener al menos 2 caracteres',
      'string.max': 'El apellido paterno no puede tener más de 100 caracteres',
      'any.required': 'El apellido paterno es obligatorio'
    }),

  apellido_materno: Joi.string()
    .allow(null, '')
    .optional()
    .messages({
      'string.base': 'El apellido materno debe ser texto'
    }),

  fecha_de_nacimiento: Joi.date()
    .iso()
    .required()
    .messages({
      'date.base': 'La fecha de nacimiento debe ser una fecha válida',
      'date.format': 'La fecha de nacimiento debe tener el formato ISO',
      'any.required': 'La fecha de nacimiento es obligatoria'
    }),

  sexo: Joi.string()
    .valid('M', 'F')
    .required()
    .messages({
      'any.only': 'El sexo debe ser "M" o "F"',
      'any.required': 'El sexo es obligatorio'
    }),

  curp: Joi.string()
    .length(18)
    .required()
    .messages({
      'string.base': 'La CURP debe ser texto',
      'string.length': 'La CURP debe tener exactamente 18 caracteres',
      'any.required': 'La CURP es obligatoria'
    }),

  idEstado: Joi.number()
    .integer()
    .required()
    .messages({
      'number.base': 'El idEstado debe ser un número',
      'number.integer': 'El idEstado debe ser un número entero',
      'any.required': 'El idEstado es obligatorio'
    }),

  idMunicipio: Joi.number()
    .integer()
    .required()
    .messages({
      'number.base': 'El idMunicipio debe ser un número',
      'number.integer': 'El idMunicipio debe ser un número entero',
      'any.required': 'El idMunicipio es obligatorio'
    }),

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
    }),

  correo_electronico: Joi.string()
    .email()
    .required()
    .messages({
      'string.base': 'El correo electrónico debe ser texto',
      'string.email': 'El correo electrónico debe tener un formato válido',
      'any.required': 'El correo electrónico es obligatorio'
    }),
});

module.exports = adminSchema;
