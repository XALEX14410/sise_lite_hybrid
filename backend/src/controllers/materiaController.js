const pool = require('../db/pool');

// Obtener todas las materias
exports.getAllMaterias = async (req, res) => {
  try {
    const materias = await pool.query(`
      SELECT m.idMateria, m.nombre_materia, m.semestre, m.descripcion, m.creditos,
             c.carrera
      FROM dbo_materias m
      INNER JOIN dbo_carrera c ON m.idCarrera = c.idCarrera
    `);
    res.json({ materias });
  } catch (err) {
    console.error('Error al obtener materias:', err);
    res.status(500).json({ error: 'Error al consultar materias', detalle: err.message });
  }
};

// Obtener una materia por ID
exports.getMateriaById = async (req, res) => {
  const idMateria = req.params.id;
  try {
    const rows = await pool.query(`
      SELECT m.idMateria, m.nombre_materia, m.semestre, m.descripcion, m.creditos,
             c.carrera
      FROM dbo_materias m
      INNER JOIN dbo_carrera c ON m.idCarrera = c.idCarrera
      WHERE m.idMateria = ?
    `, [idMateria]);

    if (rows.length === 0) {
      return res.status(404).json({ error: 'Materia no encontrada' });
    }

    res.json({ materia: rows[0] });
  } catch (err) {
    console.error('Error al obtener materia:', err);
    res.status(500).json({ error: 'Error al consultar materia', detalle: err.message });
  }
};

// Obtener materias por carrera
exports.getMateriasByCarrera = async (req, res) => {
  const idCarrera = req.params.id;
  try {
    const materias = await pool.query(`
      SELECT idMateria, nombre_materia, semestre, descripcion, creditos
      FROM dbo_materias
      WHERE idCarrera = ?
    `, [idCarrera]);

    res.json({ materias });
  } catch (err) {
    console.error('Error al obtener materias por carrera:', err);
    res.status(500).json({ error: 'Error al consultar materias', detalle: err.message });
  }
};

// Crear una nueva materia
exports.createMateria = async (req, res) => {
  const { idCarrera, nombre_materia, semestre, descripcion, creditos } = req.body;

  if (!idCarrera || !nombre_materia || !semestre || !creditos) {
    return res.status(400).json({ error: 'Faltan datos obligatorios de la materia' });
  }

  try {
    const result = await pool.query(`
      INSERT INTO dbo_materias (idCarrera, nombre_materia, semestre, descripcion, creditos)
      VALUES (?, ?, ?, ?, ?)
    `, [idCarrera, nombre_materia, semestre, descripcion || null, creditos]);

    res.json({ mensaje: 'Materia creada correctamente', idMateria: Number(result.insertId) });
  } catch (err) {
    console.error('Error al crear materia:', err);
    res.status(500).json({ error: 'Error al crear materia', detalle: err.message });
  }
};

// Actualizar una materia
exports.updateMateria = async (req, res) => {
  const idMateria = req.params.id;
  const { nombre_materia, semestre, descripcion, creditos } = req.body;

  try {
    const result = await pool.query(`
      UPDATE dbo_materias
      SET nombre_materia = ?, semestre = ?, descripcion = ?, creditos = ?
      WHERE idMateria = ?
    `, [nombre_materia, semestre, descripcion || null, creditos, idMateria]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Materia no encontrada' });
    }

    res.json({ mensaje: 'Materia actualizada correctamente' });
  } catch (err) {
    console.error('Error al actualizar materia:', err);
    res.status(500).json({ error: 'Error al actualizar materia', detalle: err.message });
  }
};

// Eliminar una materia
exports.deleteMateria = async (req, res) => {
  const idMateria = req.params.id;

  try {
    const result = await pool.query(`
      DELETE FROM dbo_materias
      WHERE idMateria = ?
    `, [idMateria]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Materia no encontrada o ya eliminada' });
    }

    res.json({ mensaje: 'Materia eliminada correctamente' });
  } catch (err) {
    console.error('Error al eliminar materia:', err);
    res.status(500).json({ error: 'Error al eliminar materia', detalle: err.message });
  }
};