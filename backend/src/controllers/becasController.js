const pool = require('../db/pool');

exports.getAllBecas = async (req, res) => {
  try {
    const rows = await pool.query('SELECT * FROM dbo_becas');
    res.json({ becas: rows });
  } catch (err) {
    console.error('Error al obtener becas:', err);
    res.status(500).json({ error: 'Error al consultar becas', detalle: err.message });
  }
};

exports.getBecaById = async (req, res) => {
  const id = req.params.id;
  try {
    const rows = await pool.query('SELECT * FROM dbo_becas WHERE idBeca = ?', [id]);
    if (rows.length === 0) return res.status(404).json({ error: 'Beca no encontrada' });
    res.json({ beca: rows[0] });
  } catch (err) {
    console.error('Error al obtener beca:', err);
    res.status(500).json({ error: 'Error al consultar beca', detalle: err.message });
  }
};

exports.createBeca = async (req, res) => {
  // Aquí puedes agregar campos extra si amplías la tabla
  try {
    const result = await pool.query(`INSERT INTO dbo_becas () VALUES ()`); // Insert sin campos (solo PK auto_increment)
    res.json({ mensaje: 'Beca creada', idBeca: result.insertId });
  } catch (err) {
    console.error('Error al crear beca:', err);
    res.status(500).json({ error: 'Error al crear beca', detalle: err.message });
  }
};

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
    res.json({ mensaje: 'Beca eliminada' });
  } catch (err) {
    console.error('Error al eliminar beca:', err);
    res.status(500).json({ error: 'Error al eliminar beca', detalle: err.message });
  }
};
