const pool = require('../db/pool');

exports.getAllPagos = async (req, res) => {
  try {
    const rows = await pool.query('SELECT * FROM dbo_pagos');
    res.json({ pagos: rows });
  } catch (err) {
    console.error('Error al obtener pagos:', err);
    res.status(500).json({ error: 'Error al consultar pagos', detalle: err.message });
  }
};

exports.getPagoById = async (req, res) => {
  const id = req.params.id;
  try {
    const rows = await pool.query('SELECT * FROM dbo_pagos WHERE idPago = ?', [id]);
    if (rows.length === 0) return res.status(404).json({ error: 'Pago no encontrado' });
    res.json({ pago: rows[0] });
  } catch (err) {
    console.error('Error al obtener pago:', err);
    res.status(500).json({ error: 'Error al consultar pago', detalle: err.message });
  }
};

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
  } catch (err) {
    console.error('Error al actualizar pago:', err);
    res.status(500).json({ error: 'Error al actualizar pago', detalle: err.message });
  }
};

exports.deletePago = async (req, res) => {
  const id = req.params.id;
  try {
    const result = await pool.query('DELETE FROM dbo_pagos WHERE idPago = ?', [id]);
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Pago no encontrado' });
    res.json({ mensaje: 'Pago eliminado' });
  } catch (err) {
    console.error('Error al eliminar pago:', err);
    res.status(500).json({ error: 'Error al eliminar pago', detalle: err.message });
  }
};
