const pool = require('../db/pool');

exports.getAllCarreras = async (req, res) => {
  try {
    const carreras = await pool.query(`
      SELECT idCarrera, carrera, duracion_semestres, descripcion, idPlantel
      FROM dbo_carrera
    `);
    res.json({ carreras });
  } catch (err) {
    console.error('Error al obtener carreras:', err);
    res.status(500).json({ error: 'Error al consultar carreras', detalle: err.message });
  }
};

exports.getCarreraById = async (req, res) => {
  const idCarrera = req.params.id;
  try {
    const rows = await pool.query(`
      SELECT idCarrera, carrera, duracion_semestres, descripcion, idPlantel
      FROM dbo_carrera
      WHERE idCarrera = ?
    `, [idCarrera]);

    if (rows.length === 0) {
      return res.status(404).json({ error: 'Carrera no encontrada' });
    }

    res.json({ carrera: rows[0] });
  } catch (err) {
    console.error('Error al obtener carrera:', err);
    res.status(500).json({ error: 'Error al consultar carrera', detalle: err.message });
  }
};

exports.createCarrera = async (req, res) => {
  const { carrera, duracion_semestres, descripcion, idPlantel } = req.body;

  if (!carrera || !duracion_semestres || !idPlantel) {
    return res.status(400).json({ error: 'Faltan datos obligatorios de la carrera' });
  }

  try {
    const result = await pool.query(`
      INSERT INTO dbo_carrera (carrera, duracion_semestres, descripcion, idPlantel)
      VALUES (?, ?, ?, ?)
    `, [carrera, duracion_semestres, descripcion, idPlantel]);

    res.json({ mensaje: 'Carrera creada correctamente', idCarrera: Number(result.insertId)});
  } catch (err) {
    console.error('Error al crear carrera:', err);
    res.status(500).json({ error: 'Error al crear carrera', detalle: err.message });
  }
};

exports.updateCarrera = async (req, res) => {
  const idCarrera = req.params.id;
  const { carrera, duracion_semestres, descripcion, idPlantel } = req.body;

  try {
    const result = await pool.query(`
      UPDATE dbo_carrera
      SET carrera = ?, duracion_semestres = ?, descripcion = ?, idPlantel = ?
      WHERE idCarrera = ?
    `, [carrera, duracion_semestres, descripcion, idPlantel, idCarrera]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Carrera no encontrada' });
    }

    res.json({ mensaje: 'Carrera actualizada correctamente' });
  } catch (err) {
    console.error('Error al actualizar carrera:', err);
    res.status(500).json({ error: 'Error al actualizar carrera', detalle: err.message });
  }
};

exports.deleteCarrera = async (req, res) => {
  const idCarrera = req.params.id;

  try {
    const result = await pool.query(`
      DELETE FROM dbo_carrera
      WHERE idCarrera = ?
    `, [idCarrera]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Carrera no encontrada o ya eliminada' });
    }

    res.json({ mensaje: 'Carrera eliminada correctamente' });
  } catch (err) {
    console.error('Error al eliminar carrera:', err);
    res.status(500).json({ error: 'Error al eliminar carrera', detalle: err.message });
  }
};