module.exports = (schema, property = 'body') => (req, res, next) => {
  const { error } = schema.validate(req[property], { abortEarly: false });

  if (error) {
    const errores = error.details.map(e => e.message);
    return res.status(400).json({ errores });
  }

  next();
};
