const pool = require('../db/pool');

exports.obtenerInicio = async (req, res) => {
  const usuario = req.session.usuario;
  if (!usuario) return res.status(401).json({ mensaje: 'No autenticado' });

  try {
    const resultados = await pool.query(
      `SELECT p.nombre, p.apellido_paterno, p.apellido_materno
       FROM dbo_usuario u
       INNER JOIN dbo_persona p ON u.idPersona = p.idPersona
       WHERE u.idUsuario = ?`,
      [usuario.idUsuario]
    );

    if (resultados.length === 0) {
      return res.status(404).json({ mensaje: 'No se encontró el nombre del usuario' });
    }

    const persona = resultados[0];
    const nombreCompleto = `${persona.nombre} ${persona.apellido_paterno} ${persona.apellido_materno}`;

    const menus = require('../utils/menus');
    const menuBase = menus[usuario.perfil] || [];

    const menu = menuBase.map(item => ({
      nombre: item.nombre,
      ruta: item.ruta.replace(':id', usuario.idEntidad)
    }));

    res.json({
      mensaje: `¡Bienvenido, ${nombreCompleto}!`,
      menu,
      imagenBienvenida: `/assets/${usuario.perfil.toLowerCase()}.jpg`
    });
  } catch (error) {
    console.error('Error en inicio:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};

