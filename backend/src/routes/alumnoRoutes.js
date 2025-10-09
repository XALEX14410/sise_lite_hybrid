const express = require('express');
const router = express.Router();

const verificarSesion = require('../middlewares/verificarSesion');
const verificarPerfil = require('../middlewares/verificarPerfil');

const alumnoController = require('../controllers/alumnoController');
const calificacionesController = require('../controllers/calificacionesController');
const pagosController = require('../controllers/pagosController');
const becasController = require('../controllers/becasController');
const horarioController = require('../controllers/horarioController');
const inscripcionesController = require('../controllers/inscripcionesController');



module.exports = router;
