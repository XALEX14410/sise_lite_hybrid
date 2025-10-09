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

exports.getAllHorarios = async (req, res) => {
  try {
    const horarios = await pool.query(`
      SELECT h.idHorario, h.dia_semana, h.hora, h.aula,
             g.clave_grupo, m.nombre_materia, d.usuario AS docente
      FROM dbo_horario h
      INNER JOIN dbo_grupo g ON h.idGrupo = g.idGrupo
      INNER JOIN dbo_materias m ON g.idMateria = m.idMateria
      LEFT JOIN dbo_usuario d ON g.idDocente = d.idUsuario
      ORDER BY FIELD(h.dia_semana, 'Lunes','Martes','Miércoles','Jueves','Viernes','Sábado','Domingo'),
               h.hora ASC
    `);

    res.json({ horarios });
  } catch (err) {
    console.error('Error al obtener horarios:', err);
    res.status(500).json({ error: 'Error al consultar horarios', detalle: err.message });
  }
};

exports.getHorarioById = async (req, res) => {
  const idHorario = req.params.id;

  if (isNaN(idHorario)) {
    return res.status(400).json({ error: 'ID de horario inválido' });
  }

  try {
    const rows = await pool.query(`
      SELECT h.idHorario, h.dia_semana, h.hora, h.aula,
             g.clave_grupo, m.nombre_materia, d.usuario AS docente
      FROM dbo_horario h
      INNER JOIN dbo_grupo g ON h.idGrupo = g.idGrupo
      INNER JOIN dbo_materias m ON g.idMateria = m.idMateria
      LEFT JOIN dbo_usuario d ON g.idDocente = d.idUsuario
      WHERE h.idHorario = ?
    `, [idHorario]);

    if (rows.length === 0) {
      return res.status(404).json({ error: 'Horario no encontrado' });
    }

    res.json({ horario: rows[0] });
  } catch (err) {
    console.error('Error al obtener horario:', err);
    res.status(500).json({ error: 'Error al consultar horario', detalle: err.message });
  }
};

exports.updateHorario = async (req, res) => {
  const idHorario = req.params.id;
  const { dia_semana, hora, aula } = req.body;

  if (!dia_semana || !hora || !aula) {
    return res.status(400).json({ error: 'Faltan datos para actualizar el horario' });
  }

  try {
    const result = await pool.query(`
      UPDATE dbo_horario
      SET dia_semana = ?, hora = ?, aula = ?
      WHERE idHorario = ?
    `, [dia_semana, hora, aula, idHorario]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Horario no encontrado' });
    }

    res.json({ mensaje: 'Horario actualizado correctamente' });
  } catch (err) {
    console.error('Error al actualizar horario:', err);
    res.status(500).json({ error: 'Error al actualizar horario', detalle: err.message });
  }
};

exports.deleteHorario = async (req, res) => {
  const idHorario = req.params.id;

  try {
    const result = await pool.query(`
      DELETE FROM dbo_horario WHERE idHorario = ?
    `, [idHorario]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Horario no encontrado o ya eliminado' });
    }

    res.json({ mensaje: 'Horario eliminado correctamente' });
  } catch (err) {
    console.error('Error al eliminar horario:', err);
    res.status(500).json({ error: 'Error al eliminar horario', detalle: err.message });
  }
};
