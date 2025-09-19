const pool = require('../db/pool');

exports.login = async (req, res) => {
  const { usuario, contrasena } = req.body;

  console.log('Datos recibidos:', { usuario, contrasena });

  if (!usuario || !contrasena) {
    console.log('Faltan credenciales');
    return res.status(400).json({ error: 'Faltan credenciales' });
  }

  try {
    const [rows] = await pool.query(
      `SELECT u.idUsuario, u.usuario, u.contrasena, lp.nombre AS perfil
       FROM dbo_usuario u
       LEFT JOIN dbo_usuario_perfil up ON u.idUsuario = up.idUsuario
       LEFT JOIN dbo_login_perfil lp ON up.idPerfil = lp.idPerfil
       WHERE u.usuario = ? AND u.contrasena = ?`,
      [usuario, contrasena]
    );

    console.log('Resultado SQL:', rows);

    const user = rows;

    if (!user) {
      console.log('Credenciales inválidas');
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    req.session.usuario = {
      id: user.idUsuario,
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
    res.clearCookie('connect.sid'); // nombre por defecto de la cookie
    res.json({ mensaje: 'Sesión cerrada correctamente' });
  });
};

exports.getPerfil = (req, res) => {
  const usuario = req.session.usuario;

  if (!usuario) {
    return res.status(401).json({ error: 'No hay sesión activa' });
  }

  res.json({
    mensaje: 'Sesión activa',
    usuario
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