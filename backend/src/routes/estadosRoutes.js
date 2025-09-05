const express = require('express');
const router = express.Router();
const estadoController = require('../controllers/estadosController');

router.get('/', estadoController.getEstados);
router.post('/', estadoController.createEstados);
router.put('/:id', estadoController.updateEstados);

module.exports = router;