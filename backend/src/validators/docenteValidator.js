const Joi = require('joi');

const docenteSchema = Joi.object({
  nombre: Joi.string().min(2).max(100).required().messages({
    'string.base': 'El nombre debe ser texto.',
    'string.empty': 'El nombre es obligatorio.',
    'string.min': 'El nombre debe tener al menos 2 caracteres.',
    'string.max': 'El nombre no puede superar los 100 caracteres.',
    'any.required': 'El campo nombre es obligatorio.'
  }),

  apellido_paterno: Joi.string().min(2).max(100).required().messages({
    'string.base': 'El apellido paterno debe ser texto.',
    'string.empty': 'El apellido paterno es obligatorio.',
    'string.min': 'El apellido paterno debe tener al menos 2 caracteres.',
    'string.max': 'El apellido paterno no puede superar los 100 caracteres.',
    'any.required': 'El campo apellido_paterno es obligatorio.'
  }),

  apellido_materno: Joi.string().min(2).max(100).allow('', null).messages({
    'string.base': 'El apellido materno debe ser texto.',
    'string.min': 'El apellido materno debe tener al menos 2 caracteres.',
    'string.max': 'El apellido materno no puede superar los 100 caracteres.'
  }),

  fecha_de_nacimiento: Joi.date().less('now').required().messages({
    'date.base': 'La fecha de nacimiento no es válida.',
    'date.less': 'La fecha de nacimiento debe ser anterior a hoy.',
    'any.required': 'El campo fecha_de_nacimiento es obligatorio.'
  }),

  sexo: Joi.string().valid('M', 'F', 'O').required().messages({
    'string.base': 'El sexo debe ser texto.',
    'any.only': 'El sexo debe ser M (Masculino), F (Femenino) o O (Otro).',
    'any.required': 'El campo sexo es obligatorio.'
  }),

  curp: Joi.string()
    .length(18)
    .pattern(/^[A-Z]{4}\d{6}[A-Z]{6}\d{2}$/i)
    .required()
    .messages({
      'string.base': 'El CURP debe ser texto.',
      'string.empty': 'El CURP es obligatorio.',
      'string.length': 'El CURP debe tener exactamente 18 caracteres.',
      'string.pattern.base': 'El CURP no tiene un formato válido.',
      'any.required': 'El campo CURP es obligatorio.'
    }),

  idEstado: Joi.number().integer().positive().required().messages({
    'number.base': 'El idEstado debe ser un número entero.',
    'number.positive': 'El idEstado debe ser positivo.',
    'any.required': 'El campo idEstado es obligatorio.'
  }),

  idMunicipio: Joi.number().integer().positive().required().messages({
    'number.base': 'El idMunicipio debe ser un número entero.',
    'number.positive': 'El idMunicipio debe ser positivo.',
    'any.required': 'El campo idMunicipio es obligatorio.'
  }),

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
      
  correo_electronico: Joi.string().email().max(150).required().messages({
    'string.base': 'El correo electrónico debe ser texto.',
    'string.email': 'El formato del correo electrónico no es válido.',
    'string.empty': 'El correo electrónico es obligatorio.',
    'any.required': 'El campo correo_electronico es obligatorio.'
  })
});

module.exports = docenteSchema;
