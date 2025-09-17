const express = require('express');
const cors = require("cors");
const morgan = require("morgan");
const pool = require('./src/db/pool');
const session = require('express-session');

require('dotenv').config();
const app = express();

const usuarioRoutes = require('./src/routes/usuarioRoutes');
const loginRoutes = require('./src/routes/loginRoutes');
const protegidasRoutes = require('./src/routes/protegidasRoutes');
const carreraRoutes = require('./src/routes/carreraRoutes');
const materiaRoutes = require('./src/routes/materiaRoutes');
const inscripcionRoutes = require('./src/routes/inscripcionRoutes');
const grupoRoutes = require('./src/routes/grupoRoutes');
const horarioRoutes = require('./src/routes/horarioRoutes');
const alumnoRoutes = require('./src/routes/alumnoRoutes');
const docenteRoutes = require('./src/routes/docenteRoutes');

app.use(session({
  secret: 'clave_super_secreta',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false } 
}));

app.use(express.json());
app.use(morgan('combined'));
app.use(cors());

app.use('/usuario', usuarioRoutes);
app.use('/', loginRoutes);
app.use('/inicio', protegidasRoutes);
app.use('/carrera', carreraRoutes);
app.use('/materia', materiaRoutes);
app.use('/inscripcion', inscripcionRoutes);
app.use('/grupo', grupoRoutes);
app.use('/horario', horarioRoutes);
app.use('/docente', docenteRoutes);
app.use('/alumno', alumnoRoutes);

app.get('/api/status', (req, res) => {
  res.json({ message: 'Backend funcionando' });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});