<<<<<<< HEAD
const pool = require('../db/pool');

exports.getAllCargaAcademica = async (req, res) => {
  try {
    const rows = await pool.query('SELECT * FROM dbo_carga_academica');
    res.json({ cargaAcademica: rows });
=======
const CargaAcademica = require('../models/cargaAcademicaModel');

exports.obtenerCargaAcademica = async (req, res) => {
  try {
    const cargaAcademica = await CargaAcademica.getAll();
    res.json({ cargaAcademica });
>>>>>>> backend
  } catch (err) {
    console.error('Error al obtener carga académica:', err);
    res.status(500).json({ error: 'Error al consultar carga académica', detalle: err.message });
  }
};

<<<<<<< HEAD
exports.getCargaAcademicaById = async (req, res) => {
  const id = req.params.id;
  try {
    const rows = await pool.query('SELECT * FROM dbo_carga_academica WHERE idCargaAcademica = ?', [id]);
    if (rows.length === 0) return res.status(404).json({ error: 'Carga académica no encontrada' });
    res.json({ cargaAcademica: rows[0] });
=======
exports.obtenerCargaAcademicaById = async (req, res) => {
  const id = req.params.id;
  try {
    const carga = await CargaAcademica.getById(id);
    if (!carga) return res.status(404).json({ error: 'Carga académica no encontrada' });
    res.json({ cargaAcademica: carga });
>>>>>>> backend
  } catch (err) {
    console.error('Error al obtener carga académica:', err);
    res.status(500).json({ error: 'Error al consultar carga académica', detalle: err.message });
  }
};

<<<<<<< HEAD
exports.createCargaAcademica = async (req, res) => {
  const { idMateria, SC, AS, EGC, creditos, RC, Grupo } = req.body;
  if (!idMateria) {
    return res.status(400).json({ error: 'Falta idMateria obligatorio' });
  }
  try {
    const result = await pool.query(`
      INSERT INTO dbo_carga_academica (idMateria, SC, AS, EGC, creditos, RC, Grupo)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `, [idMateria, SC || null, AS || null, EGC || null, creditos || null, RC || null, Grupo || null]);
    res.json({ mensaje: 'Carga académica creada', idCargaAcademica: result.insertId });
=======
exports.registrarCargaAcademica = async (req, res) => {
  const { idMateria, SC, AS, EGC, creditos, RC, Grupo } = req.body;
  if (!idMateria) return res.status(400).json({ error: 'Falta idMateria obligatorio' });

  try {
    const idCargaAcademica = await CargaAcademica.create({ idMateria, SC, AS, EGC, creditos, RC, Grupo });
    res.json({ mensaje: 'Carga académica creada', idCargaAcademica: Number(idCargaAcademica) });
>>>>>>> backend
  } catch (err) {
    console.error('Error al crear carga académica:', err);
    res.status(500).json({ error: 'Error al crear carga académica', detalle: err.message });
  }
};

<<<<<<< HEAD
exports.updateCargaAcademica = async (req, res) => {
  const id = req.params.id;
  const { idMateria, SC, AS, EGC, creditos, RC, Grupo } = req.body;
  try {
    const result = await pool.query(`
      UPDATE dbo_carga_academica
      SET idMateria = ?, SC = ?, AS = ?, EGC = ?, creditos = ?, RC = ?, Grupo = ?
      WHERE idCargaAcademica = ?
    `, [idMateria, SC || null, AS || null, EGC || null, creditos || null, RC || null, Grupo || null, id]);
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Carga académica no encontrada' });
=======
exports.actualizarCargaAcademica = async (req, res) => {
  const id = req.params.id;
  const { idMateria, SC, AS, EGC, creditos, RC, Grupo } = req.body;

  try {
    const affected = await CargaAcademica.update(id, { idMateria, SC, AS, EGC, creditos, RC, Grupo });
    if (affected === 0) return res.status(404).json({ error: 'Carga académica no encontrada' });
>>>>>>> backend
    res.json({ mensaje: 'Carga académica actualizada' });
  } catch (err) {
    console.error('Error al actualizar carga académica:', err);
    res.status(500).json({ error: 'Error al actualizar carga académica', detalle: err.message });
  }
};

<<<<<<< HEAD
exports.deleteCargaAcademica = async (req, res) => {
  const id = req.params.id;
  try {
    const result = await pool.query('DELETE FROM dbo_carga_academica WHERE idCargaAcademica = ?', [id]);
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Carga académica no encontrada' });
=======
exports.eliminarCargaAcademica = async (req, res) => {
  const id = req.params.id;

  try {
    const affected = await CargaAcademica.remove(id);
    if (affected === 0) return res.status(404).json({ error: 'Carga académica no encontrada' });
>>>>>>> backend
    res.json({ mensaje: 'Carga académica eliminada' });
  } catch (err) {
    console.error('Error al eliminar carga académica:', err);
    res.status(500).json({ error: 'Error al eliminar carga académica', detalle: err.message });
  }
};
