const pool = require('../db/pool');

exports.getGruposDelAlumno = async (req, res) => {
  const idAlumno = req.params.id;

  try {
    const grupos = await pool.query(`
      SELECT g.idGrupo, g.clave_grupo, m.nombre_materia, d.idDocente, u.usuario AS docente
      FROM dbo_inscripciones i
      INNER JOIN dbo_grupo g ON i.idGrupo = g.idGrupo
      INNER JOIN dbo_materias m ON g.idMateria = m.idMateria
      INNER JOIN dbo_docente d ON g.idDocente = d.idDocente
      INNER JOIN dbo_usuario u ON d.idUsuario = u.idUsuario
      WHERE i.idAlumno = ?
    `, [idAlumno]);

    res.json({ grupos });
  } catch (err) {
    console.error('Error al obtener grupos del alumno:', err);
    res.status(500).json({ error: 'Error al consultar grupos', detalle: err.message });
  }
};