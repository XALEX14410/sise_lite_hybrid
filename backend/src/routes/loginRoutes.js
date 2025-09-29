const express = require('express');
const router = express.Router();
const loginController = require('../controllers/loginController');
const verificarPerfil = require('../middlewares/verificarPerfil');

router.post('/login', loginController.login);
router.post('/logout', loginController.logout);
router.get('/roles', verificarPerfil(['superadmin']), loginController.getRoles);
router.get('/perfil', loginController.getPerfil);
module.exports = router;
