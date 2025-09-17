const pool = require('../db/pool');

exports.createInscripcion = async (req, res) => {
  const { idAlumno, idGrupo } = req.body;

  if (!idAlumno || !idGrupo) {
    return res.status(400).json({ error: 'Faltan datos para la inscripción' });
  }

  try {
    // Validar que no esté inscrito ya
    const existe = await pool.query(`
      SELECT * FROM dbo_inscripciones
      WHERE idAlumno = ? AND idGrupo = ?
    `, [idAlumno, idGrupo]);

    if (existe.length > 0) {
      return res.status(409).json({ error: 'El alumno ya está inscrito en este grupo' });
    }

    // Insertar inscripción
    const result = await pool.query(`
      INSERT INTO dbo_inscripciones (idAlumno, idGrupo)
      VALUES (?, ?)
    `, [idAlumno, idGrupo]);

    res.json({ mensaje: 'Inscripción realizada correctamente', idInscripcion: Number(result.insertId) });
  } catch (err) {
    console.error('Error al inscribir alumno:', err);
    res.status(500).json({ error: 'Error al inscribir alumno', detalle: err.message });
  }
};