const pool = require('../db/pool');

exports.getAllAdmin = async (req, res) => {
    try {
        const admin =await pool.query(`
        SELECT l.idPerfil, p.nombre, p.apellido_paterno, p.apellido_materno, u.usuario, u.correo_electronico, 
        DATE_FORMAT(p.fecha_de_nacimiento, '%Y-%m-%d') AS fechaNacimiento,
        p.sexo, p.curp, m.municipio, e.estado
        FROM dbo_usuario_perfil l
        INNER JOIN dbo_usuario u ON l.idUsuario = u.idUsuario
        INNER JOIN dbo_persona p ON u.idPersona = p.idPersona
        INNER JOIN dbo_estados e ON p.idEstado = e.idEstado
        INNER JOIN dbo_municipios m ON p.idMunicipio = m.idMunicipio
        WHERE idPerfil = 2    
        `);
        res.json({ admin });
    } catch(err){
        console.error('Error al obtener administradores:', err);
        res.status(500).json({ error: 'Error al consultar administradores', detalle: err.message });
    }
};

exports.getAdminByID = async (req, res) => {
  const idUsuario = req.params.id; 
  try {
    const rows = await pool.query(`
      SELECT l.idPerfil, p.nombre, p.apellido_paterno, p.apellido_materno, u.usuario, u.correo_electronico, 
             DATE_FORMAT(p.fecha_de_nacimiento, '%Y-%m-%d') AS fechaNacimiento,
             p.sexo, p.curp, m.municipio, e.estado
      FROM dbo_usuario_perfil l
      INNER JOIN dbo_usuario u ON l.idUsuario = u.idUsuario
      INNER JOIN dbo_persona p ON u.idPersona = p.idPersona
      INNER JOIN dbo_estados e ON p.idEstado = e.idEstado
      INNER JOIN dbo_municipios m ON p.idMunicipio = m.idMunicipio
      WHERE l.idPerfil = 2
      AND l.idUsuario = ?
    `, [idUsuario]);

    if (rows.length === 0) {
      return res.status(404).json({ error: 'Administrador no encontrado' });
    }

    res.json({ admin: rows[0] });
  } catch (err) {
    console.error('Error al obtener administrador:', err);
    res.status(500).json({ error: 'Error al consultar administrador', detalle: err.message });
  }
};

exports.crearAdmin = async (req, res) => {
  const {
    nombre, apellido_paterno, apellido_materno, fecha_de_nacimiento,
    sexo, curp, idEstado, idMunicipio,
    usuario, contrasena, correo_electronico
  } = req.body;

  const idPerfil = 2; 

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
      `INSERT INTO dbo_usuario_perfil (idUsuario, idPerfil)
       VALUES (?, ?)`,
      [idUsuario, idPerfil]
    );

    await conn.commit();
    res.json({
      mensaje: 'Administrador creado correctamente',
      idPersona: Number(idPersona),
      idUsuario: Number(idUsuario),
      perfil: 'Admin' 
    });

  } catch (err) {
    if (conn) await conn.rollback();
    console.error('Error al insertar admin:', err);
    res.status(500).json({ error: 'Error al insertar admin', detalle: err.message });
  } finally {
    if (conn) conn.release();
  }
};
