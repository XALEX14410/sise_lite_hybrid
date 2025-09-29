const express = require('express');
const router = express.Router();
const horarioController = require('../controllers/horarioController');
const verificarSesion = require('../middlewares/verificarSesion');
const verificarPerfil = require('../middlewares/verificarPerfil');

router.post('/', verificarSesion, verificarPerfil(['admin']), horarioController.createHorario);
router.put('/:id', verificarSesion, verificarPerfil(['admin']), horarioController.updateHorario);
router.delete('/:id', verificarSesion, verificarPerfil(['admin']), horarioController.deleteHorario);

router.get('/grupo/:id', verificarSesion, horarioController.getHorariosPorGrupo);

module.exports = router;