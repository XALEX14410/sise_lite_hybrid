const express = require('express');
const router = express.Router();
const alumnoController = require('../controllers/alumnoController');
const verificarSesion = require('../middlewares/verificarSesion');
const verificarPerfil = require('../middlewares/verificarPerfil');

router.get('/:id/grupos', verificarSesion, alumnoController.getGruposDelAlumno);
router.get('/:id', verificarSesion, alumnoController.getAlumnobyID);
module.exports = router;