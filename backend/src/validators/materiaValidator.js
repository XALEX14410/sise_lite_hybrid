const Joi = require('joi');

const createMateriaSchema = Joi.object({
  idCarrera: Joi.number()
    .integer()
    .positive()
    .required()
    .messages({
      'number.base': 'idCarrera debe ser un número',
      'number.integer': 'idCarrera debe ser un número entero',
      'number.positive': 'idCarrera debe ser un número positivo',
      'any.required': 'idCarrera es obligatorio',
    }),

  nombre_materia: Joi.string()
    .min(3)
    .max(100)
    .required()
    .messages({
      'string.base': 'nombre_materia debe ser una cadena de texto',
      'string.empty': 'nombre_materia no puede estar vacío',
      'string.min': 'nombre_materia debe tener al menos 3 caracteres',
      'string.max': 'nombre_materia no puede tener más de 100 caracteres',
      'any.required': 'nombre_materia es obligatorio',
    }),

  semestre: Joi.number()
    .integer()
    .min(1)
    .max(12)
    .required()
    .messages({
      'number.base': 'semestre debe ser un número',
      'number.integer': 'semestre debe ser un número entero',
      'number.min': 'semestre debe ser al menos 1',
      'number.max': 'semestre no puede ser mayor a 12',
      'any.required': 'semestre es obligatorio',
    }),

  descripcion: Joi.string()
    .allow(null, '')
    .max(255)
    .messages({
      'string.base': 'descripcion debe ser una cadena de texto',
      'string.max': 'descripcion no puede tener más de 255 caracteres',
    }),

  creditos: Joi.number()
    .integer()
    .positive()
    .required()
    .messages({
      'number.base': 'creditos debe ser un número',
      'number.integer': 'creditos debe ser un número entero',
      'number.positive': 'creditos debe ser un número positivo',
      'any.required': 'creditos es obligatorio',
    }),
});

const updateMateriaSchema = Joi.object({
  nombre_materia: Joi.string()
    .min(3)
    .max(100)
    .optional()
    .messages({
      'string.base': 'nombre_materia debe ser una cadena de texto',
      'string.empty': 'nombre_materia no puede estar vacío',
      'string.min': 'nombre_materia debe tener al menos 3 caracteres',
      'string.max': 'nombre_materia no puede tener más de 100 caracteres',
    }),

  semestre: Joi.number()
    .integer()
    .min(1)
    .max(12)
    .optional()
    .messages({
      'number.base': 'semestre debe ser un número',
      'number.integer': 'semestre debe ser un número entero',
      'number.min': 'semestre debe ser al menos 1',
      'number.max': 'semestre no puede ser mayor a 12',
    }),

  descripcion: Joi.string()
    .allow(null, '')
    .max(255)
    .optional()
    .messages({
      'string.base': 'descripcion debe ser una cadena de texto',
      'string.max': 'descripcion no puede tener más de 255 caracteres',
    }),

  creditos: Joi.number()
    .integer()
    .positive()
    .optional()
    .messages({
      'number.base': 'creditos debe ser un número',
      'number.integer': 'creditos debe ser un número entero',
      'number.positive': 'creditos debe ser un número positivo',
    }),
});

module.exports = {
  createMateriaSchema,
  updateMateriaSchema,
};
