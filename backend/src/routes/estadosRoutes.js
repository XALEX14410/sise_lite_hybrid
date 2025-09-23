const express = require('express');
const router = express.Router();
const estadoController = require('../controllers/estadosController');

router.get('/', estadoController.getEstados);

module.exports = router;
