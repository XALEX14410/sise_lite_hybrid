const express = require('express');
const router = express.Router();
const inscripcionController = require('../controllers/inscripcionController');
const verificarSesion = require('../middlewares/verificarSesion');
const verificarPerfil = require('../middlewares/verificarPerfil');

router.post('/', verificarPerfil(['admin']), inscripcionController.createInscripcion);
// router.post('/', verificarPerfil(['Admin', 'Estudiante']), inscripcionController.createInscripcion);

module.exports = router;