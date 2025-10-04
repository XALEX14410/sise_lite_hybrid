const pool = require('../db/pool');

//Ya tiene validaciones /authvalidator
exports.login = async (req, res) => {
  const { usuario, contrasena } = req.body;

  try {
    const rows = await pool.query(
      `SELECT u.idUsuario, u.usuario, u.contrasena, lp.nombre AS perfil
       FROM dbo_usuario u
       LEFT JOIN dbo_usuario_perfil up ON u.idUsuario = up.idUsuario
       LEFT JOIN dbo_login_perfil lp ON up.idPerfil = lp.idPerfil
       WHERE u.usuario = ? AND u.contrasena = ?`,
      [usuario, contrasena]
    );

    const user = rows[0]; 
    if (!user) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    let idEntidad = null;

    if (user.perfil === 'docente') {
      const docenteRows = await pool.query('SELECT idDocente FROM dbo_docente WHERE idUsuario = ?', [user.idUsuario]);
      idEntidad = docenteRows[0]?.idDocente;
    } else if (user.perfil === 'alumno') {
      const alumnoRows = await pool.query('SELECT idAlumno FROM dbo_alumno WHERE idUsuario = ?', [user.idUsuario]);
      idEntidad = alumnoRows[0]?.idAlumno;
    }

    req.session.usuario = {
      idUsuario: user.idUsuario,
      idEntidad,
      idUsuario: user.idUsuario,
      idEntidad,
      usuario: user.usuario,
      perfil: user.perfil
    };

    res.json({
      mensaje: 'Login exitoso',
      usuario: {
        id: user.idUsuario,
        usuario: user.usuario,
        perfil: user.perfil || 'Sin perfil asignado'
      }
    });
  } catch (err) {
    console.error('Error en login:', err);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

exports.logout = (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.status(500).json({ error: 'Error al cerrar sesión' });
    }
    res.clearCookie('connect.sid');
    res.clearCookie('connect.sid');
    res.json({ mensaje: 'Sesión cerrada correctamente' });
  });
};

exports.getRoles = async (req, res) => {
  try {
    const rows = await pool.query('SELECT nombre FROM dbo_login_perfil');
    const roles = rows.map(r => r.nombre);
    res.json({ roles });
  } catch (err) {
    console.error('Error al obtener roles:', err);
    res.status(500).json({ error: 'Error al consultar roles', detalle: err.message });
  }
};

exports.getDatosPersonales = async (req, res) => {
  try {
    const usuarioSesion = req.session.usuario;

    if (!usuarioSesion) {
      return res.status(401).json({ error: 'No hay sesión activa' });
    }
    const datos = await pool.query(
      `SELECT u.idUsuario, p.nombre, p.apellido_paterno, p.apellido_materno, u.usuario, u.correo_electronico, 
       DATE_FORMAT(p.fecha_de_nacimiento, '%Y-%m-%d') AS fechaNacimiento,
       p.sexo, p.curp, m.municipio, e.estado
       FROM dbo_usuario u
       INNER JOIN dbo_persona p ON u.idPersona = p.idPersona
       INNER JOIN dbo_estados e ON p.idEstado = e.idEstado
       INNER JOIN dbo_municipios m ON p.idMunicipio = m.idMunicipio
       WHERE u.idUsuario = ?`,
      [usuarioSesion.idUsuario]
    );

    if (datos.length === 0) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    const perfil = datos[0];
    const nombreCompleto = [perfil.nombre, perfil.apellido_paterno, perfil.apellido_materno]
    .filter(Boolean)
    .join(' ');

    // Verificar si los valores son de tipo correcto
    if (!perfil || typeof perfil.idUsuario !== 'number') {
      return res.status(500).json({ error: 'Error al obtener el perfil' });
    }

    return res.json({
      mensaje: 'Sesión activa',
      Datos_Personales: {
        nombre: nombreCompleto,
        usuario: perfil.usuario,
        correo: perfil.correo_electronico,
        fechaNacimiento: perfil.fechaNacimiento,
        sexo: perfil.sexo,
        curp: perfil.curp,
        estado: perfil.estado,
        municipio: perfil.municipio
      }
    });
  } catch (err) {
    console.error('Error al mostrar datos del usuario');
    res.status(500).json({error: 'Error al consultar datos del usuario', detalle: err.message })
  }
};