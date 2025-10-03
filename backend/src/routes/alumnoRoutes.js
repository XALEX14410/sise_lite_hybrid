const express = require('express');
const router = express.Router();
const alumnoController = require('../controllers/alumnoController');
const loginController = require('../controllers/loginController');
const verificarSesion = require('../middlewares/verificarSesion');
const verificarPerfil = require('../middlewares/verificarPerfil');

//Ruta para que el estudiante pueda ver su horario
router.get('/horario/:id', verificarSesion, verificarPerfil(['alumno']), alumnoController.getHorarioPorEstudiante);
//Ruta para que el estudiante pueda ver su carga academica
//Ruta para que el estudiante pueda ver sus calificaciones
//Ruta para que el estudiante pueda ver sus pagos

router.get('/:id/materias', verificarSesion, verificarPerfil(['alumno']), alumnoController.getMateriaPorEstudiante);
router.get('/:id/grupos', verificarPerfil(['alumno']), alumnoController.getGruposDelAlumno);
router.get('/:id/grupos', verificarSesion, alumnoController.getGruposDelAlumno);

module.exports = router;