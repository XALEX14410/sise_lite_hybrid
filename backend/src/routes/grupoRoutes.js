const express = require('express');
const router = express.Router();
const grupoController = require('../controllers/grupoController');
const verificarSesion = require('../middlewares/verificarSesion');
const verificarPerfil = require('../middlewares/verificarPerfil');

router.get('/', verificarSesion, grupoController.getAllGrupos);
router.get('/:id', verificarSesion, grupoController.getGrupoById);
router.post('/', verificarPerfil(['admin']), grupoController.createGrupo);
router.put('/:id', verificarPerfil(['admin']), grupoController.updateGrupo);
router.delete('/:id', verificarPerfil(['admin']), grupoController.deleteGrupo);
router.get('/:id/horario', verificarSesion, grupoController.getHorarioCompletoDelGrupo);

module.exports = router;