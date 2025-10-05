const express = require('express');
const router = express.Router();
const loginController = require('../controllers/loginController');
const verificarPerfil = require('../middlewares/verificarPerfil');
const validar = require('../middlewares/validar');
const {loginSchema} = require('../validators/authValidator');
const { datosPersonalSchema } = require('../validators/usuarioValidator');

router.post('/login', validar(loginSchema), loginController.login);
router.post('/logout', loginController.logout);
router.get('/roles', verificarPerfil(['superadmin']), loginController.getRoles);
router.get('/perfil', validar(datosPersonalSchema),loginController.getDatosPersonales);
module.exports = router;
