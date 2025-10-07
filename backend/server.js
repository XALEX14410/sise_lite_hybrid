const express = require('express');
const cors = require("cors");
const pool = require('./src/db/pool');
require('dotenv').config();

const usuarioRoutes = require('./src/routes/usuarioRoutes');
const estadoRoutes = require('./src/routes/estadosRoutes');

require('dotenv').config();
const app = express();
app.use(express.json());
app.use(cors());

app.use('/api/usuarios', usuarioRoutes);
app.use('/api/estados', estadoRoutes);

app.get('/api/status', (req, res) => {
  res.json({ message: 'Backend funcionando' });
});

const PORT = process.env.PORT || 4000;
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});