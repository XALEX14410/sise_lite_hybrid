const pool = require('../db/pool');

exports.getAllGrupos = async (req, res) => {
  try {
    const grupos = await pool.query(`
      SELECT g.idGrupo, g.clave_grupo, g.cupo, m.nombre_materia, d.usuario AS docente
      FROM dbo_grupo g
      INNER JOIN dbo_materias m ON g.idMateria = m.idMateria
      LEFT JOIN dbo_usuario d ON g.idDocente = d.idUsuario
    `);
    res.json({ grupos });
  } catch (err) {
    console.error('Error al obtener grupos:', err);
    res.status(500).json({ error: 'Error al consultar grupos', detalle: err.message });
  }
};

exports.getGrupoById = async (req, res) => {
  const idGrupo = req.params.id;

  try {
    const rows = await pool.query(`
      SELECT g.idGrupo, g.clave_grupo, g.cupo, m.nombre_materia, d.usuario AS docente
      FROM dbo_grupo g
      INNER JOIN dbo_materias m ON g.idMateria = m.idMateria
      LEFT JOIN dbo_usuario d ON g.idDocente = d.idUsuario
      WHERE g.idGrupo = ?
    `, [idGrupo]);

    if (rows.length === 0) {
      return res.status(404).json({ error: 'Grupo no encontrado' });
    }

    res.json({ grupo: rows[0] });
  } catch (err) {
    console.error('Error al obtener grupo:', err);
    res.status(500).json({ error: 'Error al consultar grupo', detalle: err.message });
  }
};

exports.createGrupo = async (req, res) => {
  const { preido, clave_grupo, cupo, idMateria, idDocente } = req.body;

  if (!preido || !clave_grupo || !cupo || !idMateria || !idDocente) {
    return res.status(400).json({ error: 'Faltan datos del grupo' });
  }

  try {
    const result = await pool.query(`
      INSERT INTO dbo_grupo (preido, clave_grupo, cupo, idMateria, idDocente)
      VALUES (?, ?, ?, ?)
    `, [preido, clave_grupo, cupo, idMateria, idDocente]);

    res.json({ mensaje: 'Grupo creado correctamente', idGrupo: Number(result.insertId) });
  } catch (err) {
    console.error('Error al crear grupo:', err);
    res.status(500).json({ error: 'Error al crear grupo', detalle: err.message });
  }
};

exports.updateGrupo = async (req, res) => {
  const idGrupo = req.params.id;
  const { clave_grupo, cupo, idMateria, idDocente } = req.body;

  if (!clave_grupo || !cupo || !idMateria || !idDocente) {
    return res.status(400).json({ error: 'Faltan datos para actualizar el grupo' });
  }

  try {
    const result = await pool.query(`
      UPDATE dbo_grupo
      SET clave_grupo = ?, cupo = ?, idMateria = ?, idDocente = ?
      WHERE idGrupo = ?
    `, [clave_grupo, cupo, idMateria, idDocente, idGrupo]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Grupo no encontrado' });
    }

    res.json({ mensaje: 'Grupo actualizado correctamente' });
  } catch (err) {
    console.error('Error al actualizar grupo:', err);
    res.status(500).json({ error: 'Error al actualizar grupo', detalle: err.message });
  }
};

exports.deleteGrupo = async (req, res) => {
  const idGrupo = req.params.id;

  try {
    const result = await pool.query('DELETE FROM dbo_grupo WHERE idGrupo = ?', [idGrupo]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Grupo no encontrado' });
    }

    res.json({ mensaje: 'Grupo eliminado correctamente' });
  } catch (err) {
    console.error('Error al eliminar grupo:', err);
    res.status(500).json({ error: 'Error al eliminar grupo', detalle: err.message });
  }
};

exports.getHorarioCompletoDelGrupo = async (req, res) => {
  const idGrupo = req.params.id;

  try {
    const horario = await pool.query(`
      SELECT h.dia_semana, h.hora, h.aula, m.nombre_materia, m.semestre, m.creditos,
             u.usuario AS docente
      FROM dbo_horario h
      INNER JOIN dbo_grupo g ON h.idGrupo = g.idGrupo
      INNER JOIN dbo_materias m ON g.idMateria = m.idMateria
      INNER JOIN dbo_docente d ON g.idDocente = d.idDocente
      INNER JOIN dbo_usuario u ON d.idUsuario = u.idUsuario
      WHERE h.idGrupo = ?
      ORDER BY FIELD(h.dia_semana, 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'), h.hora
    `, [idGrupo]);

    res.json({ horario });
  } catch (err) {
    console.error('Error al obtener horario del grupo:', err);
    res.status(500).json({ error: 'Error al consultar horario', detalle: err.message });
  }
};