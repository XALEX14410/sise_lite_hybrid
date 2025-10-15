<<<<<<< HEAD
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
=======
const Plantel = require('../models/plantelModel');

exports.obtenerPlantel = async (req, res) => {
  try {
    const planteles = await Plantel.getAll();
    res.json({ planteles });
>>>>>>> backend
  } catch (err) {
    console.error('Error al obtener planteles:', err);
    res.status(500).json({ error: 'Error al consultar planteles', detalle: err.message });
  }
};

<<<<<<< HEAD
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
=======
exports.obtenerPlantelporID = async (req, res) => {
  const id = req.params.id;
  try {
    const plantel = await Plantel.getById(id);
    if (!plantel) {
      return res.status(404).json({ error: 'Plantel no encontrado' });
    }
    res.json({ plantel });
  } catch (err) {
    console.error('Error al obtener plantel:', err);
    res.status(500).json({ error: 'Error al consultar plantel', detalle: err.message });
  }
};

exports.registrarPlantel = async (req, res) => {
  try {
    const idPlantel = await Plantel.create({ nombre_plantel, idEstado, idMunicipio });
    res.status(201).json({ mensaje: 'Plantel creado correctamente', idPlantel: Number(idPlantel) });
  } catch (err) {
    console.error('Error al crear plantel:', err);
    res.status(500).json({ error: 'Error al crear plantel', detalle: err.message });
  }
};

exports.actualizarPlantel = async (req, res) => {
  const id = req.params.id;
  try {
    const updated = await Plantel.update(id, { nombre_plantel, idEstado, idMunicipio });
    if (updated === 0) {
      return res.status(404).json({ error: 'Plantel no encontrado' });
    }
    res.json({ mensaje: 'Plantel actualizado correctamente' });
>>>>>>> backend
  } catch (err) {
    console.error('Error al actualizar plantel:', err);
    res.status(500).json({ error: 'Error al actualizar plantel', detalle: err.message });
  }
};

<<<<<<< HEAD
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

=======
exports.eliminarPlantel = async (req, res) => {
  const id = req.params.id;
  try {
    const deleted = await Plantel.remove(id);
    if (deleted === 0) {
      return res.status(404).json({ error: 'Plantel no encontrado o ya eliminado' });
    }
>>>>>>> backend
    res.json({ mensaje: 'Plantel eliminado correctamente' });
  } catch (err) {
    console.error('Error al eliminar plantel:', err);
    res.status(500).json({ error: 'Error al eliminar plantel', detalle: err.message });
  }
<<<<<<< HEAD
}
=======
};
>>>>>>> backend
