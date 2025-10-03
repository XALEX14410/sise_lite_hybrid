const pool = require('../db/pool');

exports.getUsuariobyID = async (req, res) => {
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

exports.getAllUsuarios = async (req, res) => {
  try {
    const usuarios = await pool.query(`
      SELECT * from dbo_usuario
    `);
    res.json({usuarios});
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
    return res.status(500).json({error: 'Error al obtener usuarios'});
  }
}

exports.createUsuario = async (req, res) => {
  const {
    nombre, apellido_paterno, apellido_materno, fecha_de_nacimiento,
    sexo, curp, idEstado, idMunicipio,
    usuario, contrasena, correo_electronico, idPerfil,
    idCarrera, matricula, semestre_actual
    } = req.body;

  let conn;
  try {
    conn = await pool.getConnection();
    await conn.beginTransaction();

    // Insertar en dbo_persona
    const personaResult = await conn.query(
      `INSERT INTO dbo_persona (nombre, apellido_paterno, apellido_materno, fecha_de_nacimiento, sexo, curp, idEstado, idMunicipio)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [nombre, apellido_paterno, apellido_materno, fecha_de_nacimiento, sexo, curp, idEstado, idMunicipio]
    );
    const idPersona = personaResult.insertId;

    // Insertar en dbo_usuario
    const usuarioResult = await conn.query(
      `INSERT INTO dbo_usuario (idPersona, usuario, contrasena, correo_electronico)
       VALUES (?, ?, ?, ?)`,
      [idPersona, usuario, contrasena, correo_electronico]
    );
    const idUsuario = usuarioResult.insertId;

    // Insertar en dbo_usuario_perfil
    await conn.query(
      `INSERT INTO dbo_usuario_perfil (idUsuario, idPerfil)
       VALUES (?, ?)`,
      [idUsuario, idPerfil]
    );

    // Obtener nombre del perfil
    const perfilResult = await conn.query(
      `SELECT nombre FROM dbo_login_perfil WHERE idPerfil = ?`,
      [idPerfil]
    );
    const nombrePerfil = perfilResult[0]?.nombre;

    // Insertar en dbo_docente si el perfil es Docente
    if (nombrePerfil === 'docente') {
      await conn.query(
        `INSERT INTO dbo_docente (idUsuario)
         VALUES (?)`,
        [idUsuario]
      );
    }

    // Insertar en dbo_alumno si el perfil es Estudiante
    if (nombrePerfil === 'alumno') {
      await conn.query(
        `INSERT INTO dbo_alumno (idUsuario, idCarrera, matricula, semestre_actual)
        VALUES (?, ?, ?, ?)`,
        [idUsuario, idCarrera, matricula, semestre_actual]
      );
    }

    await conn.commit();
    res.json({
      mensaje: 'Usuario creado correctamente',
      idPersona: Number(idPersona),
      idUsuario: Number(idUsuario),
      perfil: nombrePerfil
    });

  } catch (err) {
    if (conn) await conn.rollback();
    console.error('Error al insertar usuario:', err);
    res.status(500).json({ error: 'Error al insertar usuario', detalle: err.message });
  } finally {
    if (conn) conn.release();
  }
};

exports.updateUsuario = async (req, res) => {
  const { id } = req.params;
  const { correo_electronico } = req.body;

  if (!correo_electronico) {
    return res.status(400).json({ error: 'Falta información' });
  }
  let conn;
  try {
    conn = await pool.getConnection();

    const campos = [];
    const valores = [];

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