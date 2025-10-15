const Joi = require('joi');

const usuarioSchema = Joi.object({
  nombre: Joi.string().min(2).max(100).required().messages({
    'string.base': 'El nombre debe ser un texto',
    'string.empty': 'El nombre es obligatorio',
    'string.min': 'El nombre debe tener al menos 2 caracteres',
    'any.required': 'El nombre es obligatorio'
  }),

  apellido_paterno: Joi.string().min(2).required().messages({
    'string.empty': 'El apellido paterno es obligatorio',
    'any.required': 'El apellido paterno es obligatorio'
  }),

  apellido_materno: Joi.string().min(2).required().messages({
    'string.empty': 'El apellido materno es obligatorio',
    'any.required': 'El apellido materno es obligatorio'
  }),

  fecha_de_nacimiento: Joi.date().iso().required().messages({
    'date.base': 'La fecha de nacimiento debe ser válida',
    'any.required': 'La fecha de nacimiento es obligatoria'
  }),

  sexo: Joi.string().valid('M', 'F').required().messages({
    'any.only': 'El sexo debe ser "M" o "F"',
    'any.required': 'El sexo es obligatorio'
  }),

  curp: Joi.string().length(18).required().messages({
    'string.length': 'El CURP debe tener 18 caracteres',
    'any.required': 'El CURP es obligatorio'
  }),

  idEstado: Joi.number().integer().required().messages({
    'number.base': 'El idEstado debe ser un número',
    'any.required': 'El estado es obligatorio'
  }),

  idMunicipio: Joi.number().integer().required().messages({
    'number.base': 'El idMunicipio debe ser un número',
    'any.required': 'El municipio es obligatorio'
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

  correo_electronico: Joi.string().email().required().messages({
    'string.email': 'El correo electrónico no es válido',
    'any.required': 'El correo electrónico es obligatorio'
  }),

  idPerfil: Joi.number().integer().required().messages({
    'number.base': 'El perfil debe ser un número',
    'any.required': 'El perfil es obligatorio'
  }),

  // Campos condicionales para alumnos (idPerfil === 4)
  idCarrera: Joi.number().integer().when('idPerfil', {
    is: 4, // ID del perfil "alumno"
    then: Joi.required().messages({
      'any.required': 'El campo idCarrera es obligatorio para alumnos'
    }),
    otherwise: Joi.optional()
  }),

  matricula: Joi.string().when('idPerfil', {
    is: 4,
    then: Joi.required().messages({
      'any.required': 'La matrícula es obligatoria para alumnos'
    }),
    otherwise: Joi.optional()
  }),

  semestre_actual: Joi.number().integer().when('idPerfil', {
    is: 4,
    then: Joi.required().messages({
      'any.required': 'El semestre actual es obligatorio para alumnos'
    }),
    otherwise: Joi.optional()
  })
});

const datosPersonalSchema = Joi.object({
  idUsuario: Joi.number().integer().required().messages({
    'number.base': 'El perfil debe ser un número'
  })
});

module.exports = {usuarioSchema, datosPersonalSchema}