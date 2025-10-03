const pool = require('../db/pool');

exports.obtenerInicio = async (req, res) => {
  const usuario = req.session.usuario;
  if (!usuario) return res.status(401).json({ mensaje: 'No autenticado' });
  try {
    const resultados = await pool.query(
      `SELECT u.idUsuario, u.usuario, p.nombre, p.apellido_paterno, p.apellido_materno, lp.nombre AS perfil
       FROM dbo_usuario u
       INNER JOIN dbo_persona p ON u.idPersona = p.idPersona
       LEFT JOIN dbo_usuario_perfil up ON u.idUsuario = up.idUsuario
       LEFT JOIN dbo_login_perfil lp ON up.idPerfil = lp.idPerfil
       WHERE u.idUsuario = ?`,
      [usuario.idUsuario]
    );
    if (resultados.length === 0) {
      return res.status(404).json({ mensaje: 'No se encontró el nombre del usuario' });
    }
    const persona = resultados[0];
    const nombreCompleto = `${persona.nombre} ${persona.apellido_paterno} ${persona.apellido_materno}`;
    const nombrePerfil = `${persona.perfil}`;

    res.json({
      mensaje: `¡Bienvenido ${nombrePerfil}, ${nombreCompleto}!`
    });
  } catch (error) {
    console.error('Error en inicio:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};
