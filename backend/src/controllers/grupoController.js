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
  const { periodo, clave_grupo, cupo, idMateria, idDocente } = req.body;

  if (!periodo || !clave_grupo || !cupo || !idMateria || !idDocente) {
    return res.status(400).json({ error: 'Faltan datos del grupo' });
  }

  try {
    const result = await pool.query(`
      INSERT INTO dbo_grupo (periodo, clave_grupo, cupo, idMateria, idDocente)
      VALUES (?, ?, ?, ?, ?)
    `, [periodo, clave_grupo, cupo, idMateria, idDocente]);

    res.json({ mensaje: 'Grupo creado correctamente', idGrupo: Number(result.insertId) });
  } catch (err) {
    console.error('Error al crear grupo:', err);
    res.status(500).json({ error: 'Error al crear grupo', detalle: err.message });
  }
};

exports.updateGrupo = async (req, res) => {
  const idGrupo = req.params.id;
  const { periodo, clave_grupo, cupo, idMateria, idDocente } = req.body;

  if (!periodo || !clave_grupo || !cupo || !idMateria || !idDocente) {
    return res.status(400).json({ error: 'Faltan datos para actualizar el grupo' });
  }

  try {
    const result = await pool.query(`
      UPDATE dbo_grupo
      SET periodo = ?, clave_grupo = ?, cupo = ?, idMateria = ?, idDocente = ?
      WHERE idGrupo = ?
    `, [periodo, clave_grupo, cupo, idMateria, idDocente, idGrupo]);

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