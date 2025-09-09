const pool = require('../db/pool');

exports.getUsuario = async (req, res) => {
  const idUsuario = req.params.id;
  try {
    if (!idUsuario || isNaN(Number(idUsuario)) || Number(idUsuario) <= 0) {
      return res.status(400).json({ error: 'ID de usuario inválido' });
    }
    const conn = await pool.query('SELECT * FROM dbo_usuario WHERE idUsuario = ?', [Number(idUsuario)]);
    if (conn[0].length === 0) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    return res.json(conn[0]);
  } catch (error) {
    console.error('Error al obtener usuario:', error);
    return res.status(500).json({ error: 'Error al obtener usuario' });
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
    res.json({ mensaje: 'Usuario y persona creados correctamente', idPersona: Number(idPersona) });
  } catch (err) {
    console.error('Error al insertar datos:', err);
    res.status(500).json({ error: 'Error al insertar usuario' });
  } finally {
    if (conn) conn.release();
  }
};

exports.updateUsuario = async (req, res) => {
  const { id } = req.params;
  const { usuario, contrasena, correo_electronico } = req.body;

  if (!usuario && !contrasena && !correo_electronico) {
    return res.status(400).json({ error: 'Al menos uno de los campos debe tener información' });
  }
  let conn;
  try {
    conn = await pool.getConnection();

    const campos = [];
    const valores = [];

    if (usuario) {
      campos.push('usuario = ?');
      valores.push(usuario);
    }

  if (contrasena) {
      campos.push('contrasena = ?');
      valores.push(contrasena);
    }
    if (correo_electronico) {
      campos.push('correo_electronico = ?');
      valores.push(correo_electronico);
    }
    valores.push(id);

    const query = `UPDATE dbo_usuario SET ${campos.join(', ')} WHERE idUsuario = ?`;
    const result = await conn.query(query, valores);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    res.status(200).json({ message: 'Usuario actualizado correctamente' });

  } catch (error) {
    console.error('Error al actualizar usuario:', error);
    res.status(500).json({ error: 'Error interno del servidor' });

  } finally {
    if (conn) conn.release();
  }
};

exports.deleteUsuario = async (req, res) => {
  const idUsuario = req.params.id;
  try {
    if (!idUsuario || isNaN(Number(idUsuario)) || Number(idUsuario) <= 0) {
      return res.status(400).json({ error: 'ID de usuario inválido' });
    }
    const conn = await pool.query('DELETE FROM dbo_usuario WHERE idUsuario = ?', [Number(idUsuario)]);
    if (conn[0].length === 0) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    return res.json({ mensaje: 'Usuario eliminado correctamente' });
  } catch (error) {
    console.error('Error al obtener usuario:', error);
    return res.status(500).json({ error: 'Error al obtener usuario' });
  } 
};