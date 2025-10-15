<<<<<<< HEAD
const pool = require('../db/pool');

exports.getAllCalificaciones = async (req, res) => {
  try {
    const rows = await pool.query('SELECT * FROM dbo_calificaciones');
    res.json({ calificaciones: rows });
=======
const Calificacion = require('../models/calificacionModel');

exports.obtenerCalificaciones = async (req, res) => {
  try {
    const calificaciones = await Calificacion.getAll();
    res.json({ calificaciones });
>>>>>>> backend
  } catch (err) {
    console.error('Error al obtener calificaciones:', err);
    res.status(500).json({ error: 'Error al consultar calificaciones', detalle: err.message });
  }
};

<<<<<<< HEAD
exports.getCalificacionById = async (req, res) => {
  const id = req.params.id;
  try {
    const rows = await pool.query('SELECT * FROM dbo_calificaciones WHERE idCalificación = ?', [id]);
    if (rows.length === 0) return res.status(404).json({ error: 'Calificación no encontrada' });
    res.json({ calificacion: rows[0] });
=======
exports.obtenerCalificacionById = async (req, res) => {
  const id = req.params.id;
  try {
    const calificacion = await Calificacion.getById(id);
    if (!calificacion) return res.status(404).json({ error: 'Calificación no encontrada' });
    res.json({ calificacion });
>>>>>>> backend
  } catch (err) {
    console.error('Error al obtener calificación:', err);
    res.status(500).json({ error: 'Error al consultar calificación', detalle: err.message });
  }
};

<<<<<<< HEAD
exports.createCalificacion = async (req, res) => {
=======
exports.registrarCalificacion = async (req, res) => {
>>>>>>> backend
  const { idInscripción, valor, observaciones } = req.body;
  if (!idInscripción || valor == null) {
    return res.status(400).json({ error: 'Faltan datos obligatorios' });
  }
  try {
<<<<<<< HEAD
    const result = await pool.query(`
      INSERT INTO dbo_calificaciones (idInscripción, valor, observaciones)
      VALUES (?, ?, ?)
    `, [idInscripción, valor, observaciones || null]);
    res.json({ mensaje: 'Calificación creada', idCalificación: result.insertId });
=======
    const idCalificación = await Calificacion.create({ idInscripción, valor, observaciones });
    res.json({ mensaje: 'Calificación creada', idCalificación: Number(idCalificación) });
>>>>>>> backend
  } catch (err) {
    console.error('Error al crear calificación:', err);
    res.status(500).json({ error: 'Error al crear calificación', detalle: err.message });
  }
};

<<<<<<< HEAD
exports.updateCalificacion = async (req, res) => {
  const id = req.params.id;
  const { idInscripción, valor, observaciones } = req.body;
  try {
    const result = await pool.query(`
      UPDATE dbo_calificaciones
      SET idInscripción = ?, valor = ?, observaciones = ?
      WHERE idCalificación = ?
    `, [idInscripción, valor, observaciones || null, id]);
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Calificación no encontrada' });
=======
exports.actualizarCalificacion = async (req, res) => {
  const id = req.params.id;
  const { idInscripción, valor, observaciones } = req.body;
  try {
    const affected = await Calificacion.update(id, { idInscripción, valor, observaciones });
    if (affected === 0) return res.status(404).json({ error: 'Calificación no encontrada' });
>>>>>>> backend
    res.json({ mensaje: 'Calificación actualizada' });
  } catch (err) {
    console.error('Error al actualizar calificación:', err);
    res.status(500).json({ error: 'Error al actualizar calificación', detalle: err.message });
  }
};

<<<<<<< HEAD
exports.deleteCalificacion = async (req, res) => {
  const id = req.params.id;
  try {
    const result = await pool.query('DELETE FROM dbo_calificaciones WHERE idCalificación = ?', [id]);
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Calificación no encontrada' });
=======
exports.eliminarCalificacion = async (req, res) => {
  const id = req.params.id;
  try {
    const affected = await Calificacion.remove(id);
    if (affected === 0) return res.status(404).json({ error: 'Calificación no encontrada' });
>>>>>>> backend
    res.json({ mensaje: 'Calificación eliminada' });
  } catch (err) {
    console.error('Error al eliminar calificación:', err);
    res.status(500).json({ error: 'Error al eliminar calificación', detalle: err.message });
  }
};
