const express = require('express');
const router = express.Router();
const verificarSesion = require('../middlewares/verificarSesion');
const verificarPerfil = require('../middlewares/verificarPerfil');
const plantelController = require('../controllers/plantelController');
const loginController = require('../controllers/loginController');

//Ruta para ver los planteles registrados
router.get('/plantel',verificarSesion,verificarPerfil(['Superadmin','Admin']), plantelController.getAllPlantel);
//Ruta para ver un plantel por ID
router.get('/plantel/:id',verificarSesion,verificarPerfil(['Superadmin','Admin']), plantelController.getPlantelbyID);
//Ruta para agregar un nuevo plantel
router.post('/plantel',verificarSesion,verificarPerfil(['Superadmin']), plantelController.createPlantel);
//Ruta para editar un plantel
router.put('/plantel/:id',verificarSesion,verificarPerfil(['Superadmin']), plantelController.updatePlantel);
//Ruta para borrar un plantel
router.delete('/plantel/:id',verificarSesion,verificarPerfil(['Superadmin']), plantelController.deletePlantel);
//Ruta para ver todos los roles registrados
router.get('/roles', verificarSesion, verificarPerfil(['Superadmin']), loginController.getRoles);
//Ruta para ver todos los roles por ID
router.get('/roles/:id', verificarSesion, verificarPerfil(['Superadmin']), loginController.getRolbyID);
module.exports = router;