const express = require('express');
const router = express.Router();

const verificarSesion = require('../middlewares/verificarSesion');
//const verificarPerfil = require('../middlewares/verificarPerfil');

const alumnoController = require('../controllers/alumnoController');

router.get('/calificaciones/:id', verificarSesion, alumnoController.getCalificacionesAlumno);

module.exports = router;
