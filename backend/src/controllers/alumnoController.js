const Alumno = require('../models/alumnoModel');

<<<<<<< HEAD
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

exports.createAlumno = async (req, res) => {
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
=======
exports.obtenerAlumnos = async (req, res) => {
  try {
    const alumnos = await Alumno.getAll();
>>>>>>> backend
    res.json({ alumnos });
  } catch (err) {
    console.error('Error al obtener alumnos:', err);
    res.status(500).json({ error: 'Error al consultar alumnos', detalle: err.message });
  }
};

<<<<<<< HEAD
exports.updateAlumno = async (req, res) => {
  const { id } = req.params; 
  const {
    nombre,
    apellido_paterno,
    apellido_materno,
    fecha_de_nacimiento,
    sexo,
    curp,
    idEstado,
    idMunicipio,
    usuario,
    contrasena,
    correo_electronico,
    matricula,
    semestre_actual,
    idCarrera
  } = req.body;

  let conn;
  try {
    conn = await pool.getConnection();
    await conn.beginTransaction();

    const alumnoRows = await conn.query(
      `SELECT a.idUsuario, u.idPersona 
       FROM dbo_alumno a 
       JOIN dbo_usuario u ON a.idUsuario = u.idUsuario
       WHERE a.idAlumno = ?`,
      [id]
    );

    if (alumnoRows.length === 0) {
      return res.status(404).json({ error: 'Alumno no encontrado' });
    }

    const { idUsuario, idPersona } = alumnoRows[0];

    await conn.query(
      `UPDATE dbo_persona
       SET nombre = ?, apellido_paterno = ?, apellido_materno = ?, fecha_de_nacimiento = ?,
           sexo = ?, curp = ?, idEstado = ?, idMunicipio = ?
       WHERE idPersona = ?`,
      [nombre, apellido_paterno, apellido_materno, fecha_de_nacimiento, sexo, curp, idEstado, idMunicipio, idPersona]
    );

    await conn.query(
      `UPDATE dbo_usuario
       SET usuario = ?, contrasena = ?, correo_electronico = ?
       WHERE idUsuario = ?`,
      [usuario, contrasena, correo_electronico, idUsuario]
    );

    await conn.query(
      `UPDATE dbo_alumno
       SET idCarrera = ?, matricula = ?, semestre_actual = ?
       WHERE idUsuario = ?`,
      [idCarrera, matricula, semestre_actual, idUsuario]
    );

    await conn.commit();

    res.json({ mensaje: 'Alumno actualizado correctamente' });

  } catch (err) {
    if (conn) await conn.rollback();
    console.error('Error al actualizar alumno:', err);
    res.status(500).json({ error: 'Error al actualizar alumno', detalle: err.message });
  } finally {
    if (conn) conn.release();
  }
};


exports.deleteAlumno = async (req, res) => {
  const { id } = req.params; 

  let conn;
  try {
    conn = await pool.getConnection();
    await conn.beginTransaction();

    const alumnoRows = await conn.query(
      `SELECT idUsuario FROM dbo_alumno WHERE idAlumno = ?`,
      [id]
    );

    if (alumnoRows.length === 0) {
      return res.status(404).json({ error: 'Alumno no encontrado' });
    }

    const idUsuario = alumnoRows[0].idUsuario;

    const usuarioRows = await conn.query(
      `SELECT idPersona FROM dbo_usuario WHERE idUsuario = ?`,
      [idUsuario]
    );

    if (usuarioRows.length === 0) {
      return res.status(404).json({ error: 'Usuario del alumno no encontrado' });
    }

    const idPersona = usuarioRows[0].idPersona;

    await conn.query(
      `DELETE FROM dbo_usuario_perfil WHERE idUsuario = ?`,
      [idUsuario]
    );

    await conn.query(
      `DELETE FROM dbo_alumno WHERE idAlumno = ?`,
      [id]
    );

    await conn.query(
      `DELETE FROM dbo_usuario WHERE idUsuario = ?`,
      [idUsuario]
    );

    await conn.query(
      `DELETE FROM dbo_persona WHERE idPersona = ?`,
      [idPersona]
    );

    await conn.commit();
    res.json({ mensaje: 'Alumno eliminado correctamente' });

  } catch (err) {
    if (conn) await conn.rollback();
    console.error('Error al eliminar alumno:', err);
    res.status(500).json({ error: 'Error al eliminar alumno', detalle: err.message });
  } finally {
    if (conn) conn.release();
=======
exports.obtenerAlumnoPorId = async (req, res) => {
  const id = req.params.id;
  try {
    const alumno = await Alumno.getById(id);
    if (!alumno) {
      return res.status(404).json({ error: 'Alumno no encontrado' });
    }
    res.json({ alumno });
  } catch (err) {
    console.error('Error al obtener alumno:', err);
    res.status(500).json({ error: 'Error al consultar alumno', detalle: err.message });
  }
};

exports.registrarAlumno = async (req, res) => {
  try {
    const resultado = await Alumno.create(req.body);
    res.status(201).json({ mensaje: 'Alumno creado correctamente', ...resultado });
  } catch (err) {
    console.error('Error al crear alumno:', err);
    res.status(500).json({ error: 'Error al crear alumno', detalle: err.message });
  }
};

exports.actualizarAlumno = async (req, res) => {
  const id = req.params.id;
  try {
    await Alumno.update(id, req.body);
    res.json({ mensaje: 'Alumno actualizado correctamente' });
  } catch (err) {
    if (err.message.includes('no encontrado')) {
      return res.status(404).json({ error: err.message });
    }
    console.error('Error al actualizar alumno:', err);
    res.status(500).json({ error: 'Error al actualizar alumno', detalle: err.message });
  }
};

exports.eliminarAlumno = async (req, res) => {
  const id = req.params.id;
  try {
    await Alumno.remove(id);
    res.json({ mensaje: 'Alumno eliminado correctamente' });
  } catch (err) {
    if (err.message.includes('no encontrado')) {
      return res.status(404).json({ error: err.message });
    }
    console.error('Error al eliminar alumno:', err);
    res.status(500).json({ error: 'Error al eliminar alumno', detalle: err.message });
  }
};

exports.obtenerCalificacionesPorAlumno = async (req, res) => {
  const { id } = req.params;

  try {
    const calificaciones = await Alumno.getCalificaciones(id);

    if (calificaciones.length === 0) {
      return res.status(404).json({ mensaje: 'No hay calificaciones disponibles' });
    }

    res.json({ calificaciones });
  } catch (error) {
    console.error('Error al obtener calificaciones del alumno:', error);
    res.status(500).json({
      mensaje: 'Error al obtener calificaciones del alumno',
      detalle: error.message,
    });
>>>>>>> backend
  }
};
