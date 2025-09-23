const pool = require('../db/pool');

exports.createHorario = async (req, res) => {
  const { dia_semana, hora, aula, idGrupo } = req.body;

  if (!dia_semana || !hora || !aula || !idGrupo) {
    return res.status(400).json({ error: 'Faltan datos del horario' });
  }

  try {
    const result = await pool.query(`
      INSERT INTO dbo_horario (dia_semana, hora, aula, idGrupo)
      VALUES (?, ?, ?, ?)
    `, [dia_semana, hora, aula, idGrupo]);

    res.json({ mensaje: 'Horario creado correctamente', idHorario: Number(result.insertId) });
  } catch (err) {
    console.error('Error al crear horario:', err);
    res.status(500).json({ error: 'Error al crear horario', detalle: err.message });
  }
};

exports.getHorariosPorGrupo = async (req, res) => {
  const idGrupo = req.params.id;

  try {
    const rows = await pool.query(`
      SELECT idHorario, dia_semana, hora, aula
      FROM dbo_horario
      WHERE idGrupo = ?
    `, [idGrupo]);

    res.json({ horarios: rows });
  } catch (err) {
    console.error('Error al obtener horarios:', err);
    res.status(500).json({ error: 'Error al consultar horarios', detalle: err.message });
  }
};

exports.updateHorario = async (req, res) => {
  const idHorario = req.params.id;
  const { dia_semana, hora, aula } = req.body;

  try {
    await pool.query(`
      UPDATE dbo_horario
      SET dia_semana = ?, hora = ?, aula = ?
      WHERE idHorario = ?
    `, [dia_semana, hora, aula, idHorario]);

    res.json({ mensaje: 'Horario actualizado correctamente' });
  } catch (err) {
    console.error('Error al actualizar horario:', err);
    res.status(500).json({ error: 'Error al actualizar horario', detalle: err.message });
  }
};

exports.deleteHorario = async (req, res) => {
  const idHorario = req.params.id;

  try {
    await pool.query(`DELETE FROM dbo_horario WHERE idHorario = ?`, [idHorario]);
    res.json({ mensaje: 'Horario eliminado correctamente' });
  } catch (err) {
    console.error('Error al eliminar horario:', err);
    res.status(500).json({ error: 'Error al eliminar horario', detalle: err.message });
  }
};