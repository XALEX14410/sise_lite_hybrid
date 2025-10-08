const express = require('express');
const cors = require("cors");
const morgan = require("morgan");
const pool = require('./src/db/pool');
const session = require('express-session');

require('dotenv').config();
const app = express();

app.use(cors({
  origin: true, // tu frontend
  credentials: true
}));

const usuarioRoutes = require('./src/routes/usuarioRoutes');
const loginRoutes = require('./src/routes/loginRoutes');
const carreraRoutes = require('./src/routes/carreraRoutes');
const materiaRoutes = require('./src/routes/materiaRoutes');
const inscripcionRoutes = require('./src/routes/inscripcionRoutes');
const grupoRoutes = require('./src/routes/grupoRoutes');
const horarioRoutes = require('./src/routes/horarioRoutes');
const alumnoRoutes = require('./src/routes/alumnoRoutes');
const docenteRoutes = require('./src/routes/docenteRoutes');
const municipiosRoutes = require('./src/routes/municipiosRoutes');
const estadosRoutes = require('./src/routes/estadosRoutes');
const inicioRouter = require('./src/routes/inicioRoutes');
const adminRoutes = require('./src/routes/adminRoutes');

app.use(express.json());
app.use(express.static('public'));
app.use(morgan('combined'));

app.use(session({
  secret: process.env.SESSION_SECRET || 'tu-secreto',
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: false, 
    sameSite: 'lax' 
  }
}));

app.use('/admin', adminRoutes);
app.use('/usuario', usuarioRoutes);
app.use('/auth', loginRoutes);
app.use('/auth', loginRoutes);
app.use('/carrera', carreraRoutes);
app.use('/materia', materiaRoutes);
app.use('/inscripcione', inscripcionRoutes);
app.use('/inscripcione', inscripcionRoutes);
app.use('/grupo', grupoRoutes);
app.use('/horario', horarioRoutes);
app.use('/docente', docenteRoutes);
app.use('/alumno', alumnoRoutes);
app.use('/municipios', municipiosRoutes);
app.use('/estados', estadosRoutes);
app.use('/inicio', inicioRouter);
app.use('/municipios', municipiosRoutes);
app.use('/estados', estadosRoutes);
app.use('/inicio', inicioRouter);

app.get('/api/status', (req, res) => {
  res.json({ message: 'Backend funcionando' });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});