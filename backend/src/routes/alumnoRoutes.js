const express = require('express');
const router = express.Router();
<<<<<<< HEAD

=======
const validar = require('../middlewares/validar');
const idParamSchema = require('../validators/idValidator');
>>>>>>> backend
const verificarSesion = require('../middlewares/verificarSesion');
//const verificarPerfil = require('../middlewares/verificarPerfil');
const alumnoController = require('../controllers/alumnoController');

<<<<<<< HEAD
const alumnoController = require('../controllers/alumnoController');
const calificacionesController = require('../controllers/calificacionesController');
const pagosController = require('../controllers/pagosController');
const becasController = require('../controllers/becasController');
const horarioController = require('../controllers/horarioController');
const inscripcionesController = require('../controllers/inscripcionesController');


=======
router.get('/:id/calificaciones', validar(idParamSchema, 'params'), verificarSesion, alumnoController.obtenerCalificacionesPorAlumno);
>>>>>>> backend

module.exports = router;
