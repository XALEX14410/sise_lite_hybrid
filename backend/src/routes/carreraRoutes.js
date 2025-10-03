const express = require('express');
const router = express.Router();
const carreraController = require('../controllers/carreraController');
const verificarSesion = require('../middlewares/verificarSesion');
const verificarPerfil = require('../middlewares/verificarPerfil');

router.get('/', verificarSesion, carreraController.getAllCarreras);
//router.get('/:id', verificarSesion, carreraController.getCarreraById);

router.post('/', verificarPerfil(['admin']), carreraController.createCarrera);
router.put('/:id', verificarPerfil(['admin']), carreraController.updateCarrera);
//router.delete('/:id', verificarPerfil(['Admin']), carreraController.deleteCarrera);

module.exports = router;