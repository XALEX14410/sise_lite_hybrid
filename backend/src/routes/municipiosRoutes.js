const express = require('express');
const router = express.Router();
const municipioController = require('../controllers/municipiosController');

router.get('/:estado_id', municipioController.getMunicipiosPorEstado);

module.exports = router;
