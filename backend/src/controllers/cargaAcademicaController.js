const pool = require('../db/pool');

exports.getAllCargaAcademica = async (req, res) => {
  try {
    const rows = await pool.query('SELECT * FROM dbo_carga_academica');
    res.json({ cargaAcademica: rows });
  } catch (err) {
    console.error('Error al obtener carga académica:', err);
    res.status(500).json({ error: 'Error al consultar carga académica', detalle: err.message });
  }
};

exports.getCargaAcademicaById = async (req, res) => {
  const id = req.params.id;
  try {
    const rows = await pool.query('SELECT * FROM dbo_carga_academica WHERE idCargaAcademica = ?', [id]);
    if (rows.length === 0) return res.status(404).json({ error: 'Carga académica no encontrada' });
    res.json({ cargaAcademica: rows[0] });
  } catch (err) {
    console.error('Error al obtener carga académica:', err);
    res.status(500).json({ error: 'Error al consultar carga académica', detalle: err.message });
  }
};

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
  } catch (err) {
    console.error('Error al crear carga académica:', err);
    res.status(500).json({ error: 'Error al crear carga académica', detalle: err.message });
  }
};

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
    res.json({ mensaje: 'Carga académica actualizada' });
  } catch (err) {
    console.error('Error al actualizar carga académica:', err);
    res.status(500).json({ error: 'Error al actualizar carga académica', detalle: err.message });
  }
};

exports.deleteCargaAcademica = async (req, res) => {
  const id = req.params.id;
  try {
    const result = await pool.query('DELETE FROM dbo_carga_academica WHERE idCargaAcademica = ?', [id]);
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Carga académica no encontrada' });
    res.json({ mensaje: 'Carga académica eliminada' });
  } catch (err) {
    console.error('Error al eliminar carga académica:', err);
    res.status(500).json({ error: 'Error al eliminar carga académica', detalle: err.message });
  }
};
