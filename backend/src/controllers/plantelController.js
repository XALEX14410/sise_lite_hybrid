const pool = require('../db/pool');

exports.getAllPlantel = async (req, res) => {
    try {
    const plantel = await pool.query(`
      SELECT * FROM dbo_plantel
    `);
    res.json({ plantel });
  } catch (err) {
    console.error('Error al obtener planteles:', err);
    res.status(500).json({ error: 'Error al consultar planteles', detalle: err.message });
  }
}

exports.getPlantelbyID = async (req, res) => {
    const idPlantel = req.params.id;
    try {
    const rows = await pool.query(`
      SELECT idPlantel, nombre_plantel, idEstado, idMunicipio FROM dbo_plantel WHERE idPlantel = ?
    `, [idPlantel]);

    if (rows.length === 0) {
      return res.status(404).json({ error: 'Plantel no encontrado' });
    }

    res.json({ plantel: rows[0] });
  } catch (err) {
    console.error('Error al obtener plantel:', err);
    res.status(500).json({ error: 'Error al consultar plantel', detalle: err.message });
  }
}

exports.createPlantel = async (req, res) => {
    const { nombre_plantel, idEstado, idMunicipio } = req.body;

    if (!nombre_plantel || !idEstado || !idMunicipio) {
    return res.status(400).json({ error: 'Faltan datos obligatorios del plantel' });
    }
    try {
    const result = await pool.query(`
      INSERT INTO dbo_plantel (nombre_plantel, idEstado, idMunicipio)
      VALUES (?, ?, ?)
    `, [nombre_plantel, idEstado, idMunicipio]);

    res.json({ mensaje: 'Plantel creado correctamente', idPlantel: Number(result.insertId)});
  } catch (err) {
    console.error('Error al obtener planteles:', err);
    res.status(500).json({ error: 'Error al consultar planteles', detalle: err.message });
  }
};

exports.updatePlantel = async (req, res) => {
    const idPlantel = req.params.id;
    const { nombre_plantel, idEstado, idMunicipio } = req.body;

    try {
    const result = await pool.query(`
      UPDATE dbo_plantel
      SET nombre_plantel = ?, idEstado = ?, idMunicipio = ?
      WHERE idPlantel = ?
    `, [nombre_plantel, idEstado, idMunicipio, idPlantel]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Plantel no encontrada' });
    }

    res.json({ mensaje: 'Plantel editado correctamente'});
  } catch (err) {
    console.error('Error al actualizar plantel:', err);
    res.status(500).json({ error: 'Error al actualizar plantel', detalle: err.message });
  }
};

exports.deletePlantel = async (req, res) => {
    const idPlantel = req.params.id;
    try {
    const result = await pool.query(`
      DELETE FROM dbo_plantel
      WHERE idPlantel = ?
    `, [idPlantel]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Plantel no encontrado o ya eliminado' });
    }

    res.json({ mensaje: 'Plantel eliminado correctamente' });
  } catch (err) {
    console.error('Error al eliminar plantel:', err);
    res.status(500).json({ error: 'Error al eliminar plantel', detalle: err.message });
  }
}