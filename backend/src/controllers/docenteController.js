const pool = require('../db/pool');

exports.getAllDocentes = async (req, res) => {
  try {
    const rows = await pool.query(`
      SELECT d.idDocente, p.nombre, p.apellido_paterno, p.apellido_materno, u.usuario, u.correo_electronico, 
       DATE_FORMAT(p.fecha_de_nacimiento, '%Y-%m-%d') AS fechaNacimiento,
       p.sexo, p.curp, m.municipio, e.estado
       FROM dbo_docente d
       INNER JOIN dbo_usuario u ON d.idUsuario = u.idUsuario
       INNER JOIN dbo_persona p ON u.idPersona = p.idPersona
       INNER JOIN dbo_estados e ON p.idEstado = e.idEstado
       INNER JOIN dbo_municipios m ON p.idMunicipio = m.idMunicipio
    `);
    res.json({ docentes: rows });
  } catch (err) {
    console.error('Error al obtener docentes:', err);
    res.status(500).json({ error: 'Error al consultar docentes', detalle: err.message });
  }
};

exports.getDocenteByID = async (req, res) => {
  const idDocente = req.params.id; 
  try {
    const rows = await pool.query(`
      SELECT d.idDocente, p.nombre, p.apellido_paterno, p.apellido_materno, u.usuario, u.correo_electronico, 
             DATE_FORMAT(p.fecha_de_nacimiento, '%Y-%m-%d') AS fechaNacimiento,
             p.sexo, p.curp, m.municipio, e.estado
      FROM dbo_docente d
      INNER JOIN dbo_usuario u ON d.idUsuario = u.idUsuario
      INNER JOIN dbo_persona p ON u.idPersona = p.idPersona
      INNER JOIN dbo_estados e ON p.idEstado = e.idEstado
      INNER JOIN dbo_municipios m ON p.idMunicipio = m.idMunicipio
      WHERE d.idDocente = ?
    `, [idDocente]);

    if (rows.length === 0) {
      return res.status(404).json({ error: 'Docente no encontrado' });
    }

    res.json({ alumno: rows[0] });
  } catch (err) {
    console.error('Error al obtener docente:', err);
    res.status(500).json({ error: 'Error al consultar docente', detalle: err.message });
  }
};

exports.crearDocente = async (req, res) => {
  const {
    nombre, apellido_paterno, apellido_materno, fecha_de_nacimiento,
    sexo, curp, idEstado, idMunicipio,
    usuario, contrasena, correo_electronico
  } = req.body;

  const idPerfil = 3; 

  let conn;
  try {
    conn = await pool.getConnection();
    await conn.beginTransaction();

    const personaResult = await conn.query(
      `INSERT INTO dbo_persona (nombre, apellido_paterno, apellido_materno, fecha_de_nacimiento, sexo, curp, idEstado, idMunicipio)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [nombre, apellido_paterno, apellido_materno, fecha_de_nacimiento, sexo, curp, idEstado, idMunicipio]
    );
    const idPersona = personaResult.insertId;

    const usuarioResult = await conn.query(
      `INSERT INTO dbo_usuario (idPersona, usuario, contrasena, correo_electronico)
       VALUES (?, ?, ?, ?)`,
      [idPersona, usuario, contrasena, correo_electronico]
    );
    const idUsuario = usuarioResult.insertId;

    await conn.query(
      `INSERT INTO dbo_docente (idUsuario)
       VALUES (?)`,
      [idUsuario]
    );

    await conn.query(
      `INSERT INTO dbo_usuario_perfil (idUsuario, idPerfil)
       VALUES (?, ?)`,
      [idUsuario, idPerfil]
    );

    await conn.commit();
    res.json({
      mensaje: 'Docente creado correctamente',
      idPersona: Number(idPersona),
      idUsuario: Number(idUsuario),
      perfil: 'Docente'
    });

  } catch (err) {
    if (conn) await conn.rollback();
    console.error('Error al insertar docente:', err);
    res.status(500).json({ error: 'Error al insertar docente', detalle: err.message });
  } finally {
    if (conn) conn.release();
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

exports.getHorarioPorDocente = async (req, res) => {
  const idDocente = req.params.id;

  try {
    const rows = await pool.query(
      `SELECT h.*
       FROM dbo_horario h
       JOIN dbo_grupo g ON h.idGrupo = g.idGrupo
       WHERE g.idDocente = ?`,
      [idDocente]
    );

    res.json({ horario: rows });
  } catch (error) {
    console.error('Error al obtener horario del docente:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};