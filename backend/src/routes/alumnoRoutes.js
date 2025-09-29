const express = require('express');
const router = express.Router();
const alumnoController = require('../controllers/alumnoController');
const verificarSesion = require('../middlewares/verificarSesion');
const verificarPerfil = require('../middlewares/verificarPerfil');

router.get('/:id/horario', verificarSesion, verificarPerfil(['alumno']), alumnoController.getHorarioPorEstudiante);
router.get('/:id/materias', verificarSesion, verificarPerfil(['alumno']), alumnoController.getMateriaPorEstudiante);
router.get('/:id/grupos', verificarPerfil(['alumno']), alumnoController.getGruposDelAlumno);
router.get('/:id/grupos', verificarSesion, alumnoController.getGruposDelAlumno);
router.get('/:id', verificarSesion, alumnoController.getAlumnobyID);
module.exports = router;