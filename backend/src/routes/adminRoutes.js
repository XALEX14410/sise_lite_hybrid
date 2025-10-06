const express = require('express');
const router = express.Router();
const verificarSesion = require('../middlewares/verificarSesion');
const verificarPerfil = require('../middlewares/verificarPerfil');
const plantelController = require('../controllers/plantelController');

//Ruta para ver los planteles registrados
router.get('/plantel',verificarSesion,verificarPerfil(['superadmin','admin']), plantelController.getAllPlantel);
//Ruta para ver un plantel por ID
router.get('/plantel/:id',verificarSesion,verificarPerfil(['superadmin','admin']), plantelController.getPlantelbyID);
//Ruta para agregar un nuevo plantel
router.post('/plantel',verificarSesion,verificarPerfil(['superadmin']), plantelController.createPlantel);
//Ruta para editar un plantel
router.put('/plantel/:id',verificarSesion,verificarPerfil(['superadmin']), plantelController.updatePlantel);
//Ruta para borrar un plantel
router.delete('/plantel/:id',verificarSesion,verificarPerfil(['superadmin']), plantelController.deletePlantel);

module.exports = router;