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

exports.getAlumnobyID = async (req, res) => {
  const idAlumno = req.params.id;
  try {
    const rows = await pool.query(`
      SELECT a.idAlumno, u.usuario, u.correo_electronico
      FROM dbo_alumno a
      INNER JOIN dbo_usuario u ON a.idUsuario = u.idUsuario
      WHERE a.idAlumno = ?
    `, [idAlumno]);
    res.json({ alumnos: rows });

  if (rows.length === 0) {
      return res.status(404).json({ error: 'Alumno no encontrado' });
    }

    res.json({ docentes: rows[0] });
  } catch (err) {
    console.error('Error al obtener Alumno:', err);
    res.status(500).json({ error: 'Error al consultar Alumno', detalle: err.message });
  }
};