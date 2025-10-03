const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');
const verificarPerfil = require('../middlewares/verificarPerfil');
const validarUsuarioUnico = require('../middlewares/validarUsuarioUnico');
const { usuarioSchema } = require('../validators/usuarioValidator');
const validar = require('../middlewares/validar');

router.get('/:id', usuarioController.getUsuariobyID);
router.post('/create', verificarPerfil(['superadmin']), validar(usuarioSchema), validarUsuarioUnico, usuarioController.createUsuario);
router.put('/:id/actualizar', usuarioController.updateUsuario);
//router.delete('/:id', usuarioController.deleteUsuario)
module.exports = router;