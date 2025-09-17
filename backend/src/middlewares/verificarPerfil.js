module.exports = function (perfilesPermitidos) {
  return (req, res, next) => {
    const usuario = req.session.usuario;

    if (!usuario || !usuario.perfil) {
      return res.status(401).json({ error: 'No autenticado' });
    }

    if (!perfilesPermitidos.includes(usuario.perfil)) {
      return res.status(403).json({ error: 'Acceso denegado para este perfil' });
    }

    console.log('Acceso permitido');
    next();
  };
};