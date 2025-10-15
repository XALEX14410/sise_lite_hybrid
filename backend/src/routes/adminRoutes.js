const express = require('express');
const router = express.Router();

const verificarSesion = require('../middlewares/verificarSesion');
const verificarPerfil = require('../middlewares/verificarPerfil');

const plantelController = require('../controllers/plantelController');
const loginController = require('../controllers/loginController');
const alumnoController = require('../controllers/alumnoController');
const docenteController = require('../controllers/docenteController');
const adminController = require('../controllers/adminController');
const cargaAcademicaController = require('../controllers/cargaAcademicaController');
const pagosController = require('../controllers/pagosController');
const becasController = require('../controllers/becasController');
const calificacionesController = require('../controllers/calificacionesController');
const carreraController = require('../controllers/carreraController');
const grupoController = require('../controllers/grupoController');
const horarioController = require('../controllers/horarioController');
const inscripcionController = require('../controllers/inscripcionController');
const materiaController = require('../controllers/materiaController');

const validar = require('../middlewares/validar');
const validarUsuarioUnico = require('../middlewares/validarUsuarioUnico');
const adminSchema = require('../validators/adminValidator');
const alumnoSchema = require('../validators/alumnoValidator');
const becaSchema = require('../validators/becaValidator');
const calificacionSchema = require('../validators/calificacionesValidator');
const cargaAcademicaSchema = require('../validators/cargaAcademicaValidator');
const carreraSchema = require('../validators/carreraValidator');
const docenteSchema = require('../validators/docenteValidator');
const grupoSchema = require('../validators/grupoValidator');
const horarioSchema = require('../validators/horarioValidator');
const inscripcionSchema = require('../validators/inscripcionValidator');
const { createMateriaSchema, updateMateriaSchema } = require('../validators/materiaValidator');
const idParamSchema = require('../validators/idValidator');
const { createPagoSchema, updatePagoSchema } = require('../validators/pagosValidator');
const { createPlantelSchema, updatePlantelSchema } = require('../validators/plantelValidator');

// ===============================
// PLANTELES
// ===============================
<<<<<<< HEAD
router.get('/plantel', verificarSesion, verificarPerfil(['Superadmin', 'Admin']), plantelController.getAllPlantel);
router.get('/plantel/:id', verificarSesion, verificarPerfil(['Superadmin', 'Admin']), validar(idParamSchema, 'params'), plantelController.getPlantelbyID);
router.post('/crear/plantel', verificarSesion, verificarPerfil(['Superadmin']), validar(createPlantelSchema), plantelController.createPlantel);
router.put('/actualizar/plantel/:id', verificarSesion, verificarPerfil(['Superadmin']), validar(idParamSchema, 'params'), validar(updatePlantelSchema), plantelController.updatePlantel);
router.delete('/eliminar/plantel/:id', verificarSesion, verificarPerfil(['Superadmin']), validar(idParamSchema, 'params'), plantelController.deletePlantel);
=======
router.get('/plantel', verificarSesion, verificarPerfil(['Superadmin', 'Admin']), plantelController.obtenerPlantel);
router.get('/plantel/:id', verificarSesion, verificarPerfil(['Superadmin', 'Admin']), validar(idParamSchema, 'params'), plantelController.obtenerPlantelporID);
router.post('/registrar-plantel', verificarSesion, verificarPerfil(['Superadmin']), validar(createPlantelSchema), plantelController.registrarPlantel);
router.put('/actualizar-plantel/:id', verificarSesion, verificarPerfil(['Superadmin']), validar(idParamSchema, 'params'), validar(updatePlantelSchema), plantelController.actualizarPlantel);
router.delete('/eliminar-plantel/:id', verificarSesion, verificarPerfil(['Superadmin']), validar(idParamSchema, 'params'), plantelController.eliminarPlantel);
>>>>>>> backend

// ===============================
// GRUPOS
// ===============================
<<<<<<< HEAD
router.get('/grupo', verificarSesion, verificarPerfil(['Superadmin', 'Admin']), grupoController.getAllGrupos);
router.get('/grupo/:id', verificarSesion, verificarPerfil(['Superadmin', 'Admin']), validar(idParamSchema, 'params'), grupoController.getGrupoById);
router.post('/crear/grupo', verificarSesion, verificarPerfil(['Superadmin']), validar(grupoSchema), grupoController.createGrupo);
router.put('/actualizar/grupo/:id', verificarSesion, verificarPerfil(['Superadmin']), validar(idParamSchema, 'params'), validar(grupoSchema), grupoController.updateGrupo);
router.delete('/eliminar/grupo/:id', verificarSesion, verificarPerfil(['Superadmin']), validar(idParamSchema, 'params'), grupoController.deleteGrupo);
=======
router.get('/grupo', verificarSesion, verificarPerfil(['Superadmin', 'Admin']), grupoController.obtenerGrupos);
router.get('/grupo/:idGrupo', verificarSesion, verificarPerfil(['Superadmin', 'Admin']), validar(idParamSchema, 'params'), grupoController.obtenerGrupoPorId);
router.post('/registrar-grupo', verificarSesion, verificarPerfil(['Superadmin']), validar(grupoSchema), grupoController.registrarGrupo);
router.put('/actualizar-grupo/:idGrupo', verificarSesion, verificarPerfil(['Superadmin']), validar(idParamSchema, 'params'), validar(grupoSchema), grupoController.actualizarGrupo);
router.delete('/eliminar-grupo/:idGrupo', verificarSesion, verificarPerfil(['Superadmin']), validar(idParamSchema, 'params'), grupoController.eliminarGrupo);
>>>>>>> backend

// ===============================
// HORARIOS
// ===============================
<<<<<<< HEAD
router.get('/horario', verificarSesion, verificarPerfil(['Superadmin', 'Admin']), horarioController.getAllHorarios);
router.get('/horario/:id', verificarSesion, verificarPerfil(['Superadmin', 'Admin']), validar(idParamSchema, 'params'), horarioController.getHorarioById);
router.post('/crear/horario', verificarSesion, verificarPerfil(['Superadmin']), validar(horarioSchema), horarioController.createHorario);
router.put('/actualizar/horario/:id', verificarSesion, verificarPerfil(['Superadmin']), validar(idParamSchema, 'params'), validar(horarioSchema), horarioController.updateHorario);
router.delete('/eliminar/horario/:id', verificarSesion, verificarPerfil(['Superadmin']), validar(idParamSchema, 'params'), horarioController.deleteHorario);
=======
router.get('/horario', verificarSesion, verificarPerfil(['Superadmin', 'Admin']), horarioController.obtenerHorarios);
router.get('/horario/:id', verificarSesion, verificarPerfil(['Superadmin', 'Admin']), validar(idParamSchema, 'params'), horarioController.obtenerHorarioporId);
router.post('/registrar-horario', verificarSesion, verificarPerfil(['Superadmin']), validar(horarioSchema), horarioController.registrarHorario);
router.put('/actualizar-horario/:id', verificarSesion, verificarPerfil(['Superadmin']), validar(idParamSchema, 'params'), validar(horarioSchema), horarioController.actualizarHorario);
router.delete('/eliminar-horario/:id', verificarSesion, verificarPerfil(['Superadmin']), validar(idParamSchema, 'params'), horarioController.eliminarHorario);
>>>>>>> backend

// ===============================
// INSCRIPCIÓN
// ===============================
<<<<<<< HEAD
router.get('/inscripcion', verificarSesion, verificarPerfil(['Superadmin', 'Admin']), inscripcionController.getAllInscripciones);
router.get('/inscripcion/:id', verificarSesion, verificarPerfil(['Superadmin', 'Admin']), validar(idParamSchema, 'params'), inscripcionController.getInscripcionById);
router.post('/crear/inscripcion', verificarSesion, verificarPerfil(['Superadmin']), validar(inscripcionSchema), inscripcionController.createInscripcion);
router.put('/actualizar/inscripcion/:id', verificarSesion, verificarPerfil(['Superadmin']), validar(idParamSchema, 'params'), validar(inscripcionSchema), inscripcionController.updateInscripcion);
router.delete('/eliminar/inscripcion/:id', verificarSesion, verificarPerfil(['Superadmin']), validar(idParamSchema, 'params'), inscripcionController.deleteInscripcion);
=======
router.get('/inscripcion', verificarSesion, verificarPerfil(['Superadmin', 'Admin']), inscripcionController.obtenerInscripciones);
router.get('/inscripcion/:id', verificarSesion, verificarPerfil(['Superadmin', 'Admin']), validar(idParamSchema, 'params'), inscripcionController.obtenerInscripcionesporId);
router.post('/registrar-inscripcion', verificarSesion, verificarPerfil(['Superadmin']), validar(inscripcionSchema), inscripcionController.registrarInscripcion);
router.put('/actualizar-inscripcion/:id', verificarSesion, verificarPerfil(['Superadmin']), validar(idParamSchema, 'params'), validar(inscripcionSchema), inscripcionController.actualizarInscripcion);
router.delete('/eliminar-inscripcion/:id', verificarSesion, verificarPerfil(['Superadmin']), validar(idParamSchema, 'params'), inscripcionController.eliminarInscripcion);
>>>>>>> backend

// ===============================
// ROLES
// ===============================
router.get('/roles', verificarSesion, verificarPerfil(['Superadmin']), loginController.getRoles);
router.get('/roles/:id', verificarSesion, verificarPerfil(['Superadmin']), loginController.getRolbyID);

// ===============================
// ALUMNOS
// ===============================
<<<<<<< HEAD
router.get('/alumnos', verificarSesion, verificarPerfil(['Superadmin', 'Admin']), alumnoController.getAllAlumnos);
router.get('/alumnos/:id', verificarSesion, verificarPerfil(['Superadmin', 'Admin']), validar(idParamSchema, 'params'), alumnoController.getAlumnoByID);
router.post('/crear/alumno', verificarSesion, verificarPerfil(['Superadmin']), validar(alumnoSchema), validarUsuarioUnico, alumnoController.createAlumno);
router.put('/actualizar/alumno/:id', verificarSesion, verificarPerfil(['Superadmin']), validar(idParamSchema, 'params'), validar(alumnoSchema), alumnoController.updateAlumno);
router.delete('/eliminar/alumno/:id', verificarSesion, verificarPerfil(['Superadmin']), validar(idParamSchema, 'params'), alumnoController.deleteAlumno);
=======
router.get('/alumnos', verificarSesion, verificarPerfil(['Superadmin', 'Admin']), alumnoController.obtenerAlumnos);
router.get('/alumnos/:id', verificarSesion, verificarPerfil(['Superadmin', 'Admin']), validar(idParamSchema, 'params'), alumnoController.obtenerAlumnoPorId);
router.post('/registar-alumno', verificarSesion, verificarPerfil(['Superadmin']), validar(alumnoSchema), validarUsuarioUnico, alumnoController.registrarAlumno);
router.put('/actualizar-alumno/:id', verificarSesion, verificarPerfil(['Superadmin']), validar(idParamSchema, 'params'), validar(alumnoSchema), alumnoController.actualizarAlumno);
router.delete('/eliminar-alumno/:id', verificarSesion, verificarPerfil(['Superadmin']), validar(idParamSchema, 'params'), alumnoController.eliminarAlumno);
>>>>>>> backend

// ===============================
// DOCENTES
// ===============================
<<<<<<< HEAD
router.get('/docentes', verificarSesion, verificarPerfil(['Superadmin', 'Admin']), docenteController.getAllDocentes);
router.get('/docentes/:id', verificarSesion, verificarPerfil(['Superadmin', 'Admin']), validar(idParamSchema, 'params'), docenteController.getDocenteByID);
router.post('/crear/docente', verificarSesion, verificarPerfil(['Superadmin']), validar(docenteSchema), docenteController.createDocente);
router.put('/actualizar/docente/:id', verificarSesion, verificarPerfil(['Superadmin']), validar(idParamSchema, 'params'), validar(docenteSchema), docenteController.updateDocente);
router.delete('/eliminar/docente/:id', verificarSesion, verificarPerfil(['Superadmin']), validar(idParamSchema, 'params'), docenteController.deleteDocente);
=======
router.get('/docentes', verificarSesion, verificarPerfil(['Superadmin', 'Admin']), docenteController.obtenerDocentes);
router.get('/docentes/:idDocente', verificarSesion, verificarPerfil(['Superadmin', 'Admin']), validar(idParamSchema, 'params'), docenteController.obtenerDocentePorId);
router.post('/registrar-docente', verificarSesion, verificarPerfil(['Superadmin']), validar(docenteSchema), docenteController.registrarDocente);
router.put('/actualizar-docente/:idDocente', verificarSesion, verificarPerfil(['Superadmin']), validar(idParamSchema, 'params'), validar(docenteSchema), docenteController.actualizarDocente);
router.delete('/eliminar-docente/:idDocente', verificarSesion, verificarPerfil(['Superadmin']), validar(idParamSchema, 'params'), docenteController.eliminarDocente);
>>>>>>> backend

// ===============================
// ADMINISTRADORES
// ===============================
<<<<<<< HEAD
router.get('/administradores', verificarSesion, verificarPerfil(['Superadmin', 'Admin']), adminController.getAllAdmin);
router.get('/administradores/:id', verificarSesion, verificarPerfil(['Superadmin', 'Admin']), validar(idParamSchema, 'params'), adminController.getAdminByID);
router.post('/crear/admin', verificarSesion, verificarPerfil(['Superadmin']), validar(adminSchema), validarUsuarioUnico, adminController.createAdmin);
router.put('/actualizar/admin/:id', verificarSesion, verificarPerfil(['Superadmin']), validar(idParamSchema, 'params'), validar(adminSchema), adminController.updateAdmin);
router.delete('/eliminar/admin/:id', verificarSesion, verificarPerfil(['Superadmin']), validar(idParamSchema, 'params'), adminController.deleteAdmin);
=======
router.get('/administradores', verificarSesion, verificarPerfil(['Superadmin', 'Admin']), adminController.obtenerAdmins);
router.get('/administradores/:idAdmin', verificarSesion, verificarPerfil(['Superadmin', 'Admin']), validar(idParamSchema, 'params'), adminController.obtenerAdminPorId);
router.post('/registrar-admin', verificarSesion, verificarPerfil(['Superadmin']), validar(adminSchema), validarUsuarioUnico, adminController.registrarAdmin);
router.put('/actualizar-admin/:idAdmin', verificarSesion, verificarPerfil(['Superadmin']), validar(idParamSchema, 'params'), validar(adminSchema), adminController.actualizarAdmin);
router.delete('/eliminar-admin/:idAdmin', verificarSesion, verificarPerfil(['Superadmin']), validar(idParamSchema, 'params'), adminController.eliminarAdmin);
>>>>>>> backend

// ===============================
// CARGA ACADÉMICA
// ===============================
<<<<<<< HEAD
router.get('/carga', verificarSesion, verificarPerfil(['Superadmin', 'Admin']), cargaAcademicaController.getAllCargaAcademica);
router.get('/carga/:id', verificarSesion, verificarPerfil(['Superadmin', 'Admin']), validar(idParamSchema, 'params'), cargaAcademicaController.getCargaAcademicaById);
router.post('/crear/carga', verificarSesion, verificarPerfil(['Superadmin']), validar(cargaAcademicaSchema), cargaAcademicaController.createCargaAcademica);
router.put('/actualizar/carga/:id', verificarSesion, verificarPerfil(['Superadmin']), validar(idParamSchema, 'params'), validar(cargaAcademicaSchema), cargaAcademicaController.updateCargaAcademica);
router.delete('/eliminar/carga/:id', verificarSesion, verificarPerfil(['Superadmin']), validar(idParamSchema, 'params'), cargaAcademicaController.deleteCargaAcademica);
=======
router.get('/carga', verificarSesion, verificarPerfil(['Superadmin', 'Admin']), cargaAcademicaController.obtenerCargaAcademica);
router.get('/carga/:id', verificarSesion, verificarPerfil(['Superadmin', 'Admin']), validar(idParamSchema, 'params'), cargaAcademicaController.obtenerCargaAcademica);
router.post('/registrar-carga', verificarSesion, verificarPerfil(['Superadmin']), validar(cargaAcademicaSchema), cargaAcademicaController.registrarCargaAcademica);
router.put('/actualizar-carga/:id', verificarSesion, verificarPerfil(['Superadmin']), validar(idParamSchema, 'params'), validar(cargaAcademicaSchema), cargaAcademicaController.actualizarCargaAcademica);
router.delete('/eliminar-carga/:id', verificarSesion, verificarPerfil(['Superadmin']), validar(idParamSchema, 'params'), cargaAcademicaController.eliminarCargaAcademica);
>>>>>>> backend

// ===============================
// PAGOS
// ===============================
<<<<<<< HEAD
router.get('/pagos', verificarSesion, verificarPerfil(['Superadmin', 'Admin']), pagosController.getAllPagos);
router.get('/pagos/:id', verificarSesion, verificarPerfil(['Superadmin', 'Admin']), validar(idParamSchema, 'params'), pagosController.getPagoById);
router.post('/crear/pagos', verificarSesion, verificarPerfil(['Superadmin']), validar(createPagoSchema), pagosController.createPago);
router.put('/actualizar/pagos/:id', verificarSesion, verificarPerfil(['Superadmin']), validar(idParamSchema, 'params'), validar(updatePagoSchema), pagosController.updatePago);
router.delete('/eliminar/pagos/:id', verificarSesion, verificarPerfil(['Superadmin']), validar(idParamSchema, 'params'), pagosController.deletePago);
=======
router.get('/pagos', verificarSesion, verificarPerfil(['Superadmin', 'Admin']), pagosController.obtenerPagos);
router.get('/pagos/:id', verificarSesion, verificarPerfil(['Superadmin', 'Admin']), validar(idParamSchema, 'params'), pagosController.obtenerPagoporID);
router.post('/registrar-pagos', verificarSesion, verificarPerfil(['Superadmin']), validar(createPagoSchema), pagosController.registrarPago);
router.put('/actualizar-pagos/:id', verificarSesion, verificarPerfil(['Superadmin']), validar(idParamSchema, 'params'), validar(updatePagoSchema), pagosController.actualizarPago);
router.delete('/eliminar-pagos/:id', verificarSesion, verificarPerfil(['Superadmin']), validar(idParamSchema, 'params'), pagosController.eliminarPago);
>>>>>>> backend

// ===============================
// BECAS
// ===============================
<<<<<<< HEAD
router.get('/becas', verificarSesion, verificarPerfil(['Superadmin', 'Admin']), becasController.getAllBecas);
router.get('/becas/:id', verificarSesion, verificarPerfil(['Superadmin', 'Admin']), validar(idParamSchema, 'params'), becasController.getBecaById);
router.post('/crear/becas', verificarSesion, verificarPerfil(['Superadmin']), validar(becaSchema), becasController.createBeca);
router.put('/actualizar/becas/:id', verificarSesion, verificarPerfil(['Superadmin']), validar(idParamSchema, 'params'), validar(becaSchema), becasController.updateBeca);
router.delete('/eliminar/becas/:id', verificarSesion, verificarPerfil(['Superadmin']), validar(idParamSchema, 'params'), becasController.deleteBeca);
=======
router.get('/becas', verificarSesion, verificarPerfil(['Superadmin', 'Admin']), becasController.obtenerBecas);
router.get('/becas/:id', verificarSesion, verificarPerfil(['Superadmin', 'Admin']), validar(idParamSchema, 'params'), becasController.obtenerBecaporId);
router.post('/registrar-becas', verificarSesion, verificarPerfil(['Superadmin']), validar(becaSchema), becasController.registrarBeca);
router.put('/actualizar-becas/:id', verificarSesion, verificarPerfil(['Superadmin']), validar(idParamSchema, 'params'), validar(becaSchema), becasController.actualizarBeca);
router.delete('/eliminar-becas/:id', verificarSesion, verificarPerfil(['Superadmin']), validar(idParamSchema, 'params'), becasController.eliminarBeca);
>>>>>>> backend

// ===============================
// CALIFICACIONES
// ===============================
<<<<<<< HEAD
router.get('/calificaciones', verificarSesion, verificarPerfil(['Superadmin', 'Admin']), calificacionesController.getAllCalificaciones);
router.get('/calificaciones/:id', verificarSesion, verificarPerfil(['Superadmin', 'Admin']), validar(idParamSchema, 'params'), calificacionesController.getCalificacionById);
router.post('/crear/calificaciones', verificarSesion, verificarPerfil(['Superadmin']), validar(calificacionSchema), calificacionesController.createCalificacion);
router.put('/actualizar/calificaciones/:id', verificarSesion, verificarPerfil(['Superadmin']), validar(idParamSchema, 'params'), validar(calificacionSchema), calificacionesController.updateCalificacion);
router.delete('/eliminar/calificaciones/:id', verificarSesion, verificarPerfil(['Superadmin']), validar(idParamSchema, 'params'), calificacionesController.deleteCalificacion);
=======
router.get('/calificaciones', verificarSesion, verificarPerfil(['Superadmin', 'Admin']), calificacionesController.obtenerCalificaciones);
router.get('/calificaciones/:id', verificarSesion, verificarPerfil(['Superadmin', 'Admin']), validar(idParamSchema, 'params'), calificacionesController.obtenerCalificacionById);
router.post('/registrar-calificaciones', verificarSesion, verificarPerfil(['Superadmin']), validar(calificacionSchema), calificacionesController.registrarCalificacion);
router.put('/actualizar/calificaciones/:id', verificarSesion, verificarPerfil(['Superadmin']), validar(idParamSchema, 'params'), validar(calificacionSchema), calificacionesController.actualizarCalificacion);
router.delete('/eliminar/calificaciones/:id', verificarSesion, verificarPerfil(['Superadmin']), validar(idParamSchema, 'params'), calificacionesController.eliminarCalificacion);
>>>>>>> backend

// ===============================
// CARRERAS
// ===============================
<<<<<<< HEAD
router.get('/carreras', verificarSesion, verificarPerfil(['Superadmin', 'Admin']), carreraController.getAllCarreras);
router.get('/carreras/:id', verificarSesion, verificarPerfil(['Superadmin', 'Admin']), validar(idParamSchema, 'params'), carreraController.getCarreraById);
router.post('/crear/carreras', verificarSesion, verificarPerfil(['Superadmin']), validar(carreraSchema), carreraController.createCarrera);
router.put('/actualizar/carreras/:id', verificarSesion, verificarPerfil(['Superadmin']), validar(idParamSchema, 'params'), validar(carreraSchema), carreraController.updateCarrera);
router.delete('/eliminar/carreras/:id', verificarSesion, verificarPerfil(['Superadmin']), validar(idParamSchema, 'params'), carreraController.deleteCarrera);
=======
router.get('/carreras', verificarSesion, verificarPerfil(['Superadmin', 'Admin']), carreraController.obtenerCarreras);
router.get('/carreras/:id', verificarSesion, verificarPerfil(['Superadmin', 'Admin']), validar(idParamSchema, 'params'), carreraController.obtenerCarreraPorId);
router.post('/registrar-carreras', verificarSesion, verificarPerfil(['Superadmin']), validar(carreraSchema), carreraController.registrarCarrera);
router.put('/actualizar-carreras/:id', verificarSesion, verificarPerfil(['Superadmin']), validar(idParamSchema, 'params'), validar(carreraSchema), carreraController.actualizarCarrera);
router.delete('/eliminar-carreras/:id', verificarSesion, verificarPerfil(['Superadmin']), validar(idParamSchema, 'params'), carreraController.eliminarCarrera);
>>>>>>> backend

// ===============================
// MATERIAS
// ===============================
<<<<<<< HEAD
router.get('/materias', verificarSesion, verificarPerfil(['Superadmin', 'Admin']), materiaController.getAllMaterias);
router.get('/materias/:id', verificarSesion, verificarPerfil(['Superadmin', 'Admin']), validar(idParamSchema, 'params'), materiaController.getMateriaById);
router.post('/crear/materias', verificarSesion, verificarPerfil(['Superadmin']), validar(createMateriaSchema), materiaController.createMateria);
router.put('/actualizar/materias/:id', verificarSesion, verificarPerfil(['Superadmin']), validar(idParamSchema, 'params'), validar(updateMateriaSchema), materiaController.updateMateria);
router.delete('/eliminar/materias/:id', verificarSesion, verificarPerfil(['Superadmin']), validar(idParamSchema, 'params'), materiaController.deleteMateria);
=======
router.get('/materias', verificarSesion, verificarPerfil(['Superadmin', 'Admin']), materiaController.obtenerMaterias);
router.get('/materias/:id', verificarSesion, verificarPerfil(['Superadmin', 'Admin']), validar(idParamSchema, 'params'), materiaController.obtenerMateriaPorId);
router.post('/registrar-materias', verificarSesion, verificarPerfil(['Superadmin']), validar(createMateriaSchema), materiaController.registrarMateria);
router.put('/actualizar-materias/:id', verificarSesion, verificarPerfil(['Superadmin']), validar(idParamSchema, 'params'), validar(updateMateriaSchema), materiaController.actualizarMateria);
router.delete('/eliminar-materias/:id', verificarSesion, verificarPerfil(['Superadmin']), validar(idParamSchema, 'params'), materiaController.eliminarMateria);
>>>>>>> backend

module.exports = router;
