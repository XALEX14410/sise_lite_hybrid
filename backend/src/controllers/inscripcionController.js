const Inscripcion = require('../models/inscripcionModel');

exports.obtenerInscripciones = async (req, res) => {
  try {
    const inscripciones = await Inscripcion.getAll();
    res.json({ inscripciones });
  } catch (err) {
    console.error('Error al obtener inscripciones:', err);
    res.status(500).json({ error: 'Error al consultar inscripciones', detalle: err.message });
  }
};

exports.obtenerInscripcionesporId = async (req, res) => {
  const idInscripcion = req.params.id;

  if (isNaN(idInscripcion)) {
    return res.status(400).json({ error: 'ID de inscripción inválido' });
  }

  try {
<<<<<<< HEAD
    const existe = await pool.query(`
      SELECT * FROM dbo_inscripciones
      WHERE idAlumno = ? AND idGrupo = ?
    `, [idAlumno, idGrupo]);
=======
    const inscripcion = await Inscripcion.getById(idInscripcion);
>>>>>>> backend

    if (!inscripcion) {
      return res.status(404).json({ error: 'Inscripción no encontrada' });
    }

    res.json({ inscripcion });
  } catch (err) {
    console.error('Error al obtener inscripción:', err);
    res.status(500).json({ error: 'Error al consultar inscripción', detalle: err.message });
  }
};

exports.registrarInscripcion = async (req, res) => {
  const { idAlumno, idGrupo } = req.body;
  try {
    const idInscripcion = await Inscripcion.create({ idAlumno, idGrupo });

    if (!idInscripcion) {
      return res.status(409).json({ error: 'El alumno ya está inscrito en este grupo' });
    }

<<<<<<< HEAD
    // Insertar inscripción
    const result = await pool.query(`
      INSERT INTO dbo_inscripciones (idAlumno, idGrupo)
      VALUES (?, ?)
    `, [idAlumno, idGrupo]);

    res.json({
      mensaje: 'Inscripción realizada correctamente',
      idInscripcion: Number(result.insertId)
=======
    res.json({
      mensaje: 'Inscripción realizada correctamente',
      idInscripcion: Number(idInscripcion)
>>>>>>> backend
    });
  } catch (err) {
    console.error('Error al inscribir alumno:', err);
    res.status(500).json({ error: 'Error al inscribir alumno', detalle: err.message });
  }
};

<<<<<<< HEAD
exports.getAllInscripciones = async (req, res) => {
  try {
    const inscripciones = await pool.query(`
      SELECT i.idInscripcion, a.usuario AS alumno, g.clave_grupo, g.periodo,
             m.nombre_materia, d.usuario AS docente
      FROM dbo_inscripciones i
      INNER JOIN dbo_usuario a ON i.idAlumno = a.idUsuario
      INNER JOIN dbo_grupo g ON i.idGrupo = g.idGrupo
      INNER JOIN dbo_materias m ON g.idMateria = m.idMateria
      LEFT JOIN dbo_usuario d ON g.idDocente = d.idUsuario
      ORDER BY g.periodo DESC, a.usuario ASC
    `);

    res.json({ inscripciones });
  } catch (err) {
    console.error('Error al obtener inscripciones:', err);
    res.status(500).json({ error: 'Error al consultar inscripciones', detalle: err.message });
  }
};

// 🟠 Obtener inscripción por ID
exports.getInscripcionById = async (req, res) => {
  const idInscripcion = req.params.id;

  if (isNaN(idInscripcion)) {
    return res.status(400).json({ error: 'ID de inscripción inválido' });
  }

  try {
    const rows = await pool.query(`
      SELECT i.idInscripcion, a.usuario AS alumno, g.clave_grupo, g.periodo,
             m.nombre_materia, d.usuario AS docente
      FROM dbo_inscripciones i
      INNER JOIN dbo_usuario a ON i.idAlumno = a.idUsuario
      INNER JOIN dbo_grupo g ON i.idGrupo = g.idGrupo
      INNER JOIN dbo_materias m ON g.idMateria = m.idMateria
      LEFT JOIN dbo_usuario d ON g.idDocente = d.idUsuario
      WHERE i.idInscripcion = ?
    `, [idInscripcion]);

    if (rows.length === 0) {
      return res.status(404).json({ error: 'Inscripción no encontrada' });
    }

    res.json({ inscripcion: rows[0] });
  } catch (err) {
    console.error('Error al obtener inscripción:', err);
    res.status(500).json({ error: 'Error al consultar inscripción', detalle: err.message });
  }
};

exports.updateInscripcion = async (req, res) => {
  const idInscripcion = req.params.id;
  const { idAlumno, idGrupo } = req.body;

  if (!idAlumno || !idGrupo) {
    return res.status(400).json({ error: 'Faltan datos para actualizar la inscripción' });
  }

  try {
    const result = await pool.query(`
      UPDATE dbo_inscripciones
      SET idAlumno = ?, idGrupo = ?
      WHERE idInscripcion = ?
    `, [idAlumno, idGrupo, idInscripcion]);

    if (result.affectedRows === 0) {
=======
exports.actualizarInscripcion = async (req, res) => {
  const idInscripcion = req.params.id;
  try {
    const affected = await Inscripcion.update(idInscripcion, { idAlumno, idGrupo });

    if (affected === 0) {
>>>>>>> backend
      return res.status(404).json({ error: 'Inscripción no encontrada' });
    }

    res.json({ mensaje: 'Inscripción actualizada correctamente' });
  } catch (err) {
    console.error('Error al actualizar inscripción:', err);
    res.status(500).json({ error: 'Error al actualizar inscripción', detalle: err.message });
  }
};

<<<<<<< HEAD
exports.deleteInscripcion = async (req, res) => {
  const idInscripcion = req.params.id;

  try {
    const result = await pool.query(`
      DELETE FROM dbo_inscripciones WHERE idInscripcion = ?
    `, [idInscripcion]);

    if (result.affectedRows === 0) {
=======
exports.eliminarInscripcion = async (req, res) => {
  const idInscripcion = req.params.id;

  try {
    const affected = await Inscripcion.remove(idInscripcion);

    if (affected === 0) {
>>>>>>> backend
      return res.status(404).json({ error: 'Inscripción no encontrada o ya eliminada' });
    }

    res.json({ mensaje: 'Inscripción eliminada correctamente' });
  } catch (err) {
    console.error('Error al eliminar inscripción:', err);
    res.status(500).json({ error: 'Error al eliminar inscripción', detalle: err.message });
  }
};
