const express = require('express');
const router = express.Router();
const docenteController = require('../controllers/docenteController');
const verificarSesion = require('../middlewares/verificarSesion');
const verificarPerfil = require('../middlewares/verificarPerfil');

router.get('/', verificarPerfil(['admin']), docenteController.getAllDocentes);
router.get('/:id/grupos', verificarPerfil(['admin', 'docente']), docenteController.getGruposDelDocente);
router.get('/:id/estudiantes', verificarSesion, docenteController.getEstudiantesDelDocente);
router.get('/:id/resumen', verificarSesion, verificarPerfil(['docente', 'admin']), docenteController.getResumenDelDocente);
router.get('/:id', verificarSesion, docenteController.getDocentebyID);
router.get('/:id/horario', verificarSesion, verificarPerfil(['docente', 'admin']), docenteController.getHorarioPorDocente);
module.exports = router;