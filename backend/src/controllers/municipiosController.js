const pool = require('../db/pool');

exports.getMunicipiosPorEstado = async (req, res) => {
  const { estado_id } = req.params;

  try {
    const conn = await pool.getConnection();
    const rows = await conn.query(
      'SELECT id_municipio, nombre FROM dbo_municipios WHERE estado_id = ?',
      [estado_id]
    );
    conn.release();

    res.json({ municipios: rows });
  } catch (error) {
    console.error('Error al obtener municipios:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};
