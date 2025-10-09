const Joi = require('joi');

const createPagoSchema = Joi.object({
  idBeca: Joi.number().integer().positive().required(),
  idUsuario: Joi.number().integer().positive().required(),
  cantidad_a_pagar: Joi.number().positive().required(),
  fecha_de_pago: Joi.date().iso().optional().allow(null, ''), 
  estado: Joi.string().valid('pendiente', 'pagado', 'cancelado').required() 
});

const updatePagoSchema = Joi.object({
  idBeca: Joi.number().integer().positive().optional(),
  idUsuario: Joi.number().integer().positive().optional(),
  cantidad_a_pagar: Joi.number().positive().optional(),
  fecha_de_pago: Joi.date().iso().optional().allow(null, ''),
  estado: Joi.string().valid('pendiente', 'pagado', 'cancelado').optional()
}).min(1); 

module.exports = {
  createPagoSchema,
  updatePagoSchema
};
