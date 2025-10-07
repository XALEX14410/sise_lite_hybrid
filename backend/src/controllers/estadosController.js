const pool = require('../db/pool');

exports.getEstados = async (req, res) => {
  try {
    const conn = await pool.getConnection();
    const rows = await conn.query('SELECT id_estado, nombre FROM dbo_estados');
    conn.release();

    res.json({ estados: rows });
  } catch (error) {
    console.error('Error al obtener estados:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};
