const pool = require('../db/pool');

exports.getGruposDelAlumno = async (req, res) => {
  const idAlumno = req.params.id;
  try {
    const grupos = await pool.query(`
      SELECT 
        g.clave_grupo AS nombre_grupo,
        m.nombre_materia,
        d.idDocente,
        CONCAT(p.nombre, ' ', p.apellido_paterno, ' ', p.apellido_materno) AS nombre_docente
      FROM dbo_inscripciones i
      INNER JOIN dbo_grupo g ON i.idGrupo = g.idGrupo
      INNER JOIN dbo_materias m ON g.idMateria = m.idMateria
      INNER JOIN dbo_docente d ON g.idDocente = d.idDocente
      INNER JOIN dbo_persona p ON d.idUsuario = p.idPersona
      WHERE i.idAlumno = ?
    `, [idAlumno]);
    res.json({ grupos });
  } catch (err) {
    console.error('Error al obtener grupos del alumno:', err);
    res.status(500).json({ error: 'Error al consultar grupos', detalle: err.message });
  }
};

//MOSTRAR UN ALUMNO ESPECIFICO POR ID (SUPERADMIN)
exports.getAlumnoByID = async (req, res) => {
  const idAlumno = req.params.id; 
  try {
    const rows = await pool.query(`
      SELECT a.idAlumno, p.nombre, p.apellido_paterno, p.apellido_materno, u.usuario, u.correo_electronico, 
             DATE_FORMAT(p.fecha_de_nacimiento, '%Y-%m-%d') AS fechaNacimiento,
             p.sexo, p.curp, m.municipio, e.estado
      FROM dbo_alumno a
      INNER JOIN dbo_usuario u ON a.idUsuario = u.idUsuario
      INNER JOIN dbo_persona p ON u.idPersona = p.idPersona
      INNER JOIN dbo_estados e ON p.idEstado = e.idEstado
      INNER JOIN dbo_municipios m ON p.idMunicipio = m.idMunicipio
      WHERE a.idAlumno = ?
    `, [idAlumno]);

    if (rows.length === 0) {
      return res.status(404).json({ error: 'Alumno no encontrado' });
    }

    res.json({ alumno: rows[0] });
  } catch (err) {
    console.error('Error al obtener alumno:', err);
    res.status(500).json({ error: 'Error al consultar alumno', detalle: err.message });
  }
};

exports.crearAlumno = async (req, res) => {
  const {
    nombre, apellido_paterno, apellido_materno, fecha_de_nacimiento,
    sexo, curp, idEstado, idMunicipio,
    usuario, contrasena, correo_electronico, matricula, semestre_actual, idCarrera
  } = req.body;

  const idPerfil = 4; 

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
      `INSERT INTO dbo_alumno (idUsuario, idCarrera, matricula, semestre_actual)
       VALUES (?, ?, ?, ?)`,
      [idUsuario, idCarrera, matricula, semestre_actual]
    );

    // 4. Insertar en dbo_usuario_perfil
    await conn.query(
      `INSERT INTO dbo_usuario_perfil (idUsuario, idPerfil)
       VALUES (?, ?)`,
      [idUsuario, idPerfil]
    );

    await conn.commit();
    res.json({
      mensaje: 'Alumno creado correctamente',
      idPersona: Number(idPersona),
      idUsuario: Number(idUsuario),
      perfil: 'Alumno'
    });

  } catch (err) {
    if (conn) await conn.rollback();
    console.error('Error al insertar alumno:', err);
    res.status(500).json({ error: 'Error al insertar alumno', detalle: err.message });
  } finally {
    if (conn) conn.release();
  }
};


exports.getHorarioPorEstudiante = async (req, res) => {
  const idAlumno = req.params.id;

  try {
    const rows = await pool.query(
      `SELECT h.*
       FROM dbo_horario h
       JOIN dbo_grupo g ON h.idGrupo = g.idGrupo
       JOIN dbo_inscripciones i ON g.idGrupo = i.idGrupo
       WHERE i.idAlumno = ?
      `,
      [idAlumno]
    );

    res.json({ horario: rows });
  } catch (error) {
    console.error('Error al obtener horario del alumno:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

exports.getMateriaPorEstudiante = async (req, res) => {
  const idAlumno = req.params.id;

  try {
    const rows = await pool.query(
      `SELECT m.*
       FROM dbo_materias m
       JOIN dbo_carrera c ON m.idCarrera = c.idCarrera
       JOIN dbo_alumno a ON c.idCarrera = a.idCarrera
       WHERE a.idAlumno = ?
      `,
      [idAlumno]
    );

    res.json({ materia: rows });
  } catch (error) {
    console.error('Error al obtener materias del alumno:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

//MOSTRAR TODOS LOS ALUMNOS QUE HAY EN EL SISTEMA (ADMIN/SUPERADMIN)

exports.getAllAlumnos = async (req, res) => {
  try {
    const alumnos = await pool.query(`
      SELECT a.idAlumno, a.matricula, a.semestre_actual, p.nombre, p.apellido_paterno, p.apellido_materno, u.usuario, u.correo_electronico, 
       DATE_FORMAT(p.fecha_de_nacimiento, '%Y-%m-%d') AS fechaNacimiento,
       p.sexo, p.curp, m.municipio, e.estado
       FROM dbo_alumno a
       INNER JOIN dbo_usuario u ON a.idUsuario = u.idUsuario
       INNER JOIN dbo_persona p ON u.idPersona = p.idPersona
       INNER JOIN dbo_estados e ON p.idEstado = e.idEstado
       INNER JOIN dbo_municipios m ON p.idMunicipio = m.idMunicipio
    `);
    res.json({ alumnos });
  } catch (err) {
    console.error('Error al obtener alumnos:', err);
    res.status(500).json({ error: 'Error al consultar alumnos', detalle: err.message });
  }
};