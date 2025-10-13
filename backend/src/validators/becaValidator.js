const Joi = require('joi');

const becaSchema = Joi.object({
  nombre: Joi.string().min(3).max(100).required(),
  tipo: Joi.string().valid('Académica', 'Económica', 'Cultural', 'Deportiva').required(),
  porcentaje: Joi.number().min(1).max(100).required(),
  descripcion: Joi.string().allow('', null),
  estado: Joi.string().valid('Activa', 'Inactiva')
});

module.exports = becaSchema;
