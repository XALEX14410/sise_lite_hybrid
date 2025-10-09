const pool = require('../db/pool');

exports.getAllCalificaciones = async (req, res) => {
  try {
    const rows = await pool.query('SELECT * FROM dbo_calificaciones');
    res.json({ calificaciones: rows });
  } catch (err) {
    console.error('Error al obtener calificaciones:', err);
    res.status(500).json({ error: 'Error al consultar calificaciones', detalle: err.message });
  }
};

exports.getCalificacionById = async (req, res) => {
  const id = req.params.id;
  try {
    const rows = await pool.query('SELECT * FROM dbo_calificaciones WHERE idCalificación = ?', [id]);
    if (rows.length === 0) return res.status(404).json({ error: 'Calificación no encontrada' });
    res.json({ calificacion: rows[0] });
  } catch (err) {
    console.error('Error al obtener calificación:', err);
    res.status(500).json({ error: 'Error al consultar calificación', detalle: err.message });
  }
};

exports.createCalificacion = async (req, res) => {
  const { idInscripción, valor, observaciones } = req.body;
  if (!idInscripción || valor == null) {
    return res.status(400).json({ error: 'Faltan datos obligatorios' });
  }
  try {
    const result = await pool.query(`
      INSERT INTO dbo_calificaciones (idInscripción, valor, observaciones)
      VALUES (?, ?, ?)
    `, [idInscripción, valor, observaciones || null]);
    res.json({ mensaje: 'Calificación creada', idCalificación: result.insertId });
  } catch (err) {
    console.error('Error al crear calificación:', err);
    res.status(500).json({ error: 'Error al crear calificación', detalle: err.message });
  }
};

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
    res.json({ mensaje: 'Calificación actualizada' });
  } catch (err) {
    console.error('Error al actualizar calificación:', err);
    res.status(500).json({ error: 'Error al actualizar calificación', detalle: err.message });
  }
};

exports.deleteCalificacion = async (req, res) => {
  const id = req.params.id;
  try {
    const result = await pool.query('DELETE FROM dbo_calificaciones WHERE idCalificación = ?', [id]);
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Calificación no encontrada' });
    res.json({ mensaje: 'Calificación eliminada' });
  } catch (err) {
    console.error('Error al eliminar calificación:', err);
    res.status(500).json({ error: 'Error al eliminar calificación', detalle: err.message });
  }
};
