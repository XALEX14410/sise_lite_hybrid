const express = require('express');
const router = express.Router();
const verificarSesion = require('../middlewares/verificarSesion');
const inicioController = require('../controllers/inicioController');

router.get('/', verificarSesion, inicioController.obtenerInicio);

module.exports = router;
