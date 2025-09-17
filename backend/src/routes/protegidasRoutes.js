const express = require('express');
const router = express.Router();
const loginController = require('../controllers/loginController');
const verificarPerfil = require('../middlewares/verificarPerfil');

router.get('/admin', verificarPerfil(['Admin']), (req, res) => {
  res.json({ mensaje: 'Bienvenido al panel de administración' });
});

router.get('/docente', verificarPerfil(['Docente', 'Admin']), (req, res) => {
  res.json({ mensaje: 'Acceso al módulo docente' });
});

router.get('/estudiante', verificarPerfil(['Estudiante']), (req, res) => {
  res.json({ mensaje: 'Panel del estudiante' });
});

router.get('/roles', verificarPerfil(['Admin']), loginController.getRoles);

router.get('/perfil', loginController.getPerfil);

module.exports = router;