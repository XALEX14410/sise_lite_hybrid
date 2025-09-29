const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');
const verificarPerfil = require('../middlewares/verificarPerfil');

router.get('/:id', usuarioController.getUsuariobyID);
router.post('/create', verificarPerfil(['superadmin']), usuarioController.createUsuario);
router.put('/:id/actualizar', usuarioController.updateUsuario);
//router.delete('/:id', usuarioController.deleteUsuario)
module.exports = router;