module.exports = {
  alumno: [
  { nombre: 'Mis grupos', ruta: '/alumno/:id/grupos' },
  { nombre: 'Mi horario', ruta: '/alumno/:id/horario' },
  { nombre: 'Mis materias', ruta: '/alumno/:id/materias' },
  { nombre: 'Mis calificaciones', ruta: '/alumno/:id/calificaciones' },
  { nombre: 'Mi perfil', ruta: '/auth/perfil' }
  ],
  docente: [
  { nombre: 'Mis grupos', ruta: '/docente/:id/grupos' },
  { nombre: 'Horario de clases', ruta: '/docente/:id/horario' },
  { nombre: 'Estudiantes por grupo', ruta: '/docente/:id/estudiantes' },
  { nombre: 'Registrar calificaciones', ruta: '/docente/:id/calificaciones' },
  { nombre: 'Mi perfil', ruta: '/auth/perfil' }
  ],
  admin: [
  { nombre: 'Lista de alumnos', ruta: '/admin/alumnos' },
  { nombre: 'Lista de docentes', ruta: '/admin/docentes' },
  { nombre: 'Grupos', ruta: '/admin/grupos' },
  { nombre: 'Inscripciones', ruta: '/admin/inscripciones' },
  { nombre: 'Materias', ruta: '/admin/materias' },
  { nombre: 'Carreras', ruta: '/admin/carreras' },
  { nombre: 'Horarios', ruta: '/admin/horarios' },
  { nombre: 'Mi perfil', ruta: '/auth/perfil' }
  ],
  superadmin: [
  { nombre: 'Usuarios del sistema', ruta: '/superadmin/usuarios' },
  { nombre: 'Perfiles y roles', ruta: '/superadmin/perfiles' },
  { nombre: 'Asignaciones de perfil', ruta: '/superadmin/asignaciones' },
  { nombre: 'Planteles', ruta: '/superadmin/planteles' },
  { nombre: 'Auditoría del sistema', ruta: '/superadmin/auditoria' },
  { nombre: 'Configuración general', ruta: '/superadmin/configuracion' },
  { nombre: 'Mi perfil', ruta: '/auth/perfil' }
  ]
};