const express = require('express');
const router = express.Router();
const docenteController = require('../controllers/docenteController');
const verificarSesion = require('../middlewares/verificarSesion');
const verificarPerfil = require('../middlewares/verificarPerfil');

router.get('/', verificarPerfil(['Admin']), docenteController.getAllDocentes);
router.get('/:id/grupos', verificarPerfil(['Admin', 'Docente']), docenteController.getGruposDelDocente);
router.get('/:id/estudiantes', verificarSesion, docenteController.getEstudiantesDelDocente);
router.get('/:id/resumen', verificarSesion, verificarPerfil(['Docente', 'Admin']), docenteController.getResumenDelDocente);
router.get('/:id', verificarSesion, docenteController.getDocentebyID);
router.get('/:id/horario', verificarSesion, verificarPerfil(['Docente', 'Admin']), docenteController.getHorarioPorDocente);
module.exports = router;