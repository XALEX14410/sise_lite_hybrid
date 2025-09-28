const pool = require('../db/pool');

exports.login = async (req, res) => {
  const { usuario, contrasena } = req.body;

  console.log('Datos recibidos:', { usuario, contrasena });

  if (!usuario || !contrasena) {
    console.log('Faltan credenciales');
    return res.status(400).json({ error: 'Faltan credenciales' });
  }

  try {
    const rows = await pool.query(
      `SELECT u.idUsuario, u.usuario, u.contrasena, lp.nombre AS perfil
       FROM dbo_usuario u
       LEFT JOIN dbo_usuario_perfil up ON u.idUsuario = up.idUsuario
       LEFT JOIN dbo_login_perfil lp ON up.idPerfil = lp.idPerfil
       WHERE u.usuario = ? AND u.contrasena = ?`,
      [usuario, contrasena]
    );

    console.log('Resultado SQL:', rows);

    const user = rows[0]; 
    if (!user) {
      console.log('Credenciales inválidas');
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    let idEntidad = null;

    if (user.perfil === 'Docente') {
      const docenteRows = await pool.query('SELECT idDocente FROM dbo_docente WHERE idUsuario = ?', [user.idUsuario]);
      idEntidad = docenteRows[0]?.idDocente;
    } else if (user.perfil === 'Estudiante') {
      const alumnoRows = await pool.query('SELECT idAlumno FROM dbo_alumno WHERE idUsuario = ?', [user.idUsuario]);
      idEntidad = alumnoRows[0]?.idAlumno;
    }

    req.session.usuario = {
      idUsuario: user.idUsuario,
      idEntidad,
      usuario: user.usuario,
      perfil: user.perfil
    };

    console.log('Usuario autenticado:', user);

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
    res.json({ mensaje: 'Sesión cerrada correctamente' });
  });
};

exports.getPerfil = async (req, res) => {
  const usuarioSesion = req.session.usuario;

  if (!usuarioSesion) {
    return res.status(401).json({ error: 'No hay sesión activa' });
  }

  try {
    const resultados = await pool.query(
      `SELECT 
         u.idUsuario,
         u.usuario,
         p.nombre,
         p.apellido_paterno,
         p.apellido_materno
       FROM dbo_usuario u
       INNER JOIN dbo_persona p ON u.idPersona = p.idPersona
       WHERE u.idUsuario = ?`,
      [usuarioSesion.idUsuario]
    );

    if (resultados.length === 0) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    const perfil = resultados[0];

    res.json({
      mensaje: 'Sesión activa',
      usuario: {
        idUsuario: perfil.idUsuario,
        usuario: perfil.usuario,
        nombre: perfil.nombre,
        apellidoPaterno: perfil.apellido_paterno,
        apellidoMaterno: perfil.apellido_materno
      }
    });
  } catch (error) {
    console.error('Error en getPerfil:', error);
    res.status(500).json({ error: 'Error al obtener el perfil' });
  }
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