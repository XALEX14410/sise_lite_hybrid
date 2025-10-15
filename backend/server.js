const express = require('express');
const cors = require("cors");
<<<<<<< HEAD
const morgan = require("morgan");
const pool = require('./src/db/pool');
const session = require('express-session');

require('dotenv').config();
=======
const morgan = require('morgan');
const session = require('express-session');
const pool = require('./src/db/pool');
require('dotenv').config();

>>>>>>> backend
const app = express();

app.use(cors({
  origin: true, // tu frontend
  credentials: true
}));


const loginRoutes = require('./src/routes/loginRoutes');
<<<<<<< HEAD
//const alumnoRoutes = require('./src/routes/alumnoRoutes');
//const docenteRoutes = require('./src/routes/docenteRoutes');
=======
const alumnoRoutes = require('./src/routes/alumnoRoutes');
const docenteRoutes = require('./src/routes/docenteRoutes');
>>>>>>> backend
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
app.use('/auth', loginRoutes);
<<<<<<< HEAD
//app.use('/docente', docenteRoutes);
//app.use('/alumno', alumnoRoutes);
app.use('/municipios', municipiosRoutes);
app.use('/estados', estadosRoutes);
app.use('/inicio', inicioRouter);
app.use('/inicio', inicioRouter);
=======
app.use('/docente', docenteRoutes);
app.use('/alumno', alumnoRoutes);
app.use('/municipios', municipiosRoutes);
app.use('/estados', estadosRoutes);
app.use('/inicio', inicioRouter);
>>>>>>> backend

app.get('/api/status', (req, res) => {
  res.json({ message: 'Backend funcionando' });
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});