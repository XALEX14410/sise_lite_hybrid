const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');
const verificarPerfil = require('../middlewares/verificarPerfil');

router.get('/:id', usuarioController.getUsuario);
router.post('/create', verificarPerfil(['Admin']), usuarioController.createUsuario);
router.put('/:id/actualizar', usuarioController.updateUsuario);
//router.delete('/:id', usuarioController.deleteUsuario)

module.exports = router;