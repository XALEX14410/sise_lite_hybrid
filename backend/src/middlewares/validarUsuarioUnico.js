const pool = require('../db/pool');

module.exports = async (req, res, next) => {
  const { usuario } = req.body;

  if (!usuario) {
    return res.status(400).json({ error: 'El campo "usuario" es obligatorio' });
  }

  try {
    const resultado = await pool.query(
      'SELECT idUsuario FROM dbo_usuario WHERE usuario = ?',
      [usuario]
    );

    if (resultado.length > 0) {
      return res.status(409).json({ error: 'El nombre de usuario ya está en uso' });
    }

    next();
  } catch (error) {
    console.error('Error en validarUsuarioUnico:', error);
    res.status(500).json({ error: 'Error al validar usuario único', detalle: error.message });
  }
};
