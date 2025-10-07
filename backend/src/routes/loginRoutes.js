const express = require('express');
const router = express.Router();
const loginController = require('../controllers/loginController');
const verificarPerfil = require('../middlewares/verificarPerfil');
const validar = require('../middlewares/validar');
const {loginSchema} = require('../validators/authValidator');

router.post('/login', validar(loginSchema), loginController.login);
router.post('/logout', loginController.logout);
router.get('/roles', verificarPerfil(['superadmin']), loginController.getRoles);
router.get('/perfil', loginController.getPerfil);
module.exports = router;
