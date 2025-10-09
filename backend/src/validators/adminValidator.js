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
  usuario: Joi.string().alphanum().min(4).max(20).required(),
  contrasena: Joi.string().min(6).max(50).required(),
  correo_electronico: Joi.string().email().required(),
});

module.exports = adminSchema;
