<<<<<<< HEAD
const pool = require('../db/pool');

exports.getAllPagos = async (req, res) => {
  try {
    const rows = await pool.query('SELECT * FROM dbo_pagos');
    res.json({ pagos: rows });
=======
const Pago = require('../models/pagosModel');

exports.obtenerPagos = async (req, res) => {
  try {
    const pagos = await Pago.getAll();
    res.json({ pagos });
>>>>>>> backend
  } catch (err) {
    console.error('Error al obtener pagos:', err);
    res.status(500).json({ error: 'Error al consultar pagos', detalle: err.message });
  }
};

<<<<<<< HEAD
exports.getPagoById = async (req, res) => {
  const id = req.params.id;
  try {
    const rows = await pool.query('SELECT * FROM dbo_pagos WHERE idPago = ?', [id]);
    if (rows.length === 0) return res.status(404).json({ error: 'Pago no encontrado' });
    res.json({ pago: rows[0] });
=======
exports.obtenerPagoporID = async (req, res) => {
  const id = req.params.id;

  try {
    const pago = await Pago.getById(id);
    if (!pago) {
      return res.status(404).json({ error: 'Pago no encontrado' });
    }
    res.json({ pago });
>>>>>>> backend
  } catch (err) {
    console.error('Error al obtener pago:', err);
    res.status(500).json({ error: 'Error al consultar pago', detalle: err.message });
  }
};

<<<<<<< HEAD
exports.createPago = async (req, res) => {
  const { idBeca, idUsuario, cantidad_a_pagar, fecha_de_pago, estado } = req.body;
  if (!idBeca || !idUsuario || !cantidad_a_pagar || !estado) {
    return res.status(400).json({ error: 'Faltan datos obligatorios' });
  }
  try {
    const result = await pool.query(`
      INSERT INTO dbo_pagos (idBeca, idUsuario, cantidad_a_pagar, fecha_de_pago, estado)
      VALUES (?, ?, ?, ?, ?)
    `, [idBeca, idUsuario, cantidad_a_pagar, fecha_de_pago || null, estado]);
    res.json({ mensaje: 'Pago creado', idPago: result.insertId });
  } catch (err) {
    console.error('Error al crear pago:', err);
    res.status(500).json({ error: 'Error al crear pago', detalle: err.message });
  }
};

exports.updatePago = async (req, res) => {
  const id = req.params.id;
  const { idBeca, idUsuario, cantidad_a_pagar, fecha_de_pago, estado } = req.body;
  try {
    const result = await pool.query(`
      UPDATE dbo_pagos
      SET idBeca = ?, idUsuario = ?, cantidad_a_pagar = ?, fecha_de_pago = ?, estado = ?
      WHERE idPago = ?
    `, [idBeca, idUsuario, cantidad_a_pagar, fecha_de_pago || null, estado, id]);
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Pago no encontrado' });
    res.json({ mensaje: 'Pago actualizado' });
=======
exports.registrarPago = async (req, res) => {
  try {
    const idPlantel = await Plantel.create({ nombre_plantel, idEstado, idMunicipio });
    res.status(201).json({ mensaje: 'Pago registrado correctamente', idPlantel: Number(idPlantel) });
  } catch (err) {
    console.error('Error al registrar pago:', err);
    res.status(500).json({ error: 'Error al registrar pago', detalle: err.message });
  }
};

exports.actualizarPago = async (req, res) => {
  const id = req.params.id;
  try {
    const updated = await Pago.update(id, { idBeca, idUsuario, cantidad_a_pagar, fecha_de_pago, estado });
    if (updated === 0) {
      return res.status(404).json({ error: 'Pago no encontrado' });
    }
    res.json({ mensaje: 'Pago actualizado correctamente' });
>>>>>>> backend
  } catch (err) {
    console.error('Error al actualizar pago:', err);
    res.status(500).json({ error: 'Error al actualizar pago', detalle: err.message });
  }
};

<<<<<<< HEAD
exports.deletePago = async (req, res) => {
  const id = req.params.id;
  try {
    const result = await pool.query('DELETE FROM dbo_pagos WHERE idPago = ?', [id]);
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Pago no encontrado' });
    res.json({ mensaje: 'Pago eliminado' });
=======
exports.eliminarPago = async (req, res) => {
  const id = req.params.id;
  try {
    const deleted = await Pago.remove(id);
    if (deleted === 0) {
      return res.status(404).json({ error: 'Pago no encontrado o ya eliminado' });
    }
    res.json({ mensaje: 'Pago eliminado correctamente' });
>>>>>>> backend
  } catch (err) {
    console.error('Error al eliminar pago:', err);
    res.status(500).json({ error: 'Error al eliminar pago', detalle: err.message });
  }
<<<<<<< HEAD
};
=======
};
>>>>>>> backend
