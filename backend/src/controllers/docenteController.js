const pool = require('../db/pool');

exports.getAllDocentes = async (req, res) => {
  try {
    const rows = await pool.query(`
      SELECT d.idDocente, u.usuario, u.correo_electronico
      FROM dbo_docente d
      INNER JOIN dbo_usuario u ON d.idUsuario = u.idUsuario
    `);
    res.json({ docentes: rows });
  } catch (err) {
    console.error('Error al obtener docentes:', err);
    res.status(500).json({ error: 'Error al consultar docentes', detalle: err.message });
  }
};

exports.getGruposDelDocente = async (req, res) => {
  const idDocente = req.params.id;
  try {
    const rows = await pool.query(`
      SELECT g.idGrupo, g.clave_grupo, g.cupo, m.nombre_materia, m.semestre, m.creditos
      FROM dbo_grupo g
      INNER JOIN dbo_materias m ON g.idMateria = m.idMateria
      WHERE g.idDocente = ?
    `, [idDocente]);

    res.json({ cursos: rows });
  } catch (err) {
    console.error('Error al obtener cursos del docente:', err);
    res.status(500).json({ error: 'Error al consultar cursos', detalle: err.message });
  }
};

exports.getEstudiantesDelDocente = async (req, res) => {
  const idDocente = req.params.id;
  try {
    const rows = await pool.query(`
      SELECT a.idAlumno, u.usuario, u.correo_electronico, a.matricula, a.semestre_actual
      FROM dbo_inscripciones i
      INNER JOIN dbo_grupo g ON i.idGrupo = g.idGrupo
      INNER JOIN dbo_alumno a ON i.idAlumno = a.idAlumno
      INNER JOIN dbo_usuario u ON a.idUsuario = u.idUsuario
      WHERE g.idDocente = ?
    `, [idDocente]);

    res.json({ estudiantes: rows });
  } catch (err) {
    console.error('Error al obtener estudiantes del docente:', err);
    res.status(500).json({ error: 'Error al consultar estudiantes', detalle: err.message });
  }
};

exports.getResumenDelDocente = async (req, res) => {
  const idDocente = req.params.id;

  try {
    const grupos = await pool.query(`
      SELECT g.idGrupo, g.clave_grupo, m.nombre_materia, m.semestre, m.creditos
      FROM dbo_grupo g
      INNER JOIN dbo_materias m ON g.idMateria = m.idMateria
      WHERE g.idDocente = ?
    `, [idDocente]);

    const estudiantes = await pool.query(`
      SELECT g.idGrupo, a.idAlumno, u.usuario, a.matricula
      FROM dbo_inscripciones i
      INNER JOIN dbo_grupo g ON i.idGrupo = g.idGrupo
      INNER JOIN dbo_alumno a ON i.idAlumno = a.idAlumno
      INNER JOIN dbo_usuario u ON a.idUsuario = u.idUsuario
      WHERE g.idDocente = ?
    `, [idDocente]);

    const horarios = await pool.query(`
      SELECT g.idGrupo, h.dia_semana, h.hora, h.aula
      FROM dbo_horario h
      INNER JOIN dbo_grupo g ON h.idGrupo = g.idGrupo
      WHERE g.idDocente = ?
    `, [idDocente]);

    res.json({ grupos, estudiantes, horarios });
  } catch (err) {
    console.error('Error al obtener resumen del docente:', err);
    res.status(500).json({ error: 'Error al consultar resumen', detalle: err.message });
  }
};

exports.getDocentebyID = async (req, res) => {
  const idDocente = req.params.id;
  try {
    const rows = await pool.query(`
      SELECT d.idDocente, u.usuario, u.correo_electronico
      FROM dbo_docente d
      INNER JOIN dbo_usuario u ON d.idUsuario = u.idUsuario
      WHERE d.idDocente = ?
    `, [idDocente]);
    res.json({ docentes: rows });

  if (rows.length === 0) {
      return res.status(404).json({ error: 'Maestro no encontrado' });
    }

    res.json({ docentes: rows[0] });
  } catch (err) {
    console.error('Error al obtener Maestro:', err);
    res.status(500).json({ error: 'Error al consultar Maestro', detalle: err.message });
  }
};