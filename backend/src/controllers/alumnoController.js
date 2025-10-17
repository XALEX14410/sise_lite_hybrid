const Alumno = require('../models/alumnoModel');

exports.obtenerAlumnos = async (req, res) => {
  try {
    const alumnos = await Alumno.getAll();
    res.json({ alumnos });
  } catch (err) {
    console.error('Error al obtener alumnos:', err);
    res.status(500).json({ error: 'Error al consultar alumnos', detalle: err.message });
  }
};

exports.obtenerAlumnoPorId = async (req, res) => {
  const id = req.params.id;
  try {
    const alumno = await Alumno.getById(id);
    if (!alumno) {
      return res.status(404).json({ error: 'Alumno no encontrado' });
    }
    res.json({ alumno });
  } catch (err) {
    console.error('Error al obtener alumno:', err);
    res.status(500).json({ error: 'Error al consultar alumno', detalle: err.message });
  }
};

exports.registrarAlumno = async (req, res) => {
  console.log('[REGISTRAR] Datos del nuevo alumno recibidos:', req.body);
  try {
    const resultado = await Alumno.create(req.body);
    res.status(201).json({ mensaje: 'Alumno creado correctamente', ...resultado });
  } catch (err) {
    console.error('Error al crear alumno:', err);
    res.status(500).json({ error: 'Error al crear alumno', detalle: err.message });
  }
};

exports.actualizarAlumno = async (req, res) => {
  const id = req.params.id;
  try {
    await Alumno.update(id, req.body);
    res.json({ mensaje: 'Alumno actualizado correctamente' });
  } catch (err) {
    if (err.message.includes('no encontrado')) {
      return res.status(404).json({ error: err.message });
    }
    console.error('Error al actualizar alumno:', err);
    res.status(500).json({ error: 'Error al actualizar alumno', detalle: err.message });
  }
};

exports.eliminarAlumno = async (req, res) => {
  const id = req.params.id;
  try {
    await Alumno.remove(id);
    res.json({ mensaje: 'Alumno eliminado correctamente' });
  } catch (err) {
    if (err.message.includes('no encontrado')) {
      return res.status(404).json({ error: err.message });
    }
    console.error('Error al eliminar alumno:', err);
    res.status(500).json({ error: 'Error al eliminar alumno', detalle: err.message });
  }
};

exports.obtenerCalificacionesPorAlumno = async (req, res) => {
  const { id } = req.params;

  try {
    const calificaciones = await Alumno.getCalificaciones(id);

    if (calificaciones.length === 0) {
      return res.status(404).json({ mensaje: 'No hay calificaciones disponibles' });
    }

    res.json({ calificaciones });
  } catch (error) {
    console.error('Error al obtener calificaciones del alumno:', error);
    res.status(500).json({
      mensaje: 'Error al obtener calificaciones del alumno',
      detalle: error.message,
    });
  }
};

exports.obtenerHorarioporAlumno = async (req, res) => {
  const { id } = req.params;

  try {
    const horario = await Alumno.getHorario(id);

    if (horario.length === 0) {
      return res.status(404).json({ mensaje: 'No hay horarios disponibles' });
    }

    res.json({ horario });
  } catch (error) {
    console.error('Error al obtener horarios del alumno:', error);
    res.status(500).json({
      mensaje: 'Error al obtener horarios del alumno',
      detalle: error.message,
    });
  }
};