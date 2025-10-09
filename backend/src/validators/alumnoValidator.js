const Joi = require('joi');

const alumnoSchema = Joi.object({
  nombre: Joi.string().min(2).max(100).required(),
  apellido_paterno: Joi.string().min(2).max(100).required(),
  apellido_materno: Joi.string().min(2).max(100).required(),
  fecha_de_nacimiento: Joi.date().required(),
  sexo: Joi.string().valid('M', 'F').required(),
  curp: Joi.string().length(18).required(),
  idEstado: Joi.number().integer().required(),
  idMunicipio: Joi.number().integer().required(),
  usuario: Joi.string().min(4).max(50).required(),
  contrasena: Joi.string().min(6).max(255).required(),
  correo_electronico: Joi.string().email().required(),
  matricula: Joi.string().required(),
  semestre_actual: Joi.number().integer().min(1).max(12).required(),
  idCarrera: Joi.number().integer().required(),
});

module.exports = alumnoSchema;
