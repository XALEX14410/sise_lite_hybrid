<<<<<<< HEAD
const pool = require('../db/pool');

exports.getAllBecas = async (req, res) => {
  try {
    const rows = await pool.query('SELECT * FROM dbo_becas');
    res.json({ becas: rows });
=======
const Beca = require('../models/becaModel');

exports.obtenerBecas = async (req, res) => {
  try {
    const becas = await Beca.getAll();
    res.json({ becas });
>>>>>>> backend
  } catch (err) {
    console.error('Error al obtener becas:', err);
    res.status(500).json({ error: 'Error al consultar becas', detalle: err.message });
  }
};

<<<<<<< HEAD
exports.getBecaById = async (req, res) => {
  const id = req.params.id;
  try {
    const rows = await pool.query('SELECT * FROM dbo_becas WHERE idBeca = ?', [id]);
    if (rows.length === 0) return res.status(404).json({ error: 'Beca no encontrada' });
    res.json({ beca: rows[0] });
=======
exports.obtenerBecaporId = async (req, res) => {
  const id = req.params.id;
  try {
    const beca = await Beca.getById(id);
    if (!beca) return res.status(404).json({ error: 'Beca no encontrada' });
    res.json({ beca });
>>>>>>> backend
  } catch (err) {
    console.error('Error al obtener beca:', err);
    res.status(500).json({ error: 'Error al consultar beca', detalle: err.message });
  }
};

<<<<<<< HEAD
exports.createBeca = async (req, res) => {
  // Aquí puedes agregar campos extra si amplías la tabla
  try {
    const result = await pool.query(`INSERT INTO dbo_becas () VALUES ()`); // Insert sin campos (solo PK auto_increment)
    res.json({ mensaje: 'Beca creada', idBeca: result.insertId });
=======
exports.registrarBeca = async (req, res) => {
  try {
    const idBeca = await Beca.create();
    res.json({ mensaje: 'Beca creada', idBeca: Number(idBeca) });
>>>>>>> backend
  } catch (err) {
    console.error('Error al crear beca:', err);
    res.status(500).json({ error: 'Error al crear beca', detalle: err.message });
  }
};

<<<<<<< HEAD
exports.updateBeca = async (req, res) => {
  const id = req.params.id;
  // Aquí deberías poner los campos para actualizar si agregas alguno
  try {
    // Sin campos para actualizar por ahora
    res.status(400).json({ error: 'No hay campos para actualizar en beca' });
  } catch (err) {
    console.error('Error al actualizar beca:', err);
    res.status(500).json({ error: 'Error al actualizar beca', detalle: err.message });
  }
};

exports.deleteBeca = async (req, res) => {
  const id = req.params.id;
  try {
    const result = await pool.query('DELETE FROM dbo_becas WHERE idBeca = ?', [id]);
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Beca no encontrada' });
=======
exports.actualizarBeca = async (req, res) => {
  res.status(400).json({ error: 'No hay campos para actualizar en beca' });
};

exports.eliminarBeca = async (req, res) => {
  const id = req.params.id;
  try {
    const affected = await Beca.remove(id);
    if (affected === 0) return res.status(404).json({ error: 'Beca no encontrada' });
>>>>>>> backend
    res.json({ mensaje: 'Beca eliminada' });
  } catch (err) {
    console.error('Error al eliminar beca:', err);
    res.status(500).json({ error: 'Error al eliminar beca', detalle: err.message });
  }
};
