const pool = require('../db/pool');

exports.getUsario = async (req, res) => {
  let conn;
  try {
    conn = await pool.getConnection();
    const rows = await conn.query(`SELECT * FROM dbo_usuario`);
    res.json(rows);
  } catch (err) {
    console.error('Error al obtener estados:', err);
    res.status(500).json({ error: 'Error al obtener estados' });
  } finally {
    if (conn) conn.release();
  }
};

exports.createUsuario = async (req, res) => {
  console.log('Datos recibidos:', req.body);
  const { nombre, apellido_paterno, apellido_materno, fecha_de_nacimiento, sexo, curp, idEstado, idMunicipio, usuario, contrasena, correo_electronico } = req.body;
  if (!nombre || !apellido_paterno || !apellido_materno || !fecha_de_nacimiento || !sexo || !curp || !idEstado || !idMunicipio || !usuario || !contrasena || !correo_electronico) {
    return res.status(400).json({ error: 'Faltan datos' });
  }

  let conn;
  try {
    conn = await pool.getConnection();
    await conn.beginTransaction();

    const result = await conn.query(
      `INSERT INTO dbo_persona (nombre, apellido_paterno, apellido_materno, fecha_de_nacimiento, sexo, curp, idEstado, idMunicipio) VALUES (?,?,?,?,?,?,?,?)`,
      [nombre, apellido_paterno, apellido_materno, fecha_de_nacimiento, sexo, curp, idEstado, idMunicipio]
    );
    const idPersona = result.insertId;
    await conn.query(
      'INSERT INTO dbo_usuario (idPersona, usuario, contrasena, correo_electronico) VALUES (?, ?, ?, ?)',
      [idPersona, usuario, contrasena, correo_electronico]
    );
    await conn.commit();
    res.json({ mensaje: 'Usuario y persona creados correctamente', idPersona });
  } catch (err) {
    console.error('Error al insertar datos:', err);
    res.status(500).json({ error: 'Error al insertar usuario' });
  } finally {
    if (conn) conn.release();
  }
};

exports.updateEstados = async (req, res) => {
  const { id } = req.params;
  const { nombre_estado } = req.body;

  if (!nombre_estado) {
    return res.status(400).json({ error: 'Falta nombre_estado' });
  }

  let conn;
  try {
    conn = await pool.getConnection();
    const result = await conn.query(
      `UPDATE dbo_estado SET nombre_estado = ? WHERE idEstado = ?`,
      [nombre_estado, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Estado no encontrado' });
    }

    res.json({ idEstado: Number(id), nombre_estado });
  } catch (err) {
    console.error('Error al actualizar estado:', err);
    res.status(500).json({ error: 'Error al actualizar estado' });
  } finally {
    if (conn) conn.release();
  }
};