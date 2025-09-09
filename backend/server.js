const express = require('express');
const cors = require("cors");
const morgan = require("morgan");
const pool = require('./src/db/pool');
require('dotenv').config();

const estadoRoutes = require('./src/routes/estadosRoutes');
const usuarioRoutes = require('./src/routes/usuarioRoutes');

const app = express();
app.use(express.json());
app.use(morgan('combined'));
app.use(cors());

app.use('/api/estados', estadoRoutes);
app.use('/api/usuario', usuarioRoutes);

app.get('/api/status', (req, res) => {
  res.json({ message: 'Backend funcionando' });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});