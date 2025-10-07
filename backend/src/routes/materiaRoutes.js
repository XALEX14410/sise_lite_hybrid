const express = require('express');
const router = express.Router();
const materiaController = require('../controllers/materiaController');
const verificarSesion = require('../middlewares/verificarSesion');
const verificarPerfil = require('../middlewares/verificarPerfil');

router.get('/', verificarSesion, materiaController.getAllMaterias);
router.get('/:id', verificarSesion, materiaController.getMateriaById);
router.get('/carrera/:id', verificarSesion, materiaController.getMateriasByCarrera);

router.post('/', verificarPerfil(['admin']), materiaController.createMateria);
router.put('/:id', verificarPerfil(['admin']), materiaController.updateMateria);
router.delete('/:id', verificarPerfil(['admin']), materiaController.deleteMateria);

module.exports = router;