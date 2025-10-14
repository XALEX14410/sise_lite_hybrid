const pool = require('../db/pool');

const getAll = async () => {
  const rows = await pool.query(`SELECT a.idAlumno, p.nombre, p.apellido_paterno, p.apellido_materno, u.usuario, u.correo_electronico, 
             DATE_FORMAT(p.fecha_de_nacimiento, '%Y-%m-%d') AS fechaNacimiento,
             p.sexo, p.curp, m.municipio, e.estado
      FROM dbo_alumno a
      INNER JOIN dbo_usuario u ON a.idUsuario = u.idUsuario
      INNER JOIN dbo_persona p ON u.idPersona = p.idPersona
      INNER JOIN dbo_estados e ON p.idEstado = e.idEstado
      INNER JOIN dbo_municipios m ON p.idMunicipio = m.idMunicipio`);
  return rows;
};

const getById = async (id) => {
  const rows = await pool.query(
    `SELECT a.idAlumno, p.nombre, p.apellido_paterno, p.apellido_materno, u.usuario, u.correo_electronico, 
             DATE_FORMAT(p.fecha_de_nacimiento, '%Y-%m-%d') AS fechaNacimiento,
             p.sexo, p.curp, m.municipio, e.estado
      FROM dbo_alumno a
      INNER JOIN dbo_usuario u ON a.idUsuario = u.idUsuario
      INNER JOIN dbo_persona p ON u.idPersona = p.idPersona
      INNER JOIN dbo_estados e ON p.idEstado = e.idEstado
      INNER JOIN dbo_municipios m ON p.idMunicipio = m.idMunicipio
      WHERE a.idAlumno = ?`,
    [id]
  );
  return rows[0]; 
};

const create = async ({
  nombre, apellido_paterno, apellido_materno, fecha_de_nacimiento,
  sexo, curp, idEstado, idMunicipio,
  usuario, contrasena, correo_electronico, matricula, semestre_actual, idCarrera
}) => {
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
    const idPersona = Number(personaResult.insertId);

    const usuarioResult = await conn.query(
      `INSERT INTO dbo_usuario (idPersona, usuario, contrasena, correo_electronico)
       VALUES (?, ?, ?, ?)`,
      [idPersona, usuario, contrasena, correo_electronico]
    );
    const idUsuario = Number(usuarioResult.insertId);

    await conn.query(
      `INSERT INTO dbo_alumno (idUsuario, idCarrera, matricula, semestre_actual)
       VALUES (?, ?, ?, ?)`,
      [idUsuario, idCarrera, matricula, semestre_actual]
    );

    await conn.query(
      `INSERT INTO dbo_usuario_perfil (idUsuario, idPerfil)
       VALUES (?, ?)`,
      [idUsuario, idPerfil]
    );

    await conn.commit();

    return { idPersona, idUsuario, perfil: 'Alumno' };

  } catch (err) {
    if (conn) await conn.rollback();
    throw err; 
  } finally {
    if (conn) conn.release();
  }
};

const update = async (idAlumno, {
  nombre, apellido_paterno, apellido_materno, fecha_de_nacimiento,
  sexo, curp, idEstado, idMunicipio, usuario, contrasena, correo_electronico,
  matricula, semestre_actual, idCarrera
}) => {
  let conn;
  try {
    conn = await pool.getConnection();
    await conn.beginTransaction();

    const [alumnoRows] = await conn.query(
      `SELECT a.idUsuario, u.idPersona 
       FROM dbo_alumno a 
       JOIN dbo_usuario u ON a.idUsuario = u.idUsuario
       WHERE a.idAlumno = ?`,
      [idAlumno]
    );

    if (alumnoRows.length === 0) {
      throw new Error('Alumno no encontrado');
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
    return true; 
  } catch (err) {
    if (conn) await conn.rollback();
    throw err;
  } finally {
    if (conn) conn.release();
  }
};

const remove = async (idAlumno) => {
  let conn;
  try {
    conn = await pool.getConnection();
    await conn.beginTransaction();

    const [alumnoRows] = await conn.query(
      `SELECT idUsuario FROM dbo_alumno WHERE idAlumno = ?`,
      [idAlumno]
    );

    if (alumnoRows.length === 0) {
      throw new Error('Alumno no encontrado');
    }

    const idUsuario = alumnoRows[0].idUsuario;

    const [usuarioRows] = await conn.query(
      `SELECT idPersona FROM dbo_usuario WHERE idUsuario = ?`,
      [idUsuario]
    );

    if (usuarioRows.length === 0) {
      throw new Error('Usuario del alumno no encontrado');
    }

    const idPersona = usuarioRows[0].idPersona;

    await conn.query(`DELETE FROM dbo_usuario_perfil WHERE idUsuario = ?`, [idUsuario]);
    await conn.query(`DELETE FROM dbo_alumno WHERE idAlumno = ?`, [idAlumno]);
    await conn.query(`DELETE FROM dbo_usuario WHERE idUsuario = ?`, [idUsuario]);
    await conn.query(`DELETE FROM dbo_persona WHERE idPersona = ?`, [idPersona]);

    await conn.commit();
    return true; 
  } catch (err) {
    if (conn) await conn.rollback();
    throw err;
  } finally {
    if (conn) conn.release();
  }
};

module.exports = { getAll, getById, create, update, remove };