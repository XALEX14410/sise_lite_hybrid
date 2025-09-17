module.exports = (req, res, next) => {
  const usuario = req.session.usuario;

  if (!usuario) {
    return res.status(401).json({ error: 'No autenticado' });
  }

  next();
};
