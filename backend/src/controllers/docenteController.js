const pool = require('../db/pool');

const Docente = require('../models/docenteModel');

exports.obtenerDocentes = async (req, res) => {
  try {
<<<<<<< HEAD
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
=======
    const docentes = await Docente.getAll();
    res.json({ docentes });
>>>>>>> backend
  } catch (err) {
    console.error('Error al obtener docentes:', err);
    res.status(500).json({ error: 'Error al consultar docentes', detalle: err.message });
  }
};

<<<<<<< HEAD
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

    res.json({ docente: rows[0] });
  } catch (err) {
    console.error('Error al obtener docente:', err);
    res.status(500).json({ error: 'Error al consultar docente', detalle: err.message });
  }
};

exports.createDocente = async (req, res) => {
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

exports.updateDocente = async (req, res) => {
  const  idDocente  = req.params.id;
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
    correo_electronico
  } = req.body;

  let conn;
  try {
    conn = await pool.getConnection();
    await conn.beginTransaction();

    // 1️⃣ Obtener el idUsuario asociado al docente
    const docenteRows = await conn.query(
      `SELECT idUsuario FROM dbo_docente WHERE idDocente = ?`,
      [idDocente]
    );

    if (docenteRows.length === 0) {
      return res.status(404).json({ error: 'Docente no encontrado' });
    }

    const idUsuario = docenteRows[0].idUsuario;

    // 2️⃣ Obtener el idPersona asociado a ese usuario
    const usuarioRows = await conn.query(
      `SELECT idPersona FROM dbo_usuario WHERE idUsuario = ?`,
      [idUsuario]
    );

    if (usuarioRows.length === 0) {
      return res.status(404).json({ error: 'Usuario del docente no encontrado' });
    }

    const idPersona = usuarioRows[0].idPersona;

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

    await conn.commit();
    res.json({ mensaje: 'Docente actualizado correctamente' });

  } catch (err) {
    if (conn) await conn.rollback();
    console.error('Error al actualizar docente:', err);
    res.status(500).json({ error: 'Error al actualizar docente', detalle: err.message });
  } finally {
    if (conn) conn.release();
  }
};


exports.deleteDocente = async (req, res) => {
  const { id } = req.params; // idDocente

  let conn;
  try {
    conn = await pool.getConnection();
    await conn.beginTransaction();

    // 1️⃣ Obtener el idUsuario asociado al docente
    const docenteRows = await conn.query(
      `SELECT idUsuario FROM dbo_docente WHERE idDocente = ?`,
      [id]
    );

    if (docenteRows.length === 0) {
      return res.status(404).json({ error: 'Docente no encontrado' });
    }

    const idUsuario = docenteRows[0].idUsuario;

    // 2️⃣ Obtener el idPersona asociado al usuario
    const usuarioRows = await conn.query(
      `SELECT idPersona FROM dbo_usuario WHERE idUsuario = ?`,
      [idUsuario]
    );

    if (usuarioRows.length === 0) {
      return res.status(404).json({ error: 'Usuario del docente no encontrado' });
    }

    const idPersona = usuarioRows[0].idPersona;

    await conn.query(
      `DELETE FROM dbo_usuario_perfil WHERE idUsuario = ?`,
      [idUsuario]
    );

    await conn.query(
      `DELETE FROM dbo_docente WHERE idDocente = ?`,
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
    res.json({ mensaje: 'Docente eliminado correctamente' });

  } catch (err) {
    if (conn) await conn.rollback();
    console.error('Error al eliminar docente:', err);
    res.status(500).json({ error: 'Error al eliminar docente', detalle: err.message });
  } finally {
    if (conn) conn.release();
  }
};
=======
exports.obtenerDocentePorId = async (req, res) => {
  const id = req.params.id;
  try {
    const docente = await Docente.getById(id);
    if (!docente) return res.status(404).json({ error: 'Docente no encontrado' });
    res.json({ docente });
  } catch (err) {
    console.error('Error al obtener docente:', err);
    res.status(500).json({ error: 'Error al consultar docente', detalle: err.message });
  }
};

exports.registrarDocente = async (req, res) => {
  const {
    nombre, apellido_paterno, apellido_materno, fecha_de_nacimiento,
    sexo, curp, idEstado, idMunicipio,
    usuario, contrasena, correo_electronico
  } = req.body;

  try {
    const result = await Docente.create({
      nombre, apellido_paterno, apellido_materno, fecha_de_nacimiento,
      sexo, curp, idEstado, idMunicipio,
      usuario, contrasena, correo_electronico
    });
    res.status(201).json({ mensaje: 'Docente creado correctamente', docente: result });
  } catch (err) {
    console.error('Error al crear docente:', err);
    res.status(500).json({ error: 'Error al insertar docente', detalle: err.message });
  }
};

exports.actualizarDocente = async (req, res) => {
  const id = req.params.id;
  try {
    const updated = await Docente.update(id, req.body);
    if (!updated) return res.status(404).json({ error: 'Docente no encontrado' });
    res.json({ mensaje: 'Docente actualizado correctamente' });
  } catch (err) {
    console.error('Error al actualizar docente:', err);
    res.status(500).json({ error: 'Error al actualizar docente', detalle: err.message });
  }
};

exports.eliminarDocente = async (req, res) => {
  const id = req.params.id;
  try {
    const deleted = await Docente.remove(id);
    if (!deleted) return res.status(404).json({ error: 'Docente no encontrado' });
    res.json({ mensaje: 'Docente eliminado correctamente' });
  } catch (err) {
    console.error('Error al eliminar docente:', err);
    res.status(500).json({ error: 'Error al eliminar docente', detalle: err.message });
  }
};

exports.obtenerGruposDocente = async (req, res) => {
  const { id } = req.params;

  try {
    const grupos = await Docente.getGruposByDocente(id);

    if (grupos.length === 0) {
      return res.status(404).json({ mensaje: 'No hay grupos disponibles' });
    }

    res.json({ grupos });
  } catch (err) {
    console.error('Error al obtener grupos del docente:', err);
    res.status(500).json({
      mensaje: 'Error al obtener grupos del docente',
      detalle: err.message,
    });
  }
};
>>>>>>> backend
